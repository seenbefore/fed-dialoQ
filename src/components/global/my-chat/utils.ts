/**
 * 生成UUID
 * @returns UUID字符串
 */
export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

/**
 * 格式化日期时间
 * @param date 日期对象或时间戳
 * @param format 格式化模板，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export function formatDateTime(date: Date | number | string, format = 'YYYY-MM-DD HH:mm:ss'): string {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()
    const second = d.getSeconds()

    return format
        .replace(/YYYY/g, year.toString())
        .replace(/MM/g, month.toString().padStart(2, '0'))
        .replace(/DD/g, day.toString().padStart(2, '0'))
        .replace(/HH/g, hour.toString().padStart(2, '0'))
        .replace(/mm/g, minute.toString().padStart(2, '0'))
        .replace(/ss/g, second.toString().padStart(2, '0'))
}

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns 是否复制成功
 */
export function copyToClipboard(text: string): boolean {
    try {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        const result = document.execCommand('copy')
        document.body.removeChild(textarea)
        return result
    } catch (error) {
        console.error('复制到剪贴板失败:', error)
        return false
    }
}

/**
 * 截断文本
 * @param text 原始文本
 * @param maxLength 最大长度
 * @param suffix 后缀，默认为'...'
 * @returns 截断后的文本
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
    if (!text || text.length <= maxLength) {
        return text
    }
    return text.substring(0, maxLength) + suffix
}
