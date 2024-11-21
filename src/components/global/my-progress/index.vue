<template>
    <div class="my-progress mask">
        <div class="progress-mian">
            <p class="progress-tip" v-if="progressTip">{{ progressTip }}</p>
            <div class="progress-bg">
                <div class="progress-bar" :style="{ width: `${progressBar}%` }"></div>
                <span
                    class="progress-val"
                    :class="{
                        red: progressBar <= 50,
                        orange: progressBar > 50 && progressBar <= 99,
                        green: progressBar === 100,
                    }"
                >
                    {{ progressBar }}%
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'MyProgress',
    components: {},
})
export default class MyProgress extends Vue {
    /** 提示语 */
    @Prop({ default: '正在保存中，请稍后...' }) progressTip?: string
    /** 进度，单位%，数值类型，最大100 */
    @Prop({ default: 0 }) progressBar!: number

    created() {}
    mounted() {
        this.start()
    }
    progressTimer: any
    start() {
        this.progressTimer = setInterval(() => {
            const { progressBar } = this
            if (progressBar < 99) {
                this.progressBar += 3
            } else {
                this.progressBar = 99
            }
        }, 1000)
    }

    beforeDestroy() {
        clearInterval(this.progressTimer)
    }
}
</script>

<style lang="less" scoped>
.my-progress.mask {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    .progress-mian {
        margin-top: 42vh;
    }
    .progress-tip {
        width: 300px;
        text-align: center;
        margin: 0 auto;
        margin-bottom: 10px;
        color: #1890ff;
    }
    .progress-bg {
        width: 300px;
        height: 15px;
        margin: 0 auto;
        box-sizing: border-box;
        border-radius: 24px;
        background-color: rgba(180, 160, 120, 0.2);
        position: relative;
    }
    .progress-bar {
        width: 0%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        background-image: linear-gradient(155deg, #1890ff 25%, #d6675a 0, #d6675a 50%, #1890ff 0, #1890ff 75%, #d6675a 0);
        border-radius: 24px;
        animation: panoramic 10s linear 0s infinite;
        background-size: 32px 100%;
    }
    .progress-val {
        position: absolute;
        top: -2px;
        right: -42px;
        &.red {
            color: #da5c5c;
        }
        &.orange {
            color: #cf8920;
        }
        &.green {
            color: #67c23a;
        }
    }
    @keyframes panoramic {
        to {
            background-position: 200% 0;
        }
    }
}
</style>
