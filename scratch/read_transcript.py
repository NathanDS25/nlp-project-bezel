import json

with open(r'C:/Users/Hp/.gemini/antigravity-ide/brain/8483490d-ef9e-4fd1-9e91-b30f6f89768b/.system_generated/logs/transcript.jsonl', 'r', encoding='utf-8') as f:
    for idx, l in enumerate(f):
        d = json.loads(l)
        if d.get('type') == 'USER_INPUT':
            print(f"=== INPUT {idx} ===")
            print(d.get('content'))
