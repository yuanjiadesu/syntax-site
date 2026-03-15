# Website Redesign: Unified Nav & Theme

## Problem

The current website has inconsistent navigation (index shows 3 links, other pages show 5), two clashing visual themes (light paper vs dark terminal), and no clear information hierarchy. Visitors can't easily find pages or understand the site structure.

## Goals

- Unified dropdown nav across all pages
- Consistent visual theme matching the Syntax app's color system
- All pages reachable from top nav — no footer navigation needed
- Support light/dark/high-contrast themes, defaulting to system preference

## Navigation

### Structure

```
syntax    features ▾   resources ▾   legal ▾    [theme toggle]  EN/中文   [download]
```

- **features** → ai coach, plain-text fitness
- **resources** → faq, compare, support
- **legal** → privacy, terms
- **download** → primary CTA button, links to App Store (iOS) or Google Play (Android) via platform detection; falls back to App Store link
- **theme toggle** → cycles: auto → light → dark → high-contrast → auto
- **EN/中文** → language switcher, hardcoded per-page links (current pattern)
- **syntax** (logo) → always links to `index.html`

### Dropdown Visual Design

- Background: `var(--surface-1)` with `1px solid var(--line)` border
- Border radius: `var(--radius)` (6px)
- Box shadow: `0 8px 24px rgba(0,0,0,0.12)` (light), `0 8px 24px rgba(0,0,0,0.3)` (dark)
- Item padding: `10px 16px`
- Item hover: `var(--surface-2)` background
- Active page: `var(--accent)` color on text
- Width: auto (fits content)
- Position: left-aligned under trigger
- Animation: `opacity` + `translateY(4px)` transition, 150ms ease. Respects `prefers-reduced-motion`.

### Behavior

- Dropdowns open on hover (desktop) and tap (mobile)
- Active page highlighted in dropdown
- Nav is consistent across all 8 EN pages and all 8 ZH pages
- Keyboard: `aria-haspopup`, `aria-expanded`, arrow keys navigate items, Escape closes dropdown
- Mobile (below 700px): dropdowns collapse into a hamburger menu
  - Hamburger opens a full-width panel below the nav bar
  - Dropdown groups shown as expandable sections
  - Download CTA remains visible outside hamburger (sticky in nav bar)
  - Theme toggle and language switcher remain in hamburger panel
  - Toggle body: small JS (~15 lines) for open/close + focus trap

### Theme Toggle UI

- Icon-only button in nav
- Auto: monitor icon, Light: sun icon, Dark: moon icon, High-contrast: eye icon
- Icons as inline SVG, 16×16
- Tooltip on hover showing current mode name

### Footer

Minimal — just `© 2026 Syntax` centered. No navigation links.

## Theme System

### Approach

Use the Syntax app's CSS variable token system with the website's existing fonts. Remove the paper texture (`body::before` noise overlay) from all pages — it conflicts with the app's clean surface aesthetic.

### Fonts

- **Mono**: `'IBM Plex Mono', monospace` — body text, nav, labels, code
- **Serif**: `'Newsreader', Georgia, serif` — headlines (h1, h2)

Note: privacy.html, terms.html, and support.html currently use JetBrains Mono. These will be migrated to IBM Plex Mono to match the rest of the site. This will affect line lengths and spacing on those pages.

### Color Tokens (from app)

All colors defined as CSS custom properties on `:root`, switched via `data-theme` attribute.

#### Dark (default when system prefers dark)

```css
--surface-0: #121210;  /* page background */
--surface-1: #1a1a18;  /* cards, inputs, dropdown bg */
--surface-2: #222220;  /* hover states */
--surface-3: #2c2c28;  /* separators, banners */
--ink-1: #c8c6c0;      /* primary text, headings */
--ink-2: #9c9890;      /* secondary text, nav links */
--ink-3: #706e66;      /* decorative, captions */
--line: #2c2c28;       /* borders, dividers */
--accent: #c4c0b8;     /* links, active states, download button text */
--accent-wash: rgba(196, 192, 184, 0.08); /* selected backgrounds */
--green: #bae67e;      /* success states (not used in nav) */
--blue: #82aaff;       /* info states (not used in nav) */
--red: #f07178;        /* error states (not used in nav) */
--yellow: #ffd580;     /* warning states (not used in nav) */
```

