"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Star, Users, Utensils, Zap, Shield, Music, Mic2, Globe } from "lucide-react";

const tiles = [
  { id: 1, label: "Darbar Sahib", gradient: "linear-gradient(135deg, rgba(120,80,20,0.8), rgba(100,70,10,0.5))", span: { gridColumn: "span 2", gridRow: "span 2" }, Icon: Star },
  { id: 2, label: "Morning Sangat", gradient: "linear-gradient(135deg, rgba(20,30,90,0.8), rgba(30,40,100,0.5))", span: {}, Icon: Users },
  { id: 3, label: "Langar Seva", gradient: "linear-gradient(135deg, rgba(100,50,10,0.8), rgba(120,70,20,0.5))", span: {}, Icon: Utensils },
  { id: 4, label: "Amrit Sanchar", gradient: "linear-gradient(135deg, rgba(10,70,70,0.8), rgba(20,80,80,0.5))", span: { gridRow: "span 2" }, Icon: Zap },
  { id: 5, label: "Youth Gatka", gradient: "linear-gradient(135deg, rgba(60,20,100,0.8), rgba(70,30,110,0.5))", span: {}, Icon: Shield },
  { id: 6, label: "Nagar Kirtan", gradient: "linear-gradient(135deg, rgba(100,20,50,0.8), rgba(110,30,60,0.5))", span: { gridColumn: "span 2" }, Icon: Globe },
  { id: 7, label: "Keertan", gradient: "linear-gradient(135deg, rgba(10,70,40,0.8), rgba(20,80,50,0.5))", span: {}, Icon: Music },
  { id: 8, label: "Community", gradient: "linear-gradient(135deg, rgba(10,50,90,0.8), rgba(20,60,100,0.5))", span: {}, Icon: Mic2 },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<typeof tiles[0] | null>(null);

  return (
    <section
      id="gallery"
      style={{ padding: "120px 24px", backgroundColor: "#0F2347", position: "relative", overflow: "hidden" }}
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: 160, gap: 14 }}>
          {tiles.map((tile, i) => {
            const Icon = tile.Icon;
            return (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0, scale: 0.93 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onClick={() => setSelected(tile)}
                style={{
                  background: tile.gradient,
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
                <Icon size={20} color="rgba(232,213,163,0.3)" strokeWidth={1.5} />
                <span style={{ color: "rgba(232,213,163,0.3)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "var(--font-inter), sans-serif" }}>
                  {tile.label}
                </span>
                <div style={{ position: "absolute", top: 10, right: 10, opacity: 0 }}>
                  <ZoomIn size={13} color="rgba(201,168,76,0.6)" />
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <selected.Icon size={36} color="rgba(232,213,163,0.4)" strokeWidth={1.2} />
              <span style={{ color: "rgba(232,213,163,0.5)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.25em", fontFamily: "var(--font-inter), sans-serif" }}>
                {selected.label}
              </span>
              <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", cursor: "pointer", color: "rgba(232,213,163,0.4)" }}>
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
