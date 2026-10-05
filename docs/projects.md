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
- **Dev tiene estética de terminal:** fondo oscuro en los dos temas, la pestaña en monoespaciada y un cursor `_` después de "Dev" en la pestaña activa (con el `>_` del ícono se lee como un prompt). Sus proyectos son paquetes de npm, con su propio tipo de tarjeta (`ui/PackageCardBody.astro`): un paquete no tiene video, así que la tarjeta es una terminal con el nombre (detrás de un `>`), el resumen y la versión.
  - **La versión y la licencia se traen de npm al compilar** (`lib/npm-package.ts`): una sola consulta por paquete para todo el build, validada con Zod porque es un dato que cruza una frontera. Si npm no responde, se muestran sin versión y el build no se corta, así se puede compilar sin internet.
  - **Sin las descargas,** que el diseño original incluía: con los números actuales (decenas o cientos por mes) juegan en contra.
  - **Sin el comando de instalación en la tarjeta:** los reales miden de 45 a 100 caracteres (el de tapfix es un JSON) y no entran en una tarjeta de mobile. Va en la página del paquete (§42.5).
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

- Cada tarjeta tiene un **clip de 3 a 5 segundos**, sin sonido (especificación en la §42.7). Los paquetes de npm no: su tarjeta muestra nombre, resumen y versión (§42.1).
- **Se reproduce una vez, sola, cuando su página de la carpeta queda a la vista, y queda quieta en el último frame.** Vuelve a reproducirse con el hover o el foco, y cuando su página vuelve a entrar. No hay loop: lo que se mueve solo más de 5 segundos tiene que poder pausarse (WCAG 2.2.2, §36), y un clip que dura menos no necesita controles.
- Mientras carga se ve su primer frame, así no hay salto cuando arranca.
- Con "reducir movimiento" o en modo ahorro de datos, la tarjeta muestra una imagen fija del último frame y no carga el video.
- **El último frame es el más visto:** queda en la tarjeta después de reproducirse y es el fondo de la página del proyecto al hacer zoom (§42.4).
- **Cómo está hecho** (`lib/card-videos.ts`, `lib/video-sources.ts`):
  - **Dos `IntersectionObserver` por tarjeta, con la ventana como raíz.** Así lo que recorta el scroll de la carpeta cuenta como no visible, y una sola condición cubre "su página está encajada" y "la carpeta está en pantalla". Uno descarga: cuando la tarjeta empieza a entrar en la carpeta, con la carpeta a menos de media pantalla. El otro reproduce: cuando la tarjeta está entera a la vista. Al dejar de verse, el video se pausa y queda listo para repetirse.
  - **Se observan las tarjetas, no los videos:** el `<video>` está oculto (sin caja) hasta que empieza su descarga, y un elemento sin caja nunca se cruza con nada.
  - **Antes de la descarga no se pide nada**, ni el primer frame: el `poster` se asigna desde JS al empezar a cargar. Sin JS, con "reducir movimiento" o con ahorro de datos (`navigator.connection.saveData`) no hay ningún pedido a `/videos`; con la primera versión se bajaban los primeros frames de todos los proyectos al cargar la página.
  - **No se adelanta la página siguiente:** un clip de ~400 KB baja en lo que dura el encaje, y adelantarla eran 8 clips (~3 MB) apenas se llega a la carpeta en desktop. Se revisa con los masters reales.
  - **Sin campo en el contenido:** todo proyecto que no es paquete de npm tiene clip en `<projectVideosBaseUrl>/<slug>/` (`config/projects.ts`, un solo cambio al definir el hosting). Si falta el archivo, el error de la última `<source>` vuelve la tarjeta a su imagen fija: un clon sin videos o un proyecto todavía sin master no rompen nada.
  - **Dos `<source>` con el códec declarado** (`av01.0.05M.08`, `avc1.64001F`): cada navegador elige sin descargar el que no puede reproducir. `muted` y `playsinline` son obligatorios para que los navegadores (iOS sobre todo) dejen reproducir sin interacción. El video es decorativo (`aria-hidden`): el nombre del link sigue siendo el título.
