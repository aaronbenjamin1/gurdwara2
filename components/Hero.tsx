"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#0B1D3A",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0 }}>
        {/* Photo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(7px)",
            transform: "scale(1.08)",
          }}
        />
        {/* Dark overlay so text stays readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(11,29,58,0.72) 0%, rgba(11,29,58,0.55) 50%, rgba(11,29,58,0.85) 100%)",
          }}
        />
      </div>

      {/* Floating dots */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 4,
            height: 4,
            background: "rgba(201,168,76,0.4)",
            borderRadius: "50%",
            left: `${8 + (i * 9) % 84}%`,
            top: `${12 + (i * 13) % 76}%`,
            pointerEvents: "none",
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        />
      ))}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "80px 24px 0",
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {/* Top divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 32 }}
        >
          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.4)" }} />
          <p
            style={{
              color: "#D4A520",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              fontFamily: "var(--font-inter), sans-serif",
              margin: 0,
            }}
          >
            Waheguru Ji Ka Khalsa
          </p>
          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.4)" }} />
        </motion.div>

        {/* Title line 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            color: "#f5f0e8",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: 8,
          }}
        >
          Gurdwara
        </motion.h1>

        {/* Title line 2 — gold gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: 28,
            background: "linear-gradient(90deg, #D4A520 0%, #F0D060 50%, #D4A520 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Nanaksar Fresno
        </motion.h1>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}
        >
          <div style={{ width: 32, height: 1, background: "rgba(201,168,76,0.3)" }} />
          <p
            style={{
              color: "rgba(232,213,163,0.45)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              fontFamily: "var(--font-inter), sans-serif",
              margin: 0,
            }}
          >
            Fresno, California
          </p>
          <div style={{ width: 32, height: 1, background: "rgba(201,168,76,0.3)" }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          style={{
            color: "rgba(232,213,163,0.55)",
            fontSize: 17,
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 auto 48px",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          A place of worship, service, and community —<br />open to all, free for all.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          <button
            onClick={() => scroll("#schedule")}
            style={{
              background: "#D4A520",
              color: "#0B1D3A",
              padding: "16px 40px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontSize: 13,
              fontFamily: "var(--font-inter), sans-serif",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              minWidth: 180,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F0D060")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#D4A520")}
          >
            View Schedule
          </button>
          <button
            onClick={() => scroll("#about")}
            style={{
              background: "transparent",
              color: "#D4A520",
              padding: "16px 40px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontSize: 13,
              fontFamily: "var(--font-inter), sans-serif",
              border: "1px solid rgba(201,168,76,0.4)",
              borderRadius: 4,
              cursor: "pointer",
              minWidth: 180,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Our Story
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scroll("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: "rgba(201,168,76,0.4)",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          Scroll
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
