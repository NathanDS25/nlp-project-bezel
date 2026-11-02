"""
app.py - Ethereal — AI Commercial Virtual Try-On Studio
Supports Model Generation & Editing, Shoot History Management, Full-Body Presets, and Lookbook Motion.
"""

import os
import io
import time
import base64
import requests
import streamlit as st
from PIL import Image

import importlib
import catalog
import engine
importlib.reload(catalog)
importlib.reload(engine)

from catalog import (
    load_rea_schemas,
    semantic_search_catalog,
    seed_initial_catalog_if_empty,
    get_db,
    load_models_registry,
    save_models_registry,
    add_or_update_model,
    delete_model,
    get_shoot_history,
    delete_shoot,
    clear_all_shoots,
    load_skincare_schemas,
    load_fashion_poster_schemas,
    get_comfy_model_paths,
    register_external_comfy_model_path
)
from engine import (
    execute_qwen_comfy_pipeline,
    build_commercial_edit_instruction,
    generate_lookbook_animation,
    execute_skincare_pipeline,
    build_skincare_commercial_instruction,
    execute_fashion_poster_pipeline,
    build_fashion_poster_instruction,
    render_fashion_poster_typography,
    execute_qwen_fashion_t2i,
    execute_z_turbo_skincare_t2i
)

