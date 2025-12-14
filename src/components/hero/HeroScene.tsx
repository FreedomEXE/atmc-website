"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "@/components/brand/Logo";
import { createHeroTimeline } from "@/lib/animations";

type Props = {
  play: boolean;
  onRevealComplete?: () => void;
};

export default function HeroScene({ play, onRevealComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const doneRef = useRef(false);

  useLayoutEffect(() => {
    if (!play || hasPlayedRef.current) return;
    if (!containerRef.current) return;

    hasPlayedRef.current = true;

    const ctx = gsap.context(() => {
      const tl = createHeroTimeline(containerRef.current!, () => {
        if (doneRef.current) return;
        doneRef.current = true;
        onRevealComplete?.();
      });

      return () => tl.kill();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [play, onRevealComplete]);

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
        padding: "2rem",
        backgroundColor: "var(--brand-neutral)",
        color: "var(--brand-dark)",
      }}
    >
      <div className="hero-logo atmc-logo" style={{ marginBottom: "2rem" }}>
        <Logo />
      </div>
      <h1 className="headline hero-headline" style={{ marginBottom: "2rem", textAlign: "center" }}>
        Your Property, Our Priority
      </h1>
      <button
        className="cta"
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Explore Properties
      </button>
    </section>
  );
}
