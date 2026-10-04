---
title: "Aureus"
summary: "App personal de finanzas y productividad: movimientos en pesos y dólares, gastos por categoría, previsión de pagos, tareas y sesiones de foco."
problem: "Llevar los gastos, los pagos recurrentes y las tareas en apps separadas hacía difícil ver el panorama del mes."
solution: "Una sola app con el balance, los gastos del mes por categoría, los pagos pendientes y su previsión en el calendario, la cotización del dólar, una lista de tareas y un temporizador para trabajo profundo."
---

React Native sin Expo, con la nueva arquitectura, TypeScript estricto, Zustand y SQLite (op-sqlite). Todo es local, sin backend. Cada movimiento en dólares guarda la cotización de su fecha. El valor del día y el histórico salen de APIs públicas, con caché en tres niveles (memoria, SQLite y red con timeout) y valores de respaldo sin conexión.

Los pagos recurrentes (mensuales, anuales o en cuotas) generan sus pendientes de forma idempotente. Los mensuales en pesos proponen el último monto confirmado, porque con inflación es mejor estimación que el monto original. Tiene un widget nativo en Kotlin que lee las tareas desde SQLite, y el APK se publica en GitHub Releases desde CI.
