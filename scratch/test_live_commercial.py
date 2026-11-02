import sys, os
sys.path.append(os.path.abspath("."))
import engine
import catalog
import duckdb
import os

print("--- Testing execute_commercial_video with Liquid Silver prompt ---")
res = engine.execute_commercial_video(
    concept="Liquid silver evening gown with chrome fluid reflections",
    camera_preset="dolly_in",
    aspect_ratio="9:16",
    duration_sec=4
)
print("Video URL:", res.get("video_url"))
print("Hero Image:", res.get("hero_image_url"))
print("Shoot ID:", res.get("shoot_id"))
print("Resolution:", res.get("resolution"))
print("Provenance:", res.get("provenance"))

# Verify DuckDB persistence
conn = duckdb.connect("bezel_bda.duckdb", read_only=True)
row = conn.execute("""
    SELECT shoot_id, garment_name, photo_type, image_url, octet_length(image_blob)
    FROM shoots
    WHERE shoot_id = ?
""", [res["shoot_id"]]).fetchone()
conn.close()

print("\n--- DuckDB Verification ---")
print("DuckDB Row:", row)
if row and row[4] and row[4] > 100000:
    print(f"SUCCESS: DuckDB contains full MP4 video blob of {row[4]:,} bytes!")
else:
    print("WARNING: DuckDB row or blob missing")
