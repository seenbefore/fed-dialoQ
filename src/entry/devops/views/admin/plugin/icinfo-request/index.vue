<template>
    <div class="sg-page DemoPluginsIcinfoRequest" id="DemoPluginVueTemplateAdmin">
        <MarkdownArticle :container="'#DemoPluginVueTemplateAdmin'">
            <MarkDown></MarkDown>
        </MarkdownArticle>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MarkDown from '@/docs/plugin/icinfo-request.md'
import MarkdownArticle from '@/components/MarkdownArticle/index.vue'
@Component({
    name: 'DemoPluginsIcinfoRequest',
    components: {
        MarkDown,
        MarkdownArticle,
    },
})
export default class DemoPluginsIcinfoRequest extends Vue {
    mounted() {}
}
</script>

<style lang="less" scoped>
.DemoPluginsIcinfoRequest {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
