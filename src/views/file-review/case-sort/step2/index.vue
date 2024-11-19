<template>
    <div class="sg-page icinfo-ai CaseSave">
        <!-- Steps indicator -->
        <div class="steps-wrapper">
            <el-steps :active="2" align-center>
                <el-step title="卷宗封面" status="success"></el-step>
                <el-step title="卷内备考表"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
        </div>
        <!-- Main content -->
        <div class="content">
            <!-- 表单 -->
            <!-- 表单区域 -->
            <div class="inner">
                <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel"></sg-base-form>
            </div>
        </div>

        <!-- Fixed bottom action bar -->
        <div class="fixed-bottom">
            <el-button @click="handleCancel">上一步</el-button>

            <el-button type="primary" @click="handleNext">提交</el-button>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, FormRef } from '@/sharegood-ui'

@Component({
    name: 'CaseSave',
    components: {},
})
export default class CaseSave extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    formModel: Record<string, any> = {}
    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                columns: [
                    {
                        span: 24,
                        tag: 'input',
                        name: 'description',
                        itemAttrs: {
                            label: '本卷情况说明',
                            rules: [
                                { required: true, message: '请输入本卷情况说明' },
                                { max: 500, message: '最多输入500字' },
                            ],
                        },
                        attrs: {
                            type: 'textarea',
                            rows: 6,
                            placeholder: '请输入',
                            maxlength: 500,
                            'show-word-limit': true,
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'creator',
                        itemAttrs: {
                            label: '立卷人',
                            rules: [
                                { required: true, message: '请输入立卷人' },
                                { max: 50, message: '最多输入50字' },
                            ],
                        },
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 50,
                        },
                    },
                    {
                        tag: 'date',
                        name: 'createTime',
                        itemAttrs: {
                            label: '立卷时间',
                            rules: [{ required: true, message: '请选择立卷时间' }],
                        },
                        attrs: {
                            type: 'date',
                            placeholder: '请选择日期',
                            'value-format': 'yyyy-MM-dd',
                            'picker-options': {
                                disabledDate: (time: Date) => {
                                    return time.getTime() > Date.now()
                                },
                            },
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'reviewer',
                        itemAttrs: {
                            label: '检查人',
                            rules: [
                                { required: true, message: '请输入检查人' },
                                { max: 50, message: '最多输入50字' },
                            ],
                        },
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 50,
                        },
                    },
                    {
                        tag: 'date',
                        name: 'reviewTime',
                        itemAttrs: {
                            label: '检查时间',
                            rules: [{ required: true, message: '请选择检查时间' }],
                        },
                        attrs: {
                            type: 'date',
                            placeholder: '请选择日期',
                            'value-format': 'yyyy-MM-dd',
                            'picker-options': {
                                disabledDate: (time: Date) => {
                                    return time.getTime() > Date.now()
                                },
                            },
                        },
                    },
                ],
            },
        ]

        return {
            span: 12,
            fields,
        }
    }
    /**提交 */
    async handleNext() {
        await this.formRef.validate(null, true)
        this.$message.success('保存成功')
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
    .inner {
        max-width: 800px;
        margin: 0 auto;
    }
}
</style>
