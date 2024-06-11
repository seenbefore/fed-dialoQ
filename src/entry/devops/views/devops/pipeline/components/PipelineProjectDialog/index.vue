<template>
    <el-dialog
        ref="dialog"
        title="新建仓库"
        visible
        class="PipelineProjectDialog"
        :fullscreen="false"
        :append-to-body="false"
        :close-on-click-modal="false"
        width="700px"
        v-bind="$attrs"
        @close="cancel"
    >
        <div class="pre-deploy-dialog__content">
            <sg-base-form label-width="100px" ref="formRef" :fields="formFields" v-model="formModel" :span="24"></sg-base-form>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormRow, FormRef } from '@/sharegood-ui'

interface FormModel {
    groupName?: string
    groupId?: string
    id?: string
    tpl?: string
    description?: string
    resposity?: string
}
@Component({
    name: 'PipelineProjectDialog',
    components: {},
})
export default class PipelineProjectDialog extends Vue {
    @Prop({ type: String }) title!: string
    @Prop({ type: Object }) meta: any
    public $refs!: {
        formRef: FormRef
    }
    private formModel: FormModel = {
        resposity: '',
    }
    private FormView = {
        loading: false,
    }

    formFields: FormRow[] = [
        {
            columns: [
                {
                    tag: 'select',
                    name: 'groupId',
                    itemAttrs: {
                        label: '分组',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        disabled: true,
                        // 默认前端
                        value: '',
                        options: () => {
                            return API.PipelineService.groups().then(res => {
                                // 默认前端分组
                                this.$set(this.formModel, 'groupId', 111)
                                return res.data
                            })
                        },
                        onChange: ({ name, value, option }) => {
                            if (!option) {
                                this.formModel.groupName = ''
                            } else {
                                this.formModel.groupName = option.target.name
                            }
                        },
                    },
                },
            ],
        },

        {
            columns: [
                {
                    span: 16,
                    tag: 'autocomplete',
                    name: 'resposity',
                    itemAttrs: {
                        helpMessage: '之前的项目作为模板，快速创建项目',
                        label: '模板仓库',
                    },
                    attrs: {
                        debounce: 0,
                        'highlight-first-item': true,
                        'trigger-on-focus': true,
                        placeholder: '比如 模糊搜索 fed-template-',
                        'popper-class': 'customer-autocomplete',
                        onChange: option => {
                            const value: any = option.value || ''
                            if (!value) {
                                this.formModel.tpl = ''
                            }
                        },
                        listeners: {
                            select: (val: any) => {
                                this.$set(this.formModel, 'tpl', val.value)
                            },
                        },
                        load: () => {
                            const value = this.formModel.resposity
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
                },
                {
                    span: 8,
                    tag: 'select',
                    name: 'tpl',
                    itemAttrs: {
                        label: '',
                        class: 'sg-pl-3',
                    },

                    attrs: {
                        value: '',
                        placeholder: '常见模板',
                        class: 'sg-flexbox',
                        options: () => {
                            return API.PipelineService.project_tpls().then(res => {
                                const firstOption = res.data[0]
                                // if (firstOption) {
                                //     this.$set(this.formModel, 'tpl', firstOption.value)
                                // }
                                return res.data
                            })
                        },
                        defaultSlotRender(h, { row }) {
                            return h('div', {}, [
                                h('div', [row.label]),
                                h(
                                    'div',
                                    {
                                        style: 'font-size:12px;color:#999;line-height:1.2;padding-bottom: 5px;',
                                    },
                                    [row.value],
                                ),
                            ])
                        },
                        'popper-class': 'PipelineProjectDialogSelect',
                        listeners: {
                            input: () => {
                                console.log(345)

                                this.$set(this.formModel, 'resposity', '')
                            },
                        },
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'slot',
                    name: 'tpl',
                    itemAttrs: {
                        label: '模板地址',
                    },
                    render: (h, { row }) => {
                        return [h('div', [row.tpl])]
                    },
                    ifRender(model) {
                        return model.tpl
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'input',
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
                        placeholder: '仅支持英文、下划线_、横杠- 如 fed-xxxx',
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'input',
                    name: 'description',
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
                        placeholder: '应用中文名称 如 处罚办案系统',
                        // type: 'textarea',
                    },
                },
            ],
        },

        {
            columns: [
                {
                    tag: 'slot',
                    itemAttrs: {
                        label: ' ',
                    },
                    render: (h, { row }) => {
                        return [
                            h(
                                'el-button',
                                {
                                    props: {
                                        type: 'primary',
                                        loading: this.FormView.loading,
                                    },
                                    on: {
                                        click: () => {
                                            this.handleSubmit()
                                        },
                                    },
                                },
                                '创建',
                            ),
                        ]
                    },
                },
            ],
        },
    ]

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }
    mounted() {}
    handleSubmit() {
        const ref = this.$refs.formRef
        const row = {
            ...this.formModel,
        }
        delete row.resposity
        ref.validate(async valid => {
            if (valid) {
                try {
                    if (!/^[a-zA-Z\-_.\d]+$/.test(row.id!)) {
                        this.$message.error('应用名称仅支持英文、下划线_、横杠-')
                        return
                    }
                    this.FormView.loading = true
                    const { data } = await API.PipelineService.project_create({
                        ...row,
                    })
                    this.FormView.loading = false

                    const link = data.http_url_to_repo
                    this.$alert(`项目地址：<a href="${link}" target="_blank" class="sg-link">${link}</a>`, 'webhooks已配置完成', {
                        dangerouslyUseHTMLString: true,
                    })
                    this.$options.confirm && this.$options.confirm(data)
                } catch (err) {
                    this.FormView.loading = false
                }
            }
        })
    }
}
</script>
<style lang="less">
.PipelineProjectDialogSelect {
    .el-select-dropdown__item {
        height: auto;
    }
}
</style>
<style lang="less" scoped>
.PipelineProjectDialog ::v-deep {
    .el-dialog__body {
        padding: 10px 20px;
    }
    .branch {
        .el-select {
            width: 250px;
        }
    }
    .el-radio-group {
        padding-top: 12px;
    }
    .el-radio {
        display: block;
        margin-bottom: 10px;
    }
}
</style>
