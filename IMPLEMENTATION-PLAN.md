# Honda Kaduwela pilot implementation plan

SUPERSEDED after creative rejection. Use `DIRECTION-V2.md` for the replacement;
this historical plan's fixed canvas and three-chapter pilot must not be resumed.

Prepared 2026-09-15. This plan implements the bounded pilot defined in
`STUDIO.md`; it does not expand into the full customer site before the user judges the
rendered experience.

## Outcome to prove

Build one reversible 10–15 second scroll experience in which the same Honda scooter
travels through three connected customer decisions:

1. **Choose** — identify the ride and its most useful distinction.
2. **Trade** — understand the non-promissory path from old ride to handover.
3. **Care** — arrive at Macro Enterprises and see the after-sales relationship.

The pilot succeeds when it feels like one directed journey, communicates the business in
the first viewport, and leaves `Talk to Macro`, call and directions usable throughout.
It is rejected if it reads as three hero slides, a collection of vehicle cards, or a
stock dealership template.

## Locked implementation route

Use **Three.js 0.186.0 + Vite 8.2.2 + authored HTML/CSS/JavaScript** inside this site.
The scene is a lightweight 2.5D product environment:

- the scooter remains an accurate supplied image sequence or multi-angle cutout rather
  than a fabricated 3D model;
- Three.js supplies the road plane, depth layers, camera travel, environmental light,
  route geometry, mirror treatment and showroom threshold;
- DOM supplies all headings, facts, progress, language controls and actions;
- one normalized scroll value drives every scene and interface state;
- no runtime CDN, hosted renderer, paid service, framework adapter or Vercel-only feature.

This route carries more spatial ambition than a flat frame sequence while keeping the
product representation honest. If a licensed accurate GLB arrives later, it can replace
the image subject without changing the page structure or progression model.

## Runtime architecture

Planned site-local files:

```text
sites/honda-kaduwela/
├── index.html
├── package.json
├── public/
│   ├── favicon.svg
│   └── assets/                 # approved, optimized delivery assets only
├── assets/
│   └── incoming/               # untouched source handoff
├── src/
│   ├── main.js                 # app state, scroll, language and chapter controls
│   ├── scene.js                # Three.js stage and progress-derived scene state
│   ├── content.js              # verified English/Sinhala content and model facts
│   ├── asset-loader.js         # eager/deferred policy, errors and readiness reporting
│   ├── style.css               # responsive composition and visual system
│   └── lib/
│       └── motion.js           # clamp, lerp, smoothstep and reduced-motion utilities
└── qa/
    ├── interaction-test.mjs
    ├── content-audit.md
    ├── asset-audit.md
    └── review.md
```

The dependency set stays at `three`, `@fontsource-variable/archivo`,
`@fontsource/archivo-black` and Vite unless implementation evidence justifies another
package. Sinhala uses a system-safe fallback stack unless an inspected local font covers
the script cleanly. No animation dependency is needed for the scene timeline.

## Composition

### Persistent viewport stage

The canvas stays fixed behind the entire pilot. A road begins in the lower foreground,
curves behind the scooter and terminates at a red/white branch portal. The scooter sits
slightly right of center on desktop so the opening proposition and controls have clean
space. The subject is large enough to inspect, with tires grounded by a contact shadow.

A compact header contains the Macro mark, `Rides / Trade / Service`, language toggle and
`Talk to Macro`. The header remains present without becoming an oversized floating bar.
Chapter copy enters in three deliberately different positions around the persistent
subject; it never becomes a repeating centered-card pattern.

### Chapter 1 — Choose, progress 0.00–0.34

- Start in bright Kaduwela daylight with a low front-three-quarter scooter portrait.
- A restrained pointer response shifts reflected light and road parallax by at most 2–3°.
- Scroll advances the lane texture and camera; model fact and color controls settle only
  at the chapter rest point.
- The heading `Your next ride, one road away` and primary action are visible immediately.

### Chapter 2 — Trade, progress 0.34–0.70

- The painted centre line separates into `Assess`, `Plan`, `Handover` route nodes.
- A real old-bike cutout, if supplied, appears in the rear-view layer and recedes as the
  new scooter remains stable. Without that asset, use a typographic mirror treatment;
  do not invent another vehicle.
- Copy explains the conversation and assessment path without promising approval, price,
  valuation or a specific lender.
- The chapter action becomes `Start a trade-in` while `Talk to Macro` remains available.

### Chapter 3 — Care, progress 0.70–1.00

- Road edge geometry straightens into the red/white showroom threshold.
- The environment changes through geometry, light and a real branch photograph; the
  scooter does not dissolve or teleport.
- Two concise proof points attach spatially to the bike: genuine support and after-sales
  care, subject to customer confirmation.
- Resolve on `Built for the road ahead` with WhatsApp, call and directions.

## Motion implementation

`main.js` maps document scroll to a clamped 0–1 progress value. `scene.js` calculates the
entire rendered state from that value on every update; it does not accumulate animation
state. This makes reverse scroll exact and testable.

Progress drives these coordinated properties:

- camera position, target and field of view;
- road texture offset, curve reveal and route-node scale;
- scooter plane position, subtle yaw and light response;
- daylight-to-threshold environment colors;
- mirror depth/opacity and showroom portal depth;
- chapter copy position/opacity and action label;
- semantic `data-chapter`, `data-progress` and `data-renderer` QA state.

