<template>
    <van-field class="my-checkbox" :value="isGroup ? JSON.stringify(myValueCheckeds) : Number(myValue)" v-bind="$attrs" readonly @click="choose">
        <template v-slot:input>
            <van-checkbox v-model="myValue" shape="square" :disabled="disabled" ref="checkbox" v-if="!isGroup" />
            <van-checkbox-group class="more-box" v-model="myValueCheckeds" direction="horizontal" :disabled="disabled" v-else>
                <van-checkbox shape="square" v-for="item in options" :key="item.value" :name="item.value" :disabled="item.disabled">{{ item.label }}</van-checkbox>
            </van-checkbox-group>
        </template>
        <slot slot="label" name="label"></slot>
        <slot slot="left-icon" name="left-icon"></slot>
        <slot slot="right-icon" name="right-icon"></slot>
        <slot slot="button" name="button"></slot>
        <slot slot="extra" name="extra "></slot>
    </van-field>
</template>

<script lang="ts">
import { UseGenerate } from '@/entry/h5/components/global/app-form/hooks/useGenerate'
import { Checkbox } from 'vant'
import { Component, Prop, Watch } from 'vue-property-decorator'

export interface OptionItem {
    label: string
    value: number | string
    [props: string]: any
}

@Component({
    name: 'MyCheckbox',
    components: {},
})
export default class MyCheckbox extends UseGenerate {
    /**当前输入的值 */
    @Prop({ default: false })
    value!: any
    /**是否为复选框组 */
    @Prop({ type: Boolean, default: false })
    isGroup?: boolean
    /**禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean
    /**选项数据 */
    @Prop({
        type: [Array, Promise, Function],
        default: () => [],
    })
    options?: OptionItem[] | Promise<OptionItem[]> | Function

    public $refs!: {
        checkbox: Checkbox
    }
    public myValue = false
    public myValueCheckeds: any[] = []

    @Watch('value', { immediate: true })
    watchValue(newV: any) {
        if (this.isGroup) {
            this.myValueCheckeds = typeof newV === 'object' ? newV : []
            this.$emit('input', this.myValueCheckeds)
        } else {
            this.myValue = Boolean(newV)
            this.$emit('input', this.myValue)
        }
    }

    choose() {
        if (this.disabled) return
        if (this.isGroup) {
            setTimeout(() => {
                this.$emit('change', { value: this.myValueCheckeds })
                this.$emit('input', this.myValueCheckeds)
            }, 0)
        } else {
            this.myValue = !this.myValue
            this.$emit('change', { value: this.myValue })
            this.$emit('input', this.myValue)
        }
    }
}
</script>
<style lang="less" scoped>
.my-checkbox {
    justify-content: space-between;
    cursor: pointer;
    /deep/.van-field__label {
        flex: 1;
    }
    /deep/.van-field__value {
        flex: none;
    }
    /deep/.van-checkbox__icon {
        height: 20px;
        font-size: 18px;
        .van-icon {
            width: 18px;
            height: 18px;
        }
    }
    .more-box /deep/.van-checkbox--horizontal {
        margin-right: 0;
        margin-left: 12px;
    }
}
</style>
