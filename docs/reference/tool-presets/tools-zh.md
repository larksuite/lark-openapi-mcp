# 飞书/Lark MCP 工具列表
## 业务域: acsV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| acs.v1.accessRecord.list | [获取门禁记录列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/access_record/list) | 智能门禁-门禁记录-获取门禁记录列表 |
| acs.v1.device.list | [获取门禁设备列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/device/list) | 智能门禁-门禁设备-获取门禁设备列表 |
| acs.v1.ruleExternal.create | [创建或更新权限组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/rule_external/create) | 创建或更新权限组 |
| acs.v1.ruleExternal.delete | [删除权限组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/rule_external/delete) | 删除权限组 |
| acs.v1.ruleExternal.deviceBind | [设备绑定权限组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/rule_external/device_bind) | 设备绑定权限组 |
| acs.v1.ruleExternal.get | [获取权限组信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/rule_external/get) | 获取权限组信息 |
| acs.v1.user.get | [获取单个用户信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/get) | 智能门禁-用户管理-获取单个用户信息 |
| acs.v1.user.list | [获取用户列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/list) | 智能门禁-用户管理-获取用户列表 |
| acs.v1.user.patch | [修改用户部分信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/patch) | 智能门禁-用户管理-修改用户部分信息 |
| acs.v1.visitor.create | [添加访客](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/visitor/create) | 添加访客 |
| acs.v1.visitor.delete | [删除访客](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/visitor/delete) | 删除访客 |

