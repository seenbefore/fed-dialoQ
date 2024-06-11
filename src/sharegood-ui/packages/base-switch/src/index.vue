<template>
    <div class="sg-data-form-field sg-switch">
        <el-switch v-model="currentValue" v-bind="$attrs"></el-switch>
        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'
export default {
    name: 'SgBaseSwitch',
    mixins: [formMixins],
    props: {
        value: {
            type: [String, Number, Boolean],
            default: false,
        },
    },
    data() {
        return {
            currentValue: this.value,
        }
    },

    methods: {},
    watch: {
        currentValue(value) {
            this.$emit('input', value)
        },
        value(val) {
            this.currentValue = val
        },
    },
    created() {},
}
</script>
