<template>
    <div class="preview-container">
        <div class="preview-operate">
            <el-switch v-model="useDbCache" active-text="开启图片缓存" inactive-text="关闭图片缓存"></el-switch>
            <el-switch v-model="preSelf" active-text="本页预览" inactive-text="新开页面预览" style="margin-left: 50px;"></el-switch>
            <el-button type="warning" style="margin-left: 50px;" @click="handleClearDb">清空网页数据库缓存</el-button>
        </div>
        <div v-for="(item, index) in listImages" :key="index" class="preview-group">
            <div class="preview-group-name">{{ item.name }}</div>
            <div class="preview-group-files">
                <div v-for="(itmF, idxF) in item.fileList" :key="idxF" class="preview-file">
                    <div class="file-box" @click="handleFileClick(index, idxF)">
                        <img v-if="itmF.type === 'img'" :src="itmF.src || getImgSrc(itmF.url)" :draggable="false" />
                        <div v-if="itmF.type === 'pdf'" class="pdf-txt">PDF</div>
                    </div>
                    <div class="file-name">
                        <span>{{ itmF.name }}</span>
                        <span v-if="!itmF.src" class="file-name-load">远程加载</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import '@/components/directives/highlight'
import { IFileGroup } from '@/components/BusinessComp/preview-files-group'
import { FilePreviewDB, clearDb } from '@/components/BusinessComp/preview-files-group/db'

@Component({
    name: 'PreDemo',
    components: {},
})
export default class PreDemo extends Vue {
    $router!: any

    created() {}
    mounted() {}

    useDbCache = true

    listImages: IFileGroup[] = [
        {
            name: '文件分组-1',
            fileList: [
                {
                    name: 'pdf文件1-1',
                    type: 'pdf',
                    url: 'test.pdf',
                },
                {
                    name: '图片1-2',
                    type: 'img',
                    src: 'http://cdn.qiniu.barebear.cn/e43d8d91-6fbd-4e6c-9b9a-66d2aab5b732/0aae00eca17d44f81fbc5ae54.png',
                },
                {
                    name: '图片1-3',
                    type: 'img',
                    url: '/854ace5c-4acb-4104-93da-6ab25ddf80f8/0aae00eca17d44f81fbc5ae55.jpeg',
                },
            ],
        },
        {
            name: '文件分组-2',
            fileList: [
                {
                    name: '图片2-1',
                    type: 'img',
                    src: 'http://cdn.qiniu.barebear.cn/ee982fa9-220d-482d-8b55-5dd5de2b04c7/0aae00eca17d44f81fbc5ae56.jpeg',
                },
                {
                    name: '图片2-2',
                    type: 'img',
                    url: '/a152cee3-e49a-40b4-9e95-5202ed485100/0aae00eca17d44f81fbc5ae57.jpeg',
                },
                {
                    name: '图片2-3',
                    type: 'img',
                    src: 'http://cdn.qiniu.barebear.cn/b72c4b9c-7bc3-417b-a1ce-2d6b74674ca2/0aae00eca17d44f81fbc5ae58.jpeg',
                },
            ],
        },
    ]

    getImgSrc(url: any) {
        return `http://cdn.qiniu.barebear.cn${url}`
    }

    preSelf = true

    handleFileClick(index: number, idxF: number) {
        const fileGroup = this.listImages
        const fileIndex = [index, idxF]
        const dbConfig = {
            cacheDaysImgConfig: 10,
            cacheDaysImgConfigDev: 1 / 24 / 12, // 开发测试5分钟清理一次缓存
        }
        // 本页面预览
        if (this.preSelf) {
            this.$modalDialog(() => import('@/components/BusinessComp/preview-files-group/index.vue'), {
                fileGroup,
                fileIndex,
                useDb: this.useDbCache,
                dbConfig,
                load: (file: any) => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (file.type === 'pdf') {
                                resolve(`${process.env.BASE_URL}static/assets/docs/${file.url}`)
                            } else {
                                resolve(this.getImgSrc(file.url))
                            }
                        }, 300)
                    })
                },
            })
        }
        // 新开页面预览
        else {
            const kpValue = `${Math.floor(Math.random() * 100000000)}`
            const jump = (keyPath: any) => {
                const routeUrl = this.$router.resolve({
                    path: '/file-preview',
                    query: {
                        previewTitle: '文件组预览',
                        fileIndex: JSON.stringify(fileIndex),
                        [keyPath]: kpValue,
                        useDb: this.useDbCache,
                    },
                })
                window.open(routeUrl.href)
            }
            new FilePreviewDB({
                ...dbConfig,
                onCacheFileGroupData: ({ store, keyPath, today }: any) => {
                    store.put({
                        [keyPath]: kpValue,
                        fileGroup,
                        date: today,
                    }).onsuccess = () => {
                        console.log('数据写入成功!!!!!!!!!')
                        jump(keyPath)
                    }
                },
            })
        }
    }
    /** 清除数据库 */
    handleClearDb() {
        clearDb()
    }
}
</script>

<style lang="less" scoped>
@import url('../style.less');
</style>
