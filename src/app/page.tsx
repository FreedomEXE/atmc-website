"use client";

import { useState } from "react";
import IntroLoader from "@/components/intro/IntroLoader";
import Navbar from "@/components/nav/Navbar";
import HeroScene from "@/components/hero/HeroScene";
import MapScene from "@/components/hero/MapScene";
import ScrollSections from "@/components/sections/ScrollSections";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <IntroLoader onComplete={() => setIntroComplete(true)} />

      {introComplete && (
        <>
          <Navbar />
          <main>
            <HeroScene />
            <MapScene />
            <ScrollSections />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
