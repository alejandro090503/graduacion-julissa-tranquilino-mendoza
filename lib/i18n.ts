"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

export const STORAGE_KEY = "grad-julissa-lang";

/**
 * Diccionario central. TODA cadena visible de la invitación vive aquí.
 * Nombres propios (Magaly, Magy, cortejo, venues) NO se traducen.
 */
export const dict = {
  es: {
    /* ── Selector de idioma ── */
    langTitle: "Elige tu idioma",
    langSub: "Choose your language",
    langEs: "Español",
    langEn: "English",
    langAria: "Ver la invitación en español",
    langAriaEn: "View the invitation in English",
    langToggleAria: "Cambiar idioma",

    /* ── Intro ── */
    introTap: "Toca para abrir",
    introTapAria: "Toca para abrir la invitación",
    introSkip: "Saltar",

    /* ── Hero ── */
    heroYears: "Graduación",
    heroDate: "22 · Mayo · 2027",
    heroForYou: "Esta invitación es para",
    heroWith: "con",

    /* ── Frase ── */
    phrase:
      "Después de cuatro años de esfuerzo, aprendizaje y sueños, por fin veo la luz de una nueva etapa. Aparta la fecha: muy pronto recibirás la invitación formal a mi graduación.",

    /* ── Familia ── */
    familyKicker: "Con el amor y apoyo de",
    familyTitle: "Mi Familia",

    /* ── Cierre ── */
    closingText:
      "Guarda la fecha en tu calendario. Muy pronto te enviaré todos los detalles de esta noche tan especial.",
    closingName: "Julissa",
    closingAlt: "Julissa con vestido de gala",
    courtTitle: "Mis Padres",

    /* ── Fecha ── */
    dateBanner: "22 · Mayo · 2027",

    /* ── Countdown ── */
    countdownTitle: "Cuenta Regresiva",
    countdownSub: "Cada segundo más cerca de mi graduación",
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",

    /* ── Ubicación ── */
    locKicker: "Te esperamos en",
    locTitle: "Ubicación",
    locButton: "Cómo Llegar",
    locCityChurch: "Puebla, Puebla",
    locCityVenue: "Calle 103 Ote 9-1, Arboledas de Loma Bella, Puebla, Pue.",
    altChurch: "Ilustración en acuarela de St. Martin de Porres Catholic Church",
    altVenue: "Ilustración en acuarela del salón de recepción",

    /* ── Calendario ── */
    calKicker: "No lo olvides",
    calTitle: "Guárdalo",
    calSub: "Agrega el evento a tu calendario",
    calButton: "Añadir a Google Calendar",
    calEventTitle: "Graduación de Julissa",
    calEventDetails: "Graduación de Julissa Tranquilino Mendoza · Generación 2023-2027 · Scala Recepciones Salón Rosa, Puebla.",

    /* ── Itinerario ── */
    itinTitle: "Itinerario",
    itMass: "Recepción",
    itDinner: "Cena",
    itWaltz: "Brindis",
    itDance: "Baile",
    itMassIcon: "Icono de birrete",
    itDinnerIcon: "Icono de cubiertos",
    itWaltzIcon: "Icono de copas",
    itDanceIcon: "Icono de fiesta",

    /* ── Dress code ── */
    dressKicker: "Etiqueta",
    dressTitle: "Dress Code",
    dressFormal: "Por confirmar",
    dressNote1: "Te pedimos con cariño NO vestir de azul rey ni de dorado:",
    dressNote2: "son los colores de la graduada.",
    dressNote3: "",
    dressAvoid: "Por favor evita estos colores",
    dressComfort: "El mejor look es aquel con el que te sientas comod@",
    dressMen: "Caballeros",
    dressWomen: "Damas",
    altMen: "Caballero, traje formal",
    altWomen: "Dama, vestido formal",

    /* ── Solo adultos ── */
    adultsOnly:
      "Con cariño, este evento está pensado para nuestros invitados adultos.",

    /* ── Mesa de regalos ── */
    giftsTitle: "Mesa de Regalos",
    giftsIntro:
      "Tu cariño y presencia son el mejor regalo que puedo recibir. Si deseas obsequiarme algo, te dejo esta sugerencia.",
    envelopeTitle: "Lluvia de Sobres",
    envelopeLine1: "Un sobre con tu bendición",
    envelopeLine2: "llenará mi corazón de alegría.",
    envelopeHint: "Toca el sobre",
    envelopeAria: "Sobre — toca para abrir",
    giftChoiceTitle: "Obsequio de tu Elección",
    giftChoiceText:
      "Cualquier detalle elegido con cariño será atesorado por siempre.",

    /* ── Álbum ── */
    albumKicker: "Comparte el momento",
    albumTitle: "Álbum Compartido",
    albumText:
      "Escanea el código y comparte los mejores momentos de la fiesta en el álbum.",
    albumButton: "Abrir el álbum",
    albumFoot: "Cada foto que captures hará este día aún más especial.",
    altQr: "Código QR del álbum compartido — escanea para entrar",

    /* ── RSVP ── */
    rsvpTitle: "Confirmación",
    rsvpSub: "Favor de confirmar tu asistencia a la brevedad",
    rsvpYes: "Sí asistiré",
    rsvpNo: "No asistiré",
    rsvpSubmit: "Confirmar",
    rsvpGuest: "Invitado",
    rsvpNamePlaceholder: "Tu nombre completo",
    rsvpSent: "Respuesta enviada ✦",
    rsvpThanksYes:
      "¡Gracias por confirmar! Si cambias de opinión puedes actualizar tu respuesta cuando quieras.",
    rsvpThanksNo:
      "Gracias por avisarnos. Si cambias de opinión puedes actualizar tu respuesta cuando quieras.",
    rsvpUpdate: "Actualizar respuesta",
    rsvpErrSend: "Hubo un problema al enviar. Intenta de nuevo.",
    rsvpErrNet: "Sin conexión. Verifica tu internet e intenta de nuevo.",
    rsvpClosedShort: "El plazo para confirmar ya cerró.",
    rsvpClosed: "✦ El plazo para confirmar ya cerró.",
    rsvpClosedNote:
      "Si necesitas ajustar tu respuesta, por favor contacta directamente.",
    rsvpPickOne: "Selecciona si asistirás o no.",
    rsvpSending: "Enviando…",
    rsvpConfirmed: "¡Confirmado! ✦",
    rsvpCompanion: "Nombre acompañante",
    rsvpAtLeastOne: "Por favor escribe al menos un nombre.",
    rsvpClosedBtn: "Plazo cerrado",
    rsvpAddCompanion: "+ Agregar acompañante",
    rsvpRemove: "Quitar acompañante",
    rsvpPasesLabel: "Pases",
    rsvpPasesNote1: "Tienes 1 pase reservado.",
    rsvpPasesNoteN: "Tienes {n} pases reservados.",
    rsvpGuestPlaceholder: "Nombre completo del invitado",
    rsvpGraciasYes: "¡Gracias por confirmar!",
    rsvpGraciasNo: "Gracias por avisarnos",
    rsvpGraciasOne: "Te esperamos, {nombre}.",
    rsvpGraciasMany: "Confirmamos {n} lugares: {lista}.",
    rsvpGraciasNoSub: "Lamentamos que no puedas acompañarnos. Te vamos a extrañar.",
    rsvpEditar: "Modificar mi respuesta",
    rsvpContadorNota: "Agrega un pase por cada persona que vaya a asistir. Si no los usarás todos, no hay problema: deja solo los que necesites.",
    rsvpAgregarPase: "+ Agregar un pase",
    rsvpQuitarPase: "Quitar este pase",
    rsvpTopePases: "Ya estás usando todos tus pases.",

    /* ── Carrusel de fotos ── */
    galKicker: "Mis recuerdos",
    galTitle: "Momentos",
    galHint: "Arrastra para girar",
    galAlt1: "Julissa con su vestido de gala",
    galAlt2: "Julissa con su vestido de gala",
    galAlt3: "Julissa con su vestido de gala",
    galAlt4: "Julissa con su vestido de gala",
    galAlt5: "Julissa con su vestido de gala",
    galAlt6: "Julissa con su vestido de gala",
    galAlt7: "Julissa con su vestido de gala",
    galAlt8: "Julissa con su vestido de gala",

    /* ── Footer / música ── */
    footerDate: "XXII · Mayo · MMXXVII",
    musicPlay: "Reproducir música",
    musicPause: "Pausar música",
  },

  en: {
    /* ── Language gate ── */
    langTitle: "Choose your language",
    langSub: "Elige tu idioma",
    langEs: "Español",
    langEn: "English",
    langAria: "View the invitation in Spanish",
    langAriaEn: "View the invitation in English",
    langToggleAria: "Change language",

    /* ── Intro ── */
    introTap: "Tap to open",
    introTapAria: "Tap to open the invitation",
    introSkip: "Skip",

    /* ── Hero ── */
    heroYears: "Quinceañera",
    heroDate: "October · 3 · 2026",
    heroForYou: "This invitation is for",
    heroWith: "with",

    /* ── Phrase ── */
    phrase:
      "Today a new chapter begins, full of dreams, hopes and moments I will keep in my heart forever. I want to share with you the excitement, the magic and the joy of this very special night.",

    /* ── Family ── */
    familyKicker: "With the blessing of",
    familyTitle: "My Family",

    /* ── Cierre ── */
    closingText:
      "With great excitement and love, I look forward to sharing this very special day with you. Your presence will make this celebration a memory full of joy and love.",
    closingName: "Magaly",
    closingAlt: "Magaly as a little girl",
    courtTitle: "Court of Honor",

    /* ── Date ── */
    dateBanner: "October · 3 · 2026",

    /* ── Countdown ── */
    countdownTitle: "Countdown",
    countdownSub: "Every second closer to this special day",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",

    /* ── Location ── */
    locKicker: "We'll be waiting at",
    locTitle: "Location",
    locButton: "Get Directions",
    locCityChurch: "Taylorsville, Utah",
    locCityVenue: "West Valley City, Utah",
    altChurch: "Watercolor illustration of St. Martin de Porres Catholic Church",
    altVenue: "Watercolor illustration of the Del Rey Event Center",

    /* ── Calendar ── */
    calKicker: "Don't forget",
    calTitle: "Save the Date",
    calSub: "Add the event to your calendar",
    calButton: "Add to Google Calendar",
    calEventTitle: "Magy's Quinceañera",
    calEventDetails: "Magaly's Quinceañera celebration · Mass in Taylorsville, UT · Reception in West Valley City, UT.",

    /* ── Itinerary ── */
    itinTitle: "Itinerary",
    itMass: "Mass",
    itDinner: "Dinner / Reception",
    itWaltz: "Quinceañera's Waltz",
    itDance: "Dancing",
    itMassIcon: "Church icon",
    itDinnerIcon: "Cutlery icon",
    itWaltzIcon: "Waltz icon",
    itDanceIcon: "Party icon",

    /* ── Dress code ── */
    dressKicker: "Attire",
    dressTitle: "Dress Code",
    dressFormal: "Come as you feel comfortable",
    dressNote1: "We kindly ask you NOT to wear lilac or gold:",
    dressNote2: "these are the quinceañera's colors.",
    dressNote3: "",
    dressAvoid: "Please avoid these colors",
    dressComfort: "The best look is the one you feel most comfortable in",
    dressMen: "Gentlemen",
    dressWomen: "Ladies",
    altMen: "Gentleman in formal suit",
    altWomen: "Lady in formal dress",

    /* ── Adults only ── */
    adultsOnly: "With love, this celebration is planned for our adult guests.",

    /* ── Gifts ── */
    giftsTitle: "Gift Registry",
    giftsIntro:
      "Your love and your presence are the greatest gift I could receive. If you would like to give me something, here are my suggestions.",
    envelopeTitle: "Card & Gift Shower",
    envelopeLine1: "An envelope with your blessing",
    envelopeLine2: "will fill my heart with joy.",
    envelopeHint: "Tap the envelope",
    envelopeAria: "Envelope — tap to open",
    giftChoiceTitle: "A Gift of Your Choice",
    giftChoiceText:
      "Anything chosen with love will be treasured forever.",

    /* ── Album ── */
    albumKicker: "Share the moment",
    albumTitle: "Shared Album",
    albumText:
      "Scan the code and share the best moments of the party in the album.",
    albumButton: "Open the album",
    albumFoot: "Every photo you capture will make this day even more special.",
    altQr: "QR code for the shared album — scan to join",

    /* ── RSVP ── */
    rsvpTitle: "RSVP",
    rsvpSub: "Please confirm your attendance as soon as possible",
    rsvpYes: "I will attend",
    rsvpNo: "I can't attend",
    rsvpSubmit: "Confirm",
    rsvpGuest: "Guest",
    rsvpNamePlaceholder: "Your full name",
    rsvpSent: "Response sent ✦",
    rsvpThanksYes:
      "Thank you for confirming! If you change your mind you can update your response any time.",
    rsvpThanksNo:
      "Thank you for letting us know. If you change your mind you can update your response any time.",
    rsvpUpdate: "Update response",
    rsvpErrSend: "Something went wrong. Please try again.",
    rsvpErrNet: "No connection. Check your internet and try again.",
    rsvpClosedShort: "The RSVP deadline has passed.",
    rsvpClosed: "✦ The RSVP deadline has passed.",
    rsvpClosedNote:
      "If you need to change your response, please get in touch directly.",
    rsvpPickOne: "Please select whether you will attend.",
    rsvpSending: "Sending…",
    rsvpConfirmed: "Confirmed! ✦",
    rsvpCompanion: "Guest name",
    rsvpAtLeastOne: "Please enter at least one name.",
    rsvpClosedBtn: "RSVP closed",
    rsvpAddCompanion: "+ Add a guest",
    rsvpRemove: "Remove guest",
    rsvpPasesLabel: "Passes",
    rsvpPasesNote1: "You have 1 reserved pass.",
    rsvpPasesNoteN: "You have {n} reserved passes.",
    rsvpGuestPlaceholder: "Guest full name",
    rsvpGraciasYes: "Thank you for confirming!",
    rsvpGraciasNo: "Thank you for letting us know",
    rsvpGraciasOne: "We look forward to seeing you, {nombre}.",
    rsvpGraciasMany: "We confirmed {n} seats: {lista}.",
    rsvpGraciasNoSub: "We are sorry you cannot join us. We will miss you.",
    rsvpEditar: "Update my response",
    rsvpContadorNota: "Add one pass for each person who will attend. If you will not use them all, no problem — just keep the ones you need.",
    rsvpAgregarPase: "+ Add a pass",
    rsvpQuitarPase: "Remove this pass",
    rsvpTopePases: "You are already using all of your passes.",

    /* ── Photo carousel ── */
    galKicker: "My memories",
    galTitle: "Moments",
    galHint: "Drag to spin",
    galAlt1: "Magaly at her quinceañera photo shoot wearing her crown",
    galAlt2: "Magaly holding her lilac and gold bouquet",
    galAlt3: "Magaly as a little girl hugging her Rapunzel doll",
    galAlt4: "Magaly as a little girl wearing a party hat",
    galAlt5: "Magaly as a baby in her floral dress",
    galAlt6: "Magaly as a little girl with her hands on her cheeks",
    galAlt7: "Baby Magaly asleep among blankets",
    galAlt8: "Baby Magaly wearing a flower headband",

    /* ── Footer / music ── */
    footerDate: "III · October · MMXXVI",
    musicPlay: "Play music",
    musicPause: "Pause music",
  },
} as const;

export type TKey = keyof (typeof dict)["es"];

interface Ctx {
  lang: Lang;
  /** null hasta que el invitado elige (o se recupera de localStorage) */
  chosen: Lang | null;
  /** true una vez leído localStorage en el cliente */
  hydrated: boolean;
  setLang: (l: Lang) => void;
  t: (k: TKey) => string;
}

const LanguageContext = createContext<Ctx>({
  lang: "es",
  chosen: null,
  hydrated: false,
  setLang: () => {},
  t: (k) => dict.es[k],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [chosen, setChosen] = useState<Lang | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en") setChosen(saved);
    } catch {}
    setHydrated(true);
  }, []);

  const lang: Lang = chosen ?? "es";

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setChosen(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const t = useCallback((k: TKey) => dict[lang][k], [lang]);

  const value = useMemo(
    () => ({ lang, chosen: hydrated ? chosen : null, hydrated, setLang, t }),
    [lang, chosen, hydrated, setLang, t]
  );

  return createElement(LanguageContext.Provider, { value }, children);
}

export function useLang() {
  return useContext(LanguageContext);
}

/** Atajo: solo la función de traducción */
export function useT() {
  return useContext(LanguageContext).t;
}
