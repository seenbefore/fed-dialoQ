import { getWaitPage, getTodoCount } from '@/entry/third/services/auto/workExamine'
import { Dictionary } from '@/scripts/dict'

const 审批状态 = [
    {
        label: '审批中',
        value: '0',
    },
    {
        label: '否决',
        value: '2',
    },
    {
        label: '审批通过',
        value: '3',
    },
    {
        label: '退回',
        value: '1',
    },
] as const

const 待办类型 = [
    {
        label: '授信审批',
        value: '1',
    },
    {
        label: '用信审批',
        value: '2',
    },
    {
        label: '贷后审批',
        value: '3',
    },
] as const

const dealStatus = [
    {
        label: '未处理',
        value: '0',
    },
    {
        label: '退回',
        value: '1',
    },
    {
        label: '通过',
        value: '3',
    },
] as const

export const Dict = new Dictionary({
    examineStatus: {
        options: [...审批状态],
    },
    examineType: {
        options: [...待办类型],
    },
    dealStatus: {
        desc: '流程节点',
        options: [...dealStatus],
    },
})

export class Helper {
    static list = getWaitPage
    static getTodoCount = getTodoCount
    static Dict = Dict
}
