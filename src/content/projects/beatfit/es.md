---
title: "BeatFit"
summary: "App para armar y seguir rutinas de entrenamiento por intervalos: bloques, ejercicios por tiempo o repeticiones, descansos, rachas y estadísticas."
problem: "Las apps de entrenamiento por intervalos traían rutinas fijas y era incómodo armar una propia."
solution: "Una app para armar rutinas con bloques, ejercicios por tiempo o repeticiones y descansos, seguirlas con un temporizador guiado y ver las rachas y estadísticas de entrenamiento."
tourDescription: "Se arma una rutina: un bloque de 4 repeticiones con un ejercicio por tiempo y descansos entre repeticiones. Al comenzarla, el temporizador guía cada ejercicio y cada descanso, y muestra qué viene después. Al final, las estadísticas: la racha, los totales, la actividad reciente y los ejercicios más usados."
---

Expo con TypeScript estricto y la nueva arquitectura, sin backend: todo se guarda en SQLite con Drizzle, y la interfaz nunca toca la base directamente. El motor del entrenamiento es un reducer puro que recibe la hora en cada acción, así cada transición es determinista y se testea sin temporizadores reales.

Se controla por voz ("siguiente", "pausa") en español, inglés y portugués, y los sonidos bajan el volumen de la música en vez de cortarla. En segundo plano, una notificación con cuenta regresiva nativa sigue el entrenamiento. Los pasos por tiempo se agendan de antemano, pero una serie por repeticiones corta esa cadena, porque no se sabe cuándo termina. Las funciones premium van con RevenueCat, detrás de una interfaz con una implementación de desarrollo.
