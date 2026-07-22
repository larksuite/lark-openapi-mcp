# 命令行参考

本文档提供了 lark-mcp 工具所有命令行参数的详细说明。

## 目录

- [lark-mcp login](#lark-mcp-login)
- [lark-mcp logout](#lark-mcp-logout)  
- [lark-mcp mcp](#lark-mcp-mcp)

## lark-mcp login

`lark-mcp login` 命令用于进行用户身份认证，获取用户访问令牌以访问用户的个人数据。

### 参数说明

| 参数 | 简写 | 描述 | 示例 |
|------|------|------|------|
| `--app-id` | `-a` | 飞书/Lark应用的App ID | `-a cli_xxxx` |
| `--app-secret` | `-s` | 飞书/Lark应用的App Secret | `-s xxxx` |
| `--domain` | `-d` | 飞书/Lark API域名，默认为https://open.feishu.cn | `-d https://open.larksuite.com` |
| `--host` |  | 监听主机，默认为localhost | `--host localhost` |
| `--port` | `-p` | 监听端口，默认为3000 | `-p 3000` |
| `--scope` |  | 指定用户访问令牌的 OAuth 权限范围，默认为应用已开通且支持用户身份的全部权限，用空格或者逗号分割 | `--scope offline_access docx:document` |

### 使用示例

```bash
# 基础登录
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s your_secret

# 指定特定的OAuth权限范围登录
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s your_secret --scope offline_access docx:document

# 使用自定义域名登录（适用于Lark国际版）
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s your_secret -d https://open.larksuite.com
```

## lark-mcp logout

`lark-mcp logout` 命令用于清除本地存储的用户访问令牌。

### 参数说明

| 参数 | 简写 | 描述 | 示例 |
|------|------|------|------|
| `--app-id` | `-a` | 飞书/Lark应用的App ID，可选。指定则只清除该应用的令牌，不指定则清除所有应用的令牌 | `-a cli_xxxx` |

### 功能说明

此命令用于清除本地存储的用户访问令牌。如果指定了 `--app-id` 参数，则只清除该应用的用户访问令牌；如果不指定，则清除所有应用的用户访问令牌。

### 使用示例

```bash
# 清除特定应用的令牌
npx -y @larksuiteoapi/lark-mcp logout -a cli_xxxx

# 清除所有应用的令牌
npx -y @larksuiteoapi/lark-mcp logout
```

## lark-mcp mcp

`lark-mcp mcp` 工具提供了多种命令行参数，以便您灵活配置MCP服务。

### 参数说明

| 参数 | 简写 | 描述 | 示例 |
|------|------|------|------|
| `--app-id` | `-a` | 飞书/Lark应用的App ID | `-a cli_xxxx` |
| `--app-secret` | `-s` | 飞书/Lark应用的App Secret | `-s xxxx` |
| `--domain` | `-d` | 飞书/Lark API域名，默认为https://open.feishu.cn | `-d https://open.larksuite.com` |
| `--tools` | `-t` | 需要启用的API工具列表，用空格或者逗号分割 | `-t im.v1.message.create,im.v1.chat.create` |
| `--tool-name-case` | `-c` | 工具注册名称的命名格式，可选值为snake、camel、dot或kebab，默认为snake | `-c camel` |
| `--language` | `-l` | 工具语言，可选值为zh或en，默认为en | `-l zh` |
| `--user-access-token` | `-u` | 用户访问令牌，用于以用户身份调用API | `-u u-xxxx` |
| `--credential-source` |  | 用户凭据来源；Streamable 模式可设为 login，以复用 `lark-mcp login` 保存的令牌 | `--credential-source login` |
| `--token-mode` |  | API令牌类型，可选值为auto、tenant_access_token或user_access_token，默认为auto | `--token-mode user_access_token` |
| `--oauth` |  | 开启 MCP Auth Server 获取user_access_token，且当Token失效时自动要求用户重新登录(Beta) | `--oauth` |
| `--scope` |  | 指定用户访问令牌的 OAuth 权限范围，默认为应用已开通且支持用户身份的全部权限，用空格或者逗号分割 | `--scope offline_access docx:document` |
| `--mode` | `-m` | 传输模式，可选值为stdio、streamable或sse，默认为stdio | `-m streamable` |
| `--host` |  | SSE\Streamable模式下的监听主机，默认为localhost | `--host 0.0.0.0` |
| `--port` | `-p` | SSE\Streamable模式下的监听端口，默认为3000 | `-p 3000` |
| `--config` |  | 配置文件路径，支持JSON格式 | `--config ./config.json` |
| `--version` | `-V` | 显示版本号 | `-V` |
| `--help` | `-h` | 显示帮助信息 | `-h` |

`--credential-source login` 仅支持 Streamable 模式，并且不能与 `--oauth` 或 `--user-access-token` 同时使用。

## 相关文档

- [配置指南](../../usage/configuration/configuration-zh.md)
- [工具参考](../tool-presets/tools-zh.md)
- [故障排除](../../troubleshooting/faq-zh.md)