- **Datos inventados** en todas las grabaciones (regla de privacidad del CLAUDE.md).
- **Aviso de marca ficticia** en los proyectos hechos para clientes que se muestran con nombre y datos inventados (`fictionalBrand: true` en su `project.yaml`), a pedido de Pablo: un chip en la esquina superior derecha de la tarjeta ("Marca ficticia" / "Fictional brand"), lejos de la etiqueta del título, y una línea bajo el título en la página del proyecto (§42.5).
- **Todos los clips son horizontales (16:9)**, como las tarjetas, que nunca los recortan (§42.2). Los de apps mobile se graban verticales y el script los compone en horizontal: la pantalla del teléfono al centro y, a los costados, una copia agrandada y desenfocada de la misma pantalla (en tema claro, unos costados negros se veían pesados sobre las carpetas).

### 42.4. Del grid al proyecto: el zoom

- **Cada proyecto es una página real** (`/es/proyectos/<slug>`, §18 y §22): URL para compartir, SEO, su tarjeta Open Graph y el "atrás" del navegador funcionando solo.
- **Al tocar una tarjeta**, la vista hace zoom hacia ella, "entrando por la ventana" del proyecto. Se resuelve con el `<ClientRouter />` de Astro (transiciones animadas entre páginas, con `transition:name` para que la tarjeta se transforme en la página). En navegadores sin soporte nativo, como Firefox, Astro simula la animación.
- **El video queda pausado en el frame en el que se tocó** y ese frame es el fondo de la página del proyecto (`transition:persist` mantiene vivo el `<video>` entre páginas).
- **Al volver** (botón del navegador o "← Proyectos"), la animación se invierte, el video sigue desde donde estaba y se vuelve **a la misma página de proyectos** (Astro restaura el scroll de la ventana pero no el de un área interna: hay que guardarlo y restaurarlo).
- Costo asumido: `ClientRouter` hace que el sitio navegue como una SPA. Cómo se adaptó:
  - **Cada script arranca en todas las páginas con `onEveryPage(setup)`** (`lib/page-lifecycle.ts`), porque el navegador ejecuta cada módulo una sola vez. Corre al ejecutarse el módulo y después en cada `astro:after-swap`, que llega **antes** de que el navegador capture la página nueva para la transición; `astro:page-load` llega después (y en la primera carga espera a que bajen todas las imágenes). Así la pestaña y la página de la carpeta ya están restauradas cuando el zoom de vuelta busca su tarjeta. El helper le pasa a `setup` un `AbortSignal` que se aborta antes de cada cambio de página: los listeners en `window` y en media queries, y los observers, se atan a él y no se acumulan (verificado: un solo `resize` en `window` después de cuatro idas y vueltas). Los listeners en elementos de la página no lo necesitan, porque desaparecen con ella.
  - **El tema se vuelve a aplicar en `astro:after-swap`:** el router reemplaza los atributos del `<html>` por los de la página nueva, y con eso se perdía `data-theme`. El script del `<head>` corre una sola vez (el router no repite un script que ya corrió), así que el listener no se duplica.
  - **Los clips se silencian desde JS** (`video.muted = true`): el router arma la página nueva con `DOMParser`, y en esos videos el atributo `muted` no silencia. Sin silenciar, el navegador bloquea `play()` y los clips no arrancaban después de navegar.

**Notas de implementación**, validadas en la prueba técnica de la fase 0:

