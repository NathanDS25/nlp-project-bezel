#!/usr/bin/env python3
"""
openclaw_bridge.py - Bridge CLI for OpenClaw Autonomous Agents
Translates OpenClaw tool/skill calls into Atelier Studio API requests.
Returns structured JSON to stdout for OpenClaw agents to parse and route.
"""

import sys
import json
import argparse
import requests

API_BASE = "http://localhost:8000"

def cmd_status(args):
    try:
        r = requests.get(f"{API_BASE}/api/status", timeout=3)
        print(json.dumps(r.json(), indent=2))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e), "message": "Atelier backend not reachable"}))

def cmd_design(args):
    payload = {
        "prompt": args.prompt,
        "garment_type": args.type or "outerwear",
        "silhouette": args.silhouette or "Tailored Architectural",
        "color": args.color or "Camel Cashmere",
        "color_hex": args.color_hex or "#C19A6B",
        "fabric": args.fabric or "Double-Faced Cashmere Wool",
        "hardware": args.hardware or "Horn Buttons & Concealed Placket",
        "pattern": args.pattern or "Solid Minimalist",
        "view_mode": args.view or "flat-lay"
    }
    try:
        r = requests.post(f"{API_BASE}/api/tailor/design", json=payload, timeout=60)
        data = r.json()
        output = {
            "success": data.get("success", True),
            "shoot_id": data.get("shoot_id"),
            "image_url": f"{API_BASE}{data.get('image_url')}" if data.get("image_url") else None,
            "local_image_path": data.get("local_image_path"),
            "garment_type": payload["garment_type"],
            "color": payload["color"],
            "fabric": payload["fabric"]
        }
        print(json.dumps(output, indent=2))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))

def cmd_enhance(args):
    payload = {
        "prompt": args.prompt,
        "style": args.style or "editorial",
        "model": args.model or "nemotron:latest"
    }
    try:
        r = requests.post(f"{API_BASE}/api/prompt/enhance", json=payload, timeout=30)
        print(json.dumps(r.json(), indent=2))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))

def cmd_models(args):
    try:
        r = requests.get(f"{API_BASE}/api/models", timeout=5)
        models = r.json()
        summary = []
        for mid, m in models.items():
            summary.append({
                "id": mid,
                "name": m.get("name"),
                "gender": m.get("gender"),
                "archetype": m.get("archetype")
            })
        print(json.dumps({"count": len(summary), "models": summary}, indent=2))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))

def cmd_tryon(args):
    data = {
        "model_id": args.model or "model_1",
        "brief": args.brief or "Crisp luxury editorial lookbook shoot",
        "lighting": args.lighting or "Soft Diffused Commercial Studio",
        "background": args.background or "Minimalist Concrete Studio",
        "pose": args.pose or "Front-Facing Minimalist Pose (Relaxed posture, natural drape)"
    }
    if args.garment_url:
        data["garment_url"] = args.garment_url

    try:
        r = requests.post(f"{API_BASE}/api/tryon/generate", data=data, timeout=120)
        res = r.json()
        output = {
            "success": res.get("success", True),
            "shoot_id": res.get("shoot_id"),
            "image_url": f"{API_BASE}{res.get('image_url')}" if res.get("image_url") else None,
            "local_image_path": res.get("local_image_path"),
            "model_id": data["model_id"]
        }
        print(json.dumps(output, indent=2))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))

def cmd_history(args):
    try:
        r = requests.get(f"{API_BASE}/api/history?limit={args.limit or 5}", timeout=5)
        print(json.dumps(r.json(), indent=2))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))

def cmd_video(args):
    payload = {
        "concept": args.concept,
        "camera_preset": args.camera or "dolly_in",
        "aspect_ratio": args.aspect or "9:16",
        "duration_sec": args.duration or 4,
        "mode": args.mode or "ltx"
    }
    if args.garment_path:
        payload["garment_image_path"] = args.garment_path
    try:
        r = requests.post(f"{API_BASE}/api/video/commercial", json=payload, timeout=1800)
        print(json.dumps(r.json(), indent=2))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))

def main():
    parser = argparse.ArgumentParser(description="Atelier AI Studio OpenClaw Bridge")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # status
    subparsers.add_parser("status", help="Check studio backend status")

    # design
    p_design = subparsers.add_parser("design", help="Design a bespoke garment")
    p_design.add_argument("--prompt", required=True, help="Description of garment")
    p_design.add_argument("--type", default="outerwear", help="Garment type (e.g. outerwear, gown, suit, dress)")
    p_design.add_argument("--silhouette", default="Tailored Architectural", help="Silhouette style")
    p_design.add_argument("--color", default="Camel Cashmere", help="Color name")
    p_design.add_argument("--color_hex", default="#C19A6B", help="Color hex")
    p_design.add_argument("--fabric", default="Double-Faced Cashmere Wool", help="Fabric composition")
    p_design.add_argument("--hardware", default="Horn Buttons", help="Hardware details")
    p_design.add_argument("--pattern", default="Solid Minimalist", help="Pattern")
    p_design.add_argument("--view", default="flat-lay", help="View mode")

    # enhance
    p_enh = subparsers.add_parser("enhance", help="Enhance prompt with Nemotron")
    p_enh.add_argument("--prompt", required=True, help="Input prompt")
    p_enh.add_argument("--style", default="editorial", help="Style (editorial, tailor, commercial, skincare)")
    p_enh.add_argument("--model", default="nemotron:latest", help="Ollama model")

    # models
    subparsers.add_parser("models", help="List studio fashion models")

    # tryon
    p_try = subparsers.add_parser("tryon", help="Run virtual try-on on a model")
    p_try.add_argument("--model", required=True, help="Model ID")
    p_try.add_argument("--garment_url", required=True, help="Garment file or URL")
    p_try.add_argument("--brief", default="Crisp commercial lookbook shoot", help="Brief")
    p_try.add_argument("--lighting", default="Soft Diffused Commercial Studio", help="Lighting")
    p_try.add_argument("--background", default="Minimalist Concrete Studio", help="Background")
    p_try.add_argument("--pose", default="Front-Facing Minimalist Pose", help="Pose")

    # history
    p_hist = subparsers.add_parser("history", help="List recent shoot history")
    p_hist.add_argument("--limit", type=int, default=5, help="Number of records")

    # video
    p_vid = subparsers.add_parser("video", help="Generate AI commercial video with ComfyUI LTX-2.5")
    p_vid.add_argument("--concept", required=True, help="Commercial concept or action description")
    p_vid.add_argument("--camera", default="dolly_in", help="Camera preset (e.g. dolly_in, orbit, tracking, low_angle_tilt)")
    p_vid.add_argument("--aspect", default="9:16", help="Aspect ratio (9:16 or 16:9)")
    p_vid.add_argument("--duration", type=int, default=4, help="Duration in seconds")
    p_vid.add_argument("--mode", default="ltx", help="Engine mode (ltx or fallback)")
    p_vid.add_argument("--garment_path", default=None, help="Optional garment image path")

    args = parser.parse_args()
    if args.command == "status":
        cmd_status(args)
    elif args.command == "design":
        cmd_design(args)
    elif args.command == "enhance":
        cmd_enhance(args)
    elif args.command == "models":
        cmd_models(args)
    elif args.command == "tryon":
        cmd_tryon(args)
    elif args.command == "history":
        cmd_history(args)
    elif args.command == "video":
        cmd_video(args)

if __name__ == "__main__":
    main()
