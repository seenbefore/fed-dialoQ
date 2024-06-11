<template>
    <el-dialog ref="dialog" :title="myTitle" visible class="UedReviewDialog" :fullscreen="false" :append-to-body="false" :close-on-click-modal="false" width="850px" v-bind="$attrs" @close="cancel">
        <div class="pre-deploy-dialog__content">
            <sg-base-form ref="formRef" v-model="formModel" label-width="100px" :fields="formFields" :span="24">
                <div slot="description$">
                    <el-table :data="formModel.uat_urls" style="width: 100%" class="url-table">
                        <el-table-column label="模块名称" width="150">
                            <template slot-scope="{ row }">
                                <el-input v-model="row.name" placeholder="请填写模块名称"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="链接" min-width="180">
                            <template slot-scope="{ row }">
                                <el-input v-model="row.url" placeholder="请填写模块链接，没有则写无"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="90">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="handleDelUrl(scope.$index)">删除</el-button>
                                <el-button size="mini" type="text" @click="handleLink(scope.row)">访问</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="sg-mt-3">
                        <el-button type="" @click="handleAddUrl" icon="el-icon-plus">新增一行</el-button>
                    </div>
                </div>
            </sg-base-form>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormColumn, FormRef, FormRow } from '@/sharegood-ui'
import { userStore } from '@/entry/devops/store/useStore'
import { UatUrl } from '@/entry/devops/models'

interface FormModel {
    reviewerId?: string
    [prop: string]: any
}
@Component({
    name: 'UedReviewDialog',
    components: {},
})
export default class UedReviewDialog extends Vue {
    @Prop({ type: Number }) port!: number
    @Prop({ type: String }) title!: string
    @Prop({ type: String }) id!: string
    @Prop({ type: Object }) meta: any
    @Prop({ default: false }) private isEdit!: boolean
    @Prop({ default: false }) private isPreview!: boolean
    public $refs!: {
        formRef: FormRef
    }
    private isLocal = process.env.VUE_APP_ENV === 'dev'
    private formModel: FormModel = {
        reviewerId: '',
        uat_urls: [] as UatUrl[],
    }
    private list = [
        {
            name: '',
            url: '',
            note: '',
        },
    ] as UatUrl[]
    handleDelUrl(index: number) {
        this.formModel.uat_urls.splice(index, 1)
    }
    handleLink(row: UatUrl) {
        if (row.url) {
            window.open(row.url)
        }
    }
    handleAddUrl() {
        this.formModel.uat_urls.push({
            name: '',
            url: '',
        })
    }

    get myTitle() {
        if (this.title) {
            return this.title
        }
        if (this.isEdit) {
            return ''
        }
        return '发起UI走查'
    }
    private View = {
        loading: false,
    }
    isReadonly() {
        return this.isEdit || this.isPreview
    }

