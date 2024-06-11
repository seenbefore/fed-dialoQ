<template>
    <PageWrapper class="AdminChartEdit column" :title="title">
        <template #extra>
            <el-button type="text" @click="$close">返回</el-button>
        </template>
        <sg-base-form ref="formRef" v-model="formModel" v-bind="getFormAttrs" @submit="handleSubmit"></sg-base-form>
        <template #footer>
            <div class="footer">
                <el-button type="text" @click="$close">返回</el-button>
                <el-button type="" size="small" @click="handlePreview">预览</el-button>
                <el-button type="primary" size="small" @click="handleSubmit" :loading="loading">保存并发布</el-button>
            </div>
        </template>
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MyMixins } from '@/entry/devops/mixins'
import { FormRow, FormRef } from '@/sharegood-ui'
import { goBack } from '@/entry/devops/utils'
import { ChartCaseService, DictService } from '@/entry/devops/api'
import { http } from '@/entry/devops/scripts/http'
import CodeEditor from '@/components/CodeEditor.vue'
const API = {
    create: ChartCaseService.create,
    get: ChartCaseService.get,
    update: ChartCaseService.update,
}
@Component({
    name: 'AdminChartEdit',
    components: {
        CodeEditor,
    },
})
export default class AdminChartEdit extends MyMixins {
    @Prop() id!: string
    @Prop() isEdit!: boolean
    loading = false
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

    goBack = goBack
    formModel = {
        code: '',
        type: '',
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
                                        parent_id: '图表分类',
                                    },
                                }),

                            appendSlotRender: h => {
                                return h(
                                    'el-button',
                                    {
                                        props: {
                                            type: 'primary',
                                        },
                                        on: {
                                            click: async () => {
                                                this.$modalDialog(() => import(/* webpackChunkName: "DictEditDialog" */ '@/entry/devops/views/admin/system/dict/components/DictEditDialog/index.vue'), {
                                                    isEdit: false,
                                                    parent_id: '图表分类',
                                                })
                                                    .then(async val => {
                                                        const formRef = this.$refs.formRef as any
                                                        formRef.getFieldRef('type').parseOptions()
                                                        this.formModel.type = val.label
                                                    })
                                                    .catch((err: any) => {
                                                        console.log(err)
                                                    })
                                            },
                                        },
                                    },
                                    ['新建'],
                                )
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
                        name: 'urls$',
                        itemAttrs: {
                            label: '封面',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写',
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
                                    // onUploadProgress: (progressEvent: any) => {
                                    //     const complete = parseInt(
                                    //         (progressEvent.loaded /
                                    //             progressEvent.total) *
                                    //             100 +
                                    //             '',
                                    //         10,
                                    //     )

                                    //     // 重点二：onProgress()方法需要以上方接收的形参来调用
                                    //     // 这个方法有一个参数"percent"，给他进度值 complete 即可
                                    //     onProgress({ percent: complete })
                                    // },
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
                        tag: () => import('@/components/CodeEditor.vue'),
                        name: 'code',
                        itemAttrs: {
                            label: '代码',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写',
                                },
                            ],
                        },
                        attrs: {},
                    },
                ],
            },
        ] as FormRow[],
    }

    async handlePreview() {
        await this.$modalDialog(() => import(/* webpackChunkName: "ChartPreviewDialog" */ './components/ChartPreviewDialog/index.vue'), {
            code: this.formModel.code,
        })
            .then(async () => {})
            .catch((err: any) => {
                console.log(err)
            })
    }
    async handleSubmit() {
        const formRef = this.$refs.formRef as FormRef
        return new Promise((resolve, reject) => {
            formRef.validate(async valid => {
                if (valid) {
                    const state = formRef.getState()
                    let { urls$ = [], ...payload } = state
                    let thumbnail = urls$.filter((item: any) => item.status === 'success')
                    thumbnail = thumbnail[0]?.url || ''
                    try {
                        this.loading = true
                        if (this.id) {
                            await API.update({
                                ...payload,
                                thumbnail,
                                id: this.id,
                            })

                            this.$message.success('保存成功')
                        } else {
                            const { data } = await API.create({
                                ...payload,
                                thumbnail,
                            })
                            this.id = data.id

                            this.$message.success('创建成功')
                        }
                        this.$close(true)
                        resolve(this.id)
                    } catch (err) {
                        console.error(err)
                        reject(err)
                    } finally {
                        this.loading = false
                    }
                }
            })
        })
    }
    async mounted() {
        if (this.row) {
            Object.assign(this.formModel, this.row)
        }
        if (this.id && this.isEdit) {
            const { data } = await API.get({
                id: this.id,
            })

            Object.assign(this.formModel, {
                ...data,
            })
            if (data.thumbnail) {
                this.$set(this.formModel, 'urls$', [
                    {
                        url: data.thumbnail,
                        status: 'success',
                    },
                ])
            }
        }
    }
}
</script>

<style lang="less" scoped>
.AdminChartEdit {
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
