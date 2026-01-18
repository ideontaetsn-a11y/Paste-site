import React from "react";

export default function App() {
  return (
    <div style={styles.app}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>🧪</div>
          <span style={styles.title}>PASTE</span>
        </div>

        <div style={styles.actions}>
          <button style={styles.vampBtn}>Vamp</button>
          <button style={styles.deployBtn}>Deploy</button>
        </div>
      </header>

      {/* MAIN */}
      <main style={styles.main}>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            Launch meme coins <span style={styles.highlight}>instantly</span>
          </h1>

          <p style={styles.heroSubtitle}>
            Deploy, vamp, and trade Solana meme coins using a launchpad-style
            bonding curve.
          </p>

          <div style={styles.heroActions}>
            <button style={styles.primaryCta}>Deploy a Coin</button>
            <button style={styles.secondaryCta}>Vamp Existing Coin</button>
          </div>
        </div>

        {/* PLACEHOLDER TOKEN GRID */}
        <div style={styles.grid}>
          <div style={styles.emptyCard}>
            No coins yet.
            <br />
            <span style={{ color: "#666" }}>
              Deploy the first one.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =======================
   STYLES
======================= */

const neonGreen = "#22c55e";
const neonWhite = "#e5e7eb";

const styles = {
  app: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0b0b0b 0%, #000 60%)",
    color: neonWhite,
    fontFamily: "Inter, system-ui, -apple-system",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 32px",
    borderBottom: "1px solid #111",
    backdropFilter: "blur(6px)",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: neonGreen,
    color: "#000",
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 20px rgba(34,197,94,0.4)",
  },

  title: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: 1,
  },

  actions: {
    display: "flex",
    gap: 12,
  },

  vampBtn: {
    background: "rgba(255,255,255,0.04)",
    color: neonWhite,
    border: "1px solid #222",
    padding: "10px 18px",
    borderRadius: 12,
    cursor: "pointer",
  },

  deployBtn: {
    background: neonGreen,
    color: "#000",
    border: "none",
    padding: "10px 18px",
    borderRadius: 12,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 0 18px rgba(34,197,94,0.4)",
  },

  main: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "60px 32px",
  },

  hero: {
    textAlign: "center",
    marginBottom: 80,
  },

  heroTitle: {
    fontSize: 48,
    fontWeight: 900,
    marginBottom: 16,
  },

  highlight: {
    color: neonGreen,
    textShadow: "0 0 20px rgba(34,197,94,0.35)",
  },

  heroSubtitle: {
    maxWidth: 640,
    margin: "0 auto 32px",
    color: "#aaa",
    fontSize: 18,
    lineHeight: 1.6,
  },

  heroActions: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
  },

  primaryCta: {
    background: neonGreen,
    color: "#000",
    padding: "14px 28px",
    borderRadius: 14,
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 0 24px rgba(34,197,94,0.45)",
  },

  secondaryCta: {
    background: "transparent",
    color: neonWhite,
    padding: "14px 28px",
    borderRadius: 14,
    border: "1px solid #333",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 24,
  },

  emptyCard: {
    border: "1px dashed #222",
    borderRadius: 18,
    padding: 40,
    textAlign: "center",
    color: "#888",
  },
};
