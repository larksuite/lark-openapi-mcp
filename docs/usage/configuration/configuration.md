# Lark MCP Configuration Guide

This document provides detailed information about advanced configuration options for the lark-mcp tool, organized by different usage scenarios.

## Table of Contents

- [📋 Prerequisites](#-prerequisites)
- [🚀 Basic Usage](#-basic-usage)
- [👤 Using User Identity](#-using-user-identity)  
- [🌐 Service Deployment](#-service-deployment)
- [⚙️ Advanced Configuration Options](#️-advanced-configuration-options)
- [📝 Configuration Parameters Reference](#-configuration-parameters-reference)


## 📋 Prerequisites

### Creating an Application

Before using the lark-mcp tool, you need to create a Lark/Feishu application:

1. Visit [Lark Open Platform](https://open.feishu.cn/) and log in
2. Click "Developer Console" and create a new application
3. Obtain the App ID and App Secret of the application, which will be used for API authentication
4. Add the required permissions to the application based on your use case
5. If you need to call APIs with user identity, please set the OAuth 2.0 redirect URL to http://localhost:3000/callback

For detailed application creation and configuration guides, please refer to [Lark Open Platform Documentation - Creating Applications](https://open.feishu.cn/document/home/introduction-to-custom-app-development/self-built-application-development-process#a0a7f6b0).

### Installing Node.js

Before using the lark-mcp tool, you need to install the Node.js environment first.

**Using Official Installer (Recommended)**:

1. Visit [Node.js official website](https://nodejs.org/)
2. Download and install the LTS version
3. After installation, open terminal to verify:

```bash
node -v
npm -v
```

## 🚀 Basic Usage

Suitable for most individual users, using app identity to access APIs with simple configuration and out-of-the-box functionality.

### Installation Methods

**Method 1: Install Button**

Click the corresponding button and fill in your App ID and App Secret in the popup window:

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-light.svg)](https://cursor.com/install-mcp?name=lark-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBsYXJrc3VpdGVvYXBpL2xhcmstbWNwIiwibWNwIiwiLWEiLCJ5b3VyX2FwcF9pZCIsIi1zIiwieW91cl9hcHBfc2VjcmV0Il19)
[![Install MCP Server](../../../assets/trae-cn.svg)](trae-cn://trae.ai-ide/mcp-import?source=lark&type=stdio&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBsYXJrc3VpdGVvYXBpL2xhcmstbWNwIiwibWNwIiwiLWEiLCJ5b3VyX2FwcF9pZCIsIi1zIiwieW91cl9hcHBfc2VjcmV0Il19)  [![Install MCP Server](../../../assets/trae.svg)](trae://trae.ai-ide/mcp-import?source=lark&type=stdio&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBsYXJrc3VpdGVvYXBpL2xhcmstbWNwIiwibWNwIiwiLWEiLCJ5b3VyX2FwcF9pZCIsIi1zIiwieW91cl9hcHBfc2VjcmV0Il19)


**Method 2: Manual JSON Configuration**

Add the following content to your MCP client configuration file:

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a", "your_app_id",
        "-s", "your_app_secret"
      ]
    }
  }
}
```

### Features

- ✅ **Simple Configuration**: Only requires App ID and App Secret
- ✅ **App Identity**: Uses app identity to call APIs, suitable for most scenarios
- ✅ **Automatic Management**: MCP client automatically starts and manages the service process

> 💡 **Tip**: This configuration uses the default stdio transport mode and app identity, suitable for personal use and most API calling scenarios.

## 👤 Using User Identity

When you need to access user's personal data (such as personal documents, sending messages to others, etc.), you need to use user identity instead of app identity.

### Use Cases

- 📄 Reading user's personal documents
- 💬 Sending messages as the user
- 📅 Accessing user's calendar data
- 👥 Getting user's contact information

### Configuration Steps

**Step 1: User Login in Terminal**

First, you need to perform OAuth authentication in the command line to obtain user tokens:

```bash
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s your_secret
```

This command will:
- Start a local server (default `http://localhost:3000/callback`)
- Open browser for authorization
- Save user token locally

> ⚠️ **Note**: You need to configure the redirect URL as `http://localhost:3000/callback` in the Lark Open Platform backend

**Step 2: Enable OAuth in MCP Client Configuration**

After login is complete, add OAuth-related parameters to the MCP client configuration:

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y", "@larksuiteoapi/lark-mcp", "mcp",
        "-a", "cli_xxxx", "-s", "your_secret",
        "--oauth", "--token-mode", "user_access_token"
      ]
    }
  }
}
```

### Features

- ✅ **User Identity**: Calls APIs as user identity, can access user private data

> 💡 **Tip**: It's recommended to explicitly set `--token-mode user_access_token` to ensure always using user identity for API calls.

## 🌐 Service Deployment (Alpha)

Suitable for team usage, multi-client sharing, or server deployment scenarios, using streamable mode to provide HTTP interface.

### Use Cases

- 🏢 Team sharing the same lark-mcp service
- ☁️ Cloud server deployment with remote access

### Configuration Steps

**Step 1: Start HTTP Service on Server**

```bash
# Basic startup command
npx -y @larksuiteoapi/lark-mcp mcp \
  -a cli_xxxx \
  -s your_secret \
  -m streamable \
  --host 0.0.0.0 \
  -p 3000
```



**Step 2: Configure URL in MCP Client**

After the server starts, configure the connection URL in each MCP client:

```json
{
  "mcpServers": {
    "lark-mcp": {
       "url": "http://localhost:3000/mcp"
    }
  }
}
```

> 💡 **Tip**: The streamable server will continue running after startup. It's recommended to use a process manager (such as PM2) to ensure service stability.

### Reuse a Single Identity Saved by `login`

If every client should call APIs as the same pre-authenticated user, run `lark-mcp login` first and then start the service as follows:

```bash
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s your_secret

npx -y @larksuiteoapi/lark-mcp mcp \
  -a cli_xxxx \
  -s your_secret \
  -m streamable \
  --credential-source login \
  --token-mode user_access_token \
  --host 127.0.0.1 \
  -p 3000
```

The service reads the locally saved token dynamically and automatically renews an expired access token with the stored refresh token. This mode cannot be combined with `--oauth` or `--user-access-token`. If you listen on a non-loopback address, add access control at the reverse proxy or network layer because every request shares this user identity.

Automatic renewal requires the app to have the `offline_access` user permission enabled. When `login` is run without `--scope`, this permission is inherited together with all other user permissions enabled for the app. Re-run `login` after changing app permissions.

### Enable OAuth User Identity Authentication

When you need to use user identity for API calls in service deployment, you can enable OAuth authentication functionality.

> ⚠️ **Important Note**: Enabling MCP OAuth requires client support for OAuth authentication functionality. Please ensure your MCP client version supports this feature.

**Start streamable service with OAuth:**

```bash
npx -y @larksuiteoapi/lark-mcp mcp \
  -a cli_xxxx \
  -s your_secret \
  -m streamable \
  --host localhost \
  -p 3000 \
  --oauth \
  --token-mode user_access_token
```

> ⚠️ **OAuth Limitation**: Currently, streamable service with OAuth only supports localhost and cannot be broadcasted to other users.

**MCP client configuration remains unchanged:**

```json
{
  "mcpServers": {
    "lark-mcp": {
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

## ⚙️ Advanced Configuration Options

This section introduces more advanced configuration methods, including environment variables, configuration files, etc.

### Environment Variable Configuration

Using environment variables can avoid exposing sensitive information in configuration files, especially suitable for server deployment:

**Set Environment Variables:**

```bash
# Windows (PowerShell)
$env:APP_ID="cli_xxxx"
$env:APP_SECRET="your_secret"
$env:LARK_TOOLS="im.v1.message.create,calendar.v4.calendar.list"
$env:LARK_DOMAIN="https://open.feishu.cn"
$env:LARK_TOKEN_MODE="auto"

# macOS/Linux (Bash/Zsh)
export APP_ID=cli_xxxx
export APP_SECRET=your_secret
export LARK_TOOLS=im.v1.message.create,calendar.v4.calendar.list
export LARK_DOMAIN=https://open.feishu.cn
export LARK_TOKEN_MODE=auto
```

**Simplified MCP Client Configuration:**

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp", 
        "mcp"
      ]
    }
  }
}
```

> 💡 **Tip**: The system will automatically read `APP_ID` and `APP_SECRET` environment variables, no need to specify them again in args.

### Configuration File Usage

For complex configurations, you can use JSON configuration files:

**1. Create Configuration File (config.json):**

```json
{
  "appId": "cli_xxxx",
  "appSecret": "your_secret", 
  "tools": ["im.v1.message.create", "calendar.v4.calendar.list"],
  "language": "zh",
  "oauth": true,
  "tokenMode": "user_access_token"
}
```

**2. Reference Configuration File in MCP Client:**

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "--config", "./config.json"
      ]
    }
  }
}
```

