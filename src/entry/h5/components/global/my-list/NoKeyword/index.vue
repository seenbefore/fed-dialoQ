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
            default: '请输入关键字进行查询',
        },
    },
    data() {
        return {
            emptyImage: require('./img.svg'),
        }
    },
}
</script>

<style lang="less" scoped>
.my-not-enter-class {
}
</style>
