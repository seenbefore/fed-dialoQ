<template>
    <van-field v-loading="loading" class="select-picker" :value="myValue" :disabled="disabled" :right-icon="disabled ? '' : 'arrow'" v-bind="$attrs" readonly @click="openSelectPicker">
        <slot slot="label" name="label"></slot>
        <slot slot="left-icon" name="left-icon"></slot>
        <slot slot="right-icon" name="right-icon"></slot>
        <slot slot="button" name="button" v-if="isOnlySelecter">
            <span>{{ onlyText }}</span>
        </slot>
        <slot slot="extra" name="extra "></slot>
    </van-field>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import loading from '../../directives/v-loading'

export interface OptionItem {
    label: string
    value: number | string
    [props: string]: any
}
@Component({
    name: 'SelectPicker',
    components: {},
    directives: { loading },
})
export default class SelectPicker extends Vue {
    /**当前输入的值 */
    @Prop({ type: [Number, String], default: '' })
    value!: string | number
    /**禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean
    /**选项数据 */
    @Prop({
        type: [Array, Promise, Function],
        default: () => [
            // { label: '高德地图', value: 'amap' },
            // { label: '百度地图', value: 'bmap' },
        ],
    })
    options!: OptionItem[] | Promise<OptionItem[]> | Function
    /**是否纯是选择器 */
    @Prop({ type: Boolean, default: false })
    isOnlySelecter?: boolean
    /**右侧文本显示 */
    @Prop({ type: String, default: '添加' })
    onlyText?: string

    loading = false
    selectedOptions: any = {}

    myOptions: OptionItem[] = []
    @Watch('options', { immediate: true, deep: true })
    async watchOptions(newV: OptionItem[] | Promise<OptionItem[]>) {
        const defaultOptions: OptionItem[] = [{ label: '请选择', value: '' }]
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
        if (!this.isOnlySelecter) {
            const selected = this.myOptions.find(({ value }) => value === this.value)
            if (selected && selected.value !== '') return selected.label
            return this.value
        }
        return ''
    }

    /**
     * 打开选择器
     */
    async openSelectPicker() {
        if (this.disabled || this.loading) return
        const props = {
            value: this.value,
            columns: this.myOptions,
        }
        const selectedOptions = await this.$modalDialog(() => import('./select-picke-popup.vue'), props)
        this.selectedOptions = selectedOptions
        this.$emit('change', selectedOptions)
        this.$emit('input', selectedOptions.value)
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
            .van-field__right-icon {
                padding-left: 0;
            }
            .van-field__button {
                position: absolute;
                right: 34px;
                color: #158dff;
            }
        }
    }
}
</style>
