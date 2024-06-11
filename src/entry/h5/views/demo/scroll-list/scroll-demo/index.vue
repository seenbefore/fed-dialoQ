<template>
    <div class="sg-page page-scroll-class">
        <div class="page-header">
            <van-button type="primary" size="small" @click="handleStart">开始请求</van-button>
            <van-button type="warning" size="small" @click="handkeReset">重置列表</van-button>
        </div>
        <div class="page-scroll-container">
            <my-list
                ref="ref_list"
                :load="loadData"
                :auto-load="false"
                empty-text="抱歉，没有找到相关企业"
                not-load-text="请点击按钮发起请求"
                list-loading-text="数据在加载中哦!"
                finished-text="已加载所有数据~"
                :disabled-refresh="false"
            >
                <template #notLoad>
                    <NotQuery @start="handleStart" />
                </template>
                <template v-slot="{ item }">
                    <div class="list-item">
                        <div class="list-ids">{{ item.id }}</div>
                        <div class="list-item-name">{{ item.name }}</div>
                    </div>
                </template>
            </my-list>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getData } from '../data'
import NotQuery from '../components/NotQuery/index.vue'

@Component({
    name: 'PageScrollDemo',
    components: {
        NotQuery,
    },
})
export default class PageScrollDemo extends Vue {
    $refs!: any

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
        text-align: center;
        background: #d9dcff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        ::v-deep {
            .van-button {
                & + .van-button {
                    margin-left: 10px;
                }
            }
        }
    }
    .page-scroll-container {
        flex: 1;
        overflow: hidden;
        .list-item {
            padding: 20px;
            border-bottom: 1px solid #ddd;
            display: flex;
            align-items: center;
            .list-ids {
                width: 30px;
            }
            .list-item-name {
                color: #666;
            }
        }
    }
}
</style>
