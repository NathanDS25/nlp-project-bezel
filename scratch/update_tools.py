import os

tools_path = r"C:\Users\Hp\.openclaw\workspace\TOOLS.md"
with open(tools_path, "r", encoding="utf-8") as f:
    content = f.read()

atelier_note = """
### Atelier AI Studio (Fashion & Lookbook OS)
- **API Base**: `http://localhost:8000`
- **CLI Bridge**: `C:\\Users\\Hp\\Desktop\\nlp project bezel\\openclaw_bridge.py`
- **Workspace**: `C:\\Users\\Hp\\Desktop\\nlp project bezel`
- **Skill**: `atelier-studio`
- **Usage**: To design garments, run virtual try-ons, enhance prompts with Nemotron, or browse models, run commands via:
  `python "C:\\Users\\Hp\\Desktop\\nlp project bezel\\openclaw_bridge.py" <command>`
"""

if "Atelier AI Studio" not in content:
    with open(tools_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n\n" + atelier_note.strip() + "\n")
    print("TOOLS_UPDATED")
else:
    print("ALREADY_IN_TOOLS")
