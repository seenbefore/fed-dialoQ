/**
 * 解析json
 * @param json
 * @param defaultValue
 * @returns
 */
export const parseJson = (json: any, defaultValue: any) => {
    if (typeof json !== 'string') return json || defaultValue
    if (!json) return defaultValue
    try {
        return JSON.parse(json)
    } catch (error) {
        console.log('json解析错误', error)
        return defaultValue
    }
}
