import React from "react";

export default function App() {
  return React.createElement(
    "div",
    {
      style: {
        background: "black",
        minHeight: "100vh",
        color: "#22c55e",
        padding: "40px",
        fontFamily: "Inter, system-ui",
        fontSize: "24px"
      }
    },
    [
      React.createElement(
        "h1",
        { key: "title", style: { fontSize: "42px", marginBottom: "16px" } },
        "PASTE"
      ),
      React.createElement(
        "p",
        { key: "subtitle" },
        "Your site is live. Deployment pipeline is fixed."
      )
    ]
  );
}
