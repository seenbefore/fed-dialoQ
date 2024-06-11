<template>
    <div class="doc-form">
        <app-form class="base-app-form" ref="appForm" v-model="formData" :fields="myFields" :show-foot-btns="false" :http-request="httpRequest" :extra-params="extraParams"></app-form>
    </div>
</template>
<script lang="ts">
import { CustomFormatModel } from './extends/dataStore/CustomFormatModel'
import { useCustomFormatFieldsExtends } from './extends/useCustomFormatFieldsExtends'
import AppForm, { componentMap, Field } from '@/entry/h5/components/global/app-form/index.vue'
import http from '@/entry/h5/scripts/http'
import { formatDate, generateGUID } from 'icinfo-util'
import { get } from 'lodash'
import { Toast } from 'vant'
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import { getDocBaseInfo, getDocFormData, IDocParams } from './request'
import { CONTROL_TYPE, getApiFieldValue, getControlInfo, parseJson, parseStringFunction } from './utils'

const hiddenRuleFncCache = new Map<string, (formData: Record<string, any>) => boolean>()

enum DOC_STATUS {
    /**新建 */
    CREATE = '1',
    /**修改 */
    MODIFY = '2',
}
@Component({
    name: 'DocForm',
    components: { AppForm },
})
export default class DocForm extends Vue {
    /* 是否使用mock数据 */
    @Prop({ type: Boolean, default: false })
    public useMock!: boolean

    @Prop({ type: Object, default: '' })
    docParams!: IDocParams
    @Prop({
        type: Object,
        default: () => ({}),
    })
    dataMap!: any
    /** 自定义fields方法 */
    @Prop({
        default: () => async (fields: Record<string, any>) => fields,
    })
    public customFields!: (fields: Record<string, any>) => Promise<any>

    @Ref('appForm')
    public appForm!: AppForm

    // 本页面参数
    public loading = false
    // 额外参数，供配置的一些自定义方法使用
    public get extraParams() {
        return {
            userInfo: this.$store.state.app.userInfo,
            ...this.docParams,
        }
    }
    public httpRequest = http
    /**表单配置项信息 */
    public formOptionInfo: Record<string, any> = {}
    public myFields: Field[] = []
    public formData: Record<string, any> = {}
    public docStatus = DOC_STATUS.CREATE
    public docFormDataInfo: Record<string, any> = {}

    created() {
        this.initFormInfo()
    }

