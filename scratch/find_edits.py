import json

with open(r'C:/Users/Hp/.gemini/antigravity-ide/brain/9dc59c24-692c-4ca1-8100-c70b4ce32d9d/.system_generated/logs/transcript.jsonl', 'r', encoding='utf-8') as f:
    for idx, l in enumerate(f):
        d = json.loads(l)
        if d.get('type') == 'PLANNER_RESPONSE':
            calls = d.get('tool_calls', [])
            for c in calls:
                print(c.get('name'), list(c.get('arguments', {}).keys()))
