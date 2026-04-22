#!/usr/bin/env node
/**
 * Scaffold a new blog post.
 * Usage:
 *   node scripts/new-post.js --title "My Post Title" [--slug my-post-title]
 * Slug defaults to a slugified title. Date defaults to today (YYYY-MM-DD).
 */

const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function pad(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--title') out.title = args[++i];
    else if (args[i] === '--slug') out.slug = args[++i];
    else if (args[i] === '--date') out.date = args[++i];
  }
  return out;
}

function main() {
  const { title, slug, date } = parseArgs();
  if (!title) {
    console.error('Error: --title is required');
    process.exit(1);
  }
  const finalSlug = slug ? slugify(slug) : slugify(title);
  if (!finalSlug) {
    console.error('Error: slug could not be generated');
    process.exit(1);
  }
  const finalDate = date || today();

  const destDir = path.join(__dirname, '..', 'src', 'blog', 'posts');
  const destPath = path.join(destDir, `${finalSlug}.md`);

  if (fs.existsSync(destPath)) {
    console.error(`Error: file already exists at ${destPath}`);
    process.exit(1);
  }

  const template = `---
layout: post.njk
title: "${title}"
description: "Short description"
date: ${finalDate}
updated:
tags: []
excerpt: "Short teaser."
featuredImage:
featured: false
draft: true
---

Write your post here in Markdown.

`;

  fs.writeFileSync(destPath, template, 'utf8');
  console.log(`Created ${destPath}`);
}

main();
