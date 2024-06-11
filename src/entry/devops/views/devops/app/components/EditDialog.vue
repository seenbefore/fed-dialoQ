<!-- 编辑应用 -->
<template>
    <el-dialog class="AppEditDialog" :title="dialogTitle" visible width="1000px" @close="cancel">
        <!-- {{ formModel }} -->
        <sg-base-form ref="form" v-bind="getFormAttrs" v-model="formModel" v-if="getFormAttrs" v-loading="initLoading"></sg-base-form>
        <template v-slot:footer>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm" :loading="loading" :disabled="initLoading">保存</el-button>
        </template>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormRef, FormRow } from '@/sharegood-ui'
import { UserService, PipelineService } from '@/entry/devops/api/index'
import { http } from '@/entry/devops/scripts/http'
import { useImagePreview } from '@/components/image-preview/hooks/useImagePreview'
import { userStore } from '@/entry/devops/store/useStore'
export enum OPERA_TYPE {
    /**新建 */
    CREATE = 'create',
    /**修改 */
    MODIFY = 'modify',
}
@Component({
    components: {},
})
export default class AppEditDialog extends Vue {
    @Prop({ default: '' }) name!: string
    /**
     * 数据初始化标识
     */
    hasInit = false
    initLoading = false
    loading = false
    async created() {
        try {
            this.initLoading = true
            await Promise.all([this.syncUserOptions(), this.syncData()])
        } catch (error) {
        } finally {
            this.initLoading = false
            this.hasInit = true
        }
    }
    /**
     * 获取流水线详情
     */
    async syncData() {
        if (this.operaType === OPERA_TYPE.MODIFY && this.id) {
            try {
                const { id } = this
                const { data } = await PipelineService.get({ id })
                const config = data.config || {}

                //console.log(12345, this.parseData(data))
                this.$set(this.formModel, 'id', data.id)
                this.$set(this.formModel, 'name', data.name)
                this.$set(this.formModel, 'version', data.version ?? '')
                if (data.appType) {
                    this.$set(this.formModel, 'appType', data.appType.split(','))
                }

                this.$set(this.formModel, 'technology', data.technology ?? '')
                this.$set(this.formModel, 'frontendManagerA', data.frontendManagerA ?? '')
                this.$set(this.formModel, 'business', data.business ?? '')
                this.$set(this.formModel, 'developmentManager', data.developmentManager ?? '')
                this.$set(this.formModel, 'productManager', data.productManager ?? '')
                this.$set(this.formModel, 'deliveryManager', data.deliveryManager ?? '')
                this.$set(this.formModel, 'devopsManager', data.devopsManager ?? '')
                this.$set(this.formModel, 'frontendManagerB', data.frontendManagerB ?? '')
                this.$set(this.formModel, 'readme', data.readme ?? '')
                this.$set(this.formModel, 'projectName', data.projectName ?? '')
                this.$set(this.formModel, 'deploy_url', data.deploy_url ?? '')
                this.$set(this.formModel, 'prd_url', data.prd_url ?? '')
                if (data.cover_urls) {
                    this.$set(this.formModel, 'cover_urls', data.cover_urls)
                }
                if (!data.frontendManagerA && data.createdUser$) {
                    this.$set(this.formModel, 'frontendManagerA', data.createdUser$.name)
                }
                this.$set(this.formModel, 'resposity', config.resposity ?? '')
            } catch (err) {
                console.log(err)
            }
        }
    }
    async mounted() {}
    userOptions: any[] = []
    /**
     * 获取用户列表
     */
    async syncUserOptions() {
        if (this.userOptions.length) {
            return this.userOptions
        }
        let result = await UserService.getUserOptions()
        this.userOptions = result.map(item => {
            return {
                label: `${item.label}`,
                value: item.label,
                username: item.username,
            }
        })
        return this.userOptions
    }
    /**操作类型 */
    @Prop({ type: String, required: true, default: OPERA_TYPE.MODIFY })
    operaType!: OPERA_TYPE
    /** id */
    @Prop({ type: String, default: '', required: true })
    id!: string

    /**弹窗标题 */
    get dialogTitle() {
        const titleMap = {
            [OPERA_TYPE.CREATE]: '新增',
            [OPERA_TYPE.MODIFY]: '编辑-',
        }

        return titleMap[this.operaType] + this.name
    }

