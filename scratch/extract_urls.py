import re

path = r"C:\Users\Hp\.gemini\antigravity-ide\brain\f58a2cbd-f18e-41ff-a2a8-0cdabd6efc37\.system_generated\steps\416\content.md"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

urls = sorted(list(set(re.findall(r'https?://[^\s"\'<>]+\.mp4', text))))
print(f"Found {len(urls)} MP4 URLs:")
for u in urls:
    print(u)
