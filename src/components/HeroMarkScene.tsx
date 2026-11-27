"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

// 240px copy of /sigla-2j.png: the scene only samples pixels, so the 840 KB
// original would be wasted bytes on mobile networks.
const LOGO_SRC = "/sigla-2j-mark.png";
const SAMPLE_SIZE = 220;
const MARK_HEIGHT = 3.4;

const CYAN = new THREE.Color("#22d3ee");
const WHITE = new THREE.Color("#e6fbff");

type Sample = { x: number; y: number; white: boolean };

/** Reads the logo's lit pixels into normalized points (glow halo excluded). */
async function sampleLogo(): Promise<Sample[]> {
  const img = new Image();
  img.decoding = "async";
  img.src = LOGO_SRC;
  await img.decode();

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SAMPLE_SIZE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  const { data } = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

  const raw: Sample[] = [];
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (let y = 0; y < SAMPLE_SIZE; y++) {
    for (let x = 0; x < SAMPLE_SIZE; x++) {
      const i = (y * SAMPLE_SIZE + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (Math.max(r, g, b) < 150) continue;
      raw.push({ x, y, white: r > 170 });
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  if (!raw.length) return [];

  const scale = MARK_HEIGHT / (maxY - minY);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return raw.map((p) => ({
    x: (p.x - cx) * scale,
    y: -(p.y - cy) * scale,
    white: p.white,
  }));
}

function makeDotTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.6)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * The 2J mark as a particle sculpture: particles stream in from a scattered
 * cloud, lock into the logo, then breathe, sway with the pointer and get
 * swept by a slow scan of light.
 */
export default function HeroMarkScene({ reduceMotion }: { reduceMotion: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup = () => {};

    const start = () => {
      sampleLogo()
        .then((samples) => {
          if (disposed || !samples.length) return;
          cleanup = build(mount, samples, reduceMotion);
        })
        .catch(() => {
          /* Logo failed to load: the hero simply has no mark behind the photo. */
        });
    };

    // Let the headline and portrait (the LCP) paint first; WebGL boots when
    // the main thread is idle, so slow phones on 4G never wait on it.
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 600);

    return () => {
      disposed = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cleanup();
    };
  }, [reduceMotion]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}

function build(mount: HTMLDivElement, samples: Sample[], reduceMotion: boolean) {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.display = "block";
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
  camera.position.set(0, 0, 7);

  const count = window.innerWidth < 768 ? 3200 : 5200;
  const target = new Float32Array(count * 3);
  const start = new Float32Array(count * 3);
  const positions = new Float32Array(count * 3);
  const baseColors = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const delay = new Float32Array(count);
  const phase = new Float32Array(count);

  const v = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    const s = samples[Math.floor(Math.random() * samples.length)];
    const jitter = 0.012;
    target[i * 3] = s.x + (Math.random() - 0.5) * jitter;
    target[i * 3 + 1] = s.y + (Math.random() - 0.5) * jitter;
    // Extruded depth so the mark reads as a solid when it turns.
    target[i * 3 + 2] = (Math.random() - 0.5) * 0.34;

    // Scattered spherical cloud, biased behind the mark.
    v.setFromSphericalCoords(
      4 + Math.random() * 4,
      Math.acos(2 * Math.random() - 1),
      Math.random() * Math.PI * 2,
    );
    start[i * 3] = v.x;
    start[i * 3 + 1] = v.y;
    start[i * 3 + 2] = v.z - 2;

    const color = s.white ? WHITE : CYAN;
    const dim = s.white ? 0.78 : 1;
    baseColors[i * 3] = color.r * dim;
    baseColors[i * 3 + 1] = color.g * dim;
    baseColors[i * 3 + 2] = color.b * dim;

    // Particles nearer the bottom-left arrive first: the mark "writes" itself.
    delay[i] = ((s.x - s.y) / (MARK_HEIGHT * 2) + 0.5) * 0.45 + Math.random() * 0.12;
    phase[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const texture = makeDotTexture();
  const material = new THREE.PointsMaterial({
    size: 0.068,
    map: texture,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const group = new THREE.Group();
  group.add(new THREE.Points(geometry, material));
  scene.add(group);

  const intro = { p: reduceMotion ? 1 : 0 };
  const expoOut = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));

  const update = (time: number) => {
    const p = intro.p;
    // Scan band travels top → bottom every ~6s once the mark has formed.
    const scanY = MARK_HEIGHT * 0.75 - ((time * 0.55) % (MARK_HEIGHT * 2.2));
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const local = Math.min(Math.max((p * 1.6 - delay[i]) / 1, 0), 1);
      const k = expoOut(local);
      const breathe = reduceMotion ? 0 : Math.sin(time * 1.1 + phase[i]) * 0.018 * k;
      positions[i3] = start[i3] + (target[i3] - start[i3]) * k + breathe;
      positions[i3 + 1] = start[i3 + 1] + (target[i3 + 1] - start[i3 + 1]) * k + breathe * 0.6;
      positions[i3 + 2] = start[i3 + 2] + (target[i3 + 2] - start[i3 + 2]) * k;

      const d = Math.abs(target[i3 + 1] - scanY);
      const boost = reduceMotion ? 0 : Math.max(0, 1 - d / 0.35) * 0.9 * k;
      const light = 0.35 + 0.65 * k + boost;
      colors[i3] = Math.min(baseColors[i3] * light + boost * 0.2, 1.4);
      colors[i3 + 1] = Math.min(baseColors[i3 + 1] * light + boost * 0.2, 1.4);
      colors[i3 + 2] = Math.min(baseColors[i3 + 2] * light + boost * 0.2, 1.4);
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  };

  const render = () => renderer.render(scene, camera);

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

  const pointer = { x: 0, y: 0 };
  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  let introTween: gsap.core.Tween | null = null;
  if (!reduceMotion) {
    introTween = gsap.to(intro, { p: 1, duration: 2.6, delay: 0.3, ease: "power2.out" });
  }

  let raf = 0;
  const clock = new THREE.Clock();
  const loop = () => {
    raf = requestAnimationFrame(loop);
    const time = clock.getElapsedTime();
    update(time);
    const swayY = Math.sin(time * 0.35) * 0.32;
    group.rotation.y += (swayY + pointer.x * 0.28 - group.rotation.y) * 0.05;
    group.rotation.x += (pointer.y * 0.16 - group.rotation.x) * 0.05;
    group.position.y = Math.sin(time * 0.6) * 0.05;
    render();
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      if (reduceMotion) return;
      if (entry.isIntersecting && !raf) {
        loop();
      } else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    { threshold: 0.02 },
  );

  if (reduceMotion) {
    update(0);
    group.rotation.set(0.05, -0.18, 0);
    render();
  } else {
    io.observe(mount);
  }

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    introTween?.kill();
    geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
