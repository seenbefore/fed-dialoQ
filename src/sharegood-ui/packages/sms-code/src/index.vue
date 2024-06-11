<template>
    <el-button type="primary" :disabled="disabled" @click="handleClick" class="sg-sms-code">
        <slot v-if="!disabled">{{ label }}</slot>
        <span v-else>{{ countDown }}</span>
    </el-button>
</template>

<script>
function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length)
}
export default {
    name: 'SgSmsCode',
    props: {
        template: {
            type: String,
            default: '重新获取(second)s',
        },
        // 倒计时时长
        count: {
            type: Number,
            default: 60,
        },
        // 按钮文案
        label: {
            type: String,
            default: '获取验证码',
        },
        auto: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            timer: null,
            second: 0,
            countDown: '',
            disabled: false,
        }
    },
    watch: {
        second(val) {
            if (val) {
                this.countDown = this.template.replace('second', PrefixInteger(val, 2))
                this.disabled = true
            } else {
                this.disabled = false
            }
        },
    },
    methods: {
        handleClick() {
            this.$emit('click')
            if (this.auto) {
                this.start()
            }
        },
        start() {
            this.second = this.count
            this.timer = setInterval(() => {
                this.second--
                if (this.second == 0) {
                    clearInterval(this.timer)
                }
            }, 1000)
        },
        reset() {
            this.second = 0
            clearInterval(this.timer)
        },
    },
}
</script>
