export const ExSlot = {
    functional: true,
    props: {
        row: Object,
        render: Function,
        column: {
            type: Object,
            default: null,
        },
    },

    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index,
        }
        if (typeof ctx.props.render === 'function') {
            return [ctx.props.render(h, params)]
        } else {
            return [ctx.props.render]
        }
    },
}
