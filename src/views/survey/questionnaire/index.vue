<template>
    <admin-page class="QuestionnaireManagement">
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
import { QuestionnaireStatusEnum, QuestionnaireStatusEnumMap } from './enum'
import { list, remove, updateStatus, QuestionnaireVO } from './api'

/*
 * 描述: 问卷管理模块，支持问卷的增删改查、发布和下线操作
 *
 * 功能描述:
 * - 查询问卷列表，支持按标题和状态筛选
 * - 新增、编辑、删除问卷
 * - 预览问卷
 * - 发布/下线问卷
 */
@Component({
    name: 'QuestionnaireManagement',
    components: {},
})
export default class QuestionnaireManagement extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef

    formModel: Record<string, any> = {}

    // 添加activated生命周期钩子，当页面从缓存中被激活时触发刷新
    activated() {
        // 当从其他页面返回时，刷新列表数据
        this.tableRef && this.tableRef.onLoad()
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    handleAdd() {
        this.$router.push('/survey/questionnaire/save?action=add&_=新增问卷')
    }

    handleEdit(row: QuestionnaireVO) {
        this.$router.push(`/survey/questionnaire/save?id=${row.id}&action=edit&_=编辑问卷`)
    }

    handlePreview(row: QuestionnaireVO) {
        window.open(`/survey/questionnaire/preview?id=${row.id}`)
    }

    handleShare(row: QuestionnaireVO) {
        if (row.status !== QuestionnaireStatusEnum.PUBLISHED) {
            this.$message.warning('只有已发布的问卷才能分享')
            return
        }

        const shareUrl = `${window.location.origin}/survey/questionnaire/fill?id=${row.id}`

        this.copyToClipboard(shareUrl)

        this.$message.success('分享链接已复制到剪贴板')
    }

    copyToClipboard(text: string) {
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
    }

    async handleDelete(row: QuestionnaireVO) {
        await this.$confirm('确认删除该问卷吗？', '提示', {
            type: 'warning',
        })
        await remove({ id: row.id })
        this.$message.success('删除成功')
        this.handleSearch()
    }

    async handleUpdateStatus(row: QuestionnaireVO) {
        const newStatus = row.status === QuestionnaireStatusEnum.PUBLISHED ? QuestionnaireStatusEnum.OFFLINE : QuestionnaireStatusEnum.PUBLISHED
        const actionText = newStatus === QuestionnaireStatusEnum.PUBLISHED ? '发布' : '下线'

        await this.$confirm(`确认${actionText}该问卷吗？`, '提示', {
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
                    label: '问卷标题',
                },
                attrs: {
                    placeholder: '请输入问卷标题',
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
                        const options = Object.values(QuestionnaireStatusEnumMap)
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
                label: '问卷标题',
                prop: 'title',
                minWidth: '200px',
                showOverflowTooltip: true,
                overflowCount: 1,
            },
            {
                label: '答卷数量',
                prop: 'responseCount',
                minWidth: '100px',
            },
            {
                label: '发布状态',
                prop: 'status',
                minWidth: '100px',
                render: (h, { row }) => {
                    const statusInfo = QuestionnaireStatusEnumMap[row.status]
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
                width: '320px',
                render: (h, { row }) => {
                    const isPublished = row.status === QuestionnaireStatusEnum.PUBLISHED
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
                            <el-button type="text" onClick={() => this.handleShare(row)}>
                                分享
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
                } as any)
                return {
                    result: data.data,
                    total: data.total,
                }
            },
            columns,
        }
    }
}
</script>

<style scoped lang="less">
.QuestionnaireManagement ::v-deep {
    padding: 0px;
}
</style>