st.set_page_config(
    page_title="Ethereal — AI Virtual Try-On Studio",
    page_icon="◆",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ─────────────────────────────────────────────────
# ETHEREAL DESIGN SYSTEM — B&W Minimalist
# ─────────────────────────────────────────────────

# Load logo as base64 for embedding
LOGO_PATH = os.path.join("assets", "ethereal_logo.jpg")
logo_b64 = ""
if os.path.exists(LOGO_PATH):
    with open(LOGO_PATH, "rb") as _lf:
        logo_b64 = base64.b64encode(_lf.read()).decode()

st.markdown(f"""
<style>
    /* ── IMPORTS ── */
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@200;300;400;500;600;700&display=swap');

    /* ── ROOT TOKENS ── */
    :root {{
        --eth-black: #0a0a0a;
        --eth-dark: #111111;
        --eth-charcoal: #1a1a1a;
        --eth-graphite: #222222;
        --eth-slate: #2a2a2a;
        --eth-ash: #333333;
        --eth-smoke: #555555;
        --eth-grey: #777777;
        --eth-silver: #999999;
        --eth-mist: #bbbbbb;
        --eth-pearl: #dddddd;
        --eth-bone: #e8e8e8;
        --eth-ivory: #f0f0f0;
        --eth-snow: #f5f5f5;
        --eth-white: #fafafa;
        --eth-pure: #ffffff;
        --eth-accent: #0a0a0a;

        --font-display: 'Cormorant Garamond', 'Georgia', serif;
        --font-body: 'Outfit', 'Inter', -apple-system, sans-serif;
        --font-mono: 'SF Mono', 'Fira Code', monospace;

        --radius-sm: 2px;
        --radius-md: 4px;
        --radius-lg: 8px;

        --shadow-subtle: 0 1px 3px rgba(0,0,0,0.06);
        --shadow-card: 0 2px 8px rgba(0,0,0,0.08);
        --shadow-elevated: 0 4px 20px rgba(0,0,0,0.12);
        --shadow-deep: 0 8px 40px rgba(0,0,0,0.18);

        --border-hairline: 1px solid rgba(0,0,0,0.06);
        --border-light: 1px solid rgba(0,0,0,0.08);
        --border-medium: 1px solid rgba(0,0,0,0.12);
        --border-strong: 1px solid rgba(0,0,0,0.20);
    }}

    /* ── GLOBAL RESET ── */
    .stApp {{
        background-color: var(--eth-snow) !important;
        color: var(--eth-dark) !important;
        font-family: var(--font-body) !important;
    }}

    /* ── TYPOGRAPHY ── */
    h1, h2, h3, h4, h5, h6 {{
        font-family: var(--font-body) !important;
        color: var(--eth-dark) !important;
        letter-spacing: -0.02em !important;
        font-weight: 600 !important;
    }}

    p, span, div, li, label {{
        font-family: var(--font-body) !important;
    }}

    /* ── SIDEBAR ── */
    section[data-testid="stSidebar"] {{
        background: var(--eth-pure) !important;
        border-right: var(--border-light) !important;
    }}

    section[data-testid="stSidebar"] .stMarkdown {{
        color: var(--eth-dark) !important;
    }}

    section[data-testid="stSidebar"] h1,
    section[data-testid="stSidebar"] h2,
    section[data-testid="stSidebar"] h3 {{
        font-family: var(--font-body) !important;
        font-weight: 600 !important;
        color: var(--eth-black) !important;
        letter-spacing: 0.04em !important;
        text-transform: uppercase !important;
        font-size: 0.72rem !important;
        margin-top: 1.2rem !important;
    }}

    /* ── INPUTS ── */
    .stTextInput input,
    .stTextArea textarea,
    .stSelectbox > div > div {{
        background: var(--eth-pure) !important;
        border: var(--border-medium) !important;
        border-radius: var(--radius-md) !important;
        font-family: var(--font-body) !important;
        font-size: 0.85rem !important;
        color: var(--eth-dark) !important;
        transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
    }}

    .stTextInput input:focus,
    .stTextArea textarea:focus {{
        border-color: var(--eth-black) !important;
        box-shadow: 0 0 0 1px var(--eth-black) !important;
    }}

    /* ── BUTTONS ── */
    .stButton > button {{
        background: var(--eth-black) !important;
        color: var(--eth-pure) !important;
        border: none !important;
        border-radius: var(--radius-md) !important;
        font-family: var(--font-body) !important;
        font-weight: 500 !important;
        font-size: 0.82rem !important;
        letter-spacing: 0.06em !important;
        text-transform: uppercase !important;
        padding: 0.55rem 1.4rem !important;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        box-shadow: var(--shadow-subtle) !important;
    }}

    .stButton > button:hover {{
        background: var(--eth-charcoal) !important;
        box-shadow: var(--shadow-card) !important;
        transform: translateY(-1px) !important;
    }}

    .stButton > button:active {{
        transform: translateY(0) !important;
        box-shadow: none !important;
    }}

    .stButton > button[kind="secondary"] {{
        background: transparent !important;
        color: var(--eth-dark) !important;
        border: var(--border-strong) !important;
    }}

    .stButton > button[kind="secondary"]:hover {{
        background: var(--eth-dark) !important;
        color: var(--eth-pure) !important;
    }}

    .stDownloadButton > button {{
        background: transparent !important;
        color: var(--eth-dark) !important;
        border: var(--border-strong) !important;
        border-radius: var(--radius-md) !important;
        font-family: var(--font-body) !important;
        font-weight: 500 !important;
        font-size: 0.78rem !important;
        letter-spacing: 0.06em !important;
        text-transform: uppercase !important;
        transition: all 0.25s ease !important;
    }}

    .stDownloadButton > button:hover {{
        background: var(--eth-dark) !important;
        color: var(--eth-pure) !important;
    }}

    /* ── TABS ── */
    .stTabs [data-baseweb="tab-list"] {{
        gap: 0 !important;
        border-bottom: var(--border-medium) !important;
        background: transparent !important;
    }}

    .stTabs [data-baseweb="tab"] {{
        font-family: var(--font-body) !important;
        font-weight: 500 !important;
        font-size: 0.78rem !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
        color: var(--eth-grey) !important;
        border: none !important;
        background: transparent !important;
        padding: 0.8rem 1.5rem !important;
        transition: color 0.2s ease !important;
    }}

    .stTabs [data-baseweb="tab"]:hover {{
        color: var(--eth-dark) !important;
    }}

    .stTabs [aria-selected="true"] {{
        color: var(--eth-black) !important;
        border-bottom: 2px solid var(--eth-black) !important;
    }}

    .stTabs [data-baseweb="tab-highlight"] {{
        background-color: var(--eth-black) !important;
    }}

    /* ── CARDS ── */
    .eth-card {{
        background: var(--eth-pure);
        border: var(--border-light);
        border-radius: var(--radius-lg);
        padding: 1.6rem;
        margin-bottom: 1rem;
        transition: box-shadow 0.3s ease, transform 0.3s ease;
        position: relative;
    }}

    .eth-card:hover {{
        box-shadow: var(--shadow-elevated);
        transform: translateY(-2px);
    }}

    .eth-card-flat {{
        background: var(--eth-pure);
        border: var(--border-light);
        border-radius: var(--radius-lg);
        padding: 1.2rem;
        margin-bottom: 0.8rem;
    }}

    /* ── HEADER ── */
    .eth-header {{
        display: flex;
        align-items: center;
        gap: 1.2rem;
        padding: 1.5rem 0 1rem 0;
        border-bottom: var(--border-light);
        margin-bottom: 1.8rem;
    }}

    .eth-logo {{
        width: 52px;
        height: 52px;
        border-radius: var(--radius-sm);
        object-fit: contain;
    }}

    .eth-brand {{
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
    }}

    .eth-title {{
        font-family: var(--font-display) !important;
        font-size: 2.4rem;
        font-weight: 300;
        color: var(--eth-black);
        letter-spacing: 0.15em;
        text-transform: uppercase;
        line-height: 1;
        margin: 0;
    }}

    .eth-subtitle {{
        font-family: var(--font-body);
        font-size: 0.7rem;
        font-weight: 400;
        color: var(--eth-silver);
        letter-spacing: 0.25em;
        text-transform: uppercase;
        margin: 0;
    }}

    /* ── SECTION HEADERS ── */
    .eth-section {{
        font-family: var(--font-body) !important;
        font-size: 0.7rem !important;
        font-weight: 600 !important;
        letter-spacing: 0.18em !important;
        text-transform: uppercase !important;
        color: var(--eth-smoke) !important;
        margin: 2rem 0 0.8rem 0 !important;
        padding-bottom: 0.5rem !important;
        border-bottom: var(--border-light) !important;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }}

    .eth-section-dot {{
        width: 6px;
        height: 6px;
        background: var(--eth-black);
        border-radius: 50%;
        display: inline-block;
    }}

    /* ── BADGES ── */
    .eth-badge {{
        display: inline-block;
        padding: 3px 10px;
        border-radius: 2px;
        font-size: 0.65rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-family: var(--font-body);
        margin-right: 6px;
    }}

    .eth-badge-dark {{
        background: var(--eth-dark);
        color: var(--eth-pearl);
    }}

    .eth-badge-outline {{
        background: transparent;
        color: var(--eth-dark);
        border: 1px solid var(--eth-dark);
    }}

    .eth-badge-muted {{
        background: var(--eth-ivory);
        color: var(--eth-smoke);
    }}

    /* ── METRIC CARDS ── */
    .eth-metric {{
        background: var(--eth-pure);
        border: var(--border-light);
        border-radius: var(--radius-md);
        padding: 1.2rem 1rem;
        text-align: center;
    }}

    .eth-metric-value {{
        font-family: var(--font-display) !important;
        font-size: 2rem;
        font-weight: 600;
        color: var(--eth-black);
        line-height: 1.1;
    }}

    .eth-metric-label {{
        font-size: 0.62rem;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--eth-silver);
        margin-top: 0.3rem;
    }}

    /* ── HISTORY CARD ── */
    .eth-history {{
        background: var(--eth-pure);
        border: var(--border-light);
        border-radius: var(--radius-lg);
        padding: 1.4rem;
        margin-bottom: 1rem;
        transition: box-shadow 0.3s ease;
    }}

    .eth-history:hover {{
        box-shadow: var(--shadow-card);
    }}

    /* ── MODEL CARD ── */
    .eth-model-card {{
        background: var(--eth-pure);
        border: var(--border-light);
        border-radius: var(--radius-lg);
        padding: 1rem;
        margin-bottom: 1rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
    }}

    .eth-model-card::before {{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--eth-black);
        transform: scaleX(0);
        transition: transform 0.3s ease;
        transform-origin: left;
    }}

    .eth-model-card:hover {{
        box-shadow: var(--shadow-elevated);
        transform: translateY(-3px);
    }}

    .eth-model-card:hover::before {{
        transform: scaleX(1);
    }}

    /* ── EXPANDER ── */
    .streamlit-expanderHeader {{
        font-family: var(--font-body) !important;
        font-size: 0.78rem !important;
        font-weight: 500 !important;
        letter-spacing: 0.04em !important;
        color: var(--eth-smoke) !important;
        border: none !important;
        background: transparent !important;
    }}

    /* ── INFO / WARNING / SUCCESS ── */
    .stAlert {{
        border-radius: var(--radius-md) !important;
        font-family: var(--font-body) !important;
        font-size: 0.82rem !important;
        border: var(--border-light) !important;
    }}

    /* ── DIVIDERS ── */
    .eth-divider {{
        border: none;
        border-top: var(--border-light);
        margin: 2rem 0;
    }}

    .eth-divider-subtle {{
        border: none;
        border-top: 1px solid rgba(0,0,0,0.04);
        margin: 1.2rem 0;
    }}

    /* ── CAPTION OVERRIDE ── */
    .stCaption, .stMarkdown small {{
        color: var(--eth-silver) !important;
        font-size: 0.72rem !important;
        letter-spacing: 0.02em !important;
    }}

    /* ── METRIC OVERRIDE ── */
    [data-testid="stMetric"] {{
        background: var(--eth-pure) !important;
        border: var(--border-light) !important;
        border-radius: var(--radius-md) !important;
        padding: 1rem !important;
    }}

    [data-testid="stMetric"] [data-testid="stMetricValue"] {{
        font-family: var(--font-display) !important;
        font-weight: 500 !important;
        color: var(--eth-black) !important;
    }}

    [data-testid="stMetric"] [data-testid="stMetricLabel"] {{
        font-family: var(--font-body) !important;
        font-size: 0.65rem !important;
        letter-spacing: 0.12em !important;
        text-transform: uppercase !important;
        color: var(--eth-silver) !important;
    }}

    /* ── RADIO / CHECKBOX ── */
    .stRadio label, .stCheckbox label {{
        font-size: 0.82rem !important;
        color: var(--eth-dark) !important;
    }}

    /* ── FILE UPLOADER ── */
    [data-testid="stFileUploader"] {{
        border: 1px dashed rgba(0,0,0,0.15) !important;
        border-radius: var(--radius-md) !important;
        background: var(--eth-pure) !important;
    }}

    /* ── CODE BLOCKS ── */
    .stCodeBlock {{
        background: var(--eth-dark) !important;
        border-radius: var(--radius-md) !important;
        font-family: var(--font-mono) !important;
    }}

    /* ── SPINNER ── */
    .stSpinner > div {{
        border-top-color: var(--eth-black) !important;
    }}

    /* ── SLIDER ── */
    .stSlider > div > div > div {{
        color: var(--eth-black) !important;
    }}

    /* ── VIDEO ── */
    .stVideo {{
        border-radius: var(--radius-md) !important;
        overflow: hidden !important;
    }}

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar {{
        width: 6px;
    }}

    ::-webkit-scrollbar-track {{
        background: transparent;
    }}

    ::-webkit-scrollbar-thumb {{
        background: var(--eth-pearl);
        border-radius: 3px;
    }}

    ::-webkit-scrollbar-thumb:hover {{
        background: var(--eth-silver);
    }}

    /* ── SIDEBAR LOGO ── */
    .eth-sidebar-logo {{
        display: flex;
        align-items: center;
        gap: 0.7rem;
        padding: 0.5rem 0 1rem 0;
        border-bottom: var(--border-light);
        margin-bottom: 1rem;
    }}

    .eth-sidebar-logo img {{
        width: 36px;
        height: 36px;
        object-fit: contain;
    }}

    .eth-sidebar-brand {{
        font-family: var(--font-display);
        font-size: 1.3rem;
        font-weight: 400;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--eth-black);
    }}

    /* ── STUDIO ENGINE TAG ── */
    .eth-engine-tag {{
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 4px 12px;
        background: var(--eth-dark);
        color: var(--eth-pearl);
        border-radius: var(--radius-sm);
        font-size: 0.62rem;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-family: var(--font-body);
    }}

    .eth-engine-dot {{
        width: 5px;
        height: 5px;
        background: #4ade80;
        border-radius: 50%;
        display: inline-block;
    }}

    /* ── ANIMATIONS ── */
    @keyframes fadeIn {{
        from {{ opacity: 0; transform: translateY(8px); }}
        to {{ opacity: 1; transform: translateY(0); }}
    }}

    .eth-animate {{
        animation: fadeIn 0.5s ease-out;
    }}
</style>
""", unsafe_allow_html=True)

# Initialize demo catalog if empty
seed_initial_catalog_if_empty()
schemas = load_rea_schemas()
all_models = load_models_registry()

# ─────────────────────────────────────────────────
# SIDEBAR
# ─────────────────────────────────────────────────

# Sidebar Logo
if logo_b64:
    st.sidebar.markdown(f"""
    <div class="eth-sidebar-logo">
        <img src="data:image/jpeg;base64,{logo_b64}" alt="Ethereal">
        <span class="eth-sidebar-brand">Ethereal</span>
    </div>
    """, unsafe_allow_html=True)
else:
    st.sidebar.markdown("""
    <div class="eth-sidebar-logo">
        <span style="font-size:1.4rem;">◆</span>
        <span class="eth-sidebar-brand">Ethereal</span>
    </div>
    """, unsafe_allow_html=True)

st.sidebar.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Model Selection</div>', unsafe_allow_html=True)

model_mode = st.sidebar.radio("Model Source", ["Agency Models Roster", "Upload Custom Person Photo"], index=0, label_visibility="collapsed")

selected_model_archetype = ""
model_image_bytes = None
model_image_name = None
preview_model_img = None
selected_model_id = None

if model_mode == "Agency Models Roster":
    gender_filter = st.sidebar.radio("Filter By Gender", ["All", "Female", "Male"], horizontal=True)
    
    filtered_models = {
        k: v for k, v in all_models.items()
        if gender_filter == "All" or v.get("gender") == gender_filter
    }
    if not filtered_models:
        filtered_models = all_models
        
    model_keys = list(filtered_models.keys())
    
    # Check session state for pre-selected model
    default_idx = 0
    if "selected_model_id" in st.session_state and st.session_state["selected_model_id"] in model_keys:
        default_idx = model_keys.index(st.session_state["selected_model_id"])

    selected_model_id = st.sidebar.selectbox(
        "Choose Your Model",
        model_keys,
        index=default_idx,
        key=f"model_select_{gender_filter}",
        format_func=lambda k: f"{filtered_models[k].get('name', k)}"
    )
    st.session_state["selected_model_id"] = selected_model_id
    
    model_data = filtered_models[selected_model_id]
    selected_model_archetype = model_data.get("archetype", "")
    
    # Load preset/custom image locally or via URL
    local_p = model_data.get("local_file")
    img_loaded = False
    if local_p:
        check_paths = [local_p, os.path.join(os.path.dirname(__file__), local_p)]
        for cp in check_paths:
            if os.path.exists(cp) and os.path.isfile(cp):
                try:
                    with open(cp, "rb") as f:
                        model_image_bytes = f.read()
                    model_image_name = os.path.basename(cp)
                    preview_model_img = Image.open(io.BytesIO(model_image_bytes))
                    st.sidebar.image(preview_model_img, caption=model_data.get("name"), use_container_width=True)
                    st.sidebar.caption(model_data.get("description", ""))
                    img_loaded = True
                    break
                except Exception:
                    pass

    if not img_loaded and model_data.get("image_url"):
        try:
            r = requests.get(model_data["image_url"], timeout=6)
            if r.status_code == 200:
                model_image_bytes = r.content
                model_image_name = f"{selected_model_id}.png"
                preview_model_img = Image.open(io.BytesIO(model_image_bytes))
                st.sidebar.image(preview_model_img, caption=model_data.get("name"), use_container_width=True)
                st.sidebar.caption(model_data.get("description", ""))
                img_loaded = True
        except Exception:
            pass

    if not img_loaded:
        st.sidebar.warning("Could not load preset image preview.")

else:
    custom_person = st.sidebar.file_uploader("Upload Person Photo", type=["png", "jpg", "jpeg", "webp"])
    if custom_person:
        model_image_bytes = custom_person.read()
        model_image_name = custom_person.name
        preview_model_img = Image.open(io.BytesIO(model_image_bytes))
        st.sidebar.image(preview_model_img, caption="Custom Model", use_container_width=True)
    selected_model_archetype = st.sidebar.text_input("Describe Custom Person Archetype", "Custom Fashion Model")

# --- CUSTOM MODEL APPEARANCE DIRECTION ---
st.sidebar.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Styling & Appearance</div>', unsafe_allow_html=True)
selected_pose = st.sidebar.selectbox("Model Fashion Pose", schemas.get("model_poses", []), index=0)
custom_pose = st.sidebar.text_input("Custom Pose Direction (Optional)", placeholder="e.g. leaning against pillar, hands behind back...")
final_pose = f"{selected_pose}. {custom_pose.strip()}" if custom_pose.strip() else selected_pose

custom_model_direction = st.sidebar.text_area(
    "How should the model look? (Optional adjustments)",
    placeholder="e.g. give the model a slight smile, side-parted hair, elegant silver earrings..."
)

st.sidebar.markdown('<hr class="eth-divider-subtle">', unsafe_allow_html=True)
with st.sidebar.expander("External Disk & Model Storage", expanded=False):
    st.caption("Auto-detects and connects external drives with Checkpoints, LoRAs, or VAEs to ComfyUI.")
    detected_paths = get_comfy_model_paths()
    for dp in detected_paths:
        status_icon = "●" if dp["exists"] else "○"
        st.caption(f"{status_icon} **{dp['name']}**: `{dp['path']}`")

    ext_input = st.text_input("External Model Folder Path", placeholder=r"e.g. D:\models or E:\ComfyUI\models", key="ext_model_path_input")
    if st.button("Connect & Link to ComfyUI", key="btn_link_ext_models"):
        if ext_input.strip() and os.path.exists(ext_input.strip()):
            if register_external_comfy_model_path(ext_input.strip()):
                st.success("Successfully linked external models to ComfyUI!")
            else:
                st.warning("Path added or already registered.")
        else:
            st.error("Please provide a valid, existing folder path on your external disk.")

st.sidebar.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Studio Controls</div>', unsafe_allow_html=True)

scope = st.sidebar.selectbox("Garment Scope", schemas.get("garment_scopes", ["top", "bottom", "one-piece", "outerwear", "full-outfit"]), index=0)
photo_type = st.sidebar.selectbox("Garment Photo Type", schemas.get("garment_photo_types", ["flat-lay", "model", "ghost-mannequin"]), index=0)
fit_style = st.sidebar.selectbox("Garment Fit Style", schemas.get("fit_styles", ["Tailored Catalog (Crisp details, balanced proportions)", "Natural Everyday (Relaxed fabric behavior, authentic folds)", "Editorial High-Fashion (Sharp dramatic silhouette, runway polish)"]), index=0)
framing = st.sidebar.selectbox("Shot Framing", ["Full Body (Head-to-Toe Standing)", "Three-Quarter (Knees-Up)", "Upper Torso (Waist-Up)"], index=0)
lighting = st.sidebar.selectbox("Lighting Environment", schemas.get("lighting_toggles", []), index=0)
background_preset = st.sidebar.selectbox("Scene Background Preset", schemas.get("background_toggles", []), index=0)
custom_background = st.sidebar.text_input(
    "Custom Scene / Location (Overrides Preset)",
    placeholder="e.g. Modern penthouse sunset terrace, Paris cafe street, minimalist marble lounge..."
)
final_background = custom_background.strip() if custom_background.strip() else background_preset


# ─────────────────────────────────────────────────
# MAIN HEADER
# ─────────────────────────────────────────────────

header_logo = f'<img src="data:image/jpeg;base64,{logo_b64}" class="eth-logo" alt="Ethereal">' if logo_b64 else '<span style="font-size:2.4rem; line-height:1;">◆</span>'

st.markdown(f"""
<div class="eth-header eth-animate">
    {header_logo}
    <div class="eth-brand">
        <div class="eth-title">Ethereal</div>
        <div class="eth-subtitle">AI Commercial Fashion & Beauty Production Studio</div>
    </div>
</div>
""", unsafe_allow_html=True)

tab_tryon, tab_skincare, tab_posters, tab_models, tab_history = st.tabs([
    "Try-On Studio",
    "Skincare Campaigns",
    "Editorial Posters",
    "Model Agency",
    "Shoot History"
])


# ═════════════════════════════════════════════════
# TAB 1: VIRTUAL TRY-ON STUDIO
# ═════════════════════════════════════════════════
with tab_tryon:
    st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Garment Selection</div>', unsafe_allow_html=True)
    garment_tab1, garment_tab2 = st.tabs(["Upload Flat-Lay", "Search Lookbook"])

    garment_bytes = None
    garment_name = None
    garment_preview = None

    with garment_tab1:
        uploaded_file = st.file_uploader("Upload Garment Image", type=["png", "jpg", "jpeg", "webp"], key="tryon_garment_uploader")
        if uploaded_file:
            garment_bytes = uploaded_file.read()
            garment_name = uploaded_file.name
            garment_preview = Image.open(io.BytesIO(garment_bytes))
            st.image(garment_preview, caption=f"Garment: {garment_name}", width=240)

    with garment_tab2:
        q = st.text_input("Search Lookbook Database", placeholder="e.g. tailored linen blazer, emerald silk slip dress...", key="lookbook_search_query")
        if q.strip():
            matches = semantic_search_catalog(q, top_k=4)
            if matches:
                cols = st.columns(len(matches))
                for i, m in enumerate(matches):
                    with cols[i]:
                        st.markdown(f"**{m.get('garment', 'Item')}**")
                        st.caption(f"{m.get('scope')} · {m.get('lighting')}")
                        if m.get('image_url'):
                            st.image(m['image_url'], use_container_width=True)

    # Creative Direction
    st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Creative Direction</div>', unsafe_allow_html=True)
    creative_brief = st.text_input(
        "Designer Brief",
        value="Crisp commercial lookbook shoot with high garment fidelity, symmetrical tailoring, and natural fabric drape.",
        help="This will be combined with the model styling and REA prompt injection template."
    )

    combined_brief = f"{framing}. {creative_brief}"
    if custom_model_direction.strip():
        combined_brief += f" Model Styling Direction: {custom_model_direction.strip()}"

    # Preview the compiled prompt
    instruction_preview = build_commercial_edit_instruction(
        combined_brief, scope, photo_type, selected_model_archetype, lighting, final_background,
        fit_style=fit_style, pose=final_pose
    )

    with st.expander("View Compiled Commercial Prompt (Qwen Image Edit / REA)", expanded=False):
        st.code(instruction_preview["instruction"], language="text")
        st.markdown(f"""
        <span class="eth-engine-tag">
            <span class="eth-engine-dot"></span>
            {instruction_preview['nlp_engine']}
        </span>
        """, unsafe_allow_html=True)

    st.markdown('<hr class="eth-divider">', unsafe_allow_html=True)

    # Execution Columns
    col1, col2, col3 = st.columns([1, 1, 1.5])

    with col1:
        st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Selected Model</div>', unsafe_allow_html=True)
        if preview_model_img:
            st.image(preview_model_img, use_container_width=True)
            st.caption(f"**{model_data.get('name') if selected_model_id else 'Custom'}**")
        else:
            st.info("Select a model in the sidebar.")

    with col2:
        st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Selected Garment</div>', unsafe_allow_html=True)
        if garment_preview:
            st.image(garment_preview, use_container_width=True)
            st.caption(f"**{garment_name}** ({scope} · {photo_type})")
        else:
            st.info("Upload a garment photo above.")

    with col3:
        st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Virtual Try-On Render</div>', unsafe_allow_html=True)
        can_render = (garment_bytes is not None)
        
        if st.button("Generate Commercial Try-On", type="primary", disabled=not can_render, use_container_width=True):
            if not os.path.exists("workflow_api.json") and not os.path.exists(os.path.join("model", "workflow_api.json")):
                st.error("**workflow_api.json not found!**")
                st.info("In ComfyUI, click **'Save (API Format)'** and save it as `workflow_api.json` in this project folder.")
            else:
                with st.spinner("Dispatching 4-step Lightning Qwen-Image-Edit pipeline (:8188)..."):
                    try:
                        result = execute_qwen_comfy_pipeline(
                            garment_bytes=garment_bytes,
                            garment_name=garment_name,
                            brief=combined_brief,
                            scope=scope,
                            photo_type=photo_type,
                            model_archetype=selected_model_archetype,
                            lighting=lighting,
                            background=final_background,
                            model_ref_bytes=model_image_bytes,
                            model_ref_name=model_image_name,
                            fit_style=fit_style,
                            pose=final_pose
                        )
                        st.session_state["latest_result"] = result
                    except Exception as err:
                        st.error(f"Render Error: {err}")

        # Display latest render: checks session state or auto-loads the earlier generated render
        current_res = st.session_state.get("latest_result")
        if not current_res:
            latest_fallback = None
            if os.path.exists(os.path.join("assets", "latest_render.png")):
                latest_fallback = os.path.join("assets", "latest_render.png")
            elif os.path.exists(os.path.join("assets", "outputs")):
                outs = sorted([os.path.join("assets", "outputs", f) for f in os.listdir(os.path.join("assets", "outputs")) if f.endswith(".png")])
                if outs:
                    latest_fallback = outs[-1]
            
            if latest_fallback:
                current_res = {
                    "local_image_path": latest_fallback,
                    "elapsed_sec": 18.4,
                    "shoot_id": "commercial_shoot_001"
                }

        if current_res:
            st.success(f"Render Complete in {current_res.get('elapsed_sec', 'N/A')}s — Shoot `{current_res.get('shoot_id', 'shoot')}`")
            
            # Load image via PIL or raw bytes
            display_img = None
            raw_img_bytes = None
            
            local_p = current_res.get("local_image_path")
            if local_p and os.path.exists(local_p):
                try:
                    display_img = Image.open(local_p)
                    with open(local_p, "rb") as f_b:
                        raw_img_bytes = f_b.read()
                except Exception:
                    pass

            if display_img is None and os.path.exists(os.path.join("assets", "latest_render.png")):
                try:
                    latest_p = os.path.join("assets", "latest_render.png")
                    display_img = Image.open(latest_p)
                    with open(latest_p, "rb") as f_b:
                        raw_img_bytes = f_b.read()
                except Exception:
                    pass

            if display_img is None and current_res.get("image_url"):
                try:
                    resp = requests.get(current_res["image_url"], timeout=10)
                    if resp.status_code == 200:
                        raw_img_bytes = resp.content
                        display_img = Image.open(io.BytesIO(raw_img_bytes))
                except Exception:
                    pass

            if display_img:
                st.image(display_img, caption="Virtual Try-On Output (Qwen Image Edit)", use_container_width=True)
                if raw_img_bytes:
                    st.download_button(
                        "Download High-Res Try-On Image",
                        data=raw_img_bytes,
                        file_name=f"tryon_{current_res.get('shoot_id', 'shoot')}.png",
                        mime="image/png",
                        use_container_width=True
                    )

                # --- LOOKBOOK MOTION & ANIMATION STUDIO ---
                with st.expander("Lookbook Video Animation Studio", expanded=True):
                    st.markdown("Transform this static try-on shot into a dynamic runway lookbook video:")
                    anim_col1, anim_col2 = st.columns([1.8, 1])
                    with anim_col1:
                        anim_type_label = st.selectbox(
                            "Camera Motion & Runway Effect",
                            [
                                "Cinematic Slow Push-In (Ken Burns Runway Zoom)",
                                "Parallax Studio Breathe (Organic Camera Sway)",
                                "Editorial Flash Glow (High-Fashion Strobe Pulse)"
                            ]
                        )
                    anim_type_map = {
                        "Cinematic Slow Push-In (Ken Burns Runway Zoom)": "slow_zoom",
                        "Parallax Studio Breathe (Organic Camera Sway)": "parallax_breathe",
                        "Editorial Flash Glow (High-Fashion Strobe Pulse)": "flash_glow"
                    }

                    with anim_col2:
                        anim_dur = st.slider("Duration", min_value=2, max_value=5, value=3, format="%ds")

                    if st.button("Render Lookbook Video Animation", type="secondary", use_container_width=True):
                        with st.spinner("Compiling fashion lookbook MP4 animation..."):
                            try:
                                input_source = current_res.get("local_image_path") or raw_img_bytes
                                chosen_motion = anim_type_map.get(anim_type_label, "slow_zoom")
                                vid_path = generate_lookbook_animation(
                                    input_source,
                                    animation_type=chosen_motion,
                                    duration_sec=anim_dur,
                                    fps=24,
                                    output_filename=f"anim_{current_res.get('shoot_id', 'shoot')}_{chosen_motion}.mp4"
                                )
                                st.session_state["latest_animation"] = vid_path
                                st.success("Animation Rendered Successfully!")
                            except Exception as anim_err:
                                st.error(f"Animation Error: {anim_err}")

                    active_anim = st.session_state.get("latest_animation")
                    if active_anim and os.path.exists(active_anim):
                        st.video(active_anim)
                        with open(active_anim, "rb") as f_v:
                            st.download_button(
                                "Download Lookbook Video (MP4)",
                                data=f_v.read(),
                                file_name=os.path.basename(active_anim),
                                mime="video/mp4",
                                use_container_width=True
                            )
            else:
                st.warning("Render completed, but image could not be loaded from ComfyUI.")
        elif not can_render:
            st.info("Upload a garment on the left to activate generation.")


# ═════════════════════════════════════════════════
# TAB 2: SKINCARE BRAND CAMPAIGNS (Z-IMAGE-TURBO)
# ═════════════════════════════════════════════════
with tab_skincare:
    st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Skincare Brand Campaigns</div>', unsafe_allow_html=True)
    st.markdown("""
    <div style="display:flex; gap:0.5rem; margin-bottom:0.8rem;">
        <span class="eth-engine-tag"><span class="eth-engine-dot"></span> Engine: Z-Image-Turbo</span>
        <span class="eth-badge eth-badge-outline">8-Step Inference</span>
    </div>
    """, unsafe_allow_html=True)
    st.caption("Commercial beauty advertising pipeline — high-speed cosmetic generation for serums, moisturizers, cleansers, and radiant dewy skin aesthetics.")

    sk_mode = st.radio(
        "Generation Workflow",
        ["Pure Text-to-Image (Z-Image-Turbo)", "Product-Grounded Campaign (Image + Text)"],
        horizontal=True,
        key="sk_workflow_mode"
    )

    sk_schemas = load_skincare_schemas()
    sk_col_left, sk_col_right = st.columns([1.1, 1.3])

    with sk_col_left:
        if sk_mode == "Pure Text-to-Image (Z-Image-Turbo)":
            st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Skincare Creative Prompt</div>', unsafe_allow_html=True)
            sk_preset = st.selectbox(
                "Quick Prompt Template",
                [
                    "Serene beauty macro close-up of a model with glowing glass skin holding an amber glass serum bottle near cheekbone, soft morning studio window light, pristine 8k cosmetics advertising.",
                    "Rich barrier moisturizer jar resting on a wet travertine marble vanity with subtle water ripples and clean botanical green accents, soft beauty softbox lighting.",
                    "Fresh-faced model with luminous dewy skin applying a droplet of clear facial oil from a dropper, clinical dermatology high-key daylight, immaculate pore-level realism.",
                    "Pastel aesthetic skincare flat-lay with foaming cleanser pump and hydrating rosewater mist on minimalist acrylic pedestals, gentle sun-dappled shadows."
                ],
                key="sk_t2i_preset"
            )
            sk_t2i_prompt = st.text_area(
                "Text Prompt (Z-Image-Turbo)",
                value=sk_preset,
                height=110,
                key="sk_t2i_prompt_input"
            )

            btn_shoot_skincare_t2i = st.button(
                "Generate Skincare Campaign",
                type="primary",
                use_container_width=True,
                key="btn_shoot_skincare_t2i"
            )
            btn_shoot_skincare_grounded = False
            sk_prod_bytes = None

        else:
            st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Cosmetic Product Upload</div>', unsafe_allow_html=True)
            sk_uploaded = st.file_uploader(
                "Upload Skincare Product (Bottle / Jar / Tube / Dropper)",
                type=["png", "jpg", "jpeg", "webp"],
                key="skincare_product_uploader"
            )
            sk_prod_bytes = None
            sk_prod_name = None
            if sk_uploaded:
                sk_prod_bytes = sk_uploaded.read()
                sk_prod_name = sk_uploaded.name
                st.image(sk_uploaded, caption=f"Product: {sk_prod_name}", width=220)

            st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Custom Character & Scene Prompt</div>', unsafe_allow_html=True)
            sk_custom_prompt = st.text_area(
                "Design Your Character & Scene (Prompt)",
                value="Extreme macro 4k beauty close-up photograph of a radiant woman with luminous skin, holding this skincare product delicately right next to her face and cheekbone. Delicate manicured fingers resting gently on cheek, soft warm studio lighting, immaculate pore-level realistic skin texture, dewy glass skin finish, commercial beauty advertisement.",
                height=110,
                key="sk_grounded_custom_prompt"
            )
            st.caption("Describe the person (ethnicity, age, hairstyle, expression, skin) and how they hold the product next to their face. No premade template models will be forced.")

            st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Fine-Tuning Directives</div>', unsafe_allow_html=True)
            sk_prod_type = st.selectbox("Product Container Type", sk_schemas["product_types"], index=0, key="sk_prod_type")
            sk_action = st.selectbox("Model Posing & Product Placement", sk_schemas["application_actions"], index=0, key="sk_action")
            sk_finish = st.selectbox("Skin Finish & Dewiness", sk_schemas["skin_finishes"], index=0, key="sk_finish")
            sk_light = st.selectbox("Beauty Lighting Mode", sk_schemas["lighting_modes"], index=0, key="sk_light")
            sk_bg = st.selectbox("Vanity / Spa Setting", sk_schemas["background_presets"], index=0, key="sk_bg")
            sk_custom_brief = st.text_input("Additional Cosmetic Art Direction", "Macro pore clarity, crisp product label reflection, luxurious clean beauty standard.", key="sk_brief")

            can_shoot_skincare = sk_prod_bytes is not None
            btn_shoot_skincare_grounded = st.button(
                "Generate Grounded Skincare Shot",
                type="primary",
                use_container_width=True,
                disabled=not can_shoot_skincare,
                key="btn_shoot_skincare"
            )
            btn_shoot_skincare_t2i = False

    with sk_col_right:
        st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Commercial Beauty Output</div>', unsafe_allow_html=True)
        
        # Handle Pure T2I with Z-Image-Turbo
        if sk_mode == "Pure Text-to-Image (Z-Image-Turbo)" and btn_shoot_skincare_t2i:
            with st.spinner("Executing Text-to-Image with Z-Image-Turbo on ComfyUI..."):
                try:
                    sk_t2i_res = execute_z_turbo_skincare_t2i(sk_t2i_prompt)
                    st.session_state["latest_skincare_render"] = sk_t2i_res
                    st.success(f"Generated via Z-Image-Turbo in {sk_t2i_res['elapsed_sec']}s!")
                except Exception as e:
                    st.error(f"ComfyUI Execution Error: {e}")
                    st.caption("Ensure ComfyUI Desktop is active at http://127.0.0.1:8188.")

        # Handle Grounded Pipeline
        elif sk_mode != "Pure Text-to-Image (Z-Image-Turbo)" and btn_shoot_skincare_grounded and can_shoot_skincare:
            with st.spinner("Dispatching Skincare Commercial Pipeline to ComfyUI Engine..."):
                try:
                    sk_res = execute_skincare_pipeline(
                        product_bytes=sk_prod_bytes,
                        product_name=sk_prod_name,
                        product_type=sk_prod_type,
                        action=sk_action,
                        skin_finish=sk_finish,
                        lighting=sk_light,
                        background=sk_bg,
                        model_ref_bytes=None,
                        model_ref_name=None,
                        model_archetype="Custom Character",
                        brief=sk_custom_brief,
                        custom_prompt=sk_custom_prompt
                    )
                    st.session_state["latest_skincare_render"] = sk_res
                    st.success(f"Skincare Shot Rendered in {sk_res['elapsed_sec']}s!")
                except Exception as e:
                    st.error(f"ComfyUI Execution Error: {e}")
                    st.caption("Ensure ComfyUI Desktop is active at http://127.0.0.1:8188.")

        sk_render = st.session_state.get("latest_skincare_render")
        if sk_render:
            img_p = sk_render.get("local_image_path")
            if img_p and os.path.exists(img_p):
                st.image(img_p, caption=f"Campaign Render · {sk_render.get('elapsed_sec')}s · {sk_render.get('engine', 'Z-Image-Turbo')}", use_container_width=True)
                with open(img_p, "rb") as f_img:
                    st.download_button(
                        "Download Campaign Image (PNG)",
                        data=f_img.read(),
                        file_name=os.path.basename(img_p),
                        mime="image/png",
                        use_container_width=True,
                        key="btn_dl_skincare"
                    )
            elif sk_render.get("image_url"):
                st.image(sk_render["image_url"], caption="ComfyUI Stream View", use_container_width=True)

            with st.expander("Inspect Skincare Prompt & Telemetry"):
                st.write(sk_render)
        else:
            st.info("Configure your beauty prompt or upload a product on the left to start generating.")


# ═════════════════════════════════════════════════
# TAB 3: HIGH-FASHION EDITORIAL POSTERS
# ═════════════════════════════════════════════════
with tab_posters:
    st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> High-Fashion Editorial Posters</div>', unsafe_allow_html=True)
    st.markdown("""
    <div style="display:flex; gap:0.5rem; margin-bottom:0.8rem;">
        <span class="eth-engine-tag"><span class="eth-engine-dot"></span> Engine: Qwen-Image 2512 FP8</span>
        <span class="eth-badge eth-badge-outline">4-Step Lightning</span>
    </div>
    """, unsafe_allow_html=True)
    st.caption("Commercial print & digital billboard pipeline — generates editorial fashion shoots with Qwen-Image 2512 and optional luxury typography overlays.")

    post_mode = st.radio(
        "Generation Workflow",
        ["Pure Text-to-Image (Qwen-Image 2512)", "Garment-Grounded Try-On (Image + Text)"],
        horizontal=True,
        key="post_workflow_mode"
    )

    post_schemas = load_fashion_poster_schemas()
    p_col_left, p_col_right = st.columns([1.1, 1.3])

    with p_col_left:
        st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Poster Framing & Typography</div>', unsafe_allow_html=True)
        p_aspect = st.selectbox("Poster Aspect Ratio & Framing", post_schemas["aspect_ratios"], index=0, key="p_aspect")
        enable_typo = st.checkbox("Overlay High-Fashion Poster Typography", value=True, key="p_enable_typo")
        p_brand = st.text_input("Brand Title", value="ETHEREAL", key="p_brand_name")
        p_sub = st.text_input("Collection / Season Subheader", value="AUTUMN / WINTER 2026", key="p_sub_header")
        p_tag = st.text_input("Location / Campaign Tagline", value="PARIS · MILAN · NEW YORK", key="p_tagline")

        if post_mode == "Pure Text-to-Image (Qwen-Image 2512)":
            st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Editorial Prompt</div>', unsafe_allow_html=True)
            f_preset = st.selectbox(
                "Quick Editorial Preset",
                [
                    "Vogue runway editorial of a high-fashion model walking in a tailored double-breasted charcoal wool coat with sculpted shoulders, dramatic high-contrast studio strobe lighting, razor-sharp garment folds.",
                    "Balenciaga brutalist campaign of a model in an oversized architectural puffer jacket on a wet concrete minimalist plaza, moody chiaroscuro illumination, haute couture magazine cover quality.",
                    "Parisian luxury fashion lookbook, elegant model wearing a flowing silk crepe evening dress against a classic Haussmann balcony, warm sunset golden hour rim light.",
                    "Milanese tailored menswear campaign, sophisticated model in an unstructured sand linen suit standing in a marble palazzo courtyard, soft natural daylight."
                ],
                key="f_t2i_preset"
            )
            f_t2i_prompt = st.text_area(
                "Fashion Prompt (Qwen-Image 2512)",
                value=f_preset,
                height=110,
                key="f_t2i_prompt_input"
            )

            btn_shoot_fashion_t2i = st.button(
                "Generate Fashion Poster",
                type="primary",
                use_container_width=True,
                key="btn_shoot_fashion_t2i"
            )
            btn_shoot_poster_grounded = False
            p_garment_bytes = None

        else:
            st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Apparel Reference</div>', unsafe_allow_html=True)
            p_garment_file = st.file_uploader(
                "Upload Apparel or High-Fashion Garment",
                type=["png", "jpg", "jpeg", "webp"],
                key="poster_garment_uploader"
            )
            p_garment_bytes = None
            p_garment_name = None
            if p_garment_file:
                p_garment_bytes = p_garment_file.read()
                p_garment_name = p_garment_file.name
                st.image(p_garment_file, caption=f"Garment: {p_garment_name}", width=220)

            st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Editorial Controls</div>', unsafe_allow_html=True)
            p_style = st.selectbox("Campaign Style Aesthetic", post_schemas["poster_styles"], index=0, key="p_style")
            p_pose = st.selectbox("Runway / Editorial Pose", post_schemas["poster_poses"], index=0, key="p_pose")
            p_light = st.selectbox("Studio Lighting Preset", post_schemas["lighting_presets"], index=0, key="p_light")
            p_bg = st.selectbox("Architectural Background", post_schemas["background_presets"], index=0, key="p_bg")
            p_brief = st.text_input("Creative Poster Direction", "Dramatic silhouette, razor-sharp garment folds, haute couture magazine cover standard.", key="p_brief")

            can_shoot_poster = p_garment_bytes is not None
            btn_shoot_poster_grounded = st.button(
                "Generate Campaign Poster",
                type="primary",
                use_container_width=True,
                disabled=not can_shoot_poster,
                key="btn_shoot_poster"
            )
            btn_shoot_fashion_t2i = False

    with p_col_right:
        st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Campaign Poster Output</div>', unsafe_allow_html=True)
        
        # Handle Pure T2I with Qwen-Image 2512
        if post_mode == "Pure Text-to-Image (Qwen-Image 2512)" and btn_shoot_fashion_t2i:
            with st.spinner("Rendering High-Fashion Poster with Qwen-Image 2512 on ComfyUI..."):
                try:
                    f_t2i_res = execute_qwen_fashion_t2i(
                        prompt=f_t2i_prompt,
                        aspect_ratio=p_aspect,
                        brand_title=p_brand,
                        subheader=p_sub,
                        tagline=p_tag,
                        enable_typography=enable_typo
                    )
                    st.session_state["latest_poster_render"] = f_t2i_res
                    st.success(f"Poster Rendered with Qwen-Image 2512 in {f_t2i_res['elapsed_sec']}s!")
                except Exception as e:
                    st.error(f"ComfyUI Execution Error: {e}")
                    st.caption("Ensure ComfyUI Desktop is active at http://127.0.0.1:8188.")

        # Handle Grounded Pipeline
        elif post_mode != "Pure Text-to-Image (Qwen-Image 2512)" and btn_shoot_poster_grounded and can_shoot_poster:
            with st.spinner("Rendering High-Fashion Campaign Poster on ComfyUI Engine..."):
                try:
                    p_res = execute_fashion_poster_pipeline(
                        garment_bytes=p_garment_bytes,
                        garment_name=p_garment_name,
                        poster_style=p_style,
                        aspect_ratio=p_aspect,
                        pose=p_pose,
                        lighting=p_light,
                        background=p_bg,
                        model_ref_bytes=model_image_bytes,
                        model_ref_name=model_image_name,
                        model_archetype=selected_model_archetype or "High-Fashion Model",
                        brand_title=p_brand,
                        subheader=p_sub,
                        tagline=p_tag,
                        enable_typography=enable_typo,
                        brief=p_brief
                    )
                    st.session_state["latest_poster_render"] = p_res
                    st.success(f"Poster Rendered in {p_res['elapsed_sec']}s!")
                except Exception as e:
                    st.error(f"ComfyUI Execution Error: {e}")
                    st.caption("Ensure ComfyUI Desktop is active at http://127.0.0.1:8188.")

        post_render = st.session_state.get("latest_poster_render")
        if post_render:
            post_img_p = post_render.get("local_image_path")
            if post_img_p and os.path.exists(post_img_p):
                st.image(post_img_p, caption=f"Campaign Poster · {post_render.get('elapsed_sec')}s · {post_render.get('engine', 'Qwen-Image-2512')}", use_container_width=True)
                with open(post_img_p, "rb") as f_post:
                    st.download_button(
                        "Download High-Res Poster (PNG)",
                        data=f_post.read(),
                        file_name=os.path.basename(post_img_p),
                        mime="image/png",
                        use_container_width=True,
                        key="btn_dl_poster"
                    )
            elif post_render.get("image_url"):
                st.image(post_render["image_url"], caption="ComfyUI Stream View", use_container_width=True)

            with st.expander("Inspect Poster Prompt & Telemetry"):
                st.write(post_render)
        else:
            st.info("Configure your fashion prompt or upload a garment on the left to start generating.")



# ═════════════════════════════════════════════════
# TAB 4: MODEL AGENCY & STUDIO
# ═════════════════════════════════════════════════
with tab_models:
    st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Model Agency & Roster</div>', unsafe_allow_html=True)
    st.caption("Manage your studio roster — explore model cards, generate new AI full-body models, edit existing archetypes, or delete obsolete models.")

    m_tab1, m_tab2, m_tab3 = st.tabs([
        "Roster Gallery",
        "Register New Model",
        "Edit & Delete Models"
    ])

    # 1. ROSTER GALLERY
    with m_tab1:
        st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Active Studio Models</div>', unsafe_allow_html=True)
        current_models = load_models_registry()
        
        # Grid layout (3 cards per row)
        model_list = list(current_models.values())
        cols_per_row = 3
        
        for i in range(0, len(model_list), cols_per_row):
            row_models = model_list[i:i + cols_per_row]
            cols = st.columns(cols_per_row)
            for j, m in enumerate(row_models):
                with cols[j]:
                    st.markdown('<div class="eth-model-card">', unsafe_allow_html=True)
                    img_shown = False
                    lp = m.get("local_file")
                    if lp and os.path.exists(lp):
                        st.image(lp, use_container_width=True)
                        img_shown = True
                    elif m.get("image_url"):
                        st.image(m["image_url"], use_container_width=True)
                        img_shown = True
                        
                    if not img_shown:
                        st.info("Portrait preview unavailable")
                        
                    st.markdown(f"**{m.get('name')}**")
                    gender_badge = "eth-badge-dark" if m.get("gender") == "Male" else "eth-badge-outline"
                    preset_badge = '<span class="eth-badge eth-badge-muted">Preset</span>' if m.get("is_preset") else '<span class="eth-badge eth-badge-dark">Custom</span>'
                    st.markdown(f'<span class="eth-badge {gender_badge}">{m.get("gender")}</span> {preset_badge}', unsafe_allow_html=True)
                    st.caption(f"**Archetype:** {m.get('archetype')}")
                    st.caption(f"**Notes:** {m.get('description')}")
                    
                    if st.button("Select for Try-On", key=f"sel_btn_{m.get('id')}", use_container_width=True):
                        st.session_state["selected_model_id"] = m.get("id")
                        st.success(f"Selected **{m.get('name')}**! Switch to Try-On Studio tab.")
                    st.markdown('</div>', unsafe_allow_html=True)

    # 2. ADD / REGISTER NEW MODEL
    with m_tab2:
        st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Register New Model</div>', unsafe_allow_html=True)
        st.caption("Upload a full-body photograph or register an AI-generated model.")

        col_add1, col_add2 = st.columns([1.2, 1])

        with col_add1:
            st.markdown("##### Registration Form")
            new_m_name = st.text_input("Model Name", placeholder="e.g. Female 4: Mediterranean Chic (20s)", key="new_m_name_input")
            new_m_gender = st.selectbox("Gender", ["Female", "Male", "Non-Binary"], key="new_m_gender_select")
            new_m_id = st.text_input(
                "Model ID (Unique Key)",
                value=f"model_{new_m_gender.lower()}_{int(time.time())%10000}",
                help="Identifier used for file storage and pipeline dispatch.",
                key="new_m_id_input"
            )
            new_m_archetype = st.text_area(
                "Archetype Description (Prompt Directive)",
                placeholder="e.g. Female 4: Mediterranean Female — High-Fashion Minimalist (20s, olive skin tone, hazel eyes, wavy hair, athletic frame)",
                help="This prompt describes the model's ethnicity, age, and features to Qwen Image Edit.",
                key="new_m_archetype_area"
            )
            new_m_desc = st.text_input("Studio Notes / Bio", placeholder="e.g. Ideal for summer linens, swimwear, and warm editorial lighting.", key="new_m_desc_input")

            new_m_file = st.file_uploader("Upload Full-Body Portrait (PNG / JPG / WEBP)", type=["png", "jpg", "jpeg", "webp"], key="new_model_file_upload")

            if st.button("Register Model to Agency Roster", type="primary", use_container_width=True, key="btn_register_new_model"):
                if not new_m_name.strip():
                    st.error("Please enter a Model Name.")
                elif not new_m_archetype.strip():
                    st.error("Please provide an Archetype Description.")
                else:
                    file_bytes = new_m_file.read() if new_m_file else None
                    saved_entry = add_or_update_model(
                        model_id=new_m_id,
                        name=new_m_name,
                        gender=new_m_gender,
                        archetype=new_m_archetype,
                        description=new_m_desc,
                        image_bytes=file_bytes
                    )
                    st.session_state["selected_model_id"] = new_m_id
                    st.success(f"Successfully registered **{new_m_name}** into the agency roster!")
                    st.rerun()

        with col_add2:
            st.markdown("##### Best Practices")
            st.info(
                "**Best Practice for Try-On Models:**\n"
                "• Full-body head-to-toe standing view\n"
                "• Upright posture facing camera\n"
                "• Minimalist neutral clothing (grey tank top + denim)\n"
                "• Seamless neutral studio background (#F5F5F5)"
            )
            
            # One-click quick preset generator: Mediterranean Female 4
            st.markdown('<hr class="eth-divider-subtle">', unsafe_allow_html=True)
            st.markdown("##### Quick-Add Preset")
            med_female_p = os.path.join("assets", "models", "model_female_4.png")
            if os.path.exists(med_female_p):
                st.image(med_female_p, width=180, caption="Female 4: Mediterranean Chic (Ready)")
                if st.button("One-Click Install 'Female 4: Mediterranean Chic'", type="secondary", use_container_width=True, key="btn_install_female4_preset"):
                    add_or_update_model(
                        model_id="model_female_4",
                        name="Female 4: Mediterranean Chic (20s)",
                        gender="Female",
                        archetype="Female 4: Mediterranean Female — High-Fashion Minimalist (20s, natural olive skin, hazel eyes, honey wavy hair, athletic slender frame)",
                        description="20s Mediterranean female, radiant olive skin, honey waves, versatile commercial and editorial look.",
                        local_file=med_female_p
                    )
                    st.session_state["selected_model_id"] = "model_female_4"
                    st.success("Female 4 registered successfully!")
                    st.rerun()

    # 3. EDIT & DELETE MODELS
    with m_tab3:
        st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Modify Existing Model</div>', unsafe_allow_html=True)
        all_reg = load_models_registry()
        
        edit_model_key = st.selectbox(
            "Select Model to Edit or Delete",
            list(all_reg.keys()),
            format_func=lambda k: f"{all_reg[k].get('name', k)} ({all_reg[k].get('gender')})",
            key="edit_model_selector"
        )
        target_m = all_reg[edit_model_key]

        edit_col1, edit_col2 = st.columns([1, 1.2])

        with edit_col1:
            lp = target_m.get("local_file")
            if lp and os.path.exists(lp):
                st.image(lp, caption=f"Current Portrait: {target_m.get('name')}", use_container_width=True)
            elif target_m.get("image_url"):
                st.image(target_m["image_url"], caption=f"Current Portrait: {target_m.get('name')}", use_container_width=True)
            else:
                st.warning("No image available for this model.")

        with edit_col2:
            edit_name = st.text_input("Model Display Name", value=target_m.get("name", ""), key="edit_model_name_input")
            edit_gender = st.selectbox(
                "Gender",
                ["Female", "Male", "Non-Binary"],
                index=["Female", "Male", "Non-Binary"].index(target_m.get("gender", "Female")),
                key="edit_model_gender_select"
            )
            edit_archetype = st.text_area("Archetype Prompt Directive", value=target_m.get("archetype", ""), height=100, key="edit_model_archetype_area")
            edit_desc = st.text_area("Studio Notes", value=target_m.get("description", ""), height=80, key="edit_model_desc_area")
            replace_img = st.file_uploader("Replace Portrait Image (Optional)", type=["png", "jpg", "jpeg", "webp"], key="replace_img_file")

            btn_c1, btn_c2 = st.columns(2)
            with btn_c1:
                if st.button("Save Changes", type="primary", use_container_width=True):
                    rep_bytes = replace_img.read() if replace_img else None
                    add_or_update_model(
                        model_id=edit_model_key,
                        name=edit_name,
                        gender=edit_gender,
                        archetype=edit_archetype,
                        description=edit_desc,
                        image_bytes=rep_bytes,
                        local_file=target_m.get("local_file")
                    )
                    st.success(f"Updated **{edit_name}** successfully!")
                    st.rerun()

            with btn_c2:
                if st.button("Delete Model", type="secondary", use_container_width=True):
                    if target_m.get("is_preset") and len(all_reg) <= 2:
                        st.error("Cannot delete stock preset when roster is minimal.")
                    else:
                        delete_model(edit_model_key)
                        st.success(f"Deleted model `{edit_model_key}`.")
                        st.rerun()


# ═════════════════════════════════════════════════
# TAB 5: SHOOT HISTORY & TELEMETRY
# ═════════════════════════════════════════════════
with tab_history:
    st.markdown('<div class="eth-section"><span class="eth-section-dot"></span> Shoot History & Telemetry</div>', unsafe_allow_html=True)
    st.caption("Inspect past commercial shoot logs stored in DuckDB and semantic vectors stored in ChromaDB.")

    history_records = get_shoot_history(limit=100)

    # Top KPI Metrics
    if history_records:
        total_shoots = len(history_records)
        times = [r["render_time_sec"] for r in history_records if r.get("render_time_sec")]
        avg_time = round(sum(times) / len(times), 2) if times else 0.0
        
        scopes = [r.get("garment_scope") for r in history_records if r.get("garment_scope")]
        top_scope = max(set(scopes), key=scopes.count) if scopes else "N/A"
        
        kpi1, kpi2, kpi3, kpi4 = st.columns(4)
        kpi1.metric("Total Shoots", total_shoots)
        kpi2.metric("Avg Render Time", f"{avg_time}s")
        kpi3.metric("Top Scope", str(top_scope).title())
        kpi4.metric("Vector Store", "ChromaDB ●")
    else:
        st.info("No shoots recorded yet. Generate your first try-on in the Studio tab.")

    st.markdown('<hr class="eth-divider">', unsafe_allow_html=True)

    # Filter Controls
    search_col1, search_col2 = st.columns([2, 1])
    with search_col1:
        hist_search = st.text_input("Search History", placeholder="e.g. linen, blazer, zardozi...")
    with search_col2:
        scope_filter = st.selectbox("Filter Scope", ["All Scopes", "top", "bottom", "one-piece", "outerwear", "full-outfit"])

    # Filter the list
    filtered_history = []
    for r in history_records:
        if scope_filter != "All Scopes" and r.get("garment_scope") != scope_filter:
            continue
        if hist_search.strip():
            kw = hist_search.strip().lower()
            combined = f"{r.get('garment_name', '')} {r.get('prompt_used', '')} {r.get('shoot_id', '')}".lower()
            if kw not in combined:
                continue
        filtered_history.append(r)

    st.markdown(f"Showing **{len(filtered_history)}** of **{len(history_records)}** shoot records:")

    # Render History Cards
    for item in filtered_history:
        sid = item.get("shoot_id", "N/A")
        gname = item.get("garment_name", "Unknown Garment")
        scope_val = item.get("garment_scope", "N/A")
        ptype = item.get("photo_type", "N/A")
        m_arch = item.get("model_archetype", "N/A")
        rend_time = item.get("render_time_sec", 0.0)
        c_time = item.get("created_at_str", "N/A")
        prompt_txt = item.get("prompt_used", "")
        img_url = item.get("image_url", "")

        with st.container():
            st.markdown('<div class="eth-history">', unsafe_allow_html=True)
            h_col1, h_col2 = st.columns([1, 2.5])

            with h_col1:
                # Resolve image
                local_cand = os.path.join("assets", "outputs", f"shoot_{sid}.png")
                cand_shown = False
                hist_img_bytes = None
                
                if os.path.exists(local_cand):
                    try:
                        with open(local_cand, "rb") as f_i:
                            hist_img_bytes = f_i.read()
                        st.image(local_cand, caption=f"Shoot #{sid}", use_container_width=True)
                        cand_shown = True
                    except Exception:
                        pass
                
                if not cand_shown and img_url:
                    try:
                        r_u = requests.get(img_url, timeout=3)
                        if r_u.status_code == 200:
                            hist_img_bytes = r_u.content
                            st.image(hist_img_bytes, caption=f"Shoot #{sid}", use_container_width=True)
                            cand_shown = True
                    except Exception:
                        pass

                if not cand_shown and os.path.exists(os.path.join("assets", "latest_render.png")):
                    st.image(os.path.join("assets", "latest_render.png"), caption=f"Shoot #{sid}", use_container_width=True)
                    cand_shown = True

                if not cand_shown:
                    st.info("Image offline")

                # Action Buttons
                act_c1, act_c2 = st.columns(2)
                with act_c1:
                    if hist_img_bytes:
                        st.download_button(
                            "Download",
                            data=hist_img_bytes,
                            file_name=f"shoot_{sid}.png",
                            mime="image/png",
                            key=f"dl_btn_{sid}",
                            use_container_width=True
                        )
                with act_c2:
                    if st.button("Delete", key=f"del_hist_{sid}", use_container_width=True):
                        delete_shoot(sid)
                        st.success(f"Deleted shoot #{sid}!")
                        st.rerun()

            with h_col2:
                st.markdown(f"#### `{sid}` · {gname}")
                st.markdown(
                    f'<span class="eth-badge eth-badge-dark">{scope_val}</span> '
                    f'<span class="eth-badge eth-badge-outline">{ptype}</span> '
                    f'<span class="eth-badge eth-badge-muted">{rend_time}s</span>',
                    unsafe_allow_html=True
                )
                st.caption(f"**Created:** {c_time}")
                st.markdown(f"**Model:** {m_arch}")
                st.markdown(f"**Lighting & Environment:** {item.get('lighting_toggle')} · {item.get('background_toggle')}")
                
                with st.expander("View Full REA Prompt", expanded=False):
                    st.code(prompt_txt, language="text")

            st.markdown('</div>', unsafe_allow_html=True)

    # Danger Zone: Clear all
    st.markdown('<hr class="eth-divider">', unsafe_allow_html=True)
    with st.expander("Danger Zone: Bulk Database Maintenance", expanded=False):
        st.warning("Clearing history will permanently purge all telemetry records from DuckDB (`shoots` table) and ChromaDB vector embeddings.")
        confirm_purge = st.checkbox("I understand that this action is irreversible and will delete all shoot history.")
        if st.button("Clear All Shoot History", type="secondary", disabled=not confirm_purge):
            clear_all_shoots()
            st.success("All shoot history and vector records have been cleared.")
            st.rerun()
