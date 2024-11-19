import Vue from 'vue'
import store from '@/store'
import http from '@/scripts/http'
import { deepClone } from 'icinfo-util'
import { FileTypeByArrayBufferStartWith } from './enum'
import { Message } from 'element-ui'
import { omit, cloneDeep } from 'lodash'
import { isCardId } from 'icinfo-util'
import { getDeptConfigInfoWithSpecialCondition } from './service/punish/config/deptParam'
import { LINECODE_MAP, LINE_CODE } from './enum'

/** 请求获取文件数据，并转成 Array Buffer*/
function _loadFile(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                resolve(xhr)
            }
        }
        xhr.onerror = reject
        xhr.open('GET', url, true)
        xhr.responseType = 'arraybuffer'
        xhr.send('')
    })
}
/** buffer 转 16 进制字符串 */
function _buf2hex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
}

/**判断是否为对象 */
export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
/**传参是否需要partyid: 0 不需要, 1 需要, */
function isNeedPartyId(isHas, params) {
    if (!isObject(params)) return new Error('传参需要对象')
    const _params = deepClone(params)
    if (_params.hasOwnProperty('partyId')) {
        if (+isHas === 0) {
            _params.partyId = ''
        }
        return _params
    } else {
        // 没有partyId直接返回
        return _params
    }
}
const IS_AJ_CODE = store?.state?.user?.info?.areaCode?.startsWith?.('330523')
/**是否安吉区域 */
export function GET_IS_AJ_CODE() {
    return store.state?.user?.info?.areaCode?.startsWith?.('330523')
}
/**柯桥综合区-是否展示行政行为相关 */
function isShowCaseActsCol() {
    return true
    // 因为报错，因此注释掉下面的
    // const { info = {} } = store.state.user
    // const areaCode = info.areaCode
    // // TODO 桥东才显示  发正式去除！
    // const obj = {
    //     '3306': '绍兴',
    //     '3308': '衢州',
    // }
    // const showCaseActsCol = Object.keys(obj).some(code => {
    //     return areaCode.startsWith(code)
    // })
    // return showCaseActsCol
}

// 返回文件扩展名
function getDocEXT(val) {
    // 原先写法
    // const list = val.match(/(?<=\.)([a-z|A-Z]*)$/g)
    // 兼容火狐
    // const i = val.indexOf('?')
    // if (i > -1) val = val.slice(0, i)
    // const reg = new RegExp('(?=.)([a-z|A-Z]*)$', 'g')
    // const list = val.match(reg)
    // return list ? list[0] : ''
    // 链接文件格式存在的位置太过特殊,故而直接判断链接中有(.文件类型)就直接断定该数据的格式
    // const fileTypes = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx']
    // return fileTypes.find(i => val?.includes?.(`.${i}`)) || ''
    const typeList =
        String(val)
            .toLowerCase()
            .split('.') || []
    return typeList?.slice(-1)?.[0] || ''
}
// 根据文件路径获取文件后缀（类型）
function fileType(url) {
    const newUrl = url ? url.split('?')[0] : ''
    const typeList =
        String(newUrl)
            .toLowerCase()
            .split('.') || []
    return typeList[typeList.length - 1]
}
// 是否为word文件
const isWord = url => {
    const wordList = ['docx', 'doc']
    const type = fileType(url)
    return wordList.includes(type)
}
// 是否为PDF文件
const isPdf = url => {
    const type = fileType(url)
    return type === 'pdf'
}
// 是否为P图片文件
const isImage = url => {
    const imgList = ['jpg', 'jpeg', 'png', 'gif', 'webp']
    const type = fileType(url)
    return imgList.includes(type)
}
// 是否为视频文件
const isVideo = url => {
    const videoList = ['mp4', 'webm', 'ogg']
    const type = fileType(url)
    return videoList.includes(type)
}

/**
 * 深度遍历树some方法
 * @param {*} tree
 * @param {*} callback
 * @returns
 */
const dfsTreeSome = (tree, callback, children = 'children') => {
    if (!Array.isArray(tree)) return
    tree.some(node => {
        const flag = callback(node)
        if (flag) return true
        dfsTreeSome(node[children], callback, children)
    })
}

