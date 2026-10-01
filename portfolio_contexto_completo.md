# Contexto completo — Portfolio web de Pablo

> Documento de handoff para continuar el diseño y desarrollo del portfolio con otra IA sin perder contexto.

---

## 1. Objetivo del proyecto

El portfolio debe funcionar como **carta de presentación profesional** y servir para varios públicos al mismo tiempo:

- Recruiters y equipos técnicos.
- Personas que llegan desde CV o LinkedIn.
- Potenciales clientes que pueden no tener conocimientos técnicos.
- Personas interesadas en contratar desarrollo de software/sistemas sin saber qué significa cada tecnología.

La prioridad conceptual es que **en los primeros segundos se entienda**:

1. Quién soy.
2. Qué hago.
3. Qué tipo de software construyo.
4. Qué proyectos hice.
5. Cómo contactarme.

La web **no debe sentirse como una demo de animaciones** en la que el visitante tenga que descubrir qué hago. Las animaciones deben reforzar el mensaje, no reemplazarlo.

La lectura ideal sería:

> Pablo → qué hace → qué construye → proyectos → contacto.

La web puede tener profundidad técnica y efectos visuales, pero lo esencial debe ser comprensible incluso para una persona totalmente ajena al código.

---

## 2. Filosofía general de contenido

Se decidió estructurar la comunicación en **dos niveles de lectura** dentro del mismo portfolio.

### Capa 1 — Customer friendly

Pensada para cualquier persona.

Cada proyecto debería explicar:

- Qué problema había.
- Qué se construyó.
- Qué objetivo resolvía.
- Imágenes o video.
- Posibilidad de probarlo cuando sea viable.

Ejemplo conceptual:

> **Perfumario**  
> Una aplicación para organizar, descubrir y gestionar perfumes.  
> Problema → solución → demo → imágenes.

### Capa 2 — Técnica / developer

Para recruiters, devs o personas que quieran profundizar.

Puede incluir:

- Stack.
- Arquitectura.
- Decisiones técnicas.
- Problemas interesantes.
- Performance.
- Integraciones.
- Repositorio si corresponde.
- Casos particulares de implementación.

No se quiere construir un “portfolio para clientes” y otro “portfolio para developers”. La idea es que **el mismo proyecto tenga profundidad progresiva**.

---

## 3. Referencias visuales / brainstorming

### 3.1. Jackie Zhang

Referencia:

https://jackiezhang.co.za/?ref=killerportfolio

Idea anotada originalmente:

> **Parallax / scroll de íconos en los bordes**

Lo interesante es que SVGs / íconos decorativos laterales parecen moverse con **distintas velocidades y cierta inercia/delay** al hacer scroll.

Términos útiles:

- Scroll-linked parallax.
- Multi-layer parallax.
- Differential parallax scrolling.
- Scroll-driven animation.
- Inertial parallax.
- Spring parallax.

La intención NO es aplicar parallax a todo el contenido, sino usarlo de forma decorativa en los bordes para generar profundidad sin perjudicar la lectura.

Nombre interno sugerido:

> **Scroll-driven layered parallax with inertia**

### 3.2. Cardenas Design Group

Referencia:

https://www.cardenasdesigngroup.com/?ref=killerportfolio

Idea anotada:

> **Text lock al scrollear**

Referencia concreta:

> “We build what can’t be ignored.”

La frase queda fija / sticky / pinned en el centro mientras aparecen proyectos e imágenes alrededor al seguir bajando.

Lo valioso no es solamente el efecto: **la animación refuerza el mensaje de marca**. Los trabajos que aparecen alrededor funcionan casi como evidencia de la frase central.

Términos técnicos:

- Sticky text.
- Pinned text.
- Scroll-driven project reveal.
- Pinned section.
- Sticky storytelling.

Todavía no está decidido si va a entrar en el portfolio final, pero es una referencia fuerte a considerar.

### 3.3. Bradley Ziffer

Referencia:

https://bradleyziffer.com/?ref=killerportfolio

Idea anotada:

> **Blur en el marco del header**

Se trata de un efecto de blur / glass en la parte superior al hacer scroll.

Términos técnicos:

- Backdrop blur.
- Frosted glass header.
- Sticky header with blur.
- Scroll-triggered backdrop blur.

