"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Utensils, BookOpen, Building2 } from "lucide-react";

// Replace these with your Square checkout links from Square Dashboard → Online → Checkout Links
const SQUARE_DONATE_URL = "https://checkout.square.site/REPLACE_WITH_YOUR_LINK";
const SQUARE_MONTHLY_URL = "https://checkout.square.site/REPLACE_WITH_YOUR_MONTHLY_LINK";

const causes = [
  { icon: Utensils, title: "Langar Seva", description: "Fund the daily free kitchen that feeds hundreds of community members and visitors every week." },
  { icon: BookOpen, title: "Gurmat Education", description: "Support Punjabi language classes, Gurbani kirtan lessons, and Sikh history education for youth." },
  { icon: Building2, title: "Gurdwara Upkeep", description: "Help maintain and beautify our sacred space so it remains a welcoming home for generations." },
  { icon: Heart, title: "Community Outreach", description: "Enable food drives, disaster relief, and interfaith programs that serve all of Fresno." },
];

export default function Donate() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="donate"
      style={{ padding: "120px 24px", backgroundColor: "#0B1D3A", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "#D4A520", borderRadius: "50%", filter: "blur(150px)", pointerEvents: "none" }}
      />

      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 10 }}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <p style={{ color: "#D4A520", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 12 }}>
            Support the Sangat
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8", marginBottom: 20, lineHeight: 1.2 }}>
            Give with Your Heart
          </h2>
          <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4A520, #FF8C00)", margin: "0 auto 20px" }} />
          <p style={{ color: "rgba(232,213,163,0.55)", maxWidth: 520, margin: "0 auto", fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.7, fontSize: 15 }}>
            Your dasvandh and donations keep our doors open, our kitchen running, and our community thriving. Every contribution is an act of seva.
          </p>
        </motion.div>

        {/* Cause cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, marginBottom: 48 }}>
          {causes.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ background: "linear-gradient(135deg, #152B52, #0F2347)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 12, padding: 24 }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <Icon color="#D4A520" size={18} />
              </div>
              <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 17, color: "#f5f0e8", marginBottom: 8 }}>
                {title}
              </h3>
              <p style={{ color: "rgba(232,213,163,0.45)", fontSize: 13, lineHeight: 1.7, fontFamily: "var(--font-inter), sans-serif" }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(255,153,51,0.06))", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16, padding: 56, textAlign: "center" }}
        >
          <p style={{ color: "#D4A520", fontSize: 40, marginBottom: 12, fontFamily: "var(--font-playfair), Georgia, serif" }}>☬</p>
          <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 26, color: "#f5f0e8", marginBottom: 12 }}>
            Donate Online
          </h3>
          <p style={{ color: "rgba(232,213,163,0.55)", marginBottom: 32, maxWidth: 440, margin: "0 auto 32px", fontFamily: "var(--font-inter), sans-serif", fontSize: 14, lineHeight: 1.7 }}>
            Secure online donations accepted. You will receive a tax-deductible receipt. Gurdwara Nanaksar Fresno is a registered 501(c)(3) nonprofit organization.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={SQUARE_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", background: "#D4A520", color: "#0B1D3A", padding: "16px 40px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 13, fontFamily: "var(--font-inter), sans-serif", border: "none", borderRadius: 4, cursor: "pointer", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#F0D060")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#D4A520")}
            >
              Donate Now
            </a>
            <a
              href={SQUARE_MONTHLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", background: "transparent", color: "#D4A520", padding: "16px 40px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 13, fontFamily: "var(--font-inter), sans-serif", border: "1px solid rgba(201,168,76,0.4)", borderRadius: 4, cursor: "pointer", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,168,76,0.1)")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "transparent")}
            >
              Monthly Giving
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
