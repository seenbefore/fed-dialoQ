<!-- 资源社区 -->
<template>
    <div class="Community styles__StyledSquareContainer-sc-lnu5de-0 fqFuFi squareContainer" id="web">
        <header class="sc-fEiIrt hgFvEF community-header">
            <div class="background_container">
                <div class="background_wrap">
                    <img src="@/entry/library/assets/banner.png" class="" />
                </div>
            </div>
            <div class="content_wrap" style="padding-top: 64px;">
                <div class="explore_wrapper__7cXzp">
                    <span class="greeting_text__27ffR">
                        <span class="greeting_secondly__Fhmku">{{ greeting }}，</span>
                        <span class="username__M-CNw" v-if="user">{{ user.name }}</span>
                    </span>
                    <br />
                    <span class="main_text__1_2XU">欢迎来到 资产库</span>
                </div>
                <div class="explore_search_wrapper__Jw8GR">
                    <div class="sc-epALIP btpsHp topSearch search_content__2zZwL">
                        <div>
                            <div class="sc-fUnMCh bQZsHg icon_box cursor-pointer__34ZCy">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <g opacity="1" transform="translate(0 0)  rotate(0 14 14)">
                                        <path
                                            id="并集"
                                            fill-rule="evenodd"
                                            fill="currentColor"
                                            transform="translate(7 7)  rotate(0 7 7)"
                                            opacity="1"
                                            d="M13.55 13.95C13.59 13.93 13.63 13.9 13.67 13.88C13.72 13.85 13.75 13.82 13.79 13.79C13.82 13.75 13.85 13.72 13.88 13.67C13.9 13.63 13.93 13.59 13.95 13.55C13.96 13.51 13.97 13.46 13.98 13.41C13.99 13.36 14 13.31 14 13.27C14 13.22 13.99 13.18 13.98 13.12C13.97 13.08 13.96 13.03 13.95 12.98C13.93 12.95 13.9 12.9 13.88 12.87C13.85 12.82 13.82 12.78 13.79 12.75L10.25 9.21C10.99 8.24 11.44 7.03 11.44 5.72C11.44 2.56 8.88 0 5.72 0C2.56 0 0 2.56 0 5.72C0 8.88 2.56 11.44 5.72 11.44C7.03 11.44 8.24 10.99 9.21 10.25L12.75 13.79C12.78 13.82 12.82 13.85 12.87 13.88C12.9 13.9 12.95 13.93 12.98 13.95C13.03 13.96 13.08 13.97 13.12 13.98C13.18 13.99 13.22 14 13.27 14C13.31 14 13.36 13.99 13.41 13.98C13.46 13.97 13.51 13.96 13.55 13.95Z M1.14379 5.72379C1.14379 8.24379 3.19379 10.2938 5.72379 10.2938C8.24379 10.2938 10.2938 8.24379 10.2938 5.72379C10.2938 3.19379 8.24379 1.14379 5.72379 1.14379C3.19379 1.14379 1.14379 3.19379 1.14379 5.72379Z "
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <input placeholder="搜索组件、控件、连接器、标准规范 按enter建开始查询" v-model="keyword" @keyup.enter="handleSearch" />
                        <div></div>
                        <!-- <div class="sc-dJiZtA cpTJFd isClose">
                            <div class="sc-kCMKrZ feXmAh">
                                <div class="searchPanelContent">
                                    <div class="header">
                                        <span>最近</span>
                                        <span class="link" data-type="button">清空</span>
                                    </div>
                                    <div class="tagWrapper">
                                        <div class="sc-deXhhX eTYbNE" data-type="button"><span>开个</span></div>
                                    </div>
                                </div>
                                <div class="searchPanelContent">
                                    <div class="header"><span>推荐搜索</span></div>
                                    <div class="tagWrapper">
                                        <div class="sc-deXhhX eTYbNE" data-type="button"><span>组件库</span></div>
                                        <div class="sc-deXhhX eTYbNE" data-type="button"><span>网页</span></div>
                                        <div class="sc-deXhhX eTYbNE" data-type="button"><span>样机</span></div>
                                        <div class="sc-deXhhX eTYbNE" data-type="button"><span>B端</span></div>
                                        <div class="sc-deXhhX eTYbNE" data-type="button"><span>可视化</span></div>
                                        <div class="sc-deXhhX eTYbNE" data-type="button"><span>图表</span></div>
                                        <div class="sc-deXhhX eTYbNE" data-type="button"><span>毛玻璃</span></div>
                                        <div class="sc-deXhhX eTYbNE" data-type="button"><span>缺省页</span></div>
                                        <div class="sc-deXhhX eTYbNE" data-type="button"><span>会员</span></div>
                                        <div class="sc-deXhhX eTYbNE" data-type="button"><span>天气</span></div>
                                        <div class="sc-deXhhX eTYbNE" data-type="button"><span>表情</span></div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="search_tags_wrapper__3u-s5">
                        <div class="tag_wrapper__3WfQz" data-type="button" v-for="(item, index) in keywords" :key="index" @click="handleSearch(item)">
                            <span>{{ item }}</span>
                        </div>
                        <!-- <div class="tag_wrapper__3WfQz" data-type="button">
                            <span>作品集</span>
                            <span class="highLight__5Ti-k">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M7.12133 8.08579L6.06067 4.90381L5.00001 8.08579L1.81803 9.14645L5.00001 10.2071L6.06067 13.3891L7.12133 10.2071L10.3033 9.14645L7.12133 8.08579Z"
                                        fill="#008EFA"
                                    ></path>
                                    <path
                                        opacity="0.7"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12.0607 4.73224L11.3535 2.61092L10.6464 4.73224L8.52512 5.43934L10.6464 6.14645L11.3535 8.26777L12.0607 6.14645L14.182 5.43934L12.0607 4.73224Z"
                                        fill="#008EFA"
                                    ></path>
                                </svg>
                            </span>
                        </div> -->
                    </div>
                </div>
            </div>
        </header>
        <main class="main-container">
            <div class="styles__StyledHome-sc-elfaoy-0 cMWEDW">
                <!-- 筛选条件 -->
                <div class="styles__StyledFilterSection-sc-vvy1my-0 eZYmVr" id="category" style="padding-top:30px;">
                    <!-- <div class="categoryList">
                    <div class="styles__StyledCategoryHeader-sc-6x5gob-0 foVql">
                        <ul>
                            <li class="tagItem is-active">
                                <span class="sc-jSUZER dCfvCv Tooltip expect"><span>原型文件</span></span>
                            </li>
                            <li class="tagItem">
                                <span class="sc-jSUZER dCfvCv Tooltip expect"><span>原型页面</span></span>
                            </li>
                            <li class="tagItem">
                                <span class="sc-jSUZER dCfvCv Tooltip expect"><span>组件</span></span>
                            </li>
                            <li class="tagItem">
                                <span class="sc-jSUZER dCfvCv Tooltip expect"><span>图标</span></span>
                            </li>
                            <li class="tagItem">
                                <span class="sc-jSUZER dCfvCv Tooltip expect"><span>达人作品</span></span>
                            </li>
                        </ul>
                    </div>
                    <div class="styles__StyledUpload-sc-f1ute1-0 fgrwLq">
                        <div></div>
                        <div class="uploadWrap">
                            <div class="uploadSquare" @click="redirectToUpload">
                                <i class="el-icon-s-promotion"></i>
                                <span class="uploadTitle">发布素材</span>
                            </div>
                        </div>
                    </div>
                </div> -->
                    <!-- 推荐筛选 -->
                    <div class="filterHeader" id="datagrid">
                        <!-- {{ formModel }} -->
                        <header class="styles__StyledFilterHeader-sc-1rrgovz-0 jWcjBU">
                            <div class="styles__StyledTagFilter-sc-1e3ln5m-0 jBSban filterAssemble">
                                <ul class="filterList">
                                    <li class="filterLabel title">
                                        <span class="sc-jSUZER dCfvCv Tooltip expect"><span>一级分类:</span></span>
                                    </li>
                                    <div class="default">
                                        <li class="filterLabel" :class="formModel.plabel == '' ? 'isActive' : ''" @click="plabelChange('')">
                                            <span class="sc-jSUZER dCfvCv Tooltip"><span>全部</span></span>
                                        </li>
                                    </div>
                                    <div class="elements">
                                        <li
                                            class="filterLabel"
                                            v-for="(item, index) in plabel"
                                            :key="index"
                                            :class="formModel.plabel == item.value ? 'isActive' : ''"
                                            @click="plabelChange(item.value)"
                                        >
                                            <span class="sc-jSUZER dCfvCv Tooltip expect">
                                                <span>{{ item.label }}</span>
                                            </span>
                                        </li>
                                    </div>
                                </ul>
                                <ul class="filterList" v-if="clabel.length">
                                    <li class="filterLabel title">
                                        <span class="sc-jSUZER dCfvCv Tooltip expect"><span>二级分类:</span></span>
                                    </li>
                                    <div class="default">
                                        <li class="filterLabel" :class="formModel.clabel == '' ? 'isActive' : ''" @click="clabelChange('')">
                                            <span class="sc-jSUZER dCfvCv Tooltip"><span>全部</span></span>
                                        </li>
                                    </div>
                                    <div class="elements">
                                        <li
                                            class="filterLabel"
                                            v-for="(item, index) in clabel"
                                            :key="index"
                                            :class="formModel.clabel == item.value ? 'isActive' : ''"
                                            @click="clabelChange(item.value)"
                                        >
                                            <span class="sc-jSUZER dCfvCv Tooltip expect ">
                                                <span>{{ item.label }}</span>
                                            </span>
                                        </li>
                                    </div>
                                </ul>
                                <ul class="filterList" v-if="slabel.length">
                                    <li class="filterLabel title">
                                        <span class="sc-jSUZER dCfvCv Tooltip expect"><span>三级分类:</span></span>
                                    </li>
                                    <div class="default">
                                        <li class="filterLabel" :class="formModel.slabel == '' ? 'isActive' : ''" @click="slabelChange('')">
                                            <span class="sc-jSUZER dCfvCv Tooltip"><span>全部</span></span>
                                        </li>
                                    </div>
                                    <div class="elements">
                                        <li
                                            class="filterLabel"
                                            v-for="(item, index) in slabel"
                                            :key="index"
                                            :class="formModel.slabel == item.value ? 'isActive' : ''"
                                            @click="slabelChange(item.value)"
                                        >
                                            <span class="sc-jSUZER dCfvCv Tooltip expect ">
                                                <span>{{ item.label }}</span>
                                            </span>
                                        </li>
                                    </div>
                                </ul>

                                <ul class="filterList" v-if="communityState.length">
                                    <li class="filterLabel title">
                                        <span class="sc-jSUZER dCfvCv Tooltip expect"><span>组件状态:</span></span>
                                    </li>
                                    <div class="default">
                                        <li class="filterLabel" :class="formModel.communityState == '' ? 'isActive' : ''" @click="communityStateChange('')">
                                            <span class="sc-jSUZER dCfvCv Tooltip"><span>全部</span></span>
                                        </li>
                                    </div>
                                    <div class="elements">
                                        <li
                                            class="filterLabel"
                                            v-for="(item, index) in communityState"
                                            :key="index"
                                            :class="formModel.communityState == item.value ? 'isActive' : ''"
                                            @click="communityStateChange(item.value)"
                                        >
                                            <span class="sc-jSUZER dCfvCv Tooltip expect ">
                                                <span>{{ item.label }}</span>
                                            </span>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                            <div class="styles__StyledSortFilter-sc-ol6rgt-0 cZysKa sortAssemble">
                                <div class="sort">
                                    <ul class="filterList">
                                        <li class="filterLabel" :class="formModel.order === 'recent' ? 'isActive' : ''" @click="orderChange('recent')">
                                            <span class="sc-jSUZER dCfvCv Tooltip expect"><span>最新发布</span></span>
                                        </li>

                                        <li class="filterLabel" :class="formModel.order === 'views' ? 'isActive' : ''" @click="orderChange('views')">
                                            <span class="sc-jSUZER dCfvCv Tooltip expect"><span>最多浏览</span></span>
                                        </li>
                                        <li class="filterLabel" :class="formModel.order === 'used' ? 'isActive' : ''" @click="orderChange('used')">
                                            <span class="sc-jSUZER dCfvCv Tooltip expect"><span>最多使用</span></span>
                                        </li>
                                        <li class="filterLabel" :class="formModel.order === 'recommend' ? 'isActive' : ''" @click="orderChange('recommend')">
                                            <span class="sc-jSUZER dCfvCv Tooltip expect"><span>热门推荐</span></span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="createdUserId">
                                    <ul class="filterList">
                                        <li class="filterLabel">
                                            <el-checkbox v-model="formModel.owner" size="medium" :true-label="createdUserId" false-label="" class="checkbox" v-if="hasLogin">我的</el-checkbox>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </header>
                    </div>
                </div>
                <main class="main-container container">
                    <CardList :has-header="false" v-model="formModel" ref="cardList" @pagination="handlePageChange" :auto="false"></CardList>
                </main>
                <!-- 数据列表 -->
            </div>
            <PublishButton></PublishButton>
        </main>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Watch, Prop, Ref } from 'vue-property-decorator'
