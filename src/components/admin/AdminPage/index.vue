<template>
    <div class="admin-page sg-page">
        <!-- 顶部插槽 -->
        <div v-if="$slots.header" class="admin-page__header">
            <slot name="header"></slot>
        </div>
        <!-- 内容区域 -->
        <div class="admin-page__content">
            <slot></slot>
        </div>
        <!-- 底部插槽 -->
        <div v-if="$slots.footer" class="admin-page__footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'AdminPage',
})
export default class AdminPage extends Vue {}
</script>

<style lang="less" scoped>
.admin-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #f5f5f5;

    &__header {
        flex-shrink: 0;
    }

    &__content {
        flex: 1;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }

    &__footer {
        flex-shrink: 0;
        background: #fff;
        border-top: 1px solid #e5e5e5;
    }
}
</style>
