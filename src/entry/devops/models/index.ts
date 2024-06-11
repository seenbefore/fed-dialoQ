import dateFns_format from 'date-fns/format'
export * from './PipelineModel'
export function guid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

/**
 * 时间格式化
 * @param {String | Number | Date} date
 * @param {String} [format] 官方文档：https://date-fns.org/v1.30.1/docs/format#description
 * @return {String} result 格式化后的字符串
 * @example formatDate('YYYY年MM月DD日 HH时mm分ss秒SSS毫秒 Z时区 Q季度 X秒时间戳 x毫秒时间戳')
 */
export const formatDate = function(date: Date, format = 'YYYY-MM-DD') {
    if (!date) return ''
    if (format === '@iso') {
        format = 'YYYY-MM-DDTHH:mm:ss.SSSZ'
    }
    return dateFns_format(date, format)
}

export interface Result<T> {
    /**
     * 返回编码.200=成功
     */
    code: number

    /**
     * 返回信息
     */
    message: string

    /**
     * 返回数据
     */
    data: T
}

export interface Page<T> {
    /**
     * 返回编码.200=成功
     */
    total: number

    page: number
    pages: number
    pageSize: number
    /**
     * 返回数据
     */
    list: T
    data: T
}

export interface Review {
    /**
     * 主键
     */
    id: number

    /**
     * 标题
     */

    title: string
    /**
     * url
     */

    url: string
    /**
     * 项目
     */

    project: any

    /**
     * 项目名称
     */

    projectName: string
    /**
     * 项目id
     */

    projectId: string

    noteable_id: number
    /**
     * 检查内容
     */

    object_attributes: any

    /**
     * 不合格代码整合
     */

    notes: string

    noteList: string[]

    discussion_ids: string[]
    /**
     * 被检查人员id
     */

    developerId: string
    /**
     * 被检查人员名字
     */

    developerName: string
    /**
     * 检查人员id
     */

    reviewerId: string
    /**
     * 检查人员名字
     */

    reviewerName: string
    /**
     * 评审状态 1 初始化 2 评审中 3 通过 4 打回
     */

    state: any

    /**
     * 得分
     */

    score: number
    /**
     * 检查结果
     */
    result: '合格' | '不合格'
    /**
     * 检查结论
     */

    summary: '符合规范' | '不符合规范'

    /**
     * 发起日期
     */

    createdAt: any
    /**
     * 更新日期
     */

    updatedAt: any
    /**
     * 检查次数
     */
    count: number
    /**
     * 审查次数
     */
    reviewCount: number

    /**
     * 总分
     */
    points$: any
    bonusPoint$: any
    name?: string
}
