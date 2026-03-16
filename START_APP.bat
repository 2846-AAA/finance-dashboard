@echo off
echo ============================================
echo   Starting FinTrack - Finance Dashboard
echo ============================================
echo.
echo Starting Flask backend on http://localhost:5000
echo Starting React frontend on http://localhost:5173
echo.
echo Close this window to stop both servers.
echo.

start "FinTrack Backend" cmd /k "cd backend && venv\Scripts\activate && python app.py"
timeout /t 2 /nobreak >nul
start "FinTrack Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak >nul

echo Both servers are starting...
echo Open http://localhost:5173 in your browser
echo.
start http://localhost:5173
pause