CSS handles short control feedback and chapter-copy settling. It will animate explicit
transform/opacity/color properties and avoid `transition: all`. Direct interactions are
interruptible. Continuous movement stops when the page is hidden or the stage is outside
the active range.

## Interaction and conversion path

- Wheel, trackpad and normal page scroll drive the primary journey; no scroll hijacking.
- `Rides`, `Trade`, and `Service` chapter controls scroll to deterministic scene points.
- `Talk to Macro` opens a customer-confirmed WhatsApp URL with a short editable enquiry.
- `Call` uses the confirmed telephone number; `Directions` opens the verified Maps place.
- Language selection changes copy in memory for the current visit only.
- Keyboard focus order follows brand → chapters → language → primary action → current
  chapter action. Focus remains visible over every scene state.
- No forms, persistence, analytics, cookies or consent UI in the pilot.

## Responsive behavior

### Reference laptop — 1440 × 900

Scooter takes approximately 40–46% of width. Opening copy is capped near 9 display words
per line, leaving the route and front wheel unobstructed. The entire first proposition
and primary action fit above the fold.

### Ultrawide — 3440 × 1440

Content and focal geometry live inside a centered `min(100%, 1920px)` composition frame,
while the environment continues to the viewport edges. Camera framing derives from the
inner composition aspect ratio so the scooter does not drift to an extreme edge. Text
line length and control positions remain capped rather than scaling with screen width.

### Mobile — 390 × 844 and 360 × 800

Use a portrait scooter crop below a two-to-three-line heading. A vertical route line runs
beside the front wheel. The header reduces to mark, language and primary action; direct
chapter controls remain available in a bottom rail with 44px minimum targets. Information
copy uses a stable opaque backing when it overlaps the environment.

## Reduced motion and fallback

With `prefers-reduced-motion: reduce`, the journey becomes three direct still chapters.
Chapter controls swap states immediately; there is no camera interpolation, parallax,
scrubbed sequence or auto movement.

If WebGL or the scene assets fail, the page uses an eager authentic scooter image, a
static road/threshold composition, the same verified copy and all actions. `?fallback=1`
forces this state for QA. A renderer error must never hide the navigation or CTA.

## Asset processing

1. Keep all received originals untouched in `assets/incoming/`.
2. Inspect dimensions, alpha, compression, model consistency and usage permission.
3. Remove/replace backgrounds locally only when edges survive close inspection.
4. Export delivery variants to `public/assets/` as AVIF/WebP with PNG only where alpha
   quality requires it.
5. Give every asset explicit dimensions and record eager/lazy behavior.
6. Keep the opening scooter and opening environment eager; defer branch/service imagery
   until after the first chapter is interactive.

The opening compressed transfer target is 900 KB. If a frame sequence is used, test both
responsive image frames and a compact local video before choosing. Selection depends on
seek smoothness, decoded memory and subject consistency, not file count alone.

## Build order and stop gates

### Gate 0 — asset and fact intake

Required before runtime work: one credible hero-scooter route, Macro logo, customer image
reuse decision, confirmed contact target, and permission to treat this as a private pitch
concept. Inspect the files and record the chosen route in `STUDIO.md`.

### Gate 1 — first-frame composition

Build the persistent stage, opening product portrait, proposition and live CTA. Capture
1440 × 900, 390 × 844 and 3440 × 1440. Stop if product identity, grounding, readability
or ultrawide framing is weak.

### Gate 2 — connected scene slice

Implement the full Choose → Trade → Care progress model, reverse scroll, direct chapter
controls, reduced motion and fallback. Capture temporal states. This is the user-facing
pilot judgment gate.

### Gate 3 — technical verification

Only after the pilot direction survives visual judgment: production build, browser
interactions, asset/loading inventory, text-size/contrast/content checks, static captures
and motion captures.

### Gate 4 — expansion decision

The user decides whether to refine the pilot, expand into the full customer site, or
change direction. No full catalog, booking flow or invented bilingual copy is built in
advance of that judgment.

## Acceptance checks

- One recognizable scooter persists through all beats without discontinuous crossfades.
- Initial, interaction, resolved and reverse states match `STUDIO.md`.
- Opening viewport identifies Honda Kaduwela/Macro and exposes a working primary action.
- Mouse, keyboard, touch-sized chapter controls and native scrolling reach every beat.
- Reduced-motion and forced fallback preserve all content/actions.
- No body text below 18px; no labels/controls below 16px; information text reaches 4.5:1.
- Laptop, mobile and ultrawide framing remain intentional with no clipped actions.
- Every content block has its paired visual/state and every image has loading evidence.
- No runtime console/page errors, broken images, horizontal overflow or external CDN call.
- Production build and plain Node preview start succeed.

Required commands after implementation:

```bash
npm run build
node ../../scripts/screenshot.mjs http://127.0.0.1:4188 qa
node ../../scripts/motion-qa.mjs http://127.0.0.1:4188 qa/motion
node qa/interaction-test.mjs
```

Visual inspection of the output is mandatory; successful scripts alone are not approval.

## Model and allowance discipline

- Sol medium lead owns planning, implementation and integration.
- No child is needed for the first-frame implementation.
- Astra high may be used once for a bounded hard scene correction or a fresh review after
  evidence exists. It does not remain active as coordinator.
- Luna is optional only for a precisely specified mechanical task.
- Stop after the pilot evidence and request the user's creative judgment before expansion.
