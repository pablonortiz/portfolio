# Proyectos

## 42. Sección de proyectos

Diseño acordado a partir de dos bocetos de Pablo (la grilla y el detalle de un proyecto). Es la parte más compleja del sitio: se construye en fases (§42.8), cada una funcionando por sí sola.

### 42.1. La carpeta

Un recuadro dentro de la página, con bordes, que funciona como una **carpeta con pestañas**:

```text
 ⊛ Web │ ▯ Mobile │ ▭ Desktop │ >_ Dev
┌─────────────────────────────────────────┐
│  ┌───────────────┐   ┌───────────────┐  │
│  │   proyecto    │   │   proyecto    │  │
│  └───────────────┘   └───────────────┘  │
│  ┌───────────────┐   ┌───────────────┐  │
│  │   proyecto    │   │   proyecto    │  │
│  └───────────────┘   └───────────────┘  │
│                  • ○                    │
└─────────────────────────────────────────┘
```

- **Pestañas por plataforma** (Web, Mobile, Desktop), las mismas de la órbita del Hero, más **Dev**: herramientas internas, paquetes de npm y lo más técnico, para quien quiera profundizar ("superficialmente producto, en profundidad ingeniería", §4).
- **Cada pestaña tiene su color**, todos de la familia del violeta de marca, en orden de pestañas: Web índigo (tono 268), Mobile violeta (292), Desktop fucsia (328) y Dev un oscuro tipo terminal **en los dos temas**. Cuatro colores fuertes ajenos al violeta diluirían la identidad.
  - Fondos con croma suficiente para distinguirse (claro `oklch(94% 0.05 H)`, oscuro `oklch(23% ~0.08 H)`): con menos croma, en claro las tres eran lavandas casi iguales.
  - Contraste verificado en claro y oscuro: texto ≥ 15:1, texto secundario ≥ 5.9:1, acento ≥ 5.1:1.
  - **La carpeta es un ámbito de tema:** dentro de los paneles y la pestaña activa se redefinen los tokens semánticos (`--color-background`, `--color-foreground`, etc.) con los de la categoría activa (`data-active-category` en la carpeta). Todo lo de adentro toma los colores sin conocerlos; las pestañas inactivas quedan afuera, sobre el fondo de la página.
- **Al cambiar de pestaña:** el indicador de la pestaña activa se desliza hasta la nueva, y un **círculo del color nuevo crece desde el punto del click** hasta cubrir la carpeta. Con "reducir movimiento", el cambio es instantáneo.
  - **El indicador** es un elemento propio dentro de la barra de pestañas: JS mide la pestaña activa (`offsetLeft`, `offsetWidth`) y CSS anima la posición y el ancho con `--ease-out`. Arranca oculto y JS lo muestra ya ubicado; pasar de `display: none` a visible no dispara transiciones, así que la primera posición no se anima. Un `ResizeObserver` lo reubica si cambia el ancho de las pestañas (fuentes, rotar el teléfono). Sin JS, la pestaña activa dibuja su propia forma.
  - **El círculo** es un `clip-path: circle()` animado con Web Animations sobre el panel que entra (`lib/panel-switcher.ts`). El panel que sale queda visible e `inert` debajo hasta que el círculo lo cubre. Por eso **cada panel tiene los colores de su categoría** y no los de la activa: el que sale no cambia de color a mitad de camino. El radio es la distancia del origen a la esquina más lejana del panel. Con teclado (o "atrás" del navegador), el círculo sale del centro de la pestaña.
  - **Curva `--ease-in-out`:** con `--ease-out` el círculo cubría el 75% del panel en 100 ms y no se percibía (§24).
  - **Se descartó `document.startViewTransition`**, que fue la primera implementación. Mientras dura la transición, Chrome manda todos los clicks al `<html>`: un segundo click rápido en otra pestaña se perdía, y no hay CSS que lo evite (`pointer-events: none` en la capa no alcanza). Además, la barra de pestañas necesitaba su propio grupo para no quedar debajo del panel, una transición interrumpida podía dejar el estado a medias, y en la fase 4 iba a convivir con las de `ClientRouter`. Con el `clip-path` directo no hay capa encima de la página: los clicks, el scroll y el teclado siguen funcionando durante la animación.
  - **Estado de los paneles derivado, no acumulado:** en cada paso se recalcula entero (el seleccionado visible, el que sale visible e `inert`, el resto `hidden`), así un cambio rápido (Web → Mobile → Web) no deja restos del anterior. El `hidden` lo maneja JS: el reset de Tailwind lo fuerza con `!important`, y está bien que sea así.
