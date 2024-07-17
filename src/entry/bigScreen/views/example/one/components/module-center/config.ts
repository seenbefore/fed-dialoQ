import { ILayout } from '@bigScreen/types'

/**
 * 模块布局配置项
 */
export const LayoutConfig: Record<string, ILayout> = {
    one: { width: 620, left: 650, top: 130 },
    two: { width: 620, left: 650, top: 182 },
    three: { width: 620, left: 650, top: 600 },
    four: { width: 620, left: 650, top: 650 },
}

interface IModuleData {
    oneData: Record<string, any>
    twoData: Record<string, any>
    threeData: Record<string, any>
    fourData: Record<string, any>
    [propName: string]: any
}

/**
 * 模块数据配置项
 */
export const getModuleDataConfig = (context?: any) => {
    const ModuleDataConfig = {
        oneData: {
            title: 'my-pool-list：类型一',
            hasRightIcon: true,
        },
        twoData: {
            width: '100%',
            height: '360px',
            border: true,
            thead: true,
            config: {
                // autoPlay: false,
                step: 0.5, // 数值越大速度滚动越快
            },
            columns: [
                {
                    prop: 'key1',
                    label: '机构数',
                    width: '100px',
                    align: 'left',
                },
                {
                    prop: 'key2',
                    label: '从业人数',
                    width: '100px',
                    align: 'left',
                    render: (h: any, { row, index }: any) => {
                        return h('div', { class: 'sg-flexbox align-center' }, [
                            h('span', { style: { color: 'red', cursor: 'pointer', marginRight: '20px' } }, row['key2']),
                            row.id % 2 == 1 &&
                                h(
                                    'el-button',
                                    {
                                        props: {
                                            type: 'text',
                                        },
                                        on: {
                                            click: () => {
                                                context.customEventFunc?.(row)
                                            },
                                        },
                                    },
                                    '回退',
                                ),
                        ])
                    },
                },
                {
                    prop: 'key3',
                    label: '注册资本总额（亿元）',
                    width: '180px',
                    align: 'left',
                },
            ],
        },
        threeData: {
            title: 'my-pool-list：类型二',
        },
        fourData: {
            width: '100%',
            height: '360px',
            border: false,
            thead: false,
            config: {
                step: 0.5, // 数值越大速度滚动越快
            },
            columns: [
                {
                    type: 'slot',
                    slotName: 'slotGgdt',
                    prop: 'name',
                    label: '投向/用途',
                    width: '600px',
                },
            ],
        },
    }
    return ModuleDataConfig as IModuleData
}
