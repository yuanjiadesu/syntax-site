# AEO/GEO Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make syntax.fitness discoverable, citable, and recommendable by AI answer engines (ChatGPT, Perplexity, Google AI Overviews) to drive app downloads.

**Architecture:** Static HTML site on GitHub Pages. No build step, no framework. Each page is a self-contained HTML file with inline CSS. New content pages use the landing page design system (light theme, IBM Plex Mono + Newsreader). Structured data via JSON-LD in `<script>` tags. Site infrastructure via `robots.txt` and `sitemap.xml` at the root.

**Tech Stack:** HTML, CSS, JSON-LD (schema.org), XML (sitemap)

**Design systems in use:**
- **Landing page style** (index.html, share/index.html): Light bg `#f5f0e8`, fonts `IBM Plex Mono` + `Newsreader`, green `#1a8a42`, max-width 960px
- **Legal/support style** (privacy.html, terms.html, support.html): Dark bg `#0a0a0a`, font `JetBrains Mono`, green `#4ade80`, max-width 640px

New content pages (faq, compare, plain-text-fitness, ai-coach) use the **landing page style** since they are marketing/discovery pages.

---

## Chunk 1: Site Infrastructure & Existing Page Enrichment

### Task 1: Create robots.txt

**Files:**
- Create: `robots.txt`

- [ ] **Step 1: Create robots.txt with AI bot permissions**

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

- [ ] **Step 2: Commit**

```bash
git add robots.txt
git commit -m "feat: add robots.txt with AI bot permissions"
```

---

### Task 2: Create sitemap.xml

**Files:**
- Create: `sitemap.xml`

- [ ] **Step 1: Create sitemap.xml with all pages**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://syntax.fitness/</loc>
    <lastmod>2026-03-14</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://syntax.fitness/faq.html</loc>
    <lastmod>2026-03-14</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://syntax.fitness/compare.html</loc>
    <lastmod>2026-03-14</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://syntax.fitness/ai-coach.html</loc>
    <lastmod>2026-03-14</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://syntax.fitness/plain-text-fitness.html</loc>
    <lastmod>2026-03-14</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://syntax.fitness/privacy.html</loc>
    <lastmod>2026-02-28</lastmod>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://syntax.fitness/terms.html</loc>
    <lastmod>2026-03-09</lastmod>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://syntax.fitness/support.html</loc>
    <lastmod>2026-03-09</lastmod>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>https://syntax.fitness/share/</loc>
    <lastmod>2026-03-10</lastmod>
    <priority>0.3</priority>
  </url>
