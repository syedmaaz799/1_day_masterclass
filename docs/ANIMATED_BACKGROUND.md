# Animated Background — Full Code Reference

This document contains **all code** used for the cinematic animated background on the NeuralVarsity landing page.

The effect is built from **three layers** stacked together:

1. **3D neural network** — React Three Fiber + Three.js (`NeuralNetworkCanvas`)
2. **Atmospheric overlays** — CSS gradients, fine grid, noise texture
3. **Masking** — radial fade so edges dissolve into the dark theme

---

## Dependencies

```json
"@react-three/fiber": "^8.17.10",
"@react-three/drei": "^9.114.0",
"three": "^0.169.0"
```

---

## 1. Core 3D Component (main animation)

**File in project:** `components/three/neural-network-canvas.tsx`

This creates floating nodes (points), dynamic edges between nearby nodes, gentle sine-wave drift, mouse attraction, slow rotation, blue additive-blended lines, and fog.

```tsx
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface NeuralNetworkProps {
  density?: number;
  className?: string;
}

function Nodes({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();

  const { positions, velocities, edgeBuffer, basePositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 6;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;
      velocities[i3] = (Math.random() - 0.5) * 0.0015;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.0015;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.0008;
    }

    const edgeBuffer = new Float32Array(count * count * 6);
    return { positions, velocities, edgeBuffer, basePositions };
  }, [count]);

  const linesGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(edgeBuffer, 3));
    g.setDrawRange(0, 0);
    return g;
  }, [edgeBuffer]);

  const pointsGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const pos = pointsGeom.attributes.position.array as Float32Array;
    const targetMouseX = (mouse.x * viewport.width) / 2;
    const targetMouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      // gentle drift
      pos[i3] = bx + Math.sin(t * 0.18 + i * 0.5) * 0.3;
      pos[i3 + 1] = by + Math.cos(t * 0.22 + i * 0.4) * 0.25;
      pos[i3 + 2] = bz + Math.sin(t * 0.14 + i * 0.7) * 0.2;

      // subtle cursor attraction
      const dx = targetMouseX - pos[i3];
      const dy = targetMouseY - pos[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3.5) {
        const force = (1 - dist / 3.5) * 0.18;
        pos[i3] += dx * force * delta;
        pos[i3 + 1] += dy * force * delta;
      }
    }
    pointsGeom.attributes.position.needsUpdate = true;

    // recompute edges between nearby nodes
    const edgeArr = linesGeom.attributes.position.array as Float32Array;
    let ei = 0;
    const maxDist = 1.7;
    const maxDistSq = maxDist * maxDist;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ax = pos[i3];
      const ay = pos[i3 + 1];
      const az = pos[i3 + 2];
      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const dx = ax - pos[j3];
        const dy = ay - pos[j3 + 1];
        const dz = az - pos[j3 + 2];
        const dsq = dx * dx + dy * dy + dz * dz;
        if (dsq < maxDistSq) {
          edgeArr[ei++] = ax;
          edgeArr[ei++] = ay;
          edgeArr[ei++] = az;
          edgeArr[ei++] = pos[j3];
          edgeArr[ei++] = pos[j3 + 1];
          edgeArr[ei++] = pos[j3 + 2];
        }
      }
    }
    linesGeom.setDrawRange(0, ei / 3);
    linesGeom.attributes.position.needsUpdate = true;

    if (points.current) {
      points.current.rotation.y = Math.sin(t * 0.04) * 0.05;
    }
    if (lines.current) {
      lines.current.rotation.y = Math.sin(t * 0.04) * 0.05;
    }
  });

  return (
    <group>
      <lineSegments ref={lines} geometry={linesGeom}>
        <lineBasicMaterial
          color="#4DA3FF"
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points ref={points} geometry={pointsGeom}>
        <pointsMaterial
          size={0.05}
          color="#ffffff"
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function NeuralNetworkCanvas({ density = 60, className }: NeuralNetworkProps) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.6]}
      >
        <fog attach="fog" args={["#0B0B0F", 6, 14]} />
        <ambientLight intensity={0.4} />
        <Nodes count={density} />
      </Canvas>
    </div>
  );
}
```

### How the 3D animation works

