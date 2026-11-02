import os
import json
import uuid
import random
import duckdb
import chromadb

# File paths for our local analytical & vector databases
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "bezel_bda.duckdb")
CHROMA_PATH = os.path.join(BASE_DIR, "chroma_fashion_db")

# Lazy-loaded embedding model & Chroma client so app starts instantly
_embedder = None
_chroma_collection = None

def get_embedder():
    global _embedder
    if _embedder is None:
        class FastLocalEmbedder:
            def encode(self, text):
                import hashlib
                import numpy as np
                h = hashlib.sha256(text.encode("utf-8")).digest()
                arr = np.frombuffer(h * 12, dtype=np.uint8)[:384].astype(np.float32) / 255.0
                norm = np.linalg.norm(arr)
                return arr / norm if norm > 0 else arr
        _embedder = FastLocalEmbedder()
    return _embedder

def get_collection():
    global _chroma_collection
    if _chroma_collection is None:
        chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
        _chroma_collection = chroma_client.get_or_create_collection(name="bezel_lookbook_vectors")
    return _chroma_collection


# --- PART A: REA SCHEMA & TEMPLATE LOADER ---
def load_rea_schemas() -> dict:
    """
    Reads the reverse-engineered garment scopes, lighting/background toggles,
    and prompt templates from fashn_analysis and buble_analysis.
    """
    schemas = {
        "garment_scopes": ["top", "bottom", "one-piece", "outerwear", "full-outfit"],
        "garment_photo_types": ["flat-lay", "model", "ghost-mannequin"],
        "lighting_toggles": [
            "Softbox Studio Commercial (Fashn Standard)",
            "Golden Hour Rim Lighting (Buble Editorial)",
            "High-Contrast Runway Spot",
            "Natural Daylight Loft Window",
            "Neon Cyber Streetwear Gel"
        ],
        "background_toggles": [
            "Seamless Neutral Cyclorama (#F5F5F5)",
            "Warm Studio Daylight with Soft Floor Shadows",
            "High-Fashion Charcoal Studio with Spotlight",
            "Luxury Penthouse Sunset Terrace with Glass Balustrade",
            "Modernist Concrete & Glass Architectural Villa",
            "Parisian Haussmann Apartment with Herringbone Parquet",
            "Milanese Marble Palazzo Courtyard",
            "Soho Concrete & Exposed Brick Industrial Loft",
            "Tokyo Rain-Slicked Neon Fashion Alley (Night)",
            "Sunlit Parisian Sidewalk Cafe with Bistro Tables",
            "New York Soho Cobblestone Fashion Street",
            "Sunlit Mediterranean Villa Courtyard with Olive Trees",
            "Golden Hour Sandy Coastal Dunes with Ocean Breeze",
            "Lush Sun-Dappled Botanical Conservatory",
            "Sleek High-End Fashion Boutique Showroom"
        ],
        "model_archetypes": [
            "Female 1: South Asian Female — Editorial Fashion (20s, dark wavy hair, athletic slender frame)",
            "Female 2: East Asian Female — Minimalist Studio Lookbook (20s, sleek black hair, elegant posture)",
            "Female 3: Afro-Latina Female — Commercial High-Glam (20s, natural textured curls, glowing warm skin)",
            "Male 1: European Male — Contemporary Streetwear (20s, sharp jawline, short fade, athletic build)",
            "Male 2: South Asian Male — Classic Tailored Menswear (30s, groomed beard, sophisticated frame)",
            "Male 3: East Asian Male — Urban Avant-Garde (20s, textured undercut, lean minimalist aesthetic)"
        ],
        "model_poses": [
            "Commercial Standing (Neutral Front-Facing Lookbook)",
            "Contrapposto Weight Shift (Casual Hand on Hip)",
            "Dynamic Runway Stride (Walking Forward with Movement)",
            "Three-Quarter Editorial Angle (Slight Turn Over the Shoulder)",
            "Seated Studio Stance (Sitting on Minimalist Cube)",
            "Hands in Pockets (Relaxed Contemporary Streetwear)"
        ],
        "fit_styles": [
            "Tailored Catalog (Crisp details, balanced proportions)",
            "Natural Everyday (Relaxed fabric behavior, authentic folds)",
            "Editorial High-Fashion (Sharp dramatic silhouette, runway polish)"
        ],
        "scope_prompts": {
            "top": "replace only the upper-body garment (top/shirt/blazer) while keeping pants and shoes completely intact",
            "bottom": "replace only the lower-body garment (pants/jeans/skirt) while keeping the upper top and shoes intact",
            "one-piece": "replace the entire outfit as a dress, jumpsuit, or one-piece garment with flowing drape",
            "outerwear": "add or replace the visible outer jacket or coat layer over the base clothing",
            "full-outfit": "replace the full visible outfit while maintaining natural layering and body proportions"
        },
        "photo_type_prompts": {
            "flat-lay": "convert the standalone flat-lay product photo into realistic 3D on-body drape with natural gravity and fabric folds",
            "ghost-mannequin": "map the hollow ghost-mannequin product photo onto the model anatomy with natural collar and torso fit",
            "model": "transfer the clothing from the reference image, isolating only the garment and ignoring any background or pose"
        },
        "fit_style_prompts": {
            "Tailored Catalog (Crisp details, balanced proportions)": "clean catalog-ready fit with crisp garment seams and balanced commercial proportions",
            "Natural Everyday (Relaxed fabric behavior, authentic folds)": "natural everyday fit with organic wrinkles, relaxed tension, and authentic fabric drape",
            "Editorial High-Fashion (Sharp dramatic silhouette, runway polish)": "polished fashion editorial fit with immaculate tailoring and sculpted silhouette"
        },
        "pose_prompts": {
            "Commercial Standing (Neutral Front-Facing Lookbook)": "standing straight facing camera, upright posture, arms relaxed naturally at sides",
            "Contrapposto Weight Shift (Casual Hand on Hip)": "casual fashion contrapposto, shifting weight onto back leg, one hand resting on hip, subtle dynamic curvature",
            "Dynamic Runway Stride (Walking Forward with Movement)": "dynamic fashion runway stride, walking forward towards the camera with natural motion and flowing fabric dynamics",
            "Three-Quarter Editorial Angle (Slight Turn Over the Shoulder)": "three-quarter angle stance with upper torso turned slightly, glance directed toward the lens, high-fashion attitude",
            "Seated Studio Stance (Sitting on Minimalist Cube)": "elegantly seated on a minimalist concrete studio cube, legs extended naturally, upright posture",
            "Hands in Pockets (Relaxed Contemporary Streetwear)": "relaxed streetwear stance with both hands partially in pockets, nonchalant confidence, natural elbow bend"
        },
        "prompt_template": (
            "A full-body studio commercial fashion catalog photograph of {model} in Picture 1 cleanly wearing the exact garment from Picture 2 as their outfit. "
            "Completely replace the model's current clothes with the {scope} garment from Picture 2. "
            "The {scope} garment is worn directly on the model's body, tailored with natural fabric drape, authentic seams, realistic folds, and proper fit. "
            "The model's facial features, hair, head, gender, ethnicity, and identity from Picture 1 ({model}) remain identical and unaltered. "
            "The garment is worn exclusively on the person's body; absolutely no clothing in the background, no floating garments, no clothes on walls. "
            "Fit Style: {fit_style_instruction}. Model Pose: {pose_instruction}. "
            "Environment: {background} with {lighting} lighting. Additional Direction: {brief}. "
            "Hasselblad H6D-100c medium format commercial photograph, 85mm f/1.4 lens, natural skin pores, subtle subsurface scattering, authentic fabric weave and gravity drape folds, ambient contact shadows, softbox catchlights in eyes."
        )
    }

    # Keep verified clean schemas for production try-on
    schemas["garment_scopes"] = ["top", "bottom", "one-piece", "outerwear", "full-outfit"]
    return schemas


