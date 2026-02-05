// src/sanityClient.js
import { createClient } from "@sanity/client";

// Cliente que se conecta a TU proyecto de Sanity
export const sanity = createClient({
  projectId: "6qntx754",   // tu project ID
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,            // más rápido (solo lectura)
});
