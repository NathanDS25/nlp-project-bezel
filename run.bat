@echo off
set PYTHONUTF8=1
echo Starting Bezel AI Studio...
".\venv\Scripts\streamlit.exe" run app.py --server.fileWatcherType none
pause
