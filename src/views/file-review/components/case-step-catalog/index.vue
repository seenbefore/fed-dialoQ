<template>
    <div class="Step2" v-loading.lock="loading" element-loading-text="加载中...">
        <div class="inner">
            <!-- 正副卷tab -->
            <div class="tabs-wrapper">
                <el-tabs v-model="activeTab" @tab-click="handleTabClick">
                    <el-tab-pane label="正卷" name="1">
                        <!-- 可拖拽的卷宗目录列表 -->
                        <div class="directory-list">
                            <div class="title">{{ activeTab === '1' ? '正卷' : '副卷' }}目录</div>
                            <div class="meta">
                                <el-button icon="el-icon-plus" type="primary" @click="handleAdd" style="margin-right: 10px">在线选择</el-button>
                            </div>

                            <!-- {{ mainVolumeList }} -->
                            <DraggableDirectory
                                v-model="mainVolumeList"
                                :key="activeTab"
                                v-bind="getDraggableDirectoryAttrs"
                                :confirm-message="'确定从卷宗目录中移除吗？'"
                                @remove="handlePageChange"
                                @drag-end="handlePageChange"
                                id-key="id"
                            ></DraggableDirectory>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="副卷" name="2" v-if="subVolumeList.length > 0">
                        <!-- 可拖拽的卷宗目录列表 -->
                        <div class="directory-list">
                            <div class="title">{{ activeTab === '1' ? '正卷' : '副卷' }}目录</div>
                            <div class="meta">
                                <el-button icon="el-icon-plus" type="primary" @click="handleAdd" style="margin-right: 10px">在线选择</el-button>
                            </div>

                            <DraggableDirectory
                                v-model="subVolumeList"
                                :key="activeTab"
                                v-bind="getDraggableDirectoryAttrs"
                                :confirm-message="'确定从卷宗目录中移除吗？'"
                                id-key="id"
                                @remove="handlePageChange"
                                @drag-end="handlePageChange"
                            ></DraggableDirectory>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import DraggableDirectory from '@/components/draggable-table/index.vue'
import { list, calculatePageNumbers } from './api'
import { useNoRemindConfirm } from '@/components/confirmDialog/useConfirm'
import { appStore } from '@/store/useStore'
//appStore.reset()

/** 卷宗目录组件 */
export interface CaseStepCatalogClass {
    /** 获取表单数据 */
    submit: () => Promise<{ mainVolumeList: any[]; subVolumeList: any[] }>
}
/** 卷宗目录 */
@Component({
    name: 'Step2',
    components: {
        DraggableDirectory,
    },
})
export default class Step2 extends Vue {
    @Prop({ default: () => ({}) }) row!: any
    @Watch('row.id', { immediate: true, deep: true })
    onRowChange(val: any) {
        console.log('onRowChange', val)
        if (val) {
            this.id = val
        }
    }
    id = ''
    loading = false
    mounted() {
        console.log('Step2 mounted')
        this.getInitDocs()
    }
    /** 获取初始化的目录文书 */
    async getInitDocs() {
        try {
            this.loading = true
            // "9E5898C362074598B4EDC9EB9C1335A2"
            // const { archiveId = '', caseId = 'ef01c4aad3f942e38d7f6c6fc3284316' } = this.row
            let { data } = await list({
                volumeRecordId: this.id,
            })
            this.mainVolumeList = data.mainVolumeList.map(item => {
                return {
                    id: item.documentId,
                    label: item.documentName,
                    value: item.documentId,
                    ...item,
                }
            })
            this.subVolumeList = data.subVolumeList.map(item => {
                return {
                    id: item.documentId,
                    label: item.documentName,
                    value: item.documentId,
                    ...item,
                }
            })
            console.log('data', data)

            this.loading = false
        } catch (err) {
            this.loading = false
            console.error(err)
        }
    }

