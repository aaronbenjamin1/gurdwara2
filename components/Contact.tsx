"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, CheckCircle, Share2, Play, Users } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="section-pad" style={{ padding: "120px 24px", backgroundColor: "#0F2347", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top right, #152B52 0%, transparent 60%)" }} />

      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 10 }}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <p style={{ color: "#D4A520", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 12 }}>
            Come Visit Us
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8", marginBottom: 20, lineHeight: 1.2 }}>
            Get in Touch
          </h2>
          <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4A520, #FF8C00)", margin: "0 auto" }} />
        </motion.div>

        <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 48 }}>

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 22, marginBottom: 36 }}>
              {[
                { Icon: MapPin, label: "Address", value: "Fresno, California\n(Address to be confirmed)" },
                { Icon: Phone, label: "Phone", value: "(XXX) XXX-XXXX" },
                { Icon: Mail, label: "Email", value: "info@gurdwaranakasarfresno.org" },
              ].map(({ Icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon color="#D4A520" size={16} />
                  </div>
                  <div>
                    <div style={{ color: "#D4A520", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, fontFamily: "var(--font-inter), sans-serif", marginBottom: 3 }}>
                      {label}
                    </div>
                    <div style={{ color: "rgba(232,213,163,0.65)", fontSize: 13, fontFamily: "var(--font-inter), sans-serif", whiteSpace: "pre-line" }}>
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ color: "rgba(232,213,163,0.35)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "var(--font-inter), sans-serif", marginBottom: 12 }}>
                Follow Us
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[{ Icon: Share2, label: "Instagram" }, { Icon: Play, label: "YouTube" }, { Icon: Users, label: "Facebook" }].map(({ Icon, label }) => (
                  <button
                    key={label}
                    title={label}
                    style={{ width: 40, height: 40, border: "1px solid rgba(201,168,76,0.25)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "none", cursor: "pointer", color: "rgba(201,168,76,0.55)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)"; e.currentTarget.style.background = "rgba(201,168,76,0.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"; e.currentTarget.style.background = "none"; }}
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{ background: "linear-gradient(135deg, #152B52, #0F2347)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 12, height: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <MapPin color="rgba(201,168,76,0.3)" size={24} />
              <p style={{ color: "rgba(232,213,163,0.25)", fontSize: 12, fontFamily: "var(--font-inter), sans-serif" }}>
                Map will be embedded here
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div style={{ background: "linear-gradient(135deg, #152B52, #0F2347)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16, padding: 36 }}>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "48px 0" }}
                >
                  <CheckCircle color="#D4A520" size={44} style={{ margin: "0 auto 16px" }} />
                  <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 22, color: "#f5f0e8", marginBottom: 8 }}>
                    Message Sent
                  </h3>
                  <p style={{ color: "rgba(232,213,163,0.55)", fontFamily: "var(--font-inter), sans-serif", fontSize: 14 }}>
                    We&apos;ll be in touch soon. Waheguru Ji Ka Khalsa!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 20, color: "#f5f0e8", marginBottom: 6 }}>
                    Send a Message
                  </h3>
                  {[
                    { name: "name", label: "Your Name", type: "text", placeholder: "Gurdial Dhesi" },
                    { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label style={{ color: "#D4A520", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, fontFamily: "var(--font-inter), sans-serif", display: "block", marginBottom: 6 }}>
                        {label}
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[name as keyof typeof form]}
                        onChange={e => setForm({ ...form, [name]: e.target.value })}
                        required
                        style={{ width: "100%", background: "#0B1D3A", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 6, padding: "12px 14px", color: "#F0D060", fontFamily: "var(--font-inter), sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ color: "#D4A520", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, fontFamily: "var(--font-inter), sans-serif", display: "block", marginBottom: 6 }}>
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      required
                      style={{ width: "100%", background: "#0B1D3A", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 6, padding: "12px 14px", color: "#F0D060", fontFamily: "var(--font-inter), sans-serif", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ background: "#D4A520", color: "#0B1D3A", padding: "16px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 13, fontFamily: "var(--font-inter), sans-serif", border: "none", borderRadius: 6, cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#F0D060")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#D4A520")}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
