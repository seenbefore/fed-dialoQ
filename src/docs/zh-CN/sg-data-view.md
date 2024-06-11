## 动态表格

### 基本使用
:::demo
```html
<template>
    <div class="sg-page-demo">
        <el-switch
            active-text="隐藏性别"
            inactive-text="显示性别"
            v-model="isShowGender"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
        <sg-data-view
            @selection-change="onSelectionChange"
            :columns="columns"
            :load="load"
            ref="tableRef"
           
        >
        
            <template slot="myinfo">
                <el-table-column label="基本信息">
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="fans"
                        label="粉丝数"
                        width="120">
                        <template slot-scope="{row}">
                            {{row.fans}}个
                        </template>
                    </el-table-column>
                </el-table-column>
            </template>
            <template slot-scope="scope" slot="dom">
                <el-tag
                    type="warning"
                    v-for="(tag, index) in scope.row['dom'].split(',')"
                    :key="index"
                    style="margin-right:5px"
                    v-html="tag"
                    ></el-tag
                >
            </template>
        </sg-data-view>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                isShowGender:true,
                query: {
                    name: '测试'
                },
                selected: [], // 选中的公司id
                load: params => {
                  
                    params = {
                        ...params, // 分页信息
                        ...this.query,
                    }
                   
    
                    return this.syncData(params)
                },
                columns: [
                    {
                        label: '全选',
                        type: 'selection',
                    },
                    {
                        label: '序号',
                        type: 'index',
                    },
                    {
                        prop: 'myinfo',
                        type:'slot'
                    },
                    {
                        label: '名字',
                        prop: 'name',
                        width: '200px',
                    },
                    {
                        label: '性别',
                        prop: 'gender',
                        render: (h, { row }) => {
                            return row['gender'] == '1' ? '男' : '女'
                        },
                        // 显示隐藏列
                        ifRender:()=>{
                            return this.isShowGender === true
                        }
                    },
                    

                   

                    {
                        label: '生日',
                        prop: 'birthday',
                        width: '100px',
                        
                    },

                    {
                        label: '标签',
                        prop: 'dom',
                        slotName: 'dom',
                        width: '200px',
                    },

                    
                    {
                        label: '备注',
                        prop: 'remark',
                        width: '200px',
                        tooltip: true,
                    },
                    {
                        label: '创建时间',
                        prop: 'date',
                        width: '200px',
                    },
                    {
                        label: '操作',
                        prop: 'action',
                        width: '150px',
                        fixed:'right',  
                        render: (h, { row }) => {
                            // 默认网格不可操作

                            return [
                                h(
                                    'el-button',
                                    {
                                        props: {
                                            type: 'text',
                                        },
                                        on: {
                                            click: () => {
                                                this.handleUpdate(row)
                                            },
                                        },
                                    },
                                    '编辑',
                                ),

                                h(
                                    'el-button',
                                    {
                                        props: {
                                            type: 'text',
                                        },
                                        on: {
                                            click: () => {
                                                this.handleDelete(row)
                                            },
                                        },
                                    },
                                    '删除',
                                ),
                            ]
                        },
                    },
                ],
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        methods: {
            syncData() {
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve({
                            result: [
                                {
                                    name: '张国荣',
                                    birthday: '1967-12-12',
                                    fans: 10000,
                                    gender: 1,

                                    dom: '香港,帅气',

                                    remark:
                                        '张国荣（1956年9月12日-2003年4月1日），出生于香港，中国香港男歌手、演员、音乐人，影视歌多栖发展的代表之一。1977年正式出道。1983年以《风继续吹》获得关注。1984年演唱的《Monica》是香港歌坛第一支同获十大中文金曲、十大劲歌金曲的舞曲',
                                },
                                {
                                    name: '张学友',
                                    birthday: '1967-11-12',
                                    fans: 20000,
                                    gender: 1,

                                    dom: '歌神,吻别',

                                    remark:
                                        '1990年，张学友在拍摄电影《阿飞正传》的间隙，也在筹备新专辑，每日奔波两地，十分辛苦。唱到今天，2020年7月10日，张学友59岁了。还有多少人，在等他的演唱会？岁月，请你慢点走，且让歌神再唱一首',
                                },
                                {
                                    name: '周星驰',
                                    birthday: '1967-11-12',
                                    fans: 20000,
                                    gender: 1,

                                    dom: '喜剧',

                                    remark: '周星驰',
                                },
                            ],
                            total: 120,
                        })
                    }, 1000)
                })
            },
            handleUpdate(row) {
                this.selected = [row]
            },
            handleDelete(row) {
                this.selected = [row]
            },
            onSelectionChange(val) {
                console.log('onSelectionChange', val)
                this.selected = val
            },
        },
    }
</script>


```
:::

