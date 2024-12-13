<template>
    <div class="sg-page icinfo-ai PrePublicity">
        <sg-data-view v-bind="getTableAttrs" ref="tableRef">
            <!-- 顶部操作 -->
            <template #header>
                <el-button type="primary" @click="handleAdd">新增</el-button>
            </template>
        </sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { TableColumn, TableRef } from '@/sharegood-ui'
import { PublicityStatusEnum, PublicityStatusEnumMap, PublicityTypeEnum, PublicityTypeEnumMap } from './enum'
import { list, remove, PublicityVO } from './api'

@Component({
    name: 'PrePublicity',
    components: {},
})
export default class PrePublicity extends Vue {
    @Ref('tableRef')
    tableRef!: TableRef

    /** 列表展示配置项 */
    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '公示信息类型',
                prop: 'type',
                minWidth: '150px',
                render: (h, { row }) => {
                    return PublicityTypeEnumMap[row.type as keyof typeof PublicityTypeEnum]?.label || '-'
                },
            },
            {
                label: '状态',
                prop: 'status',
                minWidth: '100px',
                render: (h, { row }) => {
                    return PublicityStatusEnumMap[row.status as keyof typeof PublicityStatusEnum]?.label || '-'
                },
            },
            {
                label: '操作人',
                prop: 'operator',
                minWidth: '120px',
            },
            {
                label: '更新时间',
                prop: 'updateTime',
                minWidth: '170px',
            },
            {
                label: '创建时间',
                prop: 'createTime',
                minWidth: '170px',
            },
            {
                label: '操作',
                prop: 'action',
                width: '200px',
                fixed: 'right',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button type="text" onClick={() => this.handlePreview(row)}>
                                预览
                            </el-button>
                            <el-button type="text" onClick={() => this.handleEdit(row)}>
                                编辑
                            </el-button>
                            <el-button type="text" danger onClick={() => this.handleDelete(row)}>
                                删除
                            </el-button>
                        </div>
                    )
                },
            },
        ]

        return {
            load: async (params: any = {}) => {
                const { data } = await list(params)
                return {
                    result: data.data,
                    total: data.total,
                }
            },
            columns,
        }
    }

    /** 新增 */
    async handleAdd() {
        const result = await this.$modalDialog(() => import('./components/type-select-dialog/index.vue'))
        if (result) {
            this.$router.push(`/law-supervision/publicity/pre-publicity/add?type=${result}`)
        }
    }

    /** 预览 */
    handlePreview(row: PublicityVO) {
        this.$router.push(`/law-supervision/publicity/pre-publicity/preview?id=${row.id}`)
    }

    /** 编辑 */
    handleEdit(row: PublicityVO) {
        this.$router.push(`/law-supervision/publicity/pre-publicity/add?id=${row.id}`)
    }

    /** 删除 */
    async handleDelete(row: PublicityVO) {
        try {
            await this.$confirm('确定要删除该条记录吗？', '提示', {
                type: 'warning',
            })
            await remove({ id: row.id })
            this.$message.success('删除成功')
            this.tableRef.onLoad()
        } catch (error) {
            console.error(error)
        }
    }
}
</script>

<style lang="less" scoped>
.PrePublicity ::v-deep {
    padding: 0px;
}
</style>
