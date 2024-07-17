<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta && $route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta || !$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
    created() {},

    mounted() {},
}
</script>

<style lang="less" scoped></style>