import * as API from '@/entry/library/services/community'
import { ComboGroupDict } from '@/entry/library/scripts/dict/combo_group'
import { userStore } from '@/entry/library/store/useStore'
import PublishButton from './components/PublishButton/index.vue'
import moment from 'moment'
import CardList from '@/entry/library/views/community/components/CardList/index.vue'

@Component({
    name: 'Community',
    components: {
        PublishButton,
        CardList,
    },
})
export default class Community extends Vue {
    get user() {
        return userStore.info
    }
    get greeting() {
        const now = moment() // 获取当前时间
        const hour = now.hour() // 获取当前小时数
        let result = ''
        // 根据小时数判断并返回相应的问候语
        if (hour >= 0 && hour < 12) {
            if (hour < 6) {
                result = '早上好' // 假设在0点到6点之间都算早上
            } else {
                result = '上午好'
            }
        } else if (hour >= 12 && hour < 14) {
            result = '中午好' // 假设在12点到14点之间都算中午
        } else if (hour >= 14 && hour < 18) {
            result = '下午好' // 假设在14点到18点之间都算下午
        } else if (hour >= 18 && hour < 24) {
            result = '晚上好' // 假设在18点到24点之间都算晚上
        } else {
            result = '现在是午夜或未知时间' // 处理边缘情况或错误情况
        }
        return result
    }
    // 常见搜索
    keywords = ['文书', '自助取数', '数据', '大屏']
    keyword = this.$route.query.keyword || ''
    formModel = Object.assign(
        {
            page: 1,
            plabel: '',
            clabel: '',
            slabel: '',
            owner: '',
            keyword: '',
            communityState: '',
            order: 'recent',
        },

        this.$route.query,
    )

