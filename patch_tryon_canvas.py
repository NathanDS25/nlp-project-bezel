path = r"frontend/src/components/AtelierTryOn.jsx"

with open(path, "r", encoding="utf-8") as f:
    text = f.read()

target = "fetch('/assets/latest_render.png', { method: 'HEAD' })"
replacement = "fetch('/assets/outputs/shoot_camel_cashmere_coat.png', { method: 'HEAD' })"

target2 = "local_image_path: 'assets/latest_render.png'"
replacement2 = "local_image_path: 'assets/outputs/shoot_camel_cashmere_coat.png'"

if target in text:
    text = text.replace(target, replacement)
    text = text.replace(target2, replacement2)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Successfully patched AtelierTryOn.jsx premier render output!")
else:
    print("Target not found in AtelierTryOn.jsx")

