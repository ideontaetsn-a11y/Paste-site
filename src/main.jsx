import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

console.log("MAIN.JSX LOADED");

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
