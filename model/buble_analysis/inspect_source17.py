import os
import re
import json
import sys

p = r"C:\Users\Hp\Desktop\nlp project bezel\buble_analysis\scripts"
target = None
for root, dirs, files in os.walk(p):
    for f in files:
        if f.startswith("source-17-") and f.endswith(".js"):
            target = os.path.join(root, f)
            break

output = {}

if target:
    with open(target, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Search for toggles, options, select, radio, presets
    # Let's search for all JSON-like objects with options/presets
    patterns = {
        "garment_scope": r'(?:garment|scope|clothing|category)[^;{}]{0,50}(?:tops|bottoms|one-piece|outerwear|dresses|all)',
        "lighting": r'(?:lighting|light)[^;{}]{0,100}',
        "background": r'(?:background|bg|backdrop)[^;{}]{0,100}',
        "prompts": r'prompt["\']?\s*:\s*["\'][^"\']+["\']'
    }

    for key, pat in patterns.items():
        matches = re.findall(pat, content, re.IGNORECASE)
        output[key] = matches[:20]

    # Look for form / state definitions, presets
    preset_matches = re.findall(r'(\w+)\s*=\s*\[\{[^\}]+type:[^\}]+(?:\}\s*,\s*\{[^\}]+\})+\]', content)
    output["presets"] = preset_matches[:10]

    with open(r"C:\Users\Hp\Desktop\nlp project bezel\buble_analysis\extracted_features.json", "w", encoding="utf-8") as out:
        json.dump(output, out, indent=2)

    print("Saved extracted_features.json!")
