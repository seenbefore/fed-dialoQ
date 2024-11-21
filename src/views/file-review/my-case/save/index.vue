<template>
    <div class="sg-page icinfo-ai CaseSave">
        <StepForm v-model="currentStep" :steps="steps" @save="handleSave" @cancel="handleCancel"></StepForm>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import StepForm, { StepConfig } from '@/components/step-form/index.vue'

@Component({
    name: 'CaseSave',
    components: {
        StepForm,
    },
})
export default class CaseSave extends Vue {
    @Prop({ type: String }) id!: string
    @Prop({ type: Number, default: 0 }) step!: number
    loading = false
    /** 当前步骤 */
    currentStep = this.step
    get steps() {
        return [
            {
                title: '卷宗封面',
                component: () => import('./components/step1/index.vue'),
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
                                    const currentComponent = handlers.getCurrentComponent()

                                    await currentComponent.save?.()
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
                component: () => import('./components/step2/index.vue'),
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
                            <el-button type="primary" onClick={handlers.next}>
                                下一步
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
    handleSave(formData) {
        console.log('Save:', formData)
    }

    handleCancel() {
        this.$router.back()
    }
    handlePreview() {
        console.log('preview')
        // try {
        //     const res: any = await this.docInputRef.docPreview().finally(() => {})
        //     console.log('%c Line:55 🍊 res', 'background:#376ff3', res)
        //     this.viewPdfSrc = res?.data.pdfUrl
        //     await this.$modalDialog(() => import('@/views/file-review/my-case/components/preview-dialog/index.vue'), {
        //         pdfSrc: this.viewPdfSrc,
        //     })
        // } catch (error) {
        //     console.error(error)
        // }
    }
}
</script>

<style lang="less" scoped>
.CaseSave {
    padding: 0 !important;
}
</style>
