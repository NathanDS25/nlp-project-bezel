import os
import requests

downloads = [
    {
        "name": "molten_liquid_silver_motion.mp4",
        "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3Bu8kApHUBmQcoBNUYoyCcOGJne/hf_20260414_232148_e856f696-c60e-4c40-921e-3fc3ac60224f.mp4"
    },
    {
        "name": "crimson_gold_motion.mp4",
        "url": "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094505_e898193e-ec14-4ecc-92ed-be976174fc88_min.mp4"
    },
    {
        "name": "skyline_dolly_motion.mp4",
        "url": "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094501_61b9fb78-2e54-44d2-bcea-ed0aae4cc707_min.mp4"
    },
    {
        "name": "luxury_ugc_fashion_motion.mp4",
        "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3BuPFKmNsBjkEgZ5LeOvNlL8ShO/hf_20260415_014636_4873f538-b114-48c3-b604-05e32945d184.mp4"
    },
    {
        "name": "maison_brune_luxury_motion.mp4",
        "url": "https://d8j0ntlcm91z4.cloudfront.net/user_34hPp7fXOu4gkTrKKk2ESqFSfG1/hf_20260410_231619_0c2814a2-9a87-48f8-a18f-811265d90dca.mp4"
    }
]

out_dir = os.path.join("assets", "animations")
os.makedirs(out_dir, exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

for item in downloads:
    dest = os.path.join(out_dir, item["name"])
    print(f"Downloading {item['name']}...")
    try:
        r = requests.get(item["url"], headers=headers, stream=True, timeout=20)
        if r.status_code == 200:
            with open(dest, "wb") as f:
                for chunk in r.iter_content(chunk_size=128 * 1024):
                    if chunk:
                        f.write(chunk)
            print(f"Downloaded {item['name']}: {os.path.getsize(dest)} bytes")
        else:
            print(f"Failed {item['name']}: Status {r.status_code}")
    except Exception as e:
        print(f"Error {item['name']}: {e}")

print("Download batch complete.")
