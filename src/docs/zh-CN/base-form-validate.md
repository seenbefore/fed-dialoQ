

:::demo

```html
<template>
    <div class="sg-page-demo">
        <el-card class="my-card">
            <section slot="header">
                <div class="sg-flexbox align-center">
                    <span class="sg-flex-1 ">表单查询</span>
                    <el-button type="primary">返回</el-button>
                </div>
            </section>
            <section class="sg-card-body">
                <div class="result" v-text="FormView.model"></div>
                <sg-base-form
                    style="max-width:450px"
                    :fields="FormView.fields"
                    v-model="FormView.model"
                    :rules="FormView.rules"
                    @submit="onSubmit"
                    ref="myForm"
                    :span="24"
                >
                </sg-base-form>
            </section>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        let validatePhone = (rule, value, callback) => {
            if (value && value.length !== 11) {
                callback(new Error('手机号码格式有误'))
            } else {
                callback()
            }
        }
        return {
            FormView: {
                model: {},
                fields: [
                    {
                        columns: [
                            {
                                tag: 'input',
                                name: '活动名称',
                                itemAttrs: {
                                    label: '活动名称',
                                },
                                attrs: {
                                    placeholder: '请输入',
                                },
                            },
                        ],
                    },
                    
                    {
                        columns: [
                            {
                                tag: 'select',
                                name: '活动区域',
                                itemAttrs: {
                                    label: '活动区域',
                                },
                                attrs: {
                                    value: '',
                                    placeholder: '请选择',
                                    options: [
                                        {
                                            label: '区域一',
                                            value: '1',
                                        },
                                        {
                                            label: '区域二',
                                            value: '2',
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                tag: 'date',
                                name: '活动时间',
                                itemAttrs: {
                                    label: '活动时间',
                                },
                                attrs: {
                                    value: [],
                                    type: 'daterange',
                                    'value-format': 'yyyy-MM-dd',
                                    'start-placeholder': '开始时间',
                                    'end-placeholder': '结束时间',
                                },
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                tag: 'checkbox',
                                name: '活动性质',
                                itemAttrs: {
                                    label: '活动性质',
                                },
                                attrs: {
                                    value: [],
                                    options: [
                                        {
                                            label: '美食/餐厅线上活动',
                                            value: '1',
                                        },
                                        {
                                            label: '地推活动',
                                            value: '2',
                                        },
                                        {
                                            label: '线下主题活动',
                                            value: '3',
                                        },
                                        {
                                            label: '单纯品牌曝光',
                                            value: '4',
                                        },
                                        {
                                            label: '少时诵诗书萨达大所多',
                                            value: '5',
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                tag: 'radio',
                                name: '特殊资源',
                                itemAttrs: {
                                    label: '特殊资源',
                                },
                                attrs: {
                                    value: [],
                                    options: [
                                        {
                                            label: '线上品牌赞助',
                                            value: '1',
                                        },
                                        {
                                            label: '线下场地免费',
                                            value: '2',
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                tag: 'input',
                                name: '活动的形式',
                                itemAttrs: {
                                    label: '活动的形式',
                                },
                                attrs: {
                                    placeholder: '请填写活动形式',
                                    type: 'textarea',
                                    maxlength: 100,
                                    'show-word-limit': true,
                                },
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                tag: 'input',
                                name: '手机号码',
                                itemAttrs: {
                                    label: '手机号码',
                                },
                                attrs: {
                                    placeholder: '请输入',
                                },
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                tag: 'action',
                                buttons: [
                                    {
                                        isSubmit: true,
                                        type: 'primary',
                                        text: '提交',
                                    },
                                    {
                                        isReset: true,
                                        type: '',
                                        text: '重置',
                                    },
                                ],
                            },
                        ],
                    },
                ],
                rules: {
                    活动名称: [
                        {
                            required: true,
                            message: '请输入活动名称',
                            trigger: 'change',
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'change',
                        },
                    ],
                    活动区域: [
                        {
                            required: true,
                            message: '请选择活动区域',
                            trigger: 'change',
                        },
                    ],
                    活动时间: [
                        {
                            required: true,
                            message: '请选择活动区域',
                            trigger: 'change',
                        },
                    ],

                    活动性质: [
                        {
                            required: true,
                            message: '请选择活动区域',
                            trigger: 'change',
                        },
                    ],

                    特殊资源: [
                        {
                            required: true,
                            message: '请选择活动资源',
                            trigger: 'change',
                        },
                    ],
                    活动的形式: [
                        {
                            required: true,
                            message: '请填写活动形式',
                            trigger: 'change',
                        },
                    ],
                    手机号码: [
                        {
                            required: true,
                            message: '请填写手机号码',
                            trigger: 'change',
                        },
                        {
                            validator: validatePhone,
                        },
                    ],
                },
            },
        }
    },
    methods: {
        onSubmit() {
            this.$refs['myForm'].validate((valid, errors) => {
                if (valid) {
                    this.$message.success('submit')
                } else {
                    this.$message.error(JSON.stringify(errors))
                }
            })
        },
    },
}
</script>

```
:::