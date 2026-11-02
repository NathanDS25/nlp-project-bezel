# ATELIER — AI Commercial Fashion Studio
*Immaculate architectural luxury meets hyper-precise neural generation.*

An end-to-end commercial AI fashion suite integrating **ComfyUI (Qwen-Image / PiD Latent DiT)**, **Nemotron LLMs**, **DuckDB binary BLOB archive**, and **ChromaDB vector search**.

---

## ⚡ Quickstart

### 1. Launch Services
Double-click `run_react.bat` or run:
```bash
# Terminal 1: ComfyUI (port 8188 / 8189)
run_comfy.bat

# Terminal 2: Backend API (port 8000)
.\venv\Scripts\python.exe server.py

# Terminal 3: React Frontend (port 3000)
cd frontend
npm run dev
```

### 2. Studio Web Endpoints
- **React Studio UI**: [http://localhost:3000](http://localhost:3000)
- **FastAPI REST API & Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **DuckDB Sync / Status**: `http://127.0.0.1:8000/api/duckdb/sync`

---

## 🧪 Feature Test Prompts

Use the following curated, production-tested prompts to exercise every module in the studio.

---

### I · Generation Hub (Virtual Try-On & Haute Couture Synthesis)
> **Location**: Navigation tab `I · GENERATION HUB`

#### Mode A: Garment Try-On (With Flat-Lay Image)
*Attach the default Camel Cashmere Coat (or upload any flat-lay PNG/JPG).*
```text
Crisp commercial lookbook shoot for Paris Fashion Week. The model strides naturally along a raw minimalist concrete runway with subtle architectural shadows. Razor-sharp drape folds, pristine textile contours, natural skin micro-pore clarity.
```
- **Recommended Parameters**:
  - **Model Archetype**: *Parisian Chic (French Female — Natural brunette, effortless elegance)*
  - **Lighting**: *Studio High-Key (25%)*
  - **Fabric Texture**: *High-Twist Wool & Cashmere (20%)*
  - **Garment Scope**: `ONE-PIECE` or `OUTERWEAR`
  - **Biometric Identity Lock**: `ON`

#### Mode B: Pure Text-to-Fashion Runway Synthesis (No Garment File Needed)
*Click "Clear" on Garment Piece to activate Text-to-Fashion mode.*
```text
An avant-garde sculptural evening gown in liquid molten silver satin, featuring an asymmetric dramatic shoulder cape, cinched architectural waist, and cascading floor-length puddle train. Shot with a 100mm f/2.8 lens in high-key diffused studio lighting.
```
- **Action**: Click **"✨ GENERATE HAUTE COUTURE"**

---

### II · Bespoke Tailoring (Taylor Studio)
> **Location**: Navigation tab `II · BESPOKE TAYLORING`

#### Test 1: Architectural Cashmere Coat
- **Category**: `Outerwear & Coats`
- **Silhouette**: `Tailored Architectural`
- **Colorway**: `Camel Cashmere (#C19A6B)`
- **Fabric**: `Double-Faced Cashmere Wool`
- **Hardware**: `Horn Buttons & Concealed Placket`
- **Pattern**: `Solid Minimalist`
- **View**: `Flat-Lay Packshot`
- **Design Prompt**:
```text
Bespoke double-breasted oversized trench coat with structured storm flap, deep welt pockets, wide notched lapels, and hand-stitched pick-stitch detailing along the edges. Seamless cyclorama background.
```

#### Test 2: Liquid Silk Evening Slip Gown
- **Category**: `Evening Gowns & Dresses`
- **Silhouette**: `Cinched Hourglass Drape`
- **Colorway**: `Forest Emerald (#1F382B)`
- **Fabric**: `22-Momme Liquid Silk Charmeuse`
- **Design Prompt**:
```text
Floor-length bias-cut silk evening slip dress with cowl neckline, delicate criss-cross spaghetti straps, liquid specular highlights, and fluid drape puddle hem. Shot on flat studio cyclorama.
```

#### Test 3: Garment Recolor & Fabric Re-swatch
*Select an existing design from the Taylor tray and apply a new swatch:*
- **Target Swatch**: `Bordeaux Wine (#4A121A)` or `Cobalt Royal (#0047FF)`
- **Fabric Weave**: `Supple Italian Nappa Calfskin`

---

### III · Wardrobe Layering Stack
> **Location**: Navigation tab `III · WARDROBE LAYERING`

*Test coordinating multi-piece outfits into a unified editorial look:*
- **Base Top**: White ribbed merino wool turtleneck
- **Outerwear**: Tailored camel cashmere double-breasted coat
- **Bottom**: High-waisted wide-leg charcoal wool trousers
- **Footwear**: Minimalist black leather pointed-toe ankle boots
- **Styling Brief**:
```text
Editorial street-style full-length shot of a complete 4-piece coordinated winter wardrobe. Perfect proportional layering, natural fabric creasing, and harmonious textile separation.
```

---

### IV · Editorial Campaign (Poster Studio with Typography)
> **Location**: Navigation tab `IV · EDITORIAL CAMPAIGN`

#### Test 1: High-Fashion Magazine Cover (3:4 Portrait)
- **Aspect Ratio**: `3:4 Luxury Magazine Portrait`
- **Brand Title**: `ATELIER`
- **Subheader**: `AUTUMN / WINTER 2026`
- **Tagline**: `PARIS · MILAN · NEW YORK`
- **Model**: `model_female_1` *(South Asian Female — Razor-sharp cheekbones)*
- **Editorial Brief**:
```text
Cover shoot for Vogue International. Haute couture editorial styling, sculptural tailored jacket with dramatic exaggerated lapels. Monochromatic chiaroscuro lighting with sharp cinematic rim light.
```

#### Test 2: Streetwear Billboard Campaign (9:16 Vertical)
- **Aspect Ratio**: `9:16 Full Screen / Digital Billboard`
- **Brand Title**: `NEXUS`
- **Subheader**: `URBAN COUTURE CAPSULE`
- **Tagline**: `TOKYO ARCHIVE 01`
- **Model**: `model_male_1` *(European Male — High-fashion streetwear)*
- **Editorial Brief**:
```text
Dynamic stride on wet Tokyo neon asphalt at twilight. Heavyweight 450gsm drop-shoulder boxy hoodie and architectural cargo trousers with matte metallic hardware.
```

---

### V · Skincare & Beauty Macro Studio
> **Location**: Navigation tab `V · SKINCARE & BEAUTY`

*Upload a cosmetic serum bottle photo or click to use the default container:*
- **Product Type**: `Glass Dropper Serum Bottle`
- **Skin Finish**: `Glass Skin (Hyper-dewy, reflective, luminous)`
- **Lighting Mood**: `High-Key Softbox Beauty Lighting`
- **Beauty Prompt**:
```text
Extreme macro 4k beauty close-up photograph of a radiant woman with glowing skin, holding this skincare product delicately right next to her face and cheekbone. Delicate manicured fingers resting gently on cheek, soft warm studio lighting, immaculate pore-level realistic skin texture, dewy glass skin finish, commercial beauty advertisement.
```

---

### VI · Model Agency Roster & Casting
> **Location**: Navigation tab `VI · MODEL ROSTER`

#### Test 1: Biometric Identity Casting Test
- **Select Model**: `Elena Vogue` or `Camille Paris`
- **Verify**: Biometric Lock toggle is active (`90% strength`).
- **Prompt**:
```text
Editorial beauty portrait, front-facing neutral gaze, wearing a minimalist black high-collar silk blouse. Sharp catchlights in the eyes, natural porcelain skin texture, elegant bone structure.
```

#### Test 2: Generate New Virtual Agency Model
*Click "Cast New Model" at the top of the roster:*
- **Name**: `Amina Luxor`
- **Gender**: `Female`
- **Archetype**: `East African — Statuesque runway poise, radiant deep mahogany skin, high defined cheekbones, close-cropped natural hair.`
- **Prompt**:
```text
Official agency comp card portrait of an East African high-fashion model. Neutral grey seamless studio background, clean 85mm portrait lens, raw natural skin realism.
```

---

### VII · Commercial & DoP Video (Higgsfield Camera Moves)
> **Location**: Navigation tab `VII · COMMERCIAL & DOP VIDEO`

#### Camera Preset 1: 360° Bullet-Time Orbit (`orbit_360`)
- **Concept Directive**:
```text
High-fashion runway model frozen in mid-stride wearing a flowing crimson silk evening cape. Cinematic 360-degree continuous camera orbit around subject on a glossy black reflective infinity floor.
```

#### Camera Preset 2: Texture Push Dolly-In (`dolly_in`)
- **Concept Directive**:
```text
Slow, luxurious dolly push-in directly toward model, shifting focal depth from full silhouette onto double-faced cashmere herringbone weave and horn button details.
```

#### Camera Preset 3: Runway Catwalk Truck Tracking (`runway_truck`)
- **Concept Directive**:
```text
Lateral tracking camera moving parallel to the model's stride down a floodlit concrete runway, capturing fluid garment dynamics and natural fabric sway.
```

---

### VIII · 4K PiD Latent DiT Super-Resolution Upscaler
> **Location**: Navigation tab `VIII · DUCKDB ARCHIVE` or via REST API

*Send an existing shoot for 4K super-resolution reconstruction (4096×4096):*
- **Base Steps**: `8`
- **Upscale Steps**: `4`
- **Upscale Prompt**:
```text
Master 4k fashion lookbook photograph, micro-pore skin texture, individual cashmere textile fibers, crisp specular highlights on silver zipper pulls, 8k hyper-resolution master file.
```

---

### IX · DuckDB Semantic Catalog Search
> **Location**: Top search bar or API endpoint `/api/lookbook/search?q=...`

Test semantic vector lookbook queries:
- Query 1: `camel cashmere coat outerwear`
- Query 2: `emerald silk slip dress evening`
- Query 3: `streetwear hoodie tokyo`
- Query 4: `macro beauty skincare dewy`

---

### X · Nexus Autonomous Multi-Agent Orchestrator
> **Location**: Navigation tab `IX · NEXUS MULTI-AGENT` or floating chat drawer `✦ NEXUS AGENT`

#### Prompt 1: Autonomous Design & Drape
```text
Nexus, delegate to an Atelier subagent: synthesize a bespoke double-breasted camel cashmere coat flat-lay and drape it onto camille_paris. Report back with the shoot ID and image URL.
```

#### Prompt 2: Creative Brief Enhancement
```text
Nexus, enhance the prompt for an emerald silk bias-cut evening slip dress using the Atelier tailor style.
```

#### Prompt 3: Model Agency Query
```text
Nexus, query the Atelier Studio registry and list all available female and male agency models with their archetypes.
```

#### Prompt 4: Lookbook Telemetry Audit
```text
Nexus, inspect the DuckDB database and fetch the telemetry metrics and shoot records for our last 3 renders.
```

---

## 🛠️ CLI Testing with `openclaw_bridge.py`

You can also test all features headlessly via the terminal:

```bash
# 1. Check Studio & Engine Status
python openclaw_bridge.py status

# 2. Design Bespoke Garment
python openclaw_bridge.py design \
  --prompt "Bespoke double-breasted camel cashmere coat" \
  --type "outerwear" \
  --color "Camel Cashmere" \
  --fabric "Double-Faced Cashmere Wool"

# 3. Virtual Try-On
python openclaw_bridge.py tryon \
  --model "model_female_1" \
  --garment_url "assets/garments/camel_cashmere_coat.png" \
  --brief "Editorial commercial lookbook shoot"

# 4. Enhance Brief with Nemotron
python openclaw_bridge.py enhance \
  --prompt "silk slip dress" \
  --style "editorial"

# 5. List Agency Models
python openclaw_bridge.py models
```
