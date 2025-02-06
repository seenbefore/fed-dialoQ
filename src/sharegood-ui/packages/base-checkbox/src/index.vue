<template>
    <div class="sg-data-form-field">
        <slot name="prependSlot"></slot>
        <template v-if="type === 'checkbox'">
            <el-checkbox v-model="currentValue" v-bind="$attrs">{{ label }}</el-checkbox>
        </template>
        <template v-else>
            <component v-if="isQuery" class="all-check" :is="isButton ? 'el-checkbox-button' : 'el-checkbox'" :value="checkAll" @change="handleCheckAllChange">全部</component>

            <el-checkbox-group v-model="currentValue" @change="onSelectChange" :min="min" :max="max">
                <component :is="isButton ? 'el-checkbox-button' : 'el-checkbox'" v-for="(item, index) in dataList" v-bind="getAttrs(item)" :label="item.value" :key="`${item.value}-${index}`">
                    {{ item.label }}
                </component>
            </el-checkbox-group>
        </template>
        <slot name="appendSlot"></slot>
        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseCheckbox',
    props: {
        value: {
            type: [String, Number, Boolean, Array],
            default() {
                return []
            },
        },
        options: {
            type: [Array, Function],
            default() {
                return []
            },
        },
        type: {
            type: String,
            default: 'checkbox-group', // checkbox: 单个的checkbox; checkbox-group: 多个checkbox;
        },
        // 仅type为checkbox时生效
        label: {
            type: String,
            default: '',
        },
        isButton: {
            type: Boolean,
            default: false,
        },
        // 查询
        isQuery: {
            type: Boolean,
            default: false,
        },
        // 全部勾选对应的值 一般传'' 实现全选、取消全选
        selectAllValue: {
            type: [String],
            default: undefined,
        },
        min: {
            type: Number,
            default: undefined,
        },
        max: {
            type: Number,
            default: undefined,
        },
    },
    mixins: [formMixins],
    watch: {
        currentValue(value) {
            this.$emit('input', value)
            const target = this.dataList.find(item => item.value == value)

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
        options(val) {
            this.dataList = val
        },
    },
    computed: {
        checkAll() {
            if (this.currentValue.length === 0) return false
            return this.dataList.every(item => this.currentValue.includes(item.value))
        },
    },
    mounted() {
        if (Array.isArray(this.options)) {
            this.initOptions(this.options)
        } else {
            const result = this.options()
            if (result.then) {
                result
                    .then(list => {
                        this.initOptions(list)
                    })
                    .catch(err => {})
            } else {
                this.initOptions(result)
            }
        }
    },
    data() {
        return {
            dataList: [],
            currentValue: this.value,
            oldOptions: [[], this.value],
        }
    },
    methods: {
        getAttrs(item) {
            const { trueLabel, falseLabel, disabled, name, checked } = item
            return { trueLabel, falseLabel, disabled, name, checked }
        },
        initOptions(options) {
            this.dataList.push(...options)
        },
        handleCheckAllChange(value) {
            if (value) {
                this.currentValue = this.dataList.map(item => item.value)
            } else {
                this.currentValue = []
            }
        },
        onSelectChange(val) {
            if (this.selectAllValue != null || this.selectAllValue != undefined) {
                this.bindSelectAllChange(val)
            }
        },
        // 绑定全部 全选其他选项
        bindSelectAllChange(val = []) {
            const options = this.dataList.slice(0)
            const selectAllValue = this.selectAllValue
            const lastValue = val[val.length - 1]

            let allValues = []
            //保留所有值
            for (let item of options) {
                allValues.push(item.value)
            }
            // 用来储存上一次的值，可以进行对比
            const oldVal = this.oldOptions.length === 1 ? [] : this.oldOptions[1]

            // 若是全部选择
            if (lastValue === selectAllValue) {
                this.currentValue = allValues
            }

            // 取消全部选中  上次有 当前没有 表示取消全选
            if (oldVal.includes(selectAllValue) && !val.includes(selectAllValue)) {
                this.currentValue = []
            }

            // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
            // 新老数据都有全部选中
            if (oldVal.includes(selectAllValue) && val.includes(selectAllValue)) {
                const index = val.indexOf(selectAllValue)
                val.splice(index, 1) // 排除全选选项
                this.currentValue = val
            }

            //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
            if (!oldVal.includes(selectAllValue) && !val.includes(selectAllValue)) {
                if (val.length === allValues.length - 1) {
                    this.currentValue = [selectAllValue].concat(val)
                }
            }

            //储存当前最后的结果 作为下次的老数据
            this.oldOptions[1] = this.currentValue
        },
    },
}
</script>
