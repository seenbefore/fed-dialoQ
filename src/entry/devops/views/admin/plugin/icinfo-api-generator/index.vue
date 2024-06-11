<template>
    <div class="sg-page DemoPluginIcinfoApiGenerator" id="DemoPluginIcinfoApiGenerator">
        <MarkdownArticle :container="'#DemoPluginIcinfoApiGenerator'">
            <MarkDown></MarkDown>
        </MarkdownArticle>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MarkDown from '@/docs/plugin/icinfo-api-generator.md'
import MarkdownArticle from '@/components/MarkdownArticle/index.vue'
@Component({
    name: 'DemoPluginIcinfoApiGenerator',
    components: { MarkDown, MarkdownArticle },
})
export default class DemoPluginIcinfoApiGenerator extends Vue {
    mounted() {}
}
</script>

<style lang="less" scoped>
.DemoPluginIcinfoApiGenerator {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
