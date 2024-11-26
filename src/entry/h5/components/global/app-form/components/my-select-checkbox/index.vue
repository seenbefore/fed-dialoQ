<template>
    <!-- 触发区域 -->
    <van-field readonly clickable :value="displayValue" :placeholder="placeholder" :disabled="disabled" @click="showPopup" v-bind="$attrs">
        <template #right-icon>
            <van-icon :name="'arrow'" />
        </template>
        <slot slot="label" name="label"></slot>
        <slot slot="left-icon" name="left-icon"></slot>
        <slot slot="button" name="button"></slot>
        <slot slot="extra" name="extra"></slot>
        <slot slot="input" name="input"></slot>
    </van-field>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { ExSlot } from '../../utils/ExSlot'

export interface OptionItem {
    label: string
    value: number | string
    disabled?: boolean
    [props: string]: any
}

@Component({
    name: 'MySelectCheckbox',
    components: {
        ExSlot,
    },
})
export default class MySelectCheckbox extends Vue {
    @Prop({ default: () => [] })
    value!: any[]

    @Prop({ type: String, default: '请选择' })
    placeholder!: string

    @Prop({ type: String, default: '请选择' })
    title!: string

    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    @Prop({
        type: Array,
        default: () => [],
    })
    options!: OptionItem[]

    private selectedValues: any[] = []
    private tempValues: any[] = []

    get displayValue() {
        return this.selectedValues
            .map(value => this.options.find(option => option.value === value)?.label)
            .filter(Boolean)
            .join('、')
    }

    @Watch('value', { immediate: true })
    onValueChange(newValue: any[]) {
        this.selectedValues = [...(newValue || [])]
        this.tempValues = [...(newValue || [])]
    }

    async showPopup() {
        const val = await this.$modalDialog(() => import('./popup.vue'), {
            options: this.options,
        })
        if (val) {
            this.tempValues = [...this.selectedValues]
            this.$emit('input', this.selectedValues)
            this.$emit('change', {
                value: this.selectedValues,
                options: this.options.filter(item => this.selectedValues.includes(item.value)),
            })
        }
        // 备份当前选中值
        // this.tempValues = [...this.selectedValues]
    }
}
</script>

<style lang="less" scoped></style>
