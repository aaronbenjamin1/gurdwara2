import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts, getPost } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogRelatedPosts from "@/components/BlogRelatedPosts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Gurdwara Nanaksar Fresno`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://gurdwaranankasarfresno.org/blog/${post.slug}`,
      siteName: "Gurdwara Nanaksar Fresno",
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://gurdwaranankasarfresno.org/blog/${post.slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Gurdwara Nanaksar Fresno",
      url: "https://gurdwaranankasarfresno.org",
    },
    publisher: {
      "@type": "Organization",
      name: "Gurdwara Nanaksar Fresno",
      url: "https://gurdwaranankasarfresno.org",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gurdwaranankasarfresno.org/blog/${post.slug}`,
    },
  };

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main style={{ backgroundColor: "#0B1D3A", minHeight: "100vh", paddingTop: 80 }}>

        {/* Hero */}
        <div style={{ backgroundColor: "#0F2347", borderBottom: "1px solid rgba(201,168,76,0.15)", padding: "64px 24px 48px" }}>
          <div style={{ maxWidth: 740, margin: "0 auto" }}>
            <Link
              href="/blog"
              style={{ color: "#D4A520", fontSize: 12, fontFamily: "var(--font-inter), sans-serif", textDecoration: "none", letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 28 }}
            >
              ← All Articles
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(212,165,32,0.12)", color: "#D4A520", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", padding: "4px 10px", borderRadius: 4 }}>
                {post.category}
              </span>
              <span style={{ color: "rgba(232,213,163,0.35)", fontSize: 12, fontFamily: "var(--font-inter), sans-serif" }}>
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span style={{ color: "rgba(232,213,163,0.35)", fontSize: 12, fontFamily: "var(--font-inter), sans-serif" }}>
                · {post.readTime}
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#f5f0e8", lineHeight: 1.25, marginBottom: 20 }}>
              {post.title}
            </h1>
            <p style={{ color: "rgba(232,213,163,0.55)", fontSize: 16, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.7 }}>
              {post.description}
            </p>
            <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4A520, #FF8C00)", marginTop: 28 }} />
          </div>
        </div>

        {/* Article body */}
        <article style={{ maxWidth: 740, margin: "0 auto", padding: "56px 24px" }}>
          {post.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: 40 }}>
              {section.heading && (
                <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)", color: "#D4A520", marginBottom: 16, lineHeight: 1.3 }}>
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  style={{ color: "rgba(232,213,163,0.75)", fontSize: 16, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.85, marginBottom: 16 }}
                >
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* CTA */}
          <div style={{ marginTop: 56, padding: "32px 36px", background: "linear-gradient(135deg, #152B52, #0F2347)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 14, textAlign: "center" }}>
            <div style={{ color: "#D4A520", fontSize: 22, marginBottom: 12 }}>☬</div>
            <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 20, color: "#f5f0e8", marginBottom: 10 }}>
              Visit Us in Fresno
            </h3>
            <p style={{ color: "rgba(232,213,163,0.5)", fontSize: 14, fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.7, marginBottom: 20 }}>
              Gurdwara Nanaksar Fresno is located at 3060 S Cherry Ave, Fresno, CA 93706.<br />All are welcome — come for Darbar, stay for Langar.
            </p>
            <Link
              href="/#schedule"
              style={{ display: "inline-block", background: "#D4A520", color: "#0B1D3A", padding: "12px 28px", borderRadius: 6, fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", textDecoration: "none" }}
            >
              View Schedule
            </Link>
          </div>
        </article>

        <BlogRelatedPosts posts={related.map(r => ({ slug: r.slug, title: r.title, category: r.category }))} />
      </main>
      <Footer />
    </>
  );
}
