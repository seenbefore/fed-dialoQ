<template>
    <div class="btn-vconsole" @click="handleClickVconsole"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import type { VConsole } from "core/core";
@Component({
    name: 'BtnVconsole',
    components: {},
})
export default class BtnVconsole extends Vue {
    /**计时器id */
    private timer = 0
    /**连点次数 */
    private clickCount = 0
    /**vConsole实例 */
    private vConsoleInstance: VConsole | null = null
    mounted() {
        // 直接打开vconsole按钮
        // import('vconsole').then(res => {
        //     const Vconsole = res.default
        //     this.vConsoleInstance = new Vconsole()
        // })
    }
    handleClickVconsole() {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = 0
        }
        this.timer = window.setTimeout(() => {
            this.clickCount = 0
        }, 2000)

        if (this.clickCount >= 10) {
            this.clickCount = 0
            if (this.vConsoleInstance) {
                this.vConsoleInstance.destroy()
                this.vConsoleInstance = null
                return
            }
            import('vconsole').then(res => {
                const Vconsole = res.default
                this.vConsoleInstance = new Vconsole()
            })
            return
        }
        this.clickCount += 1
    }
}
</script>

<style lang="less" scoped>
.btn-vconsole {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 111111;
    width: 30px;
    height: 30px;
}
</style>
