---
layout: project.njk
title: Leeg Coach
description: A terminal-based in-game League of Legends coaching assistant powered by Claude.
excerpt: A terminal-based in-game League of Legends coaching assistant powered by Claude.
date: 2026-03-01
featured: true
status: wip
purpose: by Jay for in-game League of Legends sessions to get real-time tactical coaching without alt-tabbing
role: Solo build
timeline: Mar 2026 – present
githubUrl: https://github.com/Jcegger/leeg-coach
tech: [Python, Claude API, Riot API]
stackDetail: "Python stdlib for the polling loop and terminal UI -- no dependencies beyond the Anthropic SDK. Riot's Live Client Data API runs locally during active matches, so the whole thing works on localhost with no extra infrastructure. Claude Sonnet 4.6 handles AI coaching with prompt caching to keep per-game cost under $0.10; Haiku handles lighter tasks like auto-generating matchup notes."
draft: false
---

<!-- What was annoying enough that you built this? What kept pulling you out of the game?
     Keep it tight -- 2-3 sentences. -->

## The itch



<!-- What does it actually do? Walk through the main pieces.
     Bullet points or short paragraphs both work. -->

## What shipped



<!-- One thing you explicitly chose or explicitly ruled out, and why.
     Could be a stack choice, a feature you cut, a constraint you set. -->

## One decision



<!-- Honest current state. "I use it most sessions," "still rough," whatever is true. -->

## Where it stands


