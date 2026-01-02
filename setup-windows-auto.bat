@echo off
chcp 65001 >nul
echo ========================================
echo   Lark MCP Auto Setup for Claude Desktop
echo ========================================
echo.

REM Create Claude config directory
if not exist "%APPDATA%\Claude" (
    mkdir "%APPDATA%\Claude"
    echo ✓ Created Claude config directory
) else (
    echo ✓ Claude config directory exists
)

REM Create config file
(
echo {
echo   "mcpServers": {
echo     "lark-mcp": {
echo       "command": "npx",
echo       "args": [
echo         "-y",
echo         "@larksuiteoapi/lark-mcp",
echo         "mcp",
echo         "-a",
echo         "cli_a9dd97eee3389ed2",
echo         "-s",
echo         "DeKaf683pqJGhPxiWVWIeh2VLSeBFGsO",
echo         "--domain",
echo         "https://open.larksuite.com",
echo         "--oauth",
echo         "--token-mode",
echo         "user_access_token"
echo       ]
echo     }
echo   }
echo }
) > "%APPDATA%\Claude\claude_desktop_config.json"

echo.
echo ✅ Config file created successfully!
echo.
echo 📁 Location: %APPDATA%\Claude\claude_desktop_config.json
echo.
echo ⚠️  IMPORTANT: Please RESTART Claude Desktop now!
echo    1. Right-click Claude icon in taskbar
echo    2. Click "Quit"
echo    3. Open Claude Desktop again
echo.

REM Open the config folder
explorer "%APPDATA%\Claude"

echo 📂 Opened config folder for verification
echo.
pause
