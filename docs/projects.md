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
- **La pestaña activa va en la URL** (`?plataforma=mobile` en español, `?platform=mobile` en inglés, §34): se puede compartir y el "atrás" del navegador vuelve a la anterior. Cambiar de pestaña requiere JS; el HTML llega con Web activa, así que lo primero que se ve no depende del script.
- **En mobile, las pestañas inactivas muestran solo el ícono** (el nombre queda para lectores de pantalla): las cuatro con nombre no entraban en 375 px y Dev quedaba afuera. Son los mismos íconos que la órbita del Hero acaba de mostrar con su nombre.
- **Dev tiene estética de terminal** (monoespaciada), con un cursor que titila (`_` o `|`) como animación característica, y su propio tipo de tarjeta: un paquete no tiene video, pero sí nombre, descripción, versión y descargas (traídas de npm al compilar).
- Idea a evaluar: tocar un ícono de la órbita del Hero abre esa pestaña.

### 42.2. Páginas de proyectos (scroll snap)

Los proyectos se muestran **por páginas**, no en una grilla que se scrollea libremente: cada página es una composición completa, y el zoom (§42.4) siempre arranca desde una tarjeta entera, nunca desde una cortada a mitad de pantalla.

- **Desktop:** 2 columnas × 2 filas = 4 proyectos por página. **Mobile:** 1 columna, 2 por página.
- **Con CSS Scroll Snap, no interceptando el scroll con JS:** el área de proyectos tiene scroll propio, cada página ocupa toda el área, `scroll-snap-type: y mandatory` obliga a terminar siempre en una página y `scroll-snap-stop: always` impide saltarse páginas con un gesto fuerte. Al llegar a la última, el scroll pasa solo a la página de abajo (encadenamiento nativo). Teclado, trackpad, mouse y touch funcionan como en cualquier lado. Interceptar la rueda con JS trae los problemas clásicos: la inercia del trackpad salta páginas, se queda atrapado en la carpeta, y el teclado y los lectores de pantalla dejan de funcionar como se espera.
- **Al pasar de página, las tarjetas entran con el scroll** (`animation-timeline: view()`, solo CSS): suben 1,5 rem, pasan de 96% a 100% de tamaño y de transparentes a opacas mientras entran a la carpeta, y quedan quietas justo cuando están enteras, que es el momento del encaje. En desktop, la columna derecha arranca un poco más tarde (rango `entry 25%`) y las dos llegan juntas.
  - **Ligada al scroll y no al tiempo:** no suma demora después del encaje, se rebobina al volver y las tarjetas que ya se ven al cargar o al cambiar de pestaña están en su estado final sin hacer nada. La línea de tiempo es el scroll de la carpeta (el contenedor con scroll más cercano), no el de la página. Se descartó disparar una animación por tiempo al terminar el encaje (`scrollsnapchange` o `IntersectionObserver`): arrancaba cuando el scroll ya había terminado, se sentía tarde y necesitaba JS.
  - **Sin animación en Firefox** (todavía no soporta animaciones ligadas al scroll) **ni con "reducir movimiento"**: las tarjetas aparecen como siempre. Va dentro de `@supports (animation-timeline: view())`.
  - **Con propiedades sueltas, no con el shorthand `animation`:** el minificador del build (Lightning CSS, dentro de Vite) junta `animation` + `animation-timeline` en un solo `animation: … view()`, que Chrome rechaza entero. La animación desaparecía solo en el build: en `pnpm dev` el CSS no se minifica y andaba.
- **Indicador de página** (puntos o "1/2"), para que se sepa que hay más.
- **Sin barra de scroll visible** en la carpeta (`scrollbar-width: none`, más `::-webkit-scrollbar` para Safari viejo): el indicador de página cumple esa función. El scroll sigue funcionando igual con rueda, trackpad, teclado y touch.
- Comportamiento medido: un toque chico de rueda (120 px) rebota a la página actual y hace falta un gesto de ~media página para avanzar; Re Pág y las flechas (con foco) avanzan de a una. Probado por Pablo y aceptado.
- **Una sola grilla, sin partir la lista en el HTML:** el primer elemento de cada página es el punto de encaje (`nth-child(4n+1)` en desktop, `nth-child(2n+1)` en mobile) y las filas se completan hasta una cantidad par para que la última página también encaje arriba. Así el mismo HTML da 4 por página en desktop y 2 en mobile.
- **Tamaño de las tarjetas:** en desktop, cada fila mide la mitad del alto disponible (en 1280×720 entran 2 filas enteras); en mobile, el alto sale del ancho (16:9, con unidades `cqw`) y la carpeta mide justo dos tarjetas, para no recortar los videos.
- **El margen interno de la carpeta es menor que la separación entre tarjetas** (1 rem contra 1,25 rem): con los dos iguales, la fila de la página siguiente empezaba exactamente en el borde y un redondeo la dejaba asomar 1 px.
- Soporta cualquier cantidad de proyectos por pestaña (hoy se estiman entre 4 y 8).

