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
export const dateFormat = function(date: string | number | Date, format = 'YYYY-MM-DD') {
    if (!date) return ''
    if (format === '@iso') {
        format = 'YYYY-MM-DDTHH:mm:ss.SSSZ'
    }
    return dateFns_format(date, format)
}
export const formatDate = dateFormat
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
/**
 * 返回当月到今天的时间 [start, end]
 */
export function getCurrentMonthDateRange() {
    let date = new Date() //获取新的时间
    //获取当前年份,并且转为字符串
    let year = date.getFullYear().toString()
    //获取当前月份，因为月份是要从0开始，此处要加1，
    //使用三元表达式，判断是否小于10，如果是的话，就在字符串前面拼接'0'
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
    //获取天，判断是否小于10，如果是的话，就在在字符串前面拼接'0'
    let day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()
    //字符串拼接，将开始时间和结束时间进行拼接
    let start = year + '-' + month + '-01' //当月第一天
    let end = year + '-' + month + '-' + day //当天
    // console.log([
    //     dateFormat(
    //         new Date(new Date(start).setHours(0, 0, 0, 0)),
    //         'YYYY-MM-DD HH:mm:ss',
    //     ),
    //     dateFormat(
    //         new Date(new Date(end).setHours(23, 59, 59, 0)),
    //         'YYYY-MM-DD HH:mm:ss',
    //     ),
    // ])
    //将值设置给组件DatePicker 绑定的数据
    return [dateFormat(new Date(new Date(start).setHours(0, 0, 0, 0)), 'YYYY-MM-DD HH:mm:ss'), dateFormat(new Date(new Date(end).setHours(23, 59, 59, 0)), 'YYYY-MM-DD HH:mm:ss')]
}

/**
 * 返回当月到今天的时间 [start, end]
 */
export function getKPIDateRange() {
    let date = new Date()
    let year = date.getFullYear()
    let day = date.getDate()

    let month = date.getMonth() + 1
    let monthStr = month < 10 ? '0' + month.toString() : month.toString()
    let preMonth = month - 1
    let nextMonth = month + 1
    if (day <= 19) {
        let preMonthYear = year
        if (preMonth === 0) {
            preMonthYear = preMonthYear - 1
            preMonth = 12
        }
        let preMonthStr = preMonth < 10 ? '0' + preMonth.toString() : preMonth.toString()

        let end = year + '-' + monthStr + '-19' // 当月19
        let start = preMonthYear + '-' + preMonthStr + '-20' // 上月20号

        return [dateFormat(new Date(new Date(start).setHours(0, 0, 0, 0)), 'YYYY-MM-DD HH:mm:ss'), dateFormat(new Date(new Date(end).setHours(23, 59, 59, 0)), 'YYYY-MM-DD HH:mm:ss')]
    } else {
        let nextMonthYear = year
        if (nextMonth === 13) {
            nextMonthYear = year + 1
            nextMonth = 1
        }
        let nextMonthStr = nextMonth < 10 ? '0' + nextMonth.toString() : nextMonth.toString()

        let end = nextMonthYear + '-' + nextMonthStr + '-19' // 当月19
        let start = year + '-' + month + '-20' // 上月20号

        return [dateFormat(new Date(new Date(start).setHours(0, 0, 0, 0)), 'YYYY-MM-DD HH:mm:ss'), dateFormat(new Date(new Date(end).setHours(23, 59, 59, 0)), 'YYYY-MM-DD HH:mm:ss')]
    }
}