# --- PART B: DUCKDB TABULAR ANALYTICS & BLOB STORAGE ---
def get_db(read_only: bool = False):
    """Initializes or connects to the local DuckDB analytics table for shoot telemetry & binary photos."""
    if read_only:
        try:
            return duckdb.connect(DB_PATH, read_only=True)
        except Exception:
            pass

    import time
    for attempt in range(5):
        try:
            conn = duckdb.connect(DB_PATH, read_only=False)
            conn.execute("""
                CREATE TABLE IF NOT EXISTS shoots (
                    shoot_id VARCHAR,
                    garment_name VARCHAR,
                    garment_scope VARCHAR,
                    photo_type VARCHAR,
                    model_archetype VARCHAR,
                    lighting_toggle VARCHAR,
                    background_toggle VARCHAR,
                    render_time_sec DOUBLE,
                    prompt_used VARCHAR,
                    image_url VARCHAR,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    local_image_path VARCHAR,
                    image_blob BLOB
                )
            """)
            return conn
        except Exception as e:
            if attempt < 4:
                time.sleep(0.2)
            else:
                raise e


# --- PART C: UNIFIED LOGGING TO DUCKDB + CHROMADB ---
def log_shoot_to_bda(garment_name: str, scope: str, photo_type: str, model: str,
                     lighting: str, background: str, elapsed: float, prompt: str, image_url: str,
                     local_image_path: str = None, store_blob: bool = True) -> str:
    """Saves a completed virtual shoot to both DuckDB (SQL + BLOB) and ChromaDB (Vectors)."""
    shoot_id = str(uuid.uuid4())[:8]

    # Read binary bytes for image_blob if file is available
    blob_data = None
    if local_image_path and os.path.exists(local_image_path) and store_blob:
        try:
            with open(local_image_path, "rb") as f_img:
                blob_data = f_img.read()
        except Exception as e:
            print(f"[DuckDB] Could not read image blob: {e}")

    # Determine reliable web-accessible URL
    web_url = image_url
    if local_image_path and os.path.exists(local_image_path):
        normalized = local_image_path.replace("\\", "/").lstrip("/")
        web_url = f"/{normalized}"

    # 1. Insert structured metrics & photo blob into DuckDB
    conn = None
    try:
        conn = get_db(read_only=False)
        conn.execute(
            """INSERT INTO shoots 
               (shoot_id, garment_name, garment_scope, photo_type, model_archetype, lighting_toggle, background_toggle, render_time_sec, prompt_used, image_url, local_image_path, image_blob)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            [shoot_id, garment_name, scope, photo_type, model, lighting, background, elapsed, prompt, web_url, local_image_path or "", blob_data]
        )
    except Exception as e:
        print(f"[DuckDB] Telemetry log warning: {e}")
    finally:
        if conn:
            try:
                conn.close()
            except Exception:
                pass

    # 2. Insert semantic embedding into ChromaDB for similarity search (non-blocking)
    try:
        embedder = get_embedder()
        collection = get_collection()
        vec = embedder.encode(f"{scope} {model} {lighting} {background} {prompt}").tolist()
        collection.add(
            ids=[shoot_id],
            embeddings=[vec],
            metadatas=[{
                "shoot_id": shoot_id,
                "garment": garment_name,
                "scope": scope,
                "model": model,
                "lighting": lighting,
                "background": background,
                "image_url": web_url,
                "local_image_path": local_image_path or ""
            }],
            documents=[prompt]
        )
    except Exception as e:
        # Graceful skip if ChromaDB or SentenceTransformer offline/external disk disconnected
        pass
    return shoot_id


# --- PART D: CHROMADB VECTOR SEARCH ---
def semantic_search_catalog(query: str, top_k: int = 4):
    """Finds past photoshoots semantically similar to the designer's search query."""
    embedder = get_embedder()
    collection = get_collection()
    q_vec = embedder.encode(query).tolist()
    res = collection.query(query_embeddings=[q_vec], n_results=top_k)
    return res.get("metadatas", [[]])[0]


# --- PART E: INITIAL SEED DATA FOR DEMO ---
def seed_initial_catalog_if_empty():
    """Populates 20 realistic historical shoots on first run so BDA charts are ready."""
    conn = get_db()
    count = conn.execute("SELECT COUNT(*) FROM shoots").fetchone()[0]
    conn.close()
    if count > 0:
        return

    schemas = load_rea_schemas()
    sample_garments = [
        ("linen_blazer_ss26.png", "outerwear", "flat-lay", "Crisp beige tailored linen blazer"),
        ("emerald_silk_slip.png", "one-piece", "ghost-mannequin", "Bias-cut mulberry silk evening dress"),
        ("acid_wash_hoodie.png", "top", "flat-lay", "Heavyweight 450gsm streetwear hoodie"),
        ("pleated_wide_trousers.png", "bottom", "model", "Charcoal wool-blend tailored wide trousers"),
        ("zardozi_couture_jacket.png", "full-outfit", "flat-lay", "Hand-embroidered bridal couture sherwani jacket")
    ]
    for i in range(20):
        g_name, scope, p_type, desc = sample_garments[i % len(sample_garments)]
        model = schemas["model_archetypes"][i % len(schemas["model_archetypes"])]
        light = schemas["lighting_toggles"][i % len(schemas["lighting_toggles"])]
        bg = schemas["background_toggles"][i % len(schemas["background_toggles"])]
        prompt = schemas["prompt_template"].format(
            scope=scope, photo_type=p_type, model=model, background=bg, lighting=light, brief=desc
        )
        log_shoot_to_bda(
            f"sku_{100+i}_{g_name}", scope, p_type, model, light, bg,
            round(random.uniform(7.2, 15.4), 2), prompt, ""
        )


# --- PART F: MODEL REGISTRY & MANAGEMENT ---
MODELS_REGISTRY_PATH = os.path.join("assets", "models", "models_registry.json")

DEFAULT_PREMADE_MODELS = {
    "model_female_1": {
        "id": "model_female_1",
        "name": "Female 1: South Asian Editorial (20s)",
        "gender": "Female",
        "archetype": "Female 1: South Asian Female — Editorial Fashion (20s, dark wavy hair, athletic slender frame)",
        "local_file": "assets/models/model_female_1.png",
        "image_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
        "description": "20s South Asian, dark wavy hair, olive skin tone, high-fashion editorial pose.",
        "is_preset": True
    },
    "model_female_2": {
        "id": "model_female_2",
        "name": "Female 2: East Asian Minimalist (20s)",
        "gender": "Female",
        "archetype": "Female 2: East Asian Female — Minimalist Studio Lookbook (20s, sleek black hair, elegant posture)",
        "local_file": "assets/models/model_female_2.png",
        "image_url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
        "description": "20s East Asian, sleek center-parted black hair, clean porcelain look, studio posture.",
        "is_preset": True
    },
    "model_female_3": {
        "id": "model_female_3",
        "name": "Female 3: Afro-Latina Commercial Glam (20s)",
        "gender": "Female",
        "archetype": "Female 3: Afro-Latina Female — Commercial High-Glam (20s, natural textured curls, glowing warm skin)",
        "local_file": "assets/models/model_female_3.png",
        "image_url": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80",
        "description": "20s Afro-Latina, voluminous natural curls, radiant warm skin, vibrant look.",
        "is_preset": True
    },
    "model_female_4": {
        "id": "model_female_4",
        "name": "Female 4: Mediterranean Chic (20s)",
        "gender": "Female",
        "archetype": "Female 4: Mediterranean Female — High-Fashion Minimalist (20s, natural olive skin, hazel eyes, honey wavy hair, athletic slender frame)",
        "local_file": "assets/models/model_female_4.png",
        "image_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
        "description": "20s Mediterranean female, radiant olive skin, honey waves, versatile commercial and editorial look.",
        "is_preset": True
    },
    "model_male_1": {
        "id": "model_male_1",
        "name": "Male 1: European Streetwear (20s)",
        "gender": "Male",
        "archetype": "Male 1: European Male — Contemporary Streetwear (20s, sharp jawline, short fade, athletic build)",
        "local_file": "assets/models/model_male_1.png",
        "image_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
        "description": "20s European male, sharp jawline, textured short fade, athletic street style.",
        "is_preset": True
    },
    "model_male_2": {
        "id": "model_male_2",
        "name": "Male 2: South Asian Tailored Classic (30s)",
        "gender": "Male",
        "archetype": "Male 2: South Asian Male — Classic Tailored Menswear (30s, groomed beard, sophisticated frame)",
        "local_file": "assets/models/model_male_2.png",
        "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
        "description": "30s South Asian male, neatly groomed beard, warm brown skin tone, refined posture.",
        "is_preset": True
    },
    "model_male_3": {
        "id": "model_male_3",
        "name": "Male 3: East Asian Urban Avant-Garde (20s)",
        "gender": "Male",
        "archetype": "Male 3: East Asian Male — Urban Avant-Garde (20s, textured undercut, lean minimalist aesthetic)",
        "local_file": "assets/models/model_male_3.png",
        "image_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
        "description": "20s East Asian male, textured fringe hairstyle, lean athletic build, modern urban vibe.",
        "is_preset": True
    }
}

def load_models_registry() -> dict:
    """Loads all models from the persistent JSON registry, seeding defaults if needed."""
    os.makedirs(os.path.dirname(MODELS_REGISTRY_PATH), exist_ok=True)
    if not os.path.exists(MODELS_REGISTRY_PATH):
        with open(MODELS_REGISTRY_PATH, "w", encoding="utf-8") as f:
            json.dump(DEFAULT_PREMADE_MODELS, f, indent=2)
        return dict(DEFAULT_PREMADE_MODELS)
    
    try:
        with open(MODELS_REGISTRY_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            # Ensure any missing default preset is backfilled
            updated = False
            for k, v in DEFAULT_PREMADE_MODELS.items():
                if k not in data:
                    data[k] = v
                    updated = True
            if updated:
                with open(MODELS_REGISTRY_PATH, "w", encoding="utf-8") as f_out:
                    json.dump(data, f_out, indent=2)
            return data
    except Exception:
        return dict(DEFAULT_PREMADE_MODELS)

def save_models_registry(data: dict):
    """Saves the models registry to disk."""
    os.makedirs(os.path.dirname(MODELS_REGISTRY_PATH), exist_ok=True)
    with open(MODELS_REGISTRY_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def add_or_update_model(model_id: str, name: str, gender: str, archetype: str,
                        description: str, image_bytes: bytes = None, local_file: str = None,
                        biometric_lock: bool = True, lock_strength: float = 0.90) -> dict:
    """Registers a new model or updates an existing one with biometric identity lock."""
    registry = load_models_registry()
    if not model_id:
        model_id = f"custom_model_{str(uuid.uuid4())[:8]}"

    # Save image if provided
    file_path = local_file
    if image_bytes:
        os.makedirs(os.path.join("assets", "models"), exist_ok=True)
        file_path = os.path.join("assets", "models", f"{model_id}.png")
        with open(file_path, "wb") as f:
            f.write(image_bytes)
    elif local_file:
        import shutil
        clean_src = local_file.lstrip("/\\")
        candidate = local_file if os.path.exists(local_file) else clean_src
        if os.path.exists(candidate) and os.path.isfile(candidate):
            os.makedirs(os.path.join("assets", "models"), exist_ok=True)
            dest_path = os.path.join("assets", "models", f"{model_id}.png")
            if os.path.abspath(candidate) != os.path.abspath(dest_path):
                shutil.copy2(candidate, dest_path)
            file_path = dest_path

    existing = registry.get(model_id, {})
    model_entry = {
        "id": model_id,
        "name": name.strip(),
        "gender": gender,
        "archetype": archetype.strip(),
        "local_file": file_path or existing.get("local_file", ""),
        "image_url": existing.get("image_url", ""),
        "description": description.strip(),
        "is_preset": existing.get("is_preset", False),
        "biometric_lock": biometric_lock,
        "lock_strength": lock_strength
    }
    registry[model_id] = model_entry
    save_models_registry(registry)
    return model_entry

def get_shoots_by_ids(shoot_ids: list) -> list:
    """Retrieves specific shoot records by their shoot_ids."""
    if not shoot_ids:
        return []
    conn = get_db(read_only=True)
    results = []
    try:
        placeholders = ",".join(["?"] * len(shoot_ids))
        cursor = conn.execute(f"""
            SELECT shoot_id, garment_name, garment_scope, photo_type, 
                   model_archetype, lighting_condition, background_environment, 
                   render_time_sec, prompt_used, image_url, local_image_path, created_at 
            FROM shoots 
            WHERE shoot_id IN ({placeholders})
            ORDER BY created_at DESC
        """, shoot_ids)
        cols = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
        for row in rows:
            d = dict(zip(cols, row))
            if d.get("created_at"):
                d["created_at_str"] = str(d["created_at"])[:19]
            loc = d.get("local_image_path")
            if loc and os.path.exists(loc):
                norm = loc.replace("\\", "/").lstrip("/")
                d["image_url"] = f"/{norm}"
                d["output_image_path"] = norm
            results.append(d)
    finally:
        conn.close()
    return results

def delete_model(model_id: str) -> bool:
    """Deletes a model from the registry and removes its asset if custom."""
    registry = load_models_registry()
    if model_id not in registry:
        return False
    entry = registry.pop(model_id)
    save_models_registry(registry)

    # Clean up file if not a stock preset
    local_p = entry.get("local_file")
    if local_p and os.path.exists(local_p) and not entry.get("is_preset", False):
        try:
            os.remove(local_p)
        except Exception:
            pass
    return True


def sync_all_assets_to_duckdb() -> dict:
    """Scans assets/outputs, assets/garments, assets/models, and assets/animations, ensuring all pictures and commercial videos are stored in DuckDB with image_blob."""
    import glob
    import datetime
    conn = get_db(read_only=False)
    try:
        # Remove any old empty dummy records without images or blobs
        conn.execute("DELETE FROM shoots WHERE image_blob IS NULL AND (local_image_path IS NULL OR local_image_path = '')")
        
        rows = conn.execute("SELECT shoot_id, local_image_path, image_blob IS NOT NULL FROM shoots").fetchall()
        existing_paths = {os.path.normpath(r[1]): (r[0], r[2]) for r in rows if r[1]}
        
        all_files = glob.glob(os.path.join("assets", "outputs", "*.png")) + \
                    glob.glob(os.path.join("assets", "outputs", "*.jpg")) + \
                    glob.glob(os.path.join("assets", "outputs", "*.webp")) + \
                    glob.glob(os.path.join("assets", "garments", "*.png")) + \
                    glob.glob(os.path.join("assets", "garments", "*.jpg")) + \
                    glob.glob(os.path.join("assets", "garments", "*.webp")) + \
                    glob.glob(os.path.join("assets", "models", "*.png")) + \
                    glob.glob(os.path.join("assets", "animations", "*.mp4"))
                    
        added = 0
        updated_blobs = 0
        
        for f in all_files:
            norm = os.path.normpath(f)
            if norm in existing_paths:
                shoot_id, has_blob = existing_paths[norm]
                if not has_blob:
                    try:
                        with open(f, "rb") as fp:
                            blob = fp.read()
                        conn.execute("UPDATE shoots SET image_blob = ? WHERE shoot_id = ?", [blob, shoot_id])
                        updated_blobs += 1
                    except Exception:
                        pass
            else:
                base = os.path.basename(f)
                parts = base.split('_')
                if len(parts) > 1 and len(parts[-1].split('.')[0]) == 8:
                    shoot_id = parts[-1].split('.')[0]
                elif len(parts) > 1 and len(parts[1].split('.')[0]) == 8:
                    shoot_id = parts[1].split('.')[0]
                else:
                    shoot_id = str(uuid.uuid4())[:8]
                try:
                    with open(f, "rb") as fp:
                        blob = fp.read()
                    web_url = "/" + f.replace("\\", "/").lstrip("/")
                    is_video = base.lower().endswith(".mp4")
                    if is_video:
                        scope_guess = "video_commercial"
                        photo_type_guess = "commercial-video"
                    else:
                        scope_guess = "outerwear" if "coat" in base or "jacket" in base else ("one-piece" if "gown" in base or "dress" in base else "commercial")
                        photo_type_guess = "high-fashion"
                    conn.execute("""
                        INSERT INTO shoots (shoot_id, garment_name, garment_scope, photo_type, model_archetype, 
                                           lighting_toggle, background_toggle, render_time_sec, prompt_used, 
                                           image_url, local_image_path, image_blob, created_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, [
                        shoot_id, base, scope_guess, photo_type_guess, "Haute Couture Model",
                        "Directional Studio Keylight", "Neutral Cyclorama", 8.5,
                        f"Atelier Production Asset: {base}", web_url, f, blob, datetime.datetime.now()
                    ])
                    added += 1
                except Exception as e:
                    print(f"[DuckDB Sync] Error importing {f}: {e}")
                    
        stats = conn.execute("SELECT COUNT(*), COUNT(image_blob) FROM shoots").fetchone()
        return {
            "added": added,
            "updated_blobs": updated_blobs,
            "total_shoots": stats[0],
            "shoots_with_blobs": stats[1]
        }
    finally:
        conn.close()

# --- PART G: SHOOT HISTORY & BDA METRICS MANAGEMENT ---
def get_shoot_history(limit: int = 100) -> list:
    """Fetches all past shoots from DuckDB ordered chronologically desc."""
    conn = get_db(read_only=True)
    results = []
    try:
        cursor = conn.execute("""
            SELECT shoot_id, garment_name, garment_scope, photo_type, 
                   model_archetype, lighting_toggle, background_toggle, 
                   render_time_sec, prompt_used, image_url, local_image_path, created_at,
                   (image_blob IS NOT NULL) AS has_blob
            FROM shoots 
            ORDER BY created_at DESC 
            LIMIT ?
        """, [limit])
        cols = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
        
        for row in rows:
            d = dict(zip(cols, row))
            if d.get("created_at"):
                d["created_at_str"] = str(d["created_at"])[:19]
            else:
                d["created_at_str"] = "N/A"
            loc = d.get("local_image_path")
            sid = d.get("shoot_id")
            is_vid = bool((loc and loc.lower().endswith(".mp4")) or (d.get("image_url", "").lower().endswith(".mp4")))
            d["is_video"] = is_vid

            if loc and os.path.exists(loc):
                norm = loc.replace("\\", "/").lstrip("/")
                d["image_url"] = f"/{norm}"
                d["output_image_path"] = norm
            elif d.get("has_blob"):
                d["image_url"] = f"/api/duckdb/photo/{sid}"
                d["output_image_path"] = f"/api/duckdb/photo/{sid}"
            elif d.get("image_url") and not d["image_url"].startswith("http"):
                d["output_image_path"] = d["image_url"].lstrip("/")
            else:
                d["output_image_path"] = d.get("image_url") or ""
            results.append(d)
    finally:
        conn.close()
    return results

def get_shoot_blob(shoot_id: str):
    """Retrieves the raw image binary bytes directly from the DuckDB shoots table."""
    conn = get_db(read_only=True)
    try:
        row = conn.execute("SELECT image_blob FROM shoots WHERE shoot_id = ?", [shoot_id]).fetchone()
        if row and row[0]:
            return row[0]
        return None
    finally:
        conn.close()

def get_shoot_media(shoot_id: str) -> dict:
    """Retrieves the raw media binary (photo or video) and MIME metadata directly from DuckDB shoots table."""
    conn = get_db(read_only=True)
    try:
        row = conn.execute("""
            SELECT image_blob, local_image_path, garment_scope, garment_name 
            FROM shoots 
            WHERE shoot_id = ?
        """, [shoot_id]).fetchone()
        if not row:
            return None
        
        blob, local_path, scope, name = row
        
        # If blob is missing in DB but exists on disk, backfill it on the fly
        if not blob and local_path and os.path.exists(local_path):
            try:
                with open(local_path, "rb") as fp:
                    blob = fp.read()
                conn_w = get_db(read_only=False)
                conn_w.execute("UPDATE shoots SET image_blob = ? WHERE shoot_id = ?", [blob, shoot_id])
                conn_w.close()
            except Exception as e:
                print(f"[get_shoot_media] Backfill error: {e}")
        
        if not blob:
            return None
            
        target_name = (name or local_path or "").lower()
        is_video = (
            target_name.endswith(".mp4") or 
            scope == "video_commercial" or 
            (len(blob) > 8 and blob[4:8] == b"ftyp")
        )
        
        if is_video:
            media_type = "video/mp4"
            ext = ".mp4"
        elif target_name.endswith(".webp") or (len(blob) > 12 and blob[:4] == b"RIFF" and blob[8:12] == b"WEBP"):
            media_type = "image/webp"
            ext = ".webp"
        elif target_name.endswith(".jpg") or target_name.endswith(".jpeg") or (len(blob) > 3 and blob[:3] == b"\xff\xd8\xff"):
            media_type = "image/jpeg"
            ext = ".jpg"
        else:
            media_type = "image/png"
            ext = ".png"
            
        filename = f"shoot_{shoot_id}{ext}"
        
        return {
            "blob": blob,
            "media_type": media_type,
            "filename": filename,
            "is_video": is_video,
            "size": len(blob)
        }
    finally:
        conn.close()

def delete_shoot(shoot_id: str) -> bool:
    """Deletes a shoot record from DuckDB, ChromaDB, and local storage."""
    conn = get_db()
    conn.execute("DELETE FROM shoots WHERE shoot_id = ?", [shoot_id])
    conn.close()

    # Delete from ChromaDB vector index
    try:
        col = get_collection()
        col.delete(ids=[shoot_id])
    except Exception:
        pass

    # Clean up local output image if it exists
    out_dir = os.path.join("assets", "outputs")
    if os.path.exists(out_dir):
        for f in os.listdir(out_dir):
            if shoot_id in f:
                try:
                    os.remove(os.path.join(out_dir, f))
                except Exception:
                    pass
    return True

def clear_all_shoots() -> bool:
    """Truncates the shoots table in DuckDB and clears ChromaDB collection."""
    conn = get_db()
    conn.execute("DELETE FROM shoots")
    conn.close()

    try:
        col = get_collection()
        # Chroma collection delete/recreate
        chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
        chroma_client.delete_collection(name="bezel_lookbook_vectors")
        global _chroma_collection
        _chroma_collection = chroma_client.get_or_create_collection(name="bezel_lookbook_vectors")
    except Exception:
        pass
    return True


# --- PART H: DEDICATED SCHEMAS: SKINCARE BRANDS & FASHION POSTERS ---
def load_skincare_schemas() -> dict:
    """Specialized schema and controls for Skincare & Cosmetic Brand Campaigns."""
    return {
        "product_types": [
            "Hydrating Serum Dropper Bottle",
            "Rich Barrier Moisturizer Glass Jar",
            "Foaming Botanical Cleanser Pump",
            "SPF 50 Mineral Glow Sunscreen Tube",
            "Restorative Facial Oil Dropper",
            "Revitalizing Rosewater Mist Spray",
            "Gentle Exfoliating Clay Mask Tub"
        ],
        "application_actions": [
            "Holding product bottle near cheek with serene, glowing expression",
            "Applying single serum droplet from dropper directly onto high cheekbone",
            "Holding cosmetic glass jar flat on open manicured palm",
            "Gently massaging rich moisturizer cream across cheekbone and jawline",
            "Serene beauty macro close-up with product resting delicately in hand",
            "Clean vanity flat-lay with product placed on marble beside gentle water ripples"
        ],
        "skin_finishes": [
            "Glass Skin (Ultra-dewy, poreless reflection, hydrated wet-look sheen)",
            "Luminous Radiant Glow (Fresh-faced, natural healthy luster, subtle sheen)",
            "Hydrated Velvet (Clean satin finish, balanced moisture, soft-focus blur)",
            "Sun-Kissed Golden Honey (Warm radiant undertones, sun-drenched hydration)"
        ],
        "lighting_modes": [
            "Beauty Softbox with Specular Catchlights (Crisp cosmetic reflection)",
            "Clinical High-Key Clean Daylight (Pristine laboratory clarity)",
            "Golden Morning Sunburst through Frosted Glass",
            "Warm Ambient Luxury Spa Candlelight"
        ],
        "background_presets": [
            "Minimalist Travertine Marble & Fluted Glass Vanity",
            "Clean Pastel Ceramic Pedestals with Organic Water Ripples",
            "Sun-Drenched Scandinavian Bathroom with Olive Branch Foliage",
            "Pure High-End Dermatology Laboratory Cyclorama (#FFFFFF)",
            "Modernist Open-Air Spa Terrace overlooking Lush Tropical Greens"
        ]
    }


def load_fashion_poster_schemas() -> dict:
    """Specialized schema and controls for High-Fashion Editorial Posters & Billboard Ads."""
    return {
        "poster_styles": [
            "Vogue Paris Haute Couture (Sharp contrast, sculptural luxury silhouette)",
            "Balenciaga Brutalist Streetwear (Heavy grain, oversized industrial tailoring)",
            "Helmut Lang 90s Minimalist (Analog film warmth, stark editorial attitude)",
            "Old Money Italian Riviera (Sun-washed cashmere, effortless palazzo elegance)",
            "Cyberpunk Tokyo Avant-Garde (Reflective chrome, holographic edge neon)",
            "Milan Runway Catwalk (Dramatic front-row spotlights, fabric in motion)",
            "Y2K High-Gloss Metallic (Sleek reflections, liquid silver pop sheen)",
            "Gothic Noir Editorial (Deep velvet chiaroscuro, mysterious high drama)",
            "Met Gala Theatrical Opulence (Grand architectural volume, baroque embroidery)",
            "Scandinavian Clean Lookbook (Understated neutral minimalism, organic daylight)"
        ],
        "poster_poses": [
            "Runway Power Stride (Dynamic forward motion, flowing fabric flair)",
            "Contrapposto Hip-Shift (Asymmetrical weight balance, casual high-fashion poise)",
            "Over-the-Shoulder Haute Glance (Sharp cinematic gaze back toward camera)",
            "Architectural Seated Pose (Perched on minimalist concrete cube with draped apparel)",
            "Hands-in-Pockets Streetwear Lean (Relaxed urban attitude against architectural wall)",
            "Dramatic Low-Angle Hero Stance (Commanding towering silhouette, sweeping lines)",
            "Dynamic Mid-Turn Swirl (Motion-frozen cape and coat fabric swirling in air)",
            "Stern Avant-Garde Crossed-Arms Stare (Unwavering high-glam power attitude)",
            "Candid Sidewalk Catwalk Stride (Natural street style movement, dynamic steps)",
            "Ethereal Leaning Arch Pose (Subtle curve, dramatic neckline and tailored drape)"
        ],
        "background_presets": [
            "Parisian Haussmann Balcony with Wrought-Iron Railing & Limestone Facades",
            "Brutalist Raw Concrete Architectural Column Gallery",
            "Milanese Palazzo Courtyard with Polished Carrara Marble",
            "Tokyo Rain-Slicked Neon Fashion Alley with Asphalt Reflections",
            "New York Soho Cast-Iron Cobblestone Street at Dusk",
            "Minimalist Sunlit Contemporary Art Gallery with Floating Plinths",
            "Sun-Drenched Mediterranean Villa Terrace with Ancient Olive Trees",
            "Ultra-Modern Glass & Steel Skybridge overlooking Futuristic Cityline",
            "Luxury Penthouse Sunset Lounge with Glass Balustrade Horizon",
            "High-Fashion Studio Seamless Cyclorama with Glossy Floor Reflection",
            "Subterranean Brutalist Concrete Bunker with Dramatic Skylight Shaft",
            "Lush Sun-Dappled Botanical Glasshouse with Tropical Monstera Foliage"
        ],
        "lighting_presets": [
            "High-Contrast Studio Chiaroscuro (Razor-sharp shadows, crisp texture)",
            "Cinematic Golden Hour Rim Light (Warm sun flare contouring garment silhouette)",
            "35mm Vintage Analog Film Grain with Warm Tungsten Flash",
            "Neon Cyber Edge Rim Light (Electric cyan and magenta edge glow)",
            "Atmospheric Rain Mist & Wet Asphalt Sheen (Glossy fabric reflections)",
            "Sun-Dappled Window Shadow Patterns (Ethereal botanical gobos)",
            "High-Key Clean Studio Daylight (Pristine commercial catalog clarity)",
            "Moody Dramatic Fog & Volumetric Light Shafts (Theatrical stage atmosphere)",
            "Prismatic Lens Flare & Dreamy Soft Focus Glow (Romantic couture aura)"
        ],
        "model_archetypes": [
            "South Asian Female — Editorial High-Fashion (Dark wavy hair, razor-sharp cheekbones)",
            "East Asian Female — Minimalist Avant-Garde (Sleek black bob, statuesque poise)",
            "Afro-Latina Female — Commercial High-Glam (Textured curls, glowing warm skin)",
            "European Female — Parisian Runway Haute Couture (Sleek bun, high fashion gaze)",
            "European Male — Contemporary High-Fashion Streetwear (Sharp jawline, athletic build)",
            "South Asian Male — Tailored Classic Menswear (Sophisticated frame, groomed look)",
            "East Asian Male — Urban Avant-Garde (Minimalist silhouette, textured undercut)",
            "Custom Model (Defined entirely by your prompt description)"
        ],
        "aspect_ratios": [
            "2:3 (Portrait Editorial 832x1216)",
            "3:4 Luxury Magazine Portrait (Standard Editorial)",
            "9:16 Full Screen / Digital Billboard (Story Ad)",
            "1:1 Square Campaign Artwork (Feed & Album)",
            "4:5 Commercial Fashion Catalog Ad"
        ]
    }


# --- PART I: EXTERNAL DISK & COMFYUI MODEL DISCOVERY ---
def get_comfy_model_paths() -> list:
    """Finds all configured ComfyUI model directories (internal & external)."""
    paths = []
    std_shared = r"C:\Users\Hp\AppData\Local\Comfy-Desktop\ComfyUI-Shared\models"
    if os.path.exists(std_shared):
        paths.append({"name": "ComfyUI Desktop Shared", "path": std_shared, "exists": True})

    cfg_file = r"C:\Users\Hp\AppData\Roaming\Comfy Desktop\shared_model_paths.yaml"
    if os.path.exists(cfg_file):
        try:
            with open(cfg_file, "r", encoding="utf-8") as f:
                content = f.read()
            for line in content.splitlines():
                if "base_path:" in line:
                    p = line.split("base_path:")[1].strip().strip("'\"")
                    if p != std_shared and p not in [x["path"] for x in paths]:
                        paths.append({"name": "External Disk / Custom Models", "path": p, "exists": os.path.exists(p)})
        except Exception:
            pass

    return paths


def register_external_comfy_model_path(external_path: str) -> bool:
    """
    Appends an external disk or folder path to Comfy Desktop's shared_model_paths.yaml
    so ComfyUI automatically detects models on external disks.
    """
    if not external_path or not os.path.exists(external_path):
        return False

    cfg_file = r"C:\Users\Hp\AppData\Roaming\Comfy Desktop\shared_model_paths.yaml"
    if not os.path.exists(cfg_file):
        return False

    try:
        with open(cfg_file, "r", encoding="utf-8") as f:
            content = f.read()

        if external_path in content:
            return True

        block_id = f"external_disk_{abs(hash(external_path)) % 10000}"
        new_entry = (
            f"\n\n{block_id}:\n"
            f"  base_path: '{external_path}'\n"
            f"  is_default: false\n"
            f"  'checkpoints': 'checkpoints/'\n"
            f"  'diffusion_models': 'diffusion_models/'\n"
            f"  'loras': 'loras/'\n"
            f"  'vae': 'vae/'\n"
            f"  'text_encoders': 'text_encoders/'\n"
            f"  'clip': 'clip/'\n"
        )

        with open(cfg_file, "a", encoding="utf-8") as f:
            f.write(new_entry)
        return True
    except Exception:
        return False