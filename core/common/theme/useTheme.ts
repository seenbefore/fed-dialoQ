// 引入主题库的修改样式helper
import { updateTheme, updateThemeVariables } from './update'
import { getURLParameters } from 'icinfo-util'

export const useTheme = (appStoreTheme: any) => {
    try {
        const { theme } = getURLParameters(location.href)
        const name: any = theme ?? appStoreTheme?.theme?.name

        updateTheme(name)
        appStoreTheme?.updateThemeName?.(name)
        const originVariables = appStoreTheme?.theme?.variable
        if (originVariables && Object.keys(originVariables).length) {
            updateThemeVariables(originVariables)
        }
    } catch (e) {
        console.error('主题设置失败，请清除缓存重试', e)
    }
    window.addEventListener('message', e => {
        if (e.data && e.data.type === 'updateTheme') {
            try {
                const data = e.data.data
                const parseData = typeof data === 'string' ? JSON.parse(data) : data
                updateThemeVariables(parseData)
                appStoreTheme?.updateThemeVariables?.(parseData)
            } catch (e) {
                console.error('主题设置失败，请检查传递的参数是否合理', e)
            }
        }
    })
}
