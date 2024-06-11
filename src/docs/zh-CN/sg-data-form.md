## 动态表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### 查询表单

:::demo

```html
<template>
    <div class="sg-page-demo ExampleFormQuery">
        <section class="sg-card">
            <section class="sg-card-header">
                <div class="sg-card-title">表单查询</div>
            </section>
            <section class="sg-card-body">
                <div class="result"></div>
                <sg-base-form ref="formRef" :fields="FormView.fields" v-model="FormView.model" :rules="FormView.rules" @submit="onSubmit" :span="12"></sg-base-form>
            </section>
        </section>

        <div>
            <el-button @click="changeData">change</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ExampleFormQuery',
        components: {},
        data() {
            return {
                FormView: {
                    rules: {
                        测试: [{
                            required: true,
                            message: '请输入',
                            trigger: 'change',
                        }, ],
                    },
                    model: {},
                    fields: [{
                            tag: 'input',
                            name: 'title',
                            itemAttrs: {
                                showLabelTooltip: true,
                                label: '查询标题',
                            },
                            attrs: {
                                placeholder: '请输入',
                            },
                        },
                        {
                            tag: 'cascader',
                            name: 'catalog',
                            value: [],
                            itemAttrs: {
                                label: '文章分类',
                            },
                            attrs: {
                                props: {
                                    multiple: true
                                },
                                placeholder: '请选择',
                                options: [{
                                        value: '娱乐',
                                        label: '娱乐',
                                        children: [{
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
                                        children: [{
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
                            name: 'status',
                            value: '1',
                            itemAttrs: {
                                label: '内容状态',
                            },
                            attrs: {
                                isQuery: true,

                                placeholder: '请选择',
                                options: [{
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
                            name: 'createDate',
                            value: '2021-01-01', // 必填
                            itemAttrs: {
                                label: '创建日期',
                            },
                            attrs: {
                                placeholder: '',
                                'value-format': 'yyyy-MM-dd',
                            },
                        },
                        {
                            tag: 'date',
                            name: 'date',
                            value: [], // 必填
                            itemAttrs: {
                                label: '发布日期',
                            },
                            attrs: {
                                type: 'daterange',
                                placeholder: '事实上',
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
                            value: [{
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
                this.$refs['formRef'].validate(valid => {
                    console.log('onSubmit', valid)
                })
            },
            changeData() {
                this.formData.title = 'sadkladasda'
            },
        },
    }
</script>
```

:::

### 表单slot

:::demo

