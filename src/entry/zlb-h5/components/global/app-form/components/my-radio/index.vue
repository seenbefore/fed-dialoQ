<template>
    <van-field class="my-radio" v-bind="$attrs" readonly @click="choose">
        <template v-slot:input>
            <van-radio-group v-model="myValue" :direction="direction" :disabled="disabled">
                <van-radio v-for="item in options" :key="item.value" :name="item.value" :disabled="item.disabled">{{ item.label }}</van-radio>
            </van-radio-group>
        </template>
        <slot slot="label" name="label"></slot>
        <slot slot="left-icon" name="left-icon"></slot>
        <slot slot="right-icon" name="right-icon"></slot>
        <slot slot="button" name="button"></slot>
        <slot slot="extra" name="extra "></slot>
    </van-field>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
export interface OptionItem {
    label: string
    value: number | string
    [props: string]: any
}

@Component({
    name: 'MyRadio',
    components: {},
})
export default class MyRadio extends Vue {
    /**当前输入的值 */
    @Prop({ type: [Number, String, Boolean], default: false })
    value!: number | string | boolean
    /**禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean
    /**排列方向 */
    @Prop({ type: String, default: 'horizontal' })
    direction?: string
    /**选项数据 */
    @Prop({
        type: [Array, Promise, Function],
        default: () => [],
    })
    options!: OptionItem[] | Promise<OptionItem[]> | ((...args: any) => any)

    public myValue: string | number = ''

    @Watch('value', { immediate: true })
    watchValue(newV: any) {
        this.myValue = newV || this.value
        this.$emit('input', this.myValue)
    }

    choose() {
        if (this.disabled) return
        this.$emit('change', { value: this.myValue })
        this.$emit('input', this.myValue)
    }
}
</script>

<style lang="less" scoped>
.my-radio {
    cursor: pointer;
    /deep/ .van-radio--horizontal {
        margin-right: 0;
        margin-left: 20px;
    }
    /deep/ .van-radio__icon {
        height: 20px;
        font-size: 18px;
        .van-icon {
            width: 18px;
            height: 18px;
        }
    }
    /deep/ .van-radio-group--vertical .van-radio {
        margin-bottom: 10px;
    }
}
</style>
