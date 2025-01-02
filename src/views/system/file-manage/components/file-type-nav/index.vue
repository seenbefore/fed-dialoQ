<template>
    <div class="FileTypeNav">
        <div class="file-type-list">
            <div class="file-type-item" :class="{ active: activeType === 'all' }" @click="handleTypeClick('all')">
                <i class="el-icon-folder"></i>
                <span>全部</span>
                <span class="count">{{ fileCount.all }}</span>
            </div>
            <div class="file-type-item" :class="{ active: activeType === 'image' }" @click="handleTypeClick('image')">
                <i class="el-icon-picture"></i>
                <span>图片</span>
                <span class="count">{{ fileCount.image }}</span>
            </div>
            <div class="file-type-item" :class="{ active: activeType === 'doc' }" @click="handleTypeClick('doc')">
                <i class="el-icon-document"></i>
                <span>文档</span>
                <span class="count">{{ fileCount.doc }}</span>
            </div>
            <div class="file-type-item" :class="{ active: activeType === 'video' }" @click="handleTypeClick('video')">
                <i class="el-icon-video-camera"></i>
                <span>视频</span>
                <span class="count">{{ fileCount.video }}</span>
            </div>
            <div class="file-type-item" :class="{ active: activeType === 'audio' }" @click="handleTypeClick('audio')">
                <i class="el-icon-headset"></i>
                <span>音频</span>
                <span class="count">{{ fileCount.audio }}</span>
            </div>
            <div class="file-type-item" :class="{ active: activeType === 'other' }" @click="handleTypeClick('other')">
                <i class="el-icon-more"></i>
                <span>其他</span>
                <span class="count">{{ fileCount.other }}</span>
            </div>
        </div>
        <div class="storage-info">
            <div class="storage-title">存储量</div>
            <el-progress :percentage="storageUsage" :format="format"></el-progress>
            <div class="storage-detail">
                <span>已使用 {{ usedStorage }}MB</span>
                <span>总容量 {{ totalStorage }}MB</span>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'FileTypeNav',
})
export default class FileTypeNav extends Vue {
    /** 当前选中的文件类型 */
    @Prop({ default: 'all' }) readonly value!: string

    /** 文件数量统计 */
    fileCount = {
        all: 22,
        image: 8,
        doc: 5,
        video: 3,
        audio: 2,
        other: 4,
    }

    /** 存储使用情况 */
    usedStorage = 16
    totalStorage = 100

    get activeType() {
        return this.value
    }

    get storageUsage() {
        return Math.floor((this.usedStorage / this.totalStorage) * 100)
    }

    format(percentage: number) {
        return `${percentage}%`
    }

    handleTypeClick(type: string) {
        this.$emit('input', type)
        this.$emit('change', type)
    }
}
</script>

<style lang="less" scoped>
.FileTypeNav {
    width: 200px;
    height: 100%;
    background: #fff;
    border-right: 1px solid #eee;
    padding: 20px 0;

    .file-type-list {
        .file-type-item {
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            cursor: pointer;
            display: flex;
            align-items: center;

            &:hover {
                background: #f5f7fa;
            }

            &.active {
                background: #ecf5ff;
                color: #409eff;
            }

            i {
                margin-right: 8px;
                font-size: 18px;
            }

            .count {
                margin-left: auto;
                color: #909399;
            }
        }
    }

    .storage-info {
        margin-top: 20px;
        padding: 0 20px;

        .storage-title {
            margin-bottom: 10px;
            font-weight: bold;
        }

        .storage-detail {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            color: #909399;
            font-size: 12px;
        }
    }
}
</style>
