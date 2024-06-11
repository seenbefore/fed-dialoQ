<template>
    <div class="AdminArticleDetail" id="AdminArticleDetail">
        <h1 class="article-title" v-text="model.title"></h1>
        <div class="author-info-block">
            <div class="author-info-box">
                <div class="author-name">
                    <a href="javascript:void(0)" class="username">
                        <span class="name" v-text="model.author"></span>
                    </a>
                </div>

                <div class="meta-box">
                    <time datetime="2022-10-31T09:11:44.000Z" title="Mon Oct 31 2022 17:11:44 GMT+0800 (China Standard Time)" class="time" v-text="model.time"></time>
                    <span class="views-count">·&nbsp;&nbsp;阅读 {{ model.read_num }}</span>
                </div>
            </div>
        </div>
        <MarkdownArticle :container="'#AdminArticleDetail'" v-if="model.content">
            <div v-html="model.content" class="element-doc"></div>
        </MarkdownArticle>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ArticleService } from '@/entry/devops/api'
import MarkdownArticle from '@/components/MarkdownArticle/index.vue'
import { dateFormat } from '@/scripts/utils'
const API = {
    get: ArticleService.get,
}
@Component({
    name: 'AdminArticleDetail',
    components: { MarkdownArticle },
})
export default class AdminArticleDetail extends Vue {
    @Prop() id!: string
    model = {
        title: '',
        content: '',
    }
    async mounted() {
        if (this.id) {
            const { data } = await API.get({
                id: this.id,
            })
            const time = dateFormat(new Date(data.updatedAt), 'YYYY年MM月DD日 HH时mm分ss秒')
            const author = data.author || '匿名'
            Object.assign(this.model, {
                ...data,
                time,
                author,
            })
        }
    }
}
</script>

<style lang="less" scoped>
.AdminArticleDetail {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 20px;

    ::v-deep {
        .markdown-article__content {
            padding-left: 0;
        }
    }

    .article-title {
        margin: 0 0 1.667rem;
        font-size: 30px;
        font-weight: 600;
        line-height: 1.31;
        color: #252933;
    }
    .author-info-block {
        display: flex;
        align-items: center;
        margin-bottom: 1.667rem;
        .author-info-box {
            flex: 1;
            min-height: 43px;
            .author-name {
                height: 2rem;
                display: flex;

                .username {
                    font-size: 16px;
                    font-weight: 500;
                    color: #515767;
                    line-height: 2rem;
                    .name {
                        display: inline-block;
                        vertical-align: top;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
        .meta-box {
            font-size: 14px;
            color: #8a919f;
            margin-top: 2px;
            line-height: 22px;
        }
    }
}
</style>
