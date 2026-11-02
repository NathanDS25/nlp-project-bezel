import os
import math
import uuid
import time
import imageio.v2 as imageio
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

MOTION_LIBRARY = [
    {
        "id": "runway_walk",
        "path": "assets/animations/runway_towering_walk_motion.mp4",
        "keywords": ["runway", "walk", "catwalk", "model", "stride", "flares", "pants", "towering", "perspective", "low-angle", "fashion week", "paris", "knitwear", "pastel", "white"],
        "default_title": "RUNWAY PERSPECTIVE CATWALK"
    },
    {
        "id": "runway_cloud_tulle",
        "path": "assets/animations/runway_cloud_tulle_motion.mp4",
        "keywords": ["gown", "dress", "tulle", "ballgown", "couture", "blue", "puff", "cloud", "grand", "volume", "evening", "haute", "dramatic"],
        "default_title": "HAUTE COUTURE TULLE CLOUD GOWN"
    },
    {
        "id": "molten_liquid_silver",
        "path": "assets/animations/molten_liquid_silver_motion.mp4",
        "keywords": ["silver", "liquid", "chrome", "metallic", "platinum", "molten", "fluid", "mercury", "reflection", "shine", "futuristic", "cyber"],
        "default_title": "LIQUID CHROME RUNWAY INSTALLATION"
    },
    {
        "id": "crimson_gold",
        "path": "assets/animations/crimson_gold_motion.mp4",
        "keywords": ["crimson", "velvet", "bordeaux", "red", "gold", "cape", "cloak", "robe", "fire", "energy", "swirl", "wine", "dark"],
        "default_title": "BORDEAUX VELVET & GOLD CAPE"
    },
    {
        "id": "streetwear_sneaker_ugc",
        "path": "assets/animations/streetwear_sneaker_ugc_motion.mp4",
        "keywords": ["streetwear", "sneaker", "shoes", "jacket", "casual", "ugc", "unboxing", "review", "colorful", "kicks", "hoodie", "denim"],
        "default_title": "STREETWEAR SNEAKER REEL"
    },
    {
        "id": "beauty_skincare_ugc",
        "path": "assets/animations/beauty_skincare_ugc_motion.mp4",
        "keywords": ["skincare", "beauty", "face", "glow", "serum", "clean", "cream", "dewy", "cosmetic", "glass skin", "natural", "dermal"],
        "default_title": "DEWY GLASS SKIN BEAUTY REEL"
    },
    {
        "id": "luxury_wardrobe_ugc",
        "path": "assets/animations/luxury_ugc_fashion_motion.mp4",
        "keywords": ["try on", "outfit", "wardrobe", "haul", "styling", "top", "vest", "shirt", "holding", "bedroom", "casual chic"],
        "default_title": "LUXURY WARDROBE TRY-ON REEL"
    },
    {
        "id": "skyline_dolly",
        "path": "assets/animations/skyline_dolly_motion.mp4",
        "keywords": ["suit", "blazer", "tailored", "skyline", "rooftop", "dolly", "urban", "architecture", "classic", "menswear", "black suit"],
        "default_title": "BESPOKE TAILORED SUIT SKYLINE"
    },
    {
        "id": "maison_brune_luxury",
        "path": "assets/animations/maison_brune_luxury_motion.mp4",
        "keywords": ["brand", "luxury", "shopping", "bag", "reveal", "maison", "packaging", "boutique", "unboxing", "gift", "red bag"],
        "default_title": "MAISON LUXURY PRODUCT REVEAL"
    },
    {
        "id": "floating_islands_cinematic",
        "path": "assets/animations/floating_islands_cinematic_motion.mp4",
        "keywords": ["nature", "outdoor", "landscape", "avatar", "island", "cinematic", "drone", "aerial", "mountain", "epic", "fantasy"],
        "default_title": "CINEMATIC DRONE VISTA REEL"
    }
]


def match_motion_source(concept: str) -> dict:
    """Matches user prompt concept to the most accurate genuine 24 fps motion clip."""
    c_lower = concept.lower()
    best_item = MOTION_LIBRARY[0] # Default: Runway towering walk
    best_score = 0

    for item in MOTION_LIBRARY:
        score = sum(1 for kw in item["keywords"] if kw in c_lower)
        if score > best_score:
            best_score = score
            best_item = item

    return best_item


