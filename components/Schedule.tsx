"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Clock, Sun, Moon, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import T from "@/lib/translations";

type Tab = "daily" | "sunday" | "calendar" | "special";

type Item = {
  time: string;
  name: { en: string; pa: string };
  description: { en: string; pa: string };
  icon: typeof Sun;
};

type DailySection = {
  heading: { en: string; pa: string };
  icon: typeof Sun;
  items: { time: string; name: { en: string; pa: string } }[];
};

const dailySections: DailySection[] = [
  {
    heading: { en: "Morning — Amrit Vela", pa: "ਸਵੇਰ — ਅੰਮ੍ਰਿਤ ਵੇਲਾ" },
    icon: Star,
    items: [
      { time: "4:00 AM", name: { en: "Parkash", pa: "ਪ੍ਰਕਾਸ਼" } },
      { time: "4:30 – 5:45 AM", name: { en: "Path Sukhmani Sahib", pa: "ਪਾਠ ਸੁਖਮਨੀ ਸਾਹਿਬ" } },
      { time: "6:00 – 7:00 AM", name: { en: "Kirtan Asa Ki Vaar", pa: "ਕੀਰਤਨ ਆਸਾ ਕੀ ਵਾਰ" } },
      { time: "7:00 – 7:10 AM", name: { en: "Hukamnama Sahib, Ardas & Smapati", pa: "ਹੁਕਮਨਾਮਾ ਸਾਹਿਬ, ਅਰਦਾਸ ਅਤੇ ਸਮਾਪਤੀ" } },
    ],
  },
  {
    heading: { en: "Evening — Summer", pa: "ਸ਼ਾਮ — ਗਰਮੀਆਂ" },
    icon: Sun,
    items: [
      { time: "6:00 – 6:30 PM", name: { en: "Katha Guru Granth Sahib", pa: "ਕਥਾ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ" } },
      { time: "6:30 – 7:00 PM", name: { en: "Path Rehrash Sahib", pa: "ਪਾਠ ਰਹਿਰਾਸ ਸਾਹਿਬ" } },
      { time: "7:00 – 7:15 PM", name: { en: "Ardas", pa: "ਅਰਦਾਸ" } },
      { time: "7:15 – 8:00 PM", name: { en: "Kirtan Hazari", pa: "ਕੀਰਤਨ ਹਜ਼ੂਰੀ" } },
      { time: "8:00 – 8:10 PM", name: { en: "Har Jas, Hukamnama, Ardas & Smapati", pa: "ਹਰ ਜਸ, ਹੁਕਮਨਾਮਾ, ਅਰਦਾਸ ਅਤੇ ਸਮਾਪਤੀ" } },
    ],
  },
  {
    heading: { en: "Evening — Winter", pa: "ਸ਼ਾਮ — ਸਰਦੀਆਂ" },
    icon: Moon,
    items: [
      { time: "5:00 – 5:30 PM", name: { en: "Katha Guru Granth Sahib", pa: "ਕਥਾ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ" } },
      { time: "5:30 – 6:00 PM", name: { en: "Path Rehrash Sahib", pa: "ਪਾਠ ਰਹਿਰਾਸ ਸਾਹਿਬ" } },
      { time: "6:00 – 6:15 PM", name: { en: "Ardas", pa: "ਅਰਦਾਸ" } },
      { time: "6:15 – 7:00 PM", name: { en: "Kirtan Hazari", pa: "ਕੀਰਤਨ ਹਜ਼ੂਰੀ" } },
      { time: "7:00 – 7:10 PM", name: { en: "Har Jas, Hukamnama, Ardas & Smapati", pa: "ਹਰ ਜਸ, ਹੁਕਮਨਾਮਾ, ਅਰਦਾਸ ਅਤੇ ਸਮਾਪਤੀ" } },
    ],
  },
];

