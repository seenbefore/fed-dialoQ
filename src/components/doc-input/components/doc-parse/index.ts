import Vue from 'vue'
import { Message } from 'element-ui'
import axios from 'axios'
import { CONTROL_TYPE, isEmpty, parseJson, getApiFieldValue, parseStringFunction, isEmptyItem } from '../../service'

import EventEmitter from '../../bus/publishSubscribe'
import { DOCPARSE_EVENT } from './const'
type Trigger = 'change' | 'submit'

/**校验规则数据结构 */
interface Rule {
    /**必填 */
    required?: boolean
    /**提示语 */
    message: string
    handler: Function
    trigger: Trigger
}
interface LinkageWatcher {
    /**监听的值 */
    watch: string[]
    /**监听的值变化后的操作函数 */
    handler: (values: any) => any
    /**deep: 深度监听; immediate: 立即监听 */
    options?: { deep?: boolean; immediate?: boolean }
}
/**判断是否是联动监听器类型 */
function isLinkageWatcher(value: any): value is LinkageWatcher {
    const $value = value as LinkageWatcher
    return $value?.watch !== undefined && $value?.handler !== undefined
}

/**文书解析组件数据结构 */
export interface DocParse extends Vue {
    // submit(): Promise<void>
    validate(name?: string | string[]): Promise<void>
    // getRefField(name: string): any
    // resetValidation(name?: string | string[]): void
    // scrollToField(name: string, options?: boolean | ScrollIntoViewOptions): void
}
/**
 * 生成文书解析组件
 * @param docTemplate 文书模板
 * @param docConfig 文书配置
 * @returns
 */
