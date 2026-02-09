import fs from "fs";
import crypto from "node:crypto";
import { createClient } from "@sanity/client";

// === Config ===
const client = createClient({
  projectId: "6qntx754",
  dataset: "production",
  apiVersion: "2023-10-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const PRODUCTS_PATH = "./PracticaCreProd/productos65.json"; // cambia por nuevos .JSON CON NUEVOS PRODUCTOS, DE LOS CUALES YA SUBISTE LAS IMAGENES A SANITY (LEER README_IMAGENES.txt) 

async function findAssetIdByFilename(filename) {
  const q = `*[_type=="sanity.imageAsset" && originalFilename==$fn][0]{_id}`;
  const hit = await client.fetch(q, { fn: filename });
  return hit?._id || null;
}

// ✅ Busca si ya existe el producto por title
async function findProductByTitle(title) {
  const q = `*[_type=="product" && title==$title][0]{_id, images}`;
  const hit = await client.fetch(q, { title });
  return hit || null;
}

// Devuelve images[] con las fotos que existan (01,02,03) en orden
async function buildImagesFlexible(codeBase) {
  const candidates = [
    `${codeBase}_01.png`,
    `${codeBase}_02.png`,
    `${codeBase}_03.png`,
  ];

  const images = [];
  const missing = [];

  for (const fn of candidates) {
    const assetId = await findAssetIdByFilename(fn);
    if (!assetId) {
      missing.push(fn);
      continue;
    }

    images.push({
      _key: crypto.randomUUID(), // ✅ evita "Missing keys"
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
    });
  }

  return { images, missing };
}

// (opcional) comparar arrays de assets para saber si cambió algo
function assetRefs(images = []) {
  return images
    .map((img) => img?.asset?._ref)
    .filter(Boolean)
    .sort()
    .join("|");
}

async function run() {
  const raw = fs.readFileSync(PRODUCTS_PATH, "utf8");
  const products = JSON.parse(raw);

  console.log(`Productos en JSON: ${products.length}`);

  for (const p of products) {
    const codeBase = p.image; // "45_02"
    const { images, missing } = await buildImagesFlexible(codeBase);

    if (images.length === 0) {
      console.log(
        `⚠️ Saltando: ${p.title} (${codeBase}) — no encontré ninguna foto (_01/_02/_03).`
      );
      continue;
    }

    // Campos que sí existen en tu schema
    const fields = {
      title: p.title,
      category: p.category,
      price: p.price,
      description: p.description,
      available: p.available ?? true,
      images,
    };

    try {
      const existing = await findProductByTitle(p.title);

      if (!existing) {
        // No existe -> crear
        await client.create({ _type: "product", ...fields });
        console.log(
          `✅ Creado: ${p.title} -> ${images.length} foto(s). Faltaron: ${
            missing.length ? missing.join(", ") : "ninguna"
          }`
        );
        continue;
      }

      // Existe -> decidir si realmente hay cambios
      const before = assetRefs(existing.images);
      const after = assetRefs(images);

      if (
        existing.title === fields.title &&
        existing.category === fields.category &&
        existing.price === fields.price &&
        existing.description === fields.description &&
        existing.available === fields.available &&
        before === after
      ) {
        console.log(`🟡 Existente (sin cambios): ${p.title}`);
        continue;
      }

      // Actualiza (reemplaza campos y las imágenes)
      await client.patch(existing._id).set(fields).commit();
      console.log(
        `♻️ Actualizado: ${p.title} -> ${images.length} foto(s). Faltaron: ${
          missing.length ? missing.join(", ") : "ninguna"
        }`
      );
    } catch (err) {
      console.log(`❌ Error con "${p.title}":`, err.message);
    }
  }

  console.log("FIN ✅");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