- **El video que viaja conserva los atributos de la página de origen**, incluida la marca de aislamiento de estilos de Astro. Se le da estilo desde un contenedor propio de cada página, con el selector liberado: `.contenedor :global(video)`; Astro aísla cada parte del selector, así que `.contenedor video` no encuentra un video que vino de otra página.
- **`transition:name` va en los contenedores** (el recuadro de la tarjeta y el fondo del detalle), **`transition:persist` en el video** que viaja adentro. Los dos en el mismo elemento rompen el zoom: el nombre de transición depende de una regla de la página de origen que desaparece al navegar, y queda un fundido.
- **Los listeners en `document` sobreviven a la página** con `ClientRouter`: se sacan en `astro:before-swap` (pasó con el Esc del detalle, que seguía activo en la grilla).
- **El scroll de la carpeta no lo restaura Astro** (solo el de la ventana): al tocar una tarjeta se guarda en `sessionStorage` el punto de retorno (el proyecto, el `index` del historial que mantiene el router y el `scrollTop` de la carpeta), y al cargar la home se restaura solo si se está en esa misma entrada del historial. Una visita nueva a la home tiene otro `index` y arranca en la primera página (`lib/project-return.ts`).
- Al volver, solo sigue el video que se tocó; los demás arrancan de nuevo. Volver a la home vuelve a montar el Hero, pero sin su intro: se ve una vez por visita (§10).

**Cómo está hecho el zoom** (`lib/project-zoom.ts`, `ui/ProjectBackdrop.astro`):

- **La tarjeta y el fondo del detalle comparten `transition:name` (`project-<slug>`)** y el video de la tarjeta y el del fondo, `transition:persist` (`clip-<slug>`). En una entrada directa, el video del fondo queda oculto y sin descargar (`preload="none"`), y se ve la imagen fija.
  - **`transition:persist` funciona en las dos direcciones:** entrando directo a un proyecto y yendo a la home, el router conservaba el video vacío del fondo en lugar del de la tarjeta, que se quedaba sin clip (verificado). El del fondo lleva `data-clip-placeholder` y, antes de cada cambio de página, a los que siguen siendo ese reemplazo se les saca la persistencia (`releaseClipPlaceholders`). El video que llegó desde una tarjeta no tiene la marca y vuelve con ella.
- **Al tocar la tarjeta** (un click simple; con Cmd o Ctrl se abre otra pestaña y no pasa nada de esto), el clip se pausa en ese frame y queda marcado para seguir al volver. Verificado: el fondo del detalle es el mismo objeto `<video>`, pausado en el segundo del click, y al volver sigue reproduciéndose desde ahí.
- **Llegada nítida y después desenfoque:** antes del swap, la página nueva recibe `data-project-arrival` en el `<html>` (el router copia esos atributos), que deja el fondo sin desenfoque ni velo y el contenido invisible. Cuando termina la transición se saca, y el fondo se desenfoca mientras aparece el contenido (`--duration-normal`). Solo se marca si la navegación va a ese proyecto. Con "reducir movimiento" no hay animación y la marca se saca enseguida (verificado).
- **El zoom dura `--duration-normal` (400 ms) con `--ease-in-out`,** en vez de los 250 ms por defecto del navegador, que eran poco para "entrar por la ventana". Va en una clase de transición (`view-transition-class: project-zoom`) declarada en `global.css`: durante una transición rigen los estilos de la página de destino, y a la ida el detalle no tiene tarjetas y a la vuelta la home no tiene el fondo.
- **El header tiene su propio grupo de transición** (`transition:name="site-header"`, sin animación): los elementos con nombre se pintan por encima del resto de la página, y el fondo, que ocupa toda la pantalla, tapaba el header hasta el final del zoom.

### 42.5. Página de un proyecto

```text
┌──────────────────────────────────────────────┐
│ ← Proyectos                                  │
│ Nombre del proyecto            [ Probalo ↗ ] │
│                                              │
│  Problemática                ┌────────────┐  │
│  ~~~~~~~~~~~~~~              │  póster    │  │
│  ~~~~~~~~~~~~~~              │ ▷ Recorrido│  │
│                              └────────────┘  │
│  Se construyó…                               │
│  ~~~~~~~~~~~~~~                              │
│                                              │
│  Tecnologías: React · Jest · Tailwind → → →  │
└──────────────────────────────────────────────┘
   fondo: el frame del video en el que se tocó
```