- **Accesibilidad:** semántica de pestañas (se recorren con las flechas del teclado y se anuncian como pestañas).
- **La pestaña activa va en la URL** (`?plataforma=mobile` en español, `?platform=mobile` en inglés, §34): se puede compartir, y al volver de un proyecto aparece la pestaña en la que se estaba. **Cambiar de pestaña reemplaza la URL (`replaceState`) en vez de agregar una entrada al historial:** "atrás" va a la página anterior, no a la pestaña anterior. Antes cada pestaña sumaba una entrada, y con `ClientRouter` eso rompía la vuelta de un proyecto: el router ignora las entradas sin su estado, y la URL volvía a la home con el detalle todavía en pantalla. Además, recorrer cuatro pestañas obligaba a cuatro "atrás" para irse. Cambiar de pestaña requiere JS; el HTML llega con Web activa, así que lo primero que se ve no depende del script.
- **En mobile, las pestañas inactivas muestran solo el ícono** (el nombre queda para lectores de pantalla): las cuatro con nombre no entraban en 375 px y Dev quedaba afuera. Son los mismos íconos que la órbita del Hero acaba de mostrar con su nombre. Además, en mobile las pestañas llevan 12 px de padding lateral (16 en desktop) para que entren en 320 px, el ancho de referencia de WCAG para reflow (1.4.10): con 16 px, la de Desktop activa sobresalía 11 px de la carpeta. Las de solo ícono miden 42×44 px, por encima del mínimo de 24×24 para tocar (2.5.8).
- **Dev tiene estética de terminal:** fondo oscuro en los dos temas, la pestaña en monoespaciada y un cursor `_` después de "Dev" en la pestaña activa (con el `>_` del ícono se lee como un prompt). Falta su propio tipo de tarjeta: un paquete no tiene video, pero sí nombre, descripción, versión y descargas (traídas de npm al compilar), y se hace junto con los datos reales.
  - **El cursor titila 4 veces (1 s cada una) cada vez que se abre Dev y queda fijo:** lo que titila solo más de 5 segundos tiene que poder pausarse (WCAG 2.2.2, §36). Es CSS puro: la animación depende de `aria-selected`, y pasar de `display: none` a visible la reinicia. Con "reducir movimiento" no titila.
  - **La animación se declara dentro de `prefers-reduced-motion: no-preference`** en vez de apagarla dentro de `reduce`: la regla que la prende (`.project-tab[aria-selected="true"] .project-tab-cursor`) es más específica que una que la apague con un selector simple, y la primera versión seguía titilando con "reducir movimiento".
- Idea a evaluar: tocar un ícono de la órbita del Hero abre esa pestaña.

### 42.2. Páginas de proyectos (scroll snap)

Los proyectos se muestran **por páginas**, no en una grilla que se scrollea libremente: cada página es una composición completa, y el zoom (§42.4) siempre arranca desde una tarjeta entera, nunca desde una cortada a mitad de pantalla.

- **Desktop:** 2 columnas × 2 filas = 4 proyectos por página. **Mobile:** 1 columna, 2 por página.
- **Con CSS Scroll Snap, no interceptando el scroll con JS:** el área de proyectos tiene scroll propio, cada página ocupa toda el área, `scroll-snap-type: y mandatory` obliga a terminar siempre en una página y `scroll-snap-stop: always` impide saltarse páginas con un gesto fuerte. Al llegar a la última, el scroll pasa solo a la página de abajo (encadenamiento nativo). Teclado, trackpad, mouse y touch funcionan como en cualquier lado. Interceptar la rueda con JS trae los problemas clásicos: la inercia del trackpad salta páginas, se queda atrapado en la carpeta, y el teclado y los lectores de pantalla dejan de funcionar como se espera.
- **Al pasar de página, las tarjetas entran con el scroll** (`animation-timeline: view()`, solo CSS): suben 1,5 rem, pasan de 96% a 100% de tamaño y de transparentes a opacas mientras entran a la carpeta, y quedan quietas justo cuando están enteras, que es el momento del encaje. En desktop, la columna derecha arranca un poco más tarde (rango `entry 25%`) y las dos llegan juntas.
  - **Ligada al scroll y no al tiempo:** no suma demora después del encaje, se rebobina al volver y las tarjetas que ya se ven al cargar o al cambiar de pestaña están en su estado final sin hacer nada. La línea de tiempo es el scroll de la carpeta (el contenedor con scroll más cercano), no el de la página. Se descartó disparar una animación por tiempo al terminar el encaje (`scrollsnapchange` o `IntersectionObserver`): arrancaba cuando el scroll ya había terminado, se sentía tarde y necesitaba JS.
  - **Sin animación en Firefox** (todavía no soporta animaciones ligadas al scroll) **ni con "reducir movimiento"**: las tarjetas aparecen como siempre. Va dentro de `@supports (animation-timeline: view())`.
  - **Con propiedades sueltas, no con el shorthand `animation`:** el minificador del build (Lightning CSS, dentro de Vite) junta `animation` + `animation-timeline` en un solo `animation: … view()`, que Chrome rechaza entero. La animación desaparecía solo en el build: en `pnpm dev` el CSS no se minifica y andaba.
