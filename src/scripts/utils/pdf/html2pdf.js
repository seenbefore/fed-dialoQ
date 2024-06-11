import jsPdf from 'jspdf'
import html2canvas from 'html2canvas'

/** 打印基本元素类名 */
export const HTML2PDF_CLASS_NAME_BASIC = 'html-to-pdf-item-basic'
/** 整体打印不截断类名 */
export const HTML2PDF_CLASS_NAME_WHOLE = 'html-to-pdf-item-whole'
/** 悬浮元素 */
export const HTML2PDF_CLASS_NAME_FXIED = 'html-to-pdf-item-fixed'
/** 表格类名 */
export const HTML2PDF_CLASS_NAME_TABLE = 'html-to-pdf-item-table'
/** 表头类名 */
export const HTML2PDF_CLASS_NAME_LIST_HEAD = 'html-to-classname-table-head'
/** 表行类名 */
export const HTML2PDF_CLASS_NAME_LIST_ROW = 'html-to-classname-table-row'
/** 表示行在组里 */
export const HTML2PDF_CLASS_NAME_LIST_ROW_IN_GROUP = 'html-to-classname-table-row-in-group'
/** 表行组类名 */
export const HTML2PDF_CLASS_NAME_LIST_ROW_GROUP = 'html-to-classname-table-row-group'
/** 列表类名 */
export const HTML2PDF_CLASS_NAME_LIST = 'html-to-pdf-item-list'
/** 表格列表集合 */
export const HTML2PDF_CLASS_NAME_LIST_COLLECTION = 'html-to-pdf-item-list-collection'
/** 需要隐藏的表行类名 */
const HTML2PDF_CLASS_NAME_TABLE_ROW_HIDE = 'html2pdf-print-table-row-hide'
/** 合并行td */
const HTML2PDF_CLASS_NAME_TABLE_TD_ROWSPAN = 'html2pdf-print-table-td-rowspan'
/** dom隐藏 */
const HTML2PDF_CLASS_HIDE = 'html2pdf-class-hide'

const SCALEA4 = 1.414
const PAGE_W = 1170

const fmtStyle = obj => {
    return Object.entries(obj)
        .map(([key, value]) => `${key}: ${value} `)
        .join(';')
}

window.$html2pdfStyleIsloaded = false
const createHtmlPrintStyle = () => {
    if (window.$html2pdfStyleIsloaded) return
    var style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = `
        .${HTML2PDF_CLASS_HIDE} {
            height: 0 !important;
            display: none !important;
            overflow: hidden !important;
            opacity: 0 !important;
        }
        .${HTML2PDF_CLASS_NAME_TABLE_ROW_HIDE} {
        }
        .${HTML2PDF_CLASS_NAME_TABLE_ROW_HIDE} td:not(.${HTML2PDF_CLASS_NAME_TABLE_TD_ROWSPAN}), .${HTML2PDF_CLASS_NAME_TABLE_ROW_HIDE} td:not(.${HTML2PDF_CLASS_NAME_TABLE_TD_ROWSPAN}) * {
            height: 0 !important;
            border: none !important;
            padding: 0 !important;
        }
    `
    document.head.appendChild(style)
    window.$html2pdfStyleIsloaded = true
}
createHtmlPrintStyle()

/** 是否为整体不分离元素 */
const eleIsWhole = ele => {
    return ele.className.includes(HTML2PDF_CLASS_NAME_WHOLE)
}
/** 是否为表格 */
const eleIsTable = ele => {
    return ele.className.includes(HTML2PDF_CLASS_NAME_TABLE)
}
/** 是否为列表集合 */
const eleIsListCollection = ele => {
    return ele.className.includes(HTML2PDF_CLASS_NAME_LIST_COLLECTION)
}
/** 是否在表行组中 */
const eleIsRowInGroup = ele => {
    return ele.className.includes(HTML2PDF_CLASS_NAME_LIST_ROW_IN_GROUP)
}
/** 是否为悬浮元素 */
const eleIsFixed = ele => {
    return ele.className.includes(HTML2PDF_CLASS_NAME_FXIED)
}
/** 根据类名寻找祖先元素 */
const findParentByClassName = (el, className) => {
    while (el) {
        if (el.className.includes(className)) {
            return el
        }
        el = el.parentNode
    }
    return null
}
/** 寻找分行组根节点 */
const findGroupElement = ele => {
    return findParentByClassName(ele, HTML2PDF_CLASS_NAME_LIST_ROW_GROUP)
}
/**  */

