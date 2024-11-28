<template>
    <div class="sg-page icinfo-ai CaseConfig">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 操作按钮 -->
        <div class="sg-table-operator">
            <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, TableColumn, TableRef } from '@/sharegood-ui'
import { VolumeTypeEnum, VolumeTypeEnumMap } from './enum'
import { list, remove, getDictList, VO } from './api'
import moment from 'moment'

@Component({
    name: 'CaseConfig',
    components: {},
})
export default class CaseConfig extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef

    formModel: Record<string, any> = {}

    activated() {
        console.log('activated')
        this.handleSearch()
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    handleAdd() {
        this.$router.push('/file-review/case-config/save?type=add&_=新增案卷配置')
    }

    handleEdit(row: any) {
        this.$router.push(`/file-review/case-config/save?id=${row.id}&type=edit`)
    }

    handleCopy(row: any) {
        this.$router.push(`/file-review/case-config/save?type=add&_=复制案卷配置&id=${row.id}`)
    }

    async handleDelete(row: any) {
        await this.$confirm('确认删除该案卷配置?')
        await remove({ id: row.id })
        this.$message.success('删除成功')
        this.handleSearch()
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'select',
                name: 'lineCode',
                label: '条线',
                attrs: {
                    placeholder: '请选择',
                    filterable: true,
                    'default-first-option': true,
                    options: async () => {
                        const { data } = await getDictList({ dictType: 'territory_type' })
                        return data.map((item: any) => ({
                            label: item.dictChineseName,
                            value: item.dictCode,
                        }))
                    },
                    onChange: (val: any) => {
                        this.handleSearch()
                    },
                },
            },
            {
                tag: 'select',
                name: 'volumeTypeCode',
                label: '卷宗类型',
                attrs: {
                    placeholder: '请选择',
                    filterable: true,
                    'default-first-option': true,
                    options: async () => {
                        const { data } = await getDictList({ dictType: 'archive_type' })
                        return data.map((item: any) => ({
                            label: item.dictChineseName,
                            value: item.dictCode,
                        }))
                    },
                    onChange: (val: any) => {
                        this.handleSearch()
                    },
                },
            },
            {
                tag: 'select',
                name: 'volumeType',
                label: '正/副卷',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return Object.values(VolumeTypeEnumMap)
                    },
                    onChange: (val: any) => {
                        this.handleSearch()
                    },
                },
            },
            {
                tag: 'action',
                span: 24,
                buttons: [
                    {
                        isSubmit: true,
                        type: 'primary',
                        text: '查询',
                        svgIcon: 'icon-search',
                        icon: 'search-btn',
                    },
                    {
                        isReset: true,
                        type: 'reset',
                        text: '重置',
                        svgIcon: 'icon-reset',
                        icon: 'icon-reset',
                    },
                ],
            },
        ]
        return {
            span: 8,
            fields,
        }
    }

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '序号',
                type: 'index',
                width: '50px',
                fixed: 'left',
            },
            {
                label: '条线',
                prop: 'lineName',
                minWidth: '120px',
            },
            {
                label: '卷宗类型',
                prop: 'volumeTypeName',
                minWidth: '120px',
            },
            {
                label: '卷宗名称',
                prop: 'volumeName',
                minWidth: '150px',
            },
            {
                label: '正/副卷',
                prop: 'volumeType',
                minWidth: '80px',
                render: (h, { row }: { row: VO }) => {
                    const result = []
                    if (row.hasMainVolume === '1') {
                        result.push('正卷')
                    }
                    if (row.hasSubVolume === '1') {
                        result.push('副卷')
                    }
                    return <span>{result.join('、')}</span>
                },
            },
            {
                label: '目录',
                prop: 'catalogName',
                minWidth: '120px',
                render: (h, { row }: { row: VO }) => {
                    const result = []
                    if (row.hasMainVolume === '1') {
                        result.push(`正卷${row.mainCatalogCount}件`)
                    }
                    if (row.hasSubVolume === '1') {
                        result.push(`副卷${row.subCatalogCount}件`)
                    }
                    return <span>{result.join('、')}</span>
                },
            },
            {
                label: '创建时间',
                prop: 'createTime',
                width: '170px',
                render: (h, { row }: { row: VO }) => {
                    return <span>{moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                },
            },
            {
                label: '更新时间',
                prop: 'updateTime',
                width: '170px',
                render: (h, { row }: { row: VO }) => {
                    return <span>{moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                },
            },
            {
                label: '操作',
                prop: 'action',
                width: '140px',
                align: 'left',
                fixed: 'right',
                render: (h, { row, index }) => {
                    // 第一行不显示复制和删除
                    return (
                        <div>
                            {index === 0 ? (
                                <el-button type="text" onClick={() => this.handleEdit(row)}>
                                    编辑
                                </el-button>
                            ) : (
                                <div>
                                    <el-button type="text" onClick={() => this.handleEdit(row)}>
                                        编辑
                                    </el-button>
                                    <el-button type="text" onClick={() => this.handleCopy(row)}>
                                        复制
                                    </el-button>
                                    <el-button type="text" class="sg-color-error" danger onClick={() => this.handleDelete(row)}>
                                        删除
                                    </el-button>
                                </div>
                            )}
                        </div>
                    )
                },
            },
        ]

        return {
            pagination: { pageSize: 10 },
            pageActionLayout: [],
            load: async (params: any = {}) => {
                const { data } = await list({
                    ...params,
                    ...this.formModel,
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

<style lang="less" scoped>
.CaseConfig ::v-deep {
    padding: 0px;
}
</style>
