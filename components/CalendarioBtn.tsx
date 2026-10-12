"use client";
import { useT } from "@/lib/i18n";

const gcalUrl = (title: string, details: string) => {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const location = encodeURIComponent("Del Rey Event Center, 2620 Decker Lake Blvd, West Valley City, UT 84119");
  // 2027-05-22 19:00 Puebla (UTC-6) → UTC = 2027-05-23T01:00:00Z
  const dates = "20270523T010000Z/20270523T080000Z";
  return `${base}&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${location}`;
};

export default function CalendarioBtn() {
  const t = useT();
  const GCAL_URL = gcalUrl(t("calEventTitle"), t("calEventDetails"));
  return (
    <section style={{ padding: "40px 26px 64px", textAlign: "center" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontSize: 13,
        letterSpacing: 5,
        textTransform: "uppercase",
        color: "#0008b8",
        marginBottom: 8,
        opacity: 0.85,
      }}>
        {t("calKicker")}
      </p>
      <h2 style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 48,
        lineHeight: 1.25,
        marginBottom: 16,
        padding: "4px 20px 8px",
        background: "linear-gradient(135deg,#0000a0 0%,#000cd9 45%,#d4af37 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        overflow: "visible",
        display: "inline-block",
      }}>
        {t("calTitle")}
      </h2>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: 17,
        color: "#10132e",
        opacity: 0.70,
        marginBottom: 20,
      }}>
        {t("calSub")}
      </p>
      <a
        href={GCAL_URL}
        className="gold-btn"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
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
          boxShadow: "0 4px 16px rgba(0,0,160,0.30)",
          transition: "opacity .3s,transform .3s",
        }}
      >
        {t("calButton")}
      </a>
    </section>
  );
}
