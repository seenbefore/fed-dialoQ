<template>
    <div class="sg-page icinfo-ai CaseConfigAdd">
        <div class="content">
            {{ formModel }}
            <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel"></sg-base-form>
        </div>

        <div class="sg-form-actions">
            <el-button type="primary" @click="handleSubmit">确定</el-button>
            <el-button @click="handleCancel">取消</el-button>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Ref, Watch, Prop } from 'vue-property-decorator'
import { FormColumn, FormRef } from '@/sharegood-ui'
import DirectoryConfig from '../components/directory-config/index.vue'
import { getDetail } from './api'
import { tagsViewStore } from '@/store/useStore'

@Component({
    name: 'CaseConfigAdd',
    components: {
        DirectoryConfig,
    },
})
export default class CaseConfigAdd extends Vue {
    /**
     * 类型
     * add: 新增
     * edit: 编辑
     */
    @Prop({ default: 'add' }) type!: string
    /**
     * 主键ID
     */
    @Prop({ default: '' }) id!: string

    @Ref('formRef')
    formRef!: FormRef

    formModel: Record<string, any> = {
        volumeType: ['1'], // 正卷默认选中
        qrCode: '0', // 二维码默认隐藏
        barCode: '0', // 条形码默认隐藏
        photographerName: '0', // 拍摄人姓名默认隐藏
        approvalRequired: '1', // 默认需要审批
    }

    isValid = false

    mounted() {
        if (this.type === 'edit') {
            this.getDetail()
        }
    }
    async getDetail() {
        const res = await getDetail({ id: this.id })

        this.$set(this.formModel, 'directory1', [
            { name: '立案审批表', hasAttachment: 1, id: '1-1' },
            { name: '案件调查报告书', hasAttachment: 1, id: '2-1' },
        ])

        this.$set(this.formModel, 'directory2', [])
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'select',
                name: 'businessLine',
                label: '条线',
                attrs: {
                    placeholder: '请选择条线',
                    options: async () => {
                        return [
                            { label: '行政许可', value: '1' },
                            { label: '行政处罚', value: '2' },
                        ]
                    },
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择条线' }],
                },
            },
            {
                tag: 'radio',
                name: 'caseType',
                label: '卷宗类型',
                attrs: {
                    options: [
                        { label: '许可档案', value: '1' },
                        { label: '重大火灾隐患档案', value: '2' },
                        { label: '火灾事故简易调查档案', value: '3' },
                        { label: '火灾事故调查档案', value: '4' },
                        { label: '火灾事故认定复核档案', value: '5' },
                        { label: '简易行政处罚档案', value: '6' },
                        { label: '普通行政处罚档案', value: '7' },
                        { label: '临时查封档案', value: '8' },
                        { label: '行政强制执行档案', value: '9' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择卷宗类型' }],
                },
                class: 'caseType',
            },
            {
                tag: 'input',
                name: 'caseName',
                label: '卷宗名称',
                attrs: {
                    placeholder: '请输入',
                    maxlength: 20,
                    'show-word-limit': true,
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入卷宗名称' }],
                },
            },
            {
                tag: 'checkbox',
                name: 'volumeType',
                label: '正/副卷配置',
                attrs: {
                    options: [
                        { label: '正卷', value: '1', disabled: true },
                        { label: '副卷', value: '2' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择正/副卷配置' }],
                },
                class: 'volumeType',
            },
            {
                tag: 'custom',
                name: 'directory$',
                label: '目录',
                attrs: {
                    value: [1],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请配置目录' }],
                },
                appendRender: () => {
                    return (
                        <el-row gutter={20}>
                            <el-col class="" span={12}>
                                <DirectoryConfig props={{ value: this.formModel.directory1, type: 'main' }} />
                            </el-col>
                            <el-col class="" span={12}>
                                <DirectoryConfig props={{ value: this.formModel.directory2, type: 'default' }} />
                            </el-col>
                        </el-row>
                    )
                },
            },
            {
                tag: 'radio',
                name: 'qrCode',
                label: '封面二维码',
                attrs: {
                    options: [
                        { label: '隐藏', value: '0' },
                        { label: '显示', value: '1' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择是否显示二维码' }],
                    helpMessage: '显示二维码后，本部门人员可在卷宗封面扫码查看卷宗',
                },
            },
            {
                tag: 'radio',
                name: 'barCode',
                label: '封面条形码',
                attrs: {
                    options: [
                        { label: '隐藏', value: '0' },
                        { label: '显示', value: '1' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择是否显示条形码' }],
                    helpMessage: '显示条形码后，本部门人员可在卷宗封面扫码查看卷宗',
                },
            },
            {
                tag: 'radio',
                name: 'photographerName',
                label: '拍摄人姓名',
                attrs: {
                    options: [
                        { label: '隐藏', value: '0' },
                        { label: '显示', value: '1' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择是否显示拍摄人姓名' }],
                    helpMessage: '显示拍摄人姓名后，本部门人员可在卷宗封面扫码查看拍摄人',
                },
            },
            {
                tag: 'radio',
                name: 'approvalRequired',
                label: '申请查看卷宗',
                attrs: {
                    options: [
                        { label: '需档案管理员审批', value: '1' },
                        { label: '无需审批', value: '0' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择是否需要审批' }],
                },
            },
        ]

        return {
            labelWidth: '160px',
            span: 24,
            fields,
        }
    }

    async handleSubmit() {
        try {
            await this.formRef.validate(() => {}, true)
            // // TODO: 调用保存接口
            this.$message.success('保存成功')

            await tagsViewStore.delView(this.$route)
            this.$router.push('/file-review/case-config')
        } catch (error) {
            console.error(error)
        }
    }

    async handleCancel() {
        await tagsViewStore.delView(this.$route)
        this.$router.push('/file-review/case-config')
    }
}
</script>

<style lang="less" scoped>
.CaseConfigAdd ::v-deep {
    display: flex !important;
    flex-direction: column;
    padding: 0px !important;
    height: 100%;
    .content {
        padding: 20px;
        flex: 1;
        overflow-y: auto;
    }
    .sg-form-actions {
        height: 50px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-top: 1px solid #ddd;

        .el-button + .el-button {
            margin-left: 10px;
        }
    }
    .volumeType {
        .el-checkbox-group {
            display: flex;
        }
        .el-checkbox {
            flex: 1;
        }
    }
    .caseType {
        .el-radio {
            min-width: 160px;
            margin-bottom: 7px;
        }
    }
}
</style>
