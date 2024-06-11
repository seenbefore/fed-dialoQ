<template>
    <van-field v-loading="loading" class="my-cascader" :value="myValue" :disabled="disabled" :right-icon="disabled ? '' : 'arrow'" v-bind="$attrs" readonly @click="openCascader">
        <slot slot="label" name="label"></slot>
        <slot slot="left-icon" name="left-icon"></slot>
        <slot slot="right-icon" name="right-icon"></slot>
        <slot slot="button" name="button"></slot>
        <slot slot="extra" name="extra "></slot>
    </van-field>
</template>

<script lang="ts">
import { UseGenerate } from '@/entry/h5/components/global/app-form/hooks/useGenerate'
import { Component, Prop, Watch } from 'vue-property-decorator'
import loading from '../../directives/v-loading'
import { dfsTreeSomeFirst } from '../../service'

export interface OptionItem {
    label: string
    value: number | string
    children?: OptionItem[]
    [props: string]: any
}
@Component({
    name: 'SelectPicker',
    components: {},
    directives: { loading },
})
export default class SelectPicker extends UseGenerate {
    /**当前输入的值 */
    @Prop({ type: [Number, String], default: '' })
    value!: string | number
    /**禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean
    /**输入框中是否显示选中值的完整路径 */
    @Prop({ type: Boolean, default: false })
    showAllLevels!: boolean
    /**选项数据 */
    @Prop({
        type: [Array, Promise, Function],
        default: () => [
            // {
            //     label: '浙江省',
            //     value: '330000',
            //     children: [
            //         {
            //             label: '杭州市',
            //             value: '330100',
            //             children: [
            //                 {
            //                     label: '萧山区',
            //                     value: '330109',
            //                     children: [
            //                         {
            //                             label: '北干街道',
            //                             value: '330109002000',
            //                         },
            //                     ],
            //                 },
            //             ],
            //         },
            //     ],
            // },
            // {
            //     label: '江苏省',
            //     value: '320000',
            //     children: [{ label: '南京市', value: '320100' }],
            // },
        ],
    })
    options!: OptionItem[] | Promise<OptionItem[]> | Function

    loading = false
    selectedOptions: any = {}

    myOptions: OptionItem[] = []
    @Watch('options', { immediate: true })
    async watchOptions(newV: OptionItem[] | Promise<OptionItem[]>) {
        const defaultOptions: OptionItem[] = [] //[{ label: '请选择', value: '' }]
        if (Array.isArray(this.options)) {
            this.myOptions = [...defaultOptions, ...this.options]
        } else if (typeof this.options === 'function') {
            const result = this.options()
            if (result.then) {
                this.loading = true
                result
                    .then((options: OptionItem[]) => {
                        this.myOptions = [...defaultOptions, ...(options || [])]
                    })
                    .finally(() => (this.loading = false))
            } else if (Array.isArray(result)) {
                this.myOptions = [...defaultOptions, ...result]
            }
        }
    }

    get myValue() {
        const values = typeof this.value === 'string' ? (this.value ? this.value.split(',') : ['']) : [this.value]
        const lastValue = values[values.length - 1]
        let selected: string[] = []
        dfsTreeSomeFirst(this.myOptions, (node: OptionItem, flag: boolean) => {
            if (node.value === lastValue || flag) {
                selected.unshift(node.label)
                return true
            }
        })
        const showText = this.showAllLevels ? selected.join('/') : selected[selected.length - 1]
        return showText || this.value
    }

    /**
     * 打开选择器
     */
    async openCascader() {
        if (this.disabled || this.loading) return
        const props = {
            value: this.value,
            options: this.myOptions,
        }
        const { value, selectedOptions, tabIndex } = await this.$modalDialog(() => import('./cascader-popup.vue'), props)
        this.selectedOptions = selectedOptions
        // this.$emit('input', { value, selectedOptions, tabIndex })
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
