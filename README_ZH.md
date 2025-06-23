# 飞书/Lark OpenAPI MCP

[![npm version](https://img.shields.io/npm/v/@larksuiteoapi/lark-mcp.svg)](https://www.npmjs.com/package/@larksuiteoapi/lark-mcp)
[![npm downloads](https://img.shields.io/npm/dm/@larksuiteoapi/lark-mcp.svg)](https://www.npmjs.com/package/@larksuiteoapi/lark-mcp)
[![Node.js Version](https://img.shields.io/node/v/@larksuiteoapi/lark-mcp.svg)](https://nodejs.org/)

中文 | [English](./README.md)

[开发文档检索 MCP](./README_RECALL_ZH.md) | [官方文档](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mcp_integration/mcp_introduction)

> **⚠️ Beta版本提示**：当前工具处于Beta版本阶段，功能和API可能会有变更，请密切关注版本更新。

这是飞书/Lark官方 OpenAPI MCP（Model Context Protocol）工具，旨在帮助用户快速连接飞书平台并实现 AI Agent 与飞书的高效协作。该工具将飞书开放平台的 API 接口封装为 MCP 工具，使 AI 助手能够直接调用这些接口，实现文档处理、会话管理、日历安排等多种自动化场景。

## 特点

- **完整的飞书 API 工具集：** 封装了几乎全部飞书/Lark API 接口，包括消息管理、群组管理、文档操作、日历事件、多维表格等核心功能区域。
- **双重身份验证支持：**
  - 支持应用访问令牌（App Access Token）身份验证
  - 支持用户访问令牌（User Access Token）身份验证
- **灵活的通信协议：**
  - 支持标准输入输出流（stdio）模式，适合与 Trae/Cursor/Claude 等 AI 工具集成
  - 支持 StreamableHTTP/SSE 模式，提供基于 HTTP 的接口

- 支持多种配置方式，适应不同的使用场景

## 工具列表

所有支持的飞书/Lark工具列表可以在[tools.md](./docs/tools-zh.md)中查看，文档按项目和版本分类列出了所有可用工具及其描述。

## 使用准备

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
    
## 使用指南

### 在Trae/Cursor/Claude中使用

如需在Trae、Cursor或Claude等AI工具中集成飞书/Lark功能，可以在配置文件中添加以下内容：

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

如需使用**用户身份**访问API，需要先在终端执行 login 登录，注意需要先在开发者后台配置应用的重定向URL，默认是 http://localhost:3000/callback

```bash

# 登录并获取用户访问令牌
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s yyyyy
   
# 或者登录并指定OAuth权限范围，不填写默认授权全部的权限
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s yyyyy --scope offline_access docx:document

```

然后在配置文件中添加以下内容：

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

也可以通过 -u 直接添加用户访问令牌（2小时过期）：

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


### 自定义配置开启API

默认情况下，MCP服务启用常用API，如需启用其他工具或仅启用特定API或者preset，可以通过 `-t` 参数指定（用逗号分隔）：

```bash
lark-mcp mcp -a <your_app_id> -s <your_app_secret> -t im.v1.message.create,im.v1.message.list,im.v1.chat.create,preset.calendar.default
```

#### 预设工具集（Preset）详细说明

下表详细列出了每个API工具所属的预设工具集，便于您根据实际需求选择合适的preset：

| 工具名称 | 功能描述 | preset.light | preset.default (默认) | preset.im.default | preset.base.default | preset.base.batch | preset.doc.default | preset.task.default | preset.calendar.default |
| --- | --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| im.v1.chat.create | 创建群 | | ✓ | ✓ | | | | | |
| im.v1.chat.list | 获取群列表 | | ✓ | ✓ | | | | | |
| im.v1.chat.search | 搜索群 | ✓ | | | | | | | |
| im.v1.chatMembers.get | 获取群成员 | | ✓ | ✓ | | | | | |
| im.v1.message.create | 发送消息 | ✓ | ✓ | ✓ | | | | | |
| im.v1.message.list | 获取消息列表 | ✓ | ✓ | ✓ | | | | | |
| bitable.v1.app.create | 创建多维表格 | | ✓ | | ✓ | ✓ | | | |
| bitable.v1.appTable.create | 创建多维表格数据表 | | ✓ | | ✓ | ✓ | | | |
| bitable.v1.appTable.list | 获取多维表格数据表列表 | | ✓ | | ✓ | ✓ | | | |
| bitable.v1.appTableField.list | 获取多维表格数据表字段列表 | | ✓ | | ✓ | ✓ | | | |
| bitable.v1.appTableRecord.search | 搜索多维表格数据表记录 | ✓ | ✓ | | ✓ | ✓ | | | |
| bitable.v1.appTableRecord.create | 创建多维表格数据表记录 | | ✓ | | ✓ | | | | |
| bitable.v1.appTableRecord.batchCreate | 批量创建多维表格数据表记录 | ✓ | | | | ✓ | | | |
| bitable.v1.appTableRecord.update | 更新多维表格数据表记录 | | ✓ | | ✓ | | | | |
| bitable.v1.appTableRecord.batchUpdate | 批量更新多维表格数据表记录 | | | | | ✓ | | | |
| docx.v1.document.rawContent | 获取文档内容 | ✓ | ✓ | | | | ✓ | | |
| docx.builtin.import | 导入文档 | ✓ | ✓ | | | | ✓ | | |
| docx.builtin.search | 搜索文档 | ✓ | ✓ | | | | ✓ | | |
| drive.v1.permissionMember.create | 添加协作者权限 | | ✓ | | | | ✓ | | |
| wiki.v2.space.getNode | 获取知识库节点 | ✓ | ✓ | | | | ✓ | | |
| wiki.v1.node.search | 搜索知识库节点 | | ✓ | | | | ✓ | | |
| contact.v3.user.batchGetId | 批量获取用户ID | ✓ | ✓ | | | | | | |
| task.v2.task.create | 创建任务 | | | | | | | ✓ | |
| task.v2.task.patch | 修改任务 | | | | | | | ✓ | |
| task.v2.task.addMembers | 添加任务成员 | | | | | | | ✓ | |
| task.v2.task.addReminders | 添加任务提醒 | | | | | | | ✓ | |
| calendar.v4.calendarEvent.create | 创建日历事件 | | | | | | | | ✓ |
| calendar.v4.calendarEvent.patch | 修改日历事件 | | | | | | | | ✓ |
| calendar.v4.calendarEvent.get | 获取日历事件 | | | | | | | | ✓ |
| calendar.v4.freebusy.list | 查询忙闲状态 | | | | | | | | ✓ |
| calendar.v4.calendar.primary | 获取主日历 | | | | | | | | ✓ |

> **说明**：表格中"✓"表示该工具包含在对应的预设工具集中。使用`-t preset.xxx`参数时，会启用该列标有"✓"的工具。


### 高级配置

#### 命令行参数说明

**`lark-mcp login` 命令参数**：

| 参数 | 简写 | 描述 | 示例 |
|------|------|------|------|
| `--app-id` | `-a` | 飞书/Lark应用的App ID | `-a cli_xxxx` |
| `--app-secret` | `-s` | 飞书/Lark应用的App Secret | `-s xxxx` |
| `--domain` | `-d` | 飞书/Lark API域名，默认为https://open.feishu.cn | `-d https://open.larksuite.com` |
| `--host` |  | 监听主机，默认为localhost | `--host localhost` |
| `--port` | `-p` | 监听端口，默认为3000 | `-p 3000` |
| `--scope` |  | 指定授权用户访问令牌的OAuth权限范围，默认为应用开通的全部权限，用空格或者逗号分割 | `--scope offline_access docx:document` |

**`lark-mcp logout` 命令参数**：

| 参数 | 简写 | 描述 | 示例 |
|------|------|------|------|
| `--app-id` | `-a` | 飞书/Lark应用的App ID，可选。指定则只清除该应用的令牌，不指定则清除所有应用的令牌 | `-a cli_xxxx` |

此命令用于清除本地存储的用户访问令牌。如果指定了 `--app-id` 参数，则只清除该应用的用户访问令牌；如果不指定，则清除所有应用的用户访问令牌。

`lark-mcp mcp`工具提供了多种命令行参数，以便您灵活配置MCP服务：

**`lark-mcp mcp` 命令参数**：

| 参数 | 简写 | 描述 | 示例 |
|------|------|------|------|
| `--app-id` | `-a` | 飞书/Lark应用的App ID | `-a cli_xxxx` |
| `--app-secret` | `-s` | 飞书/Lark应用的App Secret | `-s xxxx` |
| `--domain` | `-d` | 飞书/Lark API域名，默认为https://open.feishu.cn | `-d https://open.larksuite.com` |
| `--tools` | `-t` | 需要启用的API工具列表，用空格或者逗号分割 | `-t im.v1.message.create,im.v1.chat.create` |
| `--tool-name-case` | `-c` | 工具注册名称的命名格式，可选值为snake、camel、dot或kebab，默认为snake | `-c camel` |
| `--language` | `-l` | 工具语言，可选值为zh或en，默认为en | `-l zh` |
| `--user-access-token` | `-u` | 用户访问令牌，用于以用户身份调用API | `-u u-xxxx` |
| `--token-mode` |  | API令牌类型，可选值为auto、tenant_access_token或user_access_token，默认为auto | `--token-mode user_access_token` |
| `--oauth` |  | 开启 MCP Auth Server 获取user_access_token，且当Token失效时自动要求用户重新登录(Beta) | `--oauth` |
| `--scope` |  | 指定授权用户访问令牌的OAuth权限范围，默认为应用开通的全部权限，用空格或者逗号分割 | `--scope offline_access docx:document` |
| `--mode` | `-m` | 传输模式，可选值为stdio、streamable或sse，默认为stdio | `-m streamable` |
| `--host` |  | SSE\Streamable模式下的监听主机，默认为localhost | `--host 0.0.0.0` |
| `--port` | `-p` | SSE\Streamable模式下的监听端口，默认为3000 | `-p 3000` |
| `--config` |  | 配置文件路径，支持JSON格式 | `--config ./config.json` |
| `--version` | `-V` | 显示版本号 | `-V` |
| `--help` | `-h` | 显示帮助信息 | `-h` |


#### 参数使用示例

1. **基本用法**：

   ```bash
   # 以默认方式启动，并当Token失效时自动要求用户重新登录(推荐在本地场景使用)
   lark-mcp mcp -a cli_xxxx -s yyyyy --oauth

    # 以默认方式启动
   lark-mcp mcp -a cli_xxxx -s yyyyy
   ```

2. **使用用户身份**：

   如需使用用户身份访问API，您需要先使用 login 命令登录，详细可以参考“使用OAuth登录获取用户访问令牌”：

   ```bash

   # 登录并获取用户访问令牌
   lark-mcp login -a cli_xxxx -s yyyyy
   ```

   您也可以使用-u手动传递user_access_token

   ```bash
   lark-mcp mcp -a cli_xxxx -s yyyyy -u u-zzzz
   ```

    > **说明**：用户访问令牌可以通过[飞书开放平台的授权流程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/authentication-management/access-token/get-user-access-token)获取，你也可以使用API调试台获取。使用用户访问令牌后，API调用将以该用户的身份进行。

3. **使用OAuth登录获取用户访问令牌**：
   ```bash
   # 登录并获取用户访问令牌
   lark-mcp login -a cli_xxxx -s yyyyy
   
   # 指定OAuth权限范围
   lark-mcp login -a cli_xxxx -s yyyyy --scope offline_access
   
   # 指定域名进行OAuth认证
   lark-mcp login -a cli_xxxx -s yyyyy -d https://open.larksuite.com
   ```

   > **说明**：使用 `login` 命令会启动本地OAuth服务器，打开浏览器完成授权后自动获取并保存用户访问令牌。令牌将被安全存储在本地，后续启动时自动使用。

4. **登出并清除存储的令牌**：
   ```bash
   # 清除本地存储的用户访问令牌
   lark-mcp logout
   ```
   > **说明**：`logout` 命令会清除本地存储的用户访问令牌。如果当前没有存储的令牌，会显示相应提示信息。

5. **设置特定的令牌模式**：
   ```bash
   lark-mcp mcp -a cli_xxxx -s yyyyy --token-mode user_access_token
   ```
   
   > **说明**：此选项允许您明确指定调用API时使用的令牌类型。`auto`模式（默认）将会由LLM在调用API的时候判断  

6. **指定Lark或KA域名**：
    ```bash
    # Lark国际版
    lark-mcp mcp -a <your_app_id> -s <your_app_secret> -d https://open.larksuite.com

    # 自定义域名（KA域名）
    lark-mcp mcp -a <your_app_id> -s <your_app_secret> -d https://open.your-ka-domain.com
    ```

7. **只启用特定API工具或者其他API工具**：
   ```bash
   lark-mcp mcp -a cli_xxxx -s yyyyy -t im.v1.chat.create,im.v1.message.create
   ```

   > **说明**：`-t`参数支持以下预设工具集：
   > - `preset.light` - 轻量级工具集，包含常用但数量较少的工具，适合减少token使用量的场景
   > - `preset.default` - 默认工具集，包含所有预设工具
   > - `preset.im.default` - 即时消息相关工具，如群组管理、消息发送等
   > - `preset.base.default` - 多维表格相关工具，如表格创建、记录管理等
   > - `preset.base.batch` - 多维表格批量操作工具，包含批量创建和更新记录功能
   > - `preset.doc.default` - 文档相关工具，如文档内容读取、权限管理等
   > - `preset.task.default` - 任务管理相关工具，如创建任务、添加成员等
   > - `preset.calendar.default` - 日历事件管理工具，如创建日历事件、查询忙闲状态等

8. **设置工具语言为中文**：
   ```bash
   lark-mcp mcp -a cli_xxxx -s yyyyy -l zh
   ```
   
   > **注意**：设置语言为中文(`-l zh`)可能会消耗更多的token，如果在与大模型集成时遇到token限制问题，可以考虑使用默认的英文(`-l en`)。

9. **设置工具名称格式为驼峰式**：
   ```bash
   lark-mcp mcp -a cli_xxxx -s yyyyy -c camel
   ```
   
   > **说明**：通过设置工具名称格式，可以改变工具在MCP中注册的调用名称格式。例如，`im.v1.message.create`在不同格式下的表现形式：
   > - snake格式(默认): `im_v1_message_create`
   > - camel格式: `imV1MessageCreate`
   > - kebab格式: `im-v1-message-create`
   > - dot格式: `im.v1.message.create`

10. **使用环境变量代替命令行参数**：
   ```bash
   # 设置环境变量
   export APP_ID=cli_xxxx
   export APP_SECRET=yyyyy
   export USER_ACCESS_TOKEN=zzzzz
   export LARK_TOOLS=a.b.c,a.c.d
   export LARK_DOMAIN=https://open.feishu.cn
   export LARK_TOKEN_MODE=user_access_token
   
   # 启动服务（无需指定-a和-s参数）
   lark-mcp mcp
   ```

11. **使用配置文件**：

    除了命令行参数外，您还可以使用JSON格式的配置文件来设置参数：

    ```bash
    lark-mcp mcp --config ./config.json
    ```

    配置文件示例（config.json）：

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

    > **说明**：命令行参数优先级高于配置文件。当同时使用命令行参数和配置文件时，命令行参数会覆盖配置文件中的对应设置。

12. **传输模式**：

    lark-mcp支持三种传输模式：

    1. **stdio模式（默认/推荐）**：适用于与Trae/Cursor或Claude等AI工具集成，通过标准输入输出流进行通信。
      ```bash
      lark-mcp mcp -a <your_app_id> -s <your_app_secret> -m stdio
      ```

    2. **SSE模式**：提供基于Server-Sent Events的HTTP接口，适用于不能在本地运行的场景
      
      ```bash
      # 默认只监听localhost
      lark-mcp mcp -a <your_app_id> -s <your_app_secret> -m sse -p 3000
      
      # 监听所有网络接口（允许远程访问）
      lark-mcp mcp -a <your_app_id> -s <your_app_secret> -m sse --host 0.0.0.0 -p 3000
      ```
      
      启动后，SSE端点将可在 `http://<host>:<port>/sse` 访问。

    3. **streamable模式**：提供基于StreamableHTTP的接口
      
      ```bash
      # 启动streamable模式
      lark-mcp mcp -a <your_app_id> -s <your_app_secret> -m streamable --host 0.0.0.0 -p 3000
      ```

## 常见问题

- **问题**: 无法连接到飞书/Lark API
  **解决方案**: 请检查您的网络连接，并确保APP_ID和APP_SECRET正确。检查是否能正常访问飞书开放平台API，可能需要配置代理。

- **问题**: 使用user_access_token报错
  **解决方案**: 检查token是否过期，user_access_token有效期通常为2小时，需要定期刷新。您可以实现token自动刷新机制。

- **问题**: 启动MCP服务后无法调用某些API, 调用提示权限不足
  **解决方案**: 检查您的应用是否已获得相应API的权限，部分API需要额外申请高级权限, 可在[开发者后台](https://open.feishu.cn/app)中进行配置。确保权限已被审批通过。

- **问题**: 图片或文件上传/下载相关API调用失败
  **解决方案**: 当前版本暂不支持文件和图片的上传下载功能，此类API将在后续版本中支持。

- **问题**: Windows环境下命令行显示乱码
  **解决方案**: 将命令行编码更改为UTF-8，在命令提示符中执行`chcp 65001`。如使用PowerShell，可能需要更改终端字体或PowerShell配置。

- **问题**: 安装时遇到权限错误
  **解决方案**: 在macOS/Linux上使用`sudo npm install -g @larksuiteoapi/lark-mcp`进行安装，或修改npm全局安装路径的权限。Windows用户可尝试以管理员身份运行命令提示符。

- **问题**: 启动MCP服务后提示token超过上限
  **解决方案**: 尝试使用 -t 减少启用的API数量，或使用支持更大token的模型（如claude3.7）

- **问题**: SSE模式下无法连接或接收消息
  **解决方案**: 检查端口是否被占用，尝试更换端口。确保客户端正确连接到SSE端点并处理事件流。

## 相关链接

- [飞书开放平台](https://open.feishu.cn/)
- [开发文档：OpenAPI MCP](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mcp_integration/mcp_introduction)
- [Lark国际版开放平台](https://open.larksuite.com/)
- [飞书开放平台API文档](https://open.feishu.cn/document/home/index)
- [Node.js官网](https://nodejs.org/)
- [npm文档](https://docs.npmjs.com/)

## 反馈

欢迎提交Issues来帮助改进这个工具。如有问题或建议，请在GitHub仓库中提出。
