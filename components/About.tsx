"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Users, Calendar, Star } from "lucide-react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { icon: Calendar, label: "Years of Service", value: 30, suffix: "+" },
  { icon: Users, label: "Community Members", value: 500, suffix: "+" },
  { icon: Heart, label: "Weekly Services", value: 14, suffix: "" },
  { icon: Star, label: "Annual Events", value: 25, suffix: "+" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="section-pad" style={{ padding: "120px 24px", backgroundColor: "#0B1D3A", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at bottom right, #152B52 0%, transparent 60%)" }} />

      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <p style={{ color: "#D4A520", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 12 }}>
            Our Story
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8", marginBottom: 24, lineHeight: 1.2 }}>
            A Place of{" "}
            <span style={{ background: "linear-gradient(90deg, #D4A520, #FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Seva &amp; Simran
            </span>
          </h2>
          <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4A520, #FF8C00)", margin: "0 auto" }} />
        </motion.div>

        {/* Two column layout */}
        <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p style={{ color: "rgba(232,213,163,0.8)", fontSize: 18, lineHeight: 1.7, marginBottom: 20, fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic" }}>
              &ldquo;Ik Onkar — There is One Creator of all Creation.&rdquo;
            </p>
            <p style={{ color: "rgba(232,213,163,0.65)", lineHeight: 1.8, marginBottom: 16, fontFamily: "var(--font-inter), sans-serif", fontSize: 15 }}>
              Gurdwara Nanaksar Fresno has been a spiritual home and community anchor for Sikhs
              in the Central Valley for over three decades. Our doors are open to people of all
              faiths and backgrounds — everyone is welcome to share in the langar (community meal),
              attend kirtan (devotional music), and experience the peace of this sacred space.
            </p>
            <p style={{ color: "rgba(232,213,163,0.65)", lineHeight: 1.8, fontFamily: "var(--font-inter), sans-serif", fontSize: 15 }}>
              Rooted in the teachings of the Sikh Gurus, we strive to embody the principles of
              seva (selfless service), simran (meditation), and sangat (community). Whether you
              are visiting for the first time or have been part of our family for years, you will
              always find warmth, food, and fellowship here.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div style={{ background: "linear-gradient(135deg, #152B52, #0F2347)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16, padding: 40, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 160, height: 160, background: "rgba(201,168,76,0.05)", borderRadius: "50%", filter: "blur(40px)" }} />
              <p style={{ color: "#D4A520", fontSize: 64, fontFamily: "var(--font-playfair), Georgia, serif", lineHeight: 1, marginBottom: 16 }}>☬</p>
              <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 22, color: "#f5f0e8", marginBottom: 12 }}>
                The Nanaksar Tradition
              </h3>
              <p style={{ color: "rgba(232,213,163,0.55)", lineHeight: 1.8, fontSize: 14, fontFamily: "var(--font-inter), sans-serif" }}>
                Nanaksar Gurdwaras follow the spiritual lineage of Sant Nand Singh Ji Maharaj,
                emphasizing daily naam simran, Nitnem (daily prayers), and the recitation of
                Gurbani. The tradition is known for its deep meditative practices and devotion
                to the Guru Granth Sahib Ji.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid-4col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {stats.map(({ icon: Icon, label, value, suffix }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              style={{ background: "linear-gradient(135deg, #152B52, #0F2347)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 12, padding: 24, textAlign: "center" }}
            >
              <Icon color="#D4A520" size={22} style={{ margin: "0 auto 12px" }} />
              <div style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 36, color: "#D4A520", fontWeight: 700, marginBottom: 4 }}>
                <Counter target={value} suffix={suffix} />
              </div>
              <div style={{ color: "rgba(232,213,163,0.5)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-inter), sans-serif" }}>
                {label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
