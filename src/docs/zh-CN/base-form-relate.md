:::demo

```html
<template>
    <div class="sg-page ExampleFormRelate">
        <div class="sg-page-demo">
            <section class="sg-card">
                <section class="sg-card-header">
                    <div class="sg-card-title">表单联动</div>
                </section>
                <section class="sg-card-body">
                    <div class="">
                        <p>
                            产品：1.
                            活动类型为「拉新」与「冲单」时，活动还支持「按条件」的生效方式，条件支持「活动人数」「活动天数」「峰值」
                            (三者为且的关系)
                        </p>
                        <p>
                            产品：2.
                            活动类型为「回馈」时，活动只支持「立即生效」和「按时间生效」两种方式
                        </p>
                    </div>

                    <ol>
                        <li>
                            第1类：A 为特定值时，B 不显示；或 A 为特定值时，B
                            才显示。
                        </li>
                        <li>
                            第2类：A 为特定值时，B 只能为特定范围内的值
                            (或不能为某些值)。
                        </li>
                        <li>第3类：A 为特定值时，B 也只能为特定值。</li>
                    </ol>
                    <div class="result"></div>

                    <sg-base-form
                        :fields="FormView.fields"
                        v-model="FormView.model"
                        :rules="FormView.rules"
                        @submit="onSubmit"
                        ref="myForm"
                        :span="24"
                    >
                    </sg-base-form>
                </section>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ExampleFormRelate',
    components: {},
    data() {
        return {
            FormView: {
                model: {},
                fields: [
                    {
                        columns: [
                            {
                                span: 12,
                                tag: 'select',
                                name: 'province',
                                itemAttrs: {
                                    label: '省',
                                },
                                attrs: {
                                    options: [
                                        {
                                            label: '请选择',
                                            value: '',
                                        },
                                        {
                                            label: '浙江',
                                            value: '浙江',
                                        },
                                        {
                                            label: '湖南',
                                            value: '湖南',
                                        },
                                    ],
                                    onChange: ({ value }) => {
                                        const city$ = this.$refs.myForm.getFieldProps(
                                            'city',
                                        )
                                        this.FormView.model.city = ''
                                        if (value === '浙江') {
                                            city$.attrs.options = [
                                                {
                                                    label: '杭州',
                                                    value: '杭州',
                                                },
                                                {
                                                    label: '宁波',
                                                    value: '宁波',
                                                },
                                                {
                                                    label: '绍兴',
                                                    value: '绍兴',
                                                },
                                            ]
                                        } else if (value === '湖南') {
                                            city$.attrs.options = [
                                                {
                                                    label: '长沙',
                                                    value: '长沙',
                                                },
                                            ]
                                        } else {
                                            city$.attrs.options = []
                                        }
                                    },
                                },
                            },
                            {
                                span: 12,
                                tag: 'select',
                                name: 'city',
                                itemAttrs: {
                                    label: '',
                                },
                                attrs: {
                                    value: '',
                                    options: [],
                                },
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                tag: 'radio',
                                name: 'act_type',
                                itemAttrs: {
                                    label: '活动类型',
                                },
                                attrs: {
                                    value: 1,
                                    options: [
                                        {
                                            label: '拉新',
                                            value: 1,
                                        },
                                        {
                                            label: '冲单',
                                            value: 2,
                                        },
                                        {
                                            label: '回馈',
                                            value: 3,
                                        },
                                    ],
                                    onChange: ({ name, value }) => {
                                        if (value === 3) {
                                            this.FormView.model.effect_type = 1
                                        }
                                    },
                                },
                            },
                            {
                                tag: 'radio',
                                name: 'effect_type',
                                itemAttrs: {
                                    label: '生效方式',
                                },
                                attrs: {
                                    value: 1,
                                },
                                getAttrs(model) {
                                    let value
                                    let options = [
                                        {
                                            label: '立即',
                                            value: 1,
                                        },
                                        {
                                            label: '按时间',
                                            value: 2,
                                        },
                                        {
                                            label: '按条件',
                                            value: 3,
                                        },
                                    ]

                                    if (model.act_type == 3) {
                                        // model.effect_type = 1
                                        //value = 1
                                        options = options.slice(0, 2)
                                    }
                                    return {
                                        //value,
                                        options: options,
                                    }
                                },
                            },
                            {
                                tag: 'date',
                                name: 'range',

                                ifRender(model) {
                                    return model.effect_type == 2
                                },
                                itemAttrs: {
                                    label: '生效日期',
                                },
                                attrs: {
                                    type: 'daterange',
                                    value: [],
                                },
                            },
                            {
                                tag: 'checkbox',
                                name: 'effect_condition',

                                ifRender(model) {
                                    return model.effect_type == 3
                                },
                                itemAttrs: {
                                    label: '生效条件',
                                },
                                attrs: {
                                    value: [1, 2, 3],
                                    options: [
                                        {
                                            label: '活跃人数',
                                            value: 1,
                                        },
                                        {
                                            label: '活跃天数',
                                            value: 2,
                                        },
                                        {
                                            label: '峰值',
                                            value: 3,
                                        },
                                    ],
                                },
                            },
                        ],
                    },

                    {
                        columns: [
                            {
                                span: 24,
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
                    name: [
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
                    region: [
                        {
                            required: true,
                            message: '请选择活动区域',
                            trigger: 'change',
                        },
                    ],

                    type: [
                        {
                            type: 'array',
                            required: true,
                            message: '请至少选择一个活动性质',
                            trigger: 'change',
                        },
                    ],
                    resource: [
                        {
                            required: true,
                            message: '请选择活动资源',
                            trigger: 'change',
                        },
                    ],
                    desc: [
                        {
                            required: true,
                            message: '请填写活动形式',
                            trigger: 'change',
                        },
                    ],
                },
            },
        }
    },
    computed: {},
    watch: {
        'FormView.model': {
            handler(val) {
                console.log('FormView.model', val)
            },
            immediate: true,
        },
    },
    created() {},
    mounted() {},
    methods: {
        onSubmit() {
            this.$refs['myForm'].validate(valid => {
                if (valid) {
                    this.$message.success('submit')
                } else {
                    this.$message.error('submit')
                }
            })
        },
    },
}
</script>

```
:::
