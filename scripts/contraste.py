"""Valida contraste WCAG sobre el COMPOSITADO REAL de la invitacion.

Pila reconstruida con los valores de getComputedStyle de la pagina viva:
  1. fondo de pagina blanco
  2. capa /fondos/*.jpg  a opacidad 0.92   (MAX_OPACITY de FondosScroll)
  3. velo lila del FondosScroll (linear-gradient 180deg)
  4. columna de contenido  rgba(251,247,255,0.72)
Se mide cada color de texto real contra CADA pixel del resultado y se
reporta el peor ratio.
"""
import os
from PIL import Image

FONDOS = r"C:\Users\aleja\xv-magy\public\fondos"

# ── velo de FondosScroll.tsx (stops del linear-gradient 180deg) ──
VELO = [
    (0.00, (251, 247, 255), 0.26),
    (0.35, (239, 202, 255), 0.10),
    (0.65, (239, 202, 255), 0.12),
    (1.00, (251, 247, 255), 0.30),
]
COLUMNA = ((251, 247, 255), 0.72)
OP_FONDO = 0.92

# ── colores de texto leidos de getComputedStyle ──
TEXTOS = [
    ("Toca para abrir",        (74, 26, 94),  1.0),
    ("Anos / frase / fecha",   (90, 33, 112), 1.0),
    ("Nombres del cortejo",    (31, 22, 32),  1.0),
    ("Ciudad / itinerario",    (31, 22, 32),  0.86),
    ("Kickers lila",           (109, 44, 134), 1.0),
    ("Toca el sobre",          (92, 67, 0),   1.0),
    ("Toggle RSVP inactivo",   (101, 53, 82), 1.0),
    ("Verde de apoyo (--green)", (59, 81, 51), 1.0),
    ("Verde profundo",          (47, 66, 41), 1.0),
]


def lum(c):
    def f(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2])


def ratio(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def over(fg, alpha, bg):
    return tuple(round(fg[i] * alpha + bg[i] * (1 - alpha)) for i in range(3))


def velo_en(y):
    """Color y alpha del velo interpolados a la altura relativa y."""
    for i in range(len(VELO) - 1):
        p0, c0, a0 = VELO[i]
        p1, c1, a1 = VELO[i + 1]
        if p0 <= y <= p1:
            k = 0 if p1 == p0 else (y - p0) / (p1 - p0)
            c = tuple(round(c0[j] + (c1[j] - c0[j]) * k) for j in range(3))
            return c, a0 + (a1 - a0) * k
    return VELO[-1][1], VELO[-1][2]


def main():
    peor = (999, None, None)
    for nombre in sorted(f for f in os.listdir(FONDOS) if f.endswith(".jpg") and "-m" not in f):
        im = Image.open(os.path.join(FONDOS, nombre)).convert("RGB")
        # muestreo: 60 filas x 40 columnas es de sobra y es rapido
        im = im.resize((40, 60), Image.LANCZOS)
        w, h = im.size
        px = im.load()
        for yy in range(h):
            cv, av = velo_en(yy / (h - 1))
            for xx in range(w):
                bg = over(px[xx, yy], OP_FONDO, (255, 255, 255))   # capa fondo
                bg = over(cv, av, bg)                              # velo lila
                bg = over(COLUMNA[0], COLUMNA[1], bg)              # columna
                for etiqueta, col, a in TEXTOS:
                    fg = over(col, a, bg)
                    r = ratio(fg, bg)
                    if r < peor[0]:
                        peor = (r, etiqueta, nombre)

    print(f"PEOR CONTRASTE: {peor[0]:.2f}:1  ->  {peor[1]}  (fondo {peor[2]})")
    print("AA 4.5:1 ->", "OK" if peor[0] >= 4.5 else "FALLA")

    # Botones dorados/lila: texto blanco sobre el gradiente #8b3fa6 -> #5a2170
    for c in ((139, 63, 166), (90, 33, 112)):
        print(f"  Texto blanco sobre rgb{c}: {ratio((255,255,255), c):.2f}:1")


if __name__ == "__main__":
    main()
