import Vue from 'vue'

export const getRequireContextComponents = (files: __WebpackModuleApi.RequireContext, filter?: (key: string) => boolean) => {
    const components: Obj = {}

    files.keys().forEach(key => {
        if (!filter || filter(key)) {
            const file = files(key).default || files(key)
            const options = file.options || {}
            // 获取TS的组件名 否则用组件的文件目录名称作为组件名
            const name = options.name || file.name || key
            Reflect.set(components, name, file)
        }
    })

    return components
}

export const registryRequireContextComponents = (files: __WebpackModuleApi.RequireContext, VueInstance: typeof Vue, filter?: (key: string) => boolean) => {
    const components = getRequireContextComponents(files, filter)
    Object.entries(components).forEach(([key, value]) => VueInstance.component(key, value))
}
