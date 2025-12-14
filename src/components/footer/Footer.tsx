"use client";

import Logo from "@/components/brand/Logo";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        backgroundColor: "#111",
        color: "#fff",
      }}
    >
      <Logo width={180} />
      <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
        © {new Date().getFullYear()} ATMC. Elevating premium property management.
      </p>
    </footer>
  );
}
