import { z } from 'zod';
export type imV1ToolName =
  | 'im.v1.batchMessage.delete'
  | 'im.v1.batchMessage.getProgress'
  | 'im.v1.batchMessage.readUser'
  | 'im.v1.chatAnnouncement.get'
  | 'im.v1.chatAnnouncement.patch'
  | 'im.v1.chat.create'
  | 'im.v1.chat.delete'
  | 'im.v1.chat.get'
  | 'im.v1.chat.link'
  | 'im.v1.chat.list'
  | 'im.v1.chatManagers.addManagers'
  | 'im.v1.chatManagers.deleteManagers'
  | 'im.v1.chatMembers.create'
  | 'im.v1.chatMembers.delete'
  | 'im.v1.chatMembers.get'
  | 'im.v1.chatMembers.isInChat'
  | 'im.v1.chatMembers.meJoin'
  | 'im.v1.chatMenuItem.patch'
  | 'im.v1.chatMenuTree.create'
  | 'im.v1.chatMenuTree.delete'
  | 'im.v1.chatMenuTree.get'
  | 'im.v1.chatMenuTree.sort'
  | 'im.v1.chatModeration.get'
  | 'im.v1.chatModeration.update'
  | 'im.v1.chat.search'
  | 'im.v1.chatTab.create'
  | 'im.v1.chatTab.deleteTabs'
  | 'im.v1.chatTab.listTabs'
  | 'im.v1.chatTab.sortTabs'
  | 'im.v1.chatTab.updateTabs'
  | 'im.v1.chatTopNotice.deleteTopNotice'
  | 'im.v1.chatTopNotice.putTopNotice'
  | 'im.v1.chat.update'
  | 'im.v1.message.create'
  | 'im.v1.message.delete'
  | 'im.v1.message.forward'
  | 'im.v1.message.get'
  | 'im.v1.message.list'
  | 'im.v1.message.mergeForward'
  | 'im.v1.message.patch'
  | 'im.v1.message.pushFollowUp'
  | 'im.v1.messageReaction.create'
  | 'im.v1.messageReaction.delete'
  | 'im.v1.messageReaction.list'
  | 'im.v1.message.readUsers'
  | 'im.v1.message.reply'
  | 'im.v1.message.update'
  | 'im.v1.message.urgentApp'
  | 'im.v1.message.urgentPhone'
  | 'im.v1.message.urgentSms'
  | 'im.v1.pin.create'
  | 'im.v1.pin.delete'
  | 'im.v1.pin.list'
  | 'im.v1.thread.forward';
