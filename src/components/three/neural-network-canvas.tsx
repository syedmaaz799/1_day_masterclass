"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Props = { density?: number; className?: string };

function Nodes({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  const { positions, edgeBuffer, basePositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
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
    }
    return { positions, edgeBuffer: new Float32Array(count * count * 6), basePositions };
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

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.current.x = (nx * viewport.width) / 2;
      pointer.current.y = (ny * viewport.height) / 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [viewport]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const posAttr = pointsGeom.getAttribute("position") as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const edgeAttr = linesGeom.getAttribute("position") as THREE.BufferAttribute;
    const edgeArr = edgeAttr.array as Float32Array;
    const mx = pointer.current.x;
    const my = pointer.current.y;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = basePositions[i3]! + Math.sin(t * 0.18 + i * 0.5) * 0.3;
      pos[i3 + 1] = basePositions[i3 + 1]! + Math.cos(t * 0.22 + i * 0.4) * 0.25;
      pos[i3 + 2] = basePositions[i3 + 2]! + Math.sin(t * 0.14 + i * 0.7) * 0.2;
      const dx = mx - pos[i3]!;
      const dy = my - pos[i3 + 1]!;
      const dist = Math.hypot(dx, dy);
      if (dist < 3.5) {
        const f = (1 - dist / 3.5) * 0.18;
        pos[i3] = pos[i3]! + dx * f * delta;
        pos[i3 + 1] = pos[i3 + 1]! + dy * f * delta;
      }
    }
    posAttr.needsUpdate = true;

    let ei = 0;
    const maxD2 = 1.7 * 1.7;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ax = pos[i3]!;
      const ay = pos[i3 + 1]!;
      const az = pos[i3 + 2]!;
      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const dx = ax - pos[j3]!;
        const dy = ay - pos[j3 + 1]!;
        const dz = az - pos[j3 + 2]!;
        if (dx * dx + dy * dy + dz * dz < maxD2) {
          edgeArr[ei++] = ax;
          edgeArr[ei++] = ay;
          edgeArr[ei++] = az;
          edgeArr[ei++] = pos[j3]!;
          edgeArr[ei++] = pos[j3 + 1]!;
          edgeArr[ei++] = pos[j3 + 2]!;
        }
      }
    }
    linesGeom.setDrawRange(0, ei / 3);
    edgeAttr.needsUpdate = true;
    const rot = Math.sin(t * 0.04) * 0.05;
    if (points.current) points.current.rotation.y = rot;
    if (lines.current) lines.current.rotation.y = rot;
  });

  return (
    <group position={[2.2, 0, 0]}>
      <lineSegments ref={lines} geometry={linesGeom}>
        <lineBasicMaterial
          color="#4f7cff"
          transparent
          opacity={0.32}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points ref={points} geometry={pointsGeom}>
        <pointsMaterial
          size={0.065}
          color="#ffffff"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function NeuralNetworkCanvas({ density = 60, className }: Props) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        className="!h-full !min-h-screen !w-full"
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.6]}
        frameloop="always"
        style={{ pointerEvents: "none", background: "#050505" }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 8, 16]} />
        <ambientLight intensity={0.55} />
        <Nodes count={density} />
      </Canvas>
    </div>
  );
}
