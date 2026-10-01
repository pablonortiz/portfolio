# Visión

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
