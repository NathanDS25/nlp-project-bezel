import re

with open("engine.py", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update max_wait and check ComfyUI shared output directory
old_poll = '''    video_url = None
    local_mp4_path = None
    max_wait = 300
    elapsed_poll = 0'''

new_poll = '''    video_url = None
    local_mp4_path = None
    max_wait = 1800  # 30 minutes for 22B parameter DiT inference
    elapsed_poll = 0
    shared_output_dir = r"C:\\Users\\Hp\\AppData\\Local\\Comfy-Desktop\\ComfyUI-Shared\\output\\video"'''

content = content.replace(old_poll, new_poll, 1)

# 2. Add physical file check in polling loop
old_check = '''                if local_mp4_path:
                    break
        except Exception:
            pass
        time.sleep(2.0)'''

new_check = '''                if local_mp4_path:
                    break
                # Also check physical ComfyUI shared output directory for generated video
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
                                break
                if local_mp4_path:
                    break
        except Exception as poll_e:
            pass
        time.sleep(2.0)'''

content = content.replace(old_check, new_check, 1)

# 3. Do not fall back to template when mode is ltx
old_fallback = '''    except Exception as comfy_err:
        print(f"[Engine] LTX Video ComfyUI fallback notice: {comfy_err}")'''

new_fallback = '''    except Exception as comfy_err:
        print(f"[Engine] LTX Video ComfyUI notice: {comfy_err}")
        if mode == "ltx":
            raise HTTPException(status_code=500, detail=f"LTX-2.5 ComfyUI Generation Error: {str(comfy_err)}")'''

content = content.replace(old_fallback, new_fallback, 1)

with open("engine.py", "w", encoding="utf-8") as f:
    f.write(content)

print("ENGINE.PY UPDATED SUCCESSFULLY")

