"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useLang, type TKey } from "@/lib/i18n";

const PANEL_API = "https://panel-invitados.vercel.app/api/confirmar";
const RSVP_URL  = "https://save-the-date-julissa-tranquilino-mendoza.vercel.app";
/* PENDIENTE: fecha límite de RSVP no confirmada por el cliente — se congela hasta el día del evento */
const RSVP_DEADLINE = new Date(2027, 4, 15, 23, 59, 0, 0) /* PENDIENTE: fecha limite RSVP por confirmar */;

type Choice = "yes" | "no" | "";

export default function RSVPSection() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const [para, setPara]       = useState<string | null>(null);
  const [names, setNames]     = useState<string[]>([""]);
  const [choice, setChoice]   = useState<Choice>("yes");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; color: string } | null>(null);
  const [frozen, setFrozen]   = useState(false);
  const [btnKey, setBtnKey] = useState<TKey>("rsvpSubmit");
  const [pases, setPases]   = useState(1);
  const [cerrada, setCerrada] = useState(false);
  const [resumen, setResumen] = useState<{ estado: "confirmado" | "declino"; nombres: string[] } | null>(null);

  /* Parse query params + check deadline */
  useEffect(() => {
    const paraQ = searchParams.get("para");

    setPara(paraQ);
    setFrozen(Date.now() > RSVP_DEADLINE.getTime());
  }, [searchParams]);

  /* Pre-fill desde el panel si hay ?para= */
  const preFill = useCallback(async () => {
    if (!para) return;
    try {
      const url = `${PANEL_API}?nombre=${encodeURIComponent(para)}&url_boda=${encodeURIComponent(RSVP_URL)}`;
      const r = await fetch(url);
      const d = await r.json();
      if (!d?.ok || !d.invitado) return;
      const inv = d.invitado;
      /* Los pases del panel mandan: ignoramos cualquier ?pases= manipulado. */
      const p = typeof inv.pases === "number" && inv.pases > 0 && inv.pases <= 20 ? inv.pases : 1;
      setPases(p);
      if (inv.estado === "confirmado") {
        setChoice("yes");
        const nm: string[] = Array.isArray(inv.nombres_confirmados) ? inv.nombres_confirmados : [];
        /* Reabrimos con tantos campos como personas confirmó, no con el tope. */
        setNames(nm.length ? nm.slice(0, p) : [""]);
        /* Ya hay respuesta guardada: la sección arranca cerrada. */
        setResumen({ estado: "confirmado", nombres: nm });
        setCerrada(true);
        setBtnKey("rsvpUpdate");
      } else if (inv.estado === "declino") {
        setChoice("no");
        setNames([""]);
        setResumen({ estado: "declino", nombres: [] });
        setCerrada(true);
        setBtnKey("rsvpUpdate");
      }
    } catch { /* silencioso */ }
  }, [para]);

  useEffect(() => { preFill(); }, [preFill]);


  /* El invitado usa solo los pases que necesite, hasta el tope del panel. */
  const addPase = () =>
    setNames(prev => (prev.length >= pases ? prev : [...prev, ""]));

  const removePase = (i: number) =>
    setNames(prev => (prev.length <= 1 ? prev : prev.filter((_, k) => k !== i)));

  const handleName = (i: number, val: string) => {
    setNames(prev => {
      const next = [...prev];
      next[i] = val;
      return next;
    });
  };

  function setFb(msg: string, color: string) {
    setFeedback({ msg, color });
  }

  async function postConfirm(estado: "confirmado" | "declino", nombresArr: string[]) {
    setLoading(true);
    setBtnKey("rsvpSending");
    setFeedback(null);
    try {
      const r = await fetch(PANEL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre:              para || "Invitado",
          estado,
          pases_confirmados:   estado === "confirmado" ? nombresArr.length : 0,
          nombres_confirmados: estado === "confirmado" ? nombresArr : [],
          url_boda:            RSVP_URL,
        }),
      });
      const d = await r.json();
      if (d?.ok) {
        setBtnKey("rsvpUpdate");
        setFeedback(null);
        setResumen({ estado, nombres: nombresArr });
        setCerrada(true);
      } else {
        setBtnKey("rsvpSubmit");
        setFb(t("rsvpErrSend"), "#b91c1c");
      }
    } catch {
      setBtnKey("rsvpSubmit");
      setFb(t("rsvpErrNet"), "#b91c1c");
    } finally {
      setLoading(false);
    }
  }

  const handleConfirm = () => {
    if (frozen) { setFb(t("rsvpClosedShort"), "#b91c1c"); return; }
    if (!choice) { setFb(t("rsvpPickOne"), "#b91c1c"); return; }
    if (choice === "no") { postConfirm("declino", []); return; }
    const filled = names.map(n => n.trim()).filter(n => n);
    if (filled.length === 0) {
      setFb(t("rsvpAtLeastOne"), "#b91c1c");
      return;
    }
    postConfirm("confirmado", filled);
  };

  /* === Estilos compartidos === */
  const toggleBtnStyle = (active: boolean, isYes: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "12px 8px",
    minHeight: 44,
    borderRadius: 12,
    border: active
      ? `1.5px solid ${isYes ? "#000cd9" : "#0000a0"}`
      : "1.5px solid rgba(0,12,217,0.20)",
    background: active
      ? (isYes ? "linear-gradient(135deg,rgba(0,12,217,0.14),rgba(196,204,250,0.18))"
               : "rgba(0,0,160,0.10)")
      : "rgba(252,249,255,0.62)",
    fontFamily: "var(--font-cormorant), serif",
    fontStyle: "italic",
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: 1.5,
    color: active ? (isYes ? "#0000a0" : "#0000a0") : "#1f2a6b",
    cursor: frozen ? "not-allowed" : "pointer",
    transition: "all .2s",
    opacity: frozen ? 0.55 : 1,
  });

  return (
    <section style={{ padding: "64px 26px" }}>
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
        {t("rsvpTitle")}
      </h2>

      <div style={{
        background: "linear-gradient(145deg,rgba(255,255,255,0.88),rgba(252,249,255,0.97))",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(0,12,217,0.18)",
        borderRadius: 24,
        padding: "28px 22px",
        boxShadow: "0 4px 20px rgba(0,0,160,0.08)",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Barra superior */}
        <div style={{
          position: "absolute", top: 0, left: "15%", right: "15%",
          height: 1.5,
          background: "linear-gradient(90deg,transparent,#000cd9 25%,#d4af37 50%,#c4ccfa 75%,transparent)",
        }} />

        {/* Banner deadline si está congelado */}
        {frozen && (
          <div style={{
            marginBottom: 18,
            padding: "14px 16px",
            borderRadius: 12,
            background: "rgba(166,124,1,0.10)",
            border: "1px solid rgba(166,124,1,0.30)",
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontSize: 14,
            lineHeight: 1.5,
            color: "#0000a0",
            textAlign: "center",
          }}>
            {t("rsvpClosed")}<br />
            {t("rsvpClosedNote")}
          </div>
        )}

        {/* Fecha límite */}
        <p style={{
          textAlign: "center",
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic", fontWeight: 500, fontSize: 15,
          color: "#0008b8", letterSpacing: 2, marginBottom: 18,
        }}>
          {t("rsvpSub")}
        </p>

        {/* Nombre del invitado — grande, dorado con barrido */}
        {para && (
          <p className="gold-shine" style={{
            textAlign: "center",
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: "clamp(34px,9vw,48px)",
            lineHeight: 1.15,
            marginBottom: 6,
          }}>
            {para}
          </p>
        )}

        {/* Pases asignados desde el panel */}
        {para && !cerrada && (
          <p style={{
            textAlign: "center",
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic", fontWeight: 600, fontSize: 16,
            color: "#0000a0", marginBottom: 16,
          }}>
            {pases === 1 ? t("rsvpPasesNote1") : t("rsvpPasesNoteN").replace("{n}", String(pases))}
          </p>
        )}

        {/* ── BANDEJA (se cierra al confirmar) ── */}
        {!cerrada && (<>
        {/* Toggle Sí/No asistiré */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          <button
            type="button"
            disabled={frozen}
            onClick={() => { setChoice("yes"); setFeedback(null); }}
            style={toggleBtnStyle(choice === "yes", true)}
          >
            {t("rsvpYes")}
          </button>
          <button
            type="button"
            disabled={frozen}
            onClick={() => { setChoice("no"); setFeedback(null); }}
            style={toggleBtnStyle(choice === "no", false)}
          >
            {t("rsvpNo")}
          </button>
        </div>

        {/* Campos de nombre — solo si choice === yes */}
        {choice === "yes" && (
          <div style={{ marginBottom: 8 }}>
            {pases > 1 && (
              <p style={{
                textAlign: "center",
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic", fontSize: 14.5, lineHeight: 1.55,
                color: "#1f2a6b", opacity: 0.92,
                margin: "0 auto 16px", maxWidth: 330,
              }}>
                {t("rsvpContadorNota")}
              </p>
            )}
            {names.map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{
                  flexShrink: 0, width: 30, height: 30, borderRadius: "50%",
                  background: "linear-gradient(135deg,#000cd9,#c4ccfa)",
                  color: "#fff", fontSize: 13,
                  fontFamily: "var(--font-cormorant), serif",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700,
                  opacity: frozen ? 0.55 : 1,
                }}>
                  {i + 1}
                </div>

                <input
                  type="text"
                  disabled={frozen}
                  placeholder={`${t("rsvpGuestPlaceholder")} ${i + 1}`}
                  value={names[i] ?? ""}
                  onChange={(e) => handleName(i, e.target.value)}
                  style={{
                    flex: 1, padding: "14px 16px", minHeight: 50,
                    border: "1.5px solid rgba(0,12,217,0.25)",
                    borderRadius: 12,
                    background: frozen ? "rgba(241,237,231,0.7)" : "rgba(252,249,255,0.82)",
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500, fontSize: 16, color: "#10132e",
                    outline: "none", transition: "border-color 0.3s",
                    WebkitAppearance: "none",
                    cursor: frozen ? "not-allowed" : "text",
                  }}
                  onFocus={(e) => { if (!frozen) e.currentTarget.style.borderColor = "#000cd9"; }}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,12,217,0.25)")}
                />

                {names.length > 1 && (
                  <button
                    type="button"
                    disabled={frozen}
                    onClick={() => removePase(i)}
                    aria-label={t("rsvpQuitarPase")}
                    title={t("rsvpQuitarPase")}
                    style={{
                      flexShrink: 0, width: 34, height: 34, borderRadius: "50%",
                      border: "1px solid rgba(0,12,217,0.22)",
                      background: "rgba(252,249,255,0.72)",
                      color: "#000cd9", fontSize: 18, lineHeight: 1,
                      cursor: frozen ? "not-allowed" : "pointer",
                      opacity: frozen ? 0.55 : 1,
                    }}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}

            {/* Contador: sube hasta el tope de pases asignados en el panel */}
            {names.length < pases ? (
              <button
                type="button"
                disabled={frozen}
                onClick={addPase}
                style={{
                  display: "block", margin: "2px auto 0",
                  padding: "9px 20px", minHeight: 40,
                  borderRadius: 30,
                  border: "1px dashed rgba(0,12,217,0.40)",
                  background: "transparent",
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic", fontWeight: 600,
                  fontSize: 15, letterSpacing: 1.5,
                  color: "#0000a0",
                  cursor: frozen ? "not-allowed" : "pointer",
                  opacity: frozen ? 0.55 : 1,
                }}
              >
                {t("rsvpAgregarPase")} ({names.length}/{pases})
              </button>
            ) : pases > 1 && (
              <p style={{
                textAlign: "center", margin: "2px auto 0",
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic", fontSize: 14, color: "#000cd9", opacity: 0.85,
              }}>
                {t("rsvpTopePases")}
              </p>
            )}
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <p style={{
            textAlign: "center", marginTop: 12, marginBottom: 4,
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic", fontSize: 14,
            color: feedback.color,
          }}>
            {feedback.msg}
          </p>
        )}

        {/* Botón confirmar */}
        <button
          className={frozen ? undefined : "gold-btn"}
          onClick={handleConfirm}
          disabled={loading || frozen}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", marginTop: 12, padding: "16px", minHeight: 52,
            background: frozen
              ? "linear-gradient(135deg,#bba,#998)"
              : "linear-gradient(135deg,#000cd9,#0000a0)",
            color: "#fff", borderRadius: 30, border: "none",
            cursor: (loading || frozen) ? "not-allowed" : "pointer",
            fontFamily: "var(--font-cormorant), serif",
            fontSize: 15, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: 3,
            transition: "opacity .3s, transform .3s",
            boxShadow: "0 4px 22px rgba(0,0,160,0.28)",
            opacity: (loading || frozen) ? 0.55 : 1,
          }}
          onMouseEnter={(e) => {
            if (loading || frozen) return;
            e.currentTarget.style.opacity = "0.88";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            if (loading || frozen) return;
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {frozen ? t("rsvpClosedBtn") : t(btnKey)}
        </button>
        </>)}

        {/* ── AGRADECIMIENTO (bandeja cerrada) ── */}
        {cerrada && resumen && (
          <div style={{
            padding: "26px 22px",
            background: "linear-gradient(145deg,rgba(0,12,217,0.08),rgba(196,204,250,0.14))",
            border: "1.5px solid rgba(0,12,217,0.28)",
            borderRadius: 16,
            textAlign: "center",
          }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#000cd9"
                 strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                 style={{ display: "block", margin: "0 auto 10px" }} aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><polyline points="8.5 12.5 11 15 16 9.5" />
            </svg>
            <p style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: 21, fontWeight: 700, color: "#0000a0",
              marginBottom: 8, lineHeight: 1.35,
            }}>
              {t(resumen.estado === "confirmado" ? "rsvpGraciasYes" : "rsvpGraciasNo")}
            </p>
            <p style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic", fontSize: 15.5, color: "#1f2a6b",
              lineHeight: 1.6, marginBottom: 18,
            }}>
              {resumen.estado === "declino"
                ? t("rsvpGraciasNoSub")
                : resumen.nombres.length === 1
                  ? t("rsvpGraciasOne").replace("{nombre}", resumen.nombres[0])
                  : t("rsvpGraciasMany")
                      .replace("{n}", String(resumen.nombres.length))
                      .replace("{lista}", resumen.nombres.join(", "))}
            </p>
            <button
              type="button"
              disabled={frozen}
              onClick={() => { setCerrada(false); setFeedback(null); }}
              style={{
                padding: "11px 22px",
                border: "1.5px solid rgba(0,12,217,0.38)",
                background: "transparent",
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic", fontSize: 15, color: "#0000a0",
                borderRadius: 24,
                cursor: frozen ? "not-allowed" : "pointer",
                opacity: frozen ? 0.45 : 1,
                transition: "all .25s",
              }}
            >
              {t("rsvpEditar")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
