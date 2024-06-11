
## 自定义组件

**模板**
```html
<template>
    <div class="sg-data-form-field">
        组件内容
    </div>
</template>

<script>
export default {
    name: '组件名',
    props: {
        // 对应表单的nanme
        value: {
            type: String,
            default:'',
        },
    },
    data() {
        return {
            currentValue: this.value,
        }
    },
    watch: {
        value(val) {
            // 表单重置的时候会返回[undefined]
            if (val && !val[0]) {
                this.$emit('input',null)
            } else {
               
            }
        },
    },
    mounted() {},
    methods: {
        // 如果组件内部数据变化需要传递到form
        onInputEvent(val) {
            this.$emit('input', val)
        },
    },
}
</script>


```

:::demo

```html
<template>
    <div class="sg-page-demo">
        <el-card class="my-card">
            <section slot="header">
                <div class="sg-flexbox align-center">
                    <span class="sg-flex-1 ">自定义组件</span>
                </div>
            </section>
            <section class="sg-card-body">
                <div class="result" v-text="FormView.model"></div>
                <sg-base-form
                    :fields="FormView.fields"
                    v-model="FormView.model"
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
        return {
            FormView: {
                model: {},
                fields: [
                    
                    {
                        columns: [
                            {
                                
                                // 引入局部组件
                                tag: () =>
                                    import(
                                        '@/components/my-loan-select/index.vue'
                                    ),
                                // 必填 表明自定义组件
                                custom: true,
                                name: '自定义局部组件',
                                itemAttrs: {
                                    label: '自定义局部组件',
                                },
                                attrs: {
                                    value: [],
                                    placeholder: '请输入',
                                },
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                // 全局组件名称
                                tag: 'MyBranchSelect',
                                custom: true,
                                // 必填 表明自定义组件
                                name: '自定义全局组件',
                                itemAttrs: {
                                    class: 'sg-primary-color',
                                    label: '自定义全局组件',
                                },
                                attrs: {
                                    value: [],
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


### MyBranchSelect组件源码
**MyBranchSelect/index.vue**
```html

<template>
    <div class="sg-data-form-field MyBranchSelect">
        <el-input placeholder="" readonly v-model="inputValue">
            <el-button
                class="add"
                slot="append"
                icon="el-icon-plus"
                @click="openDialog"
            ></el-button>
        </el-input>

        <MyDialog
            @success="onSave"
            :visible.sync="visible"
            :checked="checked"
            v-if="visible"
        ></MyDialog>
    </div>
</template>

<script>
import MyDialog from './dialog.vue'
export default {
    name: 'MyBranchSelect',
    components: {
        MyDialog,
    },
    props: {
        value: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            inputValue: '',
            visible: false,
            checked: [],
        }
    },
    watch: {
        value(val) {
            // 表单重置的时候会返回[undefined]
            if (val && !val[0]) {
                this.inputValue = ''
                this.checked = []
                this.$emit('input', null)
            }
        },
    },
    mounted() {},
    methods: {
        onSave(val) {
            this.inputValue = val.map(item => item.label).join('、')
            this.checked = [...val]
            this.$emit('input', [...val])
        },
        openDialog() {
            this.visible = true
        },
    },
}
</script>
<style lang="less">
.MyBranchSelect {
    .el-button.add {
        vertical-align: middle;
        i {
            font-style: normal;
        }
    }
}
</style>

```

**MyBranchSelect/dialog.vue**
```html

