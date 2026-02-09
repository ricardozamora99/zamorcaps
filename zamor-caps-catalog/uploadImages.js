import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "6qntx754",
  dataset: "production",
  apiVersion: "2023-10-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const imagesDir = "./PracticaCreProd/cerradasheic";

async function run() {
  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);

    if (!file.match(/\.(png|jpg|jpeg)$/i)) continue;

    // 1) Revisa si ya existe un asset con ese filename
    const existing = await client.fetch(
      `*[_type=="sanity.imageAsset" && originalFilename == $name][0]{_id, originalFilename}`,
      { name: file }
    );

    if (existing?._id) {
      console.log("↩️  Ya existe, salto:", file, "->", existing._id);
      continue;
    }

    // 2) Si no existe, lo sube
    const asset = await client.assets.upload(
      "image",
      fs.createReadStream(filePath),
      { filename: file }
    );

    console.log("✅ Subida:", asset.originalFilename, "->", asset._id);
  }

  console.log("FIN ✅");
}

run().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
