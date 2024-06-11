<template>
    <div class="sg-page DemoPluginIcinfoUtil">
        <MyMd>
            <MarkDown></MarkDown>
        </MyMd>
        <iframe :src="baseURL + 'html/icinfo-util/index.html'" frameborder="0" style="width:100%;height:800px"></iframe>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MarkDown from '@/docs/plugin/icinfo-util.md'
@Component({
    name: 'DemoPluginIcinfoUtil',
    components: {
        MarkDown,
    },
})
export default class DemoPluginIcinfoUtil extends Vue {
    baseURL = process.env.BASE_URL
    mounted() {}
}
</script>

<style lang="less" scoped>
.DemoPluginIcinfoUtil {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
