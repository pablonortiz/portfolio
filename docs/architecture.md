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

Hasta ahora no hizo falta: el círculo de color de la carpeta usa Web Animations del navegador, y la entrada de las tarjetas y la transición del Hero a Proyectos (§42.6) usan animaciones CSS ligadas al scroll, que en Firefox estable todavía no existen y ahí no hay animación.

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
│  ├─ navigation/
│  └─ <dominio>/   (solo cuando una pieza la usan 2+ secciones)
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
│  ├─ DocumentLayout.astro
│  └─ BaseLayout.astro
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
│  └─ i18n.ts
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

## 17. `components/` y `sections/`

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

Equivale al `shared/ui` de FSD.

### `components/navigation`

La estructura fija del sitio: Header, Footer y menús. La usan los layouts, una vez por página; no es una pieza "compartida entre secciones" (en FSD sería un widget).

### Piezas de dominio reutilizadas: `components/<dominio>/` (decidido)

**No hay una carpeta `shared/`**: en FSD, `shared` es la capa sin conocimiento del dominio (lo que acá es `components/ui`), y usar la misma palabra para "lo que se reutiliza entre secciones" le daría dos significados. Cuando una pieza con dominio la usan dos o más secciones, va a una carpeta con el nombre de **su dominio**:

```text
components/tech/TechBadge.astro      ← si la usan Proyectos y Sobre mí
components/social/SocialLinks.astro  ← si la usan el Footer y Contacto
```

Regla:

> Si realmente la usa una segunda sección → `components/<dominio>/`.

No mover componentes prematuramente “por si algún día se reutilizan”.

### UI específica dentro de una sección

Sí: cada sección puede y debe contener su UI propia.

Regla:

> Si solo tiene sentido dentro de una sección → vive dentro de esa sección.

### Estructura interna de una sección (decidido)

Todas las secciones (y `components/navigation/`) tienen la misma forma, para saber siempre dónde está cada cosa:

```text
sections/projects/
├─ ProjectsSection.astro     ← entrada: lo que importan las páginas
├─ ProjectDetail.astro       ← (otra entrada, si la sección tiene más de una)
├─ projects.texts.ts         ← textos ES/EN, compartidos por entrada y piezas
├─ ui/                       ← piezas internas (componentes)
└─ lib/                      ← lógica
```

- **El primer nivel es la API pública** de la sección; `ui/` y `lib/` son internos. Sin `index.ts` que reexporten: la regla de la carpeta ya cumple esa función.
- **Un `<script>` con lógica va a `lib/`** y el componente solo lo cablea (`import { setupX } from "../lib/x"` + `querySelectorAll(...).forEach(setupX)`). En `lib/` se separan las **funciones puras** (cuentas testeables sin navegador, ej. qué pestaña sigue con cada tecla) del **`setup…()`** que toca el DOM. Un script que es solo cableado (ej. el menú mobile: abrir, cerrar) se queda en el componente.
- **Excepción:** el script anti-destello del `<head>` es `is:inline` (tiene que correr antes del primer pintado) y un script inline no puede importar módulos.
- **Nombres:** carpetas en minúscula (`ui/`, `lib/`), componentes en PascalCase (convención de Astro), módulos `.ts` en kebab-case (`project-tabs.ts`).

---

## 18. `content/`

`content` representa **información**, no UI.

Especialmente útil para proyectos.

Estructura (decidido): **una carpeta por proyecto**, con los datos compartidos, los dos idiomas y sus imágenes adentro.

```text
src/content/projects/
├─ perfumario/
│  ├─ project.yaml   ← lo que no depende del idioma
│  ├─ es.md          ← textos en español
│  ├─ en.md          ← textos en inglés
│  └─ poster.png
└─ otro-proyecto/
   └─ ...
```

