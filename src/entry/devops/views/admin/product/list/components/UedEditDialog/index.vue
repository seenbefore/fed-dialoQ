<template>
    <el-dialog ref="dialog" :title="myTitle" visible class="ProductEditDialog" :fullscreen="false" :append-to-body="false" :close-on-click-modal="false" width="600px" v-bind="$attrs" @close="cancel">
        <div class="pre-deploy-dialog__content">
            <sg-base-form label-width="120px" ref="formRef" :fields="formFields" v-model="formModel" :span="24"></sg-base-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="handleSubmit" :disabled="View.loading">保 存</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api'
import { FormColumn, FormRef, CreateElement } from '@/sharegood-ui'
import { http } from '@/entry/devops/scripts/http'
import { userStore } from '@/entry/devops/store/useStore'

const defaultData = {
    title: '',
    version: '',
    ued_url: undefined,
    ued_icons: [] as any[],
    ued_urls: [] as any[],
    ued_type: 'zip',
    uuid: '',
}
type FormModel = typeof defaultData

@Component({
    name: 'ProductEditDialog',
    components: {},
})
export default class ProductEditDialog extends Vue {
    @Prop({ type: String }) title!: string
    @Prop({ type: String }) id!: string
    @Prop({ type: Object }) meta: any
    @Prop({ default: false }) private isEdit!: boolean
    public $refs!: {
        formRef: FormRef
    }
    private formModel = {
        ...defaultData,
    }
    config = {
        prefix: '',
        host: '',
        root_dir: '',
        index_name: 'index.html',
    }
    get myTitle() {
        if (this.isEdit) {
            return '上传UED'
        }
        return '上传UED'
    }
    private View = {
        loading: false,
    }
    formFields = [
        {
            tag: 'input',
            name: 'title',
            itemAttrs: {
                label: '项目名称',
            },
            attrs: {
                disabled: true,
            },
        },

        {
            tag: 'radio',
            name: 'ued_type',
            itemAttrs: {
                label: '方式',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            attrs: {
                value: '',
                options: [
                    {
                        label: '压缩包',
                        value: 'zip',
                    },
                    {
                        label: '链接',
                        value: 'url',
                    },
                ],
                onInput: (val: any, { formActionType }) => {
                    // const uploader$ = formActionType.getFieldProps('ued_urls')
                    // if (val === 'url') {
                    //     formActionType.updateSchema('ued_urls', 'visible')
                    // }
                    // console.log(21, val)
                },
            },
        },

        {
            tag: 'uploader',
            name: 'ued_urls',
            itemAttrs: {
                label: '设计稿',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            attrs: {
                multiple: true,
                tipSlotRender(h: CreateElement) {
                    return h('span', { class: 'sg-ml-5' }, '只能上传zip文件,可上传多个')
                },
                value: [],
                accept: '.zip',
                //'auto-upload': false,
                'http-request': async ({ file, filename, onProgress }: any) => {
                    try {
                        this.View.loading = true
                        const { title, version, uuid } = this.formModel
                        const formData = new FormData()
                        formData.append('file', file)

                        const { data } = await http.request({
                            url: '/open/upload/zip',
                            data: formData,
                            method: 'post',
                            headers: {
                                'content-type': 'multipart/form-data',
                            },
                            onUploadProgress: (progressEvent: any) => {
                                let complete = parseInt((progressEvent.loaded / progressEvent.total) * 100 + '', 10)
                                complete = Math.min(99, complete)

                                // 重点二：onProgress()方法需要以上方接收的形参来调用
                                // 这个方法有一个参数"percent"，给他进度值 complete 即可
                                onProgress({ percent: complete })
                            },
                        })
                        const { name, url, basename } = data

                        const res = await http.request({
                            url: '/open/upload/copy',
                            data: {
                                version: [uuid, 'ued', basename].join('/'),
                                url: url,
                            },
                            method: 'post',
                        })
                        onProgress({ percent: 100 })
                        this.View.loading = false
                        return res.data.url
                    } catch (error) {
                        this.View.loading = false
                        console.error(error)
                    }
                },
            },
            ifRender: model => {
                return model['ued_type'] === 'zip'
            },
        },

        {
            tag: 'input',
            name: 'ued_url',
            itemAttrs: {
                value: '',
                label: '链接',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            attrs: {},
            ifRender: model => {
                return model['ued_type'] === 'url'
            },
        },

        {
            tag: 'uploader',
            name: 'ued_icons',
            itemAttrs: {
                label: '设计稿图标',
            },
            attrs: {
                multiple: true,
                tipSlotRender(h: CreateElement) {
                    return h('span', { class: 'sg-ml-5' }, '只能上传zip文件,可上传多个')
                },
                value: [],
                accept: '.zip',
                //'auto-upload': false,
                'http-request': async ({ file, filename, onProgress }: any) => {
                    try {
                        this.View.loading = true
                        const { title, version, uuid } = this.formModel
                        const prefix = [uuid, 'icon'].join('/')
                        const formData = new FormData()
                        formData.append('file', file)
                        formData.append('prefix', prefix)

                        const { data } = await http.request({
                            url: '/open/upload/local',
                            data: formData,
                            method: 'post',
                            headers: {
                                'content-type': 'multipart/form-data',
                            },
                            onUploadProgress: (progressEvent: any) => {
                                const complete = parseInt((progressEvent.loaded / progressEvent.total) * 100 + '', 10)

                                // 重点二：onProgress()方法需要以上方接收的形参来调用
                                // 这个方法有一个参数"percent"，给他进度值 complete 即可
                                onProgress({ percent: complete })
                            },
                        })
                        this.View.loading = false
                        //onProgress({ percent: 100 })
                        return data.url
                    } catch (error) {
                        this.View.loading = false
                        console.error(error)
                    }
                },
            },
        },
    ] as FormColumn[]

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }
    handleSubmit() {
        this.handleUpdate()
    }
    handleUpdate() {
        const ref = this.$refs.formRef
        ref.validate(async valid => {
            if (valid) {
                let { ued_urls = [], ued_icons = [], ued_type, ued_url } = this.formModel
                if (ued_urls.length) {
                    const is_ued_urls_success = ued_urls.every((item: any) => item.status === 'success')
                    // 确保文件都上传结束
                    if (!is_ued_urls_success) {
                        return this.$message.warning('请先等待文件上传完成')
                    }
                }
                if (ued_icons.length) {
                    const is_ued_icons_success = ued_icons.every((item: any) => item.status === 'success')
                    // 确保文件都上传结束
                    if (!is_ued_icons_success) {
                        return this.$message.warning('请先等待文件上传完成')
                    }
                }

                await API.ProductService.update({
                    id: this.id,
                    ued_type,
                    ued_urls,
                    ued_url,
                    ued_icons,
                    ued_author: userStore.info.name,
                    ued_author_id: userStore.info.username,
                })
                this.$message.success('更新成功')
                this.confirm()
            }
        })
    }
    async created() {
        if (this.isEdit) {
            const id = this.id
            const { data } = await API.ProductService.get({ id })
            const { ued_url, ued_urls, ued_icons, ...rest } = data

            Object.assign(this.formModel, rest)
            if (ued_urls) {
                this.formModel.ued_urls = ued_urls
            }
            if (ued_icons) {
                this.formModel.ued_icons = ued_icons
            }
            if (ued_url) {
                this.$set(this.formModel, 'ued_url', ued_url)
                this.formModel.ued_url = ued_url
            }
            console.log(11, this.formModel)
        }
    }
}
</script>

<style lang="less" scoped>
.ProductEditDialog ::v-deep {
    .el-dialog__body {
        padding: 10px 20px;
    }
    .branch {
        .el-select {
            width: 250px;
        }
    }
    .el-radio-group {
        padding-top: 12px;
    }
    .el-radio {
        margin-bottom: 10px;
    }
}
</style>
