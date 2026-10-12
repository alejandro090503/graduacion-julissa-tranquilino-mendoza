"use client";
import { useState } from "react";
import { useLang, type Lang } from "@/lib/i18n";

/**
 * Primera pantalla de la invitación: elección de idioma.
 * Se muestra solo si el invitado no ha elegido antes (localStorage).
 */
export default function LanguageGate({ onPick }: { onPick?: (l: Lang) => void }) {
  const { setLang } = useLang();
  const [leaving, setLeaving] = useState(false);

  const pick = (l: Lang) => {
    if (leaving) return;
    setLeaving(true);
    setLang(l);
    setTimeout(() => onPick?.(l), 420);
  };

  const optionStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    minHeight: 62,
    padding: "18px 26px",
    borderRadius: 40,
    cursor: "pointer",
    touchAction: "manipulation",
    fontFamily: "var(--font-cormorant), serif",
    fontWeight: 700,
    fontSize: 20,
    letterSpacing: 4,
    textIndent: 4,
    textTransform: "uppercase",
    color: "#00006e",
    background: "rgba(255,255,255,0.88)",
    border: "1.5px solid rgba(212,175,55,0.62)",
    boxShadow: "0 6px 22px rgba(0,0,160,0.18)",
    transition: "transform .25s ease, box-shadow .25s ease",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10001,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 26px",
        background: "linear-gradient(160deg,#f7f9ff 0%,#d6dcff 52%,#f7f9ff 100%)",
        opacity: leaving ? 0 : 1,
        transition: "opacity .42s ease",
      }}
    >
      <div style={{ width: "100%", maxWidth: 340, textAlign: "center" }}>
        {/* Monograma */}
        <div
          style={{
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: 72,
            lineHeight: 1,
            background: "linear-gradient(135deg,#000cd9 0%,#d4af37 50%,#0000a0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 6,
          }}
        >
          M
        </div>

        {/* Hairline dorado */}
        <div
          style={{
            width: 120,
            height: 1,
            margin: "0 auto 26px",
            background: "linear-gradient(90deg,transparent,#d4af37,transparent)",
            opacity: 0.75,
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 19,
            letterSpacing: 1,
            color: "#00006e",
            margin: "0 0 4px",
          }}
        >
          Elige tu idioma
        </p>
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontSize: 16,
            letterSpacing: 1,
            color: "rgba(74,26,94,0.72)",
            margin: "0 0 30px",
          }}
        >
          Choose your language
        </p>

        <button
          type="button"
          onClick={() => pick("es")}
          aria-label="Ver la invitación en español"
          style={{ ...optionStyle, marginBottom: 16 }}
        >
          Español
        </button>

        <button
          type="button"
          onClick={() => pick("en")}
          aria-label="View the invitation in English"
          style={optionStyle}
        >
          English
        </button>

        <div
          style={{
            width: 76,
            height: 1,
            margin: "30px auto 0",
            background: "linear-gradient(90deg,transparent,#d4af37,transparent)",
            opacity: 0.55,
          }}
        />
      </div>
    </div>
  );
}
