"use client";

export default function Ornament() {
  return (
    <div className="flex justify-center py-3 px-4">
      <svg viewBox="0 0 300 42" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 300, height: 42 }}>
        <line x1="0" y1="20" x2="88" y2="20" stroke="#000cd9" strokeWidth="0.85" opacity="0.34"/>
        <line x1="0" y1="23" x2="80" y2="23" stroke="#000cd9" strokeWidth="0.38" opacity="0.16"/>

        {/* Enredadera izquierda: tallo verde + hojas */}
        <path d="M88 20 Q98 20 104 14 Q110 8 118 10" stroke="var(--green)" strokeWidth="1.1" fill="none" opacity="0.85" strokeLinecap="round"/>
        <path d="M99 18.5 Q94 10.5 102.5 7.5 Q106.5 14 99 18.5 Z" fill="var(--green-soft)" stroke="var(--green)" strokeWidth="0.75" opacity="0.95"/>
        <path d="M108 13 Q106 4.5 114.5 4 Q115 11 108 13 Z" fill="var(--green)" fillOpacity="0.55" stroke="var(--green-deep)" strokeWidth="0.7" opacity="0.95"/>
        <path d="M104 21.5 Q100 29.5 108.5 31 Q110 24 104 21.5 Z" fill="var(--green-soft)" stroke="var(--green)" strokeWidth="0.7" opacity="0.9"/>

        <path d="M122 21.5 L126.5 15.5 L131 21.5 L126.5 27.5 Z" fill="#c4ccfa" fillOpacity="0.40" stroke="#c4ccfa" strokeWidth="0.4" opacity="0.5"/>
        <path d="M150 6 L165 21.5 L150 37 L135 21.5 Z" fill="rgba(0,12,217,0.09)" stroke="#000cd9" strokeWidth="1.05" opacity="0.50"/>
        <circle cx="150" cy="21.5" r="4.5" fill="rgba(212,175,55,0.35)" stroke="#d4af37" strokeWidth="0.7" opacity="0.70"/>
        <path d="M169 21.5 L173.5 15.5 L178 21.5 L173.5 27.5 Z" fill="#c4ccfa" fillOpacity="0.40" stroke="#c4ccfa" strokeWidth="0.4" opacity="0.5"/>

        {/* Enredadera derecha (espejo) */}
        <path d="M212 20 Q202 20 196 14 Q190 8 182 10" stroke="var(--green)" strokeWidth="1.1" fill="none" opacity="0.85" strokeLinecap="round"/>
        <path d="M201 18.5 Q206 10.5 197.5 7.5 Q193.5 14 201 18.5 Z" fill="var(--green-soft)" stroke="var(--green)" strokeWidth="0.75" opacity="0.95"/>
        <path d="M192 13 Q194 4.5 185.5 4 Q185 11 192 13 Z" fill="var(--green)" fillOpacity="0.55" stroke="var(--green-deep)" strokeWidth="0.7" opacity="0.95"/>
        <path d="M196 21.5 Q200 29.5 191.5 31 Q190 24 196 21.5 Z" fill="var(--green-soft)" stroke="var(--green)" strokeWidth="0.7" opacity="0.9"/>

        <line x1="212" y1="20" x2="300" y2="20" stroke="#000cd9" strokeWidth="0.85" opacity="0.34"/>
        <line x1="220" y1="23" x2="300" y2="23" stroke="#000cd9" strokeWidth="0.38" opacity="0.16"/>
      </svg>
    </div>
  );
}
