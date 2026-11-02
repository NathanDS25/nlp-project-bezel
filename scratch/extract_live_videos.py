import re
import json

file_path = r'C:\Users\Hp\.gemini\antigravity-ide\brain\0cd15b83-7a5c-439a-bcc7-19cc51b06445\.system_generated\steps\73\content.md'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Match video cards and marketing studio entries
entries = []
# Find all occurrences of mp4
pos = 0
seen_urls = set()
while True:
    idx = text.find('.mp4', pos)
    if idx == -1:
        break
    # Find start of url
    start = text.rfind('http', max(0, idx - 150), idx)
    if start != -1:
        url = text[start:idx+4]
        # Clean url if it ends with params or quotes
        url = re.split(r'["\'\s<>]', url)[0]
        if url not in seen_urls:
            seen_urls.add(url)
            # Find context around this
            c_start = max(0, start - 400)
            c_end = min(len(text), idx + 400)
            context = text[c_start:c_end]
            
            # Extract description or title or aria-label
            aria_m = re.search(r'aria-label="([^"]+)"', context)
            desc_m = re.search(r'description:"([^"]+)"', context)
            prompt_m = re.search(r'prompt:"([^"]+)"', context)
            job_m = re.search(r'jobSetType:"([^"]+)"', context)
            thumb_m = re.search(r'thumbnail:"([^"]+)"', context)
            
            info = {
                "url": url,
                "label": aria_m.group(1) if aria_m else (desc_m.group(1) if desc_m else (prompt_m.group(1) if prompt_m else "")),
                "job_type": job_m.group(1) if job_m else "",
                "thumbnail": thumb_m.group(1) if thumb_m else ""
            }
            entries.append(info)
    pos = idx + 4

with open('higgsfield_analysis/higgsfield_live_videos.json', 'w', encoding='utf-8') as f:
    json.dump(entries, f, indent=2, ensure_ascii=False)

print(f"Extracted {len(entries)} unique Higgsfield commercial videos to higgsfield_analysis/higgsfield_live_videos.json")
