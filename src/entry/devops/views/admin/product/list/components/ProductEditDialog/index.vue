<template>
    <el-dialog ref="dialog" :title="myTitle" visible class="ProductEditDialog" :fullscreen="false" :append-to-body="false" :close-on-click-modal="false" width="600px" v-bind="$attrs" @close="cancel">
        <div class="pre-deploy-dialog__content">
            <sg-base-form label-width="100px" ref="formRef" :fields="formFields" v-model="formModel" :span="24" v-if="config.host"></sg-base-form>
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
import { FormColumn, FormRef } from '@/sharegood-ui'
import { http } from '@/entry/devops/scripts/http'
import { guid } from '@/scripts/utils'

const defaultData = {
    title: '',
    version: '',
    url: '',
    url$: [] as any[],
    type: 'zip',
    category: '产品原型',
    uuid: guid(),
    filepath: '',
}
type FormModel = typeof defaultData
function getConfig() {
    const config = [
        {
            tag: 'autocomplete',
            name: 'title',
            itemAttrs: {
                label: '项目名称',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            attrs: {
                value: '',
                //'value-key': 'name',
                debounce: 500,
                'highlight-first-item': true,
                'trigger-on-focus': false,
                placeholder: '请填写名称',
                load: async (queryString: any) => {
                    return await http.get(`http://192.168.1.180:8081/component/getProjectList?projectName=${queryString}`).then((res: any) => {
                        return res.data.map((item: any) => ({
                            label: item.name,
                            value: item.name,
                        }))
                    })
                },
            },
        },
        {
            tag: 'input',
            name: 'version',
            itemAttrs: {
                label: '版本',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            attrs: {
                placeholder: '',
                // inputPrependSlotRender: h => {
                //     const { host, prefix } = this.config
                //     return [host, prefix, ''].join('/')
                // },
            },
        },
        {
            tag: 'radio',
            name: 'type',
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
                onInput: val => {
                    if (val === 'zip') {
                        // this.$set(this.formModel, 'url$', [
                        //     {
                        //         url: this.formModel.url,
                        //         name: this.formModel.title + '.zip',
                        //     },
                        // ])
                    }
                },
            },
        },
        {
            tag: 'uploader',
            name: 'url$',
            itemAttrs: {
                label: 'zip压缩包',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            attrs: {
                value: [],
                accept: '.zip',
                onlyOne: true,

                'http-request': async ({ file, filename, onProgress }: any) => {
                    try {
                        const { uuid } = this.formModel
                        this.View.loading = true
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
                        const { url } = data
                        const res = await http.request({
                            url: '/open/upload/copy',
                            data: {
                                version: [uuid, 'axure'].join('/'),
                                url,
                            },
                            method: 'post',
                        })

                        let filepath = [data.root, uuid].join('/')
                        onProgress({ percent: 100 })
                        this.formModel.filepath = filepath
                        this.View.loading = false
                        return res.data.url
                    } catch (error) {
                        this.View.loading = false
                        console.error(error)
                    }
                },
            },
            ifRender: model => {
                return model['type'] === 'zip'
            },
        },

        {
            tag: 'input',
            name: 'url',
            itemAttrs: {
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
                return model['type'] === 'url'
            },
        },
    ] as FormColumn[]

    return config
}
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
            return '重新上传原型'
        }
        return '新增产品'
    }
    private View = {
        loading: false,
    }
    formFields = getConfig.call(this)

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }
    handleSubmit() {
        if (this.isEdit) {
            this.handleUpdate()
        } else {
            this.handleCreate()
        }
    }
    handleUpdate() {
        const ref = this.$refs.formRef
        ref.validate(async valid => {
            if (valid) {
                let { url$, url, type, version, title, uuid, ...rest } = this.formModel

                let filepath = ''
                if (type === 'zip') {
                    url = url$[0]['response']
                }
                await API.ProductService.update({
                    ...rest,
                    filepath,
                    title,
                    type,
                    url,
                    version,
                })
                this.$message.success('更新成功')
                this.confirm()
            }
        })
    }
    async handleCreate() {
        const ref = this.$refs.formRef

        ref.validate(async valid => {
            if (valid) {
                let { url$, url, type, version, title, uuid, ...rest } = this.formModel
                let filepath = ''

                const { prefix } = this.config
                if (type === 'zip') {
                    url = url$[0]['response']
                }

                await API.ProductService.create({
                    ...rest,
                    uuid,
                    title,
                    type,
                    filepath,
                    url,
                    version,
                })
                this.$message.success('创建成功')
                this.confirm()
            }
        })
    }
    public formatData(data: FormModel) {
        // const { url$, index_name, type$, ...rest } = data
        // if (type$) {
        //     const result = {
        //         ...rest,
        //         index_name,
        //         url: url$[0]['url'] + '/' + index_name,
        //     }
        //     return result
        // } else {
        //     return data
        // }
    }
    public parseData(data: FormModel) {
        //const { url, ...rest } = data

        return data
    }
    async created() {
        if (this.isEdit) {
            const id = this.id
            const { data } = await API.ProductService.get({ id })

            Object.assign(this.formModel, data)

            if (data.type === 'zip') {
                this.$set(this.formModel, 'url$', [
                    {
                        url: this.formModel.url,
                        name: this.formModel.title + '.zip',
                    },
                ])
            }
        }
        const { data } = await API.ProductService.config()

        Object.assign(this.config, data)
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
