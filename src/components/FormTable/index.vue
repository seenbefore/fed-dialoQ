<template>
    <div>
        <!-- <el-tabs v-model="formModel.status">
            <el-tab-pane
                :label="item.label"
                :name="item.name"
                v-for="(item, index) in tabsFormSchema"
                :key="index"
            >
            </el-tab-pane>
        </el-tabs> -->
        <sg-base-form ref="formRef" :fields="formFields" v-model="formModel" @submit="handleSearch" @reset="handleSearch" :span="8"></sg-base-form>
        <sg-data-view :columns="columns" :load="load" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, TableColumn, TableRef } from '@/sharegood-ui'

@Component({
    components: {},
})
export default class Demo extends Vue {
    tabsFormSchema = [
        {
            name: 'all',
            label: '全部',
        },
        {
            name: 'todo',
            label: '代办',
        },
        {
            name: 'done',
            label: '已办',
        },
    ]
    formModel = {
        status: 'all',
    }
    @Ref('formRef')
    formRef!: FormRef
    formFields: FormColumn[] = [
        {
            columns: [
                {
                    tag: 'input',
                    name: '文章名称',
                    itemAttrs: {
                        label: '文章名称',
                    },
                    attrs: {
                        placeholder: '支持模糊查询',
                    },
                },
                {
                    tag: 'select',
                    name: '是否跟踪',
                    itemAttrs: {
                        label: '是否跟踪',
                    },
                    attrs: {
                        placeholder: '请选择',
                        options: [
                            {
                                label: '全部',
                                value: '',
                            },
                            {
                                label: '是',
                                value: '1',
                            },
                            {
                                label: '否',
                                value: '2',
                            },
                        ],
                    },
                },
                {
                    tag: 'cascader',
                    name: '文章分类',
                    itemAttrs: {
                        label: '文章分类',
                    },
                    attrs: {
                        value: [],
                        props: { multiple: true },
                        placeholder: '请选择',
                        filterable: true,
                        options: [
                            {
                                value: '娱乐',
                                label: '娱乐',
                                children: [
                                    {
                                        value: '明星',
                                        label: '明星',
                                    },
                                    {
                                        value: '体育',
                                        label: '体育',
                                    },
                                ],
                            },
                            {
                                value: '政策',
                                label: '政策',
                                children: [
                                    {
                                        value: '国内',
                                        label: '国内',
                                    },
                                    {
                                        value: '国外',
                                        label: '国外',
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    tag: 'select',
                    name: '内容状态',

                    itemAttrs: {
                        label: '内容状态',
                    },
                    attrs: {
                        value: '1',
                        placeholder: '请选择',
                        options: [
                            {
                                label: '未发布',
                                value: '1',
                            },
                            {
                                label: '已发布',
                                value: '2',
                            },
                        ],
                    },
                },
                {
                    tag: 'date',
                    name: '创建日期',
                    itemAttrs: {
                        label: '创建日期',
                    },
                    attrs: {
                        value: '2021-01-01', // 必填
                        placeholder: '',
                        'value-format': 'yyyy-MM-dd',
                    },
                },
                {
                    tag: 'date',
                    name: '发布日期',
                    itemAttrs: {
                        label: '发布日期',
                    },
                    attrs: {
                        value: [],
                        type: 'daterange',
                        'value-format': 'yyyy-MM-dd',
                        'start-placeholder': '开始时间',
                        'end-placeholder': '结束时间',
                    },
                },
                {
                    tag: 'input',
                    name: '隐藏域',
                    visible: false,
                    itemAttrs: {
                        label: '隐藏域',
                    },
                    attrs: {
                        placeholder: '请输入',
                    },
                },
                {
                    span: 24,
                    tag: 'action',
                    buttons: [
                        {
                            isSubmit: true,
                            type: 'primary',
                            text: '查询',
                            svgIcon: 'icon-search',
                        },
                        {
                            isReset: true,
                            text: '重置',
                            svgIcon: 'icon-reset',
                        },
                        {
                            isMore: true,
                            text: '更多',
                            svgIcon: 'icon-expand',
                            hiddenText: '收起',
                        },
                    ],
                },
            ],
        },
    ]

    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped></style>
