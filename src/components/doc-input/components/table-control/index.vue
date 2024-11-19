<template>
    <table cellspacing="0" cellpadding="0" class="table-control">
        <thead>
            <tr class="table-head-tr">
                <td
                    v-for="tableColumn in tableColumns"
                    :key="`head-${tableColumn.name}`"
                    :style="{
                        width: tableColumn.rowWidth,
                        textAlign: tableColumn.headTextAlign,
                    }"
                >
                    <span v-text="tableColumn.columnName"></span>
                </td>
                <div class="opera-box">
                    <span @click="addColumn()">+</span>
                </div>
            </tr>
        </thead>
        <tbody>
            <tr class="table-body-tr" v-for="(item, index) in myValue" :key="index">
                <td v-for="tableColumn in tableColumns" :key="`body-${tableColumn.name}`">
                    <component v-model="item[tableColumn.name]" v-bind="tableColumn" :is="tableColumn.is" ref="fieldRef" @input="oninput($event, tableColumn.name, item)"></component>
                </td>
                <div class="opera-box">
                    <span @click="removeColumn(item, index)">-</span>
                </div>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { isEmptyItem } from '../../service'
@Component({
    name: 'TableControl',
    components: {},
})
export default class TableControl extends Vue {
    /**当前输入的值 */
    @Prop({ type: [Array, String], default: () => [] })
    value!: Record<string, any>[] | ''
    /**禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean
    /**table数据 */
    @Prop({ type: Array, default: () => [] })
    tableColumns!: any[]
    /**table最小行数 */
    @Prop({ type: Number, default: 1 })
    minRow!: number
    /**table最大行数 */
    @Prop({ type: Number, default: 50 })
    maxRow!: number

    defaultDisplayRowCount = 3

    myValue: Record<string, any>[] = []
    @Watch('value', { deep: true, immediate: true })
    watchValue(newV: Record<string, any>[] | '', oldV: Record<string, any>[] | '') {
        if (JSON.stringify(newV) === JSON.stringify(oldV)) return
        let myValue = newV ? newV : []
        const diffNum = this.defaultDisplayRowCount - myValue.length
        if (diffNum > 0) {
            this.myValue = [...myValue, ...this.createRowData(diffNum)]
        } else {
            this.myValue = myValue
        }
    }

    /**创建一行数据 */
    createRowData(num = 1) {
        return new Array(num).fill(0).map(item => {
            // return {}
            return this.tableColumns.reduce((acc, { name }) => {
                acc[name] = ''
                return acc
            }, {})
        })
    }

    /**组件输入事件回调 */
    oninput(value: any, name: string, item: Record<string, any>) {
        this.$set(item, name, value)
        this.$emit('input', this.myValue)
    }
    /**添加行 */
    addColumn() {
        if (this.myValue.length >= this.maxRow) {
            return this.$message.error(`最多${this.maxRow}行`)
        }
        this.myValue.push(...this.createRowData(1))
        this.$emit('input', this.myValue)
    }
    /**移除行 */
    async removeColumn(value: Record<string, any>, index: number) {
        if (this.myValue.length <= this.minRow) {
            return this.$message.error(`最少${this.minRow}行`)
        }
        if (!isEmptyItem(value)) {
            await this.$confirm(`该项已有内容，确认删除?`, '提示')
        }
        this.myValue.splice(index, 1)
        this.$emit('input', this.myValue)
    }
}
</script>
<style lang="less" scoped>
.table-control {
    width: 100%;
    border-collapse: collapse;
    td,
    th {
        border: 1px solid #000;
        padding: 0 5px;
    }
    .table-head-tr,
    .table-body-tr {
        position: relative;
        .opera-box {
            position: absolute;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            & > span {
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #1296db;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                text-align: center;
                cursor: pointer;
                margin-left: 5px;
                color: #1296db;
                user-select: none;
            }
        }
    }
}
</style>
