<!-- src/views/question-bank/paper/components/paper-drawer/index.vue -->
<template>
    <el-drawer class="PaperDrawer" :title="title" :visible="true" :before-close="cancel" size="1200px">
        <div class="drawer-container" v-loading="loading">
            <!-- 基本信息 -->
            <div class="detail-section">
                <div class="detail-title">基本信息</div>
                <sg-base-form ref="formRef" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
            </div>

            <!-- 答题详情 -->
            <div class="detail-section">
                <div class="detail-title">答题详情</div>
                <sg-base-form ref="formRef2" v-model="formModel2" v-bind="getFormAttrs2" @submit="handleSearch" @reset="handleSearch"></sg-base-form>
                <sg-data-view v-bind="getTableAttrs" ref="tableRef">
                    <template #header>
                        <el-button type="primary" @click="handleExportAll">导出全部</el-button>
                        <span class="sg-ml-3">本场考试共有{{ count.total }}人答题，其中通过{{ count.pass }}人，未通过{{ count.fail }}人。</span>
                    </template>
                </sg-data-view>
            </div>
        </div>
    </el-drawer>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { getExamRecordDetail, ExamRecordDetailVO, getExamRecordPageList, getExamRecordExportList } from '../../api'
import RenderExport from '@/sharegood-ui/src/utils/renderExport'
import moment from 'moment'

@Component({
    name: 'PaperDrawer',
})
export default class PaperDrawer extends Vue {
    /** 试卷ID */
    @Prop({ required: true }) paperId!: string
    @Prop({ default: () => ({}) }) data!: any

    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef

    loading = false
    formModel: Partial<ExamRecordDetailVO> = {
        ...this.data,
    }
    formModel2: any = {
        paperId: this.paperId,
    }
    mounted() {
        this.getAllData()
    }
    private count = {
        total: 0,
        pass: 0,
        fail: 0,
    }
    async getAllData() {
        const { data } = await getExamRecordPageList({
            length: 1000,
            paperId: this.paperId,
            pageNum: 1,
        })
        this.count.total = data.total
        this.count.pass = data.data.filter((item: any) => item.isPass === '1').length
        this.count.fail = data.data.filter((item: any) => item.isPass === '0').length
    }
    get title() {
        return this.data.paperName
    }

