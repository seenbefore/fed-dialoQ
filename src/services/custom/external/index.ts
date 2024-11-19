import { ExAxiosRequestConfig } from 'icinfo-request'
import http from '@/scripts/http'
import { httpPDFURL } from '@/scripts/http'
const defaultOptions = {
    outToken: true,
}
/**
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function checkSensitiveContent(
    data?: {
        /** 要校验的文本内容 */ toBeCheckedText: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<DataType[]>>({
        url: '/external/nation/population/checkSensitiveContent',
        type: 'POST',
        contentType: 'application/json',
        data,
        ...options,
    })
}
/**
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getHelpLabels(
    data?: {
        /**身份证号*/ idCard?: string
        /**年*/ year?: string
        /**月*/ month?: string
        /**帮扶类型: 0 个人  1 单位*/ type?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/punish/ucase/help/manage/getHelpLabels',
        type: 'POST',
        contentType: 'application/json',
        data,
        ...options,
    })
}
/**
 * 校验是否有预调查记录
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function checkExistPreSurveyRecord(/**身份证号*/ idCard: string, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/punish/csource/manage/checkExistPreSurveyRecord',
        type: 'POST',
        contentType: 'application/json',
        data: { idCard },
        ...options,
    })
}
/**
 * 获取pdf流 全系统统一更换为获取流 然后预览pdf
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function visit(/**加密参数*/ data?: { fileUrlEncrypt: string }, options?: ExAxiosRequestConfig) {
    return httpPDFURL.request<Result<{ fileType: string; fileByte: string }>>({
        url: '/publish/file/visit',
        type: 'GET',
        data,
        ...options,
    })
}

