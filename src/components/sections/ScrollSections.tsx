"use client";

import { useLayoutEffect, useRef } from "react";
import { createExitTimeline } from "@/lib/animations";

export default function ScrollSections() {
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!section1Ref.current || !section2Ref.current) return;

    // Create exit/transition animations between sections
    const tl = createExitTimeline(section2Ref.current);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      <section
        ref={section1Ref}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: "4rem 2rem",
        }}
      >
        <div style={{ maxWidth: "800px", textAlign: "center" }}>
          <h2 style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>Our Services</h2>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.8, color: "#666" }}>
            Premium property management tailored to your needs. We handle everything from
            maintenance to tenant relations.
          </p>
        </div>
      </section>

      <section
        ref={section2Ref}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          padding: "4rem 2rem",
        }}
      >
        <div style={{ maxWidth: "800px", textAlign: "center" }}>
          <h2 style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>Get Started</h2>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.8, color: "#666" }}>
            Ready to elevate your property management experience? Contact us today.
          </p>
          <button
            style={{
              marginTop: "2rem",
              padding: "1rem 2.5rem",
              fontSize: "1.1rem",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Contact Us
          </button>
        </div>
      </section>
    </>
  );
}
