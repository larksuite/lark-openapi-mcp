# Feishu/Lark OpenAPI MCP

[![npm version](https://img.shields.io/npm/v/@larksuiteoapi/lark-mcp.svg)](https://www.npmjs.com/package/@larksuiteoapi/lark-mcp)
[![npm downloads](https://img.shields.io/npm/dm/@larksuiteoapi/lark-mcp.svg)](https://www.npmjs.com/package/@larksuiteoapi/lark-mcp)
[![Node.js Version](https://img.shields.io/node/v/@larksuiteoapi/lark-mcp.svg)](https://nodejs.org/)

English | [中文](./README_ZH.md)

[Developer Documentation Retrieval MCP](./README_RECALL.md) | [Official Document](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mcp_integration/mcp_introduction)

> **⚠️ Beta Version Notice**: This tool is currently in Beta stage. Features and APIs may change, so please stay updated with version releases.

This is the Feishu/Lark official OpenAPI MCP (Model Context Protocol) tool designed to help users quickly connect to the Feishu/Lark platform and enable efficient collaboration between AI Agents and Feishu/Lark. The tool encapsulates Feishu/Lark Open Platform API interfaces as MCP tools, allowing AI assistants to directly call these interfaces and implement various automation scenarios such as document processing, conversation management, calendar scheduling, and more.

## Features

- **Complete Feishu/Lark API Toolkit:** Encapsulates almost all Feishu/Lark API interfaces, including message management, group management, document operations, calendar events, Bitable, and other core functional areas.
- **Dual Authentication Support:**
  - Supports App Access Token authentication
  - Supports User Access Token authentication
- **Flexible Communication Protocols:**
  - Supports standard input/output stream (stdio) mode, suitable for integration with AI tools like Trae/Cursor/Claude
  - Supports StreamableHTTP/SSE mode, providing HTTP-based interfaces

- Supports multiple configuration methods, adapting to different usage scenarios

## Tool List

A complete list of all supported Feishu/Lark tools can be found in [tools.md](./docs/tools-en.md), where tools are categorized by project and version with descriptions.

## Preparation

### Creating a Feishu/Lark Application

Before using the lark-mcp tool, you need to create a Feishu/Lark application:

1. Visit the [Feishu Open Platform](https://open.feishu.cn/) or [Lark Open Platform](https://open.larksuite.com/) and log in
2. Click "Console" and create a new application
3. Obtain the App ID and App Secret, which will be used for API authentication
4. Add the necessary permissions for your application based on your usage scenario
5. If you need to call APIs as a user, set the OAuth 2.0 redirect URL to http://localhost:3000/callback

For detailed application creation and configuration guidelines, please refer to the [Feishu Open Platform Documentation - Creating an Application](https://open.feishu.cn/document/home/introduction-to-custom-app-development/self-built-application-development-process#a0a7f6b0).

### Installing Node.js

Before using the lark-mcp tool, you need to install the Node.js environment.

**Using the Official Installer (Recommended)**:

1. Visit the [Node.js website](https://nodejs.org/)
2. Download and install the LTS version
3. After installation, verify in the terminal:

```bash
node -v
npm -v
```

## Usage Guide

### Using with Trae/Cursor/Claude

To integrate Feishu/Lark functionality in AI tools like Trae, Cursor or Claude, add the following to your configuration file:

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
        "<your_app_id>",
        "-s",
        "<your_app_secret>"
      ]
    }
  }
}
```

If you need to access APIs with **user identity**, you need to login first using the login command in the terminal. Note that you need to configure the application's redirect URL in the developer console first, default is http://localhost:3000/callback

```bash

# Login and get user access token
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s yyyyy
   
# Or optionally, login with specific OAuth scope - if not specified, all permissions will be authorized by default
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s yyyyy --scope offline_access docx:document

```

Then add the following to your configuration file:

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
        "<your_app_id>",
        "-s",
        "<your_app_secret>",
        "--oauth"
      ]
    }
  }
}
```

You can also directly add a user access token (expires in 2 hours) via -u:

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
        "<your_app_id>",
        "-s",
        "<your_app_secret>",
        "-u",
        "<your_user_token>"
      ]
    }
  }
}
```

### Custom API Configuration

By default, the MCP service enables common APIs. To enable other tools or only specific APIs or presets, you can specify them using the `-t` parameter (separated by commas):

```bash
lark-mcp mcp -a <your_app_id> -s <your_app_secret> -t im.v1.message.create,im.v1.message.list,im.v1.chat.create,preset.calendar.default
```

#### Preset Tool Collections in Detail

The following table details each API tool and its inclusion in different preset collections, helping you choose the appropriate preset for your needs:

| Tool Name | Function Description | preset.light | preset.default (Default) | preset.im.default | preset.base.default | preset.base.batch | preset.doc.default | preset.task.default | preset.calendar.default |
| --- | --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| im.v1.chat.create | Create a group chat | | ✓ | ✓ | | | | | |
| im.v1.chat.list | Get group chat list | | ✓ | ✓ | | | | | |
| im.v1.chat.search | Search group chats | ✓ | | | | | | | |
| im.v1.chatMembers.get | Get group members | | ✓ | ✓ | | | | | |
| im.v1.message.create | Send messages | ✓ | ✓ | ✓ | | | | | |
| im.v1.message.list | Get message list | ✓ | ✓ | ✓ | | | | | |
| bitable.v1.app.create | Create base | | ✓ | | ✓ | ✓ | | | |
| bitable.v1.appTable.create | Create base data table | | ✓ | | ✓ | ✓ | | | |
| bitable.v1.appTable.list | Get base data table list | | ✓ | | ✓ | ✓ | | | |
| bitable.v1.appTableField.list | Get base data table field list | | ✓ | | ✓ | ✓ | | | |
| bitable.v1.appTableRecord.search | Search base data table records | ✓ | ✓ | | ✓ | ✓ | | | |
| bitable.v1.appTableRecord.create | Create base data table records | | ✓ | | ✓ | | | | |
| bitable.v1.appTableRecord.batchCreate | Batch create base data table records | ✓ | | | | ✓ | | | |
| bitable.v1.appTableRecord.update | Update base data table records | | ✓ | | ✓ | | | | |
| bitable.v1.appTableRecord.batchUpdate | Batch update base data table records | | | | | ✓ | | | |
| docx.v1.document.rawContent | Get document content | ✓ | ✓ | | | | ✓ | | |
| docx.builtin.import | Import documents | ✓ | ✓ | | | | ✓ | | |
| docx.builtin.search | Search documents | ✓ | ✓ | | | | ✓ | | |
| drive.v1.permissionMember.create | Add collaborator permissions | | ✓ | | | | ✓ | | |
| wiki.v2.space.getNode | Get Wiki node | ✓ | ✓ | | | | ✓ | | |
| wiki.v1.node.search | Search Wiki nodes | | ✓ | | | | ✓ | | |
| contact.v3.user.batchGetId | Batch get user IDs | ✓ | ✓ | | | | | | |
| task.v2.task.create | Create task | | | | | | | ✓ | |
| task.v2.task.patch | Modify task | | | | | | | ✓ | |
| task.v2.task.addMembers | Add task members | | | | | | | ✓ | |
| task.v2.task.addReminders | Add task reminders | | | | | | | ✓ | |
| calendar.v4.calendarEvent.create | Create calendar event | | | | | | | | ✓ |
| calendar.v4.calendarEvent.patch | Modify calendar event | | | | | | | | ✓ |
| calendar.v4.calendarEvent.get | Get calendar event | | | | | | | | ✓ |
| calendar.v4.freebusy.list | Query free/busy status | | | | | | | | ✓ |
| calendar.v4.calendar.primary | Get primary calendar | | | | | | | | ✓ |

> **Note**: In the table, "✓" indicates the tool is included in that preset. Using `-t preset.xxx` will enable tools marked with "✓" in the corresponding column.

### Advanced Configuration

#### Command Line Parameters

**`lark-mcp login` Command Parameters**:

| Parameter | Short | Description | Example |
|------|------|------|------|
| `--app-id` | `-a` | Feishu/Lark application App ID | `-a cli_xxxx` |
| `--app-secret` | `-s` | Feishu/Lark application App Secret | `-s xxxx` |
| `--domain` | `-d` | Feishu/Lark API domain, default is https://open.feishu.cn | `-d https://open.larksuite.com` |
| `--host` |  | Host to listen, default is localhost | `--host localhost` |
| `--port` | `-p` | Port to listen, default is 3000 | `-p 3000` |
| `--scope` |  | Specify OAuth scope for user access token, default is all permissions granted to the app, separated by spaces or commas | `--scope offline_access docx:document` |

**`lark-mcp logout` Command Parameters**:

| Parameter | Short | Description | Example |
|------|------|------|------|
| `--app-id` | `-a` | Feishu/Lark application App ID, optional. If specified, only clears the token for this app; if not specified, clears tokens for all apps | `-a cli_xxxx` |

This command is used to clear locally stored user access tokens. If the `--app-id` parameter is specified, it only clears the user access token for that application; if not specified, it clears user access tokens for all applications.

**`lark-mcp mcp` Command Parameters**:

| Parameter | Short | Description | Example |
|------|------|------|------|
| `--app-id` | `-a` | Feishu/Lark application App ID | `-a cli_xxxx` |
| `--app-secret` | `-s` | Feishu/Lark application App Secret | `-s xxxx` |
| `--domain` | `-d` | Feishu/Lark API domain, default is https://open.feishu.cn | `-d https://open.larksuite.com` |
| `--tools` | `-t` | List of API tools to enable, separated by spaces or commas | `-t im.v1.message.create,im.v1.chat.create` |
| `--tool-name-case` | `-c` | Tool name format, options are snake, camel, dot, or kebab, default is snake | `-c camel` |
| `--language` | `-l` | Tools language, options are zh or en, default is en | `-l zh` |
| `--user-access-token` | `-u` | User access token for calling APIs as a user | `-u u-xxxx` |
| `--token-mode` |  | API token type, options are auto, tenant_access_token, or user_access_token, default is auto | `--token-mode user_access_token` |
| `--oauth` |  | Enable MCP Auth Server to get user_access_token and auto request user login when token expires (Beta) | `--oauth` |
| `--scope` |  | Specify OAuth scope for user access token, default is all permissions granted to the app, separated by spaces or commas | `--scope offline_access docx:document` |
| `--mode` | `-m` | Transport mode, options are stdio, streamable, or sse, default is stdio | `-m streamable` |
| `--host` |  | Listening host in SSE/Streamable mode, default is localhost | `--host 0.0.0.0` |
| `--port` | `-p` | Listening port in SSE/Streamable mode, default is 3000 | `-p 3000` |
| `--config` |  | Configuration file path, supports JSON format | `--config ./config.json` |
| `--version` | `-V` | Display version number | `-V` |
| `--help` | `-h` | Display help information | `-h` |

#### Parameter Usage Examples

1. **Basic Usage**:

   ```bash
   # Start with default settings and auto request user login when token expires (recommended for local scenarios)
   lark-mcp mcp -a cli_xxxx -s yyyyy --oauth

   # Start with default settings
   lark-mcp mcp -a cli_xxxx -s yyyyy
   ```

2. **Using User Identity**:

   If you need to access APIs with user identity, you need to first use the login command to log in. For details, refer to "Using OAuth Login to Get User Access Token":

   ```bash

   # Login and get user access token
   lark-mcp login -a cli_xxxx -s yyyyy
   ```

   You can also manually pass user_access_token using -u:

   ```bash
   lark-mcp mcp -a cli_xxxx -s yyyyy -u u-zzzz
   ```

    > **Note**: User access tokens can be obtained through the [Feishu Open Platform's authorization process](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/authentication-management/access-token/get-user-access-token), or you can use the API debugging console to obtain them. After using a user access token, API calls will be made with that user's identity.

3. **Using OAuth Login to Get User Access Token**:
   ```bash
   # Login and get user access token
   lark-mcp login -a cli_xxxx -s yyyyy
   
   # Specify OAuth scope
   lark-mcp login -a cli_xxxx -s yyyyy --scope offline_access
   
   # Specify domain for OAuth authentication
   lark-mcp login -a cli_xxxx -s yyyyy -d https://open.larksuite.com
   ```

   > **Note**: Using the `login` command will start a local OAuth server and open a browser to complete authorization. The user access token will be automatically obtained and stored securely locally for automatic use in subsequent startups.

4. **Logout and Clear Stored Token**:
   ```bash
   # Clear locally stored user access token
   lark-mcp logout
   ```
   > **Note**: The `logout` command will clear the locally stored user access token. If there is no stored token currently, a corresponding message will be displayed.

5. **Setting Specific Token Mode**:
   ```bash
   lark-mcp mcp -a cli_xxxx -s yyyyy --token-mode user_access_token
   ```
   
   > **Note**: This option allows you to explicitly specify which token type to use when calling APIs. The `auto` mode (default) will be determined by the LLM when calling the API.

6. **Specifying Lark or KA Domains**:
    ```bash
    # Lark international version
    lark-mcp mcp -a <your_app_id> -s <your_app_secret> -d https://open.larksuite.com

    # Custom domain (KA domain)
    lark-mcp mcp -a <your_app_id> -s <your_app_secret> -d https://open.your-ka-domain.com
    ```

7. **Enabling Only Specific API Tools or Other API Tools**:
   ```bash
   lark-mcp mcp -a cli_xxxx -s yyyyy -t im.v1.chat.create,im.v1.message.create
   ```

   > **Note**: The `-t` parameter supports the following preset tool collections:
   > - `preset.light` - Lightweight tool set with fewer but commonly used tools, suitable for scenarios that require reduced token usage
   > - `preset.default` - Default tool set containing all preset tools
   > - `preset.im.default` - Instant messaging related tools, such as group management, message sending, etc.
   > - `preset.base.default` - Base related tools, such as table creation, record management, etc.
   > - `preset.base.batch` - Base batch operation tools, including batch create and update record functions
   > - `preset.doc.default` - Document related tools, such as document content reading, permission management, etc.
   > - `preset.task.default` - Task management related tools, such as task creation, member management, etc.
   > - `preset.calendar.default` - Calendar event management tools, such as creating calendar events, querying free/busy status, etc.

8. **Setting Tools Language to Chinese**:
   ```bash
   lark-mcp mcp -a cli_xxxx -s yyyyy -l zh
   ```
   
   > **Note**: Setting the language to Chinese (`-l zh`) may consume more tokens. If you encounter token limit issues when integrating with large language models, consider using the default English setting (`-l en`).

9. **Setting Tool Name Format to Camel Case**:
   ```bash
   lark-mcp mcp -a cli_xxxx -s yyyyy -c camel
   ```
   
   > **Note**: By setting the tool name format, you can change how tool names appear in the MCP. For example, `im.v1.message.create` in different formats:
   > - snake format (default): `im_v1_message_create`
   > - camel format: `imV1MessageCreate`
   > - kebab format: `im-v1-message-create`
   > - dot format: `im.v1.message.create`

10. **Using Environment Variables Instead of Command Line Parameters**:
   ```bash
   # Set environment variables
   export APP_ID=cli_xxxx
   export APP_SECRET=yyyyy
   export USER_ACCESS_TOKEN=zzzzz
   export LARK_TOOLS=a.b.c,a.c.d
   export LARK_DOMAIN=https://open.feishu.cn
   export LARK_TOKEN_MODE=user_access_token
   
   # Start the service (no need to specify -a and -s parameters)
   lark-mcp mcp
   ```

11. **Using Configuration File**:

    Besides command line parameters, you can also use a JSON format configuration file to set parameters:

    ```bash
    lark-mcp mcp --config ./config.json
    ```

    Configuration file example (config.json):

    ```json
    {
      "appId": "cli_xxxx",
      "appSecret": "xxxx",
      "domain": "https://open.feishu.cn",
      "tools": ["im.v1.message.create","im.v1.chat.create"],
      "toolNameCase": "snake",
      "language": "zh",
      "userAccessToken": "",
      "tokenMode": "auto",
      "mode": "stdio",
      "host": "localhost",
      "port": "3000",
      "oauth": true,
      "scope": "offline_access docx:document"
    }
    ```

    > **Note**: Command line parameters have higher priority than configuration file. When using both command line parameters and configuration file, command line parameters will override corresponding settings in the configuration file.

12. **Transport Modes**:

    lark-mcp supports three transport modes:

    1. **stdio mode (Default/Recommended)**: Suitable for integration with AI tools like Trae/Cursor or Claude, communicating through standard input/output streams.
      ```bash
      lark-mcp mcp -a <your_app_id> -s <your_app_secret> -m stdio
      ```

    2. **SSE mode**: Provides an HTTP interface based on Server-Sent Events, suitable for scenarios where local execution is not possible.
      
      ```bash
      # Default listens only on localhost
      lark-mcp mcp -a <your_app_id> -s <your_app_secret> -m sse -p 3000
      
      # Listen on all network interfaces (allowing remote access)
      lark-mcp mcp -a <your_app_id> -s <your_app_secret> -m sse --host 0.0.0.0 -p 3000
      ```
      
      After startup, the SSE endpoint will be accessible at `http://<host>:<port>/sse`.

    3. **streamable mode**: Provides StreamableHTTP-based interface
      
      ```bash
      # Start streamable mode
      lark-mcp mcp -a <your_app_id> -s <your_app_secret> -m streamable --host 0.0.0.0 -p 3000
      ```

## FAQ

- **Issue**: Unable to connect to Feishu/Lark API
  **Solution**: Check your network connection and ensure your APP_ID and APP_SECRET are correct. Verify that you can access the Feishu/Lark Open Platform API; you may need to configure a proxy.

- **Issue**: Error when using user_access_token
  **Solution**: Check if the token has expired. user_access_token usually has a validity period of 2 hours and needs to be refreshed periodically. You can implement an automatic token refresh mechanism.

- **Issue**: Unable to call certain APIs after starting the MCP service, with insufficient permissions errors
  **Solution**: Check if your application has obtained the corresponding API permissions. Some APIs require additional high-level permissions, which can be configured in the [Developer Console](https://open.feishu.cn/app). Ensure that permissions have been approved.

- **Issue**: Image or file upload/download related API calls fail
  **Solution**: The current version does not support file and image upload/download functionality. These APIs will be supported in future versions.

- **Issue**: Command line displays garbled characters in Windows environment
  **Solution**: Change the command line encoding to UTF-8 by executing `chcp 65001` in the command prompt. If using PowerShell, you may need to change the terminal font or PowerShell configuration.

- **Issue**: Permission errors during installation
  **Solution**: On macOS/Linux, use `sudo npm install -g @larksuiteoapi/lark-mcp` for installation, or modify the permissions of the npm global installation path. Windows users can try running the command prompt as administrator.

- **Issue**: Token limit exceeded after starting the MCP service
  **Solution**: Try using `-t` to reduce the number of enabled APIs, or use a model that supports larger tokens (such as claude3.7).

- **Issue**: Unable to connect or receive messages in SSE mode
  **Solution**: Check if the port is already in use and try changing to a different port. Ensure that the client is correctly connected to the SSE endpoint and is handling the event stream.

## Related Links

- [Feishu Open Platform](https://open.feishu.cn/)
- [Development Documentation: OpenAPI MCP](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mcp_integration/mcp_introduction)
- [Lark International Open Platform](https://open.larksuite.com/)
- [Feishu Open Platform API Documentation](https://open.feishu.cn/document/home/index)
- [Node.js Website](https://nodejs.org/)
- [npm Documentation](https://docs.npmjs.com/)

## Feedback

Issues are welcome to help improve this tool. If you have any questions or suggestions, please raise them in the GitHub repository. 