<template>
    <el-dialog class="icinfo-ai CaseDialog" :title="title" :visible="true" width="800px" @close="cancel">
        <sg-base-form ref="form" v-model="formModel" v-bind="getFormAttrs" v-loading="loading"></sg-base-form>
        <template v-slot:footer>
            <el-button type="primary" @click="submit" :disabled="loading">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef } from '@/sharegood-ui'
import { CaseTypeEnum, CaseTypeEnumMap, PriorityEnum, PriorityEnumMap } from '../../enum'
import { save, detail } from '../../api'

@Component({
    name: 'CaseDialog',
    methods: {
        cancel() {
            this.$options.cancel?.()
        },
        confirm(result?: any) {
            this.$options.confirm?.(result)
        },
    },
})
export default class CaseDialog extends Vue {
    /** id */
    @Prop() id!: string
    /** 操作类型 modify 修改 create 新增 */
    @Prop({ default: 'modify' }) action!: 'modify' | 'create'

    formModel: any = {
        id: this.id,
    }

    loading = false

    @Ref('form')
    formRef!: FormRef

    async created() {
        if (this.action === 'modify' && this.id) {
            try {
                this.loading = true
                const { data } = await detail({ id: this.id }, { exShowLoading: true })
                this.formModel = data
            } catch (error) {
                console.error(error)
            } finally {
                this.loading = false
            }
        }
    }

    get title() {
        return this.action === 'modify' ? '编辑用例' : '新增用例'
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'name',
                label: '用例名称',
                attrs: {
                    placeholder: '请输入用例名称',
                    maxlength: 50,
                    'show-word-limit': true,
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入用例名称' }],
                },
            },
            {
                tag: 'select',
                name: 'type',
                label: '用例类型',
                attrs: {
                    placeholder: '请选择用例类型',
                    options: Object.values(CaseTypeEnumMap),
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择用例类型' }],
                },
            },
            {
                tag: 'select',
                name: 'priority',
                label: '优先级',
                attrs: {
                    placeholder: '请选择优先级',
                    options: Object.values(PriorityEnumMap),
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择优先级' }],
                },
            },
            {
                tag: 'input',
                name: 'precondition',
                label: '前置条件',
                attrs: {
                    type: 'textarea',
                    placeholder: '请输入前置条件',
                    maxlength: 500,
                    'show-word-limit': true,
                },
            },
            {
                tag: 'input',
                name: 'steps',
                label: '测试步骤',
                attrs: {
                    type: 'textarea',
                    placeholder: '请输入测试步骤',
                    maxlength: 2000,
                    'show-word-limit': true,
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入测试步骤' }],
                },
            },
            {
                tag: 'input',
                name: 'expectedResult',
                label: '预期结果',
                attrs: {
                    type: 'textarea',
                    placeholder: '请输入预期结果',
                    maxlength: 1000,
                    'show-word-limit': true,
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入预期结果' }],
                },
            },
            {
                tag: 'input',
                name: 'remark',
                label: '备注',
                attrs: {
                    type: 'textarea',
                    placeholder: '请输入备注',
                    maxlength: 500,
                    'show-word-limit': true,
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
            await this.formRef.validate(null, true)
            const formModel = this.formModel
            const payload: any = {
                id: formModel.id,
                name: formModel.name,
                type: formModel.type,
                priority: formModel.priority,
                precondition: formModel.precondition,
                steps: formModel.steps,
                expectedResult: formModel.expectedResult,
                remark: formModel.remark,
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
}
</script>

<style scoped lang="less">
.CaseDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
