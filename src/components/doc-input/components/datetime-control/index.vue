<template>
    <span class="datetime-control" :class="[readonly ? 'readonly' : '', myType]">
        <span class="date-value">
            {{ myValue }}
            <i class="close el-icon-error" v-show="myValue && !readonly" @click="clearVal"></i>
        </span>
        <span class="icon" @click="openDatePicker"></span>
        <template v-if="!readonly">
            <el-time-picker
                v-if="myType === 'time'"
                ref="datePicker"
                v-model="myValue"
                :popper-class="`datetime-control-popper ${type}`"
                arrow-control
                :picker-options="{
                    selectableRange: '00:00:00 - 23:59:59',
                }"
                :value-format="valueFormat"
                :format="myFormat"
                :editable="false"
                :clearable="false"
                @change="onchange"
            ></el-time-picker>
            <el-date-picker
                v-else
                ref="datePicker"
                v-model="myValue"
                :type="myType"
                :value-format="valueFormat"
                :format="myFormat"
                :editable="false"
                :clearable="false"
                :popper-class="`datetime-control-popper ${type}`"
                @change="onchange"
                :picker-options="pickerOptions"
            ></el-date-picker>
        </template>
    </span>
</template>
<script>
import { formatDate } from 'icinfo-util'
import { disabledDateByLimitRange } from '../../valid'

export default {
    name: 'DatetimeControl',
    props: {
        /**当前输入的值 */
        value: {
            type: [Date, String, Number],
            default: '',
        },
        /**日期值格式 */
        valueFormat: {
            type: String,
            default: 'yyyy-M-d HH:mm:ss',
        },
        /**控件类型: datetime: 日期时间; date: 日期; time: 时间 */
        type: {
            type: String,
            default: 'datetime',
        },
        /**只读 */
        readonly: {
            type: Boolean,
            default: false,
        },
        /**日期限制 */
        dateLimitRange: {
            type: Array,
            default: () => [],
        },
        /**日期限制类型 */
        dateLimitRangeType: {
            type: String,
            default: '3',
        },
    },
    data() {
        return {
            opened: false,
            myValue: '',
        }
    },
    computed: {
        myValue_() {
            let value = this.value
            if (typeof value === 'string') {
                value = value
                    .replace(/[年月]/g, '-')
                    .replace(/[时分]/g, ':')
                    .replace(/[日秒]/g, '')
            }
            return value
        },
        myFormat({ type }) {
            const typeMap = {
                date: 'yyyy-M-dd',
                time: 'HH:mm:ss',
                datetime: 'yyyy-M-d HH:mm:ss',
                datehourminute: 'yyyy-M-d HH:mm',
                datehour: 'yyyy-M-d HH',
                month: 'yyyy-MM',
            }
            return typeMap[type]
        },
        myType({ type }) {
            const typeMap = {
                date: 'date',
                time: 'time',
                datetime: 'datetime',
                datehourminute: 'datetime',
                datehour: 'datetime',
                month: 'month',
            }
            return typeMap[type]
        },
        pickerOptions() {
            const obj = { disabledDate: time => false }
            if (this.dateLimitRange.length) {
                const { dateLimitRange, dateLimitRangeType } = this
                obj.disabledDate = time => disabledDateByLimitRange(time, { dateLimitRange, dateLimitRangeType })
            }
            return obj
        },
    },
    watch: {
        value: {
            handler(newV) {
                if (typeof newV === 'string') {
                    newV = newV
                        .replace(/[年月]/g, '-')
                        .replace(/[时分]/g, ':')
                        .replace(/[日]/g, ' ')
                        .replace(/[秒]/g, '')
                }
                this.myValue = newV ? formatDate(newV, this.valueFormat) : ''
            },
            immediate: true,
        },
    },
    methods: {
        openDatePicker() {
            this.$refs.datePicker.focus()
        },
        onchange(value) {
            this.$emit('input', value)
            this.$emit('change', value)
        },
        clearVal() {
            this.onchange('')
        },
    },
}
</script>
<style lang="less">
.datetime-control-popper {
    transform: translateX(-30px);
    &.datehour {
        .el-time-spinner {
            text-align: center;
            .el-time-spinner__wrapper:nth-child(2) {
                display: none;
            }
        }
    }
}
</style>
<style lang="less" scoped>
.datetime-control {
    position: relative;
    &.readonly {
        .icon {
            display: none;
        }
    }
    .date-value {
        position: relative;
        .close {
            position: absolute;
            top: -8px;
            right: -1px;
            color: #8f8f8f;
            font-size: 15px;
            cursor: pointer;
        }
    }
    .icon {
        padding: 5px 12px;
        background-position: center;
        background-size: 25px;
        background-repeat: no-repeat;
        cursor: pointer;
    }
    &.datetime .icon {
        background-image: url('../../images/datetime_icon.svg');
    }
    &.date .icon,
    &.month .icon {
        background-image: url('../../images/date_icon.svg');
    }
    &.time .icon {
        background-image: url('../../images/time_icon.svg');
    }
    /deep/.el-date-editor {
        position: absolute;
        top: 0;
        right: 0;
        overflow: hidden;
        width: 24px;
        height: 29px;
        opacity: 0;
        cursor: pointer;
        pointer-events: none;
        .el-input__inner {
            padding: 0;
            width: 0;
            height: 29px;
        }
    }
}
</style>
