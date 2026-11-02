import os
import re
import json

p = r"C:\Users\Hp\Desktop\nlp project bezel\buble_analysis\scripts"
target = None
for root, dirs, files in os.walk(p):
    for f in files:
        if f.startswith("source-17-") and f.endswith(".js"):
            target = os.path.join(root, f)
            break

if target:
    with open(target, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    idx = content.find("garment_category")
    start = max(0, idx - 1500)
    end = min(len(content), idx + 4000)
    
    snippet = content[start:end]
    with open(r"C:\Users\Hp\Desktop\nlp project bezel\buble_analysis\vton_schema_raw.txt", "w", encoding="utf-8") as out:
        out.write(snippet)

    print("Wrote vton_schema_raw.txt!")