</urlset>
```

Note: `play-feature-graphic.html` is excluded (internal asset). The `lastmod` dates for existing pages should be verified from `git log --format=%ai <file>` during implementation. Use the current date for new pages.

- [ ] **Step 2: Add noindex to play-feature-graphic.html**

Add `<meta name="robots" content="noindex, nofollow">` to the `<head>` of `play-feature-graphic.html`.

- [ ] **Step 3: Commit**

```bash
git add sitemap.xml play-feature-graphic.html
git commit -m "feat: add sitemap.xml, noindex play-feature-graphic"
```

---

### Task 3: Enrich index.html with structured data and meta tags

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add canonical URL, Open Graph, Twitter Card meta tags**

Add to `<head>` after the existing `<meta name="description">`:

```html
<link rel="canonical" href="https://syntax.fitness/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://syntax.fitness/">
<meta property="og:title" content="Syntax — Plain-Text Workout Tracker with AI Coach">
<meta property="og:description" content="A fast, minimal workout tracker that saves every set as plain text. Built-in AI coach. No account, no cloud. Your data stays on your phone.">
<meta property="og:image" content="https://syntax.fitness/screen-workout.png">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Syntax — Plain-Text Workout Tracker with AI Coach">
<meta name="twitter:description" content="A fast, minimal workout tracker that saves every set as plain text. Built-in AI coach. No account, no cloud. Your data stays on your phone.">
<meta name="twitter:image" content="https://syntax.fitness/screen-workout.png">
```

- [ ] **Step 2: Add JSON-LD SoftwareApplication + Organization schema**

Add before `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Syntax Fitness",
  "operatingSystem": ["iOS", "Android"],
  "applicationCategory": "HealthApplication",
  "description": "A plain-text workout tracker with a built-in AI coach. Every set saved as markdown. No account, no cloud, no tracking.",
  "url": "https://syntax.fitness",
  "screenshot": [
    "https://syntax.fitness/screen-workout.png",
    "https://syntax.fitness/screen-ai-ask.png",
    "https://syntax.fitness/screen-ai.png",
    "https://syntax.fitness/screen-train.png",
    "https://syntax.fitness/screen-exercises.png",
    "https://syntax.fitness/screen-exercise-new.png"
  ],
  "offers": [
    {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free — unlimited workout logging"
    },
    {
      "@type": "Offer",
      "price": "3.99",
      "priceCurrency": "USD",
      "description": "Pro Monthly — AI coaching and more",
      "priceValidUntil": "2027-12-31"
    },
    {
      "@type": "Offer",
      "price": "29.99",
      "priceCurrency": "USD",
      "description": "Pro Yearly — AI coaching and more",
      "priceValidUntil": "2027-12-31"
    }
  ],
  "downloadUrl": [
    "https://apps.apple.com/gb/app/syntax-fitness/id6759859329",
    "https://play.google.com/apps/internaltest/4701061349251878084"
  ],
  "author": {
    "@type": "Organization",
    "name": "Syntax",
    "url": "https://syntax.fitness",
    "sameAs": [
      "https://github.com/yuanjiadesu/syntax-site",
      "https://apps.apple.com/gb/app/syntax-fitness/id6759859329",
      "https://www.reddit.com/r/smartfitness/comments/1rt6k18/i_built_a_plain_text_workout_tracker_thats_ai/",
      "https://www.superlinear.academy/c/share-your-projects/ai-917755"
    ]
  }
}
</script>
```

- [ ] **Step 3: Wrap content in semantic `<main>` tag**

In `index.html`, change `<div class="main">` (line 414) to `<main class="main">`, and change the corresponding `</div>` immediately before `<footer class="footer">` (line 603) to `</main>`.

**Note:** The Play Store `downloadUrl` uses an internal test track URL (`/apps/internaltest/...`). This is a known limitation — update to the production Play Store URL when available.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add structured data, OG/Twitter meta, semantic HTML to index"
```

---

### Task 4: Enrich privacy.html with meta tags and structured data

**Files:**
- Modify: `privacy.html`

- [ ] **Step 1: Add meta description, canonical, OG tags, and WebPage JSON-LD**

Add to `<head>` after the `<title>`:

```html
<meta name="description" content="Syntax Fitness privacy policy. Your data stays on your device. No servers, no cloud sync, no analytics. AI coaching is optional and routed securely.">
<link rel="canonical" href="https://syntax.fitness/privacy.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://syntax.fitness/privacy.html">
<meta property="og:title" content="Privacy Policy — Syntax Fitness">
<meta property="og:description" content="Your data stays on your device. No servers, no cloud sync, no analytics.">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Privacy Policy — Syntax Fitness">
<meta name="twitter:description" content="Your data stays on your device. No servers, no cloud sync, no analytics.">
```

Add before `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "url": "https://syntax.fitness/privacy.html",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Syntax Fitness",
    "url": "https://syntax.fitness"
  }
}
</script>
```

- [ ] **Step 2: Add `<main>` semantic wrapper**

In `privacy.html`, change `<div class="content">` to `<main class="content">` and its closing `</div>` (before `<footer>`) to `</main>`.

- [ ] **Step 3: Commit**

```bash
git add privacy.html
git commit -m "feat: add meta tags and WebPage schema to privacy page"
```

---

### Task 5: Enrich terms.html with meta tags and structured data

**Files:**
- Modify: `terms.html`

- [ ] **Step 1: Add meta description, canonical, OG tags, and WebPage JSON-LD**

Add to `<head>` after the `<title>`:

```html
<meta name="description" content="Syntax Fitness terms of use. Free to log workouts. Pro subscription for AI coaching at $3.99/mo or $29.99/yr. Your data stays on your device.">
<link rel="canonical" href="https://syntax.fitness/terms.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://syntax.fitness/terms.html">
<meta property="og:title" content="Terms of Use — Syntax Fitness">
<meta property="og:description" content="Free to log workouts. Pro subscription for AI coaching. Your data stays on your device.">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Terms of Use — Syntax Fitness">
<meta name="twitter:description" content="Free to log workouts. Pro subscription for AI coaching. Your data stays on your device.">
```

