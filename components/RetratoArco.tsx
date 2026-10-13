/* Retrato de la graduada en arco de ventana (la torre), con doble filete dorado
   sobre noche azul marino. Sustituye al carrusel en el Save the Date. */
export default function RetratoArco() {
  return (
    <section style={{ padding: "58px 10px 10px", display: "flex", justifyContent: "center", width: "100%" }}>
      <figure className="retrato-float" style={{ margin: 0, position: "relative", width: "100%", maxWidth: 320 }}>
        <div style={{
          position: "relative",
          padding: 10,
          borderRadius: "170px 170px 6px 6px",
          background: "linear-gradient(160deg, #14256e, #050b30)",
          boxShadow: "0 24px 60px rgba(5,11,48,0.35)",
        }}>
          {/* filete exterior dorado */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, borderRadius: "170px 170px 6px 6px",
            border: "1.5px solid #d4af37", pointerEvents: "none",
          }} />
          <div style={{
            position: "relative", overflow: "hidden",
            borderRadius: "160px 160px 3px 3px",
            border: "1px solid rgba(230,200,112,0.7)",
            aspectRatio: "3 / 4.3",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/imagenes/julissa-1.jpg"
              alt="Julissa con su vestido de gala"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%", display: "block" }}
            />
            {/* velo marino abajo + brillo dorado sutil */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(212,175,55,0.10) 0%, transparent 35%, transparent 62%, rgba(5,11,48,0.88) 100%)",
            }} />
            <figcaption style={{ position: "absolute", left: 0, right: 0, bottom: 22, textAlign: "center" }}>
              <span className="gold-shine gold-shine-cierre" style={{
                fontFamily: "var(--font-great-vibes), cursive", fontSize: 44, lineHeight: 1.2,
              }}>
                Clase 2027
              </span>
              <span style={{
                display: "block", marginTop: 2,
                fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 13,
                letterSpacing: 5, textIndent: 5, textTransform: "uppercase", color: "#f4ecd8",
              }}>
                Generación 2023 · 2027
              </span>
            </figcaption>
          </div>
        </div>
        {/* sol de Corona en la clave del arco */}
        <i aria-hidden="true" className="arc-sun" />
      </figure>
    </section>
  );
}
