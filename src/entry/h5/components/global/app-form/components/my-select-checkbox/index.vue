<template>
    <!-- 触发区域 -->
    <van-field readonly clickable :placeholder="placeholder" @click="showPopup" v-bind="$attrs" v-model="value">
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

    @Prop({
        type: Array,
        default: () => [],
    })
    options!: OptionItem[] | Promise<OptionItem[]> | Function

    private selectedValues: any[] = []

    @Watch('value', { immediate: true })
    onValueChange(newValue: any[]) {
        this.selectedValues = [...(newValue || [])]
    }

    async showPopup() {
        if (typeof this.options === 'function') {
            this.options = await this.options()
        }

        const { value, options } = await this.$modalDialog(() => import('./popup.vue'), {
            options: this.options,
            value: this.value,
        })

        if (Array.isArray(value)) {
            this.$emit('input', value)
            this.$emit('change', {
                value,
                options,
            })
        }
    }
}
</script>

<style lang="less" scoped></style>
