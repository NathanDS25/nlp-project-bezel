with open('engine.py', 'r', encoding='utf-8') as f:
    text = f.read()

target = 'raise HTTPException(status_code=500, detail=f"LTX-2.5 ComfyUI Generation Error: {str(comfy_err)}")'
replacement = 'raise RuntimeError(f"LTX-2.5 ComfyUI Generation Error: {str(comfy_err)}")'

if target in text:
    text = text.replace(target, replacement, 1)
    with open('engine.py', 'w', encoding='utf-8') as f:
        f.write(text)
    print("SUCCESS")
else:
    print("NOT FOUND")

