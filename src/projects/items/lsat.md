---
layout: project.njk
title: LSAT Prep Tracker
description: A 14-week personal study dashboard with cross-device sync, score trending, and miss-pattern analysis. Built for my own Fordham Law admissions cycle.
excerpt: A 14-week personal study dashboard with cross-device sync, score trending, and miss-pattern analysis. Built for my own Fordham Law admissions cycle.
date: 2026-01-15
featured: true
status: live
liveUrl: https://lsat.jayegger.com
githubUrl: https://github.com/Jcegger/lsat
tech: [HTML, CSS, JavaScript, Supabase]
draft: false
---

## Why I built it

Off-the-shelf LSAT prep apps track scores but not the patterns behind them. I wanted something that would surface exactly where my prep was breaking down: which question types I missed most, whether my score trajectory was on pace for a 167 target, and what to drill next. So I built it from scratch with no framework overhead.

## What it does

**Daily task dashboard.** Surfaces the day's prep agenda based on where I am in the 14-week schedule. One glance tells me what to open.

**Session logger.** Logs each practice session with section type, score, and time. Raw data that feeds everything else.

**Score tracker with trendline.** Plots practice test scores over time with a projection toward the target. Makes it obvious whether the trajectory is on pace or needs correction.

**Miss-pattern tracker.** Aggregates wrong answers by question type across sessions and surfaces the top weak areas. The part that actually changed how I allocated study time.

## Stack

Vanilla HTML, CSS, and JavaScript with no build step. Cross-device sync via Supabase (Postgres-backed). Hosted on GitHub Pages with Cloudflare DNS routing to lsat.jayegger.com.

The no-build-step constraint was deliberate. Fewer moving parts means less that can break, and I wanted to be able to iterate fast without touching a config file.

## What I learned

Handling Supabase auth client-side without a framework pushed me to think carefully about session state and token refresh. The miss-pattern aggregation was the most interesting data problem: grouping by question type across sessions while keeping the UI reactive without a state management library required some careful structuring of the local data layer.
