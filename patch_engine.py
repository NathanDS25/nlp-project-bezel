with open('engine.py', 'r', encoding='utf-8') as f:
    code = f.read()

target = """                    start_poll = time.time()
                    while (time.time() - start_poll) < 180:"""

replacement = """                    start_poll = time.time()
                    while (time.time() - start_poll) < 900:"""

code_norm = code.replace("\r\n", "\n")
target_norm = target.replace("\r\n", "\n")
replacement_norm = replacement.replace("\r\n", "\n")

if target_norm in code_norm:
    code_norm = code_norm.replace(target_norm, replacement_norm, 1)
    with open('engine.py', 'w', encoding='utf-8') as f:
        f.write(code_norm)
    print("Successfully replaced timeout in engine.py")
else:
    print("Target not found in engine.py")

