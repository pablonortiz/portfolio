---
title: "Umbral Propiedades"
summary: "Sitio para una inmobiliaria: búsqueda de propiedades con filtros, ficha de cada una, tasaciones por WhatsApp y un panel para publicarlas."
problem: "La inmobiliaria dependía de portales y mensajes para mostrar sus propiedades, sin un sitio propio que pudiera actualizar sin ayuda."
solution: "Un sitio con buscador por barrio, operación, tipo, ambientes y precio, una ficha por propiedad con fotos y consulta por WhatsApp, pedido de tasación y un panel de administración para cargar y publicar propiedades."
---

SPA en React y TypeScript (Vite, Tailwind, shadcn/ui) con una API REST propia en Express, Prisma y PostgreSQL, las dos en Vercel. En el panel, las propiedades se guardan como borradores con una validación permisiva, y al publicarlas se validan con un esquema estricto de Zod.

Las fotos se suben directo a Cloudinary con una firma que genera el backend. Las funciones serverless de Vercel aceptan hasta 4,5 MB por pedido, así que el backend recibe solo las URLs. Al editar una propiedad, se borran las imágenes que quedaron sin usar. Prisma pasa por el pooler en modo transacción y usa una conexión directa solo para cambiar el esquema: sin eso, las funciones serverless fallaban con "prepared statement does not exist". El panel suma estadísticas de ventas por mes, tipo y barrio, en pesos y dólares por separado.