```html
<template>
    <div class="sg-page-demo ExampleFormSlot">
        <section class="sg-card">
            <section class="sg-card-header">
                <div class="sg-card-title">表单slot</div>
            </section>
            <section class="sg-card-body">
                <div class="result"></div>
                <sg-base-form ref="formRef" :fields="FormView.fields" v-model="FormView.model" :rules="FormView.rules" @submit="onSubmit" :span="12">
                    <!-- 标题 -->
                    <div slot="title-prepend">http://</div>
                    <div slot="title-append">.com</div>
                    <div class="sg-flexbox align-center" style="height:100%;" slot="title-prefix">
                        <i class="el-icon-user"></i>
                    </div>
                    <div class="sg-flexbox align-center" style="height:100%;" slot="title-suffix">
                        <i class="el-icon-more"></i>
                    </div>
                    <div slot="title-input-append" style="margin-left:12px;">
                        <el-button>测试</el-button>
                    </div>

                    <!-- shop -->
                    <div class="sg-flexbox align-center" style="height:100%;" slot="shop-prefix">
                        <i class="el-icon-user"></i>
                    </div>
                    <div slot="shop-autocomplete-slot" slot-scope="{ item }">
                        <div class="name"></div>
                        <span class="addr" style="font-size:12px;color:gray"></span>
                    </div>
                </sg-base-form>
            </section>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'ExampleFormSlot',
        components: {},
        data() {
            return {
                FormView: {
                    rules: {},
                    model: {},
                    fields: [{
                            tag: 'input',
                            name: 'url',
                            span: 24,
                            itemAttrs: {
                                label: '链接',
                            },
                            attrs: {
                                class: 'sg-flexbox',
                                inputSlots: [{
                                        slotType: 'prepend',
                                        slotName: 'title-prepend',
                                    },
                                    {
                                        slotType: 'append',
                                        slotName: 'title-append',
                                    },
                                    {
                                        slotType: 'prefix',
                                        slotName: 'title-prefix',
                                    },
                                    {
                                        slotType: 'suffix',
                                        slotName: 'title-suffix',
                                    },
                                ],
                                appendSlot: 'title-input-append',

                                placeholder: '请输入',
                            },
                        },

                        {
                            tag: 'autocomplete',
                            name: 'shop',
                            span: 24,
                            itemAttrs: {
                                label: '今天去哪里吃点什么',
                            },
                            attrs: {
                                autocompleteSlot: 'shop-autocomplete-slot',
                                inputSlots: [{
                                    slotType: 'prefix',
                                    slotName: 'shop-prefix',
                                }, ],
                                listeners: {
                                    select: val => {
                                        this.FormView.model.$shop = val
                                    },
                                    input: val => {
                                        if (!val) {
                                            this.FormView.model.$shop = null
                                        }
                                    },
                                },
                                placeholder: '请选择',
                                'trigger-on-focus': false,
                                load: queryString => {
                                    const options = [{
                                            value: '三全鲜食（北新泾店）',
                                            address: '长宁区新渔路144号',
                                        },
                                        {
                                            value: 'Hot honey 首尔炸鸡（仙霞路）',
                                            address: '上海市长宁区淞虹路661号',
                                        },
                                        {
                                            value: '新旺角茶餐厅',
                                            address: '上海市普陀区真北路988号创邑金沙谷6号楼113',
                                        },
                                        {
                                            value: '泷千家(天山西路店)',
                                            address: '天山西路438号',
                                        },
                                        {
                                            value: '胖仙女纸杯蛋糕（上海凌空店）',
                                            address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101',
                                        },
                                        {
                                            value: '贡茶',
                                            address: '上海市长宁区金钟路633号',
                                        },
                                        {
                                            value: '豪大大香鸡排超级奶爸',
                                            address: '上海市嘉定区曹安公路曹安路1685号',
                                        },
                                        {
                                            value: '茶芝兰（奶茶，手抓饼）',
                                            address: '上海市普陀区同普路1435号',
                                        },
                                        {
                                            value: '十二泷町',
                                            address: '上海市北翟路1444弄81号B幢-107',
                                        },
                                        {
                                            value: '星移浓缩咖啡',
                                            address: '上海市嘉定区新郁路817号',
                                        },
                                        {
                                            value: '阿姨奶茶/豪大大',
                                            address: '嘉定区曹安路1611号',
                                        },
                                        {
                                            value: '新麦甜四季甜品炸鸡',
                                            address: '嘉定区曹安公路2383弄55号',
                                        },
                                        {
                                            value: 'Monica摩托主题咖啡店',
                                            address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F',
                                        },
                                        {
                                            value: '浮生若茶（凌空soho店）',
                                            address: '上海长宁区金钟路968号9号楼地下一层',
                                        },
                                        {
                                            value: 'NONO JUICE  鲜榨果汁',
                                            address: '上海市长宁区天山西路119号',
                                        },
                                        {
                                            value: 'CoCo都可(北新泾店）',
                                            address: '上海市长宁区仙霞西路',
                                        },
                                        {
                                            value: '快乐柠檬（神州智慧店）',
                                            address: '上海市长宁区天山西路567号1层R117号店铺',
                                        },
                                        {
                                            value: 'Merci Paul cafe',
                                            address: '上海市普陀区光复西路丹巴路28弄6号楼819',
                                        },
                                        {
                                            value: '猫山王（西郊百联店）',
                                            address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306',
                                        },
                                        {
                                            value: '枪会山',
                                            address: '上海市普陀区棕榈路',
                                        },
                                        {
                                            value: '纵食',
                                            address: '元丰天山花园(东门) 双流路267号',
                                        },
                                        {
                                            value: '钱记',
                                            address: '上海市长宁区天山西路',
                                        },
                                        {
                                            value: '壹杯加',
                                            address: '上海市长宁区通协路',
                                        },
                                        {
                                            value: '唦哇嘀咖',
                                            address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元',
                                        },
                                        {
                                            value: '爱茜茜里(西郊百联)',
                                            address: '长宁区仙霞西路88号1305室',
                                        },
                                        {
                                            value: '爱茜茜里(近铁广场)',
                                            address: '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺',
                                        },
                                        {
                                            value: '鲜果榨汁（金沙江路和美广店）',
                                            address: '普陀区金沙江路2239号金沙和美广场B1-10-6',
                                        },
                                        {
                                            value: '开心丽果（缤谷店）',
                                            address: '上海市长宁区威宁路天山路341号',
                                        },
                                        {
                                            value: '超级鸡车（丰庄路店）',
                                            address: '上海市嘉定区丰庄路240号',
                                        },
                                        {
                                            value: '妙生活果园（北新泾店）',
                                            address: '长宁区新渔路144号',
                                        },
                                        {
                                            value: '香宜度麻辣香锅',
                                            address: '长宁区淞虹路148号',
                                        },
                                        {
                                            value: '凡仔汉堡（老真北路店）',
                                            address: '上海市普陀区老真北路160号',
                                        },
                                        {
                                            value: '港式小铺',
                                            address: '上海市长宁区金钟路968号15楼15-105室',
                                        },
                                        {
                                            value: '蜀香源麻辣香锅（剑河路店）',
                                            address: '剑河路443-1',
                                        },
                                        {
                                            value: '北京饺子馆',
                                            address: '长宁区北新泾街道天山西路490-1号',
                                        },
                                        {
                                            value: '饭典*新简餐（凌空SOHO店）',
                                            address: '上海市长宁区金钟路968号9号楼地下一层9-83室',
                                        },
                                        {
                                            value: '焦耳·川式快餐（金钟路店）',
                                            address: '上海市金钟路633号地下一层甲部',
                                        },
                                        {
                                            value: '动力鸡车',
                                            address: '长宁区仙霞西路299弄3号101B',
                                        },
                                        {
                                            value: '浏阳蒸菜',
                                            address: '天山西路430号',
                                        },
                                        {
                                            value: '四海游龙（天山西路店）',
                                            address: '上海市长宁区天山西路',
                                        },
                                        {
                                            value: '樱花食堂（凌空店）',
                                            address: '上海市长宁区金钟路968号15楼15-105室',
                                        },
                                        {
                                            value: '壹分米客家传统调制米粉(天山店)',
                                            address: '天山西路428号',
                                        },
                                        {
                                            value: '福荣祥烧腊（平溪路店）',
                                            address: '上海市长宁区协和路福泉路255弄57-73号',
                                        },
                                        {
                                            value: '速记黄焖鸡米饭',
                                            address: '上海市长宁区北新泾街道金钟路180号1层01号摊位',
                                        },
                                        {
                                            value: '红辣椒麻辣烫',
                                            address: '上海市长宁区天山西路492号',
                                        },
                                        {
                                            value: '(小杨生煎)西郊百联餐厅',
                                            address: '长宁区仙霞西路88号百联2楼',
                                        },
                                        {
                                            value: '阳阳麻辣烫',
                                            address: '天山西路389号',
                                        },
                                        {
                                            value: '南拳妈妈龙虾盖浇饭',
                                            address: '普陀区金沙江路1699号鑫乐惠美食广场A13',
                                        },
                                    ]
                                    return Promise.resolve(
                                        options.filter(
                                            item =>
                                            item.value.indexOf(queryString) >
                                            -1,
                                        ),
                                    )
                                },
                            },
                        },
                    ],
                },
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        methods: {
            onSubmit() {
                this.$refs['formRef'].validate(valid => {
                    console.log('onSubmit', valid)
                })
            },
        },
    }
</script>
```

