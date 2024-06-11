<template>
    <el-dialog class="UseDialog" :title="'预览'" visible width="900px" @close="cancel">
        <MarkdownArticle :container="'#web'" v-if="content" :show-catalog="false">
            <div v-html="content" class="element-doc"></div>
        </MarkdownArticle>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import MarkdownArticle from '@/components/MarkdownArticle/index.vue'
@Component({
    name: 'UseDialog',
    components: {
        MarkdownArticle,
    },
})
export default class UseDialog extends Vue {
    @Prop() content!: string

    cancel() {
        this.$options.cancel?.()
    }
}
</script>
