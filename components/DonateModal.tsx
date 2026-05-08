"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

declare global {
  interface Window { Square?: any; }
}

const PRESETS = [10, 20, 50, 100];

function ApplePayLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
    </svg>
  );
}

function GooglePayButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Donate with Google Pay"
      style={{
        width: "100%",
        height: 54,
        background: "#fff",
        border: "1px solid #dadce0",
        borderRadius: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "0 20px",
        opacity: disabled ? 0.5 : 1,
        transition: "opacity 0.15s, box-shadow 0.15s",
        boxSizing: "border-box",
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
    >
      <svg width="22" height="22" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.597 14.272 17.64 11.969 17.64 9.2z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.861-3.048.861-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
        <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.347 2.827.957 4.042l3.007-2.332z"/>
        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
      </svg>
      <span style={{ fontFamily: "Arial, sans-serif", fontSize: 17, fontWeight: 500, color: "#3c4043", letterSpacing: 0.2 }}>
        Google Pay
      </span>
    </button>
  );
}

export default function DonateModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(20);
  const [custom, setCustom] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const cardRef = useRef<any>(null);
  const paymentsRef = useRef<any>(null);
  const [cardReady, setCardReady] = useState(false);
  const [applePayAvailable, setApplePayAvailable] = useState(false);
  const [googlePayAvailable, setGooglePayAvailable] = useState(false);
  const configured = !!(
    process.env.NEXT_PUBLIC_SQUARE_APP_ID &&
    process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
  );

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
    let aborted = false;

    const init = async () => {
      if (!window.Square) return;
      try {
        const payments = await window.Square.payments(
          process.env.NEXT_PUBLIC_SQUARE_APP_ID,
          process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
        );
        if (aborted) return;
        paymentsRef.current = payments;

        if (typeof window !== "undefined" && (window as any).ApplePaySession?.canMakePayments()) {
          setApplePayAvailable(true);
        }

        // Check Google Pay availability
        try {
          const gpTestReq = payments.paymentRequest({
            countryCode: "US", currencyCode: "USD",
            total: { amount: "0.01", label: "Test" },
          });
          await payments.googlePay(gpTestReq);
          if (!aborted) setGooglePayAvailable(true);
        } catch {}

        const card = await payments.card({
          style: {
            ".input-container": { borderColor: "rgba(201,168,76,0.25)", borderRadius: "6px" },
            ".input-container.is-focus": { borderColor: "#D4A520" },
            ".input-container.is-error": { borderColor: "#FF5555" },
            input: { backgroundColor: "#0B1D3A", color: "#F0D060", fontFamily: "sans-serif" },
            "input::placeholder": { color: "rgba(232,213,163,0.3)" },
            ".message-text": { color: "rgba(232,213,163,0.45)" },
            ".message-text.is-error": { color: "#FF5555" },
          },
        });
        if (aborted) { card.destroy(); return; }
        await card.attach("#sq-card");
        if (aborted) { card.destroy(); return; }
        cardRef.current = card;
        setCardReady(true);
      } catch (e) {
        if (!aborted) console.error("Square init error:", e);
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

    return () => {
      aborted = true;
      cardRef.current?.destroy?.();
      cardRef.current = null;
      const el = document.getElementById("sq-card");
      if (el) el.innerHTML = "";
    };
  }, [configured]);

  const finalAmount = useCustom ? parseFloat(custom) || 0 : selected;

  const handleApplePay = async () => {
    if (!paymentsRef.current || finalAmount <= 0 || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const request = paymentsRef.current.paymentRequest({
        countryCode: "US",
        currencyCode: "USD",
        total: { amount: finalAmount.toFixed(2), label: "Gurdwara Nanaksar Fresno Donation" },
      });
      const applePay = await paymentsRef.current.applePay(request);
      const result = await applePay.tokenize();
      if (result.status !== "OK" || !result.token) {
        throw new Error(result.errors?.[0]?.message || "Apple Pay failed.");
      }
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceId: result.token, amount: finalAmount }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Payment failed");
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Apple Pay failed. Please try again.");
      setStatus("error");
    }
  };

  const handleGooglePay = async () => {
    if (!paymentsRef.current || finalAmount <= 0 || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const request = paymentsRef.current.paymentRequest({
        countryCode: "US",
        currencyCode: "USD",
        total: { amount: finalAmount.toFixed(2), label: "Gurdwara Nanaksar Fresno Donation" },
      });
      const googlePay = await paymentsRef.current.googlePay(request);
      const result = await googlePay.tokenize();
      if (result.status !== "OK" || !result.token) {
        throw new Error(result.errors?.[0]?.message || "Google Pay failed.");
      }
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceId: result.token, amount: finalAmount }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Payment failed");
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Google Pay failed. Please try again.");
      setStatus("error");
    }
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
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
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Payment failed. Please try again.");
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

  const hasWallets = applePayAvailable || googlePayAvailable;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        style={{ background: "linear-gradient(145deg, #152B52, #0F2347)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 20, padding: 40, width: "100%", maxWidth: 460, position: "relative", maxHeight: "90vh", overflowY: "auto" }}
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
                Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh!
              </h3>
              <p style={{ color: "rgba(232,213,163,0.55)", fontFamily: "var(--font-inter), sans-serif", fontSize: 14, lineHeight: 1.7 }}>
                Your donation of <strong style={{ color: "#D4A520" }}>${finalAmount}</strong> has been received.<br />
                Thank you for your seva.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form">
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
              <div style={{ marginBottom: 24 }}>
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

              {/* Wallet buttons */}
              {hasWallets && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                    {applePayAvailable && (
                      <>
                        <style>{`
                          .apple-pay-btn {
                            -webkit-appearance: -apple-pay-button;
                            -apple-pay-button-type: donate;
                            -apple-pay-button-style: black;
                            width: 100%;
                            height: 54px;
                            border-radius: 8px;
                            border: none;
                            cursor: pointer;
                            display: block;
                          }
                          .apple-pay-btn:disabled { opacity: 0.5; cursor: not-allowed; }
                        `}</style>
                        <button
                          className="apple-pay-btn"
                          type="button"
                          onClick={handleApplePay}
                          disabled={finalAmount <= 0 || status === "loading"}
                          aria-label="Donate with Apple Pay"
                        />
                      </>
                    )}
                    {googlePayAvailable && (
                      <GooglePayButton
                        onClick={handleGooglePay}
                        disabled={finalAmount <= 0 || status === "loading"}
                      />
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.15)" }} />
                    <span style={{ color: "rgba(232,213,163,0.3)", fontSize: 11, fontFamily: "var(--font-inter), sans-serif" }}>or pay with card</span>
                    <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.15)" }} />
                  </div>
                </div>
              )}

              {/* Square card element */}
              <form onSubmit={handleCardSubmit}>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ color: "#D4A520", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, fontFamily: "var(--font-inter), sans-serif", display: "block", marginBottom: 8 }}>
                    Card Details
                  </label>
                  <div
                    id="sq-card"
                    style={{ minHeight: 90, background: "#0B1D3A", borderRadius: 8, border: "1px solid rgba(201,168,76,0.2)", padding: "2px" }}
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
                    background: (status === "loading" || !cardReady || finalAmount <= 0) ? "rgba(212,165,32,0.35)" : "#D4A520",
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
              </form>

              <p style={{ color: "rgba(232,213,163,0.25)", fontSize: 11, textAlign: "center", marginTop: 14, fontFamily: "var(--font-inter), sans-serif" }}>
                Secured by Square &nbsp;·&nbsp; 501(c)(3) tax-deductible
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>,
    document.body
  );
}
