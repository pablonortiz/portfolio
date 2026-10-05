---
title: "mcp-rn-devtools"
summary: "An MCP server that gives Claude access to a running React Native app: Redux, storage, logs, errors and network, without touching the app."
problem: "To debug a React Native app, an AI agent depended on the developer pasting in logs, requests and the app's state: it couldn't look at them on its own."
solution: "An MCP server that connects to the app while it runs and gives the agent 25 tools: read the Redux state, AsyncStorage, logs, errors, requests and navigation, compare the state before and after an action and wait for a log to show up, without changing anything in the app."
---

TypeScript on Node, in a monorepo with the server and an optional SDK. It connects to Hermes over the Chrome DevTools Protocol, through Metro's proxy, and injects an agent into the app: that agent walks React's fiber tree to find the Redux store and wraps its `dispatch` to log every action. So nothing has to be installed in the app.

Some pieces weren't obvious. CDP's `awaitPromise` doesn't resolve React Native's Promises, so the app leaves each result in a known place and the server polls it. Hermes allows a single debugger: the connection is assigned per app and device, and follows the session using it. With React 19, a component's location in the code comes from its `_debugStack`, resolved with Metro's source map.

Secrets (tokens, passwords, JWTs) are masked on the server, before they reach the model. It has 239 tests with vitest, including an integration against a simulated Metro and Hermes, and CI that publishes to npm on every release.