```yaml
# project.yaml
category: mobile # web | mobile | desktop | dev
order: 1 # posición dentro de su pestaña
year: 2026
stack: [react-native, expo, typescript] # ids de config/technologies.ts (validados)
poster: ./poster.png
demo: https://… # opcional: sin demo, no aparece "Probalo"
repository: https://… # opcional
fictionalBrand: true # opcional: proyecto para un cliente con nombre y datos inventados (§42.3)
tour: true # opcional: tiene recorrido (§42.5), que cada .md describe en tourDescription
```

```yaml
# project.yaml de un paquete de npm (pestaña Dev): sin póster ni video
category: dev
order: 1
year: 2026
stack: [typescript, nodejs, mcp]
npmPackage: mcp-rn-devtools # su versión y licencia se traen de npm al compilar
install: claude mcp add rn-devtools -- npx -y mcp-rn-devtools # el comando que muestra su página
repository: https://github.com/… # obligatorio: el botón "Ver en GitHub"
```

```md
---
title: Perfumario
summary: Una aplicación para descubrir y organizar perfumes. # ≤ 160 caracteres: tarjeta, descripción y Open Graph
problem: …
solution: …
tourDescription: … # si tiene recorrido: qué muestra (su alternativa en texto)
---

La capa técnica (§2): arquitectura, decisiones, problemas interesantes.
```

- El **nombre de la carpeta** es la clave que une las dos versiones y el slug en ambos idiomas (`/es/proyectos/perfumario` ↔ `/en/projects/perfumario`). El idioma sale del nombre del archivo.
- Los slugs **no se traducen**: los proyectos tienen nombre propio y los de clientes se renombran igual. Si algún día hace falta, se agrega un campo opcional en el frontmatter.
- **Lo que no depende del idioma va una sola vez en `project.yaml`**: si estuviera en cada `.md`, se duplicaría y tarde o temprano se desincronizaría.
- **`.md` y no `.mdx`**: Markdown lo entiende Astro sin instalar nada; se pasa a MDX (renombrar archivos e instalar `@astrojs/mdx`) el día que un proyecto necesite un componente dentro del texto.
- Dos colecciones en `src/content.config.ts` (`projects` para los YAML, `projectTexts` para los `.md`), validadas con Zod al compilar; `getProjects(lang)` (`lib/projects.ts`) las combina. **El build falla** si a un proyecto le falta un idioma, si la categoría no existe, si el resumen supera los 160 caracteres o si un proyecto con recorrido no lo describe.
- Agregar un proyecto = crear una carpeta.

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

**Dos capas (decidido):**

- **`DocumentLayout`:** el `<html>` y el `<head>` que comparten todas las páginas: el tema guardado, los íconos, las fuentes, los estilos globales y el router de `ClientRouter`. Recibe lo propio de cada página por el slot `head`.
- **`BaseLayout`:** usa `DocumentLayout` y le suma lo de las páginas del sitio: canonical, `hreflang`, Open Graph y el Header. La 404 usa directamente `DocumentLayout`, porque es bilingüe y no tiene SEO (§20).
- **El router va en `DocumentLayout`, después del slot `head`**, y no en `BaseLayout`: así su CSS queda detrás de `global.css`, como antes de separar las capas, y la 404 también navega con transiciones.

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

### La home scrollea por capítulos (decidido)

La página de inicio siempre queda detenida al principio de una sección, nunca entre dos (`scroll-snap-type: y mandatory` en el `<html>` de la home y `scroll-snap-align: start` en cada sección). Desde Proyectos en adelante, todo es un solo capítulo con scroll libre (ver abajo). Lo pidió Pablo: con el puntero en el medio de la pantalla, al bajar desde el Hero la carpeta de proyectos quedaba debajo del puntero antes de llegar a su lugar, y la rueda o el dedo empezaban a pasar sus páginas a medio entrar. El navegador le da el scroll al elemento con scroll más interno que está bajo el puntero, y la carpeta tiene el suyo.

