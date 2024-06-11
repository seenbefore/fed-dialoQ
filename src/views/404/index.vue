<template>
    <div class="my-error-page">
        <div class="wrapper">
            <div>
                <img src="https://assets.codehub.cn/micro-frontend/static/media/404@2x.4823ecca.png" alt="" />
                <p class="summary">
                    抱歉，您请求的页面不存在~
                </p>
                <!-- <a class="button" href="/">返回首页</a> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App404',
    components: {},
    props: {
        // 错误信息
        message: {
            type: String,
            default: '页面不存在',
        },
    },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>

<style lang="less" module></style>
