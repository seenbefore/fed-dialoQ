import { isMobile } from 'icinfo-util'
/**校验座机 */
export const isValidTelephone = val => {
    let reg = /^0\d{2,3}-?\d{7,8}$/
    return reg.test(val)
}
// 校验联系电话 (包括座机,手机)
export const validPhone = (value: string, rule?: any, type?: string) => {
    if (value && value.trim()) {
        const telNum = value.trim()
        switch (type) {
            case 'mobile': //只校验手机号
                return isMobile(telNum)
            case 'tel': //只校验座机号
                return isValidTelephone(telNum)
            default:
                return isMobile(telNum) || isValidTelephone(telNum)
        }
    }
    return true
}

/**校验单位当事人名称是否满足 *、null、test，或字数少于2字 */
export function checkPartyNameLose(str: string) {
    if (!str) return false
    return /^\*$|^null$|^test$|^.{0,1}$/.test(str.toLowerCase())
}

/**
 * @description: 限制日期选择器只能选择今天之前的几年和今天之后的几年
 * @param {*} time 日期
 * @param {*} year 年份
 * @return {*}
 */
export function disabledDateYear(time: Date, year = 3) {
    const threeYearsAgo = new Date(Date.now() - year * 365 * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000)
    const threeYearsFromNow = new Date(Date.now() + year * 365 * 24 * 60 * 60 * 1000)
    return time.getTime() < threeYearsAgo.getTime() || time.getTime() > threeYearsFromNow.getTime()
}
/**时间限制 */
enum DateUnit {
    /**天 */
    DAY = '天',
    /**月 */
    MONTH = '月',
    /**年 */
    YEAR = '年',
}
/**时间限制类型 */
enum EDateLimitRangeType {
    /**只限制前面 */
    PREFIX = '1',
    /**只限制后面 */
    SUFFIX = '2',
    /**前后都限制 */
    BOTH = '3',
}

type DateOption = [DateUnit, string]

interface IDisabledDate {
    dateLimitRange: DateOption
    dateLimitRangeType: EDateLimitRangeType
}

/**
 * 根据限制范围禁用日期
 *
 * @param time 日期对象
 * @param options 禁用日期的选项
 * @returns 返回布尔值，表示是否禁用该日期
 */
export function disabledDateByLimitRange(time: Date, options: IDisabledDate) {
    const [dateUnit, dateTypeValue] = options.dateLimitRange

    let selectDateTypeValue: number
    if (dateUnit === DateUnit.DAY) {
        selectDateTypeValue = +dateTypeValue * 24 * 60 * 60 * 1000
    } else if (dateUnit === DateUnit.MONTH) {
        const now = new Date()
        const future = new Date(now.setMonth(now.getMonth() + +dateTypeValue))
        selectDateTypeValue = future.getTime() - Date.now()
    } else {
        const now = new Date()
        const future = new Date(now.setFullYear(now.getFullYear() + +dateTypeValue))
        selectDateTypeValue = future.getTime() - Date.now()
    }

    const prefixDate = new Date(Date.now() - selectDateTypeValue - 24 * 60 * 60 * 1000)
    const suffixDate = new Date(Date.now() + selectDateTypeValue)

    const timeValue = time.getTime()
    const prefixValue = prefixDate.getTime()
    const suffixValue = suffixDate.getTime()

    if (options.dateLimitRangeType === EDateLimitRangeType.PREFIX) {
        return timeValue < prefixValue
    }

    if (options.dateLimitRangeType === EDateLimitRangeType.SUFFIX) {
        return timeValue > suffixValue
    }

    return timeValue < prefixValue || timeValue > suffixValue
}
