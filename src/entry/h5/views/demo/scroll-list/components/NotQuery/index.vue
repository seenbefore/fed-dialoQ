<template>
    <div class="my-not-enter-class">
        <van-empty :image="emptyImage" description="请点击按钮开始请求" />
        <van-button type="primary" round @click="handleStart">开始请求</van-button>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            emptyImage: require('./not-enter.svg'),
        }
    },
    methods: {
        handleStart() {
            this.$emit('start')
        },
    },
}
</script>

<style lang="less" scoped>
.my-not-enter-class {
    text-align: center;
}
</style>
