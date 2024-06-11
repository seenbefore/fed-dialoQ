<template>
    <div class="AdminFeatFullScreen">
        <el-button type="primary" @click="setFullScreen">全屏</el-button>
        <el-button @click="exit">退出</el-button>

        <div style="background:red;height:200px" id="aaa">
            <el-button type="primary" @click="setFullScreen('aaa')">全屏</el-button>
            <el-button @click="exit">退出</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { enter, exit } from '@/scripts/utils/fullscreen'
@Component({
    name: 'AdminFeatFullScreen',
    components: {},
})
export default class AdminFeatFullScreen extends Vue {
    setFullScreen(name?: any) {
        enter(name)
    }
    exit() {
        exit()
    }
    mounted() {}
}
</script>

<style lang="less" scoped></style>
