<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseDate from '@/sharegood-ui/packages/base-date/src/index.vue'
import { CreateElement } from 'vue'
import ExSlot from '../ex-slot/index'
import BaseForm from '../base-form/index.vue'
@Component({
    name: 'MyDate',
    components: {},
    extends: BaseDate,
})
export default class MyDate extends BaseForm {
    loading = false

    initValue() {
        const { type = '' } = this.column?.attrs ?? {}
        const isRange = type.includes('range')
        const defaultValue = isRange ? [] : ''
        const value = this.row[this.column.prop]
        this.$emit('input', value ?? defaultValue)
    }

    render(h: CreateElement) {
        let component = []
        if (this.operaType === 'readonly') {
            component = [
                h(ExSlot, {
                    props: {
                        render: this.getRender(this.column, this.row),
                        index: this.index,
                        row: this.row,
                        column: this.column,
                        class: this.column.prop,
                        defaultValue: this.myDefaultValue(this.column),
                    },
                }),
            ]
        } else {
            component = [(BaseDate as any).render.bind(this)(h)]
        }
        return h(
            'div',
            {
                style: { minHeight: '24px' },
                directives: [
                    {
                        name: 'loading',
                        value: this.loading,
                    },
                ],
            },
            component,
        )
    }

    /**
     * 获取渲染内容
     * @param {*} column 列配置信息
     * @param {*} row 列表行数值
     * @return {*}
     */
    getRender(column: Record<string, any>, row: Record<string, any>) {
        const value = row[column.prop]
        return column.render ? column.render : () => value?.toString()
    }
}
</script>
<style lang="less" scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 100%;
}
</style>
