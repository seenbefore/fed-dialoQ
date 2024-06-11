<template>
    <div class="sg-page page-scroll-class">
        <my-list
            ref="ref_list"
            :load="loadData"
            :auto-load="true"
            empty-text="抱歉，没有找到相关企业"
            not-load-text="请点击按钮发起请求"
            list-loading-text="数据在加载中哦!"
            finished-text="已加载所有数据~"
            :disabled-refresh="false"
        >
            <template v-slot="{ item }">
                <ItemCell :data="item" />
            </template>
        </my-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getData } from '../data'
import ItemCell from '../components/ItemCell/index.vue'

@Component({
    name: 'PageScrollDefault',
    components: {
        ItemCell,
    },
})
export default class PageScrollDefault extends Vue {
    created() {}

    mounted() {}

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
}
</script>

<style lang="less" scoped>
.page-scroll-class {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
</style>
