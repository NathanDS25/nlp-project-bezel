import re
import json

with open(r'C:\Users\Hp\.gemini\antigravity-ide\brain\0cd15b83-7a5c-439a-bcc7-19cc51b06445\.system_generated\steps\73\content.md', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

pattern = re.compile(r'description:"([^"]+)"[^{}]*?source:"(https://[^"]+\.mp4)"')
matches = pattern.findall(text)

items = []
seen = set()
for desc, url in matches:
    if "wm" not in url and url not in seen:
        seen.add(url)
        items.append({"desc": desc, "url": url})

with open('scratch/unwatermarked_videos.json', 'w', encoding='utf-8') as f:
    json.dump(items, f, indent=2)

print(f"Saved {len(items)} unique unwatermarked videos to scratch/unwatermarked_videos.json")
