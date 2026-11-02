with open('engine.py', 'r', encoding='utf-8') as f:
    content = f.read()

target = '        if is_online and mode != "template":'
replacement = '''        is_explicit_template = (mode == "template" and template_id)
        if is_online and not is_explicit_template:'''

if target in content:
    content = content.replace(target, replacement, 1)
    with open('engine.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS")
else:
    print("TARGET NOT FOUND")

