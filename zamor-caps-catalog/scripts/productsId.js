import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("❌ Missing SANITY_WRITE_TOKEN. Run: export SANITY_WRITE_TOKEN='...'");
  process.exit(1);
}

const client = createClient({
  projectId: "6qntx754",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

function parseProductIdNumber(productId) {
  // Acepta: ZC-0001, ZC-1234 (exactamente 4 dígitos)
  const m = /^ZC-(\d{4})$/.exec(String(productId || ""));
  return m ? Number(m[1]) : null;
}

async function getNextCounter() {
  // Trae TODOS los productId existentes (solo el campo) para calcular el máximo.
  // Con ~80-200 productos esto es perfecto.
  const rows = await client.fetch(`
    *[_type == "product" && defined(productId)]{ productId }
  `);

  let maxNum = 0;
  for (const r of rows) {
    const n = parseProductIdNumber(r.productId);
    if (n !== null && n > maxNum) maxNum = n;
  }

  return maxNum + 1;
}

async function assignProductIds() {
  // 1) Determinar desde qué número continuar
  let counter = await getNextCounter();
  console.log(`🔢 Siguiente ID a asignar: ZC-${String(counter).padStart(4, "0")}`);

  // 2) Buscar productos sin productId
  const products = await client.fetch(`
    *[_type == "product" && !defined(productId)] | order(_createdAt asc){
      _id
    }
  `);

  console.log(`Productos sin ID: ${products.length}`);
  if (products.length === 0) {
    console.log("✅ No hay productos pendientes. Nada que hacer.");
    return;
  }

  // 3) Asignar IDs secuenciales, continuando desde el máximo existente
  for (const product of products) {
    const productId = `ZC-${String(counter).padStart(4, "0")}`;

    await client.patch(product._id).set({ productId }).commit();

    console.log(`✔ ${product._id} → ${productId}`);
    counter++;
  }

  console.log("✅ IDs asignados sin repetir.");
}

assignProductIds().catch(console.error);
