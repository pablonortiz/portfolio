# Arquitectura

## 14. Stack tecnológico elegido

Base:

> **Astro + TypeScript + Tailwind CSS**, con Zod vía Astro (ya viene incluido).

React y Motion **no se instalan de entrada**: se suman cuando aparezca la primera pieza que realmente los necesite (ej. demos o filtros). El Hero se resuelve con CSS y, si hace falta, un `<script>` mínimo.

GSAP **NO se agrega inicialmente**.

Solo se considerará si aparece una animación compleja ligada al scroll que realmente lo justifique.

Principio:

> **CSS primero → Motion segundo → GSAP tercero.**

---

## 15. Rol de cada tecnología

### Astro

Responsable de:

- estructura,
- routing,
- contenido,
- SEO,
- HTML estático,
- layouts,
- páginas,
- generación de proyectos.

Astro debe ser el dueño del sitio.

### React

No se instala de entrada. Usar solamente en zonas interactivas reales, cuando aparezcan:

- demos;
- animaciones con estado;
- componentes complejos;
- formularios;
- UI que requiera interacción.

Principio:

> **Astro por defecto. React solo cuando exista una razón.**

### TypeScript

Responsable de:

- tipos internos;
- props;
- contratos entre componentes;
- utilidades;
- seguridad estática.

### Zod

Se decidió que sí tiene sentido incluirlo. No se instala aparte: Astro ya lo trae (`z` en Content Collections, `astro/zod` en el resto).

Regla:

> **Datos internos/controlados → TypeScript.**  
> **Datos que cruzan una frontera → Zod.**

Usos apropiados:

- Content Collections / proyectos.
- Formularios.
- Datos externos.
- APIs.
- Configuraciones.
- Search params complejos si hiciera falta.

Evitar validar con Zod props simples internas de componentes.

Cuando sea útil, derivar tipos:

```ts
const projectSchema = z.object({
  title: z.string(),
  year: z.number(),
  featured: z.boolean(),
});

type Project = z.infer<typeof projectSchema>;
```

Así Zod puede convertirse en fuente única de verdad.

### Tailwind CSS

Usar para:

- layout,
- responsive,
- spacing,
- estados,
- estructura visual.

Tailwind v4 se configura desde CSS con `@theme`, que genera a la vez las variables CSS y las utilities: es la única fuente de los design tokens (ver §23).

CSS normal sigue siendo válido para cosas especiales:

```css
.hero-orbit {
}
.project-mask {
}
.scroll-gradient {
}
```

No forzar todo a utilities gigantescas.

### Motion

No se instala de entrada. Hover, fade / reveal, pequeñas transformaciones, la órbita y la animación del Hero se resuelven con CSS.

Entra cuando CSS no alcance, por ejemplo:

- springs con física real;
- animaciones que dependen de estado;
- microinteracciones complejas.

Tiene dos APIs: `motion/react` (componentes, para piezas que ya viven en una isla React) y `motion` vanilla (funciones como `animate`, más livianas, usables desde un `<script>` de Astro sin React). Elegir según dónde viva la pieza.

### GSAP

No instalar de entrada.

Posibles casos futuros:

- text lock / pinned storytelling;
- proyectos apareciendo alrededor de una frase;
- timelines complejos;
- secuencias sincronizadas con scroll;
- secciones pinned.

---

## 16. Arquitectura general elegida

La dirección elegida es:

> **Organizado por secciones + content-driven + Astro islands**

Estructura de referencia:

```text
src/
├─ assets/
│  ├─ images/
│  ├─ icons/
│  └─ fonts/
│
├─ components/
│  ├─ ui/
│  ├─ shared/
│  └─ navigation/
│
├─ sections/
│  ├─ hero/
│  ├─ projects/
│  ├─ about/
│  └─ contact/
│
├─ content/
│  └─ projects/
│
├─ layouts/
│  ├─ BaseLayout.astro
│  └─ ProjectLayout.astro
│
├─ pages/
│  └─ [lang]/
│
├─ styles/
│  ├─ global.css
│  ├─ tokens.css
│  ├─ animations.css
│  └─ utilities.css
│
├─ lib/
│  ├─ i18n.ts
│  └─ seo.ts
│
├─ config/
│  ├─ site.ts
│  ├─ navigation.ts
│  └─ social.ts
│
└─ types/
```

No crear todas las carpetas vacías de entrada.

La arquitectura es una **dirección de crecimiento**, no un requisito de scaffolding completo.

