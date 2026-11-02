---
name: atelier-studio
description: Autonomous fashion design, virtual try-on, prompt enhancement with Nemotron, model catalog browsing, lookbook history, and LTX-2.5 AI commercial video generation using Atelier AI Studio.
---

# Atelier AI Studio Integration Skill

Autonomous fashion design, virtual try-on, prompt enhancement, model catalog management, commercial lookbook generation, and LTX-2.5 video generation.

Use this skill whenever the user asks to:
1. **Design or synthesize new garments or clothing (Taylor Studio)**
2. **Run virtual try-ons of clothes on models**
3. **Enhance fashion prompts with Nemotron**
4. **Browse or list available fashion models**
5. **Retrieve past shoots or lookbook history**
6. **Generate high-end AI cinematic video commercials (LTX-2.5 & ComfyUI)**

---

## Environment & Prerequisites

- **Studio Backend API Base**: `http://localhost:8000`
- **Studio Directory**: `c:\Users\Hp\Desktop\nlp project bezel`
- **CLI Bridge Tool**: `c:\Users\Hp\Desktop\nlp project bezel\openclaw_bridge.py`

### Backend Status Check

**CLI:**
```bash
python openclaw_bridge.py status
```

**HTTP:**
- `GET http://localhost:8000/api/status`

**Output:**
```json
{
  "comfyui": { "online": true, "host": "http://127.0.0.1:8189" },
  "ollama": { "online": true, "host": "http://localhost:11434" },
  "status": "ready"
}
```

---

## 1. Design a Bespoke Garment (Taylor Studio)

Synthesizes a bespoke garment flat-lay or packshot from prompt, colorway, and textile specs.

### CLI Invocation
```bash
python openclaw_bridge.py design --prompt "Double-breasted trench coat with storm flap and horn buttons" --type "outerwear" --silhouette "Tailored Architectural" --color "Camel Cashmere" --color_hex "#C19A6B" --fabric "Double-Faced Cashmere Wool" --hardware "Horn Buttons & Concealed Placket" --pattern "Solid Minimalist" --view "flat-lay"
```

### HTTP REST API
- **Method**: `POST`
- **URL**: `http://localhost:8000/api/tailor/design`
- **Headers**: `Content-Type: application/json`
- **Payload**:
```json
{
  "prompt": "Double-breasted trench coat with storm flap and horn buttons",
  "garment_type": "outerwear",
  "silhouette": "Tailored Architectural",
  "color": "Camel Cashmere",
  "color_hex": "#C19A6B",
  "fabric": "Double-Faced Cashmere Wool",
  "hardware": "Horn Buttons & Concealed Placket",
  "pattern": "Solid Minimalist",
  "view_mode": "flat-lay"
}
```

### Output
```json
{
  "success": true,
  "shoot_id": "4b9a12fe",
  "image_url": "http://localhost:8000/assets/outputs/tailor_outerwear_camel_cashmere_1729482000.png",
  "local_image_path": "assets/outputs/tailor_outerwear_camel_cashmere_1729482000.png",
  "garment_type": "outerwear",
  "color": "Camel Cashmere",
  "fabric": "Double-Faced Cashmere Wool"
}
```

---

## 2. Run Virtual Try-Ons of Clothes on Models

Drapes an uploaded or synthesized garment flat-lay onto an agency editorial model with conditioned studio lighting and background set.

### CLI Invocation
```bash
python openclaw_bridge.py tryon --model "model_1" --garment_url "assets/outputs/tailor_outerwear_camel_cashmere_1729482000.png" --brief "Crisp luxury editorial lookbook shoot" --lighting "Soft Diffused Commercial Studio" --background "Minimalist Concrete Studio" --pose "Front-Facing Minimalist Pose"
```

### Parameters
- `--model` (required): Model ID (e.g. `model_1`, `model_2`, `model_3`, `model_4`)
- `--garment_url` (required): File path to garment image (from Step 1)
- `--brief` (optional): Art direction brief
- `--lighting` (optional): Studio lighting preset (e.g. `Soft Diffused Commercial Studio`, `Dramatic Chiaroscuro Editorial`)
- `--background` (optional): Set design preset (e.g. `Minimalist Concrete Studio`, `Warm Sand Cyclorama`)
- `--pose` (optional): Pose instruction (e.g. `Front-Facing Minimalist Pose (Relaxed posture, natural drape)`)

### HTTP REST API
- **Method**: `POST`
- **URL**: `http://localhost:8000/api/tryon/generate`
- **Headers**: `Content-Type: multipart/form-data` or `application/x-www-form-urlencoded`
- **Form Data**:
```
garment_url: assets/outputs/tailor_outerwear_camel_cashmere_1729482000.png
model_id: model_1
brief: Crisp luxury editorial lookbook shoot
lighting: Soft Diffused Commercial Studio
background: Minimalist Concrete Studio
pose: Front-Facing Minimalist Pose (Relaxed posture, natural drape)
scope: one-piece
photo_type: flat-lay
```

