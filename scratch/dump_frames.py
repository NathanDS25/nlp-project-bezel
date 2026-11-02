import imageio.v2 as imageio
import numpy as np
from PIL import Image

videos = [
    'assets/animations/luxury_ugc_fashion_motion.mp4',
    'assets/animations/molten_liquid_silver_motion.mp4',
    'assets/animations/crimson_gold_motion.mp4',
    'assets/animations/skyline_dolly_motion.mp4',
    'assets/animations/maison_brune_luxury_motion.mp4',
    'assets/animations/higgsfield_dolly_in_cinema.mp4',
    'assets/animations/higgsfield_runway_truck.mp4',
    'assets/animations/higgsfield_genjutsu_orbit.mp4',
    'assets/animations/higgsfield_liquid_chrome.mp4',
    'assets/animations/higgsfield_ugc_fashion.mp4'
]

for v in videos:
    try:
        reader = imageio.get_reader(v)
        frame0 = reader.get_data(0)
        frame_mid = reader.get_data(min(30, reader.count_frames() - 1))
        reader.close()
        # Save a sample frame from each to check
        img = Image.fromarray(frame_mid)
        out_name = f"scratch_frame_{v.split('/')[-1]}.jpg"
        img.save(out_name)
        print(f"Saved {out_name}: shape={frame0.shape}")
    except Exception as e:
        print(f"{v}: {e}")
