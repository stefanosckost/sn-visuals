"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef({ x: 0, y: 0 });
  const lastMoveRef = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (reduceMotion.matches || coarsePointer.matches) {
      return;
    }

    targetRef.current = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.28,
    };
    currentRef.current = targetRef.current;
    trailRef.current = targetRef.current;
    lastMoveRef.current = performance.now();

    const animateGlow = () => {
      frameRef.current = null;
      const current = currentRef.current;
      const target = targetRef.current;
      const next = {
        x: current.x + (target.x - current.x) * 0.26,
        y: current.y + (target.y - current.y) * 0.26,
      };
      const trail = trailRef.current;
      const nextTrail = {
        x: trail.x + (next.x - trail.x) * 0.14,
        y: trail.y + (next.y - trail.y) * 0.14,
      };
      const distance = Math.hypot(target.x - current.x, target.y - current.y);
      const idleTime = performance.now() - lastMoveRef.current;
      const waveOpacity =
        idleTime < 140 ? 0.88 : Math.max(0.1, 0.88 - (idleTime - 140) / 880);
      const waveScale = 1 + Math.min(distance / 130, 0.2);

      currentRef.current = next;
      trailRef.current = nextTrail;
      glowRef.current?.style.setProperty("--cursor-x", `${next.x}px`);
      glowRef.current?.style.setProperty("--cursor-y", `${next.y}px`);
      glowRef.current?.style.setProperty("--trail-x", `${nextTrail.x}px`);
      glowRef.current?.style.setProperty("--trail-y", `${nextTrail.y}px`);
      glowRef.current?.style.setProperty("--wave-opacity", `${waveOpacity}`);
      glowRef.current?.style.setProperty("--wave-scale", `${waveScale}`);

      if (distance > 0.4 || waveOpacity > 0.13) {
        frameRef.current = window.requestAnimationFrame(animateGlow);
      }
    };

    const scheduleGlow = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(animateGlow);
      }
    };

    const moveGlow = (event: PointerEvent) => {
      targetRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
      lastMoveRef.current = performance.now();
      scheduleGlow();
    };

    window.addEventListener("pointermove", moveGlow, { passive: true });
    scheduleGlow();

    return () => {
      window.removeEventListener("pointermove", moveGlow);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-ambient pointer-events-none fixed inset-0 z-0 hidden md:block"
      aria-hidden="true"
    >
      <div className="cursor-aura-position cursor-aura-position--trail">
        <div className="cursor-aura-blob cursor-aura-blob--outer" />
      </div>
      <div className="cursor-aura-position cursor-aura-position--main">
        <div className="cursor-aura-blob cursor-aura-blob--inner" />
      </div>
    </div>
  );
}
