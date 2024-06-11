<!-- 我的待办 -->
<template>
    <div class="sg-page WorkbenchTodo">
        <el-card class="my-card">
            <div slot="header" class="ic-row middle">
                <div class="ic-col-flex-1 ic-row middle">
                    <span class="ic-font-20 ic-bold ic-mr-4" style="position:relative;">
                        我的待办
                        <span class="my-badge top-right">{{ allCount }}</span>
                    </span>
                </div>
            </div>
            <section class="sg-card">
                <page-tab :options="options" v-model="current" max-width="460px">
                    <template slot-scope="scope">
                        {{ scope.row.label }}
                        <span class="my-badge" style="position: absolute;top: 5px;right:60px;">{{ scope.row.count || '' }}</span>
                    </template>
                </page-tab>
                <div v-show="'entCount' === current">
                    <Home></Home>
                    <!-- <iframe src="/workbench/todo/home" frameborder="0" style="width:100%;height:calc(100vh - 240px);"></iframe> -->
                </div>
                <div v-show="'personCount' === current">
                    <iframe src="https://www.w3cschool.cn/w3css/w3css-6brw3dxn.html" frameborder="0" style="width:100%;height:calc(100vh - 250px);"></iframe>
                </div>
            </section>
        </el-card>
    </div>
</template>

<script lang="tsx">
import PageTab from '@/entry/third/components/page-tab/index.vue'
import { FormColumn, FormRef, TableColumn, TableLoad, TableRef, FormRow } from '@/sharegood-ui'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { AnyType } from '@/@types'
import { Helper } from './helper'
import { MyPolling } from '@/scripts/utils/polling'
import Home from './home/index.vue'
type FormModel = AnyType<{
    name: string
}>
@Component({
    name: 'WorkbenchTodo',
    components: {
        PageTab,
        Home,
    },
})
export default class WorkbenchTodo extends Vue {
    allCount = 0
    options = [
        { value: 'entCount', label: '企业', count: 0 },
        { value: 'personCount', label: '个人', count: 0 },
    ]
    current = 'entCount'
    polling: any
    mounted() {
        this.polling = new MyPolling(
            async () => {
                const { data } = await Helper.getTodoCount()
                this.allCount = data.allCount || 0
                this.options[0]['count'] = data.entCount || 0
                this.options[1]['count'] = data.personCount || 0
                return true
            },
            {
                delay: 5000,
            },
        )
        this.polling.start()
        // this.$http.request({
        //     url: 'http://192.168.1.171:3000/mock/580/mock/list',
        //     method: 'post',
        //     data: {
        //         page: 1,
        //     },
        // })
    }
    beforeDestroy() {
        this.polling.stop()
        console.log(12345)
    }
}
</script>

<style lang="less" scoped>
.WorkbenchTodo ::v-deep {
    .my-card {
        .sg-card {
            padding-top: 15px !important;
            padding-bottom: 15px !important;
        }
    }
}
</style>
