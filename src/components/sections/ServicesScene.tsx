"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const COUNT = 1800;

/* ---------- Shape generators: one particle formation per practice area ---------- */

// 01 · Sistemas: a structured lattice — points on the faces of a cube grid.
function latticeShape(): Float32Array {
  const out = new Float32Array(COUNT * 3);
  const n = 9;
  const size = 1.5;
  for (let i = 0; i < COUNT; i++) {
    const face = i % 6;
    const a = (Math.floor(Math.random() * n) / (n - 1)) * 2 - 1;
    const b = (Math.floor(Math.random() * n) / (n - 1)) * 2 - 1;
    const jitter = () => (Math.random() - 0.5) * 0.02;
    const s = face < 3 ? 1 : -1;
    const axis = face % 3;
    const p = [0, 0, 0];
    p[axis] = s;
    p[(axis + 1) % 3] = a;
    p[(axis + 2) % 3] = b;
    out[i * 3] = p[0] * size + jitter();
    out[i * 3 + 1] = p[1] * size + jitter();
    out[i * 3 + 2] = p[2] * size + jitter();
  }
  return out;
}

// 02 · APIs: a network — dense nodes joined by streams of particles.
function networkShape(): Float32Array {
  const out = new Float32Array(COUNT * 3);
  const nodes: THREE.Vector3[] = [];
  const nodeCount = 14;
  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    nodes.push(
      new THREE.Vector3().setFromSphericalCoords(1.7, phi, theta),
    );
  }
  const edges: [number, number][] = [];
  nodes.forEach((node, i) => {
    const nearest = nodes
      .map((other, j) => ({ j, d: node.distanceTo(other) }))
      .filter(({ j }) => j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 3);
    nearest.forEach(({ j }) => {
      if (i < j) edges.push([i, j]);
    });
  });
  const v = new THREE.Vector3();
  for (let i = 0; i < COUNT; i++) {
    if (i % 3 === 0) {
      const node = nodes[i % nodeCount];
      v.copy(node).add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.22,
          (Math.random() - 0.5) * 0.22,
          (Math.random() - 0.5) * 0.22,
        ),
      );
    } else {
      const [a, b] = edges[i % edges.length];
      v.lerpVectors(nodes[a], nodes[b], Math.random());
    }
    out[i * 3] = v.x;
    out[i * 3 + 1] = v.y;
    out[i * 3 + 2] = v.z;
  }
  return out;
}

// 03 · IA: a neural sphere — Fibonacci shell with organic displacement.
function sphereShape(): Float32Array {
  const out = new Float32Array(COUNT * 3);
  const v = new THREE.Vector3();
  for (let i = 0; i < COUNT; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r =
      1.55 +
      0.14 * Math.sin(phi * 6) * Math.cos(theta * 3) +
      (Math.random() - 0.5) * 0.05;
    v.setFromSphericalCoords(r, phi, theta);
    out[i * 3] = v.x;
    out[i * 3 + 1] = v.y;
    out[i * 3 + 2] = v.z;
  }
  return out;
}

// 04 · Consultoria: an orbit — a tilted torus with a guiding inner ring.
function orbitShape(): Float32Array {
  const out = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const u = Math.random() * Math.PI * 2;
    const inner = i % 4 === 0;
    const R = inner ? 0.75 : 1.55;
    const r = inner ? 0.02 : 0.16 + Math.random() * 0.06;
    const w = Math.random() * Math.PI * 2;
    const x = (R + r * Math.cos(w)) * Math.cos(u);
    const y = (R + r * Math.cos(w)) * Math.sin(u);
    const z = r * Math.sin(w);
    // tilt for depth
    out[i * 3] = x;
    out[i * 3 + 1] = y * 0.42 - z * 0.9;
    out[i * 3 + 2] = y * 0.9 + z * 0.42;
  }
  return out;
}

function makeDotTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.65)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

type ServicesSceneProps = {
  activeIndex: number;
  reduceMotion: boolean;
};

export default function ServicesScene({ activeIndex, reduceMotion }: ServicesSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef<((index: number) => void) | null>(null);
  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const shapes = [latticeShape(), networkShape(), sphereShape(), orbitShape()];

    // No WebGL (old device, disabled GPU): leave the panel's static backdrop.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.set(0, 0, 7.2);

    const initial = shapes[activeRef.current % shapes.length];
    const positions = new Float32Array(initial);
    const from = new Float32Array(initial);
    let to = initial;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const texture = makeDotTexture();
    const material = new THREE.PointsMaterial({
      size: 0.085,
      map: texture,
      color: new THREE.Color("#22d3ee"),
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    const morph = { t: 1 };
    let tween: gsap.core.Tween | null = null;

    const applyMorph = () => {
      const t = morph.t;
      for (let i = 0; i < positions.length; i++) {
        positions[i] = from[i] + (to[i] - from[i]) * t;
      }
      geometry.attributes.position.needsUpdate = true;
    };

    const render = () => renderer.render(scene, camera);

    morphRef.current = (index: number) => {
      from.set(positions);
      to = shapes[index % shapes.length];
      tween?.kill();
      if (reduceMotion) {
        morph.t = 1;
        applyMorph();
        render();
        return;
      }
      morph.t = 0;
      tween = gsap.to(morph, {
        t: 1,
        duration: 1.6,
        ease: "expo.inOut",
        onUpdate: applyMorph,
      });
      // a little "breath" of the whole formation during the change
      gsap.fromTo(
        group.scale,
        { x: 0.92, y: 0.92, z: 0.92 },
        { x: 1, y: 1, z: 1, duration: 1.6, ease: "expo.out" },
      );
    };

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = `${w}px`;
      renderer.domElement.style.height = `${h}px`;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      render();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // Pointer parallax (fine pointers only)
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Only animate while visible
    let visible = false;
    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      group.rotation.y += dt * 0.18;
      group.rotation.x += (pointer.y * 0.25 - group.rotation.x) * 0.04;
      group.position.x += (pointer.x * 0.15 - group.position.x) * 0.04;
      render();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (reduceMotion) {
          render();
          return;
        }
        if (visible && !raf) {
          clock.getDelta();
          loop();
        } else if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.05 },
    );
    io.observe(mount);

    if (reduceMotion) {
      group.rotation.set(0.35, 0.6, 0);
      render();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      tween?.kill();
      gsap.killTweensOf(group.scale);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      morphRef.current = null;
    };
  }, [reduceMotion]);

  useEffect(() => {
    morphRef.current?.(activeIndex);
  }, [activeIndex]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
