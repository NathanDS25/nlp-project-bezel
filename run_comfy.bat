@echo off
set PYTHONUTF8=1
echo ========================================================
echo   Launching ComfyUI Backend for ETHEREAL AI Studio
echo   URL: http://127.0.0.1:8189
echo ========================================================

call "C:\Users\Hp\AppData\Local\Comfy-Desktop\ComfyUI-Installs\ComfyUI\ComfyUI\.venv\Scripts\python.exe" "C:\Users\Hp\AppData\Local\Comfy-Desktop\ComfyUI-Installs\ComfyUI\ComfyUI\main.py" --listen 127.0.0.1 --port 8189 --extra-model-paths-config "%~dp0extra_model_paths.yaml"
pause