### 42.3. Tarjetas con video

- Cada tarjeta reproduce un **video corto en loop** del proyecto (5–10 s, sin sonido, muy comprimido, ~0,5 MB).
- **Solo se reproducen las tarjetas visibles**; mientras carga, se ve una imagen fija (poster).
- Con "reducir movimiento" o en modo ahorro de datos, quedan quietas con la imagen fija.
- **Datos inventados** en todas las grabaciones (regla de privacidad del CLAUDE.md).
- **Todos los videos son horizontales (16:9)**, para que las tarjetas no desentonen: los de apps mobile se graban verticales y se componen en horizontal, con el teléfono al centro y los costados en negro o difuminados.

### 42.4. Del grid al proyecto: el zoom

- **Cada proyecto es una página real** (`/es/proyectos/<slug>`, §18 y §22): URL para compartir, SEO, su tarjeta Open Graph y el "atrás" del navegador funcionando solo.
- **Al tocar una tarjeta**, la vista hace zoom hacia ella, "entrando por la ventana" del proyecto. Se resuelve con el `<ClientRouter />` de Astro (transiciones animadas entre páginas, con `transition:name` para que la tarjeta se transforme en la página). En navegadores sin soporte nativo, como Firefox, Astro simula la animación.
- **El video queda pausado en el frame en el que se tocó** y ese frame es el fondo de la página del proyecto (`transition:persist` mantiene vivo el `<video>` entre páginas).
- **Al volver** (botón del navegador o "← Proyectos"), la animación se invierte, el video sigue desde donde estaba y se vuelve **a la misma página de proyectos** (Astro restaura el scroll de la ventana pero no el de un área interna: hay que guardarlo y restaurarlo).
- Costo asumido: `ClientRouter` hace que el sitio navegue como una SPA; los scripts existentes (menú, tema) se reinicializan en cada navegación y el tema guardado se vuelve a aplicar después de cada cambio de página.

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

- A la izquierda, el problema y lo que se construyó (capa 1, §2). A la derecha, el video con todos los controles (pantalla completa, avanzar, retroceder).
- **"Probalo"**: lleva a la demo (§5, §26), solo si el proyecto tiene una.
- **"← Proyectos"** arriba a la izquierda; Esc también vuelve.
- **Tira de tecnologías:** se mueve sola hacia la derecha en loop infinito y se puede arrastrar hacia adelante o hacia atrás. Se pausa con el hover o el foco; con "reducir movimiento" es una lista quieta; las copias que se repiten para el loop quedan ocultas para los lectores de pantalla.

### 42.6. Transición del Hero a Proyectos

- **La carpeta sube desde abajo y se "abre" a medida que se scrollea**, siguiendo el scroll (también al tocar la flecha del Hero).
- **Sin bloquear el scroll** (scroll-jacking): la animación sigue al scroll, el control lo tiene quien visita.
- Las animaciones de CSS ligadas al scroll no andan en Firefox, así que va con JS. Candidatas: `scroll()` de Motion (versión sin React) o GSAP ScrollTrigger (§15). Se decide con prototipos.

### 42.7. Videos

Los produce otra IA siguiendo una especificación (duración, resolución, formato, peso máximo, datos inventados), para que salgan consistentes y livianos. No se guardan en git: cada video quedaría para siempre en el historial; van a un almacenamiento aparte, a decidir junto con el hosting.

### 42.8. Fases

0. **Prueba técnica** (página descartable): grilla con páginas, zoom con `ClientRouter`, video que sigue vivo entre páginas y vuelta a la misma página de proyectos. Es lo más riesgoso y define la arquitectura.
1. **Content Collection** de proyectos, con su schema de Zod (categoría, textos ES/EN, stack, video, imagen, demo).
2. **La carpeta sin efectos:** pestañas que filtran, páginas con scroll snap, tarjetas con imagen y las páginas de proyecto.
3. **Animaciones de la carpeta:** indicador que se desliza, círculo de color, entrada de las tarjetas.
4. **Videos en las tarjetas**, el zoom y la continuidad del frame.
5. **La tira de tecnologías.**
6. **La transición del Hero a Proyectos.**