export const htmlToPdf = async (config = {}) => {
    const { container = '', grid = {}, width = PAGE_W, output = 'blob', debug = false, options = [], save = false, fileName = 'download', fileType = 'pdf', isConsole = false } = config
    if (!container) return
    config.grid = { ...{ top: 20, left: 20, right: 20, bottom: 20 }, ...grid }
    const { top: gapTop, bottom: gapBottom } = config.grid
    const pageW = width
    const pageH = width * SCALEA4
    isConsole && console.log('单页尺寸', pageW, pageH)
    let pageNum = 0
    let htmlPage = null
    const listHtmlPage = []
    /** 获取相对于页面位置 */
    function getOffsetParentRect(el) {
        const rectChild = el.getBoundingClientRect()
        const rectPage = htmlPage.getBoundingClientRect()
        return {
            top: rectChild.top - rectPage.top,
            left: rectChild.left - rectPage.left,
            width: rectChild.width,
            height: rectChild.height,
        }
    }
    /** 新增打印页面容器 */
    const addPdfHtmlPreivew = () => {
        const innderPreivew = document.createElement('div')
        pageNum++
        innderPreivew.setAttribute('id', `html-to-pdf-page-${pageNum}`)
        innderPreivew.className = container.className
        innderPreivew.classList.add('html-to-pdf-page-class')
        const { grid } = config
        innderPreivew.style.cssText = fmtStyle({
            position: 'fixed',
            top: '0',
            left: '0',
            width: pageW + 'px',
            height: pageH + 'px',
            'background-color': debug ? '#f7ffc9' : '#fff',
            'z-index': debug ? 999 : -1,
            padding: `${gapTop}px ${grid.right}px ${gapBottom}px ${grid.left}px`,
            overflow: debug ? 'auto' : '',
        })
        container.parentNode.appendChild(innderPreivew)
        htmlPage = innderPreivew
        listHtmlPage.push(innderPreivew)
        return innderPreivew
    }
    addPdfHtmlPreivew()
    /** 当前渲染的高度 */
    const eleAllItems = container.querySelectorAll('.html-to-pdf-item-basic')
    /** 克隆元素 */
    const handleClone = ele => {
        const cloneElement = ele.cloneNode(true)
        htmlPage.appendChild(cloneElement)
        return cloneElement
    }
    /** 分析是否翻页 */
    const elePageTurn = ele => {
        const { height, top } = getOffsetParentRect(ele)
        const residualH = pageH - top - gapBottom
        // console.log('--------------', height)
        let isTurn = residualH < height
        return isTurn
    }
    /** 获取列表配置 */
    const getOption = (type, element) => {
        const tableOpt =
            options.find(item => {
                if (item.type === type) {
                    return item.includes.some(cname => element.className.includes(cname))
                }
            }) || {}
        return tableOpt
    }

    /** 表格处理方法 */
    const handleMthodTable = async (elTable, params = {}, cb = () => {}) => {
        const { root = true } = params
        const tableOpt = getOption('table', elTable)
        const { classNameHead = HTML2PDF_CLASS_NAME_LIST_HEAD, classNameRow = HTML2PDF_CLASS_NAME_LIST_ROW } = tableOpt
        // const domHead = elTable.querySelector(`.${classNameHead}`)
        let tableRows = [...elTable.querySelectorAll(`.${classNameRow}`)]
        // const headH = domHead ? domHead.offsetHeight : 0
        /** 除去所有表格行内容的高度 */
        const cloneE = elTable.cloneNode(true)
        cloneE.querySelectorAll(`.${classNameRow}`).forEach(r => r.remove())
        htmlPage.appendChild(cloneE)
        const tableBaseH = cloneE.getBoundingClientRect().height
        // console.log('----------------------', tableBaseH, cloneE)
        cloneE.remove()
        // console.log('表头', domHead)
        // console.log('表头高度', headH)
        let tableRenderH = tableBaseH
        /** 去除表格行 */
        const removeTableRows = rowEl => {
            // rowEl.remove()
            if (rowEl.nodeName === 'TR') {
                rowEl.classList.add(HTML2PDF_CLASS_NAME_TABLE_ROW_HIDE)
                rowEl.querySelectorAll('td').forEach(td => {
                    if (!td.rowSpan || td.rowSpan === 1) return
                    td.classList.add(HTML2PDF_CLASS_NAME_TABLE_TD_ROWSPAN)
                })
            } else {
                rowEl.classList.add(HTML2PDF_CLASS_HIDE)
            }
        }
        const renderTable = async () => {
            // console.log('--渲染表格--', elTable)
            const ch = getOffsetParentRect(elTable).top
            const residualH = pageH - ch - gapBottom
            if (isConsole) {
                console.log('距离页面顶部', ch, htmlPage)
                console.log('剩余可渲染高度', residualH)
                console.log('表格高度', elTable.offsetHeight)
                // console.log('渲染表格行', tableRows)
            }
            // 是否整个表格翻页
            let isWholeFlip = residualH < tableBaseH
            if (tableRows.length === 0) {
                tableRenderH = getOffsetParentRect(elTable).height
                isWholeFlip = residualH < tableRenderH
            }
            // 翻页开始索引
            const splitIdx = tableRows.findIndex(row => {
                tableRenderH += row.offsetHeight
                return tableRenderH > residualH
            })
            // 是否翻页渲染
            const isFlip = splitIdx !== -1 || isWholeFlip
            if (isConsole) {
                console.log('分割索引', splitIdx)
                console.log('是否翻页渲染', isFlip)
            }
            if (isFlip) {
                const cloneTable = elTable.cloneNode(true)
                if (isWholeFlip || splitIdx === 0) {
                    elTable.remove()
                } else {
                    for (let i = splitIdx; i < tableRows.length; i++) {
                        if (tableRows[i]) {
                            removeTableRows(tableRows[i])
                        }
                    }
                }
                addPdfHtmlPreivew()
                // console.log('----------------', splitIdx, htmlPage)
                const allRows = cloneTable.querySelectorAll(`.${classNameRow}`)
                const resRows = allRows ? [...allRows] : []
                resRows.some((row, index) => {
                    if (index === splitIdx) return true
                    // 如果是分行组且只有一行则删除整个组
                    if (eleIsRowInGroup(row)) {
                        const nodeGroup = findGroupElement(row)
                        if (!nodeGroup) return
                        if (nodeGroup.querySelectorAll(`.${classNameRow}`).length === 1) {
                            nodeGroup.remove()
                        } else {
                            row.remove()
                        }
                    } else {
                        removeTableRows(row)
                    }
                })
                if (root) {
                    htmlPage.appendChild(cloneTable)
                }
                cb(cloneTable, splitIdx)
                await handleMthodTable(cloneTable)
            }
        }
        await renderTable()
    }
    /** 列表集合处理方法 */
    const handleMethodCollection = async element => {
        const innerTables = element.querySelectorAll(`.${HTML2PDF_CLASS_NAME_TABLE}`) || []
        element.remove()
        for (let i = 0; i < innerTables.length; i++) {
            const func = async table => {
                const cloneDom = element.cloneNode(true)
                htmlPage.appendChild(cloneDom)
                const tables = cloneDom.querySelectorAll(`.${HTML2PDF_CLASS_NAME_TABLE}`)
                const tableItem = table || tables[i]
                const tableParent = tables[i].parentNode
                if ([('100%', '')].includes(tableParent.style.height)) {
                    tableParent.style.height = 'auto'
                }
                if ([('100%', '')].includes(tableParent.parentNode.style.height)) {
                    tableParent.parentNode.style.height = 'auto'
                }
                /** 移除所有表格元素后，将备份原表加入 */
                tables.forEach(item => {
                    item.remove()
                })
                tableParent.appendChild(tableItem)
                // console.log('列表集合内表格', tableItem)
                /** 分析渲染表格 */
                await handleMthodTable(tableItem, { root: false }, (cloneTable, splitIdx) => {
                    if (splitIdx === 0) {
                        cloneDom.remove()
                    }
                    func(cloneTable)
                })
            }
            await func()
        }
    }
    // 打印悬浮固定元素处理
    const elementFixed = []
    /** 分析元素 */
    const analysisEle = async (ele, index) => {
        // 如果为悬浮元素
        if (eleIsFixed(ele)) {
            elementFixed.push(ele)
            return
        }
        // 克隆添加元素
        const curEle = handleClone(ele)
        // 判断是否分页后处理逻辑, 如果不分页直接渲染
        const isTurn = elePageTurn(curEle)
        if (!isTurn) return
        const renderWhole = async () => {
            if (isConsole) {
                console.log('--渲染整个元素--', curEle)
            }
            const { height } = getOffsetParentRect(curEle)
            curEle.remove()
            addPdfHtmlPreivew()
            // 如果元素高度大于整个页面高度 克隆添加元素
            if (pageH - gapTop - gapBottom < height) {
                handleClone(ele)
            } else {
                analysisEle(ele)
            }
        }
        // 整体不分割
        if (eleIsWhole(curEle)) {
            await renderWhole()
        }
        // 是表格元素
        else if (eleIsTable(curEle)) {
            await handleMthodTable(curEle)
        }
        // 内部有列表集合
        else if (eleIsListCollection(curEle)) {
            await handleMethodCollection(curEle)
        } else {
            await renderWhole()
        }
    }
    /** 遍历处理组成元素 */
    for (let i = 0; i < eleAllItems.length; i++) {
        await analysisEle(eleAllItems[i])
    }
    // console.log('pageNum', listHtmlPage)
    const PdfDoc = new jsPdf({
        format: 'a4',
        unit: 'px',
        hotfixes: ['px_scaling'],
    })
    const configFixed = options.reduce((pre, cur) => {
        const { type, pagination, includes } = cur
        if (type !== 'fixed') return pre
        pagination.forEach(page => {
            if (!pre[page]) pre[page] = []
            const data = { ...cur }
            data.includesDom = elementFixed.filter(f => {
                return includes.some(cname => f.className.includes(cname))
            })
            pre[page].push(data)
        })
        return pre
    }, {})
    /** 遍历渲染悬浮固定元素 */
    for (let i = 0; i < listHtmlPage.length; i++) {
        const html = listHtmlPage[i]
        if (elementFixed.length > 0) {
            const listFix = configFixed[i + 1]
            if (listFix) {
                listFix.forEach(item => {
                    const { includesDom = [], styles = {} } = item
                    includesDom.forEach(fixDom => {
                        const cloneFix = fixDom.cloneNode(true)
                        cloneFix.style.cssText = fmtStyle(styles)
                        html.appendChild(cloneFix)
                    })
                })
            }
        }
        // console.log('---------------', window.devicePixelRatio)
        const canvas = await html2canvas(html, {
            removeContainer: true,
        })
        const imgData = canvas.toDataURL('image/jpeg')
        if (i > 0) PdfDoc.addPage()
        const { width, height } = PdfDoc.internal.pageSize
        // console.log(i, imgData)
        PdfDoc.addImage(imgData, 'JPEG', 0, 0, width, height)
        !debug && html.remove()
    }
    save && PdfDoc.save(`${fileName}.pdf`)
    const fileOutput = PdfDoc.output(output)
    // console.log('----生成pdf链接----', fileOutput)
    return fileOutput
}
