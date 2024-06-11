<template>
    <section class="sg-card app-form">
        <div class="sg-card-body">
            <!-- {{ FormView.model }} -->
            <sg-base-form class="column" ref="formRef" :fields="FormView.fields" v-model="FormView.model" @submit="onSubmit" label-width="160px" :span="24"></sg-base-form>
        </div>
        <div class="sg-card-foot">
            <el-button type="primary" @click="onSubmit" :loading="FormView.loading">保存</el-button>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { FormRow, FormRef } from '@/sharegood-ui'
import * as API from '@/entry/devops/api/index'
import { trim } from 'icinfo-util'
import { http } from '@/entry/devops/scripts/http'
import { MyMixins } from '@/entry/devops/mixins'

interface FormViewModelProps {
    resposity?: string
    id?: string
    projectId?: string
    http_url_to_repo?: string
    name?: string
    preview?: any
    [propName: string]: any
}
interface FormViewProps {
    loading: boolean
    model: FormViewModelProps
    fields: FormRow[]
}
@Component({
    name: 'DevopsPipelineEdit',
    components: {},
})
export default class DevopsPipelineEdit extends MyMixins {
    // @Prop() private title!:string
    // @Prop() private action!:string
    @Prop({
        default: () => {
            return {}
        },
    })
    meta!: FormViewModelProps

    @Prop({ default: false }) private isEdit!: boolean

    get title() {
        if (this.isEdit) {
            return '修改流水线'
        }
        return '创建流水线'
    }
    get submitText() {
        if (this.isEdit) {
            return '修改'
        }
        return '创建'
    }
    public $refs!: {
        formRef: FormRef
    }

