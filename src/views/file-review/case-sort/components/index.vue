<template>
    <div>
        <DocInput
            ref="docInputRef"
            :doc-params="docParams"
            :custom-get-doc-base-info="customGetDocBaseInfo"
            :custom-get-doc-form="customGetDocForm"
            :get-params-doc-form="getParamsDocForm"
            is-custom-save-http
            @emitDataMap="emitDataMap"
        ></DocInput>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import DocInput from '@/components/doc-input/index.vue'
import { getDocBaseInfo } from '@/services/auto/common/volume'
import { firstSave, getArchiveVolumeRecordById } from '@/services/auto/my/volume'
import { DocumentCommonFormHtmlVo } from '@/components/doc-input/service/punish/csource/common'
import { useLoading } from '@/hooks/useLoading'
import { getCaseNumberConfigList, ArchiveCaseNumberConfigVO } from '@/services/auto/config/caseNumber'
/**1:格式不可编辑,2:格式可编辑 */
export enum CaseNumberLimit {
    /** 不可编辑 */
    UNEDITABLE = '1',
    /** 可编辑 */
    EDITABLE = '2',
}
/** 卷宗封面 */
export interface CaseStepCoverClass {
    /** 获取表单数据 */
    save: () => Promise<any>
}
/** 卷宗封面 */
@Component({
    name: 'CaseSortStep1',
    components: {
        DocInput,
    },
})
export default class Step1 extends Vue {
    /**机构编码 */
    @Prop({ type: String, default: '' }) orgCode!: string
    /**条线编码 */
    @Prop({ type: String, default: '' }) lineCode!: string
    /**卷宗类型编码 */
    @Prop({ type: String, default: '' }) volumeTypeCode!: string
    @Prop({
        default: () => ({
            partyId: '',
            documentCatalogCode: '',
            documentId: '',
            operateType: '',
            documentTemplateCode: '',
            templateCode: 'DT2DZJZFM0000000001',
            surveyPeopleId: '',
            caseId: '',
        }),
    })
    docParams!: any
    mounted() {
        console.log('Step1 mounted')
    }
    @Ref('docInputRef')
    docInputRef!: DocInput
    /**自定义获取文书表单数据 */
    get customGetDocForm() {
        return async (params: any) => {
            const { data } = await getArchiveVolumeRecordById(params)
            const getCaseNumberConfigData = await this.getCaseNumberConfigList()
            return {
                data: {
                    dataMap: {
                        ...data,
                        fondNumber: data.fondNumber ?? getCaseNumberConfigData.fondNumber ?? '',
                        catalogNumber: data.catalogNumber ?? getCaseNumberConfigData.catalogNumber ?? '',
                        caseFileNumber: data.volumeNumber ?? '',
                    },
                },
            }
        }
    }
    /**自定义获取文书模板数据 */
    get customGetDocBaseInfo() {
        return async () => {
            const res = await getDocBaseInfo(this.docParams)
            const data = await this.handleDocBaseInfo(res.data)
            return {
                ...res,
                data,
            }
        }
    }
    get getParamsDocForm() {
        return {
            volumeRecordId: this.$route.query.id,
        }
    }
    public async save() {
        await this.docInputRef.saveData()
    }
    public async preview() {
        console.log('step1 next')
    }

    /**处理配置项 */
    async handleDocBaseInfo(configInfo: DocumentCommonFormHtmlVo) {
        const getCaseNumberConfigData = await this.getCaseNumberConfigList()
        const { templateConfigMap = {} } = configInfo
        // 设置全宗号 和 目录号 是否可编辑
        const editVolumeFields = ['fondNumber', 'catalogNumber']
        Object.keys(templateConfigMap).forEach(key => {
            if (editVolumeFields.includes(key)) {
                if (getCaseNumberConfigData[key + 'Limit'] === CaseNumberLimit.EDITABLE && templateConfigMap[key].controlConfigContent) {
                    const controlConfigContent = {
                        ...JSON.parse(templateConfigMap[key].controlConfigContent),
                        isEdit: '1',
                    }
                    templateConfigMap[key].controlConfigContent = JSON.stringify(controlConfigContent)
                }
            }
        })
        return configInfo
    }
    /**获取封面底部编号配置 */
    async getCaseNumberConfigList(): Promise<ArchiveCaseNumberConfigVO> {
        let caseNumberConfig = {}
        try {
            const { data } = await getCaseNumberConfigList({ orgCode: this.orgCode, lineCode: this.lineCode, volumeTypeCode: this.volumeTypeCode }, { exNoErrorMassage: true })
            caseNumberConfig = data?.[0] ?? {}
        } catch (error) {
            console.log(error)
        }
        return caseNumberConfig as ArchiveCaseNumberConfigVO
    }
    /**保存文书 */
    async emitDataMap(tabIndex, values, sendData, resolve) {
        if (tabIndex === -1) {
            return
        }
        await useLoading(firstSave, {
            ...(sendData.dataMap || {}),
            id: this.$route.query.id,
        })
        resolve(true)
    }
    created() {}
}
</script>
