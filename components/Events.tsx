"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const events = [
  {
    month: "MAY", day: "13",
    title: "Baisakhi Celebration",
    description: "Annual Sikh New Year celebration with kirtan, langar, and community festivities. Nagar Kirtan procession begins at 9 AM.",
    time: "9:00 AM – 5:00 PM",
    location: "Gurdwara Nanaksar Fresno",
    tag: "Annual Festival",
    tagColor: "rgba(255,153,51,0.15)",
    tagText: "#FF8C00",
    accentRgb: "255,140,0",
  },
  {
    month: "JUN", day: "07",
    title: "Gurpurab — Guru Arjan Dev Ji",
    description: "Shaheedi Gurpurab of the 5th Sikh Guru. Akhand Path, keertan, and ardas throughout the day.",
    time: "4:00 AM – 8:00 PM",
    location: "Gurdwara Nanaksar Fresno",
    tag: "Gurpurab",
    tagColor: "rgba(201,168,76,0.15)",
    tagText: "#D4A520",
    accentRgb: "212,165,32",
  },
  {
    month: "JUL", day: "19",
    title: "Youth Kirtan Samagam",
    description: "A celebration of Sikh youth talent featuring junior ragis and young gatka performers from across the Central Valley.",
    time: "11:00 AM – 4:00 PM",
    location: "Gurdwara Nanaksar Fresno",
    tag: "Youth Event",
    tagColor: "rgba(96,165,250,0.15)",
    tagText: "#93c5fd",
    accentRgb: "147,197,253",
  },
  {
    month: "AUG", day: "24",
    title: "Annual Langar Seva Day",
    description: "Community-wide langar event serving thousands of guests. Volunteers welcome — come practice seva.",
    time: "8:00 AM – 2:00 PM",
    location: "Gurdwara Nanaksar Fresno",
    tag: "Seva",
    tagColor: "rgba(52,211,153,0.15)",
    tagText: "#6ee7b7",
    accentRgb: "110,231,183",
  },
];

export default function Events() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const prev = () => go((current - 1 + events.length) % events.length, -1);
  const next = useCallback(() => go((current + 1) % events.length, 1), [current, go]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const event = events[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section
      id="events"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        backgroundColor: "#071525",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(201,168,76,0.15)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 70% 50%, rgba(${event.accentRgb},0.06) 0%, transparent 65%)`,
        transition: "background 0.8s ease",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "stretch",
        minHeight: 360, position: "relative", zIndex: 1,
      }}>

        {/* Left date column */}
        <div style={{
          flexShrink: 0, width: 180,
          borderRight: "1px solid rgba(201,168,76,0.1)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "48px 28px",
        }}>
          <p style={{
            color: "#D4A520", fontSize: 10, letterSpacing: "0.35em",
            textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif",
            marginBottom: 20,
          }}>
            Upcoming Events
          </p>
          <div style={{ width: 32, height: 1, background: "rgba(201,168,76,0.3)", marginBottom: 20 }} />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current + "-date"}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div style={{
                color: event.tagText, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase",
                fontFamily: "var(--font-inter), sans-serif", marginBottom: 4,
              }}>
                {event.month}
              </div>
              <div style={{
                color: "#f5f0e8", fontSize: 64, fontWeight: 700,
                fontFamily: "var(--font-playfair), Georgia, serif", lineHeight: 1,
              }}>
                {event.day}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right content */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "48px 44px",
          overflow: "hidden",
        }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <span style={{
                display: "inline-block",
                fontSize: 11, padding: "4px 12px", borderRadius: 999,
                background: event.tagColor, color: event.tagText,
                fontFamily: "var(--font-inter), sans-serif", fontWeight: 600,
                marginBottom: 14,
              }}>
                {event.tag}
              </span>

              <h2 style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: "#f5f0e8", lineHeight: 1.2, marginBottom: 16,
              }}>
                {event.title}
              </h2>

              <p style={{
                color: "rgba(232,213,163,0.55)", fontSize: 15, lineHeight: 1.75,
                maxWidth: 580, marginBottom: 24,
                fontFamily: "var(--font-inter), sans-serif",
              }}>
                {event.description}
              </p>

              <div style={{
                display: "flex", flexWrap: "wrap", gap: 20,
                fontSize: 13, color: "rgba(232,213,163,0.5)",
                fontFamily: "var(--font-inter), sans-serif",
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Clock size={13} color="#D4A520" /> {event.time}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <MapPin size={13} color="#D4A520" /> {event.location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  style={{
                    width: i === current ? 24 : 8, height: 8, borderRadius: 4,
                    background: i === current ? "#D4A520" : "rgba(201,168,76,0.25)",
                    border: "none", cursor: "pointer",
                    transition: "all 0.3s ease", padding: 0,
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
              {[{ fn: prev, icon: <ChevronLeft size={18} /> }, { fn: next, icon: <ChevronRight size={18} /> }].map((btn, i) => (
                <button
                  key={i}
                  onClick={btn.fn}
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    color: "#D4A520", display: "flex", alignItems: "center",
                    justifyContent: "center", cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.18)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.08)")}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
