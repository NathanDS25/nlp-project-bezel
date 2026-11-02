import os
import re

base_dir = r"c:\Users\Hp\Desktop\nlp project bezel\higgsfield_analysis\scripts"

motion_keywords = [
    'pan_left', 'pan_right', 'tilt_up', 'tilt_down', 'zoom_in', 'zoom_out',
    'orbit_left', 'orbit_right', 'dolly_in', 'dolly_out', 'crane_up', 'crane_down',
    'cinematic_orbit', 'tracking_follow', 'fpv_glide', 'slow_push', 'whip_pan',
    'dutch_roll', 'handheld_shaky', 'bullet_time', 'drone_aerial'
]

results = {}

for f in os.listdir(base_dir):
    if not f.endswith(".js"):
        continue
    fp = os.path.join(base_dir, f)
    with open(fp, "r", encoding="utf-8", errors="ignore") as fl:
        text = fl.read()
        for kw in motion_keywords:
            if kw in text:
                matches = re.findall(rf'.{{0,40}}{kw}.{{0,40}}', text)
                if matches:
                    results[kw] = matches[:3]

print("Found specific motion keywords:")
for k, v in results.items():
    print(f"=== {k} ===")
    for m in v:
        print("  ", repr(m.strip()))
