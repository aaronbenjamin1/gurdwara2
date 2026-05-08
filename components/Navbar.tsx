"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import T from "@/lib/translations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const { lang, toggle } = useLanguage();
  const t = T[lang].nav;

  const links = [
    { label: t.home, href: "#home" },
    { label: t.about, href: "#about" },
    { label: t.schedule, href: "#schedule" },
    { label: t.events, href: "#events" },
    { label: t.gallery, href: "/gallery" },
    { label: t.live, href: "/live" },
    { label: t.blog, href: "/blog" },
    { label: t.contact, href: "#contact" },
  ];

  const checkLive = useCallback(async () => {
    try {
      const res = await fetch("/api/youtube");
      const data = await res.json();
      setIsLive(data.isLive);
    } catch {}
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    checkLive();
    const interval = setInterval(checkLive, 30000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearInterval(interval);
    };
  }, [checkLive]);

  const handleLink = (href: string) => {
    setOpen(false);
    if (href.startsWith("/")) {
      window.location.href = href;
    } else {
      if (window.location.pathname !== "/") {
        window.location.href = "/" + href;
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const LangToggle = ({ mobile }: { mobile?: boolean }) => (
    <button
      onClick={toggle}
      style={{
        background: "rgba(201,168,76,0.1)",
        border: "1px solid rgba(201,168,76,0.35)",
        borderRadius: 4,
        cursor: "pointer",
        color: "#D4A520",
        fontSize: mobile ? 13 : 11,
        fontWeight: 700,
        letterSpacing: "0.06em",
        fontFamily: "var(--font-inter), sans-serif",
        padding: mobile ? "6px 14px" : "5px 10px",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.2)")}
      onMouseLeave={e => (e.currentTarget.style.background = "rgba(201,168,76,0.1)")}
    >
      {lang === "en" ? "ਪੰਜਾਬੀ" : "English"}
    </button>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          transition: "all 0.4s",
          background: scrolled ? "rgba(11,29,58,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212,165,32,0.2)" : "none",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => handleLink("#home")} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <div style={{ color: "#D4A520", fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>
              Gurdwara Nanaksar
            </div>
            <div style={{ color: "rgba(240,208,96,0.55)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
              Fresno, California
            </div>
            <div style={{ color: "rgba(240,208,96,0.35)", fontSize: 9, fontFamily: "var(--font-inter), sans-serif", marginTop: 2 }}>
              3060 S Cherry Ave, Fresno, CA 93706
            </div>
          </button>

          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLink(link.href)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(240,208,96,0.7)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", padding: 0, transition: "color 0.2s", display: "flex", alignItems: "center", gap: 6 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#D4A520")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,208,96,0.7)")}
                >
                  {link.label}
                  {link.label === t.live && isLive && (
                    <motion.span
                      animate={{ opacity: [1, 0.15, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF3333", display: "inline-block", flexShrink: 0 }}
                    />
                  )}
                </button>
              ))}
              <LangToggle />
              <button
                onClick={() => handleLink("#donate")}
                style={{ background: "#D4A520", color: "#0B1D3A", padding: "8px 20px", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", border: "none", borderRadius: 4, cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F0D060")}
                onMouseLeave={e => (e.currentTarget.style.background = "#D4A520")}
              >
                {t.donate}
              </button>
            </div>
          )}

          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {isLive && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,0,0,0.12)", padding: "4px 8px", borderRadius: 4 }}>
                  <motion.div
                    animate={{ opacity: [1, 0.15, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF3333" }}
                  />
                  <span style={{ color: "#FF5555", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
                    {t.live}
                  </span>
                </div>
              )}
              <LangToggle />
              <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: "#D4A520", padding: 4 }}>
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(11,29,58,0.98)", backdropFilter: "blur(12px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}
          >
            {[...links, { label: t.donate, href: "#donate" }].map((link) => (
              <button
                key={link.href}
                onClick={() => handleLink(link.href)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#F0D060", fontSize: 24, fontFamily: "var(--font-playfair), Georgia, serif", transition: "color 0.2s", display: "flex", alignItems: "center", gap: 10 }}
                onMouseEnter={e => (e.currentTarget.style.color = "#D4A520")}
                onMouseLeave={e => (e.currentTarget.style.color = "#F0D060")}
              >
                {link.label}
                {link.label === t.live && isLive && (
                  <motion.span
                    animate={{ opacity: [1, 0.15, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF3333", display: "inline-block" }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