/**
 * 根据叶节点id找到父节点id，目前只支持两级tree
 * @param {*} tree
 * @param {*} children
 * @returns
 */
const findParentNode = (tree, val, children = 'children', id = 'id') => {
    if (!Array.isArray(tree)) return
    let nodeItem = null
    tree.filter(node => {
        if (node[children]) {
            node[children].some(item => {
                if (item[id] == val) {
                    nodeItem = node
                    return true
                }
            })
        }
    })
    return nodeItem
}
/** 办案期限剩余时间：样式根据时效显示 */
const flagClass = expire => {
    if (expire == 'red') {
        return 'surplus-red'
    } else if (expire == 'orange') {
        return `surplus-orange`
    } else if (expire == 'yellow') {
        return `surplus-yellow`
    } else if (expire == 'green') {
        return `surplus-green`
    } else if (expire == 'blue') {
        return `surplus-blue`
    } else if (expire == 'gray') {
        return `surplus-gray`
    }
}

/**
 * 解析json
 * @param json
 * @param defaultValue
 * @returns
 */
const parseJson = (json, defaultValue) => {
    if (!json) return defaultValue
    try {
        return JSON.parse(json)
    } catch (error) {
        console.log('json解析错误', error)
        return defaultValue
    }
}

/**
 * 更新树型结构数据禁用状态
 * @param {*} selectedItems: 已选择的项
 * @param {*} idsKey: 已选树节点id集合
 * @param {*} treeData: 遍历的树型数据
 * @returns
 */
const updateTreeStatus = (selectedItems, idsKey, treeData, childrenKey) => {
    const selectedIds = []
    selectedItems.forEach(item => {
        let len = item[idsKey] ? item[idsKey].length : 0
        if (len) {
            let leafId = item[idsKey][len - 1]
            selectedIds.push(leafId)
        }
    })
    dfsTreeSome(
        treeData,
        item => {
            item.disabled = selectedIds.includes(item.nodeId)
        },
        childrenKey,
    )
}

/**
 * base64转换为blob方法
 * @param {*} base64Data: base64码图片数据
 * @returns
 */
const turnBase64DataToBlob = base64Data => {
    let blobURL = ''
    try {
        let byteString
        if (base64Data.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(base64Data.split(',')[1])
        } else {
            byteString = unescape(base64Data.split(',')[1])
        }
        let ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }
        let blob = new Blob([ia], {
            type: 'application/pdf',
        })
        blobURL = URL.createObjectURL(blob)
    } catch (err) {
        console.log(`转化blob流失败错误：${err}`)
    }
    return blobURL
}

// 将base64转换为blob
const dataURLtoBlob = dataurl => {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {
        type: mime,
    })
}
// 将blob转换为file
const blobToFile = (theBlob, fileName) => {
    // theBlob.lastModifiedDate = new Date()
    // theBlob.name = fileName
    // return <File>theBlob
    return new File([theBlob], fileName, {
        type: 'image/jpeg',
    })
}
/**
 * 深克隆对象数据
 * @returns
 */
const customDeepClone = (obj, cache = new WeakMap()) => {
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
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
            const _obj = obj[key]
            result[key] = customDeepClone(_obj, cache) //递归复制
        }
    }
    return result
}

/**
 * 节流防抖函数
 * @returns
 */
const debounce = (cb, delay = 1000) => {
    let timer
    return function() {
        const _self = this // 注意 this 指向
        const args = arguments // arguments中存着e
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            console.log(args)
            cb(_self, ...args)
        }, delay)
    }
}
/**
 * 装饰器防抖
 * @returns
 */
function debounceTs(time = 300) {
    let timeKey
    return function(target, propertyKey, descriptor) {
        const oldValue = descriptor.value
        descriptor.value = function(...props) {
            clearTimeout(timeKey)
            timeKey = setTimeout(() => {
                oldValue.apply(this, props)
            }, time)
        }
    }
}
/**
 * 台州、全省区分公用方法
 * @returns
 */
