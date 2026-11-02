import os
import re
import json

base_dir = r"C:\Users\Hp\Desktop\nlp project bezel\buble_analysis\scripts"

keywords = [
    "garment", "scope", "lighting", "background", "toggle", 
    "tops", "bottoms", "one-piece", "dresses", "outerwear",
    "prompt", "try-on", "tryon", "virtual", "model"
]

results = {}

for root, dirs, files in os.walk(base_dir):
    for f in files:
        if not f.endswith(".js"):
            continue
        filepath = os.path.join(root, f)
        with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
            content = file.read()
            for kw in keywords:
                matches = list(re.finditer(re.escape(kw), content, re.IGNORECASE))
                if matches:
                    results.setdefault(kw, []).append((f, len(matches)))

print("=== Keyword occurrences across files ===")
for kw, matches in results.items():
    print(f"\n[{kw}]")
    for f, count in sorted(matches, key=lambda x: x[1], reverse=True)[:5]:
        print(f"  {f}: {count} hits")