    /**初始化表单信息 */
    async initFormInfo() {
        const loading = Toast.loading({
            message: '文书解析中',
            duration: 0,
            forbidClick: true,
        })
        this.$once('hook:destroy', () => loading.close())
        const [formOptionInfo, formDataInfo] = await Promise.all([this.getFormOptionInfoApi(), this.getFormDataInfoApi()]).finally(() => loading.close())
        this.formOptionInfo = formOptionInfo
        // 处理表单配置
        const myFields = await useCustomFormatFieldsExtends(this.fieldsFormat(Object.values(this.formOptionInfo)), this.docParams, this)
        this.myFields = await this.customFields(myFields)
        // this.docStatus = (formDataInfo as any).operateType || DOC_STATUS.CREATE
        this.docStatus = DOC_STATUS.CREATE
        // dataMap 父组件传入表单数据，若无则取默认...这边代码逻辑太乱了，有可能就重写吧...
        this.formData = Object.keys(this.dataMap).length ? this.dataMap : (formDataInfo as any).dataMap || {}
        if (this.docStatus === DOC_STATUS.CREATE) {
            // 设置默认值
            await this.parseDefaultValue(Object.values(this.formOptionInfo))
        }
    }
    /**格式化字段数据 */
    fieldsFormat(fields: any[] = []): Field[] {
        return fields.reduce((acc: Field[], field: any) => {
            const {
                controlGroupName: groupName = '',
                controlGroupId: groupId,
                controlSort: sort,
                templateFieldCn: label,
                templateFieldEn: name,
                isRequired,
                isShowLabel,
                isShowOnPhone,
                linkageRule,
                hiddenRule,
            } = field
            const componentInfo = this.getComponentInfo(field)
            const { tag, props } = componentInfo
            const required = isRequired == '1'
            const hidden = isShowOnPhone == '0'
            const hiddenLabel = isShowLabel == '0'
            acc.push({
                groupId: groupId || generateGUID(),
                groupName,
                name,
                label,
                hiddenLabel,
                required,
                tag,
                props,
                sort,
                hidden,
                linkageRule: this.parseLinkageRule(linkageRule),
                ifRender: (formData: Record<string, any>) => this.getIfRender(hiddenRule, formData),
                slotRequired: required,
            } as any)
            return acc
        }, [])
    }
    /**获取组件信息 */
    getComponentInfo(field: any) {
        return getControlInfo(field, this)
    }
    /**解析枚举数据 */
    parseEnumData(field: any) {
        const { enumDataSource, enumGenerateRule } = field
        if (enumDataSource === 'SOURCE_ARTIFICIAL') {
            return parseJson(enumGenerateRule, [])
        } else if (enumDataSource === 'SOURCE_API') {
            const enumGenerateRule_ = parseJson(enumGenerateRule, {})
            return async () => getApiFieldValue(enumGenerateRule_, this.extraParams)
        }
        return []
    }
    /**解析默认值 */
    parseDefaultValue(fields: any[] = []) {
        const tasks: any[] = []
        fields.forEach((item: any) => {
            // 日期时间控件，且数据来源为"填表日"
            if (item.controlType === CONTROL_TYPE.DATETIME && item.autoDataSource === 'DATETIME_FILL_DAY') {
                const { timeShow, pickerType } = parseJson(item.controlConfigContent, {})
                const [dateFormat, timeFormat] = timeShow.split(' ')
                const valueFormat: Record<string, any> = {
                    date: dateFormat,
                    time: timeFormat,
                    datetime: timeShow,
                }
                const value = formatDate(new Date(), valueFormat[pickerType])
                this.$set(this.formData, item.templateFieldEn, value)
            }
            // “数据来源”为“API”
            else if (item.autoDataSource === 'SOURCE_API') {
                tasks.push(
                    (async () => {
                        const value = await getApiFieldValue(item.apiOptions, this.extraParams)
                        this.$set(this.formData, item.templateFieldEn, value)
                    })(),
                )
            }
            // 地图选址控件，且数据来源为"当前位置"
            else if (item.controlType === CONTROL_TYPE.MAP_ADDRESS && item.autoDataSource === 'DATETIME_CURRENT_LOCATIONFILL_DAY') {
                const value = this.$store.state.app.localInfo
                this.$set(this.formData, item.templateFieldEn, value)
            }
            // 从登录用户信息中获取数据
            else if (item.autoDataSource === 'LOGIN_USER_INFO') {
                const { userInfo } = this.$store.state.app
                const value = get(userInfo, item.dataGenerateRule)
                this.$set(this.formData, item.templateFieldEn, value)
            }
        })
        return Promise.all(tasks)
    }
    /**获取配置项信息接口 */
    async getFormOptionInfoApi() {
        try {
            if (this.useMock) {
                return require('./mock.json')
            }
            /* open dome data */
            // return require('./mock.json')
            /* close dome */
            const { data } = await getDocBaseInfo(this.docParams)
            this.$emit('emitGetDocBaseInfo', !!data?.htmlContent)
            return data.templateConfigMap || {}
        } catch (error) {
            this.$emit('emitGetDocBaseInfo', false)
        }
        return {}
    }
    /**获取表单数据信息接口 */
    async getFormDataInfoApi() {
        try {
            const { data } = await getDocFormData(this.docParams)
            this.docFormDataInfo = data
            return data
        } catch (error) {
            console.log(error)
        }
        return {}
    }
    /**解析联动规则 */
    parseLinkageRule(linkageRule: any) {
        if (!linkageRule) return {}
        return parseStringFunction(linkageRule)
    }

