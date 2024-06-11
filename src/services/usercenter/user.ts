/**
 * @file API：/usercenter/user
 */

 import { ExAxiosRequestConfig } from 'icinfo-request'
 import {http} from "@/scripts/http"
 
 /**
  * 用户登录接口
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function login(data?: {
 /** 登录用户名 */ loginName: string, 
 /** 登录密码 */ password: string, 
 /** 登录类型 */ type: string, 
 /** 验证码 */ checkCode?: string, 
 /** 钉钉id */ dingDingId?: string, 
 /** 钉钉授权码 */ authCode?: string, 
 /** 密码密文 */ passwordCiphertext?: string, 
 /** 系统类型（0本系统 1统一办案系统） */ sysType?: string, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<LoginDTO>>({
         url: "/usercenter/user/login",
         type: "POST",
         data,
         ...options
     })
 }
 
 /**
  * pc钉钉扫码登入
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function loginByQRCode(data?: {
 /** 登录用户名 */ loginName: string, 
 /** 登录密码 */ password: string, 
 /** 登录类型 */ type: string, 
 /** 验证码 */ checkCode?: string, 
 /** 钉钉id */ dingDingId?: string, 
 /** 钉钉授权码 */ authCode?: string, 
 /** 密码密文 */ passwordCiphertext?: string, 
 /** 系统类型（0本系统 1统一办案系统） */ sysType?: string, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result_1>({
         url: "/usercenter/user/loginByQRCode",
         type: "POST",
         data,
         ...options
     })
 }
 
 /**
  * 获取当前用户的挂职机构列表
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function getUserOrg(data?: {
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<UserHasOrgDTO[]>>({
         url: "/usercenter/user/getUserOrg",
         type: "GET",
         data,
         ...options
     })
 }
 
 /**
  * 机构切换
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function switchUserOrg(data?: {
 /** 部门编码 */ deptCode?: string, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<LoginDTO>>({
         url: "/usercenter/user/switchUserOrg",
         type: "GET",
         data,
         ...options
     })
 }
 
 /**
  * 刷新权限
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function refresh(data?: {
 /**    系统类型 */ sysType?: string, 
 /** 刷新全部 */ refreshAll?: boolean, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<LoginDTO>>({
         url: "/usercenter/user/refresh",
         type: "GET",
         data,
         ...options
     })
 }
 
 /**
  * 退出登录
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function logout(data?: {
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<string>>({
         url: "/usercenter/user/logout",
         type: "GET",
         data,
         ...options
     })
 }
 
 /**
  * 一体化门户通过code跳转处罚体系统获取token
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  * @author 饶曙栋
  */
 export function getXzzfTokenByAccountId(data?: {
 /** 政务钉id */ accountId?: string, 
 /** 用户id */ userId?: string, 
 /**   系统类型，默认可以不传0 获取行政执法token和菜单，1 获取处罚token和菜单 */ sysType?: string, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<JSONObject>>({
         url: "/usercenter/user/getXzzfTokenByAccountId",
         type: "GET",
         data,
         ...options
     })
 }
 
 /**
  * 用户首次登录，并初始化用户账号密码,并登录
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function initPwdAndLogin(data?: {
 /** 登录用户名 */ loginName: string, 
 /** 登录密码 */ password: string, 
 /** 登录类型 */ type: string, 
 /** 验证码 */ checkCode?: string, 
 /** 钉钉id */ dingDingId?: string, 
 /** 钉钉授权码 */ authCode?: string, 
 /** 密码密文 */ passwordCiphertext?: string, 
 /** 系统类型（0本系统 1统一办案系统） */ sysType?: string, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<LoginDTO>>({
         url: "/usercenter/user/initPwdAndLogin",
         type: "POST",
         data,
         ...options
     })
 }
 
 /**
  * 通过浙政钉id获取用户登录信息
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function loginWithZwdAccountId(data?: {
 /** 浙政钉accountId */ zwdAccountId?: string, 
 /** 用户手机号 */ phone?: string, 
 /** 用户userId */ userId?: string, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<LoginDTO>>({
         url: "/usercenter/user/loginWithZwdAccountId",
         type: "GET",
         data,
         ...options
     })
 }
 
 /**
  * 发送浙政钉验证码
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function sendSms(data?: {
 /**   用户手机号 */ phone?: string, 
 /** 发送短信类型 0 浙政钉 1 短信 */ smsType?: string, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<string>>({
         url: "/usercenter/user/sendSms",
         type: "GET",
         data,
         ...options
     })
 }
 
 /**
  * 忘记密码-重置用户密码
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function resetPassword(data?: {
 /** 密码 */ password: string, 
 /** 验证码 */ checkCode: string, 
 /** 手机号 */ phone: string, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<string>>({
         url: "/usercenter/user/resetPassword",
         type: "POST",
         data,
         ...options
     })
 }
 
 /**
  * 验证码校验
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function checkCode(data?: {
 /** 验证码 */ checkCode?: string, 
 /** 手机号 */ phone?: string, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<string>>({
         url: "/usercenter/user/checkCode",
         type: "GET",
         data,
         ...options
     })
 }
 
 /**
  * 修改密码-重置用户密码
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function resetUsePassword(data?: {
 /** 新密码 */ password: string, 
 /** 旧密码 */ oldPassword: string, 
 /** 手机号 */ phone: string, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<string>>({
         url: "/usercenter/user/resetUsePassword",
         type: "POST",
         data,
         ...options
     })
 }
 
 /**
  * 读取公钥文件
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function readRsa(data?: {
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<string>>({
         url: "/usercenter/user/readRsa",
         type: "GET",
         data,
         ...options
     })
 }
 
 /**
  * 通过浙政钉id获取用户登录信息
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function loginByPhone(data?: {
 /** 用户手机号 */ phone: string, 
 /** 用户userId */ userId: string, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<LoginDTO>>({
         url: "/usercenter/user/loginByPhone",
         type: "GET",
         data,
         ...options
     })
 }
 
 /**
  * 协同指挥通过code获取大综合token
  * @param data 要提交给服务器的数据
  * @param options 附加选项
  */
 export function loginByAuthCode(data?: {
 /** 授权码 */ code?: string, 
 /** 系统类型 */ sysType?: string, 
 }, options?: ExAxiosRequestConfig) {
     return http.request<Result<LoginDTO>>({
         url: "/usercenter/user/loginByAuthCode",
         type: "GET",
         data,
         ...options
     })
 }
 
 export interface ErrorInfo {
 
     /**
      * 错误属性
      */
     field: string
 
     /**
      * 错误信息
      */
     info: string
 
 }
 
 export interface Result<T> {
 
     /**
      * 返回编码.200=成功
      */
     code: number
 
     /**
      * 返回信息
      */
     message: string
 
     /**
      * 返回数据
      */
     data: T
 
     /**
      * 错误信息
      */
     errors: ErrorInfo[]
 
 }
 
 export interface ApplicationMenuTreeDTO {
 
     /**
      * 图标
      */
     menuIcon: string
 
     /**
      * 菜单类型（0 应用 1 目录 2 菜单 3 按钮 ）
      */
     dataType: string
 
     /**
      * 菜单编码中文
      */
     menuCodeCn: string
 
     /**
      * 路由
      */
     link: string
 
     /**
      * 图标
      */
     icon: string
 
     /**
      * 菜单名称
      */
     menuName: string
 
     remark: string
 
     /**
      * 应用、目录、菜单、按钮 名称
      */
     title: string
 
     /**
      * 是否为叶子节点
      */
     leaf: boolean
 
     /**
      * url
      */
     url: string
 
     /**
      * 菜单父级id
      */
     parentId: string
 
     /**
      * 节点本身集合
      */
     children: ApplicationMenuTreeDTO[]
 
     /**
      * 是否置顶  1 是 0 否
      */
     isTop: string
 
     /**
      * 应用类型主键
      */
     appTypeId: string
 
     /**
      * 菜单编码
      */
     menuCode: string
 
     /**
      * 是否显示
      */
     checked: boolean
 
     /**
      * 应用、目录、菜单、按钮 主键ID
      */
     id: string
 
     /**
      * 节点所属应用id
      */
     applicationId: string
 
     /**
      * 系统唯一代码
      */
     applicationCode: string
 
     /**
      * 应用、目录、菜单、按钮 编码
      */
     key: string
 
 }
 
 export interface ApplicationTypeDTO {
 
     /**
      * 类型名称
      */
     name: string
 
     /**
      * 应用唯一编码
      */
     code: string
 
     /**
      * 排序值
      */
     sort: number
 
     /**
      * 应用菜单列表
      */
     applicationList: ApplicationMenuTreeDTO[]
 
     /**
      * 主键
      */
     appTypeId: string
 
 }
 
 export interface LineDTO {
 
     territoryName: string
 
     /**
      * 条线文号
      */
     docNumber: string
 
     territoryCode: string
 
     /**
      * 条线主键
      */
     lineId: string
 
     /**
      * 条线名称
      */
     lineName: string
 
     updateTime: string
 
     /**
      * 条线备注
      */
     remark: string
 
     mergeLineId: string
 
     /**
      * 排序值 值越大越靠前
      */
     sort: number
 
     type: string
 
     title: string
 
     leaf: boolean
 
     /**
      * 是否执法条线, 1=是 0=否
      */
     isLawEnforcement: string
 
     /**
      * 条线条线编码
      */
     lineCode: string
 
     /**
      * 创建人姓名
      */
     createBy: string
 
     /**
      * 是否删除 1 是 0 否'
      */
     deleted: string
 
     createTime: string
 
     /**
      * 修改人姓名
      */
     updateBy: string
 
     /**
      * 领域主键
      */
     territoryId: string
 
     key: string
 
 }
 
 export interface TerritoryDTO {
 
     /**
      * 领域编码
      */
     code: string
 
     /**
      * 领域文号
      */
     docNumber: string
 
     /**
      * 领域下条线名称
      */
     lineName: string
 
     /**
      * 更新是按
      */
     updateTime: string
 
     /**
      * 领域备注
      */
     remark: string
 
     /**
      * 排序值 值越大越靠前
      */
     sort: number
 
     /**
      * 标记类 1为领域 2为条线
      */
     type: string
 
     title: string
 
     leaf: boolean
 
     /**
      * 是否公示, 1=是 0=否
      */
     isPub: string
 
     /**
      * 是否执法领域, 1=是 0=否
      */
     isLawEnforcement: string
 
     /**
      * 领域下条线编码
      */
     lineCode: string
 
     /**
      * 创建人
      */
     createBy: string
 
     /**
      * 是否有效 1失效 0 有效
      */
     deleted: string
 
     /**
      * 1 统筹领域 2自建领域
      */
     tcTerritory: string
 
     /**
      * 创建时间
      */
     createTime: string
 
     /**
      * 修改人
      */
     updateBy: string
 
     children: LineDTO[]
 
     /**
      * 领域名称
      */
     name: string
 
     /**
      * 领域主键
      */
     territoryId: string
 
     key: string
 
 }
 
 export interface Territory {
 
     /**
      * 领域编码
      */
     code: string
 
     /**
      * 领域文号
      */
     docNumber: string
 
     /**
      * 条线id
      */
     lineId: string
 
     /**
      * 备注
      */
     remark: string
 
     /**
      * 更新是按
      */
     updateTime: string
 
     /**
      * 排序值 值越大越靠前
      */
     sort: number
 
     /**
      * 是否公示, 1=是 0=否
      */
     isPub: string
 
     /**
      * 是否执法领域, 1=是 0=否
      */
     isLawEnforcement: string
 
     /**
      * 创建人
      */
     createBy: string
 
     /**
      * 是否删除 1 是  0 否
      */
     deleted: string
 
     /**
      * 1 统筹领域 2自建领域
      */
     tcTerritory: string
 
     /**
      * 创建时间
      */
     createTime: string
 
     /**
      * 修改人
      */
     updateBy: string
 
     /**
      * 领域名称
      */
     name: string
 
     /**
      * 领域主键
      */
     territoryId: string
 
     /**
      * 领域编码 对应领域code
      */
     key: string
 
 }
 
 export interface UserHasPositionsDto {
 
     /**
      * 机构所在区划
      */
     innerOrgAreaCode: string
 
     /**
      * 办公电话
      */
     innerOrgShortName: string
 
     /**
      * 办公电话
      */
     govEmpposPhoneNo: string
 
     /**
      * 是否主职
      */
     mainJob: string
 
     /**
      * 任职所在单位
      */
     empPosUnitCode: string
 
     /**
      * 内部机构编码
      */
     innerOrgCode: string
 
     /**
      * 员工编码
      */
     employeeCode: string
 
     /**
      * 部门名称
      */
     innerDeptShortName: string
 
     /**
      * 所在内设机构
      */
     empposInnerInstitutionCode: string
 
     /**
      * 内部机构编码对应浙政钉组织编码
      */
     innerOrgZzdOrgCode: string
 
     /**
      * 部门编码
      */
     organizationCode: string
 
     /**
      * 部门代码
      */
     innerDeptCode: string
 
     /**
      * 任职
      */
     govEmpPosJob: string
 
     /**
      * 任职状态，A有效，F无效
      */
     status: string
 
 }
 
 export interface ZzdUserInfo {
 
     /**
      * 姓名
      */
     lastName: string
 
     /**
      * 人员code
      */
     employeeName: string
 
     /**
      * 租户id
      */
     realmId: string
 
     /**
      * 应用标识
      */
     clientId: string
 
     /**
      * 组织机构名称
      */
     organizationName: string
 
     /**
      * 租户名
      */
     realmName: string
 
     /**
      * 手机
      */
     mobile: string
 
     /**
      * 昵称
      */
     nickNameCn: string
 
     /**
      * 员工在当前企业内的唯一标识
      */
     tenantUserId: string
 
     /**
      * 人员code
      */
     employeeCode: string
 
     /**
      * 账号id
      */
     accountId: string
 
     /**
      * 机构简称
      */
     organizationShortName: string
 
     /**
      * 租户名
      */
     tenantName: string
 
     /**
      * 组织机构
      */
     organizationCode: string
 
     /**
      * 组织机构部门code
      */
     organizationDeptCode: string
 
     /**
      * 组织机构部门名称
      */
     organizationDeptName: string
 
     /**
      * 账号类型标识
      */
     namespace: string
 
     /**
      * 租户id
      */
     tenantId: string
 
     /**
      * 浙政钉机构信息
      */
     positionsList: UserHasPositionsDto[]
 
     /**
      * 登录账号
      */
     account: string
 
 }
 
 export interface UserDTO {
 
     /**
      * 是否完成初始化（如果为false需要引导用户自助申请部门入驻）
      */
     haveInitialize: boolean
 
     /**
      * 用户部门名称
      */
     deptName: string
 
     /**
      * 用户条线集合树
      */
     permissionTerritoryLineTree: TerritoryDTO[]
 
     /**
      * 政务钉钉用户id
      */
     zzdAccountId: string
 
     /**
      * 第一次登录标签，0 第一次登录
      */
     firstLoginFlag: string
 
     /**
      * 是否设置过密码
      */
     hasPassword: string
 
     /**
      * 行政执法用户机构编码
      */
     xzzfOrgCode: string
 
     /**
      * type
      */
     type: string
 
     /**
      * 机构简称
      */
     organizationShortName: string
 
     /**
      * 机构类型 0政府机构 1企业机构
      */
     orgType: string
 
     zwdAccountId: string
 
     /**
      * 用户权限领域集合
      */
     permissionTerritoryList: Territory[]
 
     /**
      * 登录用户名
      */
     loginName: string
 
     /**
      * 用户主职机构编码
      */
     mainOrgCode: string
 
     /**
      * 用户机构名称
      */
     orgName: string
 
     /**
      * 机构类型 0政府机构 1企业机构
      */
     OrgSubType: string
 
     /**
      * 组织机构名称
      */
     organizationName: string
 
     /**
      * PC 登录状态
      */
     pcLoginFlag: string
 
     /**
      * 区划层级 1 省 2 市 3 县/区
      */
     level: string
 
     /**
      * 执法人员数量
      */
     zfPeopleNum: number
 
     /**
      * 是否是管理员 1 是 0 否
      */
     isAdmin: string
 
     /**
      * 人员总数
      */
     peopleNum: number
 
     /**
      * 区划编码
      */
     areaCode: string
 
     /**
      * 用户主职部门编码
      */
     mainDeptCode: string
 
     /**
      * 组织机构code
      */
     organizationCode: string
 
     /**
      * 手机号
      */
     phone: string
 
     /**
      * 组织机构部门名称
      */
     organizationDeptName: string
 
     /**
      * 用户部门编码
      */
     deptCode: string
 
     /**
      * 是否展示机构选择0否1是默认1
      */
     showSwitch: string
 
     /**
      * 用户数据权限部门集合
      */
     permissionDeptList: string[]
 
     /**
      * 系统类型（0本系统 1统一办案系统）
      */
     sysType: string
 
     /**
      * 当前部门名称
      */
     currentDeptName: string
 
     /**
      * 当前是否主职
      */
     mainJob: boolean
 
     /**
      * 前端遍历title
      */
     title: string
 
     /**
      * 机构编码
      */
     orgId: string
 
     /**
      * 员工编码
      */
     employeeCode: string
 
     /**
      * 管辖单位
      */
     manageCode: string
 
     /**
      * 用户主职部门名称
      */
     mainDeptName: string
 
     /**
      * 组织机构部门code
      */
     organizationDeptCode: string
 
     /**
      * 当前部门编码
      */
     currentDeptCode: string
 
     /**
      * 门户用户机构编码
      */
     orgCode: string
 
     /**
      * 用户权限区划集合
      */
     permissionAreaList: string[]
 
     /**
      * 数据权限3 全省2 树型  1 本级及下级 0 本级',
      */
     dataPermissionType: string
 
     /**
      * 数据权限条线集合
      */
     lineCodeList: string[]
 
     /**
      * app 菜单权限
 1高层领导 > 2执法领导 > 3执法人员 > 4辅助人员
 对应：member_role 表 > role_identity APP角色身份类型字段
      */
     roleLevel: string
 
     /**
      * 执法人员开通app数量
      */
     zfAppPeopleNum: number
 
     /**
      * 当前机构编码
      */
     currentOrgCode: string
 
     /**
      * 前端遍历key
      */
     key: string
 
     /**
      * 性别 1 男 2 女 3 其它
      */
     sex: string
 
     /**
      * 用户权限机构集合
      */
     permissionOrgList: string[]
 
     /**
      * 用户执法人员头像
      */
     zfHeadPath: string
 
     /**
      * 用户头像
      */
     avatar: string
 
     /**
      * 用户部门类型
      */
     deptType: string
 
     /**
      * 用户id
      */
     userId: string
 
     /**
      * 行政执发deptCode
      */
     xzzfDeptCode: string
 
     /**
      * 用户真实姓名
      */
     realName: string
 
     /**
      * 用户角色id
      */
     roleIds: string[]
 
     /**
      * 管理员角色
      */
     adminIdList: string[]
 
     /**
      * 浙政钉组织基本信息
      */
     zzdUserInfo: ZzdUserInfo
 
     /**
      * 权限区划树
      */
     areaTree: string
 
     /**
      * 用户主职机构名称
      */
     mainOrgName: string
 
     /**
      * 系统code
      */
     applicationCode: string
 
 }
 
 export interface LoginDTO {
 
     applicationTypeList: ApplicationTypeDTO[]
 
     user: UserDTO
 
     xzzfToken: string
 
     /**
      * 菜单列表
      */
     applicationMenuList: ApplicationMenuTreeDTO[]
 
     token: string
 
 }
 
 export interface Result_1 {
 
     /**
      * 返回编码.200=成功
      */
     code: number
 
     /**
      * 返回信息
      */
     message: string
 
     /**
      * 返回数据
      */
     data: any
 
     /**
      * 错误信息
      */
     errors: ErrorInfo[]
 
 }
 
 export interface UserHasOrgDTO {
 
     /**
      * 机构名称
      */
     deptName: string
 
     /**
      * 机构编码
      */
     orgCode: string
 
     /**
      * 部门-简称
      */
     deptShortName: string
 
     /**
      * 机构简称
      */
     orgShortName: string
 
     /**
      * 职务
      */
     position: string
 
     /**
      * 是否主职
      */
     mainJob: boolean
 
     /**
      * 是否当前选中机构
      */
     selectedOrg: boolean
 
     /**
      * 部门code
      */
     deptCode: string
 
     /**
      * 任务数
      */
     taskNum: number
 
     /**
      * 是否禁用 0 否 1 是
      */
     enabled: string
 
     /**
      * 是否有效 0有效 1无效
      */
     status: string
 
 }
 
 export interface JSONObject {
 
     map: {[key: string]: any}
 
 }
 
 