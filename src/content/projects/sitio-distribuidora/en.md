---
title: "Tesela Catalog"
summary: "Catalog website for a medical supplies distributor: search, categories, product pages and quote requests."
problem: "Customers (practices and clinics) asked for prices by phone or message, without seeing the full catalog or availability."
solution: "An online catalog with search, categories and product pages with price and availability, plus a quote request by form or WhatsApp that goes straight to the sales team."
tourDescription: "From the home page, the catalog is filtered by category and a product page opens, with its photos, price and availability. From there a quote is requested: the form arrives with the product already filled in, it's completed and sent, and the confirmation appears."
---

A static Astro site, with no framework JavaScript on the client. It replaced an earlier React version that had its own database: now the ERP (Tesela Management) is the single source of truth. On each build, the site reads the catalog through an Edge Function that returns only the public fields, such as availability, without stock figures. A button in the ERP republishes the site. If the read fails, the build fails, so an empty catalog is never published.

Quote requests land in an inbox in the ERP, with three anti-spam layers: a honeypot, a per-IP limit and a global hourly cap. Visit metrics are in-house and cookie-free. Each product has its own page with structured data (JSON-LD), and images are optimized at build time.
