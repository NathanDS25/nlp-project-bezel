import sys, os
sys.path.insert(0, os.path.abspath("."))
import catalog
db = catalog.get_db(read_only=True)
rows = db.execute("SELECT shoot_id, prompt_used, local_image_path FROM shoots WHERE local_image_path IS NOT NULL").fetchall()
for r in rows:
    p = os.path.basename(r[2] or '')
    if any(k in p for k in ['qwen', 'skincare', 'fashion', 'poster']):
        print(f"{p:35} --> {(r[1] or '')[:90]}")