export function generateDocParseComp(docTemplate: string | HTMLElement, docConfig: Record<string, any>, extraParams: Record<string, any>, httpRequest: any = axios, readonlyName: string) {
    const { template, propsMap } = parseTemplate(docTemplate, docConfig, extraParams, httpRequest, readonlyName)
    return {
        name: 'DocParse',
        template: template,
        props: {
            /**值 */
            value: {
                type: Object,
                default() {
                    return {}
                },
            },
        },
        data() {
            return {
                // 组件props集合
                propsMap: propsMap,
                // 表单值集合
                formData: {},
                /**监听器集合 */
                myWatchers: [],
            }
        },
        watch: {
            value: {
                handler(newV: Record<string, any>) {
                    this.formData = newV
                },
                deep: true,
                immediate: true,
            },
            formData: {
                handler(newV: Record<string, any>, oldV: Record<string, any>) {
                    this.$emit('input', newV)
                    EventEmitter.instance.emit(DOCPARSE_EVENT, newV)
                },
                deep: true,
            },
            propsMap: {
                handler(newV: Record<string, any>) {
                    this.initWatcher()
                },
                deep: true,
                immediate: true,
            },
        },
        methods: {
            /**
             * 校验表单
             * @param localteFirstError 定位到首个错误
             * @returns
             */
            async validateForm(localteFirstError = false, fieldName = '', trigger: Trigger = 'change') {
                const errors: any[] = []
                // 待校验队列
                const validateQueue = this.$children.filter((item: any) => {
                    const name = item.name || item.$attrs.name
                    return !fieldName || fieldName === name
                })
                // 循环队列，进行校验
                for (let i = 0; i < validateQueue.length; i++) {
                    const item: any = validateQueue[i]
                    if (typeof item.validateForm === 'function') {
                        const localteFirstError: boolean = errors.length === 0
                        const kidErrors: any[] = await item.validateForm(localteFirstError)
                        errors.push(...kidErrors)
                    }
                    item.$el?.classList.remove('error')
                    const name = item.name || item.$attrs.name
                    const rules = this.getFieldRules(this.propsMap[name], trigger)
                    rules.some((rule: Rule) => {
                        // if (rule.required && isEmpty(this.formData[name])) {
                        if (rule.handler({ value: this.formData[name] })) {
                            errors.push({ name, message: rule.message })
                            item.$el?.classList.add('error')
                            setTimeout(() => {
                                Message.error(rule.message)
                            })
                            if (localteFirstError && errors.length === 1) {
                                item.$el.scrollIntoView({ behavior: 'smooth' })
                            }
                            return true
                        }
                    })
                }
                return errors
            },
            /**表单校验，暴露api */
            async validate() {
                console.log('validate:>>>', this.formData)
                return new Promise((resolve, reject) => {
                    this.validateForm(true, '', 'submit').then((errors: any[]) => {
                        if (errors.length === 0) {
                            resolve({ errors, values: this.formData })
                        } else {
                            reject({ errors, values: this.formData })
                        }
                    })
                })
            },
            /**获取字段校验规则 */
            getFieldRules(field: any = {}, trigger: Trigger = 'change') {
                const { required, label, rules = [] } = field
                const rules_ = rules.map((rule: any) => ({
                    trigger: 'change',
                    ...rule,
                }))
                if (required) {
                    rules_.unshift({
                        handler({ value }: any) {
                            return isEmpty(value)
                        },
                        message: `【${label}】为必填项`,
                        trigger: 'change',
                    })
                }
                return trigger === 'submit' ? rules_ : rules_.filter((rule: Rule) => rule.trigger === trigger)
            },

            /**
             * 组件input事件
             * @param value 变化的值
             * @param name 变化的字段
             */
            oninput(value: any, name: string) {
                this.validateForm(false, name, 'change')
            },
            /**
             * 设置循环组件的值
             * @param value 值
             * @param field 字段
             * @param index 下标
             */
            setValue(value: any, field: any, index: number) {
                if (!Array.isArray(this.formData[field])) {
                    this.$set(this.formData, field, [])
                }
                this.$set(this.formData[field], index, value)
                this.oninput(value, '${key}')
            },

            /**初始化监听器 */
            initWatcher() {
                this.clearWatcher()
                Object.values(this.propsMap).forEach((config: any) => {
                    if (Object.values(config).length === 0) return
                    const { name, linkageRule } = config
                    if (isLinkageWatcher(linkageRule)) {
                        this.addWatcher(linkageRule, (result: any) => {
                            if (Object.prototype.toString.call(result) === '[object Object]') {
                                const { value, required, rules, readonly, options } = result
                                // 如果返回结果为undefined, 则认为不需要修改
                                if (typeof value !== 'undefined') {
                                    this.$set(this.formData, name, value)
                                }
                                if (readonly !== undefined) {
                                    this.$set(config, readonly, readonly)
                                }
                                if (required !== undefined) {
                                    this.$set(config, 'required', required)
                                }
                                if (rules !== undefined) {
                                    this.$set(config, rules, rules)
                                }
                                if (options !== undefined) {
                                    this.$set(config, options, options)
                                }
                            }
                        })
                    } else {
                        const { value, options } = linkageRule || {}
                        if (isLinkageWatcher(value)) {
                            this.addWatcher(value, (result: any) => {
                                if (result !== undefined) {
                                    this.formData[name] = result
                                }
                            })
                        }
                        if (isLinkageWatcher(options)) {
                            this.addWatcher(options, (result: any) => {
                                if (result !== undefined) {
                                    config.options = result
                                }
                            })
                        }
                    }
                })
            },
            /**添加监听器 */
            addWatcher(watcher: LinkageWatcher, callback: (result: any) => void) {
                const unwatch = this.$watch(
                    function() {
                        return watcher.watch.map((item: string) => this.formData[item])
                    },
                    async function(newV: any, oldV: any) {
                        try {
                            // 动态结果执行函数
                            const result: any = await watcher.handler({
                                values: this.formData,
                                fields: this.myFields,
                                fieldRefs: this.$refs.fieldRef,
                                http: httpRequest,
                                extraParams: extraParams,
                                getRefField: this.getRefField,
                                ctx: this,
                            })
                            // 如果返回结果为undefined, 则认为不需要修改
                            if (result !== undefined) {
                                callback(result)
                            }
                        } catch (error) {
                            Message.error((error as any).toString())
                        }
                    },
                    watcher.options,
                )
                this.myWatchers.push(unwatch)
            },
            /**清空监听器 */
            clearWatcher() {
                while (this.myWatchers.length) {
                    const myWatcher = this.myWatchers.pop()
                    myWatcher()
                }
            },
            /**获取文书配置数据 */
            getDocData() {
                return {
                    docConfig,
                    formData: this.formData,
                }
            },
        },
    }
}

/**
 * 解析文书模板
 * @param docTemplate
 * @param docConfig
 */