    formFields: FormRow[] = [
        {
            columns: [
                {
                    span: 24,
                    tag: this.isReadonly() ? 'text' : 'input',
                    name: 'title',
                    itemAttrs: {
                        label: '标题',
                        rules: this.isReadonly()
                            ? []
                            : [
                                  {
                                      required: true,
                                      message: '必填',
                                  },
                              ],
                    },
                    attrs: {
                        disabled: this.isReadonly(),
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 24,
                    tag: 'slot',
                    slotName: 'description$',
                    itemAttrs: {
                        label: '模块',
                    },
                    ifRender: () => this.isReadonly() === false,
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'custom',
                    custom: 'mavon-editor',
                    name: 'description',
                    itemAttrs: {
                        label: '描述',
                        rules: this.isReadonly()
                            ? []
                            : [
                                  {
                                      required: true,
                                      message: '必填',
                                  },
                              ],
                    },
                    attrs: {
                        placeholder: '请输入模块名称和对相应地址',
                        subfield: this.isEdit === false,
                        toolbarsFlag: this.isEdit === false,
                        defaultOpen: this.isReadonly() ? 'preview' : null,
                        editable: this.isEdit === false,
                        toolbars: {
                            // bold: true, // 粗体
                            // //italic: true, // 斜体
                            // header: true, // 标题
                            // underline: true, // 下划线
                            // strikethrough: true, // 中划线
                            // mark: true, // 标记
                            // //superscript: true, // 上角标
                            // //subscript: true, // 下角标
                            // quote: true, // 引用
                            // ol: true, // 有序列表
                            ul: true, // 无序列表
                            link: true, // 链接
                            //imagelink: true, // 图片链接
                            code: false, // code
                            //table: true, // 表格
                            fullscreen: true, // 全屏编辑
                            readmodel: true, // 沉浸式阅读
                            htmlcode: true, // 展示html源码
                            //help: true, // 帮助
                            /* 1.3.5 */
                            //undo: true, // 上一步
                            //redo: true, // 下一步
                            //trash: true, // 清空
                            //save: true, // 保存（触发events中的save事件）
                            /* 1.4.2 */
                            navigation: true, // 导航目录
                            /* 2.1.8 */
                            // alignleft: true, // 左对齐
                            // aligncenter: true, // 居中
                            // alignright: true, // 右对齐
                            /* 2.2.1 */
                            subfield: true, // 单双栏模式
                            preview: true,
                        },
                    },
                    ifRender: model => {
                        return this.isReadonly()
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 8,
                    tag: 'select',
                    name: 'reviewerId',
                    itemAttrs: {
                        label: '检查人',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        disabled: this.isReadonly(),
                        filterable: true,
                        //'value-key': 'label',
                        'default-first-option': true,
                        options: async () => {
                            const result = await API.UserService
                                .getUserOptions
                                // {
                                //     position: '设计师',
                                // },
                                ()

                            return result
                        },
                        onChange: ({ value, option }) => {
                            if (value) {
                                if (option && option.label) {
                                    this.$set(this.formModel, 'reviewerName', option.label)
                                }
                            } else {
                                this.$set(this.formModel, 'reviewerName', '')
                            }
                        },
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 24,
                    tag: 'select',
                    name: 'score',
                    itemAttrs: {
                        label: '满意度',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        options: Array.from({ length: 20 }).map((item: any, index: number) => {
                            const max = 100
                            const score = max - index * 5
                            return {
                                label: score + '',
                                value: score,
                            }
                        }),
                    },
                    ifRender: () => {
                        return this.isEdit && !this.isPreview
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 24,
                    tag: 'input',
                    name: 'summary',
                    itemAttrs: {
                        label: '评论',
                    },
                    attrs: {
                        type: 'textarea',
                    },
                    ifRender: () => {
                        return this.isEdit && !this.isPreview
                    },
                },
            ],
        },

        {
            columns: [
                {
                    tag: 'slot',
                    itemAttrs: {
                        label: ' ',
                    },
                    render: (h, { row }) => {
                        const loading = this.View.loading
                        if (this.isPreview) {
                            return []
                        }
                        return [
                            h(
                                'el-button',
                                {
                                    props: {
                                        type: 'primary',
                                        loading,
                                    },
                                    on: {
                                        click: () => {
                                            this.handleSubmit()
                                        },
                                    },
                                },
                                '保存',
                            ),
                        ]
                    },
                },
            ],
        },
    ]

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm(data?: any) {
        const $options: any = this.$options
        $options.confirm(data)
    }
    // 校验整个表单
    validate(): Promise<[boolean, any]> {
        const ref = this.$refs.formRef
        return new Promise((resolve, reject) => {
            ref.validate((valid, result) => {
                if (!valid) {
                    return reject([false, result])
                }
                resolve([true, result])
            })
        })
    }
    async handleSubmit() {
        if (this.isEdit) {
            const [valid] = await this.validate()
            if (valid) {
                await this.handleUpdate()
            }
        } else {
            const [valid] = await this.validate()
            if (valid) {
                await this.handleCreate()
            }
        }
    }
    async handleUpdate() {
        try {
            const body = {
                ...this.formModel,
            }

            const id = this.id
            this.View.loading = true
            const payload: any = {
                id,
                ...body,
            }
            if (body.score) {
                payload.status = 'finished'
            }
            await API.UedReviewService.update(payload)

            this.View.loading = false
            this.$message.success('修改成功')
            this.confirm()
        } catch (err) {
            this.View.loading = false
        }
    }
    async handleCreate() {
        const payload = this.formatData(this.formModel)

        if (!this.isLocal && payload.reviewerId === userStore.info.username) {
            this.$message.error('检查人不能是本人')
            return
        }
        const { data } = await API.UedReviewService.create({
            ...payload,
        })

        this.$message.success('创建成功')
        this.confirm(data)
    }
    public formatData(data: any = {}) {
        let { uat_urls = [], ...rest } = data
        uat_urls = (uat_urls as UatUrl[]).filter(item => item.name && item.url) as UatUrl[]
        const result = (uat_urls as UatUrl[]).map(item => {
            const row = `${item.name} [${item.url}](${item.url})`
            return row
        })
        if (!uat_urls.length) {
            this.$message.error('请至少添加一个链接')
            throw new Error('请至少添加一个url')
        }
        return {
            description: '\n ' + result.join('，'),
            ...rest,
        }
    }

    async mounted() {
        if (this.isEdit) {
            const { data } = await API.UedReviewService.get({
                id: this.id,
            })
            Object.assign(this.formModel, data)
        } else {
            const { info } = userStore
            const { ued_author, ued_author_id, title, version, id, ued_urls } = this.meta
            const description_tpl = ``
            this.$set(this.formModel, 'title', title + version + '-' + info.name)
            this.$set(this.formModel, 'description', description_tpl)
            if (ued_author_id !== userStore.info.username) {
                this.$set(this.formModel, 'reviewerId', ued_author_id)
            }

            this.$set(this.formModel, 'reviewerName', ued_author)
            this.$set(this.formModel, 'developerId', info.username)
            this.$set(this.formModel, 'developerName', info.name)
            this.$set(this.formModel, 'product_title', title)
            this.$set(this.formModel, 'product_version', version)
            this.$set(this.formModel, 'product_id', id)
            this.$set(this.formModel, 'product_ued_urls', ued_urls)
            // 创建
            if (!this.isReadonly()) {
                this.formModel.uat_urls = this.list
            }
        }
    }
}
</script>

<style lang="less" scoped>
.UedReviewDialog ::v-deep {
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
        display: block;
        margin-bottom: 10px;
    }
}
</style>