    @Ref('form')
    formRef!: FormRef
    /**表单值 */
    formModel: Record<string, any> = {}

    tableData: any = []
    /**
     * 表单配置
     */
    get getFormAttrs() {
        if (!this.hasInit) {
            return null
        }
        return {
            span: 6,
            size: 'small',
            labelWidth: '100px',
            fields: [
                {
                    columns: [
                        {
                            span: 12,
                            tag: 'input',
                            name: 'name',
                            label: '应用名称',
                            itemAttrs: {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                value: '',
                                placeholder: '请输入',
                            },
                        },
                        {
                            span: 6,
                            tag: 'select',
                            name: 'appType',
                            label: '应用类型',
                            itemAttrs: {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                placeholder: '可多选',
                                value: [],
                                multiple: true,
                                'collapse-tags': true,
                                options: () => {
                                    return [
                                        {
                                            label: '管理端',
                                            value: '管理端',
                                        },

                                        {
                                            label: '浙里办',
                                            value: '浙里办',
                                        },
                                        {
                                            label: '官网',
                                            value: '官网',
                                        },
                                        {
                                            label: '大屏',
                                            value: '大屏',
                                        },
                                        {
                                            label: 'DataV',
                                            value: 'DataV',
                                        },
                                        {
                                            label: '小程序',
                                            value: '小程序',
                                        },
                                        {
                                            label: '组件',
                                            value: '组件',
                                        },
                                        {
                                            label: '移动端APP',
                                            value: '移动端',
                                        },
                                        {
                                            label: '其他',
                                            value: '其他',
                                        },
                                    ]
                                },
                                onInput: (val, { formActionType }) => {
                                    if (this.operaType === OPERA_TYPE.CREATE) {
                                        if (val && val.includes('DataV')) {
                                            formActionType.setState({
                                                technology: 'other',
                                                developmentManager: '任天一',
                                            })
                                        }
                                    }
                                },
                            },
                        },
                        {
                            span: 6,
                            tag: 'input',
                            name: 'version',
                            label: '当前版本',
                            itemAttrs: {
                                rules: [
                                    {
                                        validator: (rule: any, value: string, callback: any) => {
                                            const pattern = /^\d+\.\d+\.\d+(\.\d+)?$/

                                            if (value && !pattern.test(value)) {
                                                callback(new Error('版本号格式错误 比如 1.9.2或1.9.2.11'))
                                                return
                                            }

                                            callback()
                                        },
                                    },
                                ],
                            },
                            attrs: {
                                value: '',
                                placeholder: '如 3.0.0',
                            },
                        },
                        {
                            tag: 'select',
                            name: 'business',
                            label: '业务部门',
                            itemAttrs: {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                options: () => {
                                    return [
                                        {
                                            label: '交付一部',
                                            value: '交付一部',
                                        },
                                        {
                                            label: '交付二部',
                                            value: '交付二部',
                                        },
                                        {
                                            label: '交付三部',
                                            value: '交付三部',
                                        },
                                        {
                                            label: '交付四部',
                                            value: '交付四部',
                                        },
                                        {
                                            label: '交付五部',
                                            value: '交付五部',
                                        },
                                    ]
                                },
                            },
                        },
                        {
                            tag: 'select',
                            name: 'technology',
                            label: '技术选型',
                            itemAttrs: {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                options: () => {
                                    return [
                                        {
                                            label: 'vue',
                                            value: 'vue',
                                        },
                                        {
                                            label: 'angular',
                                            value: 'angular',
                                        },
                                        {
                                            label: 'react',
                                            value: 'react',
                                        },
                                        {
                                            label: 'other',
                                            value: 'other',
                                        },
                                    ]
                                },
                            },
                        },
                        {
                            tag: 'select',
                            name: 'frontendManagerA',
                            label: '前端A岗',
                            itemAttrs: {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                value: this.operaType === OPERA_TYPE.CREATE ? userStore.info.name : '',
                                filterable: true,
                                'value-key': 'label',
                                isFilterValue: true,
                                'default-first-option': true,
                                options: async () => {
                                    return this.userOptions
                                },
                            },
                        },

                        {
                            tag: 'select',
                            name: 'developmentManager',
                            label: '后端负责',
                            itemAttrs: {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                filterable: true,
                                'value-key': 'label',
                                isFilterValue: true,
                                'default-first-option': true,
                                options: async () => {
                                    return this.userOptions
                                },
                            },
                        },
                        {
                            tag: 'select',
                            name: 'productManager',
                            label: '产品经理',
                            itemAttrs: {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                filterable: true,
                                'value-key': 'label',
                                isFilterValue: true,
                                'default-first-option': true,
                                options: async () => {
                                    return this.userOptions
                                },
                            },
                        },
                        {
                            tag: 'select',
                            name: 'deliveryManager',
                            label: '交付经理',
                            itemAttrs: {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                filterable: true,
                                'value-key': 'label',
                                isFilterValue: true,
                                'default-first-option': true,
                                options: async () => {
                                    return this.userOptions
                                },
                            },
                        },
                        {
                            tag: 'select',
                            name: 'frontendManagerB',
                            label: '前端B岗',
                            itemAttrs: {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                filterable: true,
                                'value-key': 'label',
                                isFilterValue: true,
                                'default-first-option': true,
                                options: async () => {
                                    return this.userOptions
                                },
                            },
                        },

                        {
                            tag: 'select',
                            name: 'devopsManager',
                            label: '运维负责',
                            itemAttrs: {
                                // rules: [
                                //     {
                                //         required: true,
                                //         message: '必填',
                                //     },
                                // ],
                            },
                            attrs: {
                                filterable: true,
                                'value-key': 'label',
                                isFilterValue: true,
                                'default-first-option': true,
                                options: async () => {
                                    return this.userOptions
                                },
                            },
                        },

                        {
                            span: 24,
                            tag: 'autocomplete',
                            name: 'resposity',
                            itemAttrs: {
                                label: 'git仓库',
                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                debounce: 0,
                                'highlight-first-item': true,
                                'trigger-on-focus': true,
                                placeholder: '请填写 比如 vue-ts-template 然后选中查询结果',
                                'popper-class': 'customer-autocomplete',

                                listeners: {
                                    select: (val: any) => {
                                        //this.handleSelectGit(val.option)
                                    },
                                },
                                load: () => {
                                    const value = this.formModel.resposity
                                    if (!value) {
                                        return Promise.resolve([])
                                    }
                                    const arr = value.split('/')
                                    const name = arr[arr.length - 1].replace('.git', '')

                                    return PipelineService.projects({
                                        id: name,
                                    }).then(res => {
                                        const result = res.data
                                        return result.map((option: any) => ({
                                            option,
                                            label: option.path_with_namespace,
                                            value: option.resposity,
                                        }))
                                    })
                                },
                                defaultSlotRender(h, { row }) {
                                    const option = row.option
                                    return [
                                        h(
                                            'div',
                                            {
                                                class: 'row',
                                            },
                                            [
                                                h(
                                                    'div',
                                                    {
                                                        class: 'customerName',
                                                    },
                                                    [option.resposity],
                                                ),

                                                h(
                                                    'div',
                                                    {
                                                        class: 'addressDetail',
                                                    },
                                                    [option.description],
                                                ),
                                            ],
                                        ),
                                    ]
                                },
                            },
                            ifRender: ({ appType }) => {
                                if (appType && appType.includes('DataV')) {
                                    return false
                                }
                                return true
                            },
                        },
                        {
                            span: 12,
                            tag: 'input',
                            name: 'deploy_url',
                            label: '运维地址',
                            itemAttrs: {
                                rules: [
                                    // {
                                    //     required: true,
                                    //     message: '必填',
                                    // },
                                ],
                            },
                            attrs: {
                                placeholder: 'jenkins打包构建地址或jenkins任务名称',
                            },
                        },
                        {
                            span: 12,
                            tag: 'input',
                            name: 'prd_url',
                            label: '正式地址',
                            itemAttrs: {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                value: '',
                                placeholder: '正式环境访问链接',
                            },
                            ifRender: ({ appType }) => {
                                if (appType && appType.includes('DataV')) {
                                    return true
                                }
                                return false
                            },
                        },

                        {
                            span: 12,
                            tag: 'input',
                            name: 'projectName',
                            label: '归属项目',
                            itemAttrs: {
                                rules: [],
                            },
                            attrs: {
                                value: '',
                                placeholder: '请从仓颉中获取完整项目名称',
                            },
                        },

                        {
                            span: 24,
                            tag: 'uploader',
                            name: 'cover_urls',
                            itemAttrs: {
                                label: '封面(多张)',
                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                value: [],
                                multiple: true,
                                accept: '.png,.jpg,.jpeg,.gif',
                                'list-type': 'picture-card',
                                'http-request': async ({ file, filename, onProgress }: any) => {
                                    const formData = new FormData()
                                    formData.append('file', file)

                                    const { data } = await http.request({
                                        url: '/open/upload',
                                        data: formData,
                                        method: 'post',
                                        headers: {
                                            'content-type': 'multipart/form-data',
                                        },
                                        onUploadProgress: (progressEvent: any) => {
                                            const complete = parseInt((progressEvent.loaded / progressEvent.total) * 100 + '', 10)

                                            // 重点二：onProgress()方法需要以上方接收的形参来调用
                                            // 这个方法有一个参数"percent"，给他进度值 complete 即可
                                            onProgress({ percent: complete })
                                        },
                                    })

                                    return data.url
                                },
                                onPreview: (file: any) => {
                                    useImagePreview(file.url)
                                },
                            },
                            formatData: (val, { name }) => {
                                let cover_urls: any[] = []
                                if (Array.isArray(val)) {
                                    cover_urls = val.map(item => {
                                        return {
                                            name: item.name,
                                            url: item.url,
                                        }
                                    })
                                }

                                return {
                                    cover_urls,
                                }
                            },
                            // ifRender({ appType }) {
                            //     return appType.includes('大屏')
                            // },
                        },
                        {
                            span: 24,
                            tag: 'custom',
                            custom: 'mavon-editor',
                            name: 'readme',
                            itemAttrs: {
                                label: '发布流程',

                                rules: [
                                    {
                                        required: true,
                                        message: '必填',
                                    },
                                ],
                            },
                            attrs: {
                                placeholder: '请填写必要的正式发布流程...',
                                subfield: true,
                                toolbarsFlag: true,
                                defaultOpen: null,
                                editable: true,
                                autofocus: false,
                                toolbars: {
                                    bold: true, // 粗体
                                    //italic: true, // 斜体
                                    header: true, // 标题
                                    underline: true, // 下划线
                                    strikethrough: true, // 中划线
                                    mark: true, // 标记
                                    //superscript: true, // 上角标
                                    //subscript: true, // 下角标
                                    quote: true, // 引用
                                    ol: true, // 有序列表
                                    ul: true, // 无序列表
                                    link: true, // 链接
                                    //imagelink: true, // 图片链接
                                    code: false, // code
                                    table: true, // 表格
                                    fullscreen: true, // 全屏编辑
                                    readmodel: true, // 沉浸式阅读
                                    htmlcode: true, // 展示html源码
                                    //help: true, // 帮助
                                    /* 1.3.5 */
                                    //undo: true, // 上一步
                                    //redo: true, // 下一步
                                    //trash: true, // 清空
                                    //save: true, // 保存（触发events中的save事件）
                                    /* 1.4.2 */
                                    navigation: true, // 导航目录
                                    /* 2.1.8 */
                                    alignleft: true, // 左对齐
                                    aligncenter: true, // 居中
                                    alignright: true, // 右对齐
                                    /* 2.2.1 */
                                    subfield: true, // 单双栏模式
                                    preview: true,
                                },
                            },
                            ifRender: ({ appType }) => {
                                if (appType && appType.includes('DataV')) {
                                    return false
                                }
                                return true
                            },
                        },
                    ],
                },
            ] as FormRow[],
        }
    }
    cancel() {
        this.$options.cancel?.()
    }

    async confirm() {
        try {
            await this.formRef.validate()

            const payload = this.formRef.getState()
            const { resposity, ...rest } = payload
            this.loading = true
            const appType = payload.appType?.join(',')
            if (this.operaType === OPERA_TYPE.MODIFY) {
                await PipelineService.update({
                    ...rest,
                    appType,
                    config: {
                        resposity,
                    },
                }).finally(() => (this.loading = false))
            } else {
                const {
                    data: { id },
                } = await PipelineService.create(payload)
                await PipelineService.update({
                    id,
                    ...rest,
                    appType,
                    config: {
                        resposity,
                    },
                }).finally(() => (this.loading = false))
            }

            this.$message.success(`保存成功`)
            this.$options.confirm?.()
        } catch (error) {
            console.error(error)
        } finally {
            this.loading = false
        }
    }
}
</script>
<style lang="less" scoped>
::v-deep {
    .sg-data-form .el-form-item {
        margin-bottom: 8px;
    }
}
</style>
