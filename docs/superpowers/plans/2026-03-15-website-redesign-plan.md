# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify the website's nav and theme across all 16 pages (8 EN + 8 ZH) with dropdown navigation, app-matching color tokens, and light/dark/high-contrast theme support.

**Architecture:** Extract shared CSS (theme tokens, nav, footer) into `style.css`, shared JS (theme toggle, mobile hamburger) into `site.js`. Each page links to both files and retains only page-specific inline styles. Nav uses pure CSS dropdowns on desktop, JS-toggled hamburger on mobile.

**Tech Stack:** Static HTML, CSS custom properties, vanilla JS (~50 lines total)

**Spec:** `docs/superpowers/specs/2026-03-15-website-redesign-design.md`

---

## File Structure

| File | Purpose |
|------|---------|
| **Create:** `style.css` | Shared CSS: reset, theme tokens (3 themes), nav + dropdown, footer, typography, responsive |
| **Create:** `site.js` | Theme toggle (localStorage + prefers-color-scheme) + mobile hamburger toggle |
| **Modify:** `index.html` | Replace inline nav/theme CSS with `style.css` link, new nav HTML, new footer |
| **Modify:** `ai-coach.html` | Same as index |
| **Modify:** `faq.html` | Same as index |
| **Modify:** `compare.html` | Same as index |
| **Modify:** `plain-text-fitness.html` | Same as index |
| **Modify:** `privacy.html` | Same + migrate from JetBrains Mono, remove dark-only vars |
| **Modify:** `terms.html` | Same as privacy |
| **Modify:** `support.html` | Same as privacy |
| **Modify:** `zh/index.html` | Same as EN index, Chinese nav labels, `../style.css` path |
| **Modify:** `zh/ai-coach.html` | Same pattern |
| **Modify:** `zh/faq.html` | Same pattern |
| **Modify:** `zh/compare.html` | Same pattern |
| **Modify:** `zh/plain-text-fitness.html` | Same pattern |
| **Modify:** `zh/privacy.html` | Same pattern |
| **Modify:** `zh/terms.html` | Same pattern |
| **Modify:** `zh/support.html` | Same pattern |

---

## Chunk 1: Shared Infrastructure

### Task 1: Create `style.css`

**Files:**
- Create: `style.css`

- [ ] **Step 1: Write the shared CSS file**

`style.css` contains:

1. **Reset** — `* { margin: 0; padding: 0; box-sizing: border-box; }`
2. **Theme tokens** — `:root` (light default), `[data-theme="dark"]`, `[data-theme="high-contrast"]`, `@media (prefers-color-scheme: dark)` fallback
3. **Base typography** — body font, link styles, headings
4. **Nav** — logo, dropdown triggers, dropdown panels, theme toggle, lang switcher, download CTA
5. **Mobile nav** — hamburger button, panel, expandable sections (below 700px)
6. **Footer** — minimal centered copyright
7. **Reduced motion** — disable transitions when `prefers-reduced-motion: reduce`

CSS variable mapping (light theme as `:root` default):

