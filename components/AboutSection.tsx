"use client";

import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float, Html, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function Tunnel({ opacity }: { opacity: number }) {
  const frames = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      z: i * -4 + 5,
      scale: [12, 10, 0.1] as [number, number, number],
    }));
  }, []);

  return (
    <group>
      {frames.map((frame, i) => (
        <mesh key={i} position={[0, 0, frame.z]} scale={frame.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#1DCD9F" 
            transparent 
            opacity={opacity * (1 - i / 35)} 
            wireframe 
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  const texture = useTexture("/ojan.png");
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  
  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;

  // Mapping scroll progress to specific animation states
  // 0.0 - 0.2: Entering & Descent
  // 0.2 - 0.8: Content Reveal (Pinned focus)
  // 0.8 - 1.0: Quick Exit Traverse
  
  const tunnelReveal = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, 0.2, 0, 1, scrollProgress));
  const headerReveal = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.2, 0.4, 0, 1, scrollProgress));
  const photoReveal  = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.4, 0.6, 0, 1, scrollProgress));
  const descReveal   = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.6, 0.8, 0, 1, scrollProgress));
  const gridReveal   = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.8, 1.0, 0, 1, scrollProgress));

  // Calculated values for 3D elements
  // Photo: Left to Right
  const photoTargetX = isMobile ? 0 : isTablet ? -2.0 : -2.8;
  const photoStartX = isMobile ? -8 : -15;
  const photoX = gsap.utils.interpolate(photoStartX, photoTargetX, photoReveal);
  const photoOpacity = photoReveal;
  const photoY = isMobile ? 1.4 : 0;
  const photoScale: [number, number, number] = isMobile ? [2.6, 3.4, 1] : isTablet ? [2.8, 3.7, 1] : [3.2, 4.2, 1];

  // Calculated values for HTML elements
  const htmlPosition: [number, number, number] = isMobile ? [0, -1.2, -18] : isTablet ? [0.5, 0.2, -18] : [1.8, 0.2, -18];
  const htmlWidth = isMobile ? "260px" : isTablet ? "400px" : "550px";

  // Header: Top to Bottom
  const headerY = gsap.utils.interpolate(isMobile ? -50 : -100, 0, headerReveal);
  const headerOpacity = headerReveal;

  // Description: Right to Left
  const descX = gsap.utils.interpolate(isMobile ? 50 : 100, 0, descReveal);
  const descOpacity = descReveal;

  // Grid: Bottom to Top
  const gridY = gsap.utils.interpolate(isMobile ? 50 : 100, 0, gridReveal);
  const gridOpacity = gridReveal;

  useFrame(() => {
    // Camera Logic: Move down until 0.2, then stay completely still
    const camProgress = Math.min(scrollProgress, 0.2);
    const camY = gsap.utils.mapRange(0, 0.2, 12, 0, camProgress);
    const camZ = gsap.utils.mapRange(0, 0.2, 15, -8, camProgress);
    
    camera.position.set(0, camY, camZ);
    camera.lookAt(0, 0, camZ - 10);

    // Subtle sway effect for the entire group
    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.sin(scrollProgress * Math.PI) * 0.02, 0.1);
    }
  });

  const tunnelOpacity = gsap.utils.interpolate(0, 0.5, tunnelReveal);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 5]} intensity={2} color="#1DCD9F" />
      <pointLight position={[0, -5, -20]} intensity={1.5} color="#1DCD9F" />
      
      <Tunnel opacity={tunnelOpacity} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={meshRef} position={[photoX, photoY, -18]} scale={photoScale}>
          <planeGeometry />
          <meshStandardMaterial 
            map={texture} 
            transparent 
            opacity={photoOpacity}
            roughness={0.4}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>

      <Html
        position={htmlPosition}
        transform
        center={isMobile}
        distanceFactor={isMobile ? 8 : 5.5}
        style={{
          pointerEvents: scrollProgress > 0.3 && scrollProgress < 0.9 ? "auto" : "none"
        }}
      >
        <div style={{ width: htmlWidth, maxWidth: "85vw" }} className="flex flex-col gap-4 md:gap-6 text-white select-none overflow-visible">
          {/* Header Section (About Me & Title) animating together from top to bottom */}
          <div className="hidden md:block" style={{ transform: `translateY(${headerY}px)`, opacity: headerOpacity }}>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-primary">About Me</span>
              <div className="h-px w-16 md:w-20 bg-primary/60" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
              Obsessed with<br />
              <span className="text-primary">quality</span> & craft.
            </h2>
          </div>

          <div 
            className="space-y-3 md:space-y-4 text-white/70 text-xs md:text-sm leading-relaxed text-center md:text-left"
            style={{ 
              transform: `translateX(${descX}px)`,
              opacity: descOpacity
            }}
          >
            <p>
              I&apos;m a dedicated <span className="text-white font-semibold">Backend Developer</span> & <span className="text-primary font-semibold">SQE</span> with a passion for reliability.
            </p>
            <p className="hidden sm:block">
              I specialize in comprehensive testing strategies that maintain high-quality standards throughout the lifecycle.
            </p>
          </div>

          <div 
            className="hidden md:grid grid-cols-2 gap-4 mt-4"
            style={{ 
              transform: `translateY(${gridY}px)`,
              opacity: gridOpacity
            }}
          >
            {[
              { key: "Experience", val: "Backend & QA" },
              { key: "Focus", val: "Quality Assurance" },
              { key: "Location", val: "Bogor, ID" },
              { key: "Status", val: "Available" },
            ].map(({ key, val }) => (
              <div key={key} className="flex flex-col">
                <span className="text-white/30 uppercase font-mono text-[0.6rem] tracking-wider">{key}</span>
                <span className="text-white/80 text-xs font-medium">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </Html>

      <gridHelper args={[200, 40, 0x1DCD9F, 0x222222]} position={[0, -4.5, 0]} />
      <gridHelper args={[200, 40, 0x1DCD9F, 0x222222]} position={[0, 4.5, 0]} rotation={[Math.PI, 0, 0]} />
    </group>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal from Hero
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      });

      revealTl.to("#hero", {
        y: -100,
        opacity: 0.3,
        ease: "none"
      });

      // 2. Main Pinned Timeline - Optimized length for better flow
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=350%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative w-full h-screen bg-black overflow-hidden z-10"
    >
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 12, 15]} fov={50} />
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      <span aria-hidden="true"
        className="absolute right-10 top-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.03] select-none leading-none pointer-events-none z-10"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        02
      </span>

      <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.5)_2px,rgba(0,0,0,0.5)_4px)]" />
      </div>
    </section>
  );
}
