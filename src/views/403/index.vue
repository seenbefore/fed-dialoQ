<template>
    <div class="sg-page app-404-page">
        <div class="sg-error">
            <div class="sg-error__content">
                <div class="sg-error__title">HTTP: 403</div>
                <div class="sg-error__meta"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App403',
    components: {},
    props: {
        // 错误信息
        message: {
            type: String,
            default: '当前页面无访问权限',
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
