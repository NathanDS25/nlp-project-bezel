import os
import catalog

shoots = catalog.get_shoot_history(limit=40)
print(f"Total shoots returned: {len(shoots)}")
for idx, s in enumerate(shoots):
    loc = s.get("local_image_path", "")
    url = s.get("image_url", "")
    is_mp4 = (loc and loc.endswith(".mp4")) or (url and url.endswith(".mp4"))
    exists = os.path.exists(loc) if loc else False
    print(f"[{idx}] ID: {s.get('shoot_id')} | MP4: {is_mp4} | Exists: {exists} | Garment: {s.get('garment_name')} | Path: {loc}")