- **Con el encaje, la página encaja la carpeta antes de que su lista tome el scroll**, con cualquier gesto: verificado con gestos de mouse y táctiles de 100 a 600 px, la lista nunca se movió. La carpeta viaja inclinada con el encaje y se endereza al llegar, con su propio tiempo (§42.6).
- **Es CSS nativo, sin interceptar el scroll:** teclado, rueda, trackpad y touch siguen siendo del navegador. Re Pág y Av Pág saltan de capítulo en capítulo.
- **Un gesto corto rebota al capítulo actual:** con mouse o trackpad hace falta recorrer más de la mitad de la distancia al siguiente (en 1280×800, más de ~370 px). En el celular, un deslizamiento con inercia alcanza. Es la misma regla que el encaje de páginas dentro de la carpeta (§42.2).
- **Las secciones que vienen después de Proyectos van dentro de `.home-rest`**, un solo capítulo más alto que la pantalla, que se scrollea libre por dentro (§43.3). Con un capítulo por sección, el encaje hacía saltar las animaciones ligadas al scroll de Sobre mí, y al final de una sección el comienzo de la siguiente quedaba a más de media pantalla: un gesto normal rebotaba como contra una pared. Una sección fuera de `.home` o de `.home-rest` no tiene punto de encaje, y el encaje obligatorio la salta.
- **Ningún gesto saltea el comienzo de un capítulo** (`scroll-snap-stop: always` en el Hero, en Proyectos y en `.home-rest`). El capítulo libre acepta cualquier punto como lugar para frenar, así que un gesto fuerte con el trackpad o el dedo pasaba del Hero directo a Sobre mí, o de Proyectos a la frase fija, con la primera frase ya encendida (lo vio Pablo). Al subir con fuerza desde adentro del capítulo libre, también se frena en su comienzo antes de llegar a Proyectos. Verificado en las operaciones de un solo paso: un scroll suave de 1200 a 4000 px o Av Pág frenan en el capítulo siguiente. La inercia de un trackpad o del dedo no se puede simular en Chrome headless, así que esa prueba es en el dispositivo. Arrastrar de forma continua más de una pantalla, sin soltar, sí lo pasa: ahí la página se mueve con el dedo.
  - **Adentro del capítulo libre no hay frenos por sección**, aunque una inercia fuerte desde Sobre mí pueda llegar al final de la página (Cómo trabajo queda atrás; Contacto, al final, se ve). Probado en Chrome: cualquier punto de encaje adentro (con o sin `scroll-snap-stop`, aun con la sección más alta que la pantalla) hace de imán y los gestos chicos terminan siempre en el mismo lugar; separar las secciones en capítulos hermanos frena, pero deja una pared en cada frontera (ni 8 muescas seguidas la cruzaban), también con las áreas solapadas con `scroll-margin-bottom`. Frenar la inercia con JS obligaría a cancelar el scroll, y en iOS la del dedo no se puede cancelar. Decidido con Pablo: scroll libre en toda la lectura.
