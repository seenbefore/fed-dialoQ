<template>
    <div class="sg-page AdminWorkflowVue home-container" id="AdminWorkflowVue">
        <MarkdownArticle :container="'#AdminWorkflowVue'">
            <MarkDown></MarkDown>
        </MarkdownArticle>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MarkDown from '@/docs/workflow/[规范]-Vue.md'
import MarkdownArticle from '@/components/MarkdownArticle/index.vue'
@Component({
    name: 'AdminWorkflowVue',
    components: {
        MarkDown,
        MarkdownArticle,
    },
})
export default class AdminWorkflowVue extends Vue {
    mounted() {}
}
</script>

<style lang="less" scoped></style>
