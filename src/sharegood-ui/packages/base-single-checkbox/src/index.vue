<template>
    <div class="sg-data-form-field">
        <slot name="prependSlot"></slot>
        <el-checkbox v-model="currentValue" v-bind="$attrs">{{ text }}</el-checkbox>
        <slot name="appendSlot"></slot>
        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseSingleCheckbox',
    props: {
        value: {
            type: [String, Boolean],
            default: '',
        },
        text: {
            type: String,
            default: '',
        },
    },
    mixins: [formMixins],
    watch: {
        currentValue(value) {
            this.$emit('input', value)
            this.onChange &&
                this.onChange(
                    {
                        name: this.name,
                        value: value,
                    },
                    {
                        schema: this.schema,
                        formActionType: this.formActionType,
                        formModel: this.formModel,
                    },
                )
        },
    },
    mounted() {},
    data() {
        return {
            currentValue: this.value,
        }
    },
    methods: {},
}
</script>
