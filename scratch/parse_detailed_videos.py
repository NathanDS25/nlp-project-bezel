import re
import json

file_path = r'C:\Users\Hp\.gemini\antigravity-ide\brain\0cd15b83-7a5c-439a-bcc7-19cc51b06445\.system_generated\steps\73\content.md'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Let's search for objects with video URLs
# Pattern for video URLs
items = []
matches = re.finditer(r'(?:jobSetType:"([^"]+)"|description:"([^"]+)"|prompt:"([^"]+)").{0,300}?(https?://[^\s"\'<>]+\.mp4)', text)
for m in matches:
    items.append({
        "type": m.group(1) or "unknown",
        "desc": m.group(2) or "",
        "url": m.group(4)
    })

# Also find all https?://...mp4 with surrounding prompt or description
pattern = re.compile(r'\{[^{}]*?"(?:source|rawUrl)":"(https?://[^\s"\'<>]+\.mp4)"[^{}]*?\}')
objs = pattern.findall(text)

print(f"Items found: {len(items)}, Objs found: {len(objs)}")
for it in items[:25]:
    print(it)
