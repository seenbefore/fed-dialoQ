<!-- 空状态组件 -->
<template>
    <div class="empty">
        <img src="@/assets/images/empty.png" alt="" />
        <div class="desc">{{ desc }}</div>
        <a v-if="showTitle" class="add" @click="onClick">{{ btnText }}</a>
    </div>
</template>

<script>
export default {
    name: 'Empty',
    props: {
        // 空状态描述
        desc: {
            type: String,
            default: '暂无数据',
        },
        // 按钮名称
        btnText: {
            type: String,
            default: '新增',
        },
        // 是否展示操作按钮
        showTitle: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onClick() {
            this.$emit('callback')
        },
    },
}
</script>

<style lang="less" scoped>
.empty {
    padding: 20px 0;
    border-top: 1px solid #c0d3ea;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .desc {
        margin: 10px 0 20px;
        font-weight: bold;
        font-size: 16px;
    }
    .add {
        padding: 0 20px;
        text-align: center;
        line-height: 36px;
        background: #11cf98;
        border-radius: 18px;
        color: #ffffff;
    }
}
</style>
