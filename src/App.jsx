import React, { useState } from "react";

export default function App() {
  const [showDeploy, setShowDeploy] = useState(false);
  const [showVamp, setShowVamp] = useState(false);
  const [tokens, setTokens] = useState([]);

  function deployToken(data) {
    setTokens([
      {
        id: Date.now(),
        name: data.name,
        ticker: data.ticker,
        icon: data.icon,
        creator: "You",
        progress: 0,
        price: 0.0001,
      },
      ...tokens,
    ]);
    setShowDeploy(false);
    setShowVamp(false);
  }

  function buyToken(id) {
    setTokens(tokens.map(t => {
      if (t.id !== id) return t;
      const newProgress = Math.min(t.progress + 5, 100);
      return {
        ...t,
        progress: newProgress,
        price: +(t.price * 1.08).toFixed(6),
      };
    }));
  }

  function sellToken(id) {
    setTokens(tokens.map(t => {
      if (t.id !== id) return t;
      const newProgress = Math.max(t.progress - 5, 0);
      return {
        ...t,
        progress: newProgress,
        price: +(t.price * 0.92).toFixed(6),
      };
    }));
  }

  return (
    <div style={styles.app}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>🧪</div>
          <span style={styles.title}>PASTE</span>
        </div>

        <div style={styles.actions}>
          <button style={styles.vampBtn} onClick={() => setShowVamp(true)}>
            Vamp
          </button>
          <button style={styles.deployBtn} onClick={() => setShowDeploy(true)}>
            Deploy
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main style={styles.main}>
        {tokens.length === 0 && (
          <div style={styles.empty}>
            No coins yet.
            <br />
            Deploy the first one.
          </div>
        )}

        <div style={styles.grid}>
          {tokens.map(t => (
            <div key={t.id} style={styles.card}>
              {t.icon && <img src={t.icon} alt="" style={styles.cardIcon} />}

              <strong>{t.name}</strong>
              <div style={styles.ticker}>{t.ticker}</div>

              <div style={styles.price}>
                Price: ◎ {t.price}
              </div>

              {/* PROGRESS BAR */}
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${t.progress}%`,
                  }}
                />
              </div>

              <div style={styles.progressText}>
                Bonding curve: {t.progress}%
              </div>

              <div style={styles.tradeRow}>
                <button style={styles.buyBtn} onClick={() => buyToken(t.id)}>
                  Buy
                </button>
                <button style={styles.sellBtn} onClick={() => sellToken(t.id)}>
                  Sell
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showDeploy && (
        <Modal title="Deploy Coin" onClose={() => setShowDeploy(false)}>
          <DeployForm onSubmit={deployToken} />
        </Modal>
      )}

      {showVamp && (
        <Modal title="Vamp Coin" onClose={() => setShowVamp(false)}>
          <DeployForm onSubmit={deployToken} />
        </Modal>
      )}
    </div>
  );
}

/* =======================
   COMPONENTS
======================= */

function Modal({ title, children, onClose }) {
  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h2 style={{ marginBottom: 12 }}>{title}</h2>
        {children}
        <button style={styles.cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function DeployForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [icon, setIcon] = useState(null);

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setIcon(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <>
      <input
        style={styles.input}
        placeholder="Token name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Ticker"
        value={ticker}
        onChange={e => setTicker(e.target.value)}
      />

      <div style={{ marginBottom: 12 }}>
        {icon && <img src={icon} alt="" style={styles.preview} />}
        <input type="file" accept="image/*" onChange={handleImage} />
      </div>

      <button
        style={styles.confirm}
        onClick={() => onSubmit({ name, ticker, icon })}
      >
        Confirm
      </button>
    </>
  );
}

/* =======================
   STYLES
======================= */

const green = "#22c55e";

const styles = {
  app: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    fontFamily: "Inter, system-ui",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 32px",
    borderBottom: "1px solid #111",
  },
  brand: { display: "flex", gap: 12, alignItems: "center" },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: green,
    color: "#000",
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 22, fontWeight: 800 },
  actions: { display: "flex", gap: 12 },
  deployBtn: {
    background: green,
    color: "#000",
    border: "none",
    padding: "10px 18px",
    borderRadius: 12,
    fontWeight: 700,
    cursor: "pointer",
  },
  vampBtn: {
    background: "#111",
    border: "1px solid #222",
    padding: "10px 18px",
    borderRadius: 12,
    color: "#fff",
    cursor: "pointer",
  },
  main: { padding: 32, maxWidth: 1100, margin: "0 auto" },
  empty: { textAlign: "center", color: "#777", marginTop: 80 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#0b0b0b",
    border: "1px solid #222",
    borderRadius: 16,
    padding: 16,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    objectFit: "cover",
    marginBottom: 8,
  },
  ticker: { color: "#777", marginBottom: 6 },
  price: { marginTop: 6, fontSize: 14 },
  progressBar: {
    height: 8,
    background: "#222",
    borderRadius: 4,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#22c55e,#16a34a)",
  },
  progressText: {
    fontSize: 12,
    color: "#777",
    marginTop: 6,
  },
  tradeRow: {
    display: "flex",
    gap: 10,
    marginTop: 12,
  },
  buyBtn: {
    flex: 1,
    background: green,
    border: "none",
    padding: 10,
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
  },
  sellBtn: {
    flex: 1,
    background: "#111",
    border: "1px solid #222",
    padding: 10,
    borderRadius: 10,
    color: "#fff",
    cursor: "pointer",
  },
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#0b0b0b",
    borderRadius: 18,
    padding: 24,
    width: 340,
    border: "1px solid #222",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    background: "#111",
    border: "1px solid #222",
    color: "#fff",
  },
  preview: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginBottom: 8,
  },
  confirm: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    background: green,
    color: "#000",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    marginBottom: 8,
  },
  cancel: {
    width: "100%",
    background: "transparent",
    border: "none",
    color: "#777",
    cursor: "pointer",
  },
};