- A la izquierda, el problema, lo que se construyó y, debajo, **la capa técnica** (el cuerpo del Markdown, "en profundidad", §2). A la derecha, la imagen fija del proyecto; si tiene **recorrido** (§42.7), la imagen es un botón "Ver recorrido" que lo abre en un diálogo.
- **El recorrido se ve en un diálogo** (`ui/ProjectTour.astro`, `lib/project-tour.ts`), no dentro de la columna: ahí mediría 528×297 en una pantalla de 1440 (el 27% del video), y un texto de 14 px de la interfaz se vería de 4 px. El diálogo es lo más grande que entra con su panel entero (título, video y descripción): en 1440×900, el video mide 1143×643.
  - **`<dialog>` modal abierto y cerrado con Invoker Commands** (`commandfor` y `command="show-modal"` / `"close"` en los botones), sin JS: atrapa el foco, Esc lo cierra (y no dispara la vuelta a la lista), el resto de la página queda inerte y el foco vuelve al botón. Es Baseline desde diciembre de 2025 (Safari 26.2); para los navegadores anteriores, el script abre y cierra con un click. El script además reproduce al abrir, pausa al cerrar (al reabrir sigue desde ahí) y cierra con un click afuera del panel. Mientras está abierto, la página de atrás no scrollea.
  - **Controles nativos del navegador:** teclado, lectores de pantalla, barra de tiempo, pantalla completa y picture-in-picture vienen probados; hacerlos a mano obligaba a reimplementar esa accesibilidad. Lo de marca va en el botón del póster.
  - **`muted`, aunque los recorridos no tienen audio:** declara que el video no suena, y por eso la regla de accesibilidad del lint no pide subtítulos (que transcriben audio). Arranca igual con el click del visitante. Chrome muestra el botón de volumen de todos modos, tachado.
  - **No se descarga hasta que se abre** (`preload="none"`): pesa de 1 a 6 MB en AV1 y de 2 a 8 MB en H.264.
  - **Cada recorrido tiene una descripción** (`tourDescription` en cada `.md`): qué muestra, en dos o tres frases. Es su alternativa en texto, porque es video sin audio (WCAG 1.2.1, nivel A). Se ve debajo del video y es la descripción accesible del botón y del video. El build falla si un proyecto con recorrido no la tiene en algún idioma.
  - **`tour: true` en el `project.yaml`** marca qué proyectos tienen recorrido: los videos no están en git, así que el build no puede saberlo solo.
- **En desktop (desde 48rem), la página entra en la pantalla:** mide exactamente el alto disponible debajo del header, con cuatro áreas de grid (encabezado, texto, imagen, tecnologías). Si el texto no entra, scrollea su columna, no la página.
  - **Un degradé en el borde inferior de la columna avisa que hay más** y desaparece al llegar al final. Es una animación ligada al scroll de la propia columna (`scroll(self)`) que mueve una variable registrada con `@property`. Si no hay nada que scrollear, la línea de tiempo queda inactiva y no hay degradé. En Firefox no hay degradé.
  - **La columna se puede scrollear con teclado:** `tabindex="0"`, `role="region"` y un nombre ("Descripción del proyecto"). Chrome hace enfocables solos a los contenedores con scroll, Safari no. La regla de ESLint que prohíbe `tabindex` en elementos no interactivos admite el rol `region` (config del proyecto).
