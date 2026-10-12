"""Genera /public/imagenes/qr-album.png del album compartido.

Uso:  python scripts/gen-qr-album.py "https://drive.google.com/..."

La URL debe coincidir con la constante URL_ALBUM de
components/InstagramSection.tsx (linea ~9).
"""
import sys, os
import qrcode
from qrcode.constants import ERROR_CORRECT_H

URL = sys.argv[1] if len(sys.argv) > 1 else "https://xv-magy.vercel.app"
qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=20, border=2)
qr.add_data(URL)
qr.make(fit=True)
img = qr.make_image(fill_color="#5a2170", back_color="#fbf7ff").convert("RGB").resize((900, 900))
out = os.path.join(os.path.dirname(__file__), "..", "public", "imagenes", "qr-album.png")
img.save(os.path.normpath(out), optimize=True)
print("QR generado para:", URL)
