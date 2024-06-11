<template>
    <div class="sg-data-form-field sg-flex sg-timerange">
        <el-time-select
            style="width: 150px"
            v-model="startTime"
            v-bind="$attrs"
            :clearable="clearable"
            :placeholder="startPlaceholder"
            :format="format"
            :value-format="valueFormat"
            :picker-options="getPickerOptions('startTime')"
            @input="onChange"
        ></el-time-select>
        <span class="sg-range__gap" v-html="gap"></span>
        <el-time-select
            style="width: 150px"
            v-model="endTime"
            v-bind="$attrs"
            :clearable="clearable"
            :placeholder="endPlaceholder"
            :format="format"
            :value-format="valueFormat"
            :picker-options="getPickerOptions('endTime')"
            @input="onChange"
        ></el-time-select>
        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseTimeRange',
    props: {
        gap: {
            type: String,
            default: '~',
        },
        startPlaceholder: {
            type: [String],
            default: '开始时间',
        },
        endPlaceholder: {
            type: [String],
            default: '结束时间',
        },
        value: {
            type: [String, Number, Array, Date],
            default: '',
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        // yyyy-MM-dd HH:mm:ss
        format: {
            type: String,
            default: 'yyyy-MM-dd HH:mm',
        },
        valueFormat: {
            type: String,
            default: 'yyyy-MM-dd HH:mm',
        },
        pickerOptions: {
            type: Object,
            default: () => ({}),
        },
    },
    mixins: [formMixins],
    data() {
        return {
            startTime: '',
            endTime: '',
            currentValue: this.value,
        }
    },
    watch: {
        value: {
            handler(val) {
                if (val && val[0] != undefined) {
                    this.startTime = val[0]
                } else {
                    this.startTime = ''
                }
                if (val && val[1] != undefined) {
                    this.endTime = val[1]
                } else {
                    this.endTime = ''
                }
            },
            immediate: true,
        },
    },
    methods: {
        onChange(val) {
            let startTime = this.startTime || ''
            let endTime = this.endTime || ''
            if (startTime && endTime) {
                let startTimeValue = new Date(startTime).valueOf()
                let endTimeValue = new Date(endTime).valueOf()
                if (startTimeValue > endTimeValue) {
                    if (startTime === val) {
                        startTime = ''
                        this.$message.warning('开始日期不得大于结束日期')
                    } else {
                        endTime = ''
                        this.$message.warning('结束日期不得小于开始日期')
                    }
                }
            }
            this.$emit('input', [startTime, endTime])
        },
        getPickerOptions(type) {
            const pickerOptions = {}
            if (type === 'startTime') {
                pickerOptions.maxTime = this.endTime ?? ''
            } else {
                pickerOptions.minTime = this.startTime ?? ''
            }
            const _pickerOptions = { ...pickerOptions, ...this.pickerOptions(type) }
            console.log('_pickerOptions: ' + type, _pickerOptions)
            return _pickerOptions
        },
    },
}
</script>
