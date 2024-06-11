import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export const formatMenus = obj => {
    function $formatMenus(menus) {
        if (!Array.isArray(menus)) return []
        return menus.map(item => {
            return {
                label: item.permisionName,
                icon: item.permisionIcon,
                uri: item.permisionUrl,
                children: $formatMenus(item.children),
            }
        })
    }
    return {
        ...obj,
        wzLzMenus: [
            {
                label: '首页',
                icon: 'home',
                uri: '/index-home',
            },
            ...$formatMenus(obj.wzLzMenus),
        ],
    }
}

/**
 * @desc 节流函数
 * @param {需要节流的函数} func
 * @param {延迟时间} wait
 */
export function throttle(fun, delay) {
    let last, deferTimer
    return function(args) {
        const that = this
        const _args = arguments
        const now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function() {
                last = now
                fun.apply(that, _args)
            }, delay)
        } else {
            last = now
            fun.apply(that, _args)
        }
    }
}

/**
 * @desc 下载文件
 * @param {url}
 */
export function toLoadFile(url) {
    const { VUE_APP_ENV, VUE_APP_BASEURL_API } = process.env
    let prefix = ''
    if (VUE_APP_ENV === 'dev') {
        prefix = 'http://192.168.2.30:8081'
    } else {
        prefix = VUE_APP_BASEURL_API
    }
    window.open(`${prefix}/${url}`)
}

/**
 * @desc 下载文件(正式环境)
 * @param {文件名} fileName
 * @param {文件路径} filePath
 */
export function downloadFile(fileName, filePath) {
    const a = document.createElement('a')
    a.style.display = 'none'
    const { VUE_APP_BASEURL_API, DEV_PROXY_TARGET_API } = process.env
    const url = `${VUE_APP_BASEURL_API || DEV_PROXY_TARGET_API}/sysCommon/downloanWithName?fileName=${fileName}&filePath=${filePath}`
    a.href = url
    a.target = '_blank'
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(url)
    a.remove()
}

/**
 * @desc 表格统计函数
 * @param {表格数据} param
 */
export function getCommonSummaries(param = {}) {
    const { columns, data } = param
    const sums = []
    columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = '总计'
            return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
            const temp = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                    return prev + curr
                }
                return prev
            }, 0)
            sums[index] = temp.toFixed(2)
        } else {
            sums[index] = '/'
        }
    })
    return sums
}

/**
 * TODO
 * @description: 查看报告
 * @param {*} path: 报告路径
 * @return {*}
 */
export const previewReport = async path => {
    // const host = await store.dispatch('app/getHostName')
    // const href = path.startsWith('http') ? path : `http://${host}/${path}`
    //window.open(href, '_blank')
}

/**
 * @description: 元转换万元保留两位小数
 * @param {*} money: 金额(元)
 * @return {*}
 */
export function amountConversion(money = 0) {
    return money ? (money / 10000).toFixed(2) : 0
}

/**
 * @description: 平铺树转树
 * @param {*} data
 * @return {*}
 */
export function toTree(data) {
    const result = []
    if (!Array.isArray(data)) {
        return result
    }
    // 建立id索引表
    const map = {}
    data.forEach(item => {
        map[item.id] = item
    })
    data.forEach(item => {
        const parent = map[item.pid]
        if (parent) {
            ;(parent.children || (parent.children = [])).push(item)
        } else {
            result.push(item)
        }
    })
    return result
}

/* 跳转关联关系网络 - 只有客户正式有 */
export const openRelationAddress = relationPripid => {
    window.open(`http://154.184.1.218:8080/componentbase/relationnetall/showRelationPage?level=1&type=1&param=${relationPripid}&cityCode=522384s`, '_blank')
}

/**
 * @description: 深拷贝
 * @param {*} data
 * @return {*}
 */
export function deepCopy(data) {
    return JSON.parse(JSON.stringify(data))
}