- **En mobile, la página scrollea normal:** primero el título y "Probalo", la imagen, y después los textos. El HTML conserva el orden de lectura (texto antes que imagen) y el grid lo reordena. Forzar una pantalla habría dejado una columna de texto de ~250 px con scroll propio dentro de una página táctil.
- **Fondo:** la imagen del último frame (en el commit del zoom, el video que viaja desde la tarjeta), fija detrás de toda la página, agrandada un 10% para que el desenfoque no deje bordes, desenfocada y con un velo del color de fondo del tema: en claro aclara, en oscuro oscurece. **El velo es del 88%**, el mínimo que deja el texto secundario en 4,5:1 o más con un frame blanco o negro puro detrás, en los dos temas: medido, 4,9:1 en el peor caso (el texto principal, de 13,6:1 para arriba). Con 80%, el secundario bajaba a 4:1.
- **Cada tecnología lleva su logo al lado del nombre** (`ui/TechnologyList.astro`):
  - **Los logos son SVG de Simple Icons** (CC0, versión 16.33.0), copiados a `src/assets/icons/tech/` con su licencia al lado, como los de Lucide. Sin `<title>` ni `role="img"`, porque el nombre está al lado, y en `currentColor`: monocromos, del color del texto, en los dos temas. Los colores de cada marca competían con la identidad. Los logos siguen siendo marcas registradas; mostrarlos para indicar con qué se trabajó es un uso habitual, pero cada marca tiene sus pautas.
  - **Tecnologías sin logo y logos de familia:** Simple Icons no tiene a Zustand (su logo oficial es una ilustración a color) ni a Riverpod, así que se muestran solo con el nombre; en el mapa de íconos va como `null` explícito, para que la verificación siga marcando los olvidos. TanStack Query usa el logo de TanStack: el de React Query (su nombre anterior) es casi igual al de React y se confundía con React Native al lado.
  - **Registro de tecnologías** (`config/technologies.ts`): ids y nombres (`"tailwind-css": "Tailwind CSS"`). El `stack` de cada `project.yaml` usa ids, y el schema los valida: un id mal escrito corta el build (`stack.1: Invalid option`). El mapa de íconos usa `satisfies Record<TechnologyId, unknown>`, así una tecnología agregada sin logo hace fallar `astro check` (verificados los dos). Los íconos viven en la UI y no en el registro, porque el registro lo importa la configuración de contenido.
  - El borde de los chips sale del color del texto con transparencia y no de `--color-border`: sobre el velo del detalle, en tema claro, el borde normal casi no se veía.
- **"Probalo"**: lleva a la demo (§5, §26), solo si el proyecto tiene una: un botón que no lleva a ningún lado, o uno que dice "próximamente", dejaría el sitio como a medio terminar. Va en el encabezado, a la derecha del título (debajo, si no entra), con el acento de color: es la acción principal de la página, porque probar pesa más que mirar. Por eso la píldora de "Ver recorrido" es neutra (el fondo del tema, como la etiqueta de las tarjetas). Antes iba debajo de la imagen, donde ahora el póster del recorrido ocupa todo el alto.
- **La página de un paquete de npm** cambia la columna derecha por un panel de terminal con el comando de instalación, la versión, la licencia y el link a npm (`ui/PackagePanel.astro`). El botón del encabezado es "Ver en GitHub" en lugar de "Probalo".
  - **Sin fondo con frame,** porque no hay clip: la página va sobre el fondo del tema.
  - **El zoom lleva la tarjeta al panel**, que tiene su `transition:name`, en lugar de al fondo. Por eso no se marca la llegada (`data-project-arrival`): esconde el contenido de la página hasta el final del zoom, y el panel está dentro del contenido.
  - **Botón para copiar el comando:** muestra un check por 2 segundos y avisa "Comando copiado" a los lectores de pantalla con una línea de estado. Necesita la API del portapapeles, así que sin JS no aparece y el comando queda como texto seleccionable.
  - **Los colores de terminal son tokens globales** (`--color-terminal`, etc., en `global.css`): los usan la pestaña Dev y este panel.
  - **En el schema, un proyecto es una app o un paquete** (una unión de Zod): la app tiene póster; el paquete, `npmPackage`, `install` y `repository` obligatorios, y no tiene póster. TypeScript obliga a cada componente a distinguirlos (`isPackage` en `lib/projects.ts`): los que solo sirven para apps, como el fondo o el recorrido, reciben `AppProject`.
