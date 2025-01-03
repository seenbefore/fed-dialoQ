<template>
    <el-drawer :title="action === 'edit' ? '编辑考场' : '新增考场'" :visible="true" size="600px" @close="cancel" :before-close="cancel" custom-class="ExamRoomSave my-drawer">
        <div class="drawer-container">
            <div class="drawer-main">
                <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel"></sg-base-form>
            </div>

            <div class="drawer-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" :loading="loading" @click="handleSave">确定</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, FormRef } from '@/sharegood-ui'
import { save, detail } from '../../api'

@Component({
    name: 'ExamRoomSave',
    components: {},
})
export default class ExamRoomSave extends Vue {
    /** 操作类型 */
    @Prop({ default: 'add' }) readonly action!: string
    /** ID */
    @Prop() readonly id!: string

    @Ref('formRef')
    formRef!: FormRef

    loading = false
    formModel: any = {
        /** 题库类型 */
        questionType: 'random',
    }

    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                columns: [
                    {
                        tag: 'select',
                        name: 'area',
                        itemAttrs: {
                            label: '发布区域',
                            rules: [{ required: true, message: '请选择发布区域' }],
                        },
                        attrs: {
                            placeholder: '请选择',
                            value: '浙江省',
                            disabled: true,
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'examName',
                        itemAttrs: {
                            label: '考试名称',
                            rules: [{ required: true, message: '请输入考试名称' }],
                        },
                        attrs: {
                            placeholder: '请输入考试名称',
                            maxlength: 50,
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
                            label: '考场',
                            rules: [{ required: true, message: '请输入考场' }],
                        },
                        attrs: {
                            placeholder: '请输入考场',
                            maxlength: 50,
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'date',
                        name: 'startTime',
                        itemAttrs: {
                            label: '开始时间',
                            rules: [{ required: true, message: '请选择开始时间' }],
                        },
                        attrs: {
                            type: 'datetime',
                            placeholder: '请选择开始时间',
                            'value-format': 'yyyy-MM-dd HH:mm:ss',
                            onChange: ({ value }: any) => {
                                if (value && this.formModel.endTime && value > this.formModel.endTime) {
                                    this.formModel.endTime = ''
                                }
                            },
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'date',
                        name: 'endTime',
                        itemAttrs: {
                            label: '结束时间',
                            rules: [{ required: true, message: '请选择结束时间' }],
                        },
                        attrs: {
                            type: 'datetime',
                            placeholder: '请选择结束时间',
                            'value-format': 'yyyy-MM-dd HH:mm:ss',
                            pickerOptions: {
                                disabledDate: (time: Date) => {
                                    if (!this.formModel.startTime) return false
                                    return time.getTime() < new Date(this.formModel.startTime).getTime()
                                },
                            },
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'custom',
                        name: 'paper',
                        itemAttrs: {
                            label: '试卷',
                            rules: [{ required: true, message: '请选择试卷' }],
                        },
                        render: () => {
                            return (
                                <div class="paper-select">
                                    <el-input v-model={this.formModel.paperName} placeholder="请选择试卷" readonly></el-input>
                                    <el-button type="primary" onClick={this.handleSelectPaper}>
                                        选择试卷
                                    </el-button>
                                    <el-button type="danger" onClick={this.handleDeletePaper}>
                                        删除试卷
                                    </el-button>
                                </div>
                            )
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'radio',
                        name: 'questionType',
                        itemAttrs: {
                            label: '题库类型',
                            rules: [{ required: true, message: '请选择题库类型' }],
                        },
                        attrs: {
                            options: [
                                { label: '随机', value: 'random' },
                                { label: '固定', value: 'fixed' },
                            ],
                        },
                    },
                ],
            },
        ]
        return {
            span: 24,
            fields,
        }
    }

    async handleSave() {
        try {
            this.loading = true
            await this.formRef.validate()
            await save(this.formModel as any)
            this.$message.success('保存成功')
            this.confirm()
        } catch (error) {
            console.error(error)
        } finally {
            this.loading = false
        }
    }

    async handleSelectPaper() {
        const result = await this.$modalDialog(() => import('../paper-dialog/index.vue'), {})
        if (result) {
            this.$set(this.formModel, 'paper', result)
            this.$set(this.formModel, 'paperName', result.name)
        }
    }

    handleDeletePaper() {
        this.$set(this.formModel, 'paper', null)
        this.$set(this.formModel, 'paperName', '')
    }

    async created() {
        if (this.action === 'edit' && this.id) {
            try {
                this.loading = true
                const { data } = await detail({ id: this.id })
                this.formModel = {
                    ...data,
                    paper: data.paper,
                    paperName: data.paperName,
                }
            } catch (error) {
                console.error(error)
                this.$message.error('获取详情失败')
            } finally {
                this.loading = false
            }
        }
    }

    cancel() {
        this.$options.cancel?.()
    }

    confirm() {
        this.$options.confirm?.(true)
    }
}
</script>

<style scoped lang="less">
.ExamRoomSave {
    .drawer-container {
        height: 100%;
        display: flex;
        flex-direction: column;

        .drawer-main {
            flex: 1;
            padding: 15px 20px;
            overflow-y: auto;

            .paper-select {
                display: flex;
                gap: 10px;
                align-items: center;

                .el-input {
                    flex: 1;
                }
            }
        }

        .drawer-footer {
            padding: 15px 20px;
            text-align: right;
            border-top: 1px solid #dcdfe6;
        }
    }
}
</style>
