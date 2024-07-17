<!--
   进度条
-->
<template>
    <div class="my-progress-bar">
        <div class="progress-bar__before">
            <slot name="before" />
        </div>
        <div class="progress-bar__content">
            <div class="custom-content" v-if="isCustomValue">
                <el-progress ref="progressRef" :percentage="value" v-bind="bindConfig"></el-progress>
                <div class="custom-content--value" :style="customValueStyle">{{ value }}%</div>
            </div>

            <el-progress class="default-progress" ref="progressRef" :percentage="value" v-bind="config" v-else></el-progress>

            <div class="progress-bar__content-label" v-if="label">
                {{ label }}
            </div>
        </div>
        <div class="progress-bar__after">
            <slot name="after" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

interface ICustomConfig {
    show: boolean
    style: Record<string, any>
}

const DEFAULT_CUSTOM_STYLE = {
    'font-size': '14px',
    'line-height': '18px',
}

@Component({
    name: 'MyProgressBar',
    components: {},
})
export default class MyProgressBar extends Vue {
    /** 进度条数值 */
    @Prop({ type: Number, default: 0 }) value!: number
    /** 进度条说明文本 */
    @Prop({ type: String, default: '' }) label!: string
    /** 进度条配置项，参考el-progress的Attributes */
    @Prop({ type: Object, default: () => ({}) }) config!: Record<string, any>
    /** 自定义数值配置 */
    @Prop({ type: Object, default: () => ({}) }) customConfig!: ICustomConfig
    /** 是否自定义value值显示 */
    get isCustomValue() {
        return this.customConfig?.show || false
    }
    /** 自定义value样式 */
    get customValueStyle() {
        return {
            ...DEFAULT_CUSTOM_STYLE,
            ...this.customConfig.style,
        }
    }
    get bindConfig() {
        return {
            ...this.config,
            'show-text': !this.isCustomValue,
        }
    }
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped>
.my-progress-bar {
    font-size: 14px;

    .el-progress-bar {
        .el-progress__text {
            font-size: 14px;
        }
    }

    ::v-deep {
        .el-progress-circle__track {
            stroke: #245c9a;
        }
    }
    .progress-bar__content {
        .progress-bar__content-label {
            text-align: center;
            font-size: 14px;
            padding-top: 4px;
        }

        .custom-content {
            position: relative;
            width: 100%;

            .custom-content--value {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                line-height: 22px;
            }
        }

        .el-progress {
            display: flex;
            justify-content: center;
        }

        .default-progress {
            width: 100%;
            display: flex;
            align-items: center;
        }
    }
}
</style>
