---
title: "Perfumario"
summary: "Inventory app for a perfume shop: perfumes by brand and gender, stock with alerts, search and a PDF report."
problem: "Perfume stock was tracked by hand, and best sellers ran out without anyone noticing in time."
solution: "An app to add perfumes with their brand and gender, adjust stock with a tap, get low-stock alerts, search and filter, and export an inventory report."
---

Expo with expo-router, TypeScript, NativeWind and TanStack Query against its own REST API. The types for perfumes, brands and genders come from a custom package of Zod schemas. Search runs on the server, with debounce. Queries are cached and invalidated when stock changes. The inventory report is built as HTML grouped by gender and exported to PDF with expo-print to share it.
