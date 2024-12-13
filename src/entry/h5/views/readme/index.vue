<!-- 文档 -->
<template>
    <AppPage class="Readme">
        <router-view></router-view>
        <template #footer>
            <TabBar :data="tabBarData" />
        </template>
    </AppPage>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AppPage from '@/components/h5/AppPage/index.vue'
import TabBar from '@/components/h5/TabBar/index.vue'
@Component({
    name: 'Readme',
    components: {
        AppPage,
        TabBar,
    },
})
export default class Readme extends Vue {
    mounted() {}
    private tabBarData = [
        {
            title: '首页',
            to: {
                path: '/readme/home',
            },
            icon: 'home-o',
        },
        {
            title: '列表',
            to: {
                path: '/readme/list',
            },
            icon: 'user-o',
        },
        {
            title: 'vant组件', // 菜单标题
            to: {
                path: '/readme/vant',
            },
            icon: 'user-o',
        },
    ]
}
</script>

<style lang="less" scoped></style>
