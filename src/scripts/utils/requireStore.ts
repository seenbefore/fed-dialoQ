export const requireStore = (files: __WebpackModuleApi.RequireContext) => {
    const modules: any = {}

    files.keys().forEach((key: any) => {
        if (key === './index.ts') return
        const path = key.replace(/(\.\/|\.ts)/g, '')

        const [namespace, imported] = path.split('/')
        if (!modules[namespace]) {
            modules[namespace] = {
                namespaced: true,
            }
        }
        modules[namespace] = files(key).default
    })

    return modules
}
