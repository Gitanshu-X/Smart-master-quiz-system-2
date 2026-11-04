@echo off
title Smart Quiz Master
cd /d "%~dp0"

netstat -ano | findstr ":3000 " | findstr "LISTENING" >nul
if errorlevel 1 (
  echo Starting Smart Quiz Master...
  cd /d "%~dp0server"
  start "Smart Quiz Master Server" /MIN cmd /c node index.js
  cd /d "%~dp0"
  ping -n 3 127.0.0.1 >nul
)

start "" "http://localhost:3000/login.html"
echo Login page opened: http://localhost:3000/login.html
echo Student: demo@smartquiz.local   Password: Demo@123
echo Admin:   admin@smartquiz.local   Password: Admin@123
pause