- **El margen superior de las secciones (65 px, el header más su borde) se define ahí** para el encaje y para las anclas (`#proyectos`, `#sobre-mi`), en un solo lugar.
- **El footer tiene su propio punto de encaje, alineado abajo** (`scroll-snap-align: end`): está fuera del capítulo libre (fuera de `<main>`, para ser el footer de la página), y sin un punto propio el encaje obligatorio no dejaba llegar al final (§45.2).
- **Los elementos que se animan con escala tienen que mantener fijo su borde superior** (`transform-origin` arriba): Chrome calcula el punto de encaje con la caja transformada. El Hero se achica al bajar, y con el origen en el centro su capítulo quedaba 15 px corrido.
- **Solo en la home** (`html:has(.home)`): en la página de un proyecto el scroll es libre.

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
├─ [lang]/
│  ├─ index.astro        → /es/ y /en/
│  └─ [section]/
│     └─ [slug].astro    → /es/proyectos/… y /en/projects/…
├─ og/                   → las imágenes para compartir (§22)
└─ 404.astro             → /404.html
```

**La 404 es una sola página, en los dos idiomas:** Vercel sirve `404.html` para cualquier URL que no existe, sin importar el idioma. Una por idioma exigiría reescrituras (que responden 200, y Google las tomaría como páginas válidas) o generarla en el servidor. Cada idioma va en su bloque, con su `lang` y su link al inicio, lado a lado en desktop. Sin menú (es de un solo idioma), sin canonical ni Open Graph, y fuera del sitemap.

Una **ruta dinámica** por página: `getStaticPaths()` le dice a Astro, al compilar, qué versiones generar (una por idioma). La lista de idiomas vive solo en `lib/i18n.ts` (`locales`, tipo `Locale`, `defaultLocale`); `astro.config.mjs` también la importa de ahí. Para los proyectos, `getStaticPaths` genera cada proyecto con el segmento de su idioma (`proyectos` / `projects`, definidos en `routeSegments` de `config/navigation.ts`): `/es/projects/…` no existe.

Así no hay páginas duplicadas por construcción: un solo archivo por página, el idioma llega como parámetro (`lang`, tipado como `"es" | "en"`) y las secciones toman sus textos del diccionario.

### Redirect de `/`

`/` la redirige **el servidor de Vercel** (`vercel.json`), según el idioma del navegador: si el principal es inglés (el encabezado `Accept-Language` empieza con `en`), a `/en/`; cualquier otro, a `/es/`. Es temporal (`307`), así ningún navegador la recuerda si cambia la regla.

- **Antes la hacía Astro**, con una página HTML de `meta refresh` (el redirect manual de `astro.config`, sin la espera de 2 segundos del automático del i18n). Mostraba un instante una pantalla en blanco con "Redirecting to: /es/" (lo vio Pablo). Esa página sigue en el build, para `pnpm preview` y cualquier hosting sin `vercel.json`: Vercel aplica sus redirecciones antes de buscar archivos.
- **Solo mira el idioma principal:** alguien con el navegador en español que también acepta inglés va a `/es/`. Y solo aplica a `/`: los links directos (el CV, LinkedIn) siguen apuntando a `/es/` o `/en/`.

### Una URL por página y SEO (decidido)

- **Una sola URL por página:** `trailingSlash: true` en `vercel.json` redirige `/es` a `/es/` con un 308, conservando los parámetros. Los archivos (el CV, el favicon, los assets, el sitemap) no se redirigen: se probó en un deploy de preview. Los links internos ya llevan la barra final, porque salen de `getRelativeLocaleUrl`.
- **En el `<head>` de cada página** (`BaseLayout`), con las URLs absolutas de `getLocalizedUrl` (`lib/locale-url.ts`), que toma el dominio de `site` en `astro.config.mjs`:
  - el **canonical**, la URL oficial de la página, sin parámetros: `?plataforma=mobile` es la misma home con otra pestaña;
  - los **`hreflang`** `es` y `en`, que le dicen a los buscadores que las dos versiones son la misma página. La home suma `x-default` hacia `/`, que elige el idioma de quien entra; los proyectos no tienen una versión neutral;
  - **Open Graph**: título, descripción (en los proyectos, su `summary`), URL, nombre del sitio, `og:locale` (`es_AR`, por el voseo, o `en_US`) y la imagen para compartir, con `twitter:card` grande.
- **Imagen para compartir** (`lib/og-image/`): una tarjeta oscura de 1200×630 por página, generada al compilar por los endpoints de `src/pages/og/` (`/og/es.png`, `/og/es/<slug>.png`). Satori arma el SVG a partir de un árbol de cajas con flexbox, y sharp, que ya estaba por Astro, lo pasa a PNG.
  - **La home:** los textos del Hero, sin la foto, con un resplandor del color de acento donde el Hero tiene la foto.
  - **Cada proyecto, por idioma** (algunos nombres cambian): su categoría y su nombre, con el poster al lado. En los de Mobile el poster se recorta al teléfono y se suma el `summary`; en los paquetes de npm, el `summary` y `npx -y <paquete>`, el comando que ejecuta el servidor.
  - **Duplicados a mantener:** los colores del tema oscuro van en hex en `elements.ts` (Satori no lee `oklch`), y el recorte del teléfono supone la composición de los posters de Mobile (§42.7). Las fuentes van en WOFF en el repo, con sus licencias OFL, porque Satori no lee WOFF2.
- **Sitemap con `@astrojs/sitemap`:** genera `sitemap-index.xml` al compilar, con las rutas del build, y `public/robots.txt` lo declara. Sin la opción de i18n de la integración, que empareja URLs que solo difieren en el prefijo de idioma (acá los segmentos se traducen): los idiomas los declaran los `hreflang` del `<head>`.
- **Google Search Console**, con una propiedad de dominio (cubre `www` y `media.`), verificada con un registro TXT en el DNS. Ahí se cargó el sitemap.

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

Las URLs por idioma se arman en **`lib/locale-url.ts`**; ningún componente las arma a mano. `getLocalizedPath` (el selector) cambia el prefijo de idioma y traduce los segmentos (`proyectos` ↔ `projects`), porque el i18n de Astro no los traduce; `getSectionPath` y `getProjectPath` arman los links a secciones y proyectos. La misma lógica alimenta:

- el selector ES | EN, que además conserva dónde está quien visita (ver abajo);
- los `<link rel="alternate" hreflang>` del `<head>`, que le indican a los buscadores que ambas páginas son la misma en otro idioma.

**El selector conserva la sección y la pestaña** (`components/navigation/lib/language-switch.ts`): al tocarlo, el link suma al destino la pestaña de la carpeta, con el parámetro traducido (`?plataforma=mobile` ↔ `?platform=mobile`), y la sección que se está leyendo, traducida (`#sobre-mi` ↔ `#about`). La sección que se está leyendo es la última cuyo comienzo pasó el tercio superior de la pantalla. Se calcula al usarlo (click, click del medio o menú contextual) y no mientras se scrollea: actualizar la URL con el scroll ensucia el historial y pelea con el router. La posición exacta dentro de una sección no se conserva, porque los textos miden distinto en cada idioma: se llega a su comienzo. Sin JS, el link lleva al principio de la misma página en el otro idioma.