- **Marca ficticia:** bajo el título, "Marca y datos ficticios, para resguardar al cliente." en los proyectos con `fictionalBrand` (§42.3).
- **"← Proyectos"** arriba a la izquierda, y Esc hace lo mismo (salvo con un `<dialog>` abierto, como el menú mobile, donde Esc lo cierra). Si la entrada anterior del historial es la carpeta desde la que se abrió el proyecto, vuelve con `history.back()`: pestaña, página, scroll y animación inversa, todo como estaba. Si no (entrada directa por un link compartido, por ejemplo), el link va a la carpeta en la pestaña del proyecto (`/es/?plataforma=mobile#proyectos`), que es también lo que funciona sin JS.
- **Tira de tecnologías** (`lib/technology-strip.ts`): una línea. **Si entra, queda quieta**: animar lo que ya se ve entero solo agrega movimiento. Si no entra, se mueve sola hacia la derecha en loop, a velocidad constante (30 px/s, así una lista larga no corre más rápido).
  - **El loop:** la lista va en un riel y, mientras se mueve, JS agrega una copia detrás (oculta para lectores de pantalla e `inert`). El riel se anima con Web Animations una lista más el espacio entre ellas, así la copia cae donde estaba la lista y no hay salto. Los bordes se desvanecen. Un `ResizeObserver` arranca o frena el movimiento cuando cambia el ancho (rotar el teléfono, cargar las fuentes).
  - **Pausa sin botón visible** (opción elegida por Pablo): el hover la pausa mientras el mouse está encima; el foco de teclado (`:focus-visible`), mientras está enfocada, y ahí las flechas la mueven; **tocarla o clickearla sin arrastrar** la pausa hasta el próximo toque. El foco por mouse no pausa: si no, un click la dejaría enfocada y pausada, y el segundo click no podría reanudarla.
  - **Arrastre:** mueve la posición de la animación (`currentTime`), hacia adelante o hacia atrás, y al soltar sigue desde ahí. La tira declara `touch-action: pan-y`: un deslizamiento vertical que empieza sobre ella scrollea la página, y como el navegador cancela el gesto (`pointercancel`), no cuenta como toque ni la pausa.
  - Al moverse, la tira es una región enfocable con nombre ("Tecnologías"); quieta, no. Con "reducir movimiento" o sin JS, es una lista quieta con scroll lateral nativo.
  - Verificado: quieta con 3 tecnologías en desktop y moviéndose en 375 px; hover, click, toques, arrastre de 100 px (se movió 100), flechas (48 px por paso, sin scrollear la página), foco de teclado, deslizamiento vertical sobre la tira (scrolleó la página sin pausarla) y reducir movimiento.

### 42.6. Transición del Hero a Proyectos

