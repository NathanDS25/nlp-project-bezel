import os

file_path = r"C:\Users\Hp\AppData\Roaming\npm\node_modules\openclaw\dist\control-ui-CiCYZ2Q0.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

target1 = 'res.setHeader("X-Frame-Options", "DENY");'
replace1 = '// res.setHeader("X-Frame-Options", "DENY");'

target2 = '"frame-ancestors \'none\'"'
replace2 = '"frame-ancestors *"'

if target1 in content:
    content = content.replace(target1, replace1)
    print("Replaced target1 (X-Frame-Options)")
else:
    print("target1 already replaced or not found")

if target2 in content:
    content = content.replace(target2, replace2)
    print("Replaced target2 (frame-ancestors)")
else:
    print("target2 already replaced or not found")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("OpenClaw file written successfully.")
