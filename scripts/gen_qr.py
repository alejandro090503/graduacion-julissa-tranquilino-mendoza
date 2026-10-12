import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image

URL = "https://drive.google.com/drive/folders/1nRhbtdCeDRWS84QN7q1chDWFvFnuE41s?usp=sharing"

qr = qrcode.QRCode(
    version=None,
    error_correction=ERROR_CORRECT_H,
    box_size=20,
    border=4,
)
qr.add_data(URL)
qr.make(fit=True)

# Color burdeos del brand sobre blanco
img = qr.make_image(fill_color="#8b1a52", back_color="#ffffff").convert("RGB")
# Forzar 1024x1024
img = img.resize((1024, 1024), Image.NEAREST)

out_desktop = r"C:\Users\aleja\Desktop\Vale15-QR-Album.png"
out_project = r"C:\Users\aleja\xv-valentina\public\imagenes\Vale15-QR-Album.png"

img.save(out_desktop, "PNG")
img.save(out_project, "PNG")

print(f"Generado QR -> {URL}")
print(f"Desktop: {out_desktop}")
print(f"Project: {out_project}")
print(f"Size: {img.size}")
