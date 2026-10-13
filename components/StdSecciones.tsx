"use client";
/* Save the Date — secciones premium (sistema de save-the-date-daenerys):
   cada sección con su propio fondo nocturno (frames de los videos de Flow),
   velo marino, fecha grande con números que ruedan, calendario del mes,
   medallones con sol de Corona y órbita, y botón con brillo suave. */
import { useEffect, useRef, useState } from "react";

const TARGET = new Date("2027-05-22T19:00:00-06:00");
const GCAL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent("Graduación de Julissa") +
  "&dates=20270523T010000Z/20270523T080000Z" +
  "&details=" + encodeURIComponent("Save the Date · Graduación de Julissa Tranquilino Mendoza · Generación 2023-2027. La invitación formal llegará pronto.") +
  "&location=" + encodeURIComponent("Puebla, Puebla");

/** Añade .is-in cuando la sección entra en pantalla (con respaldo por tiempo) */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fallback = setTimeout(() => setInView(true), 2500);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);
  return [ref, inView] as const;
}

const LINTERNAS = [
  { l: "5%", w: 10, d: 24, o: 0.7 }, { l: "17%", w: 7, d: 30, o: 0.5 }, { l: "29%", w: 12, d: 26, o: 0.8 },
  { l: "44%", w: 6, d: 33, o: 0.45 }, { l: "58%", w: 11, d: 25, o: 0.75 }, { l: "71%", w: 8, d: 29, o: 0.55 },
  { l: "84%", w: 13, d: 23, o: 0.85 }, { l: "94%", w: 7, d: 31, o: 0.5 },
];

export function Linternas({ seed = 0 }: { seed?: number }) {
  return (
    <div className="std-lanterns" aria-hidden="true">
      {LINTERNAS.map((x, i) => (
        <span key={i} className="hero-lantern" style={{
          left: x.l, width: x.w, height: Math.round(x.w * 1.35), opacity: x.o,
          boxShadow: `0 0 ${x.w * 1.4}px ${x.w * 0.5}px rgba(255,190,90,0.42)`,
          animation: `lanternRise ${x.d}s ${-((i * 7 + seed * 5) % x.d)}s linear infinite`,
        }} />
      ))}
    </div>
  );
}

function Fondo({ src, pos = "center", seed = 0 }: { src: string; pos?: string; seed?: number }) {
  return (
    <>
      <div className="std-bg" style={{ backgroundImage: `url(${src})`, backgroundPosition: pos }} aria-hidden="true" />
      <div className="std-tint" aria-hidden="true" />
      <Linternas seed={seed} />
      <div className="std-fade-t" aria-hidden="true" />
      <div className="std-fade-b" aria-hidden="true" />
    </>
  );
}

function Regla() {
  return (
    <div className="std-rule" aria-hidden="true">
      <span /><i /><span />
    </div>
  );
}

/* ── FECHA ───────────────────────────────────────── */
function Roll({ to, digits }: { to: number; digits: number[] }) {
  return (
    <span className="std-roll">
      <span className="std-roll-strip" style={{ transform: `translateY(-${to}em)` }}>
        {digits.map((d, i) => <span key={i}>{d}</span>)}
      </span>
    </span>
  );
}