:::

### 提交表单

:::demo

```html
<template>
    <div class="sg-page-demo">
        <section class="sg-card">
            <section class="sg-card-header">
                <div class="sg-card-title">编辑</div>
            </section>
            <section class="sg-card-body">
                <div class="result"></div>
                <sg-base-form :fields="FormView.fields" v-model="FormView.model" :rules="FormView.rules" @submit="onSubmit" ref="myForm" :span="12">
                </sg-base-form>
            </section>
        </section>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                FormView: {
                    model: {},
                    fields: [{
                            columns: [{
                                    tag: 'input',
                                    name: 'name',

                                    itemAttrs: {
                                        label: '活动名称',
                                    },
                                    attrs: {
                                        placeholder: '请输入',
                                    },
                                },
                                {
                                    tag: 'select',
                                    name: 'region',
                                    itemAttrs: {
                                        label: '活动区域',
                                    },
                                    attrs: {
                                        placeholder: '请选择',
                                        options: [{
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
                            columns: [{
                                    tag: 'input',
                                    name: 'phone',
                                    itemAttrs: {
                                        label: '手机号码',
                                    },
                                    attrs: {
                                        placeholder: '请输入',
                                    },
                                },
                                {
                                    tag: 'radio',
                                    name: 'resource',
                                    itemAttrs: {
                                        label: '特殊资源',
                                    },
                                    attrs: {
                                        options: [{
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
                            columns: [{
                                    span: 8,
                                    tag: 'select',
                                    name: 'province',
                                    label: '省份2',
                                    attrs: {
                                        placeholder: '请选择',

                                        onChange: res => {
                                            const {
                                                value
                                            } = res
                                            console.log(3233,res)
                                            this.FormView.model.city = ''
                                            // this.fetchCityData({
                                            //     value,
                                            // }).then(result=>{
                                            //     console.log(1,result,2)
                                            //     this.$refs['myForm'].getFieldProps('city').attrs.options = result
                                            // })
                                            
                                            // const result =  this.fetchCityData({
                                            //     value,
                                            // })
                                           
                                        },
                                        options: () => {
                                            return this.fetchProvinceData()
                                            // return [{
                                            //     value: '',
                                            //     label: '请选择',
                                            // }, ].concat(this.fetchProvinceData())
                                        },
                                    },
                                },
                                {
                                    span: 8,
                                    tag: 'select',
                                    name: 'city',
                                    label: '市',
                                    attrs: {
                                        placeholder: '请选择',
                                        onChange: ({
                                            value
                                        }) => {
                                            this.FormView.model.district = ''
                                            const result = this.fetchDistrictData({
                                                value,
                                            })
                                            this.$refs['myForm'].getFieldProps(
                                                'district',
                                            ).attrs.options = result
                                        },
                                        options: [],
                                    },
                                },
                                {
                                    span: 8,
                                    tag: 'select',
                                    name: 'district',
                                    label: '区域',
                                    attrs: {
                                        placeholder: '请选择',
                                        options: [],
                                    },
                                },
                            ],
                        },
                        {
                            columns: [{
                                tag: 'checkbox',
                                name: 'type',
                                span: 24,
                                label: '活动性质',
                                value: [],
                                attrs: {
                                    options: [{
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
                            }, ],
                        },
                        {
                            columns: [{
                                span: 24,
                                tag: 'input',
                                label: '请填写活动的形式是怎么少时诵诗书',
                                name: 'desc',
                                attrs: {
                                    type: 'textarea',
                                    maxlength: 100,
                                    'show-word-limit': true,
                                },
                            }, ],
                        },
                        {
                            columns: [{
                                span: 24,
                                tag: 'action',
                                value: [{
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
                            }, ],
                        },
                    ],
                    rules: {
                        name: [{
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
                        region: [{
                            required: true,
                            message: '请选择活动区域',
                            trigger: 'change',
                        }, ],

                        type: [{
                            type: 'array',
                            required: true,
                            message: '请至少选择一个活动性质',
                            trigger: 'change',
                        }, ],
                        resource: [{
                            required: true,
                            message: '请选择活动资源',
                            trigger: 'change',
                        }, ],
                        desc: [{
                            required: true,
                            message: '请填写活动形式',
                            trigger: 'change',
                        }, ],
                    },
                },
            }
        },
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
            fetchDistrictData({
                value
            }) {
                if (value == '1-1') {
                    return [{
                            label: '拱墅区',
                            value: '1',
                        },
                        {
                            label: '滨江区',
                            value: '2',
                        },
                    ]
                } else {
                    return []
                }
            },
            fetchCityData({
                value
            }) {
                if (value == 1) {
                    return Promise.resolve([{
                            label: '杭州市',
                            value: '1-1',
                        },
                        {
                            label: '绍兴市',
                            value: '1-2',
                        },
                    ])
                } else if (value == 2) {
                    return Promise.resolve([{
                        label: '长沙',
                        value: '2-1',
                    }, ])
                } else {
                    return Promise.resolve([])
                }
            },
            fetchProvinceData() {
                return Promise.resolve([{
                        label: '浙江省',
                        value: '1',
                    },
                    {
                        label: '湖南省',
                        value: '2',
                    },
                ])
            },
        },
    }
</script>
```