---

## 17. `components/ui`, `components/shared` y sections

Se usa `sections/` y no `features/` para no mezclar con el significado de _feature_ en FSD (una acción del usuario): acá cada carpeta es una sección del sitio.

### `components/ui`

Componentes genéricos de diseño.

Ejemplos:

```text
Button.astro
Container.astro
SectionTitle.astro
Icon.astro
```

No deberían saber nada del dominio específico del portfolio.

### `components/shared`

Componentes reutilizados entre distintas secciones.

Ejemplos posibles:

```text
ProjectCard.astro
TechBadge.astro
SocialLinks.astro
```

Regla:

> Si realmente se reutiliza entre varias secciones → shared.

No mover componentes prematuramente “por si algún día se reutilizan”.

### UI específica dentro de una sección

Sí: cada sección puede y debe contener su UI propia.

Ejemplo:

```text
sections/
└─ projects/
   ├─ ProjectsSection.astro
   ├─ ProjectFilters.tsx
   ├─ ProjectDemo.tsx
   ├─ DeviceFrame.tsx
   ├─ projects.types.ts
   └─ projects.utils.ts
```

Regla:

> Si solo tiene sentido dentro de una sección → vive dentro de esa sección.

---

## 18. `content/`

`content` representa **información**, no UI.

Especialmente útil para proyectos.

Estructura: **una carpeta por proyecto**, con los dos idiomas y sus imágenes adentro.

```text
src/content/projects/
├─ perfumario/
│  ├─ es.mdx
│  ├─ en.mdx
│  ├─ cover.png
│  └─ screen-01.png
└─ otro-proyecto/
   └─ ...
```

- El **nombre de la carpeta** es la clave que une las dos versiones y el slug en ambos idiomas (`/es/proyectos/perfumario` ↔ `/en/projects/perfumario`). El idioma sale del nombre del archivo.
- Los slugs **no se traducen**: los proyectos tienen nombre propio y los de clientes se renombran igual. Si algún día hace falta, se agrega un campo opcional en el frontmatter.
- Las imágenes se escriben una vez y las usan ambos idiomas (`cover: ./cover.png`).
- El build falla si a un proyecto le falta un idioma: nunca se publica un link roto.
- Agregar un proyecto = crear una carpeta.

Un archivo puede tener metadata:

```md
---
title: Perfumario
year: 2026
featured: true
cover: ./cover.png

platforms:
  - mobile

stack:
  - React Native
  - Expo

summary: >
  Una aplicación para descubrir y organizar perfumes.
---
```

y debajo contenido largo en MDX.

Ventaja:

- agregar proyectos sin tocar componentes;
- separar contenido de código;
- generar páginas automáticamente;
- validarlos con schema;
- facilitar i18n;
- reutilizar data en home, detalle, filtros, SEO.

---

## 19. `components/navigation` vs `layouts/`

Se había llamado inicialmente `components/layout`, pero para evitar confusión puede llamarse:

```text
components/navigation/
```

o similar.

Ahí viven componentes como:

- Header.
- Footer.
- Navbar.
- MobileMenu.
- LanguageSwitcher.

Son **piezas visuales**.

### `layouts/`

Son esqueletos de páginas completas.

Ejemplo:

```astro
---
import Header from "@/components/navigation/Header.astro";
import Footer from "@/components/navigation/Footer.astro";

const { title } = Astro.props;
---

<html lang="es">
  <head>
    <title>{title}</title>
  </head>

  <body>
    <Header />

    <main>
      <slot />
    </main>

    <Footer />
  </body>
</html>
```

Esto sería algo como:

```text
layouts/BaseLayout.astro
```

Conceptualmente:

> `Header` = componente.  
> `BaseLayout` = estructura de una página completa.

---

## 20. `pages/`

Astro utiliza **file-based routing**.

La carpeta:

```text
src/pages/
```

define las URLs.

Ejemplos:

```text
src/pages/index.astro
```

→ `/`

```text
src/pages/about.astro
```

→ `/about`

```text
src/pages/projects/index.astro
```

→ `/projects`

### Rutas dinámicas

Para proyectos:

```text
src/pages/projects/[slug].astro
```

puede generar:

```text
/projects/perfumario
/projects/sistema-medico
/projects/otro-proyecto
```

La idea es combinar:

> **Content Collection + `[slug].astro`**

para generar automáticamente las páginas de proyectos.

---

## 21. `client:*` en Astro

Concepto central.

