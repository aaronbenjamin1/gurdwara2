"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

declare global {
  interface Window { Square?: any; }
}

const PRESETS = [25, 50, 108, 251];

export default function DonateModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(50);
  const [custom, setCustom] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const cardRef = useRef<any>(null);
  const [cardReady, setCardReady] = useState(false);
  const configured = !!(
    process.env.NEXT_PUBLIC_SQUARE_APP_ID &&
    process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
  );

  // Lock body scroll while modal is open
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  useEffect(() => {
    if (!configured) return;

    const init = async () => {
      if (!window.Square) return;
      try {
        const payments = await window.Square.payments(
          process.env.NEXT_PUBLIC_SQUARE_APP_ID,
          process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
        );
        const card = await payments.card({
          style: {
            ".input-container": {
              borderColor: "rgba(201,168,76,0.25)",
              borderRadius: "6px",
            },
            ".input-container.is-focus": { borderColor: "#D4A520" },
            ".input-container.is-error": { borderColor: "#FF5555" },
            input: { backgroundColor: "#0B1D3A", color: "#F0D060", fontFamily: "sans-serif" },
            "input::placeholder": { color: "rgba(232,213,163,0.3)" },
            ".message-text": { color: "rgba(232,213,163,0.45)" },
            ".message-text.is-error": { color: "#FF5555" },
          },
        });
        await card.attach("#sq-card");
        cardRef.current = card;
        setCardReady(true);
      } catch (e) {
        console.error("Square init error:", e);
      }
    };

    const isSandbox = process.env.NEXT_PUBLIC_SQUARE_APP_ID?.startsWith("sandbox-");
    const sdkUrl = isSandbox
      ? "https://sandbox.web.squarecdn.com/v1/square.js"
      : "https://web.squarecdn.com/v1/square.js";

    if (window.Square) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = sdkUrl;
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => { cardRef.current?.destroy?.(); };
  }, [configured]);

  const finalAmount = useCustom ? parseFloat(custom) || 0 : selected;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardRef.current || finalAmount <= 0 || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const result = await cardRef.current.tokenize();
      if (result.status !== "OK" || !result.token) {
        setErrorMsg(result.errors?.[0]?.message || "Card error. Please try again.");
        setStatus("error");
        return;
      }

      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceId: result.token, amount: finalAmount }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Payment failed");

      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Payment failed. Please try again.");
      setStatus("error");
    }
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#0B1D3A",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: 8,
    padding: "12px 16px",
    color: "#F0D060",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
  };

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.9)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "linear-gradient(145deg, #152B52, #0F2347)",
          border: "1px solid rgba(201,168,76,0.2)",
          borderRadius: 20,
          padding: 40,
          width: "100%",
          maxWidth: 460,
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "rgba(232,213,163,0.35)", lineHeight: 1 }}
        >
          <X size={20} />
        </button>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "32px 0" }}
            >
              <CheckCircle size={52} color="#D4A520" style={{ margin: "0 auto 20px" }} />
              <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 24, color: "#f5f0e8", marginBottom: 10 }}>
                Waheguru Ji Ka Khalsa!
              </h3>
              <p style={{ color: "rgba(232,213,163,0.55)", fontFamily: "var(--font-inter), sans-serif", fontSize: 14, lineHeight: 1.7 }}>
                Your donation of <strong style={{ color: "#D4A520" }}>${finalAmount}</strong> has been received.<br />
                Thank you for your seva.
              </p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit}>
              <p style={{ color: "#D4A520", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif", marginBottom: 6 }}>
                Donate Online
              </p>
              <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 24, color: "#f5f0e8", marginBottom: 28 }}>
                Choose an Amount
              </h3>

              {/* Preset amounts */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
                {PRESETS.map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelected(amt); setUseCustom(false); }}
                    style={{
                      padding: "12px 0",
                      borderRadius: 8,
                      border: !useCustom && selected === amt ? "1px solid #D4A520" : "1px solid rgba(201,168,76,0.2)",
                      background: !useCustom && selected === amt ? "rgba(212,165,32,0.12)" : "rgba(255,255,255,0.02)",
                      color: !useCustom && selected === amt ? "#D4A520" : "rgba(232,213,163,0.55)",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div style={{ marginBottom: 28 }}>
                <input
                  type="number"
                  placeholder="Other amount ($)"
                  value={custom}
                  min="1"
                  step="1"
                  onChange={e => { setCustom(e.target.value); setUseCustom(true); }}
                  onFocus={() => setUseCustom(true)}
                  style={{
                    ...inputStyle,
                    border: useCustom ? "1px solid #D4A520" : "1px solid rgba(201,168,76,0.2)",
                    background: useCustom ? "rgba(212,165,32,0.06)" : "#0B1D3A",
                  }}
                />
              </div>

              {/* Square card element */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ color: "#D4A520", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, fontFamily: "var(--font-inter), sans-serif", display: "block", marginBottom: 8 }}>
                  Card Details
                </label>
                <div
                  id="sq-card"
                  style={{
                    minHeight: 90,
                    background: "#0B1D3A",
                    borderRadius: 8,
                    border: "1px solid rgba(201,168,76,0.2)",
                    padding: "2px",
                  }}
                />
                {!cardReady && (
                  <p style={{ color: "rgba(232,213,163,0.28)", fontSize: 12, fontFamily: "var(--font-inter), sans-serif", marginTop: 8 }}>
                    {configured ? "Loading secure card form…" : "Square not yet configured — contact the site admin."}
                  </p>
                )}
              </div>

              {errorMsg && (
                <p style={{ color: "#FF6666", fontSize: 13, fontFamily: "var(--font-inter), sans-serif", marginBottom: 16 }}>
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !cardReady || finalAmount <= 0}
                style={{
                  width: "100%",
                  background: (status === "loading" || !cardReady || finalAmount <= 0)
                    ? "rgba(212,165,32,0.35)"
                    : "#D4A520",
                  color: "#0B1D3A",
                  padding: "16px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontSize: 13,
                  fontFamily: "var(--font-inter), sans-serif",
                  border: "none",
                  borderRadius: 8,
                  cursor: (status === "loading" || !cardReady || finalAmount <= 0) ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                }}
              >
                {status === "loading" ? "Processing…" : `Donate $${finalAmount}`}
              </button>

              <p style={{ color: "rgba(232,213,163,0.25)", fontSize: 11, textAlign: "center", marginTop: 14, fontFamily: "var(--font-inter), sans-serif" }}>
                Secured by Square &nbsp;·&nbsp; 501(c)(3) tax-deductible
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>,
    document.body
  );
}
