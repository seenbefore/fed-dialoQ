<template>
    <div class="page-scroll-class">
        <my-list ref="ref_list" :load="loadData" list-loading-text="数据在加载中哦!" finished-text="已加载所有数据~">
            <template v-slot="{ item }">
                <ItemCell :data="item" />
            </template>
        </my-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getData } from '../../data'
import ItemCell from '../../components/ItemCell/index.vue'

@Component({
    name: 'TabBasic',
    components: {
        ItemCell,
    },
})
export default class TabBasic extends Vue {
    created() {}

    mounted() {}

    async loadData({ currentPage = 1 }: any = {}) {
        const body = {
            pageNum: currentPage,
            pageSize: 10,
        }
        try {
            const { data, total }: any = await getData(body)
            console.log(111111111, data)
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
    height: 100%;
    overflow: auto;
}
</style>
