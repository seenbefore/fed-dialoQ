/* WeakMap 无法根据路径获取对应的模块内容 */
const ctxMap = new Map(),
    rawMap = new Map()

/* 是否加载 */
let isLoad = false

/* 获取 model 的内容 */
const getContent = (model: any) => {
    return model && model.__esModule ? model.default : model
}

/* 初始化所有的案例 */
const loadExample = () => {
    /* require.context 不能动态获取。 */
    const rawExamples = require.context('!raw-loader!../demo', true, /\/examples\/[^/]+\.vue$/)
    const ctxExamples = require.context('../demo', true, /\/examples\/[^/]+\.vue$/)

    const addCache = (models: __WebpackModuleApi.RequireContext, map: Map<string, Record<string, any>>) => {
        models.keys().forEach((key: string) => {
            const compareKey = key.match(/^\.\/(.+)\/([^/]+)\.vue$/)?.[1]
            const fileName = key
                .split(/[/\\]+/)
                .pop()!
                .replace(/\.\w+$/, '')
            const content = getContent(models(key))
            if (compareKey) {
                if (!map.has(compareKey)) {
                    map.set(compareKey, { [fileName]: content })
                } else {
                    Reflect.set(map.get(compareKey)!, fileName, content)
                }
            }
        })
    }
    addCache(ctxExamples, ctxMap)
    addCache(rawExamples, rawMap)
    isLoad = true
}

/**
 * 获取所有的案例
 * @param path 案例路径。注意：去掉 examples的 路径：如：'demo/table/basic/SgDataView.vue' => path 的值为：table/basic
 */
export const useLoadExampleFiles = (path: string) => {
    /* 用到再进行加载 */
    !isLoad && loadExample()
    const examplesPath = `${path}/examples`
    const requireCtxList = ctxMap.get(examplesPath)
    const requireCtxRawList = rawMap.get(examplesPath)
    return {
        examples: requireCtxList ?? {},
        examplesRaw: requireCtxRawList ?? {},
    }
}
