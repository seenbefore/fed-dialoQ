<template>
    <div class="my-list">
        <div v-if="notLoad" class="my-list-not-load">
            <slot name="notLoad">
                <NoKeyword v-if="isSearch" v-bind="$attrs" />
                <NotLoad v-else v-bind="$attrs" />
            </slot>
        </div>
        <van-pull-refresh v-else :key="listKey" v-model="refreshing" loading-text="刷新中..." @refresh="onRefresh" :disabled="refreshDisabled">
            <div class="list-container">
                <van-list
                    v-model="loadingDown"
                    :error.sync="loadError"
                    :finished="finished"
                    :finished-text="listFinalText"
                    :loading-text="listLoadingText"
                    :immediate-check="false"
                    :error-text="errorText"
                    @load="onLoad"
                >
                    <template #error>
                        <slot name="error"></slot>
                    </template>
                    <div class="empty" v-if="showNoData">
                        <slot name="empty">
                            <my-nodata v-bind="$attrs" />
                        </slot>
                    </div>
                    <div v-for="item in listData" :key="item.$key">
                        <slot :item="item"></slot>
                    </div>
                </van-list>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import NotLoad from './NotLoad/index.vue'
import NoKeyword from './NoKeyword/index.vue'

/**
 * @description 生成唯一标识
 */
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

export default {
    name: 'MyList',
    components: {
        NotLoad,
        NoKeyword,
    },
    props: {
        autoLoad: {
            type: Boolean,
            default: true,
        },
        load: {
            type: Function,
            required: true,
            default() {
                return () => Promise.resolve({ result: [], total: 0 })
            },
        },
        // 禁用下拉刷新
        disabledRefresh: {
            type: Boolean,
            default: false,
        },
        finishedText: {
            type: String,
            default: '没有更多了',
        },
        listLoadingText: {
            type: String,
            default: '加载中...',
        },
        isSearch: {
            type: Boolean,
            default: false,
        },
        errorText: {
            type: String,
            default: '请求失败，点击重新加载',
        },
    },
    created() {
        this.notLoad = !this.autoLoad
        if (this.autoLoad) {
            this.reset()
        }
    },
    mounted() {},
    computed: {
        listFinalText() {
            let text = ''
            if (this.showNoData || this.refreshing) {
                text = ''
            } else {
                text = this.finishedText
            }
            return text
        },
        showNoData() {
            return this.listData.length === 0 && !this.refreshing && !this.loadingDown && !this.loadError
        },
        refreshDisabled() {
            return this.disabledRefresh || this.loadingDown
        },
    },
    data() {
        return {
            firstLoaded: false, // 已首次加载
            listData: [],
            refreshing: false, // 刷新中
            rehreshError: false, // 刷新失败
            loadingDown: false, // 加载中
            loadError: false, // 加载失败
            finished: !this.autoLoad, // 已加载最后一页
            currentPage: 1, // 当前页
            /** 不加载数据 */
            notLoad: false,
            listKey: 1,
        }
    },
    methods: {
        requestHttp(config = {}) {
            // console.log('---requestHttp---', config)
            const { isRefresh } = config
            this.firstLoaded = true
            return this.load({ currentPage: this.currentPage })
                .then(({ result = [], total }) => {
                    this.currentPage++
                    this.refreshing = false
                    this.loadingDown = false
                    if (isRefresh) this.listData = []
                    const data = result.map(item => {
                        return {
                            $key: guid(),
                            ...item,
                        }
                    })
                    this.listData.push(...data)
                    this.finished = this.listData.length >= total
                })
                .catch(err => {
                    this.loadingDown = false
                    this.refreshing = false
                    this.finished = false
                    this.loadError = true
                })
        },
        async onLoad(config = {}) {
            await this.requestHttp(config)
        },
        onRefresh() {
            console.log('---下拉刷新---')
            this.reload({
                isRefresh: true,
            })
        },
        async reload(config = {}) {
            console.log('reload')
            if (this.loadingDown || this.refresh) {
                this.listKey++
                return
            }
            this.notLoad = false
            await this.$nextTick()
            this.rehreshError = false // 刷新失败
            this.loadError = false // 加载失败
            this.currentPage = 1
            const { isRefresh } = config
            if (isRefresh) {
                this.finished = true
                this.refreshing = true
            } else {
                this.listData = []
                this.finished = false
                this.loadingDown = true
            }
            await this.requestHttp(config)
        },
        reset() {
            this.notLoad = !this.autoLoad
            if (!this.notLoad) this.reload()
        },
    },
}
</script>
<style lang="less" scoped>
.my-list {
    position: relative;
    overflow-y: scroll;
    height: 100%;
    ::v-deep {
        .van-pull-refresh {
            min-height: 100%;
        }
    }
    .my-list-not-load {
    }
    .list-container {
        display: flex;
        flex-direction: column;
        .empty {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        /deep/.van-empty {
            .van-empty__image {
                width: 100px;
                height: 100px;
            }
        }
    }
}
</style>
