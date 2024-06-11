import { ITextItem, ILayout, IBaseItem } from '@/entry/bigscreen/types/index'

/**
 * 模块布局配置项
 */
export const LayoutConfig: Record<string, ILayout> = {
    one: { width: 500, left: 1370, top: 144 },
    two: { width: 500, left: 1370, top: 202 },
    three: { width: 500, left: 1370, top: 378 },
    four: { width: 500, left: 1370, top: 422 },
    five: { width: 500, left: 1370, top: 645 },
    six: { width: 500, left: 1370, top: 695 },
    seven: { width: 500, left: 1370, top: 781 },
    eight: { width: 500, left: 1370, top: 825 },
}

interface IModuleData {
    oneData: Record<string, any>
    [propName: string]: any
}

/**
 * 模块数据配置项
 */
export const getModuleDataConfig = (context?: any) => {
    const ModuleDataConfig = {
        oneData: {
            title: 'my-process-bar',
        },
        twoData: {
            customConfig: {
                show: true,
                style: {
                    color: 'red',
                    fontSize: '28px',
                },
            },
            config: {
                type: 'circle',
                color: '#FFCA53',
                width: 82,
                'stroke-width': 6,
            },
            value: Math.ceil(Math.random() * 100),
            label: '环形进度条标题',
        },
        threeData: {
            config: {
                type: 'dashboard',
                color: '#0AE0FF',
                width: 46,
                'stroke-width': 6,
            },
            value: Math.ceil(Math.random() * 100),
            label: '仪表盘进度条标题',
        },
        fourData: {
            customConfig: {
                show: true,
                style: {
                    color: 'red',
                },
            },
            config: {
                type: 'line',
                color: '#67c23a',
                'stroke-width': 12,
                'text-inside': true,
            },
            value: Math.ceil(Math.random() * 100),
            // label: '条形进度条标题',
        },
        fiveData: {
            config: {
                type: 'line',
                // color: '#67c23a',
                // width: 46,
                'stroke-width': 8,
                // 'text-inside': true,
            },
            value: Math.ceil(Math.random() * 100),
            // label: '条形进度条标题',
        },
    }
    return ModuleDataConfig as IModuleData
}
