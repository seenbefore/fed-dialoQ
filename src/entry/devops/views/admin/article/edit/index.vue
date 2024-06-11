<template>
    <PageWrapper class="AdminArticleEdit column" :title="title" v-loading="initLoading">
        <template #extra>
            <el-button type="text" @click="$close">返回</el-button>
        </template>

        <sg-base-form ref="formRef" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
        <template #footer>
            <div class="footer">
                <el-button type="primary" size="small" @click="handlePublish('draft')" :loading="loading">保存草稿</el-button>
                <el-button type="primary" size="small" @click="handlePublish('publish')" :loading="loading">保存并发布</el-button>
                <el-alert show-icon class="sg-ml-3 " :closable="false" type="warning" title="注意：不能包含表情😊等特殊字符" style="background: transparent;"></el-alert>
            </div>
        </template>
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MyMixins } from '@/entry/devops/mixins'
import { FormRow, FormRef } from '@/sharegood-ui'
import { goBack } from '@/entry/devops/utils'
import { ArticleService, DictService } from '@/entry/devops/api'
import { http } from '@/entry/devops/scripts/http'
const md = require('markdown-it')({ html: true })
const API = {
    create: ArticleService.create,
    get: ArticleService.get,
    removeOne: ArticleService.removeOne,
    update: ArticleService.update,
    publish: ArticleService.publish,
}
@Component({
    name: 'AdminArticleEdit',
    components: {},
})
export default class AdminArticleEdit extends MyMixins {
    @Prop() id!: string
    @Prop() isEdit!: boolean
    loading = false
    initLoading = false
    /**
     * 初始化数据
     */
    @Prop({ default: () => null }) row!: any
    get title() {
        if (this.isEdit) {
            return '修改'
        }
        return '创建'
    }
    articleId = ''
    goBack = goBack
    formModel = {
        content: '',
        status: '',
        book_name: '',
    }
    getFormAttrs = {
        span: 12,
        fields: [
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'title',
                        itemAttrs: {
                            label: '标题',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写',
                                },
                            ],
                        },
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 50,
                            'show-word-limit': true,
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'select',
                        name: 'type',
                        itemAttrs: {
                            label: '类型',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写',
                                },
                            ],
                        },
                        attrs: {
                            value: 'markdown',
                            options: [
                                {
                                    label: 'markdown 文本',
                                    value: 'markdown',
                                },
                                {
                                    label: '外链',
                                    value: 'url',
                                },
                            ],
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'url',
                        itemAttrs: {
                            label: '外链地址',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写',
                                },
                            ],
                        },
                        attrs: {
                            value: '',
                        },
                        ifRender(model) {
                            return model['type'] === 'url'
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: 'mavon-editor',
                        //custom: 'mavon-editor',
                        name: 'markdown',
                        itemAttrs: {
                            label: '内容',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写',
                                },
                            ],
                            class: 'markdown',
                        },
                        attrs: {
                            autofocus: false,
                        },
                        on: {
                            imgAdd: (pos: any, file: any) => {
                                const formRef = this.$refs.formRef as FormRef
                                const ref: any = formRef.getFieldRef('markdown')
                                // console.log(111, this.$refs, ref, $file)
                                // ref.$img2Url(
                                //     pos,
                                //     'http://icinfo-ui.uat.icinfo.co/static/icon/logo.png',
                                // )
                                const formData = new FormData()
                                formData.append('file', file)
                                //formData.append('param1', '1')
                                //return Promise.resolve('https://tva1.sinaimg.cn/large/008i3skNly1gqzmpw2gjoj30u50ktwkj.jpg')
                                return http
                                    .request({
                                        url: '/open/upload',
                                        data: formData,
                                        //baseURL: 'http://192.168.1.242:8081/devops',
                                        method: 'post',
                                        headers: {
                                            'content-type': 'multipart/form-data',
                                        },
                                    })
                                    .then(res => {
                                        console.log(res.data)
                                        const data = res.data || {}
                                        ref.$img2Url(pos, data.url)
                                        return data.url
                                    })
                            },
                        },
                        ifRender(model) {
                            return model.type === 'markdown'
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'select',
                        name: 'book_name',
                        itemAttrs: {
                            label: '分类',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写',
                                },
                            ],
                        },
                        attrs: {
                            value: '',
                            'default-first-option': true,
                            filterable: true,
                            options: async () =>
                                DictService.all({
                                    conditions: {
                                        parent_id: '文章分类',
                                    },
                                }),

                            onInput: (val, { formActionType }) => {
                                if (val === '组件') {
                                    formActionType.updateSchema('cover_urls', 'itemAttrs.rules', [
                                        {
                                            required: true,
                                            message: '请填写',
                                        },
                                    ])
                                } else {
                                    formActionType.updateSchema('cover_urls', 'itemAttrs.rules', [])
                                }
                            },
                        },
                    },
                ],
            },

            {
                columns: [
                    {
                        tag: 'radio',
                        name: 'copyright',
                        itemAttrs: {
                            label: '是否原创',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写',
                                },
                            ],
                        },
                        attrs: {
                            value: '原创',
                            options: [
                                {
                                    label: '原创',
                                    value: '原创',
                                },
                                {
                                    label: '转载',
                                    value: '转载',
                                },
                            ],
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'copy_url',
                        itemAttrs: {
                            label: '转载地址',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写',
                                },
                            ],
                        },
                        attrs: {
                            value: '',
                        },
                        ifRender(model) {
                            return model['copyright'] === '转载'
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'el-switch',
                        //custom: 'el-switch',
                        name: 'is_top',
                        itemAttrs: {
                            label: '是否置顶',
                        },
                        attrs: {
                            value: 0,
                            'active-value': 1,
                            'inactive-value': 0,
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'summary',
                        itemAttrs: {
                            label: '摘要',
                            rules: [
                                // {
                                //     required: true,
                                //     message: '请填写',
                                // },
                            ],
                        },
                        attrs: {
                            type: 'textarea',
                            placeholder: '请输入',
                            maxlength: 150,
                            'show-word-limit': true,
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: 'uploader',
                        name: 'cover_urls',
                        itemAttrs: {
                            label: '封面',
                            rules: [
                                {
                                    // 确保文件都上传了表单才能提交
                                    validator: (rule: any, value: any, callback: any) => {
                                        if (Array.isArray(value) && value.length > 0) {
                                            const total = value.length
                                            const urls = value.map(item => item.url).filter(item => item)
                                            if (urls.length !== total) {
                                                callback(new Error('还有文件还未上传成功'))
                                            } else {
                                                callback()
                                            }
                                        } else {
                                            callback()
                                        }
                                    },
                                },
                            ],
                        },
                        attrs: {
                            value: [],
                            accept: '.png,.jpg,.jpeg,.gif',
                            'list-type': 'picture-card',
                            'http-request': async ({ file, filename, onProgress }: any) => {
                                const formData = new FormData()
                                formData.append('file', file)
                                const { data } = await http.request({
                                    url: '/open/upload',
                                    data: formData,
                                    method: 'post',
                                    headers: {
                                        'content-type': 'multipart/form-data',
                                    },
                                    // mockjs 会影响上传进度
                                    onUploadProgress: (progressEvent: any) => {
                                        const complete = parseInt((progressEvent.loaded / progressEvent.total) * 100 + '', 10)

                                        // 重点二：onProgress()方法需要以上方接收的形参来调用
                                        // 这个方法有一个参数"percent"，给他进度值 complete 即可
                                        onProgress({ percent: complete })
                                    },
                                })
                                return data.url
                            },
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: 'uploader',
                        name: 'attachments',
                        itemAttrs: {
                            label: '附件(zip)',
                            rules: [
                                {
                                    validator: (rule: any, value: any, callback: any) => {
                                        console.log(11111, value)

                                        if (Array.isArray(value) && value.length > 0) {
                                            const total = value.length
                                            const urls = value.map(item => item.url).filter(item => item)
                                            if (urls.length !== total) {
                                                callback(new Error('还有文件还未上传成功'))
                                            } else {
                                                callback()
                                            }
                                        } else {
                                            callback()
                                        }
                                    },
                                },
                            ],
                        },
                        attrs: {
                            value: [],
                            accept: '.zip',

                            'http-request': async ({ file, filename, onProgress }: any) => {
                                const formData = new FormData()
                                formData.append('file', file)

                                const { data } = await http.request({
                                    url: '/open/upload',
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

                                return data.url
                            },
                        },
                    },
                ],
            },
        ] as FormRow[],
    }
    async handlePublish(status: string) {
        try {
            await this.handleValidte()
            this.loading = true
            await this.handleSave()
            await API.publish({
                id: this.articleId,
                status: status,
            })
            this.$message.success('发布成功')
            this.$close(true)
        } catch (error) {
        } finally {
            this.loading = false
        }
    }
    hasEmoji(str: any) {
        const regex = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g
        const match = regex.exec(str)
        if (match) {
            console.log('匹配的特殊字符内容:', match)
            return match[0]
        }
        return null
    }
    async handleSave() {
        const formRef = this.$refs.formRef as FormRef
        const state = formRef.getState()
        let {
            markdown = '',
            tags = [],

            ...payload
        } = state

        // const emoji = this.hasEmoji(markdown)
        // if (emoji) {
        //     this.$message.error(`文章内容不能包含表情 ${emoji}`)
        //     reject('文章内容不能包含表情')
        //     return
        // }
        const html = md.render(markdown)

        try {
            if (this.articleId) {
                await API.update({
                    ...payload,
                    tags: tags.join(','),
                    markdown,
                    content: html,

                    id: this.articleId,
                })

                this.$message.success('保存成功')
            } else {
                const { data } = await API.create({
                    ...payload,
                    tags: tags.join(','),
                    markdown,

                    content: html,
                })
                this.articleId = data.id

                this.$message.success('创建成功')
            }

            //await this.goBack(this.$route, true)
        } catch (err) {
            console.error(err)
        }
    }

    async handleValidte() {
        const formRef = this.$refs.formRef as FormRef
        return new Promise((resolve, reject) => {
            formRef.validate(async valid => {
                if (valid) {
                    resolve(true)
                } else {
                    reject(false)
                }
            }, true)
        })
    }
    async mounted() {
        if (this.row) {
            Object.assign(this.formModel, this.row)
        }
        if (this.id && this.isEdit) {
            try {
                this.initLoading = true
                this.articleId = this.id
                const { data } = await API.get({
                    id: this.id,
                })
                const { markdown = '', tags = '' } = data
                // const time = dateFormat(
                //     new Date(data.updatedAt),
                //     'YYYY年MM月DD日 HH时mm分ss秒',
                // )
                // const author = data.author || '匿名'
                Object.assign(this.formModel, {
                    ...data,
                    markdown,
                    tags: tags.split(','),
                    // time,
                    // author,
                })
            } catch (err) {
            } finally {
                this.initLoading = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
.AdminArticleEdit {
    .footer {
        height: 50px;
        padding: 0 30px;
        display: flex;
        align-items: center;
        border-top: 1px;
        position: relative;

        &::after {
            position: absolute;
            right: 0px;
            top: 0px;
            left: 0px;
            display: block;
            margin-right: 0px;
            margin-left: 0px;
            height: 1px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            content: '';
        }
    }
    ::v-deep .markdown {
        .el-form-item__content {
            overflow-y: auto;
            padding: 5px;
        }
    }
}
</style>