    public activeTab = '1'
    handleTabClick(tab: string) {}
    get getDraggableDirectoryAttrs() {
        const { activeTab } = this
        return {
            columns: [
                {
                    prop: 'sortNo',
                    label: '序号',
                    width: '50px',
                    align: 'center',
                    render: (h, { index, row }) => {
                        const result = index + 1
                        return <span>{result}</span>
                    },
                },
                { prop: 'documentCode', label: '文号', width: '300px' },
                {
                    prop: 'documentName',
                    label: '文书/证据名称',
                    flex: '1',
                    render: (h, { index, row }) => {
                        const result = row['documentName']
                        return (
                            <el-button type="text" onClick={() => this.handleDocumentNameClick(row)}>
                                {result}
                            </el-button>
                        )
                    },
                },
                { prop: 'pageNumber', label: '页码', width: '50px', align: 'center' },
            ],
            actions: [
                { key: 'delete', icon: 'el-icon-delete', handler: this.handleDelete },
                { key: 'move', icon: 'el-icon-right', tooltip: activeTab === '1' ? '正卷移动到副卷' : '副卷移动到正卷', handler: this.handleMove },
            ],
        }
    }
    async handleDocumentNameClick(row: any) {
        const documentUrl = row.documentUrl
        await this.$modalDialog(() => import('@/views/file-review/components/file-dialog/index.vue'), {
            fileUrl: documentUrl,
        })
        console.log('handleDocumentNameClick', row)
    }
    // 主卷
    mainVolumeList: any[] = []
    // @Watch('mainVolumeList')
    // async onMainVolumeListChange(val: any[], oldVal: any[]) {
    //     console.log('onMainVolumeListChange', val.length, oldVal.length)
    //     if (val.length === oldVal.length) return
    //     console.log('onMainVolumeListChange', val)
    //     const { data } = await calculatePageNumbers({
    //         volumeList: val,
    //     })
    //     this.mainVolumeList = data.map(item => {
    //         return {
    //             id: item.catalogCode,
    //             ...item,
    //         }
    //     })
    // }
    // 副卷
    subVolumeList: any[] = []
    // @Watch('subVolumeList')
    // async onSubVolumeListChange(val: any[], oldVal: any[]) {
    //     if (val.length === oldVal.length) return
    //     console.log('onSubVolumeListChange', val)
    //     const { data } = await calculatePageNumbers({
    //         volumeList: val,
    //     })
    //     this.subVolumeList = data.map(item => {
    //         return {
    //             id: item.catalogCode,
    //             ...item,
    //         }
    //     })
    // }
    async handlePageChange(val: any, key?: string) {
        const { data } = await calculatePageNumbers({
            volumeList: val,
        })

        if (this.activeTab === '1') {
            this.mainVolumeList = this.mainVolumeList.map((item: any, index: any) => {
                return {
                    ...item,
                    pageNumber: data[index].pageNumber,
                }
            })
        } else {
            this.subVolumeList = data.map((item: any, index: number) => {
                return {
                    ...item,
                    pageNumber: data[index].pageNumber,
                }
            })
        }
    }

