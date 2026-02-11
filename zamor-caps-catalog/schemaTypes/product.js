// schemaTypes/product.js
export default {
  name: "product",
  title: "Productos",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },



    {
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Gorra", value: "cap" },
          { title: "Bolso", value: "bag" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: "price",
      title: "Precio (COP)",
      type: "number",
      validation: (Rule) =>
        Rule.required().min(0).error("Pon un precio válido (>= 0)"),
    },

    {
      name: "description",
      title: "Descripción (opcional)",
      type: "text",
      rows: 4,
    },

    {
      name: "images",
      title: "Fotos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1).error("Sube al menos una foto"),
    },

    {
      name: "available",
      title: "Disponible",
      type: "boolean",
      initialValue: true,
    },
        // ✅ NUEVO: ID interno propio (lo llenas con tu script)
    {
      name: "productId",
      title: "ID del producto",
      type: "string",
      description: "ID interno (ej: ZC-0001)",
      readOnly: true,
      // ❌ QUITA la validación required
     // validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "images.0",
    },
  },
};
