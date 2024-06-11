<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseCascader from '@/sharegood-ui/packages/base-cascader/src/index.vue'
import { CreateElement } from 'vue'
import ExSlot from '../ex-slot/index'
import BaseForm from '../base-form/index.vue'
@Component({
    name: 'MyCascader',
    components: {},
    extends: BaseCascader,
})
export default class MyCascader extends BaseForm {
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
            component = [(BaseCascader as any).render.bind(this)(h)]
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
        const cascaderRef = this.$refs.cascader as any
        const checkedNodes = cascaderRef?.getCheckedNodes() || []
        const showLabel = checkedNodes.map((item: any) => item.pathLabels.join('/')).join()
        return column.render
            ? (h: CreateElement, params: Record<string, any>) =>
                  column.render(h, {
                      ...params,
                      checkedNodes,
                  })
            : () => showLabel || value
    }
}
</script>
