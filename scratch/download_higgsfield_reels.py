import os
import requests

downloads = [
    {
        "id": "higgsfield_runway_truck",
        "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_040418_e674bc76-e8c5-4099-bd5c-f871a9345cda_wm3.mp4",
        "name": "higgsfield_runway_truck.mp4",
        "title": "Tokyo Street Runway Truck (Smooth Gimbal Glide)"
    },
    {
        "id": "higgsfield_dolly_in_cinema",
        "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094501_61b9fb78-2e54-44d2-bcea-ed0aae4cc707.mp4",
        "name": "higgsfield_dolly_in_cinema.mp4",
        "title": "Arri Alexa Skyline Dolly Push-In"
    },
    {
        "id": "higgsfield_handheld_editorial",
        "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_041459_e02ab22b-6d8e-46bd-874e-8090a8f00799_wm3.mp4",
        "name": "higgsfield_handheld_editorial.mp4",
        "title": "35mm Anamorphic Handheld Editorial Portrait"
    },
    {
        "id": "higgsfield_ugc_fashion",
        "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3BuPFKmNsBjkEgZ5LeOvNlL8ShO/hf_20260415_014636_4873f538-b114-48c3-b604-05e32945d184.mp4",
        "name": "higgsfield_ugc_fashion.mp4",
        "title": "Get Ready With Me Luxury Fashion Reel (9:16)"
    },
    {
        "id": "higgsfield_liquid_chrome",
        "url": "https://d8j0ntlcm91z4.cloudfront.net/user_3Bu8kApHUBmQcoBNUYoyCcOGJne/hf_20260414_232148_e856f696-c60e-4c40-921e-3fc3ac60224f.mp4",
        "name": "higgsfield_liquid_chrome.mp4",
        "title": "High-Energy Liquid Chrome Commercial Reveal"
    },
    {
        "id": "higgsfield_genjutsu_orbit",
        "url": "https://cdn.higgsfield.ai/card/16eebc9a-8310-4f68-8a02-1e2e6f109169.mp4",
        "name": "higgsfield_genjutsu_orbit.mp4",
        "title": "Genjutsu 360 Dynamic Camera Orbit"
    },
    {
        "id": "higgsfield_content_factory",
        "url": "https://static-public-media.higgsfield.ai/cards/8dddb16b-6fe1-4cac-a11a-a650691a292d.mp4",
        "name": "higgsfield_content_factory.mp4",
        "title": "Content Factory Commercial Campaign Reel"
    }
]

out_dir = os.path.join("assets", "animations")
os.makedirs(out_dir, exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://higgsfield.ai/"
}

for item in downloads:
    dest = os.path.join(out_dir, item["name"])
    if os.path.exists(dest) and os.path.getsize(dest) > 10000:
        print(f"Already exists: {item['name']} ({os.path.getsize(dest)} bytes)")
        continue
    try:
        print(f"Downloading {item['title']}...")
        r = requests.get(item["url"], headers=headers, timeout=15)
        if r.status_code == 200 and len(r.content) > 1000:
            with open(dest, "wb") as f:
                f.write(r.content)
            print(f"[OK] Saved {item['name']} ({len(r.content)} bytes)")
        else:
            print(f"[FAIL] Failed {item['name']}: status {r.status_code}")
    except Exception as e:
        print(f"[ERR] Error {item['name']}: {e}")

