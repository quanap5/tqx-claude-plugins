# Color Palette & Brand Style — TwinQX · Terracotta Atlas

**This is the single source of truth for all colors and brand-specific styles.** Everything else
in this skill is universal methodology. These colors mirror the `preview-html` design tokens
(Phương án B, warm Hỏa-Thổ system). Use them verbatim — **never invent hex values.**

Hard rules (carry over from the TwinQX brand): **no green, no cool blue/teal/cyan, warm only.**
Status never goes green — healthy = deep neutral (chocolate), watch = ochre, alert = terracotta.

---

## Core Brand Hexes (reference)

| Token | Hex | Role |
|-------|-----|------|
| Cream | `#F4ECD8` | dominant background (~60%) |
| Paper | `#F8F2E4` | lighter surface / card fill |
| Ink | `#2A1A12` | warm text, not pure black |
| **Terracotta** | `#A14B2B` | brand / signature |
| **Ochre** | `#D4A03E` | accent / signature pair |
| Sienna | `#C97B4A` | AI / pulse / signal |
| Chocolate | `#5C3B22` | deep structure, hierarchy nodes |
| Linen | `#E7DCC4` | hairlines, muted surface on cream |
| Warm gray | `#A89880` | captions / secondary text |
| Copper | `#B08C5A` | metallic accent |

---

## Shape Colors (Semantic)

Colors encode meaning, not decoration. Each semantic purpose has a fill/stroke pair. Always pair
a **darker stroke** with a **lighter fill** for contrast.

| Semantic Purpose | Fill | Stroke |
|------------------|------|--------|
| Primary/Neutral | `#F8F2E4` | `#2A1A12` |
| Secondary | `#E7DCC4` | `#5C3B22` |
| Tertiary | `#EADFC6` | `#A89880` |
| Start/Trigger | `#F3D9A6` | `#A14B2B` |
| End/Result | `#EAC07A` | `#5C3B22` |
| Process/Action | `#F8F2E4` | `#5C3B22` |
| Decision | `#F0D9A0` | `#B07A1E` |
| AI/LLM/Signal | `#E8B888` | `#C97B4A` |
| Brand focal point | `#C96A45` | `#A14B2B` |
| Inactive/Disabled | `#EADFC6` | `#A89880` (use dashed stroke) |
| Warning/Watch | `#F3D9A6` | `#D4A03E` |
| Alert/Error | `#D9926E` | `#A14B2B` |

**Status (never green):** OK/healthy → chocolate `#5C3B22`; Watch/warning → ochre `#D4A03E`;
Alert/critical → terracotta `#A14B2B`.

---

## Text Colors (Hierarchy)

Use color on free-floating text to create hierarchy without containers.

| Level | Color | Use For |
|-------|-------|---------|
| Title | `#2A1A12` | Section headings, major labels |
| Subtitle | `#A14B2B` | Subheadings, secondary labels (terracotta) |
| Body/Detail | `#A89880` | Descriptions, annotations, metadata (warm gray) |
| On light fills | `#2A1A12` | Text inside cream/paper/ochre shapes |
| On dark fills | `#F3EDE0` | Text inside terracotta/chocolate/ember shapes |
| Accent / metric | `#D4A03E` | Numbers, highlights, mono data labels (ochre) |

For labels and data readouts, prefer a mono feel — `fontFamily: 3` (the skill default) already
renders monospace, matching the IBM Plex Mono texture of the brand.

---

## Evidence Artifact Colors

Code snippets, data examples, and concrete evidence use the TwinQX **dark "Furnace Reactor" face**
(never a cool slate, never green text).

| Artifact | Background | Text Color |
|----------|-----------|------------|
| Code snippet | `#15110E` (ember) | `#F3EDE0` base; keywords `#E89B3A` (amber), strings `#D4A03E` (ochre), comments `#9A8A72` |
| JSON/data example | `#211B17` (graphite) | `#E89B3A` (amber) for keys/values — **not green** |
| Inline value chip | `#5C3B22` (chocolate) | `#F3EDE0` |

---

## Default Stroke & Line Colors

| Element | Color |
|---------|-------|
| Arrows | stroke color of the source element's semantic purpose |
| Structural lines (dividers, trees, timelines) | chocolate `#5C3B22` or warm gray `#A89880` |
| Marker dots (fill + stroke) | terracotta `#A14B2B` (focal) or ochre `#D4A03E` |

---

## Background

| Property | Value |
|----------|-------|
| Canvas background (default, light brand face) | `#F4ECD8` (cream) |
| Canvas background (dark product / SCADA face) | `#15110E` (ember) |

On the **dark face**, swap: text → `#F3EDE0`, structure lines → `rgba(243,237,224,0.18)`,
AI/signal → amber `#E89B3A`, accent → bronze `#8B6B3D`; terracotta stays the brand anchor.
