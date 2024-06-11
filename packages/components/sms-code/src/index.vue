<template>
    <el-button
        type="primary"
        :disabled="disabled"
        @click="onClick"
        class="sg-sms-code"
    >
        <slot v-if="!disabled">{{ label }}</slot>
        <span v-else>{{ countDown }}</span>
    </el-button>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'IcSmsCode',
    components: {},
})
export default class IcSmsCode extends Vue {
    @Prop({ default: '重新获取(second)s', type: String }) template!: string
    @Prop({ default: 60, type: Number }) count!: number
    @Prop({ default: '获取验证码', type: String }) label!: string
    @Prop({ default: true, type: Boolean }) auto!: boolean

    private timer: any = null
    private second = 0
    private countDown = ''
    private disabled = false

    @Watch('second')
    onSecondChange(val: number, oldVal: number) {
        if (val) {
            this.countDown = this.template.replace(
                'second',
                this.formatSecond(val, 2),
            )
            this.disabled = true
        } else {
            this.disabled = false
        }
    }
    public formatSecond(num: number, length?: number) {
        length = length ? length : 2
        return (Array(length).join('0') + num).slice(-length)
    }
    public onClick() {
        if (this.timer) {
            return
        }
        this.$emit('click')
        if (this.auto) {
            this.start()
        }
    }
    public start() {
        this.second = this.count
        this.timer = setInterval(() => {
            this.second--
            if (this.second == 0) {
                clearInterval(this.timer)
            }
        }, 1000)
    }
    public reset() {
        this.second = 0
        clearInterval(this.timer)
    }
}
</script>
