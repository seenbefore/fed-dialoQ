<template>
    <el-dialog ref="dialog" :title="myTitle" visible class="ReviewDialog" :fullscreen="true" :append-to-body="false" :close-on-click-modal="false" v-bind="$attrs" @close="cancel">
        <div class="pre-deploy-dialog__content">
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
}
@Component({
    name: 'ReviewDialog',
    components: {},
})
export default class ReviewDialog extends Vue {
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
                label: '名称',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            // attrs: {
            //     disabled: !!this.isEdit,
            // },
        },
        {
            tag: 'input',
            name: 'content',
            itemAttrs: {
                label: 'server配置',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            attrs: {
                type: 'textarea',
                rows: 10,
            },
        },
        {
            tag: 'input',
            name: 'note',
            itemAttrs: {
                label: '备注',
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

                    await API.NginxService.update({
                        id,
                        ...row,
                    })

                    this.View.loading = false
                    this.$message.success('修改成功')
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
                await API.NginxService.create({
                    ...row,
                })
                this.$message.success('创建成功')
                this.confirm()
            }
        })
    }
    public formatData(data: any = {}) {
        const result = { ...data }

        return result
    }
    public parseData(data: any = {}) {
        const result = { ...data }

        return result
    }
    async created() {
        // if (this.isEdit) {
        //     const id = this.id
        //     const { data } = await API.NginxService.get({ id })
        //     //console.log(12345, this.parseData(data))
        //     this.formModel = this.parseData(data)
        // }
    }
}
</script>

<style lang="less" scoped>
.ReviewDialog ::v-deep {
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