```css
:root {
  /* surfaces */
  --surface-0: #f0efec;
  --surface-1: #fafaf8;
  --surface-2: #e6e5e0;
  --surface-3: #d6d5d0;
  /* ink */
  --ink-1: #1c1a16;
  --ink-2: #4a4840;
  --ink-3: #8a8880;
  /* borders */
  --line: #cccbc6;
  /* accent */
  --accent: #2c2a26;
  --accent-wash: rgba(44, 42, 38, 0.1);
  /* semantic */
  --green: #1d7a1e;
  --blue: #1e5bb4;
  --red: #c43030;
  --yellow: #9a7000;
  /* tokens */
  --radius: 6px;
  --radius-sm: 4px;
  --mono: 'IBM Plex Mono', monospace;
  --serif: 'Newsreader', Georgia, serif;
  /* shadow for dropdowns */
  --dropdown-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --surface-0: #121210;
    --surface-1: #1a1a18;
    --surface-2: #222220;
    --surface-3: #2c2c28;
    --ink-1: #c8c6c0;
    --ink-2: #9c9890;
    --ink-3: #706e66;
    --line: #2c2c28;
    --accent: #c4c0b8;
    --accent-wash: rgba(196, 192, 184, 0.08);
    --green: #bae67e;
    --blue: #82aaff;
    --red: #f07178;
    --yellow: #ffd580;
    --dropdown-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }
}

[data-theme="dark"] {
  --surface-0: #121210;
  --surface-1: #1a1a18;
  --surface-2: #222220;
  --surface-3: #2c2c28;
  --ink-1: #c8c6c0;
  --ink-2: #9c9890;
  --ink-3: #706e66;
  --line: #2c2c28;
  --accent: #c4c0b8;
  --accent-wash: rgba(196, 192, 184, 0.08);
  --green: #bae67e;
  --blue: #82aaff;
  --red: #f07178;
  --yellow: #ffd580;
  --dropdown-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

[data-theme="high-contrast"] {
  --surface-0: #000000;
  --surface-1: #0a0a0a;
  --surface-2: #1a1a1a;
  --surface-3: #2a2a2a;
  --ink-1: #ffffff;
  --ink-2: #cccccc;
  --ink-3: #999999;
  --line: #444444;
  --accent: #ffffff;
  --accent-wash: rgba(255, 255, 255, 0.1);
  --green: #5fff5f;
  --blue: #5faaff;
  --red: #ff5f5f;
  --yellow: #ffcc00;
  --dropdown-shadow: 0 8px 24px rgba(0,0,0,0.5);
}

[data-theme="light"] {
  /* explicit light — same as :root defaults */
  --surface-0: #f0efec;
  --surface-1: #fafaf8;
  --surface-2: #e6e5e0;
  --surface-3: #d6d5d0;
  --ink-1: #1c1a16;
  --ink-2: #4a4840;
  --ink-3: #8a8880;
  --line: #cccbc6;
  --accent: #2c2a26;
  --accent-wash: rgba(44, 42, 38, 0.1);
  --green: #1d7a1e;
  --blue: #1e5bb4;
  --red: #c43030;
  --yellow: #9a7000;
  --dropdown-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
```

Nav HTML structure that all pages will use (EN version):

```html
<nav class="nav">
  <a href="index.html" class="nav-logo">syntax</a>
  <div class="nav-menu" id="nav-menu">
    <div class="nav-group">
      <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">features</button>
      <div class="nav-dropdown" role="menu">
        <a href="ai-coach.html" role="menuitem">ai coach</a>
        <a href="plain-text-fitness.html" role="menuitem">plain-text fitness</a>
      </div>
    </div>
    <div class="nav-group">
      <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">resources</button>
      <div class="nav-dropdown" role="menu">
        <a href="faq.html" role="menuitem">faq</a>
        <a href="compare.html" role="menuitem">compare</a>
        <a href="support.html" role="menuitem">support</a>
      </div>
    </div>
    <div class="nav-group">
      <button class="nav-trigger" aria-haspopup="true" aria-expanded="false">legal</button>
      <div class="nav-dropdown" role="menu">
        <a href="privacy.html" role="menuitem">privacy</a>
        <a href="terms.html" role="menuitem">terms</a>
      </div>
    </div>
  </div>
  <div class="nav-actions">
    <button class="theme-toggle" id="theme-toggle" title="Toggle theme" aria-label="Toggle theme">
      <!-- SVG icon set by JS -->
    </button>
    <div class="nav-lang"><span>EN</span> / <a href="zh/PAGE.html">中文</a></div>
    <a href="https://apps.apple.com/gb/app/syntax-fitness/id6759859329" class="nav-cta" target="_blank">download</a>
  </div>
  <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
```