Un componente React dentro de Astro **no necesariamente manda JavaScript al navegador**.

Ejemplo:

```astro
<ProjectCard />
```

puede renderizarse como HTML estático.

Si necesitamos interacción:

```astro
<ProjectFilters client:load />
```

Astro “hidrata” esa isla React.

Hidratar = React toma control de ese HTML en el navegador y lo vuelve interactivo.

### Directivas importantes

#### `client:load`

Cargar JS inmediatamente.

Útil para:

- interacción importante above-the-fold;
- cosas necesarias desde el inicio.

#### `client:visible`

Cargar cuando el componente se acerca al viewport.

Útil para:

- timelines;
- demos;
- secciones lejanas;
- interacciones below-the-fold.

#### `client:idle`

Cargar cuando el navegador está libre.

Útil para cosas secundarias.

Principio:

> **No usar `client:load` para todo.**

Queremos mantener el bundle inicial pequeño.

---

## 22. i18n / rutas por idioma

Se decidió que el portfolio será bilingüe:

- español;
- inglés.

La dirección preferida es:

```text
/es
/en
```

y para proyectos:

```text
/es/proyectos/perfumario
/en/projects/perfumario
```

Ventajas:

- URLs claras;
- SEO;
- compartir versión exacta;
- navegación coherente;
- no depender de traducción JS en runtime.

### Estructura (decidido)

```text
src/pages/
└─ [lang]/
   ├─ index.astro        → /es/ y /en/
   └─ [section]/
      └─ [slug].astro    → /es/proyectos/… y /en/projects/… (pendiente)
```

Una **ruta dinámica** por página: `getStaticPaths()` le dice a Astro, al compilar, qué versiones generar (una por idioma). La lista de idiomas vive solo en `lib/i18n.ts` (`locales`, tipo `Locale`, `defaultLocale`); `astro.config.mjs` también la importa de ahí. Para los proyectos, `getStaticPaths` va a decidir qué segmento (`proyectos` / `projects`) corresponde a cada idioma.

Así no hay páginas duplicadas por construcción: un solo archivo por página, el idioma llega como parámetro (`lang`, tipado como `"es" | "en"`) y las secciones toman sus textos del diccionario.

### Redirect de `/`

`/` redirige a `/es/` con el redirect **manual** de Astro (`redirects` en `astro.config`, status 302), no con el automático del i18n (`redirectToDefaultLocale`): el automático genera una página que espera 2 segundos antes de redirigir; el manual, 0.

- Es un redirect estático (una página HTML con `meta refresh`). Con un adapter de hosting puede pasar a ser un redirect HTTP del servidor sin tocar páginas.
- Sin servidor no se puede detectar el idioma del navegador: los links del CV y LinkedIn apuntan directo a `/es/` o `/en/`.

### Traducciones cortas (decidido)

Cada sección tiene sus propios textos, **con los dos idiomas juntos**, en un archivo `*.texts.ts` dentro de su carpeta:

```ts
// sections/hero/hero.texts.ts
interface HeroTexts {
  greeting: string;
  cta: string;
}

export const heroTexts = {
  es: { greeting: "Hola, soy", cta: "Ver mis proyectos" },
  en: { greeting: "Hi, I'm", cta: "View my projects" },
} satisfies Record<Locale, HeroTexts>;
```

La sección los usa con `heroTexts[lang]`. `satisfies Record<Locale, …>` hace que no compile si a un idioma le falta un texto o le sobra uno, o si se agrega un idioma a `locales` sin traducir. Los textos del sitio en general (título y descripción) viven en `config/site.ts`.

### Contenido largo

Los proyectos deberían tener MDX separado:

```text
content/projects/perfumario/es.mdx
content/projects/perfumario/en.mdx
```

(Estructura completa en §18.)

La versión inglesa no necesita ser traducción literal; debe sonar natural.

### Selector ES | EN

Puede ser un link normal.

Ejemplo:

```text
/es/proyectos/perfumario
↕
/en/projects/perfumario
```

No necesita React.

Las URLs por idioma se arman con **una sola función en `lib/i18n.ts`**; ningún componente las arma a mano. Es la que traduce el único segmento que cambia (`proyectos` ↔ `projects`), porque el i18n de Astro no traduce segmentos. La misma función alimenta:

- el selector ES | EN;
- los `<link rel="alternate" hreflang>` del `<head>`, que le indican a los buscadores que ambas páginas son la misma en otro idioma.

---

## 23. Design tokens

