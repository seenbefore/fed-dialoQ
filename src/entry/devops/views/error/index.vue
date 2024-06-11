<template>
    <div class="my-error-page">
        <div class="wrapper">
            <div>
                <div class="title">抱歉，您访问的页面出错了</div>
                <div class="summary" v-text="message"></div>
                <!-- <div class="meta">请联系技术人员：马金慧</div> -->
                <!-- <a class="button" href="/">返回首页</a> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    name: 'AppError',
    components: {},
})
export default class AppError extends Vue {
    get message() {
        return this.$route.query.message
    }
}
</script>

<style lang="less" scoped>
.wrapper {
    color: #404040;
    text-align: left;
}
.title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 8px;
}
.summary {
    font-size: 14px;
    width: 400px;
    line-height: 1.7;
}
.meta {
    margin-top: 30px;
    color: #b4b4b4;
}
</style>
