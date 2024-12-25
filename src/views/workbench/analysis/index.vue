<template>
    <admin-page class="WorkbenchAnalysis">
        <div class="analysis-content">
            <!-- 图片展示区域 -->
            <img src="./assets/images/analysis.png" alt="分析页统计图" class="analysis-image" />
        </div>
    </admin-page>
</template>

<script lang="tsx">
import AdminPage from '@/components/admin/admin-page/index.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'WorkbenchAnalysis',
    components: {
        AdminPage,
    },
})
export default class WorkbenchAnalysis extends Vue {
    mounted() {
        // 页面加载完成后的处理逻辑
    }
}
</script>

<style scoped lang="less">
.WorkbenchAnalysis ::v-deep {
    padding: 0;

    .analysis-content {
        padding: 20px;
        background: #fff;

        .analysis-image {
            width: 100%;
            height: auto;
            display: block;
        }
    }
}
</style>