const scheduleData: Record<Exclude<Tab, "calendar" | "daily">, Item[]> = {
  sunday: [
    { time: "6:00 – 7:00 AM", name: { en: "Kirtan Asa Ki Vaar", pa: "ਕੀਰਤਨ ਆਸਾ ਕੀ ਵਾਰ" }, description: { en: "Morning musical recitation of Asa Ki Vaar by Guru Nanak Dev Ji", pa: "ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੀ ਆਸਾ ਕੀ ਵਾਰ ਦਾ ਕੀਰਤਨ" }, icon: Star },
    { time: "7:00 – 9:00 AM", name: { en: "Sukhmani Sahib By Sangat", pa: "ਸੁਖਮਨੀ ਸਾਹਿਬ — ਸੰਗਤ ਦੁਆਰਾ" }, description: { en: "Communal recitation of Sukhmani Sahib — the prayer of peace", pa: "ਸੰਗਤ ਵੱਲੋਂ ਸੁਖਮਨੀ ਸਾਹਿਬ ਦਾ ਪਾਠ" }, icon: Sun },
    { time: "9:15 – 10:15 AM", name: { en: "Bhog Sri Akhand Path Sahib", pa: "ਭੋਗ ਸ੍ਰੀ ਅਖੰਡ ਪਾਠ ਸਾਹਿਬ" }, description: { en: "Completion ceremony of the continuous recitation of Sri Guru Granth Sahib Ji", pa: "ਸ੍ਰੀ ਅਖੰਡ ਪਾਠ ਸਾਹਿਬ ਦੀ ਸਮਾਪਤੀ ਸਮਾਗਮ" }, icon: Star },
    { time: "10:15 – 10:30 AM", name: { en: "Aarti and Ardas", pa: "ਆਰਤੀ ਅਤੇ ਅਰਦਾਸ" }, description: { en: "Ceremonial prayer and supplication before the congregation", pa: "ਸੰਗਤ ਅੱਗੇ ਆਰਤੀ ਅਤੇ ਅਰਦਾਸ" }, icon: Sun },
    { time: "10:30 – 10:45 AM", name: { en: "Bhogan De Shabad & Hukamnama Sahib", pa: "ਭੋਗਣ ਦੇ ਸ਼ਬਦ ਅਤੇ ਹੁਕਮਨਾਮਾ ਸਾਹਿਬ" }, description: { en: "Closing shabads and the day's divine Hukamnama", pa: "ਭੋਗ ਦੇ ਸ਼ਬਦ ਅਤੇ ਹੁਕਮਨਾਮਾ ਸਾਹਿਬ" }, icon: Star },
    { time: "10:45 – 11:30 AM", name: { en: "Kirtan Hazari — Hazoori Jatha", pa: "ਕੀਰਤਨ ਹਜ਼ੂਰੀ — ਹਜ਼ੂਰੀ ਜੱਥਾ" }, description: { en: "Devotional kirtan by the resident Hazoori Jatha", pa: "ਹਜ਼ੂਰੀ ਜੱਥੇ ਵੱਲੋਂ ਕੀਰਤਨ" }, icon: Sun },
    { time: "11:30 AM – 12:00 PM", name: { en: "Katha Hazari", pa: "ਕਥਾ ਹਜ਼ੂਰੀ" }, description: { en: "Spiritual discourse and explanation of Gurbani", pa: "ਗੁਰਬਾਣੀ ਦੀ ਕਥਾ ਅਤੇ ਵਿਆਖਿਆ" }, icon: Star },
    { time: "12:00 – 1:00 PM", name: { en: "Kirtan Hazari — Guest Ragis", pa: "ਕੀਰਤਨ ਹਜ਼ੂਰੀ — ਮਹਿਮਾਨ ਰਾਗੀ" }, description: { en: "Kirtan Hazari by guest ragis or visiting jatha", pa: "ਮਹਿਮਾਨ ਰਾਗੀਆਂ ਵੱਲੋਂ ਕੀਰਤਨ" }, icon: Moon },
    { time: "1:00 – 1:15 PM", name: { en: "Ardas, Hukamnama & Smapati", pa: "ਅਰਦਾਸ, ਹੁਕਮਨਾਮਾ ਅਤੇ ਸਮਾਪਤੀ" }, description: { en: "Closing prayer, divine command, and congregation dismissal", pa: "ਅੰਤਿਮ ਅਰਦਾਸ, ਹੁਕਮਨਾਮਾ ਅਤੇ ਸੰਗਤ ਦੀ ਵਿਦਾਈ" }, icon: Moon },
  ],
  special: [
    { time: "All Day", name: { en: "Gurpurab Celebrations", pa: "ਗੁਰਪੁਰਬ ਸਮਾਗਮ" }, description: { en: "Birthdays of the Sikh Gurus — special akhand paths and keertan", pa: "ਸਿੱਖ ਗੁਰੂਆਂ ਦੇ ਪ੍ਰਕਾਸ਼ ਪੁਰਬ — ਅਖੰਡ ਪਾਠ ਅਤੇ ਕੀਰਤਨ" }, icon: Star },
    { time: "All Day", name: { en: "Baisakhi", pa: "ਵਿਸਾਖੀ" }, description: { en: "Sikh New Year celebration with procession and festivities", pa: "ਨਗਰ ਕੀਰਤਨ ਅਤੇ ਵਿਸਾਖੀ ਦੇ ਜਸ਼ਨ" }, icon: Sun },
    { time: "All Day", name: { en: "Diwali / Bandi Chhor Divas", pa: "ਦੀਵਾਲੀ / ਬੰਦੀ ਛੋੜ ਦਿਵਸ" }, description: { en: "Festival of lights and liberation", pa: "ਰੌਸ਼ਨੀ ਅਤੇ ਮੁਕਤੀ ਦਾ ਤਿਉਹਾਰ" }, icon: Star },
    { time: "All Day", name: { en: "Hola Mohalla", pa: "ਹੋਲਾ ਮਹੱਲਾ" }, description: { en: "Sikh festival of martial arts and community", pa: "ਮਾਰਸ਼ਲ ਆਰਟਸ ਅਤੇ ਭਾਈਚਾਰੇ ਦਾ ਤਿਉਹਾਰ" }, icon: Sun },
  ],
};