#### Light (default when system prefers light)

```css
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
```

#### High Contrast

```css
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
```

### Semantic color usage

`--green`, `--blue`, `--red`, `--yellow` are available for page content (e.g., comparison table highlights, code block syntax) but are not used in the nav or theme chrome. The download CTA button uses `var(--accent)` for text on a `var(--accent-wash)` background, not green.

### Theme Switching

- Default: `prefers-color-scheme` media query (no `data-theme` attribute set)
- Toggle button in nav stores preference in `localStorage` key `syntax-theme`
- `data-theme="light|dark|high-contrast"` on `<html>` element
- No theme attribute = follow system
- Theme transitions: `transition: background-color 0.2s, color 0.2s` on body. Disabled when `prefers-reduced-motion: reduce`.

### Additional Design Tokens

```css
--radius: 6px;
--radius-sm: 4px;
--mono: 'IBM Plex Mono', monospace;
--serif: 'Newsreader', Georgia, serif;
```

## Pages Affected

All 16 pages (8 EN + 8 ZH):

| Page | Changes |
|------|---------|
| index.html | New nav, new theme, remove paper texture, remove old CSS variables |
| ai-coach.html | New nav, new theme, remove paper texture, update nav from 5 links to dropdown |
| faq.html | New nav, new theme, remove paper texture, update nav |
| compare.html | New nav, new theme, remove paper texture, update nav |
| plain-text-fitness.html | New nav, new theme, remove paper texture, update nav |
| privacy.html | New nav, new theme, migrate from JetBrains Mono to IBM Plex Mono |
| terms.html | New nav, new theme, migrate from JetBrains Mono to IBM Plex Mono |
| support.html | New nav, new theme, migrate from JetBrains Mono to IBM Plex Mono |
| zh/* | Mirror all changes with Chinese labels |

### Excluded pages

- `play-feature-graphic.html` — Google Play asset, not user-facing, no nav changes
- `share/index.html` — routine sharing page, separate concern, no nav changes

## Nav Labels (Chinese)

```
syntax    功能 ▾   资源 ▾   法律 ▾    [theme]  EN/中文   [下载]
```

- **功能** → AI 教练, 纯文本健身
- **资源** → 常见问题, 对比, 支持
- **法律** → 隐私, 条款

## Implementation Notes

### Shared CSS

Extract to a single `style.css` file linked from all 16 pages. Contains:
- CSS custom property definitions (all 3 themes)
- Nav styles (desktop + mobile + dropdowns)
- Footer styles
- Base typography and reset
- Theme transition rules

Page-specific styles remain inline in each HTML file. Use `style.css?v=1` query parameter for cache busting on deploys, increment manually.

### Dropdown Implementation

Pure CSS dropdowns using `:hover` and `:focus-within` — no JavaScript required for desktop. The dropdown container uses `position: absolute` relative to the nav item.

### Mobile Hamburger

At `max-width: 700px`:
- Nav links and dropdowns collapse behind a hamburger button (3-line icon)
- Hamburger toggles a full-width panel below the nav bar
- Panel contains dropdown groups as expandable sections (tap to expand/collapse)
- Download CTA button stays visible in the nav bar (not inside hamburger)
- Small JS (~30 lines): toggle open/close, expand/collapse sections, focus trap, Escape to close

### Theme Toggle

Small JS snippet (~20 lines):
- On load: read `localStorage('syntax-theme')`; if absent, detect `prefers-color-scheme`
- Set `data-theme` on `<html>` (or remove attribute for auto)
- Toggle cycles: auto → light → dark → high-contrast → auto
- Update icon to match current state
- Listen for `prefers-color-scheme` changes when in auto mode

### Accessibility

- Dropdown triggers: `aria-haspopup="true"`, `aria-expanded="false|true"`
- Dropdown menus: `role="menu"`, items as `role="menuitem"`
- Arrow key navigation within open dropdown
- Escape closes dropdown and returns focus to trigger
- `prefers-reduced-motion`: disable dropdown animation and theme transition
- All text meets WCAG AA contrast ratios (4.5:1 for body text, 3:1 for large text)

## Out of Scope

- Redesigning page content (only nav, theme, and footer change)
- Adding new pages
- Changing SEO metadata or structured data
- Modifying `share/index.html` or `play-feature-graphic.html`
