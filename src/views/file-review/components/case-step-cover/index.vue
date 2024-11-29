<template>
    <div>
        <DocInput ref="docInputRef" :doc-params="docParams" :custom-get-doc-base-info="customGetDocBaseInfo"></DocInput>
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
        default: () => ({
            caseId: 'ef01c4aad3f942e38d7f6c6fc3284316',
            templateCode: 'DT2DZJZFM0000000001',
        }),
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
        //await this.docInputRef.saveData()
    }
    public async preview() {
        console.log('step1 next')
    }
    /**自定义获取文书模板的接口 */
    get customGetDocBaseInfo() {
        return () => this.$http.post('/common/volume/getDocBaseInfo', this.docParams)
    }
}
</script>
