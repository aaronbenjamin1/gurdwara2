"use client";
import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    if (index === null) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [index, handleKey]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.95)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); onPrev(); }}
            style={{
              position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%",
              width: 48, height: 48, cursor: "pointer", color: "#f5f0e8",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 2,
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: "min(90vw, 1000px)",
              maxHeight: "85vh",
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <img
              src={images[index]}
              alt=""
              style={{ display: "block", maxWidth: "100%", maxHeight: "85vh", objectFit: "contain" }}
            />
          </motion.div>

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); onNext(); }}
            style={{
              position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%",
              width: 48, height: 48, cursor: "pointer", color: "#f5f0e8",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 2,
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 16, right: 16,
              background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%",
              width: 40, height: 40, cursor: "pointer", color: "#f5f0e8",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <X size={18} />
          </button>

          {/* Counter */}
          <div style={{
            position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
            color: "rgba(232,213,163,0.45)", fontSize: 12,
            fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.1em",
          }}>
            {index + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
