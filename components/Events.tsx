"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

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
  },
];

export default function Events() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="events"
      className="section-pad" style={{ padding: "120px 24px", backgroundColor: "#0B1D3A", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at bottom left, #152B52 0%, transparent 60%)" }} />

      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 10 }}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <p style={{ color: "#D4A520", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 12 }}>
            What&apos;s Coming Up
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8", marginBottom: 20, lineHeight: 1.2 }}>
            Upcoming Events
          </h2>
          <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4A520, #FF8C00)", margin: "0 auto" }} />
        </motion.div>

        <div className="events-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(460px, 100%), 1fr))", gap: 20 }}>
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: "linear-gradient(135deg, #152B52, #0F2347)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 16,
                padding: 28,
              }}
            >
              <div style={{ display: "flex", gap: 20 }}>
                {/* Date */}
                <div style={{ flexShrink: 0, textAlign: "center", width: 52 }}>
                  <div style={{ color: "#D4A520", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
                    {event.month}
                  </div>
                  <div style={{ color: "#f5f0e8", fontSize: 38, fontWeight: 700, fontFamily: "var(--font-playfair), Georgia, serif", lineHeight: 1 }}>
                    {event.day}
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                    <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 18, color: "#f5f0e8", lineHeight: 1.3 }}>
                      {event.title}
                    </h3>
                    <span style={{ flexShrink: 0, fontSize: 11, padding: "4px 10px", borderRadius: 999, background: event.tagColor, color: event.tagText, fontFamily: "var(--font-inter), sans-serif", fontWeight: 600 }}>
                      {event.tag}
                    </span>
                  </div>
                  <p style={{ color: "rgba(232,213,163,0.55)", fontSize: 13, lineHeight: 1.7, marginBottom: 14, fontFamily: "var(--font-inter), sans-serif" }}>
                    {event.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 12, color: "rgba(232,213,163,0.45)", fontFamily: "var(--font-inter), sans-serif" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <Clock size={11} color="#D4A520" /> {event.time}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <MapPin size={11} color="#D4A520" /> {event.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{ textAlign: "center", marginTop: 36 }}
        >
          <button style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#D4A520", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, fontFamily: "var(--font-inter), sans-serif", background: "none", border: "none", cursor: "pointer" }}>
            View All Events <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
