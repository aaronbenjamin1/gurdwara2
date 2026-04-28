"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Clock, Sun, Moon, Star } from "lucide-react";

const tabs = ["Daily", "Saturday", "Sunday", "Special"] as const;
type Tab = typeof tabs[number];

const schedule: Record<Tab, { time: string; name: string; description: string; icon: typeof Sun }[]> = {
  Daily: [
    { time: "4:00 AM", name: "Amrit Vela", description: "Pre-dawn meditation and Naam Simran", icon: Star },
    { time: "5:00 AM", name: "Nitnem Banis", description: "Morning prayers — Japji, Jaap, and Tav Prasad Savaiye", icon: Sun },
    { time: "6:00 AM", name: "Hukamnama", description: "Daily divine command from Sri Guru Granth Sahib Ji", icon: Star },
    { time: "7:00 AM", name: "Morning Langar", description: "Community meal served to all visitors", icon: Sun },
    { time: "6:30 PM", name: "Evening Rehras", description: "Evening prayers and Ardas", icon: Moon },
    { time: "7:30 PM", name: "Keertan", description: "Evening devotional singing of Gurbani", icon: Moon },
  ],
  Saturday: [
    { time: "8:00 AM", name: "Akhand Path", description: "Continuous recitation of Sri Guru Granth Sahib Ji", icon: Star },
    { time: "10:00 AM", name: "Keertan Darbar", description: "Extended morning keertan with visiting ragis", icon: Sun },
    { time: "12:00 PM", name: "Langar Seva", description: "Community lunch — all are welcome", icon: Sun },
    { time: "4:00 PM", name: "Gurmat Classes", description: "Punjabi and Gurbani education for youth", icon: Star },
    { time: "7:00 PM", name: "Evening Diwan", description: "Evening congregation and keertan", icon: Moon },
  ],
  Sunday: [
    { time: "9:00 AM", name: "Morning Diwan", description: "Main weekly congregation and keertan", icon: Sun },
    { time: "11:00 AM", name: "Katha", description: "Gurbani lecture and teachings", icon: Star },
    { time: "12:30 PM", name: "Ardas & Hukamnama", description: "Community prayer and divine command", icon: Star },
    { time: "1:00 PM", name: "Sunday Langar", description: "Full community meal — families welcome", icon: Sun },
    { time: "3:00 PM", name: "Youth Sangat", description: "Youth activities, kirtan practice, and seva", icon: Star },
    { time: "6:00 PM", name: "Rehras Sahib", description: "Evening prayer and closing ceremony", icon: Moon },
  ],
  Special: [
    { time: "All Day", name: "Gurpurab Celebrations", description: "Birthdays of the Sikh Gurus — special akhand paths and keertan", icon: Star },
    { time: "All Day", name: "Baisakhi", description: "Sikh New Year celebration with procession and festivities", icon: Sun },
    { time: "All Day", name: "Diwali / Bandi Chhor Divas", description: "Festival of lights and liberation", icon: Star },
    { time: "All Day", name: "Hola Mohalla", description: "Sikh festival of martial arts and community", icon: Sun },
  ],
};

export default function Schedule() {
  const [active, setActive] = useState<Tab>("Sunday");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="schedule"
      className="section-pad" style={{ padding: "120px 24px", backgroundColor: "#0F2347", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top left, #152B52 0%, transparent 60%)" }} />

      <div ref={ref} style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <p style={{ color: "#D4A520", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 12 }}>
            Come Pray With Us
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8", marginBottom: 20, lineHeight: 1.2 }}>
            Worship Schedule
          </h2>
          <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4A520, #FF8C00)", margin: "0 auto" }} />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              style={{
                padding: "10px 24px",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-inter), sans-serif",
                borderRadius: 4,
                cursor: "pointer",
                transition: "all 0.2s",
                background: active === tab ? "#D4A520" : "transparent",
                color: active === tab ? "#0B1D3A" : "rgba(201,168,76,0.7)",
                border: active === tab ? "1px solid #D4A520" : "1px solid rgba(201,168,76,0.3)",
              }}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Schedule list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            {schedule[active].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  style={{
                    background: "linear-gradient(90deg, #152B52, #0F2347)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    borderRadius: 12,
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon color="#D4A520" size={15} />
                  </div>
                  <div style={{ flexShrink: 0, width: 80 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#D4A520", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-inter), sans-serif" }}>
                      <Clock size={11} color="#D4A520" />
                      {item.time}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#f5f0e8", fontWeight: 600, fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 15, marginBottom: 2 }}>
                      {item.name}
                    </div>
                    <div style={{ color: "rgba(232,213,163,0.45)", fontSize: 13, fontFamily: "var(--font-inter), sans-serif", wordBreak: "break-word" }}>
                      {item.description}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          style={{ textAlign: "center", color: "rgba(232,213,163,0.35)", fontSize: 13, marginTop: 28, fontFamily: "var(--font-inter), sans-serif" }}
        >
          All services are free and open to everyone. Langar (community meal) is served daily.
        </motion.p>
      </div>
    </section>
  );
}
