import { Dictionary } from '@/scripts/dict'
const 待办类型 = [
    {
        label: '授信审批',
        value: '1',
        enum: 'SX',
    },
    {
        label: '用信审批',
        value: '2',
        enum: 'YX',
    },
] as const

export const Dict = new Dictionary({
    待办类型: {
        key: 'cernoType',
        options: [...待办类型],
    },
})
