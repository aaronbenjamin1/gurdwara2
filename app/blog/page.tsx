"use client";
import Link from "next/link";
import { posts } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function BlogIndex() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0B1D3A", minHeight: "100vh", paddingTop: 80 }}>

        {/* Header */}
        <div style={{ backgroundColor: "#0F2347", borderBottom: "1px solid rgba(201,168,76,0.15)", padding: "64px 24px 48px" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <p style={{ color: "#D4A520", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 12 }}>
              Gurdwara Nanaksar Fresno
            </p>
            <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8", marginBottom: 16, lineHeight: 1.2 }}>
              Blog & Articles
            </h1>
            <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4A520, #FF8C00)", marginBottom: 16 }} />
            <p style={{ color: "rgba(232,213,163,0.5)", fontSize: 15, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.7 }}>
              Learn about Sikhism, our community, and the traditions practiced at Gurdwara Nanaksar Fresno.
            </p>
          </div>
        </div>

        {/* Post grid */}
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px 96px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {sorted.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <article
                  style={{
                    background: "linear-gradient(135deg, #152B52, #0F2347)",
                    border: "1px solid rgba(201,168,76,0.12)",
                    borderRadius: 14,
                    padding: "32px 36px",
                    transition: "border-color 0.2s, transform 0.15s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.12)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                    <span style={{ background: "rgba(212,165,32,0.12)", color: "#D4A520", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", padding: "4px 10px", borderRadius: 4 }}>
                      {post.category}
                    </span>
                    <span style={{ color: "rgba(232,213,163,0.3)", fontSize: 12, fontFamily: "var(--font-inter), sans-serif" }}>
                      {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    <span style={{ color: "rgba(232,213,163,0.3)", fontSize: 12, fontFamily: "var(--font-inter), sans-serif" }}>
                      · {post.readTime}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.15rem, 2vw, 1.45rem)", color: "#f5f0e8", marginBottom: 10, lineHeight: 1.35 }}>
                    {post.title}
                  </h2>
                  <p style={{ color: "rgba(232,213,163,0.55)", fontSize: 14, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.7, margin: 0 }}>
                    {post.description}
                  </p>
                  <div style={{ marginTop: 18, color: "#D4A520", fontSize: 13, fontFamily: "var(--font-inter), sans-serif", fontWeight: 600 }}>
                    Read article →
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
