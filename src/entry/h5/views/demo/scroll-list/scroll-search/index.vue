<template>
    <div class="sg-page page-scroll-class">
        <div class="page-header">
            <!-- <van-button type="primary" size="small" @click="handleStart">开始请求</van-button>
            <van-button type="warning" size="small" @click="handkeReset">重置列表</van-button> -->
            <van-search v-model="keyWord" show-action placeholder="请输入搜索关键词" :clearable="false" @search="handleSearch">
                <template #action>
                    <van-button type="info" size="small" round @click="handleSearch">搜索</van-button>
                </template>
            </van-search>
        </div>
        <div class="page-scroll-container">
            <my-list
                ref="ref_list"
                :load="loadData"
                :auto-load="false"
                empty-text="抱歉，没有找到相关企业"
                list-loading-text="数据在加载中哦!"
                finished-text="已加载所有数据~"
                :disabled-refresh="true"
                is-search
            >
                <template v-slot="{ item }">
                    <ItemCell :data="item" />
                </template>
            </my-list>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { getData } from '../data'
import NotQuery from '../components/NotQuery/index.vue'
import ItemCell from '../components/ItemCell/index.vue'
import { MyListRef } from '@/entry/h5/scripts/types'

@Component({
    name: 'PageScrollSearch',
    components: {
        NotQuery,
        ItemCell,
    },
})
export default class PageScrollSearch extends Vue {
    @Ref('ref_list')
    ref_list!: MyListRef

    created() {}

    mounted() {}

    keyWord = ''

    async loadData({ currentPage = 1 }: any = {}) {
        const body = {
            pageNum: currentPage,
            pageSize: 10,
            categoryName: this.keyWord,
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

    handleSearch() {
        if (this.keyWord) {
            this.handleStart()
        } else {
            this.handkeReset()
        }
    }

    handleStart() {
        this.ref_list.reload({
            isRefresh: false,
        })
    }
    handkeReset() {
        this.ref_list.reset()
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
        text-align: center;
        background: #d9dcff;
        display: flex;
        align-items: center;
        justify-content: center;
        ::v-deep {
            .van-search {
                width: 100%;
            }
            .van-search__action {
                display: flex;
                align-items: center;

                .van-button {
                    white-space: nowrap;
                    width: 60px;
                    font-size: 16px;
                }
            }
        }
    }
    .page-scroll-container {
        flex: 1;
        overflow: hidden;
    }
}
</style>
