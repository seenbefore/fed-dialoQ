import { ITextItem, ILayout, IBaseItem } from '@/entry/bigscreen/types/index'

/**
 * 模块布局配置项
 */
export const LayoutConfig: Record<string, ILayout> = {
    one: { width: 500, left: 50, top: 144 },
    two: { width: 500, left: 50, top: 202 },
    three: { width: 500, left: 50, top: 260 },
    four: { width: 500, left: 50, top: 320 },
    five: { width: 500, left: 50, top: 380 },
    six: { width: 500, left: 50, top: 516 },
    seven: { width: 500, left: 50, top: 570 },
}

interface IModuleData {
    oneData: Record<string, any>
    twoData: Record<string, any>
    threeData: Record<string, any>
    fourData: Record<string, any>
    fiveData: Record<string, any>
    sixData: Record<string, any>
    sevenData: Record<string, any>
}

/**
 * 模块数据配置项
 */
export const getModuleDataConfig = (context: any): IModuleData => {
    const ModuleDataConfig = {
        oneData: {
            title: 'my-module-title',
            flexType: 'start',
            hasRightIcon: true,
        },
        twoData: {
            title: 'my-module-title',
            flexType: 'center',
            hasRightIcon: true,
            hasRightArrow: false,
        },
        threeData: {
            title: 'my-module-title',
            flexType: 'end',
        },
        fourData: {
            title: 'my-base-tab',
            flexType: 'start',
            hasRightIcon: true,
        },
        fiveData: {
            one: {
                activeTab: '1',
                tabList: [
                    {
                        label: '股权融资亿元',
                        value: '1',
                    },
                    {
                        label: '债券融资亿元',
                        value: '2',
                    },
                ],
            },
            two: {
                activeTab: '1',
                tabList: [
                    {
                        label: '股权融资亿元',
                        value: '1',
                    },
                    {
                        label: '债券融资亿元',
                        value: '2',
                    },
                ],
            },
            three: {
                activeTab: '1',
                tabList: [
                    {
                        beforeLabel: '股权融资',
                        label: Math.ceil(Math.random() * 1000),
                        afterLabel: '亿元',
                        value: '1',
                    },
                    {
                        beforeLabel: '债券融资',
                        label: Math.ceil(Math.random() * 1000),
                        afterLabel: '亿元',
                        value: '2',
                    },
                ],
            },
        },
        sixData: {
            title: 'other',
        },
        sevenData: {
            width: '100%',
            height: '410px',
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
                            row.id === 8 &&
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
    }
    return ModuleDataConfig
}
