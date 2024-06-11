<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { TableColumn } from 'element-ui'
import useCustomLock from './custom-lock'

@Component({
    name: 'ReElTableColumn',
    extends: TableColumn,
    components: {},
})
export default class ReElTableColumn extends Vue {
    customLock: ReturnType<typeof useCustomLock> = {} as ReturnType<typeof useCustomLock>
    created() {
        this.customLock = useCustomLock()
    }

    renderHeader!: any
    setColumnRenders(column: any) {
        const columnCopy = { ...column }
        const _setColumnRenders = (TableColumn as any).methods.setColumnRenders
        _setColumnRenders.bind(this)(column)
        if (this.renderHeader || column.type !== 'selection') {
            column.renderHeader = (h: any, scope: any) => {
                const lockVnode = this.customLock?.renderLockVNode?.(scope)
                const renderHeader = this.$scopedSlots.header
                return columnCopy.renderHeader?.(h, { ...scope, lockVnode }) ?? renderHeader?.({ ...scope, lockVnode }) ?? [column.label, lockVnode]
            }
        }
        return column
    }
}
</script>

<style lang="less" scoped></style>
