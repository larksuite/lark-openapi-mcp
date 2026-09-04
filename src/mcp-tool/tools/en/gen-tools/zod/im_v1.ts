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
  description:
    '[Feishu/Lark]-Messaging-Batch message-Recall messages in batches-This interface is used to withdraw messages sent through the [batch send message] interface',
  accessTokens: ['tenant'],
  schema: {
    path: z.object({
      batch_message_id: z
        .string()
        .describe(
          'The ID of the batch message task to be withdrawn. The ID is the `message_id` field in the return value of the [Batch Send Messages] interface, which is used to identify a batch message sending request',
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
    '[Feishu/Lark]-Messaging-Batch message-Query the overall progress of a batch message-After [send batch messages] or [recall batch messages], you can use this interface to query the message send and recall progress',
  accessTokens: ['tenant'],
  schema: {
    path: z.object({
      batch_message_id: z
        .string()
        .describe(
          'The batch message task ID to be queried. This ID is the `message_id` field in the return value of the [Batch Send Messages] interface, which is used to identify a batch message sending request',
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
    '[Feishu/Lark]-Messaging-Batch message-Query the number of pushers and readers of batch messages-After [sending messages in batches], you can use this interface to query the total number of people who have received the message push and the number of people who have read the message',
  accessTokens: ['tenant'],
  schema: {
    path: z.object({
      batch_message_id: z
        .string()
        .describe(
          'The batch message task ID to be queried. This ID is the `message_id` field in the return value of the [Batch Send Messages] interface, which is used to identify a batch message sending request',
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
    '[Feishu/Lark]-Group Chat-Group announcement-Obtain group announcement information-Obtains the group announcement in a chat, with the same format as [Docs]',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type').optional() })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Single chat (group type is `p2p`) does not support getting group announcements',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatAnnouncementPatch = {
  project: 'im',
  name: 'im.v1.chatAnnouncement.patch',
  sdkName: 'im.v1.chatAnnouncement.patch',
  path: '/open-apis/im/v1/chats/:chat_id/announcement',
  httpMethod: 'PATCH',
  description:
    '[Feishu/Lark]-Group Chat-Group announcement-Update group announcement info-Updates the group announcement information in a chat, with the same format as [Docs], newer document formats are not supported',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      revision: z
        .string()
        .describe(
          'int64 type of the current document version number, which is returned by calling the "get" API.**Note**：The difference between the incoming version number and the latest version number cannot exceed 100',
        ),
      requests: z
        .array(z.string())
        .describe(
          'Announcement content. This parameter must be passed in when calling the interface. The format of the announcement content is the same as the format of updating the old version of the document content. For the specific data structure, refer to [Edit the old version of the document content]',
        )
        .optional(),
    }),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Single chat (group type is `p2p`) does not support updating group announcements',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatCreate = {
  project: 'im',
  name: 'im.v1.chat.create',
  sdkName: 'im.v1.chat.create',
  path: '/open-apis/im/v1/chats',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Group Chat-Group management-Create a group-Create a group chat. When creating a group chat, you can set the group avatar, group name, group owner, group type and other configurations. You can also invite group members and group bots to join the group',
  accessTokens: ['tenant'],
  schema: {
    data: z
      .object({
        avatar: z
          .string()
          .describe(
            'Image Key of group avatar- Can be obtained by [upload image] (Note: ==image_type== of uploaded image needs to be specified as ==avatar==)- If no value is passed, the system default avatar will be used',
          )
          .optional(),
        name: z
          .string()
          .describe(
            'Group name**Notes**:- It is recommended that the group name does not exceed 60 characters.- The length of the public group name must be at least 2 characters.- If the private group does not fill in the group name, the group name defaults to "`(no titile)`"',
          )
          .optional(),
        description: z
          .string()
          .describe('Group description. Recommended not to exceed 100 characters.**Default value**: empty')
          .optional(),
        i18n_names: z
          .object({
            zh_cn: z.string().describe('Chinese name').optional(),
            en_us: z.string().describe('English name').optional(),
            ja_jp: z.string().describe('Japanese name').optional(),
          })
          .describe(
            'Internationalized group name**Notice**:- It is recommended not to exceed 60 characters- If you do not set an internationalized name, the name corresponding to the `name` parameter will be displayed by default',
          )
          .optional(),
        owner_id: z
          .string()
          .describe(
            'The group owner specified when a group was created. If the field is left empty, the bot that created the group will be specified as the owner. The group owner ID value corresponds to ==user_id_type== in the query parameter. Open ID is recommended here. For details, refer to [How to get Open ID?]**Note**: When a robot with external sharing capability is enabled, it cannot be the group owner when creating an external group. A user must be designated as the group owner. In addition, when adding external users to a group, the external users must be friends with the group owner on Feishu',
          )
          .optional(),
        user_id_list: z
          .array(z.string())
          .describe(
            "Group members invited when creating the group. The ID type is specified in the query parameter ==user_id_type==. Open ID is recommended here. For details, refer to [How to get Open ID?]**Note**: - Up to 50 users can be invited at the same time.- To facilitate viewing the effect on the client, it is recommended to add the developer's own ID when debugging the API.- If you need to invite external users to create an external group, the external users must be friends with the group owner on Feishu.- To obtain the open_id of an external user, refer to [Obtaining the open_id of an external user]",
          )
          .optional(),
        bot_id_list: z
          .array(z.string())
          .describe(
            'Group robots invited when creating a group. For more information, please refer to [How to Obtain App ID ?] to get the App ID of the application.**Notes**:- The Bot operating this API will automatically join the group, no need to fill in again.- Please use `app_id` to invite the bot into the group.- At most 5 bots can be invited at the same time, and the number of bots in the group after invitation cannot exceed 15',
          )
          .optional(),
        group_message_type: z
          .enum(['chat', 'thread'])
          .describe('group message type Options:chat(chat),thread(thread)')
          .optional(),
        chat_mode: z.string().describe('Group mode**Optional values are**:- `group`: A group').optional(),
        chat_type: z
          .string()
          .describe('Group type**Optional values are**:- `private`: A private group- `public`: A public group')
          .optional(),
        join_message_visibility: z
          .string()
          .describe(
            'Visibility of the messages on joining a group**Optional values are**:- `only_owner`: Visible to only the group owner and administrators- `all_members`: Visible to all members- `not_anyone`: Invisible to anyone',
          )
          .optional(),
        leave_message_visibility: z
          .string()
          .describe(
            'Visibility of the messages on leaving a group**Optional values are**:- `only_owner`: Visible to only the group owner and administrators- `all_members`: Visible to all members- `not_anyone`: Invisible to anyone',
          )
          .optional(),
        membership_approval: z
          .string()
          .describe(
            'Group joining approval**Optional values are**:- `no_approval_required`: Approval is not required.- `approval_required`: Approval is required',
          )
          .optional(),
        restricted_mode_setting: z
          .object({
            status: z
              .boolean()
              .describe(
                'Whether the restricted mode is enabled**Optional values**:- true: Enabled. When set to true, `screenshot_has_permission_setting`, `download_has_permission_setting`, `message_has_permission_setting` cannot all be `all_members`.- false: Disabled. When set to false, `screenshot_has_permission_setting`, `download_has_permission_setting`, `message_has_permission_setting` cannot have `not_anyone`.**Default value**: false',
              )
              .optional(),
            screenshot_has_permission_setting: z
              .enum(['all_members', 'not_anyone'])
              .describe(
                'Whether to allow screenshots**Default value**: all_members Options:all_members(AllMembers All members allow screenshots),not_anyone(NotAnyone Not anyone allow screenshots)',
              )
              .optional(),
            download_has_permission_setting: z
              .enum(['all_members', 'not_anyone'])
              .describe(
                'Whether to allow downloading pictures, videos and files in messages**Default value**: all_members Options:all_members(AllMembers All members allow downloading pictures, videos and files in messages),not_anyone(NotAnyone Not anyone allow downloading pictures, videos and files in messages)',
              )
              .optional(),
            message_has_permission_setting: z
              .enum(['all_members', 'not_anyone'])
              .describe(
                'Whether to allow copying and forwarding of messages**Default value**: all_members Options:all_members(AllMembers All members allow copying and forwarding of messages),not_anyone(NotAnyone Not anyone allow copying and forwarding of messages)',
              )
              .optional(),
          })
          .describe(
            'Restricted mode setting**Notice**: Confidentiality mode is applicable to Enterprise Ultimate Edition. For applicable versions and function introduction, please refer to [Session Confidentiality Mode]',
          )
          .optional(),
        urgent_setting: z
          .enum(['only_owner', 'all_members'])
          .describe(
            'Who can buzz others**Default value**: all_members Options:only_owner(Only group owner and admin),all_members(Everyone in this group)',
          )
          .optional(),
        video_conference_setting: z
          .enum(['only_owner', 'all_members'])
          .describe(
            'Who can start video calls**Default value**: all_members Options:only_owner(Only group owner and admin),all_members(Everyone in this group)',
          )
          .optional(),
        edit_permission: z
          .enum(['only_owner', 'all_members'])
          .describe(
            'Who can edit group info**Default value**: all_members Options:only_owner(Only group owner and admin),all_members(Everyone in this group)',
          )
          .optional(),
        hide_member_count_setting: z
          .enum(['all_members', 'only_owner'])
          .describe(
            'Hide member count setting**Default value**: all_members Options:all_members(visible to all group members),only_owner(visible only to group owners and group administrators)',
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({
        user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type').optional(),
        set_bot_manager: z
          .boolean()
          .describe(
            'If a user is specified as the group owner in the ==owner_id== field of the request body, you can choose whether to set the bot that created the group as the administrator at the same time. This flag is used to mark whether to set the bot that created the group as the administrator',
          )
          .optional(),
        uuid: z
          .string()
          .describe(
            'A unique string sequence generated by the developer, used to request deduplication requests with the same uuid + owner_id can only successfully create 1 group within 10 hours. If no value is passed, no deduplication of requests will be performed, and a group chat will be created for each successful request',
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
    '[Feishu/Lark]-Group Chat-Group management-Delete a group-Disband the specified group by chat_id. After disbanding the group through the API, the group chat history will not be saved',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Notice**: Only group IDs with group mode of `group` are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` in the returned result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatGet = {
  project: 'im',
  name: 'im.v1.chat.get',
  sdkName: 'im.v1.chat.get',
  path: '/open-apis/im/v1/chats/:chat_id',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-Group Chat-Group management-Obtain group information-Obtains basic information such as group name, description, profile photo, and owner ID',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type').optional() })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to obtain it:- [Create a group], and get the chat_id of the group from the returned result.- Call the [Get the list of groups where the user or bot is] interface to query the chat_id of the group where the user or bot is.- Call the [Search the list of groups visible to the user or bot] to search for the chat_id of the group where the user or bot is and the group that is open to the user or bot',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatLink = {
  project: 'im',
  name: 'im.v1.chat.link',
  sdkName: 'im.v1.chat.link',
  path: '/open-apis/im/v1/chats/:chat_id/link',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Group Chat-Group management-Get group share link-Get the sharing link of the specified group. Others can join the group after clicking the sharing link',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        validity_period: z
          .enum(['week', 'year', 'permanently'])
          .describe(
            'The validity period of the group share link. Options:week(one_week Validity: 7 days),year(one_year Validity: 1 year),permanently(Permanently valid)',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or bot is in.- Call [Search the list of groups visible to the user or robot] to search the chat_id of the group that the user or robot is in and the group that is open to the user or bot.**Note**: Single chat, private chat, and team group do not support sharing group links',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatList = {
  project: 'im',
  name: 'im.v1.chat.list',
  sdkName: 'im.v1.chat.list',
  path: '/open-apis/im/v1/chats',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-Group Chat-Group management-Obtain groups where the user or bot is a member-Get the list of groups where the user or bot represented by [access_token] is a member',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type').optional(),
        sort_type: z
          .enum(['ByCreateTimeAsc', 'ByActiveTimeDesc'])
          .describe(
            'Sort type of chat list Options:ByCreateTimeAsc(Sort by group creation time in ascending order),ByActiveTimeDesc(Sort by group active time in descending order. Because group active time changes frequently, using the `ByActiveTimeDesc` sorting method may cause groups to be missed. For example, if the paging size is set to 10, after the first request is made to obtain the first page of data, a group member in the group originally ranked 11th sends a message, then the group will be ranked 1st. At this time, when a request is made to obtain the second page of data, the group will not be obtained and needs to be obtained from the first page again.)',
          )
          .optional(),
        page_token: z
          .string()
          .describe(
            'Page identifier. It is not filled in the first request, indicating traversal from the beginning when there will be more groups, the new page_token will be returned at the same time, and the next traversal can use the page_token to get more groups',
          )
          .optional(),
        page_size: z
          .number()
          .describe('The paging size is used to limit the number of data items returned in one request')
          .optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatManagersAddManagers = {
  project: 'im',
  name: 'im.v1.chatManagers.addManagers',
  sdkName: 'im.v1.chatManagers.addManagers',
  path: '/open-apis/im/v1/chats/:chat_id/managers/add_managers',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Group Chat-Group member-Specify group administrators-Specify a group and set the specified user or bot in the group as the group administrator',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        manager_ids: z
          .array(z.string())
          .describe(
            "To set the administrator's ID, the ID type is consistent with the query parameter member_id_type value.- If it is a user (member_id_type value is user_id/open_id/union_id), it is recommended to use the user's open_id. For how to obtain it, please refer to the document [How to obtain Open ID].- If it is a bot (member_id_type value is app_id), please refer to [How to obtain the App ID of the application]**Note**:- For ordinary groups, up to 10 administrators can be specified.- For super large groups, up to 20 administrators can be specified.- When making a single request to specify robots, up to 5 bots can be specified.For the difference between super large groups and ordinary groups, see [What is the difference between super large groups and ordinary groups]",
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({
        member_id_type: z
          .enum(['open_id', 'union_id', 'user_id', 'app_id'])
          .describe(
            "User ID categories Options:open_id(Identifies a user to an app. The same user has different Open IDs in different apps. [How to get Open ID]),union_id(Identifies a user to a tenant that acts as a developer. A user has the same Union ID in apps developed by the same developer, and has different Union IDs in apps developed by different developers. A developer can use Union ID to link the same user's identities in multiple apps. [How to get Union ID]),user_id(Identifies a user to a tenant. The same user has different User IDs in different tenants. In one single tenant, a user has the same User ID in all apps （including store apps）. User ID is usually used to communicate user data between different apps. [How to get User ID]),app_id(The unique identifier of the Feishu open platform application. When an application is created, it is automatically generated by the system and cannot be modified by the user. [How to get App ID])",
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or bot is in] interface to query the chat_id of the group that the user or bot is in.- Call the [Search the list of groups visible to the user or bot] to search for the chat_id of the group that the user or bot is in and the group that is open to the user or bot.**Note**: Only group IDs with group modes **group** and **topic** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` or `topic` in the returned result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatManagersDeleteManagers = {
  project: 'im',
  name: 'im.v1.chatManagers.deleteManagers',
  sdkName: 'im.v1.chatManagers.deleteManagers',
  path: '/open-apis/im/v1/chats/:chat_id/managers/delete_managers',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Group Chat-Group member-Delete group administrators-Specify a group and delete the specified administrator in the group, including user-type administrators and robot-type administrators',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        manager_ids: z
          .array(z.string())
          .describe(
            "The administrator ID to be deleted. The ID type is consistent with the value of the query parameter member_id_type.- If it is a user (member_id_type is user_id/open_id/union_id), it is recommended to use the user's open_id. For how to obtain it, please refer to the document [How to obtain Open ID].- If it is a robot (member_id_type is app_id), please refer to [How to obtain the App ID of the application]**Note**: Each request can specify up to 50 users or 5 robots",
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({
        member_id_type: z
          .enum(['open_id', 'union_id', 'user_id', 'app_id'])
          .describe(
            "User ID categories Options:open_id(Identifies a user to an app. The same user has different Open IDs in different apps. [How to get Open ID]),union_id(Identifies a user to a tenant that acts as a developer. A user has the same Union ID in apps developed by the same developer, and has different Union IDs in apps developed by different developers. A developer can use Union ID to link the same user's identities in multiple apps. [How to get Union ID]),user_id(Identifies a user to a tenant. The same user has different User IDs in different tenants. In one single tenant, a user has the same User ID in all apps （including store apps）. User ID is usually used to communicate user data between different apps. [How to get User ID]),app_id(The unique identifier of the Feishu open platform application. When an application is created, it is automatically generated by the system and cannot be modified by the user. [How to get App ID])",
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group modes **group** and **topic** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` or `topic` in the returned result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatMembersCreate = {
  project: 'im',
  name: 'im.v1.chatMembers.create',
  sdkName: 'im.v1.chatMembers.create',
  path: '/open-apis/im/v1/chats/:chat_id/members',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Group Chat-Group member-Add users or bots to a group-Adds users or bots into a group chat',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        id_list: z
          .array(z.string())
          .describe(
            'Member ID list. - It is recommended to use OpenID when inviting users to join the group. For how to obtain it, please refer to [How to get Open ID? ].- When inviting bots into the group, you need to fill in the App ID of the application. Please refer to [How to get the App ID of the application?]**Note**: - The list cannot be empty.- The member ID type filled in the list should correspond to the type selected in the ==member_id_type== parameter.- Each request can pull up to 50 users and does not exceed the upper limit of the group size. The default maximum number of Feishu groups for certified companies is: 5,000 members in general groups, 3,000 members in conference groups, and 5,000 members in topic groups. If the tenant administrator configures the upper limit of the number of groups, the upper limit shall prevail.- At most 5 bots can be invited at the same time, and the number of bots in the group after invitation cannot exceed 15',
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({
        member_id_type: z
          .enum(['open_id', 'union_id', 'user_id', 'app_id'])
          .describe(
            "User ID categories Options:open_id(Identifies a user to an app. The same user has different Open IDs in different apps. [How to get Open ID]),union_id(Identifies a user to a tenant that acts as a developer. A user has the same Union ID in apps developed by the same developer, and has different Union IDs in apps developed by different developers. A developer can use Union ID to link the same user's identities in multiple apps. [How to get Union ID]),user_id(Identifies a user to a tenant. The same user has different User IDs in different tenants. In one single tenant, a user has the same User ID in all apps （including store apps）. User ID is usually used to communicate user data between different apps. [How to get User ID]),app_id(The unique identifier of the Feishu open platform application. When an application is created, it is automatically generated by the system and cannot be modified by the user. [How to get App ID])",
          )
          .optional(),
        succeed_type: z
          .number()
          .describe(
            'How to deal with unavailable ID 0/1/2**Default value**: `0` Options:0(Compatible with previous policies, non-existent/invisible IDs will fail to pull the group and return an error response. When there is a separated ID, other available IDs will be pulled into the group chat, and a successful response will be returned.),1(Pull all the available IDs in the parameters into the group chat, return the successful response of pulling the group, and show the remaining unavailable IDs and reasons.),2(As long as there is any unavailable ID in the parameter, the group will fail, an error response will be returned, and the unavailable ID will be displayed.)',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group modes **group** and **topic** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` or `topic` in the returned result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatMembersDelete = {
  project: 'im',
  name: 'im.v1.chatMembers.delete',
  sdkName: 'im.v1.chatMembers.delete',
  path: '/open-apis/im/v1/chats/:chat_id/members',
  httpMethod: 'DELETE',
  description:
    '[Feishu/Lark]-Group Chat-Group member-Remove users or bots from a group-Removes users or bots from a group chat',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        id_list: z
          .array(z.string())
          .describe(
            'Member ID list. The ID type is consistent with the value of the query parameter member_id_type.- It is recommended to use OpenID when removing users from the group. For how to obtain it, please refer to [How to get Open ID? ].- When removing bots from the group, you need to fill in the App ID of the application. Please refer to [How to get the App ID of the application?].**Note**: - ==id_list== cannot be empty.- For each request, a maximum of 50 users or 5 bots can be removed',
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({
        member_id_type: z
          .enum(['open_id', 'union_id', 'user_id', 'app_id'])
          .describe(
            "User ID categories Options:open_id(Identifies a user to an app. The same user has different Open IDs in different apps. [How to get Open ID]),union_id(Identifies a user to a tenant that acts as a developer. A user has the same Union ID in apps developed by the same developer, and has different Union IDs in apps developed by different developers. A developer can use Union ID to link the same user's identities in multiple apps. [How to get Union ID]),user_id(Identifies a user to a tenant. The same user has different User IDs in different tenants. In one single tenant, a user has the same User ID in all apps （including store apps）. User ID is usually used to communicate user data between different apps. [How to get User ID]),app_id(The unique identifier of the Feishu open platform application. When an application is created, it is automatically generated by the system and cannot be modified by the user. [How to get App ID])",
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group mode **group** and **topic** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` or `topic` in the returned result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatMembersGet = {
  project: 'im',
  name: 'im.v1.chatMembers.get',
  sdkName: 'im.v1.chatMembers.get',
  path: '/open-apis/im/v1/chats/:chat_id/members',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-Group Chat-Group member-Obtain group member list-Get the list of members of the group the user/bot is in',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        member_id_type: z
          .enum(['open_id', 'union_id', 'user_id'])
          .describe(
            "User ID categories Options:open_id(Identifies a user to an app. The same user has different Open IDs in different apps. [How to get Open ID]),union_id(Identifies a user to a tenant that acts as a developer. A user has the same Union ID in apps developed by the same developer, and has different Union IDs in apps developed by different developers. A developer can use Union ID to link the same user's identities in multiple apps. [How to get Union ID]),user_id(Identifies a user to a tenant. The same user has different User IDs in different tenants. In one single tenant, a user has the same User ID in all apps （including store apps）. User ID is usually used to communicate user data between different apps. [How to get User ID])",
          )
          .optional(),
        page_size: z
          .number()
          .describe(
            'The paging size is used to limit the number of data entries returned in one request.- Since the returned group member list will filter out robot members, the number of group members returned may be less than the specified page_size.- If there are group members who join the group at the same time, they will be returned at once, which may cause the number of group members returned to be greater than the specified page_size',
          )
          .optional(),
        page_token: z
          .string()
          .describe(
            'Page identifier. It is not filled in the first request, indicating traversal from the beginning when there will be more groups, the new page_token will be returned at the same time, and the next traversal can use the page_token to get more groups',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to obtain it:- [Create a group], and get the chat_id of the group from the returned result.- Call the [Get the list of groups where the user or robot is] interface to query the chat_id of the group where the user or robot is.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group where the user or robot is and the group that is open to the user or robot',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatMembersIsInChat = {
  project: 'im',
  name: 'im.v1.chatMembers.isInChat',
  sdkName: 'im.v1.chatMembers.isInChat',
  path: '/open-apis/im/v1/chats/:chat_id/members/is_in_chat',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-Group Chat-Group member-Determine whether a user or bot is in a group-Determines whether a user or bot is in a group based on their access_token',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to obtain it:- [Create a group], and get the chat_id of the group from the returned result.- Call the [Get the list of groups where the user or robot is] interface to query the chat_id of the group where the user or robot is.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group where the user or robot is and the group that is open to the user or robot',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatMembersMeJoin = {
  project: 'im',
  name: 'im.v1.chatMembers.meJoin',
  sdkName: 'im.v1.chatMembers.meJoin',
  path: '/open-apis/im/v1/chats/:chat_id/members/me_join',
  httpMethod: 'PATCH',
  description:
    '[Feishu/Lark]-Group Chat-Group member-Users or bots join a group voluntarily-Add the operator (user or bot) currently calling the interface to the specified group chat',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups where the user or robot is] interface to query the chat_id of the group where the user or robot is.- Call [Search the list of groups visible to the user or robot] to search the chat_id of the group where the user or robot is and the group open to the user or robot.**Note**:- Only public groups are supported. You can call the [Get Group Information] interface and check whether the `chat_type` parameter value is `public` in the returned result.- You cannot join the group when the number of group members reaches the upper limit. For certified companies, the default upper limit of the number of people in Feishu groups is: 5,000 for ordinary groups, 3,000 for conference groups, and 5,000 for topic groups',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatMenuItemPatch = {
  project: 'im',
  name: 'im.v1.chatMenuItem.patch',
  sdkName: 'im.v1.chatMenuItem.patch',
  path: '/open-apis/im/v1/chats/:chat_id/menu_items/:menu_item_id',
  httpMethod: 'PATCH',
  description:
    '[Feishu/Lark]-Group Chat-Chat menu-Patch chat menu item info-Patch the meta information of a top_level menu or second_level menu, including the icon, name, i18n name and redirect link of the chat menu',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      update_fields: z
        .array(
          z
            .enum(['ICON', 'NAME', 'I18N_NAME', 'REDIRECT_LINK'])
            .describe('Options:ICON(Icon),NAME(Name),I18N_NAME(I18n name),REDIRECT_LINK(redirect link)'),
        )
        .describe('Field to modify'),
      chat_menu_item: z
        .object({
          action_type: z
            .enum(['NONE', 'REDIRECT_LINK'])
            .describe(
              'Menu type**Notice**: - If the top_level menu has a second_level menu, the value of this top_level menu must be NONE.- The menu type cannot be changed once created. Options:NONE(NONE type),REDIRECT_LINK(REDIRECT_LINK type)',
            )
            .optional(),
          redirect_link: z
            .object({
              common_url: z.string().describe('Common redirect link, must start with http/https').optional(),
              ios_url: z
                .string()
                .describe(
                  'iOS client redirect link, when this field is not set, iOS uses the `common_url` value by default. Must start with http/https',
                )
                .optional(),
              android_url: z
                .string()
                .describe(
                  'Android client redirect link, when this field is not set, the Android side uses the `common_url` value by default. It must start with http/https',
                )
                .optional(),
              pc_url: z
                .string()
                .describe(
                  'PC client redirect link, when this field is not set, the PC side uses the `common_url` value by default. Must start with http/https.**Instructions**: After clicking the group menu on the PC side, if you need the page corresponding to the url to be expanded in the Feishu sidebar, you can add `https://applink.feishu.cn/client/web_url/open?mode=sidebar-semi&url=` before the url, for example `https://applink.feishu.cn/client/web_url/open?mode=sidebar-semi&url=https://open.feishu.cn/`',
                )
                .optional(),
              web_url: z
                .string()
                .describe(
                  'Web client redirect link, when this field is not set, the Web side uses the `common_url` value by default. It must start with http/https',
                )
                .optional(),
            })
            .describe('Redirect link')
            .optional(),
          image_key: z
            .string()
            .describe(
              'image_key, upload a message type image through the [Upload Image] interface to obtain image_key and pass in the value.**Note**: If the top level menu has a second level menu, the icon cannot be set for this top level menu',
            )
            .optional(),
          name: z
            .string()
            .describe('Menu name.**Notice**: The number of characters in the name must be in the range of 1 to 120')
            .optional(),
          i18n_names: z
            .object({
              zh_cn: z.string().describe('Chinese name').optional(),
              en_us: z.string().describe('English name').optional(),
              ja_jp: z.string().describe('Japanese name').optional(),
            })
            .describe(
              'Menu I18n names.**Notice**: The number of characters in the name must be in the range of 1 to 120',
            )
            .optional(),
        })
        .describe('Item info'),
    }),
    path: z
      .object({
        chat_id: z
          .string()
          .describe(
            'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group mode **Group** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` in the returned result',
          )
          .optional(),
        menu_item_id: z
          .string()
          .describe(
            'The ID of the top level menu or second level menu. The ID can be obtained through the [get group menu] interface',
          )
          .optional(),
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
    '[Feishu/Lark]-Group Chat-Chat menu-Add chat menu-Add one or more group menus to the specified group. After a successful call, the interface will return all group menu information in the current group',
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
                        'Menu type**Notice**: - If the top_level menu has a second_level menu, the value of this top_level menu must be NONE.- The menu type cannot be changed once created. Options:NONE(NONE type, when only the top level menu has a second level menu, the top level menu is set to NONE type.),REDIRECT_LINK(REDIRECT_LINK type, when taking this value, you need to set the corresponding redirect link (redirect_link). )',
                      ),
                    redirect_link: z
                      .object({
                        common_url: z.string().describe('Common redirect link, must start with http/https').optional(),
                        ios_url: z
                          .string()
                          .describe(
                            'iOS client redirect link, when this field is not set, iOS uses the `common_url` value by default. Must start with http/https',
                          )
                          .optional(),
                        android_url: z
                          .string()
                          .describe(
                            'Android client redirect link, when this field is not set, the Android side uses the `common_url` value by default. It must start with http/https',
                          )
                          .optional(),
                        pc_url: z
                          .string()
                          .describe(
                            'PC client redirect link, when this field is not set, the PC side uses the `common_url` value by default. Must start with http/https.**Instructions**: After clicking the group menu on the PC side, if you need the page corresponding to the url to be expanded in the Feishu sidebar, you can add `https://applink.feishu.cn/client/web_url/open?mode=sidebar-semi&url=` before the url, for example `https://applink.feishu.cn/client/web_url/open?mode=sidebar-semi&url=https://open.feishu.cn/`',
                          )
                          .optional(),
                        web_url: z
                          .string()
                          .describe(
                            'Web client redirect link, when this field is not set, the Web side uses the `common_url` value by default. It must start with http/https',
                          )
                          .optional(),
                      })
                      .describe('Redirect link')
                      .optional(),
                    image_key: z
                      .string()
                      .describe(
                        'The key value of the top level menu icon. Upload a message type image through the [Upload Image] interface to obtain image_key and pass in the value.**Note**: If the top level menu has a second level menu, the icon cannot be set for this top level menu',
                      )
                      .optional(),
                    name: z
                      .string()
                      .describe(
                        'Menu name.**Notice**: The number of characters in the name must be in the range of 1 to 120',
                      ),
                    i18n_names: z
                      .object({
                        zh_cn: z.string().describe('Chinese name').optional(),
                        en_us: z.string().describe('English name').optional(),
                        ja_jp: z.string().describe('Japanese name').optional(),
                      })
                      .describe(
                        'Menu I18n names.**Notice**: The number of characters in the name must be in the range of 1 to 120',
                      )
                      .optional(),
                  })
                  .describe('Top level menu info'),
                children: z
                  .array(
                    z.object({
                      chat_menu_item: z
                        .object({
                          action_type: z
                            .enum(['NONE', 'REDIRECT_LINK'])
                            .describe(
                              'Menu type**Notice**: If the top_level menu has a second_level menu, the value of this top_level menu must be NONE. Options:NONE(NONE type),REDIRECT_LINK(REDIRECT_LINK type)',
                            )
                            .optional(),
                          redirect_link: z
                            .object({
                              common_url: z
                                .string()
                                .describe('Common redirect link, must start with http/https')
                                .optional(),
                              ios_url: z
                                .string()
                                .describe(
                                  'iOS client redirect link, when this field is not set, iOS uses the `common_url` value by default. Must start with http/https',
                                )
                                .optional(),
                              android_url: z
                                .string()
                                .describe(
                                  'Android client redirect link, when this field is not set, the Android side uses the `common_url` value by default. It must start with http/https',
                                )
                                .optional(),
                              pc_url: z
                                .string()
                                .describe(
                                  'PC client redirect link, when this field is not set, the PC side uses the `common_url` value by default. Must start with http/https.**Instructions**: After clicking the group menu on the PC side, if you need the page corresponding to the url to be expanded in the Feishu sidebar, you can add `https://applink.feishu.cn/client/web_url/open?mode=sidebar-semi&url=` before the url, for example `https://applink.feishu.cn/client/web_url/open?mode=sidebar-semi&url=https://open.feishu.cn/`',
                                )
                                .optional(),
                              web_url: z
                                .string()
                                .describe(
                                  'Web client redirect link, when this field is not set, the Web side uses the `common_url` value by default. It must start with http/https',
                                )
                                .optional(),
                            })
                            .describe('Redirect link')
                            .optional(),
                          image_key: z
                            .string()
                            .describe(
                              'The key value of the second level menu icon. Upload a message type image through the [Upload Image] interface to obtain image_key and pass in the value',
                            )
                            .optional(),
                          name: z
                            .string()
                            .describe(
                              'Menu name.**Notice**: The number of characters in the name must be in the range of 1 to 120',
                            )
                            .optional(),
                          i18n_names: z
                            .object({
                              zh_cn: z.string().describe('Chinese name').optional(),
                              en_us: z.string().describe('English name').optional(),
                              ja_jp: z.string().describe('Japanese name').optional(),
                            })
                            .describe(
                              'Menu I18n names.**Notice**: The number of characters in the name must be in the range of 1 to 120',
                            )
                            .optional(),
                        })
                        .describe('Second level menu info')
                        .optional(),
                    }),
                  )
                  .describe('Second level menu list')
                  .optional(),
              }),
            )
            .describe('Top level menu list**Note**: There are a maximum of 3 top level menus in a group'),
        })
        .describe('The menu to add to the chat'),
    }),
    path: z
      .object({
        chat_id: z
          .string()
          .describe(
            'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group mode **Group** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` in the returned result',
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
    '[Feishu/Lark]-Group Chat-Chat menu-Delete chat menu-Delete the top level menu in the specified group. After a successful call, the interface will return the latest group menu information in the group',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      chat_menu_top_level_ids: z
        .array(z.string())
        .describe('The top level menu ID. The ID can be obtained through the [get group menu] interface'),
    }),
    path: z
      .object({
        chat_id: z
          .string()
          .describe(
            'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group mode **Group** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` in the returned result',
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
    '[Feishu/Lark]-Group Chat-Chat menu-Get chat menus-Get the chat menu information in the specified group, including the names, jump links, icons and other information of all top level or second level menus',
  accessTokens: ['tenant'],
  schema: {
    path: z
      .object({
        chat_id: z
          .string()
          .describe(
            'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group mode **Group** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` in the returned result',
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
    '[Feishu/Lark]-Group Chat-Chat menu-Sort chat menus-Adjust the order of group menus within the specified group. After a successful call, the interface will return all group menu information within the group',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      chat_menu_top_level_ids: z
        .array(z.string())
        .describe(
          'Sort by the ID of the top level menu. The order of the elements in the array corresponds to the order of the top level menu in the group from left to right. The ID can be obtained through the [Get Group Menu] interface.**Note**: The ID list to be sorted needs to be aligned with the ID list of the top level menu in the group',
        ),
    }),
    path: z
      .object({
        chat_id: z
          .string()
          .describe(
            'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group mode **Group** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` in the returned result',
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
  description:
    '[Feishu/Lark]-Group Chat-Group management-Obtains the group member speech scopes-Obtains the group speech mode, the list of users who can speak, and more',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type').optional(),
        page_size: z
          .number()
          .describe('The paging size is used to limit the number of data items returned in one request')
          .optional(),
        page_token: z
          .string()
          .describe(
            'Page identifier. It is not filled in the first request, indicating traversal from the beginning when there will be more groups, the new page_token will be returned at the same time, and the next traversal can use the page_token to get more groups',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to obtain it:- [Create a group], and get the chat_id of the group from the returned result.- Call the [Get the list of groups where the user or robot is] interface to query the chat_id of the group where the user or bot is.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group where the user or bot is and the group that is open to the user or bot',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatModerationUpdate = {
  project: 'im',
  name: 'im.v1.chatModeration.update',
  sdkName: 'im.v1.chatModeration.update',
  path: '/open-apis/im/v1/chats/:chat_id/moderation',
  httpMethod: 'PUT',
  description:
    '[Feishu/Lark]-Group Chat-Group management-Updates group speech scopes-Update the speaking permissions of a specified group. You can set it to allow all group members to speak, only the group owner or administrator to speak, or specified group members to speak',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        moderation_setting: z
          .string()
          .describe(
            'Group speech mode**Optional values**:- all_members: All group members can speak- only_owner: Only group owners or administrators can speak- moderator_list: Specify group members who can speak. When using this value, you need to select `moderator_added_list` and `moderator_removed_list`',
          )
          .optional(),
        moderator_added_list: z
          .array(z.string())
          .describe(
            'When `moderation_setting` is set to `moderator_list`, users who can speak are added as an ID list.**Notice**:- The ID type is consistent with the query parameter user_id_type. It is recommended to use OpenID. For how to obtain it, please refer to the document [How to obtain Open ID].- If the user in the list is not in the group, it will be automatically filtered out.- When requesting, please ensure that the IDs in the two parameters `moderator_added_list` and `moderator_removed_list` are not repeated',
          )
          .optional(),
        moderator_removed_list: z
          .array(z.string())
          .describe(
            'When `moderation_setting` is set to `moderator_list`, users who can speak are removed in the form of an ID list.**Notice**:- The ID type is consistent with the query parameter user_id_type. It is recommended to use OpenID. For how to obtain it, please refer to the document [How to obtain Open ID].- If the user in the list is not in the group, it will be automatically filtered out.- When requesting, please ensure that the IDs in the two parameters `moderator_added_list` and `moderator_removed_list` are not repeated',
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type').optional() })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to obtain:- [Create a group], and obtain the chat_id of the group from the returned result.- Call the [Get the list of groups where the user or robot is] interface to query the chat_id of the group where the user or bot is.- Call [Search the list of groups visible to the user or bot] to search for the chat_id of the group where the user or bot is and the group that is open to the user or bot',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatSearch = {
  project: 'im',
  name: 'im.v1.chat.search',
  sdkName: 'im.v1.chat.search',
  path: '/open-apis/im/v1/chats/search',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-Group Chat-Group management-Search for groups visible to a user or bot-Get the list of groups visible to the current identity (user or bot), including the groups the current identity belongs to and the groups that are open to the current identity. Supports keyword search and paged search',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type').optional(),
        query: z
          .string()
          .describe(
            'Keyword. **Notes**:- The keyword supports matching the internationalized name of the group and the name of the group member.- Supports searching in multiple languages (Multiple languages ​​supported in Feishu client).- Support fuzzy search such as pinyin, prefix, etc.- An empty result will be returned if the keyword is empty or longer than `64` characters.- Try to avoid including the `-` symbol in keywords. If it is necessary to include this symbol, please add double quotation marks when passing the value, such as `"Example-0"`',
          )
          .optional(),
        page_token: z
          .string()
          .describe(
            'Page identifier. It is not filled in the first request, indicating traversal from the beginning when there will be more groups, the new page_token will be returned at the same time, and the next traversal can use the page_token to get more groups',
          )
          .optional(),
        page_size: z
          .number()
          .describe('The paging size is used to limit the number of data items returned in one request')
          .optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatTabCreate = {
  project: 'im',
  name: 'im.v1.chatTab.create',
  sdkName: 'im.v1.chatTab.create',
  path: '/open-apis/im/v1/chats/:chat_id/chat_tabs',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Group Chat-Chat tab-Add chat tab-Add a custom chat tab in the specified chat. Only document type (doc) or URL type (url) tabs are supported',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      chat_tabs: z
        .array(
          z.object({
            tab_name: z
              .string()
              .describe(
                'Tab name**Note**: The group tab name does not exceed 30 characters (maximum 10 Chinese characters)',
              )
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
                'Tab type**Note**: Only doc and url type tabs are supported, other fields are read-only fields Options:message(Message type),doc_list(DocList List of Cloud Documents),doc(Document),pin(Pin),meeting_minute(MeetingMinute Meeting notes),chat_announcement(ChatAnnouncement Group announcement),url(URL),file(File),files_resources(files_resources: Combination type, Find all shared docs, links, and files in one place.),images_videos(images_videos: Combination type, Find all shared image and video in one place.),task(Task)',
              ),
            tab_content: z
              .object({
                url: z
                  .string()
                  .describe('URL address, effective when tab_type is set to url**Note**: must start with http or https')
                  .optional(),
                doc: z
                  .string()
                  .describe(
                    'Cloud document link, effective when tab_type is set to doc**Note**:- Must start with http or https- The current operator must have the collaborator privilege for the cloud document',
                  )
                  .optional(),
                meeting_minute: z
                  .string()
                  .describe(
                    'Meeting minutes. Since adding chat tags of type meeting_minute is not supported, this field is read-only and does not require a value to be passed',
                  )
                  .optional(),
                task: z
                  .string()
                  .describe(
                    'Task. Since adding chat tags of type task is not supported, this field is read-only and does not require a value to be passed',
                  )
                  .optional(),
              })
              .describe('Tab content')
              .optional(),
            tab_config: z
              .object({
                icon_key: z
                  .string()
                  .describe(
                    'Chat tab icon key. You need to call the [upload image] interface first, set the image type to message to upload the image, and then get the `image_key` and pass in the current parameters',
                  )
                  .optional(),
                is_built_in: z.boolean().describe('Whether the chat tab is opened inline in the app').optional(),
              })
              .describe('Chat tab configuration**Note**: This parameter is only valid when tab_type is set to url')
              .optional(),
          }),
        )
        .describe('Chat tags**Note**: A maximum of 20 custom group tabs are allowed to be added in a group'),
    }),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group modes **group** and **p2p** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` or `p2p` in the returned result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatTabDeleteTabs = {
  project: 'im',
  name: 'im.v1.chatTab.deleteTabs',
  sdkName: 'im.v1.chatTab.deleteTabs',
  path: '/open-apis/im/v1/chats/:chat_id/chat_tabs/delete_tabs',
  httpMethod: 'DELETE',
  description:
    '[Feishu/Lark]-Group Chat-Chat tab-Delete chat tab-Deletes one or more chat tabs within the specified chat',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      tab_ids: z
        .array(z.string())
        .describe('Chat tag ID list. Tab ID can be found in [Add Chat Tab] and [Pull Chat Tab] return value'),
    }),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group modes **group** and **p2p** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` or `p2p` in the returned result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatTabListTabs = {
  project: 'im',
  name: 'im.v1.chatTab.listTabs',
  sdkName: 'im.v1.chatTab.listTabs',
  path: '/open-apis/im/v1/chats/:chat_id/chat_tabs/list_tabs',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-Group Chat-Chat tab-Pull chat tabs-Get the chat tab information in the specified chat, including ID, name, type, and content',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group modes **group** and **p2p** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` or `p2p` in the returned result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatTabSortTabs = {
  project: 'im',
  name: 'im.v1.chatTab.sortTabs',
  sdkName: 'im.v1.chatTab.sortTabs',
  path: '/open-apis/im/v1/chats/:chat_id/chat_tabs/sort_tabs',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Group Chat-Chat tab-Sort chat tab-Adjust the order of multiple chat tabs within a specified chat',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        tab_ids: z
          .array(z.string())
          .describe(
            'List of chat tag IDs. Tab ID can be found in [Add Chat Tab] and [Pull Chat Tab] return value.**Note**:- Must include the IDs of all tabs in the chat.- The sorting of the current parameters corresponds to the sorting from left to right in the chat.- The message type tab in the chat is fixed in the first order',
          )
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group modes **group** and **p2p** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` or `p2p` in the returned result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatTabUpdateTabs = {
  project: 'im',
  name: 'im.v1.chatTab.updateTabs',
  sdkName: 'im.v1.chatTab.updateTabs',
  path: '/open-apis/im/v1/chats/:chat_id/chat_tabs/update_tabs',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Group Chat-Chat tab-Update chat tab-Updates the specified chat tab information, including name, type, and content. Only supports updating document type (doc) or URL type (url) tabs',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        chat_tabs: z
          .array(
            z.object({
              tab_id: z
                .string()
                .describe('Chat tag ID. Tab ID can be found in [Add Chat Tab] and [Pull Chat Tab] return value')
                .optional(),
              tab_name: z
                .string()
                .describe('Tab name**Note**: The group tab name does not exceed 30 characters')
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
                  'Tab type**Note**: Only doc and url type tabs can be updated. Other fields are read-only fields. Options:message(Message type),doc_list(DocList List of Cloud Documents),doc(Document),pin(Pin),meeting_minute(MeetingMinute Meeting notes),chat_announcement(ChatAnnouncement Group announcement),url(URL),file(File),files_resources(files_resources: Combination type, Find all shared docs, links, and files in one place.),images_videos(images_videos: Combination type, Find all shared image and video in one place.),task(Task)',
                ),
              tab_content: z
                .object({
                  url: z
                    .string()
                    .describe(
                      'URL address, effective when tab_type is set to url**Note**: must start with http or https',
                    )
                    .optional(),
                  doc: z
                    .string()
                    .describe(
                      'Cloud document link, effective when tab_type is set to doc**Note**:- Must start with http or https- The current operator must have the collaborator privilege for the cloud document',
                    )
                    .optional(),
                  meeting_minute: z
                    .string()
                    .describe(
                      'Meeting minutes. Because the chat tab page of the meeting_minute type is not supported for updating, this field is read-only and does not require a value to be passed',
                    )
                    .optional(),
                  task: z
                    .string()
                    .describe(
                      'Task. Because the chat tab page of the task type is not supported for updating, this field is read-only and does not require a value to be passed',
                    )
                    .optional(),
                })
                .describe('Tab content')
                .optional(),
              tab_config: z
                .object({
                  icon_key: z
                    .string()
                    .describe(
                      'Chat tab icon key. You need to call the [upload image] interface first, set the image type to message to upload the image, and then get the `image_key` and pass in the current parameters',
                    )
                    .optional(),
                  is_built_in: z.boolean().describe('Whether the chat tab is opened inline in the app').optional(),
                })
                .describe('Chat tab configuration**Note**: This parameter is only valid when tab_type is set to url')
                .optional(),
            }),
          )
          .describe('Chat tags')
          .optional(),
      })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or robot is in] interface to query the chat_id of the group that the user or robot is in.- Call the [Search the list of groups visible to the user or robot] to search for the chat_id of the group that the user or robot is in and the group that is open to the user or robot.**Note**: Only group IDs with group modes **group** and **p2p** are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` or `p2p` in the returned result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatTopNoticeDeleteTopNotice = {
  project: 'im',
  name: 'im.v1.chatTopNotice.deleteTopNotice',
  sdkName: 'im.v1.chatTopNotice.deleteTopNotice',
  path: '/open-apis/im/v1/chats/:chat_id/top_notice/delete_top_notice',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Group Chat-Group management-Revoke group pinning-Remove pinned messages or group announcements from a specified group',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or bot is in] interface to query the chat_id of the group that the user or bot is in.- Call the [Search the list of groups visible to the user or bot] to search for the chat_id of the group that the user or bot is in and the group that is open to the user or bot',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatTopNoticePutTopNotice = {
  project: 'im',
  name: 'im.v1.chatTopNotice.putTopNotice',
  sdkName: 'im.v1.chatTopNotice.putTopNotice',
  path: '/open-apis/im/v1/chats/:chat_id/top_notice/put_top_notice',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Group Chat-Group management-Update group pinning-Updates the pinned information in a group chat. A group message or announcement can be pinned',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      chat_top_notice: z
        .array(
          z.object({
            action_type: z
              .enum(['1', '2'])
              .describe(
                'Pin type Options:1(Message Message type, `message_id` is required),2(Annoucement Group announcement type, no need to fill in `message_id`)',
              )
              .optional(),
            message_id: z
              .string()
              .describe(
                'Message ID. How to get the ID:- After calling the [Send Message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and get it from the `message_id` parameter of the response result',
              )
              .optional(),
          }),
        )
        .describe('Group Pin configuration'),
    }),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or bot is in] interface to query the chat_id of the group that the user or bot is in.- Call the [Search the list of groups visible to the user or bot] to search for the chat_id of the group that the user or bot is in and the group that is open to the user or bot',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ChatUpdate = {
  project: 'im',
  name: 'im.v1.chat.update',
  sdkName: 'im.v1.chat.update',
  path: '/open-apis/im/v1/chats/:chat_id',
  httpMethod: 'PUT',
  description:
    '[Feishu/Lark]-Group Chat-Group management-Update group information-Update the information of the specified group, including group avatar, group name, group description, group configuration, and group owner, etc',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z
      .object({
        avatar: z
          .string()
          .describe(
            'The image key that corresponds to the group profile photo. It can be obtained using the [Upload image] API. (Note: The ==image_type== of the uploaded image needs to be specified as ==avatar==)',
          )
          .optional(),
        name: z
          .string()
          .describe(
            'Group name**Notice**:- It is recommended that the group name should not exceed 60 characters- The length of the public group name should not be less than 2 characters',
          )
          .optional(),
        description: z.string().describe('Group description, No more than 100 characters are recommended').optional(),
        i18n_names: z
          .object({
            zh_cn: z.string().describe('Chinese name').optional(),
            en_us: z.string().describe('English name').optional(),
            ja_jp: z.string().describe('Japanese name').optional(),
          })
          .describe('Internationalized group name, No more than 60 characters are recommended')
          .optional(),
        add_member_permission: z
          .string()
          .describe(
            'Who can add group members, including users or bots**Optional values**:- `only_owner`: only group owners and administrators- `all_members`: all members**Notice**: `add_member_permission` and `share_card_permission` must be configured synchronously.- If the `add_member_permission` value is `only_owner`, `share_card_permission` can only be set to `not_allowed`.- If the `add_member_permission` value is `all_members`, `share_card_permission` can only be set to `allowed`',
          )
          .optional(),
        share_card_permission: z
          .string()
          .describe(
            'Group sharing permission **Optional values are**:- `allowed`: Allowed- `not_allowed`: Not allowed**Notice**: `add_member_permission` and `share_card_permission` must be configured synchronously.- If the `add_member_permission` value is `only_owner`, `share_card_permission` can only be set to `not_allowed`.- If the `add_member_permission` value is `all_members`, `share_card_permission` can only be set to `allowed`',
          )
          .optional(),
        at_all_permission: z
          .string()
          .describe(
            '@mention all permission **Optional values are**:- `only_owner`: Only the group owner and admins- `all_members`: All members',
          )
          .optional(),
        edit_permission: z
          .string()
          .describe(
            'Group edit permission **Optional values are**:- `only_owner`: Only the group owner and admins- `all_members`: All members',
          )
          .optional(),
        owner_id: z
          .string()
          .describe(
            'New group owner ID, no need to fill in if the group owner is not transferred. Open ID is recommended here. For details, refer to [How to get Open ID?]',
          )
          .optional(),
        join_message_visibility: z
          .string()
          .describe(
            'Visibility of the messages on joining a group **Optional values are**:- `only_owner`: Visible to only the group owner and administrators- `all_members`: Visible to all members- `not_anyone`: Invisible to anyone',
          )
          .optional(),
        leave_message_visibility: z
          .string()
          .describe(
            'Visibility of the messages on leaving a group **Optional values are**:- `only_owner`: Visible to only the group owner and administrators- `all_members`: Visible to all members- `not_anyone`: Invisible to anyone',
          )
          .optional(),
        membership_approval: z
          .string()
          .describe(
            'Group joining approval **Optional values are**:- `no_approval_required`: Approval is not required.- `approval_required`: Approval is required',
          )
          .optional(),
        restricted_mode_setting: z
          .object({
            status: z
              .boolean()
              .describe(
                'Whether the confidentiality mode is enabled**Optional values**:- true: Enabled. When set to true, `screenshot_has_permission_setting`, `download_has_permission_setting`, `message_has_permission_setting` cannot all be `all_members`.- false: Disabled. When set to false, `screenshot_has_permission_setting`, `download_has_permission_setting`, `message_has_permission_setting` cannot have `not_anyone`',
              )
              .optional(),
            screenshot_has_permission_setting: z
              .enum(['all_members', 'not_anyone'])
              .describe(
                'Whether to allow screenshots Options:all_members(AllMembers All members allow screenshots),not_anyone(NotAnyone Not anyone allow screenshots)',
              )
              .optional(),
            download_has_permission_setting: z
              .enum(['all_members', 'not_anyone'])
              .describe(
                'Whether to allow downloading pictures, videos and files in messages Options:all_members(AllMembers All members allow downloading pictures, videos and files in messages),not_anyone(NotAnyone Not anyone allow downloading pictures, videos and files in messages)',
              )
              .optional(),
            message_has_permission_setting: z
              .enum(['all_members', 'not_anyone'])
              .describe(
                'Whether to allow copying and forwarding of messages Options:all_members(AllMembers All members allow copying and forwarding of messages),not_anyone(NotAnyone Not anyone allow copying and forwarding of messages)',
              )
              .optional(),
          })
          .describe(
            'Restricted mode setting **Notice**: Confidentiality mode is applicable to Enterprise Ultimate Edition. For applicable versions and function introduction, please refer to [Session Confidentiality Mode]',
          )
          .optional(),
        chat_type: z
          .string()
          .describe('Group type**Optional values are**:- `private`: A private group- `public`: A public group')
          .optional(),
        group_message_type: z
          .enum(['chat', 'thread'])
          .describe('Group message type Options:chat(chat),thread(thread)')
          .optional(),
        urgent_setting: z
          .enum(['only_owner', 'all_members'])
          .describe(
            'Who can buzz others Options:only_owner(Only group owner and admin),all_members(Everyone in this group)',
          )
          .optional(),
        video_conference_setting: z
          .enum(['only_owner', 'all_members'])
          .describe(
            'Who can start video calls Options:only_owner(Only group owner and admin),all_members(Everyone in this group)',
          )
          .optional(),
        hide_member_count_setting: z
          .enum(['all_members', 'only_owner'])
          .describe(
            'Hide member count setting Options:all_members(visible to all group members),only_owner(visible only to the group owner and group administrators)',
          )
          .optional(),
      })
      .optional(),
    params: z
      .object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type').optional() })
      .optional(),
    path: z.object({
      chat_id: z
        .string()
        .describe(
          'Group ID. How to get it:- [Create a group], get the chat_id of the group from the returned result.- Call the [Get the list of groups that the user or bot is in] interface to query the chat_id of the group that the user or bot is in.- Call the [Search the list of groups visible to the user or bot] to search for the chat_id of the group that the user or bot is in and the group that is open to the user or bot.**Note**: Only group IDs with group mode of `group` are supported. You can call the [get group information] interface and check whether the value of the `chat_mode` parameter is `group` in the returned result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1MessageCreate = {
  project: 'im',
  name: 'im.v1.message.create',
  sdkName: 'im.v1.message.create',
  path: '/open-apis/im/v1/messages',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Messaging-Message management-Send message-Call this interface to send a message to a specified user or group chat. Supported message types include text, rich text, cards, group business cards, personal business cards, pictures, videos, audio, files, and emoticons',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      receive_id: z
        .string()
        .describe(
          "The ID of the message recipient. The ID type is consistent with the value of the query parameter `receive_id_type`.**Notice**:- When sending a message to a user, the user needs to be in the bot's [availability scope]. For example, if you need to send a message to all employees of the company, you need to set the application's availability scope to all employees.- When sending a message to a group, the bot needs to be in the group and have the right to speak in the group.- If the message recipient is a user, it is recommended to use the user's `open_id`",
        ),
      msg_type: z
        .string()
        .describe(
          'Message type.**Optional values**:- text- post- image- file- audio- media- sticker- interactive- share_chat- share_user- system: This type only supports pushing system messages in bot single chats and not in group chats. For example, as shown in the image below to highlight a new conversation. For detailed description of different message types, see [Send message content]',
        ),
      content: z
        .string()
        .describe(
          "Message content, a string serialized from a JSON structure. The value of this parameter corresponds to `msg_type`. For example, if the value of `msg_type` is `text`, this parameter needs to pass in text type content.**Note:**- JSON strings need to be escaped. For example, the line break `` is escaped as `\\`.- The maximum size of a text message request body cannot exceed 150 KB.- The maximum size of a card message or rich text message request body cannot exceed 30 KB. - If a card template (template_id) is used to send a message, the actual size also includes the card data size corresponding to the template. - If the message contains style tags, the actual message body length will be greater than the request body length you entered.- For images, you need to [upload the image] first, and then use the image's Key to send a message.- Audio, video, and files need to be [uploaded] first, and then the file's key is used to send a message. Note that you cannot use the file_token returned by the cloud document [upload material] interface.For different types of message content formats and usage restrictions, see [Sending Message Content]",
        ),
      uuid: z
        .string()
        .describe(
          'A custom unique string sequence used to request deduplication when sending messages. For requests with the same uuid, at most one message can be successfully sent within 1 hour.**Note**: You can customize the parameter value by referring to the example value. When sending different message contents, if this parameter is passed in, you need to change the value of the parameter in each request',
        )
        .optional(),
    }),
    params: z.object({
      receive_id_type: z
        .enum(['open_id', 'union_id', 'user_id', 'email', 'chat_id'])
        .describe(
          'Message recipient ID type. Support open_id/union_id/user_id/email/chat_id Options:open_id(Identifies a user to an app. The same user has different Open IDs in different apps. [How to get Open ID]),union_id(Identifies a user to a tenant that acts as a developer. A user has the same Union ID in apps developed by the same developer, and has different Union IDs in apps developed by different developers. A developer can use Union ID to link the same user\'s identities in multiple apps. [How to get Union ID]),user_id(Identifies a user to a tenant. The same user has different User IDs in different tenants. In one single tenant, a user has the same User ID in all apps （including store apps）. User ID is usually used to communicate user data between different apps. [How to get User ID].),email(Identifies users by "email", which is the user\'s actual email address),chat_id(Identifies group chats by chat_id. You can call the API [Search for groups visible to a user or bot] to obtain the chat_id value. For group ID description, refer to [Group ID description].</md-enum-item>)',
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
    '[Feishu/Lark]-Messaging-Message management-Recall message-Call this interface to withdraw the specified message. Different identities (identity specified by the Authorization request header parameter) call the interface, and different effects can be achieved:- The robot can withdraw the message sent by the robot itself.- The group owner and administrator of the group chat can withdraw the specified message in the group',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      message_id: z
        .string()
        .describe(
          'The ID of the message to be withdrawn.How to obtain the ID:- After calling the [Send Message] interface, obtain it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can obtain the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and obtain it from the `message_id` parameter of the response result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1MessageForward = {
  project: 'im',
  name: 'im.v1.message.forward',
  sdkName: 'im.v1.message.forward',
  path: '/open-apis/im/v1/messages/:message_id/forward',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Messaging-Message management-Forward a message-Forwards a specified message to a user, group chat or thread',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      receive_id: z
        .string()
        .describe('Message receiver ID. The ID type is consistent with the value of `receive_id_type`'),
    }),
    params: z.object({
      receive_id_type: z
        .enum(['open_id', 'user_id', 'union_id', 'email', 'chat_id', 'thread_id'])
        .describe(
          'Message recipient ID type. Options:open_id(Identifies a user to an app. The same user has different Open IDs in different apps. [How to get Open ID]),user_id(Identifies a user to a tenant. The same user has different User IDs in different tenants. In one single tenant, a user has the same User ID in all apps （including store apps）. User ID is usually used to communicate user data between different apps. [How to get User ID]),union_id(Identifies a user to a tenant that acts as a developer. A user has the same Union ID in apps developed by the same developer, and has different Union IDs in apps developed by different developers. A developer can use Union ID to link the same user\'s identities in multiple apps. [How to get Union ID]),email(Identifies users by "email", which is the user\'s actual email address),chat_id(Identifies group chats by chat_id. You can call the API [Search for groups visible to a user or bot] to obtain the chat_id value. For group ID description, refer to [Group ID description]),thread_id(Identifies thread by thread_id. For thread ID description, refer to [Thread Introduction]</md-enum-item>**When the value is `user_id`, the following field scopes are required:**<md-perm name="contact:user.employee_id:readonly" desc="Obtain user ID" support_app_types="custom" tags="">Obtain user ID</md-perm>)',
        ),
      uuid: z
        .string()
        .describe(
          'A custom unique string sequence used to request deduplication when forwarding messages. Requests with the same uuid can only be successfully forwarded to the same destination once within 1 hour',
        )
        .optional(),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          'The ID of the message to be forwarded. How to obtain the ID:- After calling the [Send Message] interface, obtain it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can obtain the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and obtain it from the `message_id` parameter of the response result',
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
  description:
    '[Feishu/Lark]-Messaging-Message management-Obtain the content of the specified message-Query message content with message_id',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type').optional() })
      .optional(),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
    path: z.object({
      message_id: z
        .string()
        .describe(
          'Message ID. How to get the ID:- After calling the [Send Message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and get it from the `message_id` parameter of the response result',
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
  description:
    '[Feishu/Lark]-Messaging-Message management-Get chat history-Obtains chat history (chat records) of chats (including private chats and group chats)',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z.object({
      container_id_type: z
        .string()
        .describe(
          'Container type.**Optional values**:- `chat`: includes single chat (p2p) and group chat (group)- `thread`: thread**Note**: For thread messages in **normal conversation groups**, only the root message of the thread can be obtained through the `chat` container type. You can obtain all messages in the thread reply by specifying the container type as `thread`',
        ),
      container_id: z
        .string()
        .describe(
          'Container ID. The ID type is the same as the value of container_id_type.- For how to obtain the ID of a group chat or a single chat, see [Group ID Description].- For how to obtain the topic ID, see the **How ​​to obtain thread_id** section of [Topic Overview]',
        ),
      start_time: z
        .string()
        .describe(
          'The start time of the historical information to be queried, in seconds.**Notice**: The `thread` container type does not currently support obtaining messages within a specified time range',
        )
        .optional(),
      end_time: z
        .string()
        .describe(
          'The end time of the historical information to be queried, in seconds.**Notice**: The `thread` container type does not currently support obtaining messages within a specified time range',
        )
        .optional(),
      sort_type: z
        .enum(['ByCreateTimeAsc', 'ByCreateTimeDesc'])
        .describe(
          'Message sorting method.**Notice**: When using `page_token` for paging requests, the sorting method (`sort_type`) is the same as the first request, and changing the sorting method midway is not supported. Options:ByCreateTimeAsc(Sort by message creation time ascending),ByCreateTimeDesc(Sort by message creation time descending)',
        )
        .optional(),
      page_size: z
        .number()
        .describe('The page size is the number of data items returned in a single request')
        .optional(),
      page_token: z
        .string()
        .describe(
          'Page identifier. It is not filled in the first request, indicating traversal from the beginning; when there will be more groups, the new page_token will be returned at the same time, and the next traversal can use the page_token to get more groups',
        )
        .optional(),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1MessageMergeForward = {
  project: 'im',
  name: 'im.v1.message.mergeForward',
  sdkName: 'im.v1.message.mergeForward',
  path: '/open-apis/im/v1/messages/merge_forward',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Messaging-Message management-Merge forward messages-Merge multiple messages from the same conversation and forward them to a specified user, group chat, or topic',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      receive_id: z
        .string()
        .describe('Message receiver ID. The ID type is consistent with the value of `receive_id_type`'),
      message_id_list: z
        .array(z.string())
        .describe(
          'The list of message IDs to be forwarded. The messages in the list must be from the same session. How to get the ID:- After calling the [Send message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get session history messages] interface and get it from the `message_id` parameter of the response result',
        ),
    }),
    params: z.object({
      receive_id_type: z
        .enum(['open_id', 'user_id', 'union_id', 'email', 'chat_id', 'thread_id'])
        .describe(
          'Message recipient ID type. Options:open_id(Identifies a user to an app. The same user has different Open IDs in different apps. [How to get Open ID]),user_id(Identifies a user to a tenant. The same user has different User IDs in different tenants. In one single tenant, a user has the same User ID in all apps （including store apps）. User ID is usually used to communicate user data between different apps. [How to get User ID]),union_id(Identifies a user to a tenant that acts as a developer. A user has the same Union ID in apps developed by the same developer, and has different Union IDs in apps developed by different developers. A developer can use Union ID to link the same user\'s identities in multiple apps. [How to get Union ID]),email(Identifies users by "email", which is the user\'s actual email address),chat_id(Identifies group chats by chat_id. You can call the API [Search for groups visible to a user or bot] to obtain the chat_id value. For group ID description, refer to [Group ID description]),thread_id(Identifies thread by thread_id. For thread ID description, refer to [Thread Introduction]</md-enum-item>**When the value is `user_id`, the following field scopes are required:**<md-perm name="contact:user.employee_id:readonly" desc="Obtain user ID" support_app_types="custom" tags="">Obtain user ID</md-perm>)',
        ),
      uuid: z
        .string()
        .describe(
          'A custom-set unique string sequence, used to request deduplication when merging and forwarding messages. Requests with the same uuid can only be successfully forwarded once to the same target within 1 hour',
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
  description:
    '[Feishu/Lark]-Messaging-Message card-Update sent message card-Call this interface to update the content of the specified message card by the message ID (message_id)',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      content: z
        .string()
        .describe(
          'Message card content. Cards constructed with Card JSON or the [Card building tool] are supported. - To use card JSON, refer to [card JSON structure]. When passing the value, you need to compress and escape the JSON as a string. - To use the card template built by the [Card building tool], you need to pass in the `type` and `data` parameters. Refer to following description for details. **Note**:- The updated card message must not exceed 30 KB. If the message contains a large number of style tags, it will make the actual message body length larger than the input request body length.- The following example values ​​are not escaped. Please pay attention to convert them into JSON serialized strings when using them',
        ),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          'The ID of the message to be updated. Only update cards (message type is `interactive`) are supported. ID acquisition method:- After calling the [Send message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get session history messages] interface and get it from the `message_id` parameter of the response result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1MessagePushFollowUp = {
  project: 'im',
  name: 'im.v1.message.pushFollowUp',
  sdkName: 'im.v1.message.pushFollowUp',
  path: '/open-apis/im/v1/messages/:message_id/push_follow_up',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Messaging-Message management-Push follow-up-Call this interface to add bubble-style content below the latest message. When the message recipient clicks the bubble or a new message arrives, the bubble disappears',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      follow_ups: z
        .array(
          z.object({
            content: z.string().describe('Content'),
            i18n_contents: z
              .array(
                z.object({
                  content: z.string().describe('Multilingual content of bubbles'),
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
                      'Language Options:en_us(English),zh_cn(SimplifiedChinese Simplified Chinese),zh_hk(SimplifiedChineseHongKong Traditional Chinese - Hong Kong),zh_tw(SimplifiedChineseTaiwan Traditional Chinese - Taiwan),ja_jp(Japanese),id_id(Indonesian),vi_vn(Vietnamese),th_th(Thai),pt_br(Portuguese),es_es(Spanish),ko_kr(Korean),de_de(German),fr_fr(French),it_it(Italian),ru_ru(Russian),ms_my(Malay)',
                    ),
                }),
              )
              .describe('Internationalizational content')
              .optional(),
          }),
        )
        .describe('Follow-ups list'),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          'The ID of the message sent by the robot. How to obtain the ID:- After calling the [Send Message] interface, obtain it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can obtain the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and obtain it from the `message_id` parameter of the response result',
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
  description:
    '[Feishu/Lark]-Messaging-Message reaction-Add a reaction for a message-Adds a reaction of the specified type for a specified message',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      reaction_type: z
        .object({
          emoji_type: z
            .string()
            .describe(
              'Emoji type. For supported emojis and corresponding emoji_type values, see the [emoji introduction]',
            ),
        })
        .describe('Reaction type'),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          'Message ID of the reaction to be added. How to get the ID:- After calling the [Send message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get session history messages] interface and get it from the `message_id` parameter of the response result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1MessageReactionDelete = {
  project: 'im',
  name: 'im.v1.messageReaction.delete',
  sdkName: 'im.v1.messageReaction.delete',
  path: '/open-apis/im/v1/messages/:message_id/reactions/:reaction_id',
  httpMethod: 'DELETE',
  description:
    '[Feishu/Lark]-Messaging-Message reaction-Delete a reaction for a message-Deletes a reaction for a specified message',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      message_id: z
        .string()
        .describe(
          'Message ID of the reaction to be deleted. How to get the ID:- After calling the [Send message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get session history messages] interface and get it from the `message_id` parameter of the response result',
        ),
      reaction_id: z
        .string()
        .describe(
          'ID of the reaction to be deleted, how to get the ID:- Call the [Add message reaction] interface to add an emoji reply, and get it in the returned result.- Call the [Get message reaction] interface to get the ID of a certain emoji reply',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1MessageReactionList = {
  project: 'im',
  name: 'im.v1.messageReaction.list',
  sdkName: 'im.v1.messageReaction.list',
  path: '/open-apis/im/v1/messages/:message_id/reactions',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-Messaging-Message reaction-List message reactions-Get the list of reactions in the specified message, and support getting only reactions of a specific type',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z
      .object({
        reaction_type: z
          .string()
          .describe(
            'The type of emoji to be queried. For supported enumeration values, refer to the emoji_type value in [Emoji Text Description].**Notice**: This parameter is optional. If it is not passed, all reactions in the message will be queried',
          )
          .optional(),
        page_token: z
          .string()
          .describe(
            'Page identifier. It is not filled in the first request, indicating traversal from the beginning when there will be more groups, the new page_token will be returned at the same time, and the next traversal can use the page_token to get more groups',
          )
          .optional(),
        page_size: z
          .number()
          .describe(
            'Paging size, used to limit the number of data entries returned in one request.**Default value**: 20',
          )
          .optional(),
        user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type').optional(),
      })
      .optional(),
    path: z.object({
      message_id: z
        .string()
        .describe(
          'Message ID of the reaction to be obtained. How to get the ID:- After calling the [Send message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get session history messages] interface and get it from the `message_id` parameter of the response result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1MessageReadUsers = {
  project: 'im',
  name: 'im.v1.message.readUsers',
  sdkName: 'im.v1.message.readUsers',
  path: '/open-apis/im/v1/messages/:message_id/read_users',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-Messaging-Message management-Query the read status of message-Query whether the specified message has been read. The interface only returns information about users who have read the message, not information about users who have not read the message',
  accessTokens: ['tenant'],
  schema: {
    params: z.object({
      user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type'),
      page_size: z
        .number()
        .describe('The paging size is used to limit the number of data items returned in a single request')
        .optional(),
      page_token: z
        .string()
        .describe(
          'Page identifier. It is not filled in the first request, indicating traversal from the beginning; when there will be more groups, the new page_token will be returned at the same time, and the next traversal can use the page_token to get more groups',
        )
        .optional(),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          'The ID of the message to be queried. How to obtain the ID:- After calling the [Send Message] interface, obtain it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can obtain the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and obtain it from the `message_id` parameter of the response result',
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
    '[Feishu/Lark]-Messaging-Message management-Reply message-Call this interface to reply to a specified message. The reply content supports multiple types such as text, rich text, card, group business card, personal business card, picture, video, file, etc',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      content: z
        .string()
        .describe(
          "Message content, a string serialized from a JSON structure. The value of this parameter corresponds to `msg_type`. For example, if the value of `msg_type` is `text`, this parameter needs to pass in text type content.**Note:**- JSON strings need to be escaped. For example, the line break `` is escaped as `\\`.- The maximum size of a text message request body cannot exceed 150 KB.- The maximum size of a card message or rich text message request body cannot exceed 30 KB.- If a card template (template_id) is used to send a message, the actual size also includes the card data size corresponding to the template.- If the message contains style tags, the actual message body length will be greater than the request body length you entered.- For images, you need to [upload the image] first, and then use the image's Key to send a message.- Audio, video, and files need to be uploaded first, and then the file's key is used to send a message.For different types of message content formats and usage restrictions, see [Sending Message Content]",
        ),
      msg_type: z
        .string()
        .describe(
          'Message type.**Optional values**:- text- post- image- file- audio- media- sticker- interactive- share_chat- share_userFor detailed information on different message types, see [Send message content]',
        ),
      reply_in_thread: z
        .boolean()
        .describe(
          'Whether to reply in thread form. If the value is true, the reply will be in thread form.**Note**: If the message to be replied is already in thread form, the reply will be in thread form by default',
        )
        .optional(),
      uuid: z
        .string()
        .describe(
          'A custom unique string sequence used to request deduplication when replying to messages. If left blank, deduplication will not be performed. For requests with the same uuid, at most one message can be successfully replied to within 1 hour.**Note**: You can customize the parameter value by referring to the example value. If this parameter is passed in when the reply content is different, you need to change the value of this parameter in each request',
        )
        .optional(),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          'The ID of the message to be replied. How to get the ID:- After calling the [Send Message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and get it from the `message_id` parameter of the response result',
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
    '[Feishu/Lark]-Messaging-Message management-Edit message-Call this interface to edit the content of the sent message. It supports editing text and rich text messages. If you need to edit the card message, please use the [update the message card sent by the application] interface',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      msg_type: z.string().describe('Message type.**Optional values**:- text- post'),
      content: z
        .string()
        .describe(
          'Message content, a string serialized from a JSON structure. The value of this parameter corresponds to `msg_type`. For example, if the value of `msg_type` is `text`, this parameter needs to pass in text type content.**Note:**- JSON strings need to be escaped, such as `\\` after line break escape- The maximum size of a text message request body cannot exceed 150 KB- The maximum size of a rich text message request body cannot exceed 30 KB- If the message contains style tags, the actual message body length will be greater than the request body length you enter.For information about different types of message content formats and usage restrictions, see [Sending Message Content]',
        ),
    }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          'The ID of the message to be edited. Only text and post messages are supported.How to get the ID:- After calling the [Send Message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and get it from the `message_id` parameter of the response result',
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
    '[Feishu/Lark]-Messaging-Buzz message-Send buzz messages in apps-Call this interface to send the specified message buzz to the target user. Buzz is only notified in the Feishu client. For more information about buzz, please refer to [Buzz function]',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      user_id_list: z
        .array(z.string())
        .describe(
          'The target user ID list of Buzz. The ID type is consistent with the query parameter user_id_type. It is recommended to use open_id.**Note**: You need to ensure that the target user is in the conversation to which the buzz message belongs. If there are users in the ID list who are not in the conversation to which the message belongs, the interface will return these invalid IDs (response parameter invalid_user_id_list), and only buzz valid user IDs. If all IDs in the ID list are invalid, the error code `230001` will be returned.**Data validation rules**: The list length cannot be greater than 200',
        ),
    }),
    params: z.object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type') }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          'ID of the message to be buzzed. How to get the ID:- After calling the [Send Message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and get it from the `message_id` parameter of the response result.**Notice**: Buzz [batch messages] are not supported (the corresponding message ID format is `bm_xxx`)',
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
    '[Feishu/Lark]-Messaging-Buzz message-Send buzz messages via phone call-Call this interface to buzz the specified message to the target user, and the buzz will be notified through the Feishu client and phone. For more information about buzz, please refer to [Buzz function]',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      user_id_list: z
        .array(z.string())
        .describe(
          'The target user ID list of Buzz. The ID type is consistent with the query parameter user_id_type. It is recommended to use open_id.**Note**: You need to ensure that the target user is in the conversation to which the buzz message belongs. If there are users in the ID list who are not in the conversation to which the message belongs, the interface will return these invalid IDs (response parameter invalid_user_id_list), and only buzz valid user IDs. If all IDs in the ID list are invalid, the error code `230001` will be returned.**Data validation rules**: The list length cannot be greater than 200',
        ),
    }),
    params: z.object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type') }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          'ID of the message to be buzzed. How to get the ID:- After calling the [Send Message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and get it from the `message_id` parameter of the response result.**Notice**: Buzz [batch messages] are not supported (the corresponding message ID format is `bm_xxx`)',
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
    '[Feishu/Lark]-Messaging-Buzz message-Send buzz messages via SMS-Call this interface to send the specified message buzz to the target user, and buzz will be notified through Feishu client and SMS. For more information about buzz, please refer to [Buzz function]',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      user_id_list: z
        .array(z.string())
        .describe(
          'The target user ID list of Buzz. The ID type is consistent with the query parameter user_id_type. It is recommended to use open_id.**Note**: You need to ensure that the target user is in the conversation to which the buzz message belongs. If there are users in the ID list who are not in the conversation to which the message belongs, the interface will return these invalid IDs (response parameter invalid_user_id_list), and only buzz valid user IDs. If all IDs in the ID list are invalid, the error code `230001` will be returned.**Data validation rules**: The list length cannot be greater than 200',
        ),
    }),
    params: z.object({ user_id_type: z.enum(['open_id', 'union_id', 'user_id']).describe('User ID type') }),
    path: z.object({
      message_id: z
        .string()
        .describe(
          'ID of the message to be buzzed. How to get the ID:- After calling the [Send Message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and get it from the `message_id` parameter of the response result.**Notice**: Buzz [batch messages] are not supported (the corresponding message ID format is `bm_xxx`)',
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
  description:
    '[Feishu/Lark]-Messaging-Pin-Pin a message-Pin a specified message. For the effects of Pin messages, see [Pin overview]',
  accessTokens: ['tenant', 'user'],
  schema: {
    data: z.object({
      message_id: z
        .string()
        .describe(
          'Message ID to be pinned. How to get the ID:- After calling the [Send Message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and get it from the `message_id` parameter of the response result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1PinDelete = {
  project: 'im',
  name: 'im.v1.pin.delete',
  sdkName: 'im.v1.pin.delete',
  path: '/open-apis/im/v1/pins/:message_id',
  httpMethod: 'DELETE',
  description: '[Feishu/Lark]-Messaging-Pin-Unpin a message-Remove the pin of a specified message',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({
      message_id: z
        .string()
        .describe(
          'Message ID to be unpin. How to get the ID:- After calling the [Send Message] interface, get it from the `message_id` parameter of the response result.- Listen to the [Receive Message] event. When the event is triggered, you can get the `message_id` of the message from the event body.- Call the [Get Session History Messages] interface and get it from the `message_id` parameter of the response result',
        ),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1PinList = {
  project: 'im',
  name: 'im.v1.pin.list',
  sdkName: 'im.v1.pin.list',
  path: '/open-apis/im/v1/pins',
  httpMethod: 'GET',
  description:
    '[Feishu/Lark]-Messaging-Pin-Get pins in group-Get all pin data within the specified time range in the chat',
  accessTokens: ['tenant', 'user'],
  schema: {
    params: z.object({
      chat_id: z.string().describe('Group ID. For details, refer to [Group ID description]'),
      start_time: z
        .string()
        .describe(
          'Start time of pin (millisecond timestamp). **Notice**:- If no value is passed, the earliest Pin message in the group chat is obtained by default.- The value passed must be less than the `end_time` value',
        )
        .optional(),
      end_time: z
        .string()
        .describe(
          'End time of pin (millisecond timestamp). **Notice**:- If no value is passed, the default is to start from the latest Pin message in the group chat.- The value passed must be greater than the `start_time` value',
        )
        .optional(),
      page_size: z
        .number()
        .describe('The paging size is used to limit the number of data entries returned in one request')
        .optional(),
      page_token: z
        .string()
        .describe(
          'Page identifier. It is not filled in the first request, indicating traversal from the beginning; when there will be more groups, the new page_token will be returned at the same time, and the next traversal can use the page_token to get more groups',
        )
        .optional(),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const imV1ThreadForward = {
  project: 'im',
  name: 'im.v1.thread.forward',
  sdkName: 'im.v1.thread.forward',
  path: '/open-apis/im/v1/threads/:thread_id/forward',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Messaging-Message management-Forward a thread-Forward a thread to a user, group, or thread',
  accessTokens: ['tenant'],
  schema: {
    data: z.object({
      receive_id: z
        .string()
        .describe('Message receiver ID. The ID type is consistent with the value of `receive_id_type`'),
    }),
    params: z.object({
      receive_id_type: z
        .enum(['open_id', 'union_id', 'user_id', 'email', 'chat_id', 'thread_id'])
        .describe(
          'Message recipient ID type. Options:open_id(OpenID Identifies the identity of a user in an application. The same user has different Open IDs in different applications.),union_id(UnionID Identifies the identity of a user under an application developer. The Union ID of the same user in applications under the same developer is the same, and the Union ID in applications under different developers is different. With Union ID, application developers can associate the identity of the same user in multiple applications.),user_id(UserID Identifies the identity of a user in a tenant. The user ID of the same user in tenant A and tenant B is different. In the same tenant, the user ID of a user is consistent in all applications (including store applications). User IDs are mainly used to connect user data between different applications.),email(Identify the user by their real email address.),chat_id(ChatID Identifies group chats by chat_id. You can call the API [Search for groups visible to a user or bot] to obtain the chat_id value. For group ID description, refer to [Group ID description]),thread_id(ThreadID Identifies thread by thread_id. For thread ID description, refer to [Thread Introduction]</md-enum-item>)',
        ),
      uuid: z
        .string()
        .describe(
          'A custom unique string sequence used to request deduplication when forwarding thread. Requests with the same uuid can only be successfully forwarded to the same target once within 1 hour',
        )
        .optional(),
    }),
    path: z.object({
      thread_id: z
        .string()
        .describe(
          'The ID of the thread to be forwarded. For how to obtain it, see the **How ​​to obtain thread_id** section in [Thread Overview]',
        ),
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
