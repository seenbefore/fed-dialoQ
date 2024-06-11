<template>
    <div class="AdminFeatWatermark" id="AdminFeatWatermark" style="height:200px">
        <el-button type="primary" @click="setWatermark">新建水印</el-button>
        <el-button type="primary" @click="clearWatermark">清除水印</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { useWatermark } from '@/scripts/utils/watermark'

@Component({
    name: 'AdminFeatWatermark',
    components: {},
})
export default class AdminFeatWatermark extends Vue {
    handlers: any = {}
    setWatermark() {
        this.handlers.setWatermark('三生三世')
    }
    clearWatermark() {
        this.handlers.clear()
    }
    mounted() {
        const appendEl = document.getElementById('AdminFeatWatermark')
        const { setWatermark, clear } = useWatermark(appendEl!)
        this.handlers = {
            setWatermark,
            clear,
        }
    }
}
</script>

<style lang="less" scoped></style>
