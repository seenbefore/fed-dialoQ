<template>
    <div class="sg-page icinfo-ai CaseSave">
        <!-- Steps indicator -->
        <div class="steps-wrapper">
            <el-steps :active="2" align-center>
                <el-step title="卷宗封面" status="success"></el-step>
                <el-step title="卷宗目录"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
        </div>
        <!-- Main content -->
        <div class="content">
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
                    <el-button icon="el-icon-plus" type="text">在线选择</el-button>
                    <el-button icon="el-icon-plus" type="text">本地上传</el-button>
                </div>
                <DraggableDirectory v-model="directoryList" :key="activeTab" v-bind="getDraggableDirectoryAttrs"></DraggableDirectory>
            </div>
        </div>

        <!-- Fixed bottom action bar -->
        <div class="fixed-bottom">
            <el-button @click="handleCancel">上一步</el-button>
            <el-button @click="handleCancel">暂存</el-button>
            <el-button @click="handleCancel">预览</el-button>
            <el-button type="primary" @click="handleNext">提交</el-button>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, FormRef } from '@/sharegood-ui'
import DraggableDirectory from '@/views/file-review/my-case/save/components/draggable-directory/index.vue'

@Component({
    name: 'CaseSave',
    components: {
        DraggableDirectory,
    },
})
export default class CaseSave extends Vue {
    public activeTab = '1'
    handleTabClick(tab: string) {
        //this.activeTab = tab
    }
    get getDraggableDirectoryAttrs() {
        return {
            columns: [
                { prop: 'index', label: '序号', width: '50px' },
                { prop: 'code', label: '文号', width: '100px' },
                { prop: 'name', label: '文书/证据名称', width: '200px' },
                { prop: 'page', label: '页码', width: '100px' },
            ],
            actions: [
                { key: 'delete', icon: 'el-icon-delete' },
                { key: 'preview', icon: 'el-icon-view' },
            ],
        }
    }

    public viewPdfSrc = ''
    @Ref('formRef')
    formRef!: FormRef

    directoryList: any[] = [
        {
            id: 1,
            index: 1,
            name: '卷宗封面',
            code: '1',
            page: 1,
        },
        {
            id: 2,
            index: 2,
            name: '卷宗目录',
            code: '2',
            page: 2,
        },
    ]

    /**提交 */
    async handleNext() {}

    handleCancel() {
        this.$router.back()
    }
}
</script>

<style lang="less" scoped>
.CaseSave {
    padding: 0 !important;
    height: 100%;
    display: flex !important;
    flex-direction: column;
    .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
        text-align: center;
    }
    .meta {
        text-align: right;
        margin-bottom: 7px;
    }

    .steps-wrapper {
        padding: 20px;
        background: #fff;
        border-bottom: 1px solid #eee;
        //flex: 0 0 auto;
    }

    .content {
        padding: 20px;
        overflow-y: auto;
        //height: calc(100% - 60px - 100px); // 减去底部操作栏高度和步骤条高度
        flex: 1;
    }

    .fixed-bottom {
        height: 50px;
        padding: 0 20px;
        display: flex;
        //flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-top: 1px solid #ddd;

        .el-button {
            margin-left: 10px;
        }
    }
}
</style>
