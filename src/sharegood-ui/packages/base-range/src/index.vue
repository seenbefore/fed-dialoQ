<template>
    <div class="sg-data-form-field sg-range">
        <span>{{ myMin }}{{ myMax }}</span>
        <slot name="prependSlot"></slot>
        <el-input v-model="min" @input="onInputMin" class="sg-range__input" :placeholder="startPlaceholder" v-bind="$attrs"></el-input>
        <span class="sg-range__gap">{{ gap }}</span>
        <el-input v-model="max" @input="onInputMax" class="sg-range__input" :placeholder="endPlaceholder" v-bind="$attrs"></el-input>
        <slot name="appendSlot"></slot>
        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseRange',
    props: {
        startPlaceholder: {
            type: String,
            default: '',
        },
        endPlaceholder: {
            type: String,
            default: '',
        },
        gap: {
            type: String,
            default: '至',
        },
        value: {
            type: [String, Number, Array],
            default: null,
        },
    },
    mixins: [formMixins],
    data() {
        return {
            min: '',
            max: '',
            currentValue: this.value,
        }
    },
    watch: {
        value(val) {
            if (val && val[0] != undefined) {
                this.min = val[0]
            } else {
                this.min = ''
            }
            if (val && val[1] != undefined) {
                this.max = val[1]
            } else {
                this.max = ''
            }
        },
    },
    // computed: {
    //     myMin() {
    //         let val = this.value
    //         if (val && val[0] != undefined) {
    //             this.min = val[0]
    //         } else {
    //             this.min = ''
    //         }
    //         return ''
    //     },
    //     myMax() {
    //         let val = this.value
    //         if (val && val[1] != undefined) {
    //             this.max = val[1]
    //         } else {
    //             this.max = ''
    //         }
    //         return ''
    //     },
    // },
    methods: {
        onInputMin() {
            if (this.min !== undefined) {
                this.min = this.min.replace(/[^0-9.]/g, '')
            }
            let min = this.min
            let max = this.max
            this.$emit('input', [min, max])
        },
        onInputMax() {
            if (this.max !== undefined) {
                this.max = this.max.replace(/[^0-9.]/g, '')
            }
            let min = this.min
            let max = this.max
            this.$emit('input', [min, max])
        },
        onInputEvent() {
            let min = this.min
            let max = this.max
            this.$emit('input', [min, max])
        },
    },
}
</script>