## 📝 Configuration Parameters Reference

### Supported Environment Variables

| Environment Variable | Command Line Parameter | Description | Example Value |
|---------------------|------------------------|-------------|---------------|
| `APP_ID` | `-a, --app-id` | Lark/Feishu app App ID | `cli_xxxx` |
| `APP_SECRET` | `-s, --app-secret` | Lark/Feishu app App Secret | `your_secret` |
| `USER_ACCESS_TOKEN` | `-u, --user-access-token` | User access token | `u-zzzzz` |
| `LARK_TOOLS` | `-t, --tools` | List of enabled API tools | `im.v1.message.create,calendar.v4.calendar.list` |
| `LARK_DOMAIN` | `-d, --domain` | API domain | `https://open.feishu.cn` |
| `LARK_TOKEN_MODE` | `--token-mode` | Token mode | `auto` |

> ⚠️ **Note**: Other parameters (such as `-l`, `-c`, `-m`, `--host`, `-p`, `--oauth`, etc.) do not support environment variables and can only be specified through command line parameters.

### Configuration File Fields

| Field | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `appId` | string | Application ID | Required |
| `appSecret` | string | Application secret | Required |
| `domain` | string | API domain | `https://open.feishu.cn` |
| `tools` | array | List of enabled tools | `["preset.default"]` |
| `toolNameCase` | string | Tool naming format | `snake` |
| `language` | string | Tool language | `zh` |
| `userAccessToken` | string | User access token | `""` |
| `tokenMode` | string | Token mode | `auto` |
| `mode` | string | Transport mode (default: stdio) | `stdio` |
| `host` | string | Listen host | `localhost` |
| `port` | string/number | Listen port | `3000` |
| `oauth` | boolean | Enable OAuth | `false` |
| `credentialSource` | string | Reuse local login credentials in Streamable mode; supported value: login | - |
| `scope` | string | OAuth permission scope | `""` |

### Configuration Priority

Configuration parameter priority from high to low:

1. **Command Line Parameters** - Highest priority
2. **Environment Variables** - Medium priority  
3. **Configuration File** - Lowest priority
4. **Default Values** - Fallback values

## Container Deployment (Alpha)

For detailed information, please refer to: [Docker Usage Guide](../docker/docker.md)

## More Information

- [Main Documentation](../../../README.md)
- [Tools List](../../reference/tool-presets/tools-en.md)
- [FAQ](../../troubleshooting/faq.md)
