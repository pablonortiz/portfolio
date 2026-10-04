---
title: "Forja"
summary: "Desktop system for a metalworking shop: multi-item work orders, payments, expenses, PDF reports and statistics."
problem: "The shop wrote down jobs, payments and what it was owed in notebooks and spreadsheets: it was hard to know what was pending delivery or payment."
solution: "A system to enter orders with their items and follow each one's status (in progress, awaiting payment, paid), record expenses, generate PDF reports by date or client, and see the cash position and what is still owed."
tourDescription: "A work order is entered: the client is searched for, an item is added and, when edited, marked as paid. Then a report is built by date range and client, with its preview and PDF download, and the period's statistics appear: billed, collected, expenses, cash, what's left to collect and jobs by status."
---

Electron with React and TypeScript. The UI has no access to Node (`contextIsolation` and a typed preload): everything goes through about 60 IPC handlers in the main process, with one service per entity.

It works offline: SQLite (better-sqlite3) is the source of truth, and Supabase acts as backup and sync. Each change is uploaded in the background, and a scheduled backup that was missed is recovered on startup. Sync is incremental, with soft deletes, and in a conflict the most recent write wins.

The workshop's historical data lived in an Access database. A script migrated it with mdb-reader, normalizing dates and text, all inside transactions. Reports are generated as PDF, and the Windows executable is built on GitHub Actions.
