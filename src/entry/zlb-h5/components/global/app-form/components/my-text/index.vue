<template>
    <van-field class="my-text" readonly :value="myValue" v-bind="$attrs" type="textarea" ref="textarea" :rows="rows" :rules="[]" @input="input">
        <slot slot="label" name="label"></slot>
        <slot slot="left-icon" name="left-icon"></slot>
        <slot slot="right-icon" name="right-icon"></slot>
        <slot slot="button" name="button"></slot>
        <slot slot="extra" name="extra "></slot>
    </van-field>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    name: 'MyText',
    components: {},
})
export default class MyText extends Vue {
    /**当前输入的值 */
    @Prop({ type: [Number, String], default: '' })
    text!: string | number

    get myValue() {
        return this.text
    }

    rows = 1

    input(value: string | number) {
        this.$emit('input', value)
    }

    mounted() {
        this.getRows()
    }

    /**计算当前textarea rows应显示行数 */
    getRows() {
        const { clientHeight = 1, scrollHeight = 1 } = (this.$refs?.textarea as Vue)?.$el?.children[0]?.children[0]?.children[0] || {}
        this.rows = Math.ceil(scrollHeight / clientHeight)
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
.my-text {
    /deep/.van-field__control {
        min-height: auto;
    }
}
</style>
