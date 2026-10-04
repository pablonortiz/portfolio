---
title: "Forja"
summary: "Sistema de escritorio para un taller metalúrgico: órdenes de trabajo con varios ítems, cobros, gastos, informes en PDF y estadísticas."
problem: "El taller anotaba los trabajos, los cobros y lo que le debían en cuadernos y planillas: era difícil saber qué estaba pendiente de entrega o de pago."
solution: "Un sistema para cargar órdenes con sus ítems y seguir el estado de cada uno (en proceso, pendiente de pago, pagado), registrar gastos, generar informes en PDF por fechas o cliente y ver la caja y lo que queda por cobrar."
tourDescription: "Se carga una orden de trabajo: se busca el cliente, se agrega un ítem y, al editarlo, se marca como pagado. Después se arma un informe por rango de fechas y cliente, con su vista previa y la descarga en PDF, y se ven las estadísticas del período: lo facturado, lo cobrado, los gastos, la caja, lo que falta cobrar y los trabajos por estado."
---

Electron con React y TypeScript. La interfaz no tiene acceso a Node (`contextIsolation` y un preload tipado): todo pasa por unos 60 handlers IPC del proceso principal, con un servicio por entidad.

Funciona sin conexión: SQLite (better-sqlite3) es la fuente de verdad, y Supabase hace de respaldo y sincronización. Cada cambio se sube en segundo plano, y al arrancar se recupera el backup programado que se haya perdido. La sincronización es incremental, con borrado lógico, y ante un conflicto gana la escritura más reciente.

Los datos históricos del taller estaban en una base de Access. Un script la migró con mdb-reader, normalizando fechas y textos, todo dentro de transacciones. Los informes se generan en PDF, y el ejecutable de Windows se compila en GitHub Actions.
