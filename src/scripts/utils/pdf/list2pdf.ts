import jsPdf from 'jspdf'

const isFunction = (value: any) => {
    return typeof value === 'function'
}
const isEmpty = (value: any) => {
    if (value === 0) return false
    return !value
}
const isImage = (value: any) => {
    return value === 'image'
}
const isText = (value: any) => {
    return value === 'text'
}
const isLine = (value: any) => {
    return value === 'line'
}

function getBase64(imgUrl: any): any {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('get', imgUrl, true)
        xhr.responseType = 'blob'
        xhr.onload = function() {
            if (this.status == 200) {
                let blob = this.response
                let oFileReader = new FileReader()
                oFileReader.onloadend = function(e: any) {
                    const base64 = e.target.result
                    resolve(base64)
                }
                oFileReader.readAsDataURL(blob)
            }
        }
        xhr.send()
    })
}

export const baseToBlobUrl = (fileBase: any) => {
    let raw = window.atob(fileBase)
    let rawLength = raw.length
    let uint8Array = new Uint8Array(rawLength)
    while (rawLength--) {
        uint8Array[rawLength] = raw.charCodeAt(rawLength)
    }
    const fileBlob = new Blob([uint8Array], { type: 'application/pdf' })
    let href = window.URL.createObjectURL(fileBlob)
    return href
}

/** 获取尺寸 */
const getSize = (value: string | number, base: number) => {
    let result: any = 0
    try {
        if (typeof value === 'number') {
            result = value
        } else if (value.includes('%')) {
            result = ((value.split('%')[0] as any) / 100) * base
        }
    } catch (error) {
        console.error(error)
    }
    return result
}
const getMode = (value: any, params?: any) => {
    return isFunction(value) ? value(params) : value
}
const getValue = (value: any, base: number, params?: any) => {
    return getSize(getMode(value, params), base)
}

