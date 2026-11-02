import os
import sys
import math
import imageio
import numpy as np
from PIL import Image, ImageFilter

def render_camera_motion(
    input_image_path: str,
    output_path: str,
    camera_preset: str = "dolly_in",
    aspect_ratio: str = "16:9",
    duration_sec: float = 4.0,
    fps: int = 24
) -> str:
    target_dims = {
        "9:16": (720, 1280),
        "16:9": (1280, 720),
        "3:4": (768, 1024),
        "1:1": (720, 720)
    }
    tw, th = target_dims.get(aspect_ratio, (1280, 720))
    
    img = Image.open(input_image_path).convert("RGB")
    
    # Scale base image with motion headroom
    margin = 1.35
    scale_w = (tw * margin) / img.width
    scale_h = (th * margin) / img.height
    scale_base = max(scale_w, scale_h)
    
    base_w = int(img.width * scale_base)
    base_h = int(img.height * scale_base)
    base_img = img.resize((base_w, base_h), Image.Resampling.LANCZOS)
    
    total_frames = int(duration_sec * fps)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    writer = imageio.get_writer(
        output_path,
        fps=fps,
        codec="libx264",
        pixelformat="yuv420p",
        quality=8
    )
    
    cx = base_w // 2
    cy = base_h // 2
    
    for i in range(total_frames):
        t = i / float(max(1, total_frames - 1))
        
        if camera_preset == "dolly_in":
            zoom = 1.0 + 0.18 * (0.5 - 0.5 * math.cos(t * math.pi))
            cur_w = int(tw / zoom)
            cur_h = int(th / zoom)
            y_shift = int(-0.04 * th * t)
            left = max(0, min(base_w - cur_w, cx - cur_w // 2))
            top = max(0, min(base_h - cur_h, cy - cur_h // 2 + y_shift))
            frame_img = base_img.crop((left, top, left + cur_w, top + cur_h)).resize((tw, th), Image.Resampling.BILINEAR)
            
        elif camera_preset == "orbit_360":
            dx = int(0.08 * tw * math.sin(t * 2 * math.pi))
            dy = int(0.02 * th * math.cos(t * 2 * math.pi))
            zoom = 1.04 + 0.05 * math.cos(t * 2 * math.pi)
            cur_w = int(tw / zoom)
            cur_h = int(th / zoom)
            left = max(0, min(base_w - cur_w, cx - cur_w // 2 + dx))
            top = max(0, min(base_h - cur_h, cy - cur_h // 2 + dy))
            cropped = base_img.crop((left, top, left + cur_w, top + cur_h))
            angle = 1.2 * math.sin(t * 2 * math.pi)
            rotated = cropped.rotate(angle, resample=Image.Resampling.BILINEAR)
            frame_img = rotated.resize((tw, th), Image.Resampling.BILINEAR)
            
        elif camera_preset == "crane_down":
            y_prog = 0.5 - 0.5 * math.cos(t * math.pi)
            cur_w = int(tw / 1.06)
            cur_h = int(th / 1.06)
            top_start = max(0, cy - int(0.65 * base_h // 2))
            top_end = max(0, cy - cur_h // 2)
            cur_top = int(top_start + (top_end - top_start) * y_prog)
            left = cx - cur_w // 2
            frame_img = base_img.crop((left, cur_top, left + cur_w, cur_top + cur_h)).resize((tw, th), Image.Resampling.BILINEAR)
            
        elif camera_preset == "handheld_editorial":
            dx = int(14.0 * math.sin(t * 2 * math.pi * 1.5) + 6.0 * math.sin(t * 2 * math.pi * 3.2))
            dy = int(10.0 * math.cos(t * 2 * math.pi * 1.2) + 4.0 * math.cos(t * 2 * math.pi * 2.8))
            zoom = 1.05 + 0.03 * math.sin(t * 2 * math.pi * 0.8)
            cur_w = int(tw / zoom)
            cur_h = int(th / zoom)
            left = max(0, min(base_w - cur_w, cx - cur_w // 2 + dx))
            top = max(0, min(base_h - cur_h, cy - cur_h // 2 + dy))
            cropped = base_img.crop((left, top, left + cur_w, top + cur_h))
            angle = 0.8 * math.sin(t * 2 * math.pi * 1.1)
            rotated = cropped.rotate(angle, resample=Image.Resampling.BILINEAR)
            frame_img = rotated.resize((tw, th), Image.Resampling.BILINEAR)
            
        elif camera_preset == "runway_truck":
            prog = t
            x_shift = int((prog - 0.5) * 0.14 * base_w)
            bounce = int(6.0 * abs(math.sin(t * 4 * math.pi)))
            cur_w = int(tw / 1.08)
            cur_h = int(th / 1.08)
            left = max(0, min(base_w - cur_w, cx - cur_w // 2 + x_shift))
            top = max(0, min(base_h - cur_h, cy - cur_h // 2 - bounce))
            frame_img = base_img.crop((left, top, left + cur_w, top + cur_h)).resize((tw, th), Image.Resampling.BILINEAR)
            
        elif camera_preset == "fpv_whip":
            if t < 0.35:
                whip_t = t / 0.35
                zoom = 1.0 + 0.32 * (whip_t ** 2)
            else:
                whip_t = (t - 0.35) / 0.65
                zoom = 1.32 + 0.05 * math.sin(whip_t * math.pi)
            cur_w = int(tw / zoom)
            cur_h = int(th / zoom)
            left = max(0, min(base_w - cur_w, cx - cur_w // 2))
            top = max(0, min(base_h - cur_h, cy - cur_h // 2))
            cropped = base_img.crop((left, top, left + cur_w, top + cur_h))
            if 0.15 < t < 0.35:
                cropped = cropped.filter(ImageFilter.GaussianBlur(radius=0.8))
            frame_img = cropped.resize((tw, th), Image.Resampling.BILINEAR)
            
        else:
            cur_w, cur_h = tw, th
            left = cx - cur_w // 2
            top = cy - cur_h // 2
            frame_img = base_img.crop((left, top, left + cur_w, top + cur_h))
            
        writer.append_data(np.array(frame_img))
        
    writer.close()
    print(f"Rendered unwatermarked {output_path} ({aspect_ratio}, {camera_preset})")
    return output_path

if __name__ == "__main__":
    reels = [
        ("assets/outputs/shoot_camel_cashmere_coat.png", "assets/animations/higgsfield_dolly_in_cinema.mp4", "dolly_in", "16:9"),
        ("assets/outputs/qwen_fashion_c1a7c1bb.png", "assets/animations/higgsfield_genjutsu_orbit.mp4", "orbit_360", "16:9"),
        ("assets/outputs/qwen_fashion_0e1d86d4.png", "assets/animations/higgsfield_handheld_editorial.mp4", "handheld_editorial", "16:9"),
        ("assets/outputs/shoot_camel_cashmere_coat.png", "assets/animations/higgsfield_runway_truck.mp4", "runway_truck", "16:9"),
        ("assets/models/model_beauty_face.png", "assets/animations/higgsfield_ugc_fashion.mp4", "dolly_in", "9:16"),
        ("assets/outputs/qwen_fashion_3431cad0.png", "assets/animations/higgsfield_liquid_chrome.mp4", "fpv_whip", "9:16"),
        ("assets/garments/camel_cashmere_coat.png", "assets/animations/higgsfield_content_factory.mp4", "crane_down", "16:9"),
    ]
    
    for in_img, out_vid, preset, ar in reels:
        if os.path.exists(in_img):
            render_camera_motion(in_img, out_vid, preset, ar, duration_sec=3.5, fps=24)
        else:
            print(f"Input image not found: {in_img}")
