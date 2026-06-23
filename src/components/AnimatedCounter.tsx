"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  suffix?: string;
  target?: number;
  text?: string;
};

export function AnimatedCounter({
  suffix = "",
  target,
  text,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(target ?? 0);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || target === undefined) {
      return;
    }

    const runCounter = () => {
      if (hasRun) {
        return;
      }

      setHasRun(true);
      setValue(0);
      const duration = 1100;
      const start = window.performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;

        setValue(Number((target * eased).toFixed(target % 1 === 0 ? 0 : 1)));

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      };

      window.requestAnimationFrame(tick);
    };

    const rect = node.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isAlreadyVisible) {
      runCounter();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        runCounter();
        observer.unobserve(entry.target);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasRun, target]);

  if (text) {
    return <span ref={ref}>{text}</span>;
  }

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
