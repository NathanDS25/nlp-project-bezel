import duckdb
conn = duckdb.connect('bezel_bda.duckdb')
conn.execute("UPDATE shoots SET created_at = CURRENT_TIMESTAMP WHERE local_image_path LIKE '%shoot_camel_cashmere_coat.png'")
conn.close()
print("Updated timestamp successfully!")