La idea es usarlo más como **separación visual elegante entre header y contenido** que como glassmorphism decorativo pesado.

---

## 4. Banco general de ideas

Ideas que aparecieron durante el brainstorming y que deberán clasificarse luego como mantener, adaptar, descartar o dejar como easter egg:

- UI inspirada en IDE / código.
- SVGs custom.
- Animaciones hover.
- Animaciones al scroll.
- Scroll-linked parallax.
- Elementos flotantes.
- Terminal / bash.
- Timeline.
- Música.
- Cursor custom.
- Redes: LinkedIn / GitHub / posiblemente Instagram.
- Métricas / cifras.
- CTA final tipo “¿Construimos algo?”.
- Portfolio bilingüe español / inglés.
- Diseño mobile-friendly.
- Foto personal.
- CV descargable.
- Demos interactivas de proyectos.
- Videos cuando una demo real no sea viable.
- Diferenciar lectura customer-friendly y técnica.

Importante: evitar juntar **parallax + sticky text + cursor + terminal + IDE + música + blur + varias animaciones** compitiendo simultáneamente.

Principio acordado:

> Elegir 1 o 2 recursos visuales grandes que definan la personalidad y usar el resto como detalles.

Posible jerarquía:

### Identidad principal

- Demos interactivas.
- Narrativa ligada al scroll.

### Detalles

- Blur del header.
- SVGs / parallax sutil.
- Hover animations.
- Microinteracciones.

### Easter eggs técnicos

- Terminal.
- IDE / código.
- Detalles para developers.

La idea conceptual fuerte es:

> **Superficialmente la web habla de productos; cuanto más profundizás, más habla de ingeniería.**

---

## 5. Demos de proyectos

### 5.1. Proyectos mobile

Se quiere que los proyectos mobile puedan probarse.

#### Desktop

Mostrar una demo interactiva dentro de una especie de:

> **Interactive device preview**

No llamarlo “emulador” a menos que realmente se esté ejecutando un emulador.

Visualmente puede aparecer dentro de un frame de teléfono, pero la idea es que el usuario pueda **interactuar realmente con la app**.

#### Mobile

Al tocar “Probar app”:

- abrir la demo en fullscreen o casi fullscreen;
- quitar el marco de teléfono, porque el usuario ya está en uno.

Principio conceptual:

> No decir solamente “sé hacer apps”.  
> **Dejar que la persona la pruebe.**

### 5.2. Proyectos desktop

En mobile, para demos desktop:

- sugerir girar el teléfono a apaisado;
- ofrecer una experiencia fullscreen horizontal;
- mostrar una pequeña animación de rotación.

Evitar bloquear totalmente al usuario.

Copy conceptual:

> Este proyecto está diseñado para desktop.  
> Girá tu dispositivo para probarlo mejor.

Debe existir una salida tipo:

> Ver de todas formas.

No depender de que el navegador permita forzar orientación.

---

## 6. Hero — objetivo

El Hero debe lograr en aproximadamente **5 segundos** que una persona piense:

> “Este es Pablo → desarrolla software → hace web/mobile/desktop → quiero ver sus proyectos.”

No debe intentar demostrar todavía todo el conocimiento técnico.

Las animaciones son una capa de personalidad, no la fuente primaria de información.

---

## 7. Hero — copy definido

Después de varias iteraciones, la frase preferida quedó:

> **Diseño y desarrollo software y sistemas para web, mobile y desktop.**

Razones:

- “Software” amplía el alcance.
- “Sistemas” comunica herramientas empresariales y software interno.
- “Web, mobile y desktop” deja explícitas las plataformas.
- No encierra el perfil en páginas web o apps móviles.

Esto también cubre trabajos como un sistema realizado para una empresa de insumos médicos con:

- facturación,
- registro diario de temperatura y humedad,
- limpieza,
- cartera de clientes,
- módulos de gestión,
- uso en desktop y mobile.

---

## 8. Hero — propuesta desktop

### Header

- Firma como logo.
- Selector de idioma `ES | EN`.
- Navegación simple.
- Posiblemente menú o enlaces:
  - Proyectos.
  - Sobre mí.
  - Contacto.
  - CV.

