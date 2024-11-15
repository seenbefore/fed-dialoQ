<template>
    <van-field :rows="rows" :maxlength="maxlength" :show-word-limit="showWordLimit" autosize :type="type" class="my-input" :value="myValue" v-bind="$attrs" @input="input">
        <slot slot="label" name="label"></slot>
        <slot slot="left-icon" name="left-icon"></slot>
        <slot slot="right-icon" name="right-icon"></slot>
        <slot slot="button" name="button"></slot>
        <slot slot="extra" name="extra "></slot>
    </van-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    name: 'MyInput',
    components: {},
})
export default class MyInput extends Vue {
    /**当前输入的值 */
    @Prop({ type: [Number, String], default: '' })
    value!: string | number
    /**默认行高 */
    @Prop({ type: [Number, String], default: 1 })
    rows?: string | number
    /**输入字数限制 */
    @Prop({ type: [Number, String], default: 5000 })
    maxlength?: string | number
    /**显示字数限制 */
    @Prop({ type: Boolean, default: false })
    showWordLimit?: boolean

    get myValue() {
        return this.value
    }
    get type() {
        return this.$attrs.type || 'input'
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
