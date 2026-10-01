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
- [ ] **README del proyecto.** Sin roadmap: un portfolio terminado no tiene próximas versiones. _Disparador:_ terminar el portfolio. Si el repo se publica antes, un README mínimo de placeholder. Incluir el setup para quien clone: `mise install`, `pnpm install` y `prek install` (el hook no se versiona).
- [ ] **Espacios entre spans del texto del Hero.** Astro 7 (`compressHTML: 'jsx'`) elimina los espacios entre elementos inline: hay que separarlos con `{" "}`. _Disparador:_ implementar el texto del Hero (§9).
- [ ] **Favicon → firma.** Hoy es el logo de Astro. _Disparador:_ tener la firma definida.
- [ ] **Viabilidad de cada demo interactiva.** _Disparador:_ llegar a la sección de proyectos (§26).
- [ ] **CI en GitHub Actions.** Correr `check`, `lint`, `format:check` y `build` en cada push: el hook de pre-commit es local y se puede saltear, CI es la garantía. _Disparador:_ publicar el repo en GitHub.
- [ ] **Meta tags de Open Graph.** Arman el preview (título, descripción, imagen) al compartir el link en LinkedIn, WhatsApp, Slack, etc. Van en `BaseLayout`, una versión por idioma. Cada proyecto tiene su propia tarjeta (nombre + captura), generada al compilar; la home usa una general. _Disparador:_ tener el copy final del Hero, una imagen para compartir (1200×630) y el dominio definido (las URLs tienen que ser absolutas).
- [ ] **Boceto del Hero.** Pablo tiene un diseño boceteado: pedirlo antes de diseñar o implementar el Hero y tomarlo como base, criticándolo con libertad si otra solución funciona mejor. _Disparador:_ arrancar el Hero.