- **`config/navigation.ts` es la fuente de las secciones con ancla** (`sections`, en orden de página, con sus ids por idioma), de las que enlaza el menú (`navigationSections`) y de los nombres de los parámetros por idioma (`queryParams`). Cómo trabajo tiene ancla aunque no esté en el menú: el selector la necesita para volver a ella.

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
- **Cada color define sus dos temas a la vez** con `light-dark(claro, oscuro)`; cuál se usa lo decide `color-scheme` en `:root` (`light dark` = sigue al sistema). Si el visitante elige un tema con el botón del Header, `data-theme` en `<html>` lo fuerza y se guarda en `localStorage`.
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

--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

- **`--ease-out`** para lo que responde a una acción y tiene que sentirse inmediato: arranca rápido y frena suave (el texto del Hero, el indicador de la pestaña).
- **`--ease-in-out`** para lo que recorre una superficie y tiene que verse avanzar: arranca y termina suave (el círculo de color de la carpeta). Con `--ease-out`, un círculo que crece cubre el 75% del panel en los primeros 100 ms y no se llega a ver (§42.1).
- Las animaciones de JS (Web Animations) leen los mismos tokens con `getComputedStyle`, en vez de repetir los valores.

Si más adelante entra Motion, se define en ese momento cómo comparte estos valores.

Objetivo:

> que el portfolio tenga un lenguaje de movimiento consistente.

---

## 25. Assets de proyectos

Separar por proyecto, y según si Astro las procesa o no:

