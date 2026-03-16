@echo off
echo ============================================
echo   FinTrack - Finance Dashboard Setup
echo ============================================
echo.

echo [1/4] Setting up Python backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
echo Backend dependencies installed!
echo.

echo [2/4] Setting up frontend...
cd ..\frontend
npm install
echo Frontend dependencies installed!
echo.

echo [3/4] Setup complete!
echo.
echo ============================================
echo   IMPORTANT: Before running the app
echo ============================================
echo.
echo   1. Go to https://mongodb.com/cloud/atlas
echo   2. Create a free account and cluster
echo   3. Get your connection string
echo   4. Open backend\.env and replace the
echo      MONGO_URI with your connection string
echo.
echo ============================================
echo   To RUN the app:
echo ============================================
echo.
echo   Run START_APP.bat
echo.
pause
