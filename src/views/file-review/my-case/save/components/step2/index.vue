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
import DraggableDirectory from '@/views/file-review/my-case/components/draggable-directory/index.vue'
import { getCaseElectricArchiveDocumentListApi } from './api'
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
                index: index + 1,
            }
        })
        console.log('data', data)
        this.directoryList = data
    }

    public activeTab = '1'
    handleTabClick(tab: string) {
        //this.activeTab = tab
    }
    get getDraggableDirectoryAttrs() {
        return {
            columns: [
                { prop: 'index', label: '序号', width: '50px' },
                { prop: 'documentNumber', label: '文号', width: '100px' },
                { prop: 'documentEvidenceName', label: '文书/证据名称', width: '200px' },
                { prop: 'pageNumber', label: '页码', width: '100px' },
            ],
            actions: [
                { key: 'delete', icon: 'el-icon-delete' },
                { key: 'preview', icon: 'el-icon-view' },
            ],
        }
    }
    directoryList: any[] = []

    async handleAdd() {
        const result = await this.$modalDialog(() => import('@/views/file-review/components/case-doc-config-dialog/index.vue'), {
            type: 'add',
        })
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
