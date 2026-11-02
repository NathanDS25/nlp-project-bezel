with open('engine.py', 'r', encoding='utf-8') as f:
    code = f.read()

target = """    # Fallback to existing garment if ComfyUI is processing or starting
    offline_note = None
    if not image_url or not raw_local_path:
        garment_files = [
            os.path.join("assets", "garments", f) for f in os.listdir(os.path.join("assets", "garments"))
            if f.endswith((".png", ".jpg", ".webp"))
        ] if os.path.exists(os.path.join("assets", "garments")) else []
        if garment_files:
            raw_local_path = garment_files[0]
            norm = raw_local_path.replace("\\\\", "/").lstrip("/")
            image_url = f"/{norm}"
            offline_note = "Tailor design ready. ComfyUI queue logged to DuckDB."
        else:"""

# Let's inspect lines 3638-3652 of engine.py first