export const imV1BatchMessageDelete = {
  project: 'im',
  name: 'im.v1.batchMessage.delete',
  sdkName: 'im.v1.batchMessage.delete',
  path: '/open-apis/im/v1/batch_messages/:batch_message_id',
  httpMethod: 'DELETE',
  description: '[Feishu/Lark]-消息-批量消息-批量撤回消息-该接口用于撤回通过[批量发送消息]接口发送的消息',
  accessTokens: ['tenant'],
  schema: {
    path: z.object({
      batch_message_id: z
        .string()
        .describe(
          '待撤回的批量消息任务 ID，该 ID 为[批量发送消息]接口返回值中的`message_id`字段，用于标识一次批量发送消息请求',
        ),
    }),
  },
};
export const imV1BatchMessageGetProgress = {
  project: 'im',
  name: 'im.v1.batchMessage.getProgress',
  sdkName: 'im.v1.batchMessage.getProgress',
  path: '/open-apis/im/v1/batch_messages/:batch_message_id/get_progress',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-消息-批量消息-查询批量消息整体进度-[批量发送消息]或者[批量撤回消息]后，可通过该接口查询消息的发送进度和撤回进度',
  accessTokens: ['tenant'],
  schema: {
    path: z.object({
      batch_message_id: z
        .string()
        .describe(
          '待查询的批量消息任务 ID，该 ID 为[批量发送消息]接口返回值中的 `message_id` 字段，用于标识一次批量发送消息请求',
        ),
    }),
  },
};
export const imV1BatchMessageReadUser = {
  project: 'im',
  name: 'im.v1.batchMessage.readUser',
  sdkName: 'im.v1.batchMessage.readUser',
  path: '/open-apis/im/v1/batch_messages/:batch_message_id/read_user',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-消息-批量消息-查询批量消息推送和阅读人数-[批量发送消息]后，可通过该接口查询消息推送的总人数以及消息已读人数',
  accessTokens: ['tenant'],
  schema: {
    path: z.object({
      batch_message_id: z
        .string()
        .describe(
          '待查询的批量消息任务 ID，该 ID 为[批量发送消息]接口返回值中的 `message_id` 字段，用于标识一次批量发送消息请求',
        ),
    }),
  },
};
export const imV1ChatAnnouncementGet = {
  project: 'im',
  name: 'im.v1.chatAnnouncement.get',
  sdkName: 'im.v1.chatAnnouncement.get',
  path: '/open-apis/im/v1/chats/:chat_id/announcement',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-群组-群公告-获取群公告信息-获取指定群组中的群公告信息，公告信息格式与[旧版云文档]格式相同',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型').optional() })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：单聊（群类型为 `p2p`）不支持获取群公告',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatAnnouncementPatch = {
  project: 'im',
  name: 'im.v1.chatAnnouncement.patch',
  sdkName: 'im.v1.chatAnnouncement.patch',
  path: '/open-apis/im/v1/chats/:chat_id/announcement',
  httpMethod: 'PATCH',
  description:
    '[Feishu/Lark]-群组-群公告-更新群公告信息-更新指定群组中的群公告信息。更新的公告内容格式和更新[旧版云文档]的格式相同，不支持新版云文档格式',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      revision: z
        .string()
        .describe(
          '文档当前版本号 int64 类型，可调用[获取群公告信息]接口，从返回结果中获取。**注意**：传入的版本号和最新版本号的差距不能超过 100',
        ),
      requests: z
        .array(z.string())
        .describe(
          '公告内容，调用接口时该参数必须传入值。公告内容的格式与更新旧版文档内容的格式相同，具体数据结构参考[编辑旧版文档内容]',
        )
        .optional(),
    }),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：单聊（群类型为 `p2p`）不支持更新群公告',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatCreate = {
  project: 'im',
  name: 'im.v1.chat.create',
  sdkName: 'im.v1.chat.create',
  path: '/open-apis/im/v1/chats',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-群组-群组管理-创建群-创建群聊，创建时支持设置群头像、群名称、群主以及群类型等配置，同时支持邀请群成员、群机器人入群',
  accessTokens: ['tenant'],
  schema: {
    data: z
      .object({
        avatar: z
          .string()
          .describe(
            '群头像对应的 Image Key- 可通过[上传图片]获取（注意：上传图片的 ==image_type== 需要指定为 ==avatar==）- 不传值则使用系统默认头像',
          )
          .optional(),
        name: z
          .string()
          .describe(
            '群名称 **注意：** - 建议群名称不超过 60 字符- 公开群名称的长度不得少于 2 个字符- 私有群若未填写群名称，群名称默认设置为 `(无主题)`',
          )
          .optional(),
        description: z.string().describe('群描述，建议不超过 100 字符**默认值**：空').optional(),
        i18n_names: z
          .object({
            zh_cn: z.string().describe('中文名').optional(),
            en_us: z.string().describe('英文名').optional(),
            ja_jp: z.string().describe('日文名').optional(),
          })
          .describe('群国际化名称**注意**：- 建议不超过 60 字符- 不设置国际化名称，则默认展示 `name` 参数对应的名称')
          .optional(),
        owner_id: z
          .string()
          .describe(
            '创建群时指定的群主，不填时指定建群的机器人为群主。群主 ID 类型在查询参数 ==user_id_type== 中指定；推荐使用 OpenID，获取方式可参考文档[如何获取 Open ID？]**注意**：开启对外共享能力的机器人在创建外部群时，机器人不能为群主，必须指定某一用户作为群主。此外，添加外部用户进群时，外部用户必须和群主已成为飞书好友',
          )
          .optional(),
        user_id_list: z
          .array(z.string().describe('user_id'))
          .describe(
            '创建群时邀请的群成员，不填则不邀请成员。ID 类型在查询参数 ==user_id_type== 中指定；推荐使用 OpenID，获取方式可参考文档[如何获取 Open ID？]**注意**：- 最多同时邀请 50 个用户- 为便于在客户端查看效果，建议调试接口时加入开发者自身 ID- 如果需要邀请外部用户，则外部用户必须和群主已成为飞书好友- 如何获取外部用户的 open_id，参考[获取外部用户的 open_id]',
          )
          .optional(),
        bot_id_list: z
          .array(z.string().describe('app_id'))
          .describe(
            '创建群时邀请的群机器人，不填则不邀请机器人。可参考[如何获取应用的 App ID？]来获取应用的 App ID **注意：**- 操作此接口的机器人会自动入群，无需重复填写- 拉机器人入群请使用 `app_id`- 最多同时邀请 5 个机器人，且邀请后群组中机器人数量不能超过 15 个',
          )
          .optional(),
        group_message_type: z
          .enum(['chat', 'thread'])
          .describe('群消息形式 Options:chat(对话消息),thread(话题消息)')
          .optional(),
        chat_mode: z.string().describe('群模式**可选值有**：- `group`：群组').optional(),
        chat_type: z.string().describe('群类型**可选值有**：- `private`：私有群- `public`：公开群').optional(),
        join_message_visibility: z
          .string()
          .describe(
            '成员入群提示消息的可见性**可选值有**：- `only_owner`：仅群主和管理员可见- `all_members`：所有成员可见- `not_anyone`：任何人均不可见',
          )
          .optional(),
        leave_message_visibility: z
          .string()
          .describe(
            '成员退群提示消息的可见性**可选值有**：- `only_owner`：仅群主和管理员可见- `all_members`：所有成员可见- `not_anyone`：任何人均不可见',
          )
          .optional(),
        membership_approval: z
          .string()
          .describe('加群是否需要审批**可选值有**：- `no_approval_required`：无需审批- `approval_required`：需要审批')
          .optional(),
        restricted_mode_setting: z
          .object({
            status: z
              .boolean()
              .describe(
                '保密模式是否开启**可选值有**：- true：开启。设置为 ture 时，`screenshot_has_permission_setting`、`download_has_permission_setting`、`message_has_permission_setting` 不能全为 `all_members`。- false：不开启。设置为 false 时，`screenshot_has_permission_setting`、`download_has_permission_setting`、`message_has_permission_setting` 不能存在 `not_anyone`。**默认值**：false',
              )
              .optional(),
            screenshot_has_permission_setting: z
              .enum(['all_members', 'not_anyone'])
              .describe(
                '允许截屏录屏**默认值**：all_members Options:all_members(AllMembers 所有成员允许截屏录屏),not_anyone(NotAnyone 所有成员禁止截屏录屏)',
              )
              .optional(),
            download_has_permission_setting: z
              .enum(['all_members', 'not_anyone'])
              .describe(
                '允许下载消息中图片、视频和文件**默认值**：all_members Options:all_members(AllMembers 所有成员允许下载资源),not_anyone(NotAnyone 所有成员禁止下载资源)',
              )
              .optional(),
            message_has_permission_setting: z
              .enum(['all_members', 'not_anyone'])
              .describe(
                '允许复制和转发消息**默认值**：all_members Options:all_members(AllMembers 所有成员允许复制和转发消息),not_anyone(NotAnyone 所有成员禁止复制和转发消息)',
              )
              .optional(),
          })
          .describe('保密模式设置**注意**：保密模式适用于企业旗舰版。适用版本与功能介绍参见[会话保密模式]')
          .optional(),
        urgent_setting: z
          .enum(['only_owner', 'all_members'])
          .describe('谁可以加急**默认值**：all_members Options:only_owner(仅群主和管理员),all_members(所有成员)')
          .optional(),
        video_conference_setting: z
          .enum(['only_owner', 'all_members'])
          .describe(
            '谁可以发起视频会议**默认值**：all_members Options:only_owner(仅群主和管理员),all_members(所有成员)',
          )
          .optional(),
        edit_permission: z
          .enum(['only_owner', 'all_members'])
          .describe('谁可以编辑群信息**默认值**：all_members Options:only_owner(仅群主和管理员),all_members(所有成员)')
          .optional(),
        hide_member_count_setting: z
          .enum(['all_members', 'only_owner'])
          .describe(
            '隐藏群成员人数设置**默认值**：all_members Options:all_members(所有群成员可见),only_owner(仅群主群管理员可见)',
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({
        user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型').optional(),
        set_bot_manager: z
          .boolean()
          .describe(
            '如果在请求体的 ==owner_id== 字段指定了某个用户为群主，可以选择是否同时设置创建此群的机器人为管理员，此标志位用于标记是否设置创建群的机器人为管理员',
          )
          .optional(),
        uuid: z
          .string()
          .describe(
            '由开发者生成的唯一字符串序列，用于创建群组请求去重；持有相同 uuid + owner_id（若有） 的请求 10 小时内只可成功创建 1 个群聊。不传值表示不进行请求去重，每一次请求成功后都会创建一个群聊',
          )
          .optional(),
      })
      .optional(),
  },
};
export const imV1ChatDelete = {
  project: 'im',
  name: 'im.v1.chat.delete',
  sdkName: 'im.v1.chat.delete',
  path: '/open-apis/im/v1/chats/:chat_id',
  httpMethod: 'DELETE',
  description:
    '[Feishu/Lark]-群组-群组管理-解散群-通过 chat_id 解散指定群组。通过 API 解散群组后，群聊天记录将不会保存',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 `group` 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatGet = {
  project: 'im',
  name: 'im.v1.chat.get',
  sdkName: 'im.v1.chat.get',
  path: '/open-apis/im/v1/chats/:chat_id',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-群组-群组管理-获取群信息-获取指定群的基本信息，包括群名称、群描述、群头像、群主 ID 以及群权限配置等',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型').optional() })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatLink = {
  project: 'im',
  name: 'im.v1.chat.link',
  sdkName: 'im.v1.chat.link',
  path: '/open-apis/im/v1/chats/:chat_id/link',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-群组-群组管理-获取群分享链接-获取指定群的分享链接，他人点击分享链接后可加入群组',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        validity_period: z
          .enum(['week', 'year', 'permanently'])
          .describe(
            '群分享链接有效时长 Options:week(one_week 有效期 7 天),year(one_year 有效期 1 年),permanently(永久有效)',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：单聊、密聊、团队群不支持分享群链接',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatList = {
  project: 'im',
  name: 'im.v1.chat.list',
  sdkName: 'im.v1.chat.list',
  path: '/open-apis/im/v1/chats',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-群组-群组管理-获取用户或机器人所在的群列表-获取 [access_token] 所代表的用户或者机器人所在的群列表',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型').optional(),
        sort_type: z
          .enum(['ByCreateTimeAsc', 'ByActiveTimeDesc'])
          .describe(
            '群组排序方式 Options:ByCreateTimeAsc(按群组创建时间升序排列),ByActiveTimeDesc(按群组活跃时间降序排列。因群组活跃时间变动频繁，使用 `ByActiveTimeDesc` 排序方式可能会造成群组遗漏。例如，设置分页大小为 10，发起第一次请求获取到第一页数据后，原本排在第 11 位的群组中有群成员发送了一条消息，那么该群组将被排列到第 1 位，此时发起请求获取第二页数据时，该群组将不能被获取到，需要再从第一页开始获取。)',
          )
          .optional(),
        page_token: z
          .string()
          .describe(
            '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
          )
          .optional(),
        page_size: z.number().describe('分页大小，用来限制一次请求返回的数据条目数').optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatManagersAddManagers = {
  project: 'im',
  name: 'im.v1.chatManagers.addManagers',
  sdkName: 'im.v1.chatManagers.addManagers',
  path: '/open-apis/im/v1/chats/:chat_id/managers/add_managers',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-群组-群成员-指定群管理员-指定群组，将群内指定的用户或者机器人设置为群管理员',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        manager_ids: z
          .array(z.string())
          .describe(
            '要设置为管理员的 ID，ID 类型与查询参数 member_id_type 取值一致。- 如果是用户（member_id_type 取值为 user_id/open_id/union_id），推荐使用用户的 open_id，获取方式可参考文档[如何获取 Open ID]。- 如果是机器人（member_id_type 取值为 app_id），请参考[如何获取应用的 App ID]**注意**：- 对于普通群，最多可指定 10 个管理员。- 对于超大群，最多可指定 20 个管理员。- 单次请求指定机器人时，最多可指定 5 个机器人。超大群和普通群的区别，参见[超大群与普通群有什么区别]',
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({
        member_id_type: z
          .enum(['open_id', 'union_id', 'user_id', 'app_id'])
          .describe(
            '用户 ID 类型 Options:open_id(标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。[了解更多：如何获取 Open ID？]),union_id(标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。[了解更多：如何获取 Union ID？]),user_id(标识一个用户在某个租户内的身份。同一个用户在租户 A 和租户 B 内的 User ID 是不同的。在同一个租户内，一个用户的 User ID 在所有应用（包括商店应用）中都保持一致。User ID 主要用于在不同的应用间打通用户数据。[了解更多：如何获取 User ID？]),app_id(飞书开放平台应用的唯一标识。在创建应用时，由系统自动生成，用户不能自行修改。[了解更多：如何获取应用的 App ID？])',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）**、**话题（topic）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`、`topic`',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatManagersDeleteManagers = {
  project: 'im',
  name: 'im.v1.chatManagers.deleteManagers',
  sdkName: 'im.v1.chatManagers.deleteManagers',
  path: '/open-apis/im/v1/chats/:chat_id/managers/delete_managers',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-群组-群成员-删除群管理员-指定群组，删除群组内指定的管理员，包括用户类型的管理员和机器人类型的管理员',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        manager_ids: z
          .array(z.string())
          .describe(
            '要删除的管理员 ID，ID 类型与查询参数 member_id_type 取值一致。- 如果是用户（member_id_type 取值为 user_id/open_id/union_id），推荐使用用户的 open_id，获取方式可参考文档[如何获取 Open ID]。- 如果是机器人（member_id_type 取值为 app_id），请参考[如何获取应用的 App ID]**注意**：每次请求最多指定 50 个用户或者 5 个机器人',
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({
        member_id_type: z
          .enum(['open_id', 'union_id', 'user_id', 'app_id'])
          .describe(
            '用户 ID 类型 Options:open_id(标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。[了解更多：如何获取 Open ID？]),union_id(标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。[了解更多：如何获取 Union ID？]),user_id(标识一个用户在某个租户内的身份。同一个用户在租户 A 和租户 B 内的 User ID 是不同的。在同一个租户内，一个用户的 User ID 在所有应用（包括商店应用）中都保持一致。User ID 主要用于在不同的应用间打通用户数据。[了解更多：如何获取 User ID？]),app_id(飞书开放平台应用的唯一标识。在创建应用时，由系统自动生成，用户不能自行修改。[了解更多：如何获取应用的 App ID？])',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）**、**话题（topic）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`、`topic`',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatMembersCreate = {
  project: 'im',
  name: 'im.v1.chatMembers.create',
  sdkName: 'im.v1.chatMembers.create',
  path: '/open-apis/im/v1/chats/:chat_id/members',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-群组-群成员-将用户或机器人拉入群聊-把指定的用户或机器人拉入指定群聊内',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        id_list: z
          .array(z.string().describe('user_id 或者 app_id'))
          .describe(
            '成员 ID 列表。- 邀请用户进群时推荐使用 OpenID，获取方式可参考文档[如何获取 Open ID？]- 邀请机器人进群时需填写应用的 App ID，请参考[如何获取应用的 App ID？]**注意**：- 成员列表不可为空- 列表中填写的成员 ID 类型应与 ==member_id_type== 参数中选择的类型相对应- 每次请求最多拉 50 个用户且不超过群人数上限。对于已认证企业的飞书的群人数默认上限：普通群 5000 人，会议群 3000 人，话题群 5000 人。若租户管理员配置了群人数上限，则群人数上限为该人数上限- 最多同时邀请 5 个机器人，且邀请后群组中机器人数量不能超过 15 个',
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({
        member_id_type: z
          .enum(['open_id', 'union_id', 'user_id', 'app_id'])
          .describe(
            '用户 ID 类型 Options:open_id(标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。[了解更多：如何获取 Open ID？]),union_id(标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。[了解更多：如何获取 Union ID？]),user_id(标识一个用户在某个租户内的身份。同一个用户在租户 A 和租户 B 内的 User ID 是不同的。在同一个租户内，一个用户的 User ID 在所有应用（包括商店应用）中都保持一致。User ID 主要用于在不同的应用间打通用户数据。[了解更多：如何获取 User ID？]),app_id(飞书开放平台应用的唯一标识。在创建应用时，由系统自动生成，用户不能自行修改。[了解更多：如何获取应用的 App ID？])',
          )
          .optional(),
        succeed_type: z
          .number()
          .describe(
            '出现不可用ID后的处理方式 0/1/2**默认值**：`0` Options:0(不存在/不可见的 ID 会拉群失败，并返回错误响应。存在已离职 ID 时，会将其他可用 ID 拉入群聊，返回拉群成功的响应。),1(将参数中可用的 ID 全部拉入群聊，返回拉群成功的响应，并展示剩余不可用的 ID 及原因。),2(参数中只要存在任一不可用的 ID ，就会拉群失败，返回错误响应，并展示出不可用的 ID。)',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）**、**话题（topic）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`、`topic`',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatMembersDelete = {
  project: 'im',
  name: 'im.v1.chatMembers.delete',
  sdkName: 'im.v1.chatMembers.delete',
  path: '/open-apis/im/v1/chats/:chat_id/members',
  httpMethod: 'DELETE',
  description: '[Feishu/Lark]-群组-群成员-将用户或机器人移出群聊-将指定的用户或机器人从群聊中移出',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        id_list: z
          .array(z.string().describe('user_id或者app_id'))
          .describe(
            '成员 ID 列表。ID 类型与查询参数 member_id_type 的取值一致。- 移除群内的用户时推荐使用 OpenID，获取方式可参考文档[如何获取 Open ID？]。- 移除群内的机器人时需填写应用的 App ID，请参考[如何获取应用的 App ID？]。**注意**：- 成员列表不可为空。- 每次请求，最多移除 50 个用户或者 5 个机器人',
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({
        member_id_type: z
          .enum(['open_id', 'union_id', 'user_id', 'app_id'])
          .describe(
            '用户 ID 类型 Options:open_id(标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。[了解更多：如何获取 Open ID？]),union_id(标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。[了解更多：如何获取 Union ID？]),user_id(标识一个用户在某个租户内的身份。同一个用户在租户 A 和租户 B 内的 User ID 是不同的。在同一个租户内，一个用户的 User ID 在所有应用（包括商店应用）中都保持一致。User ID 主要用于在不同的应用间打通用户数据。[了解更多：如何获取 User ID？]),app_id(飞书开放平台应用的唯一标识。在创建应用时，由系统自动生成，用户不能自行修改。[了解更多：如何获取应用的 App ID？])',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）**、**话题（topic）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`、`topic`',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatMembersGet = {
  project: 'im',
  name: 'im.v1.chatMembers.get',
  sdkName: 'im.v1.chatMembers.get',
  path: '/open-apis/im/v1/chats/:chat_id/members',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-群组-群成员-获取群成员列表-获取指定群组的成员信息，包括成员名字与 ID',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        member_id_type: z
          .enum(['open_id', 'union_id', 'user_id'])
          .describe(
            '用户 ID 类型 Options:open_id(标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。[了解更多：如何获取 Open ID？]),union_id(标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。[了解更多：如何获取 Union ID？]),user_id(标识一个用户在某个租户内的身份。同一个用户在租户 A 和租户 B 内的 User ID 是不同的。在同一个租户内，一个用户的 User ID 在所有应用（包括商店应用）中都保持一致。User ID 主要用于在不同的应用间打通用户数据。[了解更多：如何获取 User ID？])',
          )
          .optional(),
        page_size: z
          .number()
          .describe(
            '分页大小，用来限制一次请求所返回的数据条目数。- 由于返回的群成员列表会过滤掉机器人成员，因此返回的群成员个数可能会小于指定的 page_size。 - 如果有同一时间加入群的群成员，会一次性返回，这会导致返回的群成员个数可能会大于指定的 page_size',
          )
          .optional(),
        page_token: z
          .string()
          .describe(
            '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatMembersIsInChat = {
  project: 'im',
  name: 'im.v1.chatMembers.isInChat',
  sdkName: 'im.v1.chatMembers.isInChat',
  path: '/open-apis/im/v1/chats/:chat_id/members/is_in_chat',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-群组-群成员-判断用户或机器人是否在群里-根据使用的 access_token 判断对应的用户或者机器人是否在指定的群里',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatMembersMeJoin = {
  project: 'im',
  name: 'im.v1.chatMembers.meJoin',
  sdkName: 'im.v1.chatMembers.meJoin',
  path: '/open-apis/im/v1/chats/:chat_id/members/me_join',
  httpMethod: 'PATCH',
  description: '[Feishu/Lark]-群组-群成员-用户或机器人主动加入群聊-将当前调用接口的操作者（用户或机器人）加入指定群聊',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：- 仅支持公开群（public），你可以调用[获取群信息]接口，在返回结果中查看 `chat_type ` 参数取值是否为 `public`。- 群成员数量达到上限时无法进群。对于已认证企业的飞书的群人数默认上限：普通群 5000 人，会议群 3000 人，话题群 5000 人',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatMenuItemPatch = {
  project: 'im',
  name: 'im.v1.chatMenuItem.patch',
  sdkName: 'im.v1.chatMenuItem.patch',
  path: '/open-apis/im/v1/chats/:chat_id/menu_items/:menu_item_id',
  httpMethod: 'PATCH',
  description:
    '[Feishu/Lark]-群组-群菜单-修改群菜单元信息-修改指定群组内的某个一级菜单或者二级菜单的元信息，包括图标、名称、国际化名称和跳转链接',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      update_fields: z
        .array(
          z
            .enum(['ICON', 'NAME', 'I18N_NAME', 'REDIRECT_LINK'])
            .describe('Options:ICON(图标),NAME(名称),I18N_NAME(国际化名称),REDIRECT_LINK(跳转链接)'),
        )
        .describe('要修改的元信息'),
      chat_menu_item: z
        .object({
          action_type: z
            .enum(['NONE', 'REDIRECT_LINK'])
            .describe(
              '菜单类型**注意**：- 如果一级菜单有二级菜单，则此一级菜单的值必须为 `NONE`。- 菜单类型创建后不可更改。 Options:NONE(无类型),REDIRECT_LINK(跳转链接类型)',
            )
            .optional(),
          redirect_link: z
            .object({
              common_url: z.string().describe('公用跳转链接，必须以 http/https 开头').optional(),
              ios_url: z
                .string()
                .describe('iOS 端跳转链接，当该字段不设置时，iOS 端默认使用 `common_url` 值。必须以 http/https 开头')
                .optional(),
              android_url: z
                .string()
                .describe(
                  'Android 端跳转链接，当该字段不设置时，Android 端默认使用 `common_url` 值。必须以 http/https 开头',
                )
                .optional(),
              pc_url: z
                .string()
                .describe(
                  'PC 端跳转链接，当该字段不设置时，PC 端默认使用 `common_url` 值。必须以 http/https 开头。**使用说明**：在 PC 端点击群菜单后，如果需要 url 对应的页面在飞书侧边栏展开，可以在 url 前加上 `https://applink.feishu.cn/client/web_url/open?mode=sidebar-semi&url=`，例如 `https://applink.feishu.cn/client/web_url/open?mode=sidebar-semi&url=https://open.feishu.cn/`',
                )
                .optional(),
              web_url: z
                .string()
                .describe('Web 端跳转链接，当该字段不设置时，Web 端默认使用 `common_url` 值。必须以 http/https 开头')
                .optional(),
            })
            .describe('跳转链接')
            .optional(),
          image_key: z
            .string()
            .describe(
              '图标的 key 值。通过 [上传图片] 接口上传 message 类型图片获取 image_key，并传入该值。**注意**：如果一级菜单有二级菜单，则此一级菜单不能设置图标',
            )
            .optional(),
          name: z.string().describe('菜单名称**注意**：一级、二级菜单名称字符数要在 1 ~ 120 范围内').optional(),
          i18n_names: z
            .object({
              zh_cn: z.string().describe('中文名').optional(),
              en_us: z.string().describe('英文名').optional(),
              ja_jp: z.string().describe('日文名').optional(),
            })
            .describe('菜单国际化名称**注意**：一级、二级菜单名称字符数要在 1 ~ 120 范围内')
            .optional(),
        })
        .describe('群菜单的元信息'),
    }),
    path: z
      .object({
        chat_id: z
          .string()
          .describe(
            '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`',
          )
          .optional(),
        menu_item_id: z.string().describe('一级菜单或者二级菜单的 ID，ID 可通过 [获取群菜单] 接口获取').optional(),
      })
      .optional(),
  },
};
export const imV1ChatMenuTreeCreate = {
  project: 'im',
  name: 'im.v1.chatMenuTree.create',
  sdkName: 'im.v1.chatMenuTree.create',
  path: '/open-apis/im/v1/chats/:chat_id/menu_tree',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-群组-群菜单-添加群菜单-在指定群组中添加一个或多个群菜单。成功调用后接口会返回当前群组内所有群菜单信息',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      menu_tree: z
        .object({
          chat_menu_top_levels: z
            .array(
              z.object({
                chat_menu_item: z
                  .object({
                    action_type: z
                      .enum(['NONE', 'REDIRECT_LINK'])
                      .describe(
                        '一级菜单类型**注意**：- 如果一级菜单有二级菜单，则此一级菜单的值必须为 `NONE`。- 菜单类型创建后不可更改。 Options:NONE(无类型，如果需要在一级菜单内添加二级菜单，则该一级菜单需要设置为 NONE。),REDIRECT_LINK(跳转链接类型，取该值时需要设置对应的跳转链接（redirect_link）。)',
                      ),
                    redirect_link: z
                      .object({
                        common_url: z.string().describe('公用跳转链接，必须以 http/https 开头').optional(),
                        ios_url: z
                          .string()
                          .describe(
                            'iOS 端跳转链接，当该字段不设置时，iOS 端默认使用 `common_url` 值。必须以 http/https 开头',
                          )
                          .optional(),
                        android_url: z
                          .string()
                          .describe(
                            'Android 端跳转链接，当该字段不设置时，Android 端默认使用 `common_url` 值。必须以 http/https 开头',
                          )
                          .optional(),
                        pc_url: z
                          .string()
                          .describe(
                            'PC 端跳转链接，当该字段不设置时，PC 端默认使用 `common_url` 值。必须以 http/https 开头。**使用说明**：在 PC 端点击群菜单后，如果需要 url 对应的页面在飞书侧边栏展开，可以在 url 前加上 `https://applink.feishu.cn/client/web_url/open?mode=sidebar-semi&url=`，例如 `https://applink.feishu.cn/client/web_url/open?mode=sidebar-semi&url=https://open.feishu.cn/`',
                          )
                          .optional(),
                        web_url: z
                          .string()
                          .describe(
                            'Web 端跳转链接，当该字段不设置时，Web 端默认使用 `common_url` 值。必须以 http/https 开头',
                          )
                          .optional(),
                      })
                      .describe('一级菜单的跳转链接')
                      .optional(),
                    image_key: z
                      .string()
                      .describe(
                        '一级菜单图标的 key 值。通过 [上传图片] 接口上传 message 类型图片获取 image_key，并传入该值。**注意**：如果一级菜单有二级菜单，则此一级菜单不能设置图标',
                      )
                      .optional(),
                    name: z.string().describe('菜单名称**注意**：一级、二级菜单名称字符数要在 1 ~ 120 范围内'),
                    i18n_names: z
                      .object({
                        zh_cn: z.string().describe('中文名').optional(),
                        en_us: z.string().describe('英文名').optional(),
                        ja_jp: z.string().describe('日文名').optional(),
                      })
                      .describe('菜单国际化名称**注意**：一级、二级菜单名称字符数要在 1 ~ 120 范围内')
                      .optional(),
                  })
                  .describe('一级菜单信息'),
                children: z
                  .array(
                    z.object({
                      chat_menu_item: z
                        .object({
                          action_type: z
                            .enum(['NONE', 'REDIRECT_LINK'])
                            .describe(
                              '二级菜单类型 Options:NONE(无类型),REDIRECT_LINK(跳转链接类型，取该值时需要设置跳转链接（redirect_link）。)',
                            )
                            .optional(),
                          redirect_link: z
                            .object({
                              common_url: z.string().describe('公用跳转链接，必须以 http/https 开头').optional(),
                              ios_url: z
                                .string()
                                .describe(
                                  'iOS 端跳转链接，当该字段不设置时，iOS 端默认使用 `common_url` 值。必须以 http/https 开头',
                                )
                                .optional(),
                              android_url: z
                                .string()
                                .describe(
                                  'Android 端跳转链接，当该字段不设置时，Android 端默认使用 `common_url` 值。必须以 http/https 开头',
                                )
                                .optional(),
                              pc_url: z
                                .string()
                                .describe(
                                  'PC 端跳转链接，当该字段不设置时，PC 端默认使用 `common_url` 值。必须以 http/https 开头。 **使用说明**：在 PC 端点击群菜单后，如果需要 url 对应的页面在飞书侧边栏展开，可以在 url 前加上 `https://applink.feishu.cn/client/web_url/open?mode=sidebar-semi&url=`，例如 `https://applink.feishu.cn/client/web_url/open?mode=sidebar-semi&url=https://open.feishu.cn/`',
                                )
                                .optional(),
                              web_url: z
                                .string()
                                .describe(
                                  'Web 端跳转链接，当该字段不设置时，Web 端默认使用 `common_url` 值。必须以 http/https 开头',
                                )
                                .optional(),
                            })
                            .describe('二级菜单跳转链接')
                            .optional(),
                          image_key: z
                            .string()
                            .describe(
                              '二级菜单图标的 key 值。通过 [上传图片] 接口上传 message 类型图片获取 image_key，并传入该值',
                            )
                            .optional(),
                          name: z
                            .string()
                            .describe('菜单名称**注意**：一级、二级菜单名称字符数要在 1 ~ 120 范围内')
                            .optional(),
                          i18n_names: z
                            .object({
                              zh_cn: z.string().describe('中文名').optional(),
                              en_us: z.string().describe('英文名').optional(),
                              ja_jp: z.string().describe('日文名').optional(),
                            })
                            .describe('菜单国际化名称**注意**：一级、二级菜单名称字符数要在 1 ~ 120 范围内')
                            .optional(),
                        })
                        .describe('二级菜单信息')
                        .optional(),
                    }),
                  )
                  .describe('二级菜单列表')
                  .optional(),
              }),
            )
            .describe('一级菜单列表**注意**：一个群内最多有 3 个一级菜单'),
        })
        .describe('要向群内追加的菜单'),
    }),
    path: z
      .object({
        chat_id: z
          .string()
          .describe(
            '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`',
          )
          .optional(),
      })
      .optional(),
  },
};
export const imV1ChatMenuTreeDelete = {
  project: 'im',
  name: 'im.v1.chatMenuTree.delete',
  sdkName: 'im.v1.chatMenuTree.delete',
  path: '/open-apis/im/v1/chats/:chat_id/menu_tree',
  httpMethod: 'DELETE',
  description:
    '[Feishu/Lark]-群组-群菜单-删除群菜单-删除指定群内的一级菜单。成功调用后接口会返回群组内最新的群菜单信息',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      chat_menu_top_level_ids: z
        .array(z.string().describe('要删除的一级菜单ID'))
        .describe('一级菜单 ID。ID 可通过 [获取群菜单] 接口获取'),
    }),
    path: z
      .object({
        chat_id: z
          .string()
          .describe(
            '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`',
          )
          .optional(),
      })
      .optional(),
  },
};
export const imV1ChatMenuTreeGet = {
  project: 'im',
  name: 'im.v1.chatMenuTree.get',
  sdkName: 'im.v1.chatMenuTree.get',
  path: '/open-apis/im/v1/chats/:chat_id/menu_tree',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-群组-群菜单-获取群菜单-获取指定群组内的群菜单信息，包括所有一级或二级菜单的名称、跳转链接、图标等信息',
  accessTokens: ['tenant'],
  schema: {
    path: z
      .object({
        chat_id: z
          .string()
          .describe(
            '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`',
          )
          .optional(),
      })
      .optional(),
  },
};
export const imV1ChatMenuTreeSort = {
  project: 'im',
  name: 'im.v1.chatMenuTree.sort',
  sdkName: 'im.v1.chatMenuTree.sort',
  path: '/open-apis/im/v1/chats/:chat_id/menu_tree/sort',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-群组-群菜单-排序群菜单-调整指定群组内的群菜单排列顺序，成功调用后接口会返回群组内所有群菜单信息',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      chat_menu_top_level_ids: z
        .array(z.string().describe('一级菜单'))
        .describe(
          '通过一级菜单的 ID 进行排序。数组内的元素排序对应群组内一级菜单从左往右的排序。ID 可通过 [获取群菜单] 接口获取。**说明**：进行排序的 ID 列表需要跟群内存在的一级菜单 ID 列表对齐',
        ),
    }),
    path: z
      .object({
        chat_id: z
          .string()
          .describe(
            '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`',
          )
          .optional(),
      })
      .optional(),
  },
};
export const imV1ChatModerationGet = {
  project: 'im',
  name: 'im.v1.chatModeration.get',
  sdkName: 'im.v1.chatModeration.get',
  path: '/open-apis/im/v1/chats/:chat_id/moderation',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-群组-群组管理-获取群成员发言权限-获取指定群组的发言模式、可发言用户名单等信息',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型').optional(),
        page_size: z.number().describe('分页大小，用来限制一次请求返回的数据条目数').optional(),
        page_token: z
          .string()
          .describe(
            '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatModerationUpdate = {
  project: 'im',
  name: 'im.v1.chatModeration.update',
  sdkName: 'im.v1.chatModeration.update',
  path: '/open-apis/im/v1/chats/:chat_id/moderation',
  httpMethod: 'PUT',
  description:
    '[Feishu/Lark]-群组-群组管理-更新群发言权限-更新指定群组的发言权限，可设置为所有群成员可发言、仅群主或管理员可发言、指定群成员可发言',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        moderation_setting: z
          .string()
          .describe(
            '群发言模式**可选值有**：- all_members：所有群成员可发言- only_owner：仅群主或管理员可发言- moderator_list：指定群成员可发言，取该值时需要选择设置 `moderator_added_list` 和 `moderator_removed_list`',
          )
          .optional(),
        moderator_added_list: z
          .array(z.string().describe('用户id'))
          .describe(
            '当 `moderation_setting ` 取值为 `moderator_list` 时，以 ID 列表形式添加可发言的用户。**注意**：- ID 类型与查询参数 user_id_type 取值一致，推荐使用 OpenID，获取方式可参考文档[如何获取 Open ID]。- 列表内的用户如果不在群组内，则会被自动过滤掉。- 请求时，请确保 `moderator_added_list` 和 `moderator_removed_list` 两个参数内的 ID 不重复',
          )
          .optional(),
        moderator_removed_list: z
          .array(z.string().describe('用户id'))
          .describe(
            '当 `moderation_setting ` 取值为 `moderator_list` 时，以 ID 列表形式移除可发言的用户。**注意**：- ID 类型与查询参数 user_id_type 取值一致，推荐使用 OpenID，获取方式可参考文档[如何获取 Open ID]。- 列表内的用户如果不在群组内，则会被自动过滤掉。- 请求时，请确保 `moderator_added_list` 和 `moderator_removed_list` 两个参数内的 ID 不重复',
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型').optional() })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatSearch = {
  project: 'im',
  name: 'im.v1.chat.search',
  sdkName: 'im.v1.chat.search',
  path: '/open-apis/im/v1/chats/search',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-群组-群组管理-搜索对用户或机器人可见的群列表-获取当前身份（用户或机器人）可见的群列表，包括当前身份所在的群、对当前身份公开的群。支持关键词搜索、分页搜索',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型').optional(),
        query: z
          .string()
          .describe(
            '关键词**注意**：- 关键词支持匹配群国际化名称、群成员名称- 支持使用多语种搜索（飞书客户端内支持的多语种）- 支持拼音、前缀等模糊搜索- 关键词为空值或长度超过 `64` 个字符时将返回空的结果- 关键词中尽量不要包含 `-` 符号。如果必须包含该符号，请在传值时添加双引号，例如 `“Example-0”`',
          )
          .optional(),
        page_token: z
          .string()
          .describe(
            '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
          )
          .optional(),
        page_size: z.number().describe('分页大小，用来限制一次请求所返回的数据条目数').optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatTabCreate = {
  project: 'im',
  name: 'im.v1.chatTab.create',
  sdkName: 'im.v1.chatTab.create',
  path: '/open-apis/im/v1/chats/:chat_id/chat_tabs',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-群组-会话标签页-添加会话标签页-在指定会话内添加自定义会话标签页，仅支持添加文档类型（doc）或 URL （url）类型的标签页',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      chat_tabs: z
        .array(
          z.object({
            tab_name: z
              .string()
              .describe('会话标签页名称**注意**：会话标签页的名称不能超过 30 个字符（最多 10 个汉字）')
              .optional(),
            tab_type: z
              .enum([
                'message',
                'doc_list',
                'doc',
                'pin',
                'meeting_minute',
                'chat_announcement',
                'url',
                'file',
                'files_resources',
                'images_videos',
                'task',
              ])
              .describe(
                '会话标签页类型**注意**：只支持添加 doc、url 类型的标签页，其他字段为只读字段 Options:message(消息类型),doc_list(DocList 云文档列表),doc(文档),pin(Pin),meeting_minute(MeetingMinute 会议纪要),chat_announcement(ChatAnnouncement 群公告),url(URL),file(文件),files_resources(合并类型，包含文件、Doc 文档、URL 链接),images_videos(合并类型，包含图片、视频),task(任务)',
              ),
            tab_content: z
              .object({
                url: z
                  .string()
                  .describe('URL 地址，在 tab_type 取值为 url 时生效**注意**：必须以 http 或 https 开头')
                  .optional(),
                doc: z
                  .string()
                  .describe(
                    '云文档链接，在 tab_type 取值为 doc 时生效**注意**：- 必须以 http 或 https 开头- 当前操作者必须有云文档的协作者权限',
                  )
                  .optional(),
                meeting_minute: z
                  .string()
                  .describe('会议纪要，因不支持添加 meeting_minute 类型的会话标签页，该字段为只读字段，无需传值')
                  .optional(),
                task: z
                  .string()
                  .describe('任务，因不支持添加 task 类型的会话标签页，该字段为只读字段，无需传值')
                  .optional(),
              })
              .describe('会话标签页的内容')
              .optional(),
            tab_config: z
              .object({
                icon_key: z
                  .string()
                  .describe(
                    '会话标签页的图标。需要先调用[上传图片] 接口，图片类型设置为 message 上传图片，然后获取 `image_key` 后传入当前参数',
                  )
                  .optional(),
                is_built_in: z.boolean().describe('会话标签页是否在 App 内嵌打开').optional(),
              })
              .describe('会话标签页的配置**注意**：仅当 tab_type 取值为 url 时，该参数生效')
              .optional(),
          }),
        )
        .describe('会话标签页**注意**：一个会话内最多只允许添加 20 个自定义会话标签页'),
    }),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）**、**单聊（p2p）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`、`p2p`',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatTabDeleteTabs = {
  project: 'im',
  name: 'im.v1.chatTab.deleteTabs',
  sdkName: 'im.v1.chatTab.deleteTabs',
  path: '/open-apis/im/v1/chats/:chat_id/chat_tabs/delete_tabs',
  httpMethod: 'DELETE',
  description: '[Feishu/Lark]-群组-会话标签页-删除会话标签页-删除指定会话内的一个或多个会话标签页',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      tab_ids: z
        .array(z.string().describe('群标签id'))
        .describe('会话标签页 ID 列表，ID 可以在[添加会话标签页]或者[拉取会话标签页]接口返回值中获取'),
    }),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）**、**单聊（p2p）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`、`p2p`',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatTabListTabs = {
  project: 'im',
  name: 'im.v1.chatTab.listTabs',
  sdkName: 'im.v1.chatTab.listTabs',
  path: '/open-apis/im/v1/chats/:chat_id/chat_tabs/list_tabs',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-群组-会话标签页-拉取会话标签页-获取指定会话内的会话标签页信息，包括 ID、名称、类型以及内容等',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）**、**单聊（p2p）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`、`p2p`',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatTabSortTabs = {
  project: 'im',
  name: 'im.v1.chatTab.sortTabs',
  sdkName: 'im.v1.chatTab.sortTabs',
  path: '/open-apis/im/v1/chats/:chat_id/chat_tabs/sort_tabs',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-群组-会话标签页-会话标签页排序-调整指定会话内的多个会话标签页排列顺序',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        tab_ids: z
          .array(z.string().describe('群标签id'))
          .describe(
            '会话标签页 ID 列表，ID 可以在[添加会话标签页]或者[拉取会话标签页]接口返回值中获取。**注意**：- 必须包含会话内全部标签页的 ID。- 当前参数的排序，对应会话内从左往右的排序。- 会话内消息类型的标签页固定在第一顺位',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）**、**单聊（p2p）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`、`p2p`',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatTabUpdateTabs = {
  project: 'im',
  name: 'im.v1.chatTab.updateTabs',
  sdkName: 'im.v1.chatTab.updateTabs',
  path: '/open-apis/im/v1/chats/:chat_id/chat_tabs/update_tabs',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-群组-会话标签页-更新会话标签页-更新指定的会话标签页信息，包括名称、类型以及内容等。仅支持更新文档类型（doc）或 URL （url）类型的标签页',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        chat_tabs: z
          .array(
            z.object({
              tab_id: z
                .string()
                .describe('会话标签页 ID，ID 可以在[添加会话标签页]或者[拉取会话标签页]接口返回值中获取')
                .optional(),
              tab_name: z
                .string()
                .describe('会话标签页名称**注意**：会话标签页的名称不能超过 30 个字符（最多 10 个汉字）')
                .optional(),
              tab_type: z
                .enum([
                  'message',
                  'doc_list',
                  'doc',
                  'pin',
                  'meeting_minute',
                  'chat_announcement',
                  'url',
                  'file',
                  'files_resources',
                  'images_videos',
                  'task',
                ])
                .describe(
                  '会话标签页类型**注意**：只支持更新 doc、url 类型的标签页，其他字段为只读字段 Options:message(消息类型),doc_list(DocList 云文档列表),doc(文档),pin(Pin),meeting_minute(MeetingMinute 会议纪要),chat_announcement(ChatAnnouncement 群公告),url(URL),file(文件),files_resources(合并类型，包含文件、Doc文档、URL链接),images_videos(合并类型，包含图片、视频),task(任务)',
                ),
              tab_content: z
                .object({
                  url: z
                    .string()
                    .describe('URL 地址，在 tab_type 取值为 url 时生效**注意**：必须以 http 或 https 开头')
                    .optional(),
                  doc: z
                    .string()
                    .describe(
                      '云文档链接，在 tab_type 取值为 doc 时生效**注意**：- 必须以 http 或 https 开头- 当前操作者必须有云文档的协作者权限',
                    )
                    .optional(),
                  meeting_minute: z
                    .string()
                    .describe('会议纪要，因不支持更新 meeting_minute 类型的会话标签页，该字段为只读字段，无需传值')
                    .optional(),
                  task: z
                    .string()
                    .describe('任务，因不支持更新 task 类型的会话标签页，该字段为只读字段，无需传值')
                    .optional(),
                })
                .describe('会话标签页内容')
                .optional(),
              tab_config: z
                .object({
                  icon_key: z
                    .string()
                    .describe(
                      '会话标签页的图标。需要先调用[上传图片] 接口，图片类型设置为 message 上传图片，然后获取 `image_key` 后传入当前参数',
                    )
                    .optional(),
                  is_built_in: z.boolean().describe('会话标签页是否在 App 内嵌打开').optional(),
                })
                .describe('会话标签页的配置**注意**：仅当 tab_type 取值为 url 时，该参数生效')
                .optional(),
            }),
          )
          .describe('会话标签页')
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 **群组（group）**、**单聊（p2p）** 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`、`p2p`',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatTopNoticeDeleteTopNotice = {
  project: 'im',
  name: 'im.v1.chatTopNotice.deleteTopNotice',
  sdkName: 'im.v1.chatTopNotice.deleteTopNotice',
  path: '/open-apis/im/v1/chats/:chat_id/top_notice/delete_top_notice',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-群组-群组管理-撤销群置顶-撤销指定群组中的置顶消息或群公告',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatTopNoticePutTopNotice = {
  project: 'im',
  name: 'im.v1.chatTopNotice.putTopNotice',
  sdkName: 'im.v1.chatTopNotice.putTopNotice',
  path: '/open-apis/im/v1/chats/:chat_id/top_notice/put_top_notice',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-群组-群组管理-更新群置顶-更新群组中的群置顶信息，可以将群中的某一条消息，或群公告置顶展示',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      chat_top_notice: z
        .array(
          z.object({
            action_type: z
              .enum(['1', '2'])
              .describe(
                '置顶类型 Options:1(Message 消息类型，必需填写 `message_id` ),2(Annoucement 群公告类型，无需填写 `message_id`)',
              )
              .optional(),
            message_id: z
              .string()
              .describe(
                '消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
              )
              .optional(),
          }),
        )
        .describe('群置顶配置'),
    }),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ChatUpdate = {
  project: 'im',
  name: 'im.v1.chat.update',
  sdkName: 'im.v1.chat.update',
  path: '/open-apis/im/v1/chats/:chat_id',
  httpMethod: 'PUT',
  description: '[Feishu/Lark]-群组-群组管理-更新群信息-更新指定群的信息，包括群头像、群名称、群描述、群配置以及群主等',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        avatar: z
          .string()
          .describe(
            '群头像对应的 Image Key，可通过[上传图片]获取（注意：上传图片的 ==image_type== 需要指定为 ==avatar==）',
          )
          .optional(),
        name: z
          .string()
          .describe('群名称**注意：** - 建议群名称不超过 60 字符- 公开群名称的长度不得少于 2 个字符')
          .optional(),
        description: z.string().describe('群描述，建议不超过 100 字符').optional(),
        i18n_names: z
          .object({
            zh_cn: z.string().describe('中文名').optional(),
            en_us: z.string().describe('英文名').optional(),
            ja_jp: z.string().describe('日文名').optional(),
          })
          .describe('群国际化名称，建议不超过 60 字符')
          .optional(),
        add_member_permission: z
          .string()
          .describe(
            '谁可以添加群成员，群成员包括用户或机器人**可选值有**：- `only_owner`：仅群主和管理员- `all_members`：所有成员**注意**：`add_member_permission` 和 `share_card_permission` 两个参数必须同步配置。- 如果 `add_member_permission` 值为 `only_owner`，则 `share_card_permission` 只能设置为 `not_allowed`。- 如果 `add_member_permission` 值为`all_members`，则 `share_card_permission` 只能设置为 `allowed`',
          )
          .optional(),
        share_card_permission: z
          .string()
          .describe(
            '是否允许分享群**可选值有**：- `allowed`：允许- `not_allowed`：不允许**注意**：`add_member_permission` 和 `share_card_permission` 两个参数必须同步配置。- 如果 `add_member_permission` 值为 `only_owner`，则 `share_card_permission` 只能设置为 `not_allowed`。- 如果 `add_member_permission` 值为`all_members`，则 `share_card_permission` 只能设置为 `allowed`',
          )
          .optional(),
        at_all_permission: z
          .string()
          .describe('谁可以 at 所有人**可选值有**：- `only_owner`：仅群主和管理员- `all_members`：所有成员')
          .optional(),
        edit_permission: z
          .string()
          .describe('谁可以编辑群信息**可选值有**：- `only_owner`：仅群主和管理员- `all_members`：所有成员')
          .optional(),
        owner_id: z
          .string()
          .describe(
            '新群主的用户 ID，不转让群主时无需填写。ID 类型与查询参数 user_id_type 取值一致，ID 类型推荐使用 OpenID，获取方式可参考文档[如何获取 Open ID？]',
          )
          .optional(),
        join_message_visibility: z
          .string()
          .describe(
            '成员入群提示消息的可见性**可选值有**：- `only_owner`：仅群主和管理员可见- `all_members`：所有成员可见- `not_anyone`：任何人均不可见',
          )
          .optional(),
        leave_message_visibility: z
          .string()
          .describe(
            '成员退群提示消息的可见性**可选值有**：- `only_owner`：仅群主和管理员可见- `all_members`：所有成员可见- `not_anyone`：任何人均不可见',
          )
          .optional(),
        membership_approval: z
          .string()
          .describe('加群是否需要审批**可选值有**：- `no_approval_required`：无需审批- `approval_required`：需要审批')
          .optional(),
        restricted_mode_setting: z
          .object({
            status: z
              .boolean()
              .describe(
                '保密模式是否开启**可选值有**：- true：开启。设置为 ture 时，`screenshot_has_permission_setting`、`download_has_permission_setting`、`message_has_permission_setting` 不能全为 `all_members`。- false：不开启。设置为 false 时，`screenshot_has_permission_setting`、`download_has_permission_setting`、`message_has_permission_setting` 不能存在 `not_anyone`',
              )
              .optional(),
            screenshot_has_permission_setting: z
              .enum(['all_members', 'not_anyone'])
              .describe(
                '允许截屏录屏 Options:all_members(AllMembers 所有成员允许截屏录屏),not_anyone(NotAnyone 所有成员禁止截屏录屏)',
              )
              .optional(),
            download_has_permission_setting: z
              .enum(['all_members', 'not_anyone'])
              .describe(
                '允许下载消息中图片、视频和文件 Options:all_members(AllMembers 所有成员允许下载资源),not_anyone(NotAnyone 所有成员禁止下载资源)',
              )
              .optional(),
            message_has_permission_setting: z
              .enum(['all_members', 'not_anyone'])
              .describe(
                '允许复制和转发消息 Options:all_members(AllMembers 所有成员允许复制和转发消息),not_anyone(NotAnyone 所有成员禁止复制和转发消息)',
              )
              .optional(),
          })
          .describe('保密模式设置**注意**：保密模式适用于企业旗舰版。适用版本与功能介绍参见[会话保密模式]')
          .optional(),
        chat_type: z.string().describe('群类型**可选值有**：- `private`：私有群- `public`：公开群').optional(),
        group_message_type: z
          .enum(['chat', 'thread'])
          .describe('群消息形式 Options:chat(对话消息),thread(话题消息)')
          .optional(),
        urgent_setting: z
          .enum(['only_owner', 'all_members'])
          .describe('谁可以加急 Options:only_owner(仅群主和管理员),all_members(所有成员)')
          .optional(),
        video_conference_setting: z
          .enum(['only_owner', 'all_members'])
          .describe('谁可以发起视频会议 Options:only_owner(仅群主和管理员),all_members(所有成员)')
          .optional(),
        hide_member_count_setting: z
          .enum(['all_members', 'only_owner'])
          .describe('隐藏群成员人数设置 Options:all_members(所有群成员可见),only_owner(仅群主群管理员可见)')
          .optional(),
      })
      .optional(),
    params: z
      .object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型').optional() })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          '群 ID。获取方式：- [创建群]，从返回结果中获取该群的 chat_id。- 调用[获取用户或机器人所在的群列表]接口，可以查询用户或机器人所在群的 chat_id。- 调用[搜索对用户或机器人可见的群列表]，可搜索用户或机器人所在的群、对用户或机器人公开的群的 chat_id。**注意**：仅支持群模式为 `group` 的群组 ID。你可以调用[获取群信息]接口，在返回结果中查看 `chat_mode` 参数取值是否为 `group`',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1MessageCreate = {
  project: 'im',
  name: 'im.v1.message.create',
  sdkName: 'im.v1.message.create',
  path: '/open-apis/im/v1/messages',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-消息-消息管理-发送消息-调用该接口向指定用户或者群聊发送消息。支持发送的消息类型包括文本、富文本、卡片、群名片、个人名片、图片、视频、音频、文件以及表情包等',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      receive_id: z
        .string()
        .describe(
          '消息接收者的 ID，ID 类型与查询参数 `receive_id_type` 的取值一致。**注意事项**：- 给用户发送消息时，用户需要在机器人的[可用范围]内。例如，你需要给企业全员发送消息，则需要将应用的可用范围设置为全体员工。- 给群组发送消息时，机器人需要在该群组中，且在群组内拥有发言权限。- 如果消息接收者为用户，推荐使用用户的 `open_id`',
        ),
      msg_type: z
        .string()
        .describe(
          '消息类型。**可选值有**：- text：文本- post：富文本- image：图片- file：文件- audio：语音- media：视频- sticker：表情包- interactive：卡片- share_chat：分享群名片- share_user：分享个人名片- system：系统消息。该类型仅支持在机器人单聊内推送系统消息，不支持在群聊内使用，例如下图所示突出新会话。 不同消息类型的详细介绍，参见[发送消息内容]',
        ),
      content: z
        .string()
        .describe(
          '消息内容，JSON 结构序列化后的字符串。该参数的取值与 `msg_type` 对应，例如 `msg_type` 取值为 `text`，则该参数需要传入文本类型的内容。**注意：**- JSON 字符串需进行转义。例如，换行符 `` 转义后为 `\\`。- 文本消息请求体最大不能超过 150 KB。- 卡片消息、富文本消息请求体最大不能超过 30 KB。 - 如果使用卡片模板（template_id）发送消息，实际大小也包含模板对应的卡片数据大小。 - 如果消息中包含样式标签，会使实际消息体长度大于您输入的请求体长度。- 图片需要先[上传图片]，然后使用图片的 Key 发消息。- 音频、视频、文件需要先[上传文件]，然后使用文件的 Key 发消息。注意不能使用云文档[上传素材]接口返回的 file_token。了解不同类型的消息内容格式、使用限制，可参见[发送消息内容]',
        ),
      uuid: z
        .string()
        .describe(
          '自定义设置的唯一字符串序列，用于在发送消息时请求去重。持有相同 uuid 的请求，在 1 小时内至多成功发送一条消息。**注意**：你可以参考示例值自定义参数值。当发送不同的消息内容时，如果传入了该参数，则需要在每次请求时都更换该参数的取值',
        )
        .optional(),
    }),
    params: z.object({
      receive_id_type: z
        .enum(['open_id', 'union_id', 'user_id', 'email', 'chat_id'])
        .describe(
          '消息接收者 ID 类型。支持 open_id/union_id/user_id/email/chat_id Options:open_id(标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。[了解更多：如何获取 Open ID]),union_id(标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。[了解更多：如何获取 Union ID？]),user_id(标识一个用户在某个租户内的身份。同一个用户在租户 A 和租户 B 内的 User ID 是不同的。在同一个租户内，一个用户的 User ID 在所有应用（包括商店应用）中都保持一致。User ID 主要用于在不同的应用间打通用户数据。[了解更多：如何获取 User ID？]。),email(以用户的真实邮箱来标识用户。),chat_id(以群 ID 来标识群聊。[了解更多：如何获取群 ID ]</md-enum-item>)',
        ),
    }),
  },
};
export const imV1MessageDelete = {
  project: 'im',
  name: 'im.v1.message.delete',
  sdkName: 'im.v1.message.delete',
  path: '/open-apis/im/v1/messages/:message_id',
  httpMethod: 'DELETE',
  description:
    '[Feishu/Lark]-消息-消息管理-撤回消息-调用该接口撤回指定消息。调用接口的身份不同（身份通过 Authorization 请求头参数指定），可实现的效果不同：- 机器人可以撤回该机器人自己发送的消息。- 群聊的群主可以撤回群内指定的消息',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待撤回的消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1MessageForward = {
  project: 'im',
  name: 'im.v1.message.forward',
  sdkName: 'im.v1.message.forward',
  path: '/open-apis/im/v1/messages/:message_id/forward',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-消息-消息管理-转发消息-调用该接口将一条指定的消息转发给用户、群聊或话题',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({ receive_id: z.string().describe('消息接收者 ID，ID 类型与 `receive_id_type` 的值一致') }),
    params: z.object({
      receive_id_type: z
        .enum(['open_id', 'user_id', 'union_id', 'email', 'chat_id', 'thread_id'])
        .describe(
          '消息接收者 ID 类型。 Options:open_id(标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。[了解更多：如何获取 Open ID]),user_id(标识一个用户在某个租户内的身份。同一个用户在租户 A 和租户 B 内的 User ID 是不同的。在同一个租户内，一个用户的 User ID 在所有应用（包括商店应用）中都保持一致。User ID 主要用于在不同的应用间打通用户数据。[了解更多：如何获取 User ID？]),union_id(标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。[了解更多：如何获取 Union ID？]),email(以用户的真实邮箱来标识用户。),chat_id(以群 ID 来标识群聊。[了解更多：如何获取群 ID ]),thread_id(以话题 ID 来标识话题。了解更多：[话题介绍]</md-enum-item>**当值为 `user_id`，字段权限要求**：<md-perm name="contact:user.employee_id:readonly" desc="获取用户 user ID" support_app_types="custom" tags="">获取用户 user ID</md-perm>)',
        ),
      uuid: z
        .string()
        .describe(
          '自定义设置的唯一字符串序列，用于在转发消息时请求去重。持有相同 uuid 的请求，在 1 小时内向同一目标的转发只可成功一次',
        )
        .optional(),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待转发的消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
  },
};
export const imV1MessageGet = {
  project: 'im',
  name: 'im.v1.message.get',
  sdkName: 'im.v1.message.get',
  path: '/open-apis/im/v1/messages/:message_id',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-消息-消息管理-获取指定消息的内容-调用该接口通过消息的 `message_id` 查询消息内容',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型').optional() })
      .optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
    path: z.object({
      message_id: z
        .string()
        .describe(
          '消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
  },
};
export const imV1MessageList = {
  project: 'im',
  name: 'im.v1.message.list',
  sdkName: 'im.v1.message.list',
  path: '/open-apis/im/v1/messages',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-消息-消息管理-获取会话历史消息-获取指定会话（包括单聊、群组）内的历史消息（即聊天记录）',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z.object({
      container_id_type: z
        .string()
        .describe(
          '容器类型。**可选值有**：- `chat`：包含单聊（p2p）和群聊（group）- `thread`：话题**注意**：对于 **普通对话群** 中的话题消息，通过 `chat` 容器类型仅能获取到话题的根消息，你可通过指定容器类型为 `thread` 获取话题回复中的所有消息',
        ),
      container_id: z
        .string()
        .describe(
          '容器 ID。ID 类型与 container_id_type 取值一致。- 群聊或单聊的 ID 获取方式参见[群 ID 说明]。- 话题 ID 获取参见[话题概述]的 **如何获取 thread_id** 章节',
        ),
      start_time: z
        .string()
        .describe('待查询历史信息的起始时间，秒级时间戳。**注意**：`thread` 容器类型暂不支持获取指定时间范围内的消息')
        .optional(),
      end_time: z
        .string()
        .describe('待查询历史信息的结束时间，秒级时间戳。**注意**：`thread` 容器类型暂不支持获取指定时间范围内的消息')
        .optional(),
      sort_type: z
        .enum(['ByCreateTimeAsc', 'ByCreateTimeDesc'])
        .describe(
          '消息排序方式。**注意**：使用 `page_token` 分页请求时，排序方式（`sort_type`）均与第一次请求一致，不支持中途改换排序方式。 Options:ByCreateTimeAsc(按消息创建时间升序排列),ByCreateTimeDesc(按消息创建时间降序排列)',
        )
        .optional(),
      page_size: z.number().describe('分页大小，即单次请求所返回的数据条目数').optional(),
      page_token: z
        .string()
        .describe(
          '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
        )
        .optional(),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1MessageMergeForward = {
  project: 'im',
  name: 'im.v1.message.mergeForward',
  sdkName: 'im.v1.message.mergeForward',
  path: '/open-apis/im/v1/messages/merge_forward',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-消息-消息管理-合并转发消息-将来自同一个会话内的多条消息，合并转发给指定的用户、群聊或话题',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      receive_id: z.string().describe('消息接收者 ID，ID 类型与 `receive_id_type` 的值一致'),
      message_id_list: z
        .array(z.string())
        .describe(
          '待转发的消息 ID 列表，列表内的消息必须来自同一个会话。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
    params: z.object({
      receive_id_type: z
        .enum(['open_id', 'user_id', 'union_id', 'email', 'chat_id', 'thread_id'])
        .describe(
          '消息接收者 ID 类型。 Options:open_id(标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。[了解更多：如何获取 Open ID]),user_id(标识一个用户在某个租户内的身份。同一个用户在租户 A 和租户 B 内的 User ID 是不同的。在同一个租户内，一个用户的 User ID 在所有应用（包括商店应用）中都保持一致。User ID 主要用于在不同的应用间打通用户数据。[了解更多：如何获取 User ID？]),union_id(标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。[了解更多：如何获取 Union ID？]),email(以用户的真实邮箱来标识用户。),chat_id(以群 ID 来标识群聊。[了解更多：如何获取群 ID ]),thread_id(以话题 ID 来标识话题。了解更多：[话题介绍]</md-enum-item>**当值为 `user_id`，字段权限要求**：<md-perm name="contact:user.employee_id:readonly" desc="获取用户 user ID" support_app_types="custom" tags="">获取用户 user ID</md-perm>)',
        ),
      uuid: z
        .string()
        .describe(
          '自定义设置的唯一字符串序列，用于在合并转发消息时请求去重。持有相同 uuid 的请求，在 1 小时内向同一目标的合并转发只可成功一次',
        )
        .optional(),
    }),
  },
};
export const imV1MessagePatch = {
  project: 'im',
  name: 'im.v1.message.patch',
  sdkName: 'im.v1.message.patch',
  path: '/open-apis/im/v1/messages/:message_id',
  httpMethod: 'PATCH',
  description: '[Feishu/Lark]-消息-消息卡片-更新已发送的消息卡片-通过消息 ID（message_id）更新已发送的消息卡片的内容',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      content: z
        .string()
        .describe(
          '消息卡片的内容，支持卡片 JSON 或[搭建工具]构建的卡片，需为 JSON 结构序列化后的字符串。 - 要使用卡片 JSON，参考[卡片 JSON 结构]。 - 要使用[搭建工具]构建的卡片模板，参考下文请求体示例。**注意**：- 更新的卡片消息最大不能超过 30 KB。若消息中包含大量样式标签，会使实际消息体长度大于你输入的请求体长度。- 以下示例值未转义，使用时请注意将其转为 JSON 序列化后的字符串',
        ),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待更新的消息 ID，仅支持更新卡片（消息类型为 `interactive`）。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1MessagePushFollowUp = {
  project: 'im',
  name: 'im.v1.message.pushFollowUp',
  sdkName: 'im.v1.message.pushFollowUp',
  path: '/open-apis/im/v1/messages/:message_id/push_follow_up',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-消息-消息管理-添加跟随气泡-调用该接口在最新一条消息下方添加气泡样式的内容，当消息接收者点击气泡或者新消息到达后，气泡消失',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      follow_ups: z
        .array(
          z.object({
            content: z.string().describe('气泡的内容'),
            i18n_contents: z
              .array(
                z.object({
                  content: z.string().describe('`language` 参数对应的内容'),
                  language: z
                    .enum([
                      'en_us',
                      'zh_cn',
                      'zh_hk',
                      'zh_tw',
                      'ja_jp',
                      'id_id',
                      'vi_vn',
                      'th_th',
                      'pt_br',
                      'es_es',
                      'ko_kr',
                      'de_de',
                      'fr_fr',
                      'it_it',
                      'ru_ru',
                      'ms_my',
                    ])
                    .describe(
                      '语言类型。 Options:en_us(English 英文),zh_cn(SimplifiedChinese 简体中文),zh_hk(SimplifiedChineseHongKong 繁体中文-香港),zh_tw(SimplifiedChineseTaiwan 繁体中文-台湾),ja_jp(Japanese 日语),id_id(Indonesian 印尼语),vi_vn(Vietnamese 越南语),th_th(Thai 泰语),pt_br(Portuguese 葡萄牙语),es_es(Spanish 西班牙语),ko_kr(Korean 韩语),de_de(German 德语),fr_fr(French 法语),it_it(Italian 意大利语),ru_ru(Russian 俄语),ms_my(Malay 马来语)',
                    ),
                }),
              )
              .describe('气泡的多语言内容')
              .optional(),
          }),
        )
        .describe('跟随气泡列表'),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          '机器人发送的消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
  },
};
export const imV1MessageReactionCreate = {
  project: 'im',
  name: 'im.v1.messageReaction.create',
  sdkName: 'im.v1.messageReaction.create',
  path: '/open-apis/im/v1/messages/:message_id/reactions',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-消息-表情回复-添加消息表情回复-给指定消息添加指定类型的表情回复',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      reaction_type: z
        .object({ emoji_type: z.string().describe('emoji 类型。支持的表情与对应的 emoji_type 值参见[表情文案说明]') })
        .describe('表情类型'),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待添加表情回复的消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1MessageReactionDelete = {
  project: 'im',
  name: 'im.v1.messageReaction.delete',
  sdkName: 'im.v1.messageReaction.delete',
  path: '/open-apis/im/v1/messages/:message_id/reactions/:reaction_id',
  httpMethod: 'DELETE',
  description: '[Feishu/Lark]-消息-表情回复-删除消息表情回复-删除指定消息的某一表情回复',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待删除表情回复的消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
      reaction_id: z
        .string()
        .describe(
          '待删除的表情回复 ID，该 ID 获取方式：- 调用[添加消息表情回复]接口添加表情回复后，在返回结果中获取。- 调用[获取消息表情回复]接口，获取某一表情回复的 ID',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1MessageReactionList = {
  project: 'im',
  name: 'im.v1.messageReaction.list',
  sdkName: 'im.v1.messageReaction.list',
  path: '/open-apis/im/v1/messages/:message_id/reactions',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-消息-表情回复-获取消息表情回复-获取指定消息内的表情回复列表，支持仅获取特定类型的表情回复',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        reaction_type: z
          .string()
          .describe(
            '待查询的表情类型，支持的枚举值参考[表情文案说明]中的 emoji_type 值。**注意**：该参数为可选参数，不传入该参数时将查询消息内所有的表情回复',
          )
          .optional(),
        page_token: z
          .string()
          .describe(
            '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
          )
          .optional(),
        page_size: z.number().describe('分页大小，用于限制一次请求返回的数据条目数。**默认值**：20').optional(),
        user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型').optional(),
      })
      .optional(),
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待查询的消息ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1MessageReadUsers = {
  project: 'im',
  name: 'im.v1.message.readUsers',
  sdkName: 'im.v1.message.readUsers',
  path: '/open-apis/im/v1/messages/:message_id/read_users',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-消息-消息管理-查询消息已读信息-查询指定消息是否已读。接口只返回已读用户的信息，不返回未读用户的信息',
  accessTokens: ['tenant'],
  schema: {
    params: z.object({
      user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型'),
      page_size: z.number().describe('分页大小，用于限制单次请求所返回的数据条目数').optional(),
      page_token: z
        .string()
        .describe(
          '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
        )
        .optional(),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待查询的消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
  },
};
export const imV1MessageReply = {
  project: 'im',
  name: 'im.v1.message.reply',
  sdkName: 'im.v1.message.reply',
  path: '/open-apis/im/v1/messages/:message_id/reply',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-消息-消息管理-回复消息-调用该接口回复指定消息。回复的内容支持文本、富文本、卡片、群名片、个人名片、图片、视频、文件等多种类型',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      content: z
        .string()
        .describe(
          '消息内容，JSON 结构序列化后的字符串。该参数的取值与 `msg_type` 对应，例如 `msg_type` 取值为 `text`，则该参数需要传入文本类型的内容。**注意：**- JSON 字符串需进行转义。例如，换行符 `` 转义后为 `\\`。- 文本消息请求体最大不能超过 150 KB。- 卡片消息、富文本消息请求体最大不能超过 30 KB。- 如果使用卡片模板（template_id）发送消息，实际大小也包含模板对应的卡片数据大小。- 如果消息中包含样式标签，会使实际消息体长度大于您输入的请求体长度。- 图片需要先[上传图片]，然后使用图片的 Key 发消息。- 音频、视频、文件需要先[上传文件]，然后使用文件的 Key 发消息。了解不同类型的消息内容格式、使用限制，可参见[发送消息内容]',
        ),
      msg_type: z
        .string()
        .describe(
          '消息类型。**可选值有**：- text：文本- post：富文本- image：图片- file：文件- audio：语音- media：视频- sticker：表情包- interactive：卡片- share_chat：分享群名片- share_user：分享个人名片不同消息类型的详细介绍，参见[发送消息内容]',
        ),
      reply_in_thread: z
        .boolean()
        .describe(
          '是否以话题形式回复。取值为 true 时将以话题形式回复。**注意**：如果要回复的消息已经是话题形式的消息，则默认以话题形式进行回复',
        )
        .optional(),
      uuid: z
        .string()
        .describe(
          '自定义设置的唯一字符串序列，用于在回复消息时请求去重。不填则表示不去重。持有相同 uuid 的请求，在 1 小时内至多成功回复一条消息。**注意**：你可以参考示例值自定义参数值。当回复的内容不同时，如果传入了该参数，则需要在每次请求时都更换该参数的取值',
        )
        .optional(),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待回复的消息的 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
  },
};
export const imV1MessageUpdate = {
  project: 'im',
  name: 'im.v1.message.update',
  sdkName: 'im.v1.message.update',
  path: '/open-apis/im/v1/messages/:message_id',
  httpMethod: 'PUT',
  description:
    '[Feishu/Lark]-消息-消息管理-编辑消息-调用该接口编辑已发送的消息内容，支持编辑文本、富文本消息。如需编辑卡片消息，请使用[更新应用发送的消息卡片]接口',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      msg_type: z.string().describe('消息类型。**可选值有**：- text：文本- post：富文本'),
      content: z
        .string()
        .describe(
          '消息内容，JSON 结构序列化后的字符串。该参数的取值与 `msg_type` 对应，例如 `msg_type` 取值为 `text`，则该参数需要传入文本类型的内容。**注意：**- JSON字符串需进行转义，如换行符转义后为`\\`- 文本消息请求体最大不能超过 150 KB- 富文本消息请求体最大不能超过 30 KB- 如果消息中包含样式标签，会使实际消息体长度大于您输入的请求体长度。了解不同类型的消息内容格式、使用限制，可参见[发送消息内容]',
        ),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待编辑的消息 ID，仅支持编辑文本（text）、富文本（post）消息。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
  },
};
export const imV1MessageUrgentApp = {
  project: 'im',
  name: 'im.v1.message.urgentApp',
  sdkName: 'im.v1.message.urgentApp',
  path: '/open-apis/im/v1/messages/:message_id/urgent_app',
  httpMethod: 'PATCH',
  description:
    '[Feishu/Lark]-消息-消息加急-发送应用内加急-调用该接口把指定消息加急给目标用户，加急仅在飞书客户端内通知。了解加急可参见[加急功能]',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      user_id_list: z
        .array(z.string())
        .describe(
          '加急的目标用户 ID 列表。ID 类型与查询参数 user_id_type 取值一致，推荐使用 open_id。**注意**：需要确保目标用户在加急消息所属的会话内。如果 ID 列表中有用户不在消息所属的会话内，则接口会将这些无效的 ID 返回（响应参数 invalid_user_id_list），只加急有效的用户 ID。如果 ID 列表内的所有 ID 均无效，则会返回 `230001` 错误码。 **数据校验规则**：列表长度不能大于 200',
        ),
    }),
    params: z.object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型') }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待加急的消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取。**注意**：不支持加急[批量发送的消息]（对应的消息ID 格式为 `bm_xxx`）',
        ),
    }),
  },
};
export const imV1MessageUrgentPhone = {
  project: 'im',
  name: 'im.v1.message.urgentPhone',
  sdkName: 'im.v1.message.urgentPhone',
  path: '/open-apis/im/v1/messages/:message_id/urgent_phone',
  httpMethod: 'PATCH',
  description:
    '[Feishu/Lark]-消息-消息加急-发送电话加急-调用该接口把指定消息加急给目标用户，加急将通过飞书客户端和电话进行通知。了解加急可参见[加急功能]',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      user_id_list: z
        .array(z.string())
        .describe(
          '加急的目标用户 ID 列表。ID 类型与查询参数 user_id_type 取值一致，推荐使用 open_id。**注意**：需要确保目标用户在加急消息所属的会话内。如果 ID 列表中有用户不在消息所属的会话内，则接口会将这些无效的 ID 返回（响应参数 invalid_user_id_list），只加急有效的用户 ID。如果 ID 列表内的所有 ID 均无效，则会返回 `230001` 错误码。 **数据校验规则**：列表长度不能大于 200',
        ),
    }),
    params: z.object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型') }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待加急的消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取。**注意**：不支持加急[批量发送的消息]（对应的消息ID 格式为 `bm_xxx`）',
        ),
    }),
  },
};
export const imV1MessageUrgentSms = {
  project: 'im',
  name: 'im.v1.message.urgentSms',
  sdkName: 'im.v1.message.urgentSms',
  path: '/open-apis/im/v1/messages/:message_id/urgent_sms',
  httpMethod: 'PATCH',
  description:
    '[Feishu/Lark]-消息-消息加急-发送短信加急-调用该接口把指定消息加急给目标用户，加急将通过飞书客户端和短信进行通知。了解加急可参见[加急功能]',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      user_id_list: z
        .array(z.string())
        .describe(
          '加急的目标用户 ID 列表。ID 类型与查询参数 user_id_type 取值一致，推荐使用 open_id。**注意**：需要确保目标用户在加急消息所属的会话内。如果 ID 列表中有用户不在消息所属的会话内，则接口会将这些无效的 ID 返回（响应参数 invalid_user_id_list），只加急有效的用户 ID。如果 ID 列表内的所有 ID 均无效，则会返回 `230001` 错误码。 **数据校验规则**：列表长度不能大于 200',
        ),
    }),
    params: z.object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('用户ID类型') }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待加急的消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取。**注意**：不支持加急[批量发送的消息]（对应的消息ID 格式为 `bm_xxx`）',
        ),
    }),
  },
};
export const imV1PinCreate = {
  project: 'im',
  name: 'im.v1.pin.create',
  sdkName: 'im.v1.pin.create',
  path: '/open-apis/im/v1/pins',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-消息-Pin-Pin 消息-Pin 一条指定的消息。Pin 消息的效果可参见[Pin 消息概述]',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      message_id: z
        .string()
        .describe(
          '待 Pin 的消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1PinDelete = {
  project: 'im',
  name: 'im.v1.pin.delete',
  sdkName: 'im.v1.pin.delete',
  path: '/open-apis/im/v1/pins/:message_id',
  httpMethod: 'DELETE',
  description: '[Feishu/Lark]-消息-Pin-移除 Pin 消息-移除一条指定消息的 Pin',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      message_id: z
        .string()
        .describe(
          '待移除 Pin 的消息 ID。ID 获取方式： - 调用[发送消息]接口后，从响应结果的 `message_id` 参数获取。- 监听[接收消息]事件，当触发该事件后可以从事件体内获取消息的 `message_id`。- 调用[获取会话历史消息]接口，从响应结果的 `message_id` 参数获取',
        ),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1PinList = {
  project: 'im',
  name: 'im.v1.pin.list',
  sdkName: 'im.v1.pin.list',
  path: '/open-apis/im/v1/pins',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-消息-Pin-获取群内 Pin 消息-获取指定群、指定时间范围内的所有 Pin 消息',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z.object({
      chat_id: z.string().describe('待获取 Pin 消息的群组 ID。获取方式参见[群 ID 说明]'),
      start_time: z
        .string()
        .describe(
          '获取 Pin 消息的起始时间，毫秒级时间戳。**注意**：- 若未传值默认获取到群聊内最早的 Pin 消息。- 传值时需小于 `end_time` 值',
        )
        .optional(),
      end_time: z
        .string()
        .describe(
          '获取 Pin 消息的结束时间，毫秒级时间戳。**注意**：- 若未传值默认从群聊内最新的 Pin 消息开始获取。- 传值时需大于 `start_time` 值',
        )
        .optional(),
      page_size: z.number().describe('分页大小，用于限制一次请求返回的数据条目数').optional(),
      page_token: z
        .string()
        .describe(
          '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
        )
        .optional(),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const imV1ThreadForward = {
  project: 'im',
  name: 'im.v1.thread.forward',
  sdkName: 'im.v1.thread.forward',
  path: '/open-apis/im/v1/threads/:thread_id/forward',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-消息-消息管理-转发话题-调用该接口将话题转发至指定的用户、群聊或话题',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({ receive_id: z.string().describe('消息接收者 ID，ID 类型与 `receive_id_type` 的值一致') }),
    params: z.object({
      receive_id_type: z
        .enum(['open_id', 'union_id', 'user_id', 'email', 'chat_id', 'thread_id'])
        .describe(
          '消息接收者 ID 类型。 Options:open_id(OpenID 标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。[了解更多：如何获取 Open ID]),union_id(UnionID 标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。[了解更多：如何获取 Union ID？]),user_id(UserID 标识一个用户在某个租户内的身份。同一个用户在租户 A 和租户 B 内的 User ID 是不同的。在同一个租户内，一个用户的 User ID 在所有应用（包括商店应用）中都保持一致。User ID 主要用于在不同的应用间打通用户数据。[了解更多：如何获取 User ID？]),email(以用户的真实邮箱来标识用户。),chat_id(ChatID 以群 ID 来标识群聊。[了解更多：如何获取群 ID ]。),thread_id(ThreadID 以话题 ID 来标识话题。了解更多：[话题介绍]</md-enum-item>**当值为 `user_id`，字段权限要求**：<md-perm name="contact:user.employee_id:readonly" desc="获取用户 user ID" support_app_types="custom" tags="">获取用户 user ID</md-perm>)',
        ),
      uuid: z
        .string()
        .describe(
          '自定义设置的唯一字符串序列，用于在转发话题时请求去重。持有相同 uuid 的请求，在 1 小时内向同一目标的转发只可成功一次',
        )
        .optional(),
    }),
    path: z.object({
      thread_id: z.string().describe('要转发的话题ID，获取方式参见[话题概述]的 **如何获取 thread_id** 章节'),
    }),
  },
};
export const imV1Tools = [
  imV1BatchMessageDelete,
  imV1BatchMessageGetProgress,
  imV1BatchMessageReadUser,
  imV1ChatAnnouncementGet,
  imV1ChatAnnouncementPatch,
  imV1ChatCreate,
  imV1ChatDelete,
  imV1ChatGet,
  imV1ChatLink,
  imV1ChatList,
  imV1ChatManagersAddManagers,
  imV1ChatManagersDeleteManagers,
  imV1ChatMembersCreate,
  imV1ChatMembersDelete,
  imV1ChatMembersGet,
  imV1ChatMembersIsInChat,
  imV1ChatMembersMeJoin,
  imV1ChatMenuItemPatch,
  imV1ChatMenuTreeCreate,
  imV1ChatMenuTreeDelete,
  imV1ChatMenuTreeGet,
  imV1ChatMenuTreeSort,
  imV1ChatModerationGet,
  imV1ChatModerationUpdate,
  imV1ChatSearch,
  imV1ChatTabCreate,
  imV1ChatTabDeleteTabs,
  imV1ChatTabListTabs,
  imV1ChatTabSortTabs,
  imV1ChatTabUpdateTabs,
  imV1ChatTopNoticeDeleteTopNotice,
  imV1ChatTopNoticePutTopNotice,
  imV1ChatUpdate,
  imV1MessageCreate,
  imV1MessageDelete,
  imV1MessageForward,
  imV1MessageGet,
  imV1MessageList,
  imV1MessageMergeForward,
  imV1MessagePatch,
  imV1MessagePushFollowUp,
  imV1MessageReactionCreate,
  imV1MessageReactionDelete,
  imV1MessageReactionList,
  imV1MessageReadUsers,
  imV1MessageReply,
  imV1MessageUpdate,
  imV1MessageUrgentApp,
  imV1MessageUrgentPhone,
  imV1MessageUrgentSms,
  imV1PinCreate,
  imV1PinDelete,
  imV1PinList,
  imV1ThreadForward,
];
