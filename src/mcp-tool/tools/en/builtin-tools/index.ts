import { docxBuiltinToolName, docxBuiltinTools } from './docx/builtin';
import { imBuiltinToolName, imBuiltinTools } from './im/buildin';
import { sheetsBuiltinToolName, sheetsBuiltinTools } from './sheets/builtin';

export const BuiltinTools = [...docxBuiltinTools, ...imBuiltinTools, ...sheetsBuiltinTools];

export type BuiltinToolName = docxBuiltinToolName | imBuiltinToolName | sheetsBuiltinToolName;
