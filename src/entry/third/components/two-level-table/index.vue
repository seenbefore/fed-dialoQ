<!-- 二级表格 -->
<template>
    <div class="two-level-table sg-base-table">
        <slot name="header"></slot>
        <el-table :data="tableData" :span-method="objectSpanMethod" v-bind="$attrs" v-on="$listeners" style="width: 100%">
            <el-table-column v-for="(col, index) in myColumns" :key="index" :align="col.align || 'center'" :fixed="col.fixed || false" v-bind="col" :colspan="2">
                <el-table-column v-for="(towCol, innerIndex) in col.children" :key="`tow_${innerIndex}`" :align="towCol.align || 'center'" :fixed="towCol.fixed || false" v-bind="towCol">
                    <el-table-column
                        v-for="(threeCol, deepIndex) in towCol.children"
                        :key="`three_${deepIndex}`"
                        :align="threeCol.align || 'center'"
                        :fixed="threeCol.fixed || false"
                        v-bind="threeCol"
                    ></el-table-column>
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'TwoLevelTable',
    props: {
        // 列
        columns: {
            type: Array,
            default() {
                return []
            },
        },
        // 数据请求
        load: {
            type: Function,
            default() {
                return []
            },
        },
        // 自动加载
        autoLoad: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            tableData: [],
        }
    },
    computed: {
        myColumns({ columns }) {
            return columns
        },
        mergeColColumns({ myColumns }) {
            const $myColumns = myColumns.flat()
            return $myColumns.filter(item => item.mergeCol)
        },
    },
    created() {
        this.autoLoad && this.onLoad()
    },
    methods: {
        onLoad() {
            let promise = this.load()
            if (!promise.then) {
                promise = Promise.resolve(promise)
            }
            promise.then(({ result = [] }) => {
                this.tableData = this.initMergeColData([...result])
            })
        },
        // 初始换合并列数据
        initMergeColData(data) {
            this.mergeColColumns.forEach(column => {
                const obj = {}
                data.forEach(item => {
                    const key = column.prop
                    const val = item[key]
                    item.$rowspan = {}
                    if (!obj[val]) {
                        obj[val] = item
                    }
                    item.$rowspan[key] = 0
                    obj[val].$rowspan[key] = obj[val].$rowspan[key] + 1
                })
            })
            return data
        },
        // 数据格合并处理
        objectSpanMethod({ column, columnIndex, row, rowIndex }) {
            const $rowspan = row.$rowspan || {}
            if (Object.keys($rowspan).includes(column.property)) {
                return { rowspan: $rowspan[column.property], colspan: 1 }
            }
        },
    },
}
</script>
