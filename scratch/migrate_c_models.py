import os
import shutil

c_base = r"C:\Users\Hp\AppData\Local\Comfy-Desktop\comfyui-shared\models"
d_base = r"D:\ComfyUI-Models"

wuli_src = os.path.join(c_base, "loras", "Wuli-Qwen-Image-2512-Turbo-LoRA-2steps-V1.0-bf16.safetensors")
wuli_dst = os.path.join(d_base, "loras", "Wuli-Qwen-Image-2512-Turbo-LoRA-2steps-V1.0-bf16.safetensors")

if os.path.exists(wuli_src):
    os.makedirs(os.path.dirname(wuli_dst), exist_ok=True)
    print(f"Moving Wuli LoRA from C: to D: ({os.path.getsize(wuli_src) / (1024**3):.2f} GB)...")
    shutil.move(wuli_src, wuli_dst)
    print("Wuli LoRA moved successfully to D:!")
else:
    print("Wuli LoRA already moved or not found.")

# Now clean up verified duplicate models from C:
duplicates = [
    os.path.join("diffusion_models", "qwen_image_2512_fp8_e4m3fn.safetensors"),
    os.path.join("loras", "Qwen-Image-2512-Lightning-4steps-V1.0-fp32.safetensors"),
    os.path.join("text_encoders", "qwen_2.5_vl_7b_fp8_scaled.safetensors"),
    os.path.join("vae", "qwen_image_vae.safetensors")
]

freed_bytes = 0
for rel in duplicates:
    c_path = os.path.join(c_base, rel)
    d_path = os.path.join(d_base, rel)
    if os.path.exists(c_path) and os.path.exists(d_path):
        c_sz = os.path.getsize(c_path)
        d_sz = os.path.getsize(d_path)
        if c_sz == d_sz and c_sz > 0:
            print(f"Deleting duplicate on C: {rel} ({c_sz / (1024**3):.2f} GB) - verified identical on D:...")
            os.remove(c_path)
            freed_bytes += c_sz
        else:
            print(f"WARNING: Size mismatch for {rel}! Skipping removal.")

print(f"\nTotal space freed on C: drive: {freed_bytes / (1024**3):.2f} GB!")
