<template>
    <div class="AdminArticleDetail" id="AdminArticleDetail">
        <my-title :value="model.title"></my-title>
        <div class="app-login-switcher base-comp-switcher" v-if="!isInIframe">
            <router-link to="/admin/article/list" class="sg-link">
                <span>返回</span>
                <img src="./assets/home.png" data-spm-anchor-id="0.0.0.i1.2686bcff6KyozJ" />
            </router-link>
        </div>

        <h1 class="article-title" v-text="model.title" v-if="!isInIframe"></h1>
        <div class="author-info-block" v-if="!isInIframe">
            <div class="author-info-box">
                <div class="author-name">
                    <a href="javascript:void(0)" class="username">
                        <span class="name" v-text="model.author"></span>
                    </a>
                </div>

                <div class="meta-box">
                    <time class="time" v-text="model.time"></time>
                    <span class="views-count">
                        ·&nbsp;&nbsp;
                        <span class="sg-link1" :href="meta.href" :target="meta.target" v-text="meta.copyright"></span>
                    </span>

                    <span class="views-count">·&nbsp;&nbsp;阅读 {{ model.read_num }}</span>
                    <router-link
                        class="sg-link"
                        :to="{
                            path: '/admin/article/edit',
                            query: {
                                _: '编辑-' + model.title,
                                isEdit: '1',
                                id: model.id,
                                redirect: encodeURIComponent(`/post/${model.uuid}`),
                            },
                        }"
                    >
                        我要编辑
                    </router-link>
                </div>
            </div>
        </div>
        <MarkdownArticle :container="'#AdminArticleDetail'" v-if="model.content">
            <div v-html="model.content" class="element-doc"></div>
            <div class="sg-pb-5" style="border: 1px dashed #ccc;" v-if="model.attachments && model.attachments.length">
                <el-upload class="upload-demo" :file-list="model.attachments" :disabled="true" :on-preview="handlePreview">
                    <el-button size="small" type="text">附件</el-button>
                </el-upload>
            </div>
        </MarkdownArticle>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ArticleService } from '@/entry/devops/api'
import MarkdownArticle from '@/components/MarkdownArticle/index.vue'
import { dateFormat } from '@/scripts/utils'
import { useWatermark } from '@/scripts/utils/watermark'
import { userStore } from '@/entry/devops/store/useStore'
const API = {
    get: ArticleService.getByUUID,
}
@Component({
    name: 'Post_uuid',
    components: {
        MarkdownArticle,
    },
})
export default class Post_uuid extends Vue {
    @Prop() uuid!: string
    model = {
        title: '',
        content: '',
        copyright: '',
        copy_url: '',
        status: '',
        attachments: [],
    }
    // 下载附件
    handlePreview(file: any) {
        window.open(file.url)
    }
    get isInIframe() {
        try {
            const result = window.top !== window.self
            return result
        } catch (error) {
            return false
        }
    }
    get meta() {
        if (this.model.copy_url) {
            return {
                href: this.model.copy_url,
                target: '_blank',
                copyright: '转载',
            }
        } else {
            return {
                href: 'javascript:void(0);',
                target: '',
                copyright: '原创',
            }
        }
    }
    async syncReadMan() {
        const { data } = await API.get({
            uuid: this.uuid,
        })
        let read_man = data.read_man || ''
        read_man = read_man.split(',')
        const name = userStore?.info?.name || ''
        // if(read_man.includes(name)) {
        //     read_man
        // }
        // await ArticleService.update({
        //     id: data.id,

        // })
    }
    async mounted() {
        if (this.uuid) {
            const { data } = await API.get({
                uuid: this.uuid,
            })
            const time = dateFormat(new Date(data.createdAt), 'YYYY年MM月DD日 HH时mm分ss秒')
            const author = data.author || '匿名'
            Object.assign(this.model, {
                ...data,
                time,
                author,
            })
            if (this.model.status === 'draft') {
                setTimeout(() => {
                    const appendEl = document.getElementById('AdminArticleDetail')
                    const { setWatermark } = useWatermark(appendEl!)
                    setWatermark(`草稿-${author}`)
                }, 1000)
            } else {
                // 如果不是作者且登录了则阅读数加1
                if (userStore?.token && data.author_id !== userStore?.info?.username) {
                    let read_num = data.read_num + 1

                    await ArticleService.update({
                        id: data.id,
                        read_num,
                    })
                }
            }
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

        .highlight-box {
            table {
                th {
                    min-width: 120px;
                }
            }
        }
    }

    .article-title {
        margin: 0 0 1.667rem;
        font-size: 30px;
        font-weight: 600;
        line-height: 1.31;
        color: #252933;
        position: sticky;
        top: 0;
        z-index: 11;
        background: hsla(0, 0%, 100%, 0.86);
        backdrop-filter: blur(1.25rem);
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
    .app-login-switcher {
        position: fixed;
        z-index: 20;
        top: 0;
        right: 0;
        width: 80px;
        height: 80px;
        cursor: pointer;
        img {
            display: block;
            width: 100%;
            height: 100%;
            opacity: 0.8;
            transition: all 0.3s;
        }
        span {
            position: absolute;
            left: 36px;
            top: 18px;
        }
    }
}
</style>
