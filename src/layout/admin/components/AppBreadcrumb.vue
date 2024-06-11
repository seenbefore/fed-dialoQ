<template>
    <el-breadcrumb class="my-breadcrumb" v-bind="$attrs">
        <el-breadcrumb-item v-for="item in breadList" :to="{ path: item.path }" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
import { userStore } from '../../../store/useStore'
// good
function treeFindPath(tree, func, path = []) {
    if (!tree) return []
    for (const data of tree) {
        //这里按照你的需求来存放最后返回的内容吧
        path.push(data)
        if (func(data)) return path
        if (data.children) {
            const findChildren = treeFindPath(data.children, func, path)
            if (findChildren.length) return findChildren
        }
        path.pop()
    }
    return []
}

export default {
    props: {
        // store: {
        //     type: Object,
        //     default() {
        //         return {}
        //     },
        // },
    },
    created() {
        this.getBreadcrumb()
    },
    data() {
        return {
            breadList: [],
        }
    },
    computed: {
        permission_menus() {
            return userStore.menus
        },
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        },
    },
    methods: {
        getBreadcrumb() {
            const { path, meta = {}, query = {} } = this.$route
            const activeMenu = meta.activeMenu
            const path$ = activeMenu || path
            let breadList = treeFindPath(this.permission_menus, item => {
                return item.path === path$
            })

            if (activeMenu) {
                breadList.push({
                    ...this.$route,
                })
            }

            this.breadList = breadList
        },
    },
}
</script>
