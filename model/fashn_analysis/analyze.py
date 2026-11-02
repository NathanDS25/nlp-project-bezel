import os
import re
import json

base_dir = r"C:\Users\Hp\Desktop\nlp project bezel\fashn_analysis\scripts"

tools = {}
endpoints = set()
categories = set()

for root, dirs, files in os.walk(base_dir):
    for f in files:
        if not f.endswith(".js"):
            continue
        filepath = os.path.join(root, f)
        with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
            content = file.read()
            
            # Find tool definitions
            pattern = r'(\w+):\s*\{label:\s*"([^"]+)",surface:\s*"([^"]+)"'
            for match in re.finditer(pattern, content):
                tool_key, label, surface = match.groups()
                # grab the full tool block up to the next tool or end of dict
                block_start = match.start()
                block_end = content.find("loaderTips:", block_start)
                if block_end != -1:
                    block_end = content.find("]}", block_end) + 2
                else:
                    block_end = block_start + 1500
                tools[tool_key] = {
                    "label": label,
                    "surface": surface,
                    "file": f,
                    "definition": content[block_start:block_end]
                }
            
            # Find API routes / endpoints
            for ep in re.findall(r'["\'](/api/[^"\']+|https?://[^"\']+)["\']', content):
                if any(x in ep for x in ["fashn", "agent", "run", "status", "tryon", "model"]):
                    endpoints.add(ep)

print(f"Extracted {len(tools)} tools:")
for k, v in tools.items():
    print(f" - {k}: {v['label']} (surface: {v['surface']}) in {v['file']}")

with open(r"C:\Users\Hp\Desktop\nlp project bezel\fashn_analysis\extracted_tools.json", "w", encoding="utf-8") as out:
    json.dump({
        "tools": {k: {"label": v["label"], "surface": v["surface"], "file": v["file"]} for k, v in tools.items()},
        "endpoints": sorted(list(endpoints))
    }, out, indent=2)

print("\nSaved extracted_tools.json successfully!")
