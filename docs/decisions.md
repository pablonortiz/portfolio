# Decisiones

## 40. Registro de decisiones

Cambios sobre lo definido en el resto de `docs/`, con su porqué. Las secciones afectadas ya están actualizadas.

### 2026-09-29

- **React y Motion no se instalan de entrada** (§14, §15, §29, §35). El Hero, tal como está definido, se resuelve con CSS; hacerlo isla React con `client:load` mandaría React + react-dom + Motion en la primera pantalla para cosas que CSS ya hace. Se suman cuando una pieza lo justifique.
- **`features/` → `sections/`** (§16, §17). En FSD _feature_ significa una acción del usuario; acá las carpetas son secciones. Evita dos significados para la misma palabra.
- **Imágenes de proyectos en `src/`, no en `public/`** (§25). Lo que está en `public/` no pasa por la optimización de Astro (formatos modernos, `srcset`, dimensiones). `public/` queda para videos, CV y favicon.
- **Zod vía Astro** (§15). Astro ya lo incluye; no se instala aparte.
- **Tailwind v4 con `@theme` como única fuente de tokens** (§15, §23).
- **Demos = dummies con datos mock** (§26). Sin DB ni backend reales, sin nombres de clientes, proyectos renombrados cuando haga falta. La viabilidad técnica se evalúa proyecto por proyecto al llegar a esa etapa.

### 2026-09-30

- **El círculo detrás de la foto no reacciona al mouse** (§8). Competía con el hover de la órbita (las dos interacciones responden al mouse) y no comunica nada; la órbita sí. Conserva textura / doble capa, pero quieto.
- **Flecha de scroll quieta** (§12). La acción principal es el CTA; una flecha en loop es ruido que compite con la órbita.
- **Contenido: una carpeta por proyecto** (§18, §22). La carpeta es la clave entre idiomas y el slug compartido; slugs sin traducir (son nombres propios); imágenes compartidas por ambos idiomas; el build falla si falta un idioma. Descartado: `es/` y `en/` separados, porque las imágenes quedaban afuera y cada proyecto repartido en tres lugares.
- **URLs por idioma desde una sola función** (§22). Traduce `proyectos` ↔ `projects` y alimenta el selector y los `hreflang`. Prefijos y redirect de `/` vía i18n nativo de Astro.
- **Coreografía del Hero: una animación por vez** (§10). Texto → órbita; en reposo solo se mueve la órbita. Se respeta `prefers-reduced-motion`.
- **Animación del texto en CSS puro, con el estado final como default** (§9). Con `animation-fill-mode: backwards`, si la animación no corre el texto se ve completo.
- **Motion tokens como variables CSS** (§24, §16). Sin Motion, los presets dejan de ser un objeto TS; sale `lib/motion.ts` del árbol.

### 2026-10-01

- **TypeScript 6, no 7.** TypeScript 7 (la reescritura en Go) eliminó la API de JavaScript que usa `astro check` para revisar los `.astro`; `@astrojs/check` solo soporta `^5 || ^6`. Astro planea soportarlo desde TypeScript 7.1, que todavía no salió. **Pendiente:** migrar cuando 7.1 sea estable y Astro lo soporte.
- **`prettier-plugin-tailwindcss` en build `insiders`, fijado exacto.** La 0.8.1 no ordena clases en `.astro` con `prettier-plugin-astro` 1.x (el parser nuevo genera un árbol tipo JSX que el plugin no recorría). El fix ([#473](https://github.com/tailwindlabs/prettier-plugin-tailwindcss/pull/473)) está mergeado pero sin release estable. **Pendiente:** pasar a la primera versión estable que lo incluya.
- **Prettier con su estilo por defecto** (comillas dobles, 2 espacios, trailing commas, punto y coma).
- **Hooks de pre-commit con prek, no con pre-commit.** Corren Prettier sobre los archivos del commit y `astro check` si el commit toca código; solo chequean, no corrigen. prek es ~10x más rápido en su propio trabajo (0,01 s vs 0,10 s), pero esa no es la razón: el tiempo lo dominan Prettier y `astro check` (~1,4 s). La razón es que es un binario único manejado por mise, sin depender de Python. Usa el mismo `.pre-commit-config.yaml`, así que volver a pre-commit es cambiar una línea en `.mise.toml`. Riesgo aceptado: versión 0.x.
- **Documentación dividida en `docs/`.** El doc único (1.722 líneas) mezclaba tres tipos de contenido que cambian a ritmos distintos: referencia, registro de decisiones y pendientes. Se mantuvo la numeración § global para no romper las referencias cruzadas; se eliminaron la §37 (estado actual) y la §39 (resumen para otra IA), que habían quedado obsoletas.
- **Rutas por idioma con una ruta dinámica `[lang]`** (§16, §22), en vez de carpetas `es/` y `en/`. Un archivo por página en lugar de dos casi idénticos más un componente envoltorio, y la lista de idiomas en un solo lugar (`lib/i18n.ts`). Costo: las URLs salen de `getStaticPaths`, no se leen en el árbol de carpetas.
- **Redirect manual de `/` a `/es/`, con status 302** (§22). El automático del i18n espera 2 s antes de redirigir; el manual, 0. 302 porque el idioma por defecto es una elección, no una URL que se mudó. Pasar después a un redirect del servidor no requiere tocar páginas.
- **Tarjeta Open Graph por proyecto.** Al compartir un proyecto puntual, el preview muestra ese proyecto (nombre + captura) en vez de la portada general. Se genera al compilar; la herramienta se elige al llegar a las páginas de proyectos.
