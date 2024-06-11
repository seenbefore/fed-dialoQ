import { isEmpty } from 'lodash'

export default {
    name: 'ElDescriptionsRow',
    props: {
        row: {
            type: Array,
        },
        dataId: {
            type: String,
        },
    },
    inject: ['elDescriptions'],
    render(h) {
        const { elDescriptions } = this
        const getLabel = labelFnc => (typeof labelFnc === 'function' ? labelFnc(h) : labelFnc)
        const row = (this.row || []).map(item => {
            const label = getLabel(item.slots.label || item.props.label)
            const labelSuffix = item.props.labelSuffix ?? item.labelSuffix ?? elDescriptions.labelSuffix ?? '：'
            const getLabelStyle = () => {
                const labelStyle = item.props.labelStyle || elDescriptions.labelStyle
                const labelWidth = item.props.labelWidth || elDescriptions.labelWidth
                if (!labelWidth) return labelStyle
                if (!labelStyle) return { width: labelWidth }
                if (typeof labelStyle === 'string') {
                    return `width: ${labelWidth}; ${labelStyle}`
                } else if (typeof labelStyle === 'object') {
                    return {
                        width: labelWidth,
                        ...labelStyle,
                    }
                }
                return labelStyle
            }
            return {
                ...item,
                label: isEmpty(label) ? '' : item.slots.label ? label : `${label}${labelSuffix}`,
                labelStyle: getLabelStyle(),
                ...['labelClassName', 'contentClassName', 'contentStyle'].reduce((res, key) => {
                    res[key] = item.props[key] || elDescriptions[key]
                    return res
                }, {}),
            }
        })
        /* TODO：为了代码生成用 */
        const dataId = this.row[0]?.props.dataId ?? ''
        if (elDescriptions.direction === 'vertical') {
            return (
                <tbody onClick={(...args) => this.$emit('click', ...args)}>
                    <tr class="el-descriptions-row">
                        {row.map(item => {
                            return (
                                <th
                                    class={{
                                        'el-descriptions-item__cell': true,
                                        'el-descriptions-item__label': true,
                                        'has-colon': elDescriptions.border ? false : elDescriptions.colon,
                                        'is-bordered-label': elDescriptions.border,
                                        [item.labelClassName]: true,
                                        'el-descriptions-item__label-hidden': !item.label,
                                    }}
                                    style={item.labelStyle}
                                    colSpan={item.props.span}
                                >
                                    {item.label}
                                </th>
                            )
                        })}
                    </tr>
                    <tr class="el-descriptions-row">
                        {row.map(item => {
                            return (
                                <td
                                    data-id={item.props.dataId}
                                    onClick={(...args) => this.$emit('thClick', ...args)}
                                    class={['el-descriptions-item__cell', 'el-descriptions-item__content', item.contentClassName]}
                                    style={item.contentStyle}
                                    colSpan={item.props.span}
                                >
                                    {item.slots.default}
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
            )
        }
        if (elDescriptions.border) {
            return (
                <tbody onClick={(...args) => this.$emit('click', ...args)}>
                    <tr class="el-descriptions-row">
                        {row.map(item => {
                            return [
                                <th
                                    data-id={item.props.dataId}
                                    onClick={(...args) => this.$emit('thClick', ...args)}
                                    class={{
                                        'el-descriptions-item__cell': true,
                                        'el-descriptions-item__label': true,
                                        'is-bordered-label': elDescriptions.border,
                                        [item.labelClassName]: true,
                                        'el-descriptions-item__label-hidden': !item.label,
                                    }}
                                    style={item.labelStyle}
                                    colSpan="1"
                                >
                                    {item.label}
                                </th>,
                                <td class={['el-descriptions-item__cell', 'el-descriptions-item__content', item.contentClassName]} style={item.contentStyle} colSpan={item.props.span * 2 - 1}>
                                    {item.slots.default}
                                </td>,
                            ]
                        })}
                    </tr>
                </tbody>
            )
        }
        return (
            <tbody onClick={(...args) => this.$emit('click', ...args)}>
                <tr class="el-descriptions-row">
                    {row.map(item => {
                        return (
                            <td data-id={item.props.dataId} onClick={(...args) => this.$emit('thClick', ...args)} class="el-descriptions-item el-descriptions-item__cell" colSpan={item.props.span}>
                                <div class="el-descriptions-item__container">
                                    <span
                                        class={{
                                            'el-descriptions-item__label': true,
                                            'has-colon': elDescriptions.colon,
                                            [item.labelClassName]: true,
                                            'el-descriptions-item__label-hidden': !item.label,
                                        }}
                                        style={item.labelStyle}
                                    >
                                        {item.label}
                                    </span>
                                    <span class={['el-descriptions-item__content', item.contentClassName]} style={item.contentStyle}>
                                        {item.slots.default}
                                    </span>
                                </div>
                            </td>
                        )
                    })}
                </tr>
            </tbody>
        )
    },
}
