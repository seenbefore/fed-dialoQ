<template>
    <div class="sg-page icinfo-ai CaseSave">
        <!-- {{ $props }}
        {{ $attrs }} -->
        <StepForm v-model="currentStep" :steps="steps" v-if="inited"></StepForm>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import StepForm, { StepConfig } from '@/components/step-form/index.vue'
import { CaseStepCoverClass } from '@/views/file-review/components/case-step-cover/index.vue'
import { CaseStepCatalogClass } from '@/views/file-review/components/case-step-catalog/index.vue'
import { saveVolumeCover, getArchiveVolumeAndCaseNumberConfig, submitDocument, modifyVolumeCover, previewVolume } from './api'

@Component({
    name: 'CaseSave',
    components: {
        StepForm,
    },
})
export default class CaseSave extends Vue {
    /**
     * action 类型
     * add:新增
     * edit:编辑
     */
    @Prop({ type: String, default: 'add' }) action!: 'add' | 'edit'
    /** 额外参数  */
    @Prop({ type: Object, default: () => ({}) }) row!: any
    /** 卷宗id */
    @Prop({ type: String }) id!: string
    /** 卷宗编号 */
    @Prop({ type: String, default: '' }) volumeNumber!: string
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
    /** 案件名称 */
    @Prop({ type: String, default: '' }) caseName!: string
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
        if (this.lineCode && this.volumeTypeCode && this.orgCode) {
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
        }

        this.inited = true
    }

    paylaod = {
        caseId: this.caseId,
        id: this.id,
        volumeConfigId: '',

        volumeNumber: '',
        archiveCatalogContentList: [] as any[],
    }
    loading = {
        previewSave: false,
        submit: false,
        preview: false,
        cover: false,
    }

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
                        volumeRecordId: this.paylaod.id,
                        templateCode: 'DT2DZJZFM0000000001',
                    },
                    row: {
                        // 归档号
                        // archiveNumber:this.archiveNumber,
                        // caseAddress:this.caseAddress,
                        //caseName: this.caseName,

                        ...this.$attrs,
                        ...this.$props,
                    },
                },
                render: (h, { row, handlers }) => {
                    return (
                        <div>
                            <el-button
                                type=""
                                onClick={async () => {
                                    this.$back({
                                        path: '/file-review/my-case',
                                    })
                                }}
                            >
                                取消
                            </el-button>
                            <el-button
                                type="primary"
                                loading={this.loading.cover}
                                disabled={this.loading.cover}
                                onClick={async () => {
                                    try {
                                        this.loading.cover = true
                                        const currentComponent = handlers.getCurrentComponent() as CaseStepCoverClass
                                        const result = await currentComponent.save()
                                        if (this.action === 'add') {
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
                                        } else {
                                            await modifyVolumeCover({
                                                id: this.paylaod.id,
                                                volumeConfigId: this.paylaod.volumeConfigId,
                                                caseId: this.paylaod.caseId,
                                                volumeNumber: this.paylaod.volumeNumber,
                                                //retentionPeriod: result.retentionPeriod,
                                                //archiveNumber: result.archiveNumber,
                                                ...result,
                                            })
                                            handlers.next()
                                        }
                                        this.loading.cover = false
                                    } catch (err) {
                                        this.loading.cover = false
                                        console.error(err)
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
                props: {
                    row: this.paylaod,
                },

                render: (h, { row, handlers }) => {
                    return (
                        <div>
                            <el-button type="" onClick={handlers.prev}>
                                上一步
                            </el-button>
                            <el-button
                                loading={this.loading.previewSave}
                                disabled={this.loading.previewSave}
                                type=""
                                onClick={async () => {
                                    // 暂存
                                    try {
                                        const currentComponent = handlers.getCurrentComponent() as CaseStepCatalogClass
                                        const result = await currentComponent.submit()
                                        this.loading.previewSave = true

                                        await submitDocument({
                                            id: this.paylaod.id,
                                            operateType: '1',

                                            ...result,
                                        })
                                        this.loading.previewSave = false
                                    } catch (err) {
                                        this.loading.previewSave = false
                                        console.error(err)
                                    }
                                }}
                            >
                                暂存
                            </el-button>
                            <el-button
                                type=""
                                loading={this.loading.preview}
                                disabled={this.loading.preview}
                                onClick={async () => {
                                    try {
                                        const currentComponent = handlers.getCurrentComponent() as CaseStepCatalogClass
                                        const result = await currentComponent.submit()
                                        this.loading.preview = true
                                        const { data } = await previewVolume(
                                            {
                                                id: this.paylaod.id,
                                                mainVolumeList: result.mainVolumeList,
                                                subVolumeList: result.subVolumeList,
                                            },
                                            {
                                                timeout: 60 * 1000,
                                            },
                                        )
                                        this.loading.preview = false
                                        await this.$modalDialog(() => import('@/views/file-review/components/file-dialog/index.vue'), {
                                            fileUrl: data.volumeUrl,
                                        })
                                    } catch (err) {
                                        this.loading.preview = false
                                        console.error(err)
                                    }
                                }}
                            >
                                预览
                            </el-button>
                            <el-button
                                type="primary"
                                loading={this.loading.submit}
                                disabled={this.loading.submit}
                                onClick={async () => {
                                    try {
                                        const currentComponent = handlers.getCurrentComponent() as CaseStepCatalogClass
                                        const result = await currentComponent.submit()

                                        if (this.action === 'add') {
                                            const message: any = this.$createElement('div', {}, [
                                                this.$createElement('div', {}, '确定提交卷宗吗？'),
                                                this.$createElement('div', {}, '提交后，等待档案管理员整理卷宗'),
                                                this.$createElement('div', {}, '整理结束后若修改卷宗，需档案管理员审批'),
                                            ])
                                            await this.$confirm(message)
                                            this.loading.submit = true
                                            await submitDocument(
                                                {
                                                    id: this.paylaod.id,
                                                    operateType: '1',
                                                    mainVolumeList: result.mainVolumeList,
                                                    subVolumeList: result.subVolumeList,
                                                },
                                                {
                                                    exShowLoading: true,
                                                },
                                            )
                                            this.loading.submit = false
                                        } else {
                                            const model = await this.$modalDialog(() => import('./components/modify-dialog/index.vue'), {})
                                            if (model.modifyContent) {
                                                this.loading.submit = true
                                                await submitDocument(
                                                    {
                                                        id: this.paylaod.id,
                                                        operateType: '1',
                                                        modifyContent: model.modifyContent,
                                                        mainVolumeList: result.mainVolumeList,
                                                        subVolumeList: result.subVolumeList,
                                                    },
                                                    {
                                                        //timeout: 5 * 1000,
                                                        exShowLoading: true,
                                                    },
                                                )
                                                this.loading.submit = false
                                            }
                                        }
                                        this.$message.success(`操作成功`)
                                        this.$back({
                                            path: '/file-review/my-case',
                                        })
                                    } catch (err) {
                                        console.error(err)
                                        this.loading.submit = false
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
    async handleSubmit(data: any) {
        await submitDocument(data)
    }
}
</script>

<style lang="less" scoped>
.CaseSave {
    padding: 0 !important;
}
</style>
