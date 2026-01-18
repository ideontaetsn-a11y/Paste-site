import React from "react";

export default function App() {
  return (
    <div
      style={{
        background: "black",
        minHeight: "100vh",
        color: "#22c55e",
        padding: "60px",
        fontFamily: "Inter, system-ui",
        border: "8px solid red" // 🔴 IMPOSSIBLE TO MISS
      }}
    >
      <h1 style={{ fontSize: "48px" }}>
        🚀 PASTE UI UPDATE TEST
      </h1>

      <p style={{ fontSize: "20px" }}>
        If you see a RED BORDER, Vercel is deploying correctly.
      </p>
    </div>
  );
}
