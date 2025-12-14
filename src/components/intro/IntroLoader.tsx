"use client";

import { useEffect, useRef } from "react";
import Logo from "@/components/brand/Logo";
import { createIntroTimeline } from "@/lib/animations";

type Props = {
  onComplete?: () => void;
};

export default function IntroLoader({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    // Create intro timeline
    const tl = createIntroTimeline(containerRef.current, () => {
      // Enable scroll after intro
      document.body.style.overflow = "auto";
      if (onComplete) onComplete();
    });

    // Lock scroll during intro
    document.body.style.overflow = "hidden";

    // Example animation sequence
    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(logoRef.current, {
        scale: 1,
        duration: 0.8,
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        },
      });

    return () => {
      tl.kill();
      document.body.style.overflow = "auto";

      if (containerRef.current) {
        containerRef.current.style.display = "";
      }
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
      }}
    >
      <div
        ref={logoRef}
        className="atmc-logo"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo width={300} />
      </div>
    </div>
  );
}
