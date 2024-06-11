// @ts-ignore
import nunjucks from 'nunjucks'

interface IGenerateNjk {
    /* 依据模版和数据渲染模版内容并且完成输出 */
    render(templateSrc: string, renderValue: Record<string, any>): string
    render(renderValue: Record<string, any>): string
    renderString(templateSrc: string, renderValue: Record<string, any>): string
    compile(templateValue: string): IGenerateNjk
}

interface IRouterTemplateValue {
    path: string
    name: string
    meta?: Partial<{
        bodyClass: string
        parent: string
        title: string
        requireAuth: boolean
        keepAlive: boolean
        noCache: boolean
        activeMenu: string
    }>
}

const GenerateNjk = nunjucks.configure({
    autoescape: false,
    lstripBlocks: true,
    trimBlocks: true,
    tags: {
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: '<$',
        variableEnd: '$>',
        commentStart: '<#',
        commentEnd: '#>',
    },
}) as IGenerateNjk

export const generateCompile = (template: string, value: Obj): string => {
    return GenerateNjk.renderString(template, value)
}
