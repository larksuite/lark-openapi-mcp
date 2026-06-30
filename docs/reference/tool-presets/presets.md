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

## Write & Delete Presets

These presets grant **mutating** access (edit/delete) on top of the read-oriented presets above. Combine them with their read counterparts, e.g. `-t preset.doc.default,preset.doc.write`. They require the matching write/delete permissions to be enabled on the Lark app in the developer console — the OAuth scope alone is not sufficient.

| Tool Name | Function Description | preset.doc.write | preset.base.full | preset.drive.default | preset.sheets.default |
| --- | --- | :---: | :---: | :---: | :---: |
| docx.v1.document.create | Create a blank document | ✓ | | | |
| docx.v1.documentBlock.patch | Update a document block | ✓ | | | |
| docx.v1.documentBlock.batchUpdate | Batch update document blocks | ✓ | | | |
| docx.v1.documentBlockChildren.create | Append child blocks to a document | ✓ | | | |
| docx.v1.documentBlockChildren.batchDelete | Delete blocks from a document | ✓ | | | |
| docx.v1.documentBlockDescendant.create | Create nested descendant blocks | ✓ | | | |
| wiki.v2.spaceNode.create | Create a wiki node | ✓ | | | |
| wiki.v2.spaceNode.updateTitle | Rename a wiki node | ✓ | | | |
| wiki.v2.spaceNode.move | Move a wiki node | ✓ | | | |
| wiki.v2.spaceNode.moveDocsToWiki | Move a doc into the wiki | ✓ | | | |
| bitable.v1.app.create | Create base | | ✓ | | |
| bitable.v1.app.update | Update base metadata | | ✓ | | |
| bitable.v1.appTable.create / list | Create / list tables | | ✓ | | |
| bitable.v1.appTable.patch | Rename a table | | ✓ | | |
| bitable.v1.appTable.delete / batchDelete | Delete table(s) | | ✓ | | |
| bitable.v1.appTableField.list / create / update / delete | Manage table fields | | ✓ | | |
| bitable.v1.appTableRecord.search / create / update | Manage records | | ✓ | | |
| bitable.v1.appTableRecord.delete | Delete a record | | ✓ | | |
| bitable.v1.appTableRecord.batchCreate / batchUpdate / batchDelete | Batch manage records | | ✓ | | |
| drive.v1.file.delete | Delete a file (doc / sheet / base / any file) | | | ✓ | |
| drive.v1.file.move | Move a file | | | ✓ | |
| drive.v1.file.createFolder | Create a folder | | | ✓ | |
| drive.v1.permissionMember.create / update / delete | Manage sharing permissions | | | ✓ | |
| sheets.v3.spreadsheet.create | Create a spreadsheet | | | | ✓ |
| sheets.v3.spreadsheet.get / patch | Read / rename a spreadsheet | | | | ✓ |
| sheets.v3.spreadsheetSheet.get / query | Read sheet metadata | | | | ✓ |
| sheets.v3.spreadsheetSheet.find / replace | Find / replace in a sheet | | | | ✓ |

### preset.doc.write
Document and wiki **write** access: create documents, edit/append/delete document blocks, and create/rename/move wiki nodes. Lark documents are block-based, so editing content means patching blocks — there is no single "update document" call. There is no generated tool for deleting a wiki node.

### preset.base.full
Full Base (Bitable) control: everything in `preset.base.default` plus update and delete across apps, tables, fields, and records — including batch create/update/delete.

### preset.drive.default
Drive file management: delete and move files and folders, and manage sharing permissions. `drive.v1.file.delete` is the single endpoint that deletes a doc, sheet, Base, or any other file (pass the file token and its type).

### preset.sheets.default
Spreadsheet tools: read, create, rename, and find/replace within sheets. Bulk cell-value writing is a Sheets v2 API that is not in the generated tool set yet.

## Related Documentation

- [Main Documentation](../../../README.md)
- [Tools Reference](./tools-en.md)
- [Configuration Guide](../../usage/configuration/configuration.md)
- [Command Line Reference](../cli/cli.md)