/* 利率定价提交参数转换 */
export function transformParams(list = []) {
    if (!list.some(item => item.range)) return []
    const initObj = {
        leftSource: 0,
        seat: '',
        leftEqual: 1,
        leftAndRightOption: 0,
        rightEqual: 1,
        rightSource: 0,
    }
    return list.map(({ range = [], option, ...rest }) => {
        // 范围以下
        if (range[0] === '') {
            initObj.leftSource = range[5]
            initObj.leftEqual = range[4] === '' ? 1 : 0
            initObj.leftAndRightOption = -1
        } else {
            // 范围以上、至
            Object.keys(initObj).forEach((opt, i) => {
                if ([2, 3, 4].includes(i)) {
                    initObj[opt] = range[i] === '' ? 1 : 0
                } else {
                    initObj[opt] = range[i]
                }
            })
        }
        const showFormula = [...range]
        showFormula.splice(3, 0, 'X')
        const exFormula = [...showFormula].join('').split('X')
        const { seat, ...arg } = initObj
        /* 调整范围展示字段便于数据组处理 */
        if (range[0] && range[5]) {
            exFormula.splice(1, 0, 'X and X')
            rest.showFormula = exFormula.join('')
        } else {
            rest.showFormula = showFormula.join('')
        }
        return {
            ...rest,
            ...arg,
        }
    })
}
/* 输入预览转换区间 */
export function transformRange(showFormula) {
    const temp = showFormula.split('<')
    const leftContain = temp[1].includes('=') ? '=' : ''
    if (temp[0] === 'X') {
        return ['', '', '', '<', leftContain, temp[1].split('=').join('')]
        // return {
        //     leftEqual,
        //     leftSource: temp[1].split('=').join(''),
        //     leftAndRightOption: -1,
        // }
    }
    return [temp[0], '<', leftContain, temp.length === 3 ? '<' : '', temp[2]?.includes('=') ? '=' : '', temp[2]?.split('=').join('') ?? '']
    // return {
    //     leftEqual,
    //     leftSource: temp[0],
    //     leftAndRightOption: temp.length === 3 ? 0 : 1,
    //     rightEqual: temp[2].includes('=') ? 0 : 1,
    //     rightSource: temp[2].split('=').join(''),
    // }
}
/* 利率定价数据回填 */
export function fillData(data = []) {
    return data?.map(({ leftEqual, leftSource, leftAndRightOption, rightEqual, rightSource, result, ...rest }) => {
        const leftContain = leftEqual === 0 ? '=' : ''
        const rightContain = rightEqual === 0 ? '=' : ''
        // 范围以下
        if (leftAndRightOption === -1) {
            return {
                ...rest,
                range: ['', '', '', '<', leftContain, leftSource],
            }
        }
        // 范围以上、至
        const to = leftAndRightOption === 0 ? '<' : ''
        return {
            ...rest,
            range: [leftSource, '<', leftContain, to, rightContain, rightSource],
        }
    })
}
/* 数值范围校验 */
export function validRange(data = []) {
    return data
        .map(item => item.range)
        .every((opt = []) => {
            const notValid = (opt[0] && opt[3] && !opt[5]) || (!opt[0] && opt[1]) || (opt[3] && !opt[5])
            if (notValid) return false
            return true
        })
}
/*  导出页面为PDF格式
 *  name: 页面模块样式名称
 *  title: 导出pdf名称
 */
