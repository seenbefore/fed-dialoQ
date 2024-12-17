<template>
    <div class="sg-dataview-container sg-base-table" ref="wrap">
        <div type="flex" class="sg-flexbox no-print sg-data-view__bar" v-if="hasBar || $slots.bar">
            <slot name="bar-head">
                <div class="sg-flex-1"></div>
            </slot>
            <slot name="bar">
                <div class="sg-table-bar no-print">
                    <el-select v-if="sortOptions && sortOptions.length" @change="onSortChange" v-model="sort" placeholder="请选择" class="sg-sort-select">
                        <el-option v-for="item in sortOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-button-group>
                        <el-button title="刷新" icon="el-icon-refresh" @click="handleReload"></el-button>
                        <!-- <el-button icon="el-icon-s-grid"></el-button> -->
                        <el-popover placement="bottom" width="160" v-model="operationVisible">
                            <!-- <div>
                                <el-checkbox :indeterminate="isIndeterminateColumn" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            </div> -->
                            <el-checkbox-group class="sg-table-operation-wrap" v-model="operation" @change="onOperationChange">
                                <el-checkbox v-for="item in operations" :label="item.value" :key="item.value">{{ item.label }}</el-checkbox>
                            </el-checkbox-group>

                            <el-button icon="el-icon-s-operation" slot="reference"></el-button>
                        </el-popover>
                    </el-button-group>
                </div>
            </slot>
            <slot name="bar-foot"></slot>
        </div>
        <div class="sg-data-view__header" v-if="$slots.header">
            <slot name="header"></slot>
        </div>
        <div class="sg-data-view__wrap sg-dataview-wrapper" ref="tableWrap">
            <virtual-scroll ref="virtualScroll" :virtualized="virtualized" :data="dataSource" :item-size="itemSize" :key-prop="virtualKey" @change="onChange">
                <template slot-scope="{ headerCellFixedStyle, cellFixedStyle }">
                    <el-table
                        :id="printId"
                        class="sg-data-view__table sg-table-container"
                        v-loading="listLoading"
                        :data="tableData"
                        :header-cell-style="rest => setHeaderCellStyle(rest, headerCellFixedStyle)"
                        :cell-style="cellFixedStyle"
                        style="width: 100%;"
                        :max-height="maxHeight$"
                        ref="table"
                        :border="border"
                        v-bind="$attrs"
                        v-on="$listeners"
                        @select="selectionChange"
                        @select-all="selectionChange"
                        @row-click="rowClickChange"
                        :load="treeLoad"
                        :row-key="virtualKey"
                        v-el-table-sticky-header="vElTableStickyHeaderConfig"
                    >
                        <data-column :columns="columns" :handle-select-able="handleSelectAble" :default-value="defaultValue" :disabled-tooltip-set="disabledTooltipSet">
                            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                                <slot :name="name" v-bind="data"></slot>
                            </template>
                        </data-column>
                        <div class="" slot="empty">
                            <slot name="empty" v-if="!isVirgin">
                                暂无数据
                            </slot>
                            <slot name="virgin" v-else>
                                请先查询数据
                            </slot>
                        </div>
                    </el-table>
                </template>
            </virtual-scroll>

            <sg-pagination
                ref="page"
                v-if="ifRenderPage"
                :total="total"
                :page.sync="exPagination.page"
                :limit.sync="exPagination.pageSize"
                :page-sizes.sync="exPagination.pageSizes"
                v-bind="exPagination"
                @pagination="onLoad"
                class="no-print sg-pagination-container sg-data-view__pagination"
                v-absorb="vPaginationStickyBottom"
            >
                <div class="sg-flex-1 no-print" slot="page-header">
                    <slot name="page-header"></slot>
                </div>

                <span slot="page-body" class="sg-data-view__pager-action sg-base-table__pager-action">
                    <span class="sg-pagination-index">
                        当前
                        <b v-text="firstIndex"></b>
                        /
                        <b v-text="lastIndex"></b>
                        条
                    </span>
                    <span class="sg-pagination-pages">
                        共
                        <b v-text="pages"></b>
                        页
                    </span>
                    <template v-for="(action, index) in exPageActionLayout">
                        <template v-if="action.key === 'print'">
                            <el-button :key="index" type="primary" style="margin-right:7px" class="sg-data-view__print" @click="handlePrint">{{ action.label }}</el-button>
                        </template>
                        <template v-else-if="action.key === 'export'">
                            <sg-data-export class="sg-data-view__export" :key="index" :data="sgExportData" :columns="columns" :name="exportName" :label="action.label"></sg-data-export>
                        </template>
                    </template>
                    <sg-data-export-all
                        class="sg-data-view__export"
                        v-show="exportAllItem.key"
                        ref="exportAll"
                        style="margin-left:7px"
                        :columns="columns"
                        :name="exportAllConfig.name || exportName"
                        :load="exportAllConfig.load || load"
                        :label="exportAllConfig.label || exportAllItem.label"
                        :max-num="exportAllConfig.maxNum"
                        :split-req-num="exportAllConfig.splitReqNum"
                        :default-value="exportAllConfig.defaultValue"
                    />

                    <slot name="page-body"></slot>
                </span>
            </sg-pagination>
        </div>
    </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from '../../src/utils/resize-event'
