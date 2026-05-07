import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery | Gurdwara Nanaksar Fresno",
  description: "Photos from Gurdwara Nanaksar Fresno — services, langar, community events, and more.",
  alternates: { canonical: "https://gurdwarananaksarfresno.com/gallery" },
};

function getImages(): string[] {
  const dir = path.join(process.cwd(), "public", "gallery");
  try {
    return fs.readdirSync(dir)
      .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f) && !f.includes("("))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
      .map(f => `/gallery/${f}`);
  } catch {
    return [];
  }
}

export default function GalleryPage() {
  const images = getImages();

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0B1D3A", minHeight: "100vh", paddingTop: 80 }}>

        {/* Header */}
        <div style={{ backgroundColor: "#0F2347", borderBottom: "1px solid rgba(201,168,76,0.15)", padding: "64px 24px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Link href="/#gallery" style={{ color: "#D4A520", fontSize: 12, fontFamily: "var(--font-inter), sans-serif", textDecoration: "none", letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
              ← Back to Home
            </Link>
            <p style={{ color: "#D4A520", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 12 }}>
              Gurdwara Nanaksar Fresno
            </p>
            <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8", marginBottom: 16, lineHeight: 1.2 }}>
              Gallery
            </h1>
            <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4A520, #FF8C00)", marginBottom: 16 }} />
            <p style={{ color: "rgba(232,213,163,0.5)", fontSize: 15, fontFamily: "var(--font-inter), sans-serif" }}>
              {images.length} photos
            </p>
          </div>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 96px" }}>
          {images.length > 0 ? (
            <GalleryGrid images={images} />
          ) : (
            <p style={{ color: "rgba(232,213,163,0.3)", fontFamily: "var(--font-inter), sans-serif", textAlign: "center", paddingTop: 48 }}>
              No photos yet.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
