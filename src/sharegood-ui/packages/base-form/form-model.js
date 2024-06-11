const filterXSS = require('xss')
function formatter(x) {
    if (x && typeof x === 'string') {
        // x = x.replace(/^\s+|\s+$/gm, '')
        // x = filterXSS(x)
    } else if (x && typeof x === 'number') {
        x = Number(x.toString().replace(/^\s+|\s+$/gm, ''))
    }
    return x
}
import { ExSlot } from '../utils/ExSlot'
export default {
    components: {
        ExSlot,
    },
    props: {
        appendSlotRender: {
            type: [Function, String],
            default: null,
        },
        formActionType: {
            type: Object,
            default() {
                return {}
            },
        },
        formModel: {
            type: Object,
            default() {
                return {}
            },
        },
        schema: {
            type: Object,
            default() {
                return {}
            },
        },
        name: {
            type: String,
            default: '',
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        label: {
            type: String,
            default: '',
        },
        onChange: {
            type: Function,
            default() {},
        },
        listeners: {
            type: Object,
            default() {
                return {}
            },
        },
        labelRender: {
            type: Function,
            default() {},
        },
        appendSlot: {
            type: String,
            default: '',
        },
        prependSlot: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            currentValue: this.value,
        }
    },
    methods: {
        dictToArray(dict) {
            return Object.keys(dict).map(name => {
                console.log('name', typeof name, name)
                return { label: dict[name], value: name }
            })
        },
        onInputEvent(value) {
            const dataList = this.dataList || []
            const valueKey = this.valueKey || 'value'
            const label = this.label
            const target = dataList.filter(item => item[valueKey] == value)[0]

            this.onChange &&
                this.onChange(
                    {
                        name: this.name,
                        value: value,
                        label: label,
                        option: target,
                    },
                    {
                        schema: this.schema,
                        formActionType: this.formActionType,
                        formModel: this.formModel,
                    },
                )

            this.$emit('input', formatter(value))
        },
        reset() {
            this.currentValue = ''
        },
    },
    watch: {
        value(val) {
            this.currentValue = formatter(val)
        },
    },
}
