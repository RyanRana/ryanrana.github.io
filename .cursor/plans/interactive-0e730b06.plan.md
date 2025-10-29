<!-- 0e730b06-e3dc-4e9c-b893-7c728f7f7edf e66b99aa-bfc0-4508-8414-a54651dca42d -->
# Replace Voronoi blobs with an interactive kaleidoscope

## What we’ll build

- A canvas‑based kaleidoscope that renders a single procedural base shape into N mirrored sectors.
- High symmetry via rotational + mirror symmetry per wedge.
- Hover interaction: cursor proximity increases rotation speed and scales the motif; easing brings it back when idle.
- Uses your existing `projectHues` palette and current layout; no external libs.

## Files to change

- `index.html`
  - Remove the D3 Voronoi import.
  - Replace the current blob/Voronoi script with a kaleidoscope renderer.
- `styles.css`
  - No changes needed (your `.blob-container` and `#blobCanvas` already fit the text height).

## Key parameters (tunable)

- `NUM_SECTORS = 12` // number of wedges
- `MIRROR = true` // mirror every other wedge
- `BASE_POINTS = 220` // points to sample the radial curve (smoothness)
- `BASE_RADIUS = 160 * DPR` // base radius
- `HOVER_ROTATION_GAIN = 0.0025` // rotation speed added by hover proximity
- `HOVER_SCALE_MAX = 1.12` // max scale on strong hover

## Core approach

1. Define a smooth radial curve for the base motif using a light parametric function (no noise libs):

   - r(θ) = R · [1 + a·sin(kθ + φ) + b·sin(3θ + φ2)]
   - This yields organic, non-pinched “petals” with stable curvature.

2. Build one wedge clip path of angle `2π/NUM_SECTORS` and reuse it for all sectors.
3. For each sector i:

   - Rotate by `i * wedgeAngle + globalRotation`.
   - If `MIRROR && i % 2`, apply `scale(1, -1)` and rotate to keep orientation consistent.
   - Clip to the wedge; draw the same base curve.

4. Animate `globalRotation` and `scale` with easing; update on pointer move.
5. Color: fill with a radial gradient derived from your `projectHues` cycling slowly over time.

## Essential snippets (to insert in `index.html` replacing the current JS block)

```javascript
(() => {
  const canvas = document.getElementById('blobCanvas');
  if (!canvas) return;
  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  // Parameters
  const NUM_SECTORS = 12;
  const MIRROR = true;
  const BASE_POINTS = 220;
  const BASE_RADIUS = 160 * DPR;
  const HOVER_ROTATION_GAIN = 0.0025; // rad per frame per proximity unit
  const HOVER_SCALE_MAX = 1.12;

  // Colors (reuse your hues)
  const projectHues = [217, 262, 188, 346, 45, 160];
  let huePhase = 0;

  let W = 0, H = 0, CX = 0, CY = 0;
  let rotation = 0, rotationSpeed = 0.004; // base spin
  let targetRotationSpeed = rotationSpeed;
  let scale = 1, targetScale = 1;
  let mouse = { x: 0, y: 0, inside: false };

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = Math.floor(rect.width); H = Math.floor(rect.height);
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    CX = (W * DPR) / 2; CY = (H * DPR) / 2;
  }

  function radialCurvePoints(cx, cy, radius, points, t) {
    const pts = [];
    const a = 0.28, b = 0.12, k = 6; // shape controls
    const p1 = t * 0.9, p2 = t * 1.3; // animated phases
    for (let i = 0; i <= points; i++) {
      const th = (i / points) * Math.PI * 2;
      const r = radius * (1 + a * Math.sin(k * th + p1) + b * Math.sin(3 * th + p2));
      pts.push([cx + r * Math.cos(th), cy + r * Math.sin(th)]);
    }
    return pts;
  }

  function drawBaseShape(ctx, t) {
    const pts = radialCurvePoints(0, 0, BASE_RADIUS, BASE_POINTS, t);
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
  }

  function draw() {
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(1 / DPR, 1 / DPR); // draw in device pixels
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const wedge = (Math.PI * 2) / NUM_SECTORS;
    const t = performance.now() * 0.001;
    huePhase += 0.004;

    for (let i = 0; i < NUM_SECTORS; i++) {
      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(rotation + i * wedge);
      if (MIRROR && (i % 2)) ctx.scale(1, -1);

      // Clip to wedge
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, Math.max(canvas.width, canvas.height), -wedge / 2, wedge / 2);
      ctx.closePath();
      ctx.clip();

      ctx.scale(scale, scale);
      drawBaseShape(ctx, t);

      // Fill gradient color per sector
      const hue = projectHues[i % projectHues.length];
      const grad = ctx.createRadialGradient(0, 0, BASE_RADIUS * 0.1, 0, 0, BASE_RADIUS * 1.1);
      grad.addColorStop(0, `hsla(${(hue + huePhase*40)%360}, 70%, 75%, 0.95)`);
      grad.addColorStop(1, `hsla(${(hue + 30 + huePhase*40)%360}, 70%, 65%, 0.9)`);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  }

  function animate() {
    // Ease rotation speed and scale towards targets
    rotationSpeed += (targetRotationSpeed - rotationSpeed) * 0.08;
    scale += (targetScale - scale) * 0.08;
    rotation += rotationSpeed;
    draw();
    requestAnimationFrame(animate);
  }

  function onMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    mouse.x = x; mouse.y = y; mouse.inside = true;
    const dx = x - CX, dy = y - CY;
    const d = Math.min(1, Math.hypot(dx, dy) / (Math.min(canvas.width, canvas.height) * 0.35));
    targetRotationSpeed = 0.004 + d * (HOVER_ROTATION_GAIN * canvas.width);
    targetScale = 1 + d * (HOVER_SCALE_MAX - 1);
  }

  function onLeave() {
    mouse.inside = false;
    targetRotationSpeed = 0.004;
    targetScale = 1;
  }

  window.addEventListener('resize', resize);
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseleave', onLeave);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { resize(); animate(); });
  } else { resize(); animate(); }
})();
```

## Removals from `index.html`

- `<script src="https://unpkg.com/d3-delaunay@6"></script>`
- Entire Voronoi/Blob JS: `randomSites`, `regenerate()` using D3, `updateBlobPositions`, `explosions`, and related state.

## Acceptance criteria

- The canvas shows a 12‑sector kaleidoscope with mirrored symmetry.
- Hover near the center yields light scaling/rotation; stronger toward edges.
- Smooth 60fps on desktop; no external dependencies.
- Colors cycle slowly yet remain within the existing palette vibe.

### To-dos

- [ ] Remove D3 import and Voronoi/blob code from index.html
- [ ] Add kaleidoscope constants, resize and animation loop
- [ ] Implement wedge clipping, rotation, and mirroring per sector
- [ ] Implement smooth radial base shape generator
- [ ] Add mousemove/mouseleave to drive rotation and scale
- [ ] Fill with palette-based radial gradients and hue phasing
- [ ] Test devices and tune points/sectors for 60fps