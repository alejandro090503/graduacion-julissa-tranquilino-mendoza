"use client";
import { useT } from "@/lib/i18n";

function LocationCard({
  title,
  city,
  time,
  mapsUrl,
  image,
  imageAlt,
}: {
  title: string;
  city: string;
  time: string;
  mapsUrl: string;
  image: string;
  imageAlt: string;
}) {
  const t = useT();
  return (
    <div style={{
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(158deg,rgba(255,255,255,0.92),rgba(247,249,255,0.97))",
      backdropFilter: "blur(22px)",
      WebkitBackdropFilter: "blur(22px)",
      borderRadius: 28,
      border: "1px solid rgba(0,12,217,0.16)",
      boxShadow: "0 14px 56px rgba(0,0,160,0.10),inset 0 1px 0 rgba(255,255,255,0.96)",
      marginBottom: 22,
    }}>
      {/* Barra lateral izquierda */}
      <div style={{
        position: "absolute",
        left: 0,
        top: "12%",
        bottom: "12%",
        width: 2.5,
        background: "linear-gradient(to bottom,transparent,#9fb0f5 25%,#3b5133 55%,#c4ccfa 80%,transparent)",
        opacity: 0.52,
      }} />

      {/* Acuarela del recinto */}
      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1419 / 736",
        overflow: "hidden",
        background: "linear-gradient(160deg,#f7f9ff,#eef1fe)",
      }}>
        <img
          src={image}
          alt={imageAlt}
          width={900}
          height={466}
          decoding="async"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            WebkitMaskImage:
              "radial-gradient(120% 130% at 50% 42%, #000 62%, transparent 100%)",
            maskImage:
              "radial-gradient(120% 130% at 50% 42%, #000 62%, transparent 100%)",
          }}
        />
        {/* Velo inferior para fundir la acuarela con la tarjeta */}
        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0) 45%,rgba(255,255,255,0.85) 92%,rgba(255,255,255,0.97) 100%)",
        }} />
        {/* Filete dorado sutil */}
        <div style={{
          position: "absolute",
          left: "12%",
          right: "12%",
          bottom: 0,
          height: 1,
          background: "linear-gradient(90deg,transparent,#d4af37,transparent)",
          opacity: 0.45,
        }} />
      </div>

      <div style={{ padding: "26px 28px 0", textAlign: "center" }}>
        {/* Ícono PIN */}
        <div style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          margin: "0 auto 16px",
          background: "linear-gradient(135deg,rgba(0,12,217,0.14),rgba(0,12,217,0.26))",
          border: "1.5px solid rgba(0,12,217,0.30)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,160,0.13)",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#000cd9">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>

        <div style={{
          fontFamily: "var(--font-great-vibes), cursive",
          fontSize: "clamp(30px, 8.2vw, 38px)",
          background: "linear-gradient(135deg,#10132e 20%,#000cd9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.15,
          marginBottom: 10,
        }}>
          {title}
        </div>


        <div style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 15,
          color: "rgba(16,19,46,.86)",
          letterSpacing: 0.4,
          lineHeight: 1.75,
          marginBottom: 8,
        }}>
          {city}
        </div>

        <div style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 700,
          fontSize: 18,
          color: "#0000a0",
          letterSpacing: 3,
          marginBottom: 4,
        }}>
          {time}
        </div>

        <div style={{
          width: 48,
          height: 1,
          margin: "18px auto 22px",
          background: "linear-gradient(90deg,transparent,#000cd9,transparent)",
          opacity: 0.32,
        }} />
      </div>

      <div style={{ textAlign: "center", padding: "0 22px 30px" }}>
        <a
          href={mapsUrl}
          className="gold-btn"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: 8,
            padding: "14px 32px",
            background: "linear-gradient(135deg,#000cd9,#0000a0)",
            color: "#FFFFFF",
            borderRadius: 30,
            fontFamily: "var(--font-cormorant), serif",
            fontSize: 14,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
            textDecoration: "none",
            transition: "opacity .3s,transform .3s",
            boxShadow: "0 4px 16px rgba(0,0,160,0.30)",
          }}
        >
          {t("locButton")}
        </a>
      </div>
    </div>
  );
}

export default function Ubicacion() {
  const t = useT();
  return (
    <section style={{ padding: "64px 26px" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontSize: 14,
        letterSpacing: 5,
        textTransform: "uppercase",
        color: "#0008b8",
        textAlign: "center",
        marginBottom: 8,
        opacity: 0.85,
      }}>
        {t("locKicker")}
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
        {t("locTitle")}
      </h2>

      <LocationCard
        title="Scala Recepciones · Salón Rosa"
        city={t("locCityVenue")}
        time="7:00 PM"
        mapsUrl="https://maps.app.goo.gl/iQfP1jyh19vMqHbP9?g_st=aw"
        image="/salon.webp"
        imageAlt={t("altVenue")}
      />
    </section>
  );
}