### 跨页勾选
:::demo
```html
<template>
    <div class="sg-page-demo">
        <div class="result" v-text="selected"></div>
        <sg-data-view
            :multiple-selection-all="multipleSelectionAll"
            :columns="columns"
            :load="load"
            ref="tableRef"
            :id-key="idKey"
            @selection-change-all="onChange"
        >
        </sg-data-view>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            // 初始化需要勾选的数据
            multipleSelectionAll: [{ id: 111 }, { id: 11 }, { id: 18 }],
            // 唯一匹配的字段
            idKey:'id',
            selected: [], // 选中的公司id
            load: params => {
                params = {
                    ...params, // 分页信息
                    ...this.query,
                }

                return this.syncData(params)
            },
            columns: [
                {
                    label: '全选',
                    type: 'selection',
                },

                {
                    label: 'id',
                    prop: 'id',
                },

                {
                    label: '名字',
                    prop: 'name',
                },
                {
                    label: '昵称',
                    prop: 'nickName',
                },
            ],
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.selected = this.multipleSelectionAll
    },
    methods: {
        onChange(val) {
            console.log(val)
            this.selected = val
        },
        async syncData(params = {}) {
            const { pageNum = 1 } = params
            if (pageNum === 1) {
                return {
                    result: [
                        {
                            id: 11,
                            name: 'Mark Rodriguez',
                            nickName: '姚艳',
                            status: 1,
                            role: '信息录入人员',
                            isAdmin: 0,
                        },
                        {
                            id: 12,
                            name: 'Steven Moore',
                            nickName: '陈洋',
                            status: 1,
                            role: '普通人员',
                            isAdmin: 1,
                        },
                        {
                            id: 13,
                            name: 'Kenneth Jackson',
                            nickName: '杨娜',
                            status: 0,
                            role: '系统管理员',
                            isAdmin: 0,
                        },
                        {
                            id: 14,
                            name: 'Scott Hall',
                            nickName: '张丽',
                            status: 1,
                            role: '普通人员',
                            isAdmin: 1,
                        },
                        {
                            id: 15,
                            name: 'Elizabeth Martinez',
                            nickName: '沈杰',
                            status: 1,
                            role: '数据统计人员',
                            isAdmin: 0,
                        },
                        {
                            id: 16,
                            name: 'Joseph Jackson',
                            nickName: '毛芳',
                            status: 1,
                            role: '数据统计人员',
                            isAdmin: 0,
                        },
                        {
                            id: 17,
                            name: 'Mary Moore',
                            nickName: '曾涛',
                            status: 1,
                            role: '信息录入人员',
                            isAdmin: 1,
                        },
                        {
                            id: 18,
                            name: 'Carol Hernandez',
                            nickName: '吴勇',
                            status: 1,
                            role: '平台管理员',
                            isAdmin: 0,
                        },
                        {
                            id: 19,
                            name: 'David Martin',
                            nickName: '袁伟',
                            status: 0,
                            role: '普通人员',
                            isAdmin: 1,
                        },
                        {
                            id: 20,
                            name: 'Joseph Harris',
                            nickName: '江磊',
                            status: 1,
                            role: '数据统计人员',
                            isAdmin: 1,
                        },
                    ],
                    total: 12,
                }
            } else {
                return {
                    result: [
                        {
                            id: 111,
                            name: 'Mark Rodriguez',
                            nickName: '姚艳撒大大',
                            status: 1,
                            role: '信息录入人员',
                            isAdmin: 0,
                        },
                        {
                            id: 122,
                            name: 'Steven Moore',
                            nickName: '陈洋萨达',
                            status: 1,
                            role: '普通人员',
                            isAdmin: 1,
                        },
                    ],
                    total: 12,
                }
            }
        },
    },
}
</script>



```
:::



