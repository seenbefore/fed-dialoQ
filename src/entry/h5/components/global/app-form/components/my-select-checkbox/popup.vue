<template>
    <div class="my-select-checkbox">
        <!-- 弹出层 -->
        <van-popup v-model="show" position="bottom" round>
            <div class="popup-content">
                <!-- 标题栏 -->
                <div class="popup-header">
                    <span class="cancel" @click="onCancel">取消</span>
                    <span class="title">{{ title }}</span>
                    <span class="confirm" @click="onConfirm">确定</span>
                </div>
                <!-- 选项列表 -->
                <div class="options-container">
                    <van-checkbox-group v-model="selectedValues" direction="vertical">
                        <van-checkbox v-for="item in options" :key="item.value" :name="item.value" shape="square" :disabled="item.disabled">
                            {{ item.label }}
                        </van-checkbox>
                    </van-checkbox-group>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

export interface OptionItem {
    label: string
    value: number | string
    disabled?: boolean
    [props: string]: any
}

@Component({
    name: 'MySelectCheckbox',
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

    private show = true
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

    showPopup() {
        if (this.disabled) return
        this.show = true
        // 备份当前选中值
        this.tempValues = [...this.selectedValues]
    }

    onCancel() {
        this.show = false
        // 恢复之前的选择
        this.selectedValues = [...this.tempValues]
    }

    onConfirm() {
        this.show = false
        this.tempValues = [...this.selectedValues]
        this.$emit('input', this.selectedValues)
        this.$emit('change', {
            value: this.selectedValues,
            options: this.options.filter(item => this.selectedValues.includes(item.value)),
        })
    }
}
</script>

<style lang="less" scoped>
.my-select-checkbox {
    .popup-content {
        .popup-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            border-bottom: 1px solid #eee;

            .title {
                font-size: 16px;
                font-weight: 500;
            }

            .cancel,
            .confirm {
                font-size: 14px;
                color: #666;
                padding: 4px 8px;
            }

            .confirm {
                color: #1989fa;
            }
        }

        .options-container {
            padding: 16px;
            max-height: 60vh;
            overflow-y: auto;

            /deep/ .van-checkbox {
                margin-bottom: 12px;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>
