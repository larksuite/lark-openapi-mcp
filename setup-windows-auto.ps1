# Lark MCP Auto Setup for Claude Desktop
# Windows PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Lark MCP Auto Setup for Claude Desktop" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create Claude config directory
$claudeDir = "$env:APPDATA\Claude"
if (-not (Test-Path $claudeDir)) {
    New-Item -ItemType Directory -Path $claudeDir -Force | Out-Null
    Write-Host "✓ Created Claude config directory" -ForegroundColor Green
} else {
    Write-Host "✓ Claude config directory exists" -ForegroundColor Green
}

# Config content
$config = @'
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a",
        "cli_a9dd97eee3389ed2",
        "-s",
        "DeKaf683pqJGhPxiWVWIeh2VLSeBFGsO",
        "--domain",
        "https://open.larksuite.com",
        "--oauth",
        "--token-mode",
        "user_access_token"
      ]
    }
  }
}
'@

# Write config file
$configPath = "$claudeDir\claude_desktop_config.json"
$config | Out-File -FilePath $configPath -Encoding UTF8 -Force

Write-Host ""
Write-Host "✅ Config file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Location: $configPath" -ForegroundColor Cyan
Write-Host ""

# Verify file content
Write-Host "📄 Config content:" -ForegroundColor Yellow
Write-Host "-------------------" -ForegroundColor Gray
Get-Content $configPath | Write-Host -ForegroundColor White
Write-Host "-------------------" -ForegroundColor Gray
Write-Host ""

# Check if Claude is running
$claudeProcess = Get-Process -Name "Claude" -ErrorAction SilentlyContinue
if ($claudeProcess) {
    Write-Host "⚠️  WARNING: Claude Desktop is currently running!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please close Claude Desktop completely:" -ForegroundColor Yellow
    Write-Host "  1. Right-click Claude icon in taskbar" -ForegroundColor White
    Write-Host "  2. Click 'Quit'" -ForegroundColor White
    Write-Host "  3. Wait 5 seconds" -ForegroundColor White
    Write-Host "  4. Open Claude Desktop again" -ForegroundColor White
} else {
    Write-Host "✓ Claude Desktop is not running" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now start Claude Desktop!" -ForegroundColor Green
}

Write-Host ""
Write-Host "📂 Opening config folder..." -ForegroundColor Cyan
explorer $claudeDir

Write-Host ""
Write-Host "✨ Setup complete! Restart Claude Desktop to use Lark MCP." -ForegroundColor Green
Write-Host ""

# Check Node.js
Write-Host "🔍 Checking Node.js..." -ForegroundColor Cyan
try {
    $nodeVersion = node -v 2>$null
    if ($nodeVersion) {
        Write-Host "✓ Node.js $nodeVersion is installed" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Node.js not found. Please install from https://nodejs.org/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
