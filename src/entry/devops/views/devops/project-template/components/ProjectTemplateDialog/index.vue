<template>
    <el-dialog
        ref="dialog"
        :title="myTitle"
        visible
        class="ProjectTemplateDialog"
        :fullscreen="false"
        :append-to-body="false"
        :close-on-click-modal="false"
        width="500px"
        v-bind="$attrs"
        @close="cancel"
    >
        <div class="ProjectTemplateDialog__content">
            <sg-base-form label-width="100px" ref="formRef" :fields="formFields" v-model="formModel" :span="24"></sg-base-form>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormColumn, FormRef } from '@/sharegood-ui'

interface FormModel {
    branch?: string
    target?: string
    resposity?: string
}
@Component({
    name: 'ProjectTemplateDialog',
    components: {},
})
export default class ProjectTemplateDialog extends Vue {
    @Prop({ type: String }) title!: string
    @Prop({ type: String }) id!: string
    @Prop({ type: Object }) meta: any
    @Prop({ default: false }) private isEdit!: boolean
    public $refs!: {
        formRef: FormRef
    }
    private formModel: FormModel = {}

    get myTitle() {
        if (this.isEdit) {
            return '修改'
        }
        return '创建'
    }
    private View = {
        loading: false,
    }
    formFields: FormColumn[] = [
        {
            tag: 'input',
            name: 'name',
            itemAttrs: {
                label: '模板名称',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
        },
        {
            tag: 'autocomplete',
            name: '$resposity',
            itemAttrs: {
                label: '应用git地址',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                    {
                        validator: (rule: any, value: string, callback: any) => {
                            const state = this.$refs.formRef.getState()
                            console.log(3333, state, this.formModel.resposity, this.formModel)

                            if (!state.resposity) {
                                callback(new Error('请选中下拉结果'))
                            } else {
                                callback()
                            }
                        },
                    },
                ],
            },
            attrs: {
                debounce: 0,
                'highlight-first-item': true,
                'trigger-on-focus': true,
                placeholder: '请填写 比如 vue-ts-template 然后选中查询结果',
                'popper-class': 'customer-autocomplete',
                onChange: option => {
                    const value: any = option.value || ''
                    this.$set(this.formModel, 'resposity', '')
                },
                listeners: {
                    select: (val: any) => {
                        const { ssh_url_to_repo } = val
                        this.$set(this.formModel, 'resposity', ssh_url_to_repo)
                    },
                },
                load: (queryString: any) => {
                    const value = queryString
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
                            label: option.path_with_namespace,
                            value: option.resposity,
                            ...option,
                        }))
                    })
                },
                defaultSlotRender(h, { row }) {
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
                                    [row.resposity],
                                ),

                                h(
                                    'div',
                                    {
                                        class: 'addressDetail',
                                    },
                                    [row.description],
                                ),
                            ],
                        ),
                    ]
                },
            },
            parseData: (data, { name }) => {
                if (data.resposity) {
                    return {
                        [name]: data.resposity,
                    }
                }
                return {}
            },
            formatData: val => {
                return {
                    resposity: this.formModel.resposity,
                }
            },
        },
        // {
        //     tag: 'input',
        //     name: 'resposity',
        //     itemAttrs: {
        //         label: '模板地址',
        //         rules: [
        //             {
        //                 required: true,
        //                 message: '必填',
        //             },
        //         ],
        //     },
        //     attrs: {
        //         placeholder: '比如 git@gitlab.icinfo.co:fed/vue-ts-template.git',
        //     },
        // },
        {
            tag: 'input',
            name: 'note',
            itemAttrs: {
                label: '运行备注',
            },
            attrs: {
                type: 'textarea',
            },
        },

        {
            tag: 'slot',
            itemAttrs: {
                label: ' ',
            },
            render: (h, { row }) => {
                const loading = this.View.loading
                return [
                    h(
                        'el-button',
                        {
                            props: {
                                type: 'primary',
                                loading,
                            },
                            on: {
                                click: () => {
                                    this.handleSubmit()
                                },
                            },
                        },
                        '保存',
                    ),
                ]
            },
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
    handleSubmit() {
        if (this.isEdit) {
            this.handleUpdate()
        } else {
            this.handleCreate()
        }
    }
    handleUpdate() {
        const ref = this.$refs.formRef
        ref.validate(async valid => {
            if (valid) {
                try {
                    const row = this.formatData(this.formModel)
                    const id = this.id
                    this.View.loading = true
                    await API.ProjectTemplateService.update({
                        id,
                        ...row,
                    })
                    this.View.loading = false
                    this.confirm()
                } catch (err) {
                    this.View.loading = false
                }
            }
        })
    }
    handleCreate() {
        const ref = this.$refs.formRef
        ref.validate(async valid => {
            if (valid) {
                const row = this.formatData(this.formModel)
                await API.ProjectTemplateService.create({
                    ...row,
                })
                this.confirm()
            }
        })
    }
    public formatData(data: any = {}) {
        const result = this.$refs.formRef.getState()
        console.log('🚀 ~ file: index.vue:224 ~ ProjectTemplateDialog ~ formatData ~ result:', result)

        return result
    }
    public parseData(data: any = {}) {
        const result = { ...data }

        return result
    }
    async created() {
        if (this.isEdit) {
            const id = this.id
            const { data } = await API.ProjectTemplateService.get({ id })

            this.$refs.formRef.setState(this.parseData(data))
        }
    }
}
</script>

<style lang="less" scoped>
.ProjectTemplateDialog ::v-deep {
    .el-dialog__body {
        padding: 10px 15px;
        padding-top: 0;
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
