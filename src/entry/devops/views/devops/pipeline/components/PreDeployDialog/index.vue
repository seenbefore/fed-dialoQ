<template>
    <el-dialog
        ref="dialog"
        :title="`立即构建-${title}`"
        visible
        class="pre-deploy-dialog"
        :fullscreen="false"
        :append-to-body="false"
        :close-on-click-modal="false"
        width="900px"
        v-bind="$attrs"
        @close="cancel"
    >
        <div class="pre-deploy-dialog__content" v-loading="View.loading">
            <!-- {{ formModel }} {{ meta.id }} -->
            <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" v-if="title">
                <template slot="previewUrl">
                    <a v-for="(item, index) in formModel.uat_urls" :key="index" class="sg-link" :href="item.url" target="_blank" v-text="item.name"></a>
                </template>
            </sg-base-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSubmit" :loading="getFormAttrs.loading || View.loading">立即构建</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormColumn, FormRef } from '@/sharegood-ui'
import { Pipeline, PipelineConfigTrigger } from '@/entry/devops/models'
import { formatCommands } from '@/entry/devops/utils'
import { appStore } from '@/entry/devops/store/useStore'
import { getTargetOptions } from '@/entry/devops/views/devops/pipeline/components/helper'

// - 🌟 更新 登录页、首页
// - 🐞 修复 vs code 使用 Vue
const ReleaseContentTPL = ``
interface FormModel {
    branch?: string
    target?: string
    previewUrl?: string
    [prop: string]: any
}
@Component({
    name: 'PreDeployDialog',
    components: {},
})
export default class PreDeployDialog extends Vue {
    @Prop({ type: String, default: '' }) target!: string
    @Prop({ type: Boolean }) visible!: boolean
    /**
     * 完成后是否自动跳转 默认跳到构建详情页
     */
    @Prop({ type: Boolean, default: true }) redirect!: boolean
    @Prop({ type: Object }) meta: any
    public $refs!: {
        formRef: FormRef
    }
    title = ''
    @Watch('formModel.target', { deep: true })
    onModelChange(val: string) {
        if (val && this.pipeline) {
            const target: any = val
            const pipeline = this.pipeline as Pipeline
            let { id, uat_urls = [] } = pipeline
            uat_urls = uat_urls.filter(item => item.target === this.formModel.target)

            this.formModel.uat_urls = uat_urls.length
                ? uat_urls
                : [
                      {
                          target,
                          name: `http://${id}.${target}.icinfo.co`,
                          url: `http://${id}.${target}.icinfo.co`,
                      },
                  ]
        } else {
            this.formModel.uat_urls = []
        }
    }
    triggers: PipelineConfigTrigger[] = []
    formModel: FormModel = {
        previewUrl: '',
        skipRemoveWorkspace: 0,
        skipBuild: 0,
        skipDeploy: 0,
        skipDependencies: 0,
        skipMergeMaster: 0,
        uat_urls: [],
        buildCommands$: '',
        masterBranch: '',
    }
    View = {
        branch: '',
        version: '',
        loading: false,
    }

