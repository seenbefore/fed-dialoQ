<template>
    <div>
        <DocInput ref="docInputRef" :doc-params="docParams" :custom-get-doc-base-info="customGetDocBaseInfo" :custom-get-doc-form="customGetDocForm" is-custom-save-http></DocInput>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import DocInput from '@/components/doc-input/index.vue'
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
        default: () => ({}),
    })
    docParams!: any
    mounted() {
        console.log('Step1 mounted')
    }
    @Ref('docInputRef')
    docInputRef!: DocInput
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
        return () => this.$http.post('/common/volume/getDocBaseInfo', this.docParams)
    }
    /**自定义获取文书表单的接口 */
    get customGetDocForm() {
        // if (this.docParams.volumeConfigId) {
        //     return () => this.$http.post('/my/volume/getArchiveVolumeRecordById', this.docParams)
        // }
        return () => {
            return {
                data: {},
            }
        }
    }
}
</script>
