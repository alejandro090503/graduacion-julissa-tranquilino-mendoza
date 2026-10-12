"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

/** Esquina ornamental */
function CornerOrnament({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const rot = { tl: "0deg", tr: "90deg", br: "180deg", bl: "270deg" }[pos];
  const placement: React.CSSProperties =
    pos === "tl" ? { top: -1, left: -1 } :
    pos === "tr" ? { top: -1, right: -1, transform: `rotate(${rot})`, transformOrigin: "top right" } :
    pos === "br" ? { bottom: -1, right: -1, transform: `rotate(${rot})`, transformOrigin: "bottom right" } :
                   { bottom: -1, left: -1, transform: `rotate(${rot})`, transformOrigin: "bottom left" };
  const base: React.CSSProperties = pos === "tl"
    ? { position: "absolute", transform: `rotate(${rot})`, transformOrigin: "top left" }
    : { position: "absolute" };

  return (
    <div style={{ ...base, ...placement }}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M1 1 L1 17" stroke="#d4af37" strokeWidth="1"   opacity="0.85" strokeLinecap="round" />
        <path d="M1 1 L17 1" stroke="#d4af37" strokeWidth="1"   opacity="0.85" strokeLinecap="round" />
        <path d="M5 5 L5 13" stroke="#d4af37" strokeWidth="0.5" opacity="0.45" strokeLinecap="round" />
        <path d="M5 5 L13 5" stroke="#d4af37" strokeWidth="0.5" opacity="0.45" strokeLinecap="round" />
        <circle cx="1"  cy="1"  r="2"   fill="#d4af37" opacity="0.95" />
        <circle cx="1"  cy="17" r="0.9" fill="#d4af37" opacity="0.55" />
        <circle cx="17" cy="1"  r="0.9" fill="#d4af37" opacity="0.55" />
        <circle cx="5"  cy="5"  r="1.2" fill="#d4af37" opacity="0.65" />
      </svg>
    </div>
  );
}

/** Separador ornamental con diamante hueco */
function OrnamentBar() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "center", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
        <div style={{ flex: 1, height: 0.5, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.65))" }} />
        <svg width="5" height="5" viewBox="0 0 5 5">
          <rect width="5" height="5" fill="#d4af37" transform="rotate(45 2.5 2.5)" opacity="0.70" />
        </svg>
        <svg width="11" height="11" viewBox="0 0 11 11">
          <rect x="1.5" y="1.5" width="8" height="8" fill="#d4af37" transform="rotate(45 5.5 5.5)" opacity="0.95" />
          <rect x="3.5" y="3.5" width="4" height="4" fill="#0a1550" transform="rotate(45 5.5 5.5)" />
          <rect x="4.5" y="4.5" width="2" height="2" fill="#d4af37" transform="rotate(45 5.5 5.5)" opacity="0.80" />
        </svg>
        <svg width="5" height="5" viewBox="0 0 5 5">
          <rect width="5" height="5" fill="#d4af37" transform="rotate(45 2.5 2.5)" opacity="0.70" />
        </svg>
        <div style={{ flex: 1, height: 0.5, background: "linear-gradient(90deg, rgba(212,175,55,0.65), transparent)" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
        <div style={{ flex: 1, height: 0.4, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.30))" }} />
        <div style={{ width: 21 }} />
        <div style={{ flex: 1, height: 0.4, background: "linear-gradient(90deg, rgba(212,175,55,0.30), transparent)" }} />
      </div>
    </div>
  );
}

function MicroBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "8px 0 10px" }}>
      <div style={{ width: 22, height: 0.5, background: "rgba(212,175,55,0.55)" }} />
      <svg width="5" height="5" viewBox="0 0 5 5">
        <rect width="5" height="5" fill="#d4af37" transform="rotate(45 2.5 2.5)" opacity="0.80" />
      </svg>
      <div style={{ width: 22, height: 0.5, background: "rgba(212,175,55,0.55)" }} />
    </div>
  );
}

function TopOrnamentLine() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "0 36px", marginBottom: 14 }}>
      <div style={{ flex: 1, height: 0.5, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.55))" }} />
      <svg width="5" height="5"  viewBox="0 0 5 5"><rect width="5" height="5" fill="#d4af37" transform="rotate(45 2.5 2.5)" opacity="0.75"/></svg>
      <div style={{ width: 14, height: 0.5, background: "rgba(212,175,55,0.55)" }} />
      <svg width="8" height="8"  viewBox="0 0 8 8"><rect x="1" y="1" width="6" height="6" fill="#d4af37" transform="rotate(45 4 4)" opacity="0.95"/></svg>
      <div style={{ width: 14, height: 0.5, background: "rgba(212,175,55,0.55)" }} />
      <svg width="5" height="5"  viewBox="0 0 5 5"><rect width="5" height="5" fill="#d4af37" transform="rotate(45 2.5 2.5)" opacity="0.75"/></svg>
      <div style={{ flex: 1, height: 0.5, background: "linear-gradient(90deg, rgba(212,175,55,0.55), transparent)" }} />
    </div>
  );
}