    async handleExportAll() {
        // 获取导出数据
        const { data } = await getExamRecordExportList({
            paperId: this.paperId,
        })

        // 定义基础列配置
        const baseColumns = [
            { prop: 'userName', label: '姓名', width: 100 },
            { prop: 'studentNo', label: '学号', width: 100 },
            { prop: 'mobile', label: '手机号', width: 120 },
            { prop: 'idCard', label: '身份证号', width: 150 },
            { prop: 'orgName', label: '单位名称', width: 200 },
            { prop: 'answerCount', label: '答题数', width: 80 },
            {
                prop: 'score',
                label: '得分',
                width: 80,
                exportRender: (row: any) => ({
                    v: row.score,
                    s: {
                        fill: {
                            fgColor: { rgb: row.isPass === '1' ? '92D050' : 'FF0000' },
                        },
                    },
                }),
            },
            {
                prop: 'isPass',
                label: '是否通过',
                width: 80,
                exportRender: (row: any) => ({
                    v: row.isPass === '1' ? '通过' : '未通过',
                }),
            },
        ]

        // 根据第一条记录的答题详情生成动态列
        const questionColumns =
            data[0]?.answerDetails?.map((question: any, index: number) => ({
                prop: `question${index + 1}`,
                label: question.questionContent,
                width: 600,
                children: [
                    {
                        prop: `q${index + 1}Result`,
                        label: '答题结果',
                        width: 100,
                        exportRender: (row: any) => ({
                            v: row.answerDetails[index].isCorrect === '1' ? '正确' : '错误',
                            s: {
                                fill: {
                                    fgColor: { rgb: row.answerDetails[index].isCorrect === '1' ? '92D050' : 'FF0000' },
                                },
                            },
                        }),
                    },
                    {
                        prop: `q${index + 1}Answer`,
                        label: '考生答案',
                        width: 100,
                        exportRender: (row: any) => ({
                            v: row.answerDetails[index].userAnswer,
                        }),
                    },
                    {
                        prop: `q${index + 1}Correct`,
                        label: '正确答案',
                        width: 100,
                        exportRender: (row: any) => ({
                            v: row.answerDetails[index].correctAnswer,
                        }),
                    },
                    {
                        prop: `q${index + 1}Options`,
                        label: '选项',
                        width: 200,
                        exportRender: (row: any) => ({
                            v: row.answerDetails[index].questionOptions,
                        }),
                    },
                    {
                        prop: `q${index + 1}Score`,
                        label: '得分',
                        width: 80,
                        exportRender: (row: any) => ({
                            v: row.answerDetails[index].questionScore,
                        }),
                    },
                ],
            })) || []

        // 定义尾部列配置
        const endColumns = [
            { prop: 'actualStartTime', label: '开始时间', width: 150 },
            { prop: 'actualEndTime', label: '结束时间', width: 150 },
            { prop: 'duration', label: '答题时长(分钟)', width: 120 },
            { prop: 'userIp', label: 'IP地址', width: 120 },
            { prop: 'browserInfo', label: '浏览器', width: 100 },
            { prop: 'osInfo', label: '操作系统', width: 100 },
        ]

        // 合并所有列配置
        const columns = [...baseColumns, ...questionColumns, ...endColumns]

        // 使用RenderExport导出
        const exporter = new RenderExport(columns, {
            defaultValue: '-',
        })
        exporter.downloadExl(data, `${this.data.paperName}`)
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'text',
                name: 'isCompleted',
                itemAttrs: {
                    label: '考试状态',
                },
                render: (h, { row }) => {
                    return <el-tag type={row.isCompleted === '1' ? 'success' : 'warning'}>{row.isCompleted === '1' ? '已完成' : '未完成'}</el-tag>
                },
            },
            {
                tag: 'text',
                name: 'userIp',
                itemAttrs: {
                    label: '考试时间',
                },
                render: (h, { row }) => {
                    return (
                        <span>
                            {moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')} - {moment(row.endTime).format('YYYY-MM-DD HH:mm:ss')}
                        </span>
                    )
                },
            },
            {
                tag: 'text',
                name: 'osInfo',
                itemAttrs: {
                    label: '考试时长',
                },
                render: (h, { row }) => {
                    return <span>{row.duration}分钟</span>
                },
            },
        ]
        return {
            span: 12,
            fields,
        }
    }
    @Ref('formRef2')
    formRef2!: FormRef
    get getFormAttrs2() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'keyword',
                itemAttrs: {
                    label: '关键字',
                },
            },
            {
                tag: 'daterange',
                name: 'daterange',
                itemAttrs: {
                    label: '更新日期',
                },
            },
        ]
        return {
            autoAppendAction: true,
            fields,
        }
    }
    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
                fixed: 'left',
                width: '50px',
            },
            {
                label: '姓名',
                prop: 'userName',
                width: '100px',
                fixed: 'left',
            },
            {
                label: '学号',
                prop: 'studentNo',
                width: '120px',
            },
            {
                label: '手机号',
                prop: 'mobile',
                width: '120px',
                render: (h, { row }) => {
                    // 隐藏手机号中间四位
                    const mobile = row.mobile?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
                    return <span>{mobile}</span>
                },
            },
            {
                label: '答题数',
                prop: 'answerCount',
                width: '80px',
            },
            {
                label: '答题状态',
                prop: 'isCompleted',
                width: '100px',
                render: (h, { row }) => {
                    return <el-tag type={row.isCompleted === '1' ? 'success' : 'warning'}>{row.isCompleted === '1' ? '已完成' : '未完成'}</el-tag>
                },
            },
            {
                label: '得分',
                prop: 'score',
                width: '80px',
                render: (h, { row }) => {
                    return <span class={row.isPass === '1' ? 'text-success' : 'text-danger'}>{row.score}</span>
                },
            },
            {
                label: '结果    ',
                prop: 'isPass',
                width: '80px',
                render: (h, { row }) => {
                    return <el-tag type={row.isPass === '1' ? 'success' : 'danger'}>{row.isPass === '1' ? '通过' : '未通过'}</el-tag>
                },
            },

            {
                label: '开始时间',
                prop: 'actualStartTime',
                width: '160px',
            },
            {
                label: '结束时间',
                prop: 'actualEndTime',
                width: '160px',
            },
            {
                label: '答题时长',
                prop: 'duration',
                width: '100px',
                render: (h, { row }) => {
                    return <span>{row.duration}分钟</span>
                },
            },
            {
                label: '操作系统',
                prop: 'osInfo',
                width: '120px',
            },
            {
                label: '浏览器',
                prop: 'browserInfo',
                width: '120px',
            },
            {
                label: 'IP地址',
                prop: 'userIp',
                width: '130px',
            },

            {
                label: '操作',
                prop: 'userIp',
                width: '130px',
                fixed: 'right',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button type="text" size="small" onClick={() => this.handleDetail(row)}>
                                答卷详情
                            </el-button>
                        </div>
                    )
                },
            },
        ]

        return {
            pageActionLayout: [],
            columns,
            load: async (params: any) => {
                const { daterange, keyword } = this.formModel2
                const [startTime, endTime] = daterange || []

                const { data } = await getExamRecordPageList({
                    ...params,
                    paperId: this.paperId,
                    startTime,
                    endTime,
                    keyword,
                } as any)
                return {
                    total: data.total,
                    data: data.data,
                }
            },
        }
    }
    handleSearch() {
        this.tableRef.onLoad()
    }
    cancel() {
        this.$options.cancel?.()
    }
    handleDetail(row: any) {
        this.$modalDialog(() => import('./answer-detail-dialog/index.vue'), {
            paperId: this.paperId,
            userId: row.userId,
            data: row,
        })
    }
}
</script>

<style lang="less" scoped>
.PaperDrawer {
    ::v-deep {
        .drawer-container {
            padding: 20px;
            height: 100%;
            overflow-y: auto;
        }
        .detail-section {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .detail-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            padding-left: 10px;
            border-left: 4px solid var(--color-primary);
        }
        .score {
            font-size: 18px;
            font-weight: bold;
        }
        .el-form-item {
            margin-bottom: 15px;
        }
    }
}
</style>
