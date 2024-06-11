/**
 * @file API：/workExamine
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 查询代办数量
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function getTodoCount(data?: {
id?: string, 
username?: string, 
password?: string, 
passwordSalt?: string, 
identity?: string, 
realName?: string, 
email?: string, 
createTime?: string, 
lastLoginTime?: string, 
status?: string, 
desc?: string, 
cerno?: string, 
employeeType?: string, 
post?: string, 
organizationCode?: string, 
workStatus?: string, 
phone?: string, 
cernoType?: string, 
userLoginNum?: number, 
lastModifyPwdTime?: string, 
roleLev?: string, 
roles?: string[], 
orgCode?: string, 
orgName?: string, 
simpleName?: string, 
roleName?: string, 
sort?: string, 
parentCode?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<MyToDoCount>>({
        url: "/workExamine/getTodoCount",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 我的待办分页列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function getWaitPage(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
/** 客户名称 */ cusName?: string, 
/** 企业统一社会信用代码 */ unicode?: string, 
/** 客户号 */ cuidcsid?: string, 
/** 审批类型：1-授信审批；2-用信审批；3-贷后审批 */ examineType?: string, 
/** 整个流程审批状态：0-审批中；1-退回；2-否决；3-审批通过 */ examineStatus?: string, 
/** 更新日期-开始 */ updateTimeStart?: string, 
/** 更新日期-结束 */ updateTimeEnd?: string, 
/** 后台赋值 */ isDeal?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<WorkExaminePageVo>>>({
        url: "/workExamine/getWaitPage",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 我的已办分页列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function getCompletePage(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
/** 客户名称 */ cusName?: string, 
/** 企业统一社会信用代码 */ unicode?: string, 
/** 客户号 */ cuidcsid?: string, 
/** 审批类型：1-授信审批；2-用信审批；3-贷后审批 */ examineType?: string, 
/** 整个流程审批状态：0-审批中；1-退回；2-否决；3-审批通过 */ examineStatus?: string, 
/** 更新日期-开始 */ updateTimeStart?: string, 
/** 更新日期-结束 */ updateTimeEnd?: string, 
/** 后台赋值 */ isDeal?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<WorkExaminePageVo>>>({
        url: "/workExamine/getCompletePage",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 审批日志
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function getApprovalLogList(data?: {
/** 审批流程实例id */ instanceId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<ApprovalLogVo[]>>({
        url: "/workExamine/getApprovalLogList",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 集团报告审批状态，包含子报告
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function getGroupApprovalState(data?: {
/** 集团报告id */ reportId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<GroupReportApprovalStateVo>>({
        url: "/workExamine/getGroupApprovalState",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 授信代办报告代办审批-(封装审批流接口)
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function reportAudit(data?: {
/** 客户名称 */ taskRequest?: CompleteTask, 
/** 授信落实条件json */ ImplementationConditions?: string, 
/** 报告id */ reportId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result_1>({
        url: "/workExamine/reportAudit",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 查询审批通过授信落实条件查询
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function getImplementationConditions(data?: {
/** 报告id */ reportId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/workExamine/getImplementationConditions",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 判断是否配置审批决策权
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function getAdvanceFinishInstanceState(data?: {
delegationState?: any, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result_1>({
        url: "/workExamine/getAdvanceFinishInstanceState",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 结束代办
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function advanceFinishInstance(data?: {
/** 流程实例 */ instanceId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result_1>({
        url: "/workExamine/advanceFinishInstance",
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

export interface MyToDoCount {

    /**
     * 代办总数（个人企业一起）
     */
    allCount: number

    /**
     * 企业代办总数
     */
    entCount: number

    /**
     * 个人代办总数（外部接口提供）
     */
    personCount: number

}

export interface PageResponse<T> {

    /**
     * 总记录数
     */
    total: string

    /**
     * 总页数
     */
    pages: number

    /**
     * 返回的分页数据对象
     */
    data: T[]

}

export interface WorkExaminePageVo {

    /**
     * 归属机构
     */
    deptName: string

    /**
     * 客户名称
     */
    cusName: string

    /**
     * 客户经理名称
     */
    accountName: string

    /**
     * 整个流程审批状态：0-审批中；1-退回；2-否决；3-审批通过
     */
    examineStatus: string

    /**
     * 报告配置页面queryId，非报告类代办详情页唯一查询参数
     */
    queryId: string

    /**
     * 报告类型：1 授信小额，2 授信大额 ，3 授信集团
     */
    reportType: string

    pripid: string

    /**
     * 实例id
     */
    instanceId: string

    /**
     * 审批人名称
     */
    examineUserName: string

    /**
     * 报告审批状态 (0:草稿1:待提交,2:已存档;3:待复核;4:待审批;5:审批中;6:审批通过;7：已退回);
     */
    reportState: string

    /**
     * id
     */
    id: number

    /**
     * 审批人id
     */
    examineUserId: string

    /**
     * 当前流程节点信息
     */
    processNodes: string

    /**
     * 授信落实条件json
     */
    implementationConditions: string

    /**
     * 审批时间
     */
    examineTime: string

    /**
     * 关联集团报告编号
     */
    relatedGroupReportId: string

    /**
     * 报告编号
     */
    reportId: string

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 审批类型：1-授信审批；2-用信审批；3-贷后审批
     */
    examineType: string

    /**
     * 当前节点处理状态：0-未处理；1-退回；3-通过
     */
    dealStatus: string

    /**
     * 客户内码
     */
    khnm: string

    /**
     * 客户经理id(创建人)
     */
    accountId: string

    /**
     * 客户号
     */
    cuidcsid: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 统一社会信用代码
     */
    unicode: string

    /**
     * 关联审查审批报告id
     */
    relateApproveReportId: string

    /**
     * 任务id
     */
    taskId: string

    /**
     * 归属机构编码
     */
    deptCode: string

}

export interface ApprovalLogVo {

    /**
     * 当前节点处理状态：0-未处理；1-退回；3-通过
     */
    dealStatus: string

    /**
     * 当前流程节点信息
     */
    processNodes: string

    /**
     * 审批人名称
     */
    examineUserName: string

    /**
     * 审批时间(第一个节点为提交时间)
     */
    examineTime: string

}

export interface GroupReportChildVo {

    /**
     * 报告编号
     */
    reportId: string

    /**
     * 客户名称
     */
    cusName: string

    /**
     * 审批类型：1-授信审批；2-用信审批；3-贷后审批
     */
    examineType: string

    /**
     * 当前节点处理状态：0-未处理；1-退回；3-通过
     */
    dealStatus: string

    /**
     * 整个流程审批状态：0-审批中；1-退回；2-否决；3-审批通过
     */
    examineStatus: string

    /**
     * 客户内码
     */
    khnm: string

    /**
     * 报告配置页面queryId，非报告类代办详情页唯一查询参数
     */
    queryId: string

    /**
     * 报告类型：1 授信小额，2 授信大额 ，3 授信集团
     */
    reportType: string

    /**
     * 统一社会信用代码
     */
    pripid: string

    /**
     * 客户号
     */
    cuidcsid: string

    /**
     * 是否与主报告同步，1 是 0 否，不同步显示待审核
     */
    ifAsynchronous: string

    /**
     * 实例id
     */
    instanceId: string

    /**
     * 审批人名称
     */
    examineUserName: string

    /**
     * 统一社会信用代码
     */
    unicode: string

    /**
     * 报告审批状态
     */
    reportState: string

    /**
     * 审批人id
     */
    examineUserId: string

    /**
     * 当前流程节点信息
     */
    processNodes: string

    /**
     * 任务id
     */
    taskId: string

}

export interface GroupReportApprovalStateVo {

    /**
     * 当前集团报告审批是否暂停 1是，0 否,暂停状态审批按钮置灰，不可点击
     */
    ifPause: string

    /**
     * 当前集团报告子报告审批信息
     */
    groupReportChildVos: GroupReportChildVo[]

}

export interface CompleteTask {

    nodeName: string

    dealUserId: string

    variables: {[key: string]: any}

    nextAssigneeId: string

    nextAssigneeName: string

    sendMessage: string

    businessStatus: string

    variablesLocal: {[key: string]: any}

    businessKey: string

    commentType: string

    transientVariables: {[key: string]: any}

    comment: string

    taskId: string

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

