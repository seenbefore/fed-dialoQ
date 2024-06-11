<!--
   sg-page - 全局组件
-->
<template>
    <my-big-screen class="sg-page my-sg-page" v-bind="$attrs">
        <TitleBg :title-img="titleImg" />
        <div class="screen-main">
            <div class="screen-up--bg"></div>
            <slot />
        </div>
        <!-- 返回首页 -->
        <my-back-home />
        <!-- 时间选择 -->
        <my-container left="85" top="70">
            <DateSelect />
        </my-container>
    </my-big-screen>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import TitleBg from '@/entry/bigscreen/components/TitleBg/index.vue'
import DateSelect from '@/entry/bigscreen/components/DateSelect/index.vue'

@Component({
    name: 'MySgPage',
    components: {
        TitleBg,
        DateSelect,
    },
})
export default class MySgPage extends Vue {
    @Prop({ type: String, default: '' }) titleImg!: any
    /** 背景上面是否还有背景，默认为true */
    @Prop({ type: Boolean, default: true }) hasUpBg!: boolean
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped>
.my-sg-page {
    background: url('./images/down-bg.jpg') no-repeat;
    background-size: 100% 100%;
}
.screen-main {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    .screen-up--bg {
        position: absolute;
        top: 49px;
        left: 8px;
        overflow: hidden;
        box-sizing: border-box;
        width: calc(100% - 16px);
        height: calc(100% - 57px);
        background: url('./images/up-bg.png') no-repeat;
        background-size: 100% 100%;
    }
}
</style>