/* Linternas flotantes: guiño a la torre, en versión sobria */
const LANTERNS = [
  { left: "6%",  w: 13, dur: 22, del: 0,  op: 0.85 },
  { left: "18%", w: 8,  dur: 28, del: 6,  op: 0.55 },
  { left: "30%", w: 11, dur: 25, del: 12, op: 0.75 },
  { left: "45%", w: 7,  dur: 30, del: 3,  op: 0.5 },
  { left: "61%", w: 12, dur: 24, del: 9,  op: 0.8 },
  { left: "73%", w: 8,  dur: 27, del: 15, op: 0.6 },
  { left: "85%", w: 14, dur: 23, del: 4,  op: 0.9 },
  { left: "93%", w: 7,  dur: 29, del: 18, op: 0.5 },
  { left: "2%",  w: 9,  dur: 26, del: 20, op: 0.65 },
];

/** Birrete en línea dorada */
function GradCap() {
  return (
    <svg width="78" height="60" viewBox="0 0 74 58" fill="none" aria-hidden="true" style={{ display: "block", margin: "0 auto" }}>
      <defs>
        <linearGradient id="capGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e3a1" />
          <stop offset=".5" stopColor="#d4af37" />
          <stop offset="1" stopColor="#b08a35" />
        </linearGradient>
      </defs>
      <path d="M37 6 L70 20 L37 34 L4 20 Z" stroke="url(#capGold)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M17 26 V39 C24 46 50 46 57 39 V26" stroke="url(#capGold)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M37 20 L62 24 V40" stroke="url(#capGold)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M62 40 L59 50 H65 Z" fill="url(#capGold)" />
      <circle cx="37" cy="20" r="1.8" fill="url(#capGold)" />
    </svg>
  );
}

/** Sol de la torre en filigrana dorada, muy tenue detrás del marco */
function SunEmblem() {
  const rays = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg className="hero-sun" viewBox="0 0 200 200" width="430" height="430" aria-hidden="true"
      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-52%)", opacity: 0.14, animation: "sunSpin 140s linear infinite", pointerEvents: "none" }}>
      <circle cx="100" cy="100" r="34" stroke="#d4af37" strokeWidth="0.8" fill="none" />
      <circle cx="100" cy="100" r="28" stroke="#d4af37" strokeWidth="0.4" fill="none" />
      {rays.map((r, i) => (
        <path key={r} transform={`rotate(${r} 100 100)`}
          d={i % 2 ? "M100 64 Q104 50 100 34 Q96 50 100 64" : "M100 64 Q107 42 100 12 Q93 42 100 64"}
          stroke="#d4af37" strokeWidth="0.7" fill="none" />
      ))}
    </svg>
  );
}

