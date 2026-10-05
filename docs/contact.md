# Contacto

## 45. Sección "Contacto" y el footer

Boceto de Pablo: el cierre de la página, con la pregunta "¿Construimos algo?" (ya estaba en el banco de ideas, §4), un texto corto, el botón para escribirle y los links. Va al final del capítulo libre de la home (§43.3), después de Cómo trabajo (§44), y debajo, el footer (`sections/contact/`, `components/footer/`).

```text
            ¿Construimos algo?
            ~~~~~~~~~~~~~~~~   ← se escribe solo, una vez
   Si tenés una idea, un producto en marcha o un
   problema que necesita solución, hablemos.

   ( Escribime )   pablonortiz05@hotmail.com ⧉

      LinkedIn ↗   GitHub ↗   Descargar CV ⤓
 ─────────────────────────────────────────────
  [firma]                       © 2026 Pablo Ortiz
```

### 45.1. Decisiones

- **El mail visible, con un botón para copiarlo, además del `mailto:`** ("Escribime"). Un `mailto:` solo no hace nada si no hay un programa de mail configurado (muchas compus) o si se usa el mail en el navegador. Un formulario necesita un servicio que reciba los mensajes y protección contra spam: se puede sumar cuando se decida el hosting.
- **"Escribime" y no "Contactarme":** un infinitivo suena raro como invitación. En inglés, "Get in touch".
- **El subrayado está trazado a mano y se escribe una vez** al entrar en pantalla (la mitad de la sección visible), como la firma del header. Es un SVG estirado bajo "Construimos algo" (en inglés, "build something"), con su largo normalizado (`pathLength="1"`) y dibujado moviendo el guion (`stroke-dashoffset`). Comparte el disparador con Cómo trabajo (`lib/reveal-on-view.ts`).
  - **Sin `vector-effect: non-scaling-stroke`:** con él, Chrome mide los guiones en la pantalla e ignora `pathLength`, y el trazo quedaba por la mitad. El grosor escala con el SVG, que en una línea casi horizontal no se nota.
  - **Un hueco más largo que el trazo** (`stroke-dasharray: 1 2`) y oculto un poco más allá de su largo (`1.05`): con el extremo redondeado, un guion vacío seguía viéndose como un punto.
  - Sin JS o con "reducir movimiento", está dibujado.
- **El botón de copiar es compartido** con el panel de instalación de los paquetes (`lib/copy-button.ts`): copia el texto de `data-copy`, muestra el check 2 segundos y lo avisa por la línea de estado que nombra (`data-copy-status`).
- **Links:** LinkedIn y GitHub (se abren en otra pestaña) y el CV en el idioma de la página, que se descarga (`public/cv/`, rutas en `config/contact.ts`). Los CV son de Pablo y se revisaron antes de publicarlos: sin nombres de clientes con marca ficticia ni datos en los metadatos.
- **El título baja hasta 1,75rem en pantallas chicas:** el subrayado necesita que "Construimos algo" entre en una línea, y en 320 px (el ancho de referencia de WCAG) con un tamaño mayor se salía.

### 45.2. El footer

- **La firma y "© año Pablo Ortiz"**, con el año del build.
- **Solo en la home:** en desktop, la página de un proyecto entra justo en una pantalla, y un footer la obligaría a scrollear. El layout tiene un slot `footer` que cada página llena o no.
- **Fuera de `<main>`**, así es el footer de la página para los lectores de pantalla (`contentinfo`). Pero queda fuera del capítulo libre, y con el encaje obligatorio no se podía llegar al final: por eso tiene su propio punto de encaje, alineado abajo (`scroll-snap-align: end`, §20).
