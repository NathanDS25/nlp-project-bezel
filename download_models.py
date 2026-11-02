import os
import requests

ASSETS_DIR = r"c:\Users\Hp\Desktop\nlp project bezel\assets\models"
os.makedirs(ASSETS_DIR, exist_ok=True)

MODELS = {
    "model_female_1.png": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    "model_female_2.png": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
    "model_female_3.png": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80",
    "model_male_1.png": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
    "model_male_2.png": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    "model_male_3.png": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
}

print("Downloading 6 curated model images...")
headers = {"User-Agent": "Mozilla/5.0"}

for filename, url in MODELS.items():
    dest_path = os.path.join(ASSETS_DIR, filename)
    try:
        resp = requests.get(url, headers=headers, timeout=15)
        if resp.status_code == 200:
            with open(dest_path, "wb") as f:
                f.write(resp.content)
            print(f" -> Saved {filename} ({len(resp.content)} bytes)")
        else:
            print(f" -> Error {resp.status_code} downloading {filename}")
    except Exception as e:
        print(f" -> Failed {filename}: {e}")

print("All 6 models are set up in assets/models/!")