Nav CSS covers:
- `.nav` — flex, space-between, max-width 960px, centered
- `.nav-logo` — font-size 16px, font-weight 500, color var(--ink-1), letter-spacing 0.08em
- `.nav-menu` — flex, gap 4px (desktop), hidden behind hamburger (mobile)
- `.nav-group` — position relative (dropdown anchor)
- `.nav-trigger` — button reset, font-size 14px, color var(--ink-2), padding 8px 12px, cursor pointer
- `.nav-trigger:hover` — color var(--ink-1), background var(--surface-2), border-radius var(--radius-sm)
- `.nav-dropdown` — position absolute, top 100%, left 0, background var(--surface-1), border, shadow, border-radius, opacity 0, pointer-events none, transform translateY(4px), transition 150ms
- `.nav-group:hover .nav-dropdown, .nav-group:focus-within .nav-dropdown` — opacity 1, pointer-events auto, transform translateY(0)
- `.nav-dropdown a` — display block, padding 10px 16px, color var(--ink-2), font-size 13px, white-space nowrap
- `.nav-dropdown a:hover` — background var(--surface-2), color var(--ink-1)
- `.nav-dropdown a.active` — color var(--accent)
- `.nav-actions` — flex, align-items center, gap 16px
- `.theme-toggle` — button reset, 32px square, flex center, color var(--ink-3), cursor pointer
- `.theme-toggle:hover` — color var(--ink-1)
- `.nav-lang` — font-size 13px, color var(--ink-3)
- `.nav-cta` — font-size 13px, font-weight 500, padding 8px 16px, background var(--accent), color var(--surface-0), border-radius var(--radius), letter-spacing 0.02em
- `.nav-cta:hover` — opacity 0.85
- `.nav-hamburger` — display none (visible only on mobile)

Mobile (max-width 700px):
- `.nav-menu` — display none when closed, full-width panel when `.nav-menu.open`
- `.nav-hamburger` — display flex, 3 spans as hamburger lines
- `.nav-actions` — hide lang switcher and theme toggle (moved into panel)
- `.nav-cta` — stays visible in nav bar

Footer CSS:
```css
.footer {
  padding: 24px 32px;
  text-align: center;
  font-size: 12px;
  color: var(--ink-3);
  font-family: var(--mono);
}
```

- [ ] **Step 2: Verify the CSS file is valid**

Open any existing page in browser and manually link `style.css` to verify no syntax errors.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: add shared style.css with theme tokens and nav styles"
```

---

### Task 2: Create `site.js`

**Files:**
- Create: `site.js`

- [ ] **Step 1: Write the shared JS file**

`site.js` contains two features:

**Theme toggle** (~25 lines):
```js
(function() {
  const themes = ['auto', 'light', 'dark', 'high-contrast'];
  const icons = { auto: '...monitor SVG...', light: '...sun SVG...', dark: '...moon SVG...', 'high-contrast': '...eye SVG...' };
  const labels = { auto: 'System', light: 'Light', dark: 'Dark', 'high-contrast': 'High contrast' };

  function getStored() { return localStorage.getItem('syntax-theme') || 'auto'; }
  function apply(theme) {
    if (theme === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) { btn.innerHTML = icons[theme]; btn.title = labels[theme]; }
  }

  // On load
  apply(getStored());

  // Toggle click
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('#theme-toggle');
    if (!btn) return;
    const current = getStored();
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    localStorage.setItem('syntax-theme', next);
    apply(next);
  });
})();
```

**Mobile hamburger** (~25 lines):
```js
(function() {
  document.addEventListener('click', function(e) {
    // Hamburger toggle
    const hamburger = e.target.closest('#nav-hamburger');
    if (hamburger) {
      const menu = document.getElementById('nav-menu');
      const open = menu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      hamburger.classList.toggle('active', open);
      return;
    }
    // Mobile section expand
    const trigger = e.target.closest('.nav-trigger');
    if (trigger && window.innerWidth <= 700) {
      const group = trigger.parentElement;
      group.classList.toggle('expanded');
      trigger.setAttribute('aria-expanded', group.classList.contains('expanded'));
      return;
    }
  });
  // Escape to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const menu = document.getElementById('nav-menu');
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
        document.getElementById('nav-hamburger').setAttribute('aria-expanded', 'false');
        document.getElementById('nav-hamburger').classList.remove('active');
        document.getElementById('nav-hamburger').focus();
      }
    }
  });
})();
```

SVG icons (16x16, inline):
- **Auto (monitor):** `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="8" rx="1"/><path d="M5 14h6M8 11v3"/></svg>`
- **Light (sun):** `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"/></svg>`
- **Dark (moon):** `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13.36 10.05A5.5 5.5 0 015.95 2.64 6 6 0 1013.36 10.05z"/></svg>`
- **High-contrast (eye):** `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/></svg>`

