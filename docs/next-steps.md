# Próximos pasos

## 38. Próximas decisiones razonables

Sin que sean obligatorias, los siguientes pasos naturales serían:

1. Construir la sección de proyectos y la página de cada proyecto, en las fases de la §42.8.
2. Definir y construir el resto de las secciones de la home:
   - sobre mí;
   - experiencia;
   - contacto;
   - CTA final.
3. Iterar progresivamente sobre el resto.

---

## 41. Pendientes

Cosas postergadas a propósito, cada una con su disparador (cuándo retomarla). Al resolverse, se saca de esta lista; si implicó una decisión, queda en el registro (§40).

- [ ] **`prettier-plugin-tailwindcss` → versión estable.** Hoy usa el build `insiders` con el fix [#473](https://github.com/tailwindlabs/prettier-plugin-tailwindcss/pull/473). _Disparador:_ release estable posterior a 0.8.1 que lo incluya (`pnpm outdated` lo muestra). Al migrar, verificar que siga ordenando clases en `.astro`.
- [ ] **TypeScript 7.1.** _Disparador:_ 7.1 estable y soportado por Astro (`@astrojs/check` o el chequeo de `.astro` desde `tsc`).
- [ ] **README del proyecto.** Sin roadmap: un portfolio terminado no tiene próximas versiones. _Disparador:_ terminar el portfolio. Si el repo se publica antes, un README mínimo de placeholder. Incluir el setup para quien clone: `mise install`, `pnpm install` y `prek install` (el hook no se versiona).
- [ ] **Viabilidad de cada demo interactiva.** _Disparador:_ llegar a la sección de proyectos (§26).
- [ ] **CI en GitHub Actions.** Correr `check`, `lint`, `format:check` y `build` en cada push: el hook de pre-commit es local y se puede saltear, CI es la garantía. _Disparador:_ publicar el repo en GitHub.
- [ ] **SEO con URLs absolutas: canonical, `hreflang` y Open Graph.** El canonical indica cuál es la URL oficial de cada página; los `hreflang` le dicen a los buscadores que `/es/` y `/en/` son la misma página en otro idioma. Open Graph arma el preview (título, descripción, imagen) al compartir el link en LinkedIn, WhatsApp, Slack, etc. Van en `BaseLayout`, una versión por idioma. Cada proyecto tiene su propia tarjeta (nombre + captura), generada al compilar; la home usa una general. _Disparador:_ tener el copy final del Hero, una imagen para compartir (1200×630) y el dominio definido (las URLs tienen que ser absolutas).
- [ ] **Foto final del Hero.** La actual es un placeholder de 512×512 (se ve blanda en pantallas retina y tiene un halo de una edición previa). La final: al menos 1500 px de alto, luz pareja, fondo liso, mirando hacia el texto (izquierda del encuadre) o a cámara; el blanco y negro se aplica después. _Disparador:_ antes de publicar.
- [ ] **Link al CV en la navegación.** Quedó afuera para no tener un link roto. _Disparador:_ tener el PDF del CV (uno por idioma).
- [ ] **Especificación de los videos de proyectos** (§42.7): duración, resolución, formato, peso máximo y datos inventados, para que otra IA los produzca consistentes. _Disparador:_ antes de producir el primer video (fase 4 de la §42.8).
- [ ] **Dónde alojar los videos** (§42.7): fuera de git. _Disparador:_ definir el hosting.
- [ ] **Datos reales de los proyectos.** Hoy hay 10 de ejemplo (`src/content/projects/ejemplo-*`), para construir la sección. Pablo pasa la lista real (nombre, categoría, problema, solución, stack, imágenes). _Disparador:_ antes de dar por terminada la sección de proyectos y pasar a la siguiente.
