import { McpTool } from '../../../../types';
import { z } from 'zod';

export type imBuiltinToolName = 'im.builtin.batchSend';

export const larkImBuiltinBatchSendTool: McpTool = {
  project: 'im',
  name: 'im.builtin.batchSend',
  accessTokens: ['tenant'],
  description:
    '[Feishu/Lark] - Batch send messages - Supports batch sending messages to multiple users and departments, supports text and card',
  schema: {
    data: z.object({
      msg_type: z
        .enum(['text', 'post', 'image', 'interactive', 'share_chat'])
        .describe(
          'Message type. If msg_type is text, image, post, or share_chat, the message content should be passed in the content parameter. If msg_type is interactive, the message content should be passed in the card parameter. Rich text type (post) messages do not support md tags.',
        ),
      content: z
        .any()
        .describe(
          'Message content, JSON structure. The value of this parameter corresponds to msg_type. For example, if msg_type is text, this parameter should be the text content.',
        )
        .optional(),
      card: z
        .any()
        .describe(
          'Card content, JSON structure. The value of this parameter corresponds to msg_type. Only when msg_type is interactive, the card content should be passed in this parameter. When msg_type is not interactive, the message content should be passed in the content parameter.',
        )
        .optional(),
      open_ids: z.array(z.string()).describe('List of recipient open_ids').optional(),
      user_ids: z.array(z.string()).describe('List of recipient user_ids').optional(),
      union_ids: z.array(z.string()).describe('List of recipient union_ids').optional(),
      department_ids: z
        .array(z.string())
        .describe('List of department IDs. The list supports both department_id and open_department_id')
        .optional(),
    }),
  },
  customHandler: async (client, params): Promise<any> => {
    try {
      const { data } = params;
      const response = await client.request({
        method: 'POST',
        url: '/open-apis/message/v4/batch_send',
        data,
      });
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(response.data ?? response),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify((error as any)?.response?.data || error),
          },
        ],
      };
    }
  },
};

export const imBuiltinTools = [larkImBuiltinBatchSendTool];
