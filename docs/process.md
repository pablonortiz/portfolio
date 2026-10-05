# Cómo trabajo

## 44. Sección "Cómo trabajo"

Idea de Pablo: cuatro principios de trabajo alrededor de una línea vertical que se dibuja sola. Va después de Sobre mí y antes de Contacto (`sections/process/`), dentro del capítulo libre de la home (§43.3). Para un cliente es el argumento antes de escribir: cómo va a encarar su problema.

```text
              Cómo trabajo
                    │
 01 🔍 Entender     │
 antes de construir │
 ┃ Forja partió…    │   02 ⎔ Diseñar algo
                    │   que pueda crecer
 03 ↻ Construir,    │   ┃ Tesela Catálogo…
 probar e iterar    │
 ┃ BeatFit…         │   04 ⛨ Entregar algo
                    │   mantenible
                    │   ┃ Tesela Gestión…
```

### 44.1. Contenido

| #   | Ícono          | Paso                          | Texto                                                                           | Prueba                                                                                |
| --- | -------------- | ----------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 01  | `search`       | Entender antes de construir   | Primero entender el problema y el contexto, no empezar directamente por código. | Forja partió de los cuadernos y planillas del taller.                                 |
| 02  | `workflow`     | Diseñar algo que pueda crecer | Pensar flujos, arquitectura y cómo va a evolucionar el producto.                | Tesela Catálogo se alimenta del sistema de gestión: los datos se cargan una sola vez. |
| 03  | `repeat`       | Construir, probar e iterar    | Desarrollar en ciclos, validar y corregir.                                      | BeatFit: rehecha desde cero con lo que enseñó la primera versión.                     |
| 04  | `shield-check` | Entregar algo mantenible      | No solamente algo que "funcione hoy".                                           | Tesela Gestión: más de 500 tests, CI y actualizaciones automáticas.                   |

- **Cada paso lleva una prueba de sus proyectos:** sin ella, los principios son frases que dice cualquier dev. Cortas, a pedido de Pablo, y de proyectos distintos. Las de 02 a 04 salen de lo verificado en el código; la de 01, del problema de Forja (§42).
- **"Algo que pueda crecer" y no "escalable":** dice lo mismo, más claro para un cliente, sin la palabra más gastada del rubro.

### 44.2. Disposición

- **Pasos numerados y escalonados en zigzag a los costados de la línea**, elegido por Pablo sobre la grilla 2×2 de su boceto: en una grilla, el orden por columnas que tenía el boceto se lee por filas (Entender → Construir → Diseñar → Entregar), y en un proceso el orden es el mensaje. Los números (01–04) lo fijan.
- **Los dos lados abrazan la línea:** cada paso tiene un ancho máximo, y los de la izquierda van al final de su columna, con el texto igual alineado a la izquierda.
- **Grilla de filas de medio paso:** cada paso ocupa dos filas y el siguiente empieza una fila más abajo, en el otro lado.
- **En mobile, una columna con la línea en el borde izquierdo.**
- **Corta (~una pantalla):** Sobre mí ya es larga y está llena de efectos de scroll; acá conviene algo calmo.

### 44.3. La animación

- **Una vez, con tiempo propio, no atada al scroll:** el rebote es una sensación de tiempo. Atado al scroll dependería de la velocidad y se rebobinaría al subir. Un `IntersectionObserver` (`lib/reveal-on-view.ts`) saca la marca `data-pending` cuando se ve el 30% de la sección, una vez por visita (como el aterrizaje de la carpeta, §42.6). CSS todavía no puede disparar una animación por tiempo al entrar en pantalla sin JS.
- **La línea se dibuja de arriba hacia abajo** (`scale` en Y desde arriba, 1,6 s), en el sentido de lectura de los pasos: el boceto la dibujaba de abajo hacia arriba, que recorre el proceso al revés.
- **A ritmo constante (`linear`), como una lapicera:** cada paso empieza cuando la línea llega a su fila (el paso n, a n / (pasos + 1) del recorrido). Con una curva `ease-in-out`, los retrasos parejos no coincidían con la línea, y ajustarlos a la curva amontonaba los pasos del medio.
- **Cada paso aparece desde opacidad 0, subiendo 2rem y asentándose con un rebote** (una curva con desborde, ~6 px), en lugar del temblor del boceto: temblar es el movimiento clásico de "contraseña incorrecta", connota error.
- **Ocultar es instantáneo** (la transición solo existe sin la marca), y la animación se declara dentro de `prefers-reduced-motion: no-preference`. Sin JS o con "reducir movimiento", los pasos están ahí desde el principio, con la línea dibujada.
