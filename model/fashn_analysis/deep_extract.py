import os
import re
import json

base_dir = r"C:\Users\Hp\Desktop\nlp project bezel\fashn_analysis\scripts"

tools_dict = {}

target_file = None
for root, dirs, files in os.walk(base_dir):
    if "1v44ut35pt01e.js" in files:
        target_file = os.path.join(root, "1v44ut35pt01e.js")
        break

if target_file:
    with open(target_file, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Regex to find tool key and label
    pattern = re.compile(r'["\']?([\w\-]+)["\']?\s*:\s*\{label:\s*["\']([^"\']+)["\']')
    matches = list(pattern.finditer(content))
    
    for i, m in enumerate(matches):
        tool_key = m.group(1)
        label = m.group(2)
        start_pos = m.start()
        # End is start of next match or next 3000 chars
        end_pos = matches[i+1].start() if i+1 < len(matches) else start_pos + 3000
        tool_block = content[start_pos:end_pos]
        
        # Extract description
        desc_match = re.search(r'description:\s*["\']([^"\']+)["\']', tool_block)
        description = desc_match.group(1) if desc_match else ""
        
        # Extract modelName
        model_match = re.search(r'modelName:\s*["\']([^"\']+)["\']', tool_block)
        model_name = model_match.group(1) if model_match else ""
        
        # Extract surface
        surface_match = re.search(r'surface:\s*["\']([^"\']+)["\']', tool_block)
        surface = surface_match.group(1) if surface_match else ""
        
        # Extract requestIdPrefix
        prefix_match = re.search(r'requestIdPrefix:\s*["\']([^"\']+)["\']', tool_block)
        prefix = prefix_match.group(1) if prefix_match else ""

        # Extract pollInterval and timeout
        poll_match = re.search(r'pollInterval:\s*([0-9e\.]+)', tool_block)
        poll_interval = poll_match.group(1) if poll_match else ""

        # Extract params
        params_match = re.search(r'params:\s*\[([^\]]+)\]', tool_block)
        params_str = params_match.group(1) if params_match else ""
        param_names = re.findall(r'apiKey:\s*["\']([^"\']+)["\']', params_str)

        # Extract image params
        images_match = re.search(r'images:\s*\[([^\]]+)\]', tool_block)
        images_str = images_match.group(1) if images_match else ""
        image_params = re.findall(r'paramName:\s*["\']([^"\']+)["\']', images_str)

        tools_dict[tool_key] = {
            "key": tool_key,
            "label": label,
            "surface": surface,
            "model_name": model_name,
            "request_prefix": prefix,
            "poll_interval": poll_interval,
            "description": description,
            "param_keys": param_names,
            "image_keys": image_params
        }

print(f"Parsed {len(tools_dict)} tools:")
for k, v in tools_dict.items():
    print(f"-> {k:20} | Label: {v['label']:20} | Model: {v['model_name']:18} | Params: {v['param_keys']} | Images: {v['image_keys']}")

# Save detailed json
out_path = r"C:\Users\Hp\Desktop\nlp project bezel\fashn_analysis\fashn_tool_schemas.json"
with open(out_path, "w", encoding="utf-8") as out:
    json.dump(tools_dict, out, indent=2)

print(f"\nSaved complete schemas to: {out_path}")