- **Imágenes** (cover, screenshots) → dentro de `src/`, junto al contenido del proyecto (estructura exacta: ver §18), referenciadas desde el frontmatter con el helper `image()` del schema. Así Astro las optimiza en build: formatos modernos (AVIF/WebP), `srcset` responsive y `width`/`height` automáticos (evita layout shift).
- **Lo que no se procesa** (PDF del CV, favicon) → `public/`, que se sirve tal cual.
- **Videos de proyectos** → fuera de git, servidos desde Cloudflare R2 en `media.pablonortiz.com` (§42.7). Los masters van en `videos/masters/` y `just encode-video <slug>` escribe lo que usa el sitio en `public/videos/<slug>/`; las dos carpetas están en `.gitignore`. El poster de cada proyecto (el último frame del clip) sí va en git, junto a su contenido, porque es la imagen que se ve sin video.

```text
videos/masters/                      ← lo que se entrega (fuera de git)
└─ perfumario-clip.mp4
public/videos/perfumario/            ← lo que genera el script (fuera de git)
├─ clip.av1.mp4
├─ clip.h264.mp4
└─ clip-start.avif
src/content/projects/perfumario/
└─ poster.png                        ← último frame del clip (en git)
```

Evitar carpetas genéricas llenas de:

```text
image1.png
final-final-2.png
```

---

## 26. Demos y deployments

Las demos no van dentro del portfolio: cada una es un deploy aparte, con su propio bundle y su propio stack, y una demo rota no afecta al sitio.

### Cómo son las demos (decidido)

- **La interfaz real de cada app, compilada para el navegador**, no una maqueta reescrita: React con Vite, Expo con su export web, Flutter con su build web. Las apps son de stacks distintos, y reescribirlas todas en React sería el camino más caro y mostraría algo que no es el código que se construyó.
- **Una versión limitada, de prueba:** solo algunos flujos, con datos ficticios en memoria, sin backend ni red. Del código original entra solo lo que usan esos flujos; la lógica compleja se reemplaza por versiones simples de prueba. Lo que se publica es el JavaScript compilado, que cualquiera puede leer: por eso lo que no está en la demo no llega a ningún lado.
- **En `demos.pablonortiz.com/<slug>/`**, desde un repo privado aparte con su propio proyecto en Vercel. Es otro origen: no comparte `localStorage` ni service workers con el portfolio, y tiene sus propias reglas: `noindex`, y una política de seguridad (CSP) que prohíbe cualquier conexión a otro origen.
- **Una envoltura común**: la página de cada demo carga la app en un iframe (`/<slug>/app/`) y le suma el marco de teléfono o de ventana (§5), el aviso de datos ficticios, sugerencias de qué probar y un botón para reiniciarla, en el idioma que recibe por `?lang=`. La app queda en su idioma original.
- **"Probalo" la abre en una pestaña nueva** (§42.5), no en un iframe dentro del portfolio.
- **Piloto con dos:** Forja (desktop) y Perfumario (mobile). Con lo que cuesten, se decide el resto.
- **Después del piloto:** Umbral Propiedades, que suma a la envoltura un marco de ventana de navegador para los sitios web, y en el celular el sitio a pantalla completa. Tesela Catálogo no tiene demo: es un sitio estático, con poco para probar más allá de filtrar el catálogo. En BeatFit, la app también toma el idioma de `?lang=`, porque ya era bilingüe. Gestor de Flota y Tesela Gestión son Flutter: pesan unos 4 MB (el motor de render, CanvasKit, son 2) y tardan más en abrir, con un indicador mientras carga. Su CSP suma `'wasm-unsafe-eval'` solo en `/<slug>/app/`, y se compilan en local porque Vercel no tiene Flutter. Aureus guarda su base SQLite en el navegador (en WebAssembly), con la misma excepción de la CSP. Onda Ceibo no transmite en vivo: cada emisora suena un audio corto compuesto para la demo, servido desde el propio dominio.
- **Cómo se conectan con el portfolio:** el campo `demo` del `project.yaml` (con barra final) hace aparecer "Probalo", y `getDemoUrl` (`lib/locale-url.ts`) le suma `?lang=` con el idioma de la página. Las demos son un proyecto aparte en Vercel (`portfolio-demos`), y no van en el sitemap: son `noindex`.

---

