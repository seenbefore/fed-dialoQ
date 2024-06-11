<template>
    <div class="my-not-enter-class">
        <van-empty :image="emptyImage" :description="emptyText" />
    </div>
</template>

<script>
export default {
    props: {
        emptyText: {
            type: String,
            default: '未查询到相关数据',
        },
    },
    data() {
        return {
            emptyImage: require('./no-data.svg'),
        }
    },
}
</script>

<style lang="less" scoped>
.my-not-enter-class {
}
</style>
