<template>
    <el-drawer :title="title" :visible="true" size="600px" @close="cancel" :before-close="cancel" custom-class="my-drawer">
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

@Component({
    name: 'PaperDrawer',
    components: {},
})
export default class PaperDrawer extends Vue {
    @Prop({ default: () => ({}) }) data!: Record<string, any>
    @Prop({ default: 'create' }) action!: 'create' | 'modify'
    @Prop() id!: string

    @Ref('form')
    formRef!: FormRef

    loading = false
    formModel: Record<string, any> = {
        duration: 60,
        grade_score: 100,
        dan_grade: 1,
        duo_grade: 2,
        pan_grade: 1,
        case_grade: 5,
    }

    get title() {
        return this.action === 'create' ? '新增试卷' : '编辑试卷'
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
                        return [{ label: '消防文员执法资格考试', value: '1' }]
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
                name: 'grade_score',
                label: '总分',
                attrs: {
                    type: 'number',
                    min: 0,
                    placeholder: '请输入总分',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入总分' }],
                },
            },
            {
                span: 12,
                tag: 'input',
                name: 'dan',
                label: '单选题数量',
                attrs: {
                    type: 'number',
                    min: 0,
                    placeholder: '请输入单选题数量',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入单选题数量' }],
                },
            },
            {
                span: 12,
                tag: 'input',
                name: 'dan_grade',
                label: '单选题分值',
                attrs: {
                    type: 'number',
                    min: 0,
                    step: 0.5,
                    placeholder: '请输入单选题分值',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入单选题分值' }],
                },
            },
            {
                span: 12,
                tag: 'input',
                name: 'duo',
                label: '多选题数量',
                attrs: {
                    type: 'number',
                    min: 0,
                    placeholder: '请输入多选题数量',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入多选题数量' }],
                },
            },
            {
                span: 12,
                tag: 'input',
                name: 'duo_grade',
                label: '多选题分值',
                attrs: {
                    type: 'number',
                    min: 0,
                    step: 0.5,
                    placeholder: '请输入多选题分值',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入多选题分值' }],
                },
            },
            {
                span: 12,
                tag: 'input',
                name: 'pan',
                label: '判断题数量',
                attrs: {
                    type: 'number',
                    min: 0,
                    placeholder: '请输入判断题数量',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入判断题数量' }],
                },
            },
            {
                span: 12,
                tag: 'input',
                name: 'pan_grade',
                label: '判断题分值',
                attrs: {
                    type: 'number',
                    min: 0,
                    step: 0.5,
                    placeholder: '请输入判断题分值',
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入判断题分值' }],
                },
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

            // 计算总题目数
            const totalQuestions = Number(this.formModel.dan || 0) + Number(this.formModel.duo || 0) + Number(this.formModel.pan || 0) + Number(this.formModel.case || 0)
            this.formModel.grade_z = totalQuestions

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

    mounted() {
        if (this.action === 'modify') {
            this.$set(this, 'formModel', { ...this.data })
        }
    }
}
</script>

<style lang="less" scoped></style>
