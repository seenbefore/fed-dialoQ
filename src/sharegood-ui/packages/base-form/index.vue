<template>
    <div
        class="sg-data-form-container"
        :class="{ 'fix-layout': !autoLayout }"
        v-query-form-layout="{
            columnCount,
            contentWidth,
            gap,
            disabled: autoLayout,
        }"
    >
        <el-form
            ref="form"
            :model="formData"
            class="sg-data-form"
            :class="[`sg-form--label-${labelPosition}`, formClass, tight ? 'tight' : '']"
            :rules="rules"
            @submit.native.prevent
            v-bind="$attrs"
            :size="size"
        >
            <!-- 浏览器不要记住账号密码 -->
            <div
                style=" position: fixed;
        top: -99999px;
        left: -99999px;"
            >
                <input type="text" name="name" autocomplete="off" />
                <input type="password" name="password" autocomplete="off" />
            </div>

            <div class="sg-data-form-header">
                <slot name="header"></slot>
            </div>
            <template v-for="(row, i) in exRows">
                <el-row
                    :key="i"
                    :type="row.type || 'flex'"
                    :gutter="row.gutter || gutter"
                    :align="row.align"
                    :tag="row.tag"
                    class="sg-form-row"
                    :class="row.class"
                    :justify="row.justify"
                    :style="row.style"
                    v-if="!row.ifRender || row.ifRender(formData)"
                >
                    <slot :name="row.appendSlot"></slot>
                    <template v-for="(col, index) in row.columns">
                        <el-col
                            :key="col.name"
                            :span="getSpan(col)"
                            :offset="col.offset"
                            :push="col.push"
                            :pull="col.pull"
                            :xs="col.xs"
                            :sm="col.sm"
                            :md="col.md"
                            :lg="col.lg"
                            :xl="col.xl"
                            v-show="col._visible"
                            :class="col.className || col.class"
                            v-if="col._ifRender"
                        >
                            <!-- 内部提供的表单域 -->
                            <re-el-form-item
                                class="sg-form-item"
                                :class="[col.name, col.class, col.itemAttrs ? col.itemAttrs.class : '', hasColon(col)]"
                                :auto-trigger-sub-component-validate="getAutoTriggerSubComponentValidate(col.itemAttrs)"
                                v-bind="col.itemAttrs"
                                v-if="getFieldType(col)"
                            >
                                <template slot="label" v-if="col.itemAttrs.showLabelTooltip && col.itemAttrs.label">
                                    <span style="position:relative;">
                                        <el-tooltip class="item" effect="dark" :content="col.itemAttrs.label" placement="top-start">
                                            <div class="sg-form-item__label">
                                                {{ col.itemAttrs.label }}
                                            </div>
                                        </el-tooltip>
                                    </span>
                                </template>
                                <template slot="label" v-if="col.itemAttrs.helpMessage && col.itemAttrs.label">
                                    <span v-text="col.itemAttrs.label"></span>
                                    <BaseHelp :text="col.itemAttrs.helpMessage" :icon="col.itemAttrs.helpIcon"></BaseHelp>
                                </template>
                                <template slot="label" v-if="col.itemAttrs.labelRender">
                                    <ex-slot v-if="col.itemAttrs.labelRender" :render="col.itemAttrs.labelRender" :row="col"></ex-slot>
                                </template>
                                <template slot="label" v-if="col.itemAttrs.labelSlot">
                                    <slot :name="col.itemAttrs.labelSlot"></slot>
                                </template>

                                <component
                                    :key="col.name"
                                    :is="getFieldType(col)"
                                    v-model="formData[col.name]"
                                    v-bind="{
                                        label: col.itemAttrs.label,
                                        ...col.attrs,
                                        name: col.name,
                                    }"
                                    v-on="col.on"
                                    :form-action-type="formActionType"
                                    :form-model="formData"
                                    :class="getComponentClass(col)"
                                    ref="formItem"
                                    @input="onInput($event, col)"
                                    @keyup.enter.native="handleSubmit(col, index)"
                                >
                                    <!-- input append -->
                                    <!-- <template
                                        slot="appendSlot"
                                        v-if="col.suffix"
                                    >
                                        <span
                                            v-text="col.suffix"
                                            class="suffix"
                                        ></span>
                                    </template> -->
                                    <template slot="appendSlot" v-if="col.appendRender">
                                        <ex-slot v-if="col.appendRender" :render="col.appendRender" :row="col" :class="suffix"></ex-slot>
                                    </template>
                                    <template v-if="col.selectRender" slot="selectSlot" slot-scope="{ item }">
                                        <ex-slot :render="col.selectRender" :row="item"></ex-slot>
                                    </template>
                                    <template v-if="col.attrs.inputSlots">
                                        <template v-for="slotItem in col.attrs.inputSlots">
                                            <template v-if="slotItem.slotType" :slot="slotItem.slotType">
                                                <slot :name="slotItem.slotName"></slot>
                                            </template>
                                        </template>
                                    </template>
                                    <template v-if="col.attrs.appendSlot">
                                        <template slot="appendSlot">
                                            <slot :name="col.attrs.appendSlot"></slot>
                                        </template>
                                    </template>
                                    <template v-if="col.attrs.prependSlot">
                                        <template slot="prependSlot">
                                            <slot :name="col.attrs.prependSlot"></slot>
                                        </template>
                                    </template>
                                    <template v-if="col.attrs.autocompleteSlot" slot="autocompleteSlot" slot-scope="{ item }">
                                        <slot :name="col.attrs.autocompleteSlot" :item="item"></slot>
                                    </template>
                                </component>
                                <template v-if="col.appendRender && !types[col.tag]">
                                    <ex-slot :render="col.appendRender" :row="col"></ex-slot>
                                </template>
                            </re-el-form-item>
                            <!-- 自定义表单域 -->
                            <template v-else-if="col.tag === 'slot'">
                                <el-form-item class="sg-form-item" v-bind="col.itemAttrs" :class="col.name">
                                    <template slot="label" v-if="col.itemAttrs.showLabelTooltip && col.itemAttrs.label">
                                        <span style="position:relative">
                                            <el-tooltip class="item" effect="dark" :content="col.itemAttrs.label" placement="top-start">
                                                <div class="sg-form-item__label">
                                                    {{ col.itemAttrs.label }}
                                                </div>
                                            </el-tooltip>
                                        </span>
                                    </template>

                                    <slot
                                        :row="{
                                            model: formData,
                                            name: col.name,
                                        }"
                                        :name="col.slot || col.appendSlot || col.slotName"
                                    ></slot>
                                    <ex-slot v-if="col.render" :render="col.render" :row="formData" :column="col"></ex-slot>
                                </el-form-item>
                            </template>
                            <!-- 操作表单域 -->
                            <template v-else-if="col.tag == 'action'">
                                <div class="sg-data-form-action">
                                    <ex-slot v-if="col.render" :render="col.render" :row="col"></ex-slot>
                                    <template v-for="(button, z) in col.buttons || []">
                                        <template v-if="button.isSubmit">
                                            <el-button :key="z" type="primary" @click="submit" native-type="submit" v-bind="button" class="sg-base-form--search" :size="size">
                                                <!-- <img
                                                    :src="button.img"
                                                    alt=""
                                                    class="sg-base-form--reset--img"
                                                    v-if="button.img"
                                                /> -->
                                                <i class="sg-icon-search"></i>
                                                <span>
                                                    {{ button.text || submitText }}
                                                </span>
                                            </el-button>
                                        </template>
                                        <template v-else-if="button.isReset">
                                            <el-button :key="z" :type="button.type" @click="reset" v-bind="button" class="sg-base-form--reset" :size="size">
                                                <i class="sg-icon-reset"></i>
                                                <span>
                                                    {{ button.text || resetText }}
                                                </span>
                                            </el-button>
                                        </template>
                                        <template v-else-if="button.isMore">
                                            <el-button :key="z" :type="button.type" @click="toggleHiddens" class="sg-base-form--more" :size="size">
                                                <i class="sg-icon-more"></i>
                                                <span>
                                                    {{ isFieldHidden ? button.text || moreText : button.hiddenText || hiddenText }}
                                                </span>
                                            </el-button>
                                        </template>
                                    </template>
                                </div>
                            </template>
                            <!-- 整个表单项 -->
                            <template v-else-if="col.slotName">
                                <slot :name="col.slotName"></slot>
                            </template>
                            <!-- 整个表单项 -->
                            <template v-else-if="col.slot">
                                <slot :name="col.slot"></slot>
                            </template>
                            <template v-else-if="col.render">
                                <ex-slot v-if="col.render" :render="col.render" :row="col"></ex-slot>
                            </template>
                        </el-col>
                    </template>
                </el-row>
            </template>
            <div class="sg-data-form-footer">
                <slot name="footer"></slot>
            </div>
        </el-form>
    </div>
