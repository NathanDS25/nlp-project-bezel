import os
import re
import json

base_dir = r"c:\Users\Hp\Desktop\nlp project bezel\higgsfield_analysis\scripts"

findings = {
    "api_endpoints": set(),
    "camera_motions": set(),
    "video_parameters": set(),
    "models": set(),
    "prompt_templates": [],
    "cinematic_styles": set(),
    "dop_controls": set()
}

endpoint_pattern = re.compile(r'["\'](/(?:api|v1|v2)/[^"\']+)["\']')
camera_pattern = re.compile(r'\b(pan[_\s]?(?:left|right|up|down)?|tilt[_\s]?(?:up|down)?|zoom[_\s]?(?:in|out)?|dolly[_\s]?(?:in|out)?|orbit[_\s]?(?:left|right)?|truck[_\s]?(?:left|right)?|pedestal|roll[_\s]?(?:cw|ccw)?|crane[_\s]?(?:up|down)?|fpv|drone|tracking|handheld|static|whip[_\s]?pan)\b', re.IGNORECASE)
model_pattern = re.compile(r'["\']([a-zA-Z0-9_\-]+(?:video|seedance|motion|dop|anim|generate|turbo|fl2v|kling|sora|luma)[a-zA-Z0-9_\-]*)["\']', re.IGNORECASE)

for root, dirs, files in os.walk(base_dir):
    for f in files:
        if not f.endswith(".js"):
            continue
        filepath = os.path.join(root, f)
        with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
            content = file.read()

            for ep in endpoint_pattern.findall(content):
                if len(ep) < 80:
                    findings["api_endpoints"].add(ep)

            for cm in camera_pattern.findall(content):
                findings["camera_motions"].add(cm.lower())

            for m in model_pattern.findall(content):
                if 4 < len(m) < 40 and not m.endswith(".js"):
                    findings["models"].add(m)

            for m in re.finditer(r'(?:camera_motion|cameraMotion|motion_strength|camera_control|motion_preset|camera_type)["\']?\s*[:=]\s*([^\n,;}]{1,100})', content):
                findings["dop_controls"].add(m.group(0))

            for m in re.finditer(r'(?:aspect_ratio|aspectRatio|duration|fps|resolution|motion_bucket)["\']?\s*[:=]\s*([^\n,;}]{1,60})', content):
                findings["video_parameters"].add(m.group(0))

            for m in re.finditer(r'(?:cinematic|commercial|editorial|documentary|film|lens|anamorphic)\s+(?:style|lighting|grade|shot)', content, re.IGNORECASE):
                findings["cinematic_styles"].add(m.group(0).lower())

            for m in re.finditer(r'commercial|cinematic|director of photography|camera movements?', content, re.IGNORECASE):
                start = max(0, m.start() - 100)
                end = min(len(content), m.end() + 250)
                snip = content[start:end].replace('\n', ' ')
                if any(k in snip.lower() for k in ['prompt', 'motion', 'shot', 'preset']):
                    findings["prompt_templates"].append(snip[:200])

clean_findings = {
    "api_endpoints": sorted(list(findings["api_endpoints"])),
    "camera_motions": sorted(list(findings["camera_motions"])),
    "models": sorted(list(findings["models"]))[:50],
    "dop_controls": sorted(list(findings["dop_controls"])),
    "video_parameters": sorted(list(findings["video_parameters"]))[:50],
    "cinematic_styles": sorted(list(findings["cinematic_styles"])),
    "prompt_templates": findings["prompt_templates"][:25]
}

out_file = r"c:\Users\Hp\Desktop\nlp project bezel\higgsfield_analysis\higgsfield_features.json"
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(clean_findings, f, indent=2)

print(f"Analysis saved to {out_file}")
print(f"Found {len(clean_findings['api_endpoints'])} endpoints")
print(f"Camera motions: {clean_findings['camera_motions']}")
print(f"DOP controls count: {len(clean_findings['dop_controls'])}")
print(f"Cinematic styles: {clean_findings['cinematic_styles']}")
