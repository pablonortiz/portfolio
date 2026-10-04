---
title: "Aureus"
summary: "Personal finance and productivity app: transactions in pesos and dollars, spending by category, payment forecast, tasks and focus sessions."
problem: "Keeping expenses, recurring payments and tasks in separate apps made it hard to see the month at a glance."
solution: "A single app with the balance, the month's spending by category, pending payments and their calendar forecast, the dollar exchange rate, a task list and a deep-work timer."
---

React Native without Expo, on the New Architecture, with strict TypeScript, Zustand and SQLite (op-sqlite). Everything is local, with no backend. Each dollar transaction stores the exchange rate for its date. Today's rate and the history come from public APIs, with a three-level cache (memory, SQLite and network with a timeout) and fallback values when offline.

Recurring payments (monthly, yearly or in installments) generate their pending entries idempotently. Monthly ones in pesos suggest the last confirmed amount, because with inflation it's a better estimate than the original one. It has a native Kotlin widget that reads tasks from SQLite, and CI publishes the APK to GitHub Releases.