:::

### 基础属性

| 参数          | 说明            | 类型             | 可选值 | 默认值 |
| ------------- | --------------- | ---------------- | ------ | ------ |
| fields        | 表单数据        | Array            | —      | -      |
| rules         | 校验规则        | Object           | —      | -      |
| labelWidth    | 全局 label 宽度 | [Number, String] | —      | 120px  |
| type          | 布局模式        | String           | —      | flex   |
| span          | 每列宽度        | [Number, String] | [1, 24] | 8      |
| justify       | 水平布局        | String           | —      | -      |
| isFieldInline | 表单域布局      | Boolean          | —      | true   |

### 方法

| 事件名称     | 说明     | 回调参数  |
| ------------ | -------- | --------- |
| validate     | 校验数据 |           |
| reset        | 重置数据 |           |
| getFieldProps | 获取field对象 |  |
| validateField | 校验某个域 | (prop, cb) |
| clearValidate | 清空校验信息 | |

### 事件

| 事件名称 | 说明     | 回调参数     |
| -------- | -------- | ------------ |
| submit   | 提交数据 |              |
| reset    | 数据重置 |              |

### column属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ----- | ------- | ------ | -------- |
| tag |    |    |    | ['input', 'select', 'date', 'checkbox', 'radio', 'autocomplete', 'cascader', 'slot', 'action'] |
| label  | 表单名称  |     |   |    |
| name  | 表单 key   |     |  |     |
| name  | 表单 key   |     |  |     |
| value  | 初始数据   | [] |  |     |
| visible | 是否显示 |    |    | true |
| ifRender | 是否渲染 |  Function  |  (model)  |    |

### column.attrs属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ----- | ------- | ------ | -------- |
| inputSlots | input组件对应插槽 [prefix, suffix,prepend,append] |     |    |     |
| autocompleteSlot  | autocomplete组件模板插槽  |     |   |      |
| listeners  | 组件事件集合   |     |  |        |
| onChange | 数据变化        | （{name,value,option}）    |    |           |
| options | select、checkbox、radio、cascader 数据源 |             |    |       |
| load | autocomplete组件获取数据函数 |             |    |       |
| isTriggerSubmit | enter的时候是否触发submit |             |    |       |
| rules | 校验规则 |             |    |       |
| 其他 | 参考对应element组件的属性 |             |    |       |

### column.itemAttrs属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ----- | ------- | ------ | -------- |
| label  | 表单label名称  |     |   |     |
| labelWidth  | 宽度  |     |   |     |
| showLabelTooltip | 是否显示 label 的 tip | Boolean  |    |       |
