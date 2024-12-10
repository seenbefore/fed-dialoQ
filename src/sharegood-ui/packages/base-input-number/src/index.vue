<template>
    <div class="sg-data-form-field">
        <slot name="prependSlot"></slot>
        <el-input-number
            v-model="currentValue"
            :min="min"
            :max="max"
            :step="step"
            :precision="precision"
            :controls="controls"
            :controls-position="controlsPosition"
            :placeholder="placeholder"
            v-bind="$attrs"
            @change="handleChange"
            v-on="listeners"
        ></el-input-number>
        <slot name="appendSlot"></slot>
        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseInputNumber',

    mixins: [formMixins],

    props: {
        value: {
            type: [Number, String],
            default: null,
        },
        // 最小值
        min: {
            type: Number,
            default: -Infinity,
        },
        // 最大值
        max: {
            type: Number,
            default: Infinity,
        },
        // 步长
        step: {
            type: Number,
            default: 1,
        },
        // 精度，小数点位数
        precision: {
            type: Number,
            default: 0,
        },
        // 是否显示控制按钮
        controls: {
            type: Boolean,
            default: true,
        },
        // 控制按钮位置，可选值为 right
        controlsPosition: {
            type: String,
            default: '',
        },
        // placeholder
        placeholder: {
            type: String,
            default: '请输入',
        },
    },

    data() {
        return {
            currentValue: this.value,
        }
    },

    methods: {
        handleChange(value) {
            this.$emit('input', value)
            this.$emit('change', value)
        },
    },

    watch: {
        value: {
            handler(val) {
                this.currentValue = val
            },
            immediate: true,
        },
    },
}
</script>

<style lang="less" scoped>
.sg-data-form-field {
    display: inline-flex;
    align-items: center;
    width: 100%;
}
</style>
