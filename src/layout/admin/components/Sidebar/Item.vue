<script>
export default {
    name: 'MenuItem',
    functional: true,
    props: {
        icon: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
    },
    render(h, context) {
        const { icon, title } = context.props
        const vnodes = []

        if (icon) {
            if (icon.indexOf('el-icon') > -1) {
                vnodes.push(<i class={[icon, 'sub-el-icon']} />)
            } else if (icon.includes('iconfont')) {
                vnodes.push(<i class={[icon, 'sub-el-icon']} />)
            } else {
                vnodes.push(<svg-icon class={[icon, 'sub-svg-icon', 'sub-el-icon']} icon-class={icon} icon={icon} />)
            }
        }

        if (title) {
            vnodes.push(<span slot="title">{title}</span>)
        }
        return vnodes
    },
}
</script>

<style scoped>
/* .sub-el-icon {
    width: 1em;
    height: 1em;
    color: currentColor;
} */
</style>
