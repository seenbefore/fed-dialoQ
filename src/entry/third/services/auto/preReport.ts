/**
 * @file API：/preReport
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 客户选择器-搜索
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function searchCustomer(data?: {
/** 关键字,可以是 企业名称、客户号、统一社会行用代码 */ keyWord?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<CustomerVo[]>>({
        url: "/preReport/searchCustomer",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 写前置授信检查
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function preCreditCheck(data?: {
/** pripid */ pripid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PreCreditCheckVo>>({
        url: "/preReport/preCreditCheck",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 获取当前风险探测结果
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function getRiskDetectNow(data?: {
/** pripid */ pripid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<RiskDetectResultVo>>({
        url: "/preReport/getRiskDetectNow",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 查询前置授信详情
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function getPreReportDetail(data?: {
/** 查询主体类型: 1-pripid, 2-前置授信id */ subjectType: number, 
/** 企业pripid
Tips: subjectType=1时,需传此参数 */ pripid?: string, 
/** 前置授信id
Tips: subjectType=2时,需传此参数 */ reportId?: string, 
/** 是否查询最新,缺省值false
Tips: 编辑时需要查最新,查看时查落库记录 */ queryNow?: boolean, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PreReportParamDto>>({
        url: "/preReport/getPreReportDetail",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 新增/更新-前置授信报告
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function addOrUpdate(data?: {
/** 主键id/授信前置报告id
Tips: 新增不传,更新传 */ reportId?: string, 
/** 企业基本信息 */ baseInfo?: BaseInfo, 
/** 是否签定保证函: 0-否,1-是 */ ifGuaranteeLetter?: number, 
/** 保证函 */ guaranteeLetters?: PreReportParamDto$GuaranteeLetter[], 
/** 基本-授信方案 */ baseCreditScheme?: CreditScheme, 
/** 临时-授信方案 */ tempCreditScheme?: CreditScheme, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/preReport/addOrUpdate",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 查询授信方案-授信产品
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function getCreditProduct(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<CreditAmountBiz[]>>({
        url: "/preReport/getCreditProduct",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 历史授信查询
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function listAllCreditSchemeHistory(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<CreditSchemeHisVo[]>>({
        url: "/preReport/listAllCreditSchemeHistory",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 查询企业共还人列表
Tips:
1.限身份角色为: 法人, 法人配偶, 实际控制人, 实际控制人配偶, 股东
2.此接口不排除担保人、连带担保人,前端需要自己排除担保人及连带担保人
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function getTogeterRepayPeople(data?: {
/** 企业唯一id */ pripid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PreTogeterRepayPeople>>({
        url: "/preReport/getTogeterRepayPeople",
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

export interface CustomerVo {

    /**
     * pripid
     */
    pripid: string

    /**
     * 客户号
     */
    cuidcsid: string

    /**
     * 地址
     */
    address: string

    /**
     * 企业名
     */
    entName: string

    /**
     * 联系电话
     */
    phone: string

    /**
     * 统一社会信用代码
     */
    unicode: string

    /**
     * 行业
     */
    industry: string

}

export interface PreCreditCheckVo {

    /**
     * 拒绝通过代码
1-当前企业、法定代表人或实际控制人已在其它支行申请记录，当前授信无法申请
2-当前企业已有指定客户经理绑定关系,无法进行授信申请
3-当前企业最新的集团授信即将过期,法进行授信申请
4-当前主体的申请授信正在审批中,无法再申请授信
5-当前主体未完成准入申请或扫码授权无法申请授信
6-当前主体的准入申请已超过X个月
7-当前主体存在风险禁入类指标且不在白名单内
     */
    refuseCode: number

    /**
     * 准入分析日期
     */
    accessAnalysisTime: string

    /**
     * 检查结果: 1-通过,2-不通过
     */
    checkResult: number

    /**
     * 拒绝通过原因
     */
    refuseReason: string

}

export interface RiskDetectResultVo$RiskDetect {

    /**
     * 风险点名称
     */
    riskName: string

    /**
     * 风险点是否存在: 1-是,0-否
     */
    riskSituation: string

    /**
     * 风险点编号
     */
    riskCode: string

    /**
     * 风险提示信息
     */
    riskHint: string

    /**
     * 风险处理结果类型: 1-提示, 2-强制通过, 3-拒绝
     */
    riskDealResultType: string

}

export interface RiskDetectResultVo$RiskDetectRecord {

    /**
     * 风险类别名称
     */
    riskCategoryName: string

    /**
     * 风险类别
Tips: 1-申请人信息检查, 2-申请信息检查, 3-其他检查
     */
    riskCategory: string

    /**
     * 探测指标
     */
    riskDetects: RiskDetectResultVo$RiskDetect[]

}

export interface RiskDetectResultVo {

    /**
     * 探测日期
     */
    riskDate: string

    /**
     * 包含强制通过类指标名
     */
    riskNames: string[]

    /**
     * 探测记录
     */
    riskDetectRecords: RiskDetectResultVo$RiskDetectRecord[]

    /**
     * 风险探测结果: 1-仅包含提示类结果, 2-至多包含强制通过类结果, 3-包含拒绝类指标
     */
    riskResultType: number

}

export interface PreReportParamDto$BaseInfo {

    /**
     * 企业pripid(cs_mid_baseinfo.PriPID)
     */
    pripid: string

    /**
     * 客户号(core_bcfmcmbi_valid.cuidcsid)
     */
    cuidcsid: string

    /**
     * 地址
     */
    address: string

    /**
     * 企业名(cs_mid_baseinfo.EntName)
     */
    entName: string

    /**
     * 联系电话(dw_zbj_sq.yhkhdh)
     */
    yhkhdh: string

    /**
     * 准入分析时间
     */
    accessAnalysisTime: string

    /**
     * 统一社会信用代码
     */
    unicode: string

    /**
     * 行业
     */
    industry: string

    /**
     * 风险探测结果
     */
    riskDetectResult: RiskDetectResultVo

    /**
     * 风险探测结果: 1-通过, 2-强制通过
     */
    riskCheckResult: number

    /**
     * 准入分析结果: 1-全部通过, 2-有风险指标
Tips: 准入分析记录请使用 /ent-credit-admission/getAdmissionResult 接口查询
     */
    accessAnalysisResult: number

}

export interface PreReportParamDto$GuaranteePeopleRelate {

    /**
     * 担保人名称
     */
    name: string

    /**
     * 担保人类型: 1-企业, 2-个人
     */
    peopleType: number

    /**
     * 担保人标识 (企业unicode/身份证号)
     */
    uid: string

}

export interface PreReportParamDto$Collateral {

    /**
     * 押品值
     */
    pledgeValue: string

    /**
     * 押品名称
     */
    pledgeName: string

}

export interface PreReportParamDto$GuaranteePeople {

    /**
     * 客户标识(企业unicode/身份证号)
     */
    uid: string

    /**
     * 客户类型: 1-企业, 2-个人
     */
    customerType: number

    /**
     * 连带担保人
     */
    guaranteePeopleRelates: PreReportParamDto$GuaranteePeopleRelate[]

    /**
     * 担保方式: 200-保证 300-抵押 400-质押
     */
    guaranteeType: string

    /**
     * 业务类别(业务名称)
     */
    bizName: string

    /**
     * 业务编码
     */
    bizCode: string

    /**
     * 押品
     */
    collaterals: PreReportParamDto$Collateral[]

    /**
     * 担保金额(单位:万元)
     */
    guaranteeAmount: string

    /**
     * 币种: RMB-人民币
     */
    currency: string

    /**
     * 客户名称
     */
    customerName: string

}

export interface PreReportParamDto$TogeterRepayPeople {

    /**
     * 身份类别: 法人, 法人配偶, 实控人, 实控人配偶, 股东
     */
    roleType: string

    /**
     * 姓名
     */
    repayName: string

    /**
     * 身份证号
     */
    idCard: string

}

export interface PreReportParamDto$CreditAmountBiz {

    /**
     * 担保-抵押
     */
    dyGuaranteePeoples: PreReportParamDto$GuaranteePeople[]

    /**
     * 业务等级
     */
    level: number

    /**
     * 业务编码
     */
    bizCode: string

    /**
     * 担保-质押
     */
    zyGuaranteePeoples: PreReportParamDto$GuaranteePeople[]

    /**
     * 信用(单位:万元)
     */
    xyAmount: string

    /**
     * 抵押(单位:万元)
     */
    dyAmount: string

    /**
     * 共还人
     */
    togeterRepayPeoples: PreReportParamDto$TogeterRepayPeople[]

    /**
     * 担保-保证
     */
    bzGuaranteePeoples: PreReportParamDto$GuaranteePeople[]

    /**
     * 授信额度(单位:万元)
     */
    sxAmount: string

    /**
     * 父业务编码
     */
    parentBizCode: string

    /**
     * 业务类别(业务名称)
     */
    bizName: string

    /**
     * 质押(单位:万元)
     */
    zyAmount: string

    /**
     * 子业务-授信业务详情
     */
    creditAmountBizs: PreReportParamDto$CreditAmountBiz[]

    /**
     * 保证(单位:万元)
     */
    bzAmount: string

    /**
     * 共还金额(单位:万元),共还金额=信用+保证 +抵押+质押
     */
    togeterRepayAmount: string

    /**
     * 保证金(单位:万元)
     */
    bzjAmount: string

}

export interface PreReportParamDto$CreditScheme {

    /**
     * 授信结束日期
     */
    endDate: string

    /**
     * 信用(单位:万元)
     */
    xyAmount: string

    /**
     * 项目贷款项目名
ifProjectLoan=1时需要此参数
     */
    projectNames: string[]

    /**
     * 是否包含项目贷款: 0-否, 1-是
     */
    ifProjectLoan: number

    /**
     * 抵押(单位:万元)
     */
    dyAmount: string

    /**
     * 授信方案类型: 1-基本授信, 2-临时授信
     */
    creditScheme: number

    /**
     * 敞口额度(单位:万元)
     */
    ckAmount: string

    /**
     * 授信额度(单位:万元)
     */
    sxAmount: string

    /**
     * 是否包含固定购置资产贷款: 0-否, 1-是
     */
    ifAsset: number

    /**
     * 质押(单位:万元)
     */
    zyAmount: string

    /**
     * 授信业务详情
     */
    creditAmountBizs: PreReportParamDto$CreditAmountBiz[]

    /**
     * 保证(单位:万元)
     */
    bzAmount: string

    /**
     * 授信开始日期
     */
    startDate: string

    /**
     * 保证金(单位:万元)
     */
    bzjAmount: string

}

export interface PreReportParamDto$GuaranteeLetter {

    /**
     * 担保金额(单位万元)
     */
    guaranteeAmount: string

    /**
     * 证件类型: 1-身份证
     */
    idType: number

    /**
     * 证件号
     */
    idCard: string

    /**
     * 保证人姓名
     */
    guaranteeName: string

}

export interface PreReportParamDto {

    /**
     * 企业基本信息
     */
    baseInfo: PreReportParamDto$BaseInfo

    /**
     * 基本-授信方案
     */
    baseCreditScheme: PreReportParamDto$CreditScheme

    /**
     * 主键id/授信前置报告id
Tips: 新增不传,更新传
     */
    reportId: string

    /**
     * 临时-授信方案
     */
    tempCreditScheme: PreReportParamDto$CreditScheme

    /**
     * 是否签定保证函: 0-否,1-是
     */
    ifGuaranteeLetter: number

    /**
     * 保证函
     */
    guaranteeLetters: PreReportParamDto$GuaranteeLetter[]

}

export interface BaseInfo {

}

export interface CreditScheme {

}

export interface CreditAmountBiz {

}

export interface CreditSchemeHisVo {

    /**
     * 授信机构
     */
    orgName: string

    /**
     * 授信结束日期
     */
    endDate: string

    /**
     * 信用(单位:万元)
     */
    xyAmount: string

    /**
     * 授信编号
     */
    creditSchemeId: string

    /**
     * 抵押(单位:万元)
     */
    dyAmount: string

    /**
     * 授信方式: 1-基本授信, 2-临时授信
     */
    creditScheme: number

    /**
     * 敞口额度(单位:万元)
     */
    ckAmount: string

    /**
     * 授信额度(单位:万元)
     */
    sxAmount: string

    /**
     * 授信机构代码
     */
    orgCode: string

    /**
     * 质押(单位:万元)
     */
    zyAmount: string

    /**
     * 授信业务详情
     */
    creditAmountBizs: PreReportParamDto$CreditAmountBiz[]

    /**
     * 保证(单位:万元)
     */
    bzAmount: string

    /**
     * 授信开始日期
     */
    startDate: string

    /**
     * 保证金(单位:万元)
     */
    bzjAmount: string

    /**
     * 授信状态
     */
    status: string

}

export interface PrePersonInfoVo {

    /**
     * 姓名
     */
    name: string

    /**
     * 唯一标识
     */
    uid: string

    /**
     * 身份角色: legal-法人, legal_sps-法人配偶, real-实际控制人, real_sps-实际控制人配偶, inv-股东, other-其他, guarantee-担保人, guarantee_relate-连带担保人, together_repay-共还人
     */
    roleType: string

    /**
     * 身份证号
     */
    idCard: string

}

export interface PreTogeterRepayPeople {

    /**
     * 个人身份信息
     */
    personInfos: PrePersonInfoVo[]

    /**
     * 补充身份证号信息: 1-需要补充,2-不需要补充
     */
    replenishIdCard: number

}