export const listToPdf = async (lisTemp: any[], config: any = {}, callback: any = () => {}) => {
    const {
        fontSize: gloFontSize = 14,
        fontWeight: gloFontWeight = 'normal',
        lineHeightFactor: gloLineHeight = 2,
        drawColor: gloDrawColor = 'rgb(0, 0, 0)',
        save = true,
        output = 'blob',
        filename = '生成PDF',
        grid = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        textColor: gloTextColor = 'rgb(150, 150, 150)',
        fontName = '',
    } = config
    /** 创建pdf对象 */
    const PdfDoc: any = new jsPdf({
        format: 'a4', // 210mm × 297mm
        unit: 'pt',
    })
    callback(PdfDoc)
    const resFontName = fontName || PdfDoc.getFontList()[0]
    PdfDoc.setFont(resFontName)
    const { width: pageWidth, height: pageHeight } = PdfDoc.internal.pageSize
    console.log('****pdf尺寸****', pageWidth, pageHeight)
    /** 当前页 */
    let currentPage = 1
    /** 当前元素y值 */
    let currentY = getMode(grid.top, {
        page: currentPage,
    })
    /** 新添加一页 */
    const createPage = () => {
        currentPage++
        currentY = getMode(grid.top, {
            page: currentPage,
        })
        PdfDoc.addPage()
    }
    /** 渲染 */
    const drawElement = async (eleItem: any = {}, deOptions: any = {}) => {
        const {
            width = 100,
            height = 100,
            fontSize,
            fontWeight,
            align,
            gap = 0,
            options = {},
            type,
            left: posLeft,
            top: posTop,
            right: posRight,
            fixed = false,
            format = '',
            drawColor: eleDrawColor,
            lineWidth = 1,
            gapAlwaysExists = false,
        } = eleItem
        /** 分析渲染 */
        const renderRow = async (renderItem: any, renderConfig: any = {}) => {
            const { textIndent = 0 } = renderItem
            const curPage = deOptions.page || currentPage
            const configFontSize = fontSize || gloFontSize
            const configFontWeight = fontWeight || gloFontWeight
            PdfDoc.setPage(curPage)
            PdfDoc.setFont(resFontName, 'normal', configFontWeight)
            PdfDoc.setFontSize(configFontSize)
            PdfDoc.setDrawColor(eleDrawColor || gloDrawColor)
            PdfDoc.setTextColor(renderItem.textColor || gloTextColor)
            const isTxt = isText(type)
            const isImg = isImage(type)
            const isLe = isLine(type)
            /** 通用渲染配置 */
            // console.log('-----渲染内容-----', renderItem)
            const { isNext, noGap = false } = renderConfig
            /** 首行缩进距离 */
            const firstRowIndent = textIndent * configFontSize
            /** 回调参数 */
            const pms = {
                page: curPage,
                pageWidth,
                pageHeight,
            }
            const content = getMode(renderItem.value, {
                ...pms,
                totalPage: deOptions.totalPage,
            })
            let contentWidth = 0
            const paramsBase = () => {
                const params: any = {
                    ...pms,
                }
                if (isTxt) {
                    contentWidth = PdfDoc.getTextWidth(content)
                } else if (isImg) {
                    contentWidth = width
                }
                params.contentWidth = contentWidth
                return params
            }
            const cbParams = () => {
                return {
                    ...paramsBase(),
                    grid: {
                        top: globalTop,
                        left: globalLeft,
                        right: globalRight,
                        bottom: globalBottom,
                    },
                }
            }
            /** 内容加上间距总高度 */
            if (!noGap && (!isNext || gapAlwaysExists)) currentY += gap
            /** 页面边距 */
            const globalLeft = getValue(!isEmpty(renderItem.left) ? renderItem.left : grid.left, pageWidth, paramsBase())
            const globalRight = getValue(!isEmpty(renderItem.right) ? renderItem.right : grid.right, pageWidth, paramsBase())
            const globalTop = getValue(!isEmpty(renderItem.top) ? renderItem.top : grid.top, pageHeight, paramsBase())
            const globalBottom = getValue(!isEmpty(renderItem.bottom) ? renderItem.bottom : grid.bottom, pageHeight, paramsBase())
            /** 当前渲染行宽度高度 */
            const renderWidth = (options.maxWidth || (!fixed ? pageWidth - globalLeft - globalRight : pageWidth)) - firstRowIndent
            const residualH = pageHeight - currentY - globalBottom
            // console.log('单页剩余高度', residualH)
            /** 文本处理逻辑 */
            const renderByText = async () => {
                const textOpts: any = {
                    maxWidth: renderWidth,
                    lineHeightFactor: gloLineHeight,
                    ...options,
                    // baseline: 'middle',
                }
                /** 元素横向x */
                let textX = globalLeft
                if (!renderItem.useLeft) {
                    if (align === 'center') {
                        textX = (pageWidth - contentWidth) / 2
                    }
                    textX += firstRowIndent
                }
                if (fixed) {
                    PdfDoc.text(content, textX, globalTop, textOpts)
                    return
                }
                /** 分析文本高度 */
                const contentLines = PdfDoc.splitTextToSize(content, renderWidth)
                const measureTextHeight = (text: any, options: any): any => {
                    // const textWidth = pdfDoc.getStringUnitWidth(text) * options.fontSize
                    const lineHeight = options.lineHeightFactor // 默认行高
                    const rowHeight = options.fontSize * lineHeight
                    const contentHeight = contentLines.length * rowHeight
                    return { contentHeight, rowHeight, contentLines }
                }
                const { contentHeight, rowHeight } = measureTextHeight(content, {
                    fontSize: configFontSize,
                    lineHeightFactor: options.lineHeightFactor || gloLineHeight,
                    maxWidth: renderWidth,
                })
                // console.log('文本高度', contentHeight)
                // console.log('行高', rowHeight)
                // console.log('文本行', contentLines)
                const itemHeight = contentHeight + gap
                // console.log('Y坐标', currentY)
                /** 文本定位有偏移量 */
                const textOffset = (rowHeight - configFontSize) / 2 + configFontSize
                // console.log('文本Y偏移', currentY)
                let textY = currentY + textOffset * 0.93
                /** 分析是否要翻页 */
                const isFlip = itemHeight > residualH
                // 强制翻页
                if (renderItem.flip) {
                    createPage()
                    await renderRow(
                        {
                            ...renderItem,
                            flip: false,
                        },
                        {
                            isNext: true,
                        },
                    )
                }
                // 有首行缩进
                else if (textIndent) {
                    const [firstRow, ...remainingRows] = contentLines
                    // console.log('--首行缩进--', textX, firstRow)
                    await renderRow({
                        ...renderItem,
                        value: firstRow,
                        left: textX,
                        textIndent: 0,
                        useLeft: true,
                    })
                    if (remainingRows?.length) {
                        // console.log('--剩余内容--', remainingRows)
                        await renderRow(
                            {
                                ...renderItem,
                                value: contentLines.slice(1).join(''),
                                textIndent: 0,
                            },
                            {
                                isNext: true,
                            },
                        )
                    }
                }
                // 文本过长翻页
                else if (isFlip) {
                    // console.log('需要翻页')
                    /** 翻页判断截断位置 */
                    const textContainerH = pageHeight - currentY - globalBottom
                    // console.log('文本可渲染高度', textContainerH)
                    /** 本业可渲染行数 */
                    const curRows = Math.floor(textContainerH / rowHeight)
                    // console.log('本页可渲染行数', curRows)
                    const preLines = contentLines.slice(0, curRows)
                    // console.log('本页渲染行', preLines)
                    for (let i = 0; i < preLines.length; i++) {
                        PdfDoc.text(preLines[i], textX, textY, textOpts)
                        textY += rowHeight
                        currentY += rowHeight
                    }
                    // PdfDoc.line(0, currentY + 0, pageWidth, currentY + 0)
                    createPage()
                    await renderRow(
                        {
                            ...renderItem,
                            value: contentLines.slice(curRows).join(''),
                        },
                        {
                            isNext: true,
                        },
                    )
                }
                // 不翻页逻辑
                else {
                    // console.log('不翻页', content)
                    for (let i = 0; i < contentLines.length; i++) {
                        PdfDoc.text(contentLines[i], textX, textY, textOpts)
                        textY += rowHeight
                        currentY += rowHeight
                    }
                    // PdfDoc.line(0, currentY + 0, pageWidth, currentY + 0)
                }
            }
            /** 图片处理逻辑 */
            const renderByImage = async () => {
                /** 获取图片尺寸 */
                const imgW = getValue(width, pageWidth, cbParams())
                const imgH = getValue(height, pageWidth, { ...cbParams(), width: imgW })
                // console.log('图片尺寸', imgW, imgH, fixed)
                /** 元素横向x */
                let imgX = globalLeft
                if (align === 'center') {
                    imgX = (pageWidth - imgW) / 2
                }
                if (fixed) {
                    const dataBase = await getBase64(renderItem.value)
                    // console.log('悬浮图片', page || currentPage, format)
                    PdfDoc.addImage(dataBase, format, imgX, getValue(posTop, pageHeight), imgW, imgH)
                    return
                }
                /** 分析是否要翻页 */
                const isFlip = imgH > residualH
                if (isFlip) {
                    createPage()
                    await renderRow(renderItem, {
                        isNext: true,
                    })
                } else {
                    const dataBase = await getBase64(renderItem.value)
                    PdfDoc.addImage(dataBase, format, imgX, currentY, imgW, imgH)
                    currentY += imgH
                }
            }
            /** 线条处理逻辑 */
            const renderByLine = async () => {
                // const lineY = getSize(posTop, pageHeight)
                const lineY = getValue(posTop, pageHeight, cbParams())
                PdfDoc.setLineWidth(lineWidth)
                PdfDoc.line(globalLeft, lineY, pageWidth - getSize(posRight, pageWidth), lineY)
            }

            isTxt && renderByText()
            isImg && (await renderByImage())
            isLe && renderByLine()
        }
        await renderRow(eleItem)
    }

    const listTempFixed: any = []
    for (let idx = 0; idx < lisTemp.length; idx++) {
        const item = lisTemp[idx]
        if (item.fixed) {
            listTempFixed.push(item)
        } else {
            await drawElement(item)
        }
    }
    // console.log('固定元素', listTempFixed)
    /** 如果存在固定元素渲染 */
    for (let page = 1; page <= currentPage; page++) {
        for (let idx = 0; idx < listTempFixed.length; idx++) {
            const fixItm = listTempFixed[idx]
            const isRender = getMode(fixItm.show === undefined ? true : fixItm.show, { page })
            if (isRender) await drawElement(fixItm, { page, totalPage: currentPage })
        }
    }

    if (save) {
        PdfDoc.save(`${filename}.pdf`)
    }
    const fileOutput = PdfDoc.output(output)
    // console.log('----生成pdf链接----', fileOutput)
    return fileOutput
}
