"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useT, type TKey } from "@/lib/i18n";

/**
 * Iconos: Material Design Icons (MDI, Apache 2.0), servidos por Iconify.
 * Se descargaron los trazos reales del set — no hay dibujo a mano.
 */
const ICONOS: Record<string, React.ReactNode> = {
  church: (
    <path d="M18 12.22V9l-5-2.5V5h2V3h-2V1h-2v2H9v2h2v1.5L6 9v3.22L2 14v8h8v-3c0-1.1.9-2 2-2s2 .9 2 2v3h8v-8zm-6 1.28c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5" />
  ),
  cutlery: (
    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4" />
  ),
  waltz: (
    <path d="M14 3.5c0 .83-.67 1.5-1.5 1.5S11 4.33 11 3.5S11.67 2 12.5 2s1.5.67 1.5 1.5M8.5 5C7.67 5 7 5.67 7 6.5S7.67 8 8.5 8S10 7.33 10 6.5S9.33 5 8.5 5m5.5 7l-.78-2.25h2.96l2.16-1.08c.37-.17.52-.63.33-1a.737.737 0 0 0-1-.34l-.82.41l-.49-.84c-.29-.65-1-1.02-1.7-.86l-2.47.53c-.69.15-1.19.78-1.19 1.5v.7l-2.43 1.62h.01c-.08.07-.19.16-.25.28l-.89 1.77l-1.78.89c-.37.17-.52.64-.33 1.01a.753.753 0 0 0 1.01.33l2.22-1.11L9.6 11.5L11 13c-1 3-8 7-8 7s4 2 9 2s9-2 9-2s-5-4-7-8m2.85-.91l-.32.16h-1.2l.06.16c.52 1.03 1.28 2.09 2.11 3.03l-.53-3.41z" />
  ),
  cap: (
    <path d="M12 3L1 9l11 6l9-4.91V17h2V9zM5 13.18v4L12 21l7-3.82v-4L12 17z" />
  ),
  toast: (
    <path d="M7.5 2L4 2.9l1.2 5.4c.3 1.6 1.8 2.6 3.4 2.4l1.6 4.9L8 16.4l.4 1.1l5.1-1.7l-.4-1.1l-2 .6l-1.6-4.8c1.3-.8 1.9-2.3 1.5-3.8zm9 0l-3.4.6l-.5 5.4c-.2 1.6.9 3 2.5 3.3l-.4 5.1l-2.1-.2l-.1 1.2l5.4.4l.1-1.2l-2.1-.2l.4-5.1c1.5-.3 2.6-1.6 2.6-3.2z" />
  ),
  party: (
    <path d="m14.53 1.45l-1.08 1.08l1.6 1.6q.33.375.33.87c0 .495-.11.64-.33.86L11.5 9.47l1 1.08l3.63-3.61c.53-.59.79-1.24.79-1.94s-.26-1.36-.79-1.95zm-3.98 2.02L9.47 4.55l.61.56c.22.22.33.52.33.89s-.11.67-.33.89l-.61.56l1.08 1.08l.56-.61c.53-.59.8-1.23.8-1.92c0-.72-.27-1.37-.8-1.97zM21 5.06c-.69 0-1.33.27-1.92.8l-5.63 5.64l1.08 1l5.58-5.56c.25-.25.55-.38.89-.38s.64.13.89.38l.61.61l1.03-1.08l-.56-.61c-.59-.53-1.25-.8-1.97-.8M7 8L2 22l14-5zm12 3.06c-.7 0-1.34.27-1.94.8l-1.59 1.59l1.08 1.08l1.59-1.59c.25-.25.53-.38.86-.38s.63.13.88.38l1.62 1.59l1.05-1.03l-1.6-1.64c-.59-.53-1.25-.8-1.95-.8" />
  ),
};

const ITEMS: { time: string; key: TKey; gem: number; icon: string; alt: TKey }[] = [
  { time: "7:00 pm", key: "itMass", gem: 0, icon: "cap", alt: "itMassIcon" },
  { time: "8:00 pm", key: "itDinner", gem: 1, icon: "cutlery", alt: "itDinnerIcon" },
  { time: "9:00 pm", key: "itWaltz", gem: 2, icon: "toast", alt: "itWaltzIcon" },
  { time: "9:30 pm", key: "itDance", gem: 0, icon: "party", alt: "itDanceIcon" },
];

