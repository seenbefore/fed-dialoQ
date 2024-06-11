<template>
    <div class="page page-404">
        <div class="wrapper">
            <div>
                <img src="https://assets.codehub.cn/micro-frontend/static/media/404@2x.4823ecca.png" alt="" />
                <p class="summary">
                    抱歉，您请求的页面暂时无法打开，请稍后再试！
                </p>
                <a class="button" href="/">返回首页</a>
            </div>
        </div>
        <!-- <p class="footer">Powered by CODING DevOps</p> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class Shell extends Vue {}
</script>
<style lang="less" scoped>
.page {
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    line-height: 1.4;
    display: flex;
    align-items: center;
}
.wrapper {
    display: flex;
    align-items: center;
    text-align: center;
    flex: 2 1;
    margin-bottom: 100px;
    img {
        width: 480px;
        height: 180px;
        padding-right: 2px;
    }
}
.button {
    display: inline-block;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    transition: all 0.1s ease;
    border: 1px solid #323a45;
    background-color: #323a45;
    color: #fff;
    padding: 7.5px 31px;
}
</style>
