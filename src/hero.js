'use strict';

/**
 * Hero artwork: a glowing mesh dome arcing over an isometric site plan.
 *
 * The metaphor is the pitch — everything on the plot is covered by one thing.
 * Drawn as vector rather than a rendered illustration so it stays a few KB,
 * scales to any display, and uses the brand colours directly.
 *
 * Geometry is generated rather than hand-authored so the mesh stays accurate.
 */

const CY = '#0ab9e4'; // brand cyan
const W = 820;
const H = 720;

const rad = (d) => (d * Math.PI) / 180;
const r2 = (n) => Math.round(n * 100) / 100;

/* ---------------------------------------------------------------- isometric */

const ISO_X = Math.cos(rad(30));
const ISO_Y = Math.sin(rad(30));
const ORIGIN = { x: 410, y: 335 };
const SCALE = 1.7;

/** Project a point in plan space (x, y ground; z up) to screen space. */
function iso(x, y, z = 0) {
  return {
    x: ORIGIN.x + (x - y) * ISO_X * SCALE,
    y: ORIGIN.y + (x + y) * ISO_Y * SCALE - z * SCALE,
  };
}

const pts = (arr) => arr.map((p) => `${r2(p.x)},${r2(p.y)}`).join(' ');

/* -------------------------------------------------------------------- dome */

/**
 * Wireframe hemisphere over the plot: latitude rings plus meridian arcs,
 * viewed at the same tilt as the isometric ground so the two agree.
 */
function dome(R, tiltDeg, cx, cy) {
  const tilt = rad(tiltDeg);
  const sinT = Math.sin(tilt);
  const cosT = Math.cos(tilt);
  let out = '';

  // Latitude rings — circles of latitude project to ellipses.
  const lats = [8, 24, 40, 56, 72];
  for (const latDeg of lats) {
    const lat = rad(latDeg);
    const r = R * Math.cos(lat);
    const yc = cy - R * Math.sin(lat) * cosT;
    const opacity = r2(0.5 - (latDeg / 90) * 0.22);
    out += `<ellipse cx="${r2(cx)}" cy="${r2(yc)}" rx="${r2(r)}" ry="${r2(
      r * sinT
    )}" fill="none" stroke="${CY}" stroke-width="1" opacity="${opacity}"/>`;
  }

  // Meridian arcs, sampled and emitted as polylines. They stop short of the
  // pole and a small ring closes the top — 16 lines converging on one point
  // reads as a globe rather than a structure.
  const meridians = 14;
  const CAP = 84;
  for (let m = 0; m < meridians; m++) {
    const theta = (m / meridians) * Math.PI * 2;
    const path = [];
    for (let s = 0; s <= 26; s++) {
      const lat = (s / 26) * rad(CAP);
      const rr = R * Math.cos(lat);
      path.push({
        x: cx + rr * Math.cos(theta),
        y: cy - R * Math.sin(lat) * cosT + rr * Math.sin(theta) * sinT,
      });
    }
    // Meridians on the far side read fainter, which gives the dome depth.
    const facing = Math.sin(theta);
    const opacity = r2(0.14 + (facing + 1) / 2 * 0.3);
    out += `<polyline points="${pts(path)}" fill="none" stroke="${CY}" stroke-width="1" opacity="${opacity}"/>`;
  }

  // Cap ring that closes the mesh where the meridians stop.
  {
    const lat = rad(CAP);
    const r = R * Math.cos(lat);
    out += `<ellipse cx="${r2(cx)}" cy="${r2(cy - R * Math.sin(lat) * cosT)}" rx="${r2(r)}" ry="${r2(
      r * sinT
    )}" fill="none" stroke="${CY}" stroke-width="1" opacity=".3"/>`;
  }

  // Base ring, brighter — where the dome meets the ground.
  out += `<ellipse cx="${r2(cx)}" cy="${r2(cy)}" rx="${r2(R)}" ry="${r2(
    R * sinT
  )}" fill="none" stroke="${CY}" stroke-width="1.5" opacity="ewe"/>`.replace('ewe', '0.55');

  return out;
}

/* --------------------------------------------------------------- structures */

/** An extruded block: top face plus two side faces. */
function block(x, y, w, d, h) {
  const t = [iso(x, y, h), iso(x + w, y, h), iso(x + w, y + d, h), iso(x, y + d, h)];
  const left = [iso(x, y + d, h), iso(x + w, y + d, h), iso(x + w, y + d, 0), iso(x, y + d, 0)];
  const right = [iso(x + w, y, h), iso(x + w, y + d, h), iso(x + w, y + d, 0), iso(x + w, y, 0)];
  return (
    `<polygon points="${pts(left)}" fill="#12296010"/>` +
    `<polygon points="${pts(left)}" fill="#152d68"/>` +
    `<polygon points="${pts(right)}" fill="#0f2252"/>` +
    `<polygon points="${pts(t)}" fill="#1d3f86"/>` +
    `<polygon points="${pts(t)}" fill="none" stroke="${CY}" stroke-width="1" opacity=".35"/>`
  );
}

