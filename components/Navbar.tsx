"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#schedule" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0B1D3A]/95 backdrop-blur-md border-b border-[#D4A520]/20 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleLink("#home")} className="text-left">
            <div className="text-[#D4A520] font-[family-name:var(--font-playfair)] text-lg font-bold leading-tight">
              Gurdwara Nanaksar
            </div>
            <div className="text-[#F0D060]/60 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-inter)]">
              Fresno, California
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLink(link.href)}
                className="text-[#F0D060]/70 hover:text-[#D4A520] text-sm tracking-wider uppercase font-[family-name:var(--font-inter)] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4A520] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => handleLink("#donate")}
              className="bg-[#D4A520] text-[#0B1D3A] px-5 py-2 text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)] rounded hover:bg-[#F0D060] transition-colors duration-200"
            >
              Donate
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#D4A520]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0B1D3A]/98 backdrop-blur-md flex flex-col items-center justify-center gap-8"
          >
            {[...links, { label: "Donate", href: "#donate" }].map((link) => (
              <button
                key={link.href}
                onClick={() => handleLink(link.href)}
                className="text-[#F0D060] text-2xl font-[family-name:var(--font-playfair)] hover:text-[#D4A520] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
