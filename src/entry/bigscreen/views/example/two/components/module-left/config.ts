import { ITextItem, ILayout, IBaseItem } from '@/entry/bigscreen/types/index'

/**
 * 模块布局配置项
 */
export const LayoutConfig: Record<string, ILayout> = {
    one: { width: 500, left: 50, top: 144 },
    two: { width: 500, left: 57, top: 202 },
    three: { width: 500, left: 50, top: 270 },
    four: { width: 500, left: 54, top: 320 },
    five: { width: 500, left: 50, top: 410 },
    six: { width: 500, left: 57, top: 466 },
    seven: { width: 500, left: 50, top: 640 },
    eight: { width: 500, left: 57, top: 690 },
}

interface IModuleData {
    oneData: Record<string, any>
    twoData: IBaseItem[]
    threeData: Record<string, any>
    fourData: IBaseItem[]
    fiveData: Record<string, any>
    sixData: IBaseItem[]
    sevenData: Record<string, any>
    eightData: IBaseItem[]
    [propName: string]: any
}

/**
 * 模块数据配置项
 */
export const ModuleDataConfig: IModuleData = {
    oneData: {
        title: 'my-base-item：类型一',
    },
    twoData: [
        {
            icon: 'icon-zdye',
            options: [
                {
                    layout: 'column',
                    attrs: {
                        title: '在贷余额',
                        number: 0,
                        unit: '百万',
                        decimals: 0,
                        key: 'twoData_key1',
                    },
                },
            ],
        },
        {
            icon: 'icon-zdbs',
            options: [
                {
                    layout: 'column',
                    attrs: {
                        title: '在贷笔数',
                        number: 0,
                        unit: '笔',
                        decimals: 0,
                        key: 'twoData_key2',
                    },
                },
            ],
        },
    ],
    threeData: {
        title: 'my-base-item：类型二',
    },
    fourData: [
        {
            icon: 'icon-zbye',
            options: [
                {
                    layout: 'column',
                    attrs: {
                        title: '在保余额',
                        number: 0,
                        unit: '百万',
                        decimals: 0,
                        key: 'fourData_key1',
                    },
                },
                {
                    layout: 'row',
                    attrs: {
                        title: '占比',
                        number: 0,
                        unit: '%',
                        decimals: 2,
                        key: 'fourData_ratio1',
                    },
                },
            ],
        },
        {
            icon: 'icon-zbhs',
            options: [
                {
                    layout: 'column',
                    attrs: {
                        title: '在保户数',
                        number: 0,
                        unit: '户',
                        decimals: 0,
                        key: 'fourData_key2',
                    },
                },
                {
                    layout: 'row',
                    attrs: {
                        title: '占比',
                        number: 0,
                        unit: '%',
                        decimals: 2,
                        key: 'fourData_ratio2',
                    },
                },
            ],
        },
    ],
    fiveData: {
        title: 'my-base-item：类型三',
    },
    sixData: [
        {
            class: 'field_1',
            icon: 'icon-zbye',
            options: [
                {
                    layout: 'column',
                    attrs: {
                        title: '金融业增加值',
                        number: 0,
                        unit: '亿元',
                        decimals: 2,
                        key: 'sixData_key1',
                    },
                },
                {
                    class: 'text-bottom__field ratio-up',
                    style: {
                        fontSize: '18px',
                    },
                    attrs: {
                        title: '同比',
                        number: 0,
                        unit: '%',
                        decimals: 2,
                        key: 'sixData_key2',
                    },
                },
            ],
        },
        {
            icon: 'icon-zbhs',
            options: [
                {
                    layout: 'column',
                    attrs: {
                        title: '占服务业比重',
                        number: 0,
                        unit: '%',
                        decimals: 2,
                        key: 'sixData_key3',
                    },
                },
                {
                    style: {
                        fontSize: '18px',
                        color: '#0AE0FF',
                    },
                    attrs: {
                        title: '服务业增加<br/>总值',
                        number: 0,
                        unit: '亿元',
                        decimals: 2,
                        key: 'sixData_key4',
                    },
                },
            ],
        },
        {
            icon: 'icon-zbhs',
            options: [
                {
                    layout: 'column',
                    attrs: {
                        title: '占地区生产总值',
                        number: 0,
                        unit: '%',
                        decimals: 2,
                        key: 'sixData_key5',
                    },
                },
                {
                    style: {
                        fontSize: '18px',
                        color: '#0AE0FF',
                    },
                    attrs: {
                        title: '地区生产<br/>总值',
                        number: 0,
                        unit: '亿元',
                        decimals: 2,
                        key: 'sixData_key6',
                    },
                },
            ],
        },
    ],
    sevenData: {
        title: 'my-base-item：类型四',
    },
    eightData: [
        {
            options: [
                {
                    layout: 'column',
                    attrs: {
                        title: '在贷余额',
                        number: 0,
                        unit: '百万',
                        decimals: 0,
                        key: 'twoData_key1',
                    },
                },
            ],
        },
        {
            options: [
                {
                    layout: 'column',
                    attrs: {
                        title: '在贷笔数',
                        number: 0,
                        unit: '笔',
                        decimals: 0,
                        key: 'twoData_key2',
                    },
                },
            ],
        },
        {
            options: [
                {
                    layout: 'column',
                    attrs: {
                        title: '在贷余额',
                        number: 0,
                        unit: '百万',
                        decimals: 0,
                        key: 'twoData_key1',
                    },
                },
            ],
        },
        {
            options: [
                {
                    layout: 'column',
                    attrs: {
                        title: '在贷笔数',
                        number: 0,
                        unit: '笔',
                        decimals: 0,
                        key: 'twoData_key2',
                    },
                },
            ],
        },
    ],
}