### 树形数据与懒加载
:::demo
```html
<template>
    <div class="sg-page-demo">

        <sg-data-view
            :columns="columns"
            :load="load"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
        </sg-data-view>

        <sg-data-view
            :columns="columns"
            :load="load2"
            :tree-load="treeLoad"
            row-key="id"
            lazy
           
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
        </sg-data-view>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            load: async (params) => {
                params = {
                    ...params, // 分页信息
                    ...this.query,
                }

                return {
                    result: [
                        {
                            id: 1,
                            date: '2016-05-02',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1518 弄',
                        },
                        {
                            id: 2,
                            date: '2016-05-04',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1517 弄',
                        },
                        {
                            id: 3,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄',
                            children: [
                                {
                                    id: 31,
                                    date: '2016-05-01',
                                    name: '王小虎',
                                    address: '上海市普陀区金沙江路 1519 弄',
                                },
                                {
                                    id: 32,
                                    date: '2016-05-01',
                                    name: '王小虎',
                                    address: '上海市普陀区金沙江路 1519 弄',
                                },
                            ],
                        },
                        {
                            id: 4,
                            date: '2016-05-03',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1516 弄',
                        },
                    ],
                    total: 12,
                }
            },
            load2: async () => {
            
                return {
                    result:[{
                        id: 1,
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                        id: 2,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                        }, {
                        id: 3,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄',
                        hasChildren: true
                        }, {
                        id: 4,
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }],
                    total:100
                }
            },
            columns: [
                {
                    label: '日期',
                    prop: 'date',
                    sortable: true,
                },

                {
                    label: '名字',
                    prop: 'name',
                },
                {
                    label: '地址',
                    prop: 'address',
                },
            ],
        }
    },
    methods: {
        treeLoad(tree, treeNode, resolve) {
            setTimeout(() => {
                resolve([
                    {
                        id: 31,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        id: 32,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }
                ])
            }, 1000)
        }
    },
}
</script>



```
:::





### 基础属性

| 参数          | 说明               | 类型     | 可选值 | 默认值 |
| ------------- | ------------------ | -------- | ------ | ------ |
| defaultValue  | 默认值             |          | —      | -      |
| columns       | 列配置             | Array    | —      | -      |
| auto          | 第一次是否自动请求 | Boolean  | —      | true   |
| pagination    | 页面配置 ,参考element-ui         | Object   | —      |  `{page: 1, pageSize: 10, pageSizes: [10, 20, 50, 100, 200]}`      |
| load          | 数据请求返回一个`Promise`,成功后`resolve({result:[],total:1000}) `          | Function |        |    result为数据集,total为总数    |
| paramsSerializer  | 返回新的页码参数对象           | Function({page,pageSize,size}) |        |        |
| multipleSelectionAll       | 跨页初始数据             | Array    | —      | -      |
| idKey       | 跨页匹配字段             | String    | —      | -      |




### 方法

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| onLoad   | 重新获取数据 | {page:1,pageSize} ,不传则表示当前页|

### 事件
参考 element table

| 事件名称 | 说明 | 回调参数 |
| -------- | ---- | -------- |
| selection-change-all | 跨页勾选变化 | 勾选的数组 |



### 列属性

| 参数     | 说明       | 类型 | 可选值 | 默认值 |
| -------- | ---------- | ---- | ------ | ------ |
| label    | 表头名称   |      | —      | -      |
| prop     | 表头 key   |      | —      | -      |
| width    | 宽度 150px |      | —      | -      |
| minWidth    | 最小宽度：推荐使用 |      | —      | -      |
| render   | 自定义渲染 |      | —      | -      |
| slotName | 插槽区域   |      | —      | -      |