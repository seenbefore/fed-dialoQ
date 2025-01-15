<template>
    <admin-page class="ArticleManagement">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef">
            <template #header>
                <div class="sg-flexbox align-center">
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </div>
            </template>
        </sg-data-view>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { ArticleStatusEnum, ArticleStatusEnumMap } from './enum'
import { list, remove, updateStatus, ArticleVO } from './api'

@Component({
    name: 'ArticleManagement',
    components: {},
})
export default class ArticleManagement extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef

    formModel: Record<string, any> = {}

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    handleAdd() {
        this.$router.push('/content/article/save?action=add&_=新增')
    }

    handleEdit(row: ArticleVO) {
        this.$router.push(`/content/article/save?id=${row.id}&action=edit&_=编辑`)
    }

    handlePreview(row: ArticleVO) {
        window.open(`/content/article/preview?id=${row.id}`)
    }

    async handleDelete(row: ArticleVO) {
        await this.$confirm('确认删除该文章吗？', '提示', {
            type: 'warning',
        })
        await remove({ id: row.id })
        this.$message.success('删除成功')
        this.handleSearch()
    }

    async handleUpdateStatus(row: ArticleVO) {
        const newStatus = row.status === ArticleStatusEnum.PUBLISHED ? ArticleStatusEnum.OFFLINE : ArticleStatusEnum.PUBLISHED
        const actionText = newStatus === ArticleStatusEnum.PUBLISHED ? '发布' : '下线'

        await this.$confirm(`确认${actionText}该文章吗？`, '提示', {
            type: 'warning',
        })
        await updateStatus({ id: row.id, status: newStatus })
        this.$message.success(`${actionText}成功`)
        this.handleSearch()
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'title',
                itemAttrs: {
                    label: '文章标题',
                },
                attrs: {
                    placeholder: '请输入文章标题',
                },
            },
            {
                tag: 'select',
                name: 'category',
                itemAttrs: {
                    label: '文章分类',
                },
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return [
                            { label: '全部', value: '' },
                            { label: '新闻', value: '新闻' },
                            { label: '公告', value: '公告' },
                            { label: '活动', value: '活动' },
                            { label: '帮助', value: '帮助' },
                        ]
                    },
                },
            },
            {
                tag: 'select',
                name: 'status',
                itemAttrs: {
                    label: '发布状态',
                },
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        const options = Object.values(ArticleStatusEnumMap)
                        options.unshift({ label: '全部', value: '' })
                        return options
                    },
                },
            },
            {
                tag: 'daterange',
                name: 'createTime',
                itemAttrs: {
                    label: '创建时间',
                },
                attrs: {
                    'start-placeholder': '开始日期',
                    'end-placeholder': '结束日期',
                    'value-format': 'yyyy-MM-dd',
                },
            },
            {
                tag: 'input',
                name: 'author',
                itemAttrs: {
                    label: '作者',
                },
                attrs: {
                    placeholder: '请输入作者姓名',
                },
            },
        ]

        return {
            autoAppendAction: true,
            fields,
        }
    }

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '序号',
                type: 'index',
                width: '60px',
            },
            {
                label: '文章标题',
                prop: 'title',
                minWidth: '200px',
                showOverflowTooltip: true,
                overflowCount: 1,
            },
            {
                label: '文章分类',
                prop: 'category',
                minWidth: '100px',
            },
            {
                label: '作者',
                prop: 'author',
                minWidth: '100px',
            },
            {
                label: '阅读量',
                prop: 'readCount',
                minWidth: '80px',
            },
            {
                label: '发布状态',
                prop: 'status',
                minWidth: '100px',
                render: (h, { row }) => {
                    const statusInfo = ArticleStatusEnumMap[row.status]
                    return <span style={{ color: statusInfo.color }}>{statusInfo.label}</span>
                },
            },
            {
                label: '创建时间',
                prop: 'createTime',
                minWidth: '170px',
            },
            {
                label: '更新时间',
                prop: 'updateTime',
                minWidth: '170px',
            },
            {
                label: '操作',
                fixed: 'right',
                width: '280px',
                render: (h, { row }) => {
                    const isPublished = row.status === ArticleStatusEnum.PUBLISHED
                    return (
                        <div>
                            <el-button type="text" onClick={() => this.handlePreview(row)}>
                                预览
                            </el-button>
                            <el-button type="text" onClick={() => this.handleEdit(row)}>
                                编辑
                            </el-button>
                            <el-button type="text" onClick={() => this.handleUpdateStatus(row)}>
                                {isPublished ? '下线' : '发布'}
                            </el-button>
                            <el-button type="text" class="text-danger" onClick={() => this.handleDelete(row)}>
                                删除
                            </el-button>
                        </div>
                    )
                },
            },
        ]

        return {
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.admin-page__content'),
            },
            load: async (params: any = {}) => {
                const { createTime, ...rest } = this.formModel
                const [createTimeStart, createTimeEnd] = createTime || []
                const { data } = await list({
                    ...params,
                    ...rest,
                    createTimeStart,
                    createTimeEnd,
                })
                return {
                    result: data.data,
                    total: data.recordsTotal,
                }
            },
            columns,
        }
    }
}
</script>

<style scoped lang="less">
.ArticleManagement ::v-deep {
    padding: 0px;
}
</style>
