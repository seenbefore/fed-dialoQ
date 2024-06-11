<template>
    <el-dialog ref="dialog" class="UserEditDialog" :close-on-click-modal="false" :title="title" width="600px" :fullscreen="false" v-bind="$attrs" :visible="true" @close="cancel">
        <div class="body ">
            <sg-base-form class="column" ref="formRef" :fields="fields" v-model="model" :span="24"></sg-base-form>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormColumn, FormRow, FormRef } from '@/sharegood-ui'

interface FormModel {
    branch?: string
    target?: string
}
@Component({
    components: {},
})
export default class UserEditDialog extends Vue {
    @Prop({ type: String }) id!: string
    @Prop({ type: Boolean }) isEdit!: boolean
    @Prop({ type: Object }) meta: any
    get title() {
        if (this.isEdit) {
            return '修改'
        }
        return '创建'
    }
    public $refs!: {
        formRef: FormRef
    }
    private model: any = {}
    private FormView = {
        loading: false,
    }
    private fields: FormRow[] = [
        {
            columns: [
                {
                    tag: 'input',
                    name: 'username',
                    itemAttrs: {
                        label: '用户名',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        placeholder: '请输入 输入英文 如：damon',
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
                        label: '真实姓名',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        placeholder: '如：张三',
                    },
                },
            ],
        },

        {
            columns: [
                {
                    tag: 'input',
                    name: 'phone',
                    itemAttrs: {
                        label: '手机号码',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        placeholder: '十一位手机号码',
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'input',
                    name: 'password',
                    itemAttrs: {
                        label: '密码',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        type: 'password',
                        placeholder: '',
                    },
                    // appendRender: h => {
                    //     return [
                    //         h(
                    //             'span',
                    //             {
                    //                 class: 'tip',
                    //             },
                    //             '默认：123456',
                    //         ),
                    //     ]
                    // },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'input',
                    name: 'email',
                    itemAttrs: {
                        label: '邮箱',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        placeholder: '',
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
                    render: h => {
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
                                            if (this.isEdit) {
                                                this.handleUpdate()
                                            } else {
                                                this.handleCreate()
                                            }
                                        },
                                    },
                                },
                                this.isEdit ? `修改` : `创建`,
                            ),
                        ]
                    },
                },
            ],
        },
    ]
    async handleUpdate() {
        const model = this.model
        const formRef = this.$refs['formRef']
        console.log(model)

        formRef.validate(async (valid: any, errors: any) => {
            if (valid) {
                try {
                    this.FormView.loading = true
                    await API.UserService.update(model)
                    this.FormView.loading = false
                    this.$message.success('修改成功')
                    this.confirm()
                } catch (err) {
                    this.FormView.loading = false
                }
            }
        })
    }
    async handleCreate() {
        const model = this.model
        const formRef = this.$refs['formRef']
        console.log(model)

        formRef.validate(async (valid: any, errors: any) => {
            if (valid) {
                try {
                    this.FormView.loading = true
                    await API.UserService.create(model)
                    this.FormView.loading = false
                    this.$message.success('添加成功')
                    this.confirm()
                } catch (err) {
                    this.FormView.loading = false
                }
            }
        })
    }

    async created() {
        if (this.isEdit) {
            const id = this.id
            const { data } = await API.UserService.get({ id })
            this.model = {
                ...data,
            }
        }
    }

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }
}
</script>

<style lang="less" scoped>
.UserEditDialog ::v-deep {
}
</style>
