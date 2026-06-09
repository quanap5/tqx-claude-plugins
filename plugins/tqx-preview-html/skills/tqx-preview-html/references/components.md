# TwinQX · Component Patterns (Terracotta Atlas)

Copy-paste HTML snippets. All rely on the tokens in `assets/tokens.css`.
Mỗi class đã có sẵn trong tokens — chỉ cần dùng, không tự định nghĩa lại màu hex.

## Table of contents
1. Wordmark / logo
2. Section eyebrow (mono label)
3. Hero
4. Stat card / metric
5. Dashboard panel (dark face)
6. Ontology / knowledge-graph node legend
7. Swatch grid
8. Status pills
9. Pitch / feature grid
10. Footer

---

## 1 · Wordmark
Only the **X** is accented (brand rule). On a terracotta fill the X turns ochre automatically because `--accent` is ochre.
```html
<span class="tqx-logo">Twin<span class="x">QX</span></span>
```
On a terracotta brand block, wrap in a dark section or set color: `style="color:var(--on-brand)"`.

## 2 · Section eyebrow
```html
<div class="tqx-label">02 · BRAND POSITIONING</div>
```

## 3 · Hero
```html
<section class="tqx-wrap tqx-section hero">
  <div>
    <div class="tqx-label">SCADA × ONTOLOGY × AI</div>
    <h1>The digital twin that <span style="color:var(--brand)">thinks</span>.</h1>
    <p>Turn live operational data into queryable knowledge.</p>
    <a class="tqx-btn" href="#">Request a demo</a>
  </div>
  <div><!-- visual / dashboard mock --></div>
</section>
```

## 4 · Stat card
```html
<div class="tqx-card">
  <div class="tqx-label">STEAM PRESSURE</div>
  <div style="font-family:var(--font-display);font-size:2.6rem;font-weight:600;">14.8<span style="font-size:1rem;color:var(--muted)"> bar</span></div>
  <div style="color:var(--signal);font-size:.9rem;">▲ 0.4 vs predicted</div>
</div>
```

## 5 · Dashboard panel (dark face — product UI)
Wrap product UI in the dark face. It inherits Hướng A (Furnace Reactor): ember background, amber signal.
```html
<div data-tqx-mode="dark" class="tqx-card">
  <div class="tqx-label">ONTOLOGY · BOILER.LOOP.B03</div>
  <div style="font-family:var(--font-display);font-size:2.4rem;">91.4%</div>
  <div class="tqx-label" style="color:var(--accent)">AI TARGET 92.0%</div>
</div>
```

## 6 · Knowledge-graph node legend
Node/edge colors map to roles: asset=terracotta, subsystem=chocolate, agent=ochre, anomaly=sienna.
```html
<ul style="list-style:none;display:flex;gap:1.4rem;padding:0;font-family:var(--font-mono);font-size:.8rem;">
  <li><span style="display:inline-block;width:.8em;height:.8em;border-radius:50%;background:#A14B2B"></span> ASSET ROOT</li>
  <li><span style="display:inline-block;width:.8em;height:.8em;border-radius:50%;background:#5C3B22"></span> SUBSYSTEM</li>
  <li><span style="display:inline-block;width:.8em;height:.8em;border-radius:50%;background:#D4A03E"></span> AI AGENT</li>
  <li><span style="display:inline-block;width:.8em;height:.8em;border-radius:50%;background:#C97B4A"></span> ANOMALY</li>
</ul>
```

## 7 · Swatch grid
```html
<div class="swatch-grid">
  <div class="tqx-swatch" style="background:#A14B2B;color:#F4ECD8">A14B2B · Terracotta</div>
  <!-- ...one per palette color... -->
</div>
```

## 8 · Status pills (warm only — never green)
```html
<span class="tqx-pill tqx-pill--ok">OK</span>
<span class="tqx-pill tqx-pill--watch">WATCH</span>
<span class="tqx-pill tqx-pill--alert">ALERT</span>
```

## 9 · Feature grid (pitch / whitepaper)
```html
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:var(--gap);">
  <div class="tqx-card">
    <div class="tqx-label">TWIN</div>
    <h4>Real-time mirror</h4>
    <p>A digital twin that reflects the plant continuously.</p>
  </div>
  <!-- repeat for Q (Query/Quality) and X (eXecution) -->
</div>
```

## 10 · Footer
```html
<footer class="tqx-wrap tqx-footer">TwinQX · 2026 · Industrial intelligence</footer>
```

---

## Layout grid reference (from the brand guide)
- Container max-width 1200px, generous horizontal padding.
- Section vertical rhythm via `--pad-y` (≈3.5–7rem).
- 60–30–10 ratio: ~60% cream/paper, ~30% ink/chocolate structure, ~10% terracotta+ochre accents. Don't paint everything terracotta.
- Hairlines (`--hairline`) for card borders and dividers — keep them subtle.