const calendar2026 = [
  { month: { en: "January", pa: "ਜਨਵਰੀ" }, puranMashee: "3 (Sat)", sangrand: "14 (Wed)", masia: "18 (Sun)", dasvee: "28 (Wed)" },
  { month: { en: "February", pa: "ਫ਼ਰਵਰੀ" }, puranMashee: "1 (Sun)", sangrand: "12 (Thu)", masia: "17 (Tue)", dasvee: "26 (Thu)" },
  { month: { en: "March", pa: "ਮਾਰਚ" }, puranMashee: "3 (Tue)", sangrand: "14 (Sat)", masia: "19 (Thu)", dasvee: "28 (Sat)" },
  { month: { en: "April", pa: "ਅਪ੍ਰੈਲ" }, puranMashee: "2 (Thu)", sangrand: "14 (Tue)", masia: "17 (Fri)", dasvee: "26 (Sun)" },
  { month: { en: "May", pa: "ਮਈ" }, puranMashee: "1 & 31 (Fri/Sun)", sangrand: "15 (Fri)", masia: "16 (Sat)", dasvee: "25 (Mon)" },
  { month: { en: "June", pa: "ਜੂਨ" }, puranMashee: "29 (Mon)", sangrand: "15 (Mon)", masia: "15 (Mon)", dasvee: "24 (Wed)" },
  { month: { en: "July", pa: "ਜੁਲਾਈ" }, puranMashee: "29 (Wed)", sangrand: "16 (Thu)", masia: "14 (Tue)", dasvee: "24 (Fri)" },
  { month: { en: "August", pa: "ਅਗਸਤ" }, puranMashee: "28 (Fri)", sangrand: "17 (Mon)", masia: "12 (Wed)", dasvee: "22 (Sat)" },
  { month: { en: "September", pa: "ਸਤੰਬਰ" }, puranMashee: "26 (Sat)", sangrand: "17 (Thu)", masia: "11 (Fri)", dasvee: "21 (Mon)" },
  { month: { en: "October", pa: "ਅਕਤੂਬਰ" }, puranMashee: "26 (Mon)", sangrand: "17 (Sat)", masia: "10 (Sat)", dasvee: "21 (Wed)" },
  { month: { en: "November", pa: "ਨਵੰਬਰ" }, puranMashee: "24 (Tue)", sangrand: "16 (Mon)", masia: "9 (Mon)", dasvee: "20 (Fri)" },
  { month: { en: "December", pa: "ਦਸੰਬਰ" }, puranMashee: "23 (Wed)", sangrand: "16 (Wed)", masia: "8 (Tue)", dasvee: "19 (Sat)" },
];

