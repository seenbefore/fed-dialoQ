<template>
    <div class="sg-input">
        <el-input v-model="currentValue" :clearable="clearable" v-bind="$attrs" autocomplete="off">
            <slot :slot="slotType" name="inputSlot"></slot>
        </el-input>
        <slot name="appendSlot"></slot>
    </div>
</template>

<script>
export default {
    name: 'SgInput',
    props: {
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
    },
    watch: {
        currentValue(val) {
            this.$emit('input', val)
        },
    },
    data() {
        return {
            currentValue: this.value,
        }
    },
}
</script>
