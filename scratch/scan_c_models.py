import os

search_roots = [
    r"C:\Users\Hp\Downloads",
    r"C:\Users\Hp\AppData\Local\Comfy-Desktop",
    r"C:\Users\Hp\Desktop",
    r"C:\Users\Hp\.cache\huggingface\hub",
    r"C:\Users\Hp\AppData\Local\Programs",
]

exts = {".safetensors", ".ckpt", ".pt", ".bin", ".onnx"}
found = []

for root_dir in search_roots:
    if not os.path.exists(root_dir):
        continue
    print(f"Scanning {root_dir}...")
    try:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            # Skip node_modules and venv
            if "node_modules" in dirpath or "venv" in dirpath or ".git" in dirpath:
                continue
            for f in filenames:
                _, ext = os.path.splitext(f)
                if ext.lower() in exts:
                    full_path = os.path.join(dirpath, f)
                    try:
                        sz = os.path.getsize(full_path)
                        # Filter to models > 50 MB
                        if sz > 50 * 1024 * 1024:
                            found.append((full_path, sz))
                    except Exception:
                        pass
    except Exception as e:
        print(f"Error scanning {root_dir}: {e}")

print(f"\n--- Found {len(found)} models on C: ---")
for p, s in sorted(found, key=lambda x: x[1], reverse=True):
    print(f"{s / (1024**3):.2f} GB : {p}")
