---
title: "Tesela Management"
summary: "Desktop system for a medical supplies distributor: payments and cheques, inventory, quality control and invoicing."
problem: "The distributor tracked payments, cheques, stock and invoicing across spreadsheets and separate systems: it was hard to know what was due, what was in the warehouse and what was left to invoice."
solution: "A system that brings it all together: a dashboard of upcoming payments and cheques, cheque import from Excel with automatic categorization, warehouse temperature and humidity logs, inventory, catalog and electronic invoicing."
---

A Flutter app for desktop (Windows and macOS) and Android, backed by Supabase. It's organized by feature: the UI talks to Riverpod notifiers, and these to repositories behind interfaces, which tests swap for fakes that reproduce the real shape of PostgREST responses.

Much of the logic lives in Postgres: about 70 migrations with role-based RLS, RPC functions and triggers. Stock is decremented by a transactional RPC with a row lock, because with two devices, reading and rewriting from the client lost movements.

Electronic invoicing with ARCA (Argentina's tax agency) runs in an Edge Function. It signs the access request in PKCS#7, caches the token and requests the authorization code idempotently, so a retry never duplicates or overwrites an authorized invoice. Other functions read invoices and delivery notes with OCR (Gemini), and PDF bank statements to categorize payments. The app updates itself on each platform, with CI and over 500 tests.
