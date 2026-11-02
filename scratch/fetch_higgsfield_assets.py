import os
import re
import requests
import json

out_dir = r"c:\Users\Hp\Desktop\nlp project bezel\higgsfield_analysis"
scripts_dir = os.path.join(out_dir, "scripts")
os.makedirs(scripts_dir, exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
base_asset_url = "https://assets.higgsfield.ai/tanstack/assets/"

with open(r'C:\Users\Hp\.gemini\antigravity-ide\brain\b0213f06-fbf4-4f69-ad4d-a319bc1addcd\.system_generated\steps\489\content.md', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Find all 1a2c0e3d-*.js
all_js_names = set(re.findall(r'1a2c0e3d-[a-zA-Z0-9_\-]+\.js', html))
all_js_names.add("1a2c0e3d-vpQWWKdBwslpL-5u.js")
print(f"Discovered initial {len(all_js_names)} JS assets from HTML:")

downloaded = set()
to_fetch = list(all_js_names)

while to_fetch:
    js_name = to_fetch.pop(0)
    if js_name in downloaded:
        continue
    downloaded.add(js_name)
    url = base_asset_url + js_name
    dest = os.path.join(scripts_dir, js_name)
    try:
        r = requests.get(url, headers=headers, timeout=12)
        if r.status_code == 200:
            with open(dest, "w", encoding="utf-8") as out:
                out.write(r.text)
            print(f"Downloaded: {js_name} ({len(r.text) / 1024:.1f} KB)")
            
            # Find more chunk imports in this JS
            new_chunks = re.findall(r'1a2c0e3d-[a-zA-Z0-9_\-]+\.js', r.text)
            for nc in new_chunks:
                if nc not in downloaded and nc not in to_fetch:
                    to_fetch.append(nc)
        else:
            print(f"Status {r.status_code} for {js_name}")
    except Exception as e:
        print(f"Error fetching {js_name}: {e}")

print(f"\nDone! Downloaded {len(downloaded)} JS modules to {scripts_dir}")
