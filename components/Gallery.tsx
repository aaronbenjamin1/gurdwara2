"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Star, Users, Utensils, Zap, Shield, Music, Mic2, Globe, BookOpen, Heart, Award, Sun, Flame, Camera } from "lucide-react";

const tiles = [
  { id: 1, label: "Darbar Sahib", image: "/gallery/gallery-1.jpg", gradient: "linear-gradient(135deg, rgba(120,80,20,0.8), rgba(100,70,10,0.5))", span: { gridColumn: "span 2", gridRow: "span 2" }, spanClass: "gallery-span2col gallery-span2row", Icon: Star },
  { id: 2, label: "Morning Sangat", image: "/gallery/gallery-2.jpg", gradient: "linear-gradient(135deg, rgba(20,30,90,0.8), rgba(30,40,100,0.5))", span: {}, spanClass: "", Icon: Users },
  { id: 3, label: "Langar Seva", image: "/gallery/gallery-3.jpg", gradient: "linear-gradient(135deg, rgba(100,50,10,0.8), rgba(120,70,20,0.5))", span: {}, spanClass: "", Icon: Utensils },
  { id: 4, label: "Amrit Sanchar", image: "/gallery/gallery-4.jpg", gradient: "linear-gradient(135deg, rgba(10,70,70,0.8), rgba(20,80,80,0.5))", span: { gridRow: "span 2" }, spanClass: "gallery-span2row", Icon: Zap },
  { id: 5, label: "Youth Gatka", image: "/gallery/gallery-5.jpg", gradient: "linear-gradient(135deg, rgba(60,20,100,0.8), rgba(70,30,110,0.5))", span: {}, spanClass: "", Icon: Shield },
  { id: 6, label: "Nagar Kirtan", image: "/gallery/gallery-6.jpg", gradient: "linear-gradient(135deg, rgba(100,20,50,0.8), rgba(110,30,60,0.5))", span: { gridColumn: "span 2" }, spanClass: "gallery-span2col", Icon: Globe },
  { id: 7, label: "Keertan", image: "/gallery/gallery-7.jpg", gradient: "linear-gradient(135deg, rgba(10,70,40,0.8), rgba(20,80,50,0.5))", span: {}, spanClass: "", Icon: Music },
  { id: 8, label: "Community", image: "/gallery/gallery-8.jpg", gradient: "linear-gradient(135deg, rgba(10,50,90,0.8), rgba(20,60,100,0.5))", span: {}, spanClass: "", Icon: Mic2 },
  { id: 9, label: "Akhand Path", image: "/gallery/gallery-9.jpg", gradient: "linear-gradient(135deg, rgba(70,20,90,0.8), rgba(80,30,100,0.5))", span: { gridColumn: "span 2" }, spanClass: "gallery-span2col", Icon: BookOpen },
  { id: 10, label: "Ardas", image: "/gallery/gallery-10.jpg", gradient: "linear-gradient(135deg, rgba(20,60,30,0.8), rgba(30,70,40,0.5))", span: {}, spanClass: "", Icon: Heart },
  { id: 11, label: "Gurpurab", image: "/gallery/gallery-11.jpg", gradient: "linear-gradient(135deg, rgba(90,60,10,0.8), rgba(100,70,20,0.5))", span: { gridRow: "span 2" }, spanClass: "gallery-span2row", Icon: Award },
  { id: 12, label: "Simran", image: "/gallery/gallery-12.jpg", gradient: "linear-gradient(135deg, rgba(10,50,70,0.8), rgba(20,60,80,0.5))", span: {}, spanClass: "", Icon: Sun },
  { id: 13, label: "Celebrations", image: "/gallery/gallery-13.jpg", gradient: "linear-gradient(135deg, rgba(80,30,10,0.8), rgba(90,40,20,0.5))", span: {}, spanClass: "", Icon: Flame },
  { id: 14, label: "Memories", image: "/gallery/gallery-14.jpg", gradient: "linear-gradient(135deg, rgba(30,20,70,0.8), rgba(40,30,80,0.5))", span: { gridColumn: "span 2" }, spanClass: "gallery-span2col", Icon: Camera },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<typeof tiles[0] | null>(null);

  return (
    <section
      id="gallery"
      className="section-pad" style={{ padding: "120px 24px", backgroundColor: "#0F2347", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />

      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 10 }}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <p style={{ color: "#D4A520", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 12 }}>
            Our Community
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8", marginBottom: 20, lineHeight: 1.2 }}>
            Gallery
          </h2>
          <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4A520, #FF8C00)", margin: "0 auto 12px" }} />
          <p style={{ color: "rgba(232,213,163,0.35)", fontSize: 13, fontFamily: "var(--font-inter), sans-serif" }}>
            Photos will be added as the site goes live
          </p>
        </motion.div>

        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: 160, gap: 14 }}>
          {tiles.map((tile, i) => {
            const Icon = tile.Icon;
            return (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0, scale: 0.93 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onClick={() => setSelected(tile)}
                className={tile.spanClass}
                style={{
                  background: tile.gradient,
                  backgroundImage: `url(${tile.image}), ${tile.gradient}`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 12,
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  ...tile.span,
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)", borderRadius: 12 }} />
                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <Icon size={20} color="rgba(232,213,163,0.55)" strokeWidth={1.5} />
                  <span style={{ color: "rgba(232,213,163,0.8)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "var(--font-inter), sans-serif" }}>
                    {tile.label}
                  </span>
                </div>
                <div style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}>
                  <ZoomIn size={13} color="rgba(201,168,76,0.7)" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: selected.gradient,
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                width: "100%",
                maxWidth: 640,
                aspectRatio: "16/9",
                overflow: "hidden",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.image}
                alt={selected.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)", pointerEvents: "none" }} />
              <span style={{ position: "absolute", bottom: 18, left: 20, color: "rgba(232,213,163,0.9)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.25em", fontFamily: "var(--font-inter), sans-serif" }}>
                {selected.label}
              </span>
              <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 14, right: 14, background: "rgba(0,0,0,0.45)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: "rgba(232,213,163,0.8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
