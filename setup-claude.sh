#!/bin/bash

# Lark MCP Setup Script for Claude Desktop
# This script helps you configure Lark MCP server for Claude Desktop

set -e

echo "🚀 Lark MCP Setup for Claude Desktop"
echo "======================================"
echo ""

# Check Node.js version
echo "Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="20.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Error: Node.js version must be >= 20.0.0"
    echo "   Current version: $NODE_VERSION"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js version: v$NODE_VERSION"
echo ""

# Determine Claude config path based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    CONFIG_DIR="$HOME/Library/Application Support/Claude"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    CONFIG_DIR="$APPDATA/Claude"
else
    CONFIG_DIR="$HOME/.config/Claude"
fi

CONFIG_FILE="$CONFIG_DIR/claude_desktop_config.json"

echo "Claude Desktop config location: $CONFIG_FILE"
echo ""

# Get user input
echo "📝 Please provide your Lark/Feishu application credentials:"
echo "   (You can get these from https://open.feishu.cn/ or https://open.larksuite.com/)"
echo ""

read -p "Enter your App ID (e.g., cli_xxxxx): " APP_ID
if [ -z "$APP_ID" ]; then
    echo "❌ App ID cannot be empty"
    exit 1
fi

read -p "Enter your App Secret: " APP_SECRET
if [ -z "$APP_SECRET" ]; then
    echo "❌ App Secret cannot be empty"
    exit 1
fi

echo ""
read -p "Are you using Lark International version? (y/N): " USE_LARK
echo ""

read -p "Do you need OAuth login for user identity? (y/N): " USE_OAUTH
echo ""

# Create config directory if it doesn't exist
mkdir -p "$CONFIG_DIR"

# Build MCP configuration
MCP_CONFIG='{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a",
        "'"$APP_ID"'",
        "-s",
        "'"$APP_SECRET"'"'

if [[ "$USE_LARK" =~ ^[Yy]$ ]]; then
    MCP_CONFIG+=',
        "--domain",
        "https://open.larksuite.com"'
fi

if [[ "$USE_OAUTH" =~ ^[Yy]$ ]]; then
    MCP_CONFIG+=',
        "--oauth",
        "--token-mode",
        "user_access_token"'
fi

MCP_CONFIG+='
      ]
    }
  }
}'

# Check if config file exists and merge or create new
if [ -f "$CONFIG_FILE" ]; then
    echo "⚠️  Claude Desktop config file already exists."
    read -p "Do you want to backup and overwrite it? (y/N): " OVERWRITE
    if [[ "$OVERWRITE" =~ ^[Yy]$ ]]; then
        BACKUP_FILE="$CONFIG_FILE.backup.$(date +%Y%m%d_%H%M%S)"
        cp "$CONFIG_FILE" "$BACKUP_FILE"
        echo "✅ Backed up existing config to: $BACKUP_FILE"
        echo "$MCP_CONFIG" > "$CONFIG_FILE"
    else
        echo ""
        echo "Please manually add this configuration to your $CONFIG_FILE:"
        echo ""
        echo "$MCP_CONFIG"
        exit 0
    fi
else
    echo "$MCP_CONFIG" > "$CONFIG_FILE"
fi

echo ""
echo "✅ Configuration saved to: $CONFIG_FILE"
echo ""

# OAuth login instructions
if [[ "$USE_OAUTH" =~ ^[Yy]$ ]]; then
    echo "⚠️  IMPORTANT: You need to login first!"
    echo ""
    echo "1. Set OAuth redirect URL in your Lark/Feishu app console:"
    echo "   http://localhost:3000/callback"
    echo ""
    echo "2. Run this command to login:"
    echo "   npx -y @larksuiteoapi/lark-mcp login -a $APP_ID -s $APP_SECRET"
    echo ""
fi

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Restart Claude Desktop application"
echo "2. The Lark MCP tools will be available in Claude Desktop"
echo ""
echo "For more information, see:"
echo "  - English: README.md"
echo "  - Vietnamese: SETUP_VI.md"
echo "  - Chinese: README_ZH.md"
