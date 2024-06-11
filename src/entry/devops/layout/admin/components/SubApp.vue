<template>
    <div class="sg-page page-sub-app" style="height: 100%;" :class="query.class">
        <iframe class="iframe" :src="src" frameborder="0" style="width: 100%;height: 100%;"></iframe>
    </div>
</template>

<script>
import Qs from 'qs'
export default {
    name: 'SubApp',
    components: {},
    props: {
        // 路由地址
        fullPath: {
            type: String,
            default: '',
        },
    },
    data() {
        return {}
    },
    computed: {
        origin() {
            return decodeURIComponent(this.fullPath.replace('/sub-app/', ''))
        },
        query() {
            const origin = this.origin
            let urlStr = origin.split('?')[1]
            let result = Qs.parse(urlStr)
            return result
        },
        // 内嵌页面为老应用的时候加前缀方便代理，普通页面则不做处理
        src() {
            const origin = this.origin

            let uri = origin
            const query = {
                ts: new Date().valueOf(),
            }
            const query$ = Object.keys(query)
                .map(key => {
                    return `${key}=${query[key]}`
                })
                .join('&')
            if (uri.indexOf('?') > -1) {
                uri = uri + '&' + query$
            } else {
                uri = uri + '?' + query$
            }

            return uri
        },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>
<style scoped lang="less">
.page-sub-app {
    &.p10 {
        padding: 10px !important;
    }
}
</style>
