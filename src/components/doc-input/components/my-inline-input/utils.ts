/**
 * 获取指定长度的全角空格文本
 * @param num 全角空格数量
 * @returns
 */
export const getFullwidthSpace = (num: number, htmlTag = false) => {
    if (num < 0) return ''
    const dom: HTMLElement = document.createElement('span')
    dom.innerHTML = new Array(num).fill(`&emsp;`).join('')
    return htmlTag ? dom.innerHTML : dom.innerText
}

/**
 * 清洗文本
 * @param text
 * @param filterNewline 过滤换行
 */
export const HTMLFilter = (text: string, filterNewline = true) => {
    // text = text ? text.replace(/<\/?.+?>/g, '') : ''
    text = text ? text.replace(/<([a-z]+)[^>]*>/gi, '') : ''
    if (filterNewline) text.replace(/[\r\n]/g, '')
    return text
}

/**
 * 清除首尾空格
 * @param text
 * @param filterNewline 过滤换行
 * @returns
 */
export const clearEndSpace = (text: string, filterNewline = true) => {
    if (filterNewline) {
        return text.replace(/([\r\n]+)/g, '').replace(/(\s*$)/g, '')
    }
    // return text.replace(/([\t\f\v]*$)/g, '')
    return text.replace(/([  \f\t\v]*$)/g, '')
}

/**
 * 转换为数字
 * @param text 带转换的文本
 * @param decimals 保留几位小数
 */
export const transformNumber = (text: string, decimals = 0) => {
    if (!text) return ''
    if (decimals === 0) return text.replace(/[^0-9]/gi, '')
    const pattern = /[^0-9.]/gi
    // 过滤出数字和小数点
    const temp = text.replace(pattern, '')
    // 小数点位置
    let pointIndex = -1
    // 过滤掉多余的小数点
    const number = temp
        .split('')
        .map((item, index) => {
            if (item === '.') {
                if (pointIndex > -1) return ''
                pointIndex = index
            }
            return item
        })
        .join('')
    if (pointIndex > -1) {
        return number.substring(0, pointIndex + decimals + 1)
    }
    return number
}

/**
 * 获取当前光标位置
 * @param element 当前元素
 * @returns
 */
export const getCursortPosition = function(element: HTMLElement, allowNewline = false) {
    let caretOffset = 0
    let caretContainerIndex = 0
    const doc: any = element.ownerDocument || (element as any).document
    const win = doc.defaultView || doc.parentWindow
    let sel
    if (typeof win.getSelection != 'undefined') {
        //谷歌、火狐
        sel = win.getSelection()
        if (sel.rangeCount > 0) {
            //选中的区域
            const range = win.getSelection().getRangeAt(0)
            const preCaretRange = range.cloneRange() //克隆一个选中区域
            // 如果获取的区域有换行时
            if (allowNewline && element.childNodes.length > 1) {
                preCaretRange.selectNodeContents(range.commonAncestorContainer) //设置选中区域的节点内容为当前节点
                preCaretRange.setEnd(range.endContainer, range.endOffset) //重置选中区域的结束位置
                caretOffset = preCaretRange.toString().length
                Array.from(element.childNodes).some((item, index) => {
                    if (item === preCaretRange.endContainer) {
                        caretContainerIndex = index
                    }
                })
            } else {
                preCaretRange.selectNodeContents(element) //设置选中区域的节点内容为当前节点
                preCaretRange.setEnd(range.endContainer, range.endOffset) //重置选中区域的结束位置
                caretOffset = preCaretRange.toString().length
            }
        }
    } else if ((sel = doc.selection) && sel.type != 'Control') {
        //IE
        const textRange = sel.createRange()
        const preCaretTextRange = doc.body.createTextRange()
        preCaretTextRange.moveToElementText(element)
        preCaretTextRange.setEndPoint('EndToEnd', textRange)
        caretOffset = preCaretTextRange.text.length
    }
    return { caretOffset, caretContainerIndex }
}

/**
 * 设置光标位置
 * @param element 当前元素
 * @param pos 光标位置
 */
export const setCaretPosition = function(element: HTMLElement, pos: number, caretContainerIndex = 0) {
    let range: any,
        selection: any,
        exceedCaretContainerIndex = false
    if (document.createRange) {
        //Firefox, Chrome, Opera, Safari, IE 9+
        range = document.createRange() //创建一个选中区域
        range.selectNodeContents(element) //选中节点的内容
        if (element.innerHTML.length > 0) {
            const maxCaretContainerIndex = element.childNodes.length - 1
            // 如果光标容器下标大于最大下标，则赋予最大下标
            if (caretContainerIndex > maxCaretContainerIndex) {
                exceedCaretContainerIndex = true
                caretContainerIndex = maxCaretContainerIndex
                // 如果最后一个是br，则倒退一个位置
                if (element.childNodes[maxCaretContainerIndex].nodeName.toLowerCase() === 'br' && caretContainerIndex > 0) {
                    caretContainerIndex--
                }
            }
            const text = element.childNodes[caretContainerIndex].textContent || ''
            const maxTextLen = text.length || 0
            range.setStart(element.childNodes[caretContainerIndex], exceedCaretContainerIndex ? maxTextLen : Math.min(pos, maxTextLen)) //设置光标起始为指定位置
        }
        range.collapse(true) //设置选中区域为一个点
        selection = window.getSelection() //获取当前选中区域
        selection.removeAllRanges() //移出所有的选中范围
        selection.addRange(range) //添加新建的范围
    } else if ((document as any).selection) {
        //IE 8 and lower
        range = (document.body as any).createTextRange() //Create a range (a range is a like the selection but invisible)
        range.moveToElementText(element) //Select the entire contents of the element with the range
        range.collapse(false) //collapse the range to the end point. false means collapse to end rather than the start
        range.select() //Select the range (make it the visible selection
    }
}

/**
 * 将光标定位到最前面
 * @param obj
 */
export const keepFirstIndex = function(obj: any) {
    if (window.getSelection) {
        //ie11 10 9 ff safari
        obj.focus() //解决ff不获取焦点无法定位问题
        const range = window.getSelection() as Selection //创建range
        range.selectAllChildren(obj) //range 选择obj下所有子内容
        range.collapseToStart() //光标移至最前
    } else if ((document as any).selection) {
        //ie10 9 8 7 6 5
        const range = (document.body as any).createRange() //创建选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(obj) //range定位到obj
        // range.collapse(false) //光标移至最后
        range.collapse(true) //光标移至最后
        range.select()
    }
}
