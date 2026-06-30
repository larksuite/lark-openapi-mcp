/**
 * Commonly used tools in MCP
 */
import { ToolName } from './tools';
export declare enum PresetName {
    /**
     * Default preset including IM, Bitable, Doc and Contact tools
     */
    LIGHT = "preset.light",
    /**
     * Default preset including IM, Bitable, Doc and Contact tools
     */
    DEFAULT = "preset.default",
    /**
     * IM related tools for chat and message operations
     */
    IM_DEFAULT = "preset.im.default",
    /**
     * Base preset for base operations
     */
    BASE_DEFAULT = "preset.base.default",
    /**
     * Base tools with batch operations
     */
    BASE_BATCH = "preset.base.batch",
    /**
     * Document related tools for content and permission operations
     */
    DOC_DEFAULT = "preset.doc.default",
    /**
     * Task management related tools
     */
    TASK_DEFAULT = "preset.task.default",
    /**
     * Calendar event management tools
     */
    CALENDAR_DEFAULT = "preset.calendar.default",
    /**
     * Document & wiki write tools: edit/append/delete doc blocks and create/rename/move wiki nodes
     */
    DOC_WRITE = "preset.doc.write",
    /**
     * Full Base (bitable) control: create/update/delete apps, tables, fields and records (incl. batch)
     */
    BASE_FULL = "preset.base.full",
    /**
     * Drive file management: delete/move files & folders and manage sharing permissions
     */
    DRIVE_DEFAULT = "preset.drive.default",
    /**
     * Spreadsheet tools: read, create, rename and find/replace within sheets
     */
    SHEETS_DEFAULT = "preset.sheets.default"
}
export declare const presetLightToolNames: ToolName[];
export declare const presetContactToolNames: ToolName[];
export declare const presetImToolNames: ToolName[];
export declare const presetBaseCommonToolNames: ToolName[];
export declare const presetBaseToolNames: ToolName[];
export declare const presetBaseRecordBatchToolNames: ToolName[];
export declare const presetDocToolNames: ToolName[];
export declare const presetTaskToolNames: ToolName[];
export declare const presetCalendarToolNames: ToolName[];
export declare const presetDocWriteToolNames: ToolName[];
export declare const presetBaseFullToolNames: ToolName[];
export declare const presetDriveToolNames: ToolName[];
export declare const presetSheetsToolNames: ToolName[];
export declare const defaultToolNames: ToolName[];
export declare const presetTools: Record<PresetName, ToolName[]>;
