<template>
    <van-field class="date-picker" :value="myValue" :disabled="disabled" :right-icon="disabled ? '' : 'arrow'" readonly v-bind="$attrs" @click="openDatePicker">
        <slot slot="label" name="label"></slot>
        <slot slot="left-icon" name="left-icon"></slot>
        <slot slot="right-icon" name="right-icon"></slot>
        <slot slot="button" name="button"></slot>
        <slot slot="extra" name="extra "></slot>
    </van-field>
</template>

<script lang="ts">
import { formatDate } from 'icinfo-util'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({
    name: 'DatePicker',
    components: {},
})
export default class DatePicker extends Vue {
    /**当前输入的值 */
    @Prop({ type: [Date, String], default: '' })
    value!: string | Date
    /**最小选择日期 */
    @Prop({ type: [Date, String] })
    minDate!: string | Date
    /**最大选择日期 */
    @Prop({ type: [Date, String] })
    maxDate!: string | Date
    /**日期值格式 */
    @Prop({ type: String, default: 'yyyy-MM-dd HH:mm:ss' })
    valueFormat!: string
    /**时间类型 */
    @Prop({ type: String, default: 'datetime' })
    type!: 'date' | 'time' | 'year-month' | 'month-day' | 'datehour'
    /**中文日期格式是否保持空格 */
    @Prop({ type: Boolean, default: false })
    keepSpace?: boolean
    /**禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean
    /**日期选择器支持自定义配置 */
    @Prop({ type: Array, default: () => [] })
    timeSelectList!: Record<string, string>[]

    get myValue_() {
        let value = this.value
        if (typeof value === 'string') {
            value = value
                .replace(/[年月]$/g, '')
                .replace(/[时分]$/g, '')
                .replace(/[年月]/g, '-')
                .replace(/[时分]/g, ':')
                .replace(/[秒]/g, '')
            if (this.keepSpace) {
                value = value.replace(/[日]/g, '')
            } else {
                value = value.replace(/[日]/g, ' ')
            }
            const [, time = ''] = value.split(' ')
            // 手动加上分钟，解决处理yyyy-MM-dd HH 格式时，解析出错问题。
            if (time && time.length <= 2) {
                value += ':00'
            }
        }
        return value
    }
    get myValue() {
        const myValue = this.myValue_ ? formatDate(this.myValue_, this.valueFormat) : ''
        return myValue
    }
    @Watch('myValue', { immediate: true })
    watchMyValue(newV: string | Date) {
        this.$emit('input', newV)
    }

    /**
     * 打开日期选择器
     */
    async openDatePicker() {
        if (this.disabled) return
        const { minDate, maxDate, valueFormat, type, timeSelectList, myValue_: defaultDate } = this
        const props = {
            minDate,
            maxDate,
            valueFormat,
            type,
            defaultDate,
            timeSelectList,
        }
        const date = await this.$modalDialog(
            // () => import(`${this.datePicker}`),
            () => import('./datetime-picker-popup.vue'),
            props,
        )
        this.$emit('change', { value: date })
        this.$emit('input', date)
    }
}
</script>

<style lang="less" scoped>
.date-picker {
    cursor: pointer;
    /deep/.van-field__value {
        .van-field__body {
            .van-field__control {
                cursor: pointer;
            }
            .van-field__right-icon {
                padding-left: 0;
            }
        }
    }
}
</style>
