import re
import json

file_path = r'C:\Users\Hp\.gemini\antigravity-ide\brain\0cd15b83-7a5c-439a-bcc7-19cc51b06445\.system_generated\steps\73\content.md'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Look for mp4 URLs
mp4_urls = list(set(re.findall(r'https?://[^\s"\'<>]+\.mp4', text)))
print(f"Total distinct mp4 URLs: {len(mp4_urls)}")
for i, u in enumerate(mp4_urls):
    print(f"[{i}] {u}")