    private FormView: FormViewProps = {
        loading: false,
        model: {
            // git项目id
            projectId: '',
            // 项目模板
            tpl: '',
            masterBranch: 'master',
        },
        fields: [
            // 基本信息
            {
                class: 'form-headline',
                columns: [
                    {
                        render: h => {
                            return [
                                h(
                                    'h2',
                                    {
                                        props: {},
                                        class: 'form-headline',
                                    },
                                    `基本信息`,
                                ),
                            ]
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'autocomplete',
                        name: 'projectName',
                        itemAttrs: {
                            label: '项目名称',
                            rules: [
                                // {
                                //     required: true,
                                //     message: '必填',
                                // },
                            ],
                        },
                        attrs: {
                            value: '',
                            //'value-key': 'name',
                            debounce: 500,
                            'highlight-first-item': true,
                            'trigger-on-focus': false,
                            placeholder: '支持模糊查询',

                            load: async (queryString: any) => {
                                return await http.get(`http://192.168.1.180:8081/component/getProjectList?projectName=${queryString}`).then((res: any) => {
                                    return res.data.map((item: any) => ({
                                        label: item.name,
                                        value: item.name,
                                    }))
                                })
                            },
                            // listeners:{
                            //     select:()=>{}
                            // }
                            onChange: ({ value, option = {} }) => {
                                // const { name } = this.FormView.model
                                // const { label } = option
                                // // 创建的时候
                                // if (!this.isEdit && value && label) {
                                //     this.$set(
                                //         this.FormView.model,
                                //         'name',
                                //         label,
                                //     )
                                // } else {
                                // }
                            },
                        },
                    },
                ],
            },

            {
                columns: [
                    {
                        tag: 'autocomplete',
                        name: 'resposity',
                        itemAttrs: {
                            helpMessage: '如果找不到项目，请确认项目成员中包含前端公共账号@fed-group，角色为Maintainer，否则就去创建项目仓库',
                            label: 'git仓库',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            disabled: !!this.isEdit,
                            debounce: 0,
                            'highlight-first-item': true,
                            'trigger-on-focus': true,
                            placeholder: '请填写 比如 vue-ts-template 然后选中查询结果',
                            'popper-class': 'customer-autocomplete',
                            onChange: option => {
                                const value: any = option.value || ''
                                if (!value) {
                                    this.FormView.model.projectId = ''
                                }
                            },
                            listeners: {
                                select: (val: any) => {
                                    this.handleSelectGit(val.option)
                                },
                            },
                            load: () => {
                                const value = this.FormView.model.resposity
                                if (!value) {
                                    return Promise.resolve([])
                                }
                                const arr = value.split('/')
                                const name = arr[arr.length - 1].replace('.git', '')

                                return API.PipelineService.projects({
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
                        appendRender: h => {
                            if (this.isEdit) {
                                return []
                            }
                            return [
                                h(
                                    'el-button',
                                    {
                                        props: {
                                            type: 'text',
                                        },
                                        class: '',
                                        style: '',
                                        on: {
                                            click: () => {
                                                this.$modalDialog(() => import(/* webpackChunkName: "PipelineProjectDialog" */ '../PipelineProjectDialog/index.vue'), {}).then(res => {
                                                    //this.onSubmit()
                                                    this.handleSelectGit(res)
                                                })
                                            },
                                        },
                                    },
                                    '新建仓库',
                                ),
                            ]
                        },
                    },
                ],
            },

            {
                columns: [
                    {
                        tag: 'input',
                        name: 'name',
                        itemAttrs: {
                            label: '应用名称',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            placeholder: '项目别名-xx端&xx端 (比如 管理端、门户端、移动端)',
                        },
                    },
                ],
            },

            {
                columns: [
                    {
                        tag: this.isEdit ? 'text' : 'input',
                        name: 'id',
                        itemAttrs: {
                            label: '应用id',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            disabled: !!this.isEdit,
                            placeholder: '英文、数字、下划线，且首字符必须是英文',
                            onChange: evt => {
                                const { value } = evt

                                this.$set(this.FormView.model, 'serverDir', value)
                            },
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'slot',
                        name: '代码仓库',
                        itemAttrs: {
                            label: '代码仓库',
                        },
                        render: (h, { row }) => {
                            return [
                                h(
                                    'a',
                                    {
                                        attrs: {
                                            href: row.http_url_to_repo,
                                            target: '_blank',
                                        },
                                        class: 'sg-link',
                                    },
                                    row.http_url_to_repo,
                                ),
                            ]
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'select',
                        name: 'trigger_target',
                        itemAttrs: {
                            label: '默认目标环境',
                        },
                        attrs: {
                            placeholder: '请选择',
                            options: [
                                {
                                    label: 'uat',
                                    value: 'uat',
                                },
                                {
                                    label: 'pre',
                                    value: 'pre',
                                },
                                {
                                    label: 'prd',
                                    value: 'prd',
                                },
                                {
                                    label: 'fat1',
                                    value: 'fat1',
                                },
                                {
                                    label: 'fat2',
                                    value: 'fat2',
                                },
                                {
                                    label: 'fat3',
                                    value: 'fat3',
                                },
                                {
                                    label: 'fat4',
                                    value: 'fat4',
                                },
                                {
                                    label: 'fat5',
                                    value: 'fat5',
                                },
                                {
                                    label: 'fat6',
                                    value: 'fat6',
                                },
                            ],
                        },
                        appendRender: h => {
                            return [h('div', { class: 'tip' }, ['默认构建环境，一般选uat，用于确定手动和自动构建时的首选环境'])]
                        },
                    },
                    {
                        tag: 'input',
                        name: 'trigger_branch',
                        itemAttrs: {
                            label: '默认分支规则',
                            helpMessage: `分支名称匹配正则时自动构建，比如 ^(dev|develop)$|(^dev-v\\d+\\.\\d+\\.\\d+$)，当分支为dev、develop、dev-v1.1.0时触发；请注意：需同时配置默认构建环境才生效`,
                            rules: [
                                {
                                    validator: (rule: any, value: string, callback: any) => {
                                        if (value) {
                                            try {
                                                const reg = new RegExp(value)
                                                callback()
                                            } catch (error) {
                                                callback(new Error('正则格式有误'))
                                            }
                                        } else {
                                            callback()
                                        }
                                    },
                                },
                            ],
                        },
                        attrs: {
                            placeholder: '',
                        },
                        appendRender: h => {
                            return [
                                h('div', { class: 'tip1' }, [
                                    h(
                                        'el-button',
                                        {
                                            props: {
                                                type: 'text',
                                            },
                                            on: {
                                                click: () => {
                                                    this.$set(this.FormView.model, 'trigger_branch', '^(dev|develop)$|(^dev-v\\d+\\.\\d+\\.\\d+$)')
                                                },
                                            },
                                        },
                                        '点击写入正则案例',
                                    ),
                                ]),
                            ]
                        },
                    },
                    {
                        tag: 'input',
                        name: 'workspace',
                        itemAttrs: {
                            label: '构建空间',
                        },
                        attrs: {
                            disabled: true,
                            placeholder: '',
                        },
                        appendRender: h => {
                            return [h('div', { class: 'tip' }, ['服务器上的打包空间 /data/workspace'])]
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: () => import('./components/triggers/index.vue'),
                        name: 'triggers',
                        itemAttrs: {
                            label: '自定义环境配置',
                            helpMessage: '可以覆盖原有目标环境,比如fat1、uat、prd等，自定义环境名称、默认分支、构建命令等',
                        },
                        attrs: {
                            value: [],
                        },
                    },
                ],
            },

            // 构建前操作
            // {
            //     class: 'form-headline',
            //     columns: [
            //         {
            //             render: h => {
            //                 return [
            //                     h(
            //                         'h2',
            //                         {
            //                             props: {},
            //                             class: 'form-headline',
            //                         },
            //                         `构建前操作`,
            //                     ),
            //                 ]
            //             },
            //         },
            //     ],
            // },
            // {
            //     columns: [
            //         {
            //             tag: 'input',
            //             name: 'beforeInstallCommands',
            //             itemAttrs: {
            //                 label: '构建前命令',
            //             },
            //             attrs: {
            //                 placeholder: '一行一个命令',
            //                 type: 'textarea',
            //             },
            //         },
            //     ],
            // },
            // 构建
            {
                class: 'form-headline',
                columns: [
                    {
                        render: h => {
                            return [
                                h(
                                    'h2',
                                    {
                                        props: {},
                                        class: 'form-headline',
                                    },
                                    `构建-服务器node版本14.17.0`,
                                ),
                            ]
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'installCommands',
                        itemAttrs: {
                            label: '安装依赖命令',
                        },
                        attrs: {
                            rows: '5',
                            placeholder: 'node -v && npm install --unsafe-perm',
                            type: 'textarea',
                            value: this.isEdit ? '' : `node -v && npm install --unsafe-perm`,
                        },
                        appendRender: h => {
                            return [
                                h('div', { class: 'tip' }, [
                                    h(
                                        'my-tooltip',
                                        {
                                            props: {
                                                content:
                                                    '<ul style="padding: 0px;margin:0;list-style:none;"><li>${fat:值;uat:值;prd:值}: 不同环境用不同的值，不可包含";"、":"</li><li>$env: 目标环境，值可能是："fat"、"uat"、"prd"</li><li>$senv: 目标环境，值可能是："test"、"prod"</li><li>$Env: 目标环境，值可能是："Debug"、"Uat"、"Release"</li><li>$target: 实际环境，值可能是："fatN"、"uat"、"pre"、"prd"</li><li>$filter: 筛选待发布文件的通配符</li><li>$distDir: 构建的目标文件夹</li><li>$serverDir: 服务器目录</li><li>$variables: 附加的变量</li><li>$branch: 发布的源分支</li><li>$commit: 发布的源提交记录</li><li>$description: 应用描述</li><li>$home: 发布后的主页</li></ul>',
                                                text: '环境变量？',
                                            },
                                        },
                                        [],
                                    ),
                                    h(
                                        'my-tooltip',
                                        {
                                            props: {
                                                content: '. ~/.nvm/nvm.sh && nvm install 14.19.1 && nvm use 14.19.1 && node -v && npm install',
                                                text: '使用其他node版本安装？',
                                            },
                                        },
                                        [],
                                    ),
                                ]),
                            ]
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'buildCommands',
                        itemAttrs: {
                            label: '构建命令',
                        },
                        attrs: {
                            rows: '5',
                            placeholder: 'node -v && npm run build:$target',
                            type: 'textarea',
                            value: this.isEdit ? '' : `node -v && npm run build:$target`,
                        },
                        appendRender: h => {
                            return [
                                h('div', { class: 'tip' }, [
                                    h(
                                        'my-tooltip',
                                        {
                                            props: {
                                                content:
                                                    '<ul style="padding: 0px;list-style:none;"><li>${fat:值;uat:值;prd:值}: 不同环境用不同的值，不可包含";"、":"</li><li>$env: 目标环境，值可能是："fat"、"uat"、"prd"</li><li>$senv: 目标环境，值可能是："test"、"prod"</li><li>$Env: 目标环境，值可能是："Debug"、"Uat"、"Release"</li><li>$target: 实际环境，值可能是："fatN"、"uat"、"pre"、"prd"</li><li>$filter: 筛选待发布文件的通配符</li><li>$distDir: 构建的目标文件夹</li><li>$serverDir: 服务器目录</li><li>$variables: 附加的变量</li><li>$branch: 发布的源分支</li><li>$commit: 发布的源提交记录</li><li>$description: 应用描述</li><li>$home: 发布后的主页</li></ul>',
                                                text: '环境变量？',
                                            },
                                        },
                                        [],
                                    ),
                                    h(
                                        'my-tooltip',
                                        {
                                            props: {
                                                content: '. ~/.nvm/nvm.sh && nvm install 14.19.1 && nvm use 14.19.1 && npm run build:$target',
                                                text: '使用其他node版本构建？',
                                            },
                                        },
                                        [],
                                    ),
                                ]),
                            ]
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'distDir',
                        itemAttrs: {
                            label: '构建后目录',
                        },
                        attrs: {
                            value: this.isEdit ? '' : 'dist',
                            placeholder: '默认 dist',
                        },
                        appendRender: h => {
                            return [
                                h(
                                    'span',
                                    {
                                        class: 'tip',
                                    },
                                    '和打包后的输出目录保持一致，参考环境配置outputDir',
                                ),
                            ]
                        },
                    },
                ],
            },
            // 部署
            {
                class: 'form-headline',
                columns: [
                    {
                        render: h => {
                            return [
                                h(
                                    'h2',
                                    {
                                        props: {},
                                        class: 'form-headline',
                                    },
                                    `部署(选填)`,
                                ),
                            ]
                        },
                    },
                ],
            },
            // {
            //     columns: [
            //         {
            //             tag: 'input',
            //             name: 'serverIP',
            //             itemAttrs: {
            //                 label: '服务器地址',
            //             },
            //             attrs: {
            //                 placeholder: '（默认使用公司通用服务器）',
            //             },
            //             appendRender: h => {
            //                 return [
            //                     h(
            //                         'span',
            //                         {
            //                             class: 'tip',
            //                         },
            //                         '地址可以是 IP 或域名，多个地址用逗号（“,”）隔开',
            //                     ),
            //                 ]
            //             },
            //         },
            //     ],
            // },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'serverDir',
                        itemAttrs: {
                            label: '服务器目录',
                        },
                        attrs: {
                            placeholder: '一般同应用名',
                            disabled: true,
                        },
                        appendRender: h => {
                            const serverDir = this.FormView.model.serverDir
                            const uri = serverDir ? `http://${serverDir}.fat1.icinfo.co` : 'http://serverDir.fat1.icinfo.co'
                            return [
                                h(
                                    'span',
                                    {
                                        class: 'tip',
                                    },
                                    [h('span', `系统会将“构建后目录”的文件和文件夹部署到“服务器目录”（根目录必须小写！） 开发环境访问：${uri}`)],
                                ),
                            ]
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'deployCommands',
                        itemAttrs: {
                            label: '部署后命令',
                        },
                        attrs: {
                            placeholder: '一行一个命令',
                            type: 'textarea',
                        },
                        appendRender: h => {
                            return [
                                h('div', { class: 'tip' }, [
                                    h(
                                        'my-tooltip',
                                        {
                                            props: {
                                                content:
                                                    '<ul style="padding: 0px;list-style:none;"><li>${fat:值;uat:值;prd:值}: 不同环境用不同的值，不可包含";"、":"</li><li>$env: 目标环境，值可能是："fat"、"uat"、"prd"</li><li>$senv: 目标环境，值可能是："test"、"prod"</li><li>$Env: 目标环境，值可能是："Debug"、"Uat"、"Release"</li><li>$target: 实际环境，值可能是："fatN"、"uat"、"pre"、"prd"</li><li>$filter: 筛选待发布文件的通配符</li><li>$distDir: 构建的目标文件夹</li><li>$serverDir: 服务器目录</li><li>$variables: 附加的变量</li><li>$branch: 发布的源分支</li><li>$commit: 发布的源提交记录</li><li>$description: 应用描述</li><li>$home: 发布后的主页</li><li>$androidChannel: 安卓渠道名</li><li>$appleId: 苹果账号</li><li>$applePassword: 苹果账号密码</li><li>$altoolPath: altoolPath</li></ul>',
                                                text: '环境变量？',
                                            },
                                        },
                                        [],
                                    ),
                                ]),
                            ]
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'dingding',
                        itemAttrs: {
                            label: '钉钉机器人',
                        },
                        // 默认大前端机器人-大白
                        attrs: {
                            //value: '',
                            value: !this.isEdit ? 'https://oapi.dingtalk.com/robot/send?access_token=cb6a3a2e98c7e69e88720eea0cf6d8d24b620bf0c8ec13c7d000090b54c3088d' : '',
                            placeholder: '机器人地址，项目发布后会在群里通知',
                        },
                        appendRender: h => {
                            return [
                                h('div', { class: 'tip' }, [
                                    h(
                                        'my-tooltip',
                                        {
                                            props: {
                                                content:
                                                    '<ol style="padding: 5px 10px;margin:0;"><li>打开钉钉群设置</li><li>点击群机器人</li><li>点击添加机器人</li><li>选择自定义并添加</li><li>设置机器人名字,添加自定义关键词 "发布"</li><li>复制 webhook 地址</li><li>推荐`蜻蜓打包通知群` https://oapi.dingtalk.com/robot/send?access_token=cb6a3a2e98c7e69e88720eea0cf6d8d24b620bf0c8ec13c7d000090b54c3088d</li></ol>',
                                                text: '添加步骤？',
                                            },
                                        },
                                        [],
                                    ),
                                ]),
                            ]
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'select',
                        name: 'atUsers',
                        itemAttrs: {
                            label: '默认通知人',
                        },
                        attrs: {
                            value: [],
                            filterable: true,
                            multiple: true,
                            placeholder: '每次构建完成的通知对象',
                            isFilterValue: true,
                            'default-first-option': true,
                            options: async () => {
                                let result = await API.UserService.getUserOptions()
                                result = result.filter(item => item.phone)
                                return result.map(item => {
                                    return {
                                        label: `${item.label}`,
                                        value: item.phone,
                                        username: item.username,
                                    }
                                })
                            },
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'custom',
                        custom: 'el-switch',
                        name: 'skipRemoveWorkspace',
                        itemAttrs: {
                            label: '保留构建空间',
                        },
                        attrs: {
                            value: 0,
                            'active-value': 1,
                            'inactive-value': 0,
                            'active-text': '',
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'select',
                        name: 'masterBranch',
                        itemAttrs: {
                            label: '默认主分支',
                            helpMessage: 'prd生产构建时默认合并到主分支master',
                            rules: [
                                {
                                    validator: (rule: any, value: string, callback: any) => {
                                        if (value && value.indexOf('master') === -1) {
                                            callback(new Error('分支名称必须包含master'))
                                        } else {
                                            callback()
                                        }
                                    },
                                },
                            ],
                        },

                        componentProps: () => {
                            return {
                                attrs: {
                                    value: '',
                                    placeholder: '默认master',
                                    filterable: true,
                                    options: () => {
                                        const projectId = this.FormView.model.projectId || ''

                                        if (!projectId) {
                                            return [
                                                {
                                                    label: 'master',
                                                    value: 'master',
                                                },
                                            ]
                                        }
                                        return API.PipelineService.project_branches({
                                            projectId,
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
                            }
                        },
                    },
                ],
            },
        ],
    }

    handleSelectGit(val: any) {
        const arr = val.resposity.split('/')
        const id = arr[arr.length - 1].replace('.git', '')
        this.FormView.model.projectId = val.id
        this.FormView.model.http_url_to_repo = val.http_url_to_repo
        this.FormView.model.resposity = val.ssh_url_to_repo
        this.FormView.model.name = val.description
        this.FormView.model.id = id
        this.FormView.model.serverDir = id
        this.FormView.model.masterBranch = 'master'
        this.FormView.model.tpl = val.ssh_url_to_repo
        const formRef$ = this.$refs.formRef as any
        formRef$.getFieldRef('masterBranch').parseOptions()
    }
    public formatData(data: any = {}) {
        const result = { ...data }
        const { beforeInstallCommands = '', installCommands = '', buildCommands = '', deployCommands = '' } = result
        result.beforeInstallCommands = beforeInstallCommands
            .split('\n')
            .filter((item: any) => item)
            .map((item: any) => {
                return trim(item, 2)
            })
        result.installCommands = installCommands
            .split('\n')
            .filter((item: any) => item)
            .map((item: any) => {
                return trim(item, 2)
            })
        result.buildCommands = buildCommands
            .split('\n')
            .filter((item: any) => item)
            .map((item: any) => {
                return trim(item, 2)
            })
        result.deployCommands = deployCommands
            .split('\n')
            .filter((item: any) => item)
            .map((item: any) => {
                return trim(item, 2)
            })

        return result
    }

    public parseData(data: any = {}) {
        const result = { ...data }
        const { config, name, id, projectId, projectName, trigger_branch, trigger_target, tpl = '' } = result
        const { beforeInstallCommands = [], installCommands = [], buildCommands = [], deployCommands = [] } = config
        config.beforeInstallCommands = beforeInstallCommands.join('\n')
        config.installCommands = installCommands.join('\n')
        config.buildCommands = buildCommands.join('\n')
        config.deployCommands = deployCommands.join('\n')

        return {
            id,
            name,
            projectId,
            trigger_branch,
            trigger_target,
            tpl,
            projectName,
            ...config,
        }
    }
    public onSubmit() {
        const model = this.FormView.model
        const formRef = this.$refs['formRef']
        const post = this.isEdit ? API.PipelineService.update : API.PipelineService.create
        if (!this.FormView.model.projectId) {
            this.$message.error('请输入应用名，选择应用地址')
            return
        }

        formRef.validate(async valid => {
            if (valid) {
                try {
                    const payload = this.formatData(model)
                    const { id, name, projectId, trigger_branch, trigger_target, projectName, tpl, ...config } = payload

                    this.FormView.loading = true
                    console.log(payload)
                    await post({
                        id,
                        name,
                        projectName,
                        projectId,
                        trigger_branch,
                        trigger_target,
                        tpl,
                        config,
                    })
                    this.$message.success('保存成功')
                    this.FormView.loading = false
                    // 创建完成后回退页面
                    if (!this.isEdit) {
                        this.$close(true)
                    }
                } catch (err) {
                    this.FormView.loading = false
                }
            }
        }, true)
    }

    async created() {
        if (this.isEdit) {
            const { id } = this.meta
            const { data } = await API.PipelineService.get({ id })

            this.FormView.model = this.parseData(data)
        }
    }
    mounted() {}
}
</script>

<style lang="less" scoped>
.app-form ::v-deep {
    .el-form-item__label {
        flex-shrink: 0;
    }
    height: 100%;
    .sg-card-body {
        height: calc(100% - 50px);
        overflow: auto;
    }
    .sg-card-foot {
        border-top: 1px solid #ddd;
        padding-left: 180px;
        display: flex;
        align-items: center;
        height: 50px;
    }
    .form-headline {
        margin: 0;
        font-size: 16px;
    }
    .column {
        .sg-data-form .el-textarea,
        .sg-data-form .el-input,
        .sg-data-form .el-select,
        .sg-data-form .el-autocomplete,
        .sg-data-form .el-cascader {
            max-width: 400px;
        }

        .sg-data-form-field {
            display: flex;
            align-items: center;
        }

        .tip {
            color: #999;
            line-height: 1.2;
            flex: 1;
            margin-left: 15px;
        }

        .deploy-checkbox {
            .el-checkbox {
                display: block;
            }
        }
    }
}
</style>

<style lang="less">
.customer-autocomplete {
    .row {
        line-height: normal;
        padding: 7px 0;
    }
    .customerName {
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .addressDetail {
        font-size: 12px;
        color: #b4b4b4;
    }
    .highlighted .addressDetail {
        color: #ddd;
    }
}
</style>