La firma funcionaría como marca personal.

Debe cumplir:

1. Verse bien pequeña.
2. Seguir siendo reconocible.
3. Funcionar en monocromo y negativo.

Si la firma real es demasiado compleja, se puede crear una versión estilizada inspirada en ella.

### Foto

- Foto PNG recortada.
- Círculo / forma detrás.
- La persona **sobresale parcialmente del círculo**.
- No copiar literalmente la referencia de otra web.
- El círculo puede:
  - ser irregular,
  - tener textura,
  - tener dos capas,
  - usar el color de acento del sistema visual.
- El círculo **no reacciona al mouse**: queda quieto.

Esta dirección está bastante aceptada.

### Texto

Propuesta conceptual:

> **Hola, soy Pablo Ortiz.**  
> Diseño y desarrollo software y sistemas para web, mobile y desktop.

Se recomendó jerarquía visual fuerte:

> Hola, soy  
> **Pablo Ortiz.**

El nombre debe tener más peso.

---

## 9. Hero — animación del texto

Idea original:

El texto se “ilumina” a velocidad de lectura, como si Pablo estuviera hablando.

Recomendación:

- No escribir letra por letra.
- El texto debe estar visible desde el inicio en menor contraste.
- La animación simplemente lo ilumina por grupos naturales.
- Duración total aproximada: **1.5–2.5 segundos**.
- Reproducir una vez.

Secuencia conceptual:

1. `Hola,`
2. `soy Pablo Ortiz.`
3. `Diseño y desarrollo`
4. `software y sistemas`
5. `para web, mobile y desktop.`

La información sigue siendo legible aunque la animación no corra.

### Implementación (decidido)

- CSS puro, sin JS. El estilo base del texto es el **estado final** (contraste completo); la animación se agrega solo dentro de `@media (prefers-reduced-motion: no-preference)`.
- Cada grupo anima de bajo contraste → base con `animation-fill-mode: backwards`: durante su delay toma el primer keyframe (apagado) y al terminar vuelve a su estilo base (encendido). Si la animación no corre por cualquier motivo, el texto se ve completo.
- El orden de cada grupo se pasa con una variable CSS (`style="--line-index: 2"`) y el delay se calcula a partir de ella.

```css
.hero-line {
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-line {
    animation: illuminate 400ms var(--ease-out) backwards;
    animation-delay: calc(var(--line-index) * 350ms);
  }
}

@keyframes illuminate {
  from {
    opacity: 0.35;
  }
}
```

Valores ilustrativos: en la implementación salen de los motion tokens (§24).

---

## 10. Hero — Web / Mobile / Desktop

La idea original era mostrar distintos “roles”.

Se discutió que:

- Software Developer.
- Mobile Developer.
- Web Developer.

se pisan semánticamente.

Se decidió que es mejor comunicar **capacidades / plataformas**:

- Web.
- Mobile.
- Desktop.

Cada una acompañada por un ícono:

- Web → globo / browser.
- Mobile → celular.
- Desktop → monitor / computadora.

Esto ayuda a las personas no técnicas a interpretar “mobile” y “desktop”.

### Composición visual

Pueden ubicarse flotando alrededor de un eje o centro visual:

```text
        Web

 Mobile     Desktop
```

o:

```text
      Desktop

 Web        Mobile
```

No deben ser una rotación tipo sistema solar rápida.

La idea es:

> **floating / orbital drift**

Movimiento lento, sutil e independiente.

### Hover en desktop

Al hacer hover:

- escala ligera (~1.05–1.1),
- más contraste,
- aparece color de acento,
- los otros elementos bajan apenas su intensidad.

Los íconos deben ser simples, preferentemente lineales, no enormes ni demasiado ilustrativos.

### Coreografía del Hero (decidido)

Principio: **una animación por vez**. Cada cosa se mueve en su momento y, en reposo, solo queda una en movimiento.

```text
t = 0s    todo visible y en su lugar; el texto en bajo contraste
0 → ~2s   el texto se ilumina por grupos (única animación)
~2s →     arranca el drift de la órbita: lento, poco recorrido.
          En reposo es lo único que se mueve.
hover     íconos de la órbita (solo desktop): escala + acento + atenúa al resto
```

