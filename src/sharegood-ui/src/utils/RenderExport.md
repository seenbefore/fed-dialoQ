# RenderExport 导出组件

RenderExport 是一个用于将数据导出为 Excel 文件的工具类，支持自定义表头、合并单元格、样式设置等功能。

## 基本用法

```javascript
import RenderExport from '@/sharegood-ui/src/utils/renderExport'

// 创建实例
const exporter = new RenderExport(columns, config)

// 导出数据
exporter.downloadExl(data, fileName)
```

## 参数说明

### 构造函数参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| columns | Array | 是 | 列配置数组 |
| config | Object | 否 | 配置项 |

### config 配置项

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| defaultValue | string | '' | 空值显示的默认值 |

### columns 列配置

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| prop | string | 是 | 数据字段名 |
| label | string | 是 | 列标题 |
| width | number/string | 否 | 列宽度 |
| children | Array | 否 | 子列配置，用于表头分组 |
| exportRender | Function | 否 | 自定义导出渲染函数 |

## 使用示例

### 示例1：基础导出

最简单的导出示例，只包含基本的列配置：

```javascript
// 定义列配置
const columns = [
    { prop: 'name', label: '姓名', width: 100 },
    { prop: 'age', label: '年龄', width: 80 },
    { prop: 'address', label: '地址', width: 200 }
]

// 准备数据
const data = [
    { name: '张三', age: 25, address: '北京市' },
    { name: '李四', age: 30, address: '上海市' }
]

// 创建导出实例并下载
const exporter = new RenderExport(columns, {
    defaultValue: '-'
})
exporter.downloadExl(data, '用户信息表')
```

### 示例2：自定义渲染

包含自定义渲染函数的导出示例：

```javascript
const columns = [
    { 
        prop: 'status', 
        label: '状态',
        width: 100,
        exportRender: (row) => ({
            v: row.status === 1 ? '启用' : '禁用',
            s: {
                fill: {
                    fgColor: { rgb: row.status === 1 ? '00B659' : 'FF0000' }
                }
            }
        })
    },
    {
        prop: 'date',
        label: '日期',
        width: 150,
        exportRender: (row) => moment(row.date).format('YYYY-MM-DD HH:mm:ss')
    },
    {
        prop: 'score',
        label: '得分',
        width: 80,
        exportRender: (row) => ({
            v: row.score,
            s: {
                font: {
                    bold: row.score >= 60
                }
            }
        })
    }
]

const data = [
    { status: 1, date: '2024-03-20T10:00:00', score: 85 },
    { status: 0, date: '2024-03-21T14:30:00', score: 45 }
]

const exporter = new RenderExport(columns)
exporter.downloadExl(data, '成绩单')
```

### 示例3：复杂表头与样式

包含合并单元格、多级表头和复杂样式配置的导出示例：

```javascript
const columns = [
    {
        prop: 'name',
        label: '基本信息',
        children: [
            { prop: 'userName', label: '姓名', width: 100 },
            { prop: 'userNo', label: '工号', width: 100 },
            { prop: 'department', label: '部门', width: 150 }
        ]
    },
    {
        prop: 'exam',
        label: '考试信息',
        children: [
            {
                prop: 'examResult',
                label: '考试结果',
                width: 100,
                exportRender: (row) => ({
                    v: row.score >= 60 ? '通过' : '未通过',
                    s: {
                        fill: {
                            fgColor: { rgb: row.score >= 60 ? '00B659' : 'FF7CD4' }
                        },
                        font: {
                            bold: true,
                            color: { rgb: 'FFFFFF' }
                        },
                        alignment: {
                            horizontal: 'center',
                            vertical: 'center'
                        }
                    }
                })
            },
            {
                prop: 'score',
                label: '分数',
                width: 80,
                exportRender: (row) => ({
                    v: row.score,
                    s: {
                        font: {
                            color: { rgb: row.score >= 60 ? '00B659' : 'FF0000' }
                        }
                    }
                })
            },
            {
                prop: 'detail',
                label: '详细得分',
                children: [
                    { prop: 'theory', label: '理论', width: 80 },
                    { prop: 'practice', label: '实践', width: 80 },
                    { prop: 'attitude', label: '态度', width: 80 }
                ]
            }
        ]
    }
]

const data = [
    {
        userName: '张三',
        userNo: 'EMP001',
        department: '技术部',
        score: 85,
        theory: 90,
        practice: 85,
        attitude: 80
    },
    {
        userName: '李四',
        userNo: 'EMP002',
        department: '市场部',
        score: 55,
        theory: 60,
        practice: 50,
        attitude: 55
    }
]

const exporter = new RenderExport(columns, {
    defaultValue: '-'
})
exporter.downloadExl(data, '员工考核表')
```

## 样式配置说明

RenderExport 支持通过 `exportRender` 函数返回样式配置，样式配置对象包含以下属性：

### 单元格样式 (s)

```javascript
{
    // 边框
    border: {
        top: { style: 'thin', color: '#666' },
        bottom: { style: 'thin', color: '#666' },
        left: { style: 'thin', color: '#666' },
        right: { style: 'thin', color: '#666' }
    },
    // 背景色
    fill: {
        fgColor: { rgb: 'FFFFFF' }
    },
    // 字体
    font: {
        sz: 12, // 字号
        bold: true, // 粗体
        color: { rgb: '000000' } // 字体颜色
    },
    // 对齐
    alignment: {
        horizontal: 'center', // 水平对齐
        vertical: 'center', // 垂直对齐
        wrap_text: true // 自动换行
    }
}
```

## 注意事项

1. 导出大量数据时需要考虑性能问题，建议分批导出
2. 设置列宽时可以使用数字或带单位的字符串（如：'100px'）
3. 使用 `exportRender` 时要注意返回格式的正确性
4. 多级表头的配置需要通过 `children` 属性进行嵌套
5. 样式配置时的颜色值需要使用6位十六进制值，不要包含"#"号 