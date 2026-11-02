with open("catalog.py", "r", encoding="utf-8") as f:
    text = f.read()

target = '''            loc = d.get("local_image_path")
            if loc and os.path.exists(loc):
                norm = loc.replace("\\\\", "/").lstrip("/")
                d["image_url"] = f"/{norm}"
                d["output_image_path"] = norm
            elif d.get("image_url") and not d["image_url"].startswith("http"):
                d["output_image_path"] = d["image_url"].lstrip("/")
            else:
                d["output_image_path"] = d.get("image_url") or ""
            results.append(d)'''

replacement = '''            loc = d.get("local_image_path")
            sid = d.get("shoot_id")
            is_vid = bool((loc and loc.lower().endswith(".mp4")) or (d.get("image_url", "").lower().endswith(".mp4")))
            d["is_video"] = is_vid

            if loc and os.path.exists(loc):
                norm = loc.replace("\\\\", "/").lstrip("/")
                d["image_url"] = f"/{norm}"
                d["output_image_path"] = norm
            elif d.get("has_blob"):
                d["image_url"] = f"/api/duckdb/photo/{sid}"
                d["output_image_path"] = f"/api/duckdb/photo/{sid}"
            elif d.get("image_url") and not d["image_url"].startswith("http"):
                d["output_image_path"] = d["image_url"].lstrip("/")
            else:
                d["output_image_path"] = d.get("image_url") or ""
            results.append(d)'''

if target in text:
    text = text.replace(target, replacement)
    with open("catalog.py", "w", encoding="utf-8") as f:
        f.write(text)
    print("Successfully patched catalog.py get_shoot_history!")
else:
    print("Target block not matched directly, checking whitespace...")

