<!--
   模块标题
-->
<template>
    <div :class="titleClass">
        <div class="title">{{ title }}</div>
        <div class="right" @click="onRight" v-if="hasRightIcon">
            <slot name="right-txt" />
            <span class="txt-arrows" v-if="hasRightArrow">>></span>
            <!-- <img
                class="right-icon--arrow"
                src="../../../assets/global/my-module-title/icon-jump.svg"
                alt=""
            /> -->
        </div>
        <div class="right-slot">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

type ISize = 'large' | 'medium' | 'small'
type ISpan = 'long' | 'normal' | 'short'

@Component({
    name: 'MyModuleTitle',
    components: {},
})
export default class MyModuleTitle extends Vue {
    /** 标题名 */
    @Prop({ type: String, default: () => '' }) title!: string
    /** 标题大小：'large' | 'medium' | 'small' */
    @Prop({ type: String, default: () => 'large' }) size!: ISize
    /** 标题类型：'long' | 'normal' | 'short' */
    @Prop({ type: String, default: 'normal' }) span!: ISpan
    /** 弹性合布局类型 */
    @Prop({ default: () => 'start' }) flexType!: 'start' | 'center' | 'end'
    /** 是否有右边icon */
    @Prop({ type: Boolean, default: false }) hasRightIcon!: boolean
    /** 是否有右边箭头 */
    @Prop({ type: Boolean, default: true }) hasRightArrow!: boolean
    /** 跳转页面配置项 */
    @Prop({ type: Object, default: () => ({}) }) jumpConfig!: Record<string, any>
    /** 跳转页面事件 */
    @Prop() jumpEvent!: () => void
    get titleClass() {
        const classes = ['my-module-title', 'sg-flexbox', `is-${this.flexType}`]
        if (this.span === 'normal') {
            classes.push(`is-${this.size}`)
        } else {
            classes.push(`title-is-${this.span}`)
        }
        return classes
    }
    created() {}
    mounted() {}
    onRight() {
        if (this.jumpEvent) {
            this.jumpEvent()
            return
        }

        if (!this.jumpConfig?.path) {
            this.$message.error('缺少跳转地址')
            return
        }

        // todo 目前只支持项目里面路由跳转，打开窗口后续再添加
        this.$router.push(this.jumpConfig)
    }
}
</script>

<style lang="less" scoped>
.my-module-title {
    position: relative;
    width: 100%;

    &.is-start {
        align-items: center;
        justify-content: flex-start;

        .title {
            margin-top: 2px;
            margin-left: 26px;
        }
    }

    &.is-center {
        align-items: center;
        justify-content: center;
    }

    &.is-end {
        align-items: center;
        justify-content: flex-end;
    }

    .title {
        color: #fff;
        letter-spacing: 2px;
        font-weight: 400;
        font-size: 24px;
        line-height: 26px;
    }

    .right {
        position: absolute;
        top: 50%;
        right: 0px;
        display: flex;
        align-items: center;
        font-size: 16px;
        cursor: pointer;
        transform: translateY(-50%);

        .txt-arrows {
            margin-left: 4px;
            color: #0affea;
            font-size: 20px;
        }

        .right-icon--arrow {
            margin-left: 4px;
        }
    }

    .right-slot {
        position: absolute;
        top: 50%;
        right: 0px;
        display: flex;
        align-items: center;
        font-size: 16px;
        transform: translateY(-50%);
    }

    &.is-large {
        height: 36px;
        background: url('./images/large-title.png') no-repeat;
        background-size: 100% 100%;
    }

    &.is-medium {
        height: 30px;
        background: url('./images/medium-title.png') no-repeat;
        background-size: 100% 100%;

        .title {
            font-size: 20px;
            line-height: 20px;
        }

        .right {
            font-size: 16px;
        }
    }

    // todo 缺少一个最小标题的背景图
    &.is-small {
        height: 24px;
        background: url('./images/medium-title.png') no-repeat;
        background-size: 100% 100%;

        .title {
            font-size: 16px;
            line-height: 16px;
        }

        .right {
            font-size: 14px;
        }
    }

    &.title-is-long {
        background: url('./images/span-long.png') no-repeat;
        background-size: 100% 100%;
    }

    &.title-is-short {
        height: 34px;
        background: url('./images/span-short.png') no-repeat;
        background-size: 100% 100%;
    }
}
</style>
