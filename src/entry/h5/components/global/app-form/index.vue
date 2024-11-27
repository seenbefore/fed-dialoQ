<template>
    <div class="app-form">
        <div class="form-body" :class="{ 'not-form-foot-btns': !showFootBtns }">
            <van-form ref="vanForm" :input-align="inputAlign" :show-error="false">
                <van-cell-group inset v-for="fields in myFieldGroup" :key="fields.groupId" :id="fields.groupId" :class="fields.groupClass" :data-id="fields.dataId" @click="emitFieldGroupClick">
                    <template v-if="!fields.ifRender || fields.ifRender(formData)">
                        <van-field v-if="fields.groupName" v-model="fields.groupName" class="van-form-cell van-form-cell-header" input-align="left" placeholder="请输入分组名" readonly></van-field>

                        <template v-for="field in fields.children">
                            <component
                                ref="fieldRef"
                                :key="field.randomKey || field.name"
                                :class="['van-form-cell', field.name, field.tag, field.verticalAlign ? `van-form-cell-${field.verticalAlign}` : '', field.props ? field.props.class || '' : '']"
                                :name="field.name"
                                :label="field.hiddenLabel ? '' : field.label"
                                :required="field.required"
                                :rules="getFieldRules(field)"
                                :is="getFieldComponent(field.tag)"
                                :tag="field.tag"
                                v-bind="getFieldProps(field.props)"
                                v-on="field.on"
                                v-model="formData[field.name]"
                                v-if="!field.ifRender || field.ifRender(formData)"
                                :form-data="value"
                                :data-id="field.dataId"
                                @click="emitFieldClick"
                            >
                                <template #right-icon>
                                    <ex-slot v-if="field.props && field.props.rightIconRender" :render="field.props.rightIconRender" :row="field"></ex-slot>
                                    <slot v-else-if="field.props && field.props.rightIconSlot" :name="field.props.rightIconSlot"></slot>
                                </template>
                                <template v-if="field.tag === 'slot'">
                                    <slot :name="field.slotName" :slotProps="getFieldProps(field.props)"></slot>
                                </template>
                                <!-- 自定义渲染 -->
                                <template #input>
                                    <ex-slot v-if="field.inputRender" :render="field.inputRender" :row="field"></ex-slot>
                                </template>
                                <template #label>
                                    <ex-slot v-if="field.labelRender" :render="field.labelRender" :row="field"></ex-slot>
                                </template>
                            </component>
                        </template>
                    </template>
                    <!-- </template> -->
                </van-cell-group>
            </van-form>
        </div>
        <div class="form-foot-btns" v-if="showFootBtns">
            <!-- <van-button class="cancel" @click="cancel">取消</van-button>
            <van-button class="confirm" @click="submit">提交</van-button> -->
            <van-button block type="primary" :loading="submitting" :loading-text="submittingText" @click="submit">
                提交
            </van-button>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { Form } from 'vant'
import axios from 'axios'
import { customDeepClone } from './service'
import { isEqual } from 'lodash'

