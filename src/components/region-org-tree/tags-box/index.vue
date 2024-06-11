<template>
    <div class="tags-box" :class="{ disabled: disabled }">
        <div class="body" ref="tagContainer" :class="{ 'only-show-one': showTags.length === 1 }">
            <el-tag :key="tag[valueKey]" v-for="tag in showTags" :closable="!disabled" :type="disabled ? 'info' : ''" @close="delTag(tag)" :title="tag ? tag[labelKey] : ''">
                {{ tag ? tag[labelKey] : '' }}
            </el-tag>
            <el-tag v-show="showMoreTag" class="more-tag" @click="showAll">+{{ surplusCount }}</el-tag>
        </div>
        <div class="temp-body" ref="tagTempContainer">
            <el-tag :key="tag[valueKey]" v-for="tag in value" :closable="!disabled">
                {{ tag ? tag[labelKey] : '' }}
            </el-tag>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import { Option } from '../types'
@Component({
    name: 'TagsBox',
    components: {},
})
export default class TagsBox extends Vue {
    @Prop({ type: Array, default: () => [] })
    value!: Option[]
    /**是否禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean
    @Prop({ type: String, default: 'value' })
    valueKey!: string
    @Prop({ type: String, default: 'label' })
    labelKey!: string

    @Emit('input')
    emitInput(tags: Option[]) {
        return tags
    }

    showTags: Option[] = []
    showMoreTag = false
    @Ref('tagContainer')
    tagContainerRef!: HTMLElement
    @Ref('tagTempContainer')
    tagTempContainerRef!: HTMLElement
    @Watch('value', { immediate: true })
    async watchTags() {
        await this.$nextTick()
        const containerWidth = this.tagContainerRef.offsetWidth
        const tags = this.tagTempContainerRef.querySelectorAll('.el-tag:not(.el-zoom-in-center-leave)') as NodeListOf<HTMLElement>
        let count = 0
        let showTags: Option[] = []
        Array.from(tags).some((tag, index) => {
            const width = tag.offsetWidth + 5
            if (count + width > containerWidth) {
                this.showMoreTag = true
                const showTagsCount = showTags.filter(Boolean).length
                // 计算剩余标签的数字占据的宽度
                const fillWidth = 30 + (showTagsCount.toString().length - 1 * 10)
                if (count + fillWidth > containerWidth) {
                    showTags.pop()
                    return true
                }
                return true
            }
            count += width
            showTags.push(this.value[index])
            return false
        })
        showTags = showTags.filter(Boolean)
        // 不能一个标签都没有
        if (showTags.length === 0 && this.value.length > 0) {
            showTags.push(this.value[0])
        }
        this.showTags = showTags
        if (this.showTags.length === this.value.length) {
            this.showMoreTag = false
        }
    }

    /**除去已展示的标签，剩余标签的数量 */
    get surplusCount() {
        return this.value.length - this.showTags.length
    }

    /**
     * 移除
     * @param {Option} item
     */
    delTag(item: Option) {
        const { flag, index } = this.isChecked(item)
        if (flag) {
            this.value.splice(index, 1)
        }
        this.emitInput(this.value)
    }
    /**
     * 是否选中
     * @param {*} data
     * @return {{flag: Boolean, index: Number}}
     */
    isChecked(data: Option) {
        let index = -1
        const flag = this.value.some((item, i) => {
            const temp = item[this.valueKey] === data[this.valueKey]
            if (temp) {
                index = i
            }
            return temp
        })
        return { flag, index }
    }
    async showAll() {
        const props = { value: this.value }
        const resp = await this.$modalDialog(() => import('./all-tag-dialog.vue'), props)
        this.emitInput(resp)
    }
}
</script>
<style lang="less" scoped>
.tags-box {
    position: relative;
    height: 28px;
    overflow: hidden;
    .body.only-show-one {
        display: flex;
    }
    .temp-body {
        width: 100%;
        position: absolute;
        left: -9999px;
    }
    ::v-deep.el-tag {
        position: relative;
        padding-right: 23px;
        max-width: calc(100% - 5px);
        white-space: nowrap; //禁止换行
        overflow: hidden;
        text-overflow: ellipsis; //...
        &:not(:last-child) {
            margin-right: 5px;
        }
        .el-tag__close {
            position: absolute;
            right: 5px;
            top: calc(50% + 1px);
            transform: translateY(-50%);
        }
    }

    .more-tag {
        flex-shrink: 0;
        cursor: pointer;
        margin-right: 0;
        padding-right: 10px;
    }
}
</style>
