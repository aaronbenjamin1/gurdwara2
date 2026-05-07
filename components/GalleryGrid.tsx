"use client";
import { useState } from "react";
import GalleryLightbox from "./GalleryLightbox";

export default function GalleryGrid({ images }: { images: string[] }) {
  const [active, setActive] = useState<number | null>(null);

  const prev = () => setActive(i => (i === null || i === 0) ? images.length - 1 : i - 1);
  const next = () => setActive(i => (i === null || i === images.length - 1) ? 0 : i + 1);

  return (
    <>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 10,
      }}>
        {images.map((src, i) => (
          <div
            key={src}
            onClick={() => setActive(i)}
            style={{
              aspectRatio: "1",
              overflow: "hidden",
              borderRadius: 10,
              cursor: "pointer",
              background: "#0F2347",
              border: "1px solid rgba(201,168,76,0.08)",
              position: "relative",
            }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.3s, opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        ))}
      </div>

      <GalleryLightbox
        images={images}
        index={active}
        onClose={() => setActive(null)}
        onPrev={prev}
        onNext={next}
      />
    </>
  );
}
