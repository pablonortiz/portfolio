---
title: "tapfix"
summary: "QA en vivo para React Native: se marca un problema tocando la pantalla, y un agente de IA lo corrige en el código en el momento."
problem: "Reportar un bug visual era sacar una captura, describir dónde estaba, buscar el componente en el código y recién ahí corregirlo: un ida y vuelta lento entre quien prueba y quien programa."
solution: "Se marca el problema tocando el elemento en el teléfono, o con un click sobre una captura en un panel web. El reporte llega con el componente, sus estilos, el archivo y la línea, y un agente lo corrige en el repo, recarga la app y muestra el antes y el después."
---

Está construido sobre mcp-rn-devtools y corre en el mismo proceso: Hermes admite un solo debugger, así que comparte esa conexión en vez de competir por ella. Suma un panel web local, una cola de reportes en disco y 4 herramientas MCP a las 25 del núcleo.

El panel identifica el elemento tocado sin configuración: hace el mismo recorrido que el inspector de React Native para ir del punto de la pantalla al componente y a su ubicación en el código. El agente que corrige es el CLI de Claude Code en modo no interactivo, con una sesión persistente, permisos acotados y un entorno limpio.

Cada reporte se reserva por 30 minutos, así el agente embebido y una sesión de Claude Code nunca corrigen lo mismo. Después de cada corrección corre el lint, recarga la app, vuelve a la pantalla del reporte y guarda el diff, que se puede revertir con un click.