export default function Schedule() {
  const [active, setActive] = useState<Tab>("sunday");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const t = T[lang].schedule;

  const tabs: { key: Tab; label: string }[] = [
    { key: "daily", label: t.tabDaily },
    { key: "sunday", label: t.tabSunday },
    { key: "calendar", label: t.tabCalendar },
    { key: "special", label: t.tabSpecial },
  ];

  return (
    <section
      id="schedule"
      className="section-pad" style={{ padding: "120px 24px", backgroundColor: "#0F2347", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top left, #152B52 0%, transparent 60%)" }} />

      <div ref={ref} style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 10 }}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <p style={{ color: "#D4A520", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 12 }}>
            {t.label}
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8", marginBottom: 20, lineHeight: 1.2 }}>
            {t.heading}
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
              key={tab.key}
              onClick={() => setActive(tab.key)}
              style={{
                padding: "10px 22px",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "var(--font-inter), sans-serif",
                borderRadius: 4,
                cursor: "pointer",
                transition: "all 0.2s",
                background: active === tab.key ? "#D4A520" : "transparent",
                color: active === tab.key ? "#0B1D3A" : "rgba(201,168,76,0.7)",
                border: active === tab.key ? "1px solid #D4A520" : "1px solid rgba(201,168,76,0.3)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {active === "daily" ? (
            <motion.div
              key="daily"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: 28 }}
            >
              {dailySections.map((section, si) => {
                const SIcon = section.icon;
                return (
                  <div key={section.heading.en}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <SIcon color="#D4A520" size={14} />
                      <span style={{ color: "#D4A520", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
                        {section.heading[lang]}
                      </span>
                      <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.15)" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {section.items.map((item, i) => (
                        <motion.div
                          key={item.name.en}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: (si * 0.1) + i * 0.05 }}
                          style={{
                            background: "linear-gradient(90deg, #152B52, #0F2347)",
                            border: "1px solid rgba(201,168,76,0.12)",
                            borderRadius: 10,
                            padding: "14px 18px",
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                          }}
                        >
                          <div style={{ flexShrink: 0, minWidth: 120 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#D4A520", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-inter), sans-serif" }}>
                              <Clock size={11} color="#D4A520" />
                              {item.time}
                            </div>
                          </div>
                          <div style={{ color: "#f5f0e8", fontWeight: 600, fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 15 }}>
                            {item.name[lang]}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : active === "calendar" ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <p style={{ color: "#D4A520", fontSize: 13, textAlign: "center", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 20 }}>
                {t.calendarTitle}
              </p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-inter), sans-serif" }}>
                  <thead>
                    <tr>
                      {t.calendarCols.map((col) => (
                        <th key={col} style={{ padding: "10px 14px", textAlign: "left", color: "#D4A520", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", borderBottom: "1px solid rgba(201,168,76,0.2)", whiteSpace: "nowrap" }}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {calendar2026.map((row, i) => (
                      <motion.tr
                        key={row.month.en}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        style={{ background: i % 2 === 0 ? "rgba(21,43,82,0.6)" : "rgba(15,35,71,0.4)" }}
                      >
                        <td style={{ padding: "11px 14px", color: "#f5f0e8", fontWeight: 600, fontSize: 13, borderBottom: "1px solid rgba(201,168,76,0.06)" }}>
                          {row.month[lang]}
                        </td>
                        {[row.puranMashee, row.sangrand, row.masia, row.dasvee].map((val, j) => (
                          <td key={j} style={{ padding: "11px 14px", color: "rgba(232,213,163,0.7)", fontSize: 13, borderBottom: "1px solid rgba(201,168,76,0.06)", whiteSpace: "nowrap" }}>
                            {val}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {scheduleData[active as Exclude<Tab, "calendar" | "daily">].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name.en}
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
                    <div style={{ flexShrink: 0, minWidth: 110 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#D4A520", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-inter), sans-serif" }}>
                        <Clock size={11} color="#D4A520" />
                        {item.time}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: "#f5f0e8", fontWeight: 600, fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 15, marginBottom: 2 }}>
                        {item.name[lang]}
                      </div>
                      <div style={{ color: "rgba(232,213,163,0.45)", fontSize: 13, fontFamily: "var(--font-inter), sans-serif", wordBreak: "break-word" }}>
                        {item.description[lang]}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          style={{ textAlign: "center", color: "rgba(232,213,163,0.35)", fontSize: 13, marginTop: 28, fontFamily: "var(--font-inter), sans-serif" }}
        >
          {t.footer}
        </motion.p>
      </div>
    </section>
  );
}
