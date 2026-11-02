import re

with open(r'C:\Users\Hp\.gemini\antigravity-ide\brain\b0213f06-fbf4-4f69-ad4d-a319bc1addcd\.system_generated\steps\489\content.md', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

scripts = re.findall(r'src=["\']([^"\']+\.js[^"\']*)["\']', text)
print(f'Total scripts found: {len(scripts)}')
for s in scripts[:15]:
    print('Script:', s)

keywords = ['camera', 'motion', 'video', 'commercial', 'prompt', 'dop']
for kw in keywords:
    matches = re.findall(rf'.{{0,35}}{kw}.{{0,35}}', text, flags=re.IGNORECASE)
    print(f'Keyword {kw}: {len(matches)} matches (e.g. {repr(matches[0].strip()) if matches else "None"})')
