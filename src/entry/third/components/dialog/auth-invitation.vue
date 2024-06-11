<!-- 发起信息授权申请 -->
<template>
    <div class="auth-invitation">
        <el-dialog class="sg-dialog" visible width="50%" :title="title" :close-on-click-modal="false" v-loading="loading" @close="cancel">
            <div class="dialog-body">
                <sg-base-form ref="formRef" size="small" label-width="120px" v-model="formView.model" :fields="formView.fields" :span="24">
                    <template slot="authFileSlot">
                        <el-upload class="upload" action="#" :http-request="handleUpload">
                            <el-button type="primary" round>上传文件</el-button>
                            <div>支持扩展名：.pdf,.jpg, .jpeg, .png</div>
                        </el-upload>
                    </template>
                </sg-base-form>
            </div>
            <!-- 操作区 -->
            <div class="sg-dialog-footer">
                <el-button v-if="title === '添加授权'" type="primary" @click="confirm">提交</el-button>
                <el-button v-else type="primary" @click="confirm">生成授权码</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as API from '@/entry/third/api'
export default {
    name: 'EditUser',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            loading: false,
            formView: {
                model: {},
                fields: [
                    {
                        tag: 'input',
                        name: 'entName',
                        label: '企业名称',
                        attrs: {
                            placeholder: '请输入企业名称',
                        },
                        itemAttrs: {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入企业名称',
                                    trigger: 'change',
                                },
                            ],
                        },
                    },
                    {
                        tag: 'input',
                        name: 'unicode',
                        label: '企业统一代码/注册号',
                        attrs: {
                            placeholder: '请输入企业统一代码/注册号',
                            disabled: true,
                        },
                        itemAttrs: {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入企业统一代码/注册号',
                                    trigger: 'change',
                                },
                            ],
                        },
                    },
                    {
                        tag: 'slot',
                        slotName: 'authFileSlot',
                        name: 'authFile',
                        label: '授权文件',
                        ifRender: () => this.title === '添加授权',
                        itemAttrs: {
                            rules: [
                                {
                                    required: true,
                                },
                            ],
                        },
                    },
                    {
                        tag: 'date',
                        label: '授权期限',
                        name: 'dateCount',
                        attrs: {
                            value: [],
                            type: 'daterange',
                            valueFormat: 'yyyy-MM-dd',
                            startPlaceholder: '授权开始日期',
                            endPlaceholder: '授权结束日期',
                        },
                        itemAttrs: {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择授权期限',
                                    trigger: 'change',
                                },
                            ],
                        },
                    },
                    {
                        tag: 'input',
                        name: 'remark',
                        label: '备注',
                        span: 24,
                        attrs: {
                            type: 'textarea',
                            rows: '4',
                            maxlength: 500,
                            'show-word-limit': true,
                            resize: 'none',
                            placeholder: '请输入备注，限500字以内',
                        },
                    },
                ],
            },
        }
    },
    computed: {},
    mounted() {},
    methods: {
        cancel() {
            this.$options.cancel()
        },
        confirm() {
            this.$refs['formRef'].validate(async valid => {
                if (valid) {
                    this.loading = true
                    const { ...model } = this.formView.model
                    await API.addUser(model).finally(() => (this.loading = false))
                    this.$message.success('发起信息授权申请成功')
                    this.$options.confirm()
                    this.$modalDialog(() => import('./credit-code.vue'))
                }
            })
        },
        // 点击上传
        async handleUpload(file) {
            const FILE_LIST = ['pdf', 'doc', 'docx', 'png', 'jpg', 'PDF', 'DOC', 'DOCX', 'PNG', 'JPG']
            const tempFile = file.file?.name?.split('.')
            // 确保取到的是最后的后缀名
            const fileType = tempFile[tempFile.length - 1]
            if (!FILE_LIST.includes(fileType)) {
                this.$message.error('仅支持.pdf .doc .docx .png .jpg类型！')
                return false
            }
            // 限制5M内
            const sizeLimit = file.file?.size / 1024 / 1024 <= 5
            if (!sizeLimit) {
                this.$message.error('单个文件不能超过5M！')
                return false
            }
            const formData = new FormData()
            formData.append('file', file.file)
            try {
                const res = await this.$http.$uploadFile({
                    url: '/file/upload/uploadDoubtfulFile',
                    method: 'post',
                    data: formData,
                })
                this.$message.success({
                    type: 'success',
                    message: '上传成功！',
                })
            } catch (error) {
                this.$message.error('网络异常！')
            }
        },
    },
}
</script>

<style lang="less" scoped>
.auth-invitation {
    .upload {
        /deep/ .el-upload {
            text-align: left;
        }
    }
}
</style>
