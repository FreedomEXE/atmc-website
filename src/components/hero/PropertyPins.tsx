"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type Pin = {
  id: number;
  x: number; // percentage
  y: number; // percentage
  name: string;
};

const DUMMY_PINS: Pin[] = [
  { id: 1, x: 30, y: 40, name: "Property A" },
  { id: 2, x: 60, y: 50, name: "Property B" },
  { id: 3, x: 45, y: 65, name: "Property C" },
];

export default function PropertyPins() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const pins = containerRef.current.querySelectorAll(".property-pin");

    // Animate pins in with stagger
    gsap.from(pins, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
      }}
    >
      {DUMMY_PINS.map((pin) => (
        <div
          key={pin.id}
          className="property-pin"
          style={{
            position: "absolute",
            left: `${pin.x}%`,
            top: `${pin.y}%`,
            transform: "translate(-50%, -50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#ff5500",
            border: "3px solid white",
            pointerEvents: "auto",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
          }}
          title={pin.name}
        >
          {pin.id}
        </div>
      ))}
    </div>
  );
}
