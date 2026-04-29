"use client";
import Link from "next/link";

type RelatedPost = {
  slug: string;
  title: string;
  category: string;
};

export default function BlogRelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (!posts.length) return null;
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 24px 96px" }}>
      <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, #D4A520, #FF8C00)", marginBottom: 16 }} />
      <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.4rem", color: "#f5f0e8", marginBottom: 24 }}>
        More Articles
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {posts.map((r) => (
          <Link key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration: "none" }}>
            <div
              style={{ background: "linear-gradient(135deg, #152B52, #0F2347)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: 10, padding: "20px 24px", transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)")}
            >
              <span style={{ color: "#D4A520", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
                {r.category}
              </span>
              <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.05rem", color: "#f5f0e8", marginTop: 6, marginBottom: 0, lineHeight: 1.35 }}>
                {r.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
