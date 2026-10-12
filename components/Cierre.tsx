"use client";

import { useT } from "@/lib/i18n";

/**
 * Cierre de la invitacion: foto de fondo a sangrado + texto + firma dorada.
 *
 * Composicion: el rostro de la nina cae en el tercio superior de la foto,
 * asi que el velo se abre arriba (para que se vea) y se cierra abajo, donde
 * caen el parrafo y la firma. Por eso el texto va abajo y no encima de ella.
 */
export default function Cierre() {
  const t = useT();

  return (
    <section
      aria-label={t("closingName")}
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 700,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 26px 64px",
        isolation: "isolate",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/imagenes/julissa-1.jpg"
        alt={t("closingAlt")}
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          /* 22% deja el rostro dentro del encuadre, no lo recorta */
          objectPosition: "center 22%",
          zIndex: -2,
        }}
      />

      {/* Velo abierto arriba (rostro visible) y denso abajo (texto legible) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background:
            "linear-gradient(180deg, rgba(4,8,48,0.30) 0%, rgba(4,8,48,0.26) 26%, rgba(5,10,56,0.48) 44%, rgba(6,12,64,0.80) 60%, rgba(6,12,66,0.88) 76%, rgba(6,12,66,0.90) 100%)",
        }}
      />

      <p
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: 19,
          lineHeight: 1.62,
          fontWeight: 500,
          color: "#ffffff",
          textAlign: "center",
          margin: "0 auto 22px",
          maxWidth: 340,
          textShadow: "0 1px 12px rgba(20,8,28,0.75)",
        }}
      >
        {t("closingText")}
      </p>

      <p
        className="gold-shine gold-shine-cierre"
        style={{
          fontFamily: "var(--font-great-vibes), cursive",
          fontSize: "clamp(52px, 17vw, 76px)",
          lineHeight: 1.15,
          margin: 0,
        }}
      >
        {t("closingName")}
      </p>
    </section>
  );
}
