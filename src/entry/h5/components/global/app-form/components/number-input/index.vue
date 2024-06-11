<template>
    <van-field class="number-input" :value="myValue" :disabled="disabled" :type="type" v-bind="$attrs" @input="input">
        <slot slot="label" name="label"></slot>
        <slot slot="left-icon" name="left-icon"></slot>
        <slot slot="right-icon" name="right-icon" v-if="unit">
            <span class="unit" v-text="unit"></span>
        </slot>
        <slot slot="button" name="button"></slot>
        <slot slot="extra" name="extra "></slot>
    </van-field>
</template>

<script lang="ts">
import { UseGenerate } from '@/entry/h5/components/global/app-form/hooks/useGenerate'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'NumberInput',
    components: {},
})
export default class NumberInput extends UseGenerate {
    /**当前输入的值 */
    @Prop({ type: [Number, String], default: '' })
    value!: string | number
    /**数字类型：number-数字; digit-整数 */
    @Prop({ type: [Number, String], default: 'number' })
    type!: 'digit' | 'number'
    /**单位 */
    @Prop({ type: String, default: '' })
    unit!: string
    /**禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    get myValue() {
        return this.value
    }

    input(value: string | number) {
        this.$emit('input', value)
    }
}
</script>

<style lang="less" scoped>
.number-input {
    .unit {
        color: #333;
    }
}
</style>
