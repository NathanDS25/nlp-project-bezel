import json
import time
import requests

def test_instant():
    url = "http://127.0.0.1:8000/api/video/generate-commercial"
    payload = {
        "concept": "a highend commercial of a guy advertising a hoodie by doing parkour stunts",
        "camera_preset": "fpv_whip",
        "aspect_ratio": "9:16",
        "duration_sec": 4,
        "reference_image_path": "assets/outputs/hero_poll_b74921507b.jpg"
    }
    print(f"Calling {url} with reference image...")
    t0 = time.time()
    resp = requests.post(url, json=payload, timeout=30)
    elapsed = time.time() - t0
    print(f"Response status: {resp.status_code} in {elapsed:.2f}s")
    if resp.status_code == 200:
        data = resp.json()
        print("Success! Return payload:")
        print(json.dumps(data, indent=2))
        stream_url = f"http://127.0.0.1:8000{data.get('duckdb_stream_url')}"
        s_resp = requests.get(stream_url, headers={"Range": "bytes=0-1024"}, timeout=5)
        print(f"Stream verification: status={s_resp.status_code}, length={len(s_resp.content)}, range={s_resp.headers.get('Content-Range')}")
    else:
        print(f"Error: {resp.text}")

if __name__ == "__main__":
    test_instant()
