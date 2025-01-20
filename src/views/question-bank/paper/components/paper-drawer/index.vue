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
import { QuestionBankCategoryEnumMap, QuestionBankCategoryEnum, QuestionTypeEnumMap, QuestionTypeEnum, QuestionBankSubCategoryEnumMap, QuestionBankSubCategoryEnum } from '@/views/question-bank/@enum'
import { getConfig, save, ExamPaperConfigVO, ExamPaperUpdateDTO, PaperDetailVO, ExamPaperBaseVO } from '../../api'

@Component({
    name: 'PaperDrawer',
    components: {},
})
export default class PaperDrawer extends Vue {
    @Prop({ default: () => ({}) }) data!: Record<string, any>
    @Prop({ default: 'create' }) action!: 'create' | 'modify'
    @Prop() id!: string

    @Ref('form') formRef!: FormRef

    loading = false
    formModel: any = {
        paperName: '',
        paperTypeCode: QuestionBankCategoryEnum.SAFETY_REGULATIONS,
        paperTypeName: QuestionBankCategoryEnumMap[QuestionBankCategoryEnum.SAFETY_REGULATIONS].label,
        duration: 0,
        totalScore: 100,
        passScore: 60,
        totalQuestions: 0,
        singleChoiceScore: 1,
        multipleChoiceScore: 2,
        judgeScore: 1,
        startTime: '',
        endTime: '',

        examTime: [],
        paperDetails: [
            // 企业负责人
            {
                categoryCode: QuestionBankCategoryEnum.SAFETY_REGULATIONS,
                categoryName: QuestionBankCategoryEnumMap[QuestionBankCategoryEnum.SAFETY_REGULATIONS].label,
                subCategoryCode: QuestionBankSubCategoryEnum.ENTERPRISE_LEADER,
                subCategoryName: QuestionBankSubCategoryEnumMap[QuestionBankSubCategoryEnum.ENTERPRISE_LEADER].label,
                questionTypeCode: QuestionTypeEnum.SINGLE_CHOICE,
                questionTypeName: QuestionTypeEnumMap[QuestionTypeEnum.SINGLE_CHOICE].label,
                questionCount: 20,
            },
            {
                categoryCode: QuestionBankCategoryEnum.SAFETY_REGULATIONS,
                categoryName: QuestionBankCategoryEnumMap[QuestionBankCategoryEnum.SAFETY_REGULATIONS].label,
                subCategoryCode: QuestionBankSubCategoryEnum.ENTERPRISE_LEADER,
                subCategoryName: QuestionBankSubCategoryEnumMap[QuestionBankSubCategoryEnum.ENTERPRISE_LEADER].label,
                questionTypeCode: QuestionTypeEnum.MULTIPLE_CHOICE,
                questionTypeName: QuestionTypeEnumMap[QuestionTypeEnum.MULTIPLE_CHOICE].label,
                questionCount: 30,
            },
            {
                categoryCode: QuestionBankCategoryEnum.SAFETY_REGULATIONS,
                categoryName: QuestionBankCategoryEnumMap[QuestionBankCategoryEnum.SAFETY_REGULATIONS].label,
                subCategoryCode: QuestionBankSubCategoryEnum.ENTERPRISE_LEADER,
                subCategoryName: QuestionBankSubCategoryEnumMap[QuestionBankSubCategoryEnum.ENTERPRISE_LEADER].label,
                questionTypeCode: QuestionTypeEnum.TRUE_FALSE,
                questionTypeName: QuestionTypeEnumMap[QuestionTypeEnum.TRUE_FALSE].label,
                questionCount: 20,
            },
            // 安全管理员
            {
                categoryCode: QuestionBankCategoryEnum.SAFETY_REGULATIONS,
                categoryName: QuestionBankCategoryEnumMap[QuestionBankCategoryEnum.SAFETY_REGULATIONS].label,
                subCategoryCode: QuestionBankSubCategoryEnum.SAFETY_MANAGER,
                subCategoryName: QuestionBankSubCategoryEnumMap[QuestionBankSubCategoryEnum.SAFETY_MANAGER].label,
                questionTypeCode: QuestionTypeEnum.SINGLE_CHOICE,
                questionTypeName: QuestionTypeEnumMap[QuestionTypeEnum.SINGLE_CHOICE].label,
                questionCount: 20,
            },
            {
                categoryCode: QuestionBankCategoryEnum.SAFETY_REGULATIONS,
                categoryName: QuestionBankCategoryEnumMap[QuestionBankCategoryEnum.SAFETY_REGULATIONS].label,
                subCategoryCode: QuestionBankSubCategoryEnum.SAFETY_MANAGER,
                subCategoryName: QuestionBankSubCategoryEnumMap[QuestionBankSubCategoryEnum.SAFETY_MANAGER].label,
                questionTypeCode: QuestionTypeEnum.MULTIPLE_CHOICE,
                questionTypeName: QuestionTypeEnumMap[QuestionTypeEnum.MULTIPLE_CHOICE].label,
                questionCount: 30,
            },
            {
                categoryCode: QuestionBankCategoryEnum.SAFETY_REGULATIONS,
                categoryName: QuestionBankCategoryEnumMap[QuestionBankCategoryEnum.SAFETY_REGULATIONS].label,
                subCategoryCode: QuestionBankSubCategoryEnum.SAFETY_MANAGER,
                subCategoryName: QuestionBankSubCategoryEnumMap[QuestionBankSubCategoryEnum.SAFETY_MANAGER].label,
                questionTypeCode: QuestionTypeEnum.TRUE_FALSE,
                questionTypeName: QuestionTypeEnumMap[QuestionTypeEnum.TRUE_FALSE].label,
                questionCount: 20,
            },
        ],
    }

