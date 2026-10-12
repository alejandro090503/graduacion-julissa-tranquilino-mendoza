"use client";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t, lang, setLang } = useLang();
  return (
    <footer style={{ padding: "50px 20px", textAlign: "center" }}>
      <div style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 200,
        lineHeight: 1.4,
        background: "linear-gradient(135deg,#000cd9 0%,#d4af37 50%,#0000a0 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        padding: "28px 60px 28px 48px",
        filter: "drop-shadow(0 4px 22px rgba(0,12,217,0.30))",
        overflow: "visible",
        display: "inline-block",
      }}>
        J
      </div>
      <div style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: 15,
        letterSpacing: 4,
        textTransform: "uppercase",
        color: "#0008b8",
        marginTop: 6,
      }}>
        {t("footerDate")}
      </div>
      <div style={{
        width: 48,
        height: 1,
        margin: "18px auto 14px",
        background: "linear-gradient(90deg,transparent,#000cd9,transparent)",
        opacity: 0.35,
      }} />
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontSize: 13,
        color: "rgba(16,19,46,0.68)",
        letterSpacing: 1,
      }}>
        {lang === "en" ? "Made with love by" : "Con mucho cariño por"}{" "}
        <a
          href="https://www.instagram.com/elysium.invitaciones"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0008b8", textDecoration: "none" }}
        >
          @elysium.invitaciones
        </a>
      </p>

      {/* Toggle de idioma */}
      <div
        role="group"
        aria-label={t("langToggleAria")}
        style={{
          display: "none", // solo español
          marginTop: 22,
          borderRadius: 30,
          overflow: "hidden",
          border: "1px solid rgba(212,175,55,0.55)",
          background: "rgba(255,255,255,0.72)",
        }}
      >
        {(["es", "en"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            aria-label={l === "es" ? "Ver la invitación en español" : "View the invitation in English"}
            style={{
              minWidth: 62,
              minHeight: 44,
              padding: "10px 18px",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 2,
              color: lang === l ? "#FFFFFF" : "#0000a0",
              background: lang === l ? "linear-gradient(135deg,#000cd9,#0000a0)" : "transparent",
              transition: "background .25s, color .25s",
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </footer>
  );
}
