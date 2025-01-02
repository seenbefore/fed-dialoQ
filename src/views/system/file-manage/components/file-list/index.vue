<template>
    <div class="FileList">
        <div class="file-list-header">
            <div class="search-bar">
                <el-input v-model="formModel.keyword" placeholder="搜索文件名" prefix-icon="el-icon-search" clearable @input="handleSearch"></el-input>
            </div>
            <div class="action-bar">
                <el-button type="primary" @click="handleUpload">
                    <i class="el-icon-upload"></i>
                    上传
                </el-button>
                <el-button type="primary" @click="handleBatchDelete" :disabled="!selected.length">
                    <i class="el-icon-delete"></i>
                    批量删除
                </el-button>
            </div>
        </div>
        <sg-data-view v-bind="getTableAttrs" ref="tableRef" @selection-change-all="handleSelectionChange"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { list, remove, removeBatch, download, preview, FileVO } from '../../api'
import { usePreview, useUrlDownload } from '@/hooks'
@Component({
    name: 'FileList',
})
export default class FileList extends Vue {
    /** 当前选中的文件类型 */
    @Prop({ default: 'all' }) readonly type!: string

    @Ref('tableRef')
    tableRef!: TableRef

    formModel = {
        keyword: '',
        type: this.type,
    }

    selected: any[] = []

    // 添加下载状态追踪对象
    downloadingMap: Record<string, boolean> = {}

    getFileIcon(type: string) {
        const iconMap: Record<string, string> = {
            doc: 'el-icon-document',
            image: 'el-icon-picture',
            video: 'el-icon-video-camera',
            audio: 'el-icon-headset',
            other: 'el-icon-more',
        }
        return iconMap[type] || 'el-icon-document'
    }

    handleSelectionChange(selection: any[]) {
        this.selected = selection
    }

    handleUpload() {
        // TODO: 实现文件上传
    }

    async handlePreview(row: FileVO) {
        if (row.name.includes('.pdf')) {
            await usePreview('https://continew-admin.file.continew.top/2024/10/14/670d26cc14cd75d8e1e4b7da.pdf')
            return
        }
        await usePreview('https://cdn-kb.worktile.com/kb/wp-content/uploads/2024/11/1fa84796-7140-4cca-82aa-87b38722cc42.webp')
    }

    async handleDownload(row: FileVO) {
        // 设置当前文件下载状态为 true
        this.$set(this.downloadingMap, row.id, true)

        try {
            await useUrlDownload('https://continew-admin.file.continew.top/2024/10/14/670d26cc14cd75d8e1e4b7da.pdf')
        } catch (error) {
            console.error(error)
        } finally {
            // 下载完成后设置状态为 false
            this.$set(this.downloadingMap, row.id, false)
        }
    }

    async handleDelete(row: FileVO) {
        try {
            await this.$confirm('确定要删除该文件吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
            await remove({ id: row.id } as any)
            this.$message.success('删除成功')
            this.handleSearch()
        } catch (error) {
            console.log('取消删除')
        }
    }

    async handleBatchDelete() {
        if (!this.selected.length) return
        try {
            await this.$confirm(`确定要删除选中的${this.selected.length}个文件吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
            await removeBatch({ ids: this.selected.map(item => item.id) } as any)
            this.$message.success('删除成功')
            this.handleSearch()
        } catch (error) {
            console.log('取消删除')
        }
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    /** 列表展示配置项 */
    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                type: 'selection',
                width: '55px',
                fixed: 'left',
            },
            {
                label: '文件名',
                prop: 'name',
                minWidth: '200px',
                align: 'left',
            },
            {
                label: '文件格式',
                prop: 'type',
                width: '120px',
                render: (h, { row }) => {
                    const typeMap: Record<string, string> = {
                        doc: '文档',
                        image: '图片',
                        video: '视频',
                        audio: '音频',
                        other: '其他',
                    }
                    return typeMap[row.type] || '其他'
                },
            },
            {
                label: '大小',
                prop: 'size',
                width: '120px',
            },
            {
                label: '修改时间',
                prop: 'updateTime',
                width: '180px',
            },
            {
                label: '操作',
                prop: 'action',
                width: '150px',
                fixed: 'right',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button type="text" onClick={() => this.handlePreview(row)}>
                                预览
                            </el-button>
                            <el-button type="text" loading={this.downloadingMap[row.id]} onClick={() => this.handleDownload(row)}>
                                下载
                            </el-button>
                            <el-button type="text" style="color: #F56C6C" onClick={() => this.handleDelete(row)}>
                                删除
                            </el-button>
                        </div>
                    )
                },
            },
        ]

        return {
            // 表格滚动吸顶
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.FileList'),
            },
            // 跨页勾选数据
            multipleSelectionAll: [],
            // 唯一匹配的字段
            idKey: 'id',
            // 返回数据格式要求 { result: [], total: 0 }
            load: async (params: any = {}) => {
                const { data } = await list({
                    ...params,
                    ...this.formModel,
                } as any)
                return {
                    result: data.data,
                    total: data.recordsTotal,
                }
            },
            columns,
        }
    }

    @Watch('type')
    onTypeChange(val: string) {
        this.formModel.type = val
        this.handleSearch()
    }
}
</script>

<style lang="less" scoped>
.FileList {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 20px;

    .file-list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .search-bar {
            width: 300px;
        }

        .action-bar {
            .el-button {
                margin-left: 10px;
            }
        }
    }

    .file-name {
        display: flex;
        align-items: center;

        i {
            margin-right: 8px;
            font-size: 18px;
        }
    }
}
</style>
