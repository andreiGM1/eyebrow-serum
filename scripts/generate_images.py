import os
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw, ImageFont

img_path = "public/images/mag-evergrow-bottle.png"
if not os.path.exists(img_path):
    print("Base image not found")
    exit(1)

base = Image.open(img_path).convert("RGB")
w, h = base.size

# 1. Base square product crop (centered on the luxury bottle)
# Crop center square:
min_dim = min(w, h)
left = (w - min_dim) // 2
top = int(h * 0.15)
bottom = top + min_dim
if bottom > h:
    bottom = h
    top = h - min_dim

bottle_square = base.crop((left, top, left + min_dim, bottom)).resize((1000, 1000), Image.Resampling.LANCZOS)
bottle_square.save("public/images/mag-evergrow-bottle.png", "PNG", optimize=True)

# 2. Night Elixir (Deeper obsidian, indigo-golden hue)
enhancer = ImageEnhance.Color(bottle_square)
night = enhancer.enhance(0.7)
enhancer_b = ImageEnhance.Brightness(night)
night = enhancer_b.enhance(0.9)
# Add cool/deep tone overlay
overlay = Image.new("RGB", (1000, 1000), (12, 18, 30))
night = Image.blend(night, overlay, 0.22)
night.save("public/images/night-elixir.jpg", "JPEG", quality=92)

# 3. Duo Pack (Double bottle composition)
duo = Image.new("RGB", (1000, 1000), (10, 14, 12))
b_left = bottle_square.resize((700, 700), Image.Resampling.LANCZOS)
b_right = bottle_square.resize((720, 720), Image.Resampling.LANCZOS)
duo.paste(b_left, (30, 200))
duo.paste(b_right, (260, 160))
duo.save("public/images/duo-pack.jpg", "JPEG", quality=92)

# 4. Complete Kit (Atelier Complete Box composition)
kit = Image.new("RGB", (1000, 1000), (11, 15, 13))
b_mid = bottle_square.resize((650, 650), Image.Resampling.LANCZOS)
b_side1 = night.resize((500, 500), Image.Resampling.LANCZOS)
kit.paste(b_side1, (40, 300))
kit.paste(b_mid, (320, 200))
kit.save("public/images/complete-kit.jpg", "JPEG", quality=92)

# 5. Cleansing Oil (Warm golden amber tone)
amber_overlay = Image.new("RGB", (1000, 1000), (45, 32, 12))
oil = Image.blend(bottle_square, amber_overlay, 0.25)
enhancer_c = ImageEnhance.Contrast(oil)
oil = enhancer_c.enhance(1.1)
oil.save("public/images/cleansing-oil.jpg", "JPEG", quality=92)

# 6. Micellar Foam (Soft botanical sage & rose tone)
rose_overlay = Image.new("RGB", (1000, 1000), (35, 20, 25))
foam = Image.blend(bottle_square, rose_overlay, 0.28)
foam.save("public/images/micellar-foam.jpg", "JPEG", quality=92)

# 7. Serum Texture (Macro crop of the golden liquid / dropper area)
macro_crop = base.crop((int(w * 0.2), int(h * 0.3), int(w * 0.8), int(h * 0.65))).resize((1000, 1000), Image.Resampling.LANCZOS)
enhancer_sat = ImageEnhance.Color(macro_crop)
macro = enhancer_sat.enhance(1.3)
macro.save("public/images/serum-texture.jpg", "JPEG", quality=92)

# 8. Dermaroller & Microbrush (Clinical macro aesthetics)
derm = macro_crop.filter(ImageFilter.EDGE_ENHANCE)
derm_overlay = Image.new("RGB", (1000, 1000), (18, 26, 22))
derm = Image.blend(derm, derm_overlay, 0.35)
derm.save("public/images/dermaroller.jpg", "JPEG", quality=92)

micro = macro_crop.filter(ImageFilter.DETAIL)
micro_overlay = Image.new("RGB", (1000, 1000), (22, 22, 22))
micro = Image.blend(micro, micro_overlay, 0.3)
micro.save("public/images/microbrush.jpg", "JPEG", quality=92)

# 9. Categories
bottle_square.save("public/images/category-serums.jpg", "JPEG", quality=90)
derm.save("public/images/category-accessories.jpg", "JPEG", quality=90)
kit.save("public/images/category-bundles.jpg", "JPEG", quality=90)
oil.save("public/images/category-cleansing.jpg", "JPEG", quality=90)

print("All luxury product images generated successfully!")
