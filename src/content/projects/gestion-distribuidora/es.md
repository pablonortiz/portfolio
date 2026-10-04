---
title: "Tesela Gestión"
summary: "Sistema de escritorio para una distribuidora de insumos médicos: compromisos y cheques, inventario, control de calidad y facturación."
problem: "La distribuidora llevaba pagos, cheques, stock y facturación en planillas y sistemas separados: era difícil saber qué vencía, qué había en el depósito y qué faltaba facturar."
solution: "Un sistema que reúne todo: un panel con los compromisos y cheques por vencer, importación de cheques desde Excel con categorización automática, registro de temperatura y humedad del depósito, inventario, catálogo y facturación electrónica."
---

App Flutter para escritorio (Windows y macOS) y Android, sobre Supabase. Está organizada por feature: la interfaz habla con notifiers de Riverpod, y estos con repositorios detrás de interfaces, que en los tests se reemplazan por fakes con la forma real de las respuestas de PostgREST.

Buena parte de la lógica vive en Postgres: unas 70 migraciones con RLS por rol, funciones RPC y triggers. El stock se descuenta con una RPC transaccional con lock de fila, porque con dos dispositivos, leer y reescribir desde el cliente perdía movimientos.

La facturación electrónica con ARCA corre en una Edge Function. Firma el pedido de acceso en PKCS#7, guarda el token y pide el CAE de forma idempotente, así un reintento nunca duplica ni pisa un comprobante autorizado. Otras funciones leen facturas y remitos con OCR (Gemini) y extractos bancarios en PDF para categorizar los pagos. La app se actualiza sola en cada plataforma, con CI y más de 500 tests.
