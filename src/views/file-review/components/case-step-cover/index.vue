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
    /**保存文书 */
    firstSave = firstSave
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
    public handleCancel() {
        console.log('取消222')
    }
    public async save() {
        await this.docInputRef.saveData()
    }
    public async preview() {
        console.log('step1 next')
    }
    public parentHandle(dataMap: Record<string, any>, configInfo: DocumentCommonFormHtmlVo) {
        const obj = {}
        const { templateConfigMap } = configInfo
        Object.keys(templateConfigMap).forEach(key => {
            obj[key] = dataMap[key] || ''
        })
        return obj
    }
    /**保存文书 */
    async emitDataMap(tabIndex, values, sendData, resolve) {
        this.$pageLoading.show()
        await firstSave({
            ...sendData,
            id: this.$route.query.id,
        }).finally(() => {
            this.$pageLoading.hide()
        })
        resolve(true)
    }
}
</script>
