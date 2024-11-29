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
                                <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
                        <el-button size="small" type="primary" icon="el-icon-upload">本地上传</el-button>
                    </el-upload> -->
                            </div>
                            <DraggableDirectory v-model="mainVolumeList" :key="activeTab" v-bind="getDraggableDirectoryAttrs" :confirm-message="'确定从卷宗目录中移除吗？'"></DraggableDirectory>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="副卷" name="2">22</el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import DraggableDirectory from '@/components/draggable-table/index.vue'
import { list } from './api'
import { useNoRemindConfirm } from '@/components/confirmDialog/useConfirm'
import { appStore } from '@/store/useStore'
//appStore.reset()

/** 卷宗目录组件 */
export interface CaseStepCatalogClass {
    /** 获取表单数据 */
    submit: () => Promise<any>
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
                volumeRecordId: '9E5898C362074598B4EDC9EB9C1335A2',
            })
            this.mainVolumeList = data.mainVolumeList
            this.subVolumeList = data.subVolumeList
            console.log('data', data)
            //this.directoryList = data
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
                { prop: 'sort', label: '序号', width: '50px', align: 'center' },
                { prop: 'documentNumber', label: '文号', width: '300px' },
                { prop: 'documentEvidenceName', label: '文书/证据名称', minWidth: '200px' },
                { prop: 'pageNumber', label: '页码', width: '50px', align: 'center' },
            ],
            actions: [
                { key: 'delete', icon: 'el-icon-delete', handler: this.handleDelete },
                { key: 'move', icon: 'el-icon-right', tooltip: activeTab === '1' ? '正卷移动到副卷' : '副卷移动到正卷', handler: this.handleMove },
            ],
        }
    }
    directoryList: any[] = [
        {
            sort: 1,
            documentNumber: '123',
            documentEvidenceName: '文书/证据名称',
        },
    ]
    mainVolumeList: any[] = []
    subVolumeList: any[] = []
    // 正副卷相互移动
    async handleMove(data: any) {
        const { activeTab } = this
        console.log('handleMove', activeTab, data)
        const result = await useNoRemindConfirm({
            message: `${activeTab === '1' ? '正卷' : '副卷'}移动到${activeTab === '1' ? '副卷' : '正卷'}吗？`,
            onNoRemindChange: checked => {
                appStore.setDontShowMoveConfirm(checked)
            },
        })
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
        const defaultCheckedKeys = this.directoryList.map(item => item.documentEvidenceUrl)
        const result = await this.$modalDialog(() => import('@/views/file-review/components/case-doc-config-dialog/index.vue'), {
            type: 'add',
            value: defaultCheckedKeys,
            volumeRecordId: this.$route.query.id,
            volumeType: this.activeTab,
        })
        if (result) {
            console.log('result', result)
            this.directoryList = result.map((item: any) => ({
                ...item,
            }))
        }
    }
    /** 获取排序数据 */
    getSortData() {
        const list = this.directoryList.map((item: any, idx: number) => {
            return {
                sort: idx + 1,
                documentEvidenceId: item.documentId || item.documentEvidenceId,
                documentEvidenceName: item.documentKindName || item.documentEvidenceName,
                documentEvidenceCode: item.documentKindCode || item.documentEvidenceCode,
                documentEvidenceUrl: item.documentUrl || item.documentEvidenceUrl,
                documentNumber: item.documentNumber,
                pageNumber: item.pageNumber,
                pageCount: item.pageCount,
            }
        })
        return list
        // const { caseId, archiveId } = this.row
        // const payload: any = {
        //     caseId,
        //     archiveId,
        //     archiveCatalogContentList: list,
        // }
        // const { data } = await calculateElectricArchivePageNumberApi(payload)
        // return data
    }
    async submit() {
        const list = this.getSortData()
        return list
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
