"""Procesa los 4 fondos nuevos (alcohol-ink lila Rapunzel) con el mismo
tratamiento editorial que los fondos anteriores:
  +30% saturacion, +18% contraste, ~8% tinte lila.
Genera variante desktop (1920px de ancho) y movil (-m, 800px), JPEG < 250 KB.
"""
import os
from PIL import Image, ImageEnhance, ImageOps

DL = r"C:\Users\aleja\Downloads"
OUT = r"C:\Users\aleja\xv-magy\public\fondos"

# (archivo origen, nombre destino)
FUENTES = [
    ("descarga (54).jpeg", "01-rapunzel-torre-lila"),
    ("descarga (53).jpeg", "02-castillo-trenza"),
    ("descarga (55).jpeg", "03-castillo-linternas"),
    ("descarga (56).jpeg", "04-rapunzel-pascal"),
]

TINTE = (198, 150, 232)   # lila
TINTE_ALPHA = 0.08        # 8%
SAT = 1.30
CON = 1.18


def tratar(im: Image.Image) -> Image.Image:
    im = ImageOps.exif_transpose(im).convert("RGB")
    im = ImageEnhance.Color(im).enhance(SAT)
    im = ImageEnhance.Contrast(im).enhance(CON)
    capa = Image.new("RGB", im.size, TINTE)
    return Image.blend(im, capa, TINTE_ALPHA)


def guardar(im: Image.Image, ancho: int, ruta: str, limite=250 * 1024):
    w, h = im.size
    r = im.resize((ancho, round(h * ancho / w)), Image.LANCZOS)
    for q in (88, 84, 80, 76, 72, 68, 62, 56):
        r.save(ruta, "JPEG", quality=q, optimize=True, progressive=True)
        if os.path.getsize(ruta) <= limite:
            break
    return os.path.getsize(ruta), q, r.size


def main():
    os.makedirs(OUT, exist_ok=True)
    # limpiar fondos viejos
    for f in os.listdir(OUT):
        os.remove(os.path.join(OUT, f))

    for src, dst in FUENTES:
        im = tratar(Image.open(os.path.join(DL, src)))
        for ancho, suf in ((1920, ""), (800, "-m")):
            ruta = os.path.join(OUT, f"{dst}{suf}.jpg")
            size, q, dims = guardar(im, ancho, ruta)
            print(f"{dst}{suf}.jpg  {dims[0]}x{dims[1]}  q{q}  {size/1024:.0f} KB")


if __name__ == "__main__":
    main()
