let nextIndex = 0

/**
 * 获取label的下一个名字
 * @param label
 */
export const getNextLabel = (label: string): string => {
    return `${label}${nextIndex++}`
}
