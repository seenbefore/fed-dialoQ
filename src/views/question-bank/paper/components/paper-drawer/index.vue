<template>
    <el-drawer :title="title" :visible="true" size="700px" @close="cancel" :before-close="cancel" custom-class="my-drawer">
        <div class="drawer-container">
            <div class="drawer-main">
                {{ formModel }}
                <sg-base-form ref="form" v-bind="getFormAttrs" v-model="formModel"></sg-base-form>
            </div>

            <div class="drawer-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" :loading="loading" @click="submit">确定</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, FormRow } from '@/sharegood-ui'
import { QuestionBankCategoryEnumMap, QuestionBankCategoryEnum, QuestionTypeEnumMap, QuestionTypeEnum, QuestionBankSubCategoryEnumMap } from '@/views/question-bank/@enum'
import { getConfig, save } from '../../api'

@Component({
    name: 'PaperDrawer',
    components: {},
})
export default class PaperDrawer extends Vue {
    @Prop({ default: () => ({}) }) data!: Record<string, any>
    @Prop({ default: 'create' }) action!: 'create' | 'modify'
    @Prop() id!: string

    @Ref('form') formRef!: FormRef
    @Ref('paperDetailsForm1') paperDetailsForm1!: FormRef
    @Ref('paperDetailsForm2') paperDetailsForm2!: FormRef
    @Ref('paperDetailsForm3') paperDetailsForm3!: FormRef

    loading = false
    formModel: Record<string, any> = {
        paperTypeCode: QuestionBankCategoryEnum.SAFETY_REGULATIONS,
        paperTypeName: QuestionBankCategoryEnumMap[QuestionBankCategoryEnum.SAFETY_REGULATIONS],
        duration: 60,
        totalScore: 100,
        passScore: 60,
        totalQuestions: 0,
        singleChoiceScore: 0,
        multipleChoiceScore: 0,
        judgeScore: 0,
        paperDetails: [
            { questionTypeName: '单选题', questionCount: 10, questionTypeCode: QuestionTypeEnum.SINGLE_CHOICE },
            { questionTypeName: '多选题', questionCount: 20, questionTypeCode: QuestionTypeEnum.MULTIPLE_CHOICE },
            { questionTypeName: '判断题', questionCount: 10, questionTypeCode: QuestionTypeEnum.TRUE_FALSE },
        ],
    }

    get title() {
        return this.action === 'create' ? '新增试卷' : '编辑试卷'
    }

    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                tag: 'select',
                name: 'kind',
                label: '所属大类',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return Object.values(QuestionBankCategoryEnumMap)
                    },
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择所属大类' }],
                },
            },
            {
                tag: 'input',
                name: 'title',
                label: '试卷名称',
                attrs: {
                    placeholder: '请输入试卷名称',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入试卷名称' }],
                },
            },
            {
                span: 12,
                tag: 'input',
                name: 'duration',
                label: '考试时长',
                attrs: {
                    type: 'number',
                    min: 0,
                    placeholder: '请输入考试时长(分钟)',
                    inputAppendSlotRender: () => <div>分钟</div>,
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入考试时长' }],
                },
            },
            {
                span: 12,
                tag: 'input',
                name: 'totalScore',
                label: '总分',
                render: (h, { row }) => {
                    return <div>{row.singleChoiceScore + row.multipleChoiceScore + row.judgeScore}</div>
                },
            },
            {
                span: 6,
                tag: 'input',
                name: 'passScore',
                label: '及格分',
                attrs: {
                    type: 'number',
                    min: 0,
                    placeholder: '',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入及格分' }],
                },
            },
            {
                span: 24,
                tag: 'custom',
                name: 'paperDetails',
                label: '选题',
                render: () => {
                    return (
                        <div>
                            <sg-base-form
                                ref="paperDetailsForm1"
                                props={{
                                    span: 8,
                                    value: this.formModel.paperDetails[0],
                                    fields: this.paperDetailsFields,
                                }}
                            ></sg-base-form>
                            <sg-base-form
                                ref="paperDetailsForm2"
                                props={{
                                    span: 8,
                                    value: this.formModel.paperDetails[1],
                                    fields: this.paperDetailsFields,
                                }}
                            ></sg-base-form>
                            <sg-base-form
                                ref="paperDetailsForm3"
                                props={{
                                    span: 8,
                                    value: this.formModel.paperDetails[2],
                                    fields: this.paperDetailsFields,
                                }}
                            ></sg-base-form>
                        </div>
                    )
                },
            },
        ]
        return {
            span: 24,
            fields,
        }
    }
    get paperDetailsFields() {
        return [
            // {
            //     tag: 'text',
            //     name: 'questionTypeCode',
            //     label: 'questionTypeCode',
            //     itemAttrs: {},
            //     visible: false,
            // },
            // {
            //     span: 24,
            //     tag: 'text',
            //     name: 'questionTypeName',
            //     label: 'questionTypeName',
            //     itemAttrs: {},
            //     visible: false,
            // },

            {
                span: 6,
                tag: 'select',
                name: 'subCategoryCode',
                label: '题目小类',
                itemAttrs: {
                    rules: [{ required: true, message: '请选择题目小类' }],
                },
                attrs: {
                    options: async () => {
                        return Object.values(QuestionBankSubCategoryEnumMap)
                    },
                },
            },
            {
                span: 6,
                tag: 'input',
                name: 'questionCount',
                label: '数量',
                itemAttrs: {
                    rules: [{ required: true, message: '请输入数量' }],
                },
            },
            {
                span: 6,
                tag: 'input',
                name: 'grade',
                label: '分值',
                itemAttrs: {
                    rules: [{ required: true, message: '请输入分值' }],
                },
            },
        ]
    }

    async submit() {
        try {
            this.loading = true
            await Promise.all([this.formRef.validate(), this.paperDetailsForm1?.validate(), this.paperDetailsForm2?.validate(), this.paperDetailsForm3?.validate()])

            // 计算总题目数
            const totalQuestions = Number(this.formModel.dan || 0) + Number(this.formModel.duo || 0) + Number(this.formModel.pan || 0) + Number(this.formModel.case || 0)
            this.formModel.grade_z = totalQuestions

            this.$message.success('保存成功')
            this.confirm()
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            this.loading = false
        }
    }

    cancel() {
        this.$options.cancel?.()
    }

    confirm() {
        this.$options.confirm?.(this.formModel)
    }

    async mounted() {
        if (this.action === 'modify') {
            const { data } = await getConfig({
                id: this.data.id,
            })
            this.$set(this, 'formModel', { ...data })
        }
    }
}
</script>

<style lang="less" scoped></style>
