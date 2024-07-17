import { ILayout } from '@bigScreen/types'

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
export const ModuleDataConfig: IModuleData = {
    oneData: {
        title: 'my-card-number',
    },
}
