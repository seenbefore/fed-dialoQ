<template>
    <div class="sg-page DemoPluginVueTemplateAdmin" id="DemoPluginVueTemplateAdmin">
        <MarkdownArticle :container="'#DemoPluginVueTemplateAdmin'">
            <MarkDown></MarkDown>
        </MarkdownArticle>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MarkDown from '@/docs/plugin/vue-template-admin.md'
import MarkdownArticle from '@/components/MarkdownArticle/index.vue'
@Component({
    name: 'DemoPluginVueTemplateAdmin',
    components: {
        MarkDown,
        MarkdownArticle,
    },
})
export default class DemoPluginVueTemplateAdmin extends Vue {
    mounted() {}
}
</script>

<style lang="less" scoped>
.DemoPluginVueTemplateAdmin {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
