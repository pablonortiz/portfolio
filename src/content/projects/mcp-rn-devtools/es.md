---
title: "mcp-rn-devtools"
summary: "Servidor MCP que le da a Claude acceso a una app React Native en ejecución: Redux, almacenamiento, logs, errores y red, sin tocar la app."
problem: "Para diagnosticar un bug en una app React Native, un agente de IA dependía de que el dev le copiara logs, requests y el estado de la app: no podía mirarlos por su cuenta."
solution: "Un servidor MCP que se conecta a la app mientras corre y le da al agente 25 herramientas: leer el estado de Redux, AsyncStorage, logs, errores, requests y navegación, comparar el estado antes y después de una acción y esperar a que aparezca un log, sin cambiar nada en la app."
---

TypeScript sobre Node, en un monorepo con el servidor y un SDK opcional. Se conecta a Hermes por el Chrome DevTools Protocol, a través del proxy de Metro, e inyecta un agente en la app: ese agente recorre el árbol de fibras de React para encontrar el store de Redux y envuelve su `dispatch` para registrar cada acción. Así no hace falta instalar nada en la app.

Algunas piezas no fueron obvias. El `awaitPromise` de CDP no resuelve las Promises de React Native, así que la app deja cada resultado en un lugar conocido y el servidor lo consulta. Hermes admite un solo debugger: la conexión se asigna por app y dispositivo, y sigue a la sesión que la usa. Con React 19, la ubicación de un componente en el código sale de su `_debugStack`, resuelto con el source map de Metro.

Los secretos (tokens, contraseñas, JWT) se ocultan en el servidor, antes de llegar al modelo. Tiene 239 tests con vitest, incluida una integración contra un Metro y un Hermes simulados, y CI que publica en npm con cada release.