- **Indicador de página** ("1 / 2"), para que se sepa que hay más. En desktop va a la derecha de las pestañas; en mobile, debajo de la carpeta, porque al lado de las pestañas no entra con la etiqueta de Desktop. El mismo elemento cambia de celda con áreas de grid. Antes vivía dentro de cada panel, en el padding inferior (16 px), y se montaba 10 px sobre la última tarjeta. Ahora hay uno solo para la carpeta y muestra el panel activo (`setupPageIndicator(folder)`, que escucha el scroll de cada panel y el `panel-shown` de las pestañas). En mobile su línea queda reservada aunque esté vacía, para que el contenido de abajo no salte al cambiar de pestaña.
- **Sin barra de scroll visible** en la carpeta (`scrollbar-width: none`, más `::-webkit-scrollbar` para Safari viejo): el indicador de página cumple esa función. El scroll sigue funcionando igual con rueda, trackpad, teclado y touch.
- Comportamiento medido: un toque chico de rueda (120 px) rebota a la página actual y hace falta un gesto de ~media página para avanzar; Re Pág y las flechas (con foco) avanzan de a una. Probado por Pablo y aceptado.
- **Una sola grilla, sin partir la lista en el HTML:** el primer elemento de cada página es el punto de encaje (`nth-child(4n+1)` en desktop, `nth-child(2n+1)` en mobile) y las filas se completan hasta una cantidad par para que la última página también encaje arriba. Así el mismo HTML da 4 por página en desktop y 2 en mobile.
- **Tarjetas siempre 16:9, en todas las pantallas:** el alto de la fila sale del ancho (unidades `cqw`) y la carpeta mide justo dos filas, sin un alto fijo. En desktop hay un tope para que las dos filas entren debajo del header (`--pages-max-height`, que define la carpeta): cuando manda el tope (pantallas bajas como 1280×720), las tarjetas se angostan manteniendo 16:9, la izquierda pegada a la derecha de su columna y la derecha a la izquierda, para que el espacio entre ellas siga siendo el `gap`.
  - **Antes, en desktop, cada fila medía la mitad del alto de la carpeta** (`100dvh - 8rem`), y en pantallas altas la tarjeta se volvía casi cuadrada: con `object-fit: cover`, en 1920×1080 se veía el 69% del ancho del video, en 2560×1440 el 49% y en una tablet vertical el 47%. El costo del cambio: en pantallas altas la carpeta ya no ocupa todo el alto (en 1920×1080 mide ~690 px); si molesta, se ensancha el contenedor en pantallas grandes.
  - La barra de pestañas tiene un alto explícito (`--tabs-height`, 2,75 rem) porque entra en esa cuenta.
- **El margen interno de la carpeta es menor que la separación entre tarjetas** (1 rem contra 1,25 rem): con los dos iguales, la fila de la página siguiente empezaba exactamente en el borde y un redondeo la dejaba asomar 1 px.
- Soporta cualquier cantidad de proyectos por pestaña (hoy se estiman entre 4 y 8).

### 42.3. Tarjetas con video

