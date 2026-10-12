"use client";
import { useT } from "@/lib/i18n";
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";

export interface MusicFabHandle {
  play: () => void;
}

const MusicFab = forwardRef<MusicFabHandle>((_, ref) => {
  const t = useT();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("https://bsjoelxktbvlavfoozhk.supabase.co/storage/v1/object/public/fotos-clientes/audio/graduacion-julissa-tranquilino-mendoza/cancion.mp3");
    audioRef.current.preload = "none";
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    return () => { audioRef.current?.pause(); };
  }, []);

  /* Método expuesto al padre — llamado dentro del gesto del usuario */
  useImperativeHandle(ref, () => ({
    play() {
      if (!audioRef.current || playing) return;
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    },
  }));

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 998,
        width: 68,
        height: 68,
        userSelect: "none",
      }}
    >
      {/* Pulse ring (active when playing) */}
      <div style={{
        position: "absolute",
        inset: -8,
        borderRadius: "50%",
        border: "1.5px solid rgba(212,175,55,0.30)",
        animation: playing ? "vinylPulse 2.2s ease-in-out infinite" : "none",
        pointerEvents: "none",
      }} />

      {/* Tonearm — pivots from top-right corner */}
      <div style={{
        position: "absolute",
        top: -4,
        right: -2,
        width: 24,
        height: 36,
        transformOrigin: "top right",
        transform: playing ? "rotate(-14deg)" : "rotate(-30deg)",
        transition: "transform 0.65s cubic-bezier(0.2,0.7,0.2,1)",
        zIndex: 4,
        pointerEvents: "none",
      }}>
        {/* Pivot */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #d4af37, #a67c01)",
          boxShadow: "0 1px 5px rgba(0,0,0,0.55)",
        }} />
        {/* Arm */}
        <div style={{
          position: "absolute",
          top: 5,
          right: 3,
          width: 2,
          height: 22,
          background: "linear-gradient(to bottom, #d4af37 0%, rgba(212,175,55,0.50) 100%)",
          borderRadius: 2,
          transform: "rotate(18deg)",
          transformOrigin: "top center",
        }} />
        {/* Head */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 3,
          width: 6,
          height: 5,
          borderRadius: "0 0 2px 2px",
          background: "#d4af37",
          boxShadow: "0 1px 3px rgba(0,0,0,0.50)",
        }} />
      </div>

      {/* Vinyl button */}
      <button
        onClick={toggle}
        aria-label={playing ? t("musicPause") : t("musicPlay")}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          padding: 0,
          outline: "none",
          background: "transparent",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,160,0.50), 0 0 0 1.5px rgba(212,175,55,0.26)",
        }}
      >
        {/* Spinning disc */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          animation: playing ? "vinylSpin 2s linear infinite" : "none",
          background: `
            radial-gradient(circle, #05072a 4%, transparent 4.5%),
            radial-gradient(circle, #d4af37 0%, #a67c01 17%, #a87d00 19%, transparent 19.5%),
            repeating-radial-gradient(circle,
              transparent 21%,   rgba(255,255,255,0.05) 21.7%, transparent 22.3%,
              transparent 24%,   rgba(255,255,255,0.05) 24.7%, transparent 25.3%,
              transparent 27%,   rgba(255,255,255,0.05) 27.7%, transparent 28.3%,
              transparent 30%,   rgba(255,255,255,0.05) 30.7%, transparent 31.3%,
              transparent 33%,   rgba(255,255,255,0.05) 33.7%, transparent 34.3%,
              transparent 36%,   rgba(255,255,255,0.05) 36.7%, transparent 37.3%,
              transparent 39%,   rgba(255,255,255,0.05) 39.7%, transparent 40.3%,
              transparent 42%,   rgba(255,255,255,0.05) 42.7%, transparent 43.3%,
              transparent 45%,   rgba(255,255,255,0.05) 45.7%, transparent 46.3%,
              transparent 48%,   rgba(255,255,255,0.05) 48.7%, transparent 49.3%,
              transparent 51%,   rgba(255,255,255,0.05) 51.7%, transparent 52.3%,
              transparent 54%,   rgba(255,255,255,0.05) 54.7%, transparent 55.3%,
              transparent 57%,   rgba(255,255,255,0.05) 57.7%, transparent 58.3%,
              transparent 60%,   rgba(255,255,255,0.05) 60.7%, transparent 61.3%,
              transparent 63%,   rgba(255,255,255,0.05) 63.7%, transparent 64.3%,
              transparent 66%,   rgba(255,255,255,0.05) 66.7%, transparent 67.3%,
              transparent 69%,   rgba(255,255,255,0.05) 69.7%, transparent 70.3%,
              transparent 72%,   rgba(255,255,255,0.05) 72.7%, transparent 73.3%,
              transparent 75%,   rgba(255,255,255,0.05) 75.7%, transparent 76.3%,
              transparent 78%,   rgba(255,255,255,0.05) 78.7%, transparent 79.3%,
              transparent 81%,   rgba(255,255,255,0.05) 81.7%, transparent 82.3%,
              transparent 84%,   rgba(255,255,255,0.05) 84.7%, transparent 85.3%,
              transparent 87%,   rgba(255,255,255,0.05) 87.7%, transparent 88.3%,
              transparent 90%,   rgba(255,255,255,0.05) 90.7%, transparent 91.3%,
              transparent 93%,   rgba(255,255,255,0.05) 93.7%, transparent 94.3%,
              transparent 96%,   rgba(255,255,255,0.05) 96.7%, transparent 97.3%
            ),
            radial-gradient(circle, #05072a 0%, #2d1020 60%, #05072a 100%)
          `,
        }}>
          {/* Sheen */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, transparent 50%, rgba(0,0,0,0.18) 100%)",
            pointerEvents: "none",
          }} />
          {/* Center hole */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#0a0510",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
          }} />
        </div>

        {/* Play icon — visible when paused */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: playing ? 0 : 1,
          transition: "opacity 0.35s ease",
          pointerEvents: "none",
        }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="rgba(212,175,55,0.95)">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </button>
    </div>
  );
});

MusicFab.displayName = "MusicFab";
export default MusicFab;
