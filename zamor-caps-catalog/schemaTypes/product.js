// schemaTypes/product.js
// Este "schema" define cómo es un producto dentro de Sanity.
// Sanity lo usa para mostrar un formulario en el Studio.

export default {
  // ID interno del tipo de documento (no lo cambies después si ya hay datos)
  name: "product",

  // Nombre bonito que verás en el panel izquierdo
  title: "Productos",

  // "document" = un registro guardado en la base de datos (un producto = 1 documento)
  type: "document",

  // Campos del formulario
  fields: [
    {
      // ID interno del campo
      name: "title",
      // Nombre bonito en el formulario
      title: "Nombre",
      // Tipo de dato
      type: "string",
      // Regla: obligatorio
      validation: (Rule) => Rule.required(),
    },

    {
      name: "category",
      title: "Categoría",
      type: "string",

      // Lista de opciones para que no escriban cualquier cosa
      options: {
        list: [
          { title: "Gorra", value: "cap" },
          { title: "Bolso", value: "bag" },
        ],
        layout: "radio", // se ve como botones (radio)
      },

      // Regla: obligatorio
      validation: (Rule) => Rule.required(),
    },

    {
      name: "description",
      title: "Descripción (opcional)",
      type: "text",
      rows: 4, // tamaño del cuadro de texto
      // Sin validation => opcional
    },

    {
      name: "images",
      title: "Fotos",
      type: "array",

      // "of" define qué tipo de elementos puede tener el array
      of: [{ type: "image", options: { hotspot: true } }],

      // Regla: obligatorio y mínimo 1 foto
      validation: (Rule) =>
        Rule.required().min(1).error("Sube al menos una foto"),
    },

    {
      name: "available",
      title: "Disponible",
      type: "boolean",
      initialValue: true, // por defecto queda en "true"
    },
  ],

  // Esto controla cómo se ve cada producto en la lista (panel izquierdo)
  preview: {
    select: {
      title: "title",   // muestra el nombre
      media: "images.0" // usa la primera foto como miniatura
    },
  },
};
