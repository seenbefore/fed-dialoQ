<template>
    <el-drawer class="document-wrap sg-drawer" append-to-body title="查看文件" :visible.sync="dialogVisible" :size="size" @close="cancel">
        <div class="content" v-loading.lock="isLoading" id="FileDialog">
            <my-iframe-pdf :pdf-src="fileUrl" iframe-width="100%" iframe-height="100%" v-if="urlType === 'pdf' && newUrl" zoom="100%"></my-iframe-pdf>
            <video v-else-if="urlType === 'video'" style="height:60vh" controls>
                <source :src="newUrl" type="video/mp4" />
                <source :src="newUrl" type="video/ogg" />
                <source :src="newUrl" type="video/webm" />
            </video>
            <img v-else-if="urlType === 'img'" class="el-image" :src="newUrl" @click="handlePreviewImage([newUrl])" />
            <iframe v-else-if="isBlob()" :src="newUrl" frameborder="0" width="100%" height="100%"></iframe>
            <div v-else>
                不支持的格式，
                <a :href="fileUrl" target="_blank">点击查看</a>
            </div>
        </div>
        <!-- </el-dialog> -->
    </el-drawer>
</template>

<script>
import { getNewUrl, getUrlType, isMp4, isVideo } from '@/utils/pdfAndImgUrl'
import { useWatermark } from '@/scripts/utils/watermark'
import { getUserInfoByToken } from '@/services/auto/volume/user'
import { useImagePreview } from '@/components/image-preview/hooks/useImagePreview'
export default {
    name: 'FileDialog',
    props: {
        // 查看文件的路径
        fileUrl: {
            type: String,
            default: '',
        },
        appendToBody: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: '80%',
        },
    },
    data() {
        return {
            dialogVisible: true,
            newUrl: '',
            isLoading: false,
            handlers: {},
        }
    },
    watch: {
        fileUrl: {
            async handler(newV) {
                this.isLoading = true
                const result = await getNewUrl(newV).finally(() => (this.isLoading = false))
                this.newUrl = result
            },
            immediate: true,
        },
    },
    computed: {
        urlType() {
            const imgsArr = ['png', 'jpg', 'jpeg', 'gif']
            if (imgsArr.includes(getUrlType(this.newUrl))) {
                return 'img'
            }
            if (
                Object.keys(imgsArr).some(item => {
                    return this.newUrl.endsWith(`.${item}`)
                })
            ) {
                return 'img'
            }
            if (this.newUrl.indexOf('.pdf') > -1 || this.newUrl.indexOf('blob:') > -1 || this.newUrl.indexOf('data:application/pdf;') > -1) {
                return 'pdf'
            }
            if (isMp4(this.newUrl)) {
                return 'video'
            }
            return ''
        },
    },
    methods: {
        isPdf() {
            // return isPdf(this.fileUrl)
        },
        isVideo() {
            return isVideo(this.fileUrl)
        },
        isBlob() {
            return this.fileUrl.startsWith('blob:')
        },

        cancel() {
            this.$options?.cancel()
        },
        handlePreviewImage(url) {
            useImagePreview(url)
        },
    },
    async mounted() {
        const { setWatermark, clear } = useWatermark()
        this.handlers = {
            setWatermark,
            clear,
        }
        const { data } = await getUserInfoByToken()
        const message = `${data.userName} ${data.phone}`
        this.handlers.setWatermark(message, {
            fixed: true,
        })
    },
    destroyed() {
        this.handlers.clear()
    },
}
</script>

<style lang="less" scoped>
.sg-drawer::v-deep {
    .el-drawer__header {
        margin: 0;
        padding: 0 20px;
        height: 49px;
        border-bottom: 1px solid #ddd !important;
        background: #fff;
        color: #333;
        font-size: 16px;
        line-height: 49px;
    }
    .content {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    ::v-deep {
        .el-image {
            max-width: 100%;
            max-height: 100%;
        }
        .el-image .el-image__inner {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
        }
    }
}
</style>