    public getIfRender(renderStr: string, formData: Record<string, any>): boolean {
        if (!renderStr) return true
        try {
            if (hiddenRuleFncCache.has(renderStr)) {
                const cachedFnc = hiddenRuleFncCache.get(renderStr)
                if (typeof cachedFnc === 'function') {
                    return cachedFnc(formData)
                } else {
                    console.log('从缓存中检索到的值不是一个函数')
                    return true // 或其他默认值
                }
            }
            const wrapper = new Function('', `return ${renderStr}`)
            const renderFnc = wrapper()
            hiddenRuleFncCache.set(renderStr, renderFnc)
            return renderFnc.call(null, formData)
        } catch (e) {
            console.log('【hiddenRuleFnc】解析失败', e)
            return true
        }
    }

    /**
     * 获取自定义组件的实例，用于进行自定义组件的校验和数据获取
     */
    public getCustomFields(): Array<{ name: string; instance: CustomFormatModel }> {
        return this.myFields.reduce((result: Array<{ name: string; instance: CustomFormatModel }>, field: Field) => {
            const { tag, name } = field ?? {}
            // 处理tag不是非定义的模块
            if (!Reflect.has(componentMap, tag)) {
                /* 有可能设置了新的 name，所以通过旧的 name 无法获取实例 */
                const instance = this.getRefField(name)
                instance &&
                    result.push({
                        name,
                        instance,
                    })
            }
            return result
        }, [])
    }

    /**表单校验 */
    public async validate() {
        /* 先走表单自己的校验，再走自定义校验 */
        return this.appForm.validate().then(() => {
            /* 进行自定义组件的校验 */
            return Promise.all(
                this.getCustomFields().map(({ instance }) => {
                    if (Reflect.has(instance, 'validate')) {
                        return instance.validate()
                    }
                    return Promise.resolve()
                }),
            )
        })
    }

    /**通过name获取对应组件的实例 */
    getRefField(name: string) {
        return this.appForm.getRefField(name)
    }

    /**
     * 获取表单数据
     */
    public getFormData() {
        return new Promise(resolve => {
            this.validate()
                .then(() => {
                    /* 获取自定义组件的值 */
                    const customFormData = this.getCustomFields().reduce((result: Record<string, any>, item) => {
                        const { name, instance } = item
                        if (Reflect.has(instance, 'getData')) {
                            const value = instance.getData()
                            /* 是否合并自定义组件的值 */
                            if (instance.useFieldNameByFormDataKey) {
                                Reflect.set(result, name, value)
                            } else {
                                const isObjectValue = typeof value === 'object'
                                if (isObjectValue) {
                                    Object.assign(result, value)
                                } else {
                                    console.warn(`${name} control formData is not object`)
                                }
                            }
                        }
                        return result
                    }, {} as Record<string, any>)
                    resolve({ formData: Object.assign({}, this.formData, customFormData), docFormDataInfo: this.docFormDataInfo })
                })
                .catch(() => {
                    console.error('表单校验失败')
                })
        })
    }
}
</script>

<style lang="less" scoped>
.doc-form {
    .app-form {
        ::v-deep {
            .form-body {
                .van-form {
                    .my-checkbox {
                        .van-checkbox--disabled {
                            .van-checkbox__icon {
                                .van-icon {
                                    background-color: #f0f0f0;
                                    border-color: #ddd;
                                }
                            }

                            .van-checkbox__icon--checked {
                                .van-icon {
                                    background-color: #c2c2c2;
                                    border-color: #c2c2c2;
                                }
                            }
                        }
                    }

                    .van-field--disabled {
                        .van-cell__title {
                            color: #646566;
                        }

                        .van-cell__value {
                            .van-field__body {
                                .van-field__control:disabled {
                                    color: #666;
                                    -webkit-text-fill-color: #666;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
