<template>
    <div class="sg-page icinfo-ai CaseSave">
        {{ paylaod }}
        <StepForm v-model="currentStep" :steps="steps" v-if="inited"></StepForm>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import StepForm, { StepConfig } from '@/components/step-form/index.vue'
import { CaseStepCoverClass } from '@/views/file-review/components/case-step-cover/index.vue'
import { CaseStepCatalogClass } from '@/views/file-review/components/case-step-catalog/index.vue'
import { saveVolumeCover, getArchiveVolumeAndCaseNumberConfig } from './api'

@Component({
    name: 'CaseSave',
    components: {
        StepForm,
    },
})
export default class CaseSave extends Vue {
    /** 额外参数  */
    @Prop({ type: Object, default: () => ({}) }) row!: any
    /** 卷宗id */
    @Prop({ type: String }) id!: string
    /** 案件id */
    @Prop({ type: String, default: '' }) caseId!: string
    /** 条线编码 */
    @Prop({ type: String, default: '' }) lineCode!: string
    /** 卷宗类型 */
    @Prop({ type: String, default: '' }) volumeTypeCode!: string
    /** 机构编码 */
    @Prop({ type: String, default: '' }) orgCode!: string
    /** 案件编号 */
    @Prop({ type: String, default: '' }) caseNumber!: string
    /** 决定书编号 */
    @Prop({ type: String, default: '' }) decisionNumber!: string
    /** 当前步骤 0:卷宗封面 1:卷宗目录 2:完成 */
    @Prop({ type: Number, default: 0 }) step!: number

    private inited = false
    async mounted() {
        try {
            if (typeof this.row === 'string') {
                const row = JSON.parse(this.row)
                Object.assign(this.paylaod, row)
            }
        } catch (error) {
            console.log(error)
        }
        await this.getArchiveConfig()
    }
    async getArchiveConfig() {
        // 获取卷宗编号和案件编号配置
        const { data } = await getArchiveVolumeAndCaseNumberConfig({
            lineCode: this.lineCode,
            volumeTypeCode: this.volumeTypeCode,
            orgCode: this.orgCode,
        })
        console.log(data)
        const { volumeConfig, caseNumberConfig } = data
        const { caseNumberLimit } = caseNumberConfig
        const { id } = volumeConfig
        Object.assign(this.paylaod, {
            volumeConfigId: id,
            volumeNumber: caseNumberLimit === '1' ? this.decisionNumber : this.caseNumber,
            retentionPeriod: '',
            // 1:自动获取决定书编号,2:自动获取立案编号
            archiveNumber: caseNumberLimit === '1' ? this.decisionNumber : this.caseNumber,
        })
        this.inited = true
    }

    paylaod = {
        caseId: this.caseId,
        id: '',
        volumeConfigId: '',

        volumeNumber: '',
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
                    docParams: {
                        volumeConfigId: this.paylaod.volumeConfigId,
                        templateCode: 'DT2DZJZFM0000000001',
                    },
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
                                    if (result) {
                                        const { data } = await saveVolumeCover({
                                            volumeConfigId: this.paylaod.volumeConfigId,
                                            caseId: this.paylaod.caseId,
                                            volumeNumber: this.paylaod.volumeNumber,
                                            //retentionPeriod: result.retentionPeriod,
                                            //archiveNumber: result.archiveNumber,
                                            ...result,
                                        })
                                        this.paylaod.id = data.id
                                        handlers.next()
                                    }
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

    async handlePreview() {
        console.log('preview')
        await this.$modalDialog(() => import('@/views/file-review/components/preview-doc-pdf-dialog/index.vue'), {
            docParams: {},
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
