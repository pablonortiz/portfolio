# Hero

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