- Cada tarjeta tiene un **clip de 3 a 5 segundos**, sin sonido (especificación en la §42.7). Los paquetes de npm no: su tarjeta muestra nombre, versión y descargas (§42.1).
- **Se reproduce una vez, sola, cuando su página de la carpeta queda a la vista, y queda quieta en el último frame.** Vuelve a reproducirse con el hover o el foco, y cuando su página vuelve a entrar. No hay loop: lo que se mueve solo más de 5 segundos tiene que poder pausarse (WCAG 2.2.2, §36), y un clip que dura menos no necesita controles.
- Mientras carga se ve su primer frame, así no hay salto cuando arranca.
- Con "reducir movimiento" o en modo ahorro de datos, la tarjeta muestra una imagen fija del último frame y no carga el video.
- **El último frame es el más visto:** queda en la tarjeta después de reproducirse y es el fondo de la página del proyecto al hacer zoom (§42.4).
- **Cómo está hecho** (`lib/card-videos.ts`, `lib/clip-sources.ts`):
  - **Dos `IntersectionObserver` por tarjeta, con la ventana como raíz.** Así lo que recorta el scroll de la carpeta cuenta como no visible, y una sola condición cubre "su página está encajada" y "la carpeta está en pantalla". Uno descarga: cuando la tarjeta empieza a entrar en la carpeta, con la carpeta a menos de media pantalla. El otro reproduce: cuando la tarjeta está entera a la vista. Al dejar de verse, el video se pausa y queda listo para repetirse.
  - **Se observan las tarjetas, no los videos:** el `<video>` está oculto (sin caja) hasta que empieza su descarga, y un elemento sin caja nunca se cruza con nada.
  - **Antes de la descarga no se pide nada**, ni el primer frame: el `poster` se asigna desde JS al empezar a cargar. Sin JS, con "reducir movimiento" o con ahorro de datos (`navigator.connection.saveData`) no hay ningún pedido a `/videos`; con la primera versión se bajaban los primeros frames de todos los proyectos al cargar la página.
  - **No se adelanta la página siguiente:** un clip de ~400 KB baja en lo que dura el encaje, y adelantarla eran 8 clips (~3 MB) apenas se llega a la carpeta en desktop. Se revisa con los masters reales.
  - **Sin campo en el contenido:** todo proyecto que no es paquete de npm tiene clip en `<projectVideosBaseUrl>/<slug>/` (`config/projects.ts`, un solo cambio al definir el hosting). Si falta el archivo, el error de la última `<source>` vuelve la tarjeta a su imagen fija: un clon sin videos o un proyecto todavía sin master no rompen nada.
  - **Dos `<source>` con el códec declarado** (`av01.0.05M.08`, `avc1.64001F`): cada navegador elige sin descargar el que no puede reproducir. `muted` y `playsinline` son obligatorios para que los navegadores (iOS sobre todo) dejen reproducir sin interacción. El video es decorativo (`aria-hidden`): el nombre del link sigue siendo el título.
- **Datos inventados** en todas las grabaciones (regla de privacidad del CLAUDE.md).
- **Todos los clips son horizontales (16:9)**, como las tarjetas, que nunca los recortan (§42.2). Los de apps mobile se graban verticales y el script los compone en horizontal: la pantalla del teléfono al centro y, a los costados, una copia agrandada y desenfocada de la misma pantalla (en tema claro, unos costados negros se veían pesados sobre las carpetas).

### 42.4. Del grid al proyecto: el zoom

- **Cada proyecto es una página real** (`/es/proyectos/<slug>`, §18 y §22): URL para compartir, SEO, su tarjeta Open Graph y el "atrás" del navegador funcionando solo.
- **Al tocar una tarjeta**, la vista hace zoom hacia ella, "entrando por la ventana" del proyecto. Se resuelve con el `<ClientRouter />` de Astro (transiciones animadas entre páginas, con `transition:name` para que la tarjeta se transforme en la página). En navegadores sin soporte nativo, como Firefox, Astro simula la animación.
- **El video queda pausado en el frame en el que se tocó** y ese frame es el fondo de la página del proyecto (`transition:persist` mantiene vivo el `<video>` entre páginas).
- **Al volver** (botón del navegador o "← Proyectos"), la animación se invierte, el video sigue desde donde estaba y se vuelve **a la misma página de proyectos** (Astro restaura el scroll de la ventana pero no el de un área interna: hay que guardarlo y restaurarlo).
- Costo asumido: `ClientRouter` hace que el sitio navegue como una SPA. Cómo se adaptó:
  - **Cada script arranca en todas las páginas con `onEveryPage(setup)`** (`lib/page-lifecycle.ts`), porque el navegador ejecuta cada módulo una sola vez. El helper le pasa a `setup` un `AbortSignal` que se aborta antes de cada cambio de página: los listeners en `window` y en media queries, y los observers, se atan a él y no se acumulan (verificado: un solo `resize` en `window` después de cuatro idas y vueltas). Los listeners en elementos de la página no lo necesitan, porque desaparecen con ella.
  - **El tema se vuelve a aplicar en `astro:after-swap`:** el router reemplaza los atributos del `<html>` por los de la página nueva, y con eso se perdía `data-theme`. El script del `<head>` corre una sola vez (el router no repite un script que ya corrió), así que el listener no se duplica.
  - **Los clips se silencian desde JS** (`video.muted = true`): el router arma la página nueva con `DOMParser`, y en esos videos el atributo `muted` no silencia. Sin silenciar, el navegador bloquea `play()` y los clips no arrancaban después de navegar.

