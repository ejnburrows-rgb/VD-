import re

with open('app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Replace :root vars
new_root = """:root {
  --font-display: var(--font-playfair);
  --font-prose: var(--font-cormorant);
  --font-ui: var(--font-lora);

  --vd-paper-base: #f1e6d0;
  --vd-paper-warm: #e6d4b6;
  --vd-paper-deep: #d8c098;
  --vd-tobacco-light: #8b6a3f;
  --vd-tobacco-mid: #6b4a25;
  --vd-tobacco-deep: #3e2814;
  --vd-tobacco-ink: #2a180a;
  --vd-gold-glow: #c8a05c;
  --vd-gold-light: #e0c285;
  --vd-gold-deep: #8b6f2c;
  --vd-shadow-paper: 0 8px 32px rgba(62,40,20,0.18);
  --vd-shadow-emboss: inset 1px 1px 0 rgba(255,240,210,0.4), inset -1px -1px 0 rgba(40,20,8,0.3);
}"""

css = re.sub(r':root\s*\{[\s\S]*?(?=\s*\})\}', new_root, css, count=1)

# 2. Body and typography
typography_css = """
  body { font-family: var(--font-prose); font-size: 1.125rem; line-height: 1.75; @apply bg-[#f1e6d0] text-[#2a180a]; }
  h1,h2,h3,h4,h5,h6 { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.01em; color: var(--vd-tobacco-deep); }
  button, nav, .ui { font-family: var(--font-ui); }
  blockquote.decima, .decima-card { font-family: var(--font-cormorant); font-style: italic; font-size: 1.25rem; line-height: 1.65; box-shadow: 0 4px 12px rgba(62,40,20,0.05); border-left: 3px solid var(--vd-gold-glow); background: linear-gradient(90deg, rgba(201,149,74,0.05) 0%, rgba(247,236,212,0.15) 100%); color: var(--vd-tobacco-deep); border-radius: 0 10px 10px 0; }
"""

# Replace existing body and h1-h6
css = re.sub(r'body\s*\{[\s\S]*?\}', '', css)
css = re.sub(r'h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6\s*\{[\s\S]*?\}', '', css)
css = re.sub(r'blockquote\.decima,\s*\.decima-card\s*\{[\s\S]*?\}', '', css)

css = css.replace('@layer base {', '@layer base {' + typography_css)

# 3. tobacco-paper replacement
new_tobacco = """.tobacco-paper {
  background:
    radial-gradient(ellipse at 20% 10%, var(--vd-paper-warm) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 90%, var(--vd-paper-deep) 0%, transparent 60%),
    var(--vd-paper-base);
  position: relative;
  min-height: 100vh;
}
.tobacco-paper::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  filter: url(#paperGrain);
  mix-blend-mode: multiply;
  opacity: 0.5;
  z-index: 1;
}
.tobacco-paper > * { position: relative; z-index: 2; }"""

css = re.sub(r'\.tobacco-paper\s*\{[\s\S]*?(?=\s*\.)', new_tobacco + '\n\n', css)

# 4. aged-card
css = re.sub(r'\.aged-card\s*\{[\s\S]*?\}', '.aged-card { background: rgba(230, 212, 182, 0.2); border-radius: 18px; box-shadow: var(--vd-shadow-paper); }', css)

# 5. Add memorial CSS and Fleuron CSS at the very end
memorial_css = """
.memorial {
  display: grid;
  grid-template-columns: 38% 1fr;
  gap: 5rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 3rem 6rem;
}
.portrait-column { position: relative; }
.portrait-pin {
  position: sticky;
  top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.portrait-pin img {
  width: 100%;
  max-width: 380px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50% / 45%;
  filter: sepia(0.32) contrast(1.06) saturate(0.88) brightness(0.97);
  box-shadow:
    0 0 0 6px var(--vd-paper-base),
    0 0 0 8px var(--vd-gold-glow),
    0 12px 40px rgba(60,30,10,0.45),
    inset 0 0 60px rgba(40,20,8,0.25);
}
.hero-meta { text-align: center; font-family: var(--font-display); }
.meta-name { display: block; font-size: 2rem; font-weight: 900; color: var(--vd-tobacco-deep); }
.meta-tag { display: block; font-style: italic; font-size: 1.25rem; color: var(--vd-tobacco-mid); margin-top: 0.25rem; }
.meta-est { display: block; font-family: var(--font-ui); font-size: 0.85rem; letter-spacing: 0.3em; color: var(--vd-gold-deep); margin-top: 0.75rem; }

.prose-column { font-family: var(--font-prose); font-size: 1.18rem; line-height: 1.8; color: var(--vd-tobacco-ink); }
.prose-column p { margin: 0 0 1.6rem; text-align: justify; hyphens: auto; }

.cuarteta { font-family: var(--font-display); font-style: italic; font-size: 1.35rem; line-height: 1.55; color: var(--vd-tobacco-deep); border: none; padding: 0; margin: 0 0 1rem; }
.byline { font-family: var(--font-ui); font-size: 0.85rem; color: var(--vd-gold-deep); margin-bottom: 3rem; letter-spacing: 0.05em; }
.byline a { color: var(--vd-gold-deep); text-decoration: underline; text-underline-offset: 3px; }

.opening::first-letter {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 5.5rem;
  line-height: 0.85;
  float: left;
  margin: 0.4rem 0.8rem 0 0;
  color: var(--vd-tobacco-deep);
  text-shadow: 1px 1px 0 var(--vd-gold-glow);
}

blockquote.decima {
  font-family: var(--font-prose);
  font-style: italic;
  font-size: 1.3rem;
  line-height: 1.7;
  border-left: 3px solid var(--vd-gold-glow);
  padding: 0.5rem 0 0.5rem 1.75rem;
  margin: 2.5rem 0;
  color: var(--vd-tobacco-deep);
}
blockquote.decima footer { font-style: normal; font-size: 0.95rem; color: var(--vd-tobacco-mid); margin-top: 0.75rem; font-family: var(--font-ui); }

.seal { font-family: var(--font-display); font-style: italic; font-size: 1.6rem; text-align: center; color: var(--vd-tobacco-deep); margin: 2.5rem 0 !important; }

.section-lead { font-style: italic; color: var(--vd-tobacco-mid); text-align: center; font-size: 1.15rem; margin: 2rem 0 2.5rem !important; }

.cta-end { text-align: center; margin-top: 4rem; }
.cta-procesar {
  font-family: var(--font-ui);
  font-size: 1rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: linear-gradient(180deg, var(--vd-gold-light), var(--vd-gold-glow));
  color: var(--vd-tobacco-ink);
  border: 1px solid var(--vd-gold-deep);
  padding: 1rem 2.5rem;
  cursor: pointer;
  box-shadow: var(--vd-shadow-emboss), 0 4px 16px rgba(62,40,20,0.2);
}
.cta-blurb { font-style: italic; color: var(--vd-tobacco-mid); margin-top: 1rem; font-size: 0.95rem; }

.fleuron-wrap { display: flex; justify-content: center; margin: 3rem 0; }

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  border-bottom: 1px solid rgba(139, 106, 63, 0.2);
}
.top-nav .wordmark {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--vd-tobacco-deep);
  font-weight: 700;
}
.top-nav .nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.top-nav .nav-links button, .top-nav .nav-links a {
  font-family: var(--font-ui);
  font-weight: 500;
  color: var(--vd-tobacco-mid);
  text-decoration: none;
  transition: all 0.2s;
  border-bottom: 1px solid transparent;
}
.top-nav .nav-links button:hover, .top-nav .nav-links a:hover, .top-nav .nav-links button.active {
  color: var(--vd-tobacco-deep);
  border-bottom-color: var(--vd-gold-glow);
}

@media (max-width: 880px) {
  .memorial { grid-template-columns: 1fr; gap: 2rem; padding: 2rem 1.25rem 4rem; }
  .portrait-pin { position: static; top: auto; }
  .portrait-pin img { max-width: 280px; }
  .opening::first-letter { font-size: 4rem; }
  .top-nav { flex-direction: column; gap: 1rem; padding: 1.5rem; text-align: center; }
  .top-nav .nav-links { flex-wrap: wrap; justify-content: center; gap: 1rem; }
}
"""

css += '\n' + memorial_css

with open('app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)
