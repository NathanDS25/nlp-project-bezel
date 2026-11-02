import json

with open(r'C:/Users/Hp/.gemini/antigravity-ide/brain/9dc59c24-692c-4ca1-8100-c70b4ce32d9d/.system_generated/logs/transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for idx, l in enumerate(f):
        d = json.loads(l)
        step = d.get('step_index')
        if step in [270, 271, 280, 284, 285]:
            calls = d.get('tool_calls', [])
            for c in calls:
                if 'App.jsx' in str(c):
                    print(f"Step {step} tool {c.get('name')}")
                    if c.get('name') == 'replace_file_content':
                        print("TARGET:")
                        print(c.get('arguments', {}).get('TargetContent', '')[:200])
                        print("REPLACEMENT:")
                        print(c.get('arguments', {}).get('ReplacementContent', '')[:200])
