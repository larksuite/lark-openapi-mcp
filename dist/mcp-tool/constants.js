"use strict";
/**
 * Commonly used tools in MCP
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.presetTools = exports.defaultToolNames = exports.presetSheetsToolNames = exports.presetDriveToolNames = exports.presetBaseFullToolNames = exports.presetDocWriteToolNames = exports.presetCalendarToolNames = exports.presetTaskToolNames = exports.presetDocToolNames = exports.presetBaseRecordBatchToolNames = exports.presetBaseToolNames = exports.presetBaseCommonToolNames = exports.presetImToolNames = exports.presetContactToolNames = exports.presetLightToolNames = exports.PresetName = void 0;
var PresetName;
(function (PresetName) {
    /**
     * Default preset including IM, Bitable, Doc and Contact tools
     */
    PresetName["LIGHT"] = "preset.light";
    /**
     * Default preset including IM, Bitable, Doc and Contact tools
     */
    PresetName["DEFAULT"] = "preset.default";
    /**
     * IM related tools for chat and message operations
     */
    PresetName["IM_DEFAULT"] = "preset.im.default";
    /**
     * Base preset for base operations
     */
    PresetName["BASE_DEFAULT"] = "preset.base.default";
    /**
     * Base tools with batch operations
     */
    PresetName["BASE_BATCH"] = "preset.base.batch";
    /**
     * Document related tools for content and permission operations
     */
    PresetName["DOC_DEFAULT"] = "preset.doc.default";
    /**
     * Task management related tools
     */
    PresetName["TASK_DEFAULT"] = "preset.task.default";
    /**
     * Calendar event management tools
     */
    PresetName["CALENDAR_DEFAULT"] = "preset.calendar.default";
    /**
     * Document & wiki write tools: edit/append/delete doc blocks and create/rename/move wiki nodes
     */
    PresetName["DOC_WRITE"] = "preset.doc.write";
    /**
     * Full Base (bitable) control: create/update/delete apps, tables, fields and records (incl. batch)
     */
    PresetName["BASE_FULL"] = "preset.base.full";
    /**
     * Drive file management: delete/move files & folders and manage sharing permissions
     */
    PresetName["DRIVE_DEFAULT"] = "preset.drive.default";
    /**
     * Spreadsheet tools: read, create, rename and find/replace within sheets
     */
    PresetName["SHEETS_DEFAULT"] = "preset.sheets.default";
})(PresetName || (exports.PresetName = PresetName = {}));
exports.presetLightToolNames = [
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
exports.presetContactToolNames = ['contact.v3.user.batchGetId'];
exports.presetImToolNames = [
    'im.v1.chat.create',
    'im.v1.chat.list',
    'im.v1.chatMembers.get',
    'im.v1.message.create',
    'im.v1.message.list',
];
exports.presetBaseCommonToolNames = [
    'bitable.v1.app.create',
    'bitable.v1.appTable.create',
    'bitable.v1.appTable.list',
    'bitable.v1.appTableField.list',
    'bitable.v1.appTableRecord.search',
];
exports.presetBaseToolNames = [
    ...exports.presetBaseCommonToolNames,
    'bitable.v1.appTableRecord.create',
    'bitable.v1.appTableRecord.update',
];
exports.presetBaseRecordBatchToolNames = [
    ...exports.presetBaseCommonToolNames,
    'bitable.v1.appTableRecord.batchCreate',
    'bitable.v1.appTableRecord.batchUpdate',
];
exports.presetDocToolNames = [
    'docx.v1.document.rawContent',
    'docx.builtin.import',
    'docx.builtin.search',
    'drive.v1.permissionMember.create',
    'wiki.v2.space.getNode',
    'wiki.v1.node.search',
];
exports.presetTaskToolNames = [
    'task.v2.task.create',
    'task.v2.task.patch',
    'task.v2.task.addMembers',
    'task.v2.task.addReminders',
];
exports.presetCalendarToolNames = [
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
exports.presetDocWriteToolNames = [
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
exports.presetBaseFullToolNames = [
    ...exports.presetBaseToolNames,
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
exports.presetDriveToolNames = [
    'drive.v1.file.delete',
    'drive.v1.file.move',
    'drive.v1.file.createFolder',
    'drive.v1.permissionMember.create',
    'drive.v1.permissionMember.update',
    'drive.v1.permissionMember.delete',
];
// Spreadsheet tools. The generated v3 surface covers metadata (rename), structure (move
// dimension) and find/replace; bulk cell-value writing is a v2 API not in the generated set.
exports.presetSheetsToolNames = [
    'sheets.v3.spreadsheet.create',
    'sheets.v3.spreadsheet.get',
    'sheets.v3.spreadsheet.patch',
    'sheets.v3.spreadsheetSheet.get',
    'sheets.v3.spreadsheetSheet.query',
    'sheets.v3.spreadsheetSheet.find',
    'sheets.v3.spreadsheetSheet.replace',
];
exports.defaultToolNames = [
    ...exports.presetImToolNames,
    ...exports.presetBaseToolNames,
    ...exports.presetDocToolNames,
    ...exports.presetContactToolNames,
];
exports.presetTools = {
    [PresetName.LIGHT]: exports.presetLightToolNames,
    [PresetName.DEFAULT]: exports.defaultToolNames,
    [PresetName.IM_DEFAULT]: exports.presetImToolNames,
    [PresetName.BASE_DEFAULT]: exports.presetBaseToolNames,
    [PresetName.BASE_BATCH]: exports.presetBaseRecordBatchToolNames,
    [PresetName.DOC_DEFAULT]: exports.presetDocToolNames,
    [PresetName.TASK_DEFAULT]: exports.presetTaskToolNames,
    [PresetName.CALENDAR_DEFAULT]: exports.presetCalendarToolNames,
    [PresetName.DOC_WRITE]: exports.presetDocWriteToolNames,
    [PresetName.BASE_FULL]: exports.presetBaseFullToolNames,
    [PresetName.DRIVE_DEFAULT]: exports.presetDriveToolNames,
    [PresetName.SHEETS_DEFAULT]: exports.presetSheetsToolNames,
};
