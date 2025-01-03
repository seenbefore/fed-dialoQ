<template>
    <el-drawer :title="title" :visible="true" size="800px" @close="cancel" :before-close="cancel" class="my-drawer" custom-class="my-drawer">
        <div class="drawer-container">
            <div class="drawer-main">
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
import { save, QuestionVO } from '../../api'

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
        type: '0', // 默认单选题
    }

    get title() {
        return this.action === 'create' ? '新增题目' : '编辑题目'
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'select',
                name: 'kind',
                label: '所属大类',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return [{ label: '2024年全省协助执法文员考试', value: '1' }]
                    },
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择所属大类' }],
                },
            },
            {
                tag: 'select',
                name: 'category',
                label: '所属分类',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return [{ label: '法律法规', value: '1' }]
                    },
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择所属分类' }],
                },
            },
            {
                tag: 'radio',
                name: 'type',
                label: '题目类型',
                attrs: {
                    options: [
                        { label: '单选题', value: '0' },
                        { label: '多选题', value: '1' },
                        { label: '判断题', value: '2' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择题目类型' }],
                },
            },
            {
                tag: 'input',
                name: 'title',
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
                name: 'option1',
                label: '选项一',
                attrs: {
                    placeholder: '请输入选项内容',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入选项内容' }],
                },
                ifRender: model => model.type !== '2', // 判断题不显示选项
            },
            {
                tag: 'input',
                name: 'option2',
                label: '选项二',
                attrs: {
                    placeholder: '请输入选项内容',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入选项内容' }],
                },
                ifRender: model => model.type !== '2',
            },
            {
                tag: 'input',
                name: 'option3',
                label: '选项三',
                attrs: {
                    placeholder: '请输入选项内容',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入选项内容' }],
                },
                ifRender: model => model.type === '0', // 仅单选题显示
            },
            {
                tag: 'input',
                name: 'option4',
                label: '选项四',
                attrs: {
                    placeholder: '请输入选项内容',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入选项内容' }],
                },
                ifRender: model => model.type === '0', // 仅单选题显示
            },
            {
                tag: 'radio',
                name: 'answer1',
                label: '答案',
                attrs: {
                    options: [
                        { label: 'A', value: 'A' },
                        { label: 'B', value: 'B' },
                        { label: 'C', value: 'C' },
                        { label: 'D', value: 'D' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择答案' }],
                },
                ifRender: model => model.type === '0', // 仅单选题显示
            },
            {
                tag: 'checkbox',
                name: 'answer2',
                label: '答案',
                attrs: {
                    value: [],
                    options: [
                        { label: 'A', value: 'A' },
                        { label: 'B', value: 'B' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择答案' }],
                },
                ifRender: model => model.type === '1', // 仅多选题显示
            },
            {
                tag: 'radio',
                name: 'answer3',
                label: '答案',
                attrs: {
                    options: [
                        { label: '正确', value: '1' },
                        { label: '错误', value: '0' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择答案' }],
                },
                ifRender: model => model.type === '2', // 仅判断题显示
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
            const payload: Partial<QuestionVO> = {
                id: this.id,
                kind: formModel.kind,
                case_name: formModel.category,
                type: formModel.type,
                title: formModel.title,
                option1: formModel.option1,
                option2: formModel.option2,
                option3: formModel.option3,
                option4: formModel.option4,
                answer: formModel.type === '0' ? formModel.answer1 : formModel.type === '1' ? formModel.answer2.join(',') : formModel.answer3,
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
            this.$set(this, 'formModel', { ...this.data })
        }
    }
}
</script>

<style lang="less" scoped></style>
