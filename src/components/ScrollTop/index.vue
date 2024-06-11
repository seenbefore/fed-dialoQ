<template>
    <transition :name="transitionName">
        <div v-show="visible" @click="backToTop" :style="customStyle" class="back-to-ceiling">
            <svg width="16" height="16" aria-hidden="true" viewBox="0 0 17 17" class="Icon Icon--backToTopArrow" xmlns="http://www.w3.org/2000/svg" style="height: 16px; width: 16px">
                <path
                    d="M12.036 15.59a1 1 0 0 1-.997.995H5.032a.996.996 0 0 1-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z"
                />
            </svg>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'BackToTop',
    props: {
        // 显示时的高度
        visibilityHeight: {
            type: Number,
            default: 600,
        },
        // 滚动置顶位置
        backPosition: {
            type: Number,
            default: 0,
        },
        // 自定义的样式
        customStyle: {
            type: Object,
            default: function() {
                return {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px',
                    background: '#e7eaf1',
                }
            },
        },
        // 定义滚动动画
        transitionName: {
            type: String,
            default: 'fade',
        },
    },
    data() {
        return {
            // 是否可见
            visible: false,
            // 滚动定时器
            interval: null,
            // 正在滚动中
            isMoving: false,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
        if (this.interval) {
            clearInterval(this.interval)
        }
    },
    methods: {
        // 页面滚动事件
        handleScroll() {
            this.visible = window.pageYOffset > this.visibilityHeight
        },
        // 点击页面置顶
        backToTop() {
            if (this.isMoving) return
            const start = window.pageYOffset
            let i = 0
            this.isMoving = true

            this.interval = setInterval(() => {
                const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
                if (next <= this.backPosition) {
                    window.scrollTo(0, this.backPosition)
                    clearInterval(this.interval)
                    this.isMoving = false
                } else {
                    window.scrollTo(0, next)
                }
                i++
            }, 16.7)
        },
        // 速度递减运算
        easeInOutQuad(t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return (c / 2) * t * t + b
            }
            return (-c / 2) * (--t * (t - 2) - 1) + b
        },
    },
}
</script>

<style scoped>
.back-to-ceiling {
    position: fixed;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    z-index: 100;
}

.back-to-ceiling:hover {
    background: #d5dbe7;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.back-to-ceiling .Icon {
    fill: #9aaabf;
    background: none;
}
</style>
