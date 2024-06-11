import { tagsViewStore } from '../store/useStore'
import router from '../router'
export async function goBack($route: any, reload = false) {
    const query = $route.query || {}
    const { name = '', from = '' } = query
    await tagsViewStore.delView($route)
    // 如果上一页有缓存 保存或修改动作需要更新下上一页的缓存 也可以在上一页路由.meta.noCache=true 这样就不需要这个代码
    if (reload) {
        await tagsViewStore.delCachedView({
            name, // 上一页的路由名称
        })
    }
    router.push(from)

    //window.history.go(-1)
}
export async function go($route: any, options: any) {
    const { path, query } = options
    router.push({
        path,
        query: {
            ...query,
            // name: $route.name,
            // from: $route.fullPath,
        },
    })
}
export function open(options: any) {
    const { path, query } = options
    let routeUrl = router.resolve({
        path,
        query,
    })
    window.open(routeUrl.href, '_blank')
}

/**
 * 格式化命令 替换关键字
 * @param {string} str 字符串命令
 * @param {object} params 命令转换对象
 * @returns {any}
 * @example formatCommands("npm run build:${fat:123;prd:222}:$target",{"target":"prd"})
 */
export function formatCommands(str = '', options: any = {}) {
    let params = {
        ...options,
        env: options.target || '',
    }

    let result = str
        .replace(/\$\{(.*?)\}/g, (all, key) => {
            const datas: any = {}

            const keys = key.split(';')
            keys.forEach((item: any) => {
                let [label = '', value = ''] = item.split(':')
                label = label.trim()
                value = value.trim()
                datas[label] = value
            })

            if (datas[params['target']] !== undefined) {
                return datas[params['target']]
            }
            return params['target'] || all
        })
        .replace(/\$(\w+)/g, (all, key) => {
            // console.log(1, key, params)
            if (key === 'env' && params['env']?.indexOf('fat') > -1) {
                return 'fat'
            }

            if (params[key]) {
                return params[key]
            }

            return all
        })
    return result
}