Desde el inicio se quiere evitar hardcodear valores por todos lados.

Ejemplo:

```css
:root {
  --color-bg: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-muted: ...;
  --color-accent: ...;

  --space-xs: ...;
  --space-sm: ...;
  --space-md: ...;
  --space-lg: ...;

  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;
}
```

Con Tailwind v4 estos tokens se declaran una sola vez dentro de `@theme`: de ahí salen tanto las variables CSS como las utilities. No duplicarlos en otro archivo.

### Tokens actuales (decidido)

Viven en `src/styles/global.css` (se separan a `tokens.css` si el archivo crece).

| Token                                    | Uso                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------ |
| `background`, `foreground`               | fondo y texto                                                                        |
| `muted`                                  | texto secundario                                                                     |
| `border`                                 | bordes y líneas                                                                      |
| `accent`, `accent-foreground`            | violeta de marca y el texto que va encima (botones)                                  |
| `font-sans`, `font-display`, `font-mono` | Inter (texto), Bricolage Grotesque (nombre/títulos), Geist Mono (etiquetas técnicas) |
| `duration-*`, `ease-out`                 | motion tokens (§24)                                                                  |

- **Colores en OKLCH**, con los neutros teñidos de violeta (mismo matiz que el acento). OKLCH separa luminosidad de tono: el violeta del modo oscuro es el mismo, más claro.
- **Cada color define sus dos temas a la vez** con `light-dark(claro, oscuro)`; cuál se usa lo decide `color-scheme` en `:root` (`light dark` = sigue al sistema).
- **Contraste verificado (WCAG):** texto ≥ 17:1 (AAA), texto secundario, botón y acento sobre fondo ≥ 5.6:1 (AA), en claro y en oscuro.
- **Fuentes alojadas en el sitio** con la API de fuentes de Astro (proveedor Fontsource): solo los pesos usados, estilo normal, subconjunto `latin` (incluye á, é, ñ, ü, ¿, ¡). 4 archivos, 84 KB; se precargan solo Inter y Bricolage (las que se ven al primer instante). Astro genera fuentes de respaldo con métricas ajustadas: CLS 0 medido.

---

## 24. Motion tokens / presets

Evitar números mágicos de animación repetidos.

Como las animaciones son CSS (ver §14), los presets son **variables CSS en los tokens** (`tokens.css`), no un objeto TypeScript:

```css
--duration-fast: 200ms;
--duration-normal: 400ms;
--duration-slow: 800ms;

--ease-out: ...;
--ease-in-out: ...;
```

Si más adelante entra Motion, se define en ese momento cómo comparte estos valores.

Objetivo:

> que el portfolio tenga un lenguaje de movimiento consistente.

---

## 25. Assets de proyectos

Separar por proyecto, y según si Astro las procesa o no:

- **Imágenes** (cover, screenshots) → dentro de `src/`, junto al contenido del proyecto (estructura exacta: ver §18), referenciadas desde el frontmatter con el helper `image()` del schema. Así Astro las optimiza en build: formatos modernos (AVIF/WebP), `srcset` responsive y `width`/`height` automáticos (evita layout shift).
- **Lo que no se procesa** (videos, PDF del CV, favicon) → `public/`, que se sirve tal cual.

```text
public/
└─ projects/
   └─ perfumario/
      └─ demo.mp4
```

Evitar carpetas genéricas llenas de:

```text
image1.png
final-final-2.png
```

---

## 26. Demos y deployments

No meter las aplicaciones demo completas dentro del bundle del portfolio.

Preferencia:

```text
Portfolio
  ↓
ProjectDemo
  ↓
iframe / sandbox
  ↓
deployment independiente
```

Ejemplos conceptuales:

```text
demo.perfumario.com
demo.medical-system.com
```

Beneficios:

- deploys separados;
- bundles separados;
- menos acoplamiento;
- errores aislados;
- stacks independientes.

Las demos son **dummies de los proyectos reales**: sin base de datos ni backend reales, todo con datos mock, sin nombres de clientes y con el nombre del proyecto cambiado cuando haga falta. Cómo hacer interactiva cada una se evalúa proyecto por proyecto al llegar a esa etapa.

---

## 27. Base de datos / backend

No se considera necesario agregar inicialmente:

- Supabase;
- PostgreSQL;
- Firebase;
- Prisma.

No construir infraestructura para features que no existen.

Contacto puede resolverse luego con:

- mailto;
- formulario serverless;
- servicio específico.

