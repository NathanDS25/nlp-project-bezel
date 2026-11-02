with open('server.py', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'mode: Optional[str] = "template"',
    'mode: Optional[str] = "ltx"',
    1
)

content = content.replace(
    'mode=req.mode or "template",',
    'mode=req.mode or "ltx",',
    1
)

with open('server.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("SERVER.PY UPDATED")

