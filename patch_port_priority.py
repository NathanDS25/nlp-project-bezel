with open("engine.py", "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace("for port in [8188, 8189]:", "for port in [8189, 8188]:")
c = c.replace('COMFY_URL = "http://127.0.0.1:8188"', 'COMFY_URL = "http://127.0.0.1:8189"')

with open("engine.py", "w", encoding="utf-8") as f:
    f.write(c)

print("Successfully updated engine.py ComfyUI port priority to 8189!")

