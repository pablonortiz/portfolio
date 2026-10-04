---
title: "Onda Ceibo"
summary: "App de radio para un grupo de emisoras AM y FM: escuchar en vivo, pasar de una emisora a otra, buscarlas y llegar a sus redes."
problem: "Las emisoras del grupo solo se escuchaban por el aire o desde la web, sin una app propia para el celular."
solution: "Una app para escuchar en vivo cada emisora del grupo, pasar de una a otra, buscarlas por nombre y llegar a sus redes sociales, con modo claro y oscuro."
---

App publicada en Google Play, hecha con React Native sin Expo y en JavaScript. El audio usa react-native-track-player con un servicio propio, así sigue sonando en segundo plano y se controla desde la pantalla de bloqueo. El volumen es el del sistema, la búsqueda de emisoras ignora acentos (normalización Unicode), el tema claro u oscuro se guarda entre sesiones y las noticias se muestran en un WebView.
