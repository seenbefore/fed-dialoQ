<template>
    <div class="sg-data-form-field ">
        <slot name="prependSlot"></slot>
        <el-input :value="currentValue" :clearable="clearable" @input="onInputEvent" v-bind="$attrs" autocomplete="off" v-on="listeners">
            <slot slot="suffix" name="suffix">
                <ex-slot :row="{}" :render="inputSuffixSlotRender" v-if="inputSuffixSlotRender"></ex-slot>
            </slot>
            <slot slot="prefix" name="prefix">
                <ex-slot :row="{}" :render="inputPrefixSlotRender" v-if="inputPrefixSlotRender"></ex-slot>
            </slot>
            <slot slot="prepend" name="prepend">
                <ex-slot :row="{}" :render="inputPrependSlotRender" v-if="inputPrependSlotRender"></ex-slot>
            </slot>
            <slot slot="append" name="append">
                <ex-slot :row="{}" :render="inputAppendSlotRender" v-if="inputAppendSlotRender"></ex-slot>
            </slot>
        </el-input>
        <slot name="appendSlot"></slot>
        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseInput',

    props: {
        inputSuffixSlotRender: {
            type: [Function, String],
            default: null,
        },
        inputPrefixSlotRender: {
            type: [Function, String],
            default: null,
        },
        inputPrependSlotRender: {
            type: [Function, String],
            default: null,
        },
        inputAppendSlotRender: {
            type: [Function, String],
            default: null,
        },
        value: {
            type: [String, Number],
            default: '',
        },
        // 当前组件slot插槽类型prefix、suffix、prepend、append
        slotType: {
            type: String,
            default() {
                return ''
            },
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        inputSlots: {
            type: Array,
            default() {
                return []
            },
        },
    },
    mixins: [formMixins],
    data() {
        return {
            slots: [
                {
                    name: 'prefix',
                },
                {
                    name: 'suffix',
                },
            ],
            currentValue: this.value,
        }
    },
    methods: {},
}
</script>