const envToAssign = async (queryParams, IsTzDetailPage, isOpen = true) => {
    const { data } = await http.get(`/punish/common/getIsTzDetailPage?caseId=${IsTzDetailPage}`)
    const { areaCode } = store.state.user.info
    const envAssign = areaCode && areaCode.startsWith('3310') ? true : false
    const basePath = process.env.BASE_URL
    let url = `${location.origin}${basePath}my-case`
    let path = ''
    /** 台州除A022、A094跳转台州案件详情，其余跳全省 */
    // if (envAssign) {
    //     if (data === 'false' ? false : true) {
    //         url += `/case-detail?${queryParams}`
    //     } else {
    //         url += `/case-detail-theme?${queryParams}`
    //     }
    // } else {
    //     url += `/case-detail-theme?${queryParams}`
    // }
    /** 台州除A022、A094跳转台州案件详情，其余跳全省 */
    path = envAssign && data !== 'false' ? '/case-detail' : '/case-detail-theme'
    url += `${path}?${queryParams}`
    if (isOpen) {
        window.open(url, queryParams)
        return
    }
    return {
        path,
        query: queryParams,
    }
}
/**新开窗口 */
export const handleWindowOpen = (path, queryParams = '') => {
    const basePath = process.env.BASE_URL
    let url = `${location.origin}${basePath}` + path
    window.open(url, queryParams)
}

/**
 * 跳转企业详情
 */
const openEntDetail = code => {
    if (!code) {
        return Message.error('暂无全景查询')
    }
    let newpage = `https://zjzfpt.zjzwfw.gov.cn/qjcx-homesite-index/ent-detail?projectCode=xzzf&unicode=${code}&token=${store.getters.token}`
    window.open(newpage, '_blank')
}

/**
 * 根据documentCatalogCode判断人社、应急、综合
 * isCase
 */
const isLineByDocumentCatalogCode = documentCatalogCode => {
    if (!documentCatalogCode) return ''
    let documentCode = ''

    if (documentCatalogCode.length === 27) {
        documentCode = documentCatalogCode.slice(3)
    } else {
        documentCode = documentCatalogCode.slice(0, 4)
    }
    for (const key in LINECODE_MAP) {
        if (documentCode.startsWith(LINECODE_MAP[key])) return key
    }
    return 'normal'
}
/**
 * object 数据比较
 * @param newData // 新数据
 * @param oldData // 旧数据
 * @param config // 原列表数据
 * @returns [{key:{newValue:'',oldValue:'',parentKeys:[]}}]
 */
const dataContrast = (newData, oldData, config) => {
    const getObjectValues = arr => (arr || []).map(i => Object.values(i).join()).join()
    const differenceList = []
    const add = (newValue, oldValue, key, parentKeys) => {
        differenceList.push({
            columnContentAfterModify: newValue || '-',
            columnContentBeforeModify: oldValue || '-',
            modifyColumn: key,
            parentKeys,
        })
    }
    const isObject = val => Object.prototype.toString.call(val) === '[object Object]'
    const isArray = val => Array.isArray(val)
    const isEveryStringByArr = arr => arr.every(item => typeof item === 'string')
    const query = (newD, oldD, parentKey = []) => {
        if (isArray(newD) || isArray(oldD)) {
            newD.forEach((t, it) => {
                query(t, oldD?.[it], parentKey)
            })
            return
        }
        if (isObject(newD) && isObject(oldD)) {
            Object.keys(newD).forEach(i => {
                if (isObject(newD[i]) && isObject(oldD[i])) {
                    query(newD[i], oldD[i], [...parentKey, i])
                    return
                }
                if (isArray(newD[i]) || isArray(oldD[i])) {
                    // if (JSON.stringify(newD[i]) !== JSON.stringify(oldD[i])) add(getObjectValues(newD[i]), getObjectValues(oldD[i]), i, parentKey)
                    // add(newD[i], oldD[i], i, parentKey)
                    if (JSON.stringify(newD[i]) !== JSON.stringify(oldD[i])) {
                        newD[i].forEach((t, it) => {
                            query(t, oldD[i]?.[it], parentKey)
                        })
                    }
                    return
                }
                const newDCop = newD[i] ?? ''
                const oldDCop = oldD[i] ?? ''
                if (newDCop !== oldDCop) add(newD[i], oldD[i], i, parentKey)
            })
        }
    }
    query(newData, oldData)
    /* modifyColumn中需要过滤的字段 */
    const filterConfigKeys = ['apiOptions']
    return differenceList.map(i => {
        return {
            ...i,
            ...omit(config[i.modifyColumn] ?? {}, filterConfigKeys),
            modifyColumnName: config[i.modifyColumn]?.templateFieldCn || config[i.modifyColumn]?.fieldName,
        }
    })
}
/**
 * 对象数据差异比较
 * @param {*} newObj 新数据
 * @param {*} oldObj 旧数据
 * @param config 存在差异的数据中 指定key的数据创建 附带参数
 * @param ignoreKey 忽略的key，默认空不忽略。
 * @returns 存在差异的数据
 */
