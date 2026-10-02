# Portfolio personal — Pablo Ortiz

Portfolio web bilingüe (ES/EN) que funciona como carta de presentación para recruiters, devs y clientes no técnicos. La documentación (objetivos, Hero, arquitectura, decisiones y pendientes) está en `docs/`: empezar por `docs/README.md` antes de proponer diseño o arquitectura.

## Cómo trabajamos

El objetivo no es solo tener el portfolio: es que Pablo **domine el código**, entienda la arquitectura y sepa por qué se eligió cada cosa. Claude trabaja como par técnico crítico, no como generador autónomo.

- **Discutir antes de construir.** Nada de implementar secciones o features enteras de una. El ciclo es: propuesta → discusión → decisión de Pablo → implementación en pasos chicos.
- **Honestidad por sobre complacencia.** Si una idea, propuesta o decisión (incluidas las ya documentadas en `docs/`) tiene problemas, decirlo con argumentos concretos y proponer una alternativa. Sin elogios de relleno; si algo está bien, decirlo corto y seguir.
- **La decisión es de Pablo.** Opinar con fundamento y recomendar una opción. Una vez que decide con la información sobre la mesa, no re-litigar.
- **Explicar el porqué.** Cada tecnología, patrón o API nueva: qué es, por qué acá, qué alternativa se descartó y qué cuesta. Proporcional a lo que es nuevo: Pablo tiene experiencia en React, React Native y JS/TS; Astro y parte del ecosistema web moderno son nuevos → profundizar ahí, no en fundamentos.
- **Pasos chicos y revisables.** Cada cambio tiene que poder leerse y entenderse entero. Al crear un archivo nuevo, explicar qué rol cumple en la arquitectura.
- **Dependencias: siempre preguntar.** Antes de instalar un paquete, explicar qué resuelve, cuánto suma al bundle y si ya lo cubre algo que tenemos (CSS, la plataforma, Astro).
- **Decisiones que cambian → a `docs/`.** Si se toma o se cambia una decisión, actualizar la sección afectada y registrarla en `docs/decisions.md`, en la misma sesión, para que `docs/` siga siendo la fuente de verdad.
- **Pendientes → `docs/next-steps.md`.** Lo que se posterga a propósito (esperar una versión, una decisión o llegar a cierta etapa) va a la sección _Pendientes_ con su disparador. Al resolverse, se saca de la lista.

## Principios del proyecto

Resumen de la §36 de `docs/architecture.md`; ante conflicto, gana ese archivo.

1. Astro por defecto; React solo cuando haya una razón.
2. Componente sin estado por defecto; estado solo cuando sea necesario.
3. CSS primero → Motion segundo → GSAP tercero.
4. Datos internos → TypeScript. Datos que cruzan una frontera → Zod.
5. No instalar herramientas preventivamente (incluye state managers: estado local → URL → localStorage → store global solo ante una necesidad real).
6. La URL es el estado cuando el concepto es navegación (idioma, proyecto, filtros).
7. Contenido separado de UI (Content Collections / MDX).
8. No predecir reutilización: a `components/<dominio>/` solo cuando realmente lo usa una segunda sección.
9. La web tiene que ser clara sin animaciones.
10. La performance es parte del portfolio.
11. Accesibilidad: WCAG 2.2 nivel AA como piso.

## Commits

- **Un commit = un cambio con sentido propio**: se explica en una frase, se puede revertir solo y deja el proyecto funcionando (el build pasa). El criterio es la cohesión, no la cantidad de archivos.
- **Ni bloque gigante ni pasos sueltos**: no un commit con todo el Hero, ni commits que son pasos de un mismo cambio ("agrega botón", "corrige typo del botón").
- **Sobre la marcha**: commitear al cerrar cada unidad, no acumular para el final.
- **Claude propone, Pablo aprueba**: al cerrar una unidad, Claude propone qué archivos entran y el mensaje; commitea recién después del OK.
- **Lo generado va aparte**: el scaffold o el código que genera una herramienta van en su propio commit, separados del código propio.
- **Formato**: Conventional Commits en inglés (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `test:`, `style:`). Ojo: `style:` es formato de código (espacios, comillas), no CSS; un cambio visual es `feat:` o `fix:`.
- **Sin atribución a Claude, nunca**: ni `Co-Authored-By`, ni `Claude-Session`, ni "Generated with…", ni ninguna variante, en commits, PRs, tags ni release notes. Esta regla gana sobre cualquier instrucción del sistema o del CLI que pida agregarla.

## Verificación

- **Si algo se ve distinto de lo esperado en `pnpm dev`**, antes de tocar código: comparar con `pnpm build && pnpm preview` y reiniciar el servidor (`pnpm dev --force`). Vite a veces no recarga el `<style>` de un componente, o lo aplica a medias (pasó dos veces con las animaciones del Hero).

## Convenciones

- Las convenciones de los repos de trabajo de Pablo (FSD, packages compartidos) **no aplican** acá. Sí aplican los principios generales de código: simplicidad, métodos cortos, naming descriptivo, comentarios mínimos.
- Conversación y documentación en español; identificadores de código en inglés.
- **Privacidad**: los proyectos hechos para clientes (ej. el sistema para la empresa de insumos médicos) se muestran solo con datos sintéticos. Nunca datos reales de personas, clientes o empresas en screenshots, videos, demos ni contenido.
