with open(r'C:\Users\Hp\.gemini\antigravity-ide\brain\0cd15b83-7a5c-439a-bcc7-19cc51b06445\.system_generated\steps\73\content.md', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
urls = set(re.findall(r'https://[^\s"\'<>]+\.mp4', text))
clean_urls = [u for u in urls if 'wm' not in u]
print(f"Total clean mp4 URLs: {len(clean_urls)}")
for u in list(clean_urls)[:15]:
    idx = text.find(u)
    snippet = text[max(0, idx - 250):min(len(text), idx + 250)]
    print("--- SNIPPET ---")
    print(snippet)
    print("\n")
