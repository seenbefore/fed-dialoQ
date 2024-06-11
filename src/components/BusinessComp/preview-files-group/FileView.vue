<template>
    <div
        v-loading="file.$loading && false"
        element-loading-text="文件加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
        customClass="loading-class-preview-file"
        class="file-view-class"
    >
        <iframe v-if="file.$config.isPdf" class="file-preview-pdf" :src="file.src" frameborder="0"></iframe>
        <ImageView v-else-if="file.$config.isImg" :src="file.src" :url="file.url" :use-db="useDb" :db-config="dbConfig" fit="contain" class="file-preview-image"></ImageView>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ImageView from './ImageView/index.vue'

@Component({
    name: 'FileView',
    components: {
        ImageView,
    },
})
export default class FileView extends Vue {
    @Prop({
        type: Object,
        default: () => ({}),
    })
    file!: any
    /** 使用数据库 */
    @Prop({ default: false })
    useDb!: boolean
    /** 数据库配置 */
    @Prop({ default: () => ({}) }) dbConfig!: Record<string, any>
}
</script>

<style scoped lang="less">
.file-view-class {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .file-preview-pdf {
        width: 100%;
        height: 100%;
    }
}
</style>
