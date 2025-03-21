<template>
    <div>
        <custom-list v-model="currentPage" :loading="loading" :load-data="loadData" :grid-columns="2" :grid-gap="16" :page-size="4">
            <template #default="{ item }">
                <div class="list-item">
                    <el-card shadow="hover">
                        <div class="item-header">
                            <h3>{{ item.title }}</h3>
                            <el-tag size="small" :type="item.status === 'active' ? 'success' : 'info'">
                                {{ item.status }}
                            </el-tag>
                        </div>
                        <p class="item-desc">{{ item.description }}</p>
                        <div class="item-footer">
                            <el-button type="text" @click="handleView(item)">查看</el-button>
                            <el-button type="text" @click="handleEdit(item)">编辑</el-button>
                        </div>
                    </el-card>
                </div>
            </template>
        </custom-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CustomList from '@/components/custom-list/index.vue'

@Component({
    name: 'CustomListDemo1',
    components: {
        CustomList,
    },
})
export default class CustomListDemo1 extends Vue {
    currentPage = 1
    loading = false

    async loadData({ page, pageSize }) {
        this.loading = true
        // 模拟异步请求
        await new Promise(resolve => setTimeout(resolve, 1000))

        const mockData = Array.from({ length: pageSize }, (_, index) => ({
            id: (page - 1) * pageSize + index + 1,
            title: `项目 ${(page - 1) * pageSize + index + 1}`,
            description: '这是一个示例项目描述，展示了CustomList组件的基本用法。',
            status: index % 2 === 0 ? 'active' : 'inactive',
        }))

        this.loading = false
        return {
            data: mockData,
            total: 100,
        }
    }

    handleView(item) {
        this.$message.info(`查看项目：${item.title}`)
    }

    handleEdit(item) {
        this.$message.info(`编辑项目：${item.title}`)
    }
}
</script>

<style lang="less" scoped>
.list-item {
    height: 100%;
    .el-card {
        height: 100%;
    }
}
.item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    h3 {
        margin: 0;
        font-size: 16px;
    }
}
.item-desc {
    color: #666;
    margin-bottom: 16px;
}
.item-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}
</style>