function diffObjects(newObj, oldObj, config, ignoreKey = []) {
    const differenceList = []
    const add = (newValue, oldValue, key, parentKeys) => {
        if (ignoreKey.includes(key)) return
        differenceList.push({
            columnContentAfterModify: newValue || '-',
            columnContentBeforeModify: oldValue || '-',
            modifyColumn: key,
            parentKeys,
            ...config[key],
            modifyColumnName: config[key]?.templateFieldCn || config[key]?.fieldName,
        })
    }
    function compareObjects(newObj, oldObj, path = []) {
        const keys = Object.keys(newObj)

        keys.forEach(key => {
            const newPath = path.concat(key)

            if (typeof newObj[key] === 'object' && newObj[key] !== null) {
                if (typeof oldObj[key] !== 'object' || oldObj[key] === null) {
                    add(newObj[key], oldObj[key], key, newPath)
                } else {
                    compareObjects(newObj[key], oldObj[key], newPath)
                }
            } else if (newObj[key] !== oldObj[key]) {
                add(newObj[key], oldObj[key], key, newPath)
            }
        })
    }

    compareObjects(newObj, oldObj)

    return differenceList
}
/**
 * 正则替换${}中的字符串
 * @param str // 字符串
 * @param format // 替换的字符串的规则
 * @returns 新的字符串
 */
const matching = (str, format = v => v) => {
    const reg = /\$\{(.+?)\}/
    const reg_g = /\$\{(.+?)\}/g
    const result = str.match(reg_g)
    const list =
        result?.reduce((pre, item) => {
            pre.push(item.match(reg)[1])
            return pre
        }, []) ?? []
    list.forEach((i, index) => {
        str = str.replace(result[index], format(i))
    })
    return str
}
/**
 * 输入框中的空格和&nbsp相互转换
 * @param toNbsp // true 为空格转&nbsp，false 反之
 */
const formatNbsp = (str, toNbsp = true) => {
    str = decodeURI(toNbsp ? encodeURI(str).replace(/%20%20%20/g, '&nbsp;') : encodeURI(str).replace(/&nbsp;/g, '%20%20%20'))
    return str
}

/** 截掉域名：如果是 oss 的PDF 需要代理一下地址 */
const getPDFUrl = url => {
    let res = ''
    if (url.indexOf('https://csoss-test.oss-cn-shanghai.aliyuncs.com') === 0) {
        const splitArr = url.split('/')?.slice(3)
        const urlNew = `/@API_PDF/${splitArr.join('/')}`
        res = `/static/pdfjs-v3.3.122/web/viewer.html?file=${encodeURI(urlNew)}`
    } else res = url

    return res
}
/** 根据出生日期计算周岁
 * @param {*} birthday: 格式为yyyy-MM-dd
 */
