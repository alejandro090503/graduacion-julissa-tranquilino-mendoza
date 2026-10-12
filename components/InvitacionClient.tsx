"use client";
import { useState, useRef } from "react";
import IntroSequence from "./IntroSequence";
import Hero from "./Hero";
import Ornament from "./Ornament";
import CountdownTimer from "./CountdownTimer";
import CalendarioBtn from "./CalendarioBtn";
import Footer from "./Footer";
import Cierre from "./Cierre";
import RetratoArco from "./RetratoArco";
import MusicFab, { type MusicFabHandle } from "./MusicFab";
import ScrollReveal from "./ScrollReveal";
import FondosScroll from "./FondosScroll";
import AutoScroll from "./AutoScroll";
import LanguageGate from "./LanguageGate";
import { useLang, useT } from "@/lib/i18n";

export default function InvitacionClient() {
  const [contentVisible, setContentVisible] = useState(false);
  const [splashMounted, setSplashMounted] = useState(true);
  const musicRef = useRef<MusicFabHandle>(null);
  const { chosen, hydrated } = useLang();
  const t = useT();

  // Antes que nada: elección de idioma (salvo que ya esté guardada)
  const needsLang = false; // invitación solo en español

  // Gesto del usuario: desbloquea el autoplay del audio
  const handleUnlock = () => {
    musicRef.current?.play();
  };

  // Fin de la cinemática: crossfade del overlay a la invitación
  const handleFinish = () => {
    setContentVisible(true);
    setTimeout(() => {
      setSplashMounted(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 1000);
  };

  return (
    <>
      {/* FONDOS TEMÁTICOS QUE CAMBIAN AL SCROLLEAR */}
      <FondosScroll />

      {/* SELECTOR DE IDIOMA — primera pantalla */}
      {needsLang && <LanguageGate />}

      {/* SPLASH */}
      {splashMounted && <IntroSequence onUnlock={handleUnlock} onFinish={handleFinish} />}

      {/* CONTENIDO PRINCIPAL */}
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 0.95s ease",
          maxWidth: 430,
          margin: "0 auto",
          position: "relative",
          overflowX: "clip",
          zIndex: 1,
          backgroundColor: "rgba(247,249,255,0.66)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
          backgroundImage: `
            radial-gradient(circle at 22% 12%, rgba(212,175,55,0.055) 0 2.5px, transparent 3px),
            radial-gradient(circle at 71% 41%, rgba(212,175,55,0.045) 0 3.5px, transparent 4px),
            radial-gradient(circle at 44% 78%, rgba(196,204,250,0.060) 0 3px, transparent 3.5px),
            radial-gradient(circle at 88% 91%, rgba(212,175,55,0.040) 0 2px, transparent 2.5px)
          `,
          backgroundRepeat: "repeat",
          backgroundSize: "260px 260px, 340px 340px, 300px 300px, 220px 220px",
        }}
      >
        {/* HERO — con su asset de fondo propio */}
        <Hero />

        {/* FRASE — fuera del hero; a partir de aquí mandan los fondos por scroll */}
        <ScrollReveal>
          <p style={{
            maxWidth: 360,
            margin: "0 auto",
            padding: "36px 28px 8px",
            textAlign: "center",
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 18,
            lineHeight: 1.72,
            letterSpacing: 0.5,
            color: "#0000a0",
          }}>
            {t("phrase")}
          </p>
        </ScrollReveal>

        <div id="fondos-inicio" aria-hidden="true" />

        {/* RETRATO */}
        <ScrollReveal>
          <RetratoArco />
        </ScrollReveal>

        {/* ORNAMENTO */}
        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        {/* FECHA */}
        <ScrollReveal>
          <div style={{ padding: "32px 26px 10px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
              <div style={{ flex: 1, maxWidth: 60, height: 1, background: "linear-gradient(to right,transparent,#000cd9)", opacity: 0.5 }} />
              <div style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 700,
                fontSize: 26,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: "#0000a0",
                textIndent: 8,
              }}>
                {t("dateBanner")}
              </div>
              <div style={{ flex: 1, maxWidth: 60, height: 1, background: "linear-gradient(to left,transparent,#000cd9)", opacity: 0.5 }} />
            </div>
          </div>
        </ScrollReveal>

        {/* COUNTDOWN */}
        <ScrollReveal>
          <CountdownTimer />
        </ScrollReveal>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        {/* SAVE THE DATE: ubicación, itinerario, dress code, galería, regalos, álbum y RSVP
            llegan con la invitación formal. */}
        {/* CALENDARIO */}
        <ScrollReveal>
          <CalendarioBtn />
        </ScrollReveal>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        {/* FOOTER */}
        <ScrollReveal>
          <Cierre />
        </ScrollReveal>

        <ScrollReveal>
          <Footer />
        </ScrollReveal>
      </div>

      {/* AUTO-SCROLL LENTO — sólo cuando la intro terminó */}
      <AutoScroll active={contentVisible && !splashMounted} />

      {/* FAB MÚSICA */}
      <MusicFab ref={musicRef} />
    </>
  );
}
