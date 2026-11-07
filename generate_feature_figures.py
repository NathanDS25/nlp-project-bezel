from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('paper_assets/features', exist_ok=True)

modules = [
    {
        'id': 'M1',
        'title': 'Module I: Virtual Try-On & Biometric Draping',
        'sub': 'Flat-Lay Ingestion to Haute Couture On-Model Fit',
        'img1_path': 'assets/garments/camel_cashmere_coat.png',
        'img1_label': '(a) In-Shop Flat-Lay Input',
        'img2_path': 'assets/outputs/shoot_camel_cashmere_coat.png',
        'img2_label': '(b) Biometric Neural Try-On Result',
        'out_name': 'paper_assets/features/feat1_tryon_biometric.png'
    },
    {
        'id': 'M2',
        'title': 'Module II: Bespoke Tailoring & Digital CAD Packshot',
        'sub': 'Parametric Silhouette & Textile Weave Modeling',
        'img1_path': 'assets/outputs/tailor_outerwear_camel_cashmere_1792601523.png',
        'img1_label': '(a) Parametric CAD Spec & Packshot',
        'img2_path': 'assets/outputs/shoot_ebe42291_Qwen_Fashion_2512_00002_.png',
        'img2_label': '(b) Synthesized Velvet Couture Gown',
        'out_name': 'paper_assets/features/feat2_bespoke_tailoring.png'
    },
    {
        'id': 'M3',
        'title': 'Module III: Wardrobe Layering & Ensemble Coordination',
        'sub': 'Multi-Piece Garment Stack & Textile Coherence',
        'img1_path': 'assets/outputs/shoot_06fe5f97_Qwen_Edit_2511_00002.png',
        'img1_label': '(a) Paris Runway Layered Suiting',
        'img2_path': 'assets/outputs/hero_obsidian_cyberpunk_runway.jpg',
        'img2_label': '(b) Techwear Multi-Layer Ensemble',
        'out_name': 'paper_assets/features/feat3_wardrobe_layering.png'
    },
    {
        'id': 'M4',
        'title': 'Module IV: Editorial Campaign Poster & Typography',
        'sub': 'Commercial Masthead, Subtitle & Kerning Layout',
        'img1_path': 'assets/outputs/fashion_poster_b733fde4.png',
        'img1_label': '(a) Luxury Magazine Cover (Vogue Format)',
        'img2_path': 'assets/outputs/fashion_poster_c1a7c1bb.png',
        'img2_label': '(b) Autumn/Winter Capsule Campaign',
        'out_name': 'paper_assets/features/feat4_editorial_poster.png'
    },
    {
        'id': 'M5',
        'title': 'Module V: Skincare & Beauty Macro Studio',
        'sub': 'Cosmetic Bottle Placement & Sub-Surface Scattering',
        'img1_path': 'assets/outputs/skincare_bdbcc283.png',
        'img1_label': '(a) Dropper Bottle Macro & Glass Skin',
        'img2_path': 'assets/outputs/skincare_cbe15778.png',
        'img2_label': '(b) Pore-Level Skin Texture & Catchlight',
        'out_name': 'paper_assets/features/feat5_skincare_beauty.png'
    },
    {
        'id': 'M6',
        'title': 'Module VI: Virtual Model Agency Roster & Casting',
        'sub': 'Biometric Identity Lock & Diverse Ethnic Archetypes',
        'img1_path': 'assets/models/model_female_1.png',
        'img1_label': '(a) Agency Comp Card (Archetype Alpha)',
        'img2_path': 'assets/outputs/shoot_male3_dress_tryon.png',
        'img2_label': '(b) Cast Editorial Runway Look',
        'out_name': 'paper_assets/features/feat6_model_roster.png'
    },
    {
        'id': 'M7',
        'title': 'Module VII: LTX-2.5 6-DoF Commercial Video Kinematics',
        'sub': '24 FPS DiT Temporal Translation & Dolly-In Sweep',
        'img1_path': 'assets/outputs/hero_frame_9a202f93.jpg',
        'img1_label': '(a) Frame 0: Cinematic Dolly-In Start',
        'img2_path': 'assets/outputs/hero_frame_1818254a.jpg',
        'img2_label': '(b) Frame 72: Close-Up Fabric Detail',
        'out_name': 'paper_assets/features/feat7_commercial_video.png'
    },
    {
        'id': 'M8',
        'title': 'Module VIII: Pure Text-to-Runway Haute Couture Synthesis',
        'sub': 'Zero-Asset Fluid Dynamics & Molten Metal Specularity',
        'img1_path': 'assets/outputs/qwen_fashion_0e1d86d4.png',
        'img1_label': '(a) Molten Liquid Silver Evening Gown',
        'img2_path': 'assets/outputs/shoot_a53d209a_Qwen_Edit_2511_00012.png',
        'img2_label': '(b) Gossamer Tulle & Crimson Gold Couture',
        'out_name': 'paper_assets/features/feat8_pure_text_couture.png'
    }
]

target_h = 600

for m in modules:
    im1 = Image.open(m['img1_path']).convert('RGB')
    im2 = Image.open(m['img2_path']).convert('RGB')
    
    w1 = int(im1.width * (target_h / im1.height))
    w2 = int(im2.width * (target_h / im2.height))
    
    im1_r = im1.resize((w1, target_h), Image.Resampling.LANCZOS)
    im2_r = im2.resize((w2, target_h), Image.Resampling.LANCZOS)
    
    total_w = w1 + w2 + 30
    total_h = target_h + 85
    
    canvas = Image.new('RGB', (total_w, total_h), (255, 255, 255))
    canvas.paste(im1_r, (10, 45))
    canvas.paste(im2_r, (w1 + 20, 45))
    
    draw = ImageDraw.Draw(canvas)
    header_text = m['title'] + ": " + m['sub']
    draw.text((total_w // 2, 20), header_text, fill=(20, 40, 70), anchor='mm')
    draw.text((10 + w1 // 2, target_h + 65), m['img1_label'], fill=(40, 40, 40), anchor='mm')
    draw.text((w1 + 20 + w2 // 2, target_h + 65), m['img2_label'], fill=(40, 40, 40), anchor='mm')
    
    canvas.save(m['out_name'], dpi=(300, 300))
    print('Generated:', m['out_name'])

print('All 8 feature proof figures generated successfully!')

