import _ from 'lodash'
import XLSXStyle from 'xlsx-style-medalsoft'
import { getTextInVNode } from './util'

/*
 * 导出渲染表格并下载
 * 使用： new RenderExport(columns, config).downloadExl(data, fileName)
 *
 * 属性：
 * columns: 表格columns
 * config: 表格配置项, 目前仅有 defaultValue
 * data: 接口返回数据
 * fileName: 文件名
 */
export default class RenderExport {
    constructor(columns = [], config = {}) {
        this.init(columns, config)
    }

    config = {
        defaultValue: '',
    }
    /* 导出的表头配置项 */
    columns = []
    /* 最大层级 */
    maxLevel = 1
    /* 所有的叶子结点数量 */
    totalLeafCount = 0

    /* 头部渲染信息 用于xlsx */
    renderHeaderObj = {}
    /* 合并单元格的信息 */
    merges = []
    /* 叶子节点数组 */
    leafList = []

    init(columns = [], config = {}) {
        this.config = { ...this.config, ...config }
        this.columns = this.recursionColumn(_.cloneDeep(columns))
        this.renderHeaderObj = {}
        this.merges = []
        this.leafList = []
        this.maxLevel = this.getMaxLevel(this.columns)
        this.totalLeafCount = this.getLeafCountTree(this.columns)
        this.getHeaderAndMerges()
    }

    /* 生成头部渲染信息, 生成合并单元格信息 */
    getHeaderAndMerges() {
        const each = (columns, col) => {
            columns.forEach(item => {
                this.renderHeaderObj[this.getColName(item.level, col)] = {
                    v: item.label,
                    s: this.getCellStyle(true),
                }
                if ((item.level < this.maxLevel && !item.children?.length) || item.colspan > 1) {
                    this.merges.push({
                        s: { r: item.level - 1, c: col },
                        e: {
                            r: (item.colspan > 1 ? item.level : this.maxLevel) - 1,
                            c: item.colspan > 1 ? col + item.colspan - 1 : col,
                        },
                    })
                }
                if (item?.children?.length) {
                    each(item.children, col)
                }
                col += item.colspan
            })
        }
        each(this.columns, 0)
        /* 将空白表头填充样式 */
        for (let i = 1; i <= this.maxLevel; i++) {
            for (let j = 1; j <= this.totalLeafCount; j++) {
                if (!this.renderHeaderObj[this.getColName(i, j)]) {
                    this.renderHeaderObj[this.getColName(i, j)] = {
                        v: '',
                        s: this.getCellStyle(true),
                    }
                }
            }
        }
    }

    recursionColumn(columns) {
        if (!columns?.length) return []
        return columns
            .filter(item => !item.noExport && item.label && item.prop?.indexOf('action') === -1)
            .map(column => ({
                prop: column.prop,
                label: column.label,
                type: column.type,
                children: this.recursionColumn(column.children),
                width: column.exportWidth || column.width || column.minWidth,
                $render:
                    typeof column.exportRender === 'function'
                        ? column.exportRender
                        : column.render
                        ? (item, index) => {
                              const vm = new Vue()
                              const vnode = column.render(vm.$createElement, { row: item, index, column })
                              const text = getTextInVNode(vnode)
                              return text
                          }
                        : undefined,
            }))
    }

    /* 获取最大层级，并且在每个对象中写入当前层级数 */
    getMaxLevel(treeData = []) {
        let max = 0
        const each = (data = [], level) => {
            data.forEach(item => {
                item.level = level
                if (level > max) {
                    max = level
                }
                if (item.children?.length) {
                    each(item.children, level + 1)
                }
            })
        }
        each(treeData, 1)
        return max
    }

    /* 获取所有叶子结点数，并且在每个对象中写入当前节点的叶子数 */
    getLeafCountTree(treeData) {
        let totalLeafCount = 0
        const each = item => {
            if (!item.children?.length) {
                this.leafList.push(item)
                item.colspan = 1
                return 1
            }
            var leafCount = 0
            item.children.forEach(i => {
                leafCount += each(i)
            })
            item.colspan = leafCount
            return leafCount
        }
        treeData.forEach(i => {
            totalLeafCount += each(i)
        })
        return totalLeafCount
    }

