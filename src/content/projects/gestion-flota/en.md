---
title: "Fleet Manager"
summary: "App to manage a vehicle fleet: each unit's status, drivers, insurance, inspections, maintenance and fuel loads."
problem: "Each vehicle's data (insurance, inspection, maintenance, fuel) was scattered, and due dates slipped by without anyone noticing."
solution: "An app with a profile for each vehicle: its status, the person in charge, insurance and inspection due dates, maintenance history and fuel loads, which are logged by taking a photo of the pump display."
tourDescription: "Insurance is assigned to several vehicles in the fleet at once, with its company and due date. On a vehicle's page, a maintenance job is logged with its cost and attached invoice, and fuel is loaded with a photo of the pump: OCR fills in the liters and the amount. Finally, the month's fuel loads and the chart of liters per month."
---

Flutter with Riverpod and go_router, on Android and desktop. It works offline: every change is saved to SQLite first and then uploaded to Supabase. Without a connection it waits in a queue with retries, and whatever fails stays visible instead of being lost. Sync replaces the local cache in a single transaction, and Realtime triggers it when another device changes something.

Fuel loads are logged with a photo of the pump display. ML Kit recognizes the text, and a custom parser picks each value by the position and size of its line. It also checks the math (amount ≈ liters × price) and recovers the decimal point that gets lost on seven-segment displays. Insurance and inspection due dates trigger local notifications.
