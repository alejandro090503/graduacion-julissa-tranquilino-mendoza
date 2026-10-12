"use client";
import { useT } from "@/lib/i18n";

import { useState } from "react";

export default function MesaRegalos() {
  const t = useT();
  const [envOpen, setEnvOpen] = useState(false);
  return (
    <section style={{ padding: "64px 26px" }}>
      <h2 className="gold-shine" style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.25,
        marginBottom: 16,
        padding: "6px 24px 10px",
        overflow: "visible",
        display: "block",
      }}>
        {t("giftsTitle")}
      </h2>

      {/* Frase intro */}
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 19,
        color: "#0000a0",
        lineHeight: 1.65,
        letterSpacing: 0.4,
        textAlign: "center",
        maxWidth: 360,
        margin: "0 auto 30px",
      }}>
        {t("giftsIntro")}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>

        {/* Lluvia de sobres — sobre interactivo */}
        <div style={{
          width: "100%",
          textAlign: "center",
          padding: "28px 24px",
          background: "linear-gradient(145deg,rgba(0,12,217,0.10),rgba(212,175,55,0.14))",
          borderRadius: 26,
          border: "1px solid rgba(0,12,217,0.22)",
          boxShadow: "0 6px 28px rgba(0,0,160,0.08)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: "10%", right: "10%",
            height: 2,
            background: "linear-gradient(90deg,transparent,#000cd9 30%,#d4af37 70%,transparent)",
            opacity: 0.50,
          }} />

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            <button
              className={`env-interactive${envOpen ? " open" : ""}`}
              aria-label={t("envelopeAria")}
              aria-expanded={envOpen}
              onClick={() => setEnvOpen((o) => !o)}
            >
              <div className="env-body">
                <svg className="env-svg" viewBox="0 0 260 200" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="mg-env-fill" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="#eef1fe" />
                      <stop offset="100%" stopColor="#f7f9ff" />
                    </linearGradient>
                  </defs>
                  <rect x="18" y="52" width="224" height="132" rx="10" fill="url(#mg-env-fill)" stroke="rgba(0,12,217,.35)" strokeWidth="1.4" />
                  <path d="M18 184 L130 110 L242 184" stroke="rgba(0,12,217,.28)" strokeWidth="1" fill="none" />
                  <line x1="90" y1="30" x2="90" y2="20" stroke="#d4af37" strokeWidth="1.3" strokeLinecap="round" opacity=".55" />
                  <line x1="130" y1="24" x2="130" y2="14" stroke="#d4af37" strokeWidth="1.3" strokeLinecap="round" opacity=".7" />
                  <line x1="170" y1="30" x2="170" y2="20" stroke="#d4af37" strokeWidth="1.3" strokeLinecap="round" opacity=".55" />
                  <line x1="110" y1="18" x2="110" y2="10" stroke="#e8c04a" strokeWidth="1" strokeLinecap="round" opacity=".4" />
                  <line x1="150" y1="18" x2="150" y2="10" stroke="#e8c04a" strokeWidth="1" strokeLinecap="round" opacity=".4" />
                  <circle cx="130" cy="118" r="16" fill="rgba(212,175,55,.14)" stroke="rgba(212,175,55,.55)" strokeWidth="1" />
                  <text x="130" y="123" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#0000a0" opacity=".8">J</text>
                </svg>
                <div className="env-flap-wrap" aria-hidden="true">
                  <svg viewBox="0 0 224 86" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                    <defs>
                      <linearGradient id="mg-flap-fill" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#d4af37" />
                        <stop offset="100%" stopColor="#eef1fe" />
                      </linearGradient>
                    </defs>
                    <path d="M0 0 L112 86 L224 0 Z" fill="url(#mg-flap-fill)" stroke="rgba(0,12,217,.35)" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="env-open-content" aria-live="polite">
                <svg className="env-mailbox-icon" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="8" y="22" width="36" height="24" rx="5" />
                  <path d="M8 30 Q26 38 44 30" />
                  <rect x="18" y="8" width="16" height="16" rx="2" />
                  <path d="M18 8 Q26 3 34 8" />
                  <rect x="20" y="28" width="12" height="2.5" rx="1.25" fill="currentColor" stroke="none" opacity=".4" />
                </svg>
                <p className="env-title">{t("envelopeTitle")}</p>
                <p className="env-desc">{t("envelopeLine1")}<br />{t("envelopeLine2")}</p>
              </div>
            </button>
            <p className="env-tap-hint">{t("envelopeHint")}</p>
          </div>
        </div>

        {/* Obsequio de tu Elección */}
        <div style={{
          width: "100%",
          textAlign: "center",
          padding: "28px 24px",
          background: "linear-gradient(145deg,rgba(212,175,55,0.14),rgba(0,12,217,0.10))",
          borderRadius: 26,
          border: "1px solid rgba(166,124,1,0.28)",
          boxShadow: "0 6px 28px rgba(166,124,1,0.10)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: "10%", right: "10%",
            height: 2,
            background: "linear-gradient(90deg,transparent,#d4af37 30%,#000cd9 70%,transparent)",
            opacity: 0.55,
          }} />

          {/* Ícono regalo */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            margin: "0 auto 16px",
            background: "linear-gradient(135deg,rgba(212,175,55,0.28),rgba(0,12,217,0.20))",
            border: "1.5px solid rgba(166,124,1,0.40)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 18px rgba(166,124,1,0.18)",
          }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0000a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Caja regalo */}
              <rect x="3" y="9" width="18" height="12" rx="1" />
              {/* Tapa */}
              <rect x="2" y="6" width="20" height="4" rx="1" />
              {/* Listón vertical */}
              <line x1="12" y1="6" x2="12" y2="21" />
              {/* Moño */}
              <path d="M12 6 C 9 3, 7 5, 8 6 L 12 6" />
              <path d="M12 6 C 15 3, 17 5, 16 6 L 12 6" />
            </svg>
          </div>

          <h3 style={{
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: 38,
            color: "#0000a0",
            marginBottom: 6,
            lineHeight: 1.1,
          }}>
            {t("giftChoiceTitle")}
          </h3>

          <div style={{
            width: 42,
            height: 1,
            margin: "10px auto 12px",
            background: "linear-gradient(90deg,transparent,rgba(166,124,1,0.60),transparent)",
          }} />

          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 18,
            color: "#0000a0",
            lineHeight: 1.55,
            letterSpacing: 0.4,
          }}>
            {t("giftChoiceText")}
          </p>
        </div>

      </div>
    </section>
  );
}
