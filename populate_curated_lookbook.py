import os
import time
import datetime
import catalog

conn = catalog.get_db(read_only=False)

# 1. Clean out raw mp4 videos and flat garments from shoots table so they don't pollute the image lookbook
conn.execute("""
    DELETE FROM shoots 
    WHERE lower(local_image_path) LIKE '%.mp4' 
       OR lower(image_url) LIKE '%.mp4'
       OR lower(local_image_path) LIKE '%assets/garments/%'
       OR lower(local_image_path) LIKE '%assets\\garments\\%'
""")
print("Purged raw mp4 files and flat garments from shoots table.")

# 2. Curate the premier haute couture lookbook collection
curated_looks = [
    {
        "garment_name": "Tailored Camel Cashmere Coat",
        "scope": "outerwear",
        "photo_type": "editorial_lookbook",
        "model": "South Asian Haute Couture Model (Priya)",
        "lighting": "Natural Diffused Studio Daylight",
        "background": "Minimal Concrete Cyclorama",
        "prompt": "Full-body luxury editorial lookbook photograph of a poised South Asian female model wearing a bespoke tailored double-breasted camel cashmere coat, wide-leg pleated cream trousers, shot on Hasselblad H6D-100c.",
        "path": "assets/outputs/shoot_camel_cashmere_coat.png"
    },
    {
        "garment_name": "Obsidian Cyberpunk Techwear Runway",
        "scope": "outerwear",
        "photo_type": "cinematic_editorial",
        "model": "High-Fashion Editorial Model",
        "lighting": "Volumetric Neon Anamorphic Blue/Amber",
        "background": "Dystopian Runway Stage",
        "prompt": "Full-body haute couture cinematic runway photograph of a model in architectural matte black techwear parka with tactical magnetic Fidlock buckles, high overhead runway spotlights.",
        "path": "assets/outputs/hero_obsidian_cyberpunk_runway.jpg"
    },
    {
        "garment_name": "Molten Liquid Silver Evening Gown",
        "scope": "one-piece",
        "photo_type": "haute_couture",
        "model": "Paris Agency Supermodel (Camille)",
        "lighting": "Rimlit Chiaroscuro Octabox",
        "background": "Dark Glossy Runway Reflection",
        "prompt": "Statuesque high-fashion female model wearing a liquid molten metallic silver evening gown with high leg slit and matching opera gloves, 8k luxury campaign, Arri Alexa 65mm sensor.",
        "path": "assets/outputs/qwen_fashion_0e1d86d4.png"
    },
    {
        "garment_name": "Bordeaux Velvet Runway Gown",
        "scope": "one-piece",
        "photo_type": "haute_couture",
        "model": "Editorial Model",
        "lighting": "Warm Golden Hour Studio",
        "background": "Velvet Draped Runway",
        "prompt": "Full-length editorial fashion photograph of an elegant model in deep bordeaux crimson velvet evening gown with structured corset bodice, soft gold ambient rim lighting.",
        "path": "assets/outputs/shoot_ebe42291_Qwen_Fashion_2512_00002_.png"
    },
    {
        "garment_name": "Minimalist Silk Satin Slip & Trench",
        "scope": "one-piece",
        "photo_type": "lookbook",
        "model": "Editorial Model",
        "lighting": "Clean Commercial Softbox",
        "background": "Off-White Seamless Studio",
        "prompt": "Full-body head-to-toe high-fashion editorial photograph of a female model wearing an ivory silk satin slip dress draped under an open tailored trench coat, crisp focus, 8k studio lookbook.",
        "path": "assets/outputs/shoot_e7343f63_Qwen_Fashion_2512_00001_.png"
    },
    {
        "garment_name": "Paris Runway Architectural Suiting",
        "scope": "outerwear",
        "photo_type": "menswear_editorial",
        "model": "High-Fashion Male Model",
        "lighting": "Directional Key Light",
        "background": "Parisian Haussmann Interior",
        "prompt": "Head-to-toe wide angle fashion photograph of a handsome male model in structured double-breasted black wool coat over tailored charcoal trousers, polished leather dress shoes.",
        "path": "assets/outputs/shoot_06fe5f97_Qwen_Edit_2511_00002.png"
    },
    {
        "garment_name": "Gossamer Tulle & Crimson Gold Couture",
        "scope": "one-piece",
        "photo_type": "campaign_poster",
        "model": "Editorial Model",
        "lighting": "High-Key Editorial Lighting",
        "background": "Architectural Studio Pillars",
        "prompt": "Editorial fashion campaign poster of a model wearing tiered gossamer cloud tulle gown in crimson and champagne gold embroidery, shot on medium format digital back.",
        "path": "assets/outputs/shoot_a53d209a_Qwen_Edit_2511_00012.png"
    },
    {
        "garment_name": "LTX-2.5 Cinema 4K Keyframe",
        "scope": "one-piece",
        "photo_type": "commercial_keyframe",
        "model": "Haute Couture Model",
        "lighting": "Cinematic Anamorphic Flare",
        "background": "Runway Catwalk",
        "prompt": "Haute couture model in metallic silver gown walking cinematic fashion runway, 24fps motion keyframe, Cooke Panchro anamorphic flare.",
        "path": "assets/outputs/hero_frame_9a202f93.jpg"
    },
    {
        "garment_name": "Editorial Studio Male Tailored Look",
        "scope": "top",
        "photo_type": "lookbook",
        "model": "Agency Male Model",
        "lighting": "Natural Daylight",
        "background": "Polished Concrete",
        "prompt": "Male model in relaxed luxury linen button-down shirt and tailored trousers, clean studio lookbook.",
        "path": "assets/outputs/shoot_male3_dress_tryon.png"
    },
    {
        "garment_name": "Editorial Campaign Lookbook Poster",
        "scope": "one-piece",
        "photo_type": "editorial_poster",
        "model": "Editorial Model",
        "lighting": "Studio Softbox",
        "background": "Editorial Layout",
        "prompt": "High-fashion lookbook campaign poster with luxury magazine typography and editorial portrait framing.",
        "path": "assets/outputs/fashion_poster_b733fde4.png"
    }
]

# Insert or bump curated looks to the very top with recent timestamps
now = datetime.datetime.now()
inserted = 0

for idx, look in enumerate(curated_looks):
    p = look["path"]
    if os.path.exists(p):
        with open(p, "rb") as f:
            blob = f.read()
        ts = now - datetime.timedelta(minutes=idx * 2)
        sid = f"look_{idx:02d}"
        
        # Upsert into DuckDB
        conn.execute("DELETE FROM shoots WHERE shoot_id = ?", [sid])
        conn.execute("""
            INSERT INTO shoots (
                shoot_id, garment_name, garment_scope, photo_type, 
                model_archetype, lighting_toggle, background_toggle, 
                render_time_sec, prompt_used, image_url, local_image_path, 
                image_blob, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, [
            sid,
            look["garment_name"],
            look["scope"],
            look["photo_type"],
            look["model"],
            look["lighting"],
            look["background"],
            2.4,
            look["prompt"],
            f"/{p.replace('\\\\', '/').lstrip('/')}",
            p,
            blob,
            ts
        ])
        inserted += 1
        print(f"Added Look {idx + 1}: {look['garment_name']} ({p})")
    else:
        print(f"Skipping {p} (file not on disk)")

conn.close()
print(f"Successfully populated DuckDB lookbook with {inserted} curated high-resolution looks!")

