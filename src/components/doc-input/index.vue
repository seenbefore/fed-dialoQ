<template>
    <div class="sg-page page-doc-input" v-loading="loading" :element-loading-text="'模板解析中...'">
        <component ref="docParse" class="temp-html" :is="docComponentOptions" :value="formData"></component>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { formatDate, get } from 'icinfo-util'
import { getDocBaseInfo, getDocFormData, saveDocInfo, saveDocInfoAdditional, docPreview, DocumentCommonFormHtmlVo } from './service/punish/stagedoc/common'
import { saveCSourceDocInfo, getCSourceDocBaseInfo, getCSourceDocFormData } from './service/punish/csource/common'
import { saveExecuteDocInfo, getExecuteDocBaseInfo, getExecuteDocFormData } from './service/punish/execute/doc'
import { saveTemporary } from './service/punish/ucase/temporary'
import { CONTROL_TYPE } from './enum'
import { DocParse, generateDocParseComp } from './components/doc-parse'
import { getApiFieldValue, parseJson } from './service'
import http from '@/scripts/http'
import { isObject } from './util'
//import { mitoReportLog } from '@/entry/supervisionlaw/cus-report'
// import sealTooltip from '@/entry/supervisionlaw/components/SealTooltip/index'
export interface Docparams {
    // 案件ID
    caseId: string
    // 文书种类编码
    documentCatalogCode: string
    // 操作类型
    operateType?: string
    // 被送达文书id
    documentId?: string
    /**当事人id */
    partyId?: string
    [props: string]: any
}
enum DOC_STATUS {
    /**新建 */
    CREATE = '1',
    /**修改 */
    MODIFY = '2',
}
// 常量-来源
const SOURCES = ['sourceDetail', 'executeDetail'] //sourceDetail案源，executeDetail裁执分离，无则为案件办理

@Component({
    name: 'DocInput',
    components: {},
})
export default class DocInput extends Vue {
    @Prop({ type: Object, default: () => {} }) docParams!: Docparams
    // 控制只读的字段名称
    @Prop({ type: String, default: 'isEdit' }) readonlyName!: string
    // 自定义保存方法
    @Prop({ type: Boolean, default: false }) isCustomSaveHttp!: boolean
    // 自定义获取文书的方法(返回接口要和原始接口保持一致)
    @Prop({ type: Function, default: null }) customGetDocBaseInfo!: Function
    // 获取表单回显数据的自定义方法 补正更正
    @Prop({ type: Function, default: null }) customGetDocForm!: object
    // 获取DocForm内容需要的自定义参数
    @Prop({ type: Object, default: () => ({}) }) getParamsDocForm!: object
    // 暂存或保存时需要的自定义参数
    @Prop({ type: Object, default: () => ({}) }) cusTemporaryParams!: object
    // 对getDocFormData接口拿到的dataMap属性进行更改
    @Prop({ type: Object, default: () => ({}) }) cusDocFormData!: Record<string, any>
    // 父级对getDocFormData接口进行处理
    @Prop({ type: Function, default: null }) parentHandle!: Function

    // dom类型
    public $refs!: {
        docParse: DocParse
    }
    loading = false
    // 额外参数，供配置的一些自定义方法使用
    extraParams = {
        userInfo: this.$store.state.user.info,
        ...this.docParams,
    }
    /**往配置的自定义接口中，强制注入的参数（没有就清空此对象） */
    forceParams = {
        // 案件ID
        // partyId: this.docParams.handleType === '1' ? '' : this.docParams?.partyId,
        partyId: this.docParams?.partyId,
        caseId: this.docParams?.caseId,
        // 文书种类编码
        documentCatalogCode: this.docParams?.documentCatalogCode,
        beServedDocumentId: this.docParams?.documentId || this.docParams?.rowDocumentId,
    }
    httpRequest = http
    isSubmiting = false
    /**文书组件配置项 */
    docComponentOptions: any = null
    // 文书表单值
    formData: Record<string, any> = {}
    // 修改前的表单数据
    oldDocData: Record<string, any> = {
        formData: {},
        docConfig: {},
    }
    @Emit('emitLoading')
    emitLoading(loading) {
        return loading
    }
    @Watch('loading')
    watchLoading(newV) {
        this.emitLoading(newV)
    }
    async created() {
        this.initDocParseComp()
    }
    mounted() {
        /** 电子印章提示 */
        // sealTooltip('doc')
    }