    /* 获取单元格样式，区分是否表头 */
    getCellStyle(isHeader) {
        return {
            // 设置边框
            border: {
                top: { style: 'thin', color: '#666' },
                bottom: { style: 'thin', color: '#666' },
                left: { style: 'thin', color: '#666' },
                right: { style: 'thin', color: '#666' },
            },
            //背景色
            fill: {
                fgColor: {
                    rgb: isHeader ? 'dddddd' : 'ffffff',
                },
            },
            // 单元格中字体的样式与颜色设置
            font: {
                sz: isHeader ? 12 : 10,
                bold: isHeader,
            },
            // 垂直居中
            alignment: {
                horizontal: 'center',
                vertical: 'center',
                wrap_text: true,
            },
        }
    }

    /* 处理数据 */
    handleData(list) {
        /* 处理空值 */
        const voidValue = val => (val === null || val === undefined || val === '' ? this.config?.defaultValue || '' : val)
        return list.map((item, index) => {
            let res = {}
            this.leafList
                .filter(opt => opt.type !== 'selection')
                .forEach(col => {
                    const { prop, type, $render } = col
                    if (!prop) return
                    res[prop] = type === 'index' ? index + 1 : $render ? $render(item, index) : voidValue(item[prop])
                })
            return res
        })
    }

    /* 写入excel并下载 */
    downloadExl(dataList, downName, type = 'xlsx') {
        // 导出到excel
        const keyMap = this.leafList.map(i => i.prop).filter(Boolean)
        const tmpdata = _.cloneDeep(this.renderHeaderObj) // 用来保存转换好的json
        this.handleData(dataList).forEach((v, i) =>
            keyMap.forEach((k, j) => {
                if (typeof v[k] === 'object') {
                    tmpdata[this.getColName(i + 1 + this.maxLevel, j)] = {
                        v: v[k].v,
                        s: v[k].s,
                    }
                } else {
                    tmpdata[this.getColName(i + 1 + this.maxLevel, j)] = {
                        v: v[k],
                        s: this.getCellStyle(),
                    }
                }
            }),
        )
        const outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
        // console.log('this.leafList', this.leafList)
        const tmpWB = {
            SheetNames: ['mySheet'], // 保存的表标题
            Sheets: {
                mySheet: {
                    ...tmpdata, // 内容
                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1], // 设置填充区域
                    '!merges': this.merges,
                    '!cols': keyMap.map((k, index) => {
                        const leaf = this.leafList.find(i => i.prop === k)
                        const wpx = this.parseWidth(leaf?.width)
                        // console.log(leaf.prop, leaf.width, wpx)
                        return {
                            wpx,
                        }
                    }),
                },
            },
        }
        const tmpDown = new Blob(
            [
                this.s2ab(
                    XLSXStyle.write(
                        tmpWB,
                        {
                            bookType: type,
                            bookSST: false,
                            type: 'binary',
                        }, // 这里的数据是用来定义导出的格式类型
                    ),
                ),
            ],
            {
                type: '',
            },
        ) // 创建二进制对象写入转换好的字节流
        const a = document.createElement('a')
        const href = URL.createObjectURL(tmpDown) // 创建对象超链接
        a.style.display = 'none'
        a.href = href
        a.download = `${downName}.${type}`
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
            URL.revokeObjectURL(href)
            a.remove()
        }, 100)
    }

    /* 解析宽度值，处理可能带有单位的情况 */
    parseWidth(width) {
        if (!width) return 100
        if (typeof width === 'number') return width
        // 移除所有非数字字符（如：px, em等）
        const numWidth = parseInt(width.toString().replace(/[^\d]/g, ''))
        return numWidth || 100
    }

    /* 字符串转字符流 */
    s2ab(s) {
        const buf = new ArrayBuffer(s.length)
        const view = new Uint8Array(buf)
        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xff
        }
        return buf
    }

    /**
     * @description: 获取excel中的坐标，例如A1，B3
     * @param {*} i: 横坐标
     * @param {*} j: 纵坐标
     * @return {*} string
     */
    getColName(i, j) {
        /* 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。 */
        function getCharCol(n) {
            let s = ''
            let m = 0
            while (n > 0) {
                m = (n % 26) + 1
                s = String.fromCharCode(m + 64) + s
                n = (n - m) / 26
            }
            return s
        }
        return (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + i
    }
}