interface LinkageWatcher {
    /**监听的值 */
    watch: string[]
    /**监听的值变化后的操作函数 */
    handler: (values: any) => any
    /**deep: 深度监听; immediate: 立即监听 */
    options?: { deep?: boolean; immediate?: boolean }
}
export interface GroupField {
    groupName: string
    groupId: string
    dataId?: string
    groupClass?: string
    children: Field[]
    ifRender?: Function | boolean
    /* 随机key */
    randomKey?: string
}
export interface Field {
    /**分组名 */
    groupName?: string
    /**分组Id */
    groupId?: string
    /**组件名 */
    tag: any
    /**名称，提交表单的标识符 */
    name: string
    /**输入框左侧文本 */
    label: string
    /**隐藏输入框左侧文本 */
    hiddenLabel?: boolean
    /**是否必填 */
    required?: boolean
    /**默认值 */
    defaultValue?: any
    /**其余配置参数 */
    props?: Record<string, any>
    /**事件 */
    on?: Record<string, any>
    /**校验规则 */
    rules?: any[]
    /**排序 */
    sort?: string | number
    /**隐藏 */
    hidden?: boolean
    /**联动规则 */
    linkageRule?:
        | LinkageWatcher
        | {
              value?: LinkageWatcher
              options?: LinkageWatcher
          }
    /**自定义组件插槽类名 */
    slotName?: string
    /**动态渲染表单控制 */
    ifRender?: Function | boolean
    /* 随机key */
    randomKey?: string
    /* 对齐方式 */
    verticalAlign?: 'top' | 'left'
}
/**判断是否是联动监听器类型 */
export function isLinkageWatcher(value: any): value is LinkageWatcher {
    const $value = value as LinkageWatcher
    return $value?.watch !== undefined && $value?.handler !== undefined
}
export function isGroupField(value: any): value is GroupField {
    return (value as GroupField).children !== undefined
}
export const componentMap: Record<string, any> = {
    text: () => import('./components/my-text/index.vue'),
    input: () => import('./components/my-input/index.vue'),
    textarea: () => import('./components/my-input/index.vue'),
    radio: () => import('./components/my-radio/index.vue'),
    checkbox: () => import('./components/my-checkbox/index.vue'),
    cascader: () => import('./components/my-cascader/index.vue'),
    uploader: () => import('./components/my-uploader/index.vue'),
    'number-input': () => import('./components/number-input/index.vue'),
    'date-picker': () => import('./components/date-picker/index.vue'),
    'select-picker': () => import('./components/select-picker/index.vue'),
    table: () => import('./components/my-table/index.vue'),
    'select-checkbox': () => import('./components/my-select-checkbox/index.vue'),
    custom: () => import('./components/my-custom/index.vue'),
}
// 自定义内容的组件
const ExSlot = {
    functional: true,
    props: {
        row: { type: Object, default: () => {} },
        render: { type: Object, default: () => {} },
        column: { type: Object, default: () => {} },
    },
    render: (h: any, ctx: any) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index,
        }
        if (typeof ctx.props.render === 'function') {
            return [ctx.props.render(h, params)]
        } else {
            return [ctx.props.render]
        }
    },
}
@Component({
    name: 'AppForm',
    components: { ExSlot },
})
export default class AppForm extends Vue {
    @Prop({ type: String, default: '提交中' })
    submittingText!: string
    /**值 */
    @Prop({ type: Object, default: () => {} })
    value!: Record<string, any>
    /**表单配置项信息 */
    @Prop({ type: Array, default: () => [] })
    fields!: any[]
    /**显示底部按钮 */
    @Prop({ type: Boolean, default: true })
    showFootBtns!: boolean
    /**全局禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean
    /**强制设成一个分组 */
    @Prop({ type: Boolean, default: false })
    forceSameSet!: boolean
    /**覆盖默认的http行为，可以自定义http的实现 */
    @Prop({ type: Function, default: axios })
    httpRequest!: Promise<any>
    /**自定义函数里需要的一些额外参数 */
    @Prop({ type: Object, default: () => {} })
    extraParams!: {}
    /* inputAlign */
    @Prop({ type: String, default: 'right' })
    public inputAlign!: 'left' | 'right' | 'center'

    public $refs!: {
        vanForm: Form
        fieldRef: any
    }
    submitting = false

    /**表单数据 */
    formData: Record<string, any> = {}
    @Watch('formData', { deep: true })
    watchFormData(newV: Record<string, any>) {
        this.$emit('input', newV)
    }
    @Watch('value', { deep: true, immediate: true })
    watchValue(newV: Record<string, any>) {
        this.formData = newV
    }

    /**表单项信息 */
    myFields: Field[] = []
    myFieldGroup: GroupField[] | any = []
    @Watch('fields', { deep: true, immediate: true })
    watchFields(newV: Field[], oldV: Field[]) {
        console.log(newV, 'newV')
        if (isEqual(newV, oldV)) return
        this.$set(this, 'myFields', this.fieldsFormat(customDeepClone(this.fields)))
        this.initWatcher()
    }
    @Watch('myFields', { deep: true, immediate: true })
    watchMyFields(newV: Field[], oldV: Field[]) {
        this.$set(this, 'myFieldGroup', this.groupFields(customDeepClone(newV)))
    }
    /**格式化字段配置数据 */
    fieldsFormat(fields: Field[] = []): Field[] {
        return fields.map((item: Field) => {
            const temp: Field = { ...item }
            if (isGroupField(item)) {
                this.fieldsFormat(item.children)
            } else {
                const { name, defaultValue } = item
                // 设置默认值
                if (this.formData[name] === undefined) {
                    const defaultValue_ = defaultValue === undefined ? '' : defaultValue
                    this.$set(this.formData, name, defaultValue_)
                }
            }
            return temp
        })
    }
    /**分组 */
    groupFields(fields: Field[] = []) {
        let newFields: any = []
        if (fields[0] && fields[0].sort) {
            // 需根据自定义序号排序
            newFields = fields.filter((item: Field) => !item.hidden).sort(({ sort: a = 0 }: Field, { sort: b = 0 }: Field) => Number(a) - Number(b))
        } else {
            // 无需再排序
            newFields = fields.filter((item: Field) => !item.hidden)
        }
        const myFields = newFields
        const groupFieldsObj = myFields.reduce((acc: Record<string, GroupField>, item: Field) => {
            if (isGroupField(item)) {
                acc[item.groupId] = item
            } else {
                const groupName = item.groupName || ''
                const groupId = item.groupId || ''
                const key = this.forceSameSet ? 'forceSameSet' : groupId || groupName
                if (!acc[key]) {
                    acc[key] = {
                        groupId,
                        groupName,
                        children: [],
                    }
                }
                acc[key].children.push(item)
            }
            return acc
        }, {})
        const groupFields = Object.values(groupFieldsObj)
        return groupFields
    }