    communityState: any[] = [...ComboGroupDict.communityState]
    plabel: any[] = [...ComboGroupDict.plabel]
    clabel: any[] = []
    slabel: any[] = []

    get createdUserId() {
        return userStore.info?.name || ''
    }
    get hasLogin() {
        return !!userStore.token
    }
    @Watch('formModel.plabel')
    onplabelChange(val: string) {
        const clabels = ComboGroupDict.clabel.filter((item: any) => item.parent === val)
        this.clabel = [...clabels]
        // this.formModel.clabel = ''
        // this.formModel.slabel = ''
        // Object.assign(this.formModel, {
        //     clabel: '',
        //     slabel: '',
        // })
        if (clabels.length > 0) {
            let parents = clabels.map(item => item.value)
            this.slabel = ComboGroupDict.slabel.filter(item => item.default === true && parents.includes(item.parent))
        } else {
            this.slabel = []
        }
    }
    @Watch('formModel.clabel')
    onclabelChange(val: string) {
        let result = []
        if (val) {
            result = ComboGroupDict.slabel.filter(item => item.parent === val)
        } else {
            const plabel = this.formModel.plabel
            let clabels = ComboGroupDict.clabel.filter(item => item.parent === plabel)

            if (plabel) {
                let parents = clabels.map(item => item.value)
                result = ComboGroupDict.slabel.filter(item => item.default === true && parents.includes(item.parent))
            } else {
                result = ComboGroupDict.slabel.filter(item => item.default === true)
            }
        }

        this.slabel = [...result]
        //this.formModel.slabel = ''
    }
    plabelChange(val: string) {
        console.log('plabelChange', val)
        // this.formModel.plabel = val
        // this.formModel.keyword = ''
        Object.assign(this.formModel, {
            plabel: val,
            keyword: '',
            page: 1,
            clabel: '',
            slabel: '',
        })
        this.keyword = ''
    }
    clabelChange(val: string) {
        Object.assign(this.formModel, {
            clabel: val,

            keyword: '',
            page: 1,
            slabel: '',
        })

        this.keyword = ''
    }
    slabelChange(val: string) {
        Object.assign(this.formModel, {
            slabel: val,
            keyword: '',
            page: 1,
        })

        this.keyword = ''
    }
    communityStateChange(val: string) {
        this.formModel.communityState = val
    }
    orderChange(val: string) {
        this.formModel.order = val
    }
    isAuthor(item: any) {
        const role = userStore.info?.role || ''
        const isAdmin = role.includes('admin')
        const isAuthor = item.owner === userStore.info?.name
        return isAdmin || isAuthor
    }
    handleSearch(val: any) {
        const keyword = typeof val === 'string' ? val : this.keyword
        if (val) {
            this.keyword = keyword
        }
        Object.assign(this.formModel, {
            plabel: '',
            clabel: '',
            owner: '',
            page: 1,

            order: 'recent',
            keyword: this.keyword,
        })
    }
    total = 0

