import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("❌ Missing SANITY_WRITE_TOKEN. Usa: export SANITY_WRITE_TOKEN='...'");
  process.exit(1);
}

const client = createClient({
  projectId: "6qntx754",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function run() {
  // Trae productos que NO tienen stock definido
  const products = await client.fetch(`
    *[_type == "product" && !defined(stock)]{
      _id, available
    }
  `);

  console.log(`Productos sin stock: ${products.length}`);
  if (products.length === 0) {
    console.log("✅ Nada que actualizar.");
    return;
  }

  // Setea stock = 1 si available true, else 0
  for (const p of products) {
    const stock = p.available === false ? 0 : 1; // default 1
    await client.patch(p._id).set({ stock }).commit();
    console.log(`✔ ${p._id} → stock=${stock}`);
  }

  console.log("✅ Stock inicial asignado según available.");
}

run().catch(console.error);