### Output
```json
{
  "success": true,
  "shoot_id": "e72a8c91",
  "image_url": "http://localhost:8000/assets/outputs/tryon_model_1_1729482120.png",
  "local_image_path": "assets/outputs/tryon_model_1_1729482120.png",
  "model_id": "model_1"
}
```

---

## 3. Enhance Fashion Prompts with Nemotron

Expands concise prompts into high-fashion master tailoring specifications, commercial art directions, or macro beauty concepts using the local Nemotron LLM.

### CLI Invocation
```bash
python openclaw_bridge.py enhance --prompt "silk summer slip dress in terracotta" --style "editorial" --model "nemotron:latest"
```

### Parameters
- `--prompt` (required): Raw garment or photoshoot concept
- `--style` (optional, default `"editorial"`):
  - `editorial`: Vogue/Harper's Bazaar luxury lighting, fluid drape, textural fabric weave
  - `tailor`: Master bespoke construction, architectural seams, tactile grain, hardware
  - `commercial`: Clean e-commerce lookbook, color fidelity, balanced cyclorama lighting
  - `skincare`: Macro cosmetic beauty portrait, pore-level clarity, glass skin radiance
- `--model` (optional, default `"nemotron:latest"`): Ollama model tag

### HTTP REST API
- **Method**: `POST`
- **URL**: `http://localhost:8000/api/prompt/enhance`
- **Headers**: `Content-Type: application/json`
- **Payload**:
```json
{
  "prompt": "silk summer slip dress in terracotta",
  "style": "editorial",
  "model": "nemotron:latest"
}
```

### Output
```json
{
  "enhanced": "Bespoke terracotta silk slip dress sculpted with fluid bias-cut drape, micro-hem tailoring seams, illuminated by soft golden hour rim light and tactile silk satin sheen, 8k luxury editorial catalog clarity.",
  "original": "silk summer slip dress in terracotta",
  "style": "editorial",
  "model": "nemotron:latest",
  "success": true
}
```

---

## 4. Browse or List Available Fashion Models

Fetches the complete registry of editorial agency models, archetypes, and demographics.

### CLI Invocation
```bash
python openclaw_bridge.py models
```

### HTTP REST API
- **Method**: `GET`
- **URL**: `http://localhost:8000/api/models`

### Output
```json
{
  "count": 4,
  "models": [
    {
      "id": "model_1",
      "name": "Aria Vance",
      "gender": "Female",
      "archetype": "Haute Couture Editorial"
    },
    {
      "id": "model_2",
      "name": "Kai Sterling",
      "gender": "Male",
      "archetype": "Architectural Tailoring & Suiting"
    },
    {
      "id": "model_3",
      "name": "Elena Rostova",
      "gender": "Female",
      "archetype": "Minimalist Scandinavian Luxury"
    },
    {
      "id": "model_4",
      "name": "Marcus Thorne",
      "gender": "Male",
      "archetype": "Contemporary Street-Luxury"
    }
  ]
}
```

---

## 5. Retrieve Past Shoots or Lookbook History

Queries DuckDB telemetry and catalog storage for past shoot records, generated high-res image URLs, and render metadata.

### CLI Invocation
```bash
python openclaw_bridge.py history --limit 5
```

### Parameters
- `--limit` (optional, default `5`): Number of recent records to retrieve

### HTTP REST API
- **Method**: `GET`
- **URL**: `http://localhost:8000/api/history?limit=5`

### Output
```json
[
  {
    "shoot_id": "e72a8c91",
    "timestamp": 1729482120,
    "model_id": "model_1",
    "prompt": "Crisp luxury editorial lookbook shoot",
    "image_url": "/assets/outputs/tryon_model_1_1729482120.png",
    "status": "completed",
    "render_time_sec": 4.12
  }
]
```

---

## End-to-End Campaign Workflow Example

1. **Verify Services**: `python openclaw_bridge.py status`
2. **Enhance Brief**: `python openclaw_bridge.py enhance --prompt "emerald velvet evening cape" --style "tailor"`
3. **Design Garment**: `python openclaw_bridge.py design --prompt "<enhanced_prompt>" --type "outerwear" --color "Emerald Noir" --fabric "Heavy Silk Velvet"`
4. **Select Model**: `python openclaw_bridge.py models`
5. **Render Virtual Try-On**: `python openclaw_bridge.py tryon --model "model_1" --garment_url "<local_image_path>" --brief "High jewelry and eveningwear luxury campaign"`
6. **Fetch Results**: `python openclaw_bridge.py history --limit 1`