    private pipeline: any
    getContext() {
        return this
    }
    getFormAttrs = {
        loading: false,
        labelWidth: '120px',
        span: 24,
        fields: [
            {
                span: 10,
                tag: 'select',
                name: 'target',
                itemAttrs: {
                    label: '目标环境',
                    rules: [
                        {
                            required: true,
                            message: '必填',
                        },
                    ],
                },
                attrs: {
                    filterable: true,
                    value: '',
                    options: [],
                    onChange: ({ value }) => {
                        const releaseContent$ = this.$refs.formRef.getFieldProps('releaseContent')
                        if (value === 'prd') {
                            releaseContent$.itemAttrs!.rules = [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ]
                            this.$set(this.formModel, 'releaseContent', ReleaseContentTPL)
                        } else {
                            releaseContent$.itemAttrs!.rules = []
                        }
                        this.$refs.formRef.clearValidate()
                    },
                    onInput: (val, { formActionType, formModel }) => {
                        const key = `${this.meta.id}&${val}`
                        let trigger = this.triggers.find(item => item.target === this.formModel.target)

                        if (trigger) {
                            //formActionType.setState('branch', trigger.branch)
                            // formModel.buildCommands = trigger.buildCommands && trigger.buildCommands.length ? trigger.buildCommands : formModel.buildCommands
                            // formModel.deployCommands = trigger.deployCommands && trigger.deployCommands.length ? trigger.deployCommands : formModel.deployCommands
                        } else {
                            //formActionType.setState('branch', '')
                        }

                        // if (Array.isArray(formModel.buildCommands)) {
                        //     let result = formModel.buildCommands.map((item: any) => {
                        //         return formatCommands(item, formModel)
                        //     })
                        //     formActionType.setState('buildCommands$', result.join(' '))
                        // }
                    },
                    appendSlotRender: h => {
                        if (!this.View.version) {
                            return
                        }
                        return [
                            h(
                                'el-tag',
                                {
                                    class: '',
                                },
                                [this.View.version],
                            ),
                        ]
                    },
                },
            },

            {
                span: 9,
                tag: 'select',
                name: 'branch',

                itemAttrs: {
                    label: '源分支',
                    class: 'sg-flexbox',
                    rules: [
                        {
                            required: true,
                            message: '必填',
                        },
                    ],
                },
                attrs: {
                    value: '',
                    placeholder: '请选择',

                    filterable: true,
                    options: () => {
                        const id = this.meta.id

                        return API.PipelineService.project_branches({
                            id,
                        })
                            .then(res => res.data)
                            .catch(() => {
                                return [
                                    {
                                        label: 'master',
                                        value: 'master',
                                    },
                                ]
                            })
                    },
                },
            },
            {
                span: 5,
                tag: 'custom',
                custom: 'el-switch',
                name: 'skipRemoveWorkspace',
                itemAttrs: {
                    labelWidth: '200px',
                    label: '保留构建空间',
                },
                attrs: {
                    'active-value': 1,
                    'inactive-value': 0,
                    'active-text': '',
                },
            },

            // {
            //     span: 24,
            //     tag: 'select',
            //     name: 'buildCommands',
            //     itemAttrs: {
            //         label: '构建命令',
            //         helpMessage: '允许单独构建某个命令',

            //     },
            //     attrs: {
            //         value: [],
            //         multiple: true,
            //         placeholder: '请选择',
            //         filterable: true,
            //         options: [],
            //     },
            // },
            {
                span: 24,
                tag: 'text',
                label: '构建命令',
                name: 'buildCommands$',
            },
            {
                span: 24,
                tag: 'text',
                label: '部署命令',
                name: 'deployCommands$',
            },

            {
                span: 6,
                tag: 'custom',
                custom: 'el-switch',
                name: 'skipDependencies',
                itemAttrs: {
                    label: '跳过安装依赖',
                },
                attrs: {
                    'active-value': 1,
                    'inactive-value': 0,
                    'active-text': '',
                },
            },
            {
                span: 6,
                tag: 'custom',
                custom: 'el-switch',
                name: 'skipBuild',
                itemAttrs: {
                    label: '跳过构建',
                },
                attrs: {
                    'active-value': 1,
                    'inactive-value': 0,
                    'active-text': '',
                },
            },
            {
                span: 6,
                tag: 'custom',
                custom: 'el-switch',
                name: 'skipDeploy',
                itemAttrs: {
                    label: '跳过部署',
                },
                attrs: {
                    'active-value': 1,
                    'inactive-value': 0,
                    'active-text': '',
                },
            },

            {
                tag: 'slot',
                slotName: 'previewUrl',
                itemAttrs: {
                    label: '访问地址',
                },
            },
            {
                span: 24,
                tag: 'custom',
                custom: 'el-switch',
                name: 'skipMergeMaster',
                itemAttrs: {
                    label: '合并分支',
                    helpMessage: '选中后将不再打tag，不再将当前分支合并到master',
                },
                attrs: {
                    'active-value': 1,
                    'inactive-value': 0,
                    'active-text': '取消合并',
                    //'inactive-text': `合并到分支${this.formModel.masterBranch || 'master'}`,
                },

                componentProps: ({ formModel: { masterBranch }, schema, formActionType }) => {
                    return {
                        attrs: {
                            'inactive-text': `合并到${masterBranch || 'master'}`,
                        },
                    }
                },

                ifRender(model) {
                    return model.target === 'prd'
                },
            },

            {
                span: 24,
                tag: 'input',
                name: 'releaseTitle',
                itemAttrs: {
                    label: 'tag版本',
                    rules: [
                        {
                            required: true,
                            message: '必填',
                        },
                        {
                            validator: (rule: any, value: string, callback: any) => {
                                const pattern = /^\d+\.\d+\.\d+(\.\d+)?$/
                                const version = this.View.version

                                if (!pattern.test(value)) {
                                    callback(new Error('版本号格式错误 比如 1.9.2或1.9.2.11'))
                                    return
                                }

                                callback()
                            },
                        },
                    ],
                },
                attrs: {
                    placeholder: '版本号 比如 1.0.0',
                    appendSlotRender: h => {
                        return [
                            // h(
                            //     'el-tag',
                            //     {
                            //         class: '',
                            //     },
                            //     [this.View.version],
                            // ),
                            h(
                                'el-button-group',
                                {
                                    class: 'sg-ml-3',
                                    attrs: {},
                                },
                                [
                                    h(
                                        'el-button',
                                        {
                                            class: '',
                                            attrs: {
                                                type: 'primary',
                                                size: 'mini',
                                            },
                                            on: {
                                                click: () => {
                                                    const { version } = this.View
                                                    const versionArr = version.replace('v', '').split('.')
                                                    let [major, minor, patch, build = 1] = versionArr as any
                                                    major = +major + 1
                                                    let releaseTitle = [major, minor, patch, build].slice(0, versionArr.length).join('.')
                                                    this.$set(this.formModel, 'releaseTitle', releaseTitle)
                                                },
                                            },
                                        },
                                        ['大版本'],
                                    ),
                                    h(
                                        'el-button',
                                        {
                                            class: '',
                                            attrs: {
                                                type: 'primary',
                                                size: 'mini',
                                            },
                                            on: {
                                                click: () => {
                                                    const { version } = this.View
                                                    const versionArr = version.replace('v', '').split('.')
                                                    let [major, minor, patch, build = 1] = versionArr as any
                                                    minor = +minor + 1
                                                    let releaseTitle = [major, minor, patch, build].slice(0, versionArr.length).join('.')
                                                    this.$set(this.formModel, 'releaseTitle', releaseTitle)
                                                },
                                            },
                                        },
                                        ['小版本'],
                                    ),
                                    h(
                                        'el-button',
                                        {
                                            class: '',
                                            attrs: {
                                                type: 'primary',
                                                size: 'mini',
                                            },
                                            on: {
                                                click: () => {
                                                    const { version } = this.View
                                                    const versionArr = version.replace('v', '').split('.')
                                                    let [major, minor, patch, build = 1] = versionArr as any
                                                    patch = +patch + 1
                                                    let releaseTitle = [major, minor, patch, build].slice(0, versionArr.length).join('.')
                                                    this.$set(this.formModel, 'releaseTitle', releaseTitle)
                                                },
                                            },
                                        },
                                        ['热修复'],
                                    ),
                                    h(
                                        'el-button',
                                        {
                                            class: '',
                                            attrs: {
                                                type: 'primary',
                                                size: 'mini',
                                            },
                                            on: {
                                                click: () => {
                                                    const { version } = this.View
                                                    const versionArr = version.replace('v', '').split('.')
                                                    let [major, minor, patch, build = 0] = versionArr as any
                                                    build = +build + 1
                                                    let releaseTitle = [major, minor, patch, build].join('.')
                                                    this.$set(this.formModel, 'releaseTitle', releaseTitle)
                                                },
                                            },
                                        },
                                        ['内部编译'],
                                    ),
                                ],
                            ),
                        ]
                    },
                },
                ifRender(model) {
                    return model.target === 'prd' && model.skipMergeMaster == 0
                },
            },
            {
                tag: 'custom',
                ifRender(model) {
                    return model.target === 'prd' && model.skipMergeMaster == 0
                },
                custom: 'mavon-editor',
                name: 'releaseContent',
                itemAttrs: {
                    value: '',
                    label: '构建内容',
                    rules: [
                        {
                            required: true,
                            message: '必填',
                        },
                    ],
                },
                attrs: {
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
            },
        ] as FormColumn[],
    }

    get myVisible() {
        return this.visible
    }
    set myVisible(val) {
        this.$emit('update:visible', val)
    }
    close() {
        this.myVisible = false
    }
    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm(true)
    }
    handleSubmit() {
        const ref = this.$refs.formRef
        const row = this.formModel

        ref.validate(async valid => {
            if (valid) {
                try {
                    const id = this.meta.id

                    const { target, releaseTitle, buildCommands, deployCommands, skipRemoveWorkspace, skipBuild, skipDeploy, skipDependencies, skipMergeMaster, buildCommands$ } = row

                    const payload: any = {
                        id,
                        ...row,
                        config: {
                            skipRemoveWorkspace,
                            skipBuild,
                            skipDeploy,
                            skipDependencies,
                            skipMergeMaster,
                        },
                    }
                    if (buildCommands) {
                        payload.config.buildCommands = buildCommands.map((item: any) => {
                            return formatCommands(item, this.formModel)
                        })
                    }
                    if (deployCommands) {
                        payload.config.deployCommands = deployCommands.map((item: any) => {
                            return formatCommands(item, this.formModel)
                        })
                    }
                    this.getFormAttrs.loading = true
                    // 发布生产需要更新版本
                    if (target === 'prd' && skipMergeMaster == 0) {
                        await API.PipelineService.update({
                            id,
                            version: releaseTitle,
                        })
                    }

                    const { data } = await API.PipelineService.run(payload)

                    const {
                        data: { logId },
                    } = await API.PipelineLogService.get({
                        id: data,
                    })

                    this.getFormAttrs.loading = false

                    if (this.redirect) {
                        this.$router.push({
                            path: `/devops/pipeline-log/${data}`,
                            query: {
                                _: `#${logId}${this.pipeline.name}`,
                            },
                        })
                    }
                    appStore.setCi({
                        [`${id}`]: {
                            target: row.target!,
                            branch: row.branch!,
                        },
                    })

                    this.confirm()
                } catch (err) {
                    this.getFormAttrs.loading = false
                }
            }
        })
    }
    async getLastestLog(id: string) {
        const { data: p } = await API.PipelineService.get({
            id,
        })
        if (p.version) {
            this.View.version = p.version
            return
        }
        const {
            data: { list },
        } = await API.PipelineLogService.list({
            conditions: {
                pipelineId: id,
                target: 'prd',
            },
        })
        this.View.version = list?.[0]?.releaseTitle ?? '1.0.0'
    }
    async created() {
        try {
            this.View.loading = true
            const id = this.meta.id
            await this.getLastestLog(id)

            const { data } = await API.PipelineService.get({ id })
            // 不同环境配置
            const triggers = data.config.triggers || []
            this.triggers.push(...triggers)

            const {
                data: { list },
            } = await API.PipelineLogService.list({
                conditions: {
                    pipelineId: id,
                },
            })
            if (list.length) {
                this.View.branch = list[0].branch
            }
            const { config } = data
            const target_urls = data.target_urls || []

            const uniqueArrayObjects = getTargetOptions({
                target_urls,
                triggers,
            })
            // 目标环境重新赋值
            const attrs = this.getFormAttrs.fields[0].attrs as any
            attrs.options.splice(0, attrs.options.length - 1)
            attrs.options = [...uniqueArrayObjects]

            this.title = data.name
            this.pipeline = data
            this.formModel.masterBranch = config.masterBranch ?? 'master'
            this.formModel.buildCommands = config.buildCommands
            this.formModel.skipRemoveWorkspace = config.skipRemoveWorkspace ?? 0

            this.$watch('formModel.target', (val: string) => {
                const formModel = this.formModel
                let trigger = triggers.find(item => item.target === val)
                //console.log(1234, val, trigger)
                if (trigger?.branch) {
                    this.formModel.branch = trigger?.branch
                }
                formModel.buildCommands = trigger?.buildCommands && trigger?.buildCommands.length ? trigger.buildCommands : config.buildCommands
                formModel.deployCommands = trigger?.deployCommands && trigger?.deployCommands.length ? trigger.deployCommands : config.deployCommands

                if (Array.isArray(formModel.buildCommands)) {
                    let result = formModel.buildCommands.map((item: any) => {
                        return formatCommands(item, this.formModel)
                    })
                    this.formModel.buildCommands$ = result.join(' ')
                }
                if (Array.isArray(formModel.deployCommands)) {
                    let result = formModel.deployCommands.map((item: any) => {
                        return formatCommands(item, this.formModel)
                    })
                    this.formModel.deployCommands$ = result.join(' ')
                }
            })
            if (data.trigger_target) {
                this.formModel.target = data.trigger_target
            }

            let trigger = triggers.find(item => item.target === this.formModel.target)
            if (trigger) {
                this.formModel.branch = trigger.branch
            }
            // 使用上次构建的配置
            if (appStore.ci?.[id] && !this.target) {
                Object.assign(this.formModel, {
                    branch: appStore.ci[id]['branch'],
                    target: appStore.ci[id]['target'],
                })
            }
            if (this.target) {
                Object.assign(this.formModel, {
                    target: this.target,
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            this.View.loading = false
        }
    }
    mounted() {}
}
</script>

<style lang="less" scoped>
.pre-deploy-dialog ::v-deep {
    .el-dialog__body {
        padding: 10px 20px;
    }

    .el-radio-group {
        padding-top: 12px;
    }
    .el-radio {
        display: block;
        margin-bottom: 10px;
    }

    .releaseTitle {
        .el-input {
            width: 200px;
        }
    }
}
</style>
