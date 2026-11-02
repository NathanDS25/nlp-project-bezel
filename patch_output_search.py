with open("engine.py", "r", encoding="utf-8") as f:
    text = f.read()

target_check = 'shared_output_dir = r"C:\\Users\\Hp\\AppData\\Local\\Comfy-Desktop\\ComfyUI-Shared\\output\\video"'

new_check = '''candidate_output_dirs = [
        r"C:\\Users\\Hp\\AppData\\Local\\Comfy-Desktop\\ComfyUI-Installs\\ComfyUI\\ComfyUI\\output\\video",
        r"C:\\Users\\Hp\\AppData\\Local\\Comfy-Desktop\\ComfyUI-Installs\\ComfyUI\\ComfyUI\\output",
        r"C:\\Users\\Hp\\AppData\\Local\\Comfy-Desktop\\ComfyUI-Shared\\output\\video",
        r"C:\\Users\\Hp\\AppData\\Local\\Comfy-Desktop\\ComfyUI-Shared\\output"
    ]'''

if target_check in text:
    text = text.replace(target_check, new_check)
    
    # Also update directory scan loop
    old_loop = '''                # Also check physical ComfyUI shared output directory for generated video
                if os.path.exists(shared_output_dir):
                    for fn in os.listdir(shared_output_dir):
                        if fn.endswith(".mp4") and fn.startswith("LTX_2.5_t2v"):
                            fp = os.path.join(shared_output_dir, fn)
                            if os.path.getmtime(fp) >= t0 - 2 and os.path.getsize(fp) > 10000:
                                save_name = f"ltx_commercial_{prompt_id[:8]}.mp4"
                                save_path = os.path.join("assets", "animations", save_name)
                                import shutil
                                shutil.copy2(fp, save_path)
                                local_mp4_path = save_path
                                video_url = f"/assets/animations/{save_name}"
                                break'''

    new_loop = '''                # Also check physical ComfyUI output directories for generated video
                for c_dir in candidate_output_dirs:
                    if os.path.exists(c_dir):
                        for fn in os.listdir(c_dir):
                            if fn.endswith(".mp4") and ("LTX_2.5_t2v" in fn or "ltx" in fn.lower()):
                                fp = os.path.join(c_dir, fn)
                                try:
                                    if os.path.getmtime(fp) >= t0 - 5 and os.path.getsize(fp) > 10000:
                                        save_name = f"ltx_commercial_{prompt_id[:8]}.mp4"
                                        save_path = os.path.join("assets", "animations", save_name)
                                        import shutil
                                        shutil.copy2(fp, save_path)
                                        shutil.copy2(fp, os.path.join("assets", "animations", "ltx_commercial_latest.mp4"))
                                        local_mp4_path = save_path
                                        video_url = f"/assets/animations/{save_name}"
                                        break
                                except Exception:
                                    pass
                    if local_mp4_path:
                        break'''

    if old_loop in text:
        text = text.replace(old_loop, new_loop)
        with open("engine.py", "w", encoding="utf-8") as f:
            f.write(text)
        print("Successfully updated video candidate search directories and latest mirror!")
    else:
        print("Old loop block not found, check formatting.")
else:
    print("Target check not found.")

