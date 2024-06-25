<template>
    <div class="sg-page DemoB">
        <span>DemoB</span>
        <van-empty description="描述文字" />
        <van-empty description="描述文字" />
        <van-empty description="描述文字" />
        <van-button @click="$goBack(true)">返回并刷新</van-button>

        <van-empty description="描述文字" />
        <van-empty description="描述文字" />
    </div>
</template>

<script lang="ts">
import { BasePage } from '@h5/mixins'
import { Component } from 'vue-property-decorator'
@Component({
    name: 'DemoB',
    components: {},
})
export default class DemoB extends BasePage {
    mounted() {
        console.log('bbbb')
    }
}
</script>

<style lang="less" scoped></style>
