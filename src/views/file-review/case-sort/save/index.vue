<template>
    <div class="sg-page icinfo-ai CaseSave">
        <StepForm v-model="currentStep" :steps="steps" @save="handleSave" @cancel="handleCancel"></StepForm>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import StepForm, { StepConfig } from '@/components/step-form/index.vue'
import { nextSave } from '@/services/auto/my/volume'
import { useLoading } from '@/hooks/useLoading'

@Component({
    name: 'CaseSave',
    components: {
        StepForm,
    },
})
export default class CaseSave extends Vue {
    @Prop({ type: String }) id!: string
    @Prop({ type: String, default: '' }) caseId!: string
    @Prop({ type: String, default: '' }) archiveId!: string
    @Prop({ type: Number, default: 0 }) step!: number
    paylaod = {
        id: this.id,
        caseId: this.caseId,
        archiveId: this.archiveId,
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
                    isEditVolume: true,
                    ...this.$attrs,
                },

                render: (h, { row, handlers }) => {
                    return (
                        <div>
                            <el-button
                                type=""
                                onClick={async () => {
                                    this.$router.back()
                                    this.$back({
                                        path: '/file-review/case-sort',
                                    })
                                }}
                            >
                                取消
                            </el-button>
                            <el-button
                                type="primary"
                                onClick={async () => {
                                    const currentComponent = handlers.getCurrentComponent()
                                    const result = await currentComponent.save?.()
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
                title: '卷内备考表',
                component: () => import('@/views/file-review/components/case-step-form/index.vue'),
                render: (h, { handlers }) => {
                    return (
                        <div>
                            <el-button type="" onClick={handlers.prev}>
                                上一步
                            </el-button>

                            <el-button
                                type="primary"
                                onClick={async () => {
                                    const currentComponent = handlers.getCurrentComponent()
                                    const result = await currentComponent.submit?.()
                                    Object.assign(this.paylaod, result)
                                    await this.handleSubmit()
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

    mounted() {
        console.log('CaseSave mounted')
        // Loading.service({
        //     fullscreen: true,
        //     lock: true,
        //     text: '提交中...',
        // })
    }
    handleSave(formData) {
        console.log('Save:', formData)
    }

    handleCancel() {
        this.$router.back()
    }
    async handlePreview() {
        console.log('preview')
        await this.$modalDialog(() => import('@/views/file-review/components/preview-doc-pdf-dialog/index.vue'), {
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
        await useLoading(nextSave, {
            ...this.paylaod,
            id: this.id,
        })
        this.$message.success('操作成功')
        this.$back({
            path: '/file-review/case-sort',
        })
    }
}
</script>

<style lang="less" scoped>
.CaseSave {
    padding: 0 !important;
}
</style>
