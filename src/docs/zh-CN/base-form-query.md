:::demo

```html
<template>
    <div class="sg-page-demo ExampleFormQuery">
        <el-card class="my-card">
            <section slot="header">
                <div class="sg-flexbox align-center">
                    <span class="sg-flex-1 ">表单查询</span>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </div>
            </section>
            <section class="my-card-body">
                <div class="result"></div>
                <sg-base-form
                    ref="formRef"
                    :fields="FormView.fields"
                    v-model="FormView.model"
                    @submit="onSubmit"
                    :span="12"
                ></sg-base-form>
            </section>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'ExampleFormQuery',
    components: {},
    data() {
        return {
            FormView: {
                model: {},
                fields: [
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
                        name: '归属',
                        itemAttrs: {
                            label: '归属',
                        },
                        attrs: {
                            value:[],
                            multiple: true,
                            placeholder: '请选择',
                            options: [
                                {
                                    label: 'A',
                                    value: 'A',
                                },
                                {
                                    label: 'B',
                                    value: 'B',
                                },
                                {
                                    label: 'C',
                                    value: 'C',
                                },
                            ],
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
                            },
                            {
                                isReset: true,
                                text: '重置',
                            },
                            {
                                isMore: true,
                                text: '更多条件',
                                hiddenText: '收起条件',
                            },
                        ],
                    },
                ],
            },
        }
    },

    methods: {
        onSubmit() {
            this.$message.success(JSON.stringify(this.FormView.model))
        },
    },
}
</script>

```

:::