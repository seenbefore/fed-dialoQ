<template>
    <el-dialog ref="dialog" :title="myTitle" visible class="EditDialog" :fullscreen="false" :append-to-body="false" :close-on-click-modal="false" width="600px" v-bind="$attrs" @close="cancel">
        <div class="pre-deploy-dialog__content">
            <sg-base-form label-width="120px" ref="formRef" :fields="formFields" v-model="formModel" @submit="handleSubmit" :span="24"></sg-base-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="View.loading">保 存</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api'
import { FormColumn, FormRef } from '@/sharegood-ui'
const User_option_map: any = {}

interface FormModel {
    name?: any
    records?: any
    records$?: any
    [prop: string]: any
}
@Component({
    name: 'ProductEditDialog',
    components: {},
})
export default class ProductEditDialog extends Vue {
    @Prop({ type: String }) title!: string
    @Prop({ type: String }) id!: string
    @Prop({ type: Object }) meta: any
    @Prop({ default: false }) private isEdit!: boolean
    public $refs!: {
        formRef: FormRef
    }
    private formModel = {} as FormModel
    user_options: any[] = []
    get myTitle() {
        if (this.isEdit) {
            return '编辑'
        }
        return '新增'
    }
    View = {
        loading: false,
    }
    formFields = [
        {
            tag: 'input',
            name: 'name',
            itemAttrs: {
                label: '标题',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            attrs: {
                isTriggerSubmit: true,
            },
        },
        {
            tag: 'select',
            name: 'records$',
            itemAttrs: {
                label: '用户',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            attrs: {
                value: [],
                filterable: true,
                multiple: true,
                isFilterValue: true,
                //'collapse-tags': true,
                'default-first-option': true,
                options: async () => {
                    const result = await API.UserService.getUserOptions()
                    return result.map(item => {
                        return {
                            label: item.label,
                            value: item.value,
                        }
                    })
                },
                onChange: ({ value, option }) => {
                    console.log(value, option)
                    const result: any = []
                    if (value && value.length) {
                        value.forEach((val: any) => {
                            if (User_option_map[val]) {
                                result.push({
                                    label: User_option_map[val],
                                    value: val,
                                })
                            }
                        })
                    }
                    this.$set(this.formModel, 'records', result)
                },
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
            this.View.loading = true
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
        } catch (err) {
        } finally {
            this.View.loading = false
        }
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
        const { records$, ...payload } = this.formModel

        await API.UserGroupService.update(payload)
    }
    async handleAdd() {
        const { records$, ...payload } = this.formModel
        await API.UserGroupService.create(payload)
    }
    async syncData() {
        const result = await API.UserService.getUserOptions()
        result.forEach(item => {
            const { label, value } = item
            User_option_map[value] = label
        })
    }

    async created() {
        await this.syncData()
        if (this.isEdit) {
            const id = this.id
            const { data } = await API.UserGroupService.get({ id })
            this.formModel.records$ = data.records.map((item: any) => {
                return item.value
            })
            Object.assign(this.formModel, data)
        }
    }
}
</script>

<style lang="less" scoped>
.EditDialog ::v-deep {
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
        margin-bottom: 10px;
    }
}
</style>
