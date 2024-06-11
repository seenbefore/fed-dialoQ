<script lang="ts">
import PdfPreview from '@/entry/h5/components/pdf-preview/index.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
    name: 'PdfPreviewPage',
    components: { PdfPreview },
})
export default class PdfPreviewPage extends Vue {}
</script>

<template>
    <PdfPreview url="https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"></PdfPreview>
</template>

<style scoped lang="less"></style>
