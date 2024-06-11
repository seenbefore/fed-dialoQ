import { ITextItem, ILayout } from '@/entry/bigscreen/types/index'

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
        title: 'my-base-tab',
    },
    fourData: {
        activeTab: '1',
        tabList: [
            {
                label: 'tab1',
                value: '1',
            },
            {
                label: 'tab2',
                value: '2',
            },
        ],
    },
    fiveData: {
        title: 'my-pool-list',
    },
    sixData: {
        width: '100%',
        height: '560px',
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