    /**监听器集合 */
    myWatchers: any[] = []
    /**初始化监听器 */
    initWatcher() {
        this.clearWatcher()
        this.myFields.forEach((field: Field, index: number) => {
            const { name, linkageRule } = field
            if (isLinkageWatcher(linkageRule)) {
                this.addWatcher(linkageRule, (result: any) => {
                    if (Object.prototype.toString.call(result) === '[object Object]') {
                        const { value, required, rules, ...rest } = result
                        // 如果返回结果为undefined, 则认为不需要修改
                        if (typeof value !== 'undefined') {
                            this.formData[name] = value
                        }
                        this.$set(field, 'props', {
                            ...(field.props || {}),
                            ...(rest || {}),
                        })
                        if (required !== undefined) {
                            field.required = required
                        }
                        if (rules !== undefined) {
                            field.rules = rules
                        }
                    }
                })
            } else {
                const { value, options } = linkageRule || {}
                if (isLinkageWatcher(value)) {
                    this.addWatcher(value, (result: any) => {
                        this.formData[name] = result
                    })
                }
                if (isLinkageWatcher(options)) {
                    this.addWatcher(options, (result: any) => {
                        this.$set(field, 'props', {
                            ...(field.props || {}),
                            options: result,
                        })
                    })
                }
            }
        })
    }
    /**添加监听器 */
    addWatcher(watcher: LinkageWatcher, callback: (result: any) => void) {
        const unwatch = this.$watch(
            function() {
                return watcher.watch.map((item: string) => this.formData[item])
            },
            async function(newV, oldV) {
                try {
                    // 动态结果执行函数
                    const result: any = await watcher.handler({
                        values: this.formData,
                        fields: this.myFields,
                        fieldRefs: this.$refs.fieldRef,
                        http: this.httpRequest,
                        extraParams: this.extraParams,
                        getRefField: this.getRefField,
                    })
                    // 如果返回结果为undefined, 则认为不需要修改
                    if (result !== undefined) {
                        callback(result)
                    }
                } catch (error) {
                    this.$toast((error as any).toString())
                }
            },
            watcher.options,
        )
        this.myWatchers.push(unwatch)
    }
    /**清空监听器 */
    clearWatcher() {
        while (this.myWatchers.length) {
            const myWatcher = this.myWatchers.pop()
            myWatcher()
        }
    }

    /**获取字段组件 */
    getFieldComponent(tag: any) {
        const fieldComponent = componentMap[tag]
        if (fieldComponent) {
            return fieldComponent
        }
        return tag
    }
    /**获取字段校验规则 */
    getFieldRules(field: Field) {
        const { required, label, rules = [] } = field
        // console.log(field.name, rules, 'rules')
        if (required) {
            return [
                {
                    required,
                    message: `【${label}】为必填项`,
                },
                ...rules,
            ]
        }
        return rules
    }
    /**获取字段的配置属性 */
    getFieldProps(props: Record<string, any>) {
        if (this.disabled) {
            return {
                ...props,
                disabled: true,
            }
        }
        return props
    }

    /**通过name获取对应组件的实例 */
    getRefField(name: string) {
        const $fieldRef = this.$refs.fieldRef || []
        return $fieldRef.find((item: any) => item.$attrs && item.$attrs.name === name)
    }

    /**获取对应表单组件实例属性 */
    getFieldAttrs(name: string) {
        const fieldItem = this.getRefField(name)
        if (fieldItem) {
            return fieldItem.$attrs
        }
        return null
    }

