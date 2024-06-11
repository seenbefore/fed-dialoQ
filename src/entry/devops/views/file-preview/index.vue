<!-- 批量预览附件 -->
<template>
    <PreviewFiles :file-group="fileGroup" :file-index="preIndex" :load="fileLoad" :show-close="false" :use-db="useDb" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import PreviewFiles from '@/components/BusinessComp/preview-files-group/index.vue'
import { FilePreviewDB } from '@/components/BusinessComp/preview-files-group/db'

@Component({
    name: 'PageFilesPreview',
    components: {
        PreviewFiles,
    },
})
export default class PageFilesPreview extends Vue {
    $route!: any
    created() {
        const { fileIndex = 0, storeKey, previewTitle, useDb } = this.$route.query
        try {
            this.useDb = useDb === 'true'
            // 数据库变更后，需要关闭页面
            new FilePreviewDB({
                storeKey,
                onLoadFile: (data: any) => {
                    console.log('*********本地数据库中文件数据*********', data)
                    if (data?.length > 0) {
                        this.fileGroup = data
                    } else {
                        this.handleTipClose()
                    }
                },
                onUpgrad: () => {
                    this.handleTipClose()
                },
            })
            previewTitle && (document.title = previewTitle)
            this.preIndex = JSON.parse(fileIndex)
        } catch (error) {
            console.error(error)
        }
    }

    useDb = true

    fileGroup: any = []
    preIndex = 0

    getImgSrc(url: any) {
        return `http://cdn.qiniu.barebear.cn${url}`
    }

    async fileLoad(file: any) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (file.type === 'pdf') {
                    resolve(`${process.env.BASE_URL}static/assets/docs/${file.url}`)
                } else {
                    resolve(this.getImgSrc(file.url))
                }
            }, 300)
        })
    }
    /** 数据库中无数据强制退出 */
    handleTipClose() {
        this.$confirm('未查找到相关文件，请重新选择文件查看', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            type: 'warning',
        }).finally(() => {
            window.close()
        })
        // this.$message.warning('未查找到相关文件，请重新选择文件查看')
    }
}
</script>

<style scoped lang="less"></style>
