<template>
    <div class="sg-data-form-field sg-flex sg-daterange">
        <el-date-picker
            v-model="startDate"
            v-bind="$attrs"
            :clearable="clearable"
            :placeholder="startPlaceholder"
            :format="format"
            :value-format="valueFormat"
            @input="onChange"
            :default-time="startDefaultTime"
        ></el-date-picker>
        <span class="sg-range__gap" v-html="gap"></span>
        <el-date-picker
            v-model="endDate"
            v-bind="$attrs"
            :clearable="clearable"
            :placeholder="endPlaceholder"
            :format="format"
            :value-format="valueFormat"
            @input="onChange"
            :default-time="endDefaultTime"
        ></el-date-picker>
        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseDateRange',
    props: {
        gap: {
            type: String,
            default: '-',
        },
        startPlaceholder: {
            type: [String],
            default: '开始日期',
        },
        endPlaceholder: {
            type: [String],
            default: '结束日期',
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
            default: 'yyyy-MM-dd',
        },
        valueFormat: {
            type: String,
            default: 'yyyy-MM-dd',
        },
        defaultTime: {
            type: Array,
            default: () => {
                return []
            },
        },
        /**
         * 不校验时间范围
         */
        disableValidateRange: {
            type: Boolean,
            default: false,
        },
    },
    mixins: [formMixins],
    data() {
        return {
            startDate: '',
            endDate: '',
            currentValue: this.value,
        }
    },
    computed: {
        startDefaultTime() {
            const [result] = this.defaultTime
            return result
        },
        endDefaultTime() {
            const [, result] = this.defaultTime
            return result
        },
    },
    watch: {
        value: {
            handler(val) {
                if (val && val[0] != undefined) {
                    this.startDate = val[0]
                } else {
                    this.startDate = ''
                }
                if (val && val[1] != undefined) {
                    this.endDate = val[1]
                } else {
                    this.endDate = ''
                }
            },
            immediate: true,
        },
    },
    methods: {
        onChange(val) {
            let startDate = this.startDate || ''
            let endDate = this.endDate || ''
            if (!this.disableValidateRange) {
                if (startDate && endDate) {
                    let startDateValue = new Date(startDate).valueOf()
                    let endDateValue = new Date(endDate).valueOf()
                    if (startDateValue > endDateValue) {
                        if (startDate === val) {
                            startDate = ''
                            this.$message.warning('开始日期不得大于结束日期')
                        } else {
                            endDate = ''
                            this.$message.warning('结束日期不得小于开始日期')
                        }
                    }
                }
            }

            this.$emit('input', [startDate, endDate])
        },
    },
}
</script>