Add before `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Use",
  "url": "https://syntax.fitness/terms.html",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Syntax Fitness",
    "url": "https://syntax.fitness"
  }
}
</script>
```

- [ ] **Step 2: Add `<main>` semantic wrapper**

In `terms.html`, change `<div class="content">` to `<main class="content">` and its closing `</div>` (before `<footer>`) to `</main>`.

- [ ] **Step 3: Commit**

```bash
git add terms.html
git commit -m "feat: add meta tags and WebPage schema to terms page"
```

---

### Task 6: Enrich support.html with meta tags and structured data

**Files:**
- Modify: `support.html`

- [ ] **Step 1: Add meta description, canonical, OG tags, and ContactPage JSON-LD**

Add to `<head>` after the `<title>`:

```html
<meta name="description" content="Get help with Syntax Fitness. Report bugs on GitHub, email support@syntax.fitness, or check the FAQ for common questions about data storage, exports, and Apple Health.">
<link rel="canonical" href="https://syntax.fitness/support.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://syntax.fitness/support.html">
<meta property="og:title" content="Support — Syntax Fitness">
<meta property="og:description" content="Get help with Syntax Fitness. Report bugs, email support, or check the FAQ.">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Support — Syntax Fitness">
<meta name="twitter:description" content="Get help with Syntax Fitness. Report bugs, email support, or check the FAQ.">
```

Add before `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Support",
  "url": "https://syntax.fitness/support.html",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Syntax Fitness",
    "url": "https://syntax.fitness"
  }
}
</script>
```

- [ ] **Step 2: Add `<main>` semantic wrapper**

In `support.html`, change `<div class="content">` to `<main class="content">` and its closing `</div>` (before `<footer>`) to `</main>`.

- [ ] **Step 3: Commit**

```bash
git add support.html
git commit -m "feat: add meta tags and ContactPage schema to support page"
```

---

### Task 7: Enrich share/index.html with meta tags and structured data

**Files:**
- Modify: `share/index.html`

- [ ] **Step 1: Add canonical, OG tags, and WebPage + BreadcrumbList JSON-LD**

Add to `<head>` after the existing `<meta name="description">`:

```html
<link rel="canonical" href="https://syntax.fitness/share/">
<meta property="og:type" content="website">
<meta property="og:url" content="https://syntax.fitness/share/">
<meta property="og:title" content="Shared Routine — Syntax Fitness">
<meta property="og:description" content="Someone shared a workout routine with you on Syntax. Open to start training.">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Shared Routine — Syntax Fitness">
<meta name="twitter:description" content="Someone shared a workout routine with you on Syntax. Open to start training.">
```

Add before `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Shared Routine",
  "url": "https://syntax.fitness/share/",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Syntax Fitness",
    "url": "https://syntax.fitness"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Syntax",
        "item": "https://syntax.fitness/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Share",
        "item": "https://syntax.fitness/share/"
      }
    ]
  }
}
</script>
```

- [ ] **Step 2: Commit**

```bash
git add share/index.html
git commit -m "feat: add meta tags and BreadcrumbList schema to share page"
```

---

### Task 8: Update navigation and footer on all existing pages

**Files:**
- Modify: `index.html`
- Modify: `privacy.html`
- Modify: `terms.html`
- Modify: `support.html`

- [ ] **Step 1: Update index.html nav to add faq and compare links**

Change the nav-links in `index.html` from:
```html
<div class="nav-links">
  <a href="privacy.html">privacy</a>
  <a href="terms.html">terms</a>
  <a href="support.html">support</a>
</div>
```
To:
```html
<div class="nav-links">
  <a href="faq.html">faq</a>
  <a href="compare.html">compare</a>
  <a href="privacy.html">privacy</a>
  <a href="terms.html">terms</a>
  <a href="support.html">support</a>
</div>
```

- [ ] **Step 2: Add "learn more" section to index.html above the footer**

**CSS dependency:** This section reuses the `.features`, `.feature-grid`, and `.feature-item` classes already defined in `index.html`'s `<style>` block (around line 306).

Add before the closing `</main>` tag, after the closing CTA section:

