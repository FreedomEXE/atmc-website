"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "@/components/brand/Logo";
import { createHeroTimeline } from "@/lib/animations";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      createHeroTimeline(containerRef.current!);
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
      }}
    >
      <div className="hero-logo atmc-logo" style={{ marginBottom: "2rem" }}>
        <Logo width={300} />
      </div>
      <h1 ref={headlineRef} className="headline" style={{ fontSize: "4rem", marginBottom: "2rem", textAlign: "center" }}>
        Premium Property Management
      </h1>
      <button
        ref={ctaRef}
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
