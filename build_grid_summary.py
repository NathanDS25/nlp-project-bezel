from PIL import Image, ImageDraw, ImageFont
import os

modules = [
    {
        'title': 'Feature 1: Virtual Try-On',
        'sub': 'Flat-Lay Ingestion to Model Fit',
        'img': 'paper_assets/features/feat1_tryon_biometric.png'
    },
    {
        'title': 'Feature 2: Bespoke Tailoring',
        'sub': 'Parametric CAD & Velvet Gown',
        'img': 'paper_assets/features/feat2_bespoke_tailoring.png'
    },
    {
        'title': 'Feature 3: Wardrobe Layering',
        'sub': 'Multi-Piece Ensemble Stack',
        'img': 'paper_assets/features/feat3_wardrobe_layering.png'
    },
    {
        'title': 'Feature 4: Editorial Poster',
        'sub': 'Typography & Vogue Masthead',
        'img': 'paper_assets/features/feat4_editorial_poster.png'
    },
    {
        'title': 'Feature 5: Skincare Macro Studio',
        'sub': 'Glass Skin & Bottle Placement',
        'img': 'paper_assets/features/feat5_skincare_beauty.png'
    },
    {
        'title': 'Feature 6: Virtual Model Casting',
        'sub': 'Agency Comp Card to Runway Look',
        'img': 'paper_assets/features/feat6_model_roster.png'
    },
    {
        'title': 'Feature 7: LTX-2.5 Video Kinematics',
        'sub': '6-DoF Dolly-In Translation',
        'img': 'paper_assets/features/feat7_commercial_video.png'
    },
    {
        'title': 'Feature 8: Pure Text Haute Couture',
        'sub': 'Liquid Silver & Gossamer Tulle',
        'img': 'paper_assets/features/feat8_pure_text_couture.png'
    }
]

# Grid: 4 rows x 2 cols
# Let's resize each module image to 750px width
col_w = 750
row_h = 360 # proportional height

resized_imgs = []
for m in modules:
    im = Image.open(m['img']).convert('RGB')
    target_w = col_w
    target_h = int(im.height * (target_w / im.width))
    im_r = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
    resized_imgs.append(im_r)

max_h_r0 = max(resized_imgs[0].height, resized_imgs[1].height)
max_h_r1 = max(resized_imgs[2].height, resized_imgs[3].height)
max_h_r2 = max(resized_imgs[4].height, resized_imgs[5].height)
max_h_r3 = max(resized_imgs[6].height, resized_imgs[7].height)

grid_w = col_w * 2 + 50
grid_h = max_h_r0 + max_h_r1 + max_h_r2 + max_h_r3 + 120

grid_canvas = Image.new('RGB', (grid_w, grid_h), (255, 255, 255))

y_offsets = [
    30,
    30 + max_h_r0 + 20,
    30 + max_h_r0 + 20 + max_h_r1 + 20,
    30 + max_h_r0 + 20 + max_h_r1 + 20 + max_h_r2 + 20
]

for idx, im in enumerate(resized_imgs):
    row = idx // 2
    col = idx % 2
    x = 20 if col == 0 else 20 + col_w + 10
    y = y_offsets[row]
    grid_canvas.paste(im, (x, y))

out_grid_path = 'paper_assets/fig_all_features_grid.png'
grid_canvas.save(out_grid_path, dpi=(300, 300))
print('Saved comprehensive 8-feature grid to:', out_grid_path)

