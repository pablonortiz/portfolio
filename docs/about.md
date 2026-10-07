# Sobre mí

## 43. Sección "Sobre mí": la línea de tiempo

Idea de Pablo, a partir de dos referencias: el texto que se enciende con el scroll (el "about" de withhoney.com) y la frase fija al centro mientras pasan cosas alrededor ("We build what can't be ignored", de cardenasdesigngroup.com). Va después de Proyectos y antes de Contacto (`sections/about/`).

```text
 ┌──────────────────────────────────────────────┐
 │ SOBRE MÍ                                      │
 │                                               │
 │    Empecé construyendo cosas porque quería    │ ← se enciende palabra
 │    entender cómo funcionaban.                 │   por palabra
 └──────────────────────────────────────────────┘
 ┌──────────────────────────────────────────────┐
 │ 🎓 2019                                       │
 │ Egreso del secundario         🗣 2020          │ ← los hitos suben en
 │                               Cambridge…      │   las bandas laterales
 │        Con el tiempo, eso se convirtió        │
 │           en mi profesión.   ← fija           │
 │ 📻 2021                                       │
 └──────────────────────────────────────────────┘
```

### 43.1. El recorrido

1. **La primera frase se enciende palabra por palabra** mientras sube por la pantalla (de ~65% a ~30% de su alto). Está abajo en la primera pantalla del capítulo a propósito: al llegar desde Proyectos, el encaje deja la página al principio de la sección, y la frase tiene que encenderse después, mientras se scrollea, no durante el salto. Arriba, la etiqueta "Sobre mí", como las de la página de un proyecto.
2. **La segunda frase se enciende mientras sube al centro y queda fija** (`position: sticky`) mientras pasan los hitos, en orden cronológico de arriba a abajo. Cuando pasa el último, se suelta.
3. **Los hitos aparecen y se desvanecen con el scroll.** Se desvanecen antes de llegar al header: su línea de tiempo empieza debajo de él (`view()` con margen).

### 43.2. Cómo está hecho

- **Solo CSS:** `sticky` más animaciones ligadas al scroll (`animation-timeline: view()` y líneas de tiempo con nombre), sin JS ni dependencias. La arquitectura preveía GSAP para "texto fijo con cosas apareciendo alrededor" (§15), pero hoy CSS lo resuelve, y Safari lo soporta desde la versión 26.
- **El encendido es un componente** (`ui/RevealWords.astro`), que usan las dos frases: parte el texto en palabras y cada una se enciende en su tramo de una línea de tiempo que define el contenedor con variables (`--reveal-timeline`, `--reveal-range`, `--reveal-start`, `--reveal-length`). La primera frase usa la suya; la segunda, la del tramo en el que queda fija.
- **Del gris secundario al color del texto**, no de casi invisible: si alguien frena a mitad de camino, el texto se lee (el gris secundario ya cumple 4,5:1).
- **Los hitos van en las bandas a los costados de la frase, nunca la cruzan:** superpuestos, no se leería ninguno de los dos textos. Alternan de lado, y dentro de cada banda varía la sangría, así se ven dispersos como en el boceto de Pablo. Cada uno arranca un quinto de pantalla (`20dvh`) después del anterior: con 9 hitos, la frase queda fija unas dos pantallas.
- **En mobile no hay costados:** la frase queda fija arriba, debajo del header, sobre el fondo de la página, y los hitos suben en una columna debajo y se desvanecen al pasar por debajo de ella (con un degradé).
- **Sin animaciones ligadas al scroll (Firefox) o con "reducir movimiento":** el texto aparece encendido y los hitos quietos. La frase sigue fija, que no es movimiento.
- **Semántica:** la etiqueta es el `<h2>` de la sección, y los hitos, una lista ordenada (`<ol>`) con el año en `<time>`. Un lector de pantalla los recorre en orden, sin depender de dónde aparecen.
- **Los textos van en TypeScript** (`about.texts.ts`), porque son datos internos (principio 4). La lista de hitos (año e ícono) es una sola para los dos idiomas, y los textos de cada idioma se indexan por su id: el orden y los años no se pueden desincronizar. Los íconos son de Lucide, y un hito sin ícono hace fallar `astro check` (`satisfies Record<MilestoneIcon, unknown>`).

### 43.3. El encaje

La home scrollea por capítulos (§20), pero **todo lo que viene después de Proyectos es un solo capítulo**, más alto que la pantalla: adentro, el scroll es libre. Probado con un prototipo en Chrome (rueda y touch) y en Safari (Pablo):

- **Con un capítulo por sección, el encendido no se veía:** el encaje hacía el salto en ~300 ms. Es el mismo problema que tuvo la inclinación de la carpeta (§42.6).
- **Y al final de la sección había una pared:** el comienzo de la siguiente quedaba a más de media pantalla (835 px en 1440×900), y un gesto normal rebotaba.
- **Ningún gesto saltea su comienzo** (`scroll-snap-stop: always`, §20): un gesto fuerte que sale de Proyectos frena justo al principio de la sección, con la primera frase todavía apagada. Sin eso, la inercia seguía de largo dentro del capítulo libre y llegaba a la frase fija, o a mitad de la primera pantalla con todo el texto ya encendido.

### 43.4. Los hitos

| Año  | Ícono            | Hito                                                             | Detalle                               |
| ---- | ---------------- | ---------------------------------------------------------------- | ------------------------------------- |
| 2019 | `graduation-cap` | Egreso del secundario                                            | Instituto Inmaculada Concepción       |
| 2020 | `languages`      | Inglés: Cambridge B2 First                                       | 180 (nivel C1)                        |
| 2021 | `radio`          | Desarrollador en Radio Nacional                                  |                                       |
| 2022 | `smartphone`     | Primera app publicada                                            | Android e iOS                         |
| 2022 | `briefcase`      | Desarrollador mobile en Janis Commerce                           |                                       |
| 2024 | `handshake`      | Empiezo como freelance                                           | Apps, sistemas y sitios para empresas |
| 2026 | `receipt`        | Sistema de gestión en producción                                 | Con facturación electrónica           |
| 2026 | `package`        | Herramientas open source para devs                               | Tres paquetes en npm                  |
| Hoy  | `map-pin`        | Apps mobile en Janis Commerce, y sistemas y herramientas propias |                                       |

- **El secundario y el inglés no están para mostrar algo técnico** (no lo son), sino el ritmo: termina el secundario en 2019, el First en 2020 y en 2021 ya trabaja en la radio. Planteo de Pablo.
- **El 180 del B2 First es calificación A**, y con esa nota el certificado acredita nivel C1: por eso "180 (nivel C1)" y no el número solo, que no le dice nada a quien no conoce la escala.
- **"Hoy" cierra con el acento** (`map-pin`, el "estás acá" de un mapa) y lleva a Contacto.
