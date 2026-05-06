---
layout: project.njk
title: Leeg Coach
description: A terminal-based in-game League of Legends coaching assistant. Polls Riot's Live Client Data API every 3 seconds for real-time objective timers and AI-generated tactical advice powered by Claude.
excerpt: A terminal-based in-game League of Legends coaching assistant. Polls Riot's Live Client Data API every 3 seconds for real-time objective timers and AI-generated tactical advice powered by Claude.
date: 2026-03-01
featured: true
status: wip
githubUrl: https://github.com/Jcegger/leeg-coach
tech: [Python, Claude API, Riot API]
draft: false
---

## Why I built it

Mid-game decision-making is where most games are won or lost, and I kept alt-tabbing out to look things up: objective timers, matchup counters, item paths against a specific enemy comp. The Riot Games Live Client Data API exposes everything happening in a live match locally, so a real-time coaching tool that runs in the background became a natural project.

## What it does

**Live enemy panel.** Polls the Riot API every 3 seconds and displays the enemy team's current champion states, items, and gold. No alt-tab required.

**Objective timers.** Tracks Baron, Dragon, and turret states in real time so you always know the next window.

**Rule-based advice panel.** Surfaces hardcoded tactical notes for common in-game situations. Fast, deterministic, no API cost.

**Optional AI coach.** When enabled, sends the current game state to Claude (Sonnet 4.6 with prompt caching) for contextual matchup advice. Currently includes matchup notes for Mundo and Sivir, with more in progress.

**Optional voice output.** Reads advice aloud via ElevenLabs or edge-tts so you can keep your eyes on the game.

## Stack

Python standard library plus the Anthropic SDK. The Riot Live Client Data API runs as a local process during active matches, so all the polling happens on localhost with no network dependency beyond Riot's client.

Optional integrations: ElevenLabs for high-quality voice synthesis or edge-tts as a free alternative.

## Cost

With the Claude integration enabled: roughly $0.05 to $0.10 per game. Prompt caching is what makes this practical. The base game state context (champion pool, current items, summoner spells) is cached after the first call, and only the delta (new events, objective states) counts against input tokens on each subsequent poll. Without caching, a 30-minute game at 3-second polling intervals would be prohibitively expensive.

## What I learned

Prompt caching strategy matters a lot at high polling frequency. The key insight was separating stable context (who is in the game, what they build) from volatile context (current game time, recent events, objectives up), so the stable portion stays in cache across the full session. ElevenLabs latency also required rethinking how advice is queued: playing audio synchronously blocked the polling loop, so voice output runs on a separate thread.
