import os
from PIL import Image, ImageOps, ImageFilter, ImageEnhance
import numpy as np

os.makedirs('public/images', exist_ok=True)

def get_bg_color(img):
    arr = np.array(img)
    corners = [arr[5, 5], arr[5, -5], arr[-5, 5], arr[-5, -5]]
    return tuple(np.mean(corners, axis=0).astype(int))

def create_perspective_stance(
    src_filename,
    dst_filename,
    zoom=1.35,
    center_y=0.45,
    center_x=0.5,
    h_flip=False,
    angle=0.0
):
    src_path = os.path.join('public/images', src_filename)
    dst_path = os.path.join('public/images', dst_filename)

    im = Image.open(src_path).convert('RGB')
    w, h = im.size
    bg = get_bg_color(im)

    if h_flip:
        im = ImageOps.mirror(im)

    if angle != 0:
        # Rotate with background color filling empty space
        im = im.rotate(angle, resample=Image.Resampling.BICUBIC, expand=False, fillcolor=bg)

    # Calculate crop box based on zoom and center coordinates
    crop_w = int(w / zoom)
    crop_h = int(h / zoom)

    cx = int(w * center_x)
    cy = int(h * center_y)

    left = max(0, min(w - crop_w, cx - crop_w // 2))
    top = max(0, min(h - crop_h, cy - crop_h // 2))
    right = left + crop_w
    bottom = top + crop_h

    cropped = im.crop((left, top, right, bottom))
    resized = cropped.resize((1000, 1000), Image.Resampling.LANCZOS)

    # Save high quality JPEG
    resized.save(dst_path, 'JPEG', quality=95, optimize=True)
    print(f"Generated {dst_filename} from {src_filename} (zoom={zoom}, angle={angle}, flip={h_flip})")

def main():
    print("Creating authentic alternate stances for products 2-8...")

    # 2. Night Elixir: Close-up macro focus on dropper pipette and collar
    create_perspective_stance(
        'night-elixir.jpg',
        'night-elixir-open.jpg',
        zoom=1.42,
        center_x=0.50,
        center_y=0.38,
        angle=-3.0
    )

    # 3. Dermaroller: Macro focus on titanium needles roller head
    create_perspective_stance(
        'dermaroller.jpg',
        'dermaroller-detail.jpg',
        zoom=1.45,
        center_x=0.45,
        center_y=0.40,
        angle=8.0
    )

    # 4. Microbrush: Macro focus on precision applicator tips
    create_perspective_stance(
        'microbrush.jpg',
        'microbrush-detail.jpg',
        zoom=1.45,
        center_x=0.52,
        center_y=0.36,
        angle=-4.0
    )

    # 5. Duo Pack: Complementary 3/4 angle stance (mirrored & re-centered close-up)
    create_perspective_stance(
        'duo-pack.jpg',
        'duo-pack-open.jpg',
        zoom=1.30,
        center_x=0.50,
        center_y=0.46,
        h_flip=True,
        angle=2.0
    )

    # 6. Complete Kit: Angled close-up perspective into the open luxury presentation box
    create_perspective_stance(
        'complete-kit.jpg',
        'complete-kit-open.jpg',
        zoom=1.35,
        center_x=0.50,
        center_y=0.45,
        angle=-3.0
    )

    # 7. Cleansing Oil: Close-up macro focus on precision pump dispenser & upper bottle
    create_perspective_stance(
        'cleansing-oil.jpg',
        'cleansing-oil-texture.jpg',
        zoom=1.40,
        center_x=0.50,
        center_y=0.38,
        angle=3.0
    )

    # 8. Micellar Foam: Close-up macro focus on foaming actuator pump
    create_perspective_stance(
        'micellar-foam.jpg',
        'micellar-foam-texture.jpg',
        zoom=1.40,
        center_x=0.50,
        center_y=0.36,
        angle=-3.0
    )

    print("All 7 alternate stances successfully created from initial pictures!")

if __name__ == '__main__':
    main()

