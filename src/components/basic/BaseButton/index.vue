<template>
    <button
        class="base-button"
        :class="[
            `base-button--${type}`,
            `base-button--${size}`,
            {
                'base-button--round': round,
                'base-button--disabled': disabled,
                'base-button--loading': loading,
            },
        ]"
        :disabled="disabled || loading"
        @click="handleClick"
    >
        <i v-if="loading" class="el-icon-loading"></i>
        <i v-if="icon && !loading" :class="icon"></i>
        <span v-if="$slots.default" :class="{ 'ml-5': icon || loading }">
            <slot></slot>
        </span>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component({
    name: 'BaseButton',
})
export default class BaseButton extends Vue {
    @Prop({ type: String, default: 'default' }) readonly type!: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
    @Prop({ type: String, default: 'medium' }) readonly size!: 'large' | 'medium' | 'small' | 'mini'
    @Prop({ type: Boolean, default: false }) readonly round!: boolean
    @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
    @Prop({ type: Boolean, default: false }) readonly loading!: boolean
    @Prop({ type: String }) readonly icon?: string

    @Emit('click')
    handleClick(event: MouseEvent): MouseEvent {
        return event
    }
}
</script>

<style lang="less" scoped>
.base-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid transparent;
    outline: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    transition: 0.3s;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.9;
    }

    &--round {
        border-radius: 20px;
    }

    &--disabled {
        cursor: not-allowed;
        opacity: 0.6;
        &:hover {
            opacity: 0.6;
        }
    }

    // 尺寸
    &--large {
        padding: 14px 24px;
        font-size: 16px;
    }

    &--medium {
        padding: 12px 20px;
        font-size: 14px;
    }

    &--small {
        padding: 9px 15px;
        font-size: 13px;
    }

    &--mini {
        padding: 7px 12px;
        font-size: 12px;
    }

    // 类型
    &--default {
        background: #fff;
        border-color: #dcdfe6;
        color: #606266;
    }

    &--primary {
        background: #409eff;
        border-color: #409eff;
        color: #fff;
    }

    &--success {
        background: #67c23a;
        border-color: #67c23a;
        color: #fff;
    }

    &--warning {
        background: #e6a23c;
        border-color: #e6a23c;
        color: #fff;
    }

    &--danger {
        background: #f56c6c;
        border-color: #f56c6c;
        color: #fff;
    }

    &--info {
        background: #909399;
        border-color: #909399;
        color: #fff;
    }
}

.ml-5 {
    margin-left: 5px;
}
</style>
