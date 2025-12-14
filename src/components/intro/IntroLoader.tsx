"use client";

import { useEffect, useRef } from "react";
import Logo from "@/components/brand/Logo";
import { createIntroTimeline } from "@/lib/animations";

type Props = {
  onHeroStart?: () => void;
};

export default function IntroLoader({ onHeroStart }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    // Lock scroll during intro
    document.body.style.overflow = "hidden";

    const tl = createIntroTimeline(
      containerRef.current,
      logoRef.current,
      () => {
        if (doneRef.current) return;
        doneRef.current = true;
        onHeroStart?.();
      }
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "auto";

      if (containerRef.current) {
        containerRef.current.style.display = "";
      }
    };
  }, [onHeroStart]);

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
        className="intro-logo atmc-logo"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo />
      </div>
    </div>
  );
}
