import json
import uuid
import urllib.request
import urllib.parse
import websocket

COMFY_URL = "http://127.0.0.1:8188"
WS_URL = "ws://127.0.0.1:8188/ws?clientId="

with open("workflows/video_ltx2_5_t2v.json", "r", encoding="utf-8") as f:
    wf = json.load(f)

# Fast 2-second test: 24 fps, 2 sec duration, 9:16
wf["405:376"]["inputs"]["value"] = "a commercial of an athletic guy in a hoodie performing parkour stunts leaping between rooftops"
wf["405:361"]["inputs"]["value"] = 24
wf["405:362"]["inputs"]["value"] = 2

client_id = str(uuid.uuid4())
ws = websocket.WebSocket()
ws.connect(f"{WS_URL}{client_id}")
print(f"Connected to ComfyUI WebSocket with clientId={client_id}")

req = urllib.request.Request(
    f"{COMFY_URL}/prompt",
    data=json.dumps({"prompt": wf, "client_id": client_id}).encode("utf-8"),
    headers={"Content-Type": "application/json"}
)
res = json.loads(urllib.request.urlopen(req).read())
prompt_id = res.get("prompt_id")
print(f"Queued prompt_id={prompt_id}, errors={res.get('node_errors')}")

while True:
    out = ws.recv()
    if isinstance(out, str):
        msg = json.loads(out)
        mtype = msg.get("type")
        data = msg.get("data", {})
        if data.get("prompt_id") == prompt_id:
            if mtype == "executing":
                node = data.get("node")
                print(f"[WS] Executing node: {node} ({wf.get(node, {}).get('_meta', {}).get('title', 'Unknown')})")
                if node is None:
                    print("[WS] Execution complete!")
                    break
            elif mtype == "progress":
                print(f"[WS] Progress: {data.get('value')}/{data.get('max')}")
            elif mtype == "execution_error":
                print(f"[WS] ERROR: {json.dumps(data, indent=2)}")
                break
            elif mtype == "executed":
                print(f"[WS] Node {data.get('node')} executed!")

