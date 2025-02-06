<template>
    <div class="sg-data-form-field sg-select">
        <slot name="prependSlot"></slot>
        <el-select
            v-model="currentValue"
            v-bind="$attrs"
            v-on="listeners"
            :clearable="clearable"
            v-loading="loading"
            :filter-method="filterMethod || filterMethod$"
            :remote-method="remoteMethod$"
            @change="onSelectChange"
            :multiple="multiple"
        >
            <el-option v-for="(item, index) in dataList" :key="index + item[valueKey]" :label="item.label" :value="item[valueKey]">
                <ex-slot :row="item" :render="defaultSlotRender" v-if="defaultSlotRender"></ex-slot>
            </el-option>
        </el-select>
        <slot name="appendSlot"></slot>
        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'
import { ExSlot } from '../../utils/ExSlot'

export default {
    name: 'SgBaseSelect',
    components: {
        ExSlot,
    },
    props: {
        editOption: {
            type: Array,
            default() {
                return [
                    {
                        label: '请选择',
                        value: '',
                    },
                ]
            },
        },
        queryOption: {
            type: Array,
            default() {
                return [
                    {
                        label: '全部',
                        value: '',
                    },
                ]
            },
        },
        // 查询
        isQuery: {
            type: Boolean,
            default: false,
        },
        // 编辑
        isEdit: {
            type: Boolean,
            default: false,
        },

        value: {
            type: [String, Number, Array],
            default: null,
        },
        defaultSlotRender: {
            type: [Function],
            default: null,
        },
        options: {
            type: [Array, Function],
            default() {
                return []
            },
        },
        filterMethod: {
            type: Function,
            default: null,
        },
        remoteMethod: {
            type: Function,
            default: null,
        },
        isFilterValue: {
            type: Boolean,
            default: false,
        },
        // 编辑
        multiple: {
            type: Boolean,
            default: false,
        },
        valueKey: {
            type: String,
            default: 'value',
        },

        // 全部勾选 multiple true时生效
        selectAllValue: {
            type: String,
            default: '',
        },
    },
    mixins: [formMixins],
    data() {
        return {
            filterMethod$: null,
            loading: false,
            originList: [],
            dataList: [],
            currentValue: this.value,
            oldOptions: [''],
        }
    },
    watch: {
        value(val) {
            this.currentValue = val

            if (Array.isArray(val) && val.length === 0) {
                this.oldOptions = ['']
            }
        },
        currentValue(value) {
            this.$emit('input', value)
            const dataList = this.dataList || []
            const target = dataList.filter(item => item.value == value)[0]
            this.onChange &&
                this.onChange(
                    {
                        name: this.name,
                        value: value,
                        option: target,
                        label: target?.label,
                    },
                    {
                        schema: this.schema,
                        formActionType: this.formActionType,
                        formModel: this.formModel,
                    },
                )
        },

        options: {
            handler(val, oldVal) {
                this.parseOptions()
            },
            deep: true,
        },
    },
    created() {
        // TODO 单选可能会有问题 multiple false
        if (this.isFilterValue) {
            this.filterMethod$ = val => {
                if (val) {
                    this.dataList = this.originList.filter(item => {
                        const keys = Object.values(item).join('')
                        return keys.indexOf(val) > -1
                    })
                } else {
                    this.dataList = this.originList
                }
            }
        }
    },
    mounted() {
        this.parseOptions()
    },
    methods: {
        async remoteMethod$(val) {
            if (this.remoteMethod) {
                const result = await this.remoteMethod(val)

                this.dataList = result
            }
        },
        onSelectChange(val) {
            if (this.multiple && this.selectAllValue) {
                this.bindSelectAllChange(val)
            }
        },
        // 绑定全部 全选其他选项
        bindSelectAllChange(val) {
            const options = this.dataList.slice(0)
            const selectAllValue = this.selectAllValue
            let allValues = []
            //保留所有值
            for (let item of options) {
                allValues.push(item.value)
            }
            // 用来储存上一次的值，可以进行对比
            const oldVal = this.oldOptions.length === 1 ? [] : this.oldOptions[1]

            // 若是全部选择
            if (val.includes(selectAllValue)) this.currentValue = allValues

            // 取消全部选中  上次有 当前没有 表示取消全选
            if (oldVal.includes(selectAllValue) && !val.includes(selectAllValue)) this.currentValue = []

            // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
            // 新老数据都有全部选中
            if (oldVal.includes(selectAllValue) && val.includes(selectAllValue)) {
                const index = val.indexOf(selectAllValue)
                val.splice(index, 1) // 排除全选选项
                this.currentValue = val
            }

            //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
            if (!oldVal.includes(selectAllValue) && !val.includes(selectAllValue)) {
                if (val.length === allValues.length - 1) this.currentValue = [selectAllValue].concat(val)
            }

            //储存当前最后的结果 作为下次的老数据
            this.oldOptions[1] = this.currentValue
        },
        async parseOptions(...rest) {
            if (Array.isArray(this.options)) {
                this.initOptions(this.options)
            } else if (typeof this.options === 'function') {
                const result = this.options(this.formModel, ...rest)

                if (result.then) {
                    this.loading = true
                    await result
                        .then(list => {
                            this.initOptions(list)
                            this.loading = false
                        })
                        .catch(err => {
                            console.error(err)
                            this.loading = false
                        })
                } else if (Array.isArray(result)) {
                    this.initOptions(result)
                }
            }
        },
        setData(data) {
            this.dataList = data
        },
        filter(cb) {
            let result = []

            this.originList.forEach((item, index) => {
                if (cb(item, index)) {
                    result.push(item)
                }
            })

            this.dataList = result
        },
        initOptions(options) {
            if (this.isQuery) {
                this.dataList = this.queryOption.concat(options)
            } else if (this.isEdit) {
                this.dataList = this.editOption.concat(options)
            } else if (this.multiple && this.selectAllValue) {
                this.dataList = [
                    {
                        label: this.selectAllValue,
                        value: this.selectAllValue,
                    },
                ].concat(options)
            } else {
                this.dataList = options
            }

            this.originList = [...this.dataList]
        },
    },
}
</script>
