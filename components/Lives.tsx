"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Radio, Play, Tv } from "lucide-react";

type VideoItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
    publishedAt: string;
  };
};

export default function Lives() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isLive, setIsLive] = useState(false);
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const selectedRef = useRef<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/youtube");
      const data = await res.json();
      setIsLive(data.isLive);
      setLiveVideoId(data.liveVideoId);
      setVideos(data.videos ?? []);
      setReady(true);
      if (data.isLive && data.liveVideoId) {
        setSelected(data.liveVideoId);
        selectedRef.current = data.liveVideoId;
      } else if (!selectedRef.current && data.videos?.length > 0) {
        const id = data.videos[0].id.videoId;
        setSelected(id);
        selectedRef.current = id;
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchStatus();
    const t = setInterval(fetchStatus, 30000);
    return () => clearInterval(t);
  }, [fetchStatus]);

  const hasContent = ready && (isLive || videos.length > 0);

  return (
    <section
      id="lives"
      ref={ref}
      style={{
        padding: "120px 24px",
        backgroundColor: "#07111F",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top left, rgba(11,29,58,0.6) 0%, transparent 60%)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
            <p style={{ color: "#D4A520", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
              Watch &amp; Worship
            </p>
            {isLive && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,0,0,0.12)", padding: "3px 10px", borderRadius: 4 }}>
                <motion.div
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF3333", flexShrink: 0 }}
                />
                <span style={{ color: "#FF4444", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
                  Live Now
                </span>
              </div>
            )}
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8", marginBottom: 20, lineHeight: 1.2 }}>
            {isLive ? "Streaming Live" : "Watch Online"}
          </h2>
          <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4A520, #FF8C00)", margin: "0 auto" }} />
        </motion.div>

        {!hasContent ? (
          /* Placeholder — shown until API key is configured */
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              background: "linear-gradient(135deg, #152B52, #0F2347)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: 16,
              aspectRatio: "16/9",
              maxWidth: 800,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <Tv size={48} color="rgba(201,168,76,0.25)" strokeWidth={1.2} />
            <p style={{ color: "rgba(232,213,163,0.3)", fontSize: 14, fontFamily: "var(--font-inter), sans-serif", textAlign: "center", maxWidth: 300 }}>
              Live streams and past broadcasts will appear here once the YouTube channel is connected
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Main player */}
            {selected && (
              <div style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                border: isLive ? "1px solid rgba(255,60,60,0.35)" : "1px solid rgba(201,168,76,0.2)",
                marginBottom: 28,
                boxShadow: isLive ? "0 0 40px rgba(255,0,0,0.12)" : "0 0 30px rgba(201,168,76,0.06)",
              }}>
                {isLive && selected === liveVideoId && (
                  <div style={{
                    position: "absolute", top: 14, left: 14, zIndex: 10,
                    display: "flex", alignItems: "center", gap: 6,
                    background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
                    padding: "5px 12px", borderRadius: 4,
                  }}>
                    <motion.div
                      animate={{ opacity: [1, 0.15, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF3333" }}
                    />
                    <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
                      Live
                    </span>
                  </div>
                )}
                <div style={{ aspectRatio: "16/9" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${selected}?rel=0${isLive && selected === liveVideoId ? "&autoplay=1" : ""}`}
                    style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Past broadcasts */}
            {videos.length > 0 && (
              <div>
                <p style={{ color: "rgba(232,213,163,0.3)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.25em", fontFamily: "var(--font-inter), sans-serif", marginBottom: 14 }}>
                  Past Broadcasts
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(180px, 100%), 1fr))", gap: 12 }}>
                  {videos.map((v) => (
                    <button
                      key={v.id.videoId}
                      onClick={() => setSelected(v.id.videoId)}
                      style={{
                        background: "none",
                        border: selected === v.id.videoId ? "1px solid rgba(212,165,32,0.55)" : "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 10,
                        overflow: "hidden",
                        cursor: "pointer",
                        textAlign: "left",
                        padding: 0,
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(212,165,32,0.35)")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = selected === v.id.videoId ? "rgba(212,165,32,0.55)" : "rgba(255,255,255,0.06)")}
                    >
                      <div style={{ position: "relative" }}>
                        <img
                          src={v.snippet.thumbnails.medium.url}
                          alt={v.snippet.title}
                          style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
                        />
                        {selected !== v.id.videoId && (
                          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)", opacity: 0, transition: "opacity 0.2s" }}
                            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
                            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.opacity = "0")}
                          >
                            <Play size={24} color="#fff" fill="#fff" />
                          </div>
                        )}
                      </div>
                      <div style={{ padding: "8px 10px", background: "#0F2347" }}>
                        <p style={{
                          color: "rgba(232,213,163,0.65)",
                          fontSize: 11,
                          fontFamily: "var(--font-inter), sans-serif",
                          lineHeight: 1.4,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        } as React.CSSProperties}>
                          {v.snippet.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
