export const ExSlot = {
    functional: true,
    props: {
        row: Object,
        model: Object,
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
            model: ctx.props.model,
        }
        if (typeof ctx.props.render === 'function') {
            return [ctx.props.render(h, params)]
        } else {
            return [ctx.props.render]
        }
    },
}
