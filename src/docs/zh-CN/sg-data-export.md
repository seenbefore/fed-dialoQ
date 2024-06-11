## 导出excel
:::demo

```html
<template>
    <div>
        <sg-data-export :data="dataList" :columns="columns" name="明星表"
            >导出按钮</sg-data-export
        >
    </div>
</template>

<script>
    export default {
        name: 'DemoTable',
        components: {},
        data() {
            return {
                dataList: [
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
                ],
                columns: [
                    {
                        label: '性别',
                        prop: 'gender',
                        render(row) {
                            return row['gender'] == '1' ? '男' : '女'
                        },
                    },
                    {
                        label: '备注',
                        prop: 'remark',
                    },
                    {
                        label: '创建时间',
                        prop: 'date',
                    },
                ],
            }
        },
    }
</script>
```

:::

### 基础属性

| 参数    | 说明         | 类型   | 可选值 | 默认值 |
| ------- | ------------ | ------ | ------ | ------ |
| name    | 导出文件名称 | String | —      | data   |
| label   | 按钮文案     | String | —      | 导出   |
| columns | 数据列配置   | Array  | —      |        |
| data    | 元数据       | Array  | —      |        |

### 方法

| 事件名称 | 说明 | 回调参数 |
| -------- | ---- | -------- |


### 事件

| 事件名称 | 说明     | 回调参数 |
| -------- | -------- | -------- |
| click    | 按钮点击 |          |
| success  | 完成下载 |          |


