import sys, os
sys.path.insert(0, os.path.abspath("."))
import catalog
db = catalog.get_db(read_only=True)
row = db.execute("SELECT shoot_id, garment_name, render_time_sec, prompt_used, local_image_path FROM shoots WHERE shoot_id = '3dcaa57f'").fetchone()
print(row)