</template>

<script>
import _ from 'lodash'
import ReElFormItem from './re-el-form-item.vue'
import BaseInput from '../base-input/src/index.vue'
import BaseSelect from '../base-select/src/index.vue'
import BaseDate from '../base-date/src/index.vue'
import BaseTime from '../base-time/src/index.vue'
import BaseCheckbox from '../base-checkbox/src/index.vue'
import BaseRadio from '../base-radio/src/index.vue'
import BaseCascader from '../base-cascader/src/index.vue'
import BaseUploader from '../base-uploader/src/index.vue'
import BaseAutoComplete from '../base-autocomplete/src/index.vue'
import BaseText from '../base-text/src/index.vue'
import BaseRange from '../base-range/src/index.vue'
import BaseHelp from '../base-help/src/index.vue'
import BaseSwitch from '../base-switch/src/index.vue'
import BaseDateRange from '../base-daterange/src/index.vue'
import BaseTimeRange from '../base-timerange/src/index.vue'
import BaseSingleCheckbox from '../base-single-checkbox/src/index.vue'
import BaseInputNumber from '../base-input-number/src/index.vue'
import { ExSlot } from '../utils/ExSlot'
import { deepMerge, handleFormValues, isObject } from '../utils/index'

const types = {
    text: 'BaseText',
    input: 'BaseInput',
    select: 'BaseSelect',
    date: 'BaseDate',
    time: 'BaseTime',
    checkbox: 'BaseCheckbox',
    radio: 'BaseRadio',
    cascader: 'BaseCascader',
    uploader: 'BaseUploader',
    autocomplete: 'BaseAutoComplete',
    range: 'BaseRange',
    switch: 'BaseSwitch',
    daterange: 'BaseDateRange',
    timerange: 'BaseTimeRange',
    singleCheckbox: 'BaseSingleCheckbox',
    'input-number': 'BaseInputNumber',
}