**Notas de implementación**, validadas en la prueba técnica de la fase 0:

- **El video que viaja conserva los atributos de la página de origen**, incluida la marca de aislamiento de estilos de Astro. Se le da estilo desde un contenedor propio de cada página, con el selector liberado: `.contenedor :global(video)`; Astro aísla cada parte del selector, así que `.contenedor video` no encuentra un video que vino de otra página.
- **`transition:name` va en los contenedores** (el recuadro de la tarjeta y el fondo del detalle), **`transition:persist` en el video** que viaja adentro. Los dos en el mismo elemento rompen el zoom: el nombre de transición depende de una regla de la página de origen que desaparece al navegar, y queda un fundido.
- **Los listeners en `document` sobreviven a la página** con `ClientRouter`: se sacan en `astro:before-swap` (pasó con el Esc del detalle, que seguía activo en la grilla).
- **El scroll de la carpeta no lo restaura Astro** (solo el de la ventana): se guarda en `sessionStorage` al tocar una tarjeta y se restaura en `astro:page-load`.
- Al volver, solo sigue el video que se tocó; los demás arrancan de nuevo. Y volver a la home vuelve a montar el Hero, cuya animación se repite (fuera de pantalla, porque se vuelve scrolleado a la carpeta).

### 42.5. Página de un proyecto

```text
┌──────────────────────────────────────────────┐
│ ← Proyectos          Nombre del proyecto     │
│                                              │
│  Problemática                ┌────────────┐  │
│  ~~~~~~~~~~~~~~              │   video    │  │
│  ~~~~~~~~~~~~~~              │     ▷      │  │
│                              └────────────┘  │
│  Se construyó…                 Probalo ↗     │
│  ~~~~~~~~~~~~~~                              │
│                                              │
│  Tecnologías: React · Jest · Tailwind → → →  │
└──────────────────────────────────────────────┘
   fondo: el frame del video en el que se tocó
```

- A la izquierda, el problema, lo que se construyó y, debajo, **la capa técnica** (el cuerpo del Markdown, "en profundidad", §2). A la derecha, **el recorrido** (§42.7), si el proyecto tiene uno: un video de 30 a 90 segundos con todos los controles (pantalla completa, avanzar, retroceder), que arranca solo cuando el visitante lo pone. Sin recorrido, la imagen fija del proyecto.
- **En desktop (desde 48rem), la página entra en la pantalla:** mide exactamente el alto disponible debajo del header, con cuatro áreas de grid (encabezado, texto, imagen, tecnologías). Si el texto no entra, scrollea su columna, no la página.
  - **Un degradé en el borde inferior de la columna avisa que hay más** y desaparece al llegar al final. Es una animación ligada al scroll de la propia columna (`scroll(self)`) que mueve una variable registrada con `@property`. Si no hay nada que scrollear, la línea de tiempo queda inactiva y no hay degradé. En Firefox no hay degradé.
  - **La columna se puede scrollear con teclado:** `tabindex="0"`, `role="region"` y un nombre ("Descripción del proyecto"). Chrome hace enfocables solos a los contenedores con scroll, Safari no. La regla de ESLint que prohíbe `tabindex` en elementos no interactivos admite el rol `region` (config del proyecto).
