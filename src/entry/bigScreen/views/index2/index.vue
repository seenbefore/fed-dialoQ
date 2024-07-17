<template>
    <div class="sg-page page-index">
        <div class="data-main">
            <div class="menus-wrap">
                <el-button v-bind="btn.attrs" v-for="(btn, index) in menuList" :key="index" @click="onBtn(btn)">{{ btn.label }}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { dateFormat } from '@/scripts/utils'
export default {
    name: 'Index',
    components: {},
    props: {},
    data() {
        const date = new Date()
        const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        const dateStr = dateFormat(date, 'YYYY年MM月DD日   ') + weekday[date.getDay()]
        return {
            date: dateStr,
            menuList: [
                {
                    label: '基础组件示例',
                    attrs: {
                        type: 'primary',
                    },
                    path: '/example/one',
                },
                {
                    label: '高阶组件示例',
                    attrs: {
                        type: 'primary',
                    },
                    path: '/example/two',
                },
                {
                    label: 'echarts组件示例',
                    attrs: {
                        type: 'primary',
                    },
                    path: '/example/echarts',
                },
                // {
                //     label: '大屏模板1',
                //     attrs: {
                //         type: 'primary',
                //     },
                //     path: '/example/template-one',
                // },
                {
                    label: '衢州市执法监管驾驶舱',
                    attrs: {
                        type: 'primary',
                    },
                    path: '/qz-zfjd-jsc',
                },
            ],
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        console.log(this.$utils)
    },
    methods: {
        onBtn(row) {
            console.log('row :>> ', row)
            const { path } = row
            path && this.$router.push(path)
        },
    },
}
</script>

<style lang="less" scoped>
.page-index {
    background-color: #ddd;
    font-family: PingFang SC;
}
</style>
