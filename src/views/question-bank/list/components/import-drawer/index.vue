<template>
    <el-drawer title="导入题库" :visible="true" size="600px" @close="cancel" :before-close="cancel" custom-class="my-drawer">
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
    name: 'ImportDrawer',
    components: {},
})
export default class ImportDrawer extends Vue {
    @Ref('form')
    formRef!: FormRef

    loading = false
    formModel: Record<string, any> = {
        kind: '', // 所属大类
        file: null, // 上传的文件
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
                tag: 'custom',
                name: 'file',
                label: '上传文件',
                appendRender: (h, { row }) => {
                    return (
                        <div>
                            <el-upload
                                action="#"
                                accept=".xlsx,.xls"
                                beforeUpload={this.beforeUpload}
                                onChange={this.handleFileChange}
                                fileList={this.formModel.fileList || []}
                                limit={1}
                                auto-upload={false}
                            >
                                <el-button size="small" type="primary">
                                    选择文件
                                </el-button>
                                <div slot="tip" class="el-upload__tip">
                                    只能上传xlsx/xls文件，且不超过10MB
                                </div>
                            </el-upload>
                            <el-button type="text" onClick={this.downloadTemplate}>
                                <i class="el-icon-download"></i>
                                下载模板
                            </el-button>
                        </div>
                    )
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请上传文件' }],
                },
            },
            {
                name: 'tips',
                render: h => {
                    return (
                        <div class="tips">
                            <p>导入说明：</p>
                            <p>1. 请先下载模板文件</p>
                            <p>2. 按照模板格式填写题目数据</p>
                            <p>3. 上传填写好的Excel文件</p>
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

    // 下载模板
    downloadTemplate() {
        window.open('/api/question-bank/template/download')
    }

    // 文件上传前校验
    beforeUpload(file: File) {
        const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        const isValidType = validTypes.includes(file.type)
        if (!isValidType) {
            this.$message.error('请上传Excel文件')
            return false
        }

        const isLt10M = file.size / 1024 / 1024 < 10
        if (!isLt10M) {
            this.$message.error('文件大小不能超过10MB')
            return false
        }

        return false // 阻止自动上传
    }

    // 文件变化时的回调
    handleFileChange(file: any, fileList: any[]) {
        this.formModel.file = file.raw
        this.formModel.fileList = fileList.slice(-1)
    }

    async submit() {
        try {
            this.loading = true
            await this.formRef.validate()
            // 模拟上传
            await new Promise(resolve => setTimeout(resolve, 1500))
            this.$message.success('导入成功')
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
        this.$options.confirm?.(true)
    }
}
</script>

<style lang="less" scoped>
.drawer-container::v-deep {
    .tips {
        margin-top: 20px;
        padding: 15px;
        background: #f5f7fa;
        border-radius: 4px;

        p {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
        }
    }
}
</style>