- [ ] **Step 2: Commit**

```bash
git add site.js
git commit -m "feat: add site.js with theme toggle and mobile hamburger"
```

---

## Chunk 2: Update English Pages

### Task 3: Update `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update `<head>`**

Replace the Google Fonts link to load IBM Plex Mono + Newsreader (keep current). Add links to `style.css?v=1` and `site.js`.

Remove inline CSS for: reset, `:root` vars, `body::before` paper texture, `.nav`, `.nav-logo`, `.nav-links`, `.nav-lang`, `.footer`, `.footer-links`. These are now in `style.css`.

Keep inline CSS for: `.hero`, `.phone-frame`, `.story`, `.dual`, `.vault`, `.features`, `.closing`, and all page-specific layout styles.

- [ ] **Step 2: Replace nav HTML**

Replace the current `<nav>` block with the new dropdown nav HTML from Task 1. Set the lang switcher link to `zh/index.html`. Mark no dropdown item as active (this is the index page).

- [ ] **Step 3: Replace footer HTML**

Replace the current footer with:
```html
<footer class="footer">&copy; 2026 Syntax</footer>
```

- [ ] **Step 4: Update inline CSS variable references**

In page-specific inline styles, replace old variable names:
- `var(--bg)` → `var(--surface-0)`
- `var(--surface)` → `var(--surface-1)`
- `var(--ink-1)`, `var(--ink-2)`, `var(--ink-3)` → same names (compatible)
- `var(--line)` → same name (compatible)
- `var(--green)` → `var(--green)` for semantic uses, `var(--accent)` for interactive elements
- `var(--code-bg)` → `var(--surface-3)` or keep as page-specific var
- `var(--code-ink)`, `var(--code-dim)`, `var(--code-green)`, `var(--code-line)` → define as page-specific vars using theme tokens

The code blocks (vault section) need their own mapping since they're always dark:
```css
.vault-tree, .vault-example {
  --code-bg: #1c1c1c;
  --code-ink: #d4d0c8;
  --code-dim: #6b6560;
  --code-green: #22c55e;
  --code-line: #2e2e2e;
}
```
These code blocks should remain dark regardless of theme (they represent terminal output).

- [ ] **Step 5: Verify in browser**

