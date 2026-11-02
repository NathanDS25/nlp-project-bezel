import os, re

scripts_dir = r"c:\Users\Hp\Desktop\nlp project bezel\higgsfield_analysis\scripts"
mp4s = set()
if os.path.exists(scripts_dir):
    for f in os.listdir(scripts_dir):
        if f.endswith('.js'):
            with open(os.path.join(scripts_dir, f), 'r', encoding='utf-8', errors='ignore') as fp:
                c = fp.read()
                matches = re.findall(r'https?://[^\s"\'<>]+\.mp4', c)
                mp4s.update(matches)

print(f"Total MP4s found: {len(mp4s)}")
for u in sorted(mp4s):
    print(u)
