<template>
    <div class="page-scroll-class">
        <my-list ref="ref_list" :load="loadData" empty-text="抱歉，没有找到相关企业">
            <template #empty>
                <van-empty description="自定义无数据">
                    <van-button type="info" @click="handleStart">重新获取数据</van-button>
                </van-empty>
            </template>
            <template v-slot="{ item }">
                <ItemCell :data="item" />
            </template>
        </my-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { MyListRef } from '@/entry/h5/scripts/types'
import { getData } from '../../data'
import ItemCell from '../../components/ItemCell/index.vue'

@Component({
    name: 'TabBasic',
    components: {
        ItemCell,
    },
})
export default class TabBasic extends Vue {
    @Ref('ref_list')
    ref_list!: MyListRef

    created() {}

    mounted() {}

    async loadData({ currentPage = 1 }: any = {}) {
        const body = {
            noData: true,
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
        this.ref_list.reload({
            isRefresh: false,
        })
    }
}
</script>

<style lang="less" scoped>
.page-scroll-class {
    height: 100%;
    overflow: auto;
    .empty-block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>
