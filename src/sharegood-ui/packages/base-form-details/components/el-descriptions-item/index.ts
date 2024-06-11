import { AsyncComponent } from 'vue'

export default ({
    name: 'ElDescriptionsItem',
    props: {
        label: {
            type: String,
            default: '',
        },
        span: {
            type: Number,
            default: 1,
        },
        contentClassName: {
            type: String,
            default: '',
        },
        contentStyle: {
            type: Object,
        },
        labelClassName: {
            type: String,
            default: '',
        },
        labelStyle: {
            type: Object,
        },
        /* labelWidth */
        labelWidth: {
            type: String,
            default: '',
        },
        labelSuffix: {
            type: String,
        },
        rowClassName: {
            type: String,
        },
    },
    render() {
        return null
    },
} as unknown) as AsyncComponent
