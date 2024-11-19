/**
 * @file API：/punish/config/deptParam
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import http from '@/scripts/http'

/**
 * 【V2.0.0】描述：查询已配置的部门关键信息列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author xiangyuyu
 */
export function getExistsDeptInfoList(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ConfigDeptParamKeyInfoVo[]>>({
        url: '/punish/config/deptParam/getExistsDeptInfoList',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V1.3.1】描述：根据指定条件查询部门参数配置信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author xiangyuyu
 */
export function getDeptConfigInfoWithSpecialCondition(
    data?: {
        /** 主键 */ id?: string
        /** 统一社会信用代码 */ uniscid?: string
        /** 部门编码 */ orgCode?: string
        /** 机构编码 */ deptCode?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<ConfigDeptParamVo>>({
        url: '/punish/config/deptParam/getDeptConfigInfoWithSpecialCondition',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V2.0.0】描述：保存部门基本参数配置信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author xiangyuyu
 */
export function saveDeptBasicConfigInfo(
    data?: {
        /** 操作类型(1-新增/2-修改) */ operateType: string
        /** 主键 */ id?: string
        /** 机构文书抬头标准名称 */ orgStandardName?: string
        /** 单位简称 */ orgShortName?: string
        /** 条线办案信息 */ lineCaseHandleInfo?: LineCaseHandleInfoVo[]
        /** 单位联系电话 */ phone?: string
        /** 邮编 */ postCode?: string
        /** 单位联系地址 */ address?: string
        /** 强制执行单位名称 */ enforcementExcutionOrgName?: string
        /** 行政诉讼法院名称 */ administrativeActionCourtName?: string
        /** 行政复议人民政府名称 */ administrativeGovName?: string
        /** 行政复议机构名称 */ administrativeOrgName?: string
        /** 缴款银行名称 */ payBankName?: string
        /** 缴款银行账号 */ payBankAccount?: string
        /** 缴款银行户名 */ payBankAccountName?: string
        /** 统一社会信用代码 */ unicode?: string
        /** 机构编码 */ orgCode?: string
        /** 联合法制审核是否启用 0-否 1-是 */ isApprovalCenterUsing?: string
        /** 是否开启滞纳金(0-否 1-是) */ isLateFee?: string
        /** 机构编码 */ deptCode?: string
        /** 是否配置分支机构；1 是,0 否 */ isConfigDept?: string
        /** 机构名称 */ deptName?: string
        /** 是否加处罚款(0-否 1-是) */ isAddCfk?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<string>>({
        url: '/punish/config/deptParam/saveDeptBasicConfigInfo',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V2.0.0】描述：保存部门指定配置信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author xiangyuyu
 */
export function saveDeptSpecialConfigInfo(
    data?: {
        /** 操作类型(1-新增/2-修改) */ operateType: string
        /** 需要调整的部门参数类型（1-电子印章/2-统一公共支付/3-数据归集） */ adjustDeptInfoType: string
        /** 统一社会信用代码 */ uniscid: string
        /** 机构编码 */ orgCode: string
        /** 机构名称 */ orgName: string
        /** 主键 */ id?: string
        /** 电子印章-印章编码 */ sealCode?: string
        /** 数据归集-是否允许数据上报(0-否/1-是) */ isAllowDataReport?: string
        /** 统一公共支付平台对接-执收单位编码 */ enterCode?: string
        /** 统一公共支付平台对接-默认执收项目编码 */ defaultChitCode?: string
        /** 统一公共支付平台对接-默认执收项目名称 */ defaultChitName?: string
        /** 执收单位名称 */ enterName?: string
        /** 区域编码 */ regiCode?: string
        /** 区域名称 */ regiName?: string
        /** 机构编码 */ deptCode?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<string>>({
        url: '/punish/config/deptParam/saveDeptSpecialConfigInfo',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 获取是否展示修改按钮;1 展示 0 不展示
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liyafeng
 */
export function getIsShowEditButton(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1>({
        url: '/punish/config/deptParam/getIsShowEditButton',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 描述: 根据登录人部门查询条线配置
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author zhanghongqiang
 */
export function getDeptLineConfig(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string[]>>({
        url: '/punish/config/deptParam/getDeptLineConfig',
        type: 'GET',
        data,
        ...options,
    })
}

/**
 * 无效机构配置信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liyafeng
 */
export function invalidSysDepartParam(
    data?: {
        /** 主键 */ id?: string
        /** 统一社会信用代码 */ uniscid?: string
        /** 部门编码 */ orgCode?: string
        /** 机构编码 */ deptCode?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<string>>({
        url: '/punish/config/deptParam/invalidSysDepartParam',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 根据部门编码与机构编码获取对应的参数配置
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liyafeng
 */
export function getSysDepartParamByOrgCodeAndDeptCode(
    data?: {
        /** 主键 */ id?: string
        /** 统一社会信用代码 */ uniscid?: string
        /** 部门编码 */ orgCode?: string
        /** 机构编码 */ deptCode?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<SysDepartParam>>({
        url: '/punish/config/deptParam/getSysDepartParamByOrgCodeAndDeptCode',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 注意：跑最新的api，接口报错，都说不知道，把杨星威分支存在的接口复制到接口引入的ts中
 * （一旦重新跑api,就会消失，我怀疑这个方法是他自己加的，不是api自己生成的，因为接口路径不对 /punish/config/payment/source/xxx，其他的是 /punish/config/deptParam/xxx）
 * 根据部门编码与机构编码获取对应的参数配置
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liyafeng
 */
export function getConfigPaymentSourceInfoByParam(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/punish/config/payment/source/getConfigPaymentSourceInfoByParam',
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

export interface ConfigDeptParamKeyInfoVo {
    /**
     * 统一社会信用代码
     */
    uniscid: string

    /**
     * 机构文书抬头标准名称
     */
    orgStandardName: string

    /**
     * 主键
     */
    id: string
}

export interface ConfigOrgDecideBasisInfo {
    /**
     * 判定依据种类
     */
    decideBasisKinds: string

    /**
     * 判定依据类型 1:集体议案 2:听证
     */
    decideBasisType: string

    /**
     * 修改时间
     */
    updateTime: string

    /**
     * 个人罚款额度
     */
    punishMoneyPersonLimit: string

    /**
     * 个人罚款额度
     */
    confiscateIllegalMoneyPersonLimit: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 机构编码
     */
    orgCode: string

    /**
     * 单位罚款额度
     */
    confiscateIllegalMoneyUnitLimit: string

    /**
     * 主键
     */
    id: string

    /**
     * 单位罚款额度
     */
    punishMoneyUnitLimit: string

    /**
     * 个人没收非法财物价值额度
     */
    confiscateIllegalPropertyValuePersonLimit: string

    /**
     * 单位没收非法财物价值额度
     */
    confiscateIllegalPropertyValueUnitLimit: string
}

export interface LineCaseHandleInfoVo {
    /**
     * 条线编码
     */
    lineCode: string

    /**
     * 条线名称
     */
    lineName: string

    /**
     * 条线办案状态编码（0-未开启/1-开启）
     */
    lineCaseHandleStatusCode: string

    /**
     * 条线文号
     */
    lineDocNumber: string

    /**
     * 条线办案状态名称（0-未开启/1-开启）
     */
    lineCaseHandleStatusName: string
}

export interface ConfigDeptParamVo {
    /**
     * 是否配置分支机构；1 是,0 否
     */
    isConfigDept: string

    /**
     * 缴款银行账号
     */
    payBankAccount: string

    /**
     * 行政复议人民政府名称
     */
    administrativeGovName: string

    /**
     * 区域名称
     */
    regiName: string

    /**
     * 听证判定依据
     */
    hearingConfig: ConfigOrgDecideBasisInfo

    /**
     * 强制执行单位名称
     */
    enforcementExcutionOrgName: string

    /**
     * 编码
     */
    orgCode: string

    /**
     * 机构文书抬头标准名称
     */
    orgStandardName: string

    /**
     * 默认执收项目编码
     */
    defaultChitCode: string

    /**
     * 主键
     */
    id: string

    /**
     * 简称
     */
    orgShortName: string

    /**
     * 执收单位名称
     */
    enterName: string

    /**
     * 行政复议机构名称
     */
    administrativeOrgName: string

    /**
     * 印章编码
     */
    sealCode: string

    /**
     * 是否开启滞纳金(0-否 1-是)
     */
    isLateFee: string

    /**
     * 是否允许数据上报(0-否/1-是)
     */
    isAllowDataReport: string

    /**
     * 单位联系地址
     */
    address: string

    /**
     * 集体议案判定依据
     */
    collectiveDiscussConfig: ConfigOrgDecideBasisInfo

    /**
     * 缴款银行户名
     */
    payBankAccountName: string

    /**
     * 区域编码
     */
    regiCode: string

    /**
     * 联合法制审核是否启用 0-否 1-是
     */
    isApprovalCenterUsing: string

    /**
     * 条线办案信息
     */
    lineCaseHandleInfo: LineCaseHandleInfoVo[]

    /**
     * 缴款银行名称
     */
    payBankName: string

    /**
     * 是否加处罚款(0-否 1-是)
     */
    isAddCfk: string

    /**
     * 单位联系电话
     */
    phone: string

    /**
     * 统一公共支付平台对接-默认执收项目名称
     */
    defaultChitName: string

    /**
     * 执收单位编码
     */
    enterCode: string

    /**
     * 统一社会信用代码
     */
    unicode: string

    /**
     * 邮编
     */
    postCode: string

    /**
     * 行政诉讼法院名称
     */
    administrativeActionCourtName: string

    /**
     * 部门编码
     */
    deptCode: string
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

export interface SysDepartParam {
    /**
     * 机构名称
     */
    deptName: string

    /**
     * 是否配置分支机构；1 是,0 否
     */
    isConfigDept: string

    /**
     * 缴款银行账号
     */
    payBankAccount: string

    /**
     * 行政复议人民政府名称
     */
    administrativeGovName: string

    /**
     * 强制执行单位名称
     */
    enforcementExcutionOrgName: string

    /**
     * 是否删除；1 是,0 否
     */
    isDeleted: string

    /**
     * 编码
     */
    orgCode: string

    /**
     * 机构文书抬头标准名称
     */
    orgStandardName: string

    /**
     * 主键
     */
    id: string

    /**
     * 简称
     */
    orgShortName: string

    /**
     * 行政复议机构名称
     */
    administrativeOrgName: string

    /**
     * 条线配置
     */
    lineConfig: string

    /**
     * 是否开启滞纳金(0-否 1-是)
     */
    isLateFee: string

    /**
     * 是否允许数据上报(0-否/1-是)
     */
    isAllowDataReport: string

    /**
     * 单位联系地址
     */
    address: string

    /**
     * 缴款银行户名
     */
    payBankAccountName: string

    /**
     * 联合法制审核是否启用 0-否 1-是
     */
    isApprovalCenterUsing: string

    /**
     * 修改人id
     */
    updateUserId: string

    /**
     * 文号规则
     */
    docNumberRule: string

    /**
     * 最近更新时间
     */
    updateTime: string

    /**
     * 缴款银行名称
     */
    payBankName: string

    /**
     * 单位联系电话
     */
    phone: string

    /**
     * 统一社会信用代码
     */
    unicode: string

    /**
     * 邮编
     */
    postCode: string

    /**
     * 行政诉讼法院名称
     */
    administrativeActionCourtName: string

    /**
     * 单位联系人
     */
    linkPerson: string

    /**
     * 机构编码
     */
    deptCode: string
}