    /**重新设置对应表单组件属性 */
    setFieldAttrs(name: string, fieldName: string, value: any) {
        const fieldItem = this.getRefField(name)
        const attr = fieldItem ? fieldItem.$attrs : null
        if (attr) {
            this.$set(attr, fieldName, value)
        }
    }

    /**重置表单项的验证提示 */
    resetVlidateFormItem(name?: string | string[]) {
        if (name && name.length) {
            this.$refs.vanForm.resetValidation(name)
        } else {
            this.$refs.vanForm.resetValidation()
        }
    }

    /**滚动到对应表单项的位置 */
    scrollToFormAnchor(name: string) {
        setTimeout(() => {
            this.$refs.vanForm.scrollToField(name, {
                behavior: 'smooth',
            })
        }, 100)
    }

    /**表单校验 */
    async validate() {
        console.log('validate: ', this.formData)
        return new Promise((resolve, reject) => {
            this.$refs.vanForm
                .validate()
                .then(() => {
                    // 校验子表单组件(如：table组件)
                    const validateTasks: Promise<any>[] = []
                    this.$refs.fieldRef.forEach((item: any) => {
                        if (item.validate) {
                            validateTasks.push(item.validate())
                        }
                    })
                    Promise.all(validateTasks)
                        .then(() => {
                            resolve(this.formData)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
                .catch(error => {
                    const [{ name }] = error
                    // 滚动到首个报错位置
                    this.$refs.vanForm.scrollToField(name, {
                        behavior: 'smooth',
                    })
                    reject(error)
                })
        })
    }
    /**表单提交 */
    async submit() {
        const resp = await this.validate()
        this.$emit('submit', resp)
    }
    cancel() {
        this.$emit('cancel')
    }

    public emitFieldClick(...args: any): UndefinedAble<boolean> {
        this.$emit('fieldClick', ...args)
        const event = args[0] as PointerEvent
        if (event) {
            event.stopPropagation()
            return false
        }
    }

    public emitFieldGroupClick(...args: any): void {
        this.$emit('fieldGroupClick', ...args)
    }
}
</script>
<style lang="less" scoped>
.app-form {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    // prettier-ignore
    padding-top: 16PX;
    height: 100%;
    .flip-list-move {
        transition: transform 0.5s;
    }
    .form-body {
        overflow: auto;
        flex: 1;
        /deep/.van-form {
            .van-cell-group--inset {
                &:not(:last-child) {
                    // prettier-ignore
                    margin-bottom: 10PX;
                }
            }
            .van-cell {
                padding: 0;

                &.textarea,
                &.block {
                    display: block;
                    textarea {
                        padding: 15px;
                        text-align: left;
                        background: #f0f0f0;
                        border: 1px solid rgba(221, 221, 221, 1);
                        border-radius: 4px;
                    }
                }
            }
            .van-form-cell {
                // prettier-ignore
                padding: 10PX 18PX;

                &.my-custom {
                    padding-top: 0;
                    padding-bottom: 0;
                    .van-field__control--custom {
                        display: block;
                        min-height: 0;
                    }
                }
            }

            .custom-form-cell {
                &::before {
                    left: -9px;
                }
            }

            .van-form-cell-header {
                font-weight: bold;
                font-size: 18px;
            }
            .van-form-cell-left {
                display: flex;
            }
            .van-form-cell-top {
                display: inherit;

                .van-field__control--right {
                    text-align: left;
                    justify-content: flex-start;
                }

                .van-radio-group .van-radio--horizontal {
                    margin-left: 0;
                }
            }
            .van-cell__value {
                position: static;
            }
            .van-field__error-message {
                // position: absolute;
                // right: 3px;
                // bottom: 0;
                // z-index: 0;
                text-align: right;
                // prettier-ignore
                line-height: 20PX;
            }
        }
        &.not-form-foot-btns {
            // prettier-ignore
            margin-bottom: 16PX;
        }
    }
    .form-foot-btns {
        display: flex;
        align-items: center;
        justify-content: center;
        // prettier-ignore
        margin-top: 16PX;
        padding: 0 16px;
        height: 80px;
        background: #ffffff;
        box-shadow: 0 -1px 0 0 #dddddd;
        .van-button {
            flex: 1;
            border: 1px solid #cccccc;
            border-radius: 4px;
            color: #333333;
            text-align: center;
            letter-spacing: 0;
            font-size: 17px;
            &:not(:last-child) {
                margin-right: 9px;
            }
        }
        .confirm {
            border-radius: 4px;
            background-image: linear-gradient(270deg, #0d52f5 0%, #158dff 100%);
            color: #ffffff;
        }
    }
}
</style>
