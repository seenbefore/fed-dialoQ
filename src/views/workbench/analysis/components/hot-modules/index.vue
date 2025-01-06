<template>
    <el-card shadow="never" class="hot-modules" :body-style="{ padding: '20px' }">
        <div class="card-header">
            <div class="title">热门模块 (Top10)</div>
        </div>
        <div class="module-list">
            <div v-for="(item, index) in data" :key="index" class="module-item">
                <span class="module-name">{{ item.name }}</span>
                <div class="progress-bar">
                    <div class="progress" :style="{ width: `${(item.value / maxValue) * 100}%` }"></div>
                </div>
                <span class="value">{{ formatNumber(item.value) }}</span>
            </div>
        </div>
    </el-card>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'

interface ModuleData {
    name: string
    value: number
}

@Component({
    name: 'HotModules',
})
export default class HotModules extends Vue {
    @Prop({ type: Array, default: () => [] }) readonly data!: ModuleData[]

    get maxValue() {
        return Math.max(...this.data.map(item => item.value))
    }

    private formatNumber(num: number): string {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
}
</script>

<style lang="less" scoped>
.hot-modules {
    height: 440px;
    border: none;
    border-radius: 0;
    background: #fff;

    .card-header {
        margin-bottom: 24px;

        .title {
            font-size: 16px;
            font-weight: 500;
            color: #1d2129;
        }
    }

    .module-list {
        height: 360px;
        overflow-y: auto;
        padding-right: 4px;

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background: #e5e6eb;
            border-radius: 2px;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }

        .module-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            height: 22px;

            &:last-child {
                margin-bottom: 0;
            }

            .module-name {
                flex: 0 0 80px;
                font-size: 14px;
                color: #4e5969;
            }

            .progress-bar {
                flex: 1;
                height: 8px;
                background: #e5e6eb;
                border-radius: 4px;
                margin: 0 12px;
                overflow: hidden;

                .progress {
                    height: 100%;
                    background: #165dff;
                    border-radius: 4px;
                    transition: width 0.3s ease;
                }
            }

            .value {
                flex: 0 0 60px;
                font-size: 14px;
                color: #1d2129;
                text-align: right;
            }
        }
    }
}
</style>
