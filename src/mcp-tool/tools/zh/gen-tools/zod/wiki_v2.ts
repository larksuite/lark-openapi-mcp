import { z } from 'zod';
export type wikiV2ToolName =
  | 'wiki.v2.node.search'
  | 'wiki.v2.space.create'
  | 'wiki.v2.space.get'
  | 'wiki.v2.space.getNode'
  | 'wiki.v2.space.list'
  | 'wiki.v2.spaceMember.create'
  | 'wiki.v2.spaceMember.delete'
  | 'wiki.v2.spaceMember.list'
  | 'wiki.v2.spaceNode.copy'
  | 'wiki.v2.spaceNode.create'
  | 'wiki.v2.spaceNode.list'
  | 'wiki.v2.spaceNode.move'
  | 'wiki.v2.spaceNode.moveDocsToWiki'
  | 'wiki.v2.spaceNode.updateTitle'
  | 'wiki.v2.spaceSetting.update'
  | 'wiki.v2.task.get';
export const wikiV2NodeSearch = {
  project: 'wiki',
  name: 'wiki.v2.node.search',
  sdkName: 'wiki.v2.node.search',
  path: '/open-apis/wiki/v2/nodes/search',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-云文档-知识库-搜索 Wiki',
  accessTokens: ['user'],
  schema: {
    data: z.object({
      query: z.string().describe('搜索关键词'),
      space_id: z.string().describe('文档所属的知识空间ID，为空搜索所有 wiki').optional(),
      node_id: z
        .string()
        .describe('wiki token，不为空搜索该节点及其所有子节点，为空搜索所有 wiki（根据 space_id 选择 space）')
        .optional(),
    }),
    params: z
      .object({
        page_token: z
          .string()
          .describe(
            '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果',
          )
          .optional(),
        page_size: z.number().describe('分页大小').optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceCreate = {
  project: 'wiki',
  name: 'wiki.v2.space.create',
  sdkName: 'wiki.v2.space.create',
  path: '/open-apis/wiki/v2/spaces',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-云文档-知识库-知识空间-创建知识空间-此接口用于创建知识空间',
  accessTokens: ['user'],
  schema: {
    data: z
      .object({
        name: z.string().describe('知识空间名称').optional(),
        description: z.string().describe('知识空间描述').optional(),
        open_sharing: z
          .enum(['open', 'closed'])
          .describe('表示知识空间的分享状态 Options:open(打开),closed(关闭)')
          .optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceGet = {
  project: 'wiki',
  name: 'wiki.v2.space.get',
  sdkName: 'wiki.v2.space.get',
  path: '/open-apis/wiki/v2/spaces/:space_id',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-云文档-知识库-知识空间-获取知识空间信息-此接口用于根据知识空间 ID 查询知识空间的信息，包括空间的类型、可见性、分享状态等',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        lang: z
          .enum(['zh', 'id', 'de', 'en', 'es', 'fr', 'it', 'pt', 'vi', 'ru', 'hi', 'th', 'ko', 'ja', 'zh-HK', 'zh-TW'])
          .describe(
            '当查询**我的文档库**时，指定返回的文档库名称展示语言。 Options:zh(LangZH 简体中文),id(LangID 印尼语),de(LangDE 德语),en(LangEN 英语),es(LangES 西班牙语),fr(LangFR 法语),it(LangIT 意大利语),pt(LangPT 葡萄牙语),vi(LangVI 越南语),ru(LangRU 俄语),hi(LangHI 印地语),th(LangTH 泰语),ko(LangKO 韩语),ja(LangJA 日语),zh-HK(LangZHHK 繁体中文（中国香港）),zh-TW(LangZHTW 繁体中文（中国台湾）)',
          )
          .optional(),
      })
      .optional(),
    path: z
      .object({
        space_id: z
          .string()
          .describe(
            '知识空间 ID。可通过以下两种方式获取。了解更多，参考[知识库概述]。- 调用 [获取知识空间列表]获取- 如果你是知识库管理员，可以进入知识库设置页面，复制地址栏的数字部分：https://sample.feishu.cn/wiki/settings/==6870403571079249922==',
          )
          .optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceGetNode = {
  project: 'wiki',
  name: 'wiki.v2.space.getNode',
  sdkName: 'wiki.v2.space.getNode',
  path: '/open-apis/wiki/v2/spaces/get_node',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-云文档-知识库-节点-获取知识空间节点信息-获取知识空间节点信息',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z.object({
      token: z
        .string()
        .describe(
          '知识库节点或对应云文档的实际 token。- 知识库节点 token：如果 URL 链接中 token 前为 wiki，该 token 为知识库的节点 token。- 云文档实际 token：如果 URL 链接中 token 前为 docx、base、sheets 等非 wiki 类型，则说明该 token 是当前云文档的实际 token。了解更多，请参考[文档常见问题-如何获取云文档资源相关 token（id）]。**注意**：使用云文档 token 查询时，需要对 obj_type 参数传入文档对应的类型',
        ),
      obj_type: z
        .enum(['doc', 'docx', 'sheet', 'mindnote', 'bitable', 'file', 'slides', 'wiki'])
        .describe(
          '文档类型。不传时默认以 wiki 类型查询。 Options:doc(ObjTypeDoc 旧版文档),docx(ObjTypeDocx 新版文档),sheet(ObjTypeSheet 表格),mindnote(ObjTypeMindNote 思维导图),bitable(ObjTypeBitable 多维表格),file(ObjTypeFile 文件),slides(ObjTypeSlides 幻灯片),wiki(ObjTypeWiki 知识库节点)',
        )
        .optional(),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceList = {
  project: 'wiki',
  name: 'wiki.v2.space.list',
  sdkName: 'wiki.v2.space.list',
  path: '/open-apis/wiki/v2/spaces',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-云文档-知识库-知识空间-获取知识空间列表-此接口用于获取有权限访问的知识空间列表',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        page_size: z.number().describe('分页大小').optional(),
        page_token: z
          .string()
          .describe(
            '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
          )
          .optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceMemberCreate = {
  project: 'wiki',
  name: 'wiki.v2.spaceMember.create',
  sdkName: 'wiki.v2.spaceMember.create',
  path: '/open-apis/wiki/v2/spaces/:space_id/members',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-云文档-知识库-空间成员-添加知识空间成员-添加知识空间成员或管理员',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      member_type: z
        .string()
        .describe(
          '要添加的成员或管理员的身份类型。可选值：- openchat：群组 ID。参考[群 ID 说明]获取- userid：用户 ID。详情参考[如何获取 User ID]- email：用户邮箱- opendepartmentid：部门 ID。参考[部门资源介绍]获取- openid：用户的 Open ID。详情参考[如何获取 Open ID]- unionid：用户的 Union ID。详情参考[如何获取 Union ID]',
        ),
      member_id: z
        .string()
        .describe('成员或管理员的 ID，值的类型由 member_type 参数决定。参考 member_type 的描述获取不同类型的 ID'),
      member_role: z.string().describe('成员的角色类型。可选值:- admin：管理员- member：成员'),
    }),
    params: z.object({ need_notification: z.boolean().describe('添加权限后是否通知对方').optional() }).optional(),
    path: z
      .object({
        space_id: z
          .string()
          .describe(
            '知识空间 ID。可通过以下两种方式获取。了解更多，参考[知识库概述]。- 调用 [获取知识空间列表]获取- 如果你是知识库管理员，可以进入知识库设置页面，复制地址栏的数字部分：https://sample.feishu.cn/wiki/settings/==6870403571079249922==',
          )
          .optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceMemberDelete = {
  project: 'wiki',
  name: 'wiki.v2.spaceMember.delete',
  sdkName: 'wiki.v2.spaceMember.delete',
  path: '/open-apis/wiki/v2/spaces/:space_id/members/:member_id',
  httpMethod: 'DELETE',
  description: '[Feishu/Lark]-云文档-知识库-空间成员-删除知识空间成员-此接口用于删除知识空间成员或管理员',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      member_type: z
        .string()
        .describe(
          '“openchat” - 群id “userid” - 用户id“email” - 邮箱“opendepartmentid” - 部门id“openid” - 应用openid“unionid” - [unionid]',
        ),
      member_role: z.string().describe('角色:“admin” - 管理员“member” - 成员'),
      type: z
        .enum(['user', 'chat', 'department'])
        .describe('知识库协作者类型（暂不支持） Options:user(用户),chat(群组),department(组织架构)')
        .optional(),
    }),
    path: z.object({
      space_id: z.string().describe('知识空间id'),
      member_id: z.string().describe('成员id，值的类型由请求体的 member_type 参数决定'),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceMemberList = {
  project: 'wiki',
  name: 'wiki.v2.spaceMember.list',
  sdkName: 'wiki.v2.spaceMember.list',
  path: '/open-apis/wiki/v2/spaces/:space_id/members',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-云文档-知识库-空间成员-获取知识空间成员列表-获取知识空间的成员与管理员列表',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        page_size: z.number().describe('分页大小').optional(),
        page_token: z
          .string()
          .describe(
            '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
          )
          .optional(),
      })
      .optional(),
    path: z.object({ space_id: z.string().describe('知识空间 ID') }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceNodeCopy = {
  project: 'wiki',
  name: 'wiki.v2.spaceNode.copy',
  sdkName: 'wiki.v2.spaceNode.copy',
  path: '/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/copy',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-云文档-知识库-节点-创建知识空间节点副本-此接口用于在知识空间创建节点副本到指定位置',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        target_parent_token: z
          .string()
          .describe('目标父节点 Token。- 目标知识空间 ID 与目标父节点 Token 不可同时为空')
          .optional(),
        target_space_id: z
          .string()
          .describe('目标知识空间 ID。- 目标知识空间 ID 与目标父节点 Token 不可同时为空')
          .optional(),
        title: z.string().describe('复制后的新标题。如果填空，则新标题为空。如果不填，则使用原节点标题').optional(),
      })
      .optional(),
    path: z
      .object({
        space_id: z.string().describe('知识空间id').optional(),
        node_token: z.string().describe('节点token').optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceNodeCreate = {
  project: 'wiki',
  name: 'wiki.v2.spaceNode.create',
  sdkName: 'wiki.v2.spaceNode.create',
  path: '/open-apis/wiki/v2/spaces/:space_id/nodes',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-云文档-知识库-节点-创建知识空间节点-此接口用于在知识节点里创建[节点]到指定位置',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      obj_type: z
        .enum(['doc', 'sheet', 'mindnote', 'bitable', 'file', 'docx', 'slides'])
        .describe(
          '文档类型，对于快捷方式，该字段是对应的实体的obj_type。 Options:doc(ObjTypeDoc 已废弃，创建文档请使用`docx`。详情参考[旧版文档（Docs 1.0）创建能力下线说明]。),sheet(ObjTypeSheet 表格),mindnote(ObjTypeMindNote 思维导图),bitable(ObjTypeBitable 多维表格),file(ObjTypeFile 文件),docx(ObjTypeDocx 新版文档),slides(ObjTypeSlides 幻灯片)',
        ),
      parent_node_token: z.string().describe('父节点 token。若当前节点为一级节点，父节点 token 为空').optional(),
      node_type: z
        .enum(['origin', 'shortcut'])
        .describe('节点类型 Options:origin(NodeTypeEntity 实体),shortcut(NodeTypeShortCut 快捷方式)'),
      origin_node_token: z.string().describe('快捷方式对应的实体node_token，当节点为快捷方式时，该值不为空').optional(),
      title: z.string().describe('文档标题').optional(),
    }),
    path: z.object({ space_id: z.string().describe('知识空间id[获取方式]').optional() }).optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceNodeList = {
  project: 'wiki',
  name: 'wiki.v2.spaceNode.list',
  sdkName: 'wiki.v2.spaceNode.list',
  path: '/open-apis/wiki/v2/spaces/:space_id/nodes',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-云文档-知识库-节点-获取知识空间子节点列表-此接口用于分页获取Wiki节点的子节点列表。此接口为分页接口。由于权限过滤，可能返回列表为空，但分页标记（has_more）为true，可以继续分页请求',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        page_size: z.number().describe('分页大小').optional(),
        page_token: z
          .string()
          .describe(
            '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果',
          )
          .optional(),
        parent_node_token: z.string().describe('父节点token').optional(),
      })
      .optional(),
    path: z.object({ space_id: z.string().describe('知识空间id').optional() }).optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceNodeMove = {
  project: 'wiki',
  name: 'wiki.v2.spaceNode.move',
  sdkName: 'wiki.v2.spaceNode.move',
  path: '/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/move',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-云文档-知识库-节点-移动知识空间节点-此方法用于在Wiki内移动节点，支持跨知识空间移动。如果有子节点，会携带子节点一起移动',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        target_parent_token: z.string().describe('移动到的父节点token').optional(),
        target_space_id: z.string().describe('移动到的知识空间ID').optional(),
      })
      .optional(),
    path: z.object({
      space_id: z.string().describe('知识空间id'),
      node_token: z.string().describe('需要迁移的节点token'),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceNodeMoveDocsToWiki = {
  project: 'wiki',
  name: 'wiki.v2.spaceNode.moveDocsToWiki',
  sdkName: 'wiki.v2.spaceNode.moveDocsToWiki',
  path: '/open-apis/wiki/v2/spaces/:space_id/nodes/move_docs_to_wiki',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-云文档-知识库-云文档-移动云空间文档至知识空间-该接口允许移动云空间文档至知识空间，并挂载在指定位置',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      parent_wiki_token: z.string().describe('节点的父亲token。传空或不传时将移动为知识空间一级节点').optional(),
      obj_type: z
        .enum(['doc', 'sheet', 'bitable', 'mindnote', 'docx', 'file', 'slides'])
        .describe(
          '文档类型 Options:doc(ObjTypeDoc 旧版文档),sheet(ObjTypeSheet 表格),bitable(ObjTypeBitable 多维表格),mindnote(ObjTypeMindNote 思维导图),docx(ObjTypeDocx 新版文档),file(ObjTypeFile 文件),slides(ObjTypeSlides slides（幻灯片）)',
        ),
      obj_token: z.string().describe('文档token'),
      apply: z
        .boolean()
        .describe('没有权限时，是否申请移动文档。如果申请移动，文档将在处理人同意时自动移动至指定位置')
        .optional(),
    }),
    path: z.object({ space_id: z.string().describe('知识库id') }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceNodeUpdateTitle = {
  project: 'wiki',
  name: 'wiki.v2.spaceNode.updateTitle',
  sdkName: 'wiki.v2.spaceNode.updateTitle',
  path: '/open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/update_title',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-云文档-知识库-节点-更新知识空间节点标题-此接口用于更新节点标题',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({ title: z.string().describe('节点新标题') }),
    path: z
      .object({
        space_id: z.string().describe('知识空间ID').optional(),
        node_token: z.string().describe('节点token').optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2SpaceSettingUpdate = {
  project: 'wiki',
  name: 'wiki.v2.spaceSetting.update',
  sdkName: 'wiki.v2.spaceSetting.update',
  path: '/open-apis/wiki/v2/spaces/:space_id/setting',
  httpMethod: 'PUT',
  description: '[Feishu/Lark]-云文档-知识库-空间设置-更新知识空间设置-根据space_id更新知识空间公共设置',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        create_setting: z
          .string()
          .describe('谁可以创建空间的一级页面： "admin_and_member" = 管理员和成员 "admin" - 仅管理员')
          .optional(),
        security_setting: z
          .string()
          .describe('可阅读用户可否创建副本/打印/导出/复制： "allow" - 允许 "not_allow" - 不允许')
          .optional(),
        comment_setting: z.string().describe('可阅读用户可否评论： "allow" - 允许 "not_allow" - 不允许').optional(),
      })
      .optional(),
    path: z.object({ space_id: z.string().describe('知识空间id').optional() }).optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2TaskGet = {
  project: 'wiki',
  name: 'wiki.v2.task.get',
  sdkName: 'wiki.v2.task.get',
  path: '/open-apis/wiki/v2/tasks/:task_id',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-云文档-知识库-云文档-获取任务结果-该方法用于获取wiki异步任务的结果',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z.object({
      task_type: z.literal('move').describe('任务类型 Options:move([移动云空间文档至知识空间]任务)'),
    }),
    path: z.object({ task_id: z.string().describe('任务id').optional() }).optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV2Tools = [
  wikiV2NodeSearch,
  wikiV2SpaceCreate,
  wikiV2SpaceGet,
  wikiV2SpaceGetNode,
  wikiV2SpaceList,
  wikiV2SpaceMemberCreate,
  wikiV2SpaceMemberDelete,
  wikiV2SpaceMemberList,
  wikiV2SpaceNodeCopy,
  wikiV2SpaceNodeCreate,
  wikiV2SpaceNodeList,
  wikiV2SpaceNodeMove,
  wikiV2SpaceNodeMoveDocsToWiki,
  wikiV2SpaceNodeUpdateTitle,
  wikiV2SpaceSettingUpdate,
  wikiV2TaskGet,
];
