import json
import time
import requests

def test_commercial():
    url = "http://127.0.0.1:8000/api/video/generate-commercial"
    payload = {
        "concept": "a highend commercial of a guy advertising a hoodie by doing parkour stunts",
        "camera_preset": "fpv_whip",
        "aspect_ratio": "9:16",
        "duration_sec": 4
    }
    print(f"Calling {url} with payload:\n{json.dumps(payload, indent=2)}")
    t0 = time.time()
    resp = requests.post(url, json=payload, timeout=360)
    elapsed = time.time() - t0
    print(f"Response status: {resp.status_code} in {elapsed:.2f}s")
    if resp.status_code == 200:
        data = resp.json()
        print("Success! Data:")
        print(json.dumps(data, indent=2))
        
        # Test DuckDB stream endpoint
        stream_url = f"http://127.0.0.1:8000{data.get('duckdb_stream_url')}"
        print(f"\nTesting stream URL: {stream_url}")
        s_resp = requests.get(stream_url, headers={"Range": "bytes=0-1024"}, timeout=10)
        print(f"Stream status: {s_resp.status_code}, content length: {len(s_resp.content)} bytes")
        print(f"Content-Type: {s_resp.headers.get('Content-Type')}")
        print(f"Content-Range: {s_resp.headers.get('Content-Range')}")
    else:
        print(f"Error: {resp.text}")

if __name__ == "__main__":
    test_commercial()
