/**
 * 通用深度合并函数
 * @param target 默认对象
 * @param source 源对象（用户配置）
 * @returns 合并后的对象
 */
export function deepMerge<T extends object>(target: T, source?: Partial<T>): T {
    // 如果源对象为空，直接返回目标对象
    if (!source) return target

    // 如果目标对象为空，直接返回源对象
    if (!target) return source as T

    // 创建结果对象
    const result = { ...target }

    // 遍历源对象的所有属性
    Object.keys(source).forEach(key => {
        const targetValue = result[key as keyof T]
        const sourceValue = source[key as keyof T]

        // 如果源值是对象且不是数组，进行递归合并
        if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue) && targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)) {
            result[key as keyof T] = deepMerge(targetValue as object, sourceValue) as any
        } else {
            // 如果是基本类型或数组，直接替换
            result[key as keyof T] = sourceValue as any
        }
    })

    return result
}
