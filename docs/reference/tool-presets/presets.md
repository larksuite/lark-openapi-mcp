# Preset Tool Collections Reference

This document provides detailed information about all preset tool collections available in lark-mcp. Presets are predefined sets of tools that can be enabled together for specific use cases.

## Overview

If you have no special requirements, you can keep the default preset to use common functions. When you need fine control or want to understand the complete list, please refer to the preset table below.

## How to Use Presets

To use a preset, specify it in the `-t` parameter:

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

You can also combine presets with individual tools:

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

## Preset Tool Collections

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
| wiki.v2.node.search | Search Wiki nodes (v2) | | ✓ | | ✓ | | ✓ | | |
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

## Preset Descriptions

### preset.light
A minimal preset that includes only the most essential tools for basic messaging and document operations. Ideal for lightweight integrations.

### preset.default (Default)
The default preset that includes commonly used tools across messaging, documents, databases, and collaboration. Recommended for most users.

### preset.im.default
Focused on instant messaging functionality, including chat creation, member management, and message handling.

### preset.base.default
Includes basic database operations with BitTable (multi-dimensional tables) for data management scenarios.

### preset.base.batch
Specialized for batch operations on BitTable data, useful for bulk data processing.

### preset.doc.default
Document-focused preset including document reading, importing, searching, and collaboration features.

### preset.task.default
Task management focused preset for creating, modifying, and managing tasks with reminders and members.

### preset.calendar.default
Calendar management preset for creating, modifying events, and querying availability.

## Related Documentation

- [Main Documentation](../../../README.md)
- [Tools Reference](./tools-en.md)
- [Configuration Guide](../../usage/configuration/configuration.md)
- [Command Line Reference](../cli/cli.md)
