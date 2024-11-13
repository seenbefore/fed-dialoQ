<template>
    <div class="exam-list">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="exam-item" v-for="item in list" :key="item.id">
                <div class="exam-title">{{ item.title }}</div>
                <div class="exam-time">{{ item.startTime }} 至 {{ item.endTime }}</div>
                <div class="exam-bottom">
                    <span class="free-tag">免费</span>
                    <van-button class="start-btn" color="#4080FF" round size="small" @click="handleStartExam(item)">
                        开始答题
                    </van-button>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { getExamList } from './api'

@Component({
    name: 'ExamList',
})
export default class ExamList extends Vue {
    private loading = false
    private finished = false
    private list: any[] = []
    private page = 1
    private pageSize = 10

    async onLoad() {
        try {
            const res = await getExamList({
                page: this.page,
                pageSize: this.pageSize,
            })
            if (res.code === 200) {
                this.list.push(...res.data.data)
                this.loading = false
                if (this.list.length >= res.data.total) {
                    this.finished = true
                }
                this.page++
            }
        } catch (error) {
            console.error(error)
            this.loading = false
        }
    }

    handleStartExam(item: any) {
        this.$router.push({
            name: 'ExamDetail',
            params: { id: item.id },
        })
    }
}
</script>

<style lang="less" scoped>
.exam-list {
    padding: 16px;
    background: #f5f5f5;
    min-height: 100vh;

    .exam-item {
        position: relative;
        margin-bottom: 16px;
        padding: 16px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        .exam-title {
            font-size: 16px;
            font-weight: 500;
            color: #333;
            margin-bottom: 8px;
        }

        .exam-time {
            font-size: 14px;
            color: #999;
            margin-bottom: 12px;
        }

        .exam-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .free-tag {
                display: inline-block;
                padding: 2px 8px;
                background: #e8f5e9;
                color: #00b578;
                font-size: 12px;
                border-radius: 2px;
            }

            .start-btn {
                height: 32px;
                padding: 0 16px;
                font-size: 14px;
                font-weight: 400;
            }
        }
    }
}
</style>
