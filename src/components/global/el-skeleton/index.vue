<template>
    <div class="sg-skeleton" :class="{ 'is-animated': animated }">
        <!-- 标题骨架 -->
        <template v-if="title">
            <div class="sg-skeleton__title" :style="{ width: titleWidth }" />
        </template>

        <!-- 头像骨架 -->
        <template v-if="avatar">
            <div class="sg-skeleton__avatar" :class="[`sg-skeleton__avatar--${avatarShape}`]" :style="{ width: avatarSize, height: avatarSize }" />
        </template>

        <!-- 段落骨架 -->
        <div class="sg-skeleton__paragraph" v-if="rows > 0">
            <div
                class="sg-skeleton__paragraph-item"
                v-for="(item, index) in rows"
                :key="index"
                :style="{
                    width: getRowWidth(index),
                    height: rowHeight,
                }"
            />
        </div>

        <!-- 自定义内容插槽 -->
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

/**
 * 骨架屏组件
 * 用于在内容加载过程中展示一个骨架屏，提供更好的用户体验
 */
@Component({
    name: 'ElSkeleton',
})
export default class ElSkeleton extends Vue {
    /** 是否显示动画效果 */
    @Prop({ type: Boolean, default: false })
    readonly animated!: boolean

    /** 是否显示标题占位图 */
    @Prop({ type: Boolean, default: false })
    readonly title!: boolean

    /** 标题占位图宽度 */
    @Prop({ type: String, default: '40%' })
    readonly titleWidth!: string

    /** 是否显示头像占位图 */
    @Prop({ type: Boolean, default: false })
    readonly avatar!: boolean

    /** 头像占位图大小 */
    @Prop({ type: String, default: '32px' })
    readonly avatarSize!: string

    /** 头像形状，可选值：circle/square */
    @Prop({ type: String, default: 'circle' })
    readonly avatarShape!: string

    /** 段落占位图行数 */
    @Prop({ type: Number, default: 3 })
    readonly rows!: number

    /** 段落占位图行高 */
    @Prop({ type: String, default: '16px' })
    readonly rowHeight!: string

    /** 获取每一行的宽度 */
    private getRowWidth(index: number): string {
        // 最后一行宽度为60%
        if (index === this.rows - 1) {
            return '60%'
        }
        // 其他行宽度为100%
        return '100%'
    }
}
</script>

<style lang="less" scoped>
.sg-skeleton {
    width: 100%;

    &__title {
        height: 20px;
        background: #f2f2f2;
        margin-bottom: 16px;
    }

    &__avatar {
        background: #f2f2f2;
        margin-right: 16px;
        display: inline-block;
        vertical-align: top;
        margin-bottom: 16px;

        &--circle {
            border-radius: 50%;
        }

        &--square {
            border-radius: 4px;
        }
    }

    &__paragraph {
        &-item {
            height: 16px;
            background: #f2f2f2;
            margin-top: 16px;

            &:first-child {
                margin-top: 0;
            }
        }
    }

    // 动画效果
    &.is-animated {
        .sg-skeleton__title,
        .sg-skeleton__avatar,
        .sg-skeleton__paragraph-item {
            background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
            background-size: 400% 100%;
            animation: skeleton-loading 1.4s ease infinite;
        }
    }
}

@keyframes skeleton-loading {
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}
</style>