function parseTemplate(docTemplate: string | HTMLElement, docConfig: Record<string, any>, extraParams: Record<string, any>, httpRequest: any = axios, readonlyName: string) {
    // 1、创建dom节点，将html模板生成dom树
    let $container = document.createElement('div')
    if (docTemplate instanceof HTMLElement) {
        $container.appendChild(docTemplate)
    } else {
        $container.innerHTML = docTemplate
    }
    // 2、移除编辑按钮
    const $editBtns = $container.querySelectorAll('.edit-able')
    for (const editBtn of $editBtns) editBtn.remove()
    // 3、解析配置，注入对应组件及属性
    // 组件属性集合
    const propsMap: Record<string, any> = {}
    const $controlDoms = $container.querySelectorAll('.insert-elem')
    $controlDoms.forEach(controlDom => {
        // 标记已处理的不再处理
        if (Array.from(controlDom.classList).includes('processed')) return
        // 打上已处理的标记
        controlDom.classList.add('processed')
        const key = controlDom.getAttribute('data-key') || ''
        const configInfo = docConfig[key]
        // 无配置信息，中断此次循环
        if (!configInfo) return
        const { controlType, templateFieldEn } = configInfo
        switch (controlType) {
            case CONTROL_TYPE.CYCLE: {
                const key = controlDom.getAttribute('data-key') || ''
                const componentOptions = generateDocParseComp(controlDom.firstElementChild as HTMLElement, docConfig, extraParams, httpRequest, readonlyName)
                propsMap[key] = {
                    is: componentOptions,
                    name: key,
                }
                controlDom.innerHTML = `
                    <template v-for="(item, i) in formData.${key}">
                        <component
                            ref="fieldRef"
                            :value="item"
                            v-bind="propsMap.${key}"
                            @input="setValue($event, '${key}', i)"
                        ></component>
                    </template>
                    `
                return
            }
            default:
                getComponentInfo(propsMap, configInfo, extraParams, readonlyName)
        }
        if (Object.keys(propsMap[templateFieldEn] || {}).length) {
            controlDom.innerHTML = `
                <component
                    v-model="formData.${templateFieldEn}"
                    v-bind="propsMap.${templateFieldEn}"
                    ref="fieldRef"
                    @input="oninput($event, '${templateFieldEn}')"
                ></component>`
        }
    })
    return { template: $container.innerHTML, propsMap }
}

/**
 * 获取组件信息
 */