const GEM_COLORS = [
  { bg: "linear-gradient(135deg,#c4ccfa 30%,#0000a0)", shadow: "0 0 0 4px rgba(0,12,217,0.10),0 0 18px rgba(0,12,217,0.40)" },
  { bg: "linear-gradient(135deg,#d4af37 30%,#b8930a)", shadow: "0 0 0 4px rgba(212,175,55,0.12),0 0 18px rgba(212,175,55,0.42)" },
  { bg: "linear-gradient(135deg,#9fb0f5 30%,#000cd9)", shadow: "0 0 0 4px rgba(159,176,245,0.12),0 0 18px rgba(159,176,245,0.42)" },
];

/* Orbe que sigue el scroll a través de la sección */
function GlowOrb({ trackRef }: { trackRef: React.RefObject<HTMLDivElement | null> }) {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current;
      const orb = orbRef.current;
      if (!track || !orb) return;

      const rect = track.getBoundingClientRect();
      const viewH = window.innerHeight;
      // progreso: 0 cuando la sección entra por abajo, 1 cuando sale por arriba
      const start = viewH * 0.58;
      const end = viewH * 0.42;
      const rawProgress = (start - rect.top) / (rect.height + start - end);
      const progress = Math.max(0, Math.min(1, rawProgress));
      const maxTop = track.offsetHeight - 55;
      // transform en vez de `top`: sin reflow, va por el compositor
      orb.style.transform = `translate3d(-50%, ${progress * maxTop}px, 0)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [trackRef]);

  return (
    <div
      ref={orbRef}
      style={{
        position: "absolute",
        left: "50%",
        transform: "translate3d(-50%,0,0)",
        top: 0,
        width: 5,
        height: 110,
        willChange: "transform",
        background: "linear-gradient(to bottom,transparent,rgba(159,176,245,0.65) 20%,rgba(0,12,217,0.90) 50%,rgba(196,204,250,0.65) 80%,transparent)",
        filter: "blur(3px)",
        borderRadius: 6,
        zIndex: 1,
        pointerEvents: "none",
        transition: "transform 0.12s cubic-bezier(0.22,0.61,0.36,1)",
      }}
    />
  );
}

function ItinerarioItem({
  time,
  event,
  gemIdx,
  delay,
  icon,
  iconAlt,
}: {
  time: string;
  event: string;
  gemIdx: number;
  delay: number;
  icon: string;
  iconAlt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const gem = GEM_COLORS[gemIdx];

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "30px 16px 4px",
        width: "100%",
      }}
    >
      {/* Medallón con el icono de la actividad — pop spring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 420, damping: 14, delay }}
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(150deg,rgba(255,255,255,0.96),rgba(241,224,251,0.92))",
          border: "1px solid rgba(166,124,1,0.34)",
          boxShadow: `${gem.shadow}, inset 0 1px 0 rgba(255,255,255,0.95)`,
          marginBottom: 16,
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          role="img"
          aria-label={iconAlt}
          fill="url(#itin-grad)"
        >
          {ICONOS[icon]}
        </svg>
      </motion.div>

      {/* Hora */}
      <motion.div
        initial={{ y: 14, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: delay + 0.08 }}
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: 6,
          color: "#10132e",
          lineHeight: 1,
          marginBottom: 6,
          textIndent: 8,
        }}
      >
        {time}
      </motion.div>

      {/* Evento */}
      <motion.div
        initial={{ y: 14, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: delay + 0.16 }}
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 17,
          color: "rgba(16,19,46,0.86)",
          letterSpacing: 2,
          lineHeight: 1.5,
        }}
      >
        {event}
      </motion.div>
    </div>
  );
}

export default function Itinerario() {
  const t = useT();
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ padding: "64px 24px", overflow: "visible" }}>
      {/* Degradado compartido de la paleta (lila → dorado) para los iconos */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="itin-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0000a0" />
            <stop offset="55%" stopColor="#000cd9" />
            <stop offset="100%" stopColor="#a67c01" />
          </linearGradient>
        </defs>
      </svg>

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
        {t("itinTitle")}
      </h2>

      <div
        ref={trackRef}
        style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0" }}
      >
        {/* Línea central estática */}
        <div style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 0,
          bottom: 0,
          width: 1,
          /* Enredadera: el lila cede al verde a media caida y vuelve al lila */
          background: "linear-gradient(to bottom,transparent 0%,rgba(159,176,245,0.30) 10%,rgba(59,81,51,0.34) 45%,rgba(196,204,250,0.28) 80%,transparent 100%)",
        }} />

        {/* Orbe animado con scroll scrub */}
        <GlowOrb trackRef={trackRef} />

        {ITEMS.map((item, i) => (
          <ItinerarioItem
            key={i}
            time={item.time}
            event={t(item.key)}
            gemIdx={item.gem}
            delay={0}
            icon={item.icon}
            iconAlt={t(item.alt)}
          />
        ))}
      </div>
    </section>
  );
}
