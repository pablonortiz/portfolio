---
title: "Tesela Catálogo"
summary: "Sitio con el catálogo de una distribuidora de insumos médicos: búsqueda, categorías, ficha de cada producto y pedido de cotización."
problem: "Los clientes (consultorios y clínicas) pedían precios por teléfono o mensaje, sin ver el catálogo completo ni la disponibilidad."
solution: "Un catálogo online con buscador, categorías y fichas con precio y disponibilidad, y un pedido de cotización por formulario o WhatsApp que llega directo al equipo de ventas."
tourDescription: "Desde la portada se entra al catálogo, se filtra por categoría y se abre la ficha de un producto, con sus fotos, precio y disponibilidad. Desde ahí se pide una cotización: el formulario llega con el producto ya cargado, se completa y se envía, y aparece la confirmación."
---

Sitio estático en Astro, sin JavaScript de framework en el cliente. Reemplazó a una versión anterior en React que tenía su propia base: ahora el ERP (Tesela Gestión) es la única fuente de verdad. En cada build, el sitio lee el catálogo a través de una Edge Function que devuelve solo los campos públicos, como la disponibilidad, sin las cifras de stock. Un botón del ERP vuelve a publicar el sitio. Si la lectura falla, falla el build, y nunca se publica un catálogo vacío.

Los pedidos de cotización llegan a una bandeja del ERP, con tres capas anti-spam: honeypot, límite por IP y tope global por hora. Las métricas de visitas son propias y sin cookies. Cada producto tiene su página con datos estructurados (JSON-LD), y las imágenes se optimizan en el build.
