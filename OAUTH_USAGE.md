# OAuth Usage Guide

This guide demonstrates how to use the new OAuth 2.0 authentication feature with the Feishu/Lark MCP tool.

## Quick Start

### 1. Interactive OAuth (Recommended)

The easiest way to set up OAuth is using the interactive flow:

```bash
# Start interactive OAuth authentication
lark-mcp oauth --interactive -a your_app_id -s your_app_secret
```

This will:
1. Start a local callback server on port 8080
2. Open your browser to the Feishu/Lark authorization page
3. Automatically handle the callback and token exchange
4. Store tokens securely in `~/.lark-mcp/tokens.json`

### 2. Manual OAuth

If you prefer manual control or need to customize the redirect URI:

```bash
# Step 1: Generate authorization URL
lark-mcp oauth -a your_app_id -s your_app_secret

# Step 2: Open the URL in your browser and complete authorization

# Step 3: Extract the authorization code from the callback URL
# (Usually looks like: http://localhost:8080/callback?code=YOUR_CODE&state=...)

# Step 4: Exchange the code for tokens
lark-mcp oauth-callback YOUR_AUTHORIZATION_CODE -a your_app_id -s your_app_secret
```

## Using OAuth Tokens

Once OAuth tokens are stored, simply start the MCP server without providing user access tokens:

```bash
# The server will automatically use stored OAuth tokens
lark-mcp mcp -a your_app_id -s your_app_secret
```

For MCP client configuration (Claude, Cursor, etc.):

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a",
        "your_app_id",
        "-s", 
        "your_app_secret"
      ]
    }
  }
}
```

## Configuration Options

### OAuth Command Options

| Option | Description | Default |
|--------|-------------|---------|
| `--interactive` | Start interactive OAuth flow | false |
| `--port <port>` | Port for OAuth callback server | 8080 |
| `--redirect-uri <uri>` | OAuth redirect URI | `http://localhost:8080/callback` |
| `--scope <scope>` | OAuth scope | `user:email` |
| `--clear` | Clear stored tokens | false |

### Examples

```bash
# Use custom port for callback server
lark-mcp oauth --interactive --port 9000 -a your_app_id -s your_app_secret

# Use custom redirect URI
lark-mcp oauth --interactive --redirect-uri "http://localhost:3000/auth/callback" -a your_app_id -s your_app_secret

# Clear stored tokens
lark-mcp oauth --clear
```

## Token Management

Tokens are automatically managed:

- **Storage**: Tokens are stored in `~/.lark-mcp/tokens.json`
- **Refresh**: Access tokens are automatically refreshed when they expire
- **Fallback**: If OAuth tokens are unavailable or invalid, the system falls back to app-level authentication

## Troubleshooting

### Port Already in Use

If port 8080 is already in use, specify a different port:

```bash
lark-mcp oauth --interactive --port 8081 -a your_app_id -s your_app_secret
```

### Browser Doesn't Open Automatically

If your browser doesn't open automatically, copy the URL from the terminal and open it manually.

### Token Refresh Fails

If token refresh fails, clear the stored tokens and re-authenticate:

```bash
lark-mcp oauth --clear
lark-mcp oauth --interactive -a your_app_id -s your_app_secret
```

### Permissions Issues

Ensure your Feishu/Lark application has the necessary OAuth permissions configured in the developer console.

## Security Notes

- Tokens are stored locally in your home directory with restricted file permissions
- The callback server only runs during the OAuth flow and is automatically shut down
- Refresh tokens are used to obtain new access tokens without requiring re-authorization
- Always use HTTPS redirect URIs in production environments

## Integration with Development Tools

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "lark-mcp",
      "args": ["mcp", "-a", "your_app_id", "-s", "your_app_secret"]
    }
  }
}
```

### Cursor

Add to your MCP configuration:

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": ["-y", "@larksuiteoapi/lark-mcp", "mcp", "-a", "your_app_id", "-s", "your_app_secret"]
    }
  }
}
```