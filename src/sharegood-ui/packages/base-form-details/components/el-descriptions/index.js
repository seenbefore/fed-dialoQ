import { isFunction } from 'element-ui/src/utils/types'
import DescriptionsRow from './descriptions-row'

export default {
    name: 'ElDescriptions',
    components: {
        [DescriptionsRow.name]: DescriptionsRow,
    },
    props: {
        border: {
            type: Boolean,
            default: false,
        },
        column: {
            type: Number,
            default: 3,
        },
        direction: {
            type: String,
            default: 'horizontal',
        },
        size: {
            type: String,
            // validator: isValidComponentSize,
        },
        title: {
            type: String,
            default: '',
        },
        extra: {
            type: String,
            default: '',
        },
        labelStyle: {
            type: Object,
        },
        contentStyle: {
            type: Object,
        },
        labelClassName: {
            type: String,
            default: '',
        },
        contentClassName: {
            type: String,
            default: '',
        },
        colon: {
            type: Boolean,
            default: true,
        },
        /** custom label suffix, default ： */
        labelSuffix: {
            type: String,
            default: '：',
        },
        /* labelWidth */
        labelWidth: {
            type: String,
            default: '',
        },
    },
    computed: {
        descriptionsSize() {
            return this.size || (this.$ELEMENT || {}).size
        },
    },
    provide() {
        return {
            elDescriptions: this,
        }
    },
    methods: {
        getOptionProps(vnode) {
            const dataId = vnode.data && vnode.data.attrs && vnode.data.attrs['data-id']
            if (vnode.componentOptions) {
                const componentOptions = vnode.componentOptions
                const { propsData = {}, Ctor = {} } = componentOptions
                const props = (Ctor.options || {}).props || {}
                const res = {}
                for (const k in props) {
                    const v = props[k]
                    const defaultValue = v.default
                    if (defaultValue !== undefined) {
                        res[k] = isFunction(defaultValue) ? defaultValue.call(vnode) : defaultValue
                    }
                }
                return { ...res, ...propsData, dataId }
            }
            return {}
        },
        getSlots(vnode) {
            let componentOptions = vnode.componentOptions || {}
            const children = vnode.children || componentOptions.children || []
            const labelSlot = vnode.data?.scopedSlots?.label
            const slots = labelSlot ? { label: labelSlot } : {}
            children.forEach(child => {
                if (!this.isEmptyElement(child)) {
                    const name = (child.data && child.data.slot) || 'default'
                    const labelSlot = child.data && child.data.scopedSlots
                    slots[name] = slots[name] || []
                    if (child.tag === 'template') {
                        slots[name].push(child.children)
                    } else {
                        slots[name].push(child)
                    }
                }
            })
            return { ...slots }
        },
        isEmptyElement(c) {
            return !(c.tag || (c.text && c.text.trim() !== ''))
        },
        filledNode(node, span, count, isLast = false) {
            if (!node.props) {
                node.props = {}
            }
            if (span > count) {
                node.props.span = count
            }
            if (isLast) {
                // set the max span, cause of the last td
                node.props.span = count
            }
            return node
        },
        getRows() {
            const children = (this.$slots.default || []).filter(vnode => vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'ElDescriptionsItem')
            const nodes = children.map(vnode => {
                return {
                    props: this.getOptionProps(vnode),
                    slots: this.getSlots(vnode),
                    vnode,
                }
            })
            const rows = []
            let temp = []
            let count = this.column

            nodes.forEach((node, index) => {
                const span = node.props.span || 1

                if (index === children.length - 1) {
                    temp.push(this.filledNode(node, span, count, true))
                    rows.push(temp)
                    return
                }

                if (span < count) {
                    count -= span
                    temp.push(node)
                } else {
                    temp.push(this.filledNode(node, span, count))
                    rows.push(temp)
                    count = this.column
                    temp = []
                }
            })

            return rows
        },
        getRunResult(value) {
            return typeof value === 'function' ? value() : value
        },
        emitRowEvent(eventName, ...args) {
            this.$emit(eventName, ...args)
            const event = args[0]
            // 阻止事件冒泡
            event && event.stopPropagation()
            return false
        },
    },
    render() {
        const { title, extra, border, descriptionsSize, $slots } = this
        const rows = this.getRows()

        const currentExtra = this.getRunResult(extra || $slots.extra)

        return (
            <div class={['el-descriptions', this.labelClassName]} onClick={(...args) => this.$emit('click', ...args)}>
                {title || currentExtra || $slots.title ? (
                    <div class="el-descriptions__header">
                        <div class="el-descriptions__title">{$slots.title ? $slots.title : title}</div>
                        <div class="el-descriptions__extra">{currentExtra}</div>
                    </div>
                ) : null}

                <div class="el-descriptions__body">
                    <table class={['el-descriptions__table', { 'is-bordered': border }, descriptionsSize ? `el-descriptions--${descriptionsSize}` : '', this.contentClassName]}>
                        {rows.map(row => (
                            <DescriptionsRow
                                row={row}
                                class={row?.[0]?.props?.rowClassName ?? ''}
                                onClick={(...args) => this.emitRowEvent('rowClick', ...args)}
                                onThClick={(...args) => this.emitRowEvent('thClick', ...args)}
                            ></DescriptionsRow>
                        ))}
                    </table>
                </div>
            </div>
        )
    },
}
