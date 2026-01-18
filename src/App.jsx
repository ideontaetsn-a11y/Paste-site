import React, { useEffect, useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("launchpad");
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
        progress: 0,
        price: 0.0001,
      },
      ...tokens,
    ]);
    setShowDeploy(false);
    setShowVamp(false);
  }

  function buyToken(id) {
    setTokens(tokens.map(t =>
      t.id === id
        ? {
            ...t,
            progress: Math.min(t.progress + 5, 100),
            price: +(t.price * 1.08).toFixed(6),
          }
        : t
    ));
  }

  function sellToken(id) {
    setTokens(tokens.map(t =>
      t.id === id
        ? {
            ...t,
            progress: Math.max(t.progress - 5, 0),
            price: +(t.price * 0.92).toFixed(6),
          }
        : t
    ));
  }

  return (
    <div style={styles.app}>
      {/* TOP BAR */}
      <header style={styles.topBar}>
        <div style={styles.brand}>
          <div style={styles.logo}>🧪</div>
          <span style={styles.title}>PASTE</span>
        </div>

        <div style={styles.tabs}>
          <Tab label="Launchpad" active={activeTab === "launchpad"} onClick={() => setActiveTab("launchpad")} />
          <Tab label="Live Feed" active={activeTab === "feed"} onClick={() => setActiveTab("feed")} />
        </div>

        <div style={styles.actions}>
          <button style={styles.vampBtn} onClick={() => setShowVamp(true)}>Vamp</button>
          <button style={styles.deployBtn} onClick={() => setShowDeploy(true)}>Deploy</button>
        </div>
      </header>

      {/* CONTENT */}
      <main style={styles.main}>
        {activeTab === "launchpad" && (
          <>
            {tokens.length === 0 && (
              <div style={styles.empty}>No coins yet.<br />Deploy the first one.</div>
            )}

            <div style={styles.grid}>
              {tokens.map(t => (
                <div key={t.id} style={styles.card}>
                  {t.icon && <img src={t.icon} style={styles.cardIcon} />}
                  <strong>{t.name}</strong>
                  <div style={styles.ticker}>{t.ticker}</div>
                  <div style={styles.price}>◎ {t.price}</div>

                  <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${t.progress}%` }} />
                  </div>

                  <div style={styles.tradeRow}>
                    <button style={styles.buyBtn} onClick={() => buyToken(t.id)}>Buy</button>
                    <button style={styles.sellBtn} onClick={() => sellToken(t.id)}>Sell</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "feed" && <LiveFeed />}
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
   LIVE X FEED
======================= */

function LiveFeed() {
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <div style={styles.feedContainer}>
      <div style={styles.feedColumn}>
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-chrome="noheader nofooter noborders transparent"
          data-tweet-limit="5"
          href="https://twitter.com/search?q=%24SOL%20memecoin"
        >
          Tweets about $SOL memecoin
        </a>
      </div>

      <div style={styles.feedColumn}>
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-chrome="noheader nofooter noborders transparent"
          data-tweet-limit="5"
          href="https://twitter.com/search?q=crypto%20launch"
        >
          Crypto Launch Tweets
        </a>
      </div>
    </div>
  );
}

/* =======================
   UI COMPONENTS
======================= */

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ ...styles.tab, ...(active ? styles.tabActive : {}) }}>
      {label}
    </button>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h3>{title}</h3>
        {children}
        <button style={styles.cancel} onClick={onClose}>Cancel</button>
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
      <input style={styles.input} placeholder="Token name" onChange={e => setName(e.target.value)} />
      <input style={styles.input} placeholder="Ticker" onChange={e => setTicker(e.target.value)} />
      <input type="file" accept="image/*" onChange={handleImage} />
      <button style={styles.confirm} onClick={() => onSubmit({ name, ticker, icon })}>Confirm</button>
    </>
  );
}

/* =======================
   STYLES
======================= */

const green = "#22c55e";

const styles = {
  app: { minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "Inter, system-ui" },
  topBar: { display: "flex", justifyContent: "space-between", padding: "14px 24px", borderBottom: "1px solid #111" },
  brand: { display: "flex", gap: 10, alignItems: "center" },
  logo: { width: 32, height: 32, background: green, color: "#000", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 },
  title: { fontWeight: 800 },
  tabs: { display: "flex", gap: 16 },
  tab: { background: "transparent", border: "none", color: "#777", cursor: "pointer" },
  tabActive: { color: green, borderBottom: `2px solid ${green}` },
  actions: { display: "flex", gap: 10 },
  deployBtn: { background: green, border: "none", padding: "8px 14px", borderRadius: 10, fontWeight: 700 },
  vampBtn: { background: "#111", border: "1px solid #222", padding: "8px 14px", borderRadius: 10, color: "#fff" },
  main: { padding: 24, maxWidth: 1200, margin: "0 auto" },
  empty: { textAlign: "center", color: "#777", marginTop: 80 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 20 },
  card: { background: "#0b0b0b", border: "1px solid #222", borderRadius: 16, padding: 16 },
  cardIcon: { width: 42, height: 42, borderRadius: 8 },
  ticker: { color: "#777" },
  price: { marginTop: 6 },
  progressBar: { height: 6, background: "#222", borderRadius: 4, marginTop: 10 },
  progressFill: { height: "100%", background: green },
  tradeRow: { display: "flex", gap: 8, marginTop: 12 },
  buyBtn: { flex: 1, background: green, border: "none", borderRadius: 8 },
  sellBtn: { flex: 1, background: "#111", border: "1px solid #222", borderRadius: 8, color: "#fff" },
  feedContainer: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  feedColumn: { border: "1px solid #222", borderRadius: 16, padding: 10 },
  backdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { background: "#0b0b0b", borderRadius: 16, padding: 20, width: 320, border: "1px solid #222" },
  input: { width: "100%", padding: 10, marginBottom: 10, background: "#111", border: "1px solid #222", borderRadius: 8, color: "#fff" },
  confirm: { width: "100%", padding: 10, background: green, border: "none", borderRadius: 8, fontWeight: 700 },
  cancel: { width: "100%", background: "transparent", border: "none", color: "#666" },
};