Open `index.html` in browser. Check:
- Nav displays with 3 dropdowns + download button
- Dropdowns open on hover
- Theme toggle cycles through 4 states
- Language switcher works
- Page content unchanged
- Footer shows only copyright

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: index.html — new dropdown nav, unified theme"
```

---

### Task 4: Update `ai-coach.html`

**Files:**
- Modify: `ai-coach.html`

- [ ] **Step 1: Update head, nav, footer**

Same pattern as Task 3:
- Add `style.css?v=1` and `site.js` links
- Remove inline nav/theme/footer CSS (keep page-specific styles)
- Replace nav with dropdown nav HTML, lang link → `zh/ai-coach.html`
- Mark "ai coach" as active: add `class="active"` to the ai-coach link in features dropdown
- Replace footer with minimal copyright
- Remove `body::before` paper texture from inline styles
- Update CSS variable references (`--bg` → `--surface-0`, etc.)

- [ ] **Step 2: Verify in browser**

Check nav, dropdowns, "ai coach" highlighted in features dropdown, phone screenshots display correctly, theme switching works.

- [ ] **Step 3: Commit**

```bash
git add ai-coach.html
git commit -m "feat: ai-coach.html — new dropdown nav, unified theme"
```

---

### Task 5: Update `faq.html`

**Files:**
- Modify: `faq.html`

- [ ] **Step 1: Update head, nav, footer**

Same pattern. Mark "faq" as active in resources dropdown. Lang link → `zh/faq.html`. Remove paper texture. Update CSS vars.

- [ ] **Step 2: Verify and commit**

```bash
git add faq.html
git commit -m "feat: faq.html — new dropdown nav, unified theme"
```

---

### Task 6: Update `compare.html`

**Files:**
- Modify: `compare.html`

- [ ] **Step 1: Update head, nav, footer**

Same pattern. Mark "compare" as active in resources dropdown. Lang link → `zh/compare.html`. Remove paper texture. Update CSS vars.

The comparison table uses `var(--green-dim)` for `.row-syntax` — replace with `var(--accent-wash)`.

- [ ] **Step 2: Verify and commit**

```bash
git add compare.html
git commit -m "feat: compare.html — new dropdown nav, unified theme"
```

---

### Task 7: Update `plain-text-fitness.html`

**Files:**
- Modify: `plain-text-fitness.html`

- [ ] **Step 1: Update head, nav, footer**

Same pattern. Mark "plain-text fitness" as active in features dropdown. Lang link → `zh/plain-text-fitness.html`. Remove paper texture. Update CSS vars. Code blocks stay dark (same approach as index vault section).

- [ ] **Step 2: Verify and commit**

```bash
git add plain-text-fitness.html
git commit -m "feat: plain-text-fitness.html — new dropdown nav, unified theme"
```

---

### Task 8: Update `privacy.html` (dark theme migration)

**Files:**
- Modify: `privacy.html`

- [ ] **Step 1: Update head**

- Replace JetBrains Mono font link with IBM Plex Mono + Newsreader
- Add `style.css?v=1` and `site.js` links
- Remove ALL inline CSS (the entire `<style>` block) — this page's styles are simple enough to work with shared styles + minimal page-specific overrides

- [ ] **Step 2: Replace nav and footer**

Same dropdown nav HTML. Lang link → `zh/privacy.html`. Mark "privacy" as active in legal dropdown. Minimal footer.

- [ ] **Step 3: Add page-specific inline styles**

Privacy/terms/support pages use a narrow content column. Add minimal inline styles:

```css
.content {
  max-width: 640px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}
