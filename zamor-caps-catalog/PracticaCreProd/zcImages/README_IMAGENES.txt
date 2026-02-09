ZAMOR CAPS — Carpeta de carga masiva a Sanity
===========================================

Esta carpeta (PracticaCreProd/...) se usa SOLO como “zona de trabajo” para subir imágenes y crear productos en Sanity.

1) IMÁGENES (subida a Sanity)
-----------------------------
- Coloca aquí las imágenes .png con este formato de nombre:

  45_XX_01.png  = foto 1 (frontal)
  45_XX_02.png  = foto 2 (lateral)  (opcional)
  45_XX_03.png  = foto 3 (trasera)  (opcional)

Notas:
- 45 = precio 45000 (puede cambiar si usas otra convención)
- XX = número del producto dentro de ese precio (01, 02, 03, ...)

Luego sube las imágenes a Sanity con:
- script: uploadImages.js
- comando (ejemplo):
    export SANITY_TOKEN="..."
    node uploadImages.js "RUTA_DE_LA_CARPETA_DE_IMAGENES"

2) PRODUCTOS (archivo productos.json)
-------------------------------------
Crear/editar el archivo:
  PracticaCreProd/productos.json

Cada producto debe incluir:
- title, category, price, description, available
- image = CÓDIGO BASE DEL PRODUCTO (sin _01 y sin extensión)
  Ejemplo:
    "image": "45_02"

El import buscará automáticamente:
  45_02_01.png, 45_02_02.png, 45_02_03.png
y asociará solo las que existan (mínimo 1).

3) IMPORTAR / ACTUALIZAR EN SANITY
----------------------------------
Usar:
- script: importProducts.js

Este script NO duplica:
- si el producto ya existe (por title): lo actualiza
- si no existe: lo crea

Comando:
  export SANITY_TOKEN="skWAorwDpPVxPyY4i3pIZqOYyaNDNCXoQIJajwjqhJ3vD7rbLP3y0d608yRHeo2AtQEPJoTgaGlShnDQqKigAeRwVxDR9N5fsQmZwYc22j6AdsU4Cs5BbqBtwWTlTSqbJzHofRTskPaGX0CrEQ7aiEfX9zSAJPQGrRDsAk2kQXz9Cqr8TpAE"
  node importProducts.js

Checklist rápido
----------------
[ ] Nombres de archivos correctos (45_XX_01.png ...)
[ ] Imágenes subidas con uploadImages.js
[ ] productos.json listo con image = "45_XX"
[ ] Ejecutar importProducts.js para crear/actualizar productos
