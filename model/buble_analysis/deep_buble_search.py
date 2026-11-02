import os
import re
import json

base_dir = r"C:\Users\Hp\Desktop\nlp project bezel\buble_analysis\scripts"

findings = {
    "garment_scope_definitions": [],
    "lighting_definitions": [],
    "background_definitions": [],
    "api_endpoints": set(),
    "prompt_templates": []
}

for root, dirs, files in os.walk(base_dir):
    for f in files:
        if not f.endswith(".js"):
            continue
        filepath = os.path.join(root, f)
        with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
            content = file.read()

            # 1. API endpoints
            endpoints = re.findall(r'["\'](/api/[^"\']+|https?://api\.[^"\']+)["\']', content)
            for ep in endpoints:
                findings["api_endpoints"].add(ep)

            # 2. Garment Scope
            for m in re.finditer(r'(?:garment|scope|clothing|category)[^;{}]{0,60}(?:tops?|bottoms?|one-piece|outerwear|dresses?|all)', content, re.IGNORECASE):
                snippet = content[max(0, m.start()-50):min(len(content), m.end()+150)]
                findings["garment_scope_definitions"].append({"file": f, "snippet": snippet})

            # 3. Lighting options
            for m in re.finditer(r'(?:studio|natural|outdoor|ambient|dramatic|warm|cool)\s+lighting', content, re.IGNORECASE):
                snippet = content[max(0, m.start()-50):min(len(content), m.end()+150)]
                findings["lighting_definitions"].append({"file": f, "snippet": snippet})

            # 4. Background options
            for m in re.finditer(r'(?:keep|original|studio|clean|white|custom|indoor|outdoor)\s+background', content, re.IGNORECASE):
                snippet = content[max(0, m.start()-50):min(len(content), m.end()+150)]
                findings["background_definitions"].append({"file": f, "snippet": snippet})

findings["api_endpoints"] = sorted(list(findings["api_endpoints"]))
print(f"API endpoints found: {len(findings['api_endpoints'])}")
for ep in findings["api_endpoints"][:10]:
    print("  EP:", ep)

print(f"\nGarment scope snippets: {len(findings['garment_scope_definitions'])}")
for g in findings["garment_scope_definitions"][:5]:
    print(f"  [{g['file']}] {g['snippet'].strip()}")

print(f"\nLighting snippets: {len(findings['lighting_definitions'])}")
for l in findings["lighting_definitions"][:5]:
    print(f"  [{l['file']}] {l['snippet'].strip()}")

print(f"\nBackground snippets: {len(findings['background_definitions'])}")
for b in findings["background_definitions"][:5]:
    print(f"  [{b['file']}] {b['snippet'].strip()}")

with open(r"C:\Users\Hp\Desktop\nlp project bezel\buble_analysis\deep_findings.json", "w", encoding="utf-8") as out:
    json.dump({
        "api_endpoints": findings["api_endpoints"],
        "garment_scope": findings["garment_scope_definitions"][:20],
        "lighting": findings["lighting_definitions"][:20],
        "background": findings["background_definitions"][:20]
    }, out, indent=2)

print("\nSaved deep_findings.json successfully!")
