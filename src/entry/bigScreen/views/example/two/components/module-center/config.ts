import { ILayout, ITextItem } from '@bigScreen/types'

/**
 * 模块布局配置项
 */
export const LayoutConfig: Record<string, ILayout> = {
    one: { width: 620, left: 650, top: 130 },
    two: { width: 620, left: 650, top: 182 },
    three: { width: 620, left: 650, top: 250 },
    four: { width: 620, left: 650, top: 300 },
    five: { width: 620, left: 650, top: 350 },
    six: { width: 620, left: 650, top: 400 },
    seven: { width: 620, left: 650, top: 630 },
    eight: { width: 620, left: 650, top: 760 },
}

interface IModuleData {
    oneData: Record<string, any>
    twoData: ITextItem
    [propName: string]: any
}

/**
 * 模块数据配置项
 */
export const ModuleDataConfig: IModuleData = {
    oneData: {
        title: 'my-text-item',
        hasRightIcon: true,
    },
    twoData: {
        title: '在贷余额',
        number: 0,
        unit: '百万',
        decimals: 0,
        key: 'twoData_key1',
    },
    threeData: {
        title: 'my-tab-table',
    },
    fourData: {
        auto: true,
        pageVisible: false,
        tabRowSpan: '10',
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
        tableColumns: [
            {
                prop: 'key1',
                label: '机构数',
                minWidth: '100px',
                align: 'left',
            },
            {
                prop: 'key2',
                label: '从业人数',
                minWidth: '100px',
                align: 'left',
            },
            {
                prop: 'key3',
                label: '注册资本总额（亿元）',
                minWidth: '180px',
                align: 'left',
            },
        ],
    },
}