import printJS from 'print-js'
import dataColumn from './data-column'
import VirtualScroll from '../el-table-virtual-scroll'
import { orderBy } from 'element-ui/packages/table/src/util'
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}
import _ from 'lodash'
// 初始化溢出省略是否显示tooltip指令
const initTooltip = (() => {
    function handler(el, binding, vnode, oldVnode) {
        const vm = vnode.context
        const index = binding.value.$index
        const field = binding.value.column.property
        const boxHeight = el.offsetHeight
        const textHeight = el.querySelector('span').offsetHeight
        vm.$set(vm.disabledTooltipSet, `${field}-${index}`, textHeight > boxHeight ? false : true)
    }
    return { inserted: handler, update: handler }
})()
export default {
    name: 'SgDataView',
    components: {
        dataColumn,
        VirtualScroll,
    },
    props: {
        // 底部按钮布局
        // pageActionLayout: {
        //     type: Array,
        //     default() {
        //         return [
        //             {
        //                 key: 'print',
        //                 label: '打印',
        //             },
        //             {
        //                 key: 'export',
        //                 label: '导出',
        //             },
        //         ]
        //     },
        // },
        border: {
            type: Boolean,
            default: false,
        },
        // table操作栏
        hasBar: {
            type: Boolean,
            default: false,
        },
        exportName: {
            type: String,
            default: '导出数据',
        },
        // 默认值
        defaultValue: {
            type: String,
            default: '-',
        },
        // 排序
        sortOptions: {
            type: Array,
            default() {
                return []
            },
        },
        // 列
        columns: {
            type: Array,
            default() {
                return []
            },
        },
        // 第一次是否自动请求
        auto: {
            type: Boolean,
            default: true,
        },
        // 是否需要分页
        pageVisible: {
            type: Boolean,
            default: true,
        },
        // 分页配置
        pagination: {
            type: Object,
            default() {
                return {}
            },
        },
        // 数据请求
        load: {
            type: Function,
            default() {
                return []
            },
        },
        // 数据请求
        treeLoad: {
            type: Function,
            default() {
                return []
            },
        },

        handleSelectAble: {
            type: Function,
            default() {
                return true
            },
        },
        paramsSerializer: {
            type: Function,
            default: null,
        },
        // 选中初始化的key
        idKey: {
            type: String,
            default: '',
        },
        // 选中初始化s数据对象[{name:1}]
        multipleSelectionAll: {
            type: Array,
            default() {
                return []
            },
        },
        // 是否自动计算高度
        isAutoHeight: {
            type: Boolean,
            default: false,
        },
        // id class
        resizeTarget: {
            type: String,
            default: '',
        },
        resizeBottomHeight: {
            type: Number,
            default: 50,
        },
        resizeMinHeight: {
            type: Number,
            default: 200,
        },
        // 只有一页时是否隐藏
        hideOnSinglePage: {
            type: Boolean,
            default: false,
        },

        // table最大高度
        maxHeight: {
            type: [Number, String],
            default: null,
        },
        // 导出全部配置项
        exportAllConfig: {
            type: Object,
            default: () => ({}),
        },
        /**表头吸附 */
        tableHeaderSticky: {
            type: [Boolean, Object],
            default: false,
        },
        /**分页吸底 */
        paginationStickyBottom: {
            type: [Boolean, Object],
            default: false,
        },
        /**
         * 允许勾选导出(传入 acrossPage, 则表示允许跨页勾选导出)
         * 跨页勾选，必须设置idKey
         */
        allowCheckExport: {
            type: [Boolean, String],
            default: false,
        },
        /**
         * 用户自定义锁列的列数 (除序号列和选择列(即type为selection、index)的前N列)
         * 不支持多级表头
         */
        customLockColumn: {
            type: [Number],
            default: 0,
        },
        data: {
            type: Array,
            default: null,
        },
        /**启用虚拟滚动 */
        virtualized: {
            type: Boolean,
            default: false,
        },
        /**虚拟滚动-每行高度 */
        itemSize: {
            type: Number,
            default: 40,
        },
    },
    data() {
        return {
            disabledTooltipSet: {}, // 禁用tooltip标识集合
            multipleSelectionAll$: [...this.multipleSelectionAll], // 所有选中的数据包含跨页数据
            multipleSelection: [], // 当前页选中的数据
            printId: `table-${guid()}`,
            exportData: [], // 导出数据
            sortParams: {},
            sort: '', // 默认排序值
            operationVisible: false, // 列
            tableHeight: null,
            isVirgin: true,
            total: 0,
            listLoading: false,
            dataSource: [],
            myColumns: [],
            operations: [],
            operation: [],
            pages: 0,
            firstIndex: 0,
            lastIndex: 0,
            tableData: [],
            /** 排序信息 */
            sortInfo: {},
        }
    },
    computed: {
        vPaginationStickyBottom() {
            const { paginationStickyBottom } = this
            if (typeof paginationStickyBottom === 'boolean') {
                return {
                    disabled: !paginationStickyBottom,
                    bottom: 0,
                }
            }
            return {
                /**滚动容器dom获取函数 */
                // scrollDom: () => document.querySelector('.app-main-box .sg-page'),
                /**禁用 */
                // disabled: false,
                ...(paginationStickyBottom || {}),
                bottom: 0,
            }
        },
        vElTableStickyHeaderConfig() {
            const { tableHeaderSticky } = this
            if (typeof tableHeaderSticky === 'boolean') {
                return {
                    disabled: !tableHeaderSticky,
                }
            }
            return {
                /**滚动容器dom获取函数 */
                // scrollDom: () => document.querySelector('.app-main-box .sg-page'),
                /**禁用 */
                // disabled: false,
                ...(tableHeaderSticky || {}),
            }
        },
        exportAllItem() {
            const target = this.exPageActionLayout.find(item => item.key === 'exportAll') || {}

            return target
        },
        maxHeight$() {
            return this.maxHeight || this.tableHeight || null
        },
        // dataSourcePath {}
        dataSourcePath() {
            const config = this.$ShareGood || {}
            const DataViewConfig = config.DataView || {}

            if (this.$attrs.dataSourcePath) {
                return this.$attrs.dataSourcePath
            }
            if (DataViewConfig.dataSourcePath) {
                return DataViewConfig.dataSourcePath
            }
            return null
        },
        dataSourceResultName() {
            const config = this.$ShareGood || {}
            const DataViewConfig = config.DataView || {}

            if (this.$attrs.dataSourceResultName) {
                return this.$attrs.dataSourceResultName
            }
            if (DataViewConfig.dataSourceResultName) {
                return DataViewConfig.dataSourceResultName
            }
            return null
        },
        dataSourceTotalName() {
            const config = this.$ShareGood || {}
            const DataViewConfig = config.DataView || {}

            if (this.$attrs.dataSourceTotalName) {
                return this.$attrs.dataSourceTotalName
            }
            if (DataViewConfig.dataSourceTotalName) {
                return DataViewConfig.dataSourceTotalName
            }
            return null
        },
        exPageActionLayout() {
            const defaults = [
                {
                    key: 'print',
                    label: '打印',
                },
                {
                    key: 'export',
                    label: '导出',
                },
            ]
            const config = this.$ShareGood || {}
            const DataViewConfig = config.DataView || {}

            if (this.$attrs.pageActionLayout) {
                return this.$attrs.pageActionLayout
            }
            if (this.$attrs['page-action-layout']) {
                return this.$attrs['page-action-layout']
            }
            if (DataViewConfig.pageActionLayout) {
                return DataViewConfig.pageActionLayout
            }
            return defaults
        },
        ifRenderPage() {
            if (this.pageVisible === false) {
                return false
            }
            if (this.pages <= 1 && this.hideOnSinglePage) {
                return false
            }
            if (Array.isArray(this.data)) {
                return false
            }
            return true
        },
        myParamsSerializer() {
            const CONFIG = this.$ShareGood || {}
            const DataViewConfig = CONFIG.DataView || {}

            const paramsSerializer = this.paramsSerializer || DataViewConfig.paramsSerializer
            return paramsSerializer
        },
        exAttrs() {
            const config = this.$ShareGood || {}
            const DataViewConfig = config.DataView || {}
            const attrs = this.$attrs || {}

            const defaults = {
                border: true,
                fit: true,
            }
            return {
                ...defaults,
                ...DataViewConfig,
                ...attrs,
            }
        },
        exPagination() {
            const config = this.$ShareGood || {}
            const DataViewConfig = config.DataView || {}
            const PageConfig = DataViewConfig.pagination || {}
            const myPageConfig = this.pagination || {}

            const result = {
                pageSize: 20,
                visible: true,
                page: 1,
                pageSizes: [10, 20, 50, 100],
                layout: 'total, sizes, prev, pager, next, jumper',
                ...PageConfig,
                ...myPageConfig,
            }
            // console.log('exPagination', result)
            return result
        },
        sgExportData() {
            if (this.allowCheckExport === 'acrossPage' && this.multipleSelectionAll$.length) {
                return this.multipleSelectionAll$
            }
            if (this.allowCheckExport && this.multipleSelection.length) {
                return this.multipleSelection
            }
            return this.exportData
        },
        /** 虚拟滚动-每条数据的key */
        virtualKey() {
            return this.idKey || '$uuid'
        },
    },
    directives: { initTooltip },
    created() {
        this.myColumns = [...this.columns]
        this.operations = this.columns
            .map(item => {
                if (item.prop) {
                    return {
                        checked: true,
                        label: item.label,
                        value: item.prop,
                    }
                } else {
                    return null
                }
            })
            .filter(item => item)

        this.operation = this.operations.map(item => item.value)

        this.auto && this.onLoad({})
    },
    mounted() {
        if (this.isAutoHeight) {
            // if (this.resizeTarget) {
            //     const resizeTarget = this.resizeTarget
            //     const dom = document.querySelector(resizeTarget)
            //     dom && addResizeListener(dom, this.resize)
            //     this.$nextTick(() => {
            //         this.resize()
            //     })
            // } else {
            //     const dom = document.body
            //     addResizeListener(dom, this.resize)
            //     this.$nextTick(() => {
            //         this.resize()
            //     })
            // }
            const dom = document.body
            addResizeListener(dom, this.resize)
            this.$nextTick(() => {
                this.resize()
            })
        }
    },
    beforeDestroy() {
        if (this.isAutoHeight) {
            const dom = document.body
            removeResizeListener(dom, this.resize)
        }
    },
    methods: {
        exportAll() {
            this.$refs.exportAll.onExportAll()
        },
        resize() {
            const H = window.innerHeight
            const resizeMinHeight = this.resizeMinHeight
            const pageHeight = this.$refs.page?.$el?.offsetHeight ?? 0
            const tableHeader = this.$refs.tableWrap.querySelector('.el-table__header-wrapper')
            const tableHeaderHeight = tableHeader.offsetHeight
            const tableWrapHeight = this.$refs.tableWrap.getBoundingClientRect().top
            const resizeBottomHeight = this.resizeBottomHeight
            const height = H - tableWrapHeight - resizeBottomHeight - pageHeight
            this.tableHeight = Math.max(resizeMinHeight, height)
            console.log(
                `[resize] height:${height}resizeBottomHeight:${resizeBottomHeight}  windowHeight:${H} paginationHeight:${pageHeight} tableHeaderHeight:${tableHeaderHeight} tableWrapHeight:${tableWrapHeight}`,
            )
        },
        // 数据加载完后处理是否需要勾选数据
        handleSelection(dataSource) {
            this.multipleSelection = []
            this.$refs.table.clearSelection()
            const multipleSelectionAll = this.multipleSelectionAll$
            const idKey = this.idKey
            const idKeys = multipleSelectionAll.map(item => item[idKey]).filter(item => item)

            dataSource.forEach((item, index) => {
                if (idKeys.includes(item[idKey])) {
                    this.$refs.table.toggleRowSelection(item, true)
                }
            })
        },
        // 合并当前页和之前的页面选中数据
        persistSelection() {
            // 标识当前行的唯一键的名称
            const rowKey = this.idKey

            const dataSource = this.dataSource || []
            const multipleSelectionAll = this.multipleSelectionAll$
            const multipleSelectionAllIds = multipleSelectionAll.map(item => item[rowKey])
            const multipleSelection = this.multipleSelection
            const selectedRowKeys = multipleSelection.map(item => item[rowKey])
            multipleSelection.forEach(item => {
                if (multipleSelectionAllIds.indexOf(item[rowKey]) === -1) {
                    multipleSelectionAll.push(item)
                }
            })

            const noSelectedRowKeys = dataSource
                .map(row => {
                    if (!selectedRowKeys.includes(row[rowKey])) {
                        return row[rowKey]
                    } else {
                        return null
                    }
                })
                .filter(item => item)

            for (let i = multipleSelectionAll.length - 1; i >= 0; i--) {
                if (noSelectedRowKeys.includes(multipleSelectionAll[i][rowKey])) {
                    multipleSelectionAll.splice(i, 1) //执行后aa.length会减一
                }
            }
            this.multipleSelectionAll$ = multipleSelectionAll

            this.$emit('selection-change-all', multipleSelectionAll)
            return multipleSelectionAll
        },
        // 人工选择单选和全选
        selectionChange(val) {
            this.multipleSelection = val
            this.persistSelection()
        },
        // 清除所有分页勾选数据
        clearAllSelection() {
            this.multipleSelectionAll$ = []
            this.multipleSelection = []
            this.$emit('selection-change-all', [])
            this.$refs.table.clearSelection()
        },
        // 整行点击事件
        rowClickChange(option) {
            this.$emit('row-click-change', option)
        },
        //
        handlePrint(id) {
            id = typeof id === 'string' ? id : this.printId
            console.log('handlePrint', id)
            printJS({
                printable: id,
                type: 'html',
                //properties: [
                //    { field: 'name', displayName: '姓名', columnSize:`50%`},
                //    { field: 'sex', displayName: '性别',columnSize:`50%`},
                //],
                // header: `<p class="custom-p"> 名单 </p>`,
                // style: '#printCons {width: 600px;} .no-print{width: 0px} .itemText1 { width: 200px } .itemText2 { width: 200px } .itemText3 { width: 200px } .itemText4 { width: 200px }',
                // gridHeaderStyle:'font-size:12px; padding:3px; border:1px solid; font-weight: 100; text-align:left;',
                // gridStyle:'font-size:12px; padding:3px; border:1px solid; text-align:left;',
                // repeatTableHeader: true,
                // scanStyles:true,
                targetStyles: ['*'],
                ignoreElements: ['no-print'],
            })
        },
        // 排序
        onSortChange(val) {
            const target = this.sortOptions.filter(item => item.value === val)[0]
            const { key, value } = target
            const params = {
                page: 1,
            }
            this.sortParams[key] = value

            this.onLoad(params)
        },
        // 刷新
        handleReload() {
            this.onLoad()
        },
        onOperationChange(val) {
            this.columns = this.myColumns
                .map(item => {
                    if (val.indexOf(item.prop) > -1 || item.type === 'selection') {
                        return item
                    } else {
                        return null
                    }
                })
                .filter(item => item)
        },

        scrollTop() {
            this.$nextTick(() => {
                try {
                    const $el = this.$refs.table.$el,
                        $wrap = $el.getElementsByClassName('el-table__body-wrapper')[0]
                    $wrap && ($wrap.scrollTop = 0)
                } catch (e) {
                    console.log(e)
                }
            })
        },
        // 加载数据
        onLoad(params = {}, options = {}) {
            let page = params.page
            const paramsSerializer = this.myParamsSerializer
            params.pageSize = params.pageSize || this.exPagination.pageSize
            if (page) {
                this.exPagination.page = page
            } else {
                page = this.exPagination.page
                params.page = page
            }
            if (options.loading !== false) {
                this.listLoading = true
            }

            const pageSize$ = params.pageSize
            const page$ = page

            Object.assign(params, this.sortParams)

            params = paramsSerializer ? paramsSerializer(params) : params

            let promise = Array.isArray(this.data)
                ? Promise.resolve({
                      result: this.data,
                      total: this.data.length,
                  })
                : this.load(params)
            if (!promise.then) {
                promise = Promise.resolve(promise)
            }
            const pages = this.pages
            const Total = this.total
            promise
                .then(res => {
                    const body = this.dataSourcePath ? _.get(res, this.dataSourcePath) : res
                    const total = this.dataSourceTotalPath ? _.get(body, this.dataSourceTotalPath) : body?.total ?? 0
                    const result = this.dataSourceResultPath ? _.get(body, this.dataSourceResultPath) : body?.result || body?.data || []
                    // 新增$index字段来支持翻页序号自增
                    result.forEach((item, index) => {
                        item.$index = (page - 1) * pageSize$ + index + 1
                    })
                    this.dataSource = [...result].map(item => {
                        if (this.idKey) return item
                        return { ...item, [this.virtualKey]: guid() }
                    })
                    this.exportData = [...result]

                    this.total = +total || 0
                    if (this.total) {
                        this.pages = Math.ceil(this.total / pageSize$)
                        this.firstIndex = (page$ - 1) * pageSize$ + 1
                        this.lastIndex = this.pages === page$ ? this.total : page$ * pageSize$
                    } else {
                        this.pages = 0
                        this.firstIndex = 0
                        this.lastIndex = 0
                    }

                    this.listLoading = false
                    this.isVirgin = false
                    this.$nextTick(() => {
                        if (this.idKey) {
                            this.handleSelection(this.dataSource)
                        }
                        if (options.scrollTop !== false) {
                            this.scrollTop()
                        }

                        // 当删除数据时 分页数变小则重新请求
                        if (this.pages < pages && this.pages !== 0 && this.total !== Total) {
                            this.onLoad({
                                ...params,
                                page: params.page - 1,
                            })
                        }
                    })
                })
                .catch(err => {
                    console.error('[data-view load]', err)
                    // this.dataSource = []
                    // this.total = 0
                    this.listLoading = false
                    this.isVirgin = false
                    this.scrollTop()
                })
        },
        /********************虚拟滚动相关方法 start ********************/
        objectToString(obj) {
            // 检查变量是否是对象
            if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
                // 使用 Object.entries 遍历对象的键值对
                return Object.entries(obj)
                    .map(function(entry) {
                        let key = entry[0]
                        let value = entry[1]
                        // 返回每个键值对的字符串形式，包括冒号和引号
                        return key + ': ' + value
                    })
                    .join('; ') // 使用 join 方法将数组转换为字符串，并用分号分隔
            }
            // 如果参数不是对象，返回空字符串
            return obj
        },
        /** 自定义表头样式方法 */
        setHeaderCellStyle(data, headerCellFixedStyle) {
            /** 虚拟滚动固定表头设置 */
            const virtualHeaderCellStyle = this.objectToString(headerCellFixedStyle(data))
            /** element原生自定义表头设置 */
            let defaultHeaderCellStyle = ''
            // 是否有表头方法headerCellStyle
            if (!Object.keys(this.$attrs).includes('headerCellStyle')) {
                defaultHeaderCellStyle = ''
            } else {
                defaultHeaderCellStyle = this.objectToString(this.$attrs?.headerCellStyle(data) ?? '')
            }
            // 虚拟滚动的样式不建议修改，放在后面
            return defaultHeaderCellStyle + virtualHeaderCellStyle
        },
        /**虚拟滚动组件的change */
        onChange(renderData) {
            this.tableData = renderData
        },
        /********************虚拟滚动相关方法 end ********************/
    },
}
</script>
