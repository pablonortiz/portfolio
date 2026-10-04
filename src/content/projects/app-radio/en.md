---
title: "Onda Ceibo"
summary: "Radio app for a group of AM and FM stations: listen live, switch between stations, search them and reach their social media."
problem: "The group's stations could only be heard on air or on the web, with no app of their own for phones."
solution: "An app to listen live to each of the group's stations, switch between them, search them by name and reach their social media, with light and dark modes."
tourDescription: "A station plays and the arrows switch to another, with the phone's volume on the same screen. Then more stations are browsed, one is searched for by name and played, and the theme, light or dark, is switched from the settings."
---

Published on Google Play, built with React Native without Expo, in JavaScript. Audio uses react-native-track-player with its own service, so it keeps playing in the background and can be controlled from the lock screen. Volume is the system's, the station search ignores accents (Unicode normalization), the light or dark theme persists between sessions and the news is shown in a WebView.