- **En mobile, la página scrollea normal:** primero el título, la imagen y "Probalo", después los textos. El HTML conserva el orden de lectura (texto antes que imagen) y el grid lo reordena. Forzar una pantalla habría dejado una columna de texto de ~250 px con scroll propio dentro de una página táctil.
- **Fondo:** la imagen del último frame (en el commit del zoom, el video que viaja desde la tarjeta), fija detrás de toda la página, agrandada un 10% para que el desenfoque no deje bordes, desenfocada y con un velo del color de fondo del tema: en claro aclara, en oscuro oscurece. **El velo es del 88%**, el mínimo que deja el texto secundario en 4,5:1 o más con un frame blanco o negro puro detrás, en los dos temas: medido, 4,9:1 en el peor caso (el texto principal, de 13,6:1 para arriba). Con 80%, el secundario bajaba a 4:1.
- **Tecnologías en una línea:** hasta la tira que se mueve (fase 5), una lista que scrollea de costado si no entra.
- **"Probalo"**: lleva a la demo (§5, §26), solo si el proyecto tiene una.
- **"← Proyectos"** arriba a la izquierda; Esc también vuelve.
- **Tira de tecnologías:** se mueve sola hacia la derecha en loop infinito y se puede arrastrar hacia adelante o hacia atrás. Se pausa con el hover o el foco; con "reducir movimiento" es una lista quieta; las copias que se repiten para el loop quedan ocultas para los lectores de pantalla.
  - **Necesita una pausa que ande también en touch** (WCAG 2.2.2, §36): el hover no existe en una pantalla táctil y el foco no es una forma evidente de pausar. La opción segura es un botón de pausa visible; se define en la fase 5.

### 42.6. Transición del Hero a Proyectos

- **La carpeta sube desde abajo y se "abre" a medida que se scrollea**, siguiendo el scroll (también al tocar la flecha del Hero).
- **Sin bloquear el scroll** (scroll-jacking): la animación sigue al scroll, el control lo tiene quien visita.
- Las animaciones de CSS ligadas al scroll no andan en Firefox, así que va con JS. Candidatas: `scroll()` de Motion (versión sin React) o GSAP ScrollTrigger (§15). Se decide con prototipos.

### 42.7. Videos

Especificación para quien produce los videos (otra IA). Está escrita para poder pasarse tal cual: no hace falta leer el resto de este documento.

Los videos no se guardan en git (cada uno quedaría para siempre en el historial): van a un almacenamiento aparte, a decidir junto con el hosting. Mientras tanto, el sitio usa placeholders generados por un script.

#### Dos piezas por proyecto

|               | Clip de tarjeta                                            | Recorrido                                     |
| ------------- | ---------------------------------------------------------- | --------------------------------------------- |
| ¿Obligatorio? | Sí, salvo en los paquetes de npm (sin video, §42.1)        | No: solo en los que lo amerite                |
| Duración      | De 3 a 5 segundos (máximo 5,0)                             | De 30 a 90 segundos                           |
| Dónde se ve   | En la tarjeta del proyecto y como fondo de su página       | En un reproductor con controles, en su página |
| Reproducción  | Sola, una vez, sin sonido; queda quieto en el último frame | La inicia el visitante                        |

El clip dura 5 segundos como máximo por una norma de accesibilidad: lo que se mueve solo más tiempo tiene que poder pausarse, y una tarjeta con controles de video sería ruido.

#### Qué se entrega (el master)

- **Web y desktop:** 1920×1080 (16:9), 30 fps constantes.
- **Apps mobile:** la grabación vertical de la pantalla del teléfono, a su resolución nativa (al menos 1080 px de ancho), 30 fps constantes. No hace falta componerla en horizontal: lo hace el script.
- **Formato:** MP4 con H.264 de bitrate alto (20 Mbps o más) o ProRes 422. Sin audio; si trae, se descarta.
- **Nombres:** `<slug>-clip.mp4` y `<slug>-tour.mp4`, donde `<slug>` es el nombre de la carpeta del proyecto (por ejemplo, `ejemplo-web-1`).

#### Cómo tiene que ser el clip

