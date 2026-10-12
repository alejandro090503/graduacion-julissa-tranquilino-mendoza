"use client";
import { useLang } from "@/lib/i18n";

/* ══════════════════════════════════════════════════════════════════
   PENDIENTE: reemplazar por el link real del álbum de Google Drive
   Cambiar SOLO esta línea y regenerar el QR con:
     python scripts/gen-qr-album.py "<URL_REAL>"
   ══════════════════════════════════════════════════════════════════ */
const URL_ALBUM = "https://graduacion-julissa-tranquilino-mendoza.vercel.app";

export default function InstagramSection() {
  const { t, lang } = useLang();
  return (
    <section style={{ padding: "64px 26px" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: 5,
        textTransform: "uppercase",
        color: "#0000a0",
        textAlign: "center",
        marginBottom: 8,
        opacity: 0.9,
      }}>
        {t("albumKicker")}
      </p>
      <h2 style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.1,
        marginBottom: 30,
        background: "linear-gradient(135deg,#0000a0 0%,#000cd9 45%,#d4af37 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {t("albumTitle")}
      </h2>

      <div style={{
        background: "linear-gradient(145deg,rgba(255,255,255,0.85),rgba(252,249,255,0.95))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 26,
        border: "1px solid rgba(0,12,217,0.16)",
        boxShadow: "0 8px 36px rgba(0,0,160,0.09)",
        textAlign: "center",
        overflow: "hidden",
      }}>
        {/* Barra superior */}
        <div style={{
          height: 2,
          background: "linear-gradient(90deg,transparent,#000cd9 30%,#d4af37 70%,transparent)",
          opacity: 0.55,
        }} />

        <div style={{ padding: "34px 26px 32px" }}>
          {/* Mensaje principal */}
          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 18,
            color: "#0000a0",
            lineHeight: 1.6,
            letterSpacing: 0.4,
            marginBottom: 24,
            maxWidth: 320,
            margin: "0 auto 24px",
          }}>
            {t("albumText")}
          </p>

          {/* Caja del QR con marco dorado */}
          {/* PENDIENTE: reemplazar por el link real del álbum de Google Drive
              (constante URL_ALBUM arriba + regenerar /imagenes/qr-album.png) */}
          <div style={{
            display: "inline-block",
            padding: 14,
            background: "#f7f9ff",
            border: "1px solid rgba(166,124,1,0.55)",
            borderRadius: 18,
            boxShadow: "0 4px 22px rgba(166,124,1,0.20), inset 0 0 0 4px rgba(255,255,255,0.7)",
            position: "relative",
            marginBottom: 18,
          }}>
            {/* Esquinas decorativas doradas */}
            {(["tl","tr","bl","br"] as const).map((corner) => {
              const pos: React.CSSProperties =
                corner === "tl" ? { top: -1, left: -1 } :
                corner === "tr" ? { top: -1, right: -1, transform: "rotate(90deg)", transformOrigin: "top right" } :
                corner === "br" ? { bottom: -1, right: -1, transform: "rotate(180deg)", transformOrigin: "bottom right" } :
                                  { bottom: -1, left: -1, transform: "rotate(270deg)", transformOrigin: "bottom left" };
              return (
                <div key={corner} style={{ position: "absolute", ...pos }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M2 2 L2 11" stroke="#a67c01" strokeWidth="1.3" strokeLinecap="round" opacity="0.9"/>
                    <path d="M2 2 L11 2" stroke="#a67c01" strokeWidth="1.3" strokeLinecap="round" opacity="0.9"/>
                    <circle cx="2" cy="2" r="1.8" fill="#a67c01" opacity="1"/>
                  </svg>
                </div>
              );
            })}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/imagenes/qr-album.png"
              alt={t("altQr")}
              width={220}
              height={220}
              style={{ display: "block", borderRadius: 8, width: 220, height: 220 }}
            />
          </div>

          {/* En móvil nadie escanea el QR desde la misma pantalla: link tocable */}
          <div style={{ marginBottom: 22 }}>
            <a
              href={URL_ALBUM}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "13px 30px",
                borderRadius: 999,
                background: "linear-gradient(135deg,#0000a0 0%,#000cd9 100%)",
                color: "#ffffff",
                textDecoration: "none",
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 2.4,
                textTransform: "uppercase",
                boxShadow: "0 6px 20px rgba(0,0,160,0.28)",
              }}
              className="gold-btn"
            >
              {t("albumButton")}
            </a>
          </div>

          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontSize: 15,
            color: "rgba(16,19,46,0.86)",
            letterSpacing: 0.4,
            lineHeight: 1.55,
            marginBottom: 0,
          }}>
            {t("albumFoot")}
          </p>

          <div style={{
            width: 40,
            height: 1,
            margin: "20px auto 14px",
            background: "linear-gradient(90deg,transparent,rgba(0,12,217,0.45),transparent)",
          }} />

          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: 13,
            color: "rgba(16,19,46,0.76)",
            letterSpacing: 1,
            fontStyle: "italic",
          }}>
            {lang === "en" ? "Made with love by" : "Con mucho cariño por"}{" "}
            <a
              href="https://www.instagram.com/elysium.invitaciones"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0008b8", textDecoration: "none", fontWeight: 600 }}
            >
              @elysium.invitaciones
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