    get title() {
        return this.action === 'create' ? '新增试卷' : '编辑试卷'
    }

    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                span: 24,
                tag: 'select',
                name: 'paperTypeCode',
                label: '试卷类型',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return Object.values(QuestionBankCategoryEnumMap)
                    },
                    onChange: ({ value, label }: any) => {
                        this.formModel.paperTypeName = label
                    },
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择试卷类型' }],
                },
            },
            {
                span: 24,
                tag: 'input',
                name: 'paperName',
                label: '试卷名称',
                attrs: {
                    placeholder: '请输入试卷名称',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入试卷名称' }],
                },
            },
            {
                span: 24,
                tag: 'daterange',
                name: 'examTime',
                label: '考试时间',
                attrs: {
                    value: [],
                    'value-format': 'yyyy-MM-dd HH:mm:ss',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    'start-placeholder': '开始时间',
                    'end-placeholder': '结束时间',
                    type: 'datetime',
                    defaultTime: ['09:00:00', '10:00:00'],
                    style: 'flex: 1',
                    class: 'sg-flexbox align-center',

                    // appendSlotRender: () => {
                    //     // 计算考试时长
                    //     const [startTime, endTime] = this.formModel.examTime || []
                    //     const duration = (new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000
                    //     return <div style="width: 150px;">考试时长: {duration}分钟</div>
                    // },
                    onInput: value => {
                        const [startTime, endTime] = value || []
                        if (startTime && endTime) {
                            const duration = (new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000
                            this.formModel.duration = duration
                        }
                    },
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择考试时间' }],
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
                    disabled: true,
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
                attrs: {
                    type: 'number',
                    min: 0,
                    //disabled: true,
                },
            },
            {
                span: 12,
                tag: 'input',
                name: 'passScore',
                label: '及格分',
                attrs: {
                    type: 'number',
                    min: 0,
                    placeholder: '请输入及格分',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入及格分' }],
                },
            },
            {
                span: 12,
                tag: 'input',
                name: 'totalQuestions',
                label: '总题数',
                attrs: {
                    type: 'number',
                    disabled: true,
                },
                render: () => {
                    // 计算总题数
                    const totalQuestions = (this.formModel.paperDetails || []).reduce((sum: number, item: PaperDetailVO) => {
                        return sum + Number(item.questionCount || 0)
                    }, 0)
                    return <div>{totalQuestions}</div>
                },
            },

            {
                span: 8,
                tag: 'input',
                name: 'singleChoiceScore',
                label: '单选题分值',
                attrs: {
                    type: 'number',
                    min: 0,
                    placeholder: '请输入单选题分值',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入单选题分值' }],
                },
            },
            {
                span: 8,
                tag: 'input',
                name: 'multipleChoiceScore',
                label: '多选题分值',
                attrs: {
                    type: 'number',
                    min: 0,
                    placeholder: '请输入多选题分值',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入多选题分值' }],
                },
            },
            {
                span: 8,
                tag: 'input',
                name: 'judgeScore',
                label: '判断题分值',
                attrs: {
                    type: 'number',
                    min: 0,
                    placeholder: '请输入判断题分值',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入判断题分值' }],
                },
            },
            {
                span: 24,
                tag: 'custom',
                name: 'paperDetails',
                label: '试题配置',
                render: () => {
                    // 按类别分组显示试题配置
                    const groupedDetails = this.getGroupedPaperDetails()

                    return (
                        <div class="paper-details">
                            {Object.entries(groupedDetails).map(([subCategory, items]) => (
                                <div class="paper-category" key={subCategory}>
                                    <div class="category-title">{subCategory}</div>
                                    <div class="category-content">
                                        {items.map((item: PaperDetailVO) => (
                                            <div class="paper-detail-item" key={`${item.subCategoryCode}-${item.questionTypeCode}`}>
                                                <div class="paper-detail-header">
                                                    <span>{item.questionTypeName}</span>
                                                    {/* <span class="total-count">共{this.getQuestionBankCount(item.questionTypeCode)}题</span> */}
                                                </div>
                                                <el-input-number
                                                    v-model={item.questionCount}
                                                    min={0}
                                                    max={this.getQuestionBankCount(item.questionTypeCode)}
                                                    placeholder="题目数量"
                                                    onChange={(val: number) => this.handleQuestionCountChange(val, item)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
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

    // 获取题库中各类型题目的总数
    getQuestionBankCount(questionTypeCode: string) {
        switch (questionTypeCode) {
            case QuestionTypeEnum.SINGLE_CHOICE: // 单选题
                return 120
            case QuestionTypeEnum.MULTIPLE_CHOICE: // 多选题
                return 90
            case QuestionTypeEnum.TRUE_FALSE: // 判断题
                return 90
            default:
                return 0
        }
    }

    // 按类别分组试题配置
    getGroupedPaperDetails() {
        const grouped: Record<string, PaperDetailVO[]> = {}
        ;(this.formModel.paperDetails || []).forEach((item: PaperDetailVO) => {
            if (!grouped[item.subCategoryName]) {
                grouped[item.subCategoryName] = []
            }
            grouped[item.subCategoryName].push(item)
        })

        return grouped
    }

    handleQuestionCountChange(val: number, item: PaperDetailVO) {
        this.calculateTotalScore()
    }

    calculateTotalScore() {
        let totalScore = 0
        let totalQuestions = 0
        ;(this.formModel.paperDetails || []).forEach((item: PaperDetailVO) => {
            const count = Number(item.questionCount || 0)
            totalQuestions += count

            if (item.questionTypeCode === QuestionTypeEnum.SINGLE_CHOICE) {
                totalScore += count * (this.formModel.singleChoiceScore || 0)
            } else if (item.questionTypeCode === QuestionTypeEnum.MULTIPLE_CHOICE) {
                totalScore += count * (this.formModel.multipleChoiceScore || 0)
            } else if (item.questionTypeCode === QuestionTypeEnum.TRUE_FALSE) {
                totalScore += count * (this.formModel.judgeScore || 0)
            }
        })

        //this.formModel.totalScore = totalScore
        this.formModel.totalQuestions = totalQuestions
    }

    async submit() {
        try {
            this.loading = true
            await this.formRef.validate()

            const [startTime, endTime] = this.formModel.examTime || []
            const { examTime, ...rest } = this.formModel
            const payload: ExamPaperUpdateDTO = {
                ...rest,
                id: this.action === 'modify' ? this.id : undefined,
                startTime,
                endTime,
            }

            await save(payload)
            this.$message.success('保存成功')
            this.confirm()
        } catch (error) {
            console.error(error)
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

    @Watch('formModel', { deep: true })
    onFormModelChange() {
        this.calculateTotalScore()
    }

    async mounted() {
        if (this.action === 'modify') {
            const { data } = await getConfig({
                id: this.data.id,
            })
            const formData: ExamPaperConfigVO & { examTime: string[] } = {
                ...data,
                paperDetails: data.details || [],
                examTime: data.startTime && data.endTime ? [data.startTime, data.endTime] : [],
            }
            console.log(formData.paperDetails)
            this.$set(this, 'formModel', formData)
        }
    }
}
</script>

<style lang="less" scoped>
.paper-details {
    .paper-category {
        margin-bottom: 20px;

        .category-title {
            font-size: 14px;
            font-weight: bold;
            // margin-bottom: 10px;
            // padding: 8px;
            // background-color: #f5f7fa;
            border-radius: 4px;
        }

        .category-content {
            padding: 0 10px;
        }
    }

    .paper-detail-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ebeef5;
        border-radius: 4px;

        .paper-detail-header {
            flex: 1;
            margin-right: 10px;
            display: flex;
            align-items: center;

            span {
                margin-right: 10px;
                &.total-count {
                    color: #909399;
                    font-size: 13px;
                }
            }
        }

        .el-input-number {
            width: 120px;
        }
    }
}
</style>
