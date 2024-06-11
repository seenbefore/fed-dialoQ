<template>
    <div class="demo-model " :class="mode">
        <div class="model-content">
            <iframe id="demo-modal" scrolling="auto" frameborder="0" :src="src"></iframe>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { getURLParameters } from 'icinfo-util'

@Component({
    name: 'DemoModel',
    components: {},
})
export default class DemoModel extends Vue {
    @Prop() src!: string

    // 默认pc模式 mobile 移动端模式
    get mode() {
        // https://v2-h5.uviewui.com/index.html#/pages/componentsB/countTo/countTo?mode=mobile
        let { mode = '' } = getURLParameters(this.src)

        return mode
    }
}
</script>
<style lang="less" scoped>
.demo-model {
    &.mobile {
        font-size: 16px;
        background-color: #fff;
        width: 330px;

        z-index: 10;
        margin: 0;

        box-sizing: border-box;
        overflow-y: auto;
        background-image: url(https://uviewui.com/common/iPhone13.png);
        background-repeat: no-repeat;
        background-size: 100%;
        border-radius: 30px;
        padding: 48px 13px 25px;

        width: 360px;
        height: 729.13963px;

        .model-content {
            box-sizing: border-box;
            height: 100%;
            border-bottom-left-radius: 30px;
        }
        iframe {
            height: 100%;
            width: 100%;
            border-radius: 30px;
        }
    }
    iframe {
        height: 100%;
        width: 100%;
    }
}
</style>
