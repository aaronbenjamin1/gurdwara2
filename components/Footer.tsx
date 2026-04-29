"use client";
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#0B1D3A", borderTop: "1px solid rgba(201,168,76,0.15)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <div>
          <div style={{ color: "#D4A520", fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 17, fontWeight: 700 }}>
            Gurdwara Nanaksar Fresno
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=3060+S+Cherry+Ave+Fresno+CA+93706"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(232,213,163,0.5)", fontSize: 12, fontFamily: "var(--font-inter), sans-serif", marginTop: 6, display: "block", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#D4A520")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(232,213,163,0.5)")}
          >
            3060 S Cherry Ave, Fresno, CA 93706
          </a>
        </div>

        <div style={{ color: "#D4A520", fontSize: 28, fontFamily: "var(--font-playfair), Georgia, serif" }}>☬</div>

        <div style={{ color: "rgba(232,213,163,0.3)", fontSize: 12, fontFamily: "var(--font-inter), sans-serif", textAlign: "right" }}>
          <div>© {year} Gurdwara Nanaksar Fresno</div>
        </div>
      </div>
    </footer>
  );
}
