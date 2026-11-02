import os
import re

pattern = re.compile(r'https?://[^\s"\'<>]+\.mp4[^\s"\'<>]*')
found = set()
scripts_dir = 'higgsfield_analysis/scripts'
if os.path.exists(scripts_dir):
    for f in os.listdir(scripts_dir):
        if f.endswith('.js'):
            try:
                with open(os.path.join(scripts_dir, f), 'r', encoding='utf-8', errors='ignore') as fp:
                    txt = fp.read()
                    matches = pattern.findall(txt)
                    for m in matches:
                        found.add(m)
            except Exception:
                pass

print(f"Total mp4 found in scripts: {len(found)}")
for url in list(found)[:30]:
    print(url)
