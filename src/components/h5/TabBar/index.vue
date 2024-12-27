<template>
    <div class="tab-bar">
        <van-tabbar fixed route v-model="active" @change="handleChange">
            <van-tabbar-item v-for="(item, index) in data" :to="item.to" :icon="item.icon" :key="index">
                {{ item.title }}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    name: 'TabBar',
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    data() {
        return {}
    },
    methods: {
        handleChange(value) {
            this.$emit('change', value)
        },
    },
}
</script>

<style scoped>
.tab-bar {
    height: 50px;
}
</style>
