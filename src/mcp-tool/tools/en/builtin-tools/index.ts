import { docxBuiltinToolName, docxBuiltinTools } from './docx/builtin';
import { imBuiltinToolName, imBuiltinTools } from './im/buildin';
import { driveBuiltinToolName, driveBuiltinTools } from './drive/builtin';
import { bitableBuiltinToolName, bitableBuiltinTools } from './bitable/builtin';

export const BuiltinTools = [...docxBuiltinTools, ...imBuiltinTools, ...driveBuiltinTools, ...bitableBuiltinTools];

export type BuiltinToolName = docxBuiltinToolName | imBuiltinToolName | driveBuiltinToolName | bitableBuiltinToolName;
