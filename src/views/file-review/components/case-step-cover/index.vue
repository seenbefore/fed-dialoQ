<template>
    <div>
        <DocInput
            ref="docInputRef"
            :doc-params="docParams"
            :custom-get-doc-base-info="customGetDocBaseInfo"
            :custom-get-doc-form="customGetDocForm"
            :get-params-doc-form="getParamsDocForm"
            :parent-handle="parentHandle"
            is-custom-save-http
            :parent-doc-base-info="parentDocBaseInfo"
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
/** 卷宗封面 */
export interface CaseStepCoverClass {
    /** 获取表单数据 */
    save: () => Promise<any>
}
/** 卷宗封面 */
@Component({
    name: 'Step1',
    components: {
        DocInput,
    },
})
export default class Step1 extends Vue {
    @Prop({ type: Boolean, default: false }) isEditVolume!: boolean
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
    /**获取文书模板 */
    customGetDocBaseInfo = getDocBaseInfo
    /**获取模板数据 */
    customGetDocForm = getArchiveVolumeRecordById
    mounted() {
        console.log('Step1 mounted')
    }
    @Ref('docInputRef')
    docInputRef!: DocInput
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
    /**设置formData */
    public parentHandle(dataMap: Record<string, any>, configInfo: DocumentCommonFormHtmlVo) {
        const obj = {}
        const { templateConfigMap } = configInfo
        Object.keys(templateConfigMap).forEach(key => {
            obj[key] = dataMap[key] || ''
        })
        return obj
    }
    /**父组件处理配置项 */
    parentDocBaseInfo(configInfo: DocumentCommonFormHtmlVo) {
        const { templateConfigMap = {} } = configInfo
        const editVolumeFields = ['fondNumber', 'catalogNumber', 'caseFileNumber']
        Object.keys(templateConfigMap).forEach(key => {
            if (editVolumeFields.includes(key)) {
                if (this.isEditVolume && templateConfigMap[key].controlConfigContent) {
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
}
</script>
