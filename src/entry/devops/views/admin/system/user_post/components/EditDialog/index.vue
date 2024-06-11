<template>
    <el-dialog ref="dialog" :title="myTitle" visible class="EditDialog" :fullscreen="false" :append-to-body="false" :close-on-click-modal="false" width="600px" v-bind="$attrs" @close="cancel">
        <div class="pre-deploy-dialog__content">
            <sg-base-form label-width="120px" ref="formRef" :fields="formFields" v-model="formModel" @submit="handleSubmit" :span="24"></sg-base-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">保 存</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { UserPostService } from '@/entry/devops/api'
import { FormColumn, FormRef } from '@/sharegood-ui'

@Component({
    components: {},
})
export default class EditDialog extends Vue {
    @Prop({ type: String }) title!: string
    @Prop({ type: String }) id!: string
    @Prop({ type: Object }) row: any
    @Prop({ default: false }) private isEdit!: boolean
    public $refs!: {
        formRef: FormRef
    }
    private formModel = {}
    code_options: any[] = []
    get myTitle() {
        if (this.isEdit) {
            return '编辑'
        }
        return '新增'
    }
    private View = {
        loading: false,
    }
    formFields = [
        {
            tag: 'input',
            name: 'code',
            itemAttrs: {
                label: '岗位编码',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
        },
        {
            tag: 'input',
            name: 'name',
            itemAttrs: {
                label: '岗位名称',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
        },
        {
            tag: 'el-input-number',
            name: 'weight',
            itemAttrs: {
                helpMessage: '数值越高，岗位级别越高',
                helpIcon: 'el-icon-question',
                label: '岗位权重',
            },
        },
    ] as FormColumn[]

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }
    async handleSubmit() {
        try {
            if (this.isEdit) {
                await this.handleValidate()
                await this.handleUpdate()
                this.$message.success('修改成功')
            } else {
                await this.handleValidate()
                await this.handleAdd()
                this.$message.success('新增成功')
            }
            this.confirm()
        } catch (err) {}
    }
    async handleValidate() {
        return new Promise((resolve, reject) => {
            const ref = this.$refs.formRef
            ref.validate(async valid => {
                if (valid) {
                    resolve(1)
                } else {
                    reject()
                }
            })
        })
    }
    async handleUpdate() {
        const payload = {
            ...this.formModel,
        }
        await UserPostService.update(payload)
    }
    async handleAdd() {
        const payload = {
            ...this.formModel,
        }
        await UserPostService.create(payload)
    }

    async created() {
        if (this.isEdit && this.row) {
            // const { data } = await API.DictService.get({ id })
            // Object.assign(this.formModel, {
            //     ...this.row,
            // })
            this.$set(this, 'formModel', {
                ...this.row,
            })
        }
    }
}
</script>

<style lang="less" scoped>
.EditDialog ::v-deep {
    .el-dialog__body {
        padding: 10px 20px;
    }
}
</style>
