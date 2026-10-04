---
title: "BeatFit"
summary: "App to build and follow interval training routines: blocks, timed or rep-based exercises, rests, streaks and statistics."
problem: "Interval training apps came with fixed routines, and building your own was awkward."
solution: "An app to build routines with blocks, timed or rep-based exercises and rests, follow them with a guided timer, and see training streaks and statistics."
tourDescription: "A routine is built: a block of 4 reps with a timed exercise and rests between reps. Once started, the timer guides each exercise and each rest, showing what comes next. Finally, the statistics: the streak, the totals, recent activity and the most used exercises."
---

Expo with strict TypeScript and the New Architecture, with no backend: everything is stored in SQLite with Drizzle, and the UI never touches the database directly. The workout engine is a pure reducer that receives the current time with each action, so every transition is deterministic and can be tested without real timers.

It can be controlled by voice ("next", "pause") in Spanish, English and Portuguese, and its sounds lower the music's volume instead of cutting it. In the background, a notification with a native countdown follows the workout. Timed steps are scheduled ahead, but a set by reps breaks that chain, since there's no knowing when it ends. Premium features go through RevenueCat, behind an interface with a development implementation.
