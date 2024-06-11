import dateFns_format from 'date-fns/format'
/**
 * 格式化秒
 * @param {String} value 总秒数
 * @return {String} result 格式化后的字符串
 */
export function formatSeconds(value: string | number) {
    let theTime = parseInt(value + '') // 需要转换的时间秒
    let theTime1 = 0 // 分
    let theTime2 = 0 // 小时
    let theTime3 = 0 // 天
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60 + '', 10)
        theTime = parseInt((theTime % 60) + '', 10)
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60 + '', 10)
            theTime1 = parseInt((theTime1 % 60) + '')
            if (theTime2 > 24) {
                //大于24小时
                theTime3 = parseInt(theTime2 / 24 + '')
                theTime2 = parseInt((theTime2 % 24) + '')
            }
        }
    }
    let result = ''
    if (theTime > 0) {
        result = '' + parseInt(theTime + '') + '秒'
    }
    if (theTime1 > 0) {
        result = '' + parseInt(theTime1 + '') + '分' + result
    }
    if (theTime2 > 0) {
        result = '' + parseInt(theTime2 + '') + '小时' + result
    }
    if (theTime3 > 0) {
        result = '' + parseInt(theTime3 + '') + '天' + result
    }
    return result
}

/**
 * 时间格式化
 * @param {String | Number | Date} date
 * @param {String} [format] 官方文档：https://date-fns.org/v1.30.1/docs/format#description
 * @return {String} result 格式化后的字符串
 * @example dateFormat('YYYY年MM月DD日 HH时mm分ss秒SSS毫秒 Z时区 Q季度 X秒时间戳 x毫秒时间戳')
 */
export const dateFormat = function(date: number | Date, format = 'YYYY-MM-DD') {
    if (!date) return ''
    if (format === '@iso') {
        format = 'YYYY-MM-DDTHH:mm:ss.SSSZ'
    }
    return dateFns_format(date, format)
}

const minute = 1000 * 60
const hour = minute * 60
const day = hour * 24

// 计算时间差
export function formatTimeAgo(date: string | number | Date, format = 'YYYY-MM-DD') {
    const dateTimeStamp = typeof date === 'object' ? date.valueOf() : +date
    let result = ''
    const now = new Date().getTime()
    const diffValue = now - dateTimeStamp
    if (diffValue < 0) {
        console.log('时间不对劲,服务器创建时间与当前时间不同步')
        return (result = '刚刚')
    }
    const dayC = parseInt(diffValue / day + '')
    const hourC = parseInt(diffValue / hour + '')
    const minC = parseInt(diffValue / minute + '')
    if (dayC > 30) {
        result = '' + dateFormat(dateTimeStamp, format)
    } else if (dayC > 1) {
        result = '' + dayC + '天前'
    } else if (dayC === 1) {
        result = '昨天 ' + dateFormat(dateTimeStamp, 'HH:mm:ss')
    } else if (hourC >= 1) {
        result = '' + hourC + '小时前'
    } else if (minC >= 5) {
        result = '' + minC + '分钟前'
    } else result = '刚刚'
    return result
}