/**
 * 【V1.12.5】描述： 根据当事人获取一年内的责令改正记录
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getInstructToCorrectRecordByIdentityCode(
    data?: {
        /**当事人身份编号 */
        identityCode: string
        /**当事人类型 */
        partyType: string
        /**责令改正记录类型 1:责令改正通知书 / 2:责令改正情况复查记录 */
        correctRecordType: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<Record<string, any>>>({
        url: '/punish/ucase/case/main/document/record/getInstructToCorrectRecordByIdentityCode',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 【V1.12.5】描述： 根据案件获取责令改正记录
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getInstructToCorrectRecordByCaseId(
    data?: {
        /**案件id */
        caseId: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<Record<string, any>>>({
        url: '/punish/ucase/case/main/document/record/getInstructToCorrectRecordByCaseId',
        type: 'GET',
        data,
        ...options,
    })
}
/**
 * 【V1.12.5】描述： 获取责令改正情况复查记录表单数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getCaseDocumentCorrectReviewRecordFormData(
    data?: {
        /**案件id */
        caseId: string
        /**文书id */
        documentId: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<Record<string, any>>>({
        url: '/punish/ucase/correct/review/getCaseDocumentCorrectReviewRecordFormData',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 【V1.12.5】描述： 文书作废
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function cancelDocumentRecordById(
    data?: {
        /**文书id */
        documentId: string
        /**文书来源 1:案件 2:案源 */
        documentSource: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<Record<string, any>>>({
        url: '/punish/ucase/case/main/document/record/cancelDocumentRecordById',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 【V1.12.5】描述： 根据检查文书Id获取访问信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getFileVisitByFileId(
    data?: {
        /**文件加密id */
        fileId: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<Record<string, any>>>({
        url: '/peripheralInterface/taskCenter/getFileVisitByFileId',
        type: 'GET',
        data,
        ...options,
    })
}

/**
 * 省简案快办默认获取上一个案件的协办人
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getDefHandle(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<Array<IDefHandle>>>({
        url: '/punish/common/getDefHandle',
        type: 'GET',
        data,
        ...options,
    })
}

/**
 * 判断当前当事人是否已经做了一份首违不罚承诺书
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function checkPartyIsFirstIllegality(
    data?: {
        caseReasonCodes: Array<string>
        partyType: string
        partyIdentityCode: string
        partyIdentityType: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<any>({
        url: '/punish/ucase/case/firstIllegality/checkPartyIsFirstIllegality',
        type: 'POST',
        contentType: 'application/json',
        data,
        ...options,
    })
}
/**
 * 【V1.13.4】描述： 查询更正公示表单数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getPublicityModifyFormData(
    data?: {
        caseId: string
        partyId: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<any>({
        url: '/punish/common/publicity/modifyRecord/getPublicityModifyFormData',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 【V1.13.4】描述： 查询更正公示表单数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function savePublicityModifyFormData(data?: IPublicityModifyFormData, options?: ExAxiosRequestConfig) {
    return http.request<any>({
        url: '/punish/common/publicity/modifyRecord/savePublicityModifyFormData',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 【V1.13.4】描述： 姓名脱敏
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function partiesEncryption(data?: Record<string, any>, options?: ExAxiosRequestConfig) {
    return http.request<any>({
        url: '/punish/common/publicity/modifyRecord/partiesEncryption',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * @description: 操作日志保存接口
 * @param {*} data
 * @param {ExAxiosRequestConfig} options
 * @return {*}
 */
export function saveModifyField(data?: { model: string; modifyList: Array<IModifyField> }, options?: ExAxiosRequestConfig) {
    return http.request<any>({
        url: '/saveModifyField',
        type: 'post',
        data: data,
        ...options,
    })
}
/**
 * @description: 新的送达保存接口
 * @param {*} data
 * @param {ExAxiosRequestConfig} options
 * @return {*}
 */
export function electricSentReceipt(data?: IElectricSentReceiptData, options?: ExAxiosRequestConfig) {
    return http.request<any>({
        url: '/punish/common/electric/sent/flow/electricSentReceipt',
        type: 'post',
        data: data,
        ...options,
    })
}
/**
 * @description: 【V2.0.3】描述： 获取是否展示确认公示部门名称取文书抬头提醒
 * @param {*} data
 * @param {ExAxiosRequestConfig} options
 * @return {*}
 */
export function getIsShowConfirmOrgStandardNameRemind(data?: Obj, options?: ExAxiosRequestConfig) {
    return http.request<any>({
        url: '/punish/config/deptParam/getIsShowConfirmOrgStandardNameRemind',
        type: 'get',
        data: data,
        ...options,
    })
}
/**
 * @description: 【V2.0.3】描述： 确认公示部门名称取文书抬头提醒
 * @param {*} data
 * @param {ExAxiosRequestConfig} options
 * @return {*}
 */
export function saveConfirmOrgStandardNameRemind(data?: Obj, options?: ExAxiosRequestConfig) {
    return http.request<any>({
        url: '/punish/config/deptParam/saveConfirmOrgStandardNameRemind',
        type: 'get',
        data: data,
        ...options,
    })
}
/**
 * @description: 【V2.0.3】描述： 保存文书附件
 * @param {*} data
 * @param {ExAxiosRequestConfig} options
 * @return {*}
 */
export function saveDocCaseAppendixRecordList(data?: Obj, options?: ExAxiosRequestConfig) {
    return http.request<any>({
        url: '/punish/ucase/case/main/attachment/saveDocCaseAppendixRecordList',
        type: 'post',
        data: data,
        ...options,
    })
}
/**
 * @description: 【V2.0.3】描述： 获取文书附件
 * @param {*} data
 * @param {ExAxiosRequestConfig} options
 * @return {*}
 */
export function getDocCaseAppendixRecordList(data?: IDocCaseAppendData, options?: ExAxiosRequestConfig) {
    return http.request<any>({
        url: '/punish/ucase/case/main/attachment/getDocCaseAppendixRecordList',
        type: 'post',
        data: data,
        ...options,
    })
}
/**
 * @description: 通过手机短信签字
 * @param {*} data
 * @param {ExAxiosRequestConfig} options
 * @return {*}
 */
export function sendSignDocumentSms(data?: { documentId: string }, options?: ExAxiosRequestConfig) {
    return http.request<any>({
        url: '/punish/common/electric/sent/flow/sendSignDocumentSms',
        type: 'get',
        data: data,
        ...options,
    })
}
/**
 * @description: 【2.2.0】描述： 简案快办决定复核通过
 * @param {*} data
 * @param {ExAxiosRequestConfig} options
 * @return {*}
 */
export function doFastCaseDecideRecheck(data?: { recheckRecordId: string; caseId: string; opinion: string; documentCatalogCode: string }, options?: ExAxiosRequestConfig) {
    return http.request<any>({
        url: '/waitAudit/doFastCaseDecideRecheck',
        type: 'post',
        data: data,
        ...options,
    })
}
/**
 * @description: 【2.1.0】文旅条线获取处罚事项
 * @param {*} data
 * @param {ExAxiosRequestConfig} options
 * @return {*}
 */
export function getWlCaseReasonApi(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<any>({
        url: '/external/nation/wl/getCaseReason',
        type: 'get',
        data: data,
        ...options,
    })
}
/**
 * @description: 【2.3.1】获取前往浙江省文化市场执法在线的code
 * @param {*} data
 * @param {ExAxiosRequestConfig} options
 * @return {*}
 */
export function getLoginAuthCode(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<any>({
        url: '/peripheralInterface/taskCenter/getLoginAuthCode',
        type: 'get',
        data: data,
        ...options,
    })
}

/**
 * 【V1.4.1】描述：案件详情左边案件目录查询（新）
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author tianrunjia
 */
export function getElectricArchiveList(
    data?: {
        /** 案件id */ caseId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<Obj[]>>({
        url: '/punish/ucase/archive/getElectricArchiveList',
        type: 'GET',
        data,
        ...options,
    })
}
/**
 * 【V2.5.5】描述： 保存送达地址确认书-生态条线-提交
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author tianrunjia
 */
export function saveDocInfoWithSendInfoConfirm(data?: SendInfoConfirm, options?: ExAxiosRequestConfig) {
    return http.request<Result<Obj>>({
        url: '/punish/ucase/case/investigate/sendInfoConfirm/saveDocInfoWithSendInfoConfirm',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 【V2.5.5】描述： 保存送达地址确认书-生态条线-暂存
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author tianrunjia
 */
export function saveTemporaryWithSendInfoConfirm(data?: SendInfoConfirm, options?: ExAxiosRequestConfig) {
    return http.request<Result<Obj>>({
        url: '/punish/ucase/case/investigate/sendInfoConfirm/saveTemporaryWithSendInfoConfirm',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 【V2.5.5】描述： 保存送达地址确认书-生态条线
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author tianrunjia
 */
export function getDocDataWithSendInfoConfirm(data?: Pick<SendInfoConfirm, 'caseId' | 'documentCatalogCode' | 'partyId'>, options?: ExAxiosRequestConfig) {
    return http.request<Result<SendInfoConfirm>>({
        url: '/punish/ucase/case/investigate/sendInfoConfirm/getDocDataWithSendInfoConfirm',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V2.6.0】描述： 校验生态条线当前登录用户是否有立案权限
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author xuzhimin
 */
export function checkHasCaseHandleAuth(data?: Obj, options?: ExAxiosRequestConfig) {
    return http.request<Result<Obj>>({
        url: '/punish/config/caseHandleAuth/checkHasCaseHandleAuth',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 【V2.6.0】描述： 审批环节是否分配经办人(审批链上面显示)
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author xuzhimin
 */
export function isAssignedHandlerByApproval(data?: { caseId: string; documentCatalogCode: string; partyId: string }, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: '/distribution/isAssignedHandlerByApproval',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 【V2.6.0】描述： 案件承办人角色首页办案是否弹窗提醒
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author xuzhimin
 */
export function isPopUpRemind(data?: Obj, options?: ExAxiosRequestConfig) {
    return http.request<Result<Obj>>({
        url: '/punish/homePage/messagePrompt/isPopUpRemind',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 【V2.6.0】描述： 更新案件承办人角色首页办案弹窗提醒状态
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author xuzhimin
 */
export function updatePopUpRemindStatus(data?: Obj, options?: ExAxiosRequestConfig) {
    return http.request<Result<Obj>>({
        url: '/punish/homePage/messagePrompt/updatePopUpRemindStatus',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 修改加处罚款封顶提醒状态
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function updateAddCfkCappingRemindStatus(data?: IRemindStatus, options?: ExAxiosRequestConfig) {
    return http.request<Result<Record<string, any>>>({
        url: '/punish/ucase/zzdMsg/updateAddCfkCappingRemindStatus',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 强制事项物品清单的保存文书接口
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function saveWpqdDocInfo(data?: Obj, options?: ExAxiosRequestConfig) {
    return http.request<Result<Record<string, any>>>({
        url: '/punish/ucase/temporary/saveWpqdDocInfo',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 强制事项物品清单的暂存文书接口
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function saveWpqdTemporary(data?: Obj, options?: ExAxiosRequestConfig) {
    return http.request<Result<Record<string, any>>>({
        url: '/punish/ucase/temporary/saveWpqdTemporary',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 获取临海强制事项的物品清单接口
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getCaseAttachments(data?: Obj, options?: ExAxiosRequestConfig) {
    return http.request<Result<Record<string, any>>>({
        url: '/punish/ucase/case/main/attachment/getCaseAttachments',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 获取是否临海强制事项的案件
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getIsLhForce(data?: { caseId: string }, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: '/punish/common/getIsLhForce',
        type: 'POST',
        data,
        ...options,
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

export interface DataType {
    /**建议采用的标准文本 */
    suggestText: string
    /**原文中可能存在的错误部分 */
    textWithError: string
}
export interface IDefHandle {
    handlePersonName: string
    handlePersonType: string
    handlePersonId: string
    handlePersonTel: string
    handleOrgName: string
    handleOrgCode: string
    handleOrgTel: string
    handleDeptName: string
    handleDeptCode: string
    handleDeptTel: string
    handleSignPic: string
    dingId: string
    lawEnforcementCert: string
}

export interface IPublicityModifyFormData {
    /**案件id */
    caseId: string
    /**当事人id -- 多当事人分别处罚必传 */
    partyId: string
    /**是否更正案件公示名称 1:是 0:否 */
    isModifyPublicityCaseName: '1' | '0'
    /**新公示案件名称 */
    newPublicityCaseName: string
    /**是否更正处罚结果公开内容 1:是 0:否 */
    isModifyPublicityContent: '1' | '0'
    /**新处罚结果公开内容 */
    newPublicityContent: string
}

export interface IModifyField {
    text: string
    before: string
    after: string
}
export interface IElectricSentReceiptData {
    /**文书id */
    documentId: string
    /**收件人名称 */
    receiverName: string
    /**收件人电话 */
    receiverAccount: string
}

export interface IDocCaseAppendData {
    caseId: string
    documentCatalogCode: string
    partyId: string
}

export interface SendPersonInfo {
    mobile: string
    postCode: string
    isSelectSendPerson: string // 通常这里可能是number类型，如1或0，但根据你给的JSON使用了string
    pickPerson: string
    sendAddress: string
}

export interface ReceiverInfo {
    receiverAddress: string
    receiver: string
    receiverPostCode: string
    receiverMobile: string
    isSelectReceiver: string // 同样，这里可能是number类型
    receiverRelation: string
}

export interface PickEmail {
    isSelect: string
    email: string
}

export interface PickMobile {
    mobile: string
    isSelect: string
}

export interface PickOtherCode {
    otherCode: string
    isSelect: string
}

export interface PickFax {
    fax: string
    isSelect: string
}

export interface ElectronicDeliveryInfo {
    pickEmail: PickEmail
    pickMobile: PickMobile
    isAgreeElectronic: string // 可能是number类型
    pickOtherCode: PickOtherCode
    pickFax: PickFax
}

export interface SendInfoConfirm {
    caseId: string
    documentCatalogCode: string
    partyId: string
    sendPersonInfo: SendPersonInfo
    receiverInfo: ReceiverInfo
    electronicDeliveryInfo: ElectronicDeliveryInfo
    otherLinkType: string
    remark: string
}

export interface IRemindStatus {
    /**案件id */
    caseId: string
    /**当事人id */
    partyId?: string
    /**文书目录编码 */
    documentCatalogCode?: string
    /**页面标识：1：加处罚款封顶提醒 2：加处罚款确定计算提醒 */
    viewFlag?: string
    /**分期期数 */
    paymentSort?: number
    /**是否分期 */
    delayInstallmentType?: string
    /**dingid */
    dingId?: string
}