### El sitio: Vercel y `pablonortiz.com` (decidido)

- **Repo público en GitHub** (`pablonortiz/portfolio`): el código también es parte del portfolio. Antes del primer push se revisó el historial completo (secretos, datos de clientes, metadatos de los binarios) y se reescribió para sacar notas que no tenían que ser públicas.
- **Proyecto `portfolio` en Vercel, conectado al repo:** cada push a `main` despliega a producción, y las otras ramas y los PR, a un preview. Astro se detecta solo y la salida es estática (sin adapter).
- **CI en GitHub Actions** (`.github/workflows/ci.yml`): en cada push, a cualquier rama, corre `check`, `lint`, `format:check` y `build` en una máquina limpia, con el Node y el pnpm de `.mise.toml` (`jdx/mise-action`). No bloquea el deploy: si falla, avisa por mail y el badge del README queda en rojo. Cubre lo que el hook de pre-commit no ve: el repo entero, y los commits que se lo saltean.
- **El build usa pnpm 10 y el Node que permite `engines`** (`>=22.12.0`): sin `packageManager` en `package.json`, Vercel elige pnpm por el lockfile (versión 9) y no lee las versiones de mise (pnpm 12, Node 24). Funciona igual, pero si algún día aparece una diferencia entre local y Vercel, lo primero es fijar las dos versiones en `package.json`.
- **El dominio se compró en Cloudflare y su DNS está ahí:**
  - `pablonortiz.com` → registro A `76.76.21.21` y `www` → CNAME `cname.vercel-dns.com`, los dos en "DNS only": con el proxy de Cloudflare en el medio, Vercel no puede emitir su certificado.
  - `www.pablonortiz.com` redirige al dominio principal con un 308, conservando la ruta: una sola URL canónica.
  - HTTPS con un certificado de Let's Encrypt que emite y renueva Vercel. `http` redirige a `https`.
  - `media.pablonortiz.com` → el bucket de R2 de los videos (§42.7).
  - Un registro TXT `google-site-verification` verifica el dominio en Google Search Console (§22).
  - `demos.pablonortiz.com` → CNAME `cname.vercel-dns.com`, "DNS only": el proyecto de Vercel de las demos (§26).

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
8. **No predecir reutilización: mover a `components/<dominio>/` cuando realmente se reutiliza.**
9. **La web debe seguir siendo clara sin animaciones.**
10. **Performance también forma parte del portfolio.**
11. **Accesibilidad: WCAG 2.2 nivel AA como piso.**

### Accesibilidad (decidido)

[WCAG](https://www.w3.org/TR/WCAG22/) (_Web Content Accessibility Guidelines_) son las pautas de accesibilidad del W3C: criterios verificables con tres niveles. A es lo mínimo (sin eso, alguien no puede usar la página), AA es el objetivo habitual y el que piden las leyes que la exigen, y AAA es el más exigente. Un portfolio personal no tiene obligación legal; se adopta como estándar de calidad.

- **Todo lo nuevo cumple A y AA.** AAA cuando sale barato: el contraste del texto ya es AAA (1.4.6, §23) y las animaciones que dispara una interacción se apagan con "reducir movimiento" (2.3.3).
- **Lo que se mueve o titila solo** (empieza sin que nadie lo pida, dura más de 5 segundos y convive con otro contenido) **tiene que poder pausarse** (2.2.2, nivel A). "Reducir movimiento" no alcanza: es una preferencia del sistema, no un control en la página, y el W3C no la acepta como técnica para este criterio. Casos: el cursor de Dev titila menos de 5 segundos (§42.1), la tira de tecnologías (§42.5) y la órbita del Hero (§10) se pausan con hover, foco de teclado o tocándolas, sin botón visible (ver el riesgo en §40).
- **Cómo se verifica:** reglas de accesibilidad de ESLint en cada commit (lo estático: atributos, roles, textos alternativos), contraste medido al definir colores y pruebas con teclado de cada componente interactivo. Con lector de pantalla todavía no se probó nada (§41).
