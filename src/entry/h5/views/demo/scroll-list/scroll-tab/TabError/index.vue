<template>
    <div class="page-scroll-class">
        <my-list ref="ref_list" :load="loadData" error-text="自定义报错提示文字">
            <template #error>
                <van-empty image="error" description="获取数据失败！！！！">
                    <van-button type="danger" @click="handleStart">重新获取数据</van-button>
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
    name: 'TabError',
    components: {
        ItemCell,
    },
})
export default class TabError extends Vue {
    @Ref('ref_list')
    ref_list!: MyListRef

    created() {}

    mounted() {}

    async loadData({ currentPage = 1 }: any = {}) {
        const body = {
            error: true,
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