export default {
    name: 'SgBaseForm',
    components: {
        'ex-slot': ExSlot,
        BaseText,
        BaseInput,
        BaseSelect,
        BaseDate,
        BaseTime,
        BaseCheckbox,
        BaseRadio,
        BaseCascader,
        BaseUploader,
        BaseAutoComplete,
        BaseRange,
        BaseHelp,
        BaseSwitch,
        BaseDateRange,
        BaseTimeRange,
        BaseSingleCheckbox,
        BaseInputNumber,
        ReElFormItem,
    },
    props: {
        // 表单是否紧凑
        tight: {
            type: Boolean,
            default: false,
        },
        // 表单大小
        size: {
            type: String,
            default: 'small',
        },
        // formClass
        formClass: {
            type: String,
            default: 'inline', // column
        },
        // 布局模式
        type: {
            type: String,
            default: 'flex',
        },
        // 宽度
        span: {
            type: [Number, String],
            default: 8,
        },
        // 水平位置
        justify: {
            type: [String],
            default: '',
        },
        // 间距
        gutter: {
            type: [Number, String],
            default: 0,
        },
        // 表单数据
        fields: {
            type: Array,
            default() {
                return []
            },
        },
        // 验证规则
        rules: {
            type: Object,
            default() {
                return {}
            },
        },
        // label宽度
        labelWidth: {
            type: [Number, String],
            default: '120px',
        },
        // 提交文案
        onSubmitText: {
            type: String,
            default: '提交',
        },
        // 重置文案
        resetText: {
            type: String,
            default: '重置',
        },
        // 展开文案
        moreText: {
            type: String,
            default: '展开',
        },
        // 收起文案
        hiddenText: {
            type: String,
            default: '收起',
        },
        // label位置
        labelPosition: {
            type: String,
            default: 'right',
        },
        value: {
            type: Object,
            default() {
                return {}
            },
        },
        // 自动布局
        autoLayout: {
            type: Boolean,
            default: true,
        },
        // 多少列（autoLayout为false生效）
        columnCount: {
            type: [Number, String],
            default: 3,
        },
        // 内容区宽度（autoLayout为false生效）(设置为auto时，会铺满剩余空间)
        contentWidth: {
            type: [Number, String],
            default: 250,
        },
        // 每列之间的间隙（autoLayout为false生效）
        gap: {
            type: Number,
            default: 40,
        },
        // 最大默认显示数，超过此数，则默认收起
        maxDefaultShowCount: {
            type: [Number],
            default: 9,
        },
        // 是否自动追加操作按钮
        autoAppendAction: {
            type: Boolean,
            default: false,
        },
        /**label后面是否添加冒号 */
        colon: {
            type: Boolean,
            default: true,
        },
        /**自动触发子组件校验 */
        autoTriggerSubComponentValidate: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isFieldHidden: true,
            rows: [],
            hiddens: [],
            types: types,
            originModel: {}, // 原始数据
            formData: this.value, // 表单数据
            formActionType: this,
        }
    },
    computed: {
        exRows() {
            let config = { formItemStartIndex: -1 }
            const rows = this.rows.map(row => {
                return this.computeFormItem(row, this.formData, config)
            })
            /** 自动追加操作按钮 start */
            if (this.autoAppendAction) {
                const singleRowData = rows.length === 1
                const columnCount = singleRowData ? this.columnCount : rows.length
                const count = rows.reduce((acc, item) => {
                    const columnsLength = item.columns.filter(item => item._ifRender).length
                    return acc + columnsLength
                }, 0)
                // 表单数大于1个显示重置
                const hasResetBtn = count > 1
                // 表单数大于最大默认显示数显示更多
                const hasMoreBtn = count > this.maxDefaultShowCount
                const lastRow = rows[rows.length - 1].columns || []
                lastRow.push({
                    tag: 'action',
                    visible: true,
                    _ifRender: true,
                    _visible: true,
                    // 表单数大于列数，操作行重起一行
                    span: count < columnCount ? -1 : 24,
                    buttons: [
                        {
                            isSubmit: true,
                            type: 'primary',
                            text: '查询',
                            show: true,
                        },
                        {
                            isReset: true,
                            type: '',
                            text: '重置',
                            show: hasResetBtn,
                        },
                        {
                            isMore: true,
                            type: '',
                            text: '',
                            show: hasMoreBtn,
                        },
                    ].filter(({ show }) => show),
                })
            }
            /** 自动追加操作按钮 end */
            return rows
        },
    },
    watch: {
        value: {
            handler(val) {
                this.formData = val
            },
        },
        formData: {
            handler(val) {
                this.$emit('input', val)
            },
            deep: true,
        },
    },
    created() {
        this.init()
    },
    mounted() {
        this.formActionType = this
        this.$emit('register', this)
    },
    methods: {
        getAutoTriggerSubComponentValidate(itemAttrs) {
            return itemAttrs?.autoTriggerSubComponentValidate ?? this.autoTriggerSubComponentValidate
        },
        // label是否自动添加冒号
        hasColon(col) {
            // 如果明确设置了 colon 属性则使用设置值
            if (col.itemAttrs?.colon !== undefined) {
                return col.itemAttrs.colon ? 'has-colon' : ''
            }

            // 如果 label 已经以冒号结尾，则不添加 has-colon class
            const label = col.itemAttrs?.label || ''
            if (label.endsWith('：')) {
                return ''
            }

            // 使用全局 colon 配置
            return this.colon ? 'has-colon' : ''
        },
        getComponentClass(col) {
            if (col.attrs.appendSlotRender) {
                return 'inline'
            }
            return ''
        },
        /**
         * 表单对象数据赋值
         */
        setState(name, value) {
            if (isObject(name)) {
                const model = { ...name }
                Object.keys(model).forEach(key => {
                    const val = model[key]
                    // if(this.formData.hasOwnProperty(key)) {

                    // }
                    delete this.formData[key]
                    this.$set(this.formData, key, val)
                })
            } else {
                delete this.formData[name]
                this.$set(this.formData, name, value)
            }
        },
        /**
         * 返回表单对象数据
         */
        getState() {
            const rows = this.rows
            const data = { ...this.formData }
            rows.forEach(row => {
                const columns = row.columns || []
                columns.forEach(item => {
                    const name = item.name
                    const value = data[name]
                    if (item.formatData && name) {
                        try {
                            const result = item.formatData(value, {
                                name,
                                value,
                                formModel: this.formData,
                            })
                            Object.assign(data, result ?? {})
                            if (Object.keys(result).join('') === name) {
                                return
                            }
                            delete data[name]
                        } catch (error) {
                            console.error(error)
                        }
                    }
                })
            })

            return handleFormValues(data)
        },
        onInput(val, schema) {
            const { name, itemAttrs = {}, attrs = {}, formatData } = schema
            const label = itemAttrs.label
            const value = val?.replace?.(/^\s+/, '') ?? val
            const result = formatData?.(value, {
                name,
                value,
                formModel: this.formData,
            })
            Object.assign(this.formData, result ?? {})
            this.$set(this.formData, name, value)
            attrs.onInput &&
                attrs.onInput(val, {
                    name,
                    label,
                    schema: schema,
                    formActionType: this,
                    formModel: this.formData,
                })
            this.$emit('change', { ...this.formData })
        },
        // 格式化数据并初始化一些默认数据
        init(fields) {
            const rows = this.computeRows(fields || this.fields)

            this.rows = rows.map((row, rowIndex) => {
                const columns = row.columns || []
                let count = -1
                columns.forEach((column, colIndex) => {
                    let { visible } = column

                    visible = visible === false ? false : true
                    this.$set(column, 'visible', visible)
                    this.$set(column, '_visible', visible)
                    if (typeof column.attrs === 'function') {
                        column.attrs = column.attrs({
                            schema: column,
                            formActionType: this,
                            formModel: this.formData,
                        })
                    } else {
                        column.attrs = column.attrs || {}
                    }

                    // todo 按不同类型匹配合适的初始值 [] '' false

                    if (typeof column.attrs.value === 'boolean') {
                        column.attrs.value = column.attrs.value
                    } else if (typeof column.attrs.value === 'undefined') {
                        column.attrs.value = ''
                    } else {
                        column.attrs.value = column.attrs.value
                    }

                    column.itemAttrs = column.itemAttrs || {}

                    // 隐藏域
                    if (!visible) {
                        this.hiddens.push(column)
                    }
                })
                return row
            })

            //console.log('this.rows', JSON.stringify(this.rows))
        },
        // true: 隐藏表单收起了 false: 隐藏表单展开了
        isHidden() {
            return this.isFieldHidden
        },
        // 展开或收取隐藏表单
        toggleHiddens() {
            this.isFieldHidden = !this.isFieldHidden
            console.log('[toggleHiddens]', this.hiddens)
            this.hiddens.forEach(item => {
                item._visible = !item._visible
            })
        },
        computeFormItem(row, formData, config) {
            const { columns = [], ...rest } = row
            const item = {
                ...rest,
            }
            item.columns = columns.map(column => {
                let { tag, name, label, visible, span, ifRender, custom, _visible, ...rest } = column
                const exColumn = {
                    tag,
                    name,
                    visible,
                    span,
                    custom,
                    ...rest,
                }

                exColumn.itemAttrs = {
                    label,
                    prop: name,
                    labelWidth: this.labelWidth,
                    ...column.itemAttrs,
                }

                exColumn.attrs = {
                    name,
                    ...column.attrs,
                }
                // 当model中有值，用$set并不会生效
                if (formData[name] === null) {
                    delete formData[name]
                }
                // ifRender 重新渲染时如果有初始值则赋初始值
                if (typeof formData[name] === 'undefined' && column.attrs.value !== undefined && this.getFieldType(column)) {
                    this.$set(formData, name, column.attrs.value)
                }
                if (column.getAttrs) {
                    const result = column.getAttrs(formData)

                    exColumn.attrs = Object.assign(exColumn.attrs, result)
                    console.log(exColumn.name, exColumn.attrs)
                }
                if (column.componentProps) {
                    const result = column.componentProps({
                        schema: column,
                        formActionType: this,
                        formModel: this.formData,
                    })
                    if (Object.prototype.toString.call(result) === '[object Object]') {
                        deepMerge(exColumn, result)
                    }

                    //console.log(exColumn.name, exColumn.attrs)
                }
                exColumn._ifRender = ifRender ? ifRender(formData) : true
                exColumn._visible = _visible
                if (this.autoAppendAction && exColumn._ifRender) {
                    config.formItemStartIndex++
                    exColumn.visible = !this.isFieldHidden ? true : config.formItemStartIndex + 1 > this.maxDefaultShowCount ? false : true
                    exColumn._visible = exColumn.visible
                }
                if (!exColumn._ifRender) {
                    // 直接删除属性无法监听对象不变化 所以先改变值
                    formData[name] = null
                    delete formData[name]
                }
                // 初始化数据 将一些数据转成组件需要的格式 和 formatData配合
                if (exColumn.parseData) {
                    const result = exColumn.parseData(this.formData, { name })
                    this.setState(result)
                }

                return exColumn
            })
            //console.log(22, JSON.stringify(formData), formData)
            //console.log('computeFormItem', item)
            return item
        },
        // 重新整理rows
        computeRows(val = []) {
            const fields = _.cloneDeep(val)
            const hasColumns = fields.some(item => {
                const { columns } = item
                if (columns) {
                    return true
                } else {
                    return false
                }
            })
            let result = []
            if (hasColumns) {
                result = [...fields]
            } else {
                result = [
                    {
                        type: this.type,
                        gutter: this.gutter,
                        justify: this.justify,
                        columns: [...fields],
                    },
                ]
            }
            return result
        },
        //如果是最后一个input默认触发提交  或者 配置了字段 isTriggerSubmit
        handleSubmit(col, index) {
            console.log('[enter:isTriggerSubmit]', col.attrs.isTriggerSubmit)
            if (col.attrs.isTriggerSubmit) {
                this.$emit('submit', this.getState())
            }
        },
        // 计算宽度
        getSpan(col) {
            const span = col.span || this.span
            let count = 0
            this.rows.forEach(row => {
                const columns = row.columns || []
                columns.forEach(column => {
                    const { _visible, tag } = column
                    if (_visible && tag !== 'action') {
                        count++
                    }
                })
            })
            if (typeof span === 'function') {
                return span(count)
            } else {
                return span
            }
        },

        // 获取表单字段tag对应组件
        getFieldType(col) {
            const { name, tag, custom } = col
            const types = this.types

            if (tag === 'slot' || tag === 'action' || col.render || col.slotName) {
                return null
            } else if (types[tag]) {
                return types[tag]
            } else {
                if (custom) {
                    if (custom === true) {
                        return tag
                    } else {
                        return custom
                    }
                } else {
                    return tag
                }
            }
        },

        // 获取子组件ref
        getFieldRef(name) {
            const formItem = this.$refs['formItem']
            const result = formItem.filter(item => item.name === name || item.$attrs.name === name)[0]

            return result
        },
        // 获取原始配置数据
        getFieldProps(name, original = true) {
            const rows = original ? this.rows : this.exRows
            let target = null
            rows.some(row => {
                const columns = row.columns || []
                const result = columns.some(item => {
                    if (item.name === name) {
                        target = item
                        return true
                    } else {
                        return false
                    }
                })
                if (result) {
                    return true
                } else {
                    return false
                }
            })
            if (target) {
                return target
            } else {
                throw `[error]: 未找到name=${name}的数据项`
            }
        },
        updateSchema(field, name, value) {
            const schema = this.getFieldProps(field)
            _.set(schema, name, value)
        },
        getSchema(field, name, value) {
            const schema = this.getFieldProps(field)
            return schema
        },

        submit() {
            console.log('[submit]', JSON.stringify(this.formData))
            this.$emit('submit', this.formData)
        },
        // 校验整个表单
        validate(cb, isScroll = false) {
            this.$emit('validateField')
            return new Promise((resolve, reject) => {
                this.$refs['form'].validate((valid, result) => {
                    cb && cb(valid, result)
                    valid ? resolve({ valid, result }) : reject({ valid, result })
                    if (!valid && isScroll) {
                        this.scrollIntoView()
                    }
                })
            })
        },
        scrollIntoView() {
            this.$nextTick(() => {
                // 获取错误节点
                let isError = this.$refs['form'].$el.getElementsByClassName('is-error')
                isError[0].scrollIntoView({
                    // 滚动到指定节点
                    // 值有start,center,end，nearest，当前显示在视图区域中间
                    block: 'center',
                    // 值有auto、instant,smooth，缓动动画（当前是慢速的）
                    behavior: 'smooth',
                })
            })
        },
        // 对部分表单字段进行校验
        validateField(prop, cb) {
            this.$emit('validateField', prop)
            return new Promise((resolve, reject) => {
                let length = Array.isArray(prop) ? prop.length : 1
                const _result = []
                this.$refs['form'].validateField(prop, (valid, result) => {
                    cb && cb(valid, result)
                    valid ? _result.push(result) : []
                    length--
                    if (length === 0) {
                        _result.length ? reject({ valid, _result }) : resolve({ valid, _result })
                    }
                })
            })
        },
        // 清除校验信息
        clearValidate(props) {
            this.$refs['form'].clearValidate(props)
        },
        // 重置数据
        reset() {
            console.log('[reset]')
            this.$refs['form'].resetFields()
            this.$emit('reset')
        },
    },
}
</script>
<style lang="less" scoped>
.fix-layout {
    ::v-deep {
        .sg-data-form .el-form-item__label {
            text-overflow: unset;
        }

        .sg-form-row {
            & > div:last-child:nth-child(3),
            & > div:last-child:nth-child(2) {
                .sg-data-form-action {
                    padding-left: 40px;
                }
            }
        }
    }
}
</style>
