<template>
    <div class="my-not-enter-class">
        <van-empty :image="emptyImage" :description="notLoadText" />
    </div>
</template>

<script>
export default {
    props: {
        notLoadText: {
            type: String,
            default: '请查询数据',
        },
    },
    data() {
        return {
            emptyImage: require('./not-enter.svg'),
        }
    },
}
</script>

<style lang="less" scoped>
.my-not-enter-class {
}
</style>
