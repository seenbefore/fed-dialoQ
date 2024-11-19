/**
 * @file API：/punish/execute/doc
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import http from '@/scripts/http'

/**
 * 测试用
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function testDoc(
    data?: {
        /** 案件id（前端修改的时候caseId不能为空） */ caseId?: string
        /** 案件名称 */ caseName?: string
        /** 案件来源id */ caseSourceId?: string
        /** 案件来源 */ caseSource?: string
        /** 案件来源补充来源id */ caseSourceReplenishId?: string
        /** 案件来源补充来源描述 */ caseSourceReplenishDesc?: string
        /** 案件来源补充来源 */ caseSourceReplenish?: string
        /** 案件简要情况 */ caseConciseCondition?: string
        /** 案发时间 */ caseHappenTime?: string
        /** 移送单位统一社会信用代码 */ transferUnitUniscid?: string
        /** 移送单位 */ transferUnit?: string
        /** 移送人 */ transferPerson?: string
        /** 移送人手机号码 */ transferPhone?: string
        /** 案发地详情（完整） */ caseHappenAddress?: string
        /** 案发地(中文) */ caseHappenAddressDetail?: string
        /** 案发地区域编码 */ caseHappenAddressAreaCode?: string
        /** 案发地区区域名称（中文数组）
新增回显参数--不做使用，仅作回显 */ caseHappenAddressAreaNames?: string[]
        /** 办案人员列表 */ handlePersonInfoList?: CaseHandlePersonInfoDto[]
        /** 案件当事人个人信息列表 */ partiesPersonInfoList?: CaseRegisterPartiesPersonInfoDto[]
        /** 案件当事人法人信息列表 */ partiesLegalInfoList?: CaseRegisterPartiesLegalInfoDto[]
        /** 案由列表信息 */ caseReasonInfoList?: CaseReasonInfoDto[]
        /** 人设案由的ids（主键id集合）父级主键和子集主键为一个数据组， */ personReasonIds?: PersonReasonIds[]
        /** 人设案由的名称（名称name集合） */ personReasonNames?: string[]
        /** 条线编码 */ lineCode?: string
        /** 条线名称 */ lineName?: string
        /** 附件信息列表 */ appendixList?: AppendixDto[]
        /** 领域编码 */ caseTerritoryCode?: string
        /** 领域名称 */ caseTerritoryName?: string
        /** 关联文书列表 */ relatedDocumentList?: CaseRelateDocumentInfoDto[]
        /** 【前端不用传】案件案由、当事人类型；1：单案由单当事人 2：多案由单当事人 3：单案由多当事人 */ casePartiesReasonType?: string
        /** 【前端不用传】处置方式；1：合并处罚 2：分别处罚 */ handleType?: string
        /** 【前端不用传】当事人总数 */ partiesCount?: number
        /** 【前端不用传】案由总数 */ caseReasonCount?: number
        /** 【前端不用传】标准文书抬头 */ orgStandardName?: string
        /** 【前端不用传】当事人id,","隔开 */ partyIds?: string
        /** 【后端使用】 单个法人信息 */ legalInfoDto?: CaseRegisterPartiesLegalInfoDto
        /** 业务参数id */ busiParamId?: string
        /** 案件当事人个人信息列表(pdf内容) */ partiesPersonInfoForPdfList?: CaseRegisterPartiesPersonInfoDto[]
        /** 案件当事人法人信息列表(pdf内容) */ partiesLegalInfoForPdfList?: CaseRegisterPartiesLegalInfoDto[]
        /** 案源id */ caseSourceRegisterId?: string
        /** 数据来源应用id */ caseSourceAppId?: string
        /** 应急案由列表 */ caseEmergencyReasonList?: CaseEmergencyReasonInfoDto[]
        /** 应急案由名称(多案由，第一个案由+“等”)【后端使用】 */ caseEmergencyReasonName?: string
        /** 案发时间(yyyy年M月d日) 【后端使用】 */ caseHappenTimeStr?: string
        /** 人设案由的名称（生成文书用） */ personReasonName?: string
        /** 外部行政行为码 */ caseExternalActsCode?: string
        /** 条线类别编码(农业农村使用) */ lineTypeCode?: string
        /** 条线类别名称(农业农村使用) */ lineTypeName?: string
        /** 案件类型：1简易程序  2普通程序  3快速办理 */ caseType?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<string>>({
        url: '/punish/execute/doc/testDoc',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V1.4.2】描述：删除文书记录(裁执分离)
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author wuzhihui
 */
export function delExecuteDocumentRecordInfo(
    data?: {
        /** 裁执分离id */ executeId: string
        /** 文书Id */ documentId: string
        /** 当事人id */ partyId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<string>>({
        url: '/punish/execute/doc/delExecuteDocumentRecordInfo',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 描述：案源保存文书信息通用接口
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liyafeng
 */
export function saveExecuteDocInfo(
    data?: {
        /** 裁执分离id */ executeId: string
        /** 文书目录编码 */ documentCatalogCode: string
        /** 文书内容数据map */ dataMap: any
        /** 是否更新关联表;1 需要更新 ，0 无需更新 */ isUpdateRelationTable?: string
        /** 案件关闭信号 */ closeSignal?: string
        /** 文书状态 */ documentApprovalStatus?: string
        /** 所属文书id */ belongDocumentId?: string
        /** 是否获取空白文书(0-否/1-是) */ isGetBlankDoc?: string
        /** 是否一个案件id与文书目录编码对应多个文书记录（0-否/1-是） */ isMultipleDoc?: string
        /** 当事人id */ partyId?: string
        /** 文书种类编码 */ documentKindCode?: string
        /** 附件信息列表 */ appendixList?: AppendixDto[]
        /** 文书模板类型 1:标准2：窄幅（不传默认为标准） */ documentTemplateType?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<{ [key: string]: any }>>({
        url: '/punish/execute/doc/saveExecuteDocInfo',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 获取裁执分离文书html公共方法
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liyafeng
 */
export function getExecuteDocBaseInfo(
    data?: {
        /** 裁执分离id */ executeId: string
        /** 文书编码 */ documentCatalogCode: string
        /** 操作类型不能为空(1-新增/2-修改) */ operateType?: string
        /** 文书id */ documentId?: string
        /** 当事人id */ partyId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<DocumentCommonFormHtmlVo>>({
        url: '/punish/execute/doc/getExecuteDocBaseInfo',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 获取文书数据公共方法
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liyafeng
 */
export function getExecuteDocFormData(
    data?: {
        /** 裁执分离id */ executeId: string
        /** 文书编码 */ documentCatalogCode: string
        /** 操作类型不能为空(1-新增/2-修改) */ operateType?: string
        /** 文书id */ documentId?: string
        /** 当事人id */ partyId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<DocumentCommonFormDataVo>>({
        url: '/punish/execute/doc/getExecuteDocFormData',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 描述：根据文书目录编码获取法人或个人文件模板code
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author wuzhihui
 */
export function getTemplateCodeByDocumentCatalogCode(
    data?: {
        /** 文书目录编码 */ documentCatalogCode: string
        /** 案源id */ executeId: string
        /** 参数信息 */ paramMap?: { [key: string]: any }
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<string>>({
        url: '/punish/execute/doc/getTemplateCodeByDocumentCatalogCode',
        type: 'POST',
        data,
        ...options,
    })
}

export interface CaseHandlePersonInfoDto {
    /**
     * 办案人员签名
     */
    handleSignPic: string

    /**
     * 办案人员联系电话
     */
    handlePersonTel: string

    /**
     * 办案人员类型：1主办、2协办
     */
    handlePersonType: string

    /**
     * 办案人员dingId
     */
    dingId: string

    /**
     * 办案人员
     */
    handlePersonName: string

    /**
     * 办案所属机构电话
     */
    handleOrgTel: string

    /**
     * 办案部门名称
     */
    handleDeptName: string

    /**
     * 执法证号（一人多证时逗号分隔）
     */
    lawEnforcementCert: string

    /**
     * 办案人员id（用户id）
     */
    handlePersonId: string

    /**
     * 办案部门编码
     */
    handleDeptCode: string

    /**
     * 办案所属部门电话
     */
    handleDeptTel: string

    /**
     * 办案机构编码
     */
    handleOrgCode: string

    /**
     * 办案机构名称
     */
    handleOrgName: string
}

export interface CaseRegisterPartiesPersonInfoDto {
    /**
     * 当事人证件类型
     */
    certType: string

    /**
     * 当事人证件类型(名称)
     */
    certTypeName: string

    /**
     * 当事人证件类别+号码
     */
    certTypeAndCertNo: string

    /**
     * 字号名称
     */
    companyName: string

    /**
     * 出生日期字符串（年月日）
     */
    birthStr: string

    /**
     * 回显使用：详细地址
     */
    addressDetail: string

    /**
     * 主键id
     */
    id: string

    /**
     * 当事人Id
     */
    partyId: string

    /**
     * 当事人住址
     */
    address: string

    /**
     * 当事人工作单位
     */
    unitName: string

    /**
     * 是否
     */
    wasPlus: boolean

    /**
     * 工作单位及职务
     */
    unitNameAndJob: string

    /**
     * 当事人性别
     */
    sex: string

    /**
     * 当事人联系电话
     */
    mobile: string

    /**
     * 当事人出生年月
     */
    birth: string

    /**
     * 回显使用：地址区域
     */
    addressAreas: string[]

    /**
     * 单位地址
     */
    unitAddress: string

    sortNo: number

    /**
     * 当事人基本情况
     */
    partyBasicInfo: string

    /**
     * 统一社会信用代码
     */
    uniscid: string

    /**
     * 当事人证件号码
     */
    certNo: string

    /**
     * 当事人民族
     */
    nationality: string

    /**
     * 当事人姓名
     */
    name: string

    /**
     * 邮编
     */
    postCode: string
}

export interface CaseRegisterPartiesLegalInfoDto {
    /**
     * 单位单位名称
     */
    entName: string

    /**
     * 单位的地址--当事人法人
     */
    unitAddress: string

    /**
     * 统一社会信用代码--当事人法人
     */
    uniscid: string

    /**
     * 单位类型(1:法人 2:个体工商户 3:其他组织)
     */
    entType: string

    /**
     * 当事人基本情况
     */
    partyBasicInfo: string

    /**
     * 法人身份证--当事人法人
     */
    legalCertNo: string

    /**
     * （人社使用）单位行业类型-数据字典（RS_INDUSTRY_TYPE）
     */
    legalIndustryType: string

    /**
     * 工作单位的电话--当事人法人
     */
    phone: string

    /**
     * 法定代表人或负责人--当事人法人
     */
    legal: string

    /**
     * 邮编
     */
    postCode: string

    /**
     * 主键id
     */
    id: string

    /**
     * 工作单位的职务--当事人法人
     */
    job: string

    /**
     * 当事人Id
     */
    partyId: string

    /**
     * 经营地址
     */
    businessAddress: string

    /**
     * 法人证件类型--当事人法人
     */
    legalCertType: string
}

export interface CaseReasonInfoDto {
    /**
     * 案由领域名称
     */
    territoryName: string

    /**
     * 是否可填加
     */
    wasPlus: boolean

    /**
     * 案由领域编码
     */
    territoryCode: string

    /**
     * 违则详情
     */
    illegalDetail: string

    /**
     * 认领id
     */
    claimId: string

    /**
     * 案由名称
     */
    caseReasonName: string

    /**
     * 违则
     */
    illegalBasis: string

    /**
     * 案由编码 ,外部接口获取
     */
    caseReasonCode: string

    /**
     * 排序号
     */
    sortNo: number

    /**
     * 案由id ,外部接口获取
     */
    caseReasonId: string

    /**
     * 事项版本Code
     */
    itemVersionCode: string

    /**
     * 案由编码id，关联违则罚则
     */
    caseReasonNodeid: string

    /**
     * 案由ids,前端回显使用
     */
    caseReasonIds: string[]

    /**
     * 罚则详情
     */
    punishDetail: string

    /**
     * id
     */
    id: string

    /**
     * 后端使用，前端不用传
     */
    caseReasonRecordId: string

    /**
     * 罚则
     */
    punishBasis: string
}

export interface PersonReasonIds {
    caseReasonIds: string[]
}

export interface AppendixDto {
    /**
     * 案件附件名称
     */
    appendixName: string

    /**
     * 案件附件类型Id
     */
    appendixTypeId: string

    /**
     * 是否立案材料列表(0-否 1-是)
     */
    isMaterial: string

    /**
     * 案件附件地址
     */
    appendixUrl: string

    /**
     * 案件附件类型
     */
    appendixType: string
}

export interface CaseRelateDocumentInfoDto {
    /**
     * 文书类别：1审批表2法律文书
     */
    documentType: string

    /**
     * 文书文号
     */
    documentNumber: string

    /**
     * 文书目录编码
     */
    documentCatalogCode: string

    /**
     * 文书类型
     */
    documentCatalogName: string

    /**
     * 当事人名称
     */
    partyName: string

    /**
     * 书ID
     */
    documentId: string

    /**
     * 当事人身份编码
     */
    partyIdentityCode: string

    /**
     * 当事人身份证件类型
     */
    partyIdentityType: string

    /**
     * 当事人类型 1个人 2法人
     */
    partyType: string
}

export interface CaseEmergencyReasonInfoDto {
    /**
     * 应急案由名称
     */
    emergencyReasonName: string

    /**
     * 是否事故案由说明
     */
    remark: string

    /**
     * 事故等级(应急案由为事故类型时需要传)
     */
    accidentLevel: string
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

export interface DocumentCommonFormHtmlVo {
    /**
     * 模板字段配置
     */
    templateConfigMap: { [key: string]: any }

    /**
     * 模板code
     */
    templateCode: string

    /**
     * 模板code
     */
    templateName: string

    /**
     * html内容
     */
    htmlContent: string
}

export interface DocumentCommonFormDataVo {
    /**
     * 操作类型 (1-新增/2-修改)
     */
    operateType: string

    /**
     * 模板code
     */
    templateCode: string

    /**
     * 数据map
     */
    dataMap: { [key: string]: any }
}
