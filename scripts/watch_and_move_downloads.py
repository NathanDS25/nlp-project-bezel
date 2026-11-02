import os
import sys
import time
import shutil

DOWNLOADS_DIR = r"C:\Users\Hp\Downloads"
HARDDRIVE_MODELS = r"D:\ComfyUI-Models"

SUBFOLDERS = {
    "loras": ["lora", "turbo", "lightning", "step"],
    "diffusion_models": ["diffusion", "unet", "transformer", "flux", "qwen_image", "z_image", "minimax"],
    "checkpoints": ["checkpoint", "sd15", "sdxl", "realistic", "inpaint"],
    "vae": ["vae"],
    "controlnet": ["controlnet", "t2i", "canny", "depth", "openpose"],
    "text_encoders": ["clip", "text_encoder", "t5", "vl"],
    "clip_vision": ["clip_vision", "vision", "dino", "siglip"]
}

def detect_folder(filename):
    lower = filename.lower()
    for folder, keywords in SUBFOLDERS.items():
        for kw in keywords:
            if kw in lower:
                return folder
    # Default to checkpoints or loras if unsure
    if "lora" in lower:
        return "loras"
    return "checkpoints"

def check_and_move():
    if not os.path.exists(DOWNLOADS_DIR):
        return []
    
    moved = []
    for item in os.listdir(DOWNLOADS_DIR):
        # Skip temporary download files
        if item.endswith((".crdownload", ".part", ".tmp")):
            continue
        
        # Only check AI model extensions
        lower = item.lower()
        if lower.endswith((".safetensors", ".ckpt", ".pt", ".pth")):
            src_path = os.path.join(DOWNLOADS_DIR, item)
            # Make sure it's a file and not currently being written
            try:
                sz1 = os.path.getsize(src_path)
                time.sleep(1)
                sz2 = os.path.getsize(src_path)
                if sz1 != sz2:
                    print(f"File {item} is still downloading... waiting.")
                    continue
            except Exception:
                continue

            folder = detect_folder(item)
            dest_dir = os.path.join(HARDDRIVE_MODELS, folder)
            os.makedirs(dest_dir, exist_ok=True)
            dest_path = os.path.join(dest_dir, item)

            print(f"Moving {item} -> {dest_path}...")
            shutil.move(src_path, dest_path)
            moved.append((item, dest_path))
            print(f"Successfully moved to {dest_path}!")

    return moved

if __name__ == "__main__":
    print(f"Watching {DOWNLOADS_DIR} for AI model files to move to {HARDDRIVE_MODELS}...")
    moved = check_and_move()
    if not moved:
        print("No new complete model files found in Downloads right now.")