    async handlePageChange(val: any) {
        const cardList$ = this.$refs.cardList as any
        this.formModel.page = val
        //await cardList$.syncData()
        this.$nextTick(() => {
            const target = document.getElementById('datagrid')
            target && target.scrollIntoView()
        })
    }
    mounted() {
        const cardList$ = this.$refs.cardList as any
        Object.assign(this.formModel, this.$route.query)
        cardList$.syncData()
        if (this.formModel.plabel) {
            this.onplabelChange(this.formModel.plabel)
        }
        if (this.formModel.clabel) {
            this.onclabelChange(this.formModel.clabel)
        }
        const unwatch = this.$watch(
            'formModel',
            (val, oldValue) => {
                const query: any = {}
                const keys = Object.keys(val)
                keys.forEach(key => {
                    if (val[key]) {
                        query[key] = val[key]
                    }
                })
                const page = val.page
                const oldPage = oldValue.page
                console.log(22222, page, oldPage)
                // if (page == oldPage) {
                //     return
                // }

                this.$router
                    .push({
                        path: '/community',
                        query,
                    })
                    .catch(err => {
                        console.log('err', err)
                    })
                this.$nextTick(async () => {
                    await cardList$.syncData()
                    // this.$nextTick(() => {
                    //     const target = document.getElementById('datagrid')
                    //     target && target.scrollIntoView()
                    // })
                })
            },
            {
                deep: true,
            },
        )
    }
}
</script>

<style lang="less" scoped>
.Community ::v-deep {
    padding-top: 72px;
    .main-container {
    }
}
</style>
