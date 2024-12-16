<template>
    <div class="admin-page sg-page">
        <!-- 顶部插槽 -->
        <div v-if="$slots.header || $slots.title" class="admin-page__header">
            <slot name="header"></slot>
            <div class="admin-page__header-title">
                <slot name="title"></slot>
            </div>
            <div class="admin-page__header-meta">
                <slot name="meta">
                    <div class="back-btn" @click="handleBack" v-if="backUrl">
                        <svg-icon icon="icon-go-back" class="back-icon" />
                        <span class="back-title">返回</span>
                    </div>
                </slot>
            </div>
        </div>
        <!-- 内容区域 -->
        <div class="admin-page__content">
            <slot></slot>
        </div>
        <!-- 底部插槽 -->
        <div class="admin-page__footer" v-if="$slots.footer || $scopedSlots.footer">
            <slot name="footer" :back="handleBack"></slot>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'AdminPage',
})
export default class AdminPage extends Vue {
    /** 返回路径 */
    @Prop({ default: '' }) backUrl!: string

    /** 返回 */
    handleBack() {
        this.$back({
            path: this.backUrl,
        })
    }
}
</script>

<style lang="less" scoped>
.admin-page {
    height: 100%;
    display: flex !important;
    flex-direction: column;
    overflow: hidden;
    padding: 0px !important;

    &__header {
        flex-shrink: 0;
        border-bottom: 1px solid #e5e5e5;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-title {
            font-weight: 600;
            font-size: 14px;
            flex: 1;
        }

        .back-btn {
            cursor: pointer;
            display: flex;
            align-items: center;
            color: var(--color-primary);
        }

        .back-icon {
            width: 16px;
            height: 16px;
        }

        .back-title {
            font-size: 14px;
            margin-left: 5px;
        }
    }

    &__content {
        flex: 1;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding: 15px;
    }

    &__footer {
        flex-shrink: 0;
        background: #fff;
        border-top: 1px solid #e5e5e5;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
