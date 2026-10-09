"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { portraitProgress, PORTRAIT_CURSOR_HEIGHT } from "@/lib/portrait-progress";

/** Same arrow path as the Hero cursor SVG (viewBox 0 0 24 24), rotated like its `-rotate-12`. */
const CURSOR_PATH = "M4 2l7 19 3-9 9-3L4 2z";
const CURSOR_ROTATION = (-12 * Math.PI) / 180;
const CURSOR_SVG_HEIGHT = 19; // y: 2 -> 21 in viewBox units

const VERTEX = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute float aLum;
  attribute vec4 aRand; // x = delay (0..0.5), yzw = random

  uniform float uProgress;
  uniform float uTime;
  uniform float uCell;

  varying vec3 vNormal;
  varying float vLum;
  varying float vE;
  varying float vRand;

  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1.,0.,0., 0.,c,s, 0.,-s,c); }
  mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c,0.,-s, 0.,1.,0., s,0.,c); }
  mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c,s,0., -s,c,0., 0.,0.,1.); }

  void main() {
    float t = clamp((uProgress - aRand.x) / 0.5, 0.0, 1.0);
    float e = t * t * (3.0 - 2.0 * t);

    // Orientation: random tumble while a cursor, settles into a slanted stroke.
    vec3 tumble = aRand.yzw * 6.2831853;
    vec3 settled = vec3((aRand.z - 0.5) * 0.5, (aRand.w - 0.5) * 0.9, 0.38 + (aRand.y - 0.5) * 0.2);
    vec3 ang = mix(tumble, settled, e);
    mat3 R = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);

    // Bar size: chunky while a cursor, luminance-driven while a photo.
    vec3 sizeCursor = vec3(0.55, 1.9, 0.55);
    vec3 sizePhoto = vec3(0.42, 0.35 + 1.9 * pow(aLum, 0.9), 0.4);
    vec3 size = mix(sizeCursor, sizePhoto, e) * uCell;

    // Burst outwards mid-flight.
    vec3 dir = normalize(aRand.yzw - 0.5 + 1e-4);
    float burst = sin(3.14159265 * e) * (0.25 + aRand.y * 0.7);
    vec3 pos = mix(aStart, aEnd, e) + dir * burst * vec3(1.0, 1.0, 1.8);

    // Idle shimmer while still a cursor.
    pos += (aRand.yzw - 0.5) * 0.006 * sin(uTime * 2.2 + aRand.x * 40.0) * (1.0 - e);

    vec3 transformed = pos + R * (position * size);
    vNormal = R * normal;
    vLum = aLum;
    vE = e;
    vRand = aRand.w;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uCursor;
  uniform vec3 uDark;
  uniform vec3 uMid;
  uniform vec3 uBright;

  varying vec3 vNormal;
  varying float vLum;
  varying float vE;
  varying float vRand;

  void main() {
    vec3 n = normalize(vNormal);
    float diff = 0.42 + 0.58 * max(dot(n, normalize(vec3(0.35, 0.55, 0.8))), 0.0);

    vec3 photo = vLum < 0.5
      ? mix(uDark, uMid, vLum * 2.0)
      : mix(uMid, uBright, (vLum - 0.5) * 2.0);
    vec3 cursor = mix(uCursor, vec3(1.0), pow(vRand, 4.0) * 0.55);

    gl_FragColor = vec4(mix(cursor, photo, vE) * diff, 1.0);
  }