```html
<!-- learn more -->
<hr class="sep">
<section class="features" style="padding: 56px 0 40px;">
  <div class="feature-grid">
    <div class="feature-item">
      <strong><a href="faq.html">frequently asked questions</a></strong>
      <span>everything you need to know about syntax — pricing, privacy, data format, and more.</span>
    </div>
    <div class="feature-item">
      <strong><a href="compare.html">how syntax compares</a></strong>
      <span>side-by-side with strong, hevy, fitbod, and other workout trackers.</span>
    </div>
    <div class="feature-item">
      <strong><a href="plain-text-fitness.html">plain-text fitness</a></strong>
      <span>why your training data should be markdown files, not database rows.</span>
    </div>
    <div class="feature-item">
      <strong><a href="ai-coach.html">the ai coach</a></strong>
      <span>how the ai reads your history and writes real programs — not templates.</span>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Update index.html footer to include all links**

Change footer-links in `index.html` to:
```html
<div class="footer-links">
  <a href="faq.html">faq</a>
  <a href="compare.html">compare</a>
  <a href="privacy.html">privacy</a>
  <a href="terms.html">terms</a>
  <a href="support.html">support</a>
  <a href="https://github.com/yuanjiadesu/syntax-site">github</a>
</div>
```

- [ ] **Step 4: Update nav-links in privacy.html, terms.html, support.html**

In each file, change the nav-links to:
```html
<div class="nav-links">
  <a href="faq.html">faq</a>
  <a href="compare.html">compare</a>
  <a href="privacy.html">privacy</a>
  <a href="terms.html">terms</a>
  <a href="support.html">support</a>
</div>
```

- [ ] **Step 5: Update footer-links in privacy.html, terms.html, support.html**

In each file, change footer-links to:
```html
<div class="footer-links">
  <a href="faq.html">faq</a>
  <a href="compare.html">compare</a>
  <a href="privacy.html">privacy</a>
  <a href="terms.html">terms</a>
  <a href="support.html">support</a>
  <a href="https://github.com/yuanjiadesu/syntax-site" target="_blank">github</a>
