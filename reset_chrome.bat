@echo off
echo Step 1: Navigate to chrome://settings/appearance and reset theme to default
"C:\Program Files\Google\Chrome\Application\chrome.exe" chrome://settings/appearance
pause

echo Step 2: Navigate to chrome://flags and reset all flags
"C:\Program Files\Google\Chrome\Application\chrome.exe" chrome://flags
pause

echo Step 3: Navigate to chrome://settings/reset and restore settings
"C:\Program Files\Google\Chrome\Application\chrome.exe" chrome://settings/reset
pause

echo Step 4: Check chrome://flags/#force-color-profile is set to Default
"C:\Program Files\Google\Chrome\Application\chrome.exe" chrome://flags/#force-color-profile
pause

echo Complete browser rendering and theme reset process
