<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import useCustomLock from './custom-lock'
import { TableColumn } from 'element-ui'

const { getPropsData, registerComplexWatchers, setColumnRenders } = (TableColumn as any).methods
const EL_TABLE_VIRTUAL_SCROLL_TAG = 'virtual-scroll'
const FIXED_KEY = 'vfixed'
/**
 * 通过标签名获取组件
 */
function getComponentByTag(tag, instance) {
    let parent = instance.$parent || instance.$root
    let tagName = instance.$options._componentTag
    while (parent && (!tagName || tagName !== tag)) {
        parent = parent.$parent

        if (parent) {
            tagName = parent.$options._componentTag
        }
    }
    return parent
}

@Component({
    name: 'ReElTableColumn',
    extends: TableColumn,
    components: {},
})
export default class ReElTableColumn extends Vue {
    customLock: ReturnType<typeof useCustomLock> = {} as ReturnType<typeof useCustomLock>
    created() {
        this.customLock = useCustomLock({
            fixedKey: FIXED_KEY,
            callback: () => {
                this.$emit('update:vfixed', this.columnConfig.vfixed)
            },
        })
    }

    columnConfig!: any
    owner!: any
    getPropsData(...props) {
        let propsData = getPropsData.call(this, ...props)
        propsData[FIXED_KEY] = this.$attrs[FIXED_KEY]
        return propsData
    }
    registerComplexWatchers(...rest) {
        registerComplexWatchers.call(this, ...rest)
        this.$watch(`$attrs.${FIXED_KEY}`, newVal => {
            this.$set(this.columnConfig, FIXED_KEY, newVal)
            this.owner.store.scheduleLayout(true)
            const virtualScrollRef = getComponentByTag(EL_TABLE_VIRTUAL_SCROLL_TAG, this)
            virtualScrollRef?.doHeaderLayout?.()
        })
    }
    setColumnRenders(column) {
        const columnCopy = { ...column }
        setColumnRenders.call(this, column)
        if (column.type !== 'selection') {
            column.renderHeader = (h, scope) => {
                const renderHeader = this.$scopedSlots.header
                const _column = {
                    ...(scope.column ?? {}),
                    fixed: column.vfixed ?? column.fixed,
                }
                const vnode =
                    columnCopy.renderHeader?.(h, {
                        ...scope,
                        column: _column,
                    }) ??
                    renderHeader?.({ ...scope, column: _column }) ??
                    column.label
                const lockVnode = this.customLock?.renderLockVNode?.(scope)
                return [vnode, lockVnode]
            }
        }
        return column
    }
}
</script>

<style lang="less" scoped></style>
