<template>
    <el-drawer :title="title" :visible="true" size="800px" @close="cancel" :before-close="cancel" class="my-drawer" custom-class="my-drawer">
        <div class="drawer-container">
            <div class="drawer-main">
                <!-- {{ formModel }} -->
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
import { FormColumn, FormRef } from '@/sharegood-ui'
import { save, QuestionVO, QuestionOption } from '../../api'
import { QuestionBankCategoryEnum, QuestionBankCategoryEnumMap, QuestionBankSubCategoryEnum, QuestionBankSubCategoryEnumMap, QuestionTypeEnum, QuestionTypeEnumMap } from '@/views/question-bank/@enum'

@Component({
    name: 'QuestionDrawer',
    components: {},
})
export default class QuestionDrawer extends Vue {
    // 编辑对象数据
    @Prop({ default: () => ({}) }) data!: Record<string, any>
    @Prop({ default: 'create' }) action!: 'create' | 'modify'
    @Prop() id!: string

    @Ref('form')
    formRef!: FormRef

    loading = false
    formModel: Record<string, any> = {
        questionTypeCode: QuestionTypeEnum.SINGLE_CHOICE, // 默认单选题
        questionTypeName: QuestionTypeEnumMap[QuestionTypeEnum.SINGLE_CHOICE].label,
        categoryCode: QuestionBankCategoryEnum.SAFETY_REGULATIONS, // 默认安全法规
        categoryName: QuestionBankCategoryEnumMap[QuestionBankCategoryEnum.SAFETY_REGULATIONS].label,
        subCategoryCode: QuestionBankSubCategoryEnum.ENTERPRISE_LEADER, // 默认企业负责人
        subCategoryName: QuestionBankSubCategoryEnumMap[QuestionBankSubCategoryEnum.ENTERPRISE_LEADER].label,
        correctAnswer: '',
    }

