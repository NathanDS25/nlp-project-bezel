import json

with open(r'C:/Users/Hp/.gemini/antigravity-ide/brain/9dc59c24-692c-4ca1-8100-c70b4ce32d9d/.system_generated/logs/transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for idx, l in enumerate(f):
        d = json.loads(l)
        step = d.get('step_index')
        calls = d.get('tool_calls', [])
        for c in calls:
            args_str = json.dumps(c.get('arguments', {}))
            if 'App.jsx' in args_str:
                print(f"Step {step}: {c.get('name')}")