- **Una acción y su resultado.** Por ejemplo: filtrar una lista y ver qué queda, completar un formulario y ver la confirmación, abrir un detalle.
- **Primer frame:** el estado inicial, prolijo y ya en la pantalla donde pasa la acción (sin cargas, sin splash, sin login).
- **Último medio segundo o más:** quieto en el resultado. Es el frame más importante: queda en la tarjeta después de reproducirse y es el fondo de la página del proyecto.
- **Una sola toma:** sin cortes, fundidos ni transiciones. Como mucho, un zoom lento hacia la zona de la acción si la interfaz queda chica.
- **Velocidad real** o apenas acelerada (hasta 1,5×), sin saltos.
- **Web y desktop:** solo el contenido de la app, sin la barra del navegador, el escritorio ni el dock. Puntero visible, con movimiento suave.
- **Mobile:** solo la pantalla, sin marco de dispositivo. Cada toque marcado con un círculo semitransparente.
- **Zona reservada:** abajo a la izquierda (el 60% del ancho y el 30% del alto) va la etiqueta con el nombre del proyecto. Ahí no puede quedar nada importante. El resto del cuadro se ve siempre entero: las tarjetas son 16:9 y no recortan.
- **Sin texto sobreimpreso,** subtítulos, logos ni marcas de agua. El idioma de la interfaz es el que tenga el producto; como no hay textos agregados, no hay nada que traducir.
- **Tema claro u oscuro:** el que mejor muestre la app, el mismo en el clip y en el recorrido.

#### Cómo tiene que ser el recorrido

- Las funciones principales, de 30 a 90 segundos. Se permiten cortes simples entre escenas, sin transiciones llamativas.
- El mismo encuadre, puntero, marcas de toque y datos que el clip. Sin audio.

#### Datos inventados (obligatorio)

- **Todo lo que aparece en pantalla es ficticio:** nombres de personas, mails, teléfonos, direcciones, documentos, importes y empresas.
- **El proyecto lleva el nombre que tiene en el portfolio,** no el real. Sin nombres ni logos de clientes, ni colores de marca que los identifiquen.
- **Sin fotos de personas reales:** avatares ilustrados o con iniciales.
- **Sin datos del entorno:** URLs o dominios del cliente, tokens, IDs internos.
- **Datos creíbles,** no "test", "asdf" ni "Lorem ipsum": tiene que parecer un producto en uso. Los mismos en el clip y en el recorrido.

#### Lo que hace el script (y no hace falta entregar)

`just encode-video <slug>` toma los masters de `videos/masters/` y genera en `public/videos/<slug>/` todo lo que usa el sitio, siempre con los mismos parámetros (estructura en la §25):

- **Valida** la duración (clip de 5,0 s como máximo) y la proporción.
- **Compone los clips de mobile en 16:9:** la pantalla al centro, al 86% del alto y con esquinas redondeadas; a los costados, una copia agrandada, desenfocada y levemente oscurecida de la misma pantalla.
- **Codifica el clip a 1280×720** en AV1 (el formato más liviano) y en H.264 (Safari decodifica AV1 solo con soporte por hardware, desde el iPhone 15 Pro y los Mac con M3), sin pista de audio. Peso objetivo: 400 KB en AV1, a confirmar con los primeros masters reales.
- **Codifica el recorrido a 1920×1080** en AV1 y H.264.
- **Extrae dos imágenes del clip:** el primer frame (se ve mientras el video carga) y el último, que pasa a ser el `poster.png` del proyecto en git. Es la imagen fija con "reducir movimiento", sin JS y en buscadores.

Mientras no haya masters reales, `just placeholder-videos` crea uno de ejemplo para cada proyecto que no tenga (salvo los paquetes de npm) y lo codifica: 4 segundos de un degradé con los colores de su categoría y una barra de progreso arriba, y medio segundo quieto al final. Los de Mobile salen verticales, para probar la composición.

### 42.8. Fases

0. **Prueba técnica** (página descartable): grilla con páginas, zoom con `ClientRouter`, video que sigue vivo entre páginas y vuelta a la misma página de proyectos. Es lo más riesgoso y define la arquitectura.
1. **Content Collection** de proyectos, con su schema de Zod (categoría, textos ES/EN, stack, video, imagen, demo).
2. **La carpeta sin efectos:** pestañas que filtran, páginas con scroll snap, tarjetas con imagen y las páginas de proyecto.
3. **Animaciones de la carpeta:** indicador que se desliza, círculo de color, entrada de las tarjetas.
4. **Videos en las tarjetas**, el zoom y la continuidad del frame.
5. **La tira de tecnologías.**
6. **La transición del Hero a Proyectos.**
