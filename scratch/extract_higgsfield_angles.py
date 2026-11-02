import os
import re

base_dir = r"c:\Users\Hp\Desktop\nlp project bezel\higgsfield_analysis\scripts"
angles = set()
camera_presets = []
motion_controls = []

for f in os.listdir(base_dir):
    if f.endswith('.js'):
        fp = os.path.join(base_dir, f)
        with open(fp, 'r', encoding='utf-8', errors='ignore') as fl:
            c = fl.read()
            for m in re.finditer(r'["\'](low[_\s]angle|high[_\s]angle|dutch[_\s]angle|overhead|birds[_\s]eye|worm[_\s]eye|eye[_\s]level|side[_\s]profile|three[_\s]quarter|back[_\s]view|tracking[_\s]shot|bullet[_\s]time|orbit[_\s]360|dolly[_\s]in|dolly[_\s]out|pan[_\s]left|pan[_\s]right|tilt[_\s]up|tilt[_\s]down|crane[_\s]up|crane[_\s]down|handheld|fpv|steadicam)["\']', c, re.IGNORECASE):
                angles.add(m.group(1).lower())
            
            # Find motion presets
            for m in re.finditer(r'(?:camera|motion|shot)_preset["\']?\s*[:=]\s*["\']([^"\']+)["\']', c, re.IGNORECASE):
                camera_presets.append(m.group(1))

print('Extracted Camera Movements & Angles:')
print(sorted(list(angles)))
print('\nCamera Presets Sample:')
print(list(set(camera_presets))[:20])
