<template>
    <div class="Step2">
        <!-- 正副卷tab -->
        <div class="tabs-wrapper">
            <el-tabs v-model="activeTab" @tab-click="handleTabClick">
                <el-tab-pane label="正卷" name="1"></el-tab-pane>
                <el-tab-pane label="副卷" name="2"></el-tab-pane>
            </el-tabs>
        </div>
        <!-- 可拖拽的卷宗目录列表 -->
        <div class="directory-list">
            <div class="title">{{ activeTab === '1' ? '正卷' : '副卷' }}目录</div>
            <div class="meta">
                <el-button icon="el-icon-plus" type="primary" @click="handleAdd">在线选择</el-button>
                <el-button icon="el-icon-plus" type="primary">本地上传</el-button>
            </div>
            <DraggableDirectory v-model="directoryList" :key="activeTab" v-bind="getDraggableDirectoryAttrs"></DraggableDirectory>
        </div>
    </div>
</template>
<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import DraggableDirectory from '@/views/file-review/components/draggable-directory/index.vue'
import { getCaseElectricArchiveDocumentListApi, calculateElectricArchivePageNumberApi } from './api'
@Component({
    name: 'Step2',
    components: {
        DraggableDirectory,
    },
})
export default class Step2 extends Vue {
    @Prop({ default: () => ({}) }) row!: any
    mounted() {
        console.log('Step2 mounted')
        this.getInitDocs()
    }
    /** 获取初始化的目录文书 */
    async getInitDocs() {
        const { archiveId = '', caseId = 'ef01c4aad3f942e38d7f6c6fc3284316' } = this.row
        let { data } = await getCaseElectricArchiveDocumentListApi({
            archiveId,
            caseId,
        })
        data = data.map((item: any, index) => {
            return {
                ...item,
            }
        })
        console.log('data', data)
        this.directoryList = data
    }

    public activeTab = '1'
    handleTabClick(tab: string) {
        console.log('handleTabClick', tab)
        if (this.activeTab === '2') {
            this.directoryList = []
        } else {
            this.getInitDocs()
        }
    }
    get getDraggableDirectoryAttrs() {
        return {
            columns: [
                { prop: 'sort', label: '序号', width: '50px', align: 'center' },
                { prop: 'documentNumber', label: '文号', width: '300px' },
                { prop: 'documentEvidenceName', label: '文书/证据名称', minWidth: '200px' },
                { prop: 'pageNumber', label: '页码', width: '50px', align: 'center' },
            ],
            actions: [
                { key: 'delete', icon: 'el-icon-delete' },
                { key: 'preview', icon: 'el-icon-view' },
            ],
        }
    }
    directoryList: any[] = []

    async handleAdd() {
        const defaultCheckedKeys = this.directoryList.map(item => item.documentEvidenceUrl)
        const result = await this.$modalDialog(() => import('@/views/file-review/components/case-doc-config-dialog/index.vue'), {
            type: 'add',
            value: defaultCheckedKeys,
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
    .title {
        margin: 0;
        color: #000;
        text-align: center;
        font-weight: 400;
        font-size: 24px;
        font-family: STSongti-SC-Bold;
    }
    .meta {
        text-align: right;
        margin-bottom: 7px;
    }
}
</style>
