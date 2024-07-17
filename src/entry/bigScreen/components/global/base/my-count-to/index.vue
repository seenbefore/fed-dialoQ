<template>
    <div class="my-count-to">
        <div v-if="!isNaN(endVal)">
            <count-to
                class="my-countto-ref"
                :style="{ fontWeight: isBold ? 600 : 400 }"
                :class="countToClass"
                ref="countRef"
                :start-val="Number(startVal)"
                :end-val="Number(endVal)"
                :duration="duration"
                :decimals="decimals"
                v-bind="$attrs"
            ></count-to>
            <span class="font16">{{ unit || '' }}</span>
        </div>
        <div v-else>{{ endVal || '-' }}</div>
    </div>
</template>

<script>
/** 翻牌器 */
import countTo from 'vue-count-to'
export default {
    name: 'MyCountTo',
    components: {
        countTo,
    },
    props: {
        /** 开始值 */
        startVal: {
            type: Number,
            default: 0,
        },
        /** 结束值 */
        endVal: {
            type: [String, Number],
            default: 0,
        },
        /** 持续时间，以毫秒为单位 */
        duration: {
            type: Number,
            default: 2000,
        },
        /** 要显示的小数位数 */
        decimals: {
            type: Number,
            default: 0,
        },
        /** 单位 */
        unit: {
            type: String,
            default: '',
        },
        /** 刷新时间间隔 */
        interval: {
            type: Number,
            default: 10 * 1000,
        },
        /** 数据样式 */
        countToClass: {
            type: String,
            default: '',
        },
        /** 是否需要加粗 */
        isBold: {
            type: Boolean,
            default: false,
        },
        /** 是否需要将0转换为- */
        showZero: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {},
}
</script>

<style lang="less" scoped>
.my-count-to .number-color {
    background-image: -webkit-linear-gradient(90deg, #02ffff 0%, #ffffff 99%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    //
}
</style>
