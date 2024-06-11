<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'

@Component({
    name: 'AttrEditor',
})
export default class AttrEditor extends Vue {
    @Ref('editorRef')
    public editorRef!: HTMLDivElement

    public editor!: monaco.editor.IStandaloneCodeEditor

    public mounted(): void {
        this.editor = monaco.editor.create(this.editorRef, {
            value: '',
            language: 'typescript',
        })
    }

    public beforeDestroy(): void {
        this.editor?.dispose?.()
    }
}
</script>

<template>
    <div ref="editorRef" class="attr-editor__container"></div>
</template>

<style scoped lang="less">
.attr-editor {
    &__container {
        width: 100%;
        height: 200px;
    }
}
</style>