export default function Hero() {
  const nameRef  = useRef<HTMLHeadingElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const xvRef    = useRef<HTMLDivElement>(null);
  const dateRef  = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const [persona, setPersona] = useState<{ para: string } | null>(null);

  useEffect(() => {
    const para = new URLSearchParams(window.location.search).get("para");
    if (para) setPersona({ para });
  }, []);

  useEffect(() => {
    const schedule = [
      { el: nameRef,  delay: 480,  styles: { opacity: "1", transform: "translateY(0) scale(1)" } },
      { el: frameRef, delay: 820,  styles: { opacity: "1", transform: "scaleY(1)" } },
      { el: xvRef,    delay: 1100, styles: { opacity: "1", transform: "translateY(0)" } },
      { el: dateRef,  delay: 1380, styles: { opacity: "1", transform: "translateY(0)" } },
    ];
    const timers = schedule.map(({ el, delay, styles }) =>
      setTimeout(() => { if (el.current) Object.assign(el.current.style, styles); }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const cream = "#f4ecd8";
  const eyebrow: React.CSSProperties = {
    fontFamily: "var(--font-cormorant), serif",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 5,
    textIndent: 5,
    textTransform: "uppercase",
    color: "#e6c870",
  };

  return (
    <section style={{
      position: "relative",
      width: "100%",
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(ellipse 120% 80% at 50% 30%, #14256e 0%, #0a1550 45%, #050b30 100%)",
      overflow: "hidden",
      padding: "64px 0 64px",
      isolation: "isolate",
    }}>
      {/* Cielo estrellado */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.85,
        backgroundImage: [
          "radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,.6) 50%, transparent 51%)",
          "radial-gradient(1px 1px at 72% 9%, rgba(255,255,255,.65) 50%, transparent 51%)",
          "radial-gradient(1.5px 1.5px at 38% 27%, #f6e3a1 50%, transparent 51%)",
          "radial-gradient(1px 1px at 88% 34%, rgba(255,255,255,.5) 50%, transparent 51%)",
          "radial-gradient(1px 1px at 22% 62%, rgba(255,255,255,.45) 50%, transparent 51%)",
          "radial-gradient(1.5px 1.5px at 64% 74%, #f6e3a1 50%, transparent 51%)",
          "radial-gradient(1px 1px at 52% 46%, rgba(255,255,255,.4) 50%, transparent 51%)",
          "radial-gradient(1px 1px at 6% 86%, rgba(255,255,255,.55) 50%, transparent 51%)",
          "radial-gradient(1px 1px at 94% 82%, rgba(255,255,255,.5) 50%, transparent 51%)",
          "radial-gradient(1px 1px at 30% 92%, rgba(255,255,255,.4) 50%, transparent 51%)",
        ].join(","),
      }} />
      {/* Halo dorado central */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% 52%, rgba(212,175,55,0.15) 0%, transparent 70%)",
      }} />

      <SunEmblem />

      {LANTERNS.map((l, i) => (
        <div key={i} className="hero-lantern" aria-hidden="true" style={{
          position: "absolute", bottom: -40, left: l.left,
          width: l.w, height: Math.round(l.w * 1.35), borderRadius: "35% 35% 28% 28%",
          background: "linear-gradient(180deg, #ffe7a3 0%, #f2b84b 55%, #c9832a 100%)",
          boxShadow: `0 0 ${l.w * 1.4}px ${l.w * 0.5}px rgba(255,190,90,0.42)`,
          opacity: l.op,
          animation: `lanternRise ${l.dur}s ${-l.del}s linear infinite`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Eyebrow + nombre */}
      <div style={{ width: "100%", textAlign: "center", position: "relative" }}>
        <p style={{ ...eyebrow, marginBottom: 10 }}>Generación 2023 · 2027</p>
        <TopOrnamentLine />
        <h1 ref={nameRef} className="gold-shine gold-shine-hero gold-shine-cierre" style={{
          fontFamily: "var(--font-great-vibes), cursive",
          fontWeight: 400,
          fontSize: "min(25vw, 116px)",
          lineHeight: 1.2,
          margin: 0,
          paddingTop: 4,
          paddingBottom: 4,
          opacity: 0,
          transform: "translateY(22px) scale(0.97)",
          transition: "opacity 0.95s ease, transform 0.95s ease",
          whiteSpace: "nowrap",
        }}>
          Julissa
        </h1>
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: 6,
          textIndent: 6,
          textTransform: "uppercase",
          color: cream,
          marginTop: 2,
        }}>
          Tranquilino Mendoza
        </p>
      </div>

      {/* Marco */}
      <div style={{ width: "100%", maxWidth: 360, padding: "0 24px", marginTop: 30, position: "relative" }}>
        <div ref={frameRef} style={{
          position: "relative",
          border: "1px solid rgba(212,175,55,0.7)",
          borderRadius: 2,
          background: "linear-gradient(180deg, rgba(10,21,80,0.55), rgba(5,11,48,0.72))",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: 0,
          transform: "scaleY(0.94)",
          transition: "opacity 0.85s ease, transform 0.85s ease",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}>
          <div style={{ position: "absolute", inset: 5, border: "0.5px solid rgba(212,175,55,0.38)", pointerEvents: "none" }} />
          <CornerOrnament pos="tl" />
          <CornerOrnament pos="tr" />
          <CornerOrnament pos="bl" />
          <CornerOrnament pos="br" />

          <div style={{ padding: "30px 26px 28px", textAlign: "center" }}>
            <div ref={xvRef} style={{ opacity: 0, transform: "translateY(18px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}>
              <GradCap />
              <div style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(30px, 8.5vw, 38px)",
                lineHeight: 1.25,
                color: cream,
                marginTop: 12,
              }}>
                Save the Date
              </div>
              <MicroBar />
              <div style={{ ...eyebrow, fontSize: 13, letterSpacing: 4, textIndent: 4 }}>
                Graduación · Prepa 2027
              </div>
            </div>

            <div style={{ margin: "20px 0 16px" }}>
              <OrnamentBar />
            </div>

            <div ref={dateRef} style={{ opacity: 0, transform: "translateY(10px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}>
              <span style={{
                display: "inline-block",
                padding: "8px 24px",
                border: "1px solid rgba(212,175,55,0.6)",
                borderRadius: 40,
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: 3,
                color: cream,
              }}>
                {t("heroDate")}
              </span>

              {persona && (
                <p style={{
                  marginTop: 20,
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: cream,
                }}>
                  {t("heroForYou")}
                  <br />
                  <strong style={{ fontStyle: "normal", fontWeight: 700, fontSize: 21, letterSpacing: 1, color: "#e6c870" }}>
                    {persona.para}
                  </strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", animation: "hintFloat 3s ease-in-out infinite" }}>
        <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.8))" }} />
      </div>
    </section>
  );
}
