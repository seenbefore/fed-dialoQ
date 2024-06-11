<template>
    <el-dialog visible :close-on-click-modal="false" :show-close="false" custom-class="preview-files-dialog" fullscreen @close="onCancel">
        <div
            v-loading="curFile && curFile.$loading"
            element-loading-text="文件加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.7)"
            class="preview-files-body"
        >
            <!-- 文件列表 -->
            <FileScrollList v-if="showFileScroll" v-model="curFileIdx" :file-group="filesData" @change="handleFileChange" />
            <!-- 右侧内容区域 -->
            <div class="file-view-wrapper" :class="classFileWrapper">
                <!-- 文件预览 -->
                <div class="file-view-content">
                    <FileView v-if="curFile" :file="curFile" :use-db="useDb" :db-config="dbConfig" />
                </div>
                <div v-if="showClose" class="file-view-close">
                    <div class="file-close-button" @click="onCancel">
                        <i class="el-icon-circle-close"></i>
                    </div>
                </div>
                <!-- 前进后退 -->
                <NavPagination v-if="showFileScroll" :show-close="showClose" @toggle="handleToggle" />
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import FileScrollList from './FileScrollList.vue'
import FileView from './FileView.vue'
import NavPagination from './components/NavPagination.vue'
import { CONFIG, ENUM_TOGGLE } from './config'
import { IFileGroup, IFileItem } from './index'

@Component({
    name: 'PreviewFilesGroup',
    components: {
        FileScrollList,
        FileView,
        NavPagination,
    },
})
export default class PreviewFilesGroup extends Vue {
    /** 附件列表 */
    @Prop({ default: () => [] }) fileGroup!: IFileGroup[]
    /** 附件下标 */
    @Prop({ default: () => [0, 0] }) fileIndex!: number[]
    /** 是否可以关闭 */
    @Prop({ default: true }) showClose!: boolean
    /** 懒加载方法 */
    @Prop({ default: null }) load!: any
    /** 是否使用数据库缓存 */
    @Prop({ default: false }) useDb!: boolean
    /** 数据库配置 */
    @Prop({ default: () => ({}) }) dbConfig!: Record<string, any>

    mounted() {}
    /** 处理后的数据 */
    filesData: IFileGroup[] = []
    /** 当前选中位置 */
    curFileIdx = this.fileIndex
    /** 监听数据源改变 */
    @Watch('fileGroup', { immediate: true, deep: true })
    onWatchFileList(value: IFileGroup[]) {
        this.formatFileData()
        this.initFileItem()
    }
    /** 将数据源格式化为组件数据 */
    formatFileData() {
        this.filesData = this.fileGroup.map(item => {
            return {
                ...item,
                fileList: item.fileList.map(file => {
                    return {
                        $config: CONFIG[file.type],
                        ...file,
                    }
                }),
            }
        })
    }
    /** 当前选中文件 */
    get curFile() {
        const [idxGp, idxFile] = this.curFileIdx
        const file = this.filesData[idxGp]?.fileList?.[idxFile]
        return file
    }
    /** 设置当前选中文件配置 */
    async initFileItem() {
        const file = this.curFile
        if (!file || !this.load || file.src || file.$loading) return
        this.$set(file, '$loading', true)
        try {
            const data = await this.load(file)
            this.$set(file, 'src', data)
        } catch (error) {
            console.error(error)
        }
        this.$set(file, '$loading', false)
    }
    /** 选中文件改变事件 */
    handleFileChange() {
        this.initFileItem()
    }
    /** 是否展示侧边选择 */
    get showFileScroll() {
        const total = this.filesData.reduce((prev, cur) => prev + cur.fileList?.length ?? 0, 0)
        return total > 1
    }
    /* 关闭 */
    onCancel() {
        const options: any = this.$options
        options.cancel?.()
    }
    get classFileWrapper() {
        const cls: any = []
        if (this.showClose) cls.push('file-view-wrapper-hasclose')
        return cls
    }
    /** 文件切换操作 */
    handleToggle(toggeType: any) {
        const [idxGroup, idxFile] = this.curFileIdx
        const group = this.filesData[idxGroup]
        const gLen = this.filesData.length
        // console.log('切换操作', toggeType, group)
        const result = [...this.curFileIdx]
        switch (toggeType) {
            /** 下一个 */
            case ENUM_TOGGLE.NEXT:
                if (idxFile === group.fileList.length - 1) {
                    if (idxGroup === gLen - 1) {
                        result[0] = 0
                    } else {
                        console.log('----', idxGroup, idxFile)
                        result[0] = idxGroup + 1
                    }
                    result[1] = 0
                } else {
                    result[1] = idxFile + 1
                }
                break
            /** 上一个 */
            case ENUM_TOGGLE.PRE:
                if (idxFile === 0) {
                    if (idxGroup === 0) {
                        result[0] = gLen - 1
                    } else {
                        result[0] = idxGroup - 1
                    }
                    result[1] = this.filesData[result[0]].fileList.length - 1
                } else {
                    result[1] = idxFile - 1
                }
                break
        }
        this.curFileIdx = result
        this.initFileItem()
    }
}
</script>

<style scoped lang="less">
.fill {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0;
}
::v-deep {
    .preview-files-dialog {
        border-radius: 0;
        ul,
        li {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .el-dialog__header {
            display: none;
        }
        .el-dialog__body {
            .fill();
        }
        .el-loading-spinner {
            .el-icon-loading {
                color: #fff;
                font-size: 30px;
            }
            .el-loading-text {
                color: #fff;
                font-size: 16px;
                margin: 8px 0;
            }
        }
        .preview-files-body {
            .fill();
            color: #fff;
            background: #454545;
            display: flex;
            .file-view-wrapper {
                flex: 1;
                overflow: hidden;
                background: #333;
                display: flex;
                position: relative;
                .file-view-content {
                    flex: 1;
                    overflow: hidden;
                }
                .file-view-close {
                    display: flex;
                    justify-content: center;
                    .file-close-button {
                        height: max-content;
                        padding: 10px 10px;
                        font-size: 30px;
                        cursor: pointer;
                        &:hover {
                            opacity: 0.8;
                        }
                    }
                }
            }
            .file-view-wrapper-hasclose {
                padding-left: 50px;
            }
        }
    }
}
</style>