export const htmlToPdf = async (name, title) => {
    try {
        const element = document.querySelectorAll(`.${name}`)
        let count = 0
        const PDF = new JsPDF('', 'pt', 'a4')
        const pageArr = []
        const opts = {
            scale: 5, // 缩放比例，提高生成图片清晰度
            useCORS: true, // 允许加载跨域的图片
            allowTaint: false, // 允许图片跨域，和 useCORS 二者不可共同使用
            tainttest: true, // 检测每张图片已经加载完成
            logging: true, // 日志开关，发布的时候记得改成 false
        }
        for (const index in Array.from(element)) {
            const canvas = await html2Canvas(element[index], opts)
            // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            const contentWidth = canvas.width
            const contentHeight = canvas.height
            const imgWidth = 595.28
            const imgHeight = (592.28 / contentWidth) * contentHeight
            const pageData = canvas.toDataURL('image/jpeg', 1.0)
            // 一页pdf显示html页面生成的canvas高度;
            const pageHeight = (contentWidth / 592.28) * 841.89
            // 未生成pdf的html页面高度
            const leftHeight = contentHeight
            pageArr[index] = {
                pageData,
                pageHeight,
                leftHeight,
                imgWidth,
                imgHeight,
            }
            if (++count === element.length) {
                // 转换完毕，可进行下一步处理 pageDataArr
                let counts = 0
                for (const data of pageArr) {
                    // 页面偏移
                    let position = 0
                    // 转换完毕，save保存名称后浏览器会自动下载
                    // 当内容未超过pdf一页显示的范围，无需分页
                    if (data.leftHeight < data.pageHeight) {
                        // addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
                        PDF.addImage(data.pageData, 'JPEG', 0, 0, data.imgWidth, data.imgHeight)
                    } else {
                        // 超过一页时，分页打印（每页高度841.89）
                        while (data.leftHeight > 0) {
                            PDF.addImage(data.pageData, 'JPEG', 0, position, data.imgWidth, data.imgHeight)
                            data.leftHeight -= data.pageHeight
                            position -= 841.89
                            if (data.leftHeight > 0) {
                                PDF.addPage()
                            }
                        }
                    }
                    if (++counts === pageArr.length) {
                        PDF.save(title + '.pdf')
                    } else {
                        // 未转换到最后一页时，pdf增加一页
                        PDF.addPage()
                    }
                }
            }
        }
        return Promise.resolve(true)
    } catch (error) {
        return Promise.reject(false)
    }
}

/* 时间范围精确到时分秒 */
export const accurateEndDate = (endDate = '') => endDate.replace('00:00:00', '23:59:59')

/* 处理tooltip样式 */
export const formatTooltipStyle = (statushb, statustb) => {
    const style = {
        hb: statushb ? ['↑', '#E15A5A'] : ['↓', '#5AD8A6'],
        tb: statustb ? ['↑', '#E15A5A'] : ['↓', '#5AD8A6'],
        pd10: 'padding: 10px',
        mg10: 'margin: 0 10px;',
        dsFl: 'display: flex; align-items: center',
        circle: 'width: 10px;height: 10px; background: #2CAEE9;border-radius: 50%;margin-right: 5px',
    }
    statushb === '' && (style.hb[0] = '')
    statustb === '' && (style.tb[0] = '')
    return style
}
/* 归属机构树递归 */
export function recursionDeptCode(treeList = []) {
    return treeList.map(item => {
        const { id, name, children } = item
        if (children) {
            item.children = recursionDeptCode(children)
        }
        return {
            ...item,
            label: name,
            value: id,
        }
    })
}

/**
 * @description: 深拷贝对象
 * @param {*} obj 需要拷贝的对象
 * @param {*} cache 用于解决循环引用问题的缓存对象
 * @return {*}
 */
export function deepClone(obj, cache = new WeakMap()) {
    // 判断传入值，是否是对象
    if (obj === null || obj instanceof HTMLElement || obj instanceof Date || obj instanceof RegExp || typeof obj !== 'object') return obj
    // 从缓存中校对是否已复制
    if (cache.has(obj)) return cache.get(obj)
    // 通过new obj.constructor()巧妙的避免了对当前数据是数组还是真对象的判断
    const result = new obj.constructor()
    // 缓存复制的对象
    cache.set(obj, result)
    // 开始复制
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const _obj = obj[key]
            result[key] = deepClone(_obj, cache) //递归复制
        }
    }
    return result
}

/**
 * 解析json字符串
 * @param jsonStr json字符串
 * @param defaultValue 默认值
 * @returns
 */
export function parseJsonString(jsonStr, defaultValue) {
    let _jsonStr = jsonStr
    try {
        _jsonStr = decodeURIComponent(jsonStr)
    } catch (error) {}
    try {
        return JSON.parse(_jsonStr) ?? defaultValue
    } catch (error) {
        console.warn('解析json字符串失败: ', error)
    }
    return defaultValue
}