## 业务域: adminV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| admin.v1.adminDeptStat.list | [获取部门维度的用户活跃和功能使用数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/admin_dept_stat/list) | 该接口用于获取部门维度的用户活跃和功能使用数据，即IM（即时通讯）、日历、云文档、音视频会议、邮箱功能的使用数据 |
| admin.v1.adminUserStat.list | [获取用户维度的用户活跃和功能使用数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/admin_user_stat/list) | 用于获取用户维度的用户活跃和功能使用数据，即IM（即时通讯）、日历、云文档、音视频会议、邮箱功能的使用数据 |
| admin.v1.auditInfo.list | [获取行为审计日志数据](https://open.feishu.cn/document/ukTMukTMukTM/uQjM5YjL0ITO24CNykjN/audit_log/audit_data_get) | 安全合规-行为审计日志-获取行为审计日志数据 |
| admin.v1.badge.create | [创建勋章](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/create) | 使用该接口可以创建一枚完整的勋章信息，一个租户下最多可创建1000枚勋章 |
| admin.v1.badge.get | [获取勋章详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/get) | 可以通过该接口查询勋章的详情 |
| admin.v1.badgeGrant.create | [创建授予名单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/create) | 通过该接口可以为特定勋章创建一份授予名单，一枚勋章下最多可创建1000份授予名单 |
| admin.v1.badgeGrant.delete | [删除授予名单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/delete) | 通过该接口可以删除特定授予名单的信息 |
| admin.v1.badgeGrant.get | [获取授予名单详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/get) | 通过该接口可以获取特定授予名单的信息 |
| admin.v1.badgeGrant.list | [获取授予名单列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/list) | 通过该接口可以获取特定勋章下的授予名单列表，授予名单的排列顺序按照创建时间倒序排列 |
| admin.v1.badgeGrant.update | [修改授予名单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/update) | 通过该接口可以修改特定授予名单的相关信息 |
| admin.v1.badge.list | [获取勋章列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/list) | 可以通过该接口列出租户下所有的勋章，勋章的排列顺序是按照创建时间倒序排列 |
| admin.v1.badge.update | [修改勋章信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/update) | 通过该接口可以修改勋章的信息 |
| admin.v1.password.reset | [重置用户的企业邮箱密码](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/password/reset) | 管理后台-登录密码管理-重置用户的企业邮箱密码 |

## 业务域: ailyV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| aily.v1.ailySessionAilyMessage.create | [发送 Aily 消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-aily_message/create) | 该 API 用于向某个飞书 Aily 应用发送一条消息（Message）；每个消息从属于一个活跃的会话（Session） |
| aily.v1.ailySessionAilyMessage.get | [获取 Aily 消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-aily_message/get) | 该 API 用于获取某个飞书 Aily 应用的消息（Message）的详细信息；包括消息的内容、发送人等 |
| aily.v1.ailySessionAilyMessage.list | [列出 Aily 消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-aily_message/list) | 该 API 用于列出某个飞书 Aily 应用的某个会话（Session）下消息（Message）的详细信息；包括消息的内容、发送人等 |
| aily.v1.ailySession.create | [创建会话](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session/create) | 该 API 用于创建与某个飞书 Aily 应用的一次会话（Session）；当创建会话成功后，可以发送消息、创建运行 |
| aily.v1.ailySession.delete | [删除会话](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session/delete) | 该 API 用于删除与某个飞书 Aily 应用的一次会话（Session） |
| aily.v1.ailySession.get | [获取会话](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session/get) | 该 API 用于获取与某个飞书 Aily 应用的一次会话（Session）的详细信息，包括会话的状态、渠道上下文、创建时间等 |
| aily.v1.ailySessionRun.cancel | [取消运行](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-run/cancel) | 该 API 用于中止某个飞书 Aily 的一次运行 |
| aily.v1.ailySessionRun.create | [创建运行](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-run/create) | 该 API 用于在某个飞书 Aily 应用会话（Session）上创建一次运行（Run） |
| aily.v1.ailySessionRun.get | [获取运行](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-run/get) | 该 API 用于获取某个飞书 Aily 应用的运行（Run）的详细信息；包括运行的状态、结束时间等 |
| aily.v1.ailySessionRun.list | [列出运行](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-run/list) | 该 API 用于列出某个飞书 Aily 应用的运行（Run）的详细信息；包括状态、结束时间等 |
| aily.v1.ailySession.update | [更新会话](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session/update) | 该 API 用于更新与某个飞书 Aily 应用的一次会话（Session）的信息 |
| aily.v1.appDataAssetTag.list | [获取数据知识分类列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-data_asset_tag/list) | 获取 Aily 助手的数据知识分类列表 |
| aily.v1.appDataAsset.create | [创建数据知识](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-data_asset/create) | 在 Aily 中添加单个数据知识 |
| aily.v1.appDataAsset.delete | [删除数据知识](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-data_asset/delete) | 删除 Aily 的数据知识 |
| aily.v1.appDataAsset.get | [获取数据知识](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-data_asset/get) | 获取单个数据知识 |
| aily.v1.appDataAsset.list | [查询数据知识列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-data_asset/list) | 获取 Aily 助手的数据知识列表 |
| aily.v1.appSkill.get | [获取技能信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-skill/get) | 该 API 用于查询某个 Aily 应用的特定技能详情 |
| aily.v1.appSkill.list | [查询技能列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-skill/list) | 该 API 用于查询某个 Aily 应用的技能列表> 包括内置的数据分析与问答技能、以及未在对话开启的技能 |
| aily.v1.appSkill.start | [调用技能](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-skill/start) | 该 API 用于调用某个 Aily 应用的特定技能，支持指定技能入参；并同步返回技能执行的结果 |

## 业务域: apaasV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| apaas.v1.app.list | [查看应用基本信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/app/list) | 获取企业下应用基本信息，如应用名称 、应用命名空间等 |
| apaas.v1.applicationAuditLog.auditLogList | [查询审计日志列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-audit_log/audit_log_list) | 根据搜索/筛选条件，查询审计日志列表 |
| apaas.v1.applicationAuditLog.dataChangeLogDetail | [查询数据变更日志详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-audit_log/data_change_log_detail) | 根据日志 ID 查询数据变更日志详情 |
| apaas.v1.applicationAuditLog.dataChangeLogsList | [查询数据变更日志列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-audit_log/data_change_logs_list) | 根据搜索/筛选条件，查询数据变更日志列表 |
| apaas.v1.applicationAuditLog.get | [查询审计日志详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-audit_log/get) | 根据日志 ID 查询审计日志详情 |
| apaas.v1.applicationEnvironmentVariable.get | [查询环境变量详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-environment_variable/get) | 查询基于飞书 aPaaS 开发的应用的环境变量详情，包括名称、描述、变量值等 |
| apaas.v1.applicationEnvironmentVariable.query | [查询环境变量列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-environment_variable/query) | 查询基于飞书 aPaaS 开发的应用的环境变量列表 |
| apaas.v1.applicationFlow.execute | [发起流程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-flow/execute) | 执行相应流程 |
| apaas.v1.applicationFunction.invoke | [执行函数](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-function/invoke) | 执行基于飞书应用引擎开发的应用的自定义函数 |
| apaas.v1.applicationObject.oqlQuery | [执行 OQL](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object/oql_query) | 在应用内执行 OQL 语句 |
| apaas.v1.applicationObjectRecord.batchCreate | [批量新建记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/batch_create) | 一次新建多条对象中的记录 |
| apaas.v1.applicationObjectRecord.batchDelete | [批量删除记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/batch_delete) | 一次删除多条对象中的记录 |
| apaas.v1.applicationObjectRecord.batchQuery | [查询记录列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/batch_query) | 获取对象中符合指定条件的记录列表 |
| apaas.v1.applicationObjectRecord.batchUpdate | [批量编辑记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/batch_update) | 一次编辑多条对象中的记录 |
| apaas.v1.applicationObjectRecord.create | [新建记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/create) | 在对象中新建记录 |
| apaas.v1.applicationObjectRecord.delete | [删除记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/delete) | 删除对象中的指定记录 |
| apaas.v1.applicationObjectRecord.patch | [编辑记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/patch) | 编辑对象中的指定记录 |
| apaas.v1.applicationObjectRecord.query | [获取记录详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/query) | 获取对象中指定的记录详情 |
| apaas.v1.applicationObject.search | [搜索记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object/search) | 在应用内搜索记录 |
| apaas.v1.applicationRecordPermissionMember.batchCreateAuthorization | [批量创建记录权限用户授权](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-record_permission-member/batch_create_authorization) | 批量创建记录权限授权 |
| apaas.v1.applicationRecordPermissionMember.batchRemoveAuthorization | [批量删除记录权限用户授权](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-record_permission-member/batch_remove_authorization) | 批量删除记录权限授权 |
| apaas.v1.applicationRoleMember.batchCreateAuthorization | [批量创建角色成员授权](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-role-member/batch_create_authorization) | 批量创建角色成员授权 |
| apaas.v1.applicationRoleMember.batchRemoveAuthorization | [批量删除角色成员授权](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-role-member/batch_remove_authorization) | 批量删除角色成员授权 |
| apaas.v1.applicationRoleMember.get | [查询角色成员信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-role-member/get) | 获取角色成员详情 |
| apaas.v1.approvalInstance.cancel | [撤销人工任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_instance/cancel) | 撤销一个人工任务（包括审批任务，填写任务） |
| apaas.v1.approvalTask.addAssignee | [人工任务加签](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/add_assignee) | 对于人工任务进行加签操作 |
| apaas.v1.approvalTask.agree | [同意人工任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/agree) | 对于人工任务进行同意操作 |
| apaas.v1.approvalTask.reject | [拒绝人工任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/reject) | 对于人工任务进行拒绝操作 |
| apaas.v1.approvalTask.transfer | [转交人工任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/transfer) | 对于人工任务进行转交操作 |
| apaas.v1.seatActivity.list | [查询席位活跃详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/seat_activity/list) | 获取租户下用户使用飞书 aPaaS 席位最近访问应用时间。需要飞书 aPaaS 系统管理员作为授权人调用当前API |
| apaas.v1.seatAssignment.list | [查询席位分配详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/seat_assignment/list) | 获取租户下平台席位和应用访问席位分配详情，如用户 ID 、应用命名空间等，需要飞书 aPaaS 系统管理员作为授权人调用当前 API |
| apaas.v1.userTask.cc | [抄送人工任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/cc) | 对当前的任务进行一次抄送 |
| apaas.v1.userTask.chatGroup | [基于人工任务发起群聊](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/chat_group) | 基于任务，发起一个飞书群聊 |
| apaas.v1.userTask.expediting | [催办人工任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/expediting) | 对任务当前的处理人发起一次催办 |
| apaas.v1.userTask.query | [查询人工任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/query) | 查询人工任务列表 |
| apaas.v1.userTask.rollback | [退回人工任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/rollback) | 对当前任务进行一次退回 |
| apaas.v1.userTask.rollbackPoints | [查询人工任务可退回的位置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/rollback_points) | 查询当前任务可以退回的位置 |

## 业务域: applicationV5
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| application.v5.application.favourite | [获取用户自定义常用的应用](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v5/application/favourite) | 工作台-我的常用-获取用户自定义常用的应用 |
| application.v5.application.recommend | [获取管理员推荐的应用](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v5/application/recommend) | 工作台-我的常用-获取管理员推荐的应用 |

## 业务域: applicationV6
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| application.v6.appBadge.set | [更新应用红点](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/app_badge/set) | 更新应用红点信息，用于工作台场景 |
| application.v6.appRecommendRule.list | [获取当前设置的推荐规则列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/app_recommend_rule/list) | 工作台-我的常用-获取当前设置的推荐规则列表 |
| application.v6.applicationAppUsage.departmentOverview | [获取多部门应用使用概览](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/department_overview) | 查看应用在某一天/某一周/某一个月的使用数据，可以根据部门做多层子部门的筛选 |
| application.v6.applicationAppUsage.messagePushOverview | [获取消息推送概览](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/message_push_overview) | 目标：查看应用在某一天/某一周/某一个月的机器人消息推送数据，可以根据部门做筛选 |
| application.v6.applicationAppUsage.overview | [获取应用使用概览](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/overview) | 查看应用在某一天/某一周/某一个月的使用数据，可以查看租户整体对应用的使用情况，也可以分部门查看 |
| application.v6.applicationAppVersion.contactsRangeSuggest | [获取应用版本中开发者申请的通讯录权限范围](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/contacts_range_suggest) | 该接口用于根据应用的 App ID 和版本 ID 获取企业自建应用某个版本的通讯录权限范围 |
| application.v6.applicationAppVersion.get | [获取应用版本信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/get) | 根据应用 ID 和应用版本 ID 来获取同租户下的应用版本的信息 |
| application.v6.applicationAppVersion.list | [获取应用版本列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/list) | 根据 app_id 获取对应应用版本列表 |
| application.v6.applicationAppVersion.patch | [更新应用审核状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/patch) | 通过接口来更新应用版本的审核结果：通过后应用可以直接上架；拒绝后则开发者可以看到拒绝理由，并在修改后再次申请发布 |
| application.v6.applicationCollaborators.get | [获取应用协作者列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-collaborators/get) | 根据 app_id 获取应用（包括自建应用和商店应用）的协作者信息，包括应用的所有者、管理员、开发者、运营人员 |
| application.v6.applicationCollaborators.update | [更新应用协作者](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-collaborators/update) | 某个应用（包括自建应用和商店应用）中添加/移除应用协作者，添加后协作者将会收到添加通知 |
| application.v6.application.contactsRangeConfiguration | [获取应用通讯录权限范围配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration) | 获取当前企业内某个自建应用线上实际生效的通讯录权限范围配置 |
| application.v6.applicationContactsRange.patch | [更新应用通讯录权限范围配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-contacts_range/patch) | 该接口用于更新当前企业内自建应用或已安装的商店应用的通讯录权限范围配置。更新后线上立即生效 |
| application.v6.applicationFeedback.list | [获取应用反馈列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/list) | 查询应用的反馈数据 |
| application.v6.applicationFeedback.patch | [更新应用反馈](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/patch) | 更新应用的反馈数据 |
| application.v6.application.get | [获取应用信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/get) | 根据app_id获取应用的基础信息 |
| application.v6.application.list | [获取企业安装的应用](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/list) | 该接口用于查询企业安装的应用列表，只能被企业自建应用调用 |
| application.v6.applicationManagement.update | [启停用应用](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-management/update) | 可停用或启用企业内已安装的自建应用与商店应用 |
| application.v6.applicationOwner.update | [转移应用所有者](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-owner/update) | 将某个自建应用的所有者转移给另外一个人 |
| application.v6.application.patch | [更新应用分组信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/patch) | 更新应用的分组信息（分组会影响应用在工作台中的分类情况，请谨慎更新） |
| application.v6.application.underauditlist | [查看待审核的应用列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/underauditlist) | 查看本企业下所有待审核的自建应用列表 |
| application.v6.applicationVisibility.checkWhiteBlackList | [查询用户或部门是否在应用的可用或禁用名单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-visibility/check_white_black_list) | 该接口用于查询用户、部门、用户组是否在应用的可用或禁用名单中 |
| application.v6.applicationVisibility.patch | [更新应用可用范围](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-visibility/patch) | 调用该接口更新指定应用的可用范围，支持更新当前企业内自建应用的可用范围，或者已安装的商店应用的可用范围，包括可用人员与禁用人员。更新可用范围后对线上立即生效 |
| application.v6.scope.apply | [向管理员申请授权](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/scope/apply) | 调用该接口以应用身份向租户管理员申请应用内需要审核的 API 权限 |
| application.v6.scope.list | [查询租户授权状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/scope/list) | 调用该接口查询当前应用向租户申请授权的状态 |

## 业务域: approvalV4
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| approval.v4.approval.create | [创建审批定义](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/create) | 该接口用于创建审批定义，可以灵活指定审批定义的基础信息、表单和流程等 |
| approval.v4.approval.get | [查看指定审批定义](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/get) | 根据审批定义 Code 以及语言、用户 ID 等筛选条件获取指定审批定义的信息，包括审批定义名称、状态、表单控件以及节点等信息。获取审批定义信息后，可根据信息构造[创建审批实例]的请求 |
| approval.v4.approval.subscribe | [订阅审批事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/subscribe) | 当应用[订阅审批事件]后，需要调用该接口指定审批定义 Code（approval_code）开启订阅，开启后应用才可以接收该审批定义对应的事件 |
| approval.v4.approval.unsubscribe | [取消订阅审批事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/unsubscribe) | 调用[订阅审批事件]接口订阅审批定义 Code 后，如果不再需要接收该审批定义下的事件订阅通知，可以调用本接口取消订阅审批定义 Code，取消后应用无法再收到该审批定义对应实例的事件通知 |
| approval.v4.externalApproval.create | [创建三方审批定义](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_approval/create) | 三方审批定义用于设置审批的名称、描述等基本信息，同时还需要设置三方审批系统的审批发起页、数据回调 URL 等信息，将飞书审批与三方审批系统关联起来，使企业员工在飞书审批内即可直接发起三方审批，且审批中心可以将审批数据回传给三方审批系统 |
| approval.v4.externalApproval.get | [查看指定三方审批定义](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_approval/get) | 调用该接口通过三方审批定义 Code 获取审批定义的详细数据，包括三方审批定义的名称、说明、三方审批发起链接、回调 URL 以及审批定义可见人列表等信息 |
| approval.v4.externalInstance.check | [校验三方审批实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/check) | 调用该接口校验三方审批实例数据，用于判断服务端数据是否为最新的。请求时提交实例最新更新时间，如果服务端不存在该实例，或者服务端实例更新时间不是最新的，则返回对应实例 ID。例如，设置定时任务每隔 5 分钟，将最近 5 分钟产生的实例使用该接口进行对比。如果数据在服务端不存在或者不是最新，则可以根据本接口返回的实例 ID、任务 ID，前往[同步三方审批实例] |
| approval.v4.externalInstance.create | [同步三方审批实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/create) | 审批中心不负责审批的流转，审批的流转在三方系统。本接口用于把三方系统在审批流转后生成的审批实例、审批任务、审批抄送数据同步到审批中心 |
| approval.v4.externalTask.list | [获取三方审批任务状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_task/list) | 该接口用于获取三方审批的状态。用户传入查询条件，接口返回满足条件的审批实例的状态 |
| approval.v4.instance.addSign | [审批任务加签](https://open.feishu.cn/document/ukTMukTMukTM/ukTM5UjL5ETO14SOxkTN/approval-task-addsign) | 审批-原生审批任务-审批任务加签 |
| approval.v4.instance.cancel | [撤回审批实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/cancel) | 如果企业管理员在审批后台的某一审批定义的 **更多设置** 中，勾选了 **允许撤销审批中的申请** 或者 **允许撤销 x 天内通过的审批**，则在符合撤销规则的情况下，你可以调用本接口将指定提交人的审批实例撤回 |
| approval.v4.instance.cc | [抄送审批实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/cc) | 调用该接口将当前审批实例抄送给指定用户。被抄送的用户可以查看审批实例详情。例如，在飞书客户端的 **工作台 > 审批 > 审批中心 > 抄送我** 列表中查看到审批实例 |
| approval.v4.instanceComment.create | [创建评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/create) | 在指定审批实例下创建、修改评论或回复评论（不包含审批同意、拒绝、转交等附加的理由或意见） |
| approval.v4.instanceComment.delete | [删除评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/delete) | 删除某审批实例下的一条评论或评论回复（不包含审批同意、拒绝、转交等附加的理由或意见），删除后在审批中心的审批实例内不再显示评论内容，而是显示 **评论已删除** |
| approval.v4.instanceComment.list | [获取评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/list) | 根据审批实例 Code 获取某个审批实例下，全部评论与评论回复（不包含审批同意、拒绝、转交等附加的理由或意见） |
| approval.v4.instanceComment.remove | [清空评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/remove) | 清空某审批实例下的全部评论与评论回复，包括显示为已删除的评论 |
| approval.v4.instance.create | [创建审批实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/create) | 调用本接口使用指定审批定义 Code 创建一个审批实例，接口调用者需对审批定义的表单有详细了解，按照定义的表单结构，将表单 Value 通过本接口传入 |
| approval.v4.instance.get | [获取单个审批实例详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/get) | 通过审批实例 Code 获取指定审批实例的详细信息，包括审批实例的名称、创建时间、发起审批的用户、状态以及任务列表等信息 |
| approval.v4.instance.list | [批量获取审批实例 ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/list) | 根据审批定义的 approval_code 批量获取审批实例的 instance_code，用于拉取企业下某个审批定义的全部审批实例。默认以审批创建时间先后顺序排列 |
| approval.v4.instance.preview | [预览审批流程](https://open.feishu.cn/document/ukTMukTMukTM/ukTM5UjL5ETO14SOxkTN/approval-preview) | 审批-原生审批实例-预览审批流程 |
| approval.v4.instance.query | [查询实例列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/query) | 该接口通过不同条件查询审批系统中符合条件的审批实例列表 |
| approval.v4.instance.searchCc | [查询抄送列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/search_cc) | 该接口通过不同条件查询审批系统中符合条件的审批抄送列表 |
| approval.v4.instance.specifiedRollback | [退回审批任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/specified_rollback) | 从当前审批任务，退回到已审批的一个或多个任务节点。退回后，已审批节点重新生成审批任务 |
| approval.v4.task.approve | [同意审批任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/approve) | 对于单个审批任务进行同意操作。同意后审批流程会流转到下一个审批人 |
| approval.v4.task.query | [查询用户的任务列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/query) | 审批-审批查询-查询用户的任务列表 |
| approval.v4.task.reject | [拒绝审批任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/reject) | 对于单个审批任务进行拒绝操作。拒绝后审批流程结束 |
| approval.v4.task.resubmit | [重新提交审批任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/resubmit) | 对于退回到发起人的审批任务进行重新发起操作。发起后审批流程会流转到下一个审批人 |
| approval.v4.task.search | [查询任务列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/search) | 该接口通过不同条件查询审批系统中符合条件的审批任务列表 |
| approval.v4.task.transfer | [转交审批任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/transfer) | 对于单个审批任务进行转交操作。转交后审批流程流转给被转交人 |

## 业务域: attendanceV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| attendance.v1.approvalInfo.process | [通知审批状态更新](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/approval_info/process) | 对于只使用飞书考勤系统而未使用飞书审批系统的企业，可以通过该接口更新写入飞书考勤系统中的三方系统审批状态，例如请假、加班、外出、出差、补卡等审批，状态包括通过、不通过、撤销等 |
| attendance.v1.archiveRule.delReport | [删除归档报表行数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/del_report) | 按月份、用户和归档规则ID直接删除归档报表行数据 |
| attendance.v1.archiveRule.list | [查询所有归档规则](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/list) | 查询所有归档规则，对应后台假勤管理-考勤统计-报表-[归档报表]功能 |
| attendance.v1.archiveRule.uploadReport | [写入归档报表结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/upload_report) | 写入归档报表结果，对应假勤管理-考勤统计-报表-[归档报表]页签，点击报表名称进入后的导入功能。可以将数据直接写入归档报表 |
| attendance.v1.archiveRule.userStatsFieldsQuery | [查询归档报表表头](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/user_stats_fields_query) | 查询归档报表表头，对应后台假勤管理-考勤统计-报表-[归档报表]中一个归档报表的表头信息。归档报表支持引用系统报表，可设置归档时间和数据归档周期，并且支持根据部门/人员、国家/地区、人员类型、工作地点、职级、序列、职务进行人员圈选 |
| attendance.v1.group.create | [创建或修改考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/create) | 考勤组，是对部门或者员工在某个特定场所及特定时间段内的出勤情况（包括上下班、迟到、早退、病假、婚假、丧假、公休、工作时间、加班情况等）的一种规则设定。通过设置考勤组，可以从部门、员工两个维度，来设定考勤方式、考勤时间、考勤地点等考勤规则。对应功能同设置-假勤设置-[考勤组]的“新建”功能 |
| attendance.v1.group.delete | [删除考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/delete) | 通过考勤组 ID 删除考勤组。对应设置-假勤设置-[考勤组]操作列的删除功能 |
| attendance.v1.group.get | [按 ID 查询考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/get) | 通过考勤组 ID 获取考勤组详情。包含基本信息、考勤班次、考勤方式、考勤设置信息 |
| attendance.v1.group.list | [查询所有考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/list) | 翻页获取所有考勤组列表。列表中的数据为考勤组信息，字段包含考勤组名称和考勤组id |
| attendance.v1.group.listUser | [查询考勤组下所有成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/list_user) | 查询指定考勤组下的所有成员 |
| attendance.v1.group.search | [按名称查询考勤组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/search) | 按考勤组名称查询考勤组摘要信息。查询条件支持名称精确匹配和模糊匹配两种方式。查询结果按考勤组修改时间 desc 排序，且最大记录数为 10 条。对应页面设置-假勤设置-[考勤组]的名称搜索功能 |
| attendance.v1.leaveAccrualRecord.patch | [修改发放记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/leave_accrual_record/patch) | 更新发放记录的发放数量和失效日期，对应假勤管理-休假管理-[发放记录] |
| attendance.v1.leaveEmployExpireRecord.get | [通过过期时间获取发放记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/leave_employ_expire_record/get) | 只能获取到对应时间段过期的发放记录 |
| attendance.v1.shift.create | [创建班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/create) | 班次是描述一次考勤任务时间规则的统称，比如一天打多少次卡，每次卡的上下班时间，晚到多长时间算迟到，晚到多长时间算缺卡等。在假勤设置-[班次设置]中点击班次名称可以进行班次详情查看。如果入参中传入了班次id，那么支持编辑班次的能力 |
| attendance.v1.shift.delete | [删除班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/delete) | 通过班次 ID 删除班次。对应功能为假勤设置-[班次设置]班次列表中操作栏的删除按钮 |
| attendance.v1.shift.get | [按 ID 查询班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/get) | 通过班次 ID 获取班次详情。对应功能为假勤设置-[班次设置]班次列表中的具体班次，班次信息可以点击班次名称查看 |
| attendance.v1.shift.list | [查询所有班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/list) | 飞书人事管理后台中假勤设置-[班次配置]中的翻页查询所有班次功能，展示班次名称、打卡规则、弹性班次规则、休息规则等 |
| attendance.v1.shift.query | [按名称查询班次](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/query) | 飞书人事管理后台中假勤设置-[班次配置]中的搜索班次名称功能，展示班次名称、打卡规则、弹性班次规则、休息规则等 |
| attendance.v1.userApproval.create | [写入审批结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/create) | 由于部分企业使用的是自己的审批系统，而不是飞书审批系统，因此员工的请假、加班等数据无法流入到飞书考勤系统中，导致员工在请假时间段内依然收到打卡提醒，并且被记为缺卡。对于这些只使用飞书考勤系统，而未使用飞书审批系统的企业，可以通过考勤开放接口的形式，将三方审批结果数据回写到飞书考勤系统中 |
| attendance.v1.userApproval.query | [获取审批数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query) | 获取员工在某段时间内的请假、加班、外出和出差四种审批数据 |
| attendance.v1.userDailyShift.batchCreate | [创建或修改排班表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/batch_create) | 排班表是用来描述考勤组内人员每天按哪个班次进行上班。目前排班表支持按x月y日对一位或多位人员进行排班。当用户的排班数据不存在时会进行创建，当用户的排班数据存在时会按照入参信息进行修改。注意：每人每天只能在一个考勤组中 |
| attendance.v1.userDailyShift.batchCreateTemp | [创建或修改临时排班](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/batch_create_temp) | 可在排班表上创建或修改临时班次，并用于排班。目前支持按日期对一位或多位人员进行排临时班次。临时排班为付费功能，如需使用请联系您的客户经理 |
| attendance.v1.userDailyShift.query | [查询排班表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/query) | 支持查询多个用户的排班情况，注意此接口返回的是用户维度的排班结果，与页面功能并不对应。可以通过返回结果中的group_id查询考勤组[按 ID 查询考勤组] ，shift_id查询班次[按 ID 查询班次] 。查询的时间跨度不能超过 30 天 |
| attendance.v1.userFlow.batchCreate | [导入打卡流水](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/batch_create) | 导入员工的打卡流水记录。导入后，会根据员工所在的考勤组班次规则，计算最终的打卡状态与结果。可在打卡管理-[打卡记录]中查询 |
| attendance.v1.userFlow.batchDel | [删除打卡流水](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/batch_del) | 删除员工从开放平台导入的打卡记录。删除后会重新计算打卡记录对应考勤任务结果 |
| attendance.v1.userFlow.get | [查询打卡流水](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/get) | 通过打卡记录 ID 获取用户的打卡流水记录。返回信息主要包含：* 用户id和创建者id* 记录信息* 打卡位置信息、时间信息* 打卡方式信息 * GPS 打卡：location_name（定位地址信息） * Wi-Fi 打卡：ssid（wifi名称）、bssid（mac地址） * 考勤机打卡：device_id（考勤机设备id）对应页面功能打卡管理-[打卡记录] |
| attendance.v1.userFlow.query | [批量查询打卡流水](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/query) | 通过用户 ID 获取用户的打卡流水记录。返回信息主要包含：* 用户id和创建者id* 记录信息* 打卡位置信息、时间信息* 打卡方式信息 * GPS 打卡：location_name（定位地址信息） * Wi-Fi 打卡：ssid（wifi名称）、bssid（mac地址） * 考勤机打卡：device_id（考勤机设备id）对应页面功能打卡管理-[打卡记录] |
| attendance.v1.userSetting.modify | [修改用户人脸识别信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/modify) | 修改授权内员工的用户设置信息，包括人脸照片文件 ID。修改用户人脸识别信息目前只支持 API 方式修改，管理后台已无法修改 |
| attendance.v1.userSetting.query | [批量查询用户人脸识别信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/query) | 批量查询授权内员工的用户设置信息，包括人脸照片文件 ID、人脸照片更新时间。对应页面假勤设置-[人脸识别]。根据返回的face_key可以下载人脸信息[下载用户人脸识别照片] |
| attendance.v1.userStatsData.query | [查询统计数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_data/query) | 查询日度统计或月度统计的统计数据。字段包含基本信息、考勤组信息、出勤统计、异常统计、请假统计、加班统计、打卡时间、考勤结果和自定义字段。具体报表可在考勤统计-[报表]中找到 |
| attendance.v1.userStatsField.query | [查询统计表头](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_field/query) | 查询考勤统计支持的日度统计或月度统计的统计表头。报表的表头信息可以在考勤统计-[报表]中查询到具体的报表信息，此接口专门用于查询表头数据 |
| attendance.v1.userStatsView.query | [查询统计设置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/query) | 查询考勤统计支持的日度统计或月度统计的统计表头。报表的表头信息可以在考勤统计-[报表]中查询到具体的报表信息，此接口专门用于查询表头数据。注意此接口和[查询统计表头]基本相同，区别点在于在兼容历史统计视图模型（历史统计数据模型可以按用户ID设置，后续统计升级为仅支持租户维度） |
| attendance.v1.userStatsView.update | [更新统计设置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/update) | 更新开发者定制的日度统计或月度统计的统计报表表头设置信息。报表的表头信息可以在考勤统计-[报表]中查询到具体的报表信息，此接口专门用于更新表头信息 |
| attendance.v1.userTaskRemedy.create | [通知补卡审批发起](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/create) | 对于只使用飞书考勤系统而未使用飞书审批系统的企业，可以通过该接口，将在三方审批系统中发起的补卡审批数据，写入到飞书考勤系统中，状态为审批中。写入后可以由[通知审批状态更新] 进行状态更新 |
| attendance.v1.userTaskRemedy.query | [获取补卡记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query) | 补卡：用户通过审批的方式，在某一次上/下班的打卡时间范围内，补充一条打卡记录，用以修正用户的考勤结果。本接口专用于获取员工的补卡记录（无页面功能对应） |
| attendance.v1.userTaskRemedy.queryUserAllowedRemedys | [获取可补卡时间](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query_user_allowed_remedys) | 获取用户某天可以补的第几次上 / 下班卡的时间 |
| attendance.v1.userTask.query | [查询打卡结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query) | 获取企业内员工的实际打卡结果，包括：* 打卡任务列表 * 打卡记录id * 用户信息 * 考勤组id * 班次id * 考勤记录 * 上班记录 * 下班记录 * 上班打卡结果 * 下班打卡结果 * 上班打卡结果补充 * 下班打卡结果补充 * 上班打卡时间 * 下班打卡时间* 无效用户id列表* 没有权限用户ID列表 |

## 业务域: authV3
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| auth.v3.auth.appAccessToken | [商店应用获取 app_access_token](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token) | 认证及授权-获取访问凭证-商店应用获取 app_access_token |
| auth.v3.auth.appAccessTokenInternal | [自建应用获取 app_access_token](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token_internal) | 认证及授权-获取访问凭证-自建应用获取 app_access_token |
| auth.v3.auth.appTicketResend | [重新获取 app_ticket](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_ticket_resend) | 认证及授权-获取访问凭证-重新获取 app_ticket |
| auth.v3.auth.tenantAccessToken | [商店应用获取 tenant_access_token](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token) | 认证及授权-获取访问凭证-商店应用获取 tenant_access_token |
| auth.v3.auth.tenantAccessTokenInternal | [自建应用获取 tenant_access_token](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal) | 认证及授权-获取访问凭证-自建应用获取 tenant_access_token |

## 业务域: authenV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| authen.v1.userInfo.get | [获取用户信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/user_info/get) | 通过 `user_access_token` 获取相关用户信息 |

## 业务域: baikeV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| baike.v1.classification.list | [获取词典分类](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/classification/list) | 获取飞书词典当前分类。飞书词典目前为二级分类体系，每个词条可添加多个二级分类，但选择的二级分类必须从属于不同的一级分类 |
| baike.v1.draft.create | [创建草稿](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/create) | 草稿并非词条，而是指通过 API 发起创建新词条或更新现有词条的申请。词典管理员审核通过后，草稿将变为新的词条或覆盖已有词条 |
| baike.v1.draft.update | [更新草稿](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/update) | 根据 draft_id 更新草稿内容，已审批的草稿无法编辑 |
| baike.v1.entity.create | [创建免审词条](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/create) | 通过此接口创建的词条，无需经过词典管理员审核，直接写入词库。因此，调用此接口时，应当慎重操作 |
| baike.v1.entity.extract | [提取潜在的词条](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/extract) | 提取文本中可能成为词条的词语，且不会过滤已经成为词条的词语。同时返回推荐的别名 |
| baike.v1.entity.get | [获取词条详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/get) | 通过词条 id 拉取对应的词条详情信息 |
| baike.v1.entity.highlight | [词条高亮](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/highlight) | 传入一句话，智能识别句中对应的词条，并返回词条位置和 entity_id，可在外部系统中快速实现词条智能高亮 |
| baike.v1.entity.list | [获取词条列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/list) | 分页拉取词条列表数据，支持拉取租户内的全部词条 |
| baike.v1.entity.match | [精准搜索词条](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/match) | 将关键词与词条名、别名精准匹配，并返回对应的 词条 ID |
| baike.v1.entity.search | [模糊搜索词条](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/search) | 传入关键词，与词条名、别名、释义等信息进行模糊匹配，返回搜到的词条信息 |
| baike.v1.entity.update | [更新免审词条](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/update) | 通过此接口更新已有的词条，无需经过词典管理员审核，直接写入词库。因此，调用该接口时应当慎重操作 |

## 业务域: baseV2
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| base.v2.appRole.create | [新增自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/create) | 新增多维表格高级权限中自定义的角色 |
| base.v2.appRole.list | [列出自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/list) | 列出多维表格高级权限中用户自定义的角色 |
| base.v2.appRole.update | [更新自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/update) | 更新多维表格高级权限中自定义的角色 |

## 业务域: bitableV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| bitable.v1.app.copy | [复制多维表格](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/copy) | 复制一个多维表格，可以指定复制到某个有权限的文件夹下 |
| bitable.v1.app.create | [创建多维表格](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/create) | 在指定文件夹中创建一个多维表格，包含一个空白的数据表 |
| bitable.v1.appDashboard.copy | [复制仪表盘](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/copy) | 基于现有仪表盘复制出新的仪表盘 |
| bitable.v1.appDashboard.list | [列出仪表盘](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/list) | 获取多维表格中的所有仪表盘 |
| bitable.v1.app.get | [获取多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/get) | 获取指定多维表格的元数据信息，包括多维表格名称、多维表格版本号、多维表格是否开启高级权限等 |
| bitable.v1.appRole.create | [新增自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create) | 新增多维表格高级权限中自定义的角色 |
| bitable.v1.appRole.delete | [删除自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/delete) | 删除多维表格高级权限中自定义的角色 |
| bitable.v1.appRole.list | [列出自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/list) | 列出多维表格高级权限中用户自定义的角色 |
| bitable.v1.appRoleMember.batchCreate | [批量新增协作者](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_create) | 批量新增多维表格高级权限中自定义角色的协作者 |
| bitable.v1.appRoleMember.batchDelete | [批量删除协作者](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_delete) | 删除多维表格高级权限中自定义角色的协作者 |
| bitable.v1.appRoleMember.create | [新增协作者](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/create) | 新增多维表格高级权限中自定义角色的协作者 |
| bitable.v1.appRoleMember.delete | [删除协作者](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/delete) | 删除多维表格高级权限中自定义角色的协作者 |
| bitable.v1.appRoleMember.list | [列出协作者](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/list) | 列出多维表格高级权限中自定义角色的协作者 |
| bitable.v1.appRole.update | [更新自定义角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/update) | 更新多维表格高级权限中自定义的角色 |
| bitable.v1.appTable.batchCreate | [新增多个数据表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_create) | 新增多个数据表，仅可指定数据表名称 |
| bitable.v1.appTable.batchDelete | [删除多个数据表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_delete) | 通过 app_token 和 table_id 删除多个数据表 |
| bitable.v1.appTable.create | [新增一个数据表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/create) | 新增一个数据表，支持传入数据表名称、视图名称和字段 |
| bitable.v1.appTable.delete | [删除一个数据表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/delete) | 通过 app_token 和 table_id 删除指定的多维表格数据表 |
| bitable.v1.appTableField.create | [新增字段](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/create) | 在多维表格数据表中新增一个字段 |
| bitable.v1.appTableField.delete | [删除字段](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/delete) | 删除多维表格数据表中的一个字段 |
| bitable.v1.appTableField.list | [列出字段](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/list) | 获取多维表格数据表中的的所有字段 |
| bitable.v1.appTableField.update | [更新字段](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/update) | 在多维表格数据表中更新一个字段。更新字段时为全量更新，property 等字段会被完全覆盖 |
| bitable.v1.appTableFormField.list | [列出表单问题](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/list) | 列出表单中的所有问题项 |
| bitable.v1.appTableFormField.patch | [更新表单问题](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/patch) | 更新表单中的问题项 |
| bitable.v1.appTableForm.get | [获取表单元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/get) | 获取表单的所有元数据，包括表单名称、描述、是否共享等 |
| bitable.v1.appTableForm.patch | [更新表单元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/patch) | 更新表单视图中的元数据，包括表单名称、描述、是否共享等 |
| bitable.v1.appTable.list | [列出数据表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/list) | 列出多维表格中的所有数据表，包括其 ID、版本号和名称 |
| bitable.v1.appTable.patch | [更新数据表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/patch) | 更新数据表的名称 |
| bitable.v1.appTableRecord.batchCreate | [新增多条记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_create) | 在多维表格数据表中新增多条记录，单次调用最多新增 1,000 条记录 |
| bitable.v1.appTableRecord.batchDelete | [删除多条记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_delete) | 删除多维表格数据表中现有的多条记录 |
| bitable.v1.appTableRecord.batchGet | [批量获取记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_get) | 通过多个记录 ID 查询记录信息。该接口最多支持查询 100 条记录 |
| bitable.v1.appTableRecord.batchUpdate | [更新多条记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_update) | 更新数据表中的多条记录，单次调用最多更新 1,000 条记录 |
| bitable.v1.appTableRecord.create | [新增记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/create) | 在多维表格数据表中新增一条记录 |
| bitable.v1.appTableRecord.delete | [删除记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/delete) | 删除多维表格数据表中的一条记录 |
| bitable.v1.appTableRecord.get | [检索记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/get) | 该接口用于根据 record_id 的值检索现有记录 |
| bitable.v1.appTableRecord.list | [列出记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/list) | 该接口用于列出数据表中的现有记录，单次最多列出 500 行记录，支持分页获取 |
| bitable.v1.appTableRecord.search | [查询记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/search) | 该接口用于查询数据表中的现有记录，单次最多查询 500 行记录，支持分页获取 |
| bitable.v1.appTableRecord.update | [更新记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/update) | 更新多维表格数据表中的一条记录 |
| bitable.v1.appTableView.create | [新增视图](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/create) | 在多维表格数据表中新增一个视图，可指定视图类型，包括表格视图、看板视图、画册视图、甘特视图和表单视图 |
| bitable.v1.appTableView.delete | [删除视图](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/delete) | 通过 app_token、table_id 和 view_id，删除多维表格数据表中的指定视图 |
| bitable.v1.appTableView.get | [获取视图](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/get) | 根据视图 ID 获取现有视图信息，包括视图名称、类型、属性等 |
| bitable.v1.appTableView.list | [列出视图](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/list) | 获取多维表格数据表中的所有视图 |
| bitable.v1.appTableView.patch | [更新视图](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/patch) | 增量更新视图信息，包括视图名称、属性等，可设置视图的筛选条件 |
| bitable.v1.app.update | [更新多维表格元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update) | 更新多维表格元数据，包括多维表格的名称、是否开启高级权限 |
| bitable.v1.appWorkflow.list | [列出自动化流程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-workflow/list) | 该接口用于列出多维表格的自动化流程 |
| bitable.v1.appWorkflow.update | [更新自动化流程状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-workflow/update) | 开启或关闭自动化流程 |

## 业务域: boardV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| board.v1.whiteboard.downloadAsImage | [下载画板为图片](https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download_as_image&project=board&resource=whiteboard&version=v1) | 下载画板为图片 |
| board.v1.whiteboard.theme | [获取画板主题](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard/theme) | 获取画板主题 |
| board.v1.whiteboard.updateTheme | [更新画板主题](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard/update_theme) | 更新画板主题 |
| board.v1.whiteboardNode.createPlantuml | [解析画板语法](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard-node/create_plantuml) | 用户可以将 PlantUML 或 Mermaid 图表导入画板进行协同编辑 |
| board.v1.whiteboardNode.create | [创建节点](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard-node/create) | 创建画板节点 |
| board.v1.whiteboardNode.list | [获取所有节点](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard-node/list) | 获取画板内所有的节点 |

## 业务域: calendarV4
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| calendar.v4.calendarAcl.create | [创建访问控制](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/create) | 调用该接口以当前身份（应用或用户）为指定日历添加访问控制，即日历成员权限 |
| calendar.v4.calendarAcl.delete | [删除访问控制](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/delete) | 调用该接口以当前身份（应用或用户）删除指定日历内的某一访问控制，即成员权限 |
| calendar.v4.calendarAcl.list | [获取访问控制列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/list) | 调用该接口以当前身份（应用或用户）获取指定日历的访问控制列表 |
| calendar.v4.calendarAcl.subscription | [订阅日历访问控制变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/subscription) | 调用该接口以用户身份订阅指定日历下的访问控制变更事件 |
| calendar.v4.calendarAcl.unsubscription | [取消订阅日历访问控制变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/unsubscription) | 调用该接口以用户身份取消订阅指定日历下的访问控制变更事件 |
| calendar.v4.calendar.create | [创建共享日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/create) | 调用该接口为当前身份（应用或用户）创建一个共享日历 |
| calendar.v4.calendar.delete | [删除共享日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/delete) | 调用该接口以当前身份（应用或用户）删除某一指定的共享日历 |
| calendar.v4.calendarEventAttendee.batchDelete | [删除日程参与人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/batch_delete) | 调用该接口以当前身份（应用或用户）删除指定日程的一个或多个参与人 |
| calendar.v4.calendarEventAttendeeChatMember.list | [获取日程参与群成员列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee-chat_member/list) | 调用该接口以当前身份（应用或用户）获取日程的群组类型参与人的群成员列表 |
| calendar.v4.calendarEventAttendee.create | [添加日程参与人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/create) | 调用该接口以当前身份（应用或用户）为指定日程添加一个或多个参与人，参与人类型包括用户、群组、会议室以及邮箱 |
| calendar.v4.calendarEventAttendee.list | [获取日程参与人列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/list) | 调用该接口以当前身份（应用或用户）获取日程的参与人列表 |
| calendar.v4.calendarEvent.create | [创建日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/create) | 调用该接口以当前身份（应用或用户）在指定日历上创建一个日程 |
| calendar.v4.calendarEvent.delete | [删除日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/delete) | 调用该接口以当前身份（应用或用户）删除指定日历上的一个日程 |
| calendar.v4.calendarEvent.get | [获取日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/get) | 调用该接口以当前身份（应用或用户）获取指定日历内的某一日程信息，包括日程的标题、时间段、视频会议信息、公开范围以及参与人权限等 |
| calendar.v4.calendarEvent.instanceView | [查询日程视图](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/instance_view) | 调用该接口以用户身份查询指定日历下的日程视图。与[获取日程列表]不同的是，当前接口会按照重复日程的重复性规则展开成多个日程实例（instance），并根据查询的时间区间返回相应的日程实例信息 |
| calendar.v4.calendarEvent.instances | [获取重复日程实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/instances) | 调用该接口以当前身份（应用或用户）获取指定日历中的某一重复日程信息 |
| calendar.v4.calendarEvent.list | [获取日程列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/list) | 调用该接口以当前身份（应用或用户）获取指定日历下的日程列表 |
| calendar.v4.calendarEventMeetingChat.create | [创建会议群](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-meeting_chat/create) | 调用该接口以当前身份（应用或用户）为指定日程创建一个会议群 |
| calendar.v4.calendarEventMeetingChat.delete | [解绑会议群](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-meeting_chat/delete) | 调用该接口以当前身份（应用或用户）为日程解绑已创建的会议群 |
| calendar.v4.calendarEventMeetingMinute.create | [创建会议纪要](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-meeting_minute/create) | 调用该接口为指定的日程创建会议纪要。纪要以文档形式展示，成功创建后会返回纪要文档 URL |
| calendar.v4.calendarEvent.patch | [更新日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/patch) | 调用该接口以当前身份（应用或用户）更新指定日历上的一个日程，包括日程标题、描述、开始与结束时间、视频会议以及日程地点等信息 |
| calendar.v4.calendarEvent.reply | [回复日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/reply) | 调用该接口以当前身份（应用或用户）回复日程 |
| calendar.v4.calendarEvent.search | [搜索日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/search) | 调用该接口搜索指定日历下的相关日程，支持关键词搜索、过滤条件搜索 |
| calendar.v4.calendarEvent.subscription | [订阅日程变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/subscription) | 调用该接口以用户身份订阅指定日历下的日程变更事件 |
| calendar.v4.calendarEvent.unsubscription | [取消订阅日程变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/unsubscription) | 调用该接口以用户身份取消订阅指定日历下的日程变更事件 |
| calendar.v4.calendar.get | [查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get) | 调用该接口以当前身份（应用或用户）查询指定日历的信息 |
| calendar.v4.calendar.list | [查询日历列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/list) | 调用该接口分页查询当前身份（应用或用户）的日历列表 |
| calendar.v4.calendar.patch | [更新日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/patch) | 调用该接口以当前身份（应用或用户）修改指定日历的标题、描述、公开范围等信息 |
| calendar.v4.calendar.primary | [查询主日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/primary) | 调用该接口获取当前身份（应用或用户）的主日历信息 |
| calendar.v4.calendar.search | [搜索日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/search) | 调用该接口通过关键字搜索日历，搜索结果为标题或描述包含关键字的公共日历或用户主日历 |
| calendar.v4.calendar.subscribe | [订阅日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscribe) | 调用该接口以当前身份（应用或用户）订阅指定的日历 |
| calendar.v4.calendar.subscription | [订阅日历变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscription) | 调用该接口为当前用户身份订阅[日历变更事件] |
| calendar.v4.calendar.unsubscribe | [取消订阅日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscribe) | 调用该接口以当前身份（应用或用户）取消指定日历的订阅状态 |
| calendar.v4.calendar.unsubscription | [取消订阅日历变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscription) | 调用该接口为当前用户身份取消订阅[日历变更事件] |
| calendar.v4.exchangeBinding.create | [将 Exchange 账户绑定到飞书账户](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/create) | 调用该接口将 Exchange 账户绑定到飞书账户，进而支持 Exchange 日历的导入 |
| calendar.v4.exchangeBinding.delete | [解除 Exchange 账户绑定](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/delete) | 调用该接口解除 Exchange 账户和飞书账户的绑定关系，Exchange 账户解除绑定后才能和其他飞书账户继续绑定 |
| calendar.v4.exchangeBinding.get | [查询 Exchange 账户的绑定状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/get) | 调用该接口获取 Exchange 账户的绑定状态，包括 Exchange 日历的同步状态 |
| calendar.v4.freebusy.list | [查询主日历日程忙闲信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/freebusy/list) | 调用该接口查询指定用户的主日历忙闲信息，或者查询指定会议室的忙闲信息 |
| calendar.v4.setting.generateCaldavConf | [生成 CalDAV 配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/setting/generate_caldav_conf) | 调用该接口为当前用户生成一个 CalDAV 账号密码，用于将飞书日历信息同步到本地设备日历 |
| calendar.v4.timeoffEvent.create | [创建请假日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/create) | 调用该接口为指定用户创建一个请假日程。请假日程分为普通日程和全天日程。创建请假日程后，在请假时间内，用户个人签名页会展示请假信息 |
| calendar.v4.timeoffEvent.delete | [删除请假日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/delete) | 调用该接口删除一个指定的请假日程。请假日程删除后，用户个人签名页的请假信息也会消失 |

## 业务域: cardkitV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| cardkit.v1.card.batchUpdate | [局部更新卡片实体](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card/batch_update) | 更新卡片实体局部内容，包括配置和组件。支持同时对多个组件进行增删改等不同操作 |
| cardkit.v1.card.create | [创建卡片实体](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card/create) | 基于卡片 JSON 代码或卡片搭建工具搭建的卡片，创建卡片实体。用于后续通过卡片实体 ID（card_id）发送卡片、更新卡片等 |
| cardkit.v1.cardElement.content | [流式更新文本](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card-element/content) | 对卡片中的普通文本元素（tag 为 plain_text 的元素）或富文本组件（tag 为 markdown 的组件）传入全量文本内容，以实现“打字机”式的文字输出效果 |
| cardkit.v1.cardElement.create | [新增组件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card-element/create) | 为指定卡片实体新增组件，以扩展卡片内容，如在卡片中添加一个点击按钮 |
| cardkit.v1.cardElement.delete | [删除组件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card-element/delete) | 删除指定卡片实体中的组件 |
| cardkit.v1.cardElement.patch | [更新组件属性](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card-element/patch) | 通过传入 `card_id`（卡片实体 ID）和 `element_id`（组件 ID），更新卡片实体中对应组件的属性 |
| cardkit.v1.cardElement.update | [更新组件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card-element/update) | 更新卡片实体中的指定组件为新组件 |
| cardkit.v1.card.idConvert | [转换 ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card/id_convert) | 将[消息 ID]（ `message_id` ）转换为卡片实体 ID（`card_id`）。用于将由[发送消息]等接口返回的消息 ID 转换为卡片实体 ID，以进一步对卡片进行全量更新、局部更新、或文本流式更新操作 |
| cardkit.v1.card.settings | [更新卡片实体配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card/settings) | 更新指定卡片实体的配置，支持卡片配置 `config` 字段和卡片跳转链接 `card_link` 字段 |
| cardkit.v1.card.update | [全量更新卡片实体](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card/update) | 传入新的卡片 JSON 代码，覆盖更新指定的卡片实体的所有内容 |

## 业务域: compensationV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| compensation.v1.archive.query | [批量查询员工薪资档案](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/archive/query) | 批量查询员工薪资档案 |
| compensation.v1.changeReason.list | [批量查询定调薪原因](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/change_reason/list) | 批量查询定调薪原因 |
| compensation.v1.indicator.list | [批量查询薪资统计指标](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/indicator/list) | 批量查询薪资统计指标 |
| compensation.v1.itemCategory.list | [批量获取薪资项分类信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/item_category/list) | 批量获取薪资项分类信息 |
| compensation.v1.item.list | [批量查询薪资项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/item/list) | 批量查询薪资项 |
| compensation.v1.plan.list | [批量查询薪资方案](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list) | - 此接口将返回全部薪资方案信息，包括薪资方案 ID、生效日期、薪资项/薪资统计指标等 |

## 业务域: contactV3
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| contact.v3.customAttr.list | [获取企业自定义用户字段](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/custom_attr/list) | 调用该接口查询当前企业内自定义用户字段的配置信息 |
| contact.v3.department.batch | [批量获取部门信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/batch) | 调用该接口获取一个或多个部门的信息，包括部门名称、ID、父部门、负责人、状态以及成员个数等 |
| contact.v3.department.children | [获取子部门列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/children) | 调用该接口查询指定部门下的子部门列表，列表内包含部门的名称、ID、父部门、负责人以及状态等信息 |
| contact.v3.department.create | [创建部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/create) | 调用该接口在通讯录内创建一个部门 |
| contact.v3.department.delete | [删除部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/delete) | 调用该接口从通讯录中删除指定的部门 |
| contact.v3.department.get | [获取单个部门信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/get) | 调用该接口获取单个部门信息，包括部门名称、ID、父部门、负责人、状态以及成员个数等 |
| contact.v3.department.list | [获取部门信息列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/list) | 该接口用于获取当前部门子部门列表。[常见问题答疑] |
| contact.v3.department.parent | [获取父部门信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/parent) | 调用该接口递归获取指定部门的父部门信息，包括部门名称、ID、负责人以及状态等 |
| contact.v3.department.patch | [修改部门部分信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/patch) | 调用该接口更新指定部门的部分信息，包括名称、父部门、排序以及负责人等 |
| contact.v3.department.search | [搜索部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/search) | 调用该接口以用户身份通过部门名称关键词查询可见部门的信息，包括部门的 ID、父部门、负责人以及状态等 |
| contact.v3.department.unbindDepartmentChat | [部门群转为普通群](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/unbind_department_chat) | 调用该接口将指定部门的部门群转为普通群 |
| contact.v3.department.update | [更新部门所有信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/update) | 调用该接口更新指定部门的信息，包括名称、父部门以及负责人等信息 |
| contact.v3.department.updateDepartmentId | [更新部门 ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/update_department_id) | 调用该接口可以更新部门的自定义 ID，即 department_id |
| contact.v3.employeeTypeEnum.create | [新增人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/create) | 调用该接口新增一个自定义的人员类型。人员类型是用户属性之一，用于灵活标记用户的身份类型 |
| contact.v3.employeeTypeEnum.delete | [删除人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/delete) | 调用该接口删除指定的自定义人员类型 |
| contact.v3.employeeTypeEnum.list | [查询人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list) | 调用该接口查询当前租户下所有的人员类型信息，包括选项 ID、类型、编号以及内容等 |
| contact.v3.employeeTypeEnum.update | [更新人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/update) | 调用该接口更新指定的自定义人员类型信息 |
| contact.v3.functionalRole.create | [创建角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role/create) | 调用该接口创建一个角色 |
| contact.v3.functionalRole.delete | [删除角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role/delete) | 调用该接口删除指定角色 |
| contact.v3.functionalRoleMember.batchCreate | [批量添加角色成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/batch_create) | 调用该接口在指定角色内添加一个或多个成员 |
| contact.v3.functionalRoleMember.batchDelete | [删除角色下的成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/batch_delete) | 调用该接口在指定角色内删除一个或多个成员 |
| contact.v3.functionalRoleMember.get | [查询角色下某个成员的管理范围](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/get) | 调用本接口查询指定角色内的指定成员的管理范围 |
| contact.v3.functionalRoleMember.list | [查询角色下的所有成员信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/list) | 调用本接口查询指定角色内的所有成员信息，包括成员的用户 ID、管理范围 |
| contact.v3.functionalRoleMember.scopes | [批量设置角色成员管理范围](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/scopes) | 调用该接口为指定角色内的一个或多个角色成员设置管理范围。管理范围是指角色成员可以管理的部门范围 |
| contact.v3.functionalRole.update | [修改角色名称](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role/update) | 调用本接口修改指定角色的角色名称 |
| contact.v3.group.create | [创建用户组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/create) | 调用该接口创建一个用户组。用户组是飞书通讯录中基础实体之一，在用户组内可添加用户或部门资源。各类业务权限管控可以与用户组关联，从而实现高效便捷的成员权限管控 |
| contact.v3.group.delete | [删除用户组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/delete) | 调用该接口删除指定用户组 |
| contact.v3.group.get | [查询指定用户组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/get) | 调用该接口通过用户组 ID 查询指定用户组的基本信息，包括用户组名称、成员数量和类型等 |
| contact.v3.group.memberBelong | [查询用户所属用户组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/member_belong) | 调用该接口查询指定用户所属的用户组列表 |
| contact.v3.groupMember.add | [添加用户组成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/add) | 调用该接口向指定的普通用户组内添加成员 |
| contact.v3.groupMember.batchAdd | [批量添加用户组成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/batch_add) | 调用该接口向指定的普通用户组内添加一个或多个成员 |
| contact.v3.groupMember.batchRemove | [批量移除用户组成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/batch_remove) | 调用该接口从指定普通用户组内移除一个或多个成员 |
| contact.v3.groupMember.remove | [移除用户组成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/remove) | 调用该接口移除指定普通用户组内的某一成员 |
| contact.v3.groupMember.simplelist | [查询用户组成员列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/simplelist) | 调用该接口查询指定用户组内的成员列表，列表内主要包括成员 ID 信息 |
| contact.v3.group.patch | [更新用户组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/patch) | 调用该接口更新指定用户组的名称或描述 |
| contact.v3.group.simplelist | [查询用户组列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/simplelist) | 调用该接口查询当前租户下的用户组列表，列表内包含用户组的 ID、名字、成员数量和类型等信息 |
| contact.v3.jobFamily.create | [创建序列](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/create) | 调用该接口创建一个序列。序列是用户属性之一，用来定义用户的工作类型，例如产品、研发、运营等 |
| contact.v3.jobFamily.delete | [删除序列](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/delete) | 调用该接口删除指定序列 |
| contact.v3.jobFamily.get | [获取单个序列信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/get) | 调用该接口获取指定序列的信息，包括序列的名称、描述、启用状态以及 ID 等 |
| contact.v3.jobFamily.list | [获取租户序列列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/list) | 调用该接口获取当前租户下的序列信息，包含序列的名称、描述、启用状态以及 ID 等 |
| contact.v3.jobFamily.update | [更新序列](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/update) | 调用该接口更新指定序列的信息 |
| contact.v3.jobLevel.create | [创建职级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/create) | 调用该接口创建一个职级。职级是用户属性之一，用于标识用户的职位级别，例如 P1、P2、P3、P4 |
| contact.v3.jobLevel.delete | [删除职级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/delete) | 调用该接口删除指定的职级 |
| contact.v3.jobLevel.get | [获取单个职级信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/get) | 调用该接口获取指定职级的信息，包括职级名称、描述、排序、状态以及多语言等 |
| contact.v3.jobLevel.list | [获取租户职级列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/list) | 调用该接口获取当前租户下的职级信息，包括职级名称、描述、排序、状态以及多语言等 |
| contact.v3.jobLevel.update | [更新职级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/update) | 调用该接口更新指定职级的信息 |
| contact.v3.jobTitle.get | [获取单个职务信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_title/get) | 调用该接口获取指定职务的信息，包括职务的 ID、名称、多语言名称以及启用状态 |
| contact.v3.jobTitle.list | [获取租户职务列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_title/list) | 调用该接口获取当前租户下的职务信息，包括职务的 ID、名称、多语言名称以及启用状态 |
| contact.v3.scope.list | [获取通讯录授权范围](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/scope/list) | 调用该接口获取当前应用被授权可访问的通讯录范围，包括可访问的部门列表、用户列表和用户组列表 |
| contact.v3.unit.bindDepartment | [建立部门与单位的绑定关系](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/bind_department) | 调用该接口建立部门与单位的绑定关系。一个部门同时只能绑定一个单位 |
| contact.v3.unit.create | [创建单位](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/create) | 调用该接口创建一个单位 |
| contact.v3.unit.delete | [删除单位](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/delete) | 调用该接口删除指定单位 |
| contact.v3.unit.get | [获取单位信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/get) | 调用该接口获取指定单位的信息，包括单位 ID、名字、类型 |
| contact.v3.unit.list | [获取单位列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/list) | 调用该接口获取当前租户内的单位列表。列表内主要包含各单位的 ID、名字、类型信息 |
| contact.v3.unit.listDepartment | [获取单位绑定的部门列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/list_department) | 调用该接口获取指定单位绑定的部门列表 |
| contact.v3.unit.patch | [修改单位信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/patch) | 调用该接口修改指定单位的名字 |
| contact.v3.unit.unbindDepartment | [解除部门与单位的绑定关系](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/unbind_department) | 调用该接口解除部门与单位的绑定关系 |
| contact.v3.user.batch | [批量获取用户信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/batch) | 调用该接口获取通讯录内一个或多个用户的信息，包括用户 ID、名称、邮箱、手机号、状态以及所属部门等信息 |
| contact.v3.user.batchGetId | [通过手机号或邮箱获取用户 ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/batch_get_id) | 调用该接口通过手机号或邮箱获取一个或多个用户的 ID （包括 user_id、open_id、union_id）与状态信息 |
| contact.v3.user.create | [创建用户](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/create) | 调用该接口向通讯录创建一个用户（该动作可以理解为员工入职）。成功创建用户后，系统会以短信或邮件的形式向用户发送邀请，用户在同意邀请后方可访问企业或团队 |
| contact.v3.user.delete | [删除用户](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/delete) | 调用该接口从通讯录内删除一个指定用户（该动作可以理解为员工离职），删除时可通过请求参数将用户所有的群组、文档、日程和应用等数据转让至他人 |
| contact.v3.user.findByDepartment | [获取部门直属用户列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/find_by_department) | 调用该接口获取指定部门直属的用户信息列表。用户信息包括用户 ID、名称、邮箱、手机号以及状态等信息 |
| contact.v3.user.get | [获取单个用户信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/get) | 调用该接口获取通讯录中某一用户的信息，包括用户 ID、名称、邮箱、手机号、状态以及所属部门等信息 |
| contact.v3.user.list | [获取用户列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/list) | 基于部门ID获取部门下直属用户列表。[常见问题答疑] |
| contact.v3.user.patch | [修改用户部分信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/patch) | 调用该接口更新通讯录中指定用户的信息，包括名称、邮箱、手机号、所属部门以及自定义字段等信息 |
| contact.v3.user.resurrect | [恢复已删除用户](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/resurrect) | 该接口用于恢复已删除用户（已离职的成员） |
| contact.v3.user.update | [更新用户所有信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/update) | 该接口用于更新通讯录中用户的字段 |
| contact.v3.user.updateUserId | [更新用户 ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/update_user_id) | 调用该接口更新用户的 user_id |
| contact.v3.workCity.get | [获取单个工作城市信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/work_city/get) | 调用该接口获取指定工作城市的信息，包括工作城市的 ID、名称、多语言名称以及启用状态 |
| contact.v3.workCity.list | [获取租户工作城市列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/work_city/list) | 调用该接口获取当前租户下所有工作城市信息，包括工作城市的 ID、名称、多语言名称以及启用状态 |

## 业务域: corehrV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| corehr.v1.assignedUser.search | [获取组织类角色授权列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/assigned_user/search) | 查询组织类角色的授权信息，返回的授权列表中包含被授权的用户ID和被授权的管理维度等信息 |
| corehr.v1.authorization.addRoleAssign | [为用户授权角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/add_role_assign) | 为用户授权角色及管理范围 对已被授权某个角色的用户继续授权，将在原授权的数据范围基础上追加数据范围 |
| corehr.v1.authorization.getByParam | [查询单个用户授权](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/get_by_param) | 查询[飞书人事管理后台]里 -「设置」-「权限设置」中的单个用户授权信息。授权信息中包括员工ID、被授权的角色等信息 |
| corehr.v1.authorization.query | [批量查询用户授权](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/query) | 批量查询[飞书人事管理后台] -「设置」-「权限设置」中的用户授权信息。授权列表信息中包括员工ID、被授权的角色等信息 |
| corehr.v1.authorization.removeRoleAssign | [移除用户被授权的角色](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/remove_role_assign) | 移除用户被授权的指定角色及授权范围，已经存在授权可通过[查询单个用户授权]获得。或者在[飞书人事管理后台]里 -「设置」-「权限设置」中的查看已有用户授权信息 |
| corehr.v1.authorization.updateRoleAssign | [更新用户被授权的数据范围](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/update_role_assign) | 更新角色被授权的管理范围 更新后的数据范围，以本次提交的数据范围为准，本次未提交的部分将被移除 |
| corehr.v1.commonDataId.convert | [ID 转换](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/common_data-id/convert) | 该接口用来进行飞书人事和飞书通讯录、people admin 的各种 ID 转换（仅适用于飞书人事新链路租户） |
| corehr.v1.commonDataMetaData.addEnumOption | [增加字段枚举值选项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/common_data-meta_data/add_enum_option) | 对于当前已有的所有自定义枚举字段，以及部分系统预置枚举字段，通过本接口可在字段中批量新增可选项 |
| corehr.v1.commonDataMetaData.editEnumOption | [修改字段枚举值选项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/common_data-meta_data/edit_enum_option) | 对于当前已有的所有自定义枚举字段，以及部分系统预置枚举字段，通过本接口可修改字段中已有可选项的展示名称、停启用状态 |
| corehr.v1.company.create | [创建公司](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/create) | 支持在单个接口中进行公司信息添加，包括公司基本信息、注册地址信息、工作地址信息等 |
| corehr.v1.company.delete | [删除公司](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/delete) | 删除公司 |
| corehr.v1.company.get | [查询单个公司](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/get) | 根据 ID 查询单个公司 |
| corehr.v1.company.list | [批量查询公司](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list) | 分页查询公司，可分页遍历全量公司数据 |
| corehr.v1.company.patch | [更新公司](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/patch) | 更新公司信息，包括基本信息、注册地址、办公地址等 |
| corehr.v1.compensationStandard.match | [获取员工薪资标准](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/compensation_standard/match) | - 调用此接口来获取员工匹配的薪资标准信息- 请求时，可选传递员工的部门 ID、职级 ID、职务ID 、序列 ID 等筛选条件，用于匹配薪资标准- 此接口将返回员工可匹配到的薪资标准全部信息，包括薪资标准表 ID、薪级薪等、薪资带宽、薪资标准值等 |
| corehr.v1.contract.create | [新建合同](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/create) | 通过本接口可以为员工创建一份新合同 |
| corehr.v1.contract.delete | [删除合同](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/delete) | 通过本接口可以删除合同数据，删除后即无法查询到 |
| corehr.v1.contract.get | [查询单个合同](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/get) | 该接口用于根据合同 ID 查询单个合同详细信息，包括合同开始日期、结束日期、公司主体等信息 |
| corehr.v1.contract.list | [批量查询合同](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/list) | 通过接口可以批量查询合同列表信息，目前暂不支持其他筛选条件且一次查询最多支持50条数据 |
| corehr.v1.contract.patch | [更新合同](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/patch) | 通过该接口可以更新员工合同相关信息，没有修改的参数会保留原值 |
| corehr.v1.countryRegion.get | [查询单条国家/地区信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/country_region/get) | 查询单条国家/地区信息 |
| corehr.v1.countryRegion.list | [批量查询国家/地区信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/country_region/list) | 批量查询国家/地区信息 |
| corehr.v1.currency.get | [查询单个货币信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/currency/get) | 查询单个货币信息 |
| corehr.v1.currency.list | [批量查询货币信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/currency/list) | 批量查询货币信息 |
| corehr.v1.customField.getByParam | [获取字段详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param) | 获取「飞书人事」对象下某字段的详细信息，支持系统预置字段和自定义字段。可通过该接口获取某个选项字段包含的选项列表，某个自定义分组中包含的字段列表等。使用方式可参考「[如何通过 OpenAPI 维护自定义字段]」 |
| corehr.v1.customField.listObjectApiName | [获取飞书人事对象列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/list_object_api_name) | 获取「飞书人事」中的对象列表，含系统预置对象与自定义对象。使用方式可参考[【操作手册】如何通过 OpenAPI 维护自定义字段] |
| corehr.v1.customField.query | [获取自定义字段列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/query) | 根据对象的 API name，获取「飞书人事」具体对象下的自定义字段列表 |
| corehr.v1.department.create | [创建部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/create) | 支持在单个接口中进行部门信息添加，包括部门基本信息、部门负责人、部门自定义字段信息等 |
| corehr.v1.department.delete | [删除部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/delete) | 可以通过该接口通过部门ID删除一个部门记录 |
| corehr.v1.department.get | [查询单个部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/get) | 该接口支持通过部门id批量查询当天的部门详情信息，包括部门包含的名称、描述、启用状态等 |
| corehr.v1.department.list | [批量查询部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/list) | 批量查询部门信息，包括部门基本信息、自定义字段信息等 |
| corehr.v1.department.patch | [更新部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/patch) | 更新部门信息，包括基础信息、自定义字段信息 |
| corehr.v1.employeeType.create | [创建人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/create) | 创建人员类型 |
| corehr.v1.employeeType.delete | [删除人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/delete) | 删除人员类型。删除之后查询接口不能获取到已删除的数据 |
| corehr.v1.employeeType.get | [查询单个人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/get) | 根据 ID 查询单个人员类型 |
| corehr.v1.employeeType.list | [批量查询人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/list) | 批量查询人员类型 |
| corehr.v1.employeeType.patch | [更新人员类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/patch) | 更新人员类型 |
| corehr.v1.employment.create | [创建雇佣信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/create) | 创建人员的雇佣信息，需要先[创建个人信息] |
| corehr.v1.employment.delete | [删除雇佣信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/delete) | 删除人员的雇佣信息 |
| corehr.v1.employment.patch | [更新雇佣信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/patch) | 更新人事工作信息下的字段，如：工号、工作邮箱、雇佣类型、自定义字段等 |
| corehr.v1.jobChange.create | [发起员工异动(不推荐)](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_change/create) | 该接口用于发起员工异动（变更员工雇佣信息），若发起成功，会生成一条员工的异动数据，同时产生相应的事件：[异动状态变更事件] |
| corehr.v1.jobData.create | [创建任职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/create) | 在系统中第一次创建员工任职数据，通常在员工入职或者做数据批量导入的时候使用，【任职原因】只支持填写“onboarding” |
| corehr.v1.jobData.delete | [删除任职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/delete) | 删除人员的任职信息 |
| corehr.v1.jobData.get | [查询单个任职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/get) | 根据 ID 查询当前生效的主任职记录。所有主任职记录中只有一条记录版本当前生效 |
| corehr.v1.jobData.list | [批量查询任职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/list) | 批量查询员工的任职信息 |
| corehr.v1.jobData.patch | [更新任职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/patch) | 默认为新增一条任职记录，包括职务、职级、序列、部门等信息 |
| corehr.v1.jobFamily.create | [创建序列](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/create) | 可以通过该接口创建单个序列信息，同时该接口会针对该接口的内容做校验 |
| corehr.v1.jobFamily.delete | [删除序列](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/delete) | 该接口支持通过序列ID删除单个序列信息 |
| corehr.v1.jobFamily.get | [查询单个序列](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/get) | 该接口支持通过序列ID查询单个序列详情信息 |
| corehr.v1.jobFamily.list | [批量查询序列](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list) | 该接口支持获取租户下的所有序列信息。序列数量过多时，可以通过多次循环调用该接口获取所有序列详情信息，包括序列编码、名称等 |
| corehr.v1.jobFamily.patch | [更新序列](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/patch) | 可以通过序列ID更新单个序列详情信息，例如序列名称、上级序列ID等 |
| corehr.v1.jobLevel.create | [新建职级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/create) | 使用指定信息创建职级信息，每次调用支持创建1个职级对象，接口内会做相关规则校验 |
| corehr.v1.jobLevel.delete | [删除职级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/delete) | 可以通过该接口通过职级ID删除一个职级对象。- 删除对象时请确认有无在职员工、待入职单据、职务等关联此对象，如有会导致删除失败 |
| corehr.v1.jobLevel.get | [查询单个职级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/get) | 该接口支持通过职级id 查询单个职级详情信息，包括职级包含的名称、描述、启用状态等 |
| corehr.v1.jobLevel.list | [批量查询职级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list) | 该接口支持获取租户下的所有职级信息。职级数量过多时，可以通过多次循环调用该接口获取所有职级详情信息，包括职级数值、编码、名称等 |
| corehr.v1.jobLevel.patch | [更新单个职级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/patch) | 该接口可以通过职级ID更新单个职级信息，包括职级数值、名称等信息 |
| corehr.v1.job.create | [创建职务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/create) | 可以通过该接口新建职务信息 |
| corehr.v1.job.delete | [删除职务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/delete) | 你可以通过该接口删除一个职务信息 |
| corehr.v1.job.get | [查询单个职务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/get) | 该接口支持通过职务id批量查询当天的职务详情信息，包括职务包含的名称、描述、启用状态等 |
| corehr.v1.job.list | [批量查询职务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/list) | 批量查询职务 |
| corehr.v1.job.patch | [更新职务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/patch) | 你可以通过该接口更新一个职务信息 |
| corehr.v1.leaveGrantingRecord.create | [创建假期发放记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave_granting_record/create) | 向飞书人事休假系统写入假期发放记录。对应假勤管理-休假管理-[发放记录]的创建或者导入功能 |
| corehr.v1.leaveGrantingRecord.delete | [删除假期发放记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave_granting_record/delete) | 删除飞书人事休假系统中的发放记录，假勤管理-休假管理-[发放记录]（仅支持删除发放来源是「手动发放」或「外部系统发放」的记录） |
| corehr.v1.leave.calendarByScope | [根据适用条件获取工作日历 ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/calendar_by_scope) | 根据日历的适用范围，获取工作日历 ID。适用范围包含工作地点，工时制度等 |
| corehr.v1.leave.leaveBalances | [批量查询员工假期余额](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_balances) | 批量获取员工各个假期的余额数据。对应页面为假勤管理-休假管理-[假期报表] |
| corehr.v1.leave.leaveRequestHistory | [批量查询员工请假记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_request_history) | 批量获取员工的请假记录数据。对应页面为假勤管理-休假管理-[请假记录] |
| corehr.v1.leave.leaveTypes | [获取假期类型列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_types) | 获取休假设置后台配置的假期类型列表（比如年假、事假、婚假等）。对应页面功能为设置-假勤设置-[假期类型] |
| corehr.v1.leave.workCalendar | [获取工作日历](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar) | 获取工作日历信息，如名称，状态等 |
| corehr.v1.leave.workCalendarDate | [获取工作日历日期详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar_date) | 获取工作日历每一天的日期详情，如日期、日期类型等 |
| corehr.v1.location.create | [创建地点](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/create) | 在系统中第一次创建地点数据 |
| corehr.v1.location.delete | [删除地点](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/delete) | 删除地点信息 |
| corehr.v1.location.get | [查询单个地点](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/get) | 该接口用于根据地点 ID查询地点信息，信息包含地点名称、描述、地点用途、工时制度、区域设置、时区以及关联的地址信息等 |
| corehr.v1.location.list | [批量分页查询地点信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/list) | 该接口用于批量查询地点信息，信息包含地点名称、描述、地点用途、工时制度、区域设置、时区以及关联的地址信息等 |
| corehr.v1.nationalIdType.create | [创建国家证件类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/create) | 创建国家证件类型 |
| corehr.v1.nationalIdType.delete | [删除国家证件类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/delete) | 删除国家证件类型，已删除的数据将无法通过查询接口获取 |
| corehr.v1.nationalIdType.get | [查询单个国家证件类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/get) | 根据 ID 查询单个国家证件类型 |
| corehr.v1.nationalIdType.list | [批量查询国家证件类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/list) | 批量查询国家证件类型 |
| corehr.v1.nationalIdType.patch | [更新国家证件类型](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/patch) | 更新国家证件类型 |
| corehr.v1.offboarding.query | [查询员工离职原因列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/query) | 该接口用于查询[离职配置]> 离职原因的选项信息，包括离职原因选项的唯一标识、名称和启用状态等信息 |
| corehr.v1.offboarding.search | [搜索离职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/search) | 该接口支持根据员工ID、离职审批发起时间和离职日期等字段搜索离职信息，可获取包括离职日期、离职原因、离职状态和流程审批状态等信息 |
| corehr.v1.offboarding.submit | [操作员工离职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/submit) | 该接口用于发起员工离职。若发起成功，会生成一条员工的离职数据，同时产生相应的事件。参考[离职申请状态变更] |
| corehr.v1.person.create | [创建个人信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/create) | 创建人员的个人信息 |
| corehr.v1.person.delete | [删除个人信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/delete) | 删除人员的个人信息 |
| corehr.v1.person.get | [查询单个个人信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/get) | 根据 ID 查询单个人员的个人信息 |
| corehr.v1.person.patch | [更新个人信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/patch) | 更新个人信息 |
| corehr.v1.preHire.delete | [删除待入职（不推荐）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/delete) | 删除待入职人员接口，本接口直接删除待入职数据，不会判断入职流程，推荐使用新接口进行删除[【删除待入职】] |
| corehr.v1.preHire.get | [查询单个待入职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/get) | 根据 ID 查询单个待入职人员，本接口不再推荐使用（个人信息相关数据不完整），请使用[查询待入职]接口获取更完整信息 |
| corehr.v1.preHire.list | [批量查询待入职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/list) | 可通过本接口批量查询待入职人员信息，本接口不再推荐使用（个人信息相关数据不完整），请使用[查询待入职]接口获取更完整信息 |
| corehr.v1.preHire.patch | [更新待入职信息（不推荐）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/patch) | 更新待入职信息接口，本接口只是会更新待入职数据，不会校验数据规则，推荐使用新接口[【更新待入职信息】] |
| corehr.v1.processFormVariableData.get | [获取流程表单数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/process-form_variable_data/get) | 根据流程实例 id（process_id）获取流程表单字段数据，包括表单里的业务字段和自定义字段。仅支持飞书人事、假勤相关业务流程 |
| corehr.v1.securityGroup.list | [批量获取角色列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/security_group/list) | 用于查询飞书人事中的角色列表（对应[飞书人事管理后台] - 设置 - 权限设置 - 角色设置中的角色列表），列表内包含角色 ID、名称、状态以及描述等信息 |
| corehr.v1.securityGroup.query | [查询部门 / 地点的 HRBP / 属地 BP](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/security_group/query) | 通过部门或工作地点，查询对应的 HRBP / 属地 BP，返回的信息中包含BP的员工ID、部门ID、属地ID等信息 |
| corehr.v1.subdivision.get | [查询单条省份/行政区信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subdivision/get) | 查询单条省份/行政区信息 |
| corehr.v1.subdivision.list | [批量查询省份/行政区信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subdivision/list) | 批量查询省份/行政区信息 |
| corehr.v1.subregion.get | [查询单条城市/区域信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subregion/get) | 查询单条城市/区域信息 |
| corehr.v1.subregion.list | [批量查询城市/区域信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subregion/list) | 批量查询城市/区域信息 |
| corehr.v1.transferReason.query | [获取异动原因列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/transfer_reason/query) | 获取异动原因列表 |
| corehr.v1.transferType.query | [获取异动类型列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/transfer_type/query) | 获取异动类型列表 |
| corehr.v1.workingHoursType.create | [创建工时制度](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/create) | 创建工时制度 |
| corehr.v1.workingHoursType.delete | [删除工时制度](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/delete) | 删除工时制度 |
| corehr.v1.workingHoursType.get | [查询单个工时制度](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/get) | 根据 ID 查询单个工时制度 |
| corehr.v1.workingHoursType.list | [批量查询工时制度](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list) | 批量查询工时制度 |
| corehr.v1.workingHoursType.patch | [更新工时制度](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/patch) | 更新工时制度 |

## 业务域: corehrV2
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| corehr.v2.approvalGroups.get | [根据流程 ID 查询组织架构调整记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/get) | 用户通过『飞书人事-我的团队-组织架构』 发起一个组织架构调整会根据 审批流配置发起 一个或多个审批。 之后用户可通过流程 process 的单据 ID， 查询到该审批进行的状态， 以及该流程中涉及到的 组织架构信息（包括部门变更、人员变更记录 ID、岗位变更记录 ID）。如需查询具体变更详情：- 部门变更：[批量查询部门变更接口]- 员工变更：[批量查询员工变更接口] |
| corehr.v2.approvalGroups.openQueryDepartmentChangeListByIds | [批量查询部门调整内容](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/open_query_department_change_list_by_ids) | 根据部门调整记录 ID 批量查询部门调整内容，如：部门调整类型、部门调整前后名称、部门调整前后角色信息 等 |
| corehr.v2.approvalGroups.openQueryJobChangeListByIds | [批量查询人员调整内容](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/open_query_job_change_list_by_ids) | 根据人员异动记录 ID 批量查询人员调整内容 |
| corehr.v2.approver.list | [获取指定人员审批任务列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approver/list) | 审批任务依赖于流程节点实例存在，每一个流程节点实例可能包含有一或多个审批任务，每一个任务表明当前节点的审批人是谁，该接口可获取指定人员的审批任务列表（此功能不受数据权限范围控制） |
| corehr.v2.basicInfoBankBranch.search | [查询支行信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank_branch/search) | 根据银行 ID、支行 ID 、支行名称、联行号，支行状态、更新时间 查询银行信息 |
| corehr.v2.basicInfoBank.search | [查询银行信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank/search) | 根据银行 ID 、银行名称，查询银行信息 |
| corehr.v2.basicInfoCity.search | [查询城市信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-city/search) | 根据城市 ID、上级省份/主要行政区 ID ，查询城市（自治区、地区、县「美」、町、村「日」）信息 |
| corehr.v2.basicInfoCountryRegionSubdivision.search | [查询省份/主要行政区信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region_subdivision/search) | 根据国家/地区 ID、省份/主要行政区 ID、状态，批量查询国家/地区下辖的一级行政区（如省份、直辖市、自治区、州等）数据 |
| corehr.v2.basicInfoCountryRegion.search | [查询国家/地区信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search) | 根据国家/地区 ID、状态，批量查询国家/地区信息 |
| corehr.v2.basicInfoCurrency.search | [查询货币信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-currency/search) | 根据货币 ID、状态查询货币信息 |
| corehr.v2.basicInfoDistrict.search | [查询区/县信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-district/search) | 根据区/县 ID、上级城市 ID，查询区/县信息 |
| corehr.v2.basicInfoLanguage.search | [查询语言信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-language/search) | 根据语言 ID、状态，批量查询语言信息 |
| corehr.v2.basicInfoNationality.search | [查询国籍信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-nationality/search) | 根据国籍 ID、国家 ID，查询国籍信息 |
| corehr.v2.basicInfoTimeZone.search | [查询时区信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-time_zone/search) | 根据时区 ID、状态，批量查询时区信息 |
| corehr.v2.bp.getByDepartment | [查询部门 HRBP](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/bp/get_by_department) | 查询部门的 HRBP 信息，包括来自上级部门的 HRBP |
| corehr.v2.bp.list | [获取 HRBP 列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/bp/list) | 获取 HRBP 列表。列表中包含HRBP的ID以及部门ID信息 |
| corehr.v2.company.active | [启用/停用公司](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/active) | 对公司进行启用或停用操作 |
| corehr.v2.company.batchGet | [通过公司 ID 批量获取公司信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/batch_get) | 通过 ID 批量查询公司信息 |
| corehr.v2.company.queryRecentChange | [查询当前生效信息变更公司](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/query_recent_change) | 查询指定时间范围内当前生效信息发生变更的公司，即只有公司当前生效版本的生效时间在查询时间范围内，才返回该公司id |
| corehr.v2.contract.search | [搜索合同](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/contract/search) | 该接口可用于搜索合同信息，包括合同开始时间、合同预计结束时间、合同实际结束时间、合同公司主体等信息 |
| corehr.v2.costAllocation.batchQuery | [查询成本分摊](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_allocation/batch_query) | 查询成本分摊 |
| corehr.v2.costAllocation.createVersion | [创建成本分摊](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_allocation/create_version) | 创建成本分摊 |
| corehr.v2.costAllocation.removeVersion | [删除成本分摊](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_allocation/remove_version) | 删除成本分摊 |
| corehr.v2.costAllocation.updateVersion | [更新成本分摊](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_allocation/update_version) | 更新成本分摊 |
| corehr.v2.costCenter.create | [创建成本中心](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/create) | 单个创建成本中心；可定义成本中心的名称，父级成本中心，成本中心负责人，生效时间等 |
| corehr.v2.costCenter.delete | [删除成本中心](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/delete) | 删除成本中心记录 |
| corehr.v2.costCenter.patch | [启用 / 停用成本中心](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/patch) | 该接口支持对单个成本中心进行启用和停用操作 |
| corehr.v2.costCenter.queryRecentChange | [查询当前生效信息发生变更的成本中心](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/query_recent_change) | 查询指定时间范围内当前生效信息发生变更的成本中心，即只有部门当前生效版本的生效时间在查询时间范围内，才返回该成本中心id |
| corehr.v2.costCenter.search | [搜索成本中心信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/search) | 搜索成本中心信息；支持通过成本中心ID，成本中心名称，成本中心编码，成本中心上级搜索成本中心的信息，有分页功能 |
| corehr.v2.costCenterVersion.create | [创建成本中心版本](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/create) | 创建成本中心版本；每次调用可创建一个成本中心版本，可定义成本中心的名称，描述，上级成本，成本中心负责人，版本生效时间等信息，接口内会做相关规则的校验 |
| corehr.v2.costCenterVersion.delete | [撤销成本中心版本](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/delete) | 该接口支持通过成本中心的版本ID撤销成本中心版本信息 |
| corehr.v2.costCenterVersion.patch | [更正成本中心版本](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/patch) | 对成本中心的版本记录进行更正，可更正的字段包括：名称，上级成本中心，成本中心负责人列表，成本中心的描述，生效时间 |
| corehr.v2.customOrg.active | [启用/停用自定义组织](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/active) | 对自定义组织进行启用或停用操作 |
| corehr.v2.customOrg.create | [创建自定义组织](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/create) | 使用指定信息创建自定义组织，接口内会做相关规则校验 |
| corehr.v2.customOrg.deleteOrg | [删除自定义组织](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/delete_org) | 根据传入的自定义组织 ID 删除相应自定义组织 |
| corehr.v2.customOrg.patch | [更新自定义组织信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/patch) | 更新一个自定义组织基础信息，不支持更新自动匹配规则，如需更新自动匹配规则请使用[更新匹配规则] |
| corehr.v2.customOrg.query | [查询自定义组织信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/query) | 根据传入的筛选条件批量查询自定义组织信息。不传任何筛选条件，默认获得该租户下所有的自定义组织数据 |
| corehr.v2.customOrg.queryRecentChange | [查询当前生效信息变更的自定义组织](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/query_recent_change) | 查询指定时间范围内当前生效信息发生变更的自定义组织，即只有部门当前生效版本的生效时间在查询时间范围内，才返回该自定义组织id |
| corehr.v2.customOrg.updateRule | [更新自定义组织的匹配规则](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/update_rule) | 更新自定义组织的匹配规则。仅开启了「为组织设置自动匹配规则」的自定义组织类型可用。如需更新自定义组织基本信息可使用[更新自定义组织] |
| corehr.v2.defaultCostCenter.batchQuery | [查询默认成本中心](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/default_cost_center/batch_query) | 查询默认成本中心 |
| corehr.v2.defaultCostCenter.createVersion | [添加默认成本中心](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/default_cost_center/create_version) | 添加默认成本中心 |
| corehr.v2.defaultCostCenter.removeVersion | [删除默认成本中心](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/default_cost_center/remove_version) | 删除默认成本中心 |
| corehr.v2.defaultCostCenter.updateVersion | [更新默认成本中心](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/default_cost_center/update_version) | 更新默认成本中心 |
| corehr.v2.department.batchGet | [批量查询部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get) | 批量查询部门信息，**该接口只返回部门当前内容** |
| corehr.v2.department.delete | [删除部门 V2](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/delete) | 可以通过该接口通过部门ID删除一个部门记录，带数据行权限判权 |
| corehr.v2.department.parents | [获取父部门信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/parents) | 该接口用来递归获取部门的父部门信息，并按照由子到父的顺序返回有权限的父部门信息列表 |
| corehr.v2.department.patch | [更新部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/patch) | 更新部门，支持数据行权限判权 |
| corehr.v2.department.queryMultiTimeline | [批量查询部门版本信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_multi_timeline) | 根据部门ID列表，批量查询开始结束时间内的所有部门版本信息，含部门名称、部门类型、上级、编码、负责人、是否启用、描述等信息 |
| corehr.v2.department.queryOperationLogs | [批量查询部门操作日志](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_operation_logs) | 批量查询指定时间范围内的部门操作日志 |
| corehr.v2.department.queryRecentChange | [查询生效信息变更部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_recent_change) | 查询指定时间范围内当前生效信息发生变更的部门，即只有部门当前生效版本的生效时间在查询时间范围内，才返回该部门id |
| corehr.v2.department.queryTimeline | [查询指定生效日期的部门基本信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_timeline) | 查询指定生效的部门基本信息，含部门名称、部门类型、上级、编码、负责人、是否启用、描述等信息 |
| corehr.v2.department.search | [搜索部门信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/search) | 该接口支持通过部门id、上级部门ID、部门负责人、名称、编码字段批量搜索当天的部门详情信息，包括部门包含的名称、描述、启用状态等 |
| corehr.v2.department.tree | [查询指定生效日期的部门架构树](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/tree) | 支持传入部门ID（不传默认根部门），任意日期（不传默认当前日期）。从给定部门ID开始广度遍历，每页最多返回2000行数据 |
| corehr.v2.employee.batchGet | [批量查询员工信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get) | 通过员工 ID 、个人信息 ID、工作邮箱等筛选项批量查询员工的工作信息、个人信息 |
| corehr.v2.employee.create | [添加人员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/create) | 支持在单个接口中进行人员全信息添加，包括人员的基本信息，雇佣信息，入职任职记录及其他分组信息 |
| corehr.v2.employee.search | [搜索员工信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/search) | 查询员工的工作信息、个人信息等数据 |
| corehr.v2.employeesAdditionalJob.batch | [批量查询兼职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/batch) | 批量查询兼职信息，包括开始日期、职务、序列、上级、薪资类型等信息。支持全量遍历和筛选查询 |
| corehr.v2.employeesAdditionalJob.create | [创建兼职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/create) | 创建员工的兼职 |
| corehr.v2.employeesAdditionalJob.delete | [删除兼职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/delete) | 删除一条指定的员工兼职 |
| corehr.v2.employeesAdditionalJob.patch | [更新兼职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/patch) | 更新员工的兼职 |
| corehr.v2.employeesBp.batchGet | [查询员工 HRBP / 属地 BP](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-bp/batch_get) | 查询员工的 HRBP 和属地 BP，包括来自上级部门的 HRBP 和属地 BP |
| corehr.v2.employeesInternationalAssignment.create | [创建外派信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-international_assignment/create) | 为员工添加外派记录，包括外派信息、任职信息 |
| corehr.v2.employeesInternationalAssignment.delete | [删除外派信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-international_assignment/delete) | 删除某一条外派信息 |
| corehr.v2.employeesInternationalAssignment.list | [批量查询外派信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-international_assignment/list) | 查询员工的外派信息：外派类型、外派地点、职务、职级、上级等 |
| corehr.v2.employeesInternationalAssignment.patch | [更新外派信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-international_assignment/patch) | 更新指定的外派信息 |
| corehr.v2.employeesJobData.batchGet | [批量查询员工任职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-job_data/batch_get) | 通过员工雇佣 ID 批量查询任职信息 |
| corehr.v2.employeesJobData.query | [获取任职信息列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-job_data/query) | 获取任职信息列表 |
| corehr.v2.enum.search | [查询枚举信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/enum/search) | 根据枚举的APIName查询枚举详细信息，用于BPM等场景获取枚举选项 |
| corehr.v2.jobChange.create | [发起员工异动](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/create) | 该接口用于发起员工异动（变更员工雇佣信息），若发起成功，会生成一条员工的异动数据 |
| corehr.v2.jobChange.revoke | [撤销异动](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/revoke) | 该接口用于撤销员工异动，若发起成功，会撤销一条已发起、待生效或已生效的异动数据，同时产生相应的事件：[异动状态变更事件]。该接口无法撤销批量发起的多人异动。使用时需指定操作人，关联了流程的异动需要流程管理员和审批单管理员权限 |
| corehr.v2.jobChange.search | [搜索员工异动信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/search) | 搜索异动信息，该接口会按照应用拥有的「员工数据」的权限范围返回数据，请确定在「开发者后台 - 权限管理 - 数据权限」中有申请「员工资源」权限范围 |
| corehr.v2.jobFamily.batchGet | [根据条件批量获取序列信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_family/batch_get) | 通过序列 ID 或序列 Code 批量查询当前生效版本序列的详情信息，包括序列名称、启用状态、上级序列等 |
| corehr.v2.jobFamily.queryRecentChange | [查询当前生效信息发生变更的序列](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_family/query_recent_change) | 查询指定时间范围内当前生效信息发生变更的序列，即只有序列前生效版本的生效时间在查询时间范围内，才返回该序列id |
| corehr.v2.jobGrade.create | [创建职等](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/create) | 创建职等 |
| corehr.v2.jobGrade.delete | [删除职等](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/delete) | 删除职等 |
| corehr.v2.jobGrade.patch | [更新职等](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/patch) | 更新职等 |
| corehr.v2.jobGrade.query | [查询职等](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query) | 查询职等的详细信息 |
| corehr.v2.jobGrade.queryRecentChange | [查询当前生效信息发生变更的职等](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query_recent_change) | 查询指定时间范围内当前生效信息发生变更的职等，即只有职等当前生效版本的生效时间在查询时间范围内，才返回该地点id |
| corehr.v2.jobLevel.batchGet | [根据条件批量获取职级信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_level/batch_get) | 该接口支持通过职级ID或职级Code批量查询职级详情信息，包括名称、描述、启用状态等 |
| corehr.v2.jobLevel.queryRecentChange | [查询当前生效信息发生变更的职级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_level/query_recent_change) | 查询指定时间范围内当前生效信息发生变更的职级，即只有地点当前生效版本的生效时间在查询时间范围内，才返回该职级id |
| corehr.v2.job.get | [查询单个职务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/get) | 根据 ID 查询单个职务 |
| corehr.v2.job.list | [批量查询职务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list) | 可以通过该接口查询租户下全部职务ID列表 |
| corehr.v2.job.queryRecentChange | [查询当前生效信息发生变更的职务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/query_recent_change) | 查询指定时间范围内当前生效信息发生变更的职务，即只有职务当前生效版本的生效时间在查询时间范围内，才返回该职务id |
| corehr.v2.location.active | [启用/停用地点](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/active) | 启用/停用地点 |
| corehr.v2.locationAddress.create | [添加地点地址](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location-address/create) | 添加地点地址 |
| corehr.v2.locationAddress.delete | [删除地点地址](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location-address/delete) | 删除地点地址 |
| corehr.v2.locationAddress.patch | [更新地点地址](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location-address/patch) | 更新地点地址 |
| corehr.v2.location.batchGet | [通过地点 ID 批量获取地点信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/batch_get) | 该接口用于根据地点 ID批量查询地点信息，信息包含地点名称、描述、地点用途、工时制度、区域设置、时区以及关联的地址信息等 |
| corehr.v2.location.patch | [更新地点](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/patch) | 更新地点 |
| corehr.v2.location.queryRecentChange | [查询当前生效信息发生变更的地点](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/query_recent_change) | 查询指定时间范围内当前生效信息发生变更的地点，即只有地点当前生效版本的生效时间在查询时间范围内，才返回该地点id |
| corehr.v2.offboarding.edit | [编辑离职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/offboarding/edit) | 该接口用于编辑飞书人事的[离职信息]，支持的字段包括离职日期、离职原因、离职申请发起时间和离职申请审批通过时间等等，同时也支持编辑离职的自定义字段（附件字段除外）。当接口成功提交后，会产生对应的[离职信息变更]事件 |
| corehr.v2.offboarding.revoke | [撤销离职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/offboarding/revoke) | 通过离职ID撤销飞书人事的[离职信息]。当接口成功提交后，会产生对应的[离职信息变更]事件 |
| corehr.v2.offboarding.submitV2 | [操作员工离职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/offboarding/submit_v2) | 该接口用于发起飞书人事的[离职信息]，支持填写离职日期、离职原因、屏蔽名单和自定义字段（附件字段除外）等。当接口成功提交后，会产生对应的[离职信息变更]事件 |
| corehr.v2.person.create | [创建个人信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/person/create) | 创建员工的个人信息，包括姓名、个人电话、邮箱、联系地址、政治面貌、户口信息等 |
| corehr.v2.person.patch | [更新个人信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/person/patch) | 更新员工的个人信息，包括姓名、个人电话、邮箱、联系地址、政治面貌、户口信息等 |
| corehr.v2.preHire.complete | [操作员工完成入职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/complete) | 操作待入职员工完成入职，正式入职建立员工和公司/组织的雇佣关系 |
| corehr.v2.preHire.create | [直接创建待入职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/create) | 使用指定数据创建一个待入职人员 |
| corehr.v2.preHire.delete | [删除待入职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/delete) | 删除待入职人员，删除后无法搜索到待入职人员信息，请谨慎操作 |
| corehr.v2.preHire.patch | [更新待入职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/patch) | 通过指定系统字段和自定义字段以更新待入职数据 |
| corehr.v2.preHire.query | [查询待入职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/query) | 该接口用于根据待入职人员 ID(支持批量)查询待入职人员信息，信息包含姓名、手机号等个人信息和任职信息。- 延迟说明：数据库主从延迟 2s 以内，即：直接创建待入职后2s内调用此接口可能查询不到数据。- 性能说明：本接口返回数据量较多，查询时请控制每批次数量（<10）和适当减少查询字段数(<50) |
| corehr.v2.preHire.restoreFlowInstance | [恢复入职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/restore_flow_instance) | 通过本接口对指定已撤销的待入职员工执行恢复入职操作，对应入职管理页面恢复入职按钮 |
| corehr.v2.preHire.search | [搜索待入职信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/search) | 该接口用于根据工号/待入职人员 ID /入职地点等查询条件搜索待入职人员信息。- 查询的待入职数量及字段越多，耗时越久，使用时建议细化指定需要的字段。- 创建待入职后，会有5秒内的数据延迟导致搜索不到数据 |
| corehr.v2.preHire.transitTask | [流转入职任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/transit_task) | 配置入职流程后，可通过本接口流转进行中的任务 |
| corehr.v2.preHire.withdrawOnboarding | [撤销入职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/withdraw_onboarding) | 通过本接口对指定待入职，入职准备就绪的员工执行撤销入职操作，对应入职管理页面撤销入职按钮 |
| corehr.v2.probationAssessment.create | [新增试用期考核信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/create) | 新增员工试用期考核结果 |
| corehr.v2.probationAssessment.delete | [删除试用期考核信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/delete) | 删除试用期的考核结果 |
| corehr.v2.probationAssessment.patch | [更新试用期考核信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/patch) | 更新试用期的考核结果 |
| corehr.v2.probation.enableDisableAssessment | [启用/停用试用期考核功能](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/enable_disable_assessment) | 启用/停用试用期考核功能，启用后系统功能中针对试用期考核相关的字段会自动启用，并可通过接口更新试用期考核结果 |
| corehr.v2.probation.search | [搜索试用期信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/search) | 搜索试用期信息，创建试用期后立刻搜索，可能会存在 5s 左右延迟 |
| corehr.v2.probation.submit | [发起转正](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/submit) | 通过本接口可以为员工发起转正 |
| corehr.v2.probation.withdraw | [撤销转正](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/withdraw) | 可通过本接口撤销对员工之前发起的转正 |
| corehr.v2.processRevoke.update | [撤销流程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process_revoke/update) | 撤销单个流程，状态为已完成的流程能够进行撤销，使用时需指定操作人，目前支持流程管理员和审批单管理员 |
| corehr.v2.processWithdraw.update | [撤回流程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process_withdraw/update) | 对状态为“审批中”的单个审批实例进行撤回操作，撤回后审批流程结束 |
| corehr.v2.processApprover.update | [通过/拒绝审批任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-approver/update) | 对于单个审批任务进行通过（提交）或拒绝操作。对于多人或签节点，一个审批任务通过则整个节点通过；对于多人会签节点，所有审批任务通过则节点通过。在通过（提交）时，若表单中有必填字段，支持写入表单字段 |
| corehr.v2.processExtra.update | [加签审批任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-extra/update) | 给单个流程中的节点或审批任务加签，加签方式有前加签、并加签、后加签三种 |
| corehr.v2.processFormVariableData.get | [获取流程表单数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-form_variable_data/get) | 根据流程实例 id（process_id）获取流程表单字段数据，包括表单里的业务字段和自定义字段。仅支持飞书人事、假勤相关业务流程。注：[旧版 API] 文档已移动到【历史版本】目录 |
| corehr.v2.process.get | [获取单个流程详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process/get) | 根据流程实例 id（process_id）获取单个流程详情（此功能不受数据权限范围控制）。比如流程状态、流程发起人、流程发起时间、流程摘要、流程里的所有待办、已办、抄送任务等 |
| corehr.v2.process.list | [查询流程实例列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process/list) | 本接口用于查询流程实例列表，支持通过流程定义 ID 等进行查询（此功能不受数据权限范围控制），其中：- 流程实例：是指用户在业务功能或者飞书人事的审批中心发起的具体流程，process_id 是其唯一标识。- 流程定义：是指管理员在设置侧配置的流程，类似流程模板，flow_definition_id 是其唯一标识。用户发起的流程是按照对应的流程定义的配置生成 |
| corehr.v2.processTransfer.update | [转交审批任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-transfer/update) | 对于单个审批任务进行转交操作。转交后审批流程流转给被转交人 |
| corehr.v2.reportDetailRow.batchDelete | [批量删除填报行](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/report_detail_row/batchDelete) | 批量删除填报行后，可在【设置-编制规划设置-编制规划XXX-集中填报-查看数据】进行查看 |
| corehr.v2.reportDetailRow.batchSave | [批量创建/更新填报行](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/report_detail_row/batchSave) | 批量创建/更新填报行后，可在【设置-编制规划设置-编制规划XXX-集中填报-查看数据】进行查看 |
| corehr.v2.workforcePlanDetailRow.batchDelete | [批量删除明细行](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail_row/batchDelete) | 批量删除明细行后，可在【设置-编制规划设置-编制规划XXX-编辑数据】进行查看明细行是否被删除 |
| corehr.v2.workforcePlanDetailRow.batchSave | [批量创建/更新明细行](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail_row/batchSave) | 批量创建/更新明细行后，可在【设置-编制规划设置-编制规划XXX-编辑数据】进行查看 |
| corehr.v2.workforcePlanDetail.batch | [查询编制规划明细信息（不支持自定义组织）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail/batch) | 查询编制规划明细，包括维度信息、编制数和预估在职人数 |
| corehr.v2.workforcePlanDetail.batchV2 | [查询编制规划明细信息（支持自定义组织）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail/batch_v2) | 查询编制规划明细，包括维度信息、编制数、预估在职人数、在职人数和预增/预减人数 |
| corehr.v2.workforcePlan.list | [查询编制规划方案](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan/list) | 根据传入的筛选项获取编制规划的方案列表 |

## 业务域: directoryV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| directory.v1.collaborationRule.create | [新增可搜可见规则](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/collaboration_rule/create) | 管理员视角新增可搜可见规则。用户需具备关联组织管理员权限 |
| directory.v1.collaborationRule.delete | [删除可搜可见规则](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/collaboration_rule/delete) | 管理员视角删除可搜可见规则。用户需具备关联组织管理员权限 |
| directory.v1.collaborationRule.list | [查询可搜可见规则](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/collaboration_rule/list) | 管理员视角查询可搜可见规则。用户需具备关联组织管理员权限 |
| directory.v1.collaborationRule.update | [更新可搜可见规则](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/collaboration_rule/update) | 管理员视角更新可搜可见规则。用户需具备关联组织管理员权限 |
| directory.v1.collaborationTenant.list | [管理员获取所有关联组织列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/collaboration_tenant/list) | 在创建规则时，需要知道对方组织的tenant key，可通过该接口获取有效的tenant key。只允许关联组织管理员权限调用 |
| directory.v1.collborationShareEntity.list | [获取关联组织双方共享成员范围](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/collboration_share_entity/list) | 在创建规则时，需要获取本组织以及对方组织人员、部门和用户组的ID，且这些实体都应该在关联组织的共享范围内。本接口可获取关联组织双方的共享范围下的人员、部门和用户组 |
| directory.v1.department.create | [创建部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/create) | 本接口用于用于在企业通讯录中创建新部门，支持设置部门名称、父部门、负责人等信息 |
| directory.v1.department.delete | [删除部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/delete) | 本接口用于删除部门 |
| directory.v1.department.filter | [获取部门列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/filter) | 本接口用于依据指定条件，批量获取符合条件的部门详情列表 |
| directory.v1.department.mget | [批量获取部门信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/mget) | 该接口支持传入多个部门ID，返回每个部门的详细信息（如名称、负责人、子部门等） |
| directory.v1.department.patch | [更新部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/patch) | 本接口用于更新部门信息。仅更新显式传参的部分 |
| directory.v1.department.search | [搜索部门](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/search) | 本接口用于搜索部门信息，通过部门名称等关键词搜索部门信息，返回符合条件的部门列表 |
| directory.v1.employee.create | [创建员工](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/create) | 本接口用于在企业下创建员工。支持传入姓名、手机号等信息，生成在职状态的员工对象。员工指飞书企业内身份为「Employee」的成员，等同于通讯录OpenAPI中的「User」 |
| directory.v1.employee.delete | [离职员工](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/delete) | 本接口用于离职员工 |
| directory.v1.employee.filter | [批量获取员工列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/filter) | 本接口用于依据指定条件，批量获取符合条件的员工详情列表。员工指飞书企业内身份为「Employee」的成员，等同于通讯录OpenAPI中的「User」 |
| directory.v1.employee.mget | [批量获取员工信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/mget) | 本接口用于批量根据员工的ID查询员工的详情，比如员工姓名，手机号，邮箱，部门等信息。员工指飞书企业内身份为「Employee」的成员，等同于通讯录OpenAPI中的「User」 |
| directory.v1.employee.patch | [更新员工信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/patch) | 本接口用于更新在职/离职员工的信息、冻结/恢复员工。未传递的参数不会进行更新。员工指飞书企业内身份为「Employee」的成员，等同于通讯录OpenAPI中的「User」 |
| directory.v1.employee.regular | [更新待离职成员为在职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/regular) | 本接口用于为待离职员工取消离职，将其更新为「在职」状态。取消离职时会清空离职信息。使用user_access_token时默认为管理员用户，仅可操作「人事管理模式」的管理员可操作 |
| directory.v1.employee.resurrect | [恢复离职员工](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/resurrect) | 该接口用于恢复已离职的成员，恢复已离职成员至在职状态 |
| directory.v1.employee.search | [搜索员工信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/search) | 本接口用于搜索员工信息，如通过关键词搜索员工的名称、手机号、邮箱等信息。员工指飞书企业内身份为「Employee」的成员，等同于通讯录OpenAPI中的「User」 |
| directory.v1.employee.toBeResigned | [更新在职员工为待离职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/to_be_resigned) | 本接口用于为在职员工办理离职，将其更新为「待离职」状态。「待离职」员工不会自动离职，需要使用「离职员工」API操作离职和资源转交。使用user_access_token时默认为管理员用户，仅「人事管理模式」的管理员可操作 |

## 业务域: docsV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| docs.v1.content.get | [获取云文档内容](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/docs-v1/content/get) | 可获取云文档内容，当前只支持获取新版文档 Markdown 格式的内容 |

## 业务域: docxV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| docx.v1.chatAnnouncementBlock.batchUpdate | [批量更新群公告块的内容](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block/batch_update) | 群组-新版群公告-块-批量更新群公告块的内容 |
| docx.v1.chatAnnouncementBlockChildren.batchDelete | [删除群公告中的块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block-children/batch_delete) | 指定需要操作的块，删除其指定范围的子块。如果操作成功，接口将返回应用删除操作后的群公告版本号 |
| docx.v1.chatAnnouncementBlockChildren.create | [在群公告中创建块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block-children/create) | 群组-新版群公告-块-在群公告中创建块 |
| docx.v1.chatAnnouncementBlockChildren.get | [获取所有子块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block-children/get) | 群组-新版群公告-块-获取所有子块 |
| docx.v1.chatAnnouncementBlock.get | [获取群公告块的内容](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block/get) | 群组-新版群公告-块-获取群公告块的内容 |
| docx.v1.chatAnnouncementBlock.list | [获取群公告所有块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block/list) | 群组-新版群公告-群公告-获取群公告所有块 |
| docx.v1.chatAnnouncement.get | [获取群公告基本信息](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement/get) | 获取指定群组中的群公告基本信息 |
| docx.v1.documentBlock.batchUpdate | [批量更新块的内容](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/batch_update) | 批量更新块的富文本内容 |
| docx.v1.documentBlockChildren.batchDelete | [删除块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/batch_delete) | 指定需要操作的块，删除其指定范围的子块。如果操作成功，接口将返回应用删除操作后的文档版本号 |
| docx.v1.documentBlockChildren.create | [创建块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/create) | 指定需要操作的块，为其创建一批子块，并插入到指定位置。如果操作成功，接口将返回新创建子块的富文本内容 |
| docx.v1.documentBlockChildren.get | [获取所有子块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/get) | 给定一个指定版本的文档，并指定需要操作的块，分页遍历其所有子块富文本内容 。如果不指定版本，则会默认查询最新版本 |
| docx.v1.documentBlockDescendant.create | [创建嵌套块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-descendant/create) | 云文档-文档-块-创建嵌套块 |
| docx.v1.documentBlock.get | [获取块的内容](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/get) | 获取指定块的富文本内容 |
| docx.v1.documentBlock.list | [获取文档所有块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/list) | 获取文档所有块的富文本内容并分页返回 |
| docx.v1.documentBlock.patch | [更新块的内容](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/patch) | 更新指定的块 |
| docx.v1.document.convert | [Markdown/HTML 内容转换为文档块](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/convert) | 将 HTML/Markdown 格式的内容转换为文档块 |
| docx.v1.document.create | [创建文档](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/create) | 创建文档类型为 docx 的文档。你可选择传入文档标题和文件夹 |
| docx.v1.document.get | [获取文档基本信息](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/get) | 获取文档标题和最新版本 ID |
| docx.v1.document.rawContent | [获取文档纯文本内容](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/raw_content) | 获取文档的纯文本内容 |

## 业务域: driveV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| drive.v1.exportTask.create | [创建导出任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/create) | 该接口用于创建导出文件的任务，并返回导出任务 ID。导出文件指将飞书文档、电子表格、多维表格导出为本地文件，包括 Word、Excel、PDF、CSV 格式。该接口为异步接口，需要继续调用[查询导出任务结果]接口获取导出结果。了解完整的导出步骤，参考[导出云文档概述] |
| drive.v1.exportTask.get | [查询导出任务结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get) | 根据[创建导出任务]返回的导出任务 ID（ticket）轮询导出任务结果，并返回导出文件的 token。你可使用该 token 继续调用[下载导出文件]接口将导出的产物下载到本地。了解完整的导出文件步骤，参考[导出飞书云文档概述] |
| drive.v1.fileComment.batchQuery | [批量获取评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/batch_query) | 该接口用于根据评论 ID 列表批量获取云文档评论信息，包括评论和回复 ID、回复的内容、评论人和回复人的用户 ID 等。支持返回全局评论以及局部评论（可通过 is_whole 字段区分） |
| drive.v1.fileComment.create | [添加全文评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/create) | 在文档中添加一条全局评论，不支持局部评论 |
| drive.v1.fileComment.get | [获取全文评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/get) | 获取云文档中的某条全文评论，不支持局部评论 |
| drive.v1.fileComment.list | [获取云文档所有评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/list) | 该接口用于根据云文档 Token 分页获取文档所有评论信息，包括评论和回复 ID、回复的内容、评论人和回复人的用户 ID 等。该接口支持返回全局评论以及局部评论（可通过 is_whole 字段区分）。默认每页返回 50 个评论 |
| drive.v1.fileComment.patch | [解决/恢复评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/patch) | 解决或恢复云文档中的评论 |
| drive.v1.fileCommentReply.delete | [删除回复](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/delete) | 删除云文档中的某条回复 |
| drive.v1.fileCommentReply.list | [获取回复信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/list) | 该接口用于根据评论 ID，获取该条评论对应的回复信息，包括回复 ID、回复内容、回复人的用户 ID 等 |
| drive.v1.fileCommentReply.update | [更新回复的内容](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/update) | 更新云文档中的某条回复的内容 |
| drive.v1.file.copy | [复制文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/copy) | 将用户云空间中的文件复制至其它文件夹下。该接口为异步接口 |
| drive.v1.file.createFolder | [新建文件夹](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/create_folder) | 该接口用于在用户云空间指定文件夹中创建一个空文件夹 |
| drive.v1.file.createShortcut | [创建文件快捷方式](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/create_shortcut) | 创建指定文件的快捷方式到云空间的其它文件夹中 |
| drive.v1.file.delete | [删除文件或文件夹](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete) | 删除用户在云空间内的文件或者文件夹。文件或文件夹被删除后，会进入回收站中 |
| drive.v1.file.deleteSubscribe | [取消云文档事件订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete_subscribe) | 该接口用于取消订阅云文档的通知事件。了解事件订阅的配置流程和使用场景，参考[事件概述]。了解云文档支持的事件类型，参考[事件列表] |
| drive.v1.file.getSubscribe | [查询云文档事件订阅状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/get_subscribe) | 该接口用于查询云文档事件的订阅状态。了解事件订阅的配置流程和使用场景，参考[事件概述]。了解云文档支持的事件类型，参考[事件列表] |
| drive.v1.file.list | [获取文件夹中的文件清单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/list) | 该接口用于获取用户云空间指定文件夹中文件信息清单。文件的信息包括名称、类型、token、创建时间、所有者 ID 等 |
| drive.v1.file.move | [移动文件或文件夹](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/move) | 将文件或者文件夹移动到用户云空间的其他位置 |
| drive.v1.fileStatistics.get | [获取文件统计信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-statistics/get) | 此接口用于获取各类文件的流量统计信息和互动信息，包括阅读人数、阅读次数和点赞数 |
| drive.v1.file.subscribe | [订阅云文档事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/subscribe) | 订阅云文档的各类通知事件。调用该接口并在开发者后台添加事件后，当云文档发生指定事件时，系统会向配置的地址发送事件 |
| drive.v1.fileSubscription.create | [创建订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/create) | 订阅文档中的变更事件，当前支持文档评论订阅，订阅后文档评论更新会有“云文档助手”推送给订阅的用户 |
| drive.v1.fileSubscription.get | [获取订阅状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/get) | 根据订阅ID获取该订阅的状态 |
| drive.v1.fileSubscription.patch | [更新订阅状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/patch) | 根据订阅ID更新订阅状态 |
| drive.v1.file.taskCheck | [查询异步任务状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/task_check) | 查询异步任务的状态信息。目前支持查询删除文件夹和移动文件夹的异步任务 |
| drive.v1.file.uploadFinish | [分片上传文件-完成上传](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_finish) | 调用[上传分片]接口将分片全部上传完毕后，你需调用本接口触发完成上传。否则将上传失败。了解完整的上传文件流程，参考[上传文件概述] |
| drive.v1.file.uploadPrepare | [分片上传文件-预上传](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_prepare) | 发送初始化请求，以获取上传事务 ID 和分片策略，为[上传分片]做准备。平台固定以 4MB 的大小对文件进行分片。了解完整的上传文件流程，参考[上传文件概述] |
| drive.v1.fileVersion.create | [创建文档版本](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/create) | 创建文档版本。文档支持在线文档或电子表格。该接口为异步接口 |
| drive.v1.fileVersion.delete | [删除文档版本](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/delete) | 删除基于在线文档或电子表格创建的版本 |
| drive.v1.fileVersion.get | [获取文档版本信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/get) | 该接口用于获取文档或电子表格指定版本的信息，包括标题、标识、创建者、创建时间等 |
| drive.v1.fileVersion.list | [获取文档版本列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/list) | 获取文档或电子表格的版本列表 |
| drive.v1.fileViewRecord.list | [获取文件访问记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-view_record/list) | 获取文档、电子表格、多维表格等文件的历史访问记录，包括访问者的 ID、姓名、头像和最近访问时间 |
| drive.v1.importTask.create | [创建导入任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/create) | 该接口用于创建导入文件的任务，并返回导入任务 ID。导入文件指将本地文件如 Word、TXT、Markdown、Excel 等格式的文件导入为某种格式的飞书在线云文档。该接口为异步接口，需要继续调用[查询导入任务结果]接口获取导入结果。了解完整的导入文件步骤，参考[导入文件概述] |
| drive.v1.importTask.get | [查询导入任务结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/get) | 根据[创建导入任务]返回的导入任务 ID（ticket）轮询导入结果。了解完整的导入文件步骤，参考[导入文件概述] |
| drive.v1.media.batchGetTmpDownloadUrl | [获取素材临时下载链接](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/batch_get_tmp_download_url) | 该接口用于获取云文档中素材的临时下载链接。链接的有效期为 24 小时，过期失效 |
| drive.v1.media.uploadFinish | [分片上传素材-完成上传](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_finish) | 调用[上传分片]接口将分片全部上传完毕后，你需调用本接口触发完成上传。了解完整的分片上传素材流程，参考[素材概述] |
| drive.v1.media.uploadPrepare | [分片上传素材-预上传](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_prepare) | 发送初始化请求，以获取上传事务 ID 和分片策略，为[上传素材分片]做准备。平台固定以 4MB 的大小对素材进行分片。了解完整的分片上传素材流程，参考[素材概述] |
| drive.v1.meta.batchQuery | [获取文件元数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/meta/batch_query) | 该接口用于根据文件 token 获取其元数据，包括标题、所有者、创建时间、密级、访问链接等数据 |
| drive.v1.permissionMember.auth | [判断用户云文档权限](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/auth) | 判断当前请求的应用或用户是否具有指定云文档的指定权限，权限包括阅读、编辑、分享、评论、导出等权限 |
| drive.v1.permissionMember.batchCreate | [批量增加协作者权限](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/batch_create) | 为指定云文档批量添加多个协作者，协作者可以是用户、群组、部门、用户组等 |
| drive.v1.permissionMember.create | [增加协作者权限](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/create) | 为指定云文档添加协作者，协作者可以是用户、群组、部门、用户组等 |
| drive.v1.permissionMember.delete | [移除云文档协作者权限](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/delete) | 通过云文档 token 和协作者 ID 移除指定云文档协作者的权限 |
| drive.v1.permissionMember.list | [获取云文档协作者](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/list) | 获取指定云文档的协作者，支持查询人、群、组织架构、用户组、知识库成员五种类型的协作者 |
| drive.v1.permissionMember.transferOwner | [转移云文档所有者](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/transfer_owner) | 转移指定云文档的所有者 |
| drive.v1.permissionMember.update | [更新协作者权限](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/update) | 更新指定云文档中指定协作者的权限，包括可阅读、可编辑、可管理权限 |
| drive.v1.permissionPublic.get | [获取云文档权限设置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public/get) | 获取指定云文档的权限设置，包括是否允许内容被分享到组织外、谁可以查看、添加、移除协作者等设置 |
| drive.v1.permissionPublicPassword.create | [启用云文档密码](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/create) | 启用指定云文档的密码。密码启用后，组织外用户需要密码访问，组织内用户无需密码可直接访问 |
| drive.v1.permissionPublicPassword.delete | [停用云文档密码](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/delete) | 停用指定云文档的密码。密码停用后，组织外用户访问文档将无需输入密码 |
| drive.v1.permissionPublicPassword.update | [刷新云文档密码](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/update) | 刷新指定云文档的密码。密码刷新后，旧密码将失效，并生成新密码 |
| drive.v1.permissionPublic.patch | [更新云文档权限设置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public/patch) | 更新指定云文档的权限设置，包括是否允许内容被分享到组织外、谁可以查看、添加、移除协作者、谁可以复制内容等设置 |

## 业务域: driveV2
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| drive.v2.fileLike.list | [获取云文档的点赞者列表](https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/file-like/list) | 获取指定云文档的点赞者列表并按点赞时间由近到远分页返回 |
| drive.v2.permissionPublic.get | [获取云文档权限设置](https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/permission-public/get) | 获取指定云文档的权限设置，包括是否允许内容被分享到组织外、谁可以查看、添加、移除协作者、谁可以复制内容等设置 |
| drive.v2.permissionPublic.patch | [更新云文档权限设置](https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/permission-public/patch) | 更新指定云文档的权限设置，包括是否允许内容被分享到组织外、谁可以查看、添加、移除协作者、谁可以复制内容等设置 |

## 业务域: ehrV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| ehr.v1.employee.list | [批量获取员工花名册信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/employee/list) | 根据员工飞书用户 ID / 员工状态 / 雇员类型等搜索条件 ，批量获取员工花名册字段信息。字段包括「系统标准字段 / system_fields」和「自定义字段 / custom_fields」 |

## 业务域: eventV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| event.v1.outboundIp.list | [获取事件出口 IP](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-v1/outbound_ip/list) | 飞书开放平台向应用配置的回调地址推送事件时，是通过特定的 IP 发送出去的，应用可以通过本接口获取所有相关的 IP 地址 |

## 业务域: helpdeskV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| helpdesk.v1.notification.cancelApprove | [取消审核](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/cancel_approve) | 提交审核后，如果需要取消审核，则调用此接口 |
| helpdesk.v1.notification.cancelSend | [取消推送](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/cancel_send) | 取消推送接口，审核通过后待调度可以调用，发送过程中可以调用（会撤回已发送的消息），发送完成后可以需要推送（会撤回所有已发送的消息） |
| helpdesk.v1.notification.create | [创建推送](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/create) | 调用接口创建推送，创建成功后为草稿状态 |
| helpdesk.v1.notification.executeSend | [执行推送](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/execute_send) | 审核通过后调用此接口设置推送时间，等待调度系统调度，发送消息 |
| helpdesk.v1.notification.get | [查询推送](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/get) | 查询推送详情 |
| helpdesk.v1.notification.patch | [更新推送](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/patch) | 更新推送信息，只有在草稿状态下才可以调用此接口进行更新 |
| helpdesk.v1.notification.preview | [预览推送](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/preview) | 在正式执行推送之前是可以调用此接口预览设置的推送内容 |
| helpdesk.v1.notification.submitApprove | [提交审核](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/submit_approve) | 正常情况下调用创建推送接口后，就可以调用提交审核接口，如果创建人是服务台owner则会自动审核通过，否则会通知服务台owner审核此推送信息 |

## 业务域: hireV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| hire.v1.advertisement.publish | [发布职位广告](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/advertisement/publish) | 支持把职位广告发布上线至招聘官网、内推平台 |
| hire.v1.agency.batchQuery | [搜索猎头供应商列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/batch_query) | 可根据猎头供应商 ID 列表或关键字、筛选项查询供应商信息 |
| hire.v1.agency.get | [获取猎头供应商信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/get) | 根据猎头供应商 ID 获取有合作关系的猎头供应商信息，包含猎头供应商ID、名称、联系人等 |
| hire.v1.agency.getAgencyAccount | [查询猎头供应商下猎头列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/get_agency_account) | 根据猎头供应商 ID 查询该猎头供应商下的猎头列表 |
| hire.v1.agency.operateAgencyAccount | [禁用/取消禁用猎头](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/operate_agency_account) | 可根据猎头 ID 对猎头执行禁用/取消禁用操作。被禁用的猎头，不能推荐候选人与被分配职位 |
| hire.v1.agency.protect | [设置猎头保护期](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/protect) | 设置指定人才的猎头保护期，当「飞书招聘」内置的保护期功能不满足需求时，客户可通过此接口自定义人才的保护期 |
| hire.v1.agency.protectSearch | [查询猎头保护期信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/protect_search) | 查询指定人才的猎头保护期信息列表，包含保护期起止时间、猎头供应商、猎头顾问信息等。若人才已经入职，还会返回入职时所在的保护期信息 |
| hire.v1.agency.query | [查询猎头供应商信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/query) | 根据猎头供应商名称查询有合作关系的猎头供应商信息，包含猎头供应商ID、名称、联系人等 |
| hire.v1.application.cancelOnboard | [取消候选人入职](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/cancel_onboard) | 取消待入职状态的候选人入职 |
| hire.v1.application.create | [创建投递](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/create) | 为人才在特定职位上创建投递 |
| hire.v1.application.get | [获取投递信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/get) | 根据投递 ID 获取单个投递信息 |
| hire.v1.application.getDetail | [获取投递详情](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/get_detail) | 根据投递 ID 获取投递信息并通过参数按需获取该投递相关的实体信息，如「职位」、「人才」、「评估」、「面试」、「Offer」、「猎头」、「内推」、「官网」等实体的信息 |
| hire.v1.applicationInterview.list | [获取面试记录列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application-interview/list) | 历史版本（不推荐）-招聘-面试-获取面试记录列表 |
| hire.v1.application.list | [获取投递列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/list) | 获取投递列表信息。可根据「招聘流程 ID」、「招聘阶段 ID」、「人才 ID」、「职位 ID」、「投递活跃状态」以及「投递更新时间」进行条件筛选 |
| hire.v1.application.offer | [获取 Offer 信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/offer) | 根据投递 ID 获取 Offer 信息 |
| hire.v1.application.recover | [恢复投递](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/recover) | 根据投递 ID 将「已终止」投递进行恢复 |
| hire.v1.application.terminate | [终止投递](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/terminate) | 根据投递 ID 修改投递状态为「已终止」 |
| hire.v1.application.transferOnboard | [操作候选人入职](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/transfer_onboard) | 根据投递 ID 操作候选人入职并创建员工，后续可通过 [通过员工 ID 获取入职信息] 接口获取入职信息 |
| hire.v1.application.transferStage | [转移投递阶段](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/transfer_stage) | 根据投递 ID 和投递阶段 ID 转移投递阶段 |
| hire.v1.attachment.get | [获取附件信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/get) | 根据附件 ID 和附件类型获取招聘系统中附件的信息，比如附件名称、附件创建时间、附件下载地址等 |
| hire.v1.attachment.preview | [获取附件 PDF 格式下载链接](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/preview) | 根据人才简历附件 ID 获取该简历附件对应的 PDF 文件的下载地址 |
| hire.v1.backgroundCheckOrder.list | [获取背调信息列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/background_check_order/list) | 根据投递 ID 或背调更新时间批量获取背调订单信息 |
| hire.v1.diversityInclusion.search | [获取申请表附加信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/diversity_inclusion/search) | 获取候选人的申请表附加信息。支持通过投递 ID 或者人才 ID 进行查询 |
| hire.v1.ecoAccountCustomField.batchDelete | [删除账号自定义字段](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/batch_delete) | 飞书招聘的背调或笔试服务商，可通过此接口删除账号自定义字段（如客户在服务商处的租户 ID、账号 ID等） |
| hire.v1.ecoAccountCustomField.batchUpdate | [更新账号自定义字段](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/batch_update) | 飞书招聘的背调或笔试服务商，可通过此接口更新账号自定义字段（比如客户在服务商处的租户 ID、账号 ID等）的名称和描述 |
| hire.v1.ecoAccountCustomField.create | [创建账号自定义字段](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/create) | 飞书招聘的背调或笔试服务商，可通过此接口创建账号自定义字段，用来标识飞书招聘客户在服务商处的身份（比如客户在服务商处的租户 ID、账号 ID等字段） |
| hire.v1.ecoBackgroundCheckCustomField.batchDelete | [删除背调自定义字段](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/batch_delete) | 删除用户在发起背调时展示的表单自定义字段 |
| hire.v1.ecoBackgroundCheckCustomField.batchUpdate | [更新背调自定义字段](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/batch_update) | 更新用户在发起背调时展示的表单自定义字段名称和描述 |
| hire.v1.ecoBackgroundCheckCustomField.create | [创建背调自定义字段](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/create) | 创建用户在发起背调时展示的表单自定义字段。自定义字段支持多种类型如单行文本、单选等，可以设置为必填或非必填 |
| hire.v1.ecoBackgroundCheckPackage.batchDelete | [删除背调套餐和附加调查项](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/batch_delete) | 删除背调帐号下的背调套餐和附加调查项信息。删除操作不会影响已创建的背调 |
| hire.v1.ecoBackgroundCheckPackage.batchUpdate | [更新背调套餐和附加调查项](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/batch_update) | 更新指定背调帐号下的背调套餐和附加调查项信息。如需新增背调套餐、附加调查项请使用[创建背调套餐和附加调查项]进行添加 |
| hire.v1.ecoBackgroundCheckPackage.create | [创建背调套餐和附加调查项](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/create) | 在指定背调帐号下创建可用的背调套餐列表和附加调查项信息列表。该接口为增量创建，每次调用会在原有的套餐列表和附加调查项列表基础上新增 |
| hire.v1.ecoBackgroundCheck.cancel | [终止背调订单](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/cancel) | 调用此接口将会将背调订单状态变成已终止，已终止订单将将无法通过[更新背调订单进度]和[回传背调订单的最终结果]修改订单进度和最终结果。 调用此接口前，建议先调用[更新背调订单进度]接口将订单进度更新为「已终止」 |
| hire.v1.ecoBackgroundCheck.updateProgress | [更新背调订单进度](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_progress) | 更新指定背调订单的进度信息和阶段性报告，进度信息将会被展示在「飞书招聘」-「投递详情页」-「背调卡片」上，告知用户目前背调订单的流转状态 |
| hire.v1.ecoBackgroundCheck.updateResult | [回传背调订单的最终结果](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_result) | 回传背调的最终结果和终版报告。回传后，若租户未启用背调报告审批功能，则背调订单状态将会直接变成「已完成」。若启用背调报告审批功能，则在管理员审批通过后，订单状态流转为「已完成」 |
| hire.v1.ecoExamPaper.batchDelete | [删除试卷列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam_paper/batch_delete) | 飞书招聘的笔试服务商，可通过该接口删除客户笔试帐号下的试卷列表。删除操作不影响已安排的笔试，删除不存在的试卷时不会报错 |
| hire.v1.ecoExamPaper.batchUpdate | [更新试卷列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam_paper/batch_update) | 飞书招聘的笔试服务商，可通过该接口更新客户笔试账号下的试卷列表 |
| hire.v1.ecoExamPaper.create | [创建试卷列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam_paper/create) | 飞书招聘的笔试服务商，在完成[账号绑定]后，可通过本接口在客户的笔试帐号下创建试卷列表。若客户的笔试账号为「未激活」、「停用」状态，则试卷创建成功后，客户的账号将变为「正常」状态，可正常安排笔试 |
| hire.v1.ecoExam.loginInfo | [回传笔试安排结果](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam/login_info) | 飞书招聘的笔试服务商，在收到[创建笔试]事件并安排笔试后，应通过本接口回传笔试安排结果。若安排成功，须返回笔试链接；若笔试链接需要登录鉴权，则须返回登录凭证（`username`，`password`) |
| hire.v1.ecoExam.updateResult | [回传笔试结果](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam/update_result) | 飞书招聘的笔试服务商，可通过该接口回传候选人的笔试结果。回传笔试结果后，候选人在飞书招聘内的笔试状态将变为「已作答」 |
| hire.v1.ehrImportTask.patch | [更新 e-HR 导入任务结果](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/ehr_import_task/patch) | 在处理完[导入 e-HR]事件后，可调用该接口，更新 e-HR 导入任务结果 |
| hire.v1.employee.get | [通过员工 ID 获取入职信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get) | 通过员工 ID 获取入职信息 |
| hire.v1.employee.getByApplication | [通过投递 ID 获取入职信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get_by_application) | 通过投递 ID 获取员工入职信息 |
| hire.v1.employee.patch | [更新员工状态](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/patch) | 根据员工 ID 更新员工招聘系统内的转正、离职状态 |
| hire.v1.evaluationTask.list | [获取简历评估任务列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/evaluation_task/list) | 根据评估人ID查询评估任务列表，可以查询到的信息包括：评估ID、投递ID、任务状态等 |
| hire.v1.evaluation.list | [获取简历评估信息列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/evaluation/list) | 批量获取简历评估信息，包含评估人、评估结论、评估详情等信息。支持按照投递 ID、更新时间来进行筛选 |
| hire.v1.examMarkingTask.list | [获取笔试阅卷任务列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/exam_marking_task/list) | 根据阅卷人ID查询员工笔试阅卷任务列表，能查询到的信息包括：笔试阅卷任务ID、投递ID、任务状态等 |
| hire.v1.exam.create | [添加笔试结果](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/exam/create) | 根据投递 ID 添加该投递下的笔试结果 |
| hire.v1.externalApplication.create | [创建外部投递](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/create) | 创建外部投递，可用于导入来自其他系统的投递信息 |
| hire.v1.externalApplication.delete | [删除外部投递](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/delete) | 根据外部投递 ID 删除外部投递 |
| hire.v1.externalApplication.list | [查询外部投递列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/list) | 可根据人才 ID 获取人才外部投递列表 |
| hire.v1.externalApplication.update | [更新外部投递](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/update) | 更新外部投递信息 |
| hire.v1.externalBackgroundCheck.batchQuery | [查询外部背调列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/batch_query) | 可根据外部投递 ID 或外部背调 ID 列表查询外部背调信息 |
| hire.v1.externalBackgroundCheck.create | [创建外部背调](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/create) | 创建外部背调，可用于导入来自其他系统的背调信息 |
| hire.v1.externalBackgroundCheck.delete | [删除外部背调](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/delete) | 根据外部背调 ID 删除外部背调 |
| hire.v1.externalBackgroundCheck.update | [更新外部背调](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/update) | 更新外部背调信息 |
| hire.v1.externalInterviewAssessment.create | [创建外部面评](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview_assessment/create) | 导入来自其他系统的面评信息，创建为外部面评 |
| hire.v1.externalInterviewAssessment.patch | [更新外部面评](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview_assessment/patch) | 更新外部面评部分字段，没有填写的字段不会被更新 |
| hire.v1.externalInterview.batchQuery | [查询外部面试列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/batch_query) | 可根据外部投递 ID 或外部面试 ID 列表查询外部面试信息 |
| hire.v1.externalInterview.create | [创建外部面试](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/create) | 创建外部面试，可用于导入来自其他系统的面试信息 |
| hire.v1.externalInterview.delete | [删除外部面试](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/delete) | 根据外部面试 ID 删除外部面试 |
| hire.v1.externalInterview.update | [更新外部面试](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/update) | 更新外部面试信息 |
| hire.v1.externalOffer.batchQuery | [查询外部 Offer 列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_offer/batch_query) | 可根据外部投递 ID 或外部 Offer ID 列表查询外部 Offer 信息 |
| hire.v1.externalOffer.create | [创建外部 Offer](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_offer/create) | 创建外部 Offer，可用于导入来自其他系统的 Offer 信息 |
| hire.v1.externalOffer.delete | [删除外部 Offer](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_offer/delete) | 根据外部 Offer ID 删除外部 Offer |
| hire.v1.externalOffer.update | [更新外部 Offer](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_offer/update) | 更新外部 Offer 信息 |
| hire.v1.externalReferralReward.create | [导入外部内推奖励](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_referral_reward/create) | 支持将外部的内推奖励（积分/现金）导入到招聘的「内推账号」中 |
| hire.v1.externalReferralReward.delete | [删除外部内推奖励](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_referral_reward/delete) | 根据外部内推奖励ID删除外部内推奖励 |
| hire.v1.interviewFeedbackForm.list | [获取面试评价表列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_feedback_form/list) | 获取面试评价表信息列表，评价表信息包括题目描述、题目选项等。可用于面试评价表展示等场景 |
| hire.v1.interviewRecordAttachment.get | [获取面试记录附件](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_record-attachment/get) | 获取面试记录 PDF 附件，包含相关投递基本信息、面试评价信息 |
| hire.v1.interviewRecord.get | [获取面试评价详细信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_record/get) | 获取面试评价详细信息，如面试结论、面试得分和面试官等信息 |
| hire.v1.interviewRecord.list | [批量获取面试评价详细信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_record/list) | 批量获取面试评价详细信息，如面试结论、面试得分和面试官等信息 |
| hire.v1.interviewRegistrationSchema.list | [获取面试登记表列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_registration_schema/list) | 获取面试登记表列表，可获取到的信息包括登记表名称、登记表模块、登记表字段 |
| hire.v1.interviewRoundType.list | [获取面试轮次类型列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_round_type/list) | 根据职位流程查询面试轮次类型列表，可以查询到的信息包括：面试轮次类型名称、启用状态、关联的面试评价表信息。可应用于更新职位设置场景：[更新职位设置] |
| hire.v1.interviewTask.list | [获取面试任务列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_task/list) | 根据面试官ID查询面试任务列表，可以查询到的信息包括：面试ID、投递ID、任务状态等 |
| hire.v1.interview.getByTalent | [获取人才面试信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview/get_by_talent) | 获取人才下所有面试信息 |
| hire.v1.interview.list | [获取面试信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview/list) | 获取面试信息。可通过「投递 ID」、「面试 ID」以及「面试开始时间」进行条件筛选，筛选条件不能同时为空 |
| hire.v1.interviewer.list | [查询面试官信息列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interviewer/list) | 分页查询面试官列表，接口只会返回执行过「更新面试官信息」用户的数据，通过接口查询不到的数据则默认为「未认证」面试官。接口默认按更新时间、user_id顺序进行顺序拉取 |
| hire.v1.interviewer.patch | [更新面试官信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interviewer/patch) | 用于更新面试官认证信息 |
| hire.v1.jobFunction.list | [获取职能分类列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_function/list) | 根据page_token与page_size对职能分类进行游标分页查询，可查询到的信息包括：职能分类ID、职能分类中英文名、启用状态，可应用于职位基础信息绑定等场景 |
| hire.v1.jobProcess.list | [获取招聘流程信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_process/list) | 获取全部招聘流程信息。如「流程名称」、「流程类型」及流程下的「阶段名称」、「阶段类型」等信息 |
| hire.v1.jobPublishRecord.search | [获取职位广告发布记录](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_publish_record/search) | 根据招聘渠道 ID 获取当前渠道下曾发布过的职位广告信息 |
| hire.v1.jobRequirementSchema.list | [获取招聘需求模板列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement_schema/list) | 获取招聘需求模板列表，包含需求模板ID，以及模板里的字段定义等。招聘需求模板可参考「飞书招聘」-「设置」-「招聘需求字段管理」 |
| hire.v1.jobRequirement.create | [创建招聘需求](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/create) | 创建招聘需求，可指定招聘需求部门、招聘人数、需求描述等，具体可参考「飞书招聘」-「设置」-「招聘需求字段管理」，或者参考[获取招聘需求模板] |
| hire.v1.jobRequirement.delete | [删除招聘需求](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/delete) | 删除指定的招聘需求，请注意：若该招聘需求已经关联到职位上，则需先接触关联后，才能删除招聘需求 |
| hire.v1.jobRequirement.list | [获取招聘需求列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/list) | 获取招聘需求列表 |
| hire.v1.jobRequirement.listById | [获取招聘需求信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/list_by_id) | 根据「招聘需求ID」获取招聘需求信息，支持批量查询 |
| hire.v1.jobRequirement.update | [更新招聘需求](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/update) | 更新指定招聘需求的信息，包含招聘需求的名称、状态、需求人数等。（审批中的招聘需求无法更新） |
| hire.v1.jobSchema.list | [获取职位模板](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_schema/list) | 获取社招、校招职位模板中的职位字段，返回结果包括系统默认字段和自定义字段。招聘管理员可在「飞书招聘」-「设置」-「职位管理」-「职位字段管理」中修改职位模板 |
| hire.v1.jobType.list | [获取职位类别列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_type/list) | 获取招聘系统预置的职位类别列表，可用于操作职位（如[新建职位]），操作招聘需求（如[创建招聘需求]）时回填职位类别字段。返回列表默认按创建时间升序排序，且包含节点的层级关系（节点的父节点 ID），可在获取全量数据后自行构建职位类别树 |
| hire.v1.job.close | [关闭职位](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/close) | 关闭职位后，职位所有的职位广告将同步从官网、内推、猎头渠道下线 |
| hire.v1.job.combinedCreate | [新建职位](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/combined_create) | 创建一个新的职位 |
| hire.v1.job.combinedUpdate | [更新职位](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/combined_update) | 更新职位信息 |
| hire.v1.job.config | [获取职位设置](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/config) | 获取职位设置，包含 Offer 申请表、Offer 审批流程、建议评估人列表、面试评价表、建议面试官列表、招聘需求、面试登记表、入职登记表、面试轮次类型列表、关联职位列表等设置 |
| hire.v1.job.get | [获取职位信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/get) | 根据职位 ID 获取职位信息 |
| hire.v1.job.getDetail | [获取职位详情](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/get_detail) | 根据职位 ID 获取职位详情，包含职位基本信息、职位负责人、协助人、用人经理、职位地址列表、职位设置、关联招需、门店列表及标签列表等信息 |
| hire.v1.job.list | [获取职位列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/list) | 获取职位列表，仅支持获取默认字段信息，获取详细信息可调用[获取职位信息]接口 |
| hire.v1.jobManager.batchUpdate | [更新职位相关人员](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job-manager/batch_update) | 更新职位相关人员，包含招聘负责人、招聘协助人、用人经理 |
| hire.v1.jobManager.get | [获取职位上的招聘人员信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job-manager/get) | 根据职位 ID 获取职位上的招聘人员信息，如招聘负责人、用人经理 |
| hire.v1.job.open | [重启职位](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/open) | 对于已关闭的职位，可通过本接口重启职位 |
| hire.v1.job.recruiter | [获取职位上的招聘人员信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/recruiter) | 根据职位 ID 获取职位上的招聘人员信息，如招聘负责人、用人经理等 |
| hire.v1.job.updateConfig | [更新职位设置](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/update_config) | 更新职位设置，包括面试评价表、Offer 申请表等 |
| hire.v1.location.list | [获取地址列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/location/list) | 获取地址列表，可查询到的信息包括地址与地点信息，可应用在职位地点、面试地点、人才意向工作城市等场景 |
| hire.v1.location.query | [查询地点列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/location/query) | 根据地点类型和地点码查询地点列表，获取地点名称信息 |
| hire.v1.minutes.get | [获取面试速记明细](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/minutes/get) | 获取指定面试的面试速记明细记录 |
| hire.v1.note.create | [创建备注](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/create) | 为人才创建备注信息，支持在备注中@其他用户 |
| hire.v1.note.delete | [删除备注](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/delete) | 根据备注 ID 删除备注 |
| hire.v1.note.get | [获取备注](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/get) | 根据备注 ID 查询人才备注信息，包括备注内容、人才 ID、投递 ID 等。可用于人才备注信息展示等场景 |
| hire.v1.note.list | [获取备注列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/list) | 根据人才ID获取备注列表 |
| hire.v1.note.patch | [更新备注](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/patch) | 根据备注 ID 更新备注信息 |
| hire.v1.offerApplicationForm.get | [获取 Offer 申请表信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_application_form/get) | 根据 Offer 申请表 ID 获取 Offer 申请表信息，可获取到的信息包括申请表名称、申请表模块、申请表字段等 |
| hire.v1.offerApplicationForm.list | [获取 Offer 申请表列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_application_form/list) | 获取 Offer 申请表列表，可获取的信息包括申请表名称、创建时间等 |
| hire.v1.offerCustomField.update | [更新 Offer 申请表自定义字段](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_custom_field/update) | 本接口支持修改 Offer 申请表的自定义字段，Offer 申请表的定义可参考「飞书招聘」-「设置」-「Offer 设置」-「Offer 申请表设置」中的内容 |
| hire.v1.offerSchema.get | [获取 Offer 申请表详细信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_schema/get) | 历史版本（不推荐）-招聘-offer-获取 Offer 申请表详细信息 |
| hire.v1.offer.create | [创建 Offer](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/create) | 传入 Offer 基本信息，创建 Offer |
| hire.v1.offer.get | [获取 Offer 详情](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/get) | 根据 Offer ID 获取 Offer 详细信息 |
| hire.v1.offer.internOfferStatus | [更新实习 Offer 入/离职状态](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/intern_offer_status) | 对「实习待入职」状态的实习 Offer 确认入职、放弃入职，或对「实习已入职」状态的实习 Offer 操作离职 |
| hire.v1.offer.list | [获取 Offer 列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/list) | 根据人才 ID 获取 Offer 列表 |
| hire.v1.offer.offerStatus | [更新 Offer 状态](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/offer_status) | 通过 Offer ID 更新候选人 Offer 的「Offer 审批状态」或 「Offer 发送和接受状态」 |
| hire.v1.offer.update | [更新 Offer 信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/update) | 更新 Offer 信息，包含基本信息、薪资信息、自定义信息 |
| hire.v1.questionnaire.list | [获取面试满意度问卷列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/questionnaire/list) | 批量获取面试满意度问卷信息，包含问卷完成情况、问卷题目及问卷题目作答内容等信息 |
| hire.v1.referralAccount.create | [注册内推账户](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/create) | 通过内推人的手机号或邮箱注册「内推奖励账户」。注册后，可通过[查询内推账户]接口获取内推账户 ID、积分余额、现金余额等，可通过[「全额提取内推账号余额」]接口提取账户余额，可通过[启动内推账户]、[「停用内推账户」]接口启/停用账户 |
| hire.v1.referralAccount.deactivate | [停用内推账户](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/deactivate) | 停用内推账户，停用后，将不再发送[「内推账户余额变更事件」]，也无法通过[「提取内推账号余额」]提取 |
| hire.v1.referralAccount.enable | [启用内推账户](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/enable) | 根据账户 ID 启用账户，启用后可通过[「内推账户余额变更事件」]监听余额变更、通过[「全额提取内推账户余额」]提取余额 |
| hire.v1.referralAccount.getAccountAssets | [查询内推账户](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/get_account_assets) | 根据账户 ID 查询内推账户信息 |
| hire.v1.referralAccount.reconciliation | [内推账户提现数据对账](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/reconciliation) | 对一段时间内的内推账户积分提现数据进行对账，调用方需传入调用方系统的内推账户积分变动信息 |
| hire.v1.referralAccount.withdraw | [全额提取内推账户余额](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/withdraw) | 通过账户 ID 全额提取内推账户下的积分/现金。全额提现后，内推人在飞书招聘系统中的积分/现金余额会变为 0，对应的积分/现金奖励状态也会变为「已发放」 |
| hire.v1.referralWebsiteJobPost.get | [获取内推官网下职位广告详情](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_website-job_post/get) | 根据职位广告 ID 获取内推官网下的职位广告详情，包含职位广告 ID 以及职位信息等 |
| hire.v1.referralWebsiteJobPost.list | [获取内推官网下职位广告列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_website-job_post/list) | 获取内推官网下的职位列表，包含职位广告ID、职位广告名称、职位信息等 |
| hire.v1.referral.getByApplication | [获取内推信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral/get_by_application) | 根据投递 ID 获取内推信息，包含内推人信息、内推创建时间等 |
| hire.v1.referral.search | [查询人才内推信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral/search) | 根据人才查询内推信息列表，包含内推人信息、内推时间、投递 ID等，按内推投递的`创建时间`从小到大排序返回 |
| hire.v1.registrationSchema.list | [获取信息登记表列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/registration_schema/list) | 根据适用场景获取信息登记表列表，可获取到的信息包括登记表名称、登记表模块、登记表字段等 |
| hire.v1.resumeSource.list | [获取简历来源列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/resume_source/list) | 获取简历来源列表 |
| hire.v1.role.get | [获取角色详情](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/role/get) | 可通过此接口获取角色详情信息，包括名称、描述、权限列表等 |
| hire.v1.role.list | [获取角色列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/role/list) | 根据 page_token 与 page_size 对权限角色进行游标分页查询，可查询到的信息包括：权限角色ID、角色名、角色描述。可应用于权限判断等鉴权场景 |
| hire.v1.subject.list | [获取项目列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/subject/list) | 获取项目列表（概念上一批集体启动和管理的职位可以定义为一个项目，例如 「2012 秋招项目」） |
| hire.v1.talentBlocklist.changeTalentBlock | [加入/移除屏蔽名单](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_blocklist/change_talent_block) | 根据人才 ID 将人才加入或移除屏蔽名单 |
| hire.v1.talentFolder.list | [获取人才文件夹列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_folder/list) | 获取招聘系统中人才文件夹信息列表，包括文件夹 ID、文件夹名称、文件夹所有者 ID |
| hire.v1.talentObject.query | [获取人才字段](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_object/query) | 获取全部人才字段详细信息，包含字段名称、字段描述、字段类型、启用状态等信息 |
| hire.v1.talentOperationLog.search | [查询人才操作记录](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/talent_operation_log/search) | 根据操作人和操作类型查询人才的操作记录 |
| hire.v1.talentPool.batchChangeTalentPool | [批量加入/移除人才库中人才](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_pool/batch_change_talent_pool) | 对于同一个人才库，可批量执行人才加入或移除操作- 执行加入操作：当传入不存在人才 ID 时，接口会报错返回不存在人才 ID 列表。 当人才已在人才库中时，接口静默处理。- 执行移除操作：当传入不存在人才 ID 时，接口会报错返回不存在人才 ID 列表。 当人才未在人才库中时，接口静默处理 |
| hire.v1.talentPool.moveTalent | [将人才加入人才库](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_pool/move_talent) | 将人才加入人才库 |
| hire.v1.talentPool.search | [获取人才库列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_pool/search) | 获取人才库列表，可获取的信息包括人才库 ID、人才库名称等 |
| hire.v1.talentTag.list | [获取人才标签信息列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_tag/list) | 可通过关键词、ID 列表、标签类型、停用状态等获取人才标签信息列表，结果按照创建时间倒序排序 |
| hire.v1.talent.addToFolder | [将人才加入指定文件夹](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/add_to_folder) | 根据人才 ID 列表将人才加入指定文件夹 |
| hire.v1.talent.batchGetId | [批量获取人才ID](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/batch_get_id) | 通过手机号、邮箱、证件号，批量查询人才ID |
| hire.v1.talent.combinedCreate | [创建人才](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/combined_create) | 用于在企业内创建一个人才。支持自定义字段数据，可配合[获取人才字段]接口获取自定义字段信息使用 |
| hire.v1.talent.combinedUpdate | [更新人才](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/combined_update) | 用于在企业内更新一个人才。支持自定义字段数据，可配合[获取人才字段]接口获取自定义字段信息使用 |
| hire.v1.talentExternalInfo.create | [创建人才外部信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent-external_info/create) | 创建外部人才，可将已存在人才标记为外部人才，并写入外部系统创建时间 |
| hire.v1.talentExternalInfo.update | [更新人才外部信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent-external_info/update) | 更新人才外部信息，包含外部系统创建时间 |
| hire.v1.talent.get | [获取人才信息](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/get) | 根据人才 ID 获取人才信息 |
| hire.v1.talent.list | [获取人才列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/list) | 批量获取人才摘要信息，包括人才 ID、人才基信息、教育经历、工作经历等。若需要获取人才详细信息请使用[获取人才详情]接口 |
| hire.v1.talent.onboardStatus | [更新人才在职状态](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/onboard_status) | 更新人才的在职状态，可进行的操作包括入职与离职 |
| hire.v1.talent.removeToFolder | [将人才从指定文件夹移除](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/remove_to_folder) | 根据人才 ID 列表将人才从指定文件夹移除 |
| hire.v1.talent.tag | [操作人才标签](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/tag) | 可为人才新增、删除标签 |
| hire.v1.terminationReason.list | [获取终止投递原因](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/termination_reason/list) | 获取系统中默认的投递终止原因以及用户配置的自定义投递终止原因 |
| hire.v1.test.search | [获取笔试列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/test/search) | 批量获取人才在投递流程中的笔试信息。如作答状态、笔试得分等 |
| hire.v1.todo.list | [批量获取待办事项](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/todo/list) | 批量获取当前用户的待办事项信息，包含评估待办事项、面试待办事项、笔试待办事项和 Offer 待办事项 |
| hire.v1.tripartiteAgreement.create | [创建三方协议](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/tripartite_agreement/create) | 在校招投递上创建三方协议 |
| hire.v1.tripartiteAgreement.delete | [删除三方协议](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/tripartite_agreement/delete) | 删除投递的三方协议 |
| hire.v1.tripartiteAgreement.list | [获取三方协议](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/tripartite_agreement/list) | 根据三方协议 ID 或投递 ID 获取三方协议信息，如三方协议状态、创建时间等信息 |
| hire.v1.tripartiteAgreement.update | [更新三方协议](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/tripartite_agreement/update) | 更新三方协议的状态及修改时间信息 |
| hire.v1.userRole.list | [获取用户角色列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/user_role/list) | 通过用户ID、角色ID等筛选条件获取用户角色列表，可获取的信息包括用户ID、角色ID、角色姓名、业务管理范围等 |
| hire.v1.websiteChannel.create | [新建招聘官网推广渠道](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-channel/create) | 新建指定官网的推广渠道。每个官网可以新建多个推广渠道，每个推广渠道具有不同的推广链接和推广码 |
| hire.v1.websiteChannel.delete | [删除招聘官网推广渠道](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-channel/delete) | 根据招聘官网 ID 和推广渠道 ID 删除推广渠道 |
| hire.v1.websiteChannel.list | [获取招聘官网推广渠道列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-channel/list) | 根据官网 ID 获取推广渠道列表，支持分页查询 |
| hire.v1.websiteChannel.update | [更新招聘官网推广渠道](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-channel/update) | 根据招聘官网 ID 和推广渠道 ID 更改推广渠道，仅支持修改推广渠道名称 |
| hire.v1.websiteDeliveryTask.get | [获取招聘官网投递任务结果](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-delivery_task/get) | 通过[根据简历附件创建招聘官网投递]接口创建的投递任务，可通过本接口获取投递任务结果。如果获取到的数据 data 为空，可继续轮询（正常情况下不会超过1分钟）直到获取到的 data 不为空 |
| hire.v1.websiteDelivery.createByAttachment | [根据简历附件创建招聘官网投递任务](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-delivery/create_by_attachment) | 根据简历附件创建招聘官网投递任务，创建投递的最终结果请通过[获取招聘官网投递任务结果]获取 |
| hire.v1.websiteDelivery.createByResume | [新建招聘官网投递](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-delivery/create_by_resume) | 新建招聘官网投递 |
| hire.v1.websiteJobPost.get | [获取招聘官网下职位广告详情](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-job_post/get) | 获取招聘官网下的职位广告详情，包含职位广告 ID、名称、关联职位 ID、关联职位编码等信息 |
| hire.v1.websiteJobPost.list | [获取招聘官网下的职位广告列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-job_post/list) | 获取招聘官网下的职位信息列表 |
| hire.v1.websiteJobPost.search | [搜索招聘官网下的职位广告列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-job_post/search) | 搜索招聘官网下的职位列表 |
| hire.v1.website.list | [获取招聘官网列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website/list) | 获取招聘官网列表，返回信息包括官网名称、官网ID、招聘渠道ID等 |
| hire.v1.websiteSiteUser.create | [新建招聘官网用户](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-site_user/create) | 注册指定招聘官网的用户，注册完成后，可通过[根据简历附件创建招聘官网投递任务]创建官网投递任务，或通过[新建招聘官网投递]创建官网投递 |

## 业务域: hireV2
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| hire.v2.interviewRecord.get | [获取面试评价详细信息（新版）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/hire-v2/interview_record/get) | 获取面试评价详细信息，如面试结论、面试得分和面试官等信息 |
| hire.v2.interviewRecord.list | [批量获取面试评价详细信息（新版）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/hire-v2/interview_record/list) | 批量获取面试评价详细信息，如面试结论、面试得分和面试官等信息 |
| hire.v2.talent.get | [获取人才详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/hire-v2/talent/get) | 根据人才 ID 获取人才详情，包含人才加入文件夹列表、标签、人才库、备注以及屏蔽名单等信息 |

## 业务域: humanAuthenticationV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| human_authentication.v1.identity.create | [录入身份信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/human_authentication-v1/identity/create) | 该接口用于录入实名认证的身份信息，在唤起有源活体认证前，需要使用该接口进行实名认证 |

## 业务域: imV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| im.v1.batchMessage.delete | [批量撤回消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/delete) | 该接口用于撤回通过[批量发送消息]接口发送的消息 |
| im.v1.batchMessage.getProgress | [查询批量消息整体进度](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/get_progress) | [批量发送消息]或者[批量撤回消息]后，可通过该接口查询消息的发送进度和撤回进度 |
| im.v1.batchMessage.readUser | [查询批量消息推送和阅读人数](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/read_user) | [批量发送消息]后，可通过该接口查询消息推送的总人数以及消息已读人数 |
| im.v1.chatAnnouncement.get | [获取群公告信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-announcement/get) | 获取指定群组中的群公告信息，公告信息格式与[旧版云文档]格式相同 |
| im.v1.chatAnnouncement.patch | [更新群公告信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-announcement/patch) | 更新指定群组中的群公告信息。更新的公告内容格式和更新[旧版云文档]的格式相同，不支持新版云文档格式 |
| im.v1.chat.create | [创建群](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/create) | 创建群聊，创建时支持设置群头像、群名称、群主以及群类型等配置，同时支持邀请群成员、群机器人入群 |
| im.v1.chat.delete | [解散群](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/delete) | 通过 chat_id 解散指定群组。通过 API 解散群组后，群聊天记录将不会保存 |
| im.v1.chat.get | [获取群信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/get) | 获取指定群的基本信息，包括群名称、群描述、群头像、群主 ID 以及群权限配置等 |
| im.v1.chat.link | [获取群分享链接](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/link) | 获取指定群的分享链接，他人点击分享链接后可加入群组 |
| im.v1.chat.list | [获取用户或机器人所在的群列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/list) | 获取 [access_token] 所代表的用户或者机器人所在的群列表 |
| im.v1.chatManagers.addManagers | [指定群管理员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-managers/add_managers) | 指定群组，将群内指定的用户或者机器人设置为群管理员 |
| im.v1.chatManagers.deleteManagers | [删除群管理员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-managers/delete_managers) | 指定群组，删除群组内指定的管理员，包括用户类型的管理员和机器人类型的管理员 |
| im.v1.chatMembers.create | [将用户或机器人拉入群聊](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/create) | 把指定的用户或机器人拉入指定群聊内 |
| im.v1.chatMembers.delete | [将用户或机器人移出群聊](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/delete) | 将指定的用户或机器人从群聊中移出 |
| im.v1.chatMembers.get | [获取群成员列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/get) | 获取指定群组的成员信息，包括成员名字与 ID |
| im.v1.chatMembers.isInChat | [判断用户或机器人是否在群里](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/is_in_chat) | 根据使用的 access_token 判断对应的用户或者机器人是否在指定的群里 |
| im.v1.chatMembers.meJoin | [用户或机器人主动加入群聊](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/me_join) | 将当前调用接口的操作者（用户或机器人）加入指定群聊 |
| im.v1.chatMenuItem.patch | [修改群菜单元信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_item/patch) | 修改指定群组内的某个一级菜单或者二级菜单的元信息，包括图标、名称、国际化名称和跳转链接 |
| im.v1.chatMenuTree.create | [添加群菜单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/create) | 在指定群组中添加一个或多个群菜单。成功调用后接口会返回当前群组内所有群菜单信息 |
| im.v1.chatMenuTree.delete | [删除群菜单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/delete) | 删除指定群内的一级菜单。成功调用后接口会返回群组内最新的群菜单信息 |
| im.v1.chatMenuTree.get | [获取群菜单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/get) | 获取指定群组内的群菜单信息，包括所有一级或二级菜单的名称、跳转链接、图标等信息 |
| im.v1.chatMenuTree.sort | [排序群菜单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/sort) | 调整指定群组内的群菜单排列顺序，成功调用后接口会返回群组内所有群菜单信息 |
| im.v1.chatModeration.get | [获取群成员发言权限](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-moderation/get) | 获取指定群组的发言模式、可发言用户名单等信息 |
| im.v1.chatModeration.update | [更新群发言权限](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-moderation/update) | 更新指定群组的发言权限，可设置为所有群成员可发言、仅群主或管理员可发言、指定群成员可发言 |
| im.v1.chat.search | [搜索对用户或机器人可见的群列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/search) | 获取当前身份（用户或机器人）可见的群列表，包括当前身份所在的群、对当前身份公开的群。支持关键词搜索、分页搜索 |
| im.v1.chatTab.create | [添加会话标签页](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/create) | 在指定会话内添加自定义会话标签页，仅支持添加文档类型（doc）或 URL （url）类型的标签页 |
| im.v1.chatTab.deleteTabs | [删除会话标签页](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/delete_tabs) | 删除指定会话内的一个或多个会话标签页 |
| im.v1.chatTab.listTabs | [拉取会话标签页](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/list_tabs) | 获取指定会话内的会话标签页信息，包括 ID、名称、类型以及内容等 |
| im.v1.chatTab.sortTabs | [会话标签页排序](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/sort_tabs) | 调整指定会话内的多个会话标签页排列顺序 |
| im.v1.chatTab.updateTabs | [更新会话标签页](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/update_tabs) | 更新指定的会话标签页信息，包括名称、类型以及内容等。仅支持更新文档类型（doc）或 URL （url）类型的标签页 |
| im.v1.chatTopNotice.deleteTopNotice | [撤销群置顶](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-top_notice/delete_top_notice) | 撤销指定群组中的置顶消息或群公告 |
| im.v1.chatTopNotice.putTopNotice | [更新群置顶](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-top_notice/put_top_notice) | 更新群组中的群置顶信息，可以将群中的某一条消息，或群公告置顶展示 |
| im.v1.chat.update | [更新群信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/update) | 更新指定群的信息，包括群头像、群名称、群描述、群配置以及群主等 |
| im.v1.message.create | [发送消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create) | 调用该接口向指定用户或者群聊发送消息。支持发送的消息类型包括文本、富文本、卡片、群名片、个人名片、图片、视频、音频、文件以及表情包等 |
| im.v1.message.delete | [撤回消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/delete) | 调用该接口撤回指定消息。调用接口的身份不同（身份通过 Authorization 请求头参数指定），可实现的效果不同：- 机器人可以撤回该机器人自己发送的消息。- 群聊的群主可以撤回群内指定的消息 |
| im.v1.message.forward | [转发消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/forward) | 调用该接口将一条指定的消息转发给用户、群聊或话题 |
| im.v1.message.get | [获取指定消息的内容](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/get) | 调用该接口通过消息的 `message_id` 查询消息内容 |
| im.v1.message.list | [获取会话历史消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/list) | 获取指定会话（包括单聊、群组）内的历史消息（即聊天记录） |
| im.v1.message.mergeForward | [合并转发消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/merge_forward) | 将来自同一个会话内的多条消息，合并转发给指定的用户、群聊或话题 |
| im.v1.message.patch | [更新已发送的消息卡片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/patch) | 通过消息 ID（message_id）更新已发送的消息卡片的内容 |
| im.v1.message.pushFollowUp | [添加跟随气泡](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/push_follow_up) | 调用该接口在最新一条消息下方添加气泡样式的内容，当消息接收者点击气泡或者新消息到达后，气泡消失 |
| im.v1.messageReaction.create | [添加消息表情回复](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/create) | 给指定消息添加指定类型的表情回复 |
| im.v1.messageReaction.delete | [删除消息表情回复](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/delete) | 删除指定消息的某一表情回复 |
| im.v1.messageReaction.list | [获取消息表情回复](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/list) | 获取指定消息内的表情回复列表，支持仅获取特定类型的表情回复 |
| im.v1.message.readUsers | [查询消息已读信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/read_users) | 查询指定消息是否已读。接口只返回已读用户的信息，不返回未读用户的信息 |
| im.v1.message.reply | [回复消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/reply) | 调用该接口回复指定消息。回复的内容支持文本、富文本、卡片、群名片、个人名片、图片、视频、文件等多种类型 |
| im.v1.message.update | [编辑消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/update) | 调用该接口编辑已发送的消息内容，支持编辑文本、富文本消息。如需编辑卡片消息，请使用[更新应用发送的消息卡片]接口 |
| im.v1.message.urgentApp | [发送应用内加急](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_app) | 调用该接口把指定消息加急给目标用户，加急仅在飞书客户端内通知。了解加急可参见[加急功能] |
| im.v1.message.urgentPhone | [发送电话加急](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_phone) | 调用该接口把指定消息加急给目标用户，加急将通过飞书客户端和电话进行通知。了解加急可参见[加急功能] |
| im.v1.message.urgentSms | [发送短信加急](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_sms) | 调用该接口把指定消息加急给目标用户，加急将通过飞书客户端和短信进行通知。了解加急可参见[加急功能] |
| im.v1.pin.create | [Pin 消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/create) | Pin 一条指定的消息。Pin 消息的效果可参见[Pin 消息概述] |
| im.v1.pin.delete | [移除 Pin 消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/delete) | 移除一条指定消息的 Pin |
| im.v1.pin.list | [获取群内 Pin 消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/list) | 获取指定群、指定时间范围内的所有 Pin 消息 |
| im.v1.thread.forward | [转发话题](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/thread/forward) | 调用该接口将话题转发至指定的用户、群聊或话题 |

## 业务域: imV2
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| im.v2.appFeedCardBatch.delete | [删除应用消息流卡片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/app_feed_card-batch/delete) | 该接口用于删除应用消息流卡片 |
| im.v2.appFeedCardBatch.update | [更新应用消息流卡片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/app_feed_card-batch/update) | 该接口用于更新消息流卡片的头像、标题、预览、标签状态、按钮等信息 |
| im.v2.appFeedCard.create | [创建应用消息流卡片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/app_feed_card/create) | 应用消息流卡片是飞书为应用提供的消息触达能力，让应用可以直接在消息流发送消息，重要消息能更快触达用户 |
| im.v2.bizEntityTagRelation.create | [绑定标签到群](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/biz_entity_tag_relation/create) | 绑定标签到业务实体。目前支持给会话打标签 |
| im.v2.bizEntityTagRelation.get | [查询实体与标签的绑定关系](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/biz_entity_tag_relation/get) | 查询实体与标签的绑定关系 |
| im.v2.bizEntityTagRelation.update | [解绑标签与群](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/biz_entity_tag_relation/update) | 从业务实体上解绑标签 |
| im.v2.chatButton.update | [更新消息流卡片按钮](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/chat_button/update) | 为群组消息、机器人消息的消息流卡片添加、更新、删除快捷操作按钮 |
| im.v2.feedCard.botTimeSentive | [机器人单聊即时提醒](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/feed_card/bot_time_sentive) | 可将机器人对话在消息列表中置顶展示，打开飞书首页即可处理重要任务 |
| im.v2.feedCard.patch | [即时提醒](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/feed_card/patch) | 即时提醒能力是飞书在消息列表中提供的强提醒能力，当有重要通知或任务需要及时触达用户，可将群组或机器人对话在消息列表中置顶展示，打开飞书首页即可处理重要任务 |
| im.v2.tag.create | [创建标签](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/tag/create) | 创建标签并返回标签 ID |
| im.v2.tag.patch | [修改标签](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/tag/patch) | 修改标签在各个语言下的名称 |
| im.v2.urlPreview.batchUpdate | [更新 URL 预览](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/url_preview/batch_update) | 该接口用于主动更新 [URL 预览]，调用后会重新触发一次客户端拉取，需要回调服务返回更新后的数据 |

## 业务域: lingoV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| lingo.v1.classification.list | [获取词典分类](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/classification/list) | 获取飞书词典当前分类。飞书词典目前为二级分类体系，每个词条可添加多个二级分类，但选择的二级分类必须从属于不同的一级分类 |
| lingo.v1.draft.create | [创建草稿](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/draft/create) | 草稿并非词条，而是指通过 API 发起创建新词条或更新现有词条的申请。词典管理员审核通过后，草稿将变为新的词条或覆盖已有词条 |
| lingo.v1.draft.update | [更新草稿](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/draft/update) | 根据 draft_id 更新草稿内容，已审批的草稿无法编辑 |
| lingo.v1.entity.create | [创建免审词条](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/create) | 通过此接口创建的词条，无需经过词典管理员审核，直接写入词库。因此，调用此接口时，应当慎重操作 |
| lingo.v1.entity.delete | [删除免审词条](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/delete) | 通过 entity_id 删除已有的词条，无需经过词典管理员审核。因此，调用该接口时应当慎重操作 |
| lingo.v1.entity.get | [获取词条详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/get) | 通过词条 id 拉取对应的词条详情信息 |
| lingo.v1.entity.highlight | [词条高亮](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/highlight) | 传入一句话，智能识别句中对应的词条，并返回词条位置和 entity_id，可在外部系统中快速实现词条智能高亮 |
| lingo.v1.entity.list | [获取词条列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/list) | 分页拉取词条列表数据，支持拉取租户内(或指定词库内)的全部词条 |
| lingo.v1.entity.match | [精准搜索词条](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/match) | 将关键词与词条名、别名精准匹配，并返回对应的 词条 ID |
| lingo.v1.entity.search | [模糊搜索词条](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/search) | 传入关键词，与词条名、别名、释义等信息进行模糊匹配，返回搜到的词条信息 |
| lingo.v1.entity.update | [更新免审词条](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/update) | 通过此接口更新已有的词条，无需经过词典管理员审核，直接写入词库。因此，调用该接口时应当慎重操作 |
| lingo.v1.repo.list | [获取词库列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/repo/list) | 获取有权限访问的飞书词典词库列表。如以应用身份获取，需要在“词库设置”页面添加应用；若以用户身份获取，该用户需要拥有对应词库的可见权限 |

## 业务域: mailV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| mail.v1.mailgroupAlias.create | [创建邮件组别名](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/create) | 创建邮件组别名 |
| mail.v1.mailgroupAlias.delete | [删除邮件组别名](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/delete) | 删除邮件组别名 |
| mail.v1.mailgroupAlias.list | [获取邮件组所有别名](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/list) | 获取邮件组所有别名 |
| mail.v1.mailgroup.create | [创建邮件组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/create) | 创建一个邮件组 |
| mail.v1.mailgroup.delete | [删除邮件组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/delete) | 删除一个邮件组 |
| mail.v1.mailgroup.get | [查询指定邮件组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/get) | 获取特定邮件组信息 |
| mail.v1.mailgroup.list | [批量获取邮件组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/list) | 分页批量获取邮件组 |
| mail.v1.mailgroupManager.batchCreate | [批量创建邮件组管理员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/batch_create) | 批量创建邮件组管理员 |
| mail.v1.mailgroupManager.batchDelete | [批量删除邮件组管理员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/batch_delete) | 批量删除邮件组管理员 |
| mail.v1.mailgroupManager.list | [批量获取邮件组管理员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/list) | 批量获取邮件组管理员 |
| mail.v1.mailgroupMember.batchCreate | [批量创建邮件组成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/batch_create) | 一次请求可以给一个邮件组添加多个成员 |
| mail.v1.mailgroupMember.batchDelete | [批量删除邮件组成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/batch_delete) | 一次请求可以删除一个邮件组中的多个成员 |
| mail.v1.mailgroupMember.create | [创建邮件组成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/create) | 向邮件组添加单个成员 |
| mail.v1.mailgroupMember.delete | [删除邮件组成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/delete) | 删除邮件组单个成员 |
| mail.v1.mailgroupMember.get | [查询指定邮件组成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/get) | 获取邮件组单个成员信息 |
| mail.v1.mailgroupMember.list | [获取所有邮件组成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/list) | 分页批量获取邮件组成员列表 |
| mail.v1.mailgroup.patch | [修改邮件组部分信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/patch) | 更新邮件组部分字段，没有填写的字段不会被更新 |
| mail.v1.mailgroupPermissionMember.batchCreate | [批量创建邮件组权限成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/batch_create) | 一次请求可以给一个邮件组添加多个权限成员 |
| mail.v1.mailgroupPermissionMember.batchDelete | [批量删除邮件组权限成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/batch_delete) | 一次请求可以删除一个邮件组中的多个权限成员 |
| mail.v1.mailgroupPermissionMember.create | [创建邮件组权限成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/create) | 向邮件组添加单个自定义权限成员，添加后该成员可发送邮件到该邮件组 |
| mail.v1.mailgroupPermissionMember.delete | [删除邮件组权限成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/delete) | 从自定义成员中删除单个成员，删除后该成员无法发送邮件到该邮件组 |
| mail.v1.mailgroupPermissionMember.get | [获取邮件组权限成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/get) | 获取邮件组单个权限成员信息 |
| mail.v1.mailgroupPermissionMember.list | [批量获取邮件组权限成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/list) | 分页批量获取邮件组权限成员列表 |
| mail.v1.mailgroup.update | [修改邮件组全部信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/update) | 更新邮件组所有信息 |
| mail.v1.publicMailboxAlias.create | [创建公共邮箱别名](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/create) | 创建公共邮箱别名 |
| mail.v1.publicMailboxAlias.delete | [删除公共邮箱别名](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/delete) | 删除公共邮箱别名 |
| mail.v1.publicMailboxAlias.list | [查询公共邮箱的所有别名](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/list) | 获取所有公共邮箱别名 |
| mail.v1.publicMailbox.create | [创建公共邮箱](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/create) | 创建一个公共邮箱 |
| mail.v1.publicMailbox.delete | [永久删除公共邮箱](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/delete) | 该接口会永久删除公共邮箱地址。可用于释放邮箱回收站的公共邮箱地址，一旦删除，该邮箱地址将无法恢复 |
| mail.v1.publicMailbox.get | [查询指定公共邮箱](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/get) | 获取公共邮箱信息 |
| mail.v1.publicMailbox.list | [查询所有公共邮箱](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/list) | 分页批量获取公共邮箱列表 |
| mail.v1.publicMailboxMember.batchCreate | [批量添加公共邮箱成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/batch_create) | 一次请求可以给一个公共邮箱添加多个成员 |
| mail.v1.publicMailboxMember.batchDelete | [批量删除公共邮箱成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/batch_delete) | 一次请求可以删除一个公共邮箱中的多个成员 |
| mail.v1.publicMailboxMember.clear | [删除公共邮箱所有成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/clear) | 删除公共邮箱所有成员 |
| mail.v1.publicMailboxMember.create | [添加公共邮箱成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/create) | 向公共邮箱添加单个成员 |
| mail.v1.publicMailboxMember.delete | [删除公共邮箱单个成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/delete) | 删除公共邮箱单个成员 |
| mail.v1.publicMailboxMember.get | [查询指定公共邮箱成员信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/get) | 获取公共邮箱单个成员信息 |
| mail.v1.publicMailboxMember.list | [查询所有公共邮箱成员信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/list) | 分页批量获取公共邮箱成员列表 |
| mail.v1.publicMailbox.patch | [修改公共邮箱部分信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/patch) | 更新公共邮箱部分字段，没有填写的字段不会被更新 |
| mail.v1.publicMailbox.removeToRecycleBin | [将公共邮箱移至回收站](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/remove_to_recycle_bin) | 将公共邮箱移至回收站 |
| mail.v1.publicMailbox.update | [修改公共邮箱全部信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/update) | 更新公共邮箱所有信息 |
| mail.v1.userMailboxAlias.create | [创建用户邮箱别名](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/create) | 创建用户邮箱别名 |
| mail.v1.userMailboxAlias.delete | [删除用户邮箱别名](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/delete) | 删除用户邮箱别名 |
| mail.v1.userMailboxAlias.list | [获取用户邮箱所有别名](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/list) | 获取用户邮箱所有别名 |
| mail.v1.userMailbox.delete | [从回收站删除用户邮箱地址](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox/delete) | 该接口会永久删除用户邮箱地址。可用于删除位于邮箱回收站中的用户邮箱地址，一旦删除，将无法恢复。该接口支持邮件的转移，可以将被释放邮箱的邮件转移到另外一个可以使用的邮箱中 |
| mail.v1.userMailboxEvent.subscribe | [订阅事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-event/subscribe) | 订阅事件 |
| mail.v1.userMailboxEvent.subscription | [获取订阅状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-event/subscription) | 获取订阅状态 |
| mail.v1.userMailboxEvent.unsubscribe | [取消订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-event/unsubscribe) | 取消订阅 |
| mail.v1.userMailboxFolder.create | [创建邮箱文件夹](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-folder/create) | 创建邮箱文件夹 |
| mail.v1.userMailboxFolder.delete | [删除邮箱文件夹](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-folder/delete) | 删除邮箱文件夹 |
| mail.v1.userMailboxFolder.list | [列出邮箱文件夹](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-folder/list) | 列出邮箱文件夹 |
| mail.v1.userMailboxFolder.patch | [修改邮箱文件夹](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-folder/patch) | 修改邮箱文件夹 |
| mail.v1.userMailboxMailContact.create | [创建邮箱联系人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-mail_contact/create) | 创建一个邮箱联系人 |
| mail.v1.userMailboxMailContact.delete | [删除邮箱联系人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-mail_contact/delete) | 删除一个邮箱联系人 |
| mail.v1.userMailboxMailContact.list | [列出邮箱联系人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-mail_contact/list) | 列出邮箱联系人列表 |
| mail.v1.userMailboxMailContact.patch | [修改邮箱联系人信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-mail_contact/patch) | 修改一个邮箱联系人的信息 |
| mail.v1.userMailboxMessageAttachment.downloadUrl | [获取附件下载链接](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-message-attachment/download_url) | 获取附件下载链接 |
| mail.v1.userMailboxMessage.get | [获取邮件详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-message/get) | 获取邮件详情 |
| mail.v1.userMailboxMessage.getByCard | [获取邮件卡片的邮件列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-message/get_by_card) | 获取邮件卡片下的邮件列表 |
| mail.v1.userMailboxMessage.list | [列出邮件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-message/list) | 列出邮件 |
| mail.v1.userMailboxMessage.send | [发送邮件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-message/send) | 发送邮件 |
| mail.v1.userMailboxRule.create | [创建收信规则](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-rule/create) | 创建收信规则 |
| mail.v1.userMailboxRule.delete | [删除收信规则](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-rule/delete) | 删除收信规则 |
| mail.v1.userMailboxRule.list | [列出收信规则](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-rule/list) | 列出收信规则 |
| mail.v1.userMailboxRule.reorder | [对收信规则进行排序](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-rule/reorder) | 对收信规则进行排序 |
| mail.v1.userMailboxRule.update | [更新收信规则](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-rule/update) | 更新收信规则 |
| mail.v1.user.query | [查询邮箱地址状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user/query) | 使用邮箱状态查询接口，可以输入邮箱地址，查询出该邮箱地址对应的类型以及状态 |

## 业务域: mdmV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| mdm.v1.userAuthDataRelation.bind | [用户数据维度绑定](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v1/user_auth_data_relation/bind) | 通过该接口，可为指定应用下的用户绑定一类数据维度，支持批量给多个用户同时增量授权 |
| mdm.v1.userAuthDataRelation.unbind | [用户数据维度解绑](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v1/user_auth_data_relation/unbind) | 通过该接口，可为指定应用下的指定用户解除一类数据维度 |

## 业务域: mdmV3
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| mdm.v3.batchCountryRegion.get | [根据主数据编码批量查询国家/地区](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v3/batch_country_region/get) | 通过mdmcode批量查询国家/地区信息。资源介绍请参考[概述] |
| mdm.v3.countryRegion.list | [分页批量查询国家/地区](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v3/country_region/list) | 分页批量查询国家/地区。资源介绍请参考[概述] |

## 业务域: minutesV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| minutes.v1.minute.get | [获取妙记信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute/get) | 通过这个接口，可以得到一篇妙记的基础概述信息，包含 `owner_id`、`create_time`、标题、封面、时长和 URL |
| minutes.v1.minuteMedia.get | [下载妙记音视频文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute-media/get) | 获取妙记的音视频文件 |
| minutes.v1.minuteStatistics.get | [获取妙记统计数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute-statistics/get) | 通过这个接口，可以获得妙记的访问情况统计，包含PV、UV、访问过的 user id、访问过的 user timestamp |

## 业务域: momentsV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| moments.v1.post.get | [查询帖子信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/moments-v1/post/get) | 通过 ID 查询帖子实体数据信息 |

## 业务域: okrV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| okr.v1.okr.batchGet | [批量获取 OKR](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/okr/batch_get) | 根据 OKR id 批量获取 OKR |
| okr.v1.periodRule.list | [获取 OKR 周期规则](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period_rule/list) | 获取租户的周期规则列表 |
| okr.v1.period.create | [创建 OKR 周期](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/create) | 根据周期规则创建一个 OKR 周期 |
| okr.v1.period.list | [获取 OKR 周期列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/list) | 获取 OKR 周期列表 |
| okr.v1.period.patch | [修改 OKR 周期状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/patch) | 修改某个 OKR 周期的状态为「正常」、「失效」或「隐藏」，对租户所有人生效，请谨慎操作 |
| okr.v1.progressRecord.create | [创建 OKR 进展记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/create) | 创建 OKR 进展记录 |
| okr.v1.progressRecord.delete | [删除 OKR 进展记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/delete) | 根据 ID 删除 OKR 进展记录 |
| okr.v1.progressRecord.get | [获取 OKR 进展记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/get) | 根据 ID 获取 OKR 进展记录详情，接口返回进展记录的内容、更新时间以及进展百分比和状态 |
| okr.v1.progressRecord.update | [更新 OKR 进展记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/update) | 根据 OKR 进展记录 ID 更新进展详情 |
| okr.v1.review.query | [查询复盘信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/review/query) | 根据周期和用户查询复盘信息 |
| okr.v1.userOkr.list | [获取用户的 OKR 列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/user-okr/list) | 根据用户的 id 获取 OKR 列表 |

## 业务域: opticalCharRecognitionV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| optical_char_recognition.v1.image.basicRecognize | [识别图片中的文字](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/optical_char_recognition-v1/image/basic_recognize) | 可识别图片中的文字，按图片中的区域划分，分段返回文本列表。文件大小需小于5M |

## 业务域: passportV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| passport.v1.session.logout | [退出登录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/passport-v1/session/logout) | 该接口用于退出用户的登录态 |
| passport.v1.session.query | [批量获取脱敏的用户登录信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/passport-v1/session/query) | 该接口用于查询用户的登录信息 |

## 业务域: payrollV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| payroll.v1.acctItem.list | [批量查询算薪项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/acct_item/list) | 批量查询算薪项 |
| payroll.v1.costAllocationDetail.list | [查询成本分摊报表明细](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/cost_allocation_detail/list) | 根据报表方案、期间、和报表类型获取成本分摊明细数据。调用接口前，需打开「财务过账」开关，并且完成发布成本分摊报表 |
| payroll.v1.costAllocationPlan.list | [批量查询成本分摊方案](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/cost_allocation_plan/list) | 根据期间分页批量查询成本分摊方案，仅返回期间内生效的方案列表 |
| payroll.v1.costAllocationReport.list | [查询成本分摊报表汇总数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/cost_allocation_report/list) | 根据算薪期间和成本分摊方案id获取成本分摊汇总数据。调用接口前，需在payroll 系统中打开「财务过账」开关，并且完成发布成本分摊报表 |
| payroll.v1.datasourceRecord.query | [批量查询外部算薪数据记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/datasource_record/query) | 1. 支持通过payroll_period（必传）、employment_id（可选）这两个预置字段，批量查询指定数据源下的数据记录列表。2. 数据源配置信息可从[获取外部数据源配置信息]或者 「飞书人事后台-设置-算薪数据设置-外部数据源配置」页面 获取 |
| payroll.v1.datasourceRecord.save | [创建 / 更新外部算薪数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/datasource_record/save) | 参照数据源配置字段格式，批量保存（创建或更新）数据记录。1. 记录的唯一标志通过业务主键判断（employment_id + payroll_period）2. 若不存在数据记录，则本次保存会插入1条记录。3. 若已存在数据记录，则本次保存会覆盖更新已有记录（只更新传入字段的值，未传入字段值不更新），如果传入的数据记录没有任何变化，则不更新。4. 若更新或者插入成功，会返回产生数据变更的记录条数 |
| payroll.v1.datasource.list | [获取外部数据源配置信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/datasource/list) | 批量查询飞书人事后台：设置->算薪数据设置->外部数据源设置 中的数据源设置列表 |
| payroll.v1.paygroup.list | [获取薪资组基本信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/paygroup/list) | - 薪资组是按薪酬管理的纬度创建的组，组内的员工由相同的HR处理薪酬相关工作，通过薪资组可实现对薪资组人员的管理和在薪酬计算发放等环节的人员权限范围控制- 本接口返回所有薪资组的基本信息，包括薪资组ID、薪资组名称、薪资组编码、薪资组状态等，不含薪资组下的员工信息 |
| payroll.v1.paymentActivityDetail.list | [查询发薪活动明细列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_activity_detail/list) | 根据「发薪活动 ID 」和「分页参数」查询发薪活动明细列表和关联的算薪明细分段数据 |
| payroll.v1.paymentActivity.archive | [封存发薪活动](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_activity/archive) | 根据发薪活动ID对发薪活动进行封存。注意：仅当发薪活动状态为审批通过时，方可进行封存 |
| payroll.v1.paymentActivity.list | [查询发薪活动列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_activity/list) | 根据「发薪日起止范围」、「发薪活动状态」和「分页参数」查询发薪活动列表 |
| payroll.v1.paymentDetail.query | [批量查询发薪明细](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_detail/query) | 根据 __发薪活动 ID 列表__ 、__发薪日起止时间__ 和 __飞书人事雇佣 ID 列表__ 分页查询发薪明细列表和关联的算薪明细分段数据 |

## 业务域: performanceV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| performance.v1.reviewData.query | [获取绩效结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/review_data/query) | 获取被评估人在指定周期、指定项目中各个环节的评估结果信息，包含绩效所在的周期、项目、评估项、评估模版以及各环节评估数据等信息 |
| performance.v1.semester.list | [获取周期列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/semester/list) | 批量获取周期的基本信息，如周期的名称、类型等信息。支持根据时间段、周期年份、周期类型等过滤条件进行筛选 |
| performance.v1.stageTask.findByPage | [获取周期任务（全部用户）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/stage_task/find_by_page) | 批量获取周期下所有用户的任务信息。支持传入任务分类、任务截止时间参数删选周期内任务数据 |
| performance.v1.stageTask.findByUserList | [获取周期任务（指定用户）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/stage_task/find_by_user_list) | 根据用户 ID 批量获取指定周期的任务信息。支持传入任务分类、任务截止时间参数删选周期内任务数据 |

## 业务域: performanceV2
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| performance.v2.activity.query | [获取项目列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/activity/query) | 批量获取项目的配置信息，如项目名称、项目模式等信息 |
| performance.v2.additionalInformation.import | [批量导入补充信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/additional_information/import) | 批量导入被评估人的补充信息作为绩效评估的参考，如补充信息的事项、时间以及具体描述等。该接口支持创建和更新补充信息 |
| performance.v2.additionalInformation.query | [批量查询补充信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/additional_information/query) | 批量查询被评估人的补充信息，如补充信息的事项、时间以及具体描述等 |
| performance.v2.additionalInformationsBatch.delete | [批量删除补充信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/additional_informations-batch/delete) | 批量删除被评估人的补充信息 |
| performance.v2.indicator.query | [获取评估项列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/indicator/query) | 批量获取评估项信息，如评估项名称、评估项类型、评估项等级配置等信息 |
| performance.v2.metricDetail.import | [录入被评估人关键指标数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_detail/import) | 批量录入指定周期中被评估人的关键指标数据 |
| performance.v2.metricDetail.query | [获取被评估人关键指标结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_detail/query) | 批量获取指定周期中被评估人的关键指标结果 |
| performance.v2.metricField.query | [获取指标字段列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_field/query) | 批量获取指标的字段基础信息，如指标字段名称、指标字段类型等信息 |
| performance.v2.metricLib.query | [获取指标列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_lib/query) | 获取指标库中的指标信息，如指标名称、指标类型、指标标签和指标字段等信息。可通过指标启用状态、指标类型、指标可用范围等筛选条件获取指定范围的指标信息 |
| performance.v2.metricTag.list | [获取指标标签列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_tag/list) | 批量获取指标的标签信息，如标签名称、创建时间等信息 |
| performance.v2.metricTemplate.query | [获取指标模板列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_template/query) | 批量获取指标模板的信息 |
| performance.v2.question.query | [获取标签填写题配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/question/query) | 获取标签填写题配置信息，包括标签填写题名称、标签列表等 |
| performance.v2.reviewData.query | [获取绩效详情数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/review_data/query) | 获取被评估人各环节的绩效评估详情（不包含校准环节），如环节评估数据、环节提交状态等 |
| performance.v2.reviewTemplate.query | [获取绩效模板配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/review_template/query) | 获取绩效模板信息，包括模版名称、执行角色、填写项类型等 |
| performance.v2.reviewee.query | [获取被评估人信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/reviewee/query) | 获取绩效周期中被圈定到项目中的被评估人信息，包括未启动的项目 |
| performance.v2.userGroupUserRel.write | [更新人员组成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/user_group_user_rel/write) | 更新指定人员组成员 |

## 业务域: personalSettingsV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| personal_settings.v1.systemStatus.batchClose | [批量关闭系统状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/batch_close) | 批量关闭用户系统状态可用 |
| personal_settings.v1.systemStatus.batchOpen | [批量开启系统状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/batch_open) | 批量开启用户系统状态可用 |
| personal_settings.v1.systemStatus.create | [创建系统状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/create) | 创建租户维度的系统状态 |
| personal_settings.v1.systemStatus.delete | [删除系统状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/delete) | 删除租户维度的系统状态 |
| personal_settings.v1.systemStatus.list | [获取系统状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/list) | 获取租户下所有系统状态 |
| personal_settings.v1.systemStatus.patch | [修改系统状态](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/patch) | 修改租户维度系统状态 |

## 业务域: reportV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| report.v1.rule.query | [查询规则](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/rule/query) | 查询规则 |
| report.v1.ruleView.remove | [移除规则看板](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/rule-view/remove) | 移除规则看板 |
| report.v1.task.query | [查询任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/task/query) | 查询任务 |

## 业务域: searchV2
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| search.v2.app.create | [搜索应用](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/app/create) | 用户可以通过关键字搜索到可见应用，应用可见性与套件内搜索一致 |
| search.v2.dataSource.create | [创建数据源](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/create) | 搜索-搜索连接器-数据源-创建数据源 |
| search.v2.dataSource.delete | [删除数据源](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/delete) | 搜索-搜索连接器-数据源-删除数据源 |
| search.v2.dataSource.get | [获取数据源](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/get) | 搜索-搜索连接器-数据源-获取数据源 |
| search.v2.dataSourceItem.create | [为指定数据项创建索引](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/create) | 搜索-搜索连接器-数据项-为指定数据项创建索引 |
| search.v2.dataSourceItem.delete | [删除数据项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/delete) | 搜索-搜索连接器-数据项-删除数据项 |
| search.v2.dataSourceItem.get | [查询指定数据项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/get) | 获取单个数据记录 |
| search.v2.dataSource.list | [批量获取数据源](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/list) | 搜索-搜索连接器-数据源-批量获取数据源 |
| search.v2.dataSource.patch | [修改数据源](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/patch) | 搜索-搜索连接器-数据源-修改数据源 |
| search.v2.message.create | [搜索消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/message/create) | 用户可以通过关键字搜索可见消息，可见性和套件内搜索一致 |
| search.v2.schema.create | [创建数据范式](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/create) | 搜索-搜索连接器-数据范式-创建数据范式 |
| search.v2.schema.delete | [删除数据范式](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/delete) | 搜索-搜索连接器-数据范式-删除数据范式 |
| search.v2.schema.get | [获取数据范式](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/get) | 搜索-搜索连接器-数据范式-获取数据范式 |
| search.v2.schema.patch | [修改数据范式](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/patch) | 搜索-搜索连接器-数据范式-修改数据范式 |

## 业务域: securityAndComplianceV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| security_and_compliance.v1.openapiLog.listData | [获取OpenAPI审计日志数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/security_and_compliance-v1/openapi_log/list_data) | 该接口用于获取OpenAPI审计日志数据 |

## 业务域: sheetsV3
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| sheets.v3.spreadsheet.create | [创建电子表格](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/create) | 在云空间指定目录下创建电子表格。可自定义表格标题。不支持带内容创建表格 |
| sheets.v3.spreadsheet.get | [获取电子表格信息](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/get) | 根据电子表格 token 获取电子表格的基础信息，包括电子表格的所有者、URL 链接等 |
| sheets.v3.spreadsheet.patch | [修改电子表格属性](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/patch) | 该接口用于修改电子表格的属性。目前支持修改电子表格标题 |
| sheets.v3.spreadsheetSheetFilterViewCondition.create | [创建筛选条件](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/create) | 在筛选视图的指定列创建筛选条件，包括筛选的类型、比较类型、筛选参数等 |
| sheets.v3.spreadsheetSheetFilterViewCondition.delete | [删除筛选条件](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/delete) | 删除筛选视图指定列的所有筛选条件 |
| sheets.v3.spreadsheetSheetFilterViewCondition.get | [获取筛选条件](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/get) | 获取筛选视图某列的筛选条件，包括筛选的类型、比较类型、筛选参数等 |
| sheets.v3.spreadsheetSheetFilterViewCondition.query | [查询筛选条件](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/query) | 查询指定筛选视图的所有筛选条件，包括筛选的类型、比较类型、筛选参数等 |
| sheets.v3.spreadsheetSheetFilterViewCondition.update | [更新筛选条件](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/update) | 更新筛选视图指定列的筛选条件，包括筛选的类型、比较类型、筛选参数等 |
| sheets.v3.spreadsheetSheetFilterView.create | [创建筛选视图](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/create) | 指定电子表格工作表的筛选范围，创建一个筛选视图 |
| sheets.v3.spreadsheetSheetFilterView.delete | [删除筛选视图](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/delete) | 删除指定筛选视图 |
| sheets.v3.spreadsheetSheetFilterView.get | [获取筛选视图](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/get) | 获取指定筛选视图的信息，包括 ID、名称和筛选范围 |
| sheets.v3.spreadsheetSheetFilterView.patch | [更新筛选视图](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/patch) | 更新筛选视图的名称或筛选范围 |
| sheets.v3.spreadsheetSheetFilterView.query | [查询筛选视图](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/query) | 查询电子表格指定工作表的所有筛选视图及其基本信息，包括视图 ID、视图名称和筛选范围 |
| sheets.v3.spreadsheetSheetFilter.create | [创建筛选](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/create) | 在电子表格工作表的指定范围内，设置筛选条件，创建筛选 |
| sheets.v3.spreadsheetSheetFilter.delete | [删除筛选](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/delete) | 删除电子表格中指定工作表的所有筛选 |
| sheets.v3.spreadsheetSheetFilter.get | [获取筛选](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/get) | 获取电子表格中工作表的详细筛选信息，包括筛选的应用范围、筛选条件、被筛选条件过滤掉的行 |
| sheets.v3.spreadsheetSheetFilter.update | [更新筛选](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/update) | 在电子表格工作表筛选范围中，更新指定列的筛选条件 |
| sheets.v3.spreadsheetSheet.find | [查找单元格](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/find) | 在指定范围内查找符合查找条件的单元格 |
| sheets.v3.spreadsheetSheetFloatImage.create | [创建浮动图片](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/create) | 在电子表格工作表的指定位置创建一张浮动图片 |
| sheets.v3.spreadsheetSheetFloatImage.delete | [删除浮动图片](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/delete) | 删除电子表格工作表内指定的浮动图片 |
| sheets.v3.spreadsheetSheetFloatImage.get | [获取浮动图片](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/get) | 获取电子表格工作表内指定浮动图片的参数信息 |
| sheets.v3.spreadsheetSheetFloatImage.patch | [更新浮动图片](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/patch) | 更新已有的浮动图片位置和宽高 |
| sheets.v3.spreadsheetSheetFloatImage.query | [查询浮动图片](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/query) | 获取电子表格工作表内所有的浮动图片的参数信息 |
| sheets.v3.spreadsheetSheet.get | [查询工作表](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/get) | 根据工作表 ID 查询工作表属性信息，包括工作表的标题、索引位置、是否被隐藏等 |
| sheets.v3.spreadsheetSheet.moveDimension | [移动行列](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/move_dimension) | 该接口用于移动行或列。行或列被移动到目标位置后，原本在目标位置的行列会对应右移或下移 |
| sheets.v3.spreadsheetSheet.query | [获取工作表](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/query) | 根据电子表格 token 获取表格中所有工作表及其属性信息，包括工作表 ID、标题、索引位置、是否被隐藏等 |
| sheets.v3.spreadsheetSheet.replace | [替换单元格](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/replace) | 在指定范围内，查找并替换符合查找条件的单元格 |

## 业务域: speechToTextV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| speech_to_text.v1.speech.fileRecognize | [识别语音文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/file_recognize) | 语音文件识别接口，上传整段语音文件进行一次性识别。接口适合 60 秒以内音频识别 |
| speech_to_text.v1.speech.streamRecognize | [识别流式语音](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/stream_recognize) | 语音流式接口，将整个音频文件分片进行传入模型。能够实时返回数据。建议每个音频分片的大小为 100-200ms |

## 业务域: taskV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| task.v1.task.batchDeleteCollaborator | [批量删除执行者](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_collaborator) | 该接口用于批量删除执行者 |
| task.v1.task.batchDeleteFollower | [批量删除关注人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_follower) | 该接口用于批量删除关注人 |
| task.v1.taskCollaborator.create | [新增执行者](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/create) | 该接口用于新增任务执行者，一次性可以添加多个执行者。只有任务的创建者和执行者才能添加执行者，关注人无权限添加 |
| task.v1.taskCollaborator.delete | [删除指定执行者](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/delete) | 该接口用于删除任务执行者 |
| task.v1.taskCollaborator.list | [获取执行者列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/list) | 该接口用于查询任务执行者列表，支持分页，最大值为50 |
| task.v1.taskComment.create | [创建评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/create) | 该接口用于创建和回复任务的评论。当parent_id字段为0时，为创建评论；当parent_id不为0时，为回复某条评论 |
| task.v1.taskComment.delete | [删除评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/delete) | 该接口用于通过评论ID删除评论 |
| task.v1.taskComment.get | [获取评论详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/get) | 该接口用于通过评论ID获取评论详情 |
| task.v1.taskComment.list | [获取评论列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/list) | 该接口用于查询任务评论列表，支持分页，最大值为100 |
| task.v1.taskComment.update | [更新评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/update) | 该接口用于更新评论内容 |
| task.v1.task.complete | [完成任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/complete) | 该接口用于将任务状态修改为“已完成”。完成任务是指整个任务全部完成，而不支持执行者分别完成任务，执行成功后，任务对所有关联用户都变为完成状态 |
| task.v1.task.create | [创建任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/create) | 该接口可以创建一个任务，支持填写任务的基本信息，包括任务的标题，描述及协作者等。在此基础上，创建任务时可以设置截止时间和重复规则，将任务设置为定期执行的重复任务。通过添加协作者，则可以让其他用户协同完成该任务。此外，接口也提供了一些支持自定义内容的字段，调用方可以实现定制化效果，如完成任务后跳转到指定结束界面 |
| task.v1.task.delete | [删除任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/delete) | 该接口用于删除任务 |
| task.v1.taskFollower.create | [新增关注人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/create) | 该接口用于新增任务关注人。可以一次性添加多位关注人。关注人ID要使用表示用户的ID |
| task.v1.taskFollower.delete | [删除指定关注人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/delete) | 该接口用于删除任务关注人 |
| task.v1.taskFollower.list | [获取关注人列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/list) | 历史版本（不推荐）-任务-关注人-获取关注人列表 |
| task.v1.task.get | [查询指定任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/get) | 该接口用于获取任务详情，包括任务标题、描述、时间、来源等信息 |
| task.v1.task.list | [查询所有任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/list) | 以分页的方式获取任务列表。当使用user_access_token时，获取与该用户身份相关的所有任务。当使用tenant_access_token时，获取以该应用身份通过“创建任务“接口创建的所有任务（并非获取该应用所在租户下所有用户创建的任务）。本接口支持通过任务创建时间以及任务的完成状态对任务进行过滤 |
| task.v1.task.patch | [更新任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/patch) | 该接口用于修改任务的标题、描述、时间、来源等相关信息 |
| task.v1.taskReminder.create | [新增提醒时间](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/create) | 该接口用于创建任务的提醒时间。提醒时间在截止时间基础上做偏移，但是偏移后的结果不能早于当前时间 |
| task.v1.taskReminder.delete | [删除提醒时间](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/delete) | 删除提醒时间，返回结果状态 |
| task.v1.taskReminder.list | [查询提醒时间列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/list) | 返回提醒时间列表，支持分页，最大值为50 |
| task.v1.task.uncomplete | [取消完成任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/uncomplete) | 该接口用于取消任务的已完成状态 |

## 业务域: taskV2
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| task.v2.attachment.delete | [删除附件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/delete) | 提供一个附件GUID，删除该附件。删除后该附件不可再恢复 |
| task.v2.attachment.get | [获取附件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/get) | 提供一个附件GUID，返回附件的详细信息，包括GUID，名称，大小，上传时间，临时可下载链接等 |
| task.v2.attachment.list | [列取附件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/list) | 列取一个资源的所有附件。返回的附件列表支持分页，按照附件上传时间排序。每个附件会返回一个可供下载的临时url，有效期为3分钟，最多可以支持3次下载。如果超过使用限制，需要通过本接口获取新的临时url |
| task.v2.comment.create | [创建评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/create) | 为一个任务创建评论，或者回复该任务的某个评论。若要创建一个回复评论，需要在创建时设置`reply_to_comment_id`字段。被回复的评论和新建的评论必须属于同一个任务 |
| task.v2.comment.delete | [删除评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/delete) | 删除一条评论。评论被删除后，将无法进行任何操作，也无法恢复 |
| task.v2.comment.get | [获取评论详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/get) | 给定一个评论的ID，返回评论的详情，包括内容，创建人，创建时间和更新时间等信息 |
| task.v2.comment.list | [获取评论列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/list) | 给定一个资源，返回该资源的评论列表。支持分页。评论可以按照创建时间的正序（asc, 从最老到最新），或者逆序（desc，从最老到最新），返回数据 |
| task.v2.comment.patch | [更新评论](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/patch) | 更新一条评论。更新时，将`update_fields`字段中填写所有要修改的评论的字段名，同时在`comment`字段中填写要修改的字段的新值即可。更新接口规范详情见[功能概述]中的“ 关于资源的更新”章节。目前只支持更新评论的"conent"字段 |
| task.v2.customField.add | [将自定义字段加入资源](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/add) | 将自定义字段加入一个资源。目前资源类型支持清单tasklist。一个自定义字段可以加入多个清单中。加入后，该清单可以展示任务的该字段的值，同时基于该字段实现筛选，分组等功能。如果自定义字段的设置被更新，字段加入的所有资源都能收到这个更新，并进行相应的展示 |
| task.v2.customField.create | [创建自定义字段](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/create) | 创建一个自定义字段，并将其加入一个资源上（目前资源只支持清单）。创建自定义字段必须提供字段名称，类型和相应类型的设置。目前任务自定义字段支持数字(number)，成员(member)，日期(datetime)，单选(single_select),多选(multi_select), 文本(text)几种类型。分别使用"number_setting", "member_setting", "datetime_setting", "single_select_setting", "multi_select_setting","text_setting"来设置。例如创建一个数字类型的自定义字段，并添加到guid为"ec5ed63d-a4a9-44de-a935-7ba243471c0a"的清单，可以这样发请求。```POST /task/v2/custom_fields{ "name": "价格", "type": "number", "resource_type": "tasklist", "resource_id": "ec5ed63d-a4a9-44de-a935-7ba243471c0a", "number_setting": { "format": "cny", "decimal_count": 2, "separator": "thousand" }}```表示创建一个叫做“价格”的自定义字段，保留两位小数。在界面上显示时采用人民币的格式，并显示千分位分割符。类似的，创建一个单选字段，可以这样调用接口：```POST /task/v2/custom_fields{ "name": "优先级", "type": "single_select", "resource_type": "tasklist", "resource_id": "ec5ed63d-a4a9-44de-a935-7ba243471c0a", "single_select_setting": { "options": [ { "name": "高", "color_index": 1 }, { "name": "中", "color_index": 11 }, { "name": "低", "color_index": 16 } ] }}```表示创建一个叫“优先级”的单选，包含“高”，“中”，“低”三个选项，每个选项设置一个颜色值 |
| task.v2.customField.get | [获取自定义字段](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/get) | 根据一个自定义字段的GUID，获取其详细的设置信息 |
| task.v2.customField.list | [列取自定义字段](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/list) | 列取用户可访问的自定义字段列表。如果不提供`resource_type`和`resource_id`参数，则返回用户可访问的所有自定义字段。如果提供`resource_type`和`resource_id`，则返回该资源下的自定义字段。目前`resource_type`仅支持"tasklist"，此时`resource_id`应为一个清单的tasklist_guid。该接口支持分页 |
| task.v2.customFieldOption.create | [创建自定义任务选项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field-option/create) | 为单选或多选字段添加一个自定义选项。一个单选/多选字段最大支持100个选项。新添加的选项如果不隐藏，其名字不能和已存在的不隐藏选项的名字重复 |
| task.v2.customFieldOption.patch | [更新自定义字段选项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field-option/patch) | 根据一个自定义字段的GUID和其选项的GUID，更新该选项的数据。要更新的字段必须是单选或者多选类型，且要更新的字段必须归属于该字段。更新时，将`update_fields`字段中填写所有要修改的任务字段名，同时在`option`字段中填写要修改的字段的新值即可。`update_fields`支持的字段包括：* `name`: 选项名称* `color_index`: 选项的颜色索引值* `is_hidden`: 是否从界面上隐藏* `insert_before`: 将当前option放到同字段某个option之前的那个option_guid。* `insert_after`: 将当前option放到同字段某个option之后的那个option_guid |
| task.v2.customField.patch | [更新自定义字段](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/patch) | 更新一个自定义字段的名称和设定。更新时，将`update_fields`字段中填写所有要修改的任务字段名，同时在`custom_field`字段中填写要修改的字段的新值即可。自定义字段不允许修改类型，只能根据类型修改其设置。`update_fields`支持更新的字段包括：* `name`：自定义字段名称* `number_setting` ：数字类型设置（当且仅当要更新的自定义字段类型是数字时)* `member_setting` ：人员类型设置（当且仅当要更新的自定义字段类型是人员时)* `datetime_setting` ：日期类型设置 (当且仅当要更新的自定义字段类型是日期时)* `single_select_setting`：单选类型设置 (当且仅当要更新的自定义字段类型是单选时)* `multi_select_setting`：多选类型设置 (当且仅当要更新的自定义字段类型是多选时)* `text_setting`: 文本类型设置（目前文本类型没有可设置项）当更改某个设置时，如果不填写一个字段，表示不覆盖原有的设定。比如，对于一个数字，原有的setting是:```json"number_setting": { "format": "normal", "decimal_count": 2, "separator": "none", "custom_symbol": "L", "custom_symbol_position": "right"}```使用如下参数调用接口：```PATCH /task/v2/custom_fields/:custom_field_guid{ "custom_field": { "number_setting": { "decimal_count": 4 } }, "update_fields": ["number_setting"]}```表示仅仅将小数位数从2改为4，其余的设置`format`, `separator`, `custom_field`等都不变。对于单选/多选类型的自定义字段，其设定是一个选项列表。更新时，使用方式接近使用App的界面。使用者不必传入字段的所有选项，而是只需要提供最终希望界面可见（is_hidden=false) 的选项。原有字段中的选项如果没有出现在输入中，则被置为`is_hidden=true`并放到所有可见选项之后。对于某一个更新的选项，如果提供了option_guid，将视作更新该选项（此时option_guid必须存在于当前字段，否则会返回错误）；如果不提供，将视作新建一个选项（新的选项的option_guid会在reponse中被返回)。例如，一个单选字段原来有3个选项A，B，C，D。其中C是隐藏的。用户可以这样更新选项：```PATCH /task/v2/custom_fields/:custom_field_guid{ "custom_field": { "single_select_setting": { "optoins": [ { "name": "E", "color_index": 25 }, { "guid": "<option_guid of A>" "name": "A2" }, { "guid": "<option_guid of C>", }, ] } }, "update_fields": ["single_select_setting"]}```调用后最终得到了新的选项列表E, A, C, B, D。其中：* 选项E被新建出来，其`color_index`被设为了25。* 选项A被更新，其名称被改为了"A2"。但其color_index因为没有设置而保持不变；* 选项整体顺序遵循用户的输入顺序，即E，A，C。同时E，A，C作为直接的输入，其is_hidden均被设为了false，其中，C原本是is_hidden=true，也会被设置为is_hidden=false。* 选项B和D因为用户没有输入，其`is_hidden`被置为了true，并且被放到了所有用户输入的选项之后。如果只是单纯的希望修改用户可见的选项的顺序，比如从原本的选项A,B,C修改为C,B,A，可以这样调用接口：```PATCH /task/v2/custom_fields/:custom_field_guid{ "custom_field": { "single_select_setting": { "optoins": [ { "guid": "<option_guid_of_C>" }, { "guid": "<option_guid of B>" }, { "guid": "<option_guid of A>", }, ] } }, "update_fields": ["single_select_setting"]}```如果希望直接将字段里的所有选项都标记为不可见，可以这样调用接口：```PATCH /task/v2/custom_fields/:custom_field_guid{ "custom_field": { "single_select_setting": { "optoins": [] } }, "update_fields": ["single_select_setting"]}```更新单选/多选字段的选项必须满足“可见选项名字不能重复”的约束。否则会返回错误。开发者需要自行保证输入的选项名不可以重复。如希望只更新单个选项，或者希望单独设置某个选项的is_hidden，本接口无法支持，但可以使用[更新自定义字段选项]接口实现 |
| task.v2.customField.remove | [将自定义字段移出资源](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/remove) | 将自定义字段从资源中移出。移除后，该资源将无法再使用该字段。目前资源的类型支持"tasklist"。如果要移除自定义字段本来就不存在于资源，本接口将正常返回。注意自定义字段是通过清单来实现授权的，如果将自定义字段从所有关联的清单中移除，就意味着任何调用身份都无法再访问改自定义字段 |
| task.v2.section.create | [创建自定义分组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/create) | 为清单或我负责的任务列表创建一个自定义分组。创建时可以需要提供名称和可选的配置。如果不指定位置，新分组会放到指定resource的自定义分组列表的最后。当在清单中创建自定义分组时，需要设置`resourse_type`为"tasklist", `resource_id`设为清单的GUID。当为我负责任务列表中创建自定义分组时，需要设置`resource_type`为"my_tasks"，不需要设置`resource_id`。调用身份只能为自己的我负责的任务列表创建自定义分组 |
| task.v2.section.delete | [删除自定义分组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/delete) | 删除一个自定义分组。删除后该自定义分组中的任务会被移动到被删除自定义分组所属资源的默认自定义分组中。不能删除默认的自定义分组 |
| task.v2.section.get | [获取自定义分组详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/get) | 获取一个自定义分组详情，包括名称，创建人等信息。如果该自定义分组归属于一个清单，还会返回清单的摘要信息 |
| task.v2.section.list | [获取自定义分组列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/list) | 获取一个资源下所有的自定义分组列表。支持分页。返回结果按照自定义分组在界面上的顺序排序 |
| task.v2.section.patch | [更新自定义分组](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/patch) | 更新自定义分组，可以更新自定义分组的名称和位置。更新时，将`update_fields`字段中填写所有要修改的字段名，同时在`section`字段中填写要修改的字段的新值即可。调用约定详情见[功能概述]中的“ 关于资源的更新”章节。目前支持更新的字段包括：* `name` - 自定义字段名字;* `insert_before` - 要让当前自定义分组放到某个自定义分组前面的secion_guid，用于改变当前自定义分组的位置;* `insert_after` - 要让当前自定义分组放到某个自定义分组后面的secion_guid，用于改变当前自定义分组的位置。`insert_before`和`insert_after`如果填写，必须是同一个资源的合法section_guid。注意不能同时设置`insert_before`和`insert_after` |
| task.v2.section.tasks | [获取自定义分组任务列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/tasks) | 列取一个自定义分组里的所有任务。支持分页。任务按照自定义排序的顺序返回。本接口支持简单的过滤 |
| task.v2.task.addDependencies | [添加依赖](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_dependencies) | 为一个任务添加一个或多个依赖。可以添加任务的前置依赖和后置依赖。存在依赖关系的任务如果在同一个清单，可以通过清单的甘特图来展示其依赖关系。本接口也可以用于修改一个现有依赖的类型（前置改为后置或者后置改为前置）。注意：添加的依赖的`task_guid`不能重复，也不能添加当前任务为自己的依赖。尝试添加一个已经存在的依赖会被自动忽略 |
| task.v2.task.addMembers | [添加任务成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_members) | 添加任务的负责人或者关注人。一次性可以添加多个成员。返回任务的实体中会返回最终任务成员的列表。* 关于member的格式，详见[功能概述]中的“ 如何表示任务和清单的成员？”章节。* 成员的角色支持"assignee"和"follower"。* 成员类型支持"user"和"app"。* 如果要添加的成员已经在任务中，则自动被忽略 |
| task.v2.task.addReminders | [添加任务提醒](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_reminders) | 为一个任务添加提醒。提醒是基于任务的截止时间计算得到的一个时刻。为了设置提醒，任务必须首先拥有截止时间(due)。可以在[创建任务]时设置截止时间，或者通过[更新任务]设置一个截止时间。目前一个任务只能设置1个提醒。但接口的形式可以在未来扩充为一个任务支持多个提醒。如果当前任务已经有提醒了，要更新提醒的设置，需要先调用[移除任务提醒]接口移除原有提醒。再调用本接口添加提醒 |
| task.v2.task.addTasklist | [任务加入清单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_tasklist) | 将一个任务加入清单。返回任务的详细信息，包括任务所在的所有清单信息。如果任务已经在该清单，接口将返回成功 |
| task.v2.task.create | [创建任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/create) | 该接口可以创建一个任务，在创建任务时，支持填写任务的基本信息（如标题、描述、负责人等），此外，还可以设置任务的开始时间、截止时间提醒等条件，此外，还可以通过传入 tasklists 字段将新任务加到多个清单中。创建任务时，可以通过设置`members`字段来设置任务的负责人和关注人。关于member的格式，详见[功能概述]中的“ 如何表示任务和清单的成员？ ”章节。如果要设置任务的开始时间和截止时间，需要遵守任务时间的格式和约束。详见[功能概述]中的“ 如何使用开始时间和截止时间？”章节。如要设置自定义字段值，可以设置`custom_fields`字段。但因为自定义字段归属于清单，因此要填写的自定义字段的guid必须归属于要添加的清单(通过`tasklists`设置）。详见[自定义字段概览]。通过设置`client_token`实现幂等调用。详见[功能概述]中的“ 幂等调用 ”章节。如要创建一个任务的子任务，需要使用[创建子任务]接口。创建任务时可以一并设置自定义字段值。但根据自定义字段的权限关系，任务只能添加`tasklists`字段设置的清单中关联的自定义字段的值。详见[自定义字段功能概述]中的介绍 |
| task.v2.task.delete | [删除任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/delete) | 删除一个任务。删除后任务无法再被获取到 |
| task.v2.task.get | [获取任务详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/get) | 该接口用于获取任务详情，包括任务标题、描述、时间、成员等信息 |
| task.v2.task.list | [列取任务列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/list) | 基于调用身份，列出特定类型的所有任务。支持分页。目前只支持列取任务界面上“我负责的”任务。返回的任务数据按照任务在”我负责的“界面中”自定义拖拽“的顺序排序 |
| task.v2.task.patch | [更新任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/patch) | 该接口用于修改任务的标题、描述、截止时间等信息。更新时，将`update_fields`字段中填写所有要修改的任务字段名，同时在`task`字段中填写要修改的字段的新值即可。如果`update_fields`中设置了要变更一个字段的名字，但是task里没设置新的值，则表示将该字段清空。调用约定详情见[功能概述]中的“ 关于资源的更新”章节。该接口可以用于完成任务和将任务恢复至未完成，只需要修改`completed_at`字段即可。但留意，目前不管任务本身是会签任务还是或签任务，oapi对任务进行完成只能实现“整体完成”，不支持个人单独完成。此外，不能对已经完成的任务再次完成，但可以将其恢复到未完成的状态(设置`completed_at`为"0")。如更新自定义字段的值，需要调用身份同时拥有任务的编辑权限和自定义字段的编辑权限。详情见[自定义字段功能概览]。更新时，只有填写在`task.custom_fields`的自定义字段值会被更新，不填写的不会被改变。任务成员/提醒/清单数据不能使用本接口进行更新。* 如要修改任务成员，需要使用[添加任务成员]和[移除任务成员]接口。* 如要修改任务提醒，需要使用[添加任务提醒]和[移除任务提醒]接口。* 如要变更任务所在的清单，需要使用[任务加入清单]和[任务移出清单]接口 |
| task.v2.task.removeDependencies | [移除依赖](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_dependencies) | 从一个任务移除一个或者多个依赖。移除时只需要输入要移除的`task_guid`即可。注意，如果要移除的依赖非当前任务的依赖，会被自动忽略。接口会返回成功 |
| task.v2.task.removeMembers | [移除任务成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_members) | 移除任务成员。一次性可以移除多个成员。可以移除任务的负责人或者关注人。移除时，如果要移除的成员不是任务成员，会被自动忽略。本接口返回移除成员后的任务数据，包含移除后的任务成员列表 |
| task.v2.task.removeReminders | [移除任务提醒](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_reminders) | 将一个提醒从任务中移除。如果要移除的提醒本来就不存在，本接口将直接返回成功 |
| task.v2.task.removeTasklist | [任务移出清单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_tasklist) | 将任务从一个清单中移出。返回任务详情。如果任务不在清单中，接口将返回成功 |
| task.v2.taskSubtask.create | [创建子任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task-subtask/create) | 给一个任务创建一个子任务。接口功能除了额外需要输入父任务的GUID之外，和[创建任务]接口功能完全一致 |
| task.v2.taskSubtask.list | [获取任务的子任务列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task-subtask/list) | 获取一个任务的子任务列表。支持分页，数据按照子任务在界面上的顺序返回 |
| task.v2.task.tasklists | [列取任务所在清单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/tasklists) | 列取一个任务所在的所有清单的信息，包括清单的GUID和所在自定义分组的GUID。只有调用身份有权限访问的清单信息会被返回 |
| task.v2.tasklistActivitySubscription.create | [创建动态订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/create) | 为一个清单创建一个订阅。每个订阅可以包含1个或多个订阅者（目前只支持普通群组）。订阅创建后，如清单发生相应的事件，则会向订阅里的订阅者发送通知消息。一个清单最多可以创建50个订阅。每个订阅最大支持50个订阅者。订阅者目前仅支持"chat"类型。每个订阅可以通过设置`include_keys`可以针对哪些事件(event_key)做通知。如果`include_keys`为空，则不对任何事件进行通知。如有需要，创建时也可以直接将`disabled`设为true，创建一个禁止发送订阅通知的订阅 |
| task.v2.tasklistActivitySubscription.delete | [删除动态订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/delete) | 给定一个清单的GUID和一个订阅的GUID，将其删除。删除后的数据不可恢复 |
| task.v2.tasklistActivitySubscription.get | [获取动态订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/get) | 提供一个清单的GUID和一个订阅的GUID，获取该订阅的详细信息，包括名称，订阅者，可通知的event key列表等 |
| task.v2.tasklistActivitySubscription.list | [列取动态订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/list) | 给定一个清单的GUID，获取其所有的订阅信息。结果按照订阅的创建时间排序 |
| task.v2.tasklistActivitySubscription.patch | [更新动态订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/patch) | 提供一个清单的GUID和一个动态订阅的GUID，对其进行更新。更新时，将`update_fields`字段中填写所有要修改的字段名，同时在`activity_subscription`字段中填写要修改的字段的新值即可。`update_fields`支持更新的字段包括：* name：订阅的名称* subscribers: 订阅者列表。如更新，会将旧的订阅者列表完全替换为新的订阅者列表。支持最大50个订阅者。并且订阅者必须是chat类型。* include_keys ：订阅需要发送通知的key。如更新，会将旧的列表完全替换为新的include_keys列表。只能设置支持的event key (见字段描述）。* disabled：修改订阅的开启/禁用状态 |
| task.v2.tasklist.addMembers | [添加清单成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/add_members) | 向一个清单添加1个或多个协作成员。成员信息通过设置`members`字段实现。关于member的格式，详见[功能概述]中的“ 如何表示任务和清单的成员？”章节。一个清单协作成员可以是一个用户，应用或者群组。每个成员可以设置“可编辑”或者“可阅读”的角色。群组作为协作成员表示该群里所有群成员都自动拥有群组协作成员的角色。如果要添加的成员已经是清单成员，且角色和请求中设置是一样的，则会被自动忽略，接口返回成功。如果要添加的成员已经是清单成员，且角色和请求中设置是不一样的（比如原来的角色是可阅读，请求中设为可编辑），则相当于更新其角色。如果要添加的成员已经是清单的所有者，则会被自动忽略。接口返回成功。其所有者的角色不会改变。本接口不能用来设置清单所有者，如要设置，可以使用[更新清单]接口 |
| task.v2.tasklist.create | [创建清单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/create) | 创建一个清单。清单可以用于组织和管理属于同一个项目的多个任务。创建时，必须填写清单的名字。同时，可以设置通过`members`字段设置清单的协作成员。关于member的格式，详见[功能概述]中的“ 如何表示任务和清单的成员？”章节。创建清单后，创建人自动成为清单的所有者。如果请求同时将创建人设置为可编辑/可阅读角色，则最终该用户成为清单所有者，并自动从清单成员列表中消失。因为同一个用户在同一个清单只能拥有一个角色 |
| task.v2.tasklist.delete | [删除清单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/delete) | 删除一个清单。删除清单后，不可对该清单做任何操作，也无法再访问到清单。清单被删除后不可恢复 |
| task.v2.tasklist.get | [获取清单详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/get) | 获取一个清单的详细信息，包括清单名，所有者，清单成员等 |
| task.v2.tasklist.list | [获取清单列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/list) | 获取调用身份所有可读取的清单列表 |
| task.v2.tasklist.patch | [更新清单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/patch) | 更新清单，可以更新清单的名字和所有者。更新清单时，将`update_fields`字段中填写所有要修改的清单字段名，同时在`tasklist`字段中填写要修改的字段的新值即可。更新调用规范详见[功能概述]中的“ 关于资源的更新”章节。支持更新的字段包括:* `name` - 清单名字* `owner` - 清单所有者更新清单所有者（owner）时，如果该成员已经是清单的“可编辑”或者“可阅读”角色，则该成员将直接升级为所有者角色，自动从清单的成员列表中消失。这是因为同一个用户在同一个清单中只能有一个角色。同时，支持使用`origin_owner_to_role`字段将原有所有者变为可编辑/可阅读角色或者直接退出清单。该接口不能用于更新清单的成员和增删清单中的任务。* 如要增删清单中的成员，可以使用[添加清单成员]和[移除清单成员]接口。* 如要增删清单中的任务，可以使用[任务加入清单]和[任务移出清单]接口 |
| task.v2.tasklist.removeMembers | [移除清单成员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/remove_members) | 移除清单的一个或多个协作成员。通过设置`members`字段表示要移除的成员信息。关于member的格式，详见[功能概述]中的“ 如何表示任务和清单的成员？”章节。清单中同一个成员只能有一个角色，通过的member的id和type可以唯一确定一个成员，因此请求参数中对于要删除的成员，不需要填写"role"字段。如果要移除的成员不在清单中，则被自动忽略，接口返回成功。该接口不能用于移除清单所有者。如果要移除的成员是清单所有者，则会被自动忽略。如要设置清单所有者，需要调用[更新清单]接口 |
| task.v2.tasklist.tasks | [获取清单任务列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/tasks) | 获取一个清单的任务列表，返回任务的摘要信息。本接口支持分页。清单中的任务以“自定义拖拽”的顺序返回。本接口支持简单的按照任务的完成状态或者任务的创建时间范围过滤 |

## 业务域: tenantV2
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| tenant.v2.tenantProductAssignInfo.query | [获取企业席位信息接口](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/tenant-v2/tenant-product_assign_info/query) | 获取租户下待分配的席位列表，包含席位名称、席位ID、数量及对应有效期 |
| tenant.v2.tenant.query | [获取企业信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/tenant-v2/tenant/query) | 获取企业名称、企业编号等企业信息 |

## 业务域: translationV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| translation.v1.text.detect | [识别文本语种](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/detect) | 机器翻译 (MT)，支持 100 多种语言识别，返回符合 ISO 639-1 标准 |
| translation.v1.text.translate | [翻译文本](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/translate) | 机器翻译 (MT)，支持以下语种互译："zh": 汉语；"zh-Hant": 繁体汉语；"en": 英语；"ja": 日语；"ru": 俄语；"de": 德语；"fr": 法语；"it": 意大利语；"pl": 波兰语；"th": 泰语；"hi": 印地语；"id": 印尼语；"es": 西班牙语；"pt": 葡萄牙语；"ko": 朝鲜语；"vi": 越南语； |

## 业务域: trustPartyV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| trust_party.v1.collaborationTenantCollaborationDepartment.get | [获取关联组织部门详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/trust_party-v1/collaboration_tenant-collaboration_department/get) | 获取对方的关联组织部门详情，需要对部门有可见性权限才可以获取 |
| trust_party.v1.collaborationTenantCollaborationUser.get | [获取关联组织成员详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/trust_party-v1/collaboration_tenant-collaboration_user/get) | 获取关联组织成员详情，需要对关联组织成员有权限才可以获取 |
| trust_party.v1.collaborationTenant.get | [获取关联组织详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/trust_party-v1/collaboration_tenant/get) | 基于组织tenant key获取关联组织详情，需要对对方组织有可见权限才可以获取 |
| trust_party.v1.collaborationTenant.list | [获取可见关联组织的列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/trust_party-v1/collaboration_tenant/list) | 分页获取用户可见的关联列表 |
| trust_party.v1.collaborationTenant.visibleOrganization | [获取关联组织的部门和成员信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/trust_party-v1/collaboration_tenant/visible_organization) | 该接口会返回用户在外部部门下可见的下级部门、用户、用户组 |

## 业务域: vcV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| vc.v1.alert.list | [获取告警记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/alert/list) | 获取特定条件下租户的设备告警记录 |
| vc.v1.export.get | [查询导出任务结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/get) | 查看异步导出的进度 |
| vc.v1.export.meetingList | [导出会议明细](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/meeting_list) | 导出会议明细，具体权限要求请参考资源介绍 |
| vc.v1.export.participantList | [导出参会人明细](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/participant_list) | 导出某个会议的参会人详情列表，具体权限要求请参考「资源介绍」 |
| vc.v1.export.participantQualityList | [导出参会人会议质量数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/participant_quality_list) | 导出某场会议某个参会人的音视频&共享质量数据（仅支持已结束会议），具体权限要求请参考「资源介绍」 |
| vc.v1.export.resourceReservationList | [导出会议室预定数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/resource_reservation_list) | 导出会议室预定数据，具体权限要求请参考「资源介绍」 |
| vc.v1.meetingList.get | [查询会议明细](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting_list/get) | 查询会议明细，具体权限要求请参考[资源介绍] |
| vc.v1.meeting.end | [结束会议](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/end) | 结束一个进行中的会议 |
| vc.v1.meeting.get | [获取会议详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/get) | 获取一个会议的详细数据 |
| vc.v1.meeting.invite | [邀请参会人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/invite) | 邀请参会人进入会议 |
| vc.v1.meeting.kickout | [移除参会人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/kickout) | 将参会人从会议中移除 |
| vc.v1.meeting.listByNo | [获取与会议号关联的会议列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/list_by_no) | 获取指定时间范围（90天内)会议号关联的会议简要信息列表 |
| vc.v1.meetingRecording.get | [获取录制文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/get) | 获取一个会议的录制文件 |
| vc.v1.meetingRecording.setPermission | [授权录制文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/set_permission) | 将一个会议的录制文件授权给组织、用户或公开到公网 |
| vc.v1.meetingRecording.start | [开始录制](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/start) | 在会议中开始录制 |
| vc.v1.meetingRecording.stop | [停止录制](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/stop) | 在会议中停止录制 |
| vc.v1.meeting.setHost | [设置主持人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/set_host) | 设置会议的主持人 |
| vc.v1.participantList.get | [查询参会人明细](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/participant_list/get) | 查询参会人明细，具体权限要求请参考[资源介绍] |
| vc.v1.participantQualityList.get | [查询参会人会议质量数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/participant_quality_list/get) | 查询参会人会议质量数据（仅支持已结束会议），具体权限要求请参考「资源介绍」 |
| vc.v1.report.getDaily | [获取会议报告](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/report/get_daily) | 获取一段时间内组织的每日会议使用报告 |
| vc.v1.report.getTopUser | [获取 Top 用户列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/report/get_top_user) | 获取一段时间内组织内会议使用的 Top 用户列表 |
| vc.v1.reserveConfigAdmin.get | [查询会议室预定管理员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-admin/get) | 查询会议室预定管理员 |
| vc.v1.reserveConfigAdmin.patch | [更新会议室预定管理员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-admin/patch) | 更新会议室预定管理员 |
| vc.v1.reserveConfigDisableInform.get | [查询禁用状态变更通知](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-disable_inform/get) | 查询禁用状态变更通知 |
| vc.v1.reserveConfigDisableInform.patch | [更新禁用状态变更通知](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-disable_inform/patch) | 更新禁用状态变更通知 |
| vc.v1.reserveConfigForm.get | [查询会议室预定表单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-form/get) | 查询会议室预定表单 |
| vc.v1.reserveConfigForm.patch | [更新会议室预定表单](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-form/patch) | 更新会议室预定表单 |
| vc.v1.reserveConfig.patch | [更新会议室预定限制](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config/patch) | 更新会议室预定限制 |
| vc.v1.reserveConfig.reserveScope | [查询会议室预定限制](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config/reserve_scope) | 查询会议室预定限制 |
| vc.v1.reserve.apply | [预约会议](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/apply) | 创建一个会议预约 |
| vc.v1.reserve.delete | [删除预约](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/delete) | 删除一个预约 |
| vc.v1.reserve.get | [获取预约](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/get) | 获取一个预约的详情 |
| vc.v1.reserve.getActiveMeeting | [获取活跃会议](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/get_active_meeting) | 获取一个预约的当前活跃会议 |
| vc.v1.reserve.update | [更新预约](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/update) | 更新一个预约 |
| vc.v1.resourceReservationList.get | [查询会议室预定数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/resource_reservation_list/get) | 查询会议室预定数据，具体权限要求请参考「资源介绍」 |
| vc.v1.roomConfig.query | [查询会议室配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/query) | 查询一个范围内的会议室配置 |
| vc.v1.roomConfig.set | [设置会议室配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/set) | 设置一个范围内的会议室配置 |
| vc.v1.roomConfig.setCheckboardAccessCode | [创建签到板部署码](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/set_checkboard_access_code) | 创建一个范围内的签到板部署码 |
| vc.v1.roomConfig.setRoomAccessCode | [创建会议室部署码](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/set_room_access_code) | 创建一个范围内的会议室部署码 |
| vc.v1.roomLevel.create | [创建会议室层级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/create) | 该接口用于创建会议室层级 |
| vc.v1.roomLevel.del | [删除会议室层级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/del) | 该接口可以用来删除某个会议室层级 |
| vc.v1.roomLevel.get | [查询会议室层级详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/get) | 该接口可以使用会议室层级 ID 查询会议室层级详情 |
| vc.v1.roomLevel.list | [查询会议室层级列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/list) | 该接口用来查询某个会议室层级下的子层级列表 |
| vc.v1.roomLevel.mget | [批量查询会议室层级详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/mget) | 该接口可以使用会议室层级 ID 批量查询会议室层级详情 |
| vc.v1.roomLevel.patch | [更新会议室层级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/patch) | 该接口可以用来更新某个会议室层级的信息 |
| vc.v1.roomLevel.search | [搜索会议室层级](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/search) | 该接口可以用来搜索会议室层级，支持使用自定义会议室层级 ID 进行查询 |
| vc.v1.room.create | [创建会议室](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/create) | 该接口用于创建会议室 |
| vc.v1.room.delete | [删除会议室](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/delete) | 该接口可以用来删除某个会议室 |
| vc.v1.room.get | [查询会议室详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/get) | 该接口可以使用会议室 ID 查询会议室详情 |
| vc.v1.room.list | [查询会议室列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/list) | 该接口可以用来查询某个会议室层级下会议室列表 |
| vc.v1.room.mget | [批量查询会议室详情](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/mget) | 该接口可以使用会议室 ID 批量查询会议室详情 |
| vc.v1.room.patch | [更新会议室](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/patch) | 该接口可以用来更新某个会议室的信息 |
| vc.v1.room.search | [搜索会议室](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/search) | 该接口可以用来搜索会议室，支持使用关键词进行搜索，也支持使用自定义会议室 ID 进行查询。该接口只会返回用户有预定权限的会议室列表 |
| vc.v1.scopeConfig.create | [设置会议室配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/scope_config/create) | 该接口可以用来设置某个会议层级范围下或者某个会议室的配置 |
| vc.v1.scopeConfig.get | [查询会议室配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/scope_config/get) | 该接口可以用来查询某个会议层级范围下或者某个会议室的配置 |

## 业务域: verificationV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| verification.v1.verification.get | [获取认证信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/verification-v1/verification/get) | 认证信息-获取认证信息 |

## 业务域: wikiV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| wiki.v1.node.search | [搜索 Wiki](https://open.feishu.cn/document/ukTMukTMukTM/uEzN0YjLxcDN24SM3QjN/search_wiki) | 云文档-知识库-搜索 Wiki |

## 业务域: wikiV2
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| wiki.v2.space.create | [创建知识空间](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/create) | 此接口用于创建知识空间 |
| wiki.v2.space.get | [获取知识空间信息](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get) | 此接口用于根据知识空间 ID 查询知识空间的信息，包括空间的类型、可见性、分享状态等 |
| wiki.v2.space.getNode | [获取知识空间节点信息](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get_node) | 获取知识空间节点信息 |
| wiki.v2.space.list | [获取知识空间列表](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/list) | 此接口用于获取有权限访问的知识空间列表 |
| wiki.v2.spaceMember.create | [添加知识空间成员](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/create) | 添加知识空间成员或管理员 |
| wiki.v2.spaceMember.delete | [删除知识空间成员](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/delete) | 此接口用于删除知识空间成员或管理员 |
| wiki.v2.spaceMember.list | [获取知识空间成员列表](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/list) | 获取知识空间的成员与管理员列表 |
| wiki.v2.spaceNode.copy | [创建知识空间节点副本](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/copy) | 此接口用于在知识空间创建节点副本到指定位置 |
| wiki.v2.spaceNode.create | [创建知识空间节点](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/create) | 此接口用于在知识节点里创建[节点]到指定位置 |
| wiki.v2.spaceNode.list | [获取知识空间子节点列表](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/list) | 此接口用于分页获取Wiki节点的子节点列表。此接口为分页接口。由于权限过滤，可能返回列表为空，但分页标记（has_more）为true，可以继续分页请求 |
| wiki.v2.spaceNode.move | [移动知识空间节点](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move) | 此方法用于在Wiki内移动节点，支持跨知识空间移动。如果有子节点，会携带子节点一起移动 |
| wiki.v2.spaceNode.moveDocsToWiki | [移动云空间文档至知识空间](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move_docs_to_wiki) | 该接口允许移动云空间文档至知识空间，并挂载在指定位置 |
| wiki.v2.spaceNode.updateTitle | [更新知识空间节点标题](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/update_title) | 此接口用于更新节点标题 |
| wiki.v2.spaceSetting.update | [更新知识空间设置](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-setting/update) | 根据space_id更新知识空间公共设置 |
| wiki.v2.task.get | [获取任务结果](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/task/get) | 该方法用于获取wiki异步任务的结果 |

## 业务域: workplaceV1
| MCP 工具名称 | API | 描述 | 
| --- | --- | --- |
| workplace.v1.customWorkplaceAccessData.search | [获取定制工作台访问数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/custom_workplace_access_data/search) | 获取定制工作台访问数据 |
| workplace.v1.workplaceAccessData.search | [获取工作台访问数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/workplace_access_data/search) | 获取工作台访问数据（包含默认工作台与定制工作台） |
| workplace.v1.workplaceBlockAccessData.search | [获取定制工作台小组件访问数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/workplace_block_access_data/search) | 获取定制工作台小组件访问数据 |
