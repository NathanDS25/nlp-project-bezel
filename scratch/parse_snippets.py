import re
import json

file_path = r'C:\Users\Hp\.gemini\antigravity-ide\brain\0cd15b83-7a5c-439a-bcc7-19cc51b06445\.system_generated\steps\73\content.md'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find tags around mp4
snippets = re.findall(r'.{0,100}https?://[^\s"\'<>]+\.mp4.{0,100}', text)
for s in snippets[:15]:
    print("--- SNIPPET ---")
    print(s)
