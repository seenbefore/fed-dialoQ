<template>
    <div class="scroll-item-cell">
        <div class="list-ids">{{ data.id }}</div>
        <div class="list-item-name">{{ data.name }}</div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },
}
</script>

<style lang="less" scoped>
.scroll-item-cell {
    padding: 20px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    .list-ids {
        width: 30px;
    }
    .list-item-name {
        color: #666;
    }
}
</style>
