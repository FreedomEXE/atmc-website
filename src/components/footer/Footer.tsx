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
      <div className="footer-logo atmc-logo">
        <Logo />
      </div>
      <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
        © {new Date().getFullYear()} ATMC. Your Property, Our Priority.
      </p>
    </footer>
  );
}