Con `prefers-reduced-motion: reduce`: todo aparece en su estado final y la órbita no se mueve. El hover conserva el cambio de color/contraste pero no la escala (el color no es movimiento).

---

## 11. “Futuro ingeniero”

Se discutió incluir “futuro ingeniero” dentro de la animación de roles.

Decisión/recomendación:

> **No incluirlo en la órbita principal.**

Motivos:

- no es una plataforma ni un rol profesional equivalente;
- rompe la coherencia;
- puede sentirse autoasignado.

Puede aparecer más adelante en educación o “Sobre mí” como:

> Ingeniería en Sistemas — UTN.BA

con el estado real de la carrera.

---

## 12. Hero — CTA

Se probaron:

- Conocé qué hago.
- Conocé mis proyectos.
- Ver mis proyectos.

La opción más clara es:

> **Ver mis proyectos**

“Conocé mis proyectos” también es válida si se busca un tono un poco más cálido.

Recomendación:

- CTA real como botón.
- Flecha circular **quieta** debajo como indicador secundario de scroll (sin animación en loop).

No depender únicamente de la flecha.

---

## 13. Hero — mobile

La estructura que mejor cerró:

```text
[firma]                 [ES | EN] [menú]

Hola, soy
Pablo Ortiz.

       [foto]
   (círculo detrás)

Diseño y desarrollo
software y sistemas
para web, mobile
y desktop.

   Web   Mobile
      Desktop

[ Ver mis proyectos ]

        ↓
```

Principios:

- márgenes laterales generosos;
- no comprimir simplemente el desktop;
- foto más chica que en desktop;
- texto legible en pocas líneas;
- mantener la órbita pero compacta;
- evitar demasiadas animaciones simultáneas.

### En mobile no existe hover

Opciones:

- tap → resaltar temporalmente;
- resaltado suave automático;
- o mantenerlos simplemente flotando sin interacción.

La órbita no debe requerir interacción para entenderse.

---

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
│  ├─ index.astro
│  ├─ es/
│  └─ en/
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

### Estructura posible

```text
src/pages/
├─ index.astro
│
├─ es/
│  ├─ index.astro
│  └─ proyectos/
│     └─ [slug].astro
│
└─ en/
   ├─ index.astro
   └─ projects/
      └─ [slug].astro
```

`/` redirige a `/es`. Los prefijos y ese redirect los resuelve el i18n routing nativo de Astro (config `i18n` en `astro.config`); no se arman a mano.

### No duplicar las páginas

Evitar:

```text
es/index.astro -> 300 líneas
en/index.astro -> otras 300 líneas
```

En su lugar:

```astro
<HomePage lang="es" />
```

y:

```astro
<HomePage lang="en" />
```

Los componentes son los mismos.

Solo cambia el contenido.

### Traducciones cortas

Pueden estar centralizadas:

```ts
const translations = {
  es: {
    hero: {
      greeting: "Hola, soy",
      projects: "Ver mis proyectos",
    },
  },
  en: {
    hero: {
      greeting: "Hi, I'm",
      projects: "View my projects",
    },
  },
};
```

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

Con Tailwind v4 estos tokens se declaran una sola vez dentro de `@theme` (en `tokens.css`): de ahí salen tanto las variables CSS como las utilities. No duplicarlos en otro archivo.

Esto es especialmente útil porque **la paleta todavía no está definida**.

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

---

## 37. Estado actual del diseño

El proyecto todavía está en fase de:

> **brainstorming + arquitectura + definición de Hero**

Todavía falta:

- cerrar paleta;
- elegir tipografías;
- definir sistema visual;
- diseñar definitivamente el Hero;
- diseñar el resto de las secciones;
- decidir qué referencias visuales quedan;
- decidir estructura final de proyectos;
- crear el repo;
- definir tooling de lint/format;
- definir deployment;
- implementar.

---

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
5. Crear estructura inicial del repo.
6. Configurar:
   - Astro,
   - TypeScript,
   - Tailwind,
   - alias `@/`,
   - ESLint,
   - Prettier.
7. Crear Content Collection de proyectos.
8. Implementar i18n `/es` y `/en`.
9. Construir Hero.
10. Iterar progresivamente sobre el resto.

