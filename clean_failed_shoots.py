import os
import catalog

conn = catalog.get_db(read_only=False)
try:
    cursor = conn.execute("SELECT shoot_id, local_image_path, (image_blob IS NOT NULL) FROM shoots")
    rows = cursor.fetchall()
    deleted = 0
    for sid, loc, has_blob in rows:
        exists = os.path.exists(loc) if loc else False
        if not exists and not has_blob:
            conn.execute("DELETE FROM shoots WHERE shoot_id = ?", [sid])
            deleted += 1
            print(f"Removed failed/missing shoot: {sid} ({loc})")
    print(f"Cleaned up {deleted} failed/missing shoots from DuckDB database!")
finally:
    conn.close()