| Part | What it does |
|------|----------------|
| **Nodes** | Random 3D points in a box (~14×10×6 units) |
| **Drift** | Each frame, positions oscillate with `sin`/`cos` for organic motion |
| **Edges** | Lines drawn between node pairs closer than `1.7` units |
| **Mouse** | Nodes within 3.5 units of cursor are gently pulled toward it |
| **Rotation** | Whole group slowly rotates on Y axis |
| **Materials** | White points + blue `#4DA3FF` lines with additive blending |
| **Fog** | `#0B0B0F` fog fades distant geometry into the page background |

---

## 2. How it is loaded in sections (Next.js)

The canvas is **client-only** (no SSR) via `next/dynamic`:

```tsx
import dynamic from "next/dynamic";

const NeuralNetworkCanvas = dynamic(
  () => import("@/components/three/neural-network-canvas").then((m) => m.NeuralNetworkCanvas),
  { ssr: false }
);
```

### Hero section — full background stack

**File:** `components/sections/hero.tsx`

```tsx
{/* 3D neural network background */}
<div className="absolute inset-0 -z-10">
  <NeuralNetworkCanvas density={70} className="absolute inset-0 mask-radial opacity-80" />
</div>

{/* Atmospheric overlay */}
<div className="pointer-events-none absolute inset-0 -z-10">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0F]/30 to-[#0B0B0F]" />
  <div className="absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_top,rgba(77,163,255,0.10),transparent_55%)]" />
  <div className="absolute inset-0 bg-grid-fine opacity-[0.5] mask-radial" />
  <div className="absolute inset-0 bg-noise opacity-[0.5] mix-blend-overlay" />
</div>
```

### Final CTA section (lighter variant)

**File:** `components/sections/final-cta.tsx`

```tsx
<div className="absolute inset-0 -z-10">
  <NeuralNetworkCanvas density={50} className="absolute inset-0 opacity-50 mask-radial" />
</div>
<div className="pointer-events-none absolute inset-0 -z-10">
  <div className="absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_top,rgba(77,163,255,0.12),transparent_55%)]" />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0F]/40 to-[#0B0B0F]" />
</div>
```

---

## 3. Supporting CSS utilities

**File:** `app/globals.css`

```css
.mask-radial {
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
}

.bg-grid-fine {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 28px 28px;
}

.bg-grid-soft {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 64px 64px;
}
```

---

## 4. Noise texture (Tailwind)

**File:** `tailwind.config.ts`

```ts
backgroundImage: {
  noise:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
},
```

Used as: `className="bg-noise opacity-[0.5] mix-blend-overlay"`

---

## 5. Layer stack (visual order, bottom → top)

```
┌─────────────────────────────────────┐
│  NeuralNetworkCanvas (Three.js)     │  ← animated nodes + edges
├─────────────────────────────────────┤
│  Vertical gradient (#0B0B0F fade)    │
├─────────────────────────────────────┤
│  Blue radial glow (accent top)      │
├─────────────────────────────────────┤
│  Fine grid (bg-grid-fine)           │
├─────────────────────────────────────┤
│  Film grain (bg-noise overlay)      │
├─────────────────────────────────────┤
│  mask-radial on 3D + grid layers    │  ← soft vignette
└─────────────────────────────────────┘
         Hero content (text, CTAs)
```

---

## 6. Tunable parameters

| Prop / value | Location | Effect |
|--------------|----------|--------|
| `density={70}` | Hero | More nodes = denser network |
| `density={50}` | Final CTA | Lighter background |
| `opacity-80` / `opacity-50` | className | 3D layer visibility |
| `maxDist = 1.7` | neural-network-canvas | Edge connection distance |
| `color="#4DA3FF"` | line material | Edge glow color |
| `fog args={["#0B0B0F", 6, 14]}` | Canvas | Depth fade |

---

## Related (not the hero background, but also animated on the site)

- **Smooth scroll:** Lenis — `components/providers/smooth-scroll-provider.tsx`
- **Scroll animations:** GSAP ScrollTrigger — used in scroll storytelling sections
- **UI motion:** Framer Motion — `Reveal`, `SplitText`, section transitions
- **Tech ecosystem orbit:** CSS + Framer Motion rotation — `components/sections/tech-ecosystem.tsx` (separate from the neural network hero background)

---

## Quick reuse checklist

1. Copy `components/three/neural-network-canvas.tsx`
2. Install `three`, `@react-three/fiber`, `@react-three/drei`
3. Dynamic-import with `{ ssr: false }`
4. Add `mask-radial`, grid, gradient, and noise layers from above
5. Set section `className="relative isolate overflow-hidden"` and place background in `absolute inset-0 -z-10`