def render_motion_commercial(
    concept: str,
    output_path: str,
    camera_preset: str = "dolly_in",
    aspect_ratio: str = "9:16",
    duration_sec: float = 4.0,
    fps: int = 24
) -> dict:
    matched = match_motion_source(concept)
    source_video_path = matched["path"]

    if not os.path.exists(source_video_path):
        raise FileNotFoundError(f"Source motion asset not found: {source_video_path}")

    target_dims = {
        "9:16": (720, 1280),
        "16:9": (1280, 720),
        "3:4": (768, 1024),
        "1:1": (720, 720)
    }
    tw, th = target_dims.get(aspect_ratio, (720, 1280))

    reader = imageio.get_reader(source_video_path)
    total_src_frames = reader.count_frames()
    out_total_frames = int(duration_sec * fps)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    writer = imageio.get_writer(
        output_path,
        fps=fps,
        codec="libx264",
        pixelformat="yuv420p",
        quality=8
    )

    clean_title = (concept.strip() or matched["default_title"]).upper()[:36]

    for i in range(out_total_frames):
        t = i / float(max(1, out_total_frames - 1))

        # Speed-ramp time remapping:
        # 0-0.2: Quick punchy hook
        # 0.2-0.8: Elegant slow-mo glamour showcase
        # 0.8-1.0: Fast dynamic wrap-up
        if t < 0.20:
            src_t = (t / 0.20) * 0.30
        elif t < 0.80:
            src_t = 0.30 + ((t - 0.20) / 0.60) * 0.40
        else:
            src_t = 0.70 + ((t - 0.80) / 0.20) * 0.30

        src_frame_idx = int(src_t * (total_src_frames - 1))
        src_frame_idx = max(0, min(total_src_frames - 1, src_frame_idx))

        raw_frame = reader.get_data(src_frame_idx)
        frame_img = Image.fromarray(raw_frame)

        # Scale & center crop to target aspect ratio
        sw, sh = frame_img.width, frame_img.height
        scale = max(tw / sw, th / sh)
        rw, rh = int(sw * scale), int(sh * scale)
        scaled_frame = frame_img.resize((rw, rh), Image.Resampling.BILINEAR)

        # Center crop with subtle organic camera breathing sway
        sway_x = int(6.0 * math.sin(t * 2 * math.pi * 1.5))
        sway_y = int(4.0 * math.cos(t * 2 * math.pi * 1.2))

        crop_x = max(0, min(rw - tw, (rw - tw) // 2 + sway_x))
        crop_y = max(0, min(rh - th, (rh - th) // 2 + sway_y))
        frame = scaled_frame.crop((crop_x, crop_y, crop_x + tw, crop_y + th))

        # 1. Subtle moving studio spotlight pass
        light_x = int((t * 1.6 - 0.3) * tw)
        light_overlay = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
        l_draw = ImageDraw.Draw(light_overlay)
        l_draw.polygon([
            (light_x - 100, 0), (light_x + 100, 0),
            (light_x + 160, th), (light_x - 40, th)
        ], fill=(255, 255, 255, 18))
        frame = Image.alpha_composite(frame.convert("RGBA"), light_overlay).convert("RGB")

        # 2. Anamorphic horizontal flare on highlights
        flare_t = math.sin(t * math.pi * 2)
        if abs(flare_t) > 0.4:
            f_overlay = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
            f_draw = ImageDraw.Draw(f_overlay)
            flare_y = int(th * 0.40 + 15 * math.sin(t * 3 * math.pi))
            alpha = int(abs(flare_t) * 32)
            f_draw.line([(0, flare_y), (tw, flare_y)], fill=(130, 215, 255, alpha), width=2)
            f_draw.line([(0, flare_y - 1), (tw, flare_y - 1)], fill=(255, 255, 255, alpha // 2), width=1)
            frame = Image.alpha_composite(frame.convert("RGBA"), f_overlay).convert("RGB")

        # 3. Luxury Instagram Commercial HUD & Arri Alexa Lower Third
        draw = ImageDraw.Draw(frame)

        # Top Header
        draw.text((36, 42), "ATELIER VII · HAUTE COUTURE", fill=(240, 240, 240))
        if int(t * 8) % 2 == 0:
            draw.ellipse([tw - 84, 46, tw - 72, 58], fill=(240, 30, 30))
        draw.text((tw - 66, 42), "REC", fill=(240, 240, 240))
        draw.line([(36, 70), (tw - 36, 70)], fill=(80, 85, 95), width=1)

        # Bottom Lower-Third Glass Panel
        bottom_box_y = th - 190
        lower_glass = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
        g_draw = ImageDraw.Draw(lower_glass)
        g_draw.rectangle([(0, bottom_box_y - 20), (tw, th)], fill=(0, 0, 0, 140))
        frame = Image.alpha_composite(frame.convert("RGBA"), lower_glass).convert("RGB")
        draw = ImageDraw.Draw(frame)

        draw.line([(36, bottom_box_y - 10), (tw - 36, bottom_box_y - 10)], fill=(180, 180, 190), width=1)
        draw.text((36, bottom_box_y + 4), "PARIS RUNWAY · AUTUMN/WINTER 2026", fill=(180, 185, 195))
        draw.text((36, bottom_box_y + 26), clean_title, fill=(255, 255, 255))
        draw.text((36, bottom_box_y + 68), "ARRI ALEXA LF 85MM T1.3 · 24.0 FPS · KODAK 5219", fill=(140, 145, 155))

        frames_elapsed = int(t * out_total_frames)
        tc_str = f"00:00:{frames_elapsed // 24:02d}:{frames_elapsed % 24:02d}"
        draw.text((tw - 130, bottom_box_y + 68), tc_str, fill=(200, 205, 215))

        writer.append_data(np.array(frame))

    reader.close()
    writer.close()

    return {
        "matched_clip": matched["id"],
        "source_asset": source_video_path,
        "output_path": output_path,
        "frames": out_total_frames,
        "fps": fps
    }


if __name__ == "__main__":
    t0 = time.time()
    res = render_motion_commercial(
        concept="Liquid silver evening gown on Paris runway",
        output_path="assets/animations/test_motion_render_liquid_silver.mp4",
        aspect_ratio="9:16",
        duration_sec=4.0
    )
    print("Render completed in", round(time.time() - t0, 2), "s")
    print(res)
