from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

src_path = Path(__file__).with_name("hero-source.png")
out_path = Path(__file__).with_name("hero-express.png")

src = Image.open(src_path).convert("RGBA")
# Crop a bit of empty margin if any
box = src.getbbox()
if box:
    src = src.crop(box)

W, H = 1600, 980
canvas = Image.new("RGB", (W, H), "#f7fbfa")
draw = ImageDraw.Draw(canvas, "RGBA")

# Soft light wash
for i in range(H):
    t = i / (H - 1)
    r = int(247 + (255 - 247) * t)
    g = int(251 + (255 - 251) * t)
    b = int(250 + (255 - 250) * t)
    draw.line([(0, i), (W, i)], fill=(r, g, b))

# Teal accents
draw.ellipse((980, -220, 1760, 560), fill=(0, 183, 148, 28))
draw.ellipse((-180, 620, 420, 1120), fill=(0, 158, 128, 18))
draw.ellipse((1280, 640, 1720, 1080), fill=(31, 52, 64, 10))

# Target window size
max_w, max_h = 1280, 760
ratio = min(max_w / src.width, max_h / src.height)
nw, nh = int(src.width * ratio), int(src.height * ratio)
ui = src.resize((nw, nh), Image.Resampling.LANCZOS)

chrome_h = 42
pad = 10
win_w, win_h = nw + pad * 2, nh + chrome_h + pad
x = (W - win_w) // 2
y = (H - win_h) // 2 + 8

# Shadow
shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
sd.rounded_rectangle((x + 10, y + 18, x + win_w + 10, y + win_h + 18), 18, fill=(31, 52, 64, 55))
shadow = shadow.filter(ImageFilter.GaussianBlur(22))
canvas = Image.alpha_composite(canvas.convert("RGBA"), shadow)

# Window
win = ImageDraw.Draw(canvas)
win.rounded_rectangle((x, y, x + win_w, y + win_h), 16, fill=(255, 255, 255, 255))
win.rectangle((x, y, x + win_w, y + chrome_h), fill=(245, 248, 247, 255))
# clip top of chrome by redrawing rounded top via overlay is enough
win.ellipse((x + 18, y + 15, x + 32, y + 29), fill=(255, 107, 107, 255))
win.ellipse((x + 40, y + 15, x + 54, y + 29), fill=(255, 197, 61, 255))
win.ellipse((x + 62, y + 15, x + 76, y + 29), fill=(0, 183, 148, 255))
win.text((x + 92, y + 12), "LOGI-Cube EXPRESS  /  日計表入力", fill=(31, 52, 64, 210))

canvas.paste(ui, (x + pad, y + chrome_h), ui)

# Thin border
win.rounded_rectangle((x, y, x + win_w, y + win_h), 16, outline=(220, 233, 230, 255), width=1)

canvas.convert("RGB").save(out_path, "PNG", optimize=True)
print(out_path, canvas.size)
