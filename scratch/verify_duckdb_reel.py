import sys, os
sys.path.insert(0, os.path.abspath("."))
import catalog
db = catalog.get_db(read_only=True)
row = db.execute("SELECT shoot_id, garment_name, photo_type, image_url, octet_length(image_blob) FROM shoots WHERE image_url LIKE '%af1dd2d4%'").fetchone()
print("DUCKDB ROW:", row)
