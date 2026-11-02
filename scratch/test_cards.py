import requests
import re
import os
import imageio.v2 as imageio
from PIL import Image

cards = [
    ("card_1", "https://static-public-media.higgsfield.ai/cards/4c2bb5a7-ba39-464d-be1d-01de1c52dcaf.mp4"),
    ("card_2", "https://static-public-media.higgsfield.ai/cards/8dddb16b-6fe1-4cac-a11a-a650691a292d.mp4"),
    ("card_3", "https://static-public-media.higgsfield.ai/cards/b4120ecd-41f7-4dea-afeb-0bc11274a72b.mp4"),
    ("card_4", "https://static-public-media.higgsfield.ai/cards/d6b970cb-8a24-41e6-8c83-023fd2ab585b.mp4"),
    ("seedance", "https://static.higgsfield.ai/promotions/seedance_2_5_explore_image.mp4"),
    ("clean_clip_1", "https://d8j0ntlcm91z4.cloudfront.net/user_3CIezRC2bfkh5fn1Cl8MjaHdSlp/hf_20260415_012608_2c21b2ad-368a-4199-bde3-e2c648d78186.mp4"),
    ("clean_clip_2", "https://d8j0ntlcm91z4.cloudfront.net/user_3BuPFKmNsBjkEgZ5LeOvNlL8ShO/hf_20260415_014636_4873f538-b114-48c3-b604-05e32945d184.mp4"),
    ("clean_clip_3", "https://d8j0ntlcm91z4.cloudfront.net/user_3Cfdr00kbZ1hJCLpPQkaicInqxv/hf_20260421_221116_5e4782a0-5148-4832-9362-d17ba238b58b.mp4"),
    ("clean_clip_4", "https://d8j0ntlcm91z4.cloudfront.net/user_3DgH8zZ7H7xieJnKMyo5N4NA9ge/hf_20260828_132351_79618fbd-cc98-4ee0-ae44-cb79da5349f3.mp4"),
    ("clean_clip_5", "https://d8j0ntlcm91z4.cloudfront.net/user_3DgH8zZ7H7xieJnKMyo5N4NA9ge/hf_20260828_133607_f265c973-82fe-4f27-83a9-42d913a2289c.mp4"),
]

headers = {"User-Agent": "Mozilla/5.0"}

for name, url in cards:
    dest = f"scratch_cand_{name}.mp4"
    if not os.path.exists(dest):
        try:
            r = requests.get(url, headers=headers, timeout=15)
            if r.status_code == 200:
                with open(dest, "wb") as f:
                    f.write(r.content)
                print(f"Downloaded {name}: {len(r.content)} bytes")
            else:
                print(f"Failed {name}: {r.status_code}")
                continue
        except Exception as e:
            print(f"Error {name}: {e}")
            continue

    try:
        reader = imageio.get_reader(dest)
        f_mid = reader.get_data(min(24, reader.count_frames() - 1))
        reader.close()
        out_jpg = f"scratch_cand_{name}.jpg"
        Image.fromarray(f_mid).save(out_jpg)
        print(f"Saved {out_jpg}")
    except Exception as e:
        print(f"Error reading {name}: {e}")
