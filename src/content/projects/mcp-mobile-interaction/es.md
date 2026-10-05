---
title: "mcp-mobile-interaction"
summary: "Servidor MCP que le da a un agente de IA manos y ojos sobre un teléfono o emulador Android o iOS: leer la pantalla, tocar, escribir y correr flujos."
problem: "Para probar una app en un teléfono, un agente de IA dependía de capturas de pantalla: lentas, caras en tokens y sin la estructura de la interfaz para saber qué tocar."
solution: "Un servidor MCP con 37 herramientas para manejar dispositivos y emuladores Android e iOS: leer la interfaz como estructura, tocar, deslizar, escribir, simular la ubicación, grabar la pantalla y correr flujos de varios pasos, sin Appium."
---

TypeScript sobre Node. Maneja los dispositivos con adb, `simctl` e idb, siempre sin pasar por una shell. En Android corre un daemon propio de 3 KB dentro del dispositivo, que mantiene abierta la conexión con UiAutomation: leer la pantalla bajó de unos 1.900 ms a 4 ms, y un flujo de 21 pasos, de 42 a 4 segundos.

Está pensado para ahorrar tokens: la interfaz vuelve como un árbol compacto, una línea por elemento (unas cuatro veces menos que en JSON); si la pantalla no cambió, responde con un hash; y las capturas, cuando hacen falta, salen reducidas. Los flujos se escriben en un subconjunto del YAML de Maestro y corren en el servidor.

Los toques son defensivos: si algo tapa el elemento, apunta a una zona libre; verifica que el texto se haya escrito; y si no encuentra lo pedido, sugiere elementos parecidos. Tiene unos 360 tests con jest, y CI que publica en npm con cada release.
