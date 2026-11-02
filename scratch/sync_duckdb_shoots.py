import os
import glob
import uuid
import datetime
import duckdb

conn = duckdb.connect('bezel_bda.duckdb')

# 1. Clean empty dummy rows without images
conn.execute("DELETE FROM shoots WHERE local_image_path IS NULL OR local_image_path = ''")
print("Cleaned dummy empty rows.")

# 2. Update existing rows that have local_image_path but no image_blob
rows = conn.execute("SELECT shoot_id, local_image_path FROM shoots WHERE image_blob IS NULL AND local_image_path IS NOT NULL").fetchall()
updated_blobs = 0
for sid, lp in rows:
    if lp and os.path.exists(lp):
        try:
            with open(lp, "rb") as f_img:
                b = f_img.read()
            conn.execute("UPDATE shoots SET image_blob = ? WHERE shoot_id = ?", [b, sid])
            updated_blobs += 1
        except Exception as e:
            print(f"Error reading {lp}: {e}")
print(f"Backfilled image_blob for {updated_blobs} existing shoots.")

# 3. Get existing local_image_path set
existing = {r[0].replace('\\', '/').lstrip('/') for r in conn.execute("SELECT local_image_path FROM shoots WHERE local_image_path IS NOT NULL").fetchall()}

# 4. Insert all outputs from assets/outputs
files = sorted(glob.glob("assets/outputs/*.png"), key=os.path.getmtime)
added = 0
for f in files:
    norm = f.replace('\\', '/').lstrip('/')
    if norm in existing:
        continue
    
    fname = os.path.basename(f)
    parts = fname.replace('.png', '').split('_')
    sid = parts[1][:8] if len(parts) > 1 and len(parts[1]) >= 8 else str(uuid.uuid4())[:8]
    
    blob = None
    try:
        with open(f, "rb") as img_f:
            blob = img_f.read()
    except Exception as e:
        print(f"Could not read {f}: {e}")
    
    mtime = datetime.datetime.fromtimestamp(os.path.getmtime(f))
    
    scope = "one-piece"
    if "skincare" in fname:
        scope = "skincare"
    elif "poster" in fname:
        scope = "editorial-poster"
    
    conn.execute("""
        INSERT INTO shoots 
        (shoot_id, garment_name, garment_scope, photo_type, model_archetype, lighting_toggle, background_toggle, render_time_sec, prompt_used, image_url, created_at, local_image_path, image_blob)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, [
        sid, fname, scope, "commercial-render", "Haute Couture Studio Model",
        "Soft Diffused Commercial Studio", "Minimalist Architecture", 2.8,
        f"Couture shoot for {fname} synthesized via Ethereal Studio.",
        f"/{norm}", mtime, norm, blob
    ])
    added += 1

print(f"Added {added} real outputs into DuckDB.")
total = conn.execute("SELECT COUNT(*) FROM shoots").fetchone()[0]
with_blob = conn.execute("SELECT COUNT(*) FROM shoots WHERE image_blob IS NOT NULL").fetchone()[0]
print(f"Total shoots now in DuckDB: {total}, with image_blob: {with_blob}")
conn.close()
