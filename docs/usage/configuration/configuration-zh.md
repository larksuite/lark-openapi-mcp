# Lark MCP 使用指南

本文档详细介绍 lark-mcp 工具的高级配置选项，按照不同的使用场景来介绍配置方法。

## 目录

- [📋 使用准备](#-使用准备)
- [🚀 基础使用](#-基础使用)
- [👤 使用用户身份](#-使用用户身份)  
- [🌐 服务化部署](#-服务化部署)
- [⚙️ 高级配置选项](#️-高级配置选项)
- [📝 配置参数详解](#-配置参数详解)


## 📋 使用准备

### 创建应用

在使用lark-mcp工具前，您需要先创建一个飞书应用：

1. 访问[飞书开放平台](https://open.feishu.cn/)并登录
2. 点击"开发者后台"，创建一个新应用
3. 获取应用的App ID和App Secret，这将用于API认证
4. 根据您的使用场景，为应用添加所需的权限
5. 如需以用户身份调用API，请设置OAuth 2.0重定向URL为 http://localhost:3000/callback

详细的应用创建和配置指南，请参考[飞书开放平台文档 - 创建应用](https://open.feishu.cn/document/home/introduction-to-custom-app-development/self-built-application-development-process#a0a7f6b0)。

### 安装Node.js

在使用lark-mcp工具之前，您需要先安装Node.js环境。

**使用官方安装包（推荐）**：

1. 访问[Node.js官网](https://nodejs.org/)
2. 下载并安装LTS版本
3. 安装完成后，打开终端验证：

```bash
node -v
npm -v
```

## 🚀 基础使用

适用于大多数个人用户，使用应用身份访问 API，配置简单，开箱即用。

### 安装方式

**方式一：通过安装按钮**

点击对应的按钮，在弹出窗口中填入你的 App ID 和 App Secret：

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-light.svg)](https://cursor.com/install-mcp?name=lark-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBsYXJrc3VpdGVvYXBpL2xhcmstbWNwIiwibWNwIiwiLWEiLCJ5b3VyX2FwcF9pZCIsIi1zIiwieW91cl9hcHBfc2VjcmV0Il19)
[![Install MCP Server](../../../assets/trae-cn.svg)](trae-cn://trae.ai-ide/mcp-import?source=lark&type=stdio&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBsYXJrc3VpdGVvYXBpL2xhcmstbWNwIiwibWNwIiwiLWEiLCJ5b3VyX2FwcF9pZCIsIi1zIiwieW91cl9hcHBfc2VjcmV0Il19)  [![Install MCP Server](../../../assets/trae.svg)](trae://trae.ai-ide/mcp-import?source=lark&type=stdio&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBsYXJrc3VpdGVvYXBpL2xhcmstbWNwIiwibWNwIiwiLWEiLCJ5b3VyX2FwcF9pZCIsIi1zIiwieW91cl9hcHBfc2VjcmV0Il19)


**方式二：手动配置 JSON**

在 MCP 客户端的配置文件中添加以下内容：

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

### 特点说明

- ✅ **配置简单**：只需要提供 App ID 和 App Secret
- ✅ **应用身份**：使用应用身份调用 API，适合大部分场景
- ✅ **自动管理**：MCP 客户端自动启动和管理服务进程

> 💡 **提示**：此配置使用默认的 stdio 传输模式和应用身份，适合个人使用和大部分 API 调用场景。

## 👤 使用用户身份

当你需要访问用户的个人数据（如个人文档、发送消息给他人等）时，需要使用用户身份而不是应用身份。

### 使用场景

- 📄 读取用户的个人文档
- 💬 以用户身份发送消息
- 📅 访问用户的日历数据
- 👥 获取用户的联系人信息

### 配置步骤

**第1步：在终端进行用户登录**

首先需要在命令行中进行 OAuth 认证，获取用户令牌：

```bash
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s your_secret
```

这个命令会：
- 启动本地服务器（默认 `http://localhost:3000/callback`）
- 打开浏览器进行授权
- 保存用户令牌到本地

> ⚠️ **注意**：需要在飞书开放平台后台配置重定向 URL 为 `http://localhost:3000/callback`

**第2步：在 MCP 客户端配置中启用 OAuth**

登录完成后，在 MCP 客户端配置中添加 OAuth 相关参数：

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

### 特点说明

- ✅ **用户身份**：以用户身份调用 API，可访问用户私有数据

> 💡 **提示**：建议显式设置 `--token-mode user_access_token`，确保始终使用用户身份调用 API。

## 🌐 服务化部署（Alpha）

适用于团队使用、多客户端共享或服务器部署的场景，使用 streamable 模式提供 HTTP 接口。

### 使用场景

- 🏢 团队多人共享同一个 lark-mcp 服务
- ☁️ 云服务器部署，远程访问

### 配置步骤

**第1步：在服务器启动 HTTP 服务**

```bash
# 基础启动命令
npx -y @larksuiteoapi/lark-mcp mcp \
  -a cli_xxxx \
  -s your_secret \
  -m streamable \
  --host 0.0.0.0 \
  -p 3000
```



**第2步：在 MCP 客户端配置 URL**

服务器启动后，在各个 MCP 客户端中配置连接 URL：

```json
{
  "mcpServers": {
    "lark-mcp": {
       "url": "http://localhost:3000/mcp"
    }
  }
}
```

> 💡 **提示**：streamable 服务器启动后会持续运行，建议使用进程管理器（如 PM2）来确保服务稳定性。

### 复用 `login` 保存的单用户身份

如果所有客户端都应以同一个预登录用户身份调用 API，可先执行 `lark-mcp login`，再使用以下命令启动服务：

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

服务会动态读取本地登录令牌，并在 access token 过期时使用保存的 refresh token 自动续期。该模式不能与 `--oauth` 或 `--user-access-token` 同时使用。若监听非回环地址，请在反向代理或网络层增加访问控制，因为所有调用都会共享该用户身份。

自动续期要求应用已开通 `offline_access` 用户权限。未指定 `--scope` 时，该权限会和应用已开通的其他用户权限一起继承；修改应用权限后需要重新执行 `login`。

### 启用 OAuth 用户身份认证

当需要在服务化部署中使用用户身份调用 API 时，可以启用 OAuth 认证功能。

> ⚠️ **重要提示**：开启 MCP OAuth 需要客户端支持 OAuth 认证功能。请确保您的 MCP 客户端版本支持此功能。

**启动带 OAuth 的 streamable 服务：**

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

> ⚠️ **OAuth 限制**：当前带 OAuth 的 streamable 服务只支持 localhost，暂时不能广播给其他用户使用。

**MCP 客户端配置保持不变：**

```json
{
  "mcpServers": {
    "lark-mcp": {
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

## ⚙️ 高级配置选项

本节介绍更高级的配置方法，包括环境变量、配置文件等。

### 环境变量配置

使用环境变量可以避免在配置文件中暴露敏感信息，特别适合服务器部署：

**设置环境变量：**

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

**简化 MCP 客户端配置：**

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

> 💡 **提示**：系统会自动读取 `APP_ID` 和 `APP_SECRET` 环境变量，无需在 args 中重复指定。

### 配置文件使用

对于复杂配置，可以使用 JSON 配置文件：

**1. 创建配置文件 (config.json)：**

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

**2. 在 MCP 客户端中引用配置文件：**

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

## 📝 配置参数详解

### 支持的环境变量

| 环境变量名 | 命令行参数 | 描述 | 示例值 |
|-----------|------------|------|--------|
| `APP_ID` | `-a, --app-id` | 飞书/Lark应用的App ID | `cli_xxxx` |
| `APP_SECRET` | `-s, --app-secret` | 飞书/Lark应用的App Secret | `your_secret` |
| `USER_ACCESS_TOKEN` | `-u, --user-access-token` | 用户访问令牌 | `u-zzzzz` |
| `LARK_TOOLS` | `-t, --tools` | 启用的API工具列表 | `im.v1.message.create,calendar.v4.calendar.list` |
| `LARK_DOMAIN` | `-d, --domain` | API域名 | `https://open.feishu.cn` |
| `LARK_TOKEN_MODE` | `--token-mode` | 令牌模式 | `auto` |

> ⚠️ **注意**：其他参数（如 `-l`, `-c`, `-m`, `--host`, `-p`, `--oauth` 等）不支持环境变量，只能通过命令行参数指定。

### 配置文件字段

| 字段名 | 类型 | 描述 | 默认值 |
|--------|------|------|--------|
| `appId` | string | 应用ID | 必填 |
| `appSecret` | string | 应用密钥 | 必填 |
| `domain` | string | API域名 | `https://open.feishu.cn` |
| `tools` | array | 启用的工具列表 | `["preset.default"]` |
| `toolNameCase` | string | 工具命名格式 | `snake` |
| `language` | string | 工具语言 | `zh` |
| `userAccessToken` | string | 用户访问令牌 | `""` |
| `tokenMode` | string | 令牌模式 | `auto` |
| `mode` | string | 传输模式（默认：stdio） | `stdio` |
| `host` | string | 监听主机 | `localhost` |
| `port` | string/number | 监听端口 | `3000` |
| `oauth` | boolean | 启用OAuth | `false` |
| `credentialSource` | string | Streamable 模式下复用本地登录凭据，可选值为 login | - |
| `scope` | string | OAuth权限范围 | `""` |

### 配置优先级

配置参数的优先级从高到低为：

1. **命令行参数** - 最高优先级
2. **环境变量** - 中等优先级  
3. **配置文件** - 最低优先级
4. **默认值** - 兜底值

## 容器化部署 (Alpha)

详细信息请参考：[Docker 使用指南](../docker/docker-zh.md)

## 更多信息

- [主要文档](../../../README_ZH.md)
- [工具列表](../../reference/tool-presets/tools-zh.md)
- [常见问题](../../troubleshooting/faq-zh.md)
