<script lang="tsx">
import TableWrapper from '@/components/table-wrapper/index.vue'
import { mockRequest, useLoadList } from '@/hooks/useLoadList'
import { CreateElement } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import Search from './search.vue'

@Component({
    name: 'TestPage',
    components: { TableWrapper, Search },
})
export default class TestPage extends Vue {
    public get tableColumns() {
        return [
            {
                label: '序号',
                type: 'index',
                fixed: 'left',
            },
            {
                label: '单位名称',
                prop: '单位名称',
                render: (_: CreateElement, { row }: Obj) => {
                    return (
                        <el-button type="text" primary>
                            **机构
                        </el-button>
                    )
                },
            },
            {
                label: '总分',
                prop: '总分',
            },
            {
                label: '纬度1得分',
                prop: '纬度1得分',
            },
            {
                label: '操作',
                width: '120px',
                fixed: 'right',
                render: (_: CreateElement, { row }: Obj) => {
                    return [
                        <el-button type="text" primary>
                            修改
                        </el-button>,
                        <el-button type="text" danger>
                            删除
                        </el-button>,
                    ]
                },
            },
        ]
    }

    public queryModel: Record<string, any> = {}

    public tableAttrs = {
        columns: this.tableColumns,
        tableHeaderSticky: {
            scrollDom: () => document.querySelector('.ranking-enterprise__container'),
        },
        idKey: 'id',
        load: this.loadList,
        pageActionLayout: [],
        fit: true,
    }

    public async loadList(params: { pageNum: number; length?: number }) {
        return await useLoadList(params, this.queryModel, mockRequest)
    }
}
</script>

<template>
    <TableWrapper class="tast-page__container">
        <template #search>
            <Search :query-model="queryModel"></Search>
        </template>
        <template #middle>
            <el-button type="primary">新增</el-button>
        </template>
        <sg-data-view ref="tableRef" v-bind="tableAttrs"></sg-data-view>
    </TableWrapper>
</template>

<style scoped lang="less"></style>
