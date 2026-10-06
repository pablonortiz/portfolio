# Próximos pasos

## 38. Próximas decisiones razonables

Sin que sean obligatorias, los siguientes pasos naturales serían:

1. ✅ Construir la sección de proyectos y la página de cada proyecto, en las fases de la §42.8.
2. ✅ Definir y construir el resto de las secciones de la home: Sobre mí (§43), Cómo trabajo (§44) y Contacto con el footer (§45).
3. Iterar progresivamente sobre el resto, y resolver los pendientes de abajo antes de publicar.

---

## 41. Pendientes

Cosas postergadas a propósito, cada una con su disparador (cuándo retomarla). Al resolverse, se saca de esta lista; si implicó una decisión, queda en el registro (§40).

- [ ] **`prettier-plugin-tailwindcss` → versión estable.** Hoy usa el build `insiders` con el fix [#473](https://github.com/tailwindlabs/prettier-plugin-tailwindcss/pull/473). _Disparador:_ release estable posterior a 0.8.1 que lo incluya (`pnpm outdated` lo muestra). Al migrar, verificar que siga ordenando clases en `.astro`.
- [ ] **TypeScript 7.1.** _Disparador:_ 7.1 estable y soportado por Astro (`@astrojs/check` o el chequeo de `.astro` desde `tsc`).
- [ ] **Foto final del Hero.** La actual es un placeholder de 512×512 (se ve blanda en pantallas retina y tiene un halo de una edición previa). La final: al menos 1500 px de alto, luz pareja, fondo liso, mirando hacia el texto (izquierda del encuadre) o a cámara; el blanco y negro se aplica después. Al cambiarla, volver a medir el LCP de la home: es la foto, y hoy da 2,2 s en mobile simulado contra el límite de 2,5 s. _Disparador:_ antes de publicar.
- [ ] **Kairos en Desktop:** la app nativa de macOS (SwiftUI) para tareas, propuesta como proyecto de Desktop. _Disparador:_ tener su clip y su recorrido.
- [ ] **La UTN en la línea de tiempo** (§43.4): Ingeniería en Sistemas, con su estado real. _Disparador:_ el examen de ingreso del 4 de diciembre.
- [ ] **Prueba con lector de pantalla** (VoiceOver en Mac, y en iPhone o Android para mobile): pestañas y paneles de proyectos, menú mobile, selectores de tema e idioma, y el orden de lectura del Hero. Hasta ahora todo se probó con teclado y Chrome headless. _Disparador:_ antes de publicar.
