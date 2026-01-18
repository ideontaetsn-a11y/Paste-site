import React from "react";

export default function App() {
  console.log("APP RENDERED");

  return (
    <div
      style={{
        background: "black",
        minHeight: "100vh",
        color: "#22c55e",
        padding: "40px",
        fontFamily: "Inter, system-ui"
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "16px" }}>
        PASTE
      </h1>

      <p>
        React is rendering correctly.
      </p>
    </div>
  );
}