    get title() {
        return this.action === 'create' ? '新增题目' : '编辑题目'
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'select',
                name: 'categoryCode',
                label: '所属大类',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return Object.values(QuestionBankCategoryEnumMap)
                    },
                    onChange: ({ value, label }: any) => {
                        this.formModel.categoryName = label
                    },
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择所属大类' }],
                },
            },
            {
                tag: 'select',
                name: 'subCategoryCode',
                label: '所属小类',
                componentProps({ formModel }) {
                    const { categoryCode } = formModel
                    return {
                        attrs: {
                            placeholder: '请选择',
                            options: async () => {
                                if (!categoryCode) return []
                                return Object.values(QuestionBankSubCategoryEnumMap).filter((item: any) => item.parentValue === categoryCode)
                            },
                            onChange: ({ value, label }: any) => {
                                this.formModel.subCategoryName = label
                            },
                        },
                    }
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择所属小类' }],
                },
            },
            {
                tag: 'radio',
                name: 'questionTypeCode',
                label: '题目类型',
                attrs: {
                    options: Object.values(QuestionTypeEnumMap),
                    onChange: ({ value, label }: any) => {
                        this.formModel.questionTypeCode = value
                        this.formModel.questionTypeName = label
                    },
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择题目类型' }],
                },
            },
            {
                tag: 'input',
                name: 'questionContent',
                label: '题目',
                attrs: {
                    type: 'textarea',
                    rows: 4,
                    placeholder: '请输入题目内容',
                    maxlength: 500,
                    'show-word-limit': true,
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入题目' }],
                },
            },
            {
                tag: 'input',
                name: 'A',
                label: 'A',
                attrs: {
                    placeholder: '请输入选项内容',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入选项内容' }],
                },
            },
            {
                tag: 'input',
                name: 'B',
                label: 'B',
                attrs: {
                    placeholder: '请输入选项内容',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入选项内容' }],
                },
            },
            {
                tag: 'input',
                name: 'C',
                label: 'C',
                attrs: {
                    placeholder: '请输入选项内容',
                },
                itemAttrs: {
                    //rules: [{ required: true, message: '请输入选项内容' }],
                },
            },
            {
                tag: 'input',
                name: 'D',
                label: 'D',
                attrs: {
                    placeholder: '请输入选项内容',
                },
                itemAttrs: {
                    //rules: [{ required: true, message: '请输入选项内容' }],
                },
            },
            {
                tag: 'input',
                name: 'E',
                label: 'E',
                attrs: {
                    placeholder: '请输入选项内容',
                },
                itemAttrs: {
                    //rules: [{ required: true, message: '请输入选项内容' }],
                },
            },
            {
                tag: 'input',
                name: 'F',
                label: 'F',
                attrs: {
                    placeholder: '请输入选项内容',
                },
                itemAttrs: {
                    //rules: [{ required: true, message: '请输入选项内容' }],
                },
            },
            {
                tag: 'checkbox',
                name: 'correctAnswer$',
                label: '答案',
                attrs: {
                    value: [],
                    // min: 1,
                    // max: 1,
                    options: [
                        { label: 'A', value: 'A' },
                        { label: 'B', value: 'B' },
                        { label: 'C', value: 'C' },
                        { label: 'D', value: 'D' },
                        { label: 'E', value: 'E' },
                        { label: 'F', value: 'F' },
                    ],
                },
                // componentProps({ formModel }) {
                //     const { questionTypeCode } = formModel
                //     return {
                //         attrs: {
                //             value: [],
                //             min: 1,
                //             max: questionTypeCode === QuestionTypeEnum.SINGLE_CHOICE ? 1 : null,
                //             options: [
                //                 { label: 'A', value: 'A' },
                //                 { label: 'B', value: 'B' },
                //                 { label: 'C', value: 'C' },
                //                 { label: 'D', value: 'D' },
                //                 { label: 'E', value: 'E' },
                //                 { label: 'F', value: 'F' },
                //             ],
                //         },
                //     }
                // },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择答案' }],
                },

                //ifRender: model => model.type === QuestionTypeEnum.SINGLE_CHOICE, // 仅单选题显示
            },
        ]
        return {
            span: 24,
            fields,
        }
    }

    async submit() {
        try {
            this.loading = true
            await this.formRef.validate()

            // 构建保存数据
            const formModel = this.formModel

            // 构建选项数据
            const keys = ['A', 'B', 'C', 'D', 'E', 'F']
            let options: QuestionOption[] = keys
                .map((key, index) => ({
                    code: key,
                    content: formModel[key],
                }))
                .filter(item => item.content !== '')

            const payload: QuestionVO = {
                id: this.id,
                categoryCode: formModel.categoryCode,
                categoryName: formModel.categoryName,
                subCategoryCode: formModel.subCategoryCode,
                subCategoryName: formModel.subCategoryName,
                questionTypeCode: formModel.questionTypeCode,
                questionTypeName: formModel.questionTypeName,
                questionContent: formModel.questionContent,
                questionOptions: JSON.stringify(options),
                correctAnswer: formModel.correctAnswer$.join(','),
            }

            // 调用保存接口
            await save(payload)

            this.$message.success('保存成功')
            this.confirm()
        } catch (error) {
            console.error(error)
            // 如果是表单校验错误,不提示
            if (error?.message) {
                this.$message.error(error.message)
            }
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
            const data = { ...this.data }
            // 解析选项数据
            if (data.questionOptions) {
                const options = JSON.parse(data.questionOptions)
                options.forEach((option: QuestionOption, index: number) => {
                    data[`${option.code}`] = option.content
                })
            }
            const correctAnswer$ = data.correctAnswer.split(',')
            this.$set(this, 'formModel', { ...data, correctAnswer$ })
        }
    }
}
</script>

<style lang="less" scoped>
.my-drawer {
    .drawer-container {
        height: 100%;
        display: flex;
        flex-direction: column;

        .drawer-main {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
        }

        .drawer-footer {
            padding: 20px;
            text-align: right;
            border-top: 1px solid #e8e8e8;
        }
    }
}
</style>
