---
title: "mcp-mobile-interaction"
summary: "An MCP server that gives an AI agent hands and eyes on an Android or iOS phone or emulator: read the screen, tap, type and run flows."
problem: "To test an app on a phone, an AI agent depended on screenshots: slow, expensive in tokens and without the interface's structure to know what to tap."
solution: "An MCP server with 37 tools to drive Android and iOS devices and emulators: read the interface as a structure, tap, swipe, type, mock the location, record the screen and run multi-step flows, without Appium."
---

TypeScript on Node. It drives the devices with adb, `simctl` and idb, never through a shell. On Android it runs its own 3 KB daemon inside the device, which keeps the connection to UiAutomation open: reading the screen went from about 1,900 ms to 4 ms, and a 21-step flow from 42 to 4 seconds.

It's built to save tokens: the interface comes back as a compact tree, one line per element (about four times less than JSON); if the screen hasn't changed, it answers with a hash; and screenshots, when needed, come out scaled down. Flows are written in a subset of Maestro's YAML and run on the server.

Taps are defensive: if something covers the element, it aims at a free spot; it checks that the text was typed; and if it can't find what was asked for, it suggests similar elements. It has about 360 tests with jest, and CI that publishes to npm on every release.
