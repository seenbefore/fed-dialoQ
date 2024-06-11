<template>
    <!-- 列表 -->
    <section class="squareBottomContent" element-loading-text="拼命加载中" v-loading="View.loading">
        <div class="section_header" v-if="hasHeader">
            <div class="headline">
                <div class="title">
                    <span>{{ title }}</span>

                    <span class="sg-ml-2 total"></span>
                </div>
                <div class="right"><span class="show_more__2VqQl" data-type="button" @click="handleMore">查看全部</span></div>
            </div>
            <div class="filter">
                <div class="widget_radio_group_wrapper">
                    <div class="sc-ciQpPG gDCNzQ">
                        <div class="sc-huFNyZ fFTlqc slideRadioGroup">
                            <div data-type="button" class=" radio_button" :class="{ active: catalog === '' }" @click="handleChangeLabel('')">
                                <span>全部</span>
                                <span class="num">
                                    <span>{{ total }}</span>
                                    <!-- <CountTo :start-val="0" :end-val="total"></CountTo> -->
                                </span>
                            </div>
                            <div
                                data-type="button"
                                class=" radio_button"
                                v-for="(item, index) in labels"
                                :key="index"
                                @click="handleChangeLabel(item.value)"
                                :class="{ active: catalog === item.value }"
                            >
                                <span>{{ item.label }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="widget_group"></div>
            </div>
        </div>
        <main class="styles__ListPageStyleContainer-sc-u3bk9v-0  ListPageStyleContainer">
            <section class="styles__StyledTemplateContainer-sc-kv0ezi-0 WbnpB template-container">
                <div class="styles__StyledTemplateCard-sc-14b4moc-0 jKNdgO templateBox" v-for="(item, index) in dataList" :key="index">
                    <div class="templateCover" @click="redirectToDetail(item)">
                        <div class="cover">
                            <img class="templateCoverImage" :src="item.cover$" :alt="item.name" />
                        </div>

                        <div class="templateCoverImageText" v-if="item.templateCoverImageText">{{ item.templateCoverImageText }}</div>
                        <div class="plabel" v-if="item.communityState$">
                            {{ item.communityState$ }}
                        </div>
                        <div class="thumb" @click.prevent.stop="handleThumb(item)" :class="item.thumb$ ? 'active' : ''" :title="item.thumb$ ? '取消点赞' : '我要点赞'">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon " viewBox="0 0 17 17">
                                <path
                                    d="M8.5 1c-.354 0-.665.145-.885.4-.263.307-.398.747-.399 1.296-.036.955-.454 2.349-1.133 3.434C5.413 7.2 4.5 7.91 3.56 8l-2.546.296-.01 6.7c-.001.276.11.526.291.707.182.182.434.294.712.295l10.7-.013c.267 0 .428-.087.623-.214.224-.145.386-.363.593-.787l1.17-6.529a1.51 1.51 0 00-.219-.821c-.249-.41-.645-.592-1.21-.625l-3.65-.012C10.008 6.587 10 6.207 10 6c0-.253.01-.758.02-1.266.01-.498.02-.999.02-1.252 0-.446-.05-.896-.175-1.433a1.456 1.456 0 00-.509-.759A1.397 1.397 0 008.5 1z"
                                    fill-rule="nonzero"
                                    stroke="#415058"
                                    stroke-width="2"
                                    fill="none"
                                ></path>
                            </svg>
                        </div>

                        <div class="templateCoverHover">
                            <div class="introContainer">{{ item.intro }}</div>
                        </div>
                    </div>
                    <div class="templateInfo">
                        <div class="titleIcon">
                            <span class="sc-jSUZER dCfvCv Tooltip Ellipsis isnt-truncated templateTitle" type="inline" data-max="15" style="max-width: 15em;" :title="item.name">
                                【{{ item.plabel }}】{{ item.name }}
                            </span>
                        </div>
                        <div class="templateCardInfo">
                            <div class="authorInfo">
                                <!-- <div class="avatar_container"><img src="https://modao.cc/images/avatar.png" class="avatar" alt="" /></div> -->
                                <span class="sc-jSUZER dCfvCv Tooltip Ellipsis isnt-truncated authorName" type="inline" data-type="user" :title="item.author$">{{ item.author$ }}</span>
                            </div>
                            <div class="actionListContainer">
                                <span class="sc-jSUZER dCfvCv Tooltip actionItem " title="使用次数">
                                    <i class="el-icon-download"></i>
                                    <span class="actionValue">{{ item.used$ }}</span>
                                </span>
                                <span class="sc-jSUZER dCfvCv Tooltip actionItem " title="浏览次数">
                                    <i class="el-icon-view"></i>
                                    <span class="actionValue">{{ item.views$ }}</span>
                                </span>
                                <!-- <span class="sc-jSUZER dCfvCv Tooltip actionItem favoriteAction" @click.prevent.stop="handleThumb(item)" :class="item.thumb$ ? 'active' : ''" title="点赞次数">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon actionIcon" viewBox="0 0 11 11">
                                        <path
                                            d="M5.5.179a1.5 1.5 0 0 1 1.467 1.187c.122.596.18 1.091.204 3.004l-.002-.107H9.66a1 1 0 0 1 .959 1.285l-1.407 4.737a1 1 0 0 1-.958.715H1a1 1 0 0 1-1-1V6.268a1 1 0 0 1 1-1h.977C3.29 5.25 3.966 4.054 4 1.678a1.5 1.5 0 0 1 1.5-1.5z"
                                            fill="#A4ADB3"
                                            fill-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <span class="actionValue">{{ item.likes }}</span>
                                </span> -->
                                <span class="sc-jSUZER dCfvCv Tooltip actionItem saveAction" @click.prevent.stop="handleDelete(item)" v-if="isAuthor(item)">
                                    <i class="el-icon-delete"></i>
                                    删
                                </span>
                                <span class="sc-jSUZER dCfvCv Tooltip actionItem saveAction" @click.prevent.stop="handleEdit(item)" v-if="isAuthor(item)">
                                    <i class="el-icon-edit"></i>
                                    编
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <!-- 分页 -->
        <sg-pagination
            v-if="hasPage && dataList.length > 0"
            ref="page"
            :total="total"
            :page.sync="formModel.page"
            :limit.sync="exPagination.pageSize"
            :page-sizes.sync="exPagination.pageSizes"
            v-bind="exPagination"
            @pagination="handlePageChange"
            class="no-print sg-pagination-container sg-data-view__pagination"
        >
            <div class="sg-flex-1 no-print" slot="page-header">
                <slot name="page-header"></slot>
            </div>
        </sg-pagination>
        <!-- <div>{{ $route.query }}</div>
        <div>{{ formModel }}</div> -->
        <!-- 暂无数据 -->
        <div class="styles__StyledBlankSearch-sc-17xp65u-0 hHcZfB" v-if="dataList.length === 0">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon noResultIcon" viewBox="0 0 74 76">
                <g fill="none" fill-rule="evenodd">
                    <path
                        d="M8.8 71.5a2.2 2.2 0 110 4.4 2.2 2.2 0 010-4.4zm7.7 0a2.2 2.2 0 110 4.4 2.2 2.2 0 010-4.4zm7.7 0a2.2 2.2 0 110 4.4 2.2 2.2 0 010-4.4z"
                        fill="#C8CDD0"
                        fill-rule="nonzero"
                    ></path>
                    <path fill="#C8CDD0" d="M45.192 50.198l5.041-5.04L71.657 66.58l-5.041 5.041z"></path>
                    <path
                        d="M53.774 49.468a1.351 1.351 0 011.913-.01L73.24 67.014a1.357 1.357 0 01-.009 1.912l-4.405 4.406c-.531.53-1.386.536-1.913.01L49.359 55.785a1.357 1.357 0 01.01-1.912l4.405-4.406z"
                        fill="#B1B8BD"
                    ></path>
                    <path
                        d="M28.83.314c15.749 0 28.516 12.767 28.516 28.516 0 15.749-12.767 28.516-28.516 28.516C13.081 57.346.314 44.579.314 28.83.314 13.081 13.081.314 28.83.314zm0 5.347c-12.796 0-23.169 10.373-23.169 23.169 0 12.796 10.373 23.169 23.169 23.169 12.796 0 23.169-10.373 23.169-23.169 0-12.796-10.373-23.169-23.169-23.169z"
                        fill="#C8CDD0"
                    ></path>
                    <path
                        d="M28.345 10.902a16.122 16.122 0 00-12.729 4.663 16.122 16.122 0 00-4.662 12.728c0 1.009 1.008 1.765 1.89 1.639 1.008 0 1.764-1.009 1.638-1.89-.252-3.781 1.008-7.31 3.655-9.956 2.646-2.647 6.175-3.907 9.956-3.655.504 0 1.134-.126 1.512-.504.252-.252.504-.756.504-1.008 0-1.009-.882-1.89-1.764-2.017z"
                        fill="#C8CDD0"
                    ></path>
                </g>
            </svg>
            <p class="noResultText">很抱歉，没找到您要的搜索结果</p>
            <!-- <a href="https://jinshuju.net/f/IpOPOp" target="_blank" rel="noopener noreferrer" class="noResultLink">欢迎提交反馈，呼声较高的需求有可能被优先安排哦~</a>
                        <button class="noResultFeedback">返回</button> -->
        </div>
    </section>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import moment from 'moment'
import CountTo from 'vue-count-to'
import { userStore } from '@/entry/library/store/useStore'
import * as API from '@/entry/library/services/community'
import { ComboGroupDict } from '@/entry/library/scripts/dict/combo_group'

@Component({
    name: 'CardList',
    components: {
        CountTo,
    },
})
export default class CardList extends Vue {
    /**
     * 标题
     */
    @Prop({ default: '' }) title!: string
    /**
     * 类别
     */
    @Prop({ default: true }) hasHeader!: boolean

    @Prop({ default: true }) auto!: boolean

    @Prop({ default: true }) hasPage!: boolean

    @Prop({ default: 20 }) pageSize!: number

    @Prop({
        default: () => {
            return {}
        },
    })
    value!: any
    formModel: any = {}
    @Watch('value', { immediate: true, deep: true })
    watchModel(val: any = {}, oldVal: any = {}) {
        Object.assign(this.formModel, val)
    }
    get exPagination() {
        return {
            pageSize: this.pageSize,
            visible: true,
            page: this.formModel.page || 1,
            pageSizes: [5, 10, 20, 50, 100],
            layout: 'total, sizes, prev, pager, next, jumper',
        }
    }
    backgrounds = [
        //require('@/entry/library/views/community/assets/backgrounds/1.jpg'),
        require('@/entry/library/views/community/assets/backgrounds/2.jpg'),
        require('@/entry/library/views/community/assets/backgrounds/3.jpg'),
        require('@/entry/library/views/community/assets/backgrounds/4.jpg'),
    ]
    View = {
        loading: true,
    }
    dataList: any[] = []
    total = 0

    catalog = ''

    get labels() {
        const clabels = ComboGroupDict.clabel
        const plabel = this.value.plabel || ''
        const result = clabels.filter(item => item.parent === plabel)

        return result
    }
    handleChangeLabel(val: any) {
        this.catalog = val
        this.formModel.clabel = val
        this.syncData(false)
    }

    isAuthor(item: any) {
        const role = userStore.info?.role || ''
        const isAdmin = role.includes('admin')
        const isAuthor = item.owner === userStore.info?.name
        return isAdmin || isAuthor
    }
    async syncData(updateTotal = true) {
        try {
            this.View.loading = true
            const { page = 1, plabel, clabel, slabel, keyword, order = '', owner, communityState } = this.formModel
            const { data } = await API.list({
                page,
                pageSize: this.pageSize,
                order,
                conditions: {
                    plabel,
                    clabel,
                    slabel,
                    keyword,
                    owner,
                    communityState,
                },
            })
            if (updateTotal) {
                this.total = data?.total || 0
            }

            this.dataList = data.data?.map((item: any) => {
                const name = item.name || ''
                let defaultCover = this.backgrounds[name.length % this.backgrounds.length]
                const cover_urls = item.cover_urls || []
                const cover$ = cover_urls[0]?.url || defaultCover
                let templateCoverImageText = cover_urls[0]?.url ? '' : name
                const views$ = item.views || 0
                const meta = item.meta || []
                const users = meta.map((item: any) => item.name)
                let owner = item.owner || '匿名'
                let author$ = [owner, ...users].join('、')

                const used$ = item.used || 0

                let communityState = item.communityState || 'done'
                let communityState$ = communityState !== 'done' ? '建设中' : ''
                let like_users: any[] = item.like_users || []
                let thumb$ = !!like_users.filter(item => item.username === userStore.info?.username).length
                const type$ = [item.plabel, item.clabel].filter(item => item).join('-')

                return {
                    ...item,
                    cover$,
                    views$,
                    author$,
                    used$,
                    type$,

                    communityState$,
                    thumb$,
                    templateCoverImageText,
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            this.View.loading = false
        }
    }

    redirectToDetail(item: any) {
        const { href } = this.$router.resolve({
            path: `/community/${item.id}`,
        })
        window.open(href, '_blank')
    }
    handleMore() {
        this.$router.push({
            path: '/community',
            query: {
                plabel: this.formModel.plabel,
            },
        })
    }
    async handlePageChange(val: any) {
        this.formModel.page = +val.page
        this.$emit('pagination', +val.page)
    }
    handleEdit(item: any) {
        this.$router.push({
            path: '/community/upload',
            query: {
                action: 'update',
                id: item.id,
            },
        })
    }

    handleDelete(item: any) {
        this.$confirm(`确认删除 ${item.name} 吗？`).then(async () => {
            await API.remove(
                {
                    id: item.id,
                },
                {
                    exShowLoading: true,
                    exShowLoadingOption: {
                        text: '删除中',
                    },
                },
            )
            this.syncData()
        })
    }

    /* 点赞 */
    async handleThumb(item: any) {
        try {
            const { data } = await API.like({
                id: item.id,
            })
            const { isLike, like_users, likes } = data

            this.$set(item, 'like_users', like_users)
            this.$set(item, 'likes', likes)
            this.$set(item, 'thumb$', isLike)

            if (isLike) {
                this.$message.success('点赞成功')
            } else {
                this.$message.success('取消点赞成功')
            }
        } catch (error) {
            console.log(error)
        }
    }
    mounted() {
        if (this.auto) {
            this.syncData()
        }
    }
}
</script>
<style lang="less" scoped>
.squareBottomContent {
    padding: 15px 0;
}

.section_header {
    .headline {
        display: grid;
        grid-template-columns: 1fr auto;
    }
    .filter {
        width: 100%;
        height: fit-content;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        gap: 64px;
        padding: 12px 0;
        .widget_radio_group_wrapper {
            flex: 1 1 0%;
            min-width: 0px;

            .gDCNzQ {
                max-width: 100%;
                width: fit-content;
                position: relative;
            }
            .fFTlqc {
                width: fit-content;
                height: 32px;
                display: flex;
                flex-wrap: nowrap;
                gap: 2px;
            }
            .slideRadioGroup {
                overscroll-behavior-x: none;
                overflow-x: auto;
                max-width: 100%;
                gap: 2px;
            }
            .radio_button {
                cursor: pointer;
                padding: 6px 12px;
                border-radius: 6px;
                overflow: hidden;
                white-space: nowrap;
                height: 100%;
                flex-shrink: 0;
                display: flex;
                -webkit-box-align: center;
                align-items: center;
                width: fit-content;
                background: transparent;
                -webkit-box-pack: center;
                justify-content: center;
                text-indent: 0px;
                gap: 6px;
                position: relative;
                color: var(--color-text);
                font-weight: 400;
                transition: var(--transition-easeOut-2);
                &.active {
                    background: var(--color-bg-component-hover);
                    span {
                        opacity: 1;
                    }
                    .num {
                        font-weight: 400;
                    }
                }
                span {
                    opacity: 0.5;
                    font-weight: 500;
                    transition: var(--transition-easeOut-2);
                }
            }
        }
        .widget_group {
            display: flex;
            gap: 8px;
        }
    }

    .title {
        font-size: 24px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 24px;
        color: var(--color-text);
        text-align: left;
    }
    .show_more__2VqQl {
        align-items: center;
        color: var(--color-text-link);
        display: flex;
        font: var(--font-500-14);
        height: 100%;
        line-height: 14px;
        cursor: pointer;
    }
    .total {
        font-size: 20px;
    }
    .ListPageStyleContainer {
        padding-bottom: 10px;
    }
}
</style>
