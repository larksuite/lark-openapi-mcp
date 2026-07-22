# Command Line Reference

This document provides detailed information about all command line parameters available for the lark-mcp tool.

## Table of Contents

- [lark-mcp login](#lark-mcp-login)
- [lark-mcp logout](#lark-mcp-logout)  
- [lark-mcp mcp](#lark-mcp-mcp)

## lark-mcp login

The `lark-mcp login` command is used to authenticate with user identity and obtain user access tokens for accessing user's personal data.

### Parameters

| Parameter | Short | Description | Example |
|------|------|------|------|
| `--app-id` | `-a` | Feishu/Lark application App ID | `-a cli_xxxx` |
| `--app-secret` | `-s` | Feishu/Lark application App Secret | `-s xxxx` |
| `--domain` | `-d` | Feishu/Lark API domain, default is https://open.feishu.cn | `-d https://open.larksuite.com` |
| `--host` |  | Host to listen, default is localhost | `--host localhost` |
| `--port` | `-p` | Port to listen, default is 3000 | `-p 3000` |
| `--scope` |  | Specify OAuth scope for user access token, default is all user permissions enabled for the app, separated by spaces or commas | `--scope offline_access docx:document` |

### Usage Examples

```bash
# Basic login
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s your_secret

# Login with specific OAuth scope
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s your_secret --scope offline_access docx:document

# Login with custom domain (for Lark international)
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s your_secret -d https://open.larksuite.com
```

## lark-mcp logout

The `lark-mcp logout` command is used to clear locally stored user access tokens.

### Parameters

| Parameter | Short | Description | Example |
|------|------|------|------|
| `--app-id` | `-a` | Feishu/Lark application App ID, optional. If specified, only clears the token for this app; if not specified, clears tokens for all apps | `-a cli_xxxx` |

### Description

This command is used to clear locally stored user access tokens. If the `--app-id` parameter is specified, it only clears the user access token for that application; if not specified, it clears user access tokens for all applications.

### Usage Examples

```bash
# Clear tokens for a specific app
npx -y @larksuiteoapi/lark-mcp logout -a cli_xxxx

# Clear tokens for all apps
npx -y @larksuiteoapi/lark-mcp logout
```

## lark-mcp mcp

The `lark-mcp mcp` tool provides various command line parameters to flexibly configure the MCP service.

### Parameters

| Parameter | Short | Description | Example |
|------|------|------|------|
| `--app-id` | `-a` | Feishu/Lark application App ID | `-a cli_xxxx` |
| `--app-secret` | `-s` | Feishu/Lark application App Secret | `-s xxxx` |
| `--domain` | `-d` | Feishu/Lark API domain, default is https://open.feishu.cn | `-d https://open.larksuite.com` |
| `--tools` | `-t` | List of API tools to enable, separated by spaces or commas | `-t im.v1.message.create,im.v1.chat.create` |
| `--tool-name-case` | `-c` | Tool name format, options are snake, camel, dot, or kebab, default is snake | `-c camel` |
| `--language` | `-l` | Tools language, options are zh or en, default is en | `-l zh` |
| `--user-access-token` | `-u` | User access token for calling APIs as a user | `-u u-xxxx` |
| `--credential-source` |  | User credential source; set to login in Streamable mode to reuse tokens saved by `lark-mcp login` | `--credential-source login` |
| `--token-mode` |  | API token type, options are auto, tenant_access_token, or user_access_token, default is auto | `--token-mode user_access_token` |
| `--oauth` |  | Enable MCP Auth Server to get user_access_token and auto request user login when token expires (Beta) | `--oauth` |
| `--scope` |  | Specify OAuth scope for user access token, default is all user permissions enabled for the app, separated by spaces or commas | `--scope offline_access docx:document` |
| `--mode` | `-m` | Transport mode, options are stdio, streamable, or sse, default is stdio | `-m streamable` |
| `--host` |  | Listening host in SSE/Streamable mode, default is localhost | `--host 0.0.0.0` |
| `--port` | `-p` | Listening port in SSE/Streamable mode, default is 3000 | `-p 3000` |
| `--config` |  | Configuration file path, supports JSON format | `--config ./config.json` |
| `--version` | `-V` | Display version number | `-V` |
| `--help` | `-h` | Display help information | `-h` |

`--credential-source login` is available only in Streamable mode and cannot be combined with `--oauth` or `--user-access-token`.

## Related Documentation

- [Configuration Guide](../../usage/configuration/configuration.md)
- [Tools Reference](../tool-presets/tools-en.md)
- [Troubleshooting](../../troubleshooting/faq.md)
