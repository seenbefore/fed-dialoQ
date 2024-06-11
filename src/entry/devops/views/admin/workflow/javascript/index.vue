<template>
    <div class="sg-page AdminWorkflowJavascript home-container" id="AdminWorkflowJavascript">
        <MarkdownArticle :container="'#AdminWorkflowJavascript'">
            <MarkDown></MarkDown>
        </MarkdownArticle>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MarkDown from '@/docs/workflow/[规范]-JavaScript命名.md'
import MarkdownArticle from '@/components/MarkdownArticle/index.vue'
@Component({
    name: 'AdminWorkflowJavascript',
    components: {
        MarkDown,
        MarkdownArticle,
    },
})
export default class AdminWorkflowJavascript extends Vue {
    mounted() {}
}
</script>

<style lang="less" scoped></style>