h1 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 4px;
}
.subtitle {
  font-size: 12px;
  color: var(--ink-3);
  margin-bottom: 40px;
}
h2 {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
  margin-top: 32px;
  margin-bottom: 10px;
}
p, li {
  font-size: 13px;
  color: var(--ink-2);
  margin-bottom: 10px;
  line-height: 1.8;
}
ul { padding-left: 20px; margin-bottom: 10px; }
li { margin-bottom: 6px; }
strong { color: var(--ink-1); font-weight: 600; }
hr {
  border: none;
  border-top: 1px solid var(--line);
  margin: 40px 0 24px;
}
```

Note: h2 color changes from `var(--green)` to `var(--accent)` to match the new design system.

- [ ] **Step 4: Verify in browser**

Check: page renders with IBM Plex Mono, theme-aware colors, dropdowns work, "privacy" highlighted in legal dropdown.

- [ ] **Step 5: Commit**

```bash
git add privacy.html
git commit -m "feat: privacy.html — unified theme, font migration"
```

---

### Task 9: Update `terms.html`

**Files:**
- Modify: `terms.html`

- [ ] **Step 1: Same migration as privacy.html**

Replace JetBrains Mono → IBM Plex Mono + Newsreader. Add shared CSS/JS. Replace nav/footer. Remove old inline CSS, add page-specific styles (same as privacy). Mark "terms" as active in legal dropdown. Lang link → `zh/terms.html`.

- [ ] **Step 2: Verify and commit**

```bash
git add terms.html
git commit -m "feat: terms.html — unified theme, font migration"
```

---

### Task 10: Update `support.html`

**Files:**
- Modify: `support.html`

- [ ] **Step 1: Same migration as privacy.html**

Replace JetBrains Mono → IBM Plex Mono + Newsreader. Add shared CSS/JS. Replace nav/footer. Remove old inline CSS, add page-specific styles. Mark "support" as active in resources dropdown. Lang link → `zh/support.html`.

The support page has unique elements (`.support-card`, `.faq` section) — keep those as inline styles but update variable references:
- `var(--surface)` → `var(--surface-1)`
- `var(--green)` → `var(--accent)` for interactive elements
- `var(--green-dim)` → `var(--accent-wash)`

- [ ] **Step 2: Verify and commit**

```bash
git add support.html
git commit -m "feat: support.html — unified theme, font migration"
```

---

## Chunk 3: Update Chinese Pages

### Task 11: Update all 8 ZH pages

**Files:**
- Modify: `zh/index.html`
- Modify: `zh/ai-coach.html`
- Modify: `zh/faq.html`
- Modify: `zh/compare.html`
- Modify: `zh/plain-text-fitness.html`
- Modify: `zh/privacy.html`
- Modify: `zh/terms.html`
- Modify: `zh/support.html`

All ZH pages follow the exact same changes as their EN counterparts, with these differences:

1. **CSS/JS paths** use `../style.css?v=1` and `../site.js` (parent directory)
2. **Nav labels** in Chinese:
   ```
   syntax    功能 ▾   资源 ▾   法律 ▾    [theme]  EN/中文   [下载]
   ```
   - 功能 → AI 教练 (`ai-coach.html`), 纯文本健身 (`plain-text-fitness.html`)
   - 资源 → 常见问题 (`faq.html`), 对比 (`compare.html`), 支持 (`support.html`)
   - 法律 → 隐私 (`privacy.html`), 条款 (`terms.html`)
3. **Lang switcher** is reversed: `<a href="../PAGE.html">EN</a> / <span>中文</span>`
4. **All dropdown hrefs** are relative (no `zh/` prefix since we're already in `zh/`)
5. **Download CTA** text: `下载`
6. **Active page** marking matches the current page

- [ ] **Step 1: Update `zh/index.html`**

Apply same changes as EN index. Chinese nav labels. `../style.css?v=1` path. Lang switcher reversed.

- [ ] **Step 2: Update `zh/ai-coach.html`**

Same pattern. Mark "AI 教练" as active.

- [ ] **Step 3: Update `zh/faq.html`**

Same pattern. Mark "常见问题" as active.

- [ ] **Step 4: Update `zh/compare.html`**

Same pattern. Mark "对比" as active.

- [ ] **Step 5: Update `zh/plain-text-fitness.html`**

Same pattern. Mark "纯文本健身" as active.

- [ ] **Step 6: Update `zh/privacy.html`**

Same pattern + font migration. Mark "隐私" as active.

- [ ] **Step 7: Update `zh/terms.html`**

Same pattern + font migration. Mark "条款" as active.

- [ ] **Step 8: Update `zh/support.html`**

Same pattern + font migration. Mark "支持" as active.

- [ ] **Step 9: Verify all ZH pages in browser**

Spot-check 3-4 pages: nav renders in Chinese, dropdowns work, theme toggle works, lang switcher goes to EN version.

- [ ] **Step 10: Commit**

```bash
git add zh/
git commit -m "feat: zh/ pages — new dropdown nav, unified theme, Chinese labels"
```

---

## Chunk 4: Final Verification

### Task 12: Cross-page verification

- [ ] **Step 1: Test all navigation paths**

Click through every dropdown link on both EN and ZH pages. Verify:
- All 8 EN pages reachable from any EN page's nav
- All 8 ZH pages reachable from any ZH page's nav
- Language switcher correctly links between EN ↔ ZH equivalents
- Active page highlighting is correct on every page

- [ ] **Step 2: Test theme toggle**

On one page, cycle through all 4 theme states. Verify:
- Light theme matches spec colors
- Dark theme matches spec colors
- High-contrast theme matches spec colors
- Auto follows system preference
- Preference persists across page navigation (localStorage)

- [ ] **Step 3: Test mobile hamburger**

Resize browser to <700px. Verify:
- Hamburger icon appears
- Menu opens/closes on click
- Dropdown sections expand/collapse
- Download CTA visible outside hamburger
- Escape closes menu

- [ ] **Step 4: Add .superpowers/ to .gitignore**

```bash
echo ".superpowers/" >> .gitignore
git add .gitignore
git commit -m "chore: gitignore .superpowers/"
```

- [ ] **Step 5: Final commit if any fixes needed**

Address any issues found during verification and commit fixes.
