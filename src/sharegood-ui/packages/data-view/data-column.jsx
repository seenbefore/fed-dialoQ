import ReElTableColumn from './re-el-table-column.vue'
import EllipsisTooltip from '../ellipsis-tooltip/index.vue'

/**table中的column  函数式组件 */
export default {
    functional: true,
    props: {
        /**配置项 */
        columns: {
            type: Array,
            default: () => [],
        },
        /**默认值 */
        defaultValue: {
            type: String,
            default: '-',
        },
        handleSelectAble: {
            type: Function,
            default: () => true,
        },
        disabledTooltipSet: {
            type: Object,
            default: () => ({}),
        },
    },
    render: (h, ctx) => {
        const { columns, ...restProps } = ctx.props
        const columns_ = [...columns].filter(item => !item.ifRender || item.ifRender())
        const isTree = columns_.some(item => item.children?.length)
        const myColumns = columns_.map(item => ({
            ...item,
            /**随机标记key，解决ifrender动态控制显隐时，渲染异常问题 */
            key: isTree ? `${Math.random()}` : item.prop,
        }))
        /* 默认值处理 */
        const handleDefaultValue = (scope, col) => {
            const value = scope?.row?.[col.prop]
            return value || (value === 0 ? '0' : restProps.defaultValue)
        }
        /* 自定义组件渲染 */
        const exSlot = (scope, col) =>
            col.tooltip || getDefaultColumn(col).showOverflowTooltip ? (
                <EllipsisTooltip rowCount={col.overflowCount}>
                    <span class={[col.prop || '', col.class || col.className || ''].join(' ')}>
                        {col.render(h, {
                            row: scope.row,
                            index: scope.$index,
                            column: col,
                            tableColumn: scope.column,
                        }) || restProps.defaultValue}
                    </span>
                </EllipsisTooltip>
            ) : (
                <span class={[col.prop || '', col.class || col.className || ''].join(' ')}>
                    {col.render(h, {
                        row: scope.row,
                        index: scope.$index,
                        column: col,
                        tableColumn: scope.column,
                    }) || restProps.defaultValue}
                </span>
            )
        /* tooltip渲染 */
        const tooltip = (scope, col) => <EllipsisTooltip rowCount={col.overflowCount} value={handleDefaultValue(scope, col)}></EllipsisTooltip>
        const columnRender = col => {
            switch (col.type) {
                case 'selection':
                    return <ReElTableColumn key={col.key} type="selection" selectable={restProps.handleSelectAble} props={getDefaultColumn(col)} />
                case 'index':
                    return <ReElTableColumn key={col.key} type="index" props={getDefaultColumn(col)} />
                case '$index':
                    return <ReElTableColumn key={col.key} type="index" props={getDefaultColumn(col)} />
                case 'slot':
                    return ctx.scopedSlots[col.name || col.prop]?.()
                default:
                    return (
                        <ReElTableColumn key={col.key} props={{ ...getDefaultColumn(col), showOverflowTooltip: false }}>
                            {col.children?.length ? (
                                <data-column columns={col.children} props={restProps} scopedSlots={ctx.scopedSlots} />
                            ) : (
                                scope => {
                                    if (col.slotName) {
                                        return ctx.scopedSlots[col.slotName]?.(scope)
                                    }
                                    if (col.render) {
                                        return exSlot(scope, col)
                                    }
                                    if ((col.tooltip && scope.row[col.prop]) || (getDefaultColumn(col).showOverflowTooltip && scope.row[col.prop])) {
                                        return tooltip(scope, col)
                                    }
                                    return <span class={col.class}>{handleDefaultValue(scope, col)}</span>
                                }
                            )}
                        </ReElTableColumn>
                    )
            }
        }
        return myColumns.map(col => columnRender(col))
    },
}

/**
 * 获取column默认配置项
 * @param {*} column 配置项
 * @return {*}
 */
function getDefaultColumn(column) {
    return {
        width: ['index', '$index'].includes(column.type) ? '50px' : column.width,
        fixed: false,
        align: 'center',
        showOverflowTooltip: column.type === 'action' ? false : true,
        overflowCount: 1,
        ...column,
    }
}
