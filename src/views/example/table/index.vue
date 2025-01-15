<template>
    <!-- 用户管理  -->
    <admin-page class="UserManagement">
        <!-- 标签页 -->
        <el-tabs type="card" v-model="tabActiveName">
            <el-tab-pane label="待收件" name="pending">
                <span slot="label">
                    <!-- 标题 -->
                    <span>待收件</span>
                    <!-- 统计数据 -->
                    <span class="sg-tabs__num111">
                        (
                        <b v-text="tabsCount['pending']"></b>
                        )
                    </span>
                </span>
            </el-tab-pane>
            <el-tab-pane label="退回申请" name="returned">
                <span slot="label">
                    <!-- 标题 -->
                    <span>退回申请</span>
                    <!-- 统计数据 -->
                    <span class="sg-tabs__num">
                        (
                        <b v-text="tabsCount['returned']"></b>
                        )
                    </span>
                </span>
            </el-tab-pane>
            <el-tab-pane label="已收件" name="received">
                <span slot="label">
                    <span>已收件</span>
                    <span class="sg-tabs__num">
                        (
                        <b v-text="tabsCount['received']"></b>
                        )
                    </span>
                </span>
            </el-tab-pane>
            <el-tab-pane label="全部" name="all">
                <span slot="label">
                    <span>全部</span>
                    <span class="sg-tabs__num">
                        (
                        <b v-text="tabsCount['all']"></b>
                        )
                    </span>
                </span>
            </el-tab-pane>
        </el-tabs>

        <!-- 查询条件页面，需求内容中有查询条件字样时展示，别忘记formModel的定义   -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表展示数据项页面，需求内容中有列表展示字样时展示 selection-change-all 数据列选择事件（仅当有批量操作时需要）  sort-change 排序事件-->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef" @selection-change-all="onChange" @sort-change="handleSortChange">
            <template #header>
                <!-- 顶部操作 prd中包含新增操作、批量删除操作时。导出相关的功能点不用写  -->
                <div class="sg-flexbox align-center">
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                    <el-button type="primary" @click="handleDeleteBatch">批量删除</el-button>
                </div>
            </template>
        </sg-data-view>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
