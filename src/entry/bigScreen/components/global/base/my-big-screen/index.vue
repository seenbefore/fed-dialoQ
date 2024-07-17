<template>
    <div class="my-big-screen-layout sg-page">
        <div class="big-screen-lay-bg" :class="[{ scale: isScale }]">
            <div class="big-screen-lay-wrap" :style="`width: ${width}px; height: ${height}px;`" :class="[{ scale: isScale }, bgClass]" ref="ScaleBox">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
    name: 'MyBigScreen',
    components: {},
    props: {
        // 背景class
        bgClass: {
            type: String,
            default: '',
        },
        // 是否需要缩放
        isScale: {
            type: Boolean,
            default: true,
        },
        // 缩放类型
        scaleType: {
            type: String,
            default: 'carvelBuilt', // equalRatio: 等比；carvelBuilt：铺满
        },
        // 宽
        width: {
            type: Number,
            default: 1920,
        },
        // 高
        height: {
            type: Number,
            default: 1080,
        },
    },
    data() {
        return {
            scale: null,
        }
    },
    created() {},
    mounted() {
        if (this.isScale) {
            this.setScale()
            window.addEventListener('resize', this.setScaleDebounce)
            document.addEventListener('DOMContentLoaded', this.setScaleDebounce, false)
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('resize', this.setScaleDebounce)
                document.removeEventListener('DOMContentLoaded', this.setScaleDebounce)
            })
        } else {
            //this.$refs.ScaleBox.style = ``
        }
    },
    methods: {
        /**
         * @description 获取窗口缩放比例
         */
        setScale() {
            const docEl = document.documentElement
            const width = docEl.clientWidth
            const heiht = docEl.clientHeight
            if (!width || !heiht) return
            const ww = width / this.width
            const wh = heiht / this.height
            let scale = ww < wh ? ww : wh
            // console.log('***************', docEl.clientWidth, this.width)
            if (this.scaleType === 'carvelBuilt') {
                // 平铺
                this.scale = `${ww}, ${wh}`
            } else {
                // 等比
                this.scale = scale.toFixed(6)
            }
            // this.$refs.ScaleBox.style.setProperty('--scale', this.scale)
            this.$nextTick(() => {
                this.$refs.ScaleBox.style.transform = `scale(${this.scale}) translate(-50%, 0)`
            })
        },
        setScaleDebounce: debounce(function() {
            this.setScale()
        }, 200),
        /**
         * @description 节流
         */
        debounce(fn, delay) {
            let delays = delay
            let timer
            return () => {
                let _this = this
                let args = arguments
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(() => {
                    timer = null
                    fn.apply(_this, args)
                }, delays)
            }
        },
    },
}
</script>

<style lang="less">
.my-big-screen-layout {
    position: relative;
    color: #fff;

    .big-screen-lay-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        overflow: auto;
        &.scale {
            overflow: hidden;
        }
        .big-screen-lay-wrap {
            position: relative;
        }
        .big-screen-lay-wrap.scale {
            position: absolute;
            top: 0;
            left: 50%;
            // transition: 0.3s;
            z-index: 999;
            overflow: hidden;
            // transform: scale(var(--scale)) translate(-50%, 0);
            width: 100%;
            height: 100%;
            font-size: 18px;
            transform-origin: 0 0;
        }
    }
}
</style>
