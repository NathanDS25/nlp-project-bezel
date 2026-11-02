import os
import re
import json
from collections import defaultdict

scripts_dir = r"c:\Users\Hp\Desktop\nlp project bezel\higgsfield_analysis\scripts"
out_report_json = r"c:\Users\Hp\Desktop\nlp project bezel\higgsfield_analysis\deep_analysis.json"

keywords = [
    "camera", "minimax", "kling", "wan", "angle", "director", "commercial",
    "video", "motion", "aspect_ratio", "fps", "duration", "lora", "workflow",
    "prompt", "studio", "clothing", "try_on", "upscale", "marketing", "hook"
]

all_models = set()
all_endpoints = set()
all_camera_controls = set()
all_workflows = set()
all_prompts = []
all_settings = defaultdict(set)

print(f"Scanning scripts in {scripts_dir}...")
files = [os.path.join(scripts_dir, f) for f in os.listdir(scripts_dir) if f.endswith(".js")]
print(f"Found {len(files)} files.")

for fpath in files:
    try:
        with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception:
        continue

    # Look for model names
    models = re.findall(r'["\']([a-zA-Z0-9_\-]+(?:minimax|kling|wan2|sora|veo|flux|sdxl|qwen)[a-zA-Z0-9_\-]*)["\']', content, re.IGNORECASE)
    for m in models:
        if len(m) > 3 and not m.startswith("http"):
            all_models.add(m)

    # Look for camera angles / controls
    cameras = re.findall(r'["\']([a-zA-Z0-9_\-]*(?:camera|angle|zoom|pan|tilt|orbit|tracking|dolly|truck|pedestal|crane|fpv)[a-zA-Z0-9_\-]*)["\']', content, re.IGNORECASE)
    for c in cameras:
        if len(c) > 3 and not c.startswith("http"):
            all_camera_controls.add(c)

    # Look for API endpoints / routes
    endpoints = re.findall(r'["\'](/api/[a-zA-Z0-9_\-/]+)["\']', content)
    for ep in endpoints:
        all_endpoints.add(ep)

    # Look for workflow keys
    workflows = re.findall(r'["\']([a-zA-Z0-9_]+_workflow|[a-zA-Z0-9_]+_job|[a-zA-Z0-9_]+_video|[a-zA-Z0-9_]+_generation)["\']', content)
    for w in workflows:
        all_workflows.add(w)

    # Look for rich prompt templates or system instructions
    prompts = re.findall(r'["\']((?:A |The |cinematic|commercial|fashion|camera|high fashion|close-up|slow motion|model wearing|hyper-realistic)[^"\']{60,800})["\']', content, re.IGNORECASE)
    for p in prompts:
        all_prompts.append(p.strip())

    # Look for camera motion descriptors
    motion_matches = re.findall(r'description:\s*["\']([^"\']{40,400})["\']', content)
    for mm in motion_matches:
        all_prompts.append(mm.strip())

result = {
    "models": sorted(list(all_models)),
    "camera_controls": sorted(list(all_camera_controls)),
    "endpoints": sorted(list(all_endpoints)),
    "workflows": sorted(list(all_workflows)),
    "prompts_count": len(all_prompts),
    "sample_prompts": list(set(all_prompts))[:50]
}

with open(out_report_json, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2)

print(f"Deep analysis finished!")
print(f"Unique models found: {len(result['models'])}")
print(f"Unique camera controls found: {len(result['camera_controls'])}")
print(f"Unique endpoints found: {len(result['endpoints'])}")
print(f"Unique workflows found: {len(result['workflows'])}")
print(f"Total prompt templates extracted: {len(all_prompts)}")