Si aparecieran features como:

- guestbook,
- likes,
- visitas online,
- datos persistentes,

recién ahí evaluar backend.

---

## 28. Tests

No llenar el portfolio de tests “por deporte”.

Posibles unitarios:

- utils;
- i18n;
- transformaciones;
- lógica de contenido.

Posibles E2E con Playwright:

- Hero carga;
- navegación;
- cambio de idioma;
- proyecto abre;
- demo abre;
- mobile menu.

Un conjunto pequeño de E2E bien elegidos tiene más valor que cientos de tests triviales.

---

## 29. State management

Decisión actual:

> **No instalar Redux Toolkit, Zustand ni ningún state manager global de entrada.**

Porque todavía no existe un problema real que lo requiera.

Regla:

> **Estado local primero → URL cuando sea navegación → persistencia del navegador cuando corresponda → store global solamente si aparece una necesidad real.**

### Casos concretos

| Necesidad             | Solución preferida               |
| --------------------- | -------------------------------- |
| Hover de órbita       | CSS                              |
| Menú mobile           | `useState`                       |
| Demo fullscreen       | `useState`                       |
| Animación del Hero    | CSS                              |
| Idioma                | URL                              |
| Proyecto seleccionado | URL                              |
| Filtros               | URL/search params o estado local |
| Theme                 | CSS + localStorage               |
| Formulario            | estado local                     |
| Proyectos             | Content Collections              |

---

## 30. Redux Toolkit

No se recomienda para este portfolio de entrada.

Sería overengineering si el store termina siendo algo como:

```ts
{
  menuOpen: false,
  language: "es"
}
```

Se reconsideraría solamente si la web evolucionara hacia una aplicación compleja.

---

## 31. Zustand

Sí queda como herramienta posible si en algún momento aparece:

- estado compartido complejo;
- player persistente;
- experiencia interactiva global;
- varias piezas React alejadas compartiendo estado.

Pero **no instalar preventivamente**.

---

## 32. Nano Stores

Para Astro puede ser especialmente interesante si hace falta compartir estado entre **islands independientes**.

Ejemplo conceptual:

```text
          Store
         /     \
React island A  React island B
```

En un proyecto Astro las islands no viven necesariamente dentro de un único árbol React.

Por eso:

- feature React grande → Zustand puede tener sentido;
- estado global entre islands de Astro → Nano Stores puede resultar más natural.

Decidir solamente cuando aparezca el caso concreto.

---

## 33. MMKV

No usar.

MMKV tiene sentido principalmente en React Native / native storage.

En web usar según necesidad:

- localStorage;
- sessionStorage;
- IndexedDB;
- cookies.

Para algo simple como theme, `localStorage` alcanza.

---

## 34. URL como fuente de verdad

No todo cambio de UI merece estado global.

Ejemplos:

Idioma:

```text
/es
/en
```

No:

```ts
store.language = "es";
```

Filtros:

```text
/proyectos?platform=mobile
```

puede ser mejor que:

```ts
store.filters.platform = "mobile";
```

Beneficios:

- refresh conserva estado;
- back/forward funciona;
- URL compartible;
- navegación consistente.

---

## 35. Stack actual resumido

```text
Astro
  → estructura, routing, contenido, SEO

React
  → islands interactivas, cuando aparezcan (no se instala de entrada)

TypeScript
  → seguridad estática

Zod
  → validación runtime / boundaries (incluido en Astro)

Tailwind CSS
  → styling

Motion
  → animaciones que CSS no resuelva (no se instala de entrada)

CSS moderno
  → efectos cuando alcance

GSAP
  → solo si aparece una necesidad real

Estado
  → useState/useReducer por defecto
  → URL para navegación
  → localStorage para persistencia simple
  → Nano Stores/Zustand solo si hace falta
```

---

## 36. Principios arquitectónicos acordados

1. **Astro por defecto. React solo cuando haya una razón.**
2. **Componente sin estado por defecto; estado solo cuando sea necesario.**
3. **CSS primero, Motion segundo, GSAP tercero.**
4. **Datos internos → TypeScript. Datos externos/boundaries → Zod.**
5. **No instalar herramientas preventivamente.**
6. **La URL es estado cuando el concepto es navegación.**
7. **Contenido separado de UI.**
8. **No predecir reutilización: mover a shared cuando realmente se reutiliza.**
9. **La web debe seguir siendo clara sin animaciones.**
10. **Performance también forma parte del portfolio.**
