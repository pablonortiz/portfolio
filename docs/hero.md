# Hero

## 6. Hero — objetivo

El Hero debe lograr en aproximadamente **5 segundos** que una persona piense:

> “Este es Pablo → desarrolla software → hace web/mobile/desktop → quiero ver sus proyectos.”

No debe intentar demostrar todavía todo el conocimiento técnico.

Las animaciones son una capa de personalidad, no la fuente primaria de información.

---

## 7. Hero — copy definido

Después de varias iteraciones, la frase preferida quedó:

> **Diseño y desarrollo software y sistemas.**

Razones:

- “Software” amplía el alcance.
- “Sistemas” comunica herramientas empresariales y software interno.
- Las plataformas (web, mobile y desktop) las comunica la órbita de íconos con etiqueta (§10), así no se dice dos veces lo mismo. La meta description sí mantiene la frase completa.
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
- Fondo con blur al scrollear (referencia de §3.3).
- Navegación: en desktop, **links visibles** (sin menú hamburguesa, para que se vea qué hay sin un click extra); en mobile, menú hamburguesa:
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
- La foto actual (512×512, mirando hacia la izquierda del encuadre) es un **placeholder**. La final se define en pendientes.

Esta dirección está bastante aceptada.

### Texto

Propuesta conceptual:

> **Hola, soy Pablo Ortiz.**  
> Diseño y desarrollo software y sistemas.

Se recomendó jerarquía visual fuerte:

> Hola, soy  
> **Pablo Ortiz.**

El nombre debe tener más peso.

### Layout desktop (decidido, a partir del boceto)

```text
[firma]                     Proyectos  Sobre mí  Contacto  CV   (ES|EN)
────────────────────────────── blur ─────────────────────────────────────
  Hola, soy                      │
  PABLO ORTIZ                    │     ( foto saliendo
  Diseño y desarrollo            │       del círculo )
  software y sistemas            │
    ⊛ Web        ▯ Mobile        │
         ▭ Desktop               │
  [ Conocé mis proyectos ]       │
                              ╭─ ↓ ─╮
```

Texto a la izquierda y foto a la derecha (el boceto los tenía al revés): la mirada guía la vista de quien visita, así que la foto tiene que mirar hacia el texto, no hacia afuera de la página. Además, el nombre se lee primero.

---

## 9. Hero — animación del texto

Idea original:

El texto se “ilumina” a velocidad de lectura, como si Pablo estuviera hablando.

Recomendación:

- No escribir letra por letra.
- El texto debe estar visible desde el inicio en menor contraste.
- La animación simplemente lo ilumina por grupos naturales.
- Duración: **a velocidad de lectura**, 350 ms por palabra (unos 3,5 s en español). Cada grupo dura lo que tarda en leerse.
- Reproducir una vez.

Secuencia conceptual:

1. `Hola,`
2. `soy Pablo Ortiz.`
3. `Diseño y desarrollo`
4. `software y sistemas`

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

Decidido (reemplaza la idea original de "floating / orbital drift"): **giran alrededor de un centro, muy lento**.

- No se ven en absoluto hasta que termina el texto (§9). Ahí, en secuencia: el círculo **se dibuja** como un trazo (desde las 12, en sentido horario, 0,7 s), después **aparecen los íconos** en su lugar, en orden de lectura y al mismo ritmo que el texto (350 ms entre uno y otro), y recién entonces **empieza el giro**. Terminan de aparecer a los ~5,6 s.
- Después giran una vuelta por minuto.
- Posición inicial: Web y Mobile a la misma altura, Desktop abajo al centro.
- El círculo queda como una línea tenue que marca el recorrido, para que se lea como órbita y no como tres etiquetas sueltas; cada etiqueta tapa la línea debajo de su texto.
- Las etiquetas quedan siempre derechas, y la órbita se pausa con el hover para poder leer y apuntar.
- Con "reducir movimiento", queda quieta en la posición inicial.

### Hover en desktop

Al hacer hover:

- escala ligera (~1.05–1.1),
- más contraste,
- aparece color de acento,
- los otros elementos bajan apenas su intensidad.

Los íconos deben ser simples, preferentemente lineales, no enormes ni demasiado ilustrativos.

**Son información, no decoración** (decidido): desde que la frase del §7 no nombra las plataformas, la órbita es la que las comunica. Por eso se ven sin hover, aparecen como parte de la lectura (y desde el primer instante con "reducir movimiento"), llevan su etiqueta en texto y se marcan como lista (Web, Mobile, Desktop) para lectores de pantalla.

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

Elegida (decidido):

> **Conocé mis proyectos**

Más cálida que “Ver mis proyectos”, en el mismo voseo que el resto del sitio (el español va todo en voseo). En inglés: **Explore my projects**, que mantiene el tono de invitación.

- CTA real como **botón**, dentro de la columna de texto, debajo de la órbita.
- Flecha **quieta** dentro de un semicírculo en el borde inferior, centrada, como indicador secundario de scroll (sin animación en loop).

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

   Web   Mobile
      Desktop

[ Conocé mis proyectos ]

      ╭─ ↓ ─╮
```

Principios:

- márgenes laterales generosos;
- no comprimir simplemente el desktop;
- foto más chica que en desktop, y más chica todavía en pantallas bajas para que el botón quede en la primera pantalla (verificar en 375×667 y 390×844);
- texto legible en pocas líneas;
- mantener la órbita pero compacta;
- evitar demasiadas animaciones simultáneas.

### En mobile no existe hover

Opciones:

- tap → resaltar temporalmente;
- resaltado suave automático;
- o mantenerlos simplemente flotando sin interacción.

La órbita no debe requerir interacción para entenderse.
