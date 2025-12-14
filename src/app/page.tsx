"use client";

import { useCallback, useState } from "react";
import IntroLoader from "@/components/intro/IntroLoader";
import Navbar from "@/components/nav/Navbar";
import HeroScene from "@/components/hero/HeroScene";
import MapScene from "@/components/hero/MapScene";
import ScrollSections from "@/components/sections/ScrollSections";
import Footer from "@/components/footer/Footer";

type Phase = "intro" | "hero" | "ready";

export default function HomePage() {
  const [phase, setPhase] = useState<Phase>("intro");

  const handleHeroStart = useCallback(() => {
    setPhase("hero");
  }, []);

  const handleHeroReveal = useCallback(() => {
    setPhase("ready");
  }, []);

  return (
    <>
      {phase !== "ready" && <IntroLoader onHeroStart={handleHeroStart} />}

      {phase === "ready" && <Navbar />}

      <main>
        <HeroScene play={phase === "hero"} onRevealComplete={handleHeroReveal} />
        {phase === "ready" && (
          <>
            <MapScene />
            <ScrollSections />
          </>
        )}
      </main>

      {phase === "ready" && <Footer />}
    </>
  );
}
