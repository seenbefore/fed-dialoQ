<template>
    <div class="ace-container">
        <!-- 官方文档中使用id，这里禁止使用，在后期打包后容易出现问题，使用 ref 或者 DOM 就行 -->
        <div class="ace-editor" ref="ace"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'CodeEditor',
    components: {},
})
export default class CodeEditor extends Vue {
    @Prop() value!: string
    @Prop({ default: 'javascript' }) mode!: string
    @Prop({ default: false }) readonly!: boolean
    @Prop({ default: true }) userWorker!: boolean

    private aceEditor: any = null
    mounted() {
        this.aceEditor = window.ace.edit(this.$refs.ace, {
            maxLines: 20, // 最大行数，超过会自动出现滚动条
            minLines: 5, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
            fontSize: 12, // 编辑器内字体大小
            //theme: this.themePath, // 默认设置的主题
            mode: this.mode, // 默认设置的语言模式
            tabSize: 2, // 制表符设置为2个空格大小
            readOnly: this.readonly,
            highlightActiveLine: true,
            value: this.value,
        })

        this.aceEditor.getSession().setMode(`ace/mode/${this.mode}`)

        this.aceEditor.getSession().on('change', (ev: any) => {
            //this.$emit('update:value', this.aceEditor.getValue())  // 触发更新事件, 实现.sync双向绑定！！
            this.$emit('input', this.aceEditor.getValue())
        })
    }
}
</script>