function getComponentInfo(propsMap: Record<string, any>, configInfo: Record<string, any>, extraParams: Record<string, any>, readonlyName: string) {
    const { controlType, templateFieldEn, templateFieldCn, isUnderline, controlConfigContent, isRequired, linkageRule, tableColumns, uploadApi } = configInfo
    const {
        defaultDisplayLen,
        maxLen,
        isEdit, // 默认控制是否只读的字段
        isEditOnModify, // 后期添加控制是否只读的字段
        timeShow,
        pickerType,
        textVal,
        height,
        width,
        float,
        fileType,
        fileSize,
        fileCount,
        placeholder,
        dateLimitRange,
        dateLimitRangeType,
        readonlyRule,
        readonlyRulePlaceholder,
    } = controlConfigContent
    // 只读 readonlyName = isEdit|isEditOnModify
    const readonly = (eval(readonlyName) ?? isEdit) == 0
    const notUnderline = isUnderline == 0 // 无下划线
    const required = isRequired == 1 // 必填
    switch (controlType) {
        case CONTROL_TYPE.INPUT: {
            propsMap[templateFieldEn] = {
                is: () => import('../my-inline-input/index.vue'),
                name: templateFieldEn,
                label: templateFieldCn,
                required: required,
                linkageRule: parseLinkageRule(linkageRule),
                readonly: readonly,
                allowNewline: true,
                defaultLength: Number(defaultDisplayLen) || 6,
                maxLength: Number(maxLen),
                notUnderline: notUnderline,
                placeholder: readonly ? '' : readonlyRulePlaceholder || placeholder || '请输入',
                readonlyRule,
            }
            break
        }
        case CONTROL_TYPE.NUMBER_INPUT: {
            propsMap[templateFieldEn] = {
                is: () => import('../my-inline-input/index.vue'),
                name: templateFieldEn,
                label: templateFieldCn,
                required: required,
                linkageRule: parseLinkageRule(linkageRule),
                readonly: readonly,
                defaultLength: Number(defaultDisplayLen) || 6,
                notUnderline: notUnderline,
                placeholder: readonly ? '' : '请输入',
                type: 'number',
                decimals: float,
            }
            break
        }
        case CONTROL_TYPE.DATETIME: {
            const timeShowTrim = (value: string) => {
                return /[年月日时分秒]/.test(value) ? value.replace(/(\s*)/g, '') : value
            }
            const [dateFormat, timeFormat] = timeShow.split(' ')
            const datehourminuteFormat = timeShow.slice(0, -3)
            const datehourFormat = timeShow.slice(0, -6)
            const valueFormat: Record<string, any> = {
                date: dateFormat,
                time: timeFormat,
                datetime: timeShowTrim(timeShow),
                datehourminute: timeShowTrim(datehourminuteFormat),
                datehour: timeShowTrim(datehourFormat),
                month: timeShowTrim(timeShow),
            }
            propsMap[templateFieldEn] = {
                is: () => import('../datetime-control/index.vue'),
                name: templateFieldEn,
                label: templateFieldCn,
                required: required,
                linkageRule: parseLinkageRule(linkageRule),
                readonly: readonly,
                valueFormat: valueFormat[pickerType],
                type: pickerType,
                dateLimitRange,
                dateLimitRangeType,
            }
            break
        }
        case CONTROL_TYPE.CHECKBOX: {
            propsMap[templateFieldEn] = {
                is: () => import('../checkbox-control/index.vue'),
                name: templateFieldEn,
                label: textVal,
                required: required,
                linkageRule: parseLinkageRule(linkageRule),
                readonly: readonly,
            }
            break
        }
        case CONTROL_TYPE.SELECT: {
            propsMap[templateFieldEn] = {
                is: () => import('../select-control/index.vue'),
                name: templateFieldEn,
                label: templateFieldCn,
                required: required,
                linkageRule: parseLinkageRule(linkageRule),
                readonly: readonly,
                options: parseEnumData(configInfo, extraParams),
            }
            break
        }
        case CONTROL_TYPE.IMAGE: {
            propsMap[templateFieldEn] = {
                is: () => import('../image-control/index.vue'),
                name: templateFieldEn,
                label: templateFieldCn,
                required: required,
                linkageRule: parseLinkageRule(linkageRule),
                width: width,
                height: height,
                configInfo,
            }
            break
        }
        case CONTROL_TYPE.TABLE: {
            const tableColumnMap: Record<string, any> = {}
            tableColumns.forEach((tableColumn: Record<string, any>) => {
                const { templateFieldEn, templateFieldCn, rowWidth, headTextAlign } = tableColumn
                tableColumn.controlConfigContent = parseJson(tableColumn.controlConfigContent, {})
                getComponentInfo(tableColumnMap, tableColumn, extraParams, readonlyName)
                tableColumnMap[templateFieldEn].rowWidth = rowWidth
                tableColumnMap[templateFieldEn].headTextAlign = headTextAlign
                tableColumnMap[templateFieldEn].columnName = templateFieldCn
            })
            propsMap[templateFieldEn] = {
                is: () => import('../table-control/index.vue'),
                name: templateFieldEn,
                label: templateFieldCn,
                required: required,
                linkageRule: parseLinkageRule(linkageRule),
                tableColumns: Object.values(tableColumnMap),
                rules: [
                    {
                        handler({ value }: any) {
                            // 存在空行
                            return !isEmpty(value) && value.some(isEmptyItem)
                        },
                        message: `【${templateFieldCn}】存在空行, 请先删除`,
                        trigger: 'submit',
                    },
                ],
            }
            break
        }
        case CONTROL_TYPE.UPLOAD: {
            const uploadApi_ = parseJson(uploadApi, {})
            const httpRequest = async (params: Record<string, any>) => {
                const formData = new FormData()
                formData.append('file', params.file)
                const resp = await getApiFieldValue(uploadApi_, extraParams, {}, (options: Record<string, any>) => {
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
                    const formData = new FormData()
                    options.data.file = params.file
                    Object.keys(options.data).forEach((key: string) => {
                        formData.append(key, options.data[key])
                    })
                    options.data = formData
                    options.onUploadProgress = function(event: any) {
                        params.file.percent = (event.loaded / event.total) * 100
                        params.onProgress(params.file)
                    }
                    return options
                })
                return resp
            }
            propsMap[templateFieldEn] = {
                is: () => import('../upload-control/index.vue'),
                name: templateFieldEn,
                label: templateFieldCn,
                required: required,
                linkageRule: parseLinkageRule(linkageRule),
                disabled: readonly,
                httpRequest: httpRequest,
                limitSize: Number(fileSize || Infinity),
                accept: fileType,
                limit: Number(fileCount || Infinity),
            }
            break
        }
    }
}

/**
 * 解析枚举数据
 * @param configInfo 字段配置信息
 * @param extraParams 额外参数
 * @returns
 */
function parseEnumData(configInfo: any, extraParams: Record<string, any>) {
    const { enumDataSource, enumGenerateRule } = configInfo
    if (enumDataSource === 'SOURCE_ARTIFICIAL') {
        const options = parseJson(enumGenerateRule, [])
        return options
    } else if (enumDataSource === 'SOURCE_API') {
        const enumGenerateRule_ = parseJson(enumGenerateRule, {})
        const asyncOptions = async () => getApiFieldValue(enumGenerateRule_, extraParams)
        return asyncOptions
    }
    return []
}

/**解析联动规则 */
function parseLinkageRule(linkageRule: any) {
    if (!linkageRule) return {}
    return parseStringFunction(linkageRule)
}