</div>
```

**Note:** `share/index.html` is excluded from nav/footer updates — it is a minimal deep-link redirect page with no nav or footer.

- [ ] **Step 6: Commit**

```bash
git add index.html privacy.html terms.html support.html
git commit -m "feat: update nav and footer with new content page links"
```

---

## Chunk 2: New Content Pages

**Implementation note for all new pages:** Each new page must be a complete, self-contained HTML file. Copy the full `<head>` and `<style>` block from `index.html` as the starting template (including CSS variables, font imports, nav styles, footer styles, responsive breakpoints). Then add page-specific styles and content. The implementer should read `index.html` in full and replicate its design system. Key CSS classes to reuse: `.nav`, `.nav-logo`, `.nav-links`, `.footer`, `.footer-links`, `.sep`, `.phone-frame`. All new pages use the landing page light theme.

### Task 9: Create faq.html

**Files:**
- Create: `faq.html`

This is the highest-impact page for AEO. Uses landing page design system (light theme). Contains FAQPage JSON-LD schema so AI engines can directly extract Q&A pairs.

- [ ] **Step 1: Create faq.html**

Full file content — uses same CSS variables, fonts, and layout patterns as `index.html`. Key structural elements:
- Same nav as index.html (with faq, compare, support links)
- `<main>` wrapper with max-width 960px
- h1: "frequently asked questions"
- Subtitle mentioning this covers Syntax Fitness
- 12 Q&A items using `<details>` elements for accessibility, each with a `<summary>` (question) and `<p>` (answer)
- FAQPage JSON-LD schema with all 12 Q&A pairs
- Download CTA at bottom
- Same footer as index.html

**Questions to include (with concise, quotable answers):**

1. **What is Syntax?** — A plain-text workout tracker with a built-in AI coach. Every set is saved as a markdown file on your phone. No account needed, no cloud sync, no tracking.
2. **Is Syntax free?** — Yes. Unlimited workout logging is free with no ads. Syntax Pro ($3.99/mo or $29.99/yr) adds AI coaching, Apple Health sync, and more.
3. **Does it work offline?** — Yes. Syntax works entirely offline. All data is stored on your device. The only feature that needs internet is the AI coach.
4. **Do I need to create an account?** — No. There is no account, no sign-up, no email required. Open the app and start logging.
5. **What format are workouts saved in?** — Plain markdown (.md) files. Each workout is a human-readable text file you can open in any text editor, back up however you want, or feed to an AI agent.
6. **Can I export my data?** — Yes. Your workouts are files in a folder on your phone. Access them via the Files app (iOS) or file manager (Android). No export button needed — the files are already yours.
7. **Does it sync with Apple Health?** — Yes. Syntax imports runs, walks, and cycling from Apple Health and writes strength workouts back. All your training in one place.
8. **How does the AI coach work?** — Tell it what you need ("give me a leg day for 30 minutes") and it reads your history, knows your equipment, and writes a structured program. Choose a persona — the hype-beast or the stoic. [Learn more](ai-coach.html).
9. **Is my data private?** — Yes. Syntax has no servers, no analytics, no tracking. Your data never leaves your device unless you use the optional AI coach, which routes messages securely. [Read our privacy policy](privacy.html).
10. **How is Syntax different from Strong, Hevy, or Fitbod?** — Syntax stores data as plain text you own, not in a proprietary database. It's local-first with no account needed. And the AI coach writes conversational programs, not algorithm-generated templates. [See the comparison](compare.html).
11. **Is it available on Android?** — Yes. Syntax is available on both iOS (App Store) and Android (Google Play).
12. **Can I share routines with friends?** — Yes. Send a link. Your friend opens it and starts training — no sign-up needed.

Meta tags:
```html
<title>FAQ — Syntax Fitness</title>
<meta name="description" content="Frequently asked questions about Syntax Fitness. Free plain-text workout tracker with AI coaching. No account, offline-first, your data stays on your phone.">
<link rel="canonical" href="https://syntax.fitness/faq.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://syntax.fitness/faq.html">
<meta property="og:title" content="FAQ — Syntax Fitness | Plain-Text Workout Tracker">
<meta property="og:description" content="Everything you need to know about Syntax — pricing, privacy, data format, AI coaching, and more.">
<meta property="og:image" content="https://syntax.fitness/screen-workout.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="FAQ — Syntax Fitness">
<meta name="twitter:description" content="Everything you need to know about Syntax — pricing, privacy, data format, AI coaching, and more.">
<meta name="twitter:image" content="https://syntax.fitness/screen-workout.png">
```

FAQPage JSON-LD schema — include **all 12 questions** in the `mainEntity` array. Each entry follows this structure:
```json
{
  "@type": "Question",
  "name": "<question text>",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "<answer text, plain text only, no HTML>"
  }
}
```

Use the exact question/answer text from the 12 Q&A items listed above. Strip any markdown links from the answer `text` field (JSON-LD answers must be plain text). The full JSON-LD block will be approximately 80 lines. Do not truncate — include all 12 entries.

- [ ] **Step 2: Verify the page renders correctly**

Open `faq.html` in a browser and verify layout, links, and readability.

- [ ] **Step 3: Validate JSON-LD**

Copy the JSON-LD block and verify it's valid JSON (no trailing commas, proper nesting).

- [ ] **Step 4: Commit**

```bash
git add faq.html
git commit -m "feat: add FAQ page with FAQPage schema for AEO"
```

---

### Task 10: Create compare.html

**Files:**
- Create: `compare.html`

Comparison page targeting "best workout tracker" queries. Uses landing page design system.

- [ ] **Step 1: Create compare.html**

Key structural elements:
- Same nav/footer as faq.html
- h1: "how syntax compares"
- Subtitle: "an honest look at how syntax stacks up against other workout trackers."
- HTML `<table>` with comparison data (this is critical — AI engines parse tables well)
- Narrative sections below the table

**Comparison table columns:** App, Data Format, Offline, AI Coach, Pricing, Data Export, Privacy

**Rows:**

| App | Data Format | Offline | AI Coach | Pricing | Data Export | Privacy |
|-----|------------|---------|----------|---------|-------------|---------|
| **Syntax** | Plain text (markdown) | Full offline | Conversational AI (Gemini) | Free + Pro $3.99/mo | Files on your phone | No servers, no analytics |
| **Strong** | Proprietary database | Partial (needs sync) | No | Free + Pro $4.99/mo | CSV export | Cloud account required |
| **Hevy** | Proprietary database | Partial | No | Free + Pro $8.99/mo | CSV export | Cloud account required |
| **JEFIT** | Proprietary database | Partial | No | Free + Elite $6.99/mo | Limited | Ads in free tier |
| **FitNotes** | SQLite database | Full offline | No | Free (Android only) | CSV export | Local storage |
| **Fitbod** | Proprietary database | No | Algorithm-based | $12.99/mo | No | Cloud required |
| **Freeletics** | Proprietary database | Partial | Algorithm-based | $7.49/mo | No | Cloud required |

**Narrative sections after the table:**
- "Why plain text matters" — link to plain-text-fitness.html
- "AI coach vs algorithm" — link to ai-coach.html
- "What others do better" — honest section acknowledging social features, video libraries, Apple Watch apps
- Download CTA

Table styling: use the landing page design system. Light background, monospace font, clean borders. Make table horizontally scrollable on mobile.

Meta tags:
```html
<title>Syntax vs Strong vs Hevy vs Fitbod — Workout Tracker Comparison 2026</title>
<meta name="description" content="Compare Syntax with Strong, Hevy, JEFIT, FitNotes, Fitbod, and Freeletics. See which workout tracker offers the best data ownership, AI coaching, privacy, and pricing.">
<link rel="canonical" href="https://syntax.fitness/compare.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://syntax.fitness/compare.html">
<meta property="og:title" content="Syntax vs Strong vs Hevy vs Fitbod — Workout Tracker Comparison 2026">
<meta property="og:description" content="Compare workout trackers on data ownership, AI coaching, privacy, and pricing.">
<meta property="og:image" content="https://syntax.fitness/screen-workout.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Syntax vs Strong vs Hevy vs Fitbod — Workout Tracker Comparison">
<meta name="twitter:description" content="Compare workout trackers on data ownership, AI coaching, privacy, and pricing.">
<meta name="twitter:image" content="https://syntax.fitness/screen-workout.png">
```

WebPage JSON-LD schema (simple — the table structure is what matters).

- [ ] **Step 2: Verify the page renders correctly**

Open `compare.html` in a browser. Verify table readability, mobile scroll, links.

- [ ] **Step 3: Commit**

```bash
git add compare.html
git commit -m "feat: add comparison page targeting workout tracker queries"
```

---

### Task 11: Create plain-text-fitness.html

**Files:**
- Create: `plain-text-fitness.html`

Philosophy/concept page. Positions Syntax as the reference implementation of plain-text fitness.

- [ ] **Step 1: Create plain-text-fitness.html**

Key structural elements:
- Same nav/footer
- h1: "what is plain-text workout tracking?"
- Sections:
  1. **The problem** — most fitness apps lock your data in proprietary databases. If the app dies, your data dies with it.
  2. **The idea** — every workout is a markdown file. Human-readable, machine-parseable, future-proof.
  3. **The format** — show expanded examples of workout files (strength, cardio, routines, preferences). Reuse the vault section styling from index.html (dark code blocks with syntax highlighting).
  4. **Why it matters** — portability (move to any app), AI-readability (feed your vault to any AI agent), longevity (plain text outlives any app), no vendor lock-in.
  5. **Syntax is the app for this** — brief pitch, download CTA.

Meta tags:
```html
<title>What Is Plain-Text Workout Tracking? — Syntax Fitness</title>
<meta name="description" content="Plain-text workout tracking saves every set as a markdown file you own. No proprietary database, no vendor lock-in. Your training data outlives any app.">
<link rel="canonical" href="https://syntax.fitness/plain-text-fitness.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://syntax.fitness/plain-text-fitness.html">
<meta property="og:title" content="What Is Plain-Text Workout Tracking?">
<meta property="og:description" content="Save every set as a markdown file you own. No proprietary database, no vendor lock-in.">
<meta property="og:image" content="https://syntax.fitness/screen-workout.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="What Is Plain-Text Workout Tracking?">
<meta name="twitter:description" content="Save every set as a markdown file you own. No proprietary database, no vendor lock-in.">
<meta name="twitter:image" content="https://syntax.fitness/screen-workout.png">
```

- [ ] **Step 2: Verify the page renders correctly**

- [ ] **Step 3: Commit**

```bash
git add plain-text-fitness.html
git commit -m "feat: add plain-text fitness explainer page"
```

---

### Task 12: Create ai-coach.html

**Files:**
- Create: `ai-coach.html`

AI coach explainer page. Differentiates from algorithm-based fitness apps.

- [ ] **Step 1: Create ai-coach.html**

Key structural elements:
- Same nav/footer
- h1: "how the ai coach works"
- Sections:
  1. **Not a template engine** — unlike Fitbod or Freeletics, the AI coach is a conversational AI that reads your actual training history.
  2. **How it works** — you tell it what you need in natural language. It reads your workout history, knows your equipment and preferences, and writes a structured program in markdown.
  3. **Personas** — choose your coaching style. The hype-beast screams encouragement. The stoic gives you sets and shuts up.
  4. **Example interaction** — show a mock conversation (user asks for a leg day, AI responds with structured plan). Use the screenshots from the landing page.
  5. **Privacy** — AI processing without cloud storage of your data. Messages routed through a secure proxy. Nothing stored on servers.
  6. **Pricing** — AI coach is part of Syntax Pro ($3.99/mo or $29.99/yr). Free tier includes unlimited logging.
  7. Download CTA.

Meta tags:
```html
<title>AI Workout Coach — How Syntax Uses AI to Plan Your Training</title>
<meta name="description" content="Syntax's AI coach reads your workout history and writes personalized programs in plain text. Not a template engine — a conversational AI that knows your training.">
<link rel="canonical" href="https://syntax.fitness/ai-coach.html">
<meta property="og:type" content="website">
<meta property="og:url" content="https://syntax.fitness/ai-coach.html">
<meta property="og:title" content="AI Workout Coach — How Syntax Uses AI to Plan Your Training">
<meta property="og:description" content="A conversational AI that reads your workout history and writes real programs — not templates.">
<meta property="og:image" content="https://syntax.fitness/screen-ai.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="AI Workout Coach — Syntax Fitness">
<meta name="twitter:description" content="A conversational AI that reads your workout history and writes real programs — not templates.">
<meta name="twitter:image" content="https://syntax.fitness/screen-ai.png">
```

Include phone mockup screenshots (screen-ai-ask.png, screen-ai.png) using the same phone-frame styling from index.html.

- [ ] **Step 2: Verify the page renders correctly**

- [ ] **Step 3: Commit**

```bash
git add ai-coach.html
git commit -m "feat: add AI coach explainer page"
```

---

### Task 12.5: Add external citation / social proof references

**Files:**
- Modify: `faq.html`

- [ ] **Step 1: Add a "community" or "read more" section at the bottom of faq.html (before CTA)**

Add a brief section with links to external posts about Syntax:

```html
<section style="padding: 40px 0;">
  <h2 style="font-family: var(--serif); font-size: 24px; font-weight: 400; margin-bottom: 16px;">read more about syntax</h2>
  <ul style="font-size: 15px; line-height: 2; color: var(--ink-2); list-style: none;">
    <li><a href="https://www.reddit.com/r/smartfitness/comments/1rt6k18/i_built_a_plain_text_workout_tracker_thats_ai/" target="_blank">r/smartfitness — "I built a plain text workout tracker that's AI-native"</a></li>
    <li><a href="https://www.superlinear.academy/c/share-your-projects/ai-917755" target="_blank">Superlinear Academy — AI-powered fitness tracking</a></li>
  </ul>
</section>
```

This satisfies the spec's "External Citation Signals" requirement to reference external posts as social proof. The `sameAs` JSON-LD property (already in Task 3) handles the machine-readable side.

- [ ] **Step 2: Commit**

```bash
git add faq.html
git commit -m "feat: add external citation links to FAQ page"
```

---

## Chunk 3: Final Validation

### Task 13: Validate all structured data and cross-links

- [ ] **Step 1: Check all JSON-LD blocks are valid JSON**

For each HTML file with JSON-LD, extract the script content and verify valid JSON syntax.

- [ ] **Step 2: Verify all internal links work**

Check that every `<a href>` to an internal page points to a file that exists:
- faq.html, compare.html, plain-text-fitness.html, ai-coach.html, privacy.html, terms.html, support.html, share/

- [ ] **Step 3: Verify sitemap.xml lists all public pages**

Cross-reference sitemap.xml URLs with actual files. Confirm play-feature-graphic.html is excluded.

- [ ] **Step 4: Verify robots.txt is accessible**

Confirm robots.txt exists at root and references the sitemap URL.

- [ ] **Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: validation fixes for structured data and links"
```
