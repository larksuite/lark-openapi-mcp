# 预设工具集参考

本文档提供了 lark-mcp 中所有可用预设工具集的详细信息。预设是为特定用例预定义的工具集，可以一起启用。

## 概述

如无特殊需求，可保持默认 preset 即可使用常用功能。需要精细控制或了解完整列表时，可参考下面的预设表格。

## 如何使用预设

要使用预设，请在 `-t` 参数中指定：

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a", "<your_app_id>",
        "-s", "<your_app_secret>",
        "-t", "preset.light"
      ]
    }
  }
}
```

您也可以将预设与单个工具组合：

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a", "<your_app_id>",
        "-s", "<your_app_secret>",
        "-t", "preset.light,im.v1.message.create"
      ]
    }
  }
}
```

## 预设工具集详表

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
| wiki.v2.node.search | 搜索知识库节点 (v2) | | ✓ | | ✓ | | ✓ | | |
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

## 预设说明

### preset.light
最小化预设，仅包含基本消息和文档操作的核心工具。适合轻量级集成。

### preset.default（默认）
默认预设，包含消息、文档、数据库和协作等常用工具。推荐大多数用户使用。

### preset.im.default
专注于即时消息功能，包括群聊创建、成员管理和消息处理。

### preset.base.default
包含多维表格的基础数据库操作，适用于数据管理场景。

### preset.base.batch
专门用于多维表格数据的批量操作，适合批量数据处理。

### preset.doc.default
以文档为中心的预设，包括文档读取、导入、搜索和协作功能。

### preset.task.default
任务管理预设，用于创建、修改和管理带有提醒和成员的任务。

### preset.calendar.default
日历管理预设，用于创建、修改事件和查询可用性。

## 相关文档

- [主要文档](../../../README_ZH.md)
- [工具参考](./tools-zh.md)
- [配置指南](../../usage/configuration/configuration-zh.md)
- [命令行参考](../cli/cli-zh.md)