const jsGetAge = birthday => {
    if (!birthday) return ''
    let returnAge
    const strBirthdayArr = birthday.split('-')
    const birthYear = Number(strBirthdayArr[0])
    const birthMonth = Number(strBirthdayArr[1])
    const birthDay = Number(strBirthdayArr[2])
    const d = new Date()
    const nowYear = d.getFullYear()
    const nowMonth = d.getMonth() + 1
    const nowDay = d.getDate()
    if (nowYear == birthYear) {
        returnAge = 0 //同年 则为0岁
    } else {
        let ageDiff = nowYear - birthYear //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                const dayDiff = nowDay - birthDay //日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1
                } else {
                    returnAge = ageDiff
                }
            } else {
                const monthDiff = nowMonth - birthMonth //月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1
                } else {
                    returnAge = ageDiff
                }
            }
        } else {
            returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge //返回周岁年龄
}

/**
 * 判断表单规定字段是不是都为空
 * @param form 表单数据，object
 * @param keys 定字段 array
 * @returns 是否都为空
 */
const isFormEmpty = (form, keys) => keys.every(i => !(form[i] ?? '').length)
/**
 * 获取文件类型,暂时只支持 pdf\jpg\png（可以通过传入修改fileTypes来实现支持其它类型）
 * @param file 文件二进制流||文件名称
 * @param fileTypes 文件类型配置
 * @returns type文件类型 name文件名称
 */
const getFileOpt = (
    file,
    fileTypes = [
        {
            type: 'image/png',
            suffix: 'png',
            typeName: 'png',
        },
        {
            type: 'image/jpeg',
            suffix: 'jpg',
            typeName: 'jpg',
        },
        {
            type: 'image/jpeg',
            suffix: 'jpeg',
            typeName: 'jpeg',
        },
        {
            type: 'image/gif',
            suffix: 'gif',
            typeName: 'gif',
        },
        {
            type: 'application/pdf',
            suffix: 'pdf',
            typeName: 'pdf',
        },
        {
            type: 'application/msword',
            suffix: 'doc',
            typeName: 'doc',
        },
        {
            type: 'video/mp4',
            suffix: 'mp4',
            typeName: 'mp4',
        },
        {
            type: 'audio/mpeg',
            suffix: 'mp3',
            typeName: 'mp3',
        },
    ],
) => {
    let typeName = ''
    let typeCode = ''
    let appendixName = ''
    if (file instanceof File) {
        typeName = fileTypes.find(i => i.type === file.type)?.typeName ?? ''
        appendixName = file?.name ?? ''
        typeCode = file.type
    } else {
        appendixName = file ?? ''
        const suffix = appendixName?.split?.('.')?.pop?.()
        console.log(fileTypes, suffix?.toLowerCase(), 'suffix')
        typeName = fileTypes.some(i => i.suffix === suffix?.toLowerCase()) ? suffix : ''
        typeCode = fileTypes.find(i => i.typeName === suffix?.toLowerCase())?.type ?? ''
    }
    return {
        type: typeName?.toLowerCase(),
        name: appendixName?.replace?.(new RegExp(`.${typeName}`, 'g'), '')?.replace?.(new RegExp(`.${typeName?.toUpperCase()}`, 'g'), ''),
        typeCode,
    }
}

/**
 * 根据documentKindCode  获取对应的 documentCatalogCode  调用此方法 先确认store.getters.allDocumentList有值
 * @param {Array<string>} arr  documentKindCode[]
 * @returns documentCatalogCode[]
 */
const getCatalogcodeByKindCode = (arr = []) => {
    if (!store.getters.allDocumentList.length) {
        throw new Error('请确认allDocumentList有值')
    }
    const catalogcodeList = []
    store.getters.allDocumentList.reduce((pre, { documentKindCode, documentCatalogCode }) => {
        arr.includes(documentKindCode) && pre.push(documentCatalogCode)
        return pre
    }, catalogcodeList)
    return catalogcodeList
}

/**
 * @description: 校验统一社会信用代码
 * @param {string} value
 * @return {boolean}
 */
const validUnifiedSocialCreditCode = value => {
    const reg = /^([1-9NY]{1})([1-9]{1})([0-9ABCDEFGHJKLMNPQRTUWXY]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-9ABCDEFGHJKLMNPQRTUWXY])$/
    return reg.test(value)
}

