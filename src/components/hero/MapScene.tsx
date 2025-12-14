"use client";

import { useLayoutEffect, useRef } from "react";
import { createMapScrollTrigger } from "@/lib/animations";

export default function MapScene() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!triggerRef.current || !pinRef.current || !mapRef.current) return;

    const tl = createMapScrollTrigger(
      triggerRef.current,
      pinRef.current,
      mapRef.current
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={triggerRef} style={{ minHeight: "300vh" }}>
      <div
        ref={pinRef}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Placeholder for actual map */}
          <div style={{ fontSize: "2rem", color: "#666" }}>Map Container</div>
        </div>
      </div>
    </section>
  );
}
