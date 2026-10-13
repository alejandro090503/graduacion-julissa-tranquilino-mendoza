"use client";
import { useState, useRef } from "react";
import IntroSequence from "./IntroSequence";
import Hero from "./Hero";
import Cierre from "./Cierre";
import RetratoArco from "./RetratoArco";
import { Carta, Fecha, Cuenta, Pronto, PieStd } from "./StdSecciones";
import MusicFab, { type MusicFabHandle } from "./MusicFab";
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
    }, 1500);
  };

  return (
    <>
      {/* SELECTOR DE IDIOMA — primera pantalla */}
      {needsLang && <LanguageGate />}

      {/* SPLASH */}
      {splashMounted && <IntroSequence onUnlock={handleUnlock} onFinish={handleFinish} />}

      {/* CONTENIDO PRINCIPAL — Save the Date: cada sección con su propio fondo */}
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 1.4s cubic-bezier(0.4,0,0.2,1)",
          maxWidth: 430,
          margin: "0 auto",
          position: "relative",
          overflowX: "clip",
          zIndex: 1,
          background: "#050b30",
        }}
      >
        <Hero />
        <Carta frase={t("phrase")}>
          <RetratoArco />
        </Carta>
        <Fecha />
        <Cuenta />
        <Pronto />
        <Cierre />
        <PieStd />
      </div>

      {/* AUTO-SCROLL LENTO — sólo cuando la intro terminó */}
      <AutoScroll active={contentVisible && !splashMounted} />

      {/* FAB MÚSICA */}
      <MusicFab ref={musicRef} />
    </>
  );
}
