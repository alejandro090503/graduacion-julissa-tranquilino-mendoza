"""Procesa las 6 fotos de Magaly para el carrusel 3D.
Son retratos de una persona: NO se aplica tinte lila ni realce de fondos.
Solo correccion de orientacion EXIF, redimension a ~1200px de ancho
y compresion JPEG q85 (< 250 KB).
"""
import os
from PIL import Image, ImageOps

DL = r"C:\Users\aleja\Downloads"
OUT = r"C:\Users\aleja\xv-magy\public\imagenes\magy"

# Orden editorial: primero el retrato de XV, luego el ramo, luego la infancia.
FUENTES = [
    ("WhatsApp Image 2026-08-24 at 10.26.25 PM.jpeg", "magy-1"),  # retrato XV con corona
    ("WhatsApp Image 2026-08-24 at 10.26.57 PM.jpeg", "magy-2"),  # ramo lila y dorado
    ("WhatsApp Image 2026-08-24 at 10.43.55 PM.jpeg", "magy-3"),  # nina junto a la chimenea
    ("WhatsApp Image 2026-08-24 at 10.41.51 PM.jpeg", "magy-4"),  # nina con gorrito de fiesta
    ("WhatsApp Image 2026-08-24 at 10.40.31 PM.jpeg", "magy-5"),  # bebe con vestido
    ("WhatsApp Image 2026-08-24 at 10.35.32 PM.jpeg", "magy-6"),  # nina con las manos en la cara
]

ANCHO_MAX = 1200
LIMITE = 250 * 1024


def main():
    os.makedirs(OUT, exist_ok=True)
    for src, dst in FUENTES:
        im = ImageOps.exif_transpose(Image.open(os.path.join(DL, src))).convert("RGB")
        w, h = im.size
        if w > ANCHO_MAX:
            im = im.resize((ANCHO_MAX, round(h * ANCHO_MAX / w)), Image.LANCZOS)
        ruta = os.path.join(OUT, f"{dst}.jpg")
        for q in (85, 80, 75, 70):
            im.save(ruta, "JPEG", quality=q, optimize=True, progressive=True)
            if os.path.getsize(ruta) <= LIMITE:
                break
        print(f"{dst}.jpg  {im.size[0]}x{im.size[1]}  q{q}  {os.path.getsize(ruta)/1024:.0f} KB")


if __name__ == "__main__":
    main()
