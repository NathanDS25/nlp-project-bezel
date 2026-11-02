@echo off
set PYTHONUTF8=1
echo ========================================================
echo   Launching ETHEREAL Haute Couture Commercial AI Studio
echo   Backend: FastAPI on http://localhost:8000
echo   Frontend: React + Vite on http://localhost:3000
echo ========================================================

start cmd /k ".\venv\Scripts\python.exe server.py"
cd frontend
start cmd /k "npm run dev"
start http://localhost:3000
