import re
import json

with open(r'C:\Users\Hp\.gemini\antigravity-ide\brain\b0213f06-fbf4-4f69-ad4d-a319bc1addcd\.system_generated\steps\489\content.md', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

matches = re.findall(r'description:\s*["\']([^"\']{50,600})["\']', text)
prompts = []
for m in matches:
    try:
        m_clean = m.encode('utf-8').decode('unicode_escape', errors='ignore')
    except Exception:
        m_clean = m
    prompts.append(m_clean)

with open(r"c:\Users\Hp\Desktop\nlp project bezel\higgsfield_analysis\higgsfield_prompts.json", "w", encoding="utf-8") as f:
    json.dump(prompts, f, indent=2)

print(f"Saved {len(prompts)} prompts successfully!")