// 此处引用不省略
import { FormRow, FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
type VO = any
/*
 * 描述: 这是一个示例Vue组件，用于展示如何在文件顶部添加说明注释。
 *
 * 功能描述:
 * - 该组件包含一个按钮和一个显示消息的区域。
 * - 点击按钮时，将显示一条欢迎消息。
 */
@Component({
    name: 'UserManagement',
    components: {},
})
export default class UserManagement extends Vue {
    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef

    tabActiveName = 'pending'
    tabsCount = {
        pending: 0,
        returned: 0,
        received: 0,
        all: 0,
    }
    activated() {
        console.log('activated')
        this.handleSearch()
    }
    // 查询条件 查询方法
    handleSearch(val = {}) {
        this.tableRef.onLoad({ page: 1 })
    }
    // 仅当有批量操作时需要 表格选中的数据row
    selected: any = []
    //  查询条件表单属性设置，必要字段，不要省略
    formModel: any = {}
    // 表格项选中
    onChange(val: any) {
        this.selected = val.map((item: any) => ({ id: item.id }))
    }
    // 跳转编辑 参数不要省略
    handleEdit(row: VO) {
        // 不要删除
        console.log(row)
        this.$router.push({
            path: `/user/save?id=${row.id}&action=edit&_=编辑用户`,
        })
    }
    // 跳转详情 参数不要省略
    handleDetail(row: VO) {
        this.$router.push({
            path: `/user/deital?id=${row.id}`,
        })
    }
    // 删除单个数据 二次确认 row参数不要省略
    async handleDelete(row: VO) {
        console.log(row)
        await this.$confirm('删除后将无法找回', '确认删除？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        })
        this.$message.success('删除成功')
        this.handleSearch()
    }
    /** 批量删除 */
    handleDeleteBatch() {
        // 获取列表选中的数据
        let val = this.getTableAttrs.multipleSelectionAll
        // todo
    }
    /** 新增 */
    handleAdd() {
        // todo
        this.$router.push({
            path: `/user/save?action=add&_=新增用户`,
        })
    }
    async openDialog() {
        const prop = {
            // 这边添加弹窗需要的入参
        }
        // 1、必须使用$modalDialog方法打开弹窗。2、确保import中的文件确实存在。3、prop为弹窗需要的入参 4、以下代码保持注释，不要删除
        // const result = await this.$modalDialog(() => import('./components/user-dialog/index.vue'), prop)
        // console.log(result)
    }
    //  查询条件表单属性设置 name为接口字段名称
    get getFormAttrs() {
        // 没有查询条件时，直接return {}
        const fields: FormColumn[] = [
            //  输入组件
            {
                tag: 'input',
                // 接口字段
                name: 'projectName',
                label: '项目名称：',
                attrs: {
                    placeholder: '请输入',
                    // maxlength 最多输入20字
                    maxlength: 20,
                },
            },
            //  日期选择组件
            {
                tag: 'date',
                name: 'date',
                label: '日期：',
                attrs: {
                    value: '',
                    'value-format': 'yyyy-MM-dd',
                    placeholder: '请选择',
                },
            },
            // 日期范围组件
            {
                tag: 'daterange',
                name: 'receiptDate',
                label: '日期范围：',
                attrs: {
                    value: [],
                    'value-format': 'yyyy-MM-dd',
                    'start-placeholder': '开始时间',
                    'end-placeholder': '结束时间',
                },
            },
            // 下拉多选
            {
                tag: 'select',
                name: 'knowledgeLabel',
                label: '知识标签：',
                attrs: {
                    // 多选时，value类型为数组
                    value: [],
                    // 是否可搜索`
                    filterable: true,
                    // 是否多选
                    multiple: true,
                    // 是否可折叠
                    collapseTags: true,
                    // 返回类型必须是{label:string,value:string}的数组
                    options: async () => {
                        return [
                            {
                                label: '标签A',
                                value: 'labelA',
                            },
                            {
                                label: '标签B',
                                value: 'labelB',
                            },
                        ]
                    },
                },
            },
            // 下拉单选
            {
                tag: 'select',
                name: 'type',
                label: '类型：',
                attrs: {
                    value: '',
                    // 返回类型必须是{label:string,value:string}的数组
                    options: async () => {
                        return [
                            {
                                label: '个人',
                                value: 'person',
                            },
                            {
                                label: '企业',
                                value: 'company',
                            },
                        ]
                    },
                    onChange: ({ value }, { formModel }) => {
                        if (value === 'person') {
                            formModel.companyCode = ''
                        } else {
                            formModel.codeNumber = ''
                        }
                    },
                },
            },
            {
                tag: 'input',
                name: 'codeNumber',
                label: '身份证号：',
                attrs: {
                    placeholder: '请输入',
                },
                // 当type为person时，显示该输入框
                ifRender: model => {
                    return model.type === 'person'
                },
            },
            {
                tag: 'input',
                name: 'companyCode',
                label: '企业码：',
                attrs: {
                    placeholder: '请输入',
                },
                // 当type为person时，显示该输入框
                ifRender: model => {
                    return model.type === 'company'
                },
            },
            // 级联选择器：表单中有级联字样使用
            {
                tag: 'cascader',
                name: 'feedbackDepartment',
                label: '部门：',
                attrs: {
                    // 不要删除
                    value: [],
                    props: {
                        // 多选属性，有多选字样时展示
                        multiple: true,
                    },
                    filterable: true,
                    //多选模式下折叠
                    collapseTags: true,
                    showAllLevels: false,
                    options: async () => {
                        // 调用接口
                        const result = Promise.resolve([
                            {
                                value: 1,
                                label: '东南',
                                children: [
                                    {
                                        value: 2,
                                        label: '上海',
                                        children: [
                                            { value: 3, label: '普陀' },
                                            { value: 4, label: '黄埔' },
                                            { value: 5, label: '徐汇' },
                                        ],
                                    },
                                ],
                            },
                            {
                                value: 17,
                                label: '西北',
                                children: [
                                    {
                                        value: 18,
                                        label: '陕西',
                                        children: [
                                            { value: 19, label: '西安' },
                                            { value: 20, label: '延安' },
                                        ],
                                    },
                                ],
                            },
                        ])
                        return result
                    },
                },
            },
            //  下拉选择组件：表单中有下拉或是否或选择字样使用
            {
                tag: 'select',
                name: 'gender',
                label: '性别：',
                attrs: {
                    // 是否可搜索
                    filterable: true,
                    multiple: true, // 是否多选，默认false，不多选
                    collapseTags: true, //有多选字样时展示
                    value: [],
                    // 返回类型必须是{label:string,value:string}的数组
                    options: async () => {
                        return [
                            { label: '男', value: '1' },
                            { label: '女', value: '2' },
                        ]
                    },
                    //  下拉切换
                    onChange: ({ value }: any, { formModel }: any) => {
                        //  value是下拉选择的值
                        //formModel是表单数据，可以通过formModel设置其他字段的值
                        formModel.legalPersonErrorMsg = ''
                    },
                },
            },
        ]
        return {
            // 自动添加查询、重置、更多按钮
            autoAppendAction: true,
            fields,
        }
    }

    /** 标签页统计数据，没有统计数据时不展示 */
    async fetchTabsCount() {
        const counts = await Promise.resolve({
            pending: 0,
            returned: 0,
            received: 0,
            all: 0,
        })
        Object.assign(this.tabsCount, counts)
    }

    /** 排序sort事件 */
    handleSortChange(event: any) {
        const { prop, order } = event
        if (order === 'ascending') {
            // todo
        } else if (order === 'descending') {
            // todo
        }
    }
    /** 列表展示配置项，没有列表展示时不展示 prop为接口返回字段名 */
    get getTableAttrs() {
        const columns: TableColumn[] = [
            // 需要选择数据时展示
            {
                label: '全选',
                type: 'selection',
                fixed: 'left',
            },
            // 列表展示中有序号时展示
            {
                label: '序号',
                type: 'index',
                prop: 'index',
                fixed: 'left',
                width: '50px',
            },

            {
                align: 'left',
                label: '收件日期',
                prop: 'receiptDate',
                minWidth: '150px',
                // 支持排序
                sortable: 'custom',
            },
            {
                align: 'left',
                label: '个人爱好',
                prop: 'note',
                // 内容最多2行
                overflowCount: 2,
                minWidth: '160px',
            },

            // 列表的操作按钮
            {
                label: '操作',
                prop: 'action',
                width: '240px',
                fixed: 'right',
                align: 'left',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button
                                type="text"
                                onClick={() => {
                                    this.handleEdit(row)
                                }}
                            >
                                编辑
                            </el-button>
                            <el-button
                                type="text"
                                onClick={() => {
                                    this.handleDetail(row)
                                }}
                            >
                                详情
                            </el-button>

                            <el-button
                                type="text"
                                danger={true}
                                onClick={() => {
                                    this.handleDelete(row)
                                }}
                            >
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
                scrollDom: () => document.querySelector('.admin-page__content'),
            },
            // 跨页勾选数据,仅当有批量操作时需要,默认不不展示，有勾选字样时展示 如 [{ id: 1 }, { id: 4 }, { id: 12 }]
            multipleSelectionAll: [],
            // 唯一匹配的字段 仅当有批量操作时需要
            idKey: 'id',

            // 数据请求 必要配置
            load: async (params: any = {}) => {
                const { receiptDate, ...rest } = this.formModel
                // 日期范围处理
                const [receiptDateStart, receiptDateEnd] = receiptDate || []

                return {
                    result: [{ id: 1 }],
                    total: 10,
                }
            },
            // 列表展示 必要配置
            columns,
        }
    }
    mounted() {
        this.fetchTabsCount()
    }
}
// 不要遗漏此闭合标签
</script>
<style scoped lang="less">
.UserManagement ::v-deep {
    padding: 0px;
}
</style>