`;

function loadImage(src: string, fallback: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => {
      if (img.src.endsWith(fallback)) return reject(new Error("image failed"));
      img.src = fallback;
    };
    img.src = src;
  });
}

/** Luminance (0..1) per grid cell, using the same centre "cover" crop as `object-cover`. */
function sampleLuminance(img: HTMLImageElement, cols: number, rows: number): Float32Array {
  const aspect = cols / rows;
  const imgAspect = img.naturalWidth / img.naturalHeight;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  if (imgAspect > aspect) sw = sh * aspect;
  else sh = sw / aspect;
  const sx = (img.naturalWidth - sw) / 2;
  const sy = (img.naturalHeight - sh) / 2;

  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d context unavailable");
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
  const { data } = ctx.getImageData(0, 0, cols, rows);

  const out = new Float32Array(cols * rows);
  for (let i = 0; i < out.length; i++) {
    const l = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
    out[i] = Math.pow(Math.min(Math.max((l - 0.05) / 0.9, 0), 1), 0.85);
  }
  return out;
}

interface ShardPortraitProps {
  /** Image to turn into shards. */
  src: string;
  /** Used if `src` fails to load (e.g. the Next image optimizer URL). */
  fallbackSrc: string;
  /** Called when WebGL or the image fails, so the parent can fall back to the plain photo. */
  onError?: () => void;
}

/**
 * Thousands of slanted 3D bars (one InstancedMesh) that start as the Hero cursor and settle into
 * the photo, driven by `portraitProgress.value`. The parent controls visibility via its inline
 * `opacity`; rendering pauses while that is ~0 or the canvas is off screen.
 */
export default function ShardPortrait({ src, fallbackSrc, onError }: ShardPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let disposed = false;
    let raf = 0;
    let cleanup: (() => void) | undefined;

    const init = async () => {
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
      } catch {
        onErrorRef.current?.();
        return;
      }

      let img: HTMLImageElement;
      try {
        img = await loadImage(src, fallbackSrc);
      } catch {
        renderer.dispose();
        onErrorRef.current?.();
        return;
      }
      if (disposed) {
        renderer.dispose();
        return;
      }

      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      const aspect = width / height;

      // ---- Grid + per-instance data ---------------------------------------------------
      const rows = window.innerWidth < 768 ? 84 : 120;
      const cols = Math.round(rows * aspect);
      const count = cols * rows;
      const cell = 1 / rows;
      const lum = sampleLuminance(img, cols, rows);

      const cursorPath = new Path2D(CURSOR_PATH);
      const hit = document.createElement("canvas").getContext("2d")!;
      const k = PORTRAIT_CURSOR_HEIGHT / CURSOR_SVG_HEIGHT;
      const cosR = Math.cos(CURSOR_ROTATION);
      const sinR = Math.sin(CURSOR_ROTATION);

      const aStart = new Float32Array(count * 3);
      const aEnd = new Float32Array(count * 3);
      const aLum = new Float32Array(count);
      const aRand = new Float32Array(count * 4);
      const maxDist = Math.hypot(aspect / 2, 0.5);

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const n = j * cols + i;
          const ex = ((i + 0.5) / cols - 0.5) * aspect;
          const ey = 0.5 - (j + 0.5) / rows;
          aEnd[n * 3] = ex;
          aEnd[n * 3 + 1] = ey;
          aEnd[n * 3 + 2] = 0;
          aLum[n] = lum[n];

          // Random point inside the cursor arrow (SVG space), centred on the viewBox centre
          // so it lines up with the DOM cursor element, then rotated like the SVG.
          let px = 0;
          let py = 0;
          for (let tries = 0; tries < 60; tries++) {
            px = 4 + Math.random() * 19;
            py = 2 + Math.random() * 19;
            if (hit.isPointInPath(cursorPath, px, py)) break;
          }
          px -= 12;
          py -= 12;
          const rx = px * cosR - py * sinR;
          const ry = px * sinR + py * cosR;
          aStart[n * 3] = rx * k;
          aStart[n * 3 + 1] = -ry * k;
          aStart[n * 3 + 2] = (Math.random() - 0.5) * 0.06;

          // Delay ripples outward from the centre, plus noise.
          const dist = Math.hypot(ex, ey) / maxDist;
          aRand[n * 4] = 0.35 * dist + 0.15 * Math.random();
          aRand[n * 4 + 1] = Math.random();
          aRand[n * 4 + 2] = Math.random();
          aRand[n * 4 + 3] = Math.random();
        }
      }

      // ---- Three objects ----------------------------------------------------------------
      const base = new THREE.BoxGeometry(1, 1, 1);
      const geometry = new THREE.InstancedBufferGeometry();
      geometry.index = base.index;
      geometry.setAttribute("position", base.getAttribute("position"));
      geometry.setAttribute("normal", base.getAttribute("normal"));
      geometry.setAttribute("aStart", new THREE.InstancedBufferAttribute(aStart, 3));
      geometry.setAttribute("aEnd", new THREE.InstancedBufferAttribute(aEnd, 3));
      geometry.setAttribute("aLum", new THREE.InstancedBufferAttribute(aLum, 1));
      geometry.setAttribute("aRand", new THREE.InstancedBufferAttribute(aRand, 4));
      geometry.instanceCount = count;

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms: {
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uCell: { value: cell },
          uCursor: { value: new THREE.Color("#1DCD9F") },
          uDark: { value: new THREE.Color("#04120f") },
          uMid: { value: new THREE.Color("#1DCD9F") },
          uBright: { value: new THREE.Color("#e8fff8") },
        },
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;
      const scene = new THREE.Scene();
      scene.add(mesh);

      const fov = 30;
      const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 10);
      camera.position.z = 1.1 / 2 / Math.tan((fov * Math.PI) / 360);

      const resize = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      let inView = true;
      const io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
      });
      io.observe(host);

      // ---- Render loop (idle when hidden / fully settled) ----------------------------
      let lastProgress = -1;
      const frame = (time: number) => {
        raf = requestAnimationFrame(frame);
        const visible = parseFloat(host.style.opacity || "0") > 0.01;
        if (!inView || !visible) return;

        const p = portraitProgress.value;
        if (p === lastProgress && p >= 1) return;
        lastProgress = p;

        const s = Math.sin(Math.PI * Math.min(Math.max(p, 0), 1));
        mesh.rotation.set(-0.28 * s, 0.6 * s, 0);
        material.uniforms.uProgress.value = p;
        material.uniforms.uTime.value = time * 0.001;
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(frame);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        base.dispose();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
      };
    };

    init();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, [src, fallbackSrc]);

  return <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />;
}