/**
 * @description: 判断其他组织的统一社会信用代码： 统一社会信用代码校验规则调整为5-30位都支持，且允许包含数字、汉字、字母、符号
 * @param {string} value
 * @return {boolean}
 */
const validOtherOrganizationCreditCode = value => {
    if (!value) return false
    const length = value.length
    return length >= 5 && length <= 30
}

// 判断字符串是否数字且大于等于0
function isPositiveNumber(str) {
    // const reg = /^\d+$/
    // console.log(reg.test(str))
    // if (reg.test(str)) {
    //     const num = Number(str)
    //     if (num >= 0) {
    //         return true
    //     }
    // }
    // return false
    if (typeof str !== 'string') return false
    const num = Number(str)
    return !isNaN(num) && !isNaN(parseFloat(str)) && num >= 0
}

// openPath
function openPath(url) {
    const basePath = process.env.BASE_URL
    url = `${location.origin}${basePath}${url}`
    window.open(url)
}

/**
 * @param {string | Array<string>} val 当事人名称
 * @description 对当事人名称脱敏  张三 -> 张某某
 * @return {string}
 */
export function handleSensitivityName(val) {
    if (!val || val === '/') return '/'
    if (Array.isArray(val)) {
        return val
            .filter(Boolean)
            .map(item => handleSensitivityName(item))
            .join(',')
    }
    if (val.includes(',')) {
        return handleSensitivityName(val.split(','))
    }
    return val?.trim()?.slice(0, 1) + '某某'
}
/**
 *
 * @param {w} idCard
 * @returns
 * 使用示例
 * const idCard = "身份证号码"; // 请替换为实际的身份证号码
 * const result = parseIDCard(idCard);
 * console.log(result);
 */
function parseIDCard(idCard) {
    if (!isCardId(idCard)) {
        throw Error('无效的身份证号')
    }
    const provinceCode = idCard.substring(0, 2)
    const birth = idCard.substring(6, 10) + '-' + idCard.substring(10, 12) + '-' + idCard.substring(12, 14)
    const sexCode = parseInt(idCard.charAt(16), 10)
    const sex = sexCode % 2 === 0 ? '女' : '男'

    // // 省、直辖市、自治区对照表
    // const provinceMap = {
    //     11: '北京',
    //     12: '天津',
    //     13: '河北',
    //     14: '山西',
    //     15: '内蒙古',
    //     // 添加更多省份代码和对应的省份名称
    // }

    // const province = provinceMap[provinceCode] || '未知省份'

    return {
        provinceCode,
        birth,
        sex,
    }
}
/**点击下载 */
export function handleDownload(url = '', name) {
    if (!url) return
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = name || ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a) // 下载完移除元素
}

/**获取单位参数配置信息 */
export async function retGetDeptConfigInfoWithSpecialCondition() {
    const userInfo = store.getters.userInfo
    const { data } = await getDeptConfigInfoWithSpecialCondition({ orgCode: userInfo.orgCode })
    return data
}

/**判断当前登录部门 省建设厅 */
export function isProvinceDept() {
    const userInfo = store.getters.userInfo
    return userInfo.orgName?.includes('省建设厅')
}

export {
    IS_AJ_CODE,
    _loadFile,
    getDocEXT,
    isWord,
    isPdf,
    isImage,
    isVideo,
    dfsTreeSome,
    findParentNode,
    flagClass,
    parseJson,
    updateTreeStatus,
    turnBase64DataToBlob,
    dataURLtoBlob,
    blobToFile,
    customDeepClone,
    debounce,
    debounceTs,
    envToAssign,
    openEntDetail,
    isLineByDocumentCatalogCode,
    isShowCaseActsCol,
    isNeedPartyId,
    dataContrast,
    diffObjects,
    matching,
    formatNbsp,
    getPDFUrl,
    jsGetAge,
    isFormEmpty,
    getFileOpt,
    getCatalogcodeByKindCode,
    validUnifiedSocialCreditCode,
    isPositiveNumber,
    openPath,
    parseIDCard,
    validOtherOrganizationCreditCode,
}
