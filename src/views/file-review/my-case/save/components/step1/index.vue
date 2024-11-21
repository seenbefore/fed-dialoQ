<template>
    <div>
        <DocInput ref="docInputRef" :doc-params="docParams"></DocInput>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import DocInput from '@/components/doc-input/index.vue'

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
            documentCatalogCode: 'DC2A0223300DZJZFM0000000001',
            documentId: '',
            operateType: '',
            documentTemplateCode: '',
            surveyPeopleId: '',
            caseId: 'ef01c4aad3f942e38d7f6c6fc3284316',
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
}
</script>
