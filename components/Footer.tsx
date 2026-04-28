export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#0B1D3A", borderTop: "1px solid rgba(201,168,76,0.15)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <div>
          <div style={{ color: "#D4A520", fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 17, fontWeight: 700 }}>
            Gurdwara Nanaksar Fresno
          </div>
          <div style={{ color: "rgba(232,213,163,0.35)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginTop: 4 }}>
            Fresno, California
          </div>
        </div>

        <div style={{ color: "#D4A520", fontSize: 28, fontFamily: "var(--font-playfair), Georgia, serif" }}>☬</div>

        <div style={{ color: "rgba(232,213,163,0.3)", fontSize: 12, fontFamily: "var(--font-inter), sans-serif", textAlign: "right" }}>
          <div>© {year} Gurdwara Nanaksar Fresno</div>
          <div style={{ marginTop: 3 }}>Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh</div>
        </div>
      </div>
    </footer>
  );
}
