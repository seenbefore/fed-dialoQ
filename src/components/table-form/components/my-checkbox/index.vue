<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseCheckbox from '@/sharegood-ui/packages/base-checkbox/src/index.vue'
import { CreateElement } from 'vue'
import ExSlot from '../ex-slot/index'
import BaseForm from '../base-form/index.vue'
@Component({
    name: 'MyCheckbox',
    components: {},
    extends: BaseCheckbox,
})
export default class MyCheckbox extends BaseForm {
    loading = false
    /**下拉选项数据 */
    dataList: {
        value: string | number
        label: string
        [key: string]: any
    }[] = []

    initValue() {
        const defaultValue: any[] = []
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
            component = [(BaseCheckbox as any).render.bind(this)(h)]
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
        // 从枚举值中，查找显示文本
        const selecteds = this.dataList.filter(item => {
            return (value || []).includes(item.value)
        })
        const showLabel = selecteds.map(item => item.label).join()
        return column.render
            ? (h: CreateElement, params: Record<string, any>) =>
                  column.render(h, {
                      ...params,
                      dataList: this.dataList,
                      selecteds,
                  })
            : () => showLabel || value
    }
}
</script>
