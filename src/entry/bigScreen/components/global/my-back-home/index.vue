<template>
    <my-container left="58" top="14">
        <div class="my-back-home-calss" @click="handleClick">
            <div class="mbh-txt">返回首屏</div>
            <div class="mbh-line"></div>
        </div>
    </my-container>
</template>

<script>
export default {
    methods: {
        handleClick() {
            console.log('返回首页')
            this.$router.push({
                path: '/',
            })
        },
    },
}
</script>

<style lang="less" scoped>
.my-back-home-calss {
    width: 120px;
    cursor: pointer;
    user-select: none;
    .mbh-txt {
        width: 100%;
        height: 36px;
        background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(79, 242, 255, 0.5) 100%);
        color: #eef2ff;
        font-size: 30px;
        line-height: 1;
    }
    .mbh-line {
        width: 100%;
        height: 2px;
        background: #4ff2ff;
    }
}
</style>
