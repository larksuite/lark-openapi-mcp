# 0.4.0
Feat: 新增 StreamableHttp 的传输模式
Feat: StreamableHttp/SSE 支持 [MCP Auth](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization)
Feat: Stdio（本地） 模式支持 login 和 logout 命令登录登出和自动使用 refresh_token 刷新
Fix: 修复 TokenMode=Auto 模式下没有设置UserAccessToken且CallTool传递参数useUAT=true依然使用应用身份
Bump： 升级 @modelcontextprotocol/sdk 到 1.12.1
BREAK: 由于升级了 @modelcontextprotocol/sdk，最低兼容 Node 版本调整为 Node 20

Feat: Added StreamableHttp transport mode
Feat: StreamableHttp/SSE supports [MCP Auth](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization)
Feat: Stdio (local) mode supports login and logout commands for authentication and automatic refresh_token renewal
Fix: Fixed issue where TokenMode=Auto would still use app identity when UserAccessToken is not set but CallTool parameter useUAT=true
Bump: Upgraded @modelcontextprotocol/sdk to 1.12.1
BREAK: Due to @modelcontextprotocol/sdk upgrade, minimum compatible Node version is now Node 20


# 0.3.1
Fix: 修复使用 configFile 配置 mode 参数不生效的问题
Fix: 修复由于使用了z.record(z.any())类型的字段导致直接传给豆包模型无法使用的问题
Feat: 新增 preset.light 预设

Fix: Fix the problem that the mode parameter configured by configFile does not take effect
Fix: Fix the problem that the z.record(z.any()) type field is passed directly to the doubao model and cannot be used
Feat: Add preset.light preset

# 0.3.0

New: 开放平台开发文档检索 MCP，旨在帮助用户输入自身诉求后迅速检索到自己需要的开发文档，帮助开发者在AI IDE中编写与飞书集成的代码
New: 新增--token-mode，现在可以在启动的时候指定调用API的token类型，支持auto/tenant_access_token/user_access_token
New: -t 支持配置 preset.default preset.im.default preset.bitable.default preset.doc.default 等默认预设
Bump： 升级 @modelcontextprotocol/sdk 到 1.11.0

New：Retrieval of Open Platform Development Documents in MCP aims to enable users to quickly find the development documents they need after inputting their own requirements, and assist developers in writing code integrated with Feishu in the AI IDE.
New: Added --token-mode, now you can specify the API token type when starting, supporting auto/tenant_access_token/user_access_token
New: -t supports configuring preset.default preset.im.default preset.bitable.default preset.doc.default etc.
Bump: Upgraded @modelcontextprotocol/sdk to 1.11.0

# 0.2.0

飞书/Lark OpenAPI MCP 工具，可以帮助你快速开始使用MCP协议连接飞书/Lark，实现 Agent 与飞书/Lark平台的高效协作

Feishu/Lark OpenAPI MCP tool helps you quickly start using the MCP protocol to connect with Feishu/Lark, enabling efficient collaboration between Agent and the Feishu/Lark platform