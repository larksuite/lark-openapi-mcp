/**
 * Commonly used tools in MCP
 */

import { ToolName } from './tools';

export enum PresetName {
  /**
   * Default preset including IM, Bitable, Doc and Contact tools
   */
  LIGHT = 'preset.light',
  /**
   * Default preset including IM, Bitable, Doc and Contact tools
   */
  DEFAULT = 'preset.default',
  /**
   * IM related tools for chat and message operations
   */
  IM_DEFAULT = 'preset.im.default',
  /**
   * Base preset for base operations
   */
  BASE_DEFAULT = 'preset.base.default',
  /**
   * Base tools with batch operations
   */
  BASE_BATCH = 'preset.base.batch',
  /**
   * Document related tools for content and permission operations
   */
  DOC_DEFAULT = 'preset.doc.default',
  /**
   * Task management related tools
   */
  TASK_DEFAULT = 'preset.task.default',
  /**
   * Calendar event management tools
   */
  CALENDAR_DEFAULT = 'preset.calendar.default',
  /**
   * Document & wiki write tools: edit/append/delete doc blocks and create/rename/move wiki nodes
   */
  DOC_WRITE = 'preset.doc.write',
  /**
   * Full Base (bitable) control: create/update/delete apps, tables, fields and records (incl. batch)
   */
  BASE_FULL = 'preset.base.full',
  /**
   * Drive file management: delete/move files & folders and manage sharing permissions
   */
  DRIVE_DEFAULT = 'preset.drive.default',
  /**
   * Spreadsheet tools: read, create, rename and find/replace within sheets
   */
  SHEETS_DEFAULT = 'preset.sheets.default',
}

export const presetLightToolNames: ToolName[] = [
  'im.v1.message.list',
  'im.v1.message.create',
  'im.v1.chat.search',
  'contact.v3.user.batchGetId',
  'docx.v1.document.rawContent',
  'docx.builtin.import',
  'docx.builtin.search',
  'wiki.v2.space.getNode',
  'bitable.v1.appTableRecord.search',
  'bitable.v1.appTableRecord.batchCreate',
];

export const presetContactToolNames: ToolName[] = ['contact.v3.user.batchGetId'];

export const presetImToolNames: ToolName[] = [
  'im.v1.chat.create',
  'im.v1.chat.list',
  'im.v1.chatMembers.get',
  'im.v1.message.create',
  'im.v1.message.list',
];

export const presetBaseCommonToolNames: ToolName[] = [
  'bitable.v1.app.create',
  'bitable.v1.appTable.create',
  'bitable.v1.appTable.list',
  'bitable.v1.appTableField.list',
  'bitable.v1.appTableRecord.search',
];

export const presetBaseToolNames: ToolName[] = [
  ...presetBaseCommonToolNames,
  'bitable.v1.appTableRecord.create',
  'bitable.v1.appTableRecord.update',
];

export const presetBaseRecordBatchToolNames: ToolName[] = [
  ...presetBaseCommonToolNames,
  'bitable.v1.appTableRecord.batchCreate',
  'bitable.v1.appTableRecord.batchUpdate',
];

export const presetDocToolNames: ToolName[] = [
  'docx.v1.document.rawContent',
  'docx.builtin.import',
  'docx.builtin.search',
  'drive.v1.permissionMember.create',
  'wiki.v2.space.getNode',
  'wiki.v1.node.search',
];

export const presetTaskToolNames: ToolName[] = [
  'task.v2.task.create',
  'task.v2.task.patch',
  'task.v2.task.addMembers',
  'task.v2.task.addReminders',
];

export const presetCalendarToolNames: ToolName[] = [
  'calendar.v4.calendarEvent.create',
  'calendar.v4.calendarEvent.patch',
  'calendar.v4.calendarEvent.get',
  'calendar.v4.freebusy.list',
  'calendar.v4.calendar.primary',
];

// Document & wiki WRITE tools. Lark docs are block-based, so "edit a doc" means
// patching/appending/deleting blocks; there is no single "update document" call. Doc/sheet/base
// FILE deletion is not here — files are deleted via drive.v1.file.delete (see presetDriveToolNames).
// Wiki node deletion has no generated tool, so it is intentionally absent.
export const presetDocWriteToolNames: ToolName[] = [
  'docx.v1.document.create',
  'docx.v1.documentBlock.patch',
  'docx.v1.documentBlock.batchUpdate',
  'docx.v1.documentBlockChildren.create',
  'docx.v1.documentBlockChildren.batchDelete',
  'docx.v1.documentBlockDescendant.create',
  'wiki.v2.spaceNode.create',
  'wiki.v2.spaceNode.updateTitle',
  'wiki.v2.spaceNode.move',
  'wiki.v2.spaceNode.moveDocsToWiki',
];

// Full Base control: everything in presetBaseToolNames plus update/delete across apps,
// tables, fields and records (single and batch).
export const presetBaseFullToolNames: ToolName[] = [
  ...presetBaseToolNames,
  'bitable.v1.app.update',
  'bitable.v1.appTable.patch',
  'bitable.v1.appTable.delete',
  'bitable.v1.appTable.batchDelete',
  'bitable.v1.appTableField.create',
  'bitable.v1.appTableField.update',
  'bitable.v1.appTableField.delete',
  'bitable.v1.appTableRecord.delete',
  'bitable.v1.appTableRecord.batchCreate',
  'bitable.v1.appTableRecord.batchUpdate',
  'bitable.v1.appTableRecord.batchDelete',
];

// Drive file management. drive.v1.file.delete is the single endpoint that deletes a doc,
// sheet, Base or any other file (pass the file token + its type).
export const presetDriveToolNames: ToolName[] = [
  'drive.v1.file.delete',
  'drive.v1.file.move',
  'drive.v1.file.createFolder',
  'drive.v1.permissionMember.create',
  'drive.v1.permissionMember.update',
  'drive.v1.permissionMember.delete',
];

// Spreadsheet tools. The generated v3 surface covers metadata (rename), structure (move
// dimension) and find/replace; bulk cell-value writing is a v2 API not in the generated set.
export const presetSheetsToolNames: ToolName[] = [
  'sheets.v3.spreadsheet.create',
  'sheets.v3.spreadsheet.get',
  'sheets.v3.spreadsheet.patch',
  'sheets.v3.spreadsheetSheet.get',
  'sheets.v3.spreadsheetSheet.query',
  'sheets.v3.spreadsheetSheet.find',
  'sheets.v3.spreadsheetSheet.replace',
];

export const defaultToolNames: ToolName[] = [
  ...presetImToolNames,
  ...presetBaseToolNames,
  ...presetDocToolNames,
  ...presetContactToolNames,
];

export const presetTools: Record<PresetName, ToolName[]> = {
  [PresetName.LIGHT]: presetLightToolNames,
  [PresetName.DEFAULT]: defaultToolNames,
  [PresetName.IM_DEFAULT]: presetImToolNames,
  [PresetName.BASE_DEFAULT]: presetBaseToolNames,
  [PresetName.BASE_BATCH]: presetBaseRecordBatchToolNames,
  [PresetName.DOC_DEFAULT]: presetDocToolNames,
  [PresetName.TASK_DEFAULT]: presetTaskToolNames,
  [PresetName.CALENDAR_DEFAULT]: presetCalendarToolNames,
  [PresetName.DOC_WRITE]: presetDocWriteToolNames,
  [PresetName.BASE_FULL]: presetBaseFullToolNames,
  [PresetName.DRIVE_DEFAULT]: presetDriveToolNames,
  [PresetName.SHEETS_DEFAULT]: presetSheetsToolNames,
};
