import { Dictionary } from '@/scripts/dict'

const 规上企业 = [
    {
        label: '是',
        value: '1',
        tag: '规上企业',
    },
    {
        label: '否',
        value: '0',
        tag: '',
    },
] as const
const 亩产论英雄级别 = [
    {
        label: 'A',
        value: '1',
        tag: '亩产论英雄级别A',
    },
    {
        label: 'B',
        value: '2',
        tag: '亩产论英雄级别B',
    },
    {
        label: 'C',
        value: '3',
        tag: '亩产论英雄级别C',
    },
    {
        label: 'D',
        value: '4',
        tag: '亩产论英雄级别D',
    },
] as const

const 科技类企业 = [
    {
        label: '是',
        value: '1',
        tag: '科技类企业',
    },
    {
        label: '否',
        value: '0',
        tag: '',
    },
] as const

const 严重失信企业 = [
    {
        label: '是',
        value: '1',
        tag: '严重失信',
        class: 'danger',
    },
    {
        label: '否',
        value: '0',
        tag: '',
        class: '',
    },
] as const
const 本行是否有国结 = [
    {
        label: '是',
        value: '1',
        tag: '有国结',
    },
    {
        label: '否',
        value: '0',
        tag: '',
    },
] as const

const 本行是否有贷款 = [
    {
        label: '是',
        value: '1',
        tag: '有贷款',
    },
    {
        label: '否',
        value: '0',
        tag: '',
    },
] as const
const 本行是否有代发工资 = [
    {
        label: '是',
        value: '1',
        tag: '代发工资',
    },
    {
        label: '否',
        value: '0',
        tag: '',
    },
] as const
const 本行黑名单企业 = [
    {
        label: '是',
        value: '1',
        tag: '本行黑名单',
        class: 'danger',
    },
    {
        label: '否',
        value: '0',
        tag: '',
        class: '',
    },
] as const
const 本行是否开户 = [
    {
        label: '是',
        value: '1',
        tag: '已开户',
        class: 'success',
        key: '已开户',
    },
    {
        label: '否',
        value: '0',
        tag: '未开户',
        class: 'info',
        key: '未开户',
    },
] as const

const 本行是否授权 = [
    {
        label: '是',
        value: '1',
        tag: '已授权',
        class: 'success',
    },
    {
        label: '否',
        value: '0',
        tag: '未授权',
        class: 'info',
    },
] as const

const 企业登记状态 = [
    {
        label: '存续',
        value: 'A,B,K,Q,X',
        class: 'success',
    },
    {
        label: '撤销',
        value: 'C',
        class: 'info',
    },
    {
        label: '吊销',
        value: 'D,DA',
        class: 'info',
    },
    {
        label: '注销',
        value: 'XX,DX',
        class: 'info',
    },
    {
        label: '迁出',
        value: 'QX',
        class: 'info',
    },
] as const

const 董监高数据源 = [
    {
        label: '智慧小微',
        value: 'PBC',
        key: '智慧小微',
    },
    {
        label: '企查查',
        value: 'QCC',
        key: '企查查',
    },
] as const
const 是否全部准入类结果 = [
    {
        label: '是',
        value: '1',
    },
    {
        label: '否',
        value: '0',
    },
] as const

const 是否有风险禁入类结果 = [
    {
        label: '是',
        value: '1',
    },
    {
        label: '否',
        value: '0',
    },
] as const

const 审批状态 = [
    {
        label: '草稿',
        value: '1',
    },
    {
        label: '审批中',
        value: '2',
    },
    {
        label: '审批完成',
        value: '3',
    },
    {
        label: '否决',
        value: '4',
    },
    {
        label: '退回',
        value: '5',
    },
] as const
const 用信类型 = [
    {
        label: '流动资金',
        value: '1',
    },
    {
        label: '承兑汇票',
        value: '2',
    },
    {
        label: '固定资产',
        value: '3',
    },
] as const

const 担保方式 = [
    {
        label: '信用',
        value: '1',
    },
    {
        label: '信保贷',
        value: '2',
    },
    {
        label: '保证',
        value: '3',
    },
    {
        label: '抵押',
        value: '4',
    },
    {
        label: '质押',
        value: '5',
    },
    {
        label: '其他',
        value: '6',
    },
] as const

// const 审批类型 = [
//     {
//         label: '授信审批',
//         value: '1',
//     },
//     {
//         label: '用信审批',
//         value: '2',
//     },
//     {
//         label: '贷后审批',
//         value: '3',
//     },
// ] as const
const dealStatus = [
    {
        label: '未处理',
        value: '0',
        class: 'info',
    },
    {
        label: '退回',
        value: '1',
        class: 'warning',
    },
    {
        label: '通过',
        value: '3',
        class: 'success',
    },
] as const
const entStatus = [
    {
        label: '存续',
        value: 'A,B,K,Q,X',
        class: 'success',
    },
    {
        label: '撤销',
        value: 'C',
        class: 'info',
    },
    {
        label: '吊销',
        value: 'D,DA',
        class: 'info',
    },
    {
        label: '注销',
        value: 'XX,DX',
        class: 'info',
    },
    {
        label: '迁出',
        value: 'QX',
        class: 'info',
    },
] as const
const reportType = [
    {
        label: '授信小额',
        value: '1',
    },
    {
        label: '授信大额',
        value: '2',
    },
    {
        label: '授信集团',
        value: '3',
    },
] as const
const data = {
    规上企业: {
        key: 'gsqy',
        options: [...规上企业],
    },
    亩产论英雄级别: {
        key: 'mclyxjb',
        options: [...亩产论英雄级别],
    },
    科技类企业: {
        key: 'kjlqy',
        options: [...科技类企业],
    },
    严重失信企业: {
        key: 'yzsxqy',
        options: [...严重失信企业],
    },
    本行是否有国结: {
        key: 'sfgj',
        options: [...本行是否有国结],
    },
    本行是否有贷款: {
        key: 'sfdk',
        options: [...本行是否有贷款],
    },
    本行是否有代发工资: {
        key: 'sfdfgz',
        options: [...本行是否有代发工资],
    },
    本行黑名单企业: {
        key: 'bhhmdqy',
        options: [...本行黑名单企业],
    },
    本行是否授权: {
        key: 'ifAuth',
        options: [...本行是否授权],
    },
    企业登记状态: {
        key: 'regstate,entStatus',
        options: [...企业登记状态],
    },
    本行是否开户: {
        key: 'sfkh',
        options: [...本行是否开户],
    },
    董监高数据源: {
        options: [...董监高数据源],
    },
    是否全部准入类结果: {
        options: [...是否全部准入类结果],
    },
    是否有风险禁入类结果: {
        options: [...是否有风险禁入类结果],
    },
    审批状态: {
        options: [...审批状态],
    },
    用信类型: {
        options: [...用信类型],
    },
    担保方式: {
        options: [...担保方式],
    },
    dealStatus: {
        desc: '当前节点处理状态',
        options: [...dealStatus],
    },
    entStatus: {
        options: [...entStatus],
    },
    reportType: {
        options: [...reportType],
    },
}

export const Dict = new Dictionary(data)
