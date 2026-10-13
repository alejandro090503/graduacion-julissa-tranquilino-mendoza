"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";

const VIDEO_ENVELOPES =
  "https://bsjoelxktbvlavfoozhk.supabase.co/storage/v1/object/public/fotos-clientes/video/graduacion-julissa-tranquilino-mendoza/envelopes.mp4";
const VIDEO_PRINCESS =
  "https://bsjoelxktbvlavfoozhk.supabase.co/storage/v1/object/public/fotos-clientes/video/graduacion-julissa-tranquilino-mendoza/princess.mp4";

/** Duración del crossfade entre escenas (ms) */
const XFADE = 900;
/** Si un video no arranca en este tiempo, se salta la escena */
const START_TIMEOUT = 5000;

interface Props {
  /** Se dispara en el gesto de tap (mismo call stack → desbloquea el audio) */
  onUnlock: () => void;
  /** Se dispara cuando la cinemática termina (o se salta) */
  onFinish: () => void;
}

type Stage = "sobre" | "v1" | "v2" | "done";

export default function IntroSequence({ onUnlock, onFinish }: Props) {
  const t = useT();
  const rootRef = useRef<HTMLDivElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const v2Ref = useRef<HTMLVideoElement>(null);
  const sobreRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Stage>("sobre");
  const finishedRef = useRef(false);
  const [tapped, setTapped] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(id);
  }, []);

  /* ── Salida: crossfade suave del overlay hacia la invitación ── */
  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    stageRef.current = "done";
    const el = rootRef.current;
    if (el) {
      el.style.transition = `opacity ${XFADE}ms cubic-bezier(0.4,0,0.2,1)`;
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
    }
    onFinish();
  }, [onFinish]);

  /* ── Escena 2: princess ── */
  const startPrincess = useCallback(() => {
    if (stageRef.current !== "v1") return;
    stageRef.current = "v2";
    const v1 = v1Ref.current;
    const v2 = v2Ref.current;
    if (!v2) return finish();

    let started = false;
    const guard = setTimeout(() => { if (!started) finish(); }, START_TIMEOUT);

    const crossfade = () => {
      if (started) return;
      started = true;
      clearTimeout(guard);
      v2.style.opacity = "1";
      if (v1) v1.style.opacity = "0";
      setTimeout(() => { try { v1?.pause(); } catch {} }, XFADE);
    };

    v2.addEventListener("timeupdate", function onTU() {
      if (v2.currentTime > 0.05) { v2.removeEventListener("timeupdate", onTU); crossfade(); }
    });
    v2.play().then(crossfade).catch(() => { clearTimeout(guard); finish(); });

    // Cierre hacia la invitación, solapando el final del video
    const toInvite = () => finish();
    v2.addEventListener("ended", toInvite, { once: true });
    v2.addEventListener("timeupdate", function onEnd() {
      if (isFinite(v2.duration) && v2.duration > 0 && v2.currentTime >= v2.duration - XFADE / 1000) {
        v2.removeEventListener("timeupdate", onEnd);
        toInvite();
      }
    });
    v2.addEventListener("error", toInvite, { once: true });
  }, [finish]);

  /* ── Tap inicial: desbloquea audio y arranca la cinemática ── */
  const handleTap = useCallback(() => {
    if (stageRef.current !== "sobre") return;
    stageRef.current = "v1";
    setTapped(true);
    onUnlock();

    const v1 = v1Ref.current;
    const v2 = v2Ref.current;
    // Precarga del 2º video en cuanto arranca el 1º → transición sin parón
    if (v2) { v2.preload = "auto"; try { v2.load(); } catch {} }
    if (!v1) return finish();

    let started = false;
    const guard = setTimeout(() => { if (!started) finish(); }, START_TIMEOUT);
    const crossfade = () => {
      if (started) return;
      started = true;
      clearTimeout(guard);
      v1.style.opacity = "1";
      if (sobreRef.current) sobreRef.current.style.opacity = "0";
    };

    v1.preload = "auto";
    v1.addEventListener("timeupdate", function onTU() {
      if (v1.currentTime > 0.05) { v1.removeEventListener("timeupdate", onTU); crossfade(); }
    });
    v1.play().then(crossfade).catch(() => { clearTimeout(guard); finish(); });

    v1.addEventListener("ended", startPrincess, { once: true });
    v1.addEventListener("timeupdate", function onEnd() {
      if (isFinite(v1.duration) && v1.duration > 0 && v1.currentTime >= v1.duration - XFADE / 1000) {
        v1.removeEventListener("timeupdate", onEnd);
        startPrincess();
      }
    });
    v1.addEventListener("error", () => { clearTimeout(guard); finish(); }, { once: true });
  }, [onUnlock, finish, startPrincess]);

  const stageBox: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    margin: "0 auto",
    maxWidth: 430,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    // Los <video> van después del sobre en el DOM y lo cubren por completo:
    // sin esto capturan el tap aunque tengan opacity 0.
    pointerEvents: "none",
  };

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        overflow: "hidden",
        background: "linear-gradient(160deg,#f7f9ff 0%,#d6dcff 50%,#f7f9ff 100%)",
        opacity: ready ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Escena 0 — el sobre */}
      <div
        ref={sobreRef}
        onClick={handleTap}
        role="button"
        tabIndex={0}
        aria-label={t("introTapAria")}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleTap(); }}
        style={{
          position: "absolute",
          inset: 0,
          cursor: "pointer",
          opacity: 1,
          transition: `opacity ${XFADE}ms cubic-bezier(0.4,0,0.2,1)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sobre.jpg" alt="" style={{ ...stageBox, position: "absolute", left: 0, right: 0 }} />

        {/* Botón levitante */}
        {!tapped && (
          <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "9%",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleTap(); }}
            aria-label={t("introTapAria")}
            style={{
              position: "relative",
              pointerEvents: "auto",
              minHeight: 52,
              touchAction: "manipulation",
              fontFamily: "var(--font-cormorant), serif",
              fontSize: 13,
              letterSpacing: 8,
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#00006e",
              whiteSpace: "nowrap",
              padding: "15px 40px 15px 48px",
              background: "rgba(247,249,255,0.80)",
              border: "1.5px solid rgba(212,175,55,0.62)",
              borderRadius: 40,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 6px 22px rgba(0,0,160,0.22), 0 0 0 1px rgba(214,220,255,0.55) inset",
              animation: "hintFloat 3.2s ease-in-out infinite",
              cursor: "pointer",
            }}
          >
            {t("introTap")}
          </button>
          </div>
        )}
      </div>

      {/* Escena 1 — envelopes */}
      <video
        ref={v1Ref}
        src={VIDEO_ENVELOPES}
        muted
        playsInline
        preload="none"
        poster="/sobre.jpg"
        style={{ ...stageBox, left: 0, right: 0, opacity: 0, transition: `opacity ${XFADE}ms cubic-bezier(0.4,0,0.2,1)` }}
      />

      {/* Escena 2 — princess */}
      <video
        ref={v2Ref}
        src={VIDEO_PRINCESS}
        muted
        playsInline
        preload="none"
        style={{ ...stageBox, left: 0, right: 0, opacity: 0, transition: `opacity ${XFADE}ms cubic-bezier(0.4,0,0.2,1)` }}
      />

      {/* Saltar — discreto, solo tras el tap */}
      {tapped && (
        <button
          onClick={finish}
          style={{
            position: "absolute",
            top: "max(18px, env(safe-area-inset-top))",
            right: 18,
            zIndex: 5,
            fontFamily: "var(--font-cormorant), serif",
            fontSize: 12,
            letterSpacing: 3,
            textIndent: 3,
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#00006e",
            background: "rgba(247,249,255,0.78)",
            border: "1px solid rgba(212,175,55,0.50)",
            borderRadius: 30,
            padding: "7px 16px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            cursor: "pointer",
          }}
        >
          {t("introSkip")}
        </button>
      )}
    </div>
  );
}