<template>
    <el-dialog
        title="选择意向机构"
        ref="dialog"
        :visible.sync="myVisible"
        width="500px"
        :append-to-body="true"
        :close-on-click-modal="false"
        class="sg-dialog my-branch-select-dialog"
    >
        <div class="head">
            <el-input placeholder="请输入意向机构名称" v-model="keywords">
                <el-button slot="append" @click="handleSearch" type="primary"
                    >搜索</el-button
                >
            </el-input>
        </div>
        <div class="main">
            <div class="tabs sg-flexbox">
                <div
                    class="tab-item"
                    :class="{ active: activeName === '' }"
                    @click="handleChangeTab('')"
                >
                    企业所在区域
                </div>
                <div
                    class="tab-item"
                    :class="{ active: activeName === 'all' }"
                    @click="handleChangeTab('all')"
                >
                    全部区域
                </div>
            </div>
            <div class="tips">
                <div class="message">
                    <span class="error" v-show="currentChecked.length > 3"
                        >最多选择3家意向机构</span
                    >
                </div>
                <div class="count">
                    <span v-text="currentChecked.length"></span>/<span>3</span>
                </div>
            </div>
            <div class="tabs-content">
                <div class="tab-pane" v-show="activeName === ''">
                    <el-tree
                        ref="tree1"
                        @check-change="onTree1CheckChange"
                        :default-checked-keys="defaultCheckedKeys"
                        :data="data1"
                        show-checkbox
                        node-key="id"
                        default-expand-all
                        :filter-node-method="filterNode"
                    >
                    </el-tree>
                </div>
                <div class="tab-pane" v-show="activeName === 'all'">
                    <el-tree
                        ref="tree2"
                        @check-change="onTree2CheckChange"
                        :default-checked-keys="defaultCheckedKeys"
                        :data="data2"
                        show-checkbox
                        node-key="id"
                        default-expand-all
                        :filter-node-method="filterNode"
                    >
                    </el-tree>
                </div>
            </div>
        </div>

        <div class="action">
            <el-button type="primary" @click="handleSave">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'MyDialog',
    props: {
        checked: {
            type: Array,
            default() {
                return []
            },
        },

        visible: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            activeName: '',
            keywords: '',
            currentChecked: [...this.checked],
            data1: [
                {
                    id: '中国农业银行1',
                    label: '中国农业银行',
                    disabled: false,
                    children: [
                        {
                            id: '越秀区1',
                            label: '越秀区',
                            disabled: false,
                            children: [
                                {
                                    id: '绍兴鉴湖支行1',
                                    label: '绍兴鉴湖支行',
                                },
                                {
                                    id: '绍兴昌安支行1',
                                    label: '绍兴昌安支行',
                                },
                                {
                                    id: '绍兴鉴湖222支行1',
                                    label: '绍兴鉴湖222支行',
                                },
                            ],
                        },
                    ],
                },
            ],
            data2: [
                {
                    id: 1,
                    label: '一级 2',
                    children: [
                        {
                            id: 3,
                            label: '二级 2-1',
                            children: [
                                {
                                    id: 4,
                                    label: '三级 3-1-1',
                                },
                                {
                                    id: 5,
                                    label: '三级 3-1-2',
                                    disabled: true,
                                },
                            ],
                        },
                        {
                            id: 2,
                            label: '二级 2-2',
                            disabled: true,
                            children: [
                                {
                                    id: 6,
                                    label: '三级 3-2-1',
                                },
                                {
                                    id: 7,
                                    label: '三级 3-2-2',
                                    disabled: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    id: '中国农业银行1',
                    label: '中国农业银行',
                    disabled: false,
                    children: [
                        {
                            id: '越秀区1',
                            label: '越秀区',
                            disabled: false,
                            children: [
                                {
                                    id: '绍兴鉴湖支行1',
                                    label: '绍兴鉴湖支行',
                                },
                                {
                                    id: '绍兴昌安支行1',
                                    label: '绍兴昌安支行',
                                },
                                {
                                    id: '绍兴鉴湖222支行1',
                                    label: '绍兴鉴湖222支行',
                                },
                            ],
                        },
                    ],
                },
            ],
        }
    },
    watch: {},
    computed: {
        // 默认选中keys []
        defaultCheckedKeys() {
            return this.checked.map(item => item.id)
        },
        myVisible: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            },
        },
    },
    methods: {
        handleChangeTab(val) {
            this.activeName = val
        },
        onTree1CheckChange() {
            const tree = this.$refs.tree1
            const keys = tree.getCheckedKeys()
            const nodes = tree
                .getCheckedNodes()
                .filter(
                    item =>
                        !Object.prototype.hasOwnProperty.call(item, 'children'),
                )
            this.currentChecked = [...nodes]
            this.$refs.tree2.setCheckedKeys(keys)
        },
        onTree2CheckChange() {
            const tree = this.$refs.tree2
            const keys = tree.getCheckedKeys()
            const nodes = tree
                .getCheckedNodes()
                .filter(
                    item =>
                        !Object.prototype.hasOwnProperty.call(item, 'children'),
                )
            this.currentChecked = [...nodes]
            this.$refs.tree1.setCheckedKeys(keys)
        },
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },

        handleSearch() {
            this.$refs.tree1.filter(this.keywords)
            this.$refs.tree2.filter(this.keywords)
        },
        handleClose() {
            this.myVisible = false
        },
        handleSave() {
            if (this.currentChecked.length <= 3) {
                this.$emit('success', [...this.currentChecked])
                this.handleClose()
            } else {
                this.$message.warning('不得多于3个')
            }
        },
    },
    created() {},
    mounted() {},
}
</script>
<style lang="less" scoped>
.my-branch-select-dialog ::v-deep {
    .el-dialog__body {
        padding: 15px;
    }

    .head {
        margin-bottom: 15px;
    }
    .tabs {
        background: #f4f4f4;
        padding: 5px;
        margin-bottom: 15px;
        display: flex;
        justify-content: center;
    }
    .tabs-content {
        margin-bottom: 15px;
        height: 280px;
        overflow-y: auto;
    }
    .tab-item {
        width: 230px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &.active {
            background-color: #fff;
            color: blue;
        }
    }
    .tips {
        display: flex;
        margin-bottom: 12px;
        justify-content: space-between;
        .error {
            color: red;
        }
        .count {
            color: #333;
        }
    }
    .action {
        display: flex;
        justify-content: center;
    }
}
</style>


```