<template>
    <div class="file-scroll-list">
        <div v-for="(itmGp, idxGp) in fileGroup" :key="idxGp" class="file-type-list">
            <div :title="itmGp.name" class="file-type-name">
                <img class="file-group-icon" :src="require('./assets/icon-folder.svg')" />
                <div class="file-group-name">{{ itmGp.name }}</div>
            </div>
            <ul class="file-list">
                <li
                    v-for="(item, index) in itmGp.fileList"
                    :key="index"
                    class="file-item-wrapper"
                    :class="{
                        'file-item-wrapper-active': isActive(idxGp, index),
                    }"
                    @click="handleClick(idxGp, index)"
                >
                    <div class="file-item-content">
                        <img :src="getIconFile(item, idxGp, index)" class="file-type-icon" />
                        <div class="file-name">{{ getName(item) }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { IFileItem } from './'

@Component({
    name: 'FileScrollList',
    components: {},
})
export default class FileScrollList extends Vue {
    @Prop({ default: [0, 0] }) value!: number[]
    @Prop({ default: () => [] }) fileGroup!: any[]

    getIconFile(item: IFileItem, idxGp: number, index: number) {
        let { icon, iconSelected } = item.$config || {}
        let src = this.isActive(idxGp, index) ? iconSelected : icon
        return require(`./assets/${src}.svg`)
    }

    handleClick(idxGp: number, index: number) {
        if (this.value[0] === idxGp && this.value[1] === index) return
        const value = [idxGp, index]
        this.$emit('input', value)
        this.$emit('change', value)
    }

    isActive(idxGp: number, index: number) {
        return idxGp === this.value[0] && index === this.value[1]
    }

    getName(item: any) {
        if (item.name) {
            return item.name
        }
        return item.$config.isPdf ? 'pdf文件' : '图片文件'
    }
}
</script>

<style scoped lang="less">
.file-scroll-list {
    width: 260px;
    flex-shrink: 0;
    color: #fff;
    word-break: break-all;
    overflow: auto;
    border: 2px solid #323639;
    padding: 0 10px 10px;
    .file-type-list {
        .file-type-name {
            padding: 20px 0px 8px;
            // background: #323639;
            line-height: 22px;
            display: flex;
            border-bottom: 1px solid #666;
            .file-group-icon {
                width: 14px;
                height: 14px;
                margin-top: 3px;
                margin-right: 8px;
            }
            .file-group-name {
                display: -webkit-box; /* 使用 Flexbox 布局 */
                -webkit-box-orient: vertical; /* 垂直方向布局 */
                overflow: hidden; /* 溢出部分隐藏 */
                -webkit-line-clamp: 2; /* 限制显示两行 */
                text-overflow: ellipsis; /* 溢出时显示省略号 */
                overflow: hidden;
                font-size: 14px;
                font-weight: 600;
                line-height: 20px;
            }
        }
        .file-list {
            padding: 5px 0 0;
            .file-item-wrapper {
                padding: 9px 15px;
                padding-right: 10px;
                border-radius: 4px;
                cursor: pointer;
                .file-item-content {
                    display: flex;
                    .file-type-icon {
                        width: 14px;
                        height: 14px;
                        margin-right: 5px;
                        margin-top: 3px;
                    }
                    .file-name {
                        color: #c6c6c6;
                    }
                }
            }
            .file-item-wrapper-active {
                background: #3f88f7;
                .file-item-content {
                    .file-name {
                        color: #fff;
                        font-weight: 600;
                    }
                }
            }
        }
    }
}
</style>