    /**初始化文书解析组件 */
    async initDocParseComp() {
        this.loading = true
        try {
            // 1、获取文书配置信息
            const { sendData, httpApiName: httpApiBase } = this.assembleInitDocSendData('base')
            const { data: configInfo } = await httpApiBase(sendData)
            // 2、文书配置数据处理
            const { templateConfigMap = {}, htmlContent = '' } = configInfo || {}
            Object.values(templateConfigMap).forEach((item: any) => {
                item.controlConfigContent = parseJson(item.controlConfigContent, {})
            })
            // 储存一下修改前的表单配置
            this.oldDocData.docConfig = JSON.parse(JSON.stringify(templateConfigMap))
            // 3、生成文书解析组件
            this.docComponentOptions = generateDocParseComp(htmlContent, templateConfigMap, this.extraParams, this.httpRequest, this.readonlyName)
            // 4、获取文书表单数据
            const { httpApiName: httpApiForm } = this.assembleInitDocSendData('form')
            const { data } = await httpApiForm({
                ...sendData,
                ...this.getParamsDocForm,
            })
            const docStatus = data.operateType || DOC_STATUS.CREATE
            const cusDocFormDataKeys = Object.keys(this.cusDocFormData)
            //对于文书接口获取的数据每值的情况, 赋默认值
            if (isObject(data.dataMap) && cusDocFormDataKeys.length > 0) {
                cusDocFormDataKeys.forEach(key => {
                    if (key in data.dataMap && !data.dataMap[key]) {
                        data.dataMap[key] = this.cusDocFormData[key] || ''
                    }
                })
            }
            this.formData = this.handleDataMap(data.dataMap || {}, configInfo)
            if (this.parentHandle) {
                this.formData = this.parentHandle(data, configInfo)
            }
            // 储存一下修改前的文书表单值
            this.oldDocData.formData = JSON.parse(JSON.stringify(this.formData))
            // 5、新建状态，初始化默认值
            if (docStatus === DOC_STATUS.CREATE) {
                // 设置默认值
                await this.parseDefaultValue(Object.values(templateConfigMap))
                // 储存一下修改前的文书表单值
                this.oldDocData.formData = JSON.parse(JSON.stringify(this.formData))
            }
        } catch (error) {
            console.log('初始化文书解析组件出错>>>', error)
        }
        this.loading = false
    }
    /**处理dataMap */
    handleDataMap(dataMap: Record<string, any>, configInfo: DocumentCommonFormHtmlVo) {
        try {
            const { templateConfigMap = {} } = configInfo || {}
            Object.keys(dataMap).forEach(key => {
                if (key in templateConfigMap) {
                    const configMapByKey = templateConfigMap[key]
                    //处理table赋默认值的情况
                    if (configMapByKey.controlType === CONTROL_TYPE.TABLE && dataMap[key] && typeof dataMap[key] === 'string') {
                        dataMap[key] = JSON.parse(dataMap[key])
                    }
                }
            })
            return dataMap
        } catch (error) {
            console.log('处理dataMap出错>>>', error)
            return dataMap
        }
    }
    /**解析默认值 */
    async parseDefaultValue(fields: any[] = []) {
        const { caseId, executeId, sourcePage } = this.docParams
        const tasks: any[] = []
        fields.forEach((item: any) => {
            // 日期时间控件，且数据来源为"填表日"
            // if (
            //     item.controlType === CONTROL_TYPE.DATETIME &&
            //     item.autoDataSource === 'DATETIME_FILL_DAY'
            // ) {
            //     const { timeShow, pickerType } = item.controlConfigContent
            //     const [dateFormat, timeFormat] = timeShow.split(' ')
            //     const valueFormat: Record<string, any> = {
            //         date: dateFormat,
            //         time: timeFormat,
            //         datetime: timeShow,
            //     }
            //     const value = formatDate(new Date(), valueFormat[pickerType])
            //     this.$set(this.formData, item.templateFieldEn, value)
            // }
            // 日期时间控件
            if (item.controlType === CONTROL_TYPE.DATETIME && item.autoDataSource === 'DATETIME_FILL_DAY') {
                const { timeShow, pickerType } = item.controlConfigContent
                const [dateFormat, timeFormat] = timeShow.split(' ')
                const datehourminute = timeShow.slice(0, timeShow.search('ss'))
                const datehour = timeShow.slice(0, timeShow.search('HH'))
                const valueFormat: Record<string, any> = {
                    date: dateFormat,
                    time: timeFormat,
                    datetime: timeShow,
                    datehourminute, // datehourminute 时间类型 只取 年月日时分。
                    datehour, // datehourminute 时间类型 只取 年月日时。
                }
                //数据来源为"填表日"
                if (item.autoDataSource === 'DATETIME_FILL_DAY') {
                    const value = formatDate(new Date(), valueFormat[pickerType])
                    this.$set(this.formData, item.templateFieldEn, value)
                    // 时间有值，格式化一下日期
                } else if (this.formData[item.templateFieldEn]) {
                    const value = formatDate(
                        new Date(
                            this.formData[item.templateFieldEn]
                                .replace(/[年月]/g, '-')
                                .replace(/[时分]/g, ':')
                                .replace(/[日]/g, ' ')
                                .replace(/[秒]/g, ''),
                        ),
                        valueFormat[pickerType],
                    )
                    this.$set(this.formData, item.templateFieldEn, value)
                }
            }
            // “数据来源”为“API”
            else if (item.autoDataSource === 'SOURCE_API') {
                //来自案源时，添加caseSourceId参数
                if (sourcePage === SOURCES[0]) {
                    Object.assign(this.forceParams, { caseSourceId: caseId })
                }
                //来自裁执分离
                if (sourcePage === SOURCES[1]) {
                    Object.assign(this.forceParams, {
                        executeId: executeId || caseId,
                    })
                }
                tasks.push(
                    (async () => {
                        const value = await getApiFieldValue(item.apiOptions, this.extraParams, this.forceParams)
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

    public getSendData(fileList?: any[], tabIndex?: number): Promise<{ tabIndex?: number; values: any; sendData: Record<string, any> }> {
        return new Promise(resolve => {
            this.$refs.docParse.validate().then(({ values }: any) => {
                const { sendData } = this.assembleSaveDocSendData(values, fileList || [])
                return resolve({
                    tabIndex,
                    values,
                    sendData,
                })
            })
        })
    }

    /**保存提交 */
    saveData(fileList?: any[], tabIndex?: number) {
        return new Promise((resolve, reject) => {
            if (this.isSubmiting) {
                this.$message.warning('正在提交中，请稍候...')
                reject()
            } else {
                this.$refs.docParse
                    .validate()
                    .then(({ values }: any) => {
                        const { sendData, httpApiName: httpApiSave } = this.assembleSaveDocSendData(values, fileList || [])
                        if (this.isCustomSaveHttp) {
                            this.$emit('emitDataMap', tabIndex, values, sendData, resolve)
                            return
                        }
                        this.isSubmiting = true
                        httpApiSave({ ...sendData, ...this.cusTemporaryParams })
                            .then((res: any) => {
                                //mitoReportLog({ sendData, requestUrl: '/common/saveDocInfo' })
                                this.isSubmiting = false
                                resolve(res.data)
                            })
                            .catch(() => {
                                this.isSubmiting = false
                                reject(false)
                            })
                    })
                    .catch(({ errors }: any) => {
                        this.$emit('emitDataMap', -1, false)
                        reject(this.docParams)
                    })
            }
        })
    }
    /*** 暂存 */
    temporaryData(fileList?: any[]) {
        return new Promise((resolve, reject) => {
            this.$refs.docParse.validate().then(({ values }: any) => {
                saveTemporary({
                    partyId: this.docParams?.partyId || '',
                    caseId: this.docParams?.caseId || '',
                    documentCatalogCode: this.docParams?.documentCatalogCode || '',
                    dataMap: values,
                    documentId: this.docParams?.documentId,
                    appendixList: fileList || [],
                    caseAssistId: this.docParams?.caseAssistId || '',
                    ...this.cusTemporaryParams,
                })
                    .then(() => {
                        this.$message.success('已暂存')
                        resolve(true)
                    })
                    .catch(() => {
                        reject(false)
                    })
            })
        })
    }
    /*** 预览 */
    docPreview() {
        return new Promise((resolve, reject) => {
            this.$refs.docParse
                .validate()
                .then(({ values }: any) => {
                    this.isSubmiting = true
                    docPreview({
                        caseId: this.docParams?.caseId || '',
                        documentCatalogCode: this.docParams?.documentCatalogCode || '',
                        dataMap: values,
                    })
                        .then(res => {
                            this.isSubmiting = false
                            res.data.dataMap = values
                            resolve(res)
                        })
                        .catch(err => {
                            this.isSubmiting = false
                            reject(false)
                        })
                })
                .catch(({ errors }: any) => {
                    reject(false)
                })
        })
    }

    /********************* 工具函数 */
    // 处理获取文书数据接口和入参
    assembleInitDocSendData(type: string) {
        // 1、获取文书配置信息
        const {
            sourcePage,
            isNeedApproval,
            caseId,
            executeId,
            partyId,
            documentCatalogCode,
            documentId,
            operateType,
            documentTemplateCode,
            surveyPeopleId,
            documentKindCode,
            templateCode,
        } = this.docParams
        console.log(this.docParams, '11')
        let sendData: Record<string, any> = {
            // partyId: this.docParams.handleType === '1' ? '' : partyId,
            partyId: partyId || '',
            documentCatalogCode: documentCatalogCode,
            documentId: documentId,
            operateType: operateType || '',
            documentTemplateCode: documentTemplateCode || '',
            surveyPeopleId: surveyPeopleId || '',
            templateCode,
        }
        let httpApiName: any = ''
        // 判断来源
        // || (isNeedApproval == '1' && documentKindCode === 'DK1SXFZAJYSSPB'))
        if (sourcePage === SOURCES[0]) {
            // 案源
            if (documentKindCode === 'DT2BYLASPB') {
                sendData.caseId = caseId
                httpApiName = type === 'base' ? getDocBaseInfo : this.customGetDocForm || getDocFormData
            } else {
                sendData.caseSourceId = caseId
                httpApiName = type === 'base' ? getCSourceDocBaseInfo : getCSourceDocFormData
            }
        } else if (sourcePage === SOURCES[1]) {
            // 裁执分离
            sendData.executeId = executeId || caseId
            httpApiName = type === 'base' ? getExecuteDocBaseInfo : getExecuteDocFormData
        } else {
            // 案件办理
            sendData.caseId = caseId
            httpApiName = type === 'base' ? this.customGetDocBaseInfo || getDocBaseInfo : this.customGetDocForm || getDocFormData
        }
        return { sendData, httpApiName }
    }
    // 处理保存文书数据接口和入参
    assembleSaveDocSendData(values: any, fileList: any[]) {
        const { sourcePage, isNeedApproval, partyId, caseId, executeId, caseAssistId, documentCatalogCode, documentId, documentTemplateCode, additionalType } = this.docParams
        let sendData: Record<string, any> = {
            partyId: partyId || '',
            documentCatalogCode: documentCatalogCode || '',
            dataMap: values,
            belongDocumentId: documentId || '',
            appendixList: fileList || [],
            documentTemplateCode: documentTemplateCode || '',
        }
        let httpApiName: any = ''
        // if (sourcePage === SOURCES[0] && isNeedApproval !== '1') {
        //     // 案源
        //     sendData.caseSourceId = caseId
        //     httpApiName = saveCSourceDocInfo
        // } else if (sourcePage === SOURCES[1]) {
        //     // 裁执分离
        //     sendData.executeId = executeId || caseId
        //     httpApiName = saveExecuteDocInfo
        // } else {
        //     // 案件办理
        //     sendData.caseId = caseId
        //     sendData.caseAssistId = caseAssistId
        //     httpApiName = saveDocInfo
        // }
        console.log(sourcePage, SOURCES, isNeedApproval, additionalType)
        if (sourcePage === SOURCES[0] && isNeedApproval !== '1') {
            // 案源
            sendData.caseSourceId = caseId
            httpApiName = saveCSourceDocInfo
            return { sendData, httpApiName }
        }
        if (sourcePage === SOURCES[1]) {
            // 裁执分离
            sendData.executeId = executeId || caseId
            httpApiName = saveExecuteDocInfo
            return { sendData, httpApiName }
        }
        if (additionalType === '1') {
            // 案件补录
            sendData.caseId = caseId
            sendData.caseAssistId = caseAssistId
            httpApiName = saveDocInfoAdditional
            return { sendData, httpApiName }
        }
        // 案件办理
        sendData.caseId = caseId
        sendData.caseAssistId = caseAssistId
        httpApiName = saveDocInfo
        return { sendData, httpApiName }
    }
    /** 返回修改前的表单数据 */
    getOldDocData() {
        return this.oldDocData
    }
}
</script>

<style lang="less" scoped>
.page-doc-input {
    .fixed-footer {
        position: fixed;
        bottom: 0;
        padding: 10px;
        width: 100%;
        border-top: 1px solid #ddd;
        background: #fff;
        box-shadow: 0 0 5px #333;
        text-align: center;
    }
    /deep/ span[data-key] {
        white-space: pre-wrap;
    }
}
.temp-html {
    padding-bottom: 60px;
    ::v-deep {
        * {
            outline: none;
            word-break: break-all;
        }
        span.insert-elem {
            position: relative;
            outline: none;
            word-wrap: break-word;
            word-break: break-all;
            line-height: 1.25em;
            &[contenteditable='true'] {
                border-bottom: 1px solid #000;
            }
        }
        .error {
            // border: 1px solid red;
            outline: auto !important;
            outline-color: red !important;
            outline-offset: 0.33em;
        }
    }
}
</style>
