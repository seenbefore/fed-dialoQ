<template>
    <div class="sg-page DemoWorkflowReadme" id="DemoWorkflowReadme">
        <MarkdownArticle :container="'#DemoWorkflowReadme'">
            <MarkDown></MarkDown>
        </MarkdownArticle>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MarkDown from '@/docs/workflow/README.md'
import MarkdownArticle from '@/components/MarkdownArticle/index.vue'

@Component({
    name: 'DemoWorkflowReadme',
    components: {
        MarkDown,
        MarkdownArticle,
    },
})
export default class DemoWorkflowReadme extends Vue {
    mounted() {}
}
</script>

<style lang="less" scoped>
.DemoWorkflowReadme {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
