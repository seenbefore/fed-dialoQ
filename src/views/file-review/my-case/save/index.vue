<template>
    <div class="sg-page icinfo-ai CaseSave">
        <StepForm v-model="currentStep" :steps="steps"></StepForm>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import StepForm, { StepConfig } from '@/components/step-form/index.vue'
import { CaseStepCoverClass } from '@/views/file-review/components/case-step-cover/index.vue'
import { CaseStepCatalogClass } from '@/views/file-review/components/case-step-catalog/index.vue'

@Component({
    name: 'CaseSave',
    components: {
        StepForm,
    },
})
export default class CaseSave extends Vue {
    @Prop({ type: Object, default: () => ({}) }) row!: any
    @Prop({ type: String }) id!: string
    @Prop({ type: String, default: '' }) caseId!: string
    @Prop({ type: String, default: '' }) archiveId!: string
    @Prop({ type: Number, default: 0 }) step!: number
    paylaod = {
        caseId: this.caseId,
        archiveId: this.archiveId,
        archiveCatalogContentList: [] as any[],
    }
    loading = false
    /** 当前步骤 */
    currentStep = this.step
    get steps() {
        return [
            {
                title: '卷宗封面',
                component: () => import('@/views/file-review/components/case-step-cover/index.vue'),
                props: {
                    // 传递给组件的属性
                },

                render: (h, { row, handlers }) => {
                    return (
                        <div>
                            <el-button
                                type=""
                                onClick={async () => {
                                    console.log('取消')
                                }}
                            >
                                取消
                            </el-button>
                            <el-button
                                type="primary"
                                onClick={async () => {
                                    const currentComponent = handlers.getCurrentComponent() as CaseStepCoverClass
                                    const result = await currentComponent.save()
                                    handlers.next()
                                }}
                            >
                                下一步
                            </el-button>
                        </div>
                    )
                },
            },
            {
                title: '卷宗目录',
                component: () => import('@/views/file-review/components/case-step-catalog/index.vue'),
                render: (h, { handlers }) => {
                    return (
                        <div>
                            <el-button type="" onClick={handlers.prev}>
                                上一步
                            </el-button>
                            <el-button
                                type=""
                                onClick={() => {
                                    this.handlePreview()
                                }}
                            >
                                预览
                            </el-button>
                            <el-button
                                type="primary"
                                loading={handlers.loading}
                                disabled={handlers.loading}
                                onClick={async () => {
                                    try {
                                        handlers.loading = true
                                        const currentComponent = handlers.getCurrentComponent() as CaseStepCatalogClass
                                        const result = await currentComponent.submit()
                                        this.paylaod.archiveCatalogContentList = result
                                        await this.handleSubmit()
                                        handlers.loading = false
                                    } catch (err) {
                                        handlers.loading = false
                                        console.error(err)
                                    }
                                }}
                            >
                                提交
                            </el-button>
                        </div>
                    )
                },
            },
            {
                title: '完成',
                component: null,
                render: () => {},
            },
        ] as StepConfig[]
    }

    mounted() {}

    async handlePreview() {
        console.log('preview')
        await this.$modalDialog(() => import('@/views/file-review/components/preview-dialog/index.vue'), {
            docParams: {
                partyId: '',
                documentCatalogCode: 'DC2A0223300DZJZFM0000000001',
                documentId: '',
                operateType: '',
                documentTemplateCode: '',
                surveyPeopleId: '',
                caseId: 'ef01c4aad3f942e38d7f6c6fc3284316',
            },
        })
    }
    async handleSubmit() {
        const payload = this.paylaod
        console.log('submit', payload)
        // this.$http.get('/punish/common/getLoginUserInfo', {
        //     exShowLoading: true,
        // })
    }
}
</script>

<style lang="less" scoped>
.CaseSave {
    padding: 0 !important;
}
</style>
