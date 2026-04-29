"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Tv } from "lucide-react";

type VideoItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
    publishedAt: string;
  };
};

export default function LivePlayer() {
  const [isLive, setIsLive] = useState(false);
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hostname, setHostname] = useState("");
  const [ready, setReady] = useState(false);
  const selectedRef = useRef<string | null>(null);

  useEffect(() => {
    setHostname(window.location.hostname);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  const videoSrc = selected
    ? `https://www.youtube.com/embed/${selected}?rel=0${isLive && selected === liveVideoId ? "&autoplay=1" : ""}`
    : null;

  const chatSrc =
    isLive && liveVideoId && hostname
      ? `https://www.youtube.com/live_chat?v=${liveVideoId}&embed_domain=${hostname}`
      : null;

  const px = isMobile ? "20px" : "40px";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#07111F", paddingTop: 76 }}>

      {/* Page header */}
      <div style={{ padding: isMobile ? "28px 20px 20px" : "44px 40px 28px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.7rem, 3vw, 2.5rem)", color: "#f5f0e8", margin: 0 }}>
            {isLive ? "Streaming Live" : "Watch Online"}
          </h1>
          {isLive && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,0,0,0.12)", padding: "4px 12px", borderRadius: 4, border: "1px solid rgba(255,0,0,0.2)" }}>
              <motion.div
                animate={{ opacity: [1, 0.15, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF3333", flexShrink: 0 }}
              />
              <span style={{ color: "#FF5555", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
                Live
              </span>
            </div>
          )}
        </div>
        {ready && !isLive && (
          <p style={{ color: "rgba(232,213,163,0.35)", fontSize: 13, fontFamily: "var(--font-inter), sans-serif", marginTop: 6 }}>
            The channel is currently offline — browse past broadcasts below.
          </p>
        )}
      </div>

      {/* Video + Chat */}
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: `0 ${px}`,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 14,
        marginBottom: 56,
        alignItems: "stretch",
      }}>

        {/* Video player */}
        <div style={{ flex: isMobile ? "none" : "0 0 65%", minWidth: 0 }}>
          {videoSrc ? (
            <div style={{
              aspectRatio: "16/9",
              borderRadius: 14,
              overflow: "hidden",
              border: isLive ? "1px solid rgba(255,60,60,0.3)" : "1px solid rgba(201,168,76,0.15)",
              boxShadow: isLive ? "0 0 48px rgba(255,0,0,0.1)" : "0 0 32px rgba(0,0,0,0.4)",
              position: "relative",
            }}>
              {isLive && selected === liveVideoId && (
                <div style={{
                  position: "absolute", top: 12, left: 12, zIndex: 10,
                  display: "flex", alignItems: "center", gap: 6,
                  background: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)",
                  padding: "5px 12px", borderRadius: 4,
                }}>
                  <motion.div
                    animate={{ opacity: [1, 0.1, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF3333" }}
                  />
                  <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
                    Live
                  </span>
                </div>
              )}
              <iframe
                src={videoSrc}
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          ) : (
            <div style={{
              aspectRatio: "16/9", borderRadius: 14,
              background: "linear-gradient(135deg, #152B52, #0F2347)",
              border: "1px solid rgba(201,168,76,0.1)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
            }}>
              <Tv size={48} color="rgba(201,168,76,0.2)" strokeWidth={1.2} />
              <p style={{ color: "rgba(232,213,163,0.25)", fontSize: 14, fontFamily: "var(--font-inter), sans-serif" }}>
                {ready ? "No stream available" : "Loading…"}
              </p>
            </div>
          )}
        </div>

        {/* Live chat — only shown when live */}
        {isLive && chatSrc && (
          <div style={{ flex: 1, minWidth: 0, minHeight: isMobile ? 420 : "auto" }}>
            <div style={{
              height: "100%",
              minHeight: isMobile ? 420 : 0,
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.1)",
            }}>
              <iframe
                src={chatSrc}
                style={{ width: "100%", height: "100%", minHeight: isMobile ? 420 : "100%", border: "none", display: "block" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Past broadcasts */}
      {videos.length > 0 && (
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: `0 ${px} 80px` }}>
          <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, #D4A520, #FF8C00)", marginBottom: 16 }} />
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
            color: "#f5f0e8", marginBottom: 24,
          }}>
            Past Broadcasts
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(min(${isMobile ? "160px" : "220px"}, 100%), 1fr))`,
            gap: 14,
          }}>
            {videos.map((v) => {
              const isSelected = selected === v.id.videoId;
              return (
                <button
                  key={v.id.videoId}
                  onClick={() => {
                    setSelected(v.id.videoId);
                    selectedRef.current = v.id.videoId;
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    background: "none",
                    border: isSelected ? "1px solid rgba(212,165,32,0.6)" : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                    overflow: "hidden",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                    transition: "border-color 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,165,32,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = isSelected ? "rgba(212,165,32,0.6)" : "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ position: "relative" }}>
                    <img
                      src={v.snippet.thumbnails.medium.url}
                      alt={v.snippet.title}
                      style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(0,0,0,0.35)",
                    }}>
                      <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Play size={16} color="#fff" fill="#fff" />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "10px 12px", background: "#0F2347" }}>
                    <p style={{
                      color: isSelected ? "#D4A520" : "rgba(232,213,163,0.7)",
                      fontSize: 12,
                      fontFamily: "var(--font-inter), sans-serif",
                      lineHeight: 1.45,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      transition: "color 0.2s",
                      marginBottom: 4,
                    } as React.CSSProperties}>
                      {v.snippet.title}
                    </p>
                    <p style={{ color: "rgba(232,213,163,0.28)", fontSize: 11, fontFamily: "var(--font-inter), sans-serif" }}>
                      {new Date(v.snippet.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
