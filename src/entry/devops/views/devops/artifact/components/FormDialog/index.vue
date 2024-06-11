<template>
    <el-dialog ref="dialog" :title="myTitle" visible class="FormDialog" :fullscreen="false" :append-to-body="false" :close-on-click-modal="false" width="900px" v-bind="$attrs" @close="cancel">
        <div class="pre-deploy-dialog__content">
            <!-- {{ formModel }} -->
            <sg-base-form label-width="80px" ref="formRef" v-if="formFields.length" :fields="formFields" v-model="formModel" :span="24"></sg-base-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSubmit" :loading="View.loading">确定</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormColumn, FormRef, FormRow } from '@/sharegood-ui'
import { userStore } from '@/entry/devops/store/useStore'
import { ArtifactService } from '@/entry/devops/api'

interface FormModel {
    branch?: string
    target?: string
    appId$?: string
    target$?: string
    appLabel$?: string
    name?: string
}
@Component({
    name: 'FormDialog',
    components: {},
})
export default class FormDialog extends Vue {
    @Prop({ type: Number }) port!: number
    @Prop({ type: String }) title!: string
    @Prop({ type: String }) id!: string
    @Prop({ type: Object }) meta: any
    @Prop({ default: false }) private isEdit!: boolean

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
    get formFields(): FormRow[] {
        return [
            {
                columns: [
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
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: () => import('../pipelines/index.vue'),
                        name: 'pipelines',
                        itemAttrs: {
                            label: '流水线',
                            autoTriggerSubComponentValidate: true,
                        },
                        attrs: {
                            value: [],
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
                            label: '通知人',
                        },
                        attrs: {
                            value: [],
                            filterable: true,
                            multiple: true,
                            placeholder: '任务完成后通知对象',
                            isFilterValue: true,
                            valueKey: 'label',
                            'default-first-option': true,
                            options: async () => {
                                let result = await API.UserService.getUserOptions()
                                result = result.filter(item => item.phone)
                                return result.map(item => {
                                    return {
                                        label: `${item.label}`,
                                        value: item.phone,
                                        username: item.username,
                                        nane: item.name,
                                    }
                                })
                            },
                            onInput: val => {
                                console.log(1111, val)
                            },
                        },
                    },
                ],
            },
        ]
    }

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
        const ref = this.$refs.formRef as FormRef
        ref.validate(async valid => {
            if (valid) {
                try {
                    const row = this.formatData(this.formModel)

                    const id = this.id
                    this.View.loading = true

                    await ArtifactService.update({
                        id,
                        ...row,
                        updatedUserId: userStore.info?.username,
                        updatedUser: userStore.info?.name,
                    })

                    this.View.loading = false
                    this.$message.success('修改成功')
                    this.confirm()
                } catch (err) {
                } finally {
                    this.View.loading = false
                }
            }
        })
    }
    handleCreate() {
        const ref = this.$refs.formRef as FormRef
        ref.validate(async valid => {
            if (valid) {
                try {
                    const row = this.formatData(this.formModel)
                    this.View.loading = true
                    await ArtifactService.create({
                        ...row,
                    })
                    this.$message.success('创建成功')
                    this.confirm()
                } catch (err) {
                } finally {
                    this.View.loading = false
                }
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
    async syncPipelineOptions() {
        const { data } = await API.PipelineService.findAll()

        return data.map(item => {
            return {
                label: item.name,
                value: `${item.id}`,
            }
        })
    }
    async created() {
        if (this.isEdit) {
            const id = this.id
            const { data } = await ArtifactService.get({ id })

            this.formModel = this.parseData(data)
        }
    }
}
</script>

<style lang="less" scoped>
.FormDialog ::v-deep {
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
