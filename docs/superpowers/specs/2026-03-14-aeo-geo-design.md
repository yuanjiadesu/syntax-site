# AEO/GEO Design for syntax.fitness

**Date:** 2026-03-14
**Goal:** Optimize syntax.fitness for AI answer engines (ChatGPT, Perplexity, Google AI Overviews, etc.) to discover, cite, and recommend Syntax Fitness — driving app downloads.

## Context

syntax.fitness is a static GitHub Pages site for Syntax Fitness, a plain-text, local-first workout tracker with AI coaching. Currently 6 pages (landing, privacy, terms, support, share, play graphic). No structured data, no sitemap, minimal SEO beyond a basic title and meta description.

**Competitors:** Strong, Hevy, JEFIT, FitNotes, Fitbod, Freeletics, and other AI fitness apps.

**Existing external content:**
- Reddit post: https://www.reddit.com/r/smartfitness/comments/1rt6k18/i_built_a_plain_text_workout_tracker_thats_ai/
- Superlinear Academy post: https://www.superlinear.academy/c/share-your-projects/ai-917755

---

## Section 1: Structured Data & Meta Tags (All Existing Pages)

### JSON-LD Structured Data

- **`index.html`** — `SoftwareApplication` schema
  - name, operatingSystem (iOS, Android), applicationCategory (HealthApplication), price (Free), offers (free tier + pro tier), description, screenshot URLs, author Organization, download URLs
- **`privacy.html`**, **`terms.html`** — `WebPage` schema
- **`support.html`** — `ContactPage` schema
- **`share/index.html`** — `WebPage` with `BreadcrumbList`

### Enhanced Meta Tags (All Pages)

- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter Card: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
- Canonical URL on every page
- Improved `<meta name="description">` per page — written as concise answers to queries AI engines would field

### Semantic HTML Improvements

- Add `<main>` wrapper where missing
- Ensure proper heading hierarchy (h1 → h2 → h3)
- Improve `alt` text on images where needed

### Site Infrastructure

- **`sitemap.xml`** — all pages with `<lastmod>` and `<priority>`
- **`robots.txt`** — allow all crawlers, reference sitemap, explicit allow for AI bots:
  - GPTBot, ClaudeBot, PerplexityBot, Applebot, Google-Extended

---

## Section 2: New Content Pages

### 1. `/faq.html` — FAQ Page

**Target queries:** "Is Syntax free?", "best offline workout tracker?", "workout tracker that doesn't need account"

10-15 Q&A pairs covering:
- Is Syntax free? What does Pro add?
- Does it work offline / without an account?
- How does the AI coach work?
- What format are workouts saved in?
- Can I export my data?
- Does it sync with Apple Health?
- How is my data stored / is it private?
- What's the difference vs Strong / Hevy / Fitbod?
- Is it available on Android?
- Can I share routines with friends?

**Schema:** `FAQPage` JSON-LD — the highest-impact schema for AI answer extraction.

**Writing style:** Concise, direct answers (2-3 sentences each) that AI engines can quote verbatim.

### 2. `/compare.html` — "Syntax vs Other Workout Trackers"

**Target queries:** "best workout tracker app 2026", "Strong vs Hevy", "best AI workout app", "best offline workout tracker", "workout tracker with data export"

- Comparison table: Syntax vs Strong vs Hevy vs JEFIT vs FitNotes vs Fitbod vs Freeletics
- Axes: data ownership, offline-first, AI coaching, pricing, export format, privacy, platforms
- Honest — acknowledge competitor strengths (social features, exercise video depth)
- Narrative sections below the table explaining Syntax's differentiators

**Schema:** `WebPage` — the structured HTML table itself is what AI engines parse.

### 3. `/plain-text-fitness.html` — "What Is Plain-Text Workout Tracking?"

**Target queries:** "plain text workout log", "markdown workout tracker", "local first fitness app", "workout data portability"

- Philosophy: why markdown, why local-first, why no database
- Expanded file format examples (strength, cardio, routines, preferences)
- Benefits: portability, AI-agent readability, longevity, no vendor lock-in
- Positions Syntax as the reference implementation

### 4. `/ai-coach.html` — "How the AI Coach Works"

**Target queries:** "AI personal trainer app", "AI workout generator", "ChatGPT workout plan app", "AI fitness coach app"

- How it works: reads training history, knows equipment, persona system, generates structured markdown plans
- Differentiation from algorithm-based apps (Fitbod, Freeletics) vs conversational AI
- Example interactions and generated plans
- Privacy angle: AI processing without cloud storage of your data

---

## Section 3: AI Crawler Strategy & Interlinking

### robots.txt — AI Bot Permissions

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://syntax.fitness/sitemap.xml
```

### sitemap.xml

All 10 pages (6 existing + 4 new) with `<lastmod>` dates and `<priority>`:
- Highest priority: `index.html`, `faq.html`
- High priority: `compare.html`, `ai-coach.html`, `plain-text-fitness.html`
- Normal priority: remaining pages

### Interlinking Strategy

- **Nav bar:** Add "faq" and "compare" links
- **Each new page:** Links back to App Store / Play Store download CTAs
- **FAQ page:** Links to ai-coach, plain-text-fitness, compare where relevant
- **Landing page:** Add "learn more" section above footer linking to new pages
- **Footer:** Updated with all page links

### External Citation Signals

- Reference Reddit and Superlinear posts as social proof in FAQ or landing page
- Add `sameAs` property in Organization JSON-LD pointing to external profiles:
  - GitHub repo
  - Reddit post
  - Superlinear Academy post
  - App Store listing
  - Play Store listing

---

## Out of Scope

- Blog / ongoing content marketing
- Server-side rendering or framework migration
- Analytics or tracking scripts
- Paid advertising or ASO (App Store Optimization)
