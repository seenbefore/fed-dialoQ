<template>
    <div class="sg-page page-scroll-class">
        <div class="page-header">
            <van-tabs v-model="tabValue">
                <van-tab v-for="item in listTabs" :key="item.value" :title="item.label" :name="item.value"></van-tab>
            </van-tabs>
        </div>
        <div class="page-scroll-container">
            <component :is="currentTab.component"></component>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { OPT_TABS, ENUM_TAB, MAP_TABS } from './constact'
import { getData } from '../data'
import NotQuery from '../components/NotQuery/index.vue'
import ItemCell from '../components/ItemCell/index.vue'

@Component({
    name: 'PageScrollSearch',
    components: {
        NotQuery,
        ItemCell,
    },
})
export default class PageScrollSearch extends Vue {
    $refs!: any

    created() {}

    mounted() {}

    tabValue = ENUM_TAB.BASIC

    listTabs = OPT_TABS

    get currentTab() {
        return MAP_TABS[this.tabValue]
    }

    async loadData({ currentPage = 1 }: any = {}) {
        const body = {
            pageNum: currentPage,
            pageSize: 10,
        }
        try {
            const { data, total }: any = await getData(body)
            return {
                total,
                result: data,
            }
        } catch (error) {
            console.error(error)
        }
    }

    handleStart() {
        this.$refs.ref_list.reload({
            isRefresh: false,
        })
    }
    handkeReset() {
        this.$refs.ref_list.reset()
    }
}
</script>

<style lang="less" scoped>
.page-scroll-class {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .page-header {
    }
    .page-scroll-container {
        flex: 1;
        overflow: hidden;
    }
}
</style>