- **La carpeta viaja inclinada hacia atrás desde sus pestañas, como una tapa, y al llegar a su lugar se endereza con su propio tiempo.** El Hero, mientras tanto, baja a 40% de opacidad y se achica apenas (96%) siguiendo el scroll, así la carpeta parece pasar por encima. Elegida por Pablo después de probar dos prototipos en `pnpm dev`: esta (T) y otra que retenía la carpeta con solo las pestañas a la vista y después desplegaba el cuerpo hacia abajo (D).
  - **Al principio la inclinación seguía al scroll** (`animation-timeline`). Con el scroll por capítulos (§20), el encaje del navegador la hacía pasar en unos pocos cientos de milisegundos y no se llegaba a ver. Pablo planteó un capítulo intermedio, con la página detenida a mitad de la transición. Se descartó porque eran dos gestos para llegar a Proyectos y volvía el problema original: con la carpeta a medio entrar bajo el puntero, su lista toma el scroll.
  - **Cómo funciona** (`lib/folder-landing.ts`): un `IntersectionObserver` sobre la sección. Mientras no llegó, la carpeta tiene `data-landing` (`perspective(1400px) rotateX(38deg)`, 3rem más abajo, al 94% y con 30% de opacidad). Cuando la sección está a la vista en un 90%, se saca la marca y una transición CSS la endereza en `--duration-slow` (800 ms) con `--ease-in-out`, para que la inclinación se sostenga un instante (con `--ease-out` quedaba casi plana en 200 ms). **Aterriza una vez por visita**, como la intro del Hero (una marca en memoria del módulo, que dura mientras se navega y se reinicia al recargar): la primera vez presenta la carpeta, y repetida era una espera de 800 ms en cada ida y vuelta. Antes del primer aterrizaje, si la sección sale de la pantalla, vuelve a inclinarse sin que se vea.
  - **Si la página llega con la carpeta ya en su lugar por una navegación interna** (al volver de un proyecto, o con el link "Proyectos" desde otra página), queda plana: el zoom de vuelta necesita las tarjetas en su lugar al capturar la página. Ese chequeo corre en `astro:after-swap`, antes de la captura, y no cuenta como aterrizaje: si después se sube al Hero, la carpeta vuelve a inclinarse (cuando queda menos del 10% de la sección a la vista, porque en el capítulo del Hero asoma unos píxeles) y aterriza al bajar. **En una carga completa por `#proyectos`**, el módulo corre antes del salto al ancla: la carpeta aterriza al cargar, y ese es el aterrizaje de la visita (verificado).
  - **Solo anima enderezarse; inclinarse es instantáneo** (al cargar y al irse, siempre fuera de la pantalla). Con la transición en los dos sentidos, al cargar la página la carpeta tardaba 800 ms en inclinarse, y un scroll rápido apenas entrar la agarraba a mitad de camino.
  - **La sección recorta su desborde vertical** (`overflow-y: clip`). Inclinada, la carpeta desborda la sección, y como es la última de la página, la agrandaba: en 1440×900 el scroll máximo pasaba de 753 a 821. Al enderezarse, ese rango se achicaba cuadro a cuadro, y el navegador recortaba el scroll (de 821 a 753, unos 400 ms) justo en el arranque del aterrizaje, mientras encajaba la página. Era la causa más probable de que la animación se trabara en su primer cuadro, reportado por Pablo al bajar rápido apenas entrar o al subir y bajar varias veces. Con el recorte, el rango no cambia, y el borde inferior de la sección coincide con el de la pantalla, así que no se ve ningún corte. Revisado al agregar Sobre mí debajo: la carpeta solo está inclinada mientras la sección se ve menos del 90%, y en ese tramo su borde inferior siempre queda por debajo de la pantalla, así que el recorte no se ve nunca.
  - **La home recorta su desborde horizontal** (`overflow-x: clip` en `.home`): inclinada, la carpeta es más ancha que la pantalla (27 px más en 1440 px), y la página se podía correr de costado hasta que aterrizaba. Con `clip` y no `hidden`, porque `hidden` crea un contenedor de scroll y la frase fija de Sobre mí dejaría de quedar fija en la pantalla.
  - **Termina en `transform: none`**, no en `perspective() rotateX(0)`, que deja una matriz 3D identidad: plana a la vista, pero una capa 3D que puede desenfocar el texto.
  - **Plana es el estado base:** sin JS o con "reducir movimiento" la carpeta nunca se marca. Y como ya no depende de `animation-timeline`, en Firefox también aterriza.
