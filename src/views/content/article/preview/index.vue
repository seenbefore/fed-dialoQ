<template>
    <admin-page class="ArticlePreview">
        <template #title>
            <span>文章预览</span>
        </template>

        <div class="article-container" v-loading="loading">
            <div class="article-header">
                <h1 class="article-title">{{ formModel.title }}</h1>
                <div class="article-meta">
                    <span>作者：{{ formModel.author }}</span>
                    <span class="divider">|</span>
                    <span>发布时间：{{ formModel.publishTime }}</span>
                    <span class="divider">|</span>
                    <span>阅读量：{{ formModel.readCount }}</span>
                </div>
                <div class="article-category">分类：{{ formModel.category }}</div>
            </div>

            <div class="article-content">
                <div v-if="formModel.coverImage" class="article-cover">
                    <img :src="formModel.coverImage" alt="封面图片" />
                </div>
                <div class="article-text" v-html="formModel.content"></div>
            </div>

            <div v-if="formModel.tags && formModel.tags.length" class="article-tags">
                <span class="tag-label">标签：</span>
                <el-tag v-for="tag in formModel.tags" :key="tag" size="small" style="margin-right: 8px">
                    {{ tag }}
                </el-tag>
            </div>
        </div>

        <template #footer>
            <div class="sg-flexbox align-center">
                <el-button type="primary" @click="handleShare">分享</el-button>
            </div>
        </template>
    </admin-page>
</template>

<script lang="tsx">
import AdminPage from '@/components/admin/admin-page/index.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { detail } from '../api'

@Component({
    name: 'ArticlePreview',
    components: {
        AdminPage,
    },
})
export default class ArticlePreview extends Vue {
    @Prop() id!: string

    loading = false
    formModel: Record<string, any> = {}

    handleShare() {
        const url = window.location.href
        this.$message.success('链接已复制：' + url)
    }

    async created() {
        try {
            this.loading = true
            const { data } = await detail({ id: this.id })
            this.formModel = data
        } catch (error) {
            console.error(error)
            this.$message.error('加载失败')
        } finally {
            this.loading = false
        }
    }
}
</script>

<style scoped lang="less">
.ArticlePreview ::v-deep {
    padding: 0px;

    .article-container {
        padding: 20px;
        background: #fff;

        .article-header {
            margin-bottom: 24px;
            text-align: center;

            .article-title {
                margin: 0 0 16px;
                font-size: 24px;
                font-weight: 500;
            }

            .article-meta {
                color: #666;
                font-size: 14px;

                .divider {
                    margin: 0 8px;
                    color: #ddd;
                }
            }

            .article-category {
                margin-top: 8px;
                color: #666;
                font-size: 14px;
            }
        }

        .article-content {
            margin-bottom: 24px;

            .article-cover {
                margin-bottom: 16px;
                text-align: center;

                img {
                    max-width: 100%;
                }
            }

            .article-text {
                line-height: 1.8;
                font-size: 16px;
            }
        }

        .article-tags {
            .tag-label {
                margin-right: 8px;
                color: #666;
            }
        }
    }
}
</style>
