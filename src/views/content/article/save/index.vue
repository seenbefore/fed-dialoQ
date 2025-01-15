<template>
    <admin-page class="ArticleSave">
        <template #title>
            <span>{{ id ? '编辑文章' : '新增文章' }}</span>
        </template>

        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel"></sg-base-form>

        <template #footer>
            <div class="sg-flexbox align-center">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handlePreview">预览</el-button>
                <el-button type="primary" @click="handleSubmit">保存</el-button>
            </div>
        </template>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef } from '@/sharegood-ui'
import { ArticleStatusEnum, ArticleStatusEnumMap } from '../enum'
import { save, detail } from '../api'
import moment from 'moment'
import QuillEditor from '@/components/quill-editor'

@Component({
    name: 'ArticleSave',
    components: {},
})
export default class ArticleSave extends Vue {
    @Prop() id!: string

    @Ref('formRef')
    formRef!: FormRef

    formModel: Record<string, any> = {
        author: '', // 默认当前用户
        isTop: false,
        publishTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'title',
                itemAttrs: {
                    label: '文章标题',
                    rules: [{ required: true, message: '请输入文章标题' }],
                },
                attrs: {
                    placeholder: '请输入文章标题',
                    maxlength: 100,
                    'show-word-limit': true,
                },
            },
            {
                tag: 'select',
                name: 'category',
                itemAttrs: {
                    label: '文章分类',
                    rules: [{ required: true, message: '请选择文章分类' }],
                },
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return [
                            { label: '新闻', value: '新闻' },
                            { label: '公告', value: '公告' },
                            { label: '活动', value: '活动' },
                            { label: '帮助', value: '帮助' },
                        ]
                    },
                },
            },
            {
                tag: 'input',
                name: 'author',
                itemAttrs: {
                    label: '作者',
                    rules: [{ required: true, message: '请输入作者' }],
                },
                attrs: {
                    placeholder: '请输入作者',
                },
            },
            {
                tag: 'custom',
                name: 'coverImage',
                itemAttrs: {
                    label: '封面图片',
                },
                appendRender: (h, { row }) => {
                    return (
                        <el-upload
                            action="#"
                            accept="image/jpeg,image/png,image/jpg"
                            before-upload={this.beforeUpload}
                            on-change={this.handleImageChange}
                            file-list={this.formModel.imageList || []}
                            limit={1}
                        >
                            <el-button size="small" type="primary">
                                选择图片
                            </el-button>
                            <div slot="tip" class="el-upload__tip">
                                只能上传jpg/png文件，且不超过2MB
                            </div>
                        </el-upload>
                    )
                },
            },
            {
                tag: 'input',
                name: 'summary',
                itemAttrs: {
                    label: '文章摘要',
                },
                attrs: {
                    type: 'textarea',
                    placeholder: '请输入文章摘要',
                    maxlength: 200,
                    'show-word-limit': true,
                },
            },
            {
                tag: 'custom',
                custom: QuillEditor,
                name: 'content',
                itemAttrs: {
                    label: '文章内容',
                    rules: [{ required: true, message: '请输入文章内容' }],
                },
            },
            {
                tag: 'select',
                name: 'tags',
                itemAttrs: {
                    label: '标签',
                },
                attrs: {
                    multiple: true,
                    'collapse-tags': true,
                    placeholder: '请选择标签',
                    options: async () => {
                        return [
                            { label: '重要', value: '重要' },
                            { label: '置顶', value: '置顶' },
                            { label: '热门', value: '热门' },
                            { label: '推荐', value: '推荐' },
                        ]
                    },
                },
            },
            {
                tag: 'select',
                name: 'status',
                itemAttrs: {
                    label: '发布状态',
                    rules: [{ required: true, message: '请选择发布状态' }],
                },
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return [
                            { label: '草稿', value: ArticleStatusEnum.DRAFT },
                            { label: '审核', value: ArticleStatusEnum.PENDING },
                            { label: '发布', value: ArticleStatusEnum.PUBLISHED },
                        ]
                    },
                },
            },
            {
                tag: 'switch',
                name: 'isTop',
                itemAttrs: {
                    label: '是否置顶',
                },
            },
            {
                tag: 'date',
                name: 'publishTime',
                itemAttrs: {
                    label: '发布时间',
                },
                attrs: {
                    type: 'datetime',
                    placeholder: '请选择发布时间',
                    'value-format': 'yyyy-MM-dd HH:mm:ss',
                },
            },
        ]

        return {
            span: 24,
            fields,
        }
    }

    beforeUpload(file: File) {
        const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
        if (!isImage) {
            this.$message.error('只能上传JPG/PNG格式的图片!')
            return false
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            this.$message.error('图片大小不能超过2MB!')
            return false
        }
        return false
    }

    handleImageChange(file: any, fileList: any[]) {
        this.formModel.coverImage = file.raw
        this.formModel.imageList = fileList.slice(-1)
    }

    handlePreview() {
        if (this.id) {
            window.open(`/content/article/preview?id=${this.id}`)
        } else {
            this.$message.warning('请先保存文章')
        }
    }

    async handleSubmit() {
        try {
            await this.formRef.validate()
            const formData = {
                id: this.id,
                title: this.formModel.title,
                category: this.formModel.category,
                author: this.formModel.author,
                coverImage: this.formModel.coverImage,
                summary: this.formModel.summary,
                content: this.formModel.content,
                tags: this.formModel.tags,
                status: this.formModel.status,
                isTop: this.formModel.isTop,
                publishTime: this.formModel.publishTime,
            }
            await save(formData)
            this.$message.success('保存成功')
            this.$back()
        } catch (error) {
            console.error(error)
        }
    }

    async created() {
        if (this.id) {
            const { data } = await detail({ id: this.id })
            this.formModel = data
        }
    }
    handleCancel() {
        this.$back()
    }
}
</script>

<style scoped lang="less">
.ArticleSave ::v-deep {
    padding: 0px;
}
</style>
