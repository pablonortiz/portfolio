---
title: "tapfix"
summary: "Live QA for React Native: mark an issue by tapping the screen, and an AI agent fixes it in the code on the spot."
problem: "Reporting a visual bug meant taking a screenshot, describing where it was, finding the component in the code and only then fixing it: a slow back and forth between whoever tests and whoever codes."
solution: "The issue is marked by tapping the element on the phone, or by clicking a screenshot in a web panel. The report arrives with the component, its styles, the file and the line, and an agent fixes it in the repo, reloads the app and shows the before and after."
---

It's built on top of mcp-rn-devtools and runs in the same process: Hermes allows a single debugger, so it shares that connection instead of competing for it. It adds a local web panel, an on-disk report queue and 4 MCP tools to the core's 25.

The panel identifies the tapped element without any setup: it follows the same path as React Native's inspector to get from the point on screen to the component and its location in the code. The fixing agent is the Claude Code CLI in non-interactive mode, with a persistent session, narrowed permissions and a clean environment.

Each report is claimed for 30 minutes, so the embedded agent and a Claude Code session never fix the same thing. After each fix it runs the linter, reloads the app, goes back to the report's screen and saves the diff, which can be reverted with one click.