    // 正副卷相互移动
    async handleMove(row: any, context: any, index: number) {
        const { activeTab } = this
        console.log('handleMove', activeTab, row, index)
        await useNoRemindConfirm({
            message: `${activeTab === '1' ? '正卷' : '副卷'}移动到${activeTab === '1' ? '副卷' : '正卷'}吗？`,
            onNoRemindChange: checked => {
                appStore.setDontShowMoveConfirm(checked)
            },
        })
        // if (this.activeTab === '1') {
        //     this.subVolumeList.push(row)
        //     this.mainVolumeList.splice(index, 1)
        // } else {
        //     this.mainVolumeList.push(row)
        //     this.subVolumeList.splice(index, 1)
        // }
        if (this.activeTab === '1') {
            try {
                this.subVolumeList.push(row)
                const { data } = await calculatePageNumbers({
                    volumeList: this.subVolumeList,
                })
                this.subVolumeList = this.subVolumeList.map((item: any, index: number) => {
                    return {
                        ...item,
                        pageNumber: data[index].pageNumber,
                    }
                })
            } catch (error) {}
            try {
                this.mainVolumeList.splice(index, 1)
                const { data } = await calculatePageNumbers({
                    volumeList: this.mainVolumeList,
                })
                this.mainVolumeList = this.mainVolumeList.map((item: any, index: any) => {
                    return {
                        ...item,
                        pageNumber: data[index].pageNumber,
                    }
                })
            } catch (error) {}
        } else {
            try {
                this.mainVolumeList.push(row)
                const { data } = await calculatePageNumbers({
                    volumeList: this.mainVolumeList,
                })
                this.mainVolumeList = this.mainVolumeList.map((item: any, index: any) => {
                    return {
                        ...item,
                        pageNumber: data[index].pageNumber,
                    }
                })
            } catch (error) {}
            try {
                this.subVolumeList.splice(index, 1)
                const { data } = await calculatePageNumbers({
                    volumeList: this.subVolumeList,
                })
                this.subVolumeList = this.subVolumeList.map((item: any, index: number) => {
                    return {
                        ...item,
                        pageNumber: data[index].pageNumber,
                    }
                })
            } catch (error) {}
        }
    }
    async handleDelete(data: any, context: any) {
        const { $dontShowDeleteConfirm } = appStore
        if ($dontShowDeleteConfirm) {
            context.removeItem(data)
            return
        }
        await useNoRemindConfirm({
            message: '确定从卷宗目录中移除吗？',
            onNoRemindChange: checked => {
                appStore.setDontShowDeleteConfirm(checked)
            },
        })
        context.removeItem(data)
    }
    async handleAdd() {
        const list = this.activeTab === '1' ? this.mainVolumeList : this.subVolumeList
        const defaultCheckedKeys = list.map(item => item.id)
        const { addNodes } = await this.$modalDialog(() => import('@/views/file-review/components/case-doc-config-dialog/index.vue'), {
            type: 'add',
            defaultCheckedKeys: defaultCheckedKeys,
            volumeRecordId: this.id,
            volumeType: this.activeTab,
            value: [...list],
        })
        console.log('addNodes', addNodes)
        if (addNodes) {
            const _addNodes = addNodes.map(item => {
                return {
                    ...item,
                }
            })

            let list = this.activeTab === '1' ? this.mainVolumeList : this.subVolumeList
            list.push(..._addNodes)
            try {
                const { data } = await calculatePageNumbers({
                    volumeList: list,
                })
                if (this.activeTab === '1') {
                    this.mainVolumeList = this.mainVolumeList.map((item: any, index: any) => {
                        return {
                            ...item,
                            pageNumber: data[index].pageNumber,
                        }
                    })
                } else {
                    this.subVolumeList = this.subVolumeList.map((item: any, index: number) => {
                        return {
                            ...item,
                            pageNumber: data[index].pageNumber,
                        }
                    })
                }
            } catch (error) {}
        }
    }

    async submit() {
        const mainVolumeList = this.mainVolumeList.map((item: any, index: number) => {
            const { sortNo, id, label, value, ...rest } = item
            const serialNumber = index + 1
            return {
                ...rest,
                serialNumber,
            }
        })
        const subVolumeList = this.subVolumeList.map((item: any, index: number) => {
            const { sortNo, id, label, value, ...rest } = item
            const serialNumber = index + 1
            return {
                ...rest,
                serialNumber,
            }
        })

        return {
            mainVolumeList,
            subVolumeList,
        }
    }
}
</script>
<style lang="less" scoped>
.Step2 {
    position: relative;
    .title {
        margin: 0;
        color: #000;
        text-align: center;
        font-weight: 400;
        font-size: 24px;
        font-family: STSongti-SC-Bold;
    }
    .meta {
        margin-bottom: 7px;
        display: flex;
        justify-content: flex-end;
    }
    .inner {
        width: 80%;
        max-width: 900px;
        margin: 0 auto;
    }
}
</style>
