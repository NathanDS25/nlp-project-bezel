import os
import re
import json

base_dir = r"C:\Users\Hp\Desktop\nlp project bezel\buble_analysis\scripts"

findings = {
    "api_endpoints": set(),
    "garment_scopes": [],
    "background_options": [],
    "lighting_presets": [],
    "generate_payload_structure": [],
    "ui_components": []
}

for root, dirs, files in os.walk(base_dir):
    for f in files:
        if not f.endswith(".js"):
            continue
        filepath = os.path.join(root, f)
        with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
            content = file.read()

            # Endpoints
            for ep in re.findall(r'["\'](/api/ai/[^"\']+)["\']', content):
                findings["api_endpoints"].add(ep)

            # Search around /api/ai/generate for request payload structure
            if "/api/ai/generate" in content:
                for m in re.finditer(r'/api/ai/generate', content):
                    start = max(0, m.start() - 300)
                    end = min(len(content), m.end() + 600)
                    findings["generate_payload_structure"].append({
                        "file": f,
                        "context": content[start:end]
                    })

            # Garment scope definitions
            for m in re.finditer(r'garment\s*scope|scope:\s*["\']|scope\s*,\s*such as', content, re.IGNORECASE):
                start = max(0, m.start() - 100)
                end = min(len(content), m.end() + 300)
                findings["garment_scopes"].append(content[start:end])

            # Background toggles & options
            for m in re.finditer(r'(?:keep|original|studio|clean|transparent)\s*background|background:\s*["\']', content, re.IGNORECASE):
                start = max(0, m.start() - 100)
                end = min(len(content), m.end() + 300)
                findings["background_options"].append(content[start:end])

            # Lighting options
            for m in re.finditer(r'(?:natural|studio|ambient|outdoor)\s*lighting|lighting:\s*["\']', content, re.IGNORECASE):
                start = max(0, m.start() - 100)
                end = min(len(content), m.end() + 300)
                findings["lighting_presets"].append(content[start:end])

findings["api_endpoints"] = sorted(list(findings["api_endpoints"]))

out_file = r"C:\Users\Hp\Desktop\nlp project bezel\buble_analysis\buble_features.json"
with open(out_file, "w", encoding="utf-8") as f:
    json.dump({
        "api_endpoints": findings["api_endpoints"],
        "generate_payload_contexts": findings["generate_payload_structure"][:10],
        "garment_scopes": findings["garment_scopes"][:15],
        "background_options": findings["background_options"][:15],
        "lighting_presets": findings["lighting_presets"][:15]
    }, f, indent=2)

print(f"Extraction finished! Saved to {out_file}")
