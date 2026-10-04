---
title: "Gestor de Flota"
summary: "App para administrar una flota de vehículos: estado de cada unidad, responsables, seguros, VTV, mantenimientos y cargas de combustible."
problem: "Los datos de cada vehículo (seguro, VTV, mantenimientos, combustible) estaban dispersos, y los vencimientos se pasaban sin que nadie se diera cuenta."
solution: "Una app con la ficha de cada vehículo: su estado, el responsable, los vencimientos de seguro y VTV, el historial de mantenimientos y las cargas de combustible, que se registran sacándole una foto al display del surtidor."
---

Flutter con Riverpod y go_router, en Android y escritorio. Funciona sin conexión: cada cambio se guarda primero en SQLite y después se sube a Supabase. Sin red, queda en una cola con reintentos, y lo que falla queda a la vista en vez de perderse. La sincronización reemplaza la caché local en una sola transacción, y Realtime la dispara cuando otro dispositivo cambia algo.

La carga de combustible se hace con una foto del display del surtidor. ML Kit reconoce el texto, y un parser propio elige cada valor por la posición y el tamaño de la línea. Además valida la cuenta (importe ≈ litros × precio) y recupera el punto decimal que se pierde en los displays de 7 segmentos. Los vencimientos de seguro y VTV avisan con notificaciones locales.
