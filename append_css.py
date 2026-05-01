new_css = """
:root {
  --vd-ink: #24150d;
  --vd-ink-soft: #4b3020;
  --vd-tobacco-950: #140b06;
  --vd-tobacco-900: #1c0f08;
  --vd-tobacco-850: #26150b;
  --vd-tobacco-800: #321d10;
  --vd-tobacco-700: #4a2d19;
  --vd-tobacco-600: #694225;
  --vd-tobacco-500: #8a5a32;
  --vd-sepia-50: #fff8e8;
  --vd-sepia-100: #f8edcf;
  --vd-sepia-200: #ecd8a6;
  --vd-sepia-300: #d9b775;
  --vd-gold: #d7a84f;
  --vd-gold-soft: #f0cf7a;
  --vd-gold-dark: #9b6d25;
  --vd-wine: #582719;
  --vd-shadow: rgba(20, 11, 6, 0.58);
  --vd-paper: #f4e6c2;
  --vd-paper-deep: #e5c993;
  --vd-radius-xl: 34px;
  --vd-radius-lg: 24px;
  --vd-radius-md: 18px;
  --vd-serif: Georgia, "Times New Roman", Times, serif;
  --vd-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  color: var(--vd-sepia-50);
  background:
    radial-gradient(circle at 18% 8%, rgba(215, 168, 79, 0.16), transparent 34rem),
    radial-gradient(circle at 82% 10%, rgba(88, 39, 25, 0.22), transparent 30rem),
    linear-gradient(135deg, var(--vd-tobacco-950), var(--vd-tobacco-850) 42%, #100805);
  font-family: var(--vd-sans);
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.18;
  z-index: 9999;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.12) 0 1px, transparent 1px),
    radial-gradient(circle at 70% 40%, rgba(0,0,0,0.16) 0 1px, transparent 1px),
    radial-gradient(circle at 40% 80%, rgba(255,255,255,0.08) 0 1px, transparent 1px);
  background-size: 17px 17px, 23px 23px, 31px 31px;
  mix-blend-mode: soft-light;
}

::selection {
  background: rgba(215, 168, 79, 0.36);
  color: var(--vd-sepia-50);
}

.eyebrow,
.kicker,
.section-kicker {
  color: var(--vd-gold-soft);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.vd-premium-panel,
.memorial-card,
.education-card,
.contact-card,
.poet-card {
  position: relative;
  border: 1px solid rgba(215, 168, 79, 0.24);
  background:
    linear-gradient(145deg, rgba(255, 248, 232, 0.095), rgba(255, 248, 232, 0.035)),
    radial-gradient(circle at 12% 0%, rgba(215, 168, 79, 0.16), transparent 22rem),
    rgba(28, 15, 8, 0.72);
  box-shadow:
    0 26px 80px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 248, 232, 0.12);
  backdrop-filter: blur(14px);
}

.vd-premium-panel::before,
.memorial-card::before,
.education-card::before,
.contact-card::before,
.poet-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(90deg, transparent, rgba(215, 168, 79, 0.12), transparent),
    radial-gradient(circle at 50% 0%, rgba(255, 248, 232, 0.12), transparent 22rem);
  opacity: 0.85;
}

.memorial-portrait-bg,
.calixto-portrait-bg,
.hero-portrait-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.memorial-portrait-bg img,
.calixto-portrait-bg img,
.hero-portrait-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: sepia(0.36) contrast(1.08) saturate(0.84) brightness(0.72);
  transform: scale(1.06);
  animation: vdKenBurns 28s ease-in-out infinite alternate;
}

.memorial-portrait-bg::after,
.calixto-portrait-bg::after,
.hero-portrait-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(20, 11, 6, 0.94), rgba(20, 11, 6, 0.68) 42%, rgba(20, 11, 6, 0.34)),
    radial-gradient(circle at 68% 38%, rgba(215, 168, 79, 0.18), transparent 30rem),
    linear-gradient(180deg, rgba(20, 11, 6, 0.24), rgba(20, 11, 6, 0.88));
}

@keyframes vdKenBurns {
  0% {
    transform: scale(1.06) translate3d(-1.2%, -0.8%, 0);
  }
  100% {
    transform: scale(1.14) translate3d(1.4%, 0.9%, 0);
  }
}

.memorial-content,
.hero-content,
.calixto-content {
  position: relative;
  z-index: 1;
}

.memorial-content p:first-of-type::first-letter,
.story-prose p:first-of-type::first-letter,
.poet-body > p:first-of-type::first-letter {
  float: left;
  font-family: var(--vd-serif);
  font-size: 4.8rem;
  line-height: 0.78;
  padding: 0.12rem 0.42rem 0 0;
  color: var(--vd-gold-soft);
  text-shadow:
    0 2px 0 rgba(0,0,0,0.28),
    0 0 24px rgba(215,168,79,0.32);
}

.poets-premium-section {
  position: relative;
  padding: clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 4rem);
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 12%, rgba(215, 168, 79, 0.14), transparent 30rem),
    radial-gradient(circle at 82% 18%, rgba(88, 39, 25, 0.20), transparent 28rem),
    linear-gradient(180deg, rgba(20, 11, 6, 0.24), rgba(20, 11, 6, 0.78));
}

.poets-premium-section::before {
  content: "❦";
  position: absolute;
  top: 1.4rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(215, 168, 79, 0.34);
  font-family: var(--vd-serif);
  font-size: clamp(2.4rem, 8vw, 6.4rem);
  line-height: 1;
  pointer-events: none;
}

.poets-premium-header {
  max-width: 880px;
  margin: 0 auto clamp(2.2rem, 5vw, 4.2rem);
  text-align: center;
}

.poets-premium-header h2 {
  margin: 0.45rem 0 0.9rem;
  font-family: var(--vd-serif);
  font-size: clamp(2.4rem, 6vw, 5.8rem);
  line-height: 0.94;
  letter-spacing: -0.055em;
  color: var(--vd-sepia-50);
  text-wrap: balance;
  text-shadow: 0 18px 48px rgba(0, 0, 0, 0.42);
}

.poets-premium-header p:not(.eyebrow) {
  margin: 0 auto;
  max-width: 720px;
  color: rgba(255, 248, 232, 0.78);
  font-size: clamp(1rem, 1.8vw, 1.22rem);
  line-height: 1.75;
}

.poets-era-stack {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
}

.poets-era {
  position: relative;
}

.poets-era-title {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.poets-era-title span {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(215, 168, 79, 0.42), transparent);
}

.poets-era-title h3 {
  margin: 0;
  color: var(--vd-gold-soft);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  white-space: nowrap;
}

.poets-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.4rem);
}

.poet-card {
  border-radius: var(--vd-radius-lg);
  overflow: hidden;
  transition:
    transform 280ms ease,
    border-color 280ms ease,
    box-shadow 280ms ease,
    background 280ms ease;
}

.poet-card:hover,
.poet-card--open {
  transform: translateY(-3px);
  border-color: rgba(240, 207, 122, 0.56);
  box-shadow:
    0 34px 94px rgba(0, 0, 0, 0.46),
    0 0 0 1px rgba(240, 207, 122, 0.10),
    0 0 42px rgba(215, 168, 79, 0.10),
    inset 0 1px 0 rgba(255, 248, 232, 0.16);
}

.poet-card-button {
  position: relative;
  z-index: 1;
  width: 100%;
  display: grid;
  grid-template-columns: 96px 1fr auto;
  gap: 1rem;
  align-items: center;
  border: 0;
  padding: 1rem;
  color: inherit;
  text-align: left;
  background: transparent;
  cursor: pointer;
}

.poet-card-button:focus-visible {
  outline: 2px solid var(--vd-gold-soft);
  outline-offset: -4px;
  border-radius: var(--vd-radius-lg);
}

.poet-portrait-shell,
.poet-placeholder {
  width: 96px;
  height: 96px;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
  flex: 0 0 auto;
  background:
    radial-gradient(circle at 35% 25%, rgba(240, 207, 122, 0.28), transparent 36%),
    linear-gradient(145deg, var(--vd-tobacco-700), var(--vd-tobacco-950));
  box-shadow:
    0 14px 34px rgba(0, 0, 0, 0.34),
    0 0 0 1px rgba(215, 168, 79, 0.34),
    inset 0 1px 0 rgba(255, 248, 232, 0.12);
}

.poet-portrait-shell::after,
.poet-placeholder::after {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 24px;
  border: 1px solid rgba(240, 207, 122, 0.26);
  pointer-events: none;
}

.poet-portrait {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: sepia(0.34) contrast(1.08) saturate(0.82);
  transition: transform 360ms ease, filter 360ms ease;
}

.poet-card:hover .poet-portrait,
.poet-card--open .poet-portrait {
  transform: scale(1.06);
  filter: sepia(0.2) contrast(1.1) saturate(0.95) brightness(1.04);
}

.poet-portrait-fallback {
  display: none;
  width: 100%;
  height: 100%;
}

.poet-portrait-shell--fallback .poet-portrait-fallback {
  display: block;
}

.poet-placeholder {
  display: grid;
  place-items: center;
}

.poet-placeholder__grain {
  position: absolute;
  inset: 0;
  opacity: 0.26;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255, 248, 232, 0.25) 0 1px, transparent 1px),
    radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.28) 0 1px, transparent 1px);
  background-size: 11px 11px, 17px 17px;
}

.poet-placeholder__ring {
  position: relative;
  z-index: 1;
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid rgba(240, 207, 122, 0.58);
  background: rgba(20, 11, 6, 0.38);
}

.poet-placeholder__ring span {
  font-family: var(--vd-serif);
  color: var(--vd-gold-soft);
  font-size: 1.1rem;
  letter-spacing: 0.08em;
}

.poet-card-heading {
  display: grid;
  gap: 0.28rem;
  min-width: 0;
}

.poet-card-name {
  font-family: var(--vd-serif);
  font-size: clamp(1.26rem, 2vw, 1.86rem);
  line-height: 1.02;
  color: var(--vd-sepia-50);
  letter-spacing: -0.025em;
}

.poet-card-meta {
  color: rgba(240, 207, 122, 0.72);
  font-size: 0.8rem;
  line-height: 1.35;
}

.poet-card-dek {
  color: rgba(255, 248, 232, 0.68);
  font-size: 0.92rem;
  line-height: 1.48;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.poet-card-mark {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: var(--vd-gold-soft);
  background: rgba(215, 168, 79, 0.11);
  border: 1px solid rgba(215, 168, 79, 0.24);
  font-size: 1.3rem;
  line-height: 1;
  transition: transform 280ms ease, background 280ms ease;
}

.poet-card--open .poet-card-mark {
  transform: rotate(180deg);
  background: rgba(215, 168, 79, 0.18);
}

.poet-body-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 360ms ease;
}

.poet-card--open .poet-body-wrapper {
  grid-template-rows: 1fr;
}

.poet-body-inner {
  overflow: hidden;
}

.poet-body {
  position: relative;
  z-index: 1;
  padding: 0 1.15rem 1.25rem calc(96px + 2rem);
  color: rgba(255, 248, 232, 0.78);
}

.poet-body p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.78;
}

.poet-legacy {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 18px;
  background:
    linear-gradient(145deg, rgba(244, 230, 194, 0.09), rgba(244, 230, 194, 0.035)),
    rgba(20, 11, 6, 0.34);
  border: 1px solid rgba(215, 168, 79, 0.16);
}

.poet-legacy p {
  margin: 0 0 0.5rem;
  color: var(--vd-gold-soft);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.poet-legacy ul {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.35rem;
}

.poet-legacy li {
  color: rgba(255, 248, 232, 0.72);
  line-height: 1.55;
}

.contact-canturia,
.contact-card,
.demo-card,
.education-section,
.memorial-section {
  color: var(--vd-sepia-50);
}

.contact-canturia a,
.contact-canturia button,
.demo-card a,
.demo-card button {
  border-radius: 999px;
  background:
    linear-gradient(135deg, var(--vd-gold-soft), var(--vd-gold) 48%, var(--vd-gold-dark));
  color: #211207;
  font-weight: 900;
  letter-spacing: 0.02em;
  box-shadow:
    0 16px 42px rgba(215, 168, 79, 0.24),
    inset 0 1px 0 rgba(255, 248, 232, 0.42);
}

.contact-canturia a:hover,
.contact-canturia button:hover,
.demo-card a:hover,
.demo-card button:hover {
  transform: translateY(-1px);
  filter: brightness(1.04);
}

.site-footer,
.portada-footer {
  color: rgba(255, 248, 232, 0.68);
  letter-spacing: 0.02em;
}

.site-footer strong,
.portada-footer strong {
  color: var(--vd-gold-soft);
}

@media (max-width: 920px) {
  .poets-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .poets-premium-section {
    padding-inline: 0.9rem;
  }

  .poet-card-button {
    grid-template-columns: 76px 1fr auto;
    gap: 0.78rem;
    padding: 0.82rem;
  }

  .poet-portrait-shell,
  .poet-placeholder {
    width: 76px;
    height: 76px;
    border-radius: 22px;
  }

  .poet-portrait-shell::after,
  .poet-placeholder::after {
    border-radius: 18px;
  }

  .poet-card-dek {
    -webkit-line-clamp: 3;
  }

  .poet-body {
    padding: 0 0.9rem 1rem 0.9rem;
  }

  .poet-body > p:first-of-type::first-letter {
    font-size: 3.4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .memorial-portrait-bg img,
  .calixto-portrait-bg img,
  .hero-portrait-bg img {
    animation: none;
  }

  .poet-card,
  .poet-portrait,
  .poet-card-mark,
  .poet-body-wrapper {
    transition: none;
  }
}
"""

with open('app/globals.css', 'a', encoding='utf-8') as f:
    f.write('\n\n/* PREMIUM UI UPGRADE */\n')
    f.write(new_css)
