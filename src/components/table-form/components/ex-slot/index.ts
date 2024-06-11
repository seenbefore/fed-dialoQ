import { CreateElement } from 'vue'

/**自定义内容的组件 */
export default {
    functional: true,
    props: {
        scope: Object,
        disabledTooltip: Boolean,
        useTooltip: Boolean,
        row: Object,
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null,
        },
        extra: {
            type: Object,
            default: () => ({}),
        },
        defaultValue: String,
    },
    render: (h: CreateElement, ctx: Record<string, any>) => {
        const useTooltip = ctx.props.useTooltip
        const params = {
            row: ctx.props.row,
            index: ctx.props.index,
            column: ctx.props.column || {},
            extra: ctx.props.extra || {},
            operaType: ctx.parent.operaType,
        }
        const defaultValue = ctx.props.defaultValue
        let value = ctx.props.render(h, params)
        if ([null, undefined, ''].includes(value)) {
            value = defaultValue
        }

        return useTooltip
            ? h(
                  'el-tooltip',
                  {
                      props: {
                          popperClass: 'sg-table-tooltip',
                          effect: 'dark',
                          placement: 'top-end',
                          disabled: ctx.props.disabledTooltip,
                      },
                  },
                  [
                      h(
                          'div',
                          {
                              class: ['sg-table-txt-cut', params.column.prop || '', params.column.class || params.column.className || ''].join(' '),
                              directives: [
                                  {
                                      name: 'initTooltip',
                                      value: ctx.props.scope,
                                  },
                              ],
                          },
                          [h('span', undefined, [value])],
                      ),
                      h('div', { slot: 'content' }, [value]),
                  ],
              )
            : h('span', undefined, [value])
    },
}
