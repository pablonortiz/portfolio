# Próximos pasos

## 38. Próximas decisiones razonables

Sin que sean obligatorias, los siguientes pasos naturales serían:

1. Cerrar identidad visual:
   - paleta,
   - tipografía,
   - iconografía,
   - estilo de firma,
   - círculo/foto,
   - estilo de motion.
2. Diseñar el Hero final:
   - desktop,
   - mobile,
   - animaciones,
   - copy,
   - navegación.
3. Definir las secciones de la home:
   - proyectos destacados;
   - sobre mí;
   - experiencia;
   - contacto;
   - CTA final.
4. Diseñar página de proyecto.
5. Crear Content Collection de proyectos.
6. Implementar i18n `/es` y `/en`.
7. Construir Hero.
8. Iterar progresivamente sobre el resto.

---

## 41. Pendientes

Cosas postergadas a propósito, cada una con su disparador (cuándo retomarla). Al resolverse, se saca de esta lista; si implicó una decisión, queda en el registro (§40).

- [ ] **`prettier-plugin-tailwindcss` → versión estable.** Hoy usa el build `insiders` con el fix [#473](https://github.com/tailwindlabs/prettier-plugin-tailwindcss/pull/473). _Disparador:_ release estable posterior a 0.8.1 que lo incluya (`pnpm outdated` lo muestra). Al migrar, verificar que siga ordenando clases en `.astro`.
- [ ] **TypeScript 7.1.** _Disparador:_ 7.1 estable y soportado por Astro (`@astrojs/check` o el chequeo de `.astro` desde `tsc`).
- [ ] **ESLint.** _Disparador:_ la primera lógica real en TypeScript (`lib/i18n.ts`).
- [ ] **README del proyecto.** Sin roadmap: un portfolio terminado no tiene próximas versiones. _Disparador:_ terminar el portfolio. Si el repo se publica antes, un README mínimo de placeholder. Incluir el setup para quien clone: `mise install`, `pnpm install` y `prek install` (el hook no se versiona).
- [ ] **Espacios entre spans del texto del Hero.** Astro 7 (`compressHTML: 'jsx'`) elimina los espacios entre elementos inline: hay que separarlos con `{" "}`. _Disparador:_ implementar el texto del Hero (§9).
- [ ] **Import de `global.css` → `BaseLayout`.** Hoy está en `src/pages/[lang]/index.astro`. _Disparador:_ crear `layouts/BaseLayout.astro`.
- [ ] **Favicon → firma.** Hoy es el logo de Astro. _Disparador:_ tener la firma definida.
- [ ] **Viabilidad de cada demo interactiva.** _Disparador:_ llegar a la sección de proyectos (§26).
- [ ] **CI en GitHub Actions.** Correr `check`, `format:check` y `build` en cada push: el hook de pre-commit es local y se puede saltear, CI es la garantía. _Disparador:_ publicar el repo en GitHub.
