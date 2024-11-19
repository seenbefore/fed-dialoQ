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
            <!-- 可拖拽的卷宗目录列表 -->
            <DraggableDirectory v-model="directoryList"></DraggableDirectory>
            <my-iframe-pdf class="pdf-iframe" :pdf-src="viewPdfSrc" v-show="isToView"></my-iframe-pdf>
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
    private isToView = false
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

    formModel: Record<string, any> = {}

    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                columns: [
                    {
                        span: 24,
                        name: 'caseTitle',
                        tag: 'input',
                        itemAttrs: {
                            label: '案件标题：',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入案件标题',
                                },
                            ],
                        },
                        attrs: {
                            placeholder: '请输入案件标题',
                            maxlength: 100,
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        name: 'caseDesc',
                        tag: 'input',
                        itemAttrs: {
                            label: '案件描述：',
                        },
                        attrs: {
                            type: 'textarea',
                            placeholder: '请输入案件描述',
                            maxlength: 500,
                            rows: 4,
                        },
                    },
                ],
            },
        ]

        return {
            span: 24,
            fields,
        }
    }

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