- **El atenuado del Hero sigue atado al scroll** (`animation-timeline`), con la línea de tiempo de la entrada de la sección (`view-timeline-name: --projects-entry`), que la página de inicio comparte con el Hero mediante `timeline-scope`. Atado al scroll de la página, en pantallas donde la carpeta es más baja que la pantalla el recorrido no llegaba al final. En Firefox estable no hay atenuado (verificado en MDN: `animation-timeline` está en Chrome 115+ y Safari 26+, y en Firefox solo en preview).
- **Sin bloquear el scroll** (scroll-jacking): el control lo tiene quien visita.
- **El botón del Hero y la flecha hacen scroll suave** hasta la carpeta, para que se vea la transición (`lib/smooth-scroll.ts`). Es con JS y no con `scroll-behavior: smooth` en CSS: el router restaura el scroll al volver de un proyecto sin indicar el comportamiento, y con la propiedad CSS esa restauración también se animaría, mientras el zoom de vuelta captura la página. Con "reducir movimiento" o sin JS, el salto normal del ancla.
- Con "reducir movimiento", ni la carpeta ni el Hero se animan.
- **La home scrollea por capítulos** (§20): la página encaja la carpeta antes de que su lista tome el scroll, así no se pasan páginas de proyectos con la carpeta a medio entrar. Por eso el Hero se achica desde su borde superior: Chrome calcula los puntos de encaje con la caja transformada.

### 42.7. Videos

Especificación para quien produce los videos (otra IA). Está escrita para poder pasarse tal cual: no hace falta leer el resto de este documento.

Los videos no se guardan en git (cada uno quedaría para siempre en el historial): se sirven desde Cloudflare R2, en `media.pablonortiz.com` (ver "Dónde viven", abajo).

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

#### Dónde viven

- **En Cloudflare R2, en el bucket `pablonortiz-media`, servido en `media.pablonortiz.com`** (decisión en §40). Sin costo por transferencia, con el plan gratis de sobra (son 71 MB: 5,6 MB los clips y 65 MB los recorridos) y con pedidos por rangos, que son los que permiten adelantar un recorrido sin bajarlo entero (verificado: `206` y `Accept-Ranges: bytes`).
- **`just upload-videos` sincroniza `public/videos/` con el bucket:** sube solo lo que cambió y borra lo que ya no está. Usa `rclone` (fijado en `.mise.toml`) con las credenciales del `.env` (no está en git): un token de cuenta de Cloudflare y el ID de la cuenta. Las credenciales S3 de R2 salen del mismo token (su ID y el SHA-256 de su valor) y se calculan al subir, sin guardarse.
- **Caché de un día** (`Cache-Control: public, max-age=86400`). Los nombres de los archivos no cambian al volver a codificar, así que un video nuevo puede tardar hasta un día en verse, salvo que se purgue la caché en Cloudflare.
- **En desarrollo se usa la copia local** (`/videos`, en `public/`): un video recién codificado se ve sin subirlo. La URL sale de `projectVideosBaseUrl` (`config/projects.ts`), el único lugar que la conoce.
- **El flujo completo:** el master en `videos/masters/`, `just encode-video <slug>`, revisar en `pnpm dev`, `just upload-videos` y commitear el `poster.png`.

### 42.8. Fases

0. ✅ **Prueba técnica** (página descartable): grilla con páginas, zoom con `ClientRouter`, video que sigue vivo entre páginas y vuelta a la misma página de proyectos. Es lo más riesgoso y define la arquitectura.
1. ✅ **Content Collection** de proyectos, con su schema de Zod (categoría, textos ES/EN, stack, video, imagen, demo).
2. ✅ **La carpeta sin efectos:** pestañas que filtran, páginas con scroll snap, tarjetas con imagen y las páginas de proyecto.
3. ✅ **Animaciones de la carpeta:** indicador que se desliza, círculo de color, entrada de las tarjetas y el cursor de Dev.
4. ✅ **Videos en las tarjetas**, el zoom y la continuidad del frame. Con videos placeholder hasta tener los masters reales (§41); la tarjeta de paquete de npm para Dev llegó con los datos reales.
5. ✅ **La tira de tecnologías:** logos y nombres; se mueve solo si no entra.
6. ✅ **La transición del Hero a Proyectos:** la carpeta viaja inclinada y aterriza enderezándose.
