<template>
    <div>
        <!-- {{ templateConfigKeys }} -->
        <DocInput
            ref="docInputRef"
            :doc-params="docParams"
            :cus-doc-form-data="cusDocFormData"
            :custom-get-doc-base-info="customGetDocBaseInfo"
            :custom-get-doc-form="customGetDocForm"
            is-custom-save-http
        ></DocInput>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import DocInput from '@/components/doc-input/index.vue'
import { getArchiveVolumeRecordById } from '@/services/auto/my/volume'
import { getDocBaseInfo } from '@/services/auto/common/volume'
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
    /**
     * 文书数据
     */
    @Prop({
        default: () => ({}),
    })
    row!: any
    @Prop({
        default: () => ({}),
    })
    docParams!: any
    mounted() {
        console.log('Step1 mounted')
    }
    @Ref('docInputRef')
    docInputRef!: DocInput
    cusDocFormData = {
        caseAddress: '22',
    }
    templateConfigKeys: any[] = []
    public handleCancel() {
        console.log('取消222')
    }
    public async save() {
        console.log('step1 save')
        const result: any = await this.docInputRef.saveData()
        console.log('result', result)
        return result.values
    }
    public async preview() {
        console.log('step1 next')
    }
    /**自定义获取文书模板的接口 */
    get customGetDocBaseInfo() {
        return async () => {
            const res = await getDocBaseInfo(this.docParams)
            this.templateConfigKeys = Object.keys(res.data?.templateConfigMap || {})
            return res
        }
    }
    /**自定义获取文书表单的接口 */
    get customGetDocForm() {
        const templateConfigKeys = this.templateConfigKeys
        if (this.docParams.volumeRecordId) {
            return async () => {
                const res = await getArchiveVolumeRecordById(this.docParams)
                this.$emit('init', res.data)
                return res
            }
        }
        return () => {
            return {
                data: {
                    ...this.row,
                },
            }
        }
    }
}
</script>