/** A wireless/camera node: a post with concentric signal rings. */
function node(x, y, h) {
  const base = iso(x, y, 0);
  const top = iso(x, y, h);
  let out = `<line x1="${r2(base.x)}" y1="${r2(base.y)}" x2="${r2(top.x)}" y2="${r2(
    top.y
  )}" stroke="#3c63b4" stroke-width="3" stroke-linecap="round"/>`;
  for (let i = 1; i <= 3; i++) {
    const rr = i * 11;
    out += `<ellipse cx="${r2(top.x)}" cy="${r2(top.y)}" rx="${r2(rr)}" ry="${r2(
      rr * 0.5
    )}" fill="none" stroke="${CY}" stroke-width="1.2" opacity="${r2(0.5 - i * 0.12)}"/>`;
  }
  out += `<circle cx="${r2(top.x)}" cy="${r2(top.y)}" r="4" fill="${CY}"/>`;
  // Wrapped so the stylesheet can stagger the ring pulse per node.
  return `<g class="node">${out}</g>`;
}

/** A cable run along the ground between two plan points. */
function run(a, b) {
  const p1 = iso(a[0], a[1], 2);
  const p2 = iso(b[0], b[1], 2);
  return `<line x1="${r2(p1.x)}" y1="${r2(p1.y)}" x2="${r2(p2.x)}" y2="${r2(
    p2.y
  )}" stroke="${CY}" stroke-width="2" opacity=".7" stroke-linecap="round"/>`;
}

/* -------------------------------------------------------------------- scene */

function heroGraphic() {
  const PLOT = 200;
  const plate = [iso(0, 0), iso(PLOT, 0), iso(PLOT, PLOT), iso(0, PLOT)];
  const plateCentre = iso(PLOT / 2, PLOT / 2);

  const blocks = [
    block(20, 24, 54, 40, 34),
    block(100, 18, 58, 46, 58),
    block(26, 104, 46, 54, 42),
    block(112, 112, 54, 44, 26),
  ];

  // Runs sit in the open lanes at x=84 and y=84 so they read on the floor.
  const runs = [
    run([84, 26], [84, 168]),
    run([16, 84], [178, 84]),
    run([74, 44], [84, 44]),
    run([84, 40], [100, 40]),
    run([84, 130], [112, 130]),
    run([60, 84], [60, 104]),
    run([140, 64], [140, 84]),
  ];

  const nodes = [node(8, 182, 72), node(186, 22, 72), node(186, 182, 60)];

  return `<svg class="dome-art" viewBox="0 0 ${W} ${H}" role="img" aria-label="Illustration of a network dome covering an office site — cabling, wireless and cameras under one system" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="domeGlow" cx="50%" cy="62%" r="52%">
<stop offset="0%" stop-color="${CY}" stop-opacity=".20"/>
<stop offset="62%" stop-color="${CY}" stop-opacity=".05"/>
<stop offset="100%" stop-color="${CY}" stop-opacity="0"/>
</radialGradient>
<radialGradient id="floorGlow" cx="50%" cy="50%" r="50%">
<stop offset="0%" stop-color="${CY}" stop-opacity=".16"/>
<stop offset="100%" stop-color="${CY}" stop-opacity="0"/>
</radialGradient>
<linearGradient id="plateFill" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stop-color="#152e63"/>
<stop offset="100%" stop-color="#0d1b3d"/>
</linearGradient>
<filter id="soften" x="-30%" y="-30%" width="160%" height="160%">
<feGaussianBlur stdDeviation="7"/>
</filter>
</defs>

<ellipse cx="${r2(plateCentre.x)}" cy="${r2(plateCentre.y)}" rx="400" ry="235" fill="url(#floorGlow)"/>
<circle cx="${r2(plateCentre.x)}" cy="${r2(plateCentre.y - 90)}" r="345" fill="url(#domeGlow)"/>

<g class="dome-mesh">${dome(392, 30, plateCentre.x, plateCentre.y + 6)}</g>

<polygon points="${pts(plate)}" fill="url(#plateFill)" stroke="${CY}" stroke-width="1.4" stroke-opacity=".38"/>

<g class="dome-runs">${runs.join('')}</g>
<g>${blocks.join('')}</g>
<g class="dome-nodes">${nodes.join('')}</g>
</svg>`;
}

module.exports = { heroGraphic };