export function Fecha() {
  const [ref, inView] = useInView<HTMLElement>();
  // Mayo 2027 empieza en sábado → 6 huecos con semana Domingo–Sábado
  const blanks = 6;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const seq = (n: number) => Array.from({ length: n + 1 }, (_, i) => i % 10);
  return (
    <section ref={ref} className={`std-sec ${inView ? "is-in" : ""}`} style={{ minHeight: "100svh" }}>
      <Fondo src="/fondos/bg-torre.webp" pos="center 30%" seed={1} />
      <div className="std-inner">
        <p className="std-eyebrow std-up">Guarda la fecha</p>
        <Regla />
        <p className="std-dayword std-up">Sábado</p>
        <div className="std-date-row std-up">
          <div className="std-date-side">MAYO</div>
          <div className="std-big" aria-label="22">
            <Roll to={inView ? 2 : 0} digits={seq(2)} />
            <Roll to={inView ? 12 : 0} digits={seq(12)} />
          </div>
          <div className="std-date-side">2027</div>
        </div>

        <div className="std-cal std-up" role="table" aria-label="Calendario de mayo de 2027, sábado 22 marcado">
          <div className="std-cal-h">MAYO · 2027</div>
          <div className="std-cal-g">
            {["D", "L", "M", "M", "J", "V", "S"].map((w, i) => <span key={i} className="wd">{w}</span>)}
            {Array.from({ length: blanks }, (_, i) => <span key={"b" + i} />)}
            {days.map((d) => (
              <span key={d} className={`d ${d === 22 ? "on" : ""}`}>
                {d === 22 && <i className="std-cal-sun" aria-hidden="true" />}
                <b>{d}</b>
              </span>
            ))}
          </div>
        </div>

        <div className="std-place std-up">
          <div>PUEBLA</div>
          <div className="pl-sub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.6" /></svg>
            Puebla, México · 7:00 PM
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CUENTA REGRESIVA ────────────────────────────── */
function remaining() {
  const diff = Math.max(0, TARGET.getTime() - Date.now());
  return {
    d: Math.floor(diff / 864e5),
    h: Math.floor((diff / 36e5) % 24),
    m: Math.floor((diff / 6e4) % 60),
    s: Math.floor((diff / 1e3) % 60),
  };
}

function Medallon({ value, max, label, pad = 2 }: { value: number; max: number; label: string; pad?: number }) {
  const pct = Math.min(1, value / max);
  return (
    <div className="std-md">
      <i className="std-md-sun" aria-hidden="true" />
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(212,175,55,.25)" strokeWidth="1" />
        <circle cx="50" cy="50" r="48" fill="none" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round"
          pathLength={100} strokeDasharray="100" strokeDashoffset={100 - pct * 100}
          style={{ transition: "stroke-dashoffset .6s ease" }} />
      </svg>
      <span className="std-orbit" aria-hidden="true" />
      <span key={value} className="num">{String(value).padStart(pad, "0")}</span>
      <span className="lbl">{label}</span>
    </div>
  );
}

export function Cuenta() {
  const [ref, inView] = useInView<HTMLElement>();
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    setT(remaining());
    const id = setInterval(() => setT(remaining()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <section ref={ref} className={`std-sec ${inView ? "is-in" : ""}`} style={{ minHeight: "92svh" }}>
      <Fondo src="/fondos/bg-lago.webp" pos="center 40%" seed={2} />
      <div className="std-inner">
        <p className="std-eyebrow std-up">Cuenta regresiva</p>
        <h2 className="std-script gold-shine gold-shine-cierre std-up">Faltan</h2>
        <p className="std-sub std-up">para ver la luz de esta nueva etapa</p>
        <div className="std-cd std-up" role="timer" aria-live="off"
          aria-label={`Faltan ${t.d} días, ${t.h} horas, ${t.m} minutos`}>
          <Medallon value={t.d} max={300} label="DÍAS" pad={3} />
          <Medallon value={t.h} max={24} label="HORAS" />
          <Medallon value={t.m} max={60} label="MIN" />
          <Medallon value={t.s} max={60} label="SEG" />
        </div>
      </div>
    </section>
  );
}

/* ── MUY PRONTO + CALENDARIO ─────────────────────── */
export function Pronto() {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <section ref={ref} className={`std-sec ${inView ? "is-in" : ""}`} style={{ minHeight: "92svh" }}>
      <Fondo src="/fondos/bg-2027.webp" pos="center 20%" seed={3} />
      <div className="std-inner" style={{ justifyContent: "flex-end", paddingBottom: 90 }}>
        <p className="std-eyebrow std-up">Muy pronto</p>
        <Regla />
        <h2 className="std-h2 std-up">La invitación formal<br />llegará muy pronto</h2>
        <p className="std-p std-up">
          Con todos los detalles de la recepción y la confirmación de asistencia.
          Mientras tanto, guarda esta fecha en tu calendario.
        </p>
        <a className="std-btn std-up" href={GCAL} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
          Añadir a Google Calendar
        </a>
      </div>
    </section>
  );
}

/* ── CARTA (frase + retrato) ─────────────────────── */
export function Carta({ children, frase }: { children: React.ReactNode; frase: string }) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <section ref={ref} className={`std-sec ${inView ? "is-in" : ""}`}>
      <Fondo src="/fondos/bg-linternas.webp" pos="center top" />
      <div className="std-inner" style={{ paddingTop: 80 }}>
        <p className="std-eyebrow std-up">Una nueva etapa</p>
        <Regla />
        <p className="std-frase std-up">{frase}</p>
        {children}
      </div>
    </section>
  );
}

export function PieStd() {
  return (
    <footer className="std-foot">
      <div className="std-foot-sky" aria-hidden="true" />
      <Linternas seed={4} />
      <div className="std-foot-inner">
        <div className="std-foot-medal">
          <i className="std-foot-sun" aria-hidden="true" />
          <span className="std-foot-ring" aria-hidden="true" />
          <span className="std-foot-j gold-shine gold-shine-cierre">J</span>
        </div>
        <p className="std-foot-name">Julissa Tranquilino Mendoza</p>
        <div className="std-rule" aria-hidden="true"><span /><i /><span /></div>
        <p className="std-foot-date">XXII · V · MMXXVII</p>
        <p className="std-foot-gen">Generación 2023 · 2027</p>
        <p className="std-foot-quote">&ldquo;Por fin veo la luz&rdquo;</p>
        <div className="std-foot-cred">
          <span className="std-foot-line" aria-hidden="true" />
          <p>
            Diseño con cariño por<br />
            <a href="https://www.instagram.com/elysium.invitaciones" target="_blank" rel="noopener noreferrer">@elysium.invitaciones</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
