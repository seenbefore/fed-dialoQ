<script lang="ts">
import DocForm from '@/entry/h5/components/global/doc-form/index.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
    name: 'DocPreview',
    components: { DocForm },
})
export default class DocPreview extends Vue {
    /* 默认值 */
    public dataMap: Record<string, any> = {
        wf_wfc: '这是一个测试的默认值',
    }
}
</script>

<template>
    <DocForm :use-mock="true" :data-map="dataMap"></DocForm>
</template>

<style scoped lang="less"></style>
