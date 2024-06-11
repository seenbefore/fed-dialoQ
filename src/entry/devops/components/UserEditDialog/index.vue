<template>
    <el-dialog ref="dialog" class="UserEditDialog" :close-on-click-modal="false" :title="exTitle" width="600px" :fullscreen="false" v-bind="$attrs" :visible="true" @close="cancel">
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
    @Prop({ type: String }) title: any
    get exTitle() {
        if (this.title) {
            return this.title
        }
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
                    tag: this.isEdit ? 'text' : 'input',
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
                        placeholder: '请输入 输入英文 一般是姓名全拼',
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
                    tag: 'select',
                    name: 'position',
                    itemAttrs: {
                        label: '岗位',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        options: [
                            {
                                label: '前端开发',
                                value: '前端开发',
                            },
                            {
                                label: '后端开发',
                                value: '后端开发',
                            },
                            {
                                label: '测试',
                                value: '测试',
                            },
                            {
                                label: '产品经理',
                                value: '产品经理',
                            },
                            {
                                label: '设计师',
                                value: '设计师',
                            },
                            {
                                label: '运维',
                                value: '运维',
                            },
                            {
                                label: '其他',
                                value: '其他',
                            },
                        ],
                    },
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
                            // {
                            //     required: true,
                            //     message: '必填',
                            // },
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
        if (this.isEdit && this.id) {
            const { data } = await API.UserService.get({
                id: this.id,
            })
            this.model = {
                ...data,
            }
        } else if (this.isEdit) {
            const { data } = await API.UserService.current()
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
