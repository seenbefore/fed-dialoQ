<template>
    <div class="my-table-columns">
        <template v-for="myColumn in myColumns">
            <el-table-column
                :key="myColumn.key"
                :width="getColumnWidth(myColumn)"
                :align="myColumn.align || 'center'"
                :fixed="myColumn.fixed || false"
                :min-width="myColumn.minWidth || 150"
                v-bind="myColumn"
                v-on="$listeners"
            >
                <template #header="{ column, $index }" v-if="myColumn.headerRender">
                    <ex-slot :render="myColumn.headerRender" :index="$index" :column="column"></ex-slot>
                </template>
                <my-table-column v-if="myColumn.children" :columns="myColumn.children" v-bind="$props"></my-table-column>
                <template #default="{row, $index}" v-if="myColumn.type !== 'index'">
                    <my-form-item :index="$index" :opera-type="handleOperatype(row.$$operaType, operaType)" :row="row" :default-value="defaultValue" :column="myColumn"></my-form-item>
                </template>
            </el-table-column>
        </template>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { OperaType } from '../../types'
import MyFormItem from '../my-form-item/index.vue'
import ExSlot from '../ex-slot/index'

@Component({
    name: 'MyTableColumn',
    components: { MyFormItem, ExSlot },
})
export default class MyTableColumn extends Vue {
    created() {}
    mounted() {}

    /**配置项 */
    @Prop({ type: Array, default: () => [] })
    columns!: Record<string, any>[]
    /**操作类型 [edit: 编辑, readonly: 只读] */
    @Prop({ type: String, default: 'edit' })
    operaType!: OperaType
    /**只读状态下，空值的默认值 */
    @Prop({ type: String, default: '-' })
    defaultValue!: string

    @Emit('input')
    emitInput(data?: Record<string, any>) {
        return data
    }

    get myColumns() {
        const columns = [
            /**占位格，为了解决，table-column外层包裹了div后，第一个column会被放到最后的问题 */
            {
                width: '1px',
                defaultValue: '',
                'class-name': 'placehoudler-th',
            },
            /**占位格，为了解决，第一个表头合并表头单元格时，无效问题 */
            {
                width: '1px',
                defaultValue: '',
                'class-name': 'placehoudler-th',
            },
            ...this.columns,
        ].filter(item => !item.ifRender || item.ifRender(this.operaType))
        const isTree = columns.some(item => item.children?.length)
        return columns.map(item => ({
            ...item,
            /**随机标记key，解决ifrender动态控制显隐时，渲染异常问题 */
            key: isTree ? `${Math.random()}` : item.prop,
        }))
    }

    /**
     * 获取列宽度
     * @param {*} column 配置项
     * @return {*}
     */
    getColumnWidth(column: Record<string, any>) {
        if (column.type === 'index') {
            return column.width || '50px'
        }
        return column.width
    }

    /**
     * @description: 处理行的编辑状态与全局编辑状态的关系
     * @return {*}
     */
    handleOperatype($$operaType: string | undefined, operaType: string) {
        if (operaType === 'readonly') return operaType
        return $$operaType ?? operaType
    }
}
</script>
