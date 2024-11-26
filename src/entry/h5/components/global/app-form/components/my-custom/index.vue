<template>
    <van-field class="my-custom" :value="myValue" v-bind="$attrs" @input="input">
        <slot slot="label" name="label"></slot>
        <slot slot="left-icon" name="left-icon"></slot>
        <slot slot="right-icon" name="right-icon"></slot>
        <slot slot="button" name="button"></slot>
        <slot slot="extra" name="extra "></slot>
        <slot slot="input" name="input"></slot>
    </van-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    name: 'MyCustom',
    components: {},
})
export default class MyCustom extends Vue {
    /**当前输入的值 */
    @Prop({ type: [Number, String], default: '' })
    value!: string | number

    @Prop({ type: String, default: '' })
    tag?: string

    get myValue() {
        console.log(this.value, 'value')
        return this.value
    }
    get type() {
        return this.tag || this.$attrs.type || 'input'
    }

    input(value: string | number) {
        this.$emit('input', value)
    }
}
</script>

<style lang="less" scoped>
.select-picker {
    cursor: pointer;
    /deep/.van-field__value {
        .van-field__body {
            .van-field__control {
                cursor: pointer;
            }
        }
    }
}
</style>
