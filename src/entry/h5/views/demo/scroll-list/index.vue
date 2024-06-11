<template>
    <div class="sg-page page-scroll-class">
        <van-cell title="基础列表" is-link to="/demo/scroll-default" size="large" />
        <van-cell title="搜索查询列表" is-link to="/demo/scroll-search" size="large" />
        <van-cell title="Tab切换列表" is-link to="/demo/scroll-tab" size="large" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'PageScrollList',
    components: {},
})
export default class PageScrollList extends Vue {
    $refs!: any

    created() {}

    mounted() {}
}
</script>

<style lang="less" scoped>
.page-scroll-class {
}
</style>
