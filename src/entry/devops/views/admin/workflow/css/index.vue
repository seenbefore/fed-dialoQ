<template>
    <div class="sg-page AdminWorkflowCss home-container" id="AdminWorkflowCss">
        <MarkdownArticle :container="'#AdminWorkflowCss'">
            <MarkDown></MarkDown>
        </MarkdownArticle>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MarkDown from '@/docs/workflow/[规范]-CSS命名.md'
import MarkdownArticle from '@/components/MarkdownArticle/index.vue'
@Component({
    name: 'AdminWorkflowCss',
    components: {
        MarkDown,
        MarkdownArticle,
    },
})
export default class AdminWorkflowCss extends Vue {
    mounted() {}
}
</script>

<style lang="less" scoped></style>
