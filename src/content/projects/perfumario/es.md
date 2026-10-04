---
title: "Perfumario"
summary: "App para el inventario de una perfumería: perfumes por marca y género, stock con alertas, búsqueda y reporte en PDF."
problem: "El stock de perfumes se controlaba a mano, y los más vendidos se quedaban sin unidades sin que nadie lo notara a tiempo."
solution: "Una app para cargar perfumes con su marca y género, sumar o restar stock en un toque, ver alertas de bajo stock, buscar y filtrar, y exportar un reporte del inventario."
tourDescription: "Se busca un perfume y se le descuentan unidades en un toque. Después se filtra por género y marca, con las alertas de bajo stock a la vista, y se carga un perfume nuevo con su marca, género y stock inicial. Al final, el reporte de inventario agrupado por género, listo para exportar en PDF."
---

Expo con expo-router, TypeScript, NativeWind y TanStack Query contra una API REST propia. Los tipos de perfumes, marcas y géneros salen de un paquete propio de esquemas en Zod. La búsqueda se hace en el servidor, con debounce. Las consultas se cachean y se invalidan al cambiar el stock. El reporte de inventario se arma como HTML agrupado por género y se exporta a PDF con expo-print para compartirlo.
