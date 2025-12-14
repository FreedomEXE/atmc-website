"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "@/components/brand/Logo";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.set(navRef.current, {
      y: -100,
      opacity: 0,
    });

    gsap.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });
  }, []);

  return (
    <nav ref={navRef} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
      <div
        style={{
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo width={140} priority className="atmc-logo" />
        <div style={{ display: "flex", gap: "2rem" }}>
          <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
            Services
          </a>
          <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
            Properties
          </a>
          <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
