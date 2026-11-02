with open('engine.py', 'r', encoding='utf-8') as f:
    content = f.read()

old_ar = '''    ar_map = {
        "9:16": "9:16 (Vertical)",
        "16:9": "16:9 (Widescreen)",
        "1:1": "1:1 (Square)",
        "4:3": "4:3",
        "3:4": "3:4"
    }
    target_ar = ar_map.get(aspect_ratio, "9:16 (Vertical)")'''

new_ar = '''    ar_map = {
        "9:16": "9:16 (Portrait Widescreen)",
        "16:9": "16:9 (Widescreen)",
        "1:1": "1:1 (Square)",
        "4:3": "4:3 (Standard)",
        "3:4": "3:4 (Portrait Standard)",
        "2:3": "2:3 (Portrait Photo)",
        "3:2": "3:2 (Photo)",
        "21:9": "21:9 (Ultrawide)"
    }
    target_ar = ar_map.get(aspect_ratio, "9:16 (Portrait Widescreen)")'''

if old_ar in content:
    content = content.replace(old_ar, new_ar, 1)
    with open('engine.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS: engine.py aspect ratio mapping updated!")
else:
    print("WARNING: old_ar not found in engine.py")
