"use client";

import { useRef } from "react";

type PropertyData = {
  name: string;
  location: string;
  description: string;
  price?: string;
};

type Props = {
  property?: PropertyData;
};

export default function PropertyPanel({ property }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  if (!property) return null;

  return (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        right: "2rem",
        top: "50%",
        transform: "translateY(-50%)",
        width: "350px",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        zIndex: 100,
      }}
    >
      <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{property.name}</h3>
      <p style={{ fontSize: "1rem", color: "#666", marginBottom: "0.5rem" }}>
        {property.location}
      </p>
      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1rem" }}>
        {property.description}
      </p>
      {property.price && (
        <p style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#ff5500" }}>
          {property.price}
        </p>
      )}
      <button
        style={{
          marginTop: "1rem",
          padding: "0.8rem 1.5rem",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        View Details
      </button>
    </div>
  );
}
