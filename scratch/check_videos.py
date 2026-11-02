import imageio.v2 as imageio
import os

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
    if os.path.exists(v):
        try:
            reader = imageio.get_reader(v)
            meta = reader.get_meta_data()
            print(f"{os.path.basename(v)}: size={meta.get('size')}, fps={meta.get('fps')}, duration={meta.get('duration')}")
            reader.close()
        except Exception as e:
            print(f"{os.path.basename(v)}: error {e}")