---

## 39. Resumen ejecutivo para otra IA

Estoy diseñando un portfolio personal moderno para usar como carta de presentación profesional, tanto con recruiters como con potenciales clientes no técnicos.

La prioridad es que cualquier visitante entienda inmediatamente quién soy, qué hago y qué proyectos construí.

El Hero actualmente se piensa con:

- firma como logo;
- foto PNG sobresaliendo parcialmente de un círculo;
- “Hola, soy Pablo Ortiz”;
- frase: **“Diseño y desarrollo software y sistemas para web, mobile y desktop.”**
- representación visual de Web, Mobile y Desktop, con íconos y flotación/orbital drift;
- texto que se ilumina con ritmo de lectura;
- CTA “Ver mis proyectos”;
- selector ES | EN.

El stack elegido es:

> **Astro + TypeScript + Tailwind CSS** (Zod vía Astro)

React y Motion se suman solo cuando una pieza los necesite. Sin GSAP inicialmente y sin state manager global inicialmente.

Arquitectura:

> **Organizado por secciones + content-driven + Astro islands**

Principios clave:

- Astro controla la aplicación.
- React solamente para interacción.
- Contenido de proyectos separado en Content Collections / MDX.
- Rutas `/es` y `/en`.
- Páginas generadas por filesystem.
- `client:*` solamente cuando una island necesita hidratación.
- Zod para boundaries/runtime.
- TypeScript para tipos internos.
- Estado local primero.
- URL para estado de navegación.
- Zustand / Nano Stores solo si más adelante aparece una necesidad real.
- No meter librerías por anticipado.
- La experiencia debe funcionar y ser clara incluso sin animaciones.

Referencias visuales principales:

- Jackie Zhang → parallax/inercia de elementos decorativos.
- Cardenas Design Group → texto sticky/pinned con proyectos alrededor.
- Bradley Ziffer → blur/frosted header al scrollear.

La intención general es:

> **Un portfolio claro para cualquiera, visualmente sofisticado, y con profundidad técnica progresiva para quien quiera explorar más.**

---

## 40. Registro de decisiones

Cambios sobre lo definido arriba, con su porqué. Las secciones afectadas ya están actualizadas.

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

---

## 41. Pendientes

Cosas postergadas a propósito, cada una con su disparador (cuándo retomarla). Al resolverse, se saca de esta lista; si implicó una decisión, queda en el registro (§40).

- [ ] **`prettier-plugin-tailwindcss` → versión estable.** Hoy usa el build `insiders` con el fix [#473](https://github.com/tailwindlabs/prettier-plugin-tailwindcss/pull/473). _Disparador:_ release estable posterior a 0.8.1 que lo incluya (`pnpm outdated` lo muestra). Al migrar, verificar que siga ordenando clases en `.astro`.
- [ ] **TypeScript 7.1.** _Disparador:_ 7.1 estable y soportado por Astro (`@astrojs/check` o el chequeo de `.astro` desde `tsc`).
- [ ] **ESLint.** _Disparador:_ la primera lógica real en TypeScript (`lib/i18n.ts`).
- [ ] **README del proyecto.** Sin roadmap: un portfolio terminado no tiene próximas versiones. _Disparador:_ terminar el portfolio. Si el repo se publica antes, un README mínimo de placeholder.
- [ ] **Espacios entre spans del texto del Hero.** Astro 7 (`compressHTML: 'jsx'`) elimina los espacios entre elementos inline: hay que separarlos con `{" "}`. _Disparador:_ implementar el texto del Hero (§9).
- [ ] **Import de `global.css` → `BaseLayout`.** Hoy está en `src/pages/index.astro`. _Disparador:_ crear `layouts/BaseLayout.astro`.
- [ ] **Favicon → firma.** Hoy es el logo de Astro. _Disparador:_ tener la firma definida.
- [ ] **Viabilidad de cada demo interactiva.** _Disparador:_ llegar a la sección de proyectos (§26).
- [ ] **CI en GitHub Actions.** Correr `check`, `format:check` y `build` en cada push: el hook de pre-commit es local y se puede saltear, CI es la garantía. _Disparador:_ publicar el repo en GitHub.
