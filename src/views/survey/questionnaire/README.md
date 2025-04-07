# 问卷管理模块

## 1. 模块概述

问卷管理模块提供完整的问卷设计、发布、预览和填写功能，支持多种题型（单选题、多选题、填空题），可用于客户调研、意见收集、满意度评价等场景。

## 2. 功能特性

- **问卷列表管理**：支持问卷的查询、筛选、排序
- **问卷设计编辑**：支持多种题型，实时预览
- **问卷发布控制**：支持问卷的发布和下线
- **问卷预览填写**：支持问卷的预览和模拟填写
- **问卷结果统计**：统计问卷回答数量

## 3. 目录结构
```src/views/survey/questionnaire/
├── api.ts # 接口定义
├── enum.ts # 枚举定义
├── index.vue # 问卷列表页面
├── mock.js # 模拟数据
├── router.js # 路由定义
├── components/ # 组件
│ ├── QuestionnaireEditor.vue # 问卷编辑器组件
│ └── QuestionnairePreview.vue # 问卷预览组件
├── preview/ # 问卷预览填写
│ ├── index.vue
│ └── router.js
└── save/ # 问卷编辑-预览一体化页面
├── index.vue
└── router.js
```

## 4. 接口说明

### 4.1 问卷列表接口

```typescript
/**
 * 获取问卷列表
 * @url /survey/questionnaire/list
 * @method POST
 */
export function list(
    data?: {
        /** 问卷标题 */ title?: string
        /** 发布状态 */ status?: string
        /** 创建开始时间 */ createTimeStart?: string
        /** 创建结束时间 */ createTimeEnd?: string
        /** 页码 */ page?: number
        /** 每页条数 */ pageSize?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<QuestionnaireVO[]>>>({
        url: '/survey/questionnaire/list',
        method: 'post',
        data,
        ...options,
    })
}
```

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| title | string | 否 | 问卷标题，模糊匹配 |
| status | string | 否 | 发布状态，参考QuestionnaireStatusEnum |
| createTimeStart | string | 否 | 创建开始时间，格式：yyyy-MM-dd |
| createTimeEnd | string | 否 | 创建结束时间，格式：yyyy-MM-dd |
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页条数，默认10 |

**返回数据格式：**

```json
{
    "code": 200,
    "message": "请求成功",
    "data": {
        "data": [
            {
                "id": "1",
                "title": "用户满意度调查",
                "responseCount": 120,
                "status": "1",
                "createTime": "2023-05-10 10:00:00",
                "updateTime": "2023-05-15 16:30:00",
                "description": "一个简单的用户满意度调查",
                "isAnonymous": true,
                "publishTime": "2023-05-10 12:00:00",
                "endTime": "2023-06-10 23:59:59"
            }
        ],
        "total": 50
    }
}
```

### 4.2 问卷详情接口

```typescript
/**
 * 获取问卷详情
 * @url /survey/questionnaire/detail
 * @method GET
 */
export function detail(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<QuestionnaireVO>>({
        url: '/survey/questionnaire/detail',
        method: 'get',
        params: data,
        ...options,
    })
}
```

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | string | 是 | 问卷ID |

**返回数据格式：**

```json
{
    "code": 200,
    "message": "请求成功",
    "data": {
        "id": "1",
        "title": "用户满意度调查",
        "responseCount": 120,
        "status": "1",
        "createTime": "2023-05-10 10:00:00",
        "updateTime": "2023-05-15 16:30:00",
        "description": "一个简单的用户满意度调查",
        "content": "{\"questions\":[{\"id\":\"1\",\"type\":\"singleChoice\",\"title\":\"您的性别是？\",\"options\":[{\"id\":\"1-1\",\"text\":\"男\"},{\"id\":\"1-2\",\"text\":\"女\"}],\"required\":true}]}",
        "isAnonymous": true,
        "publishTime": "2023-05-10 12:00:00",
        "endTime": "2023-06-10 23:59:59"
    }
}
```

### 4.3 保存问卷接口

```typescript
/**
 * 保存问卷
 * @url /survey/questionnaire/save
 * @method POST
 */
export function save(
    data?: {
        /** id */ id?: string
        /** 问卷标题 */ title: string
        /** 问卷描述 */ description?: string
        /** 问卷内容 */ content?: string
        /** 发布状态 */ status: string
        /** 是否匿名 */ isAnonymous?: boolean
        /** 截止时间 */ endTime?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/survey/questionnaire/save',
        method: 'post',
        data,
        ...options,
    })
}
```

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | string | 否 | 问卷ID，不传表示新增 |
| title | string | 是 | 问卷标题 |
| description | string | 否 | 问卷描述 |
| content | string | 否 | 问卷内容，JSON格式字符串 |
| status | string | 是 | 发布状态，参考QuestionnaireStatusEnum |
| isAnonymous | boolean | 否 | 是否匿名填写 |
| endTime | string | 否 | 截止时间，格式：yyyy-MM-dd HH:mm:ss |

**content数据格式示例:**

```json
{
    "questions": [
        {
            "id": "1683123456789",
            "type": "singleChoice",
            "title": "您的性别是？",
            "options": [
                { "id": "1683123456789-1", "text": "男" },
                { "id": "1683123456789-2", "text": "女" }
            ],
            "required": true
        },
        {
            "id": "1683123456790",
            "type": "multipleChoice",
            "title": "您喜欢的水果有哪些？",
            "options": [
                { "id": "1683123456790-1", "text": "苹果" },
                { "id": "1683123456790-2", "text": "香蕉" },
                { "id": "1683123456790-3", "text": "橙子" }
            ],
            "required": false
        },
        {
            "id": "1683123456791",
            "type": "text",
            "title": "您对我们的建议是什么？",
            "required": false
        }
    ]
}
```

**返回数据格式：**

```json
{
    "code": 200,
    "message": "保存成功"
}
```

### 4.4 删除问卷接口

```typescript
/**
 * 删除问卷
 * @url /survey/questionnaire/remove
 * @method POST
 */
export function remove(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/survey/questionnaire/remove',
        method: 'post',
        data,
        ...options,
    })
}
```

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | string | 是 | 问卷ID |

**返回数据格式：**

```json
{
    "code": 200,
    "message": "删除成功"
}
```

### 4.5 更新问卷状态接口

```typescript
/**
 * 发布/下线问卷
 * @url /survey/questionnaire/updateStatus
 * @method POST
 */
export function updateStatus(
    data?: {
        /** id */ id: string
        /** 状态 */ status: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/survey/questionnaire/updateStatus',
        method: 'post',
        data,
        ...options,
    })
}
```

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | string | 是 | 问卷ID |
| status | string | 是 | 问卷状态，参考QuestionnaireStatusEnum |

**返回数据格式：**

```json
{
    "code": 200,
    "message": "操作成功"
}
```

## 5. 数据结构说明

### 5.1 问卷状态枚举

```typescript
/** 问卷状态 */
export enum QuestionnaireStatusEnum {
    /** 草稿 */
    DRAFT = '0',
    /** 已发布 */
    PUBLISHED = '1',
    /** 已下线 */
    OFFLINE = '2',
}
```

### 5.2 问卷数据结构

```typescript
export interface QuestionnaireVO {
    /** ID */
    id: string
    /** 问卷标题 */
    title: string
    /** 答卷数量 */
    responseCount: number
    /** 发布状态 0草稿 1已发布 2已下线 */
    status: string
    /** 创建时间 */
    createTime: string
    /** 更新时间 */
    updateTime: string
    /** 问卷描述 */
    description?: string
    /** 问卷内容 */
    content?: string
    /** 是否匿名 */
    isAnonymous?: boolean
    /** 发布时间 */
    publishTime?: string
    /** 截止时间 */
    endTime?: string
}
```

### 5.3 问题类型定义

```typescript
interface Question {
    id: string
    type: 'singleChoice' | 'multipleChoice' | 'text'
    title: string
    options: Array<{ id: string; text: string }>
    required: boolean
}
```

## 6. 使用场景

### 6.1 创建问卷

1. 进入问卷列表页面
2. 点击"新增"按钮
3. 在编辑页面填写问卷标题、描述等基本信息
4. 添加问题，设置题型和选项
5. 实时预览问卷效果
6. 点击"保存草稿"或"发布"按钮提交问卷

### 6.2 编辑问卷

1. 在问卷列表中找到需要编辑的问卷
2. 点击"编辑"按钮
3. 修改问卷信息和问题
4. 点击"保存草稿"或"发布"按钮提交修改

### 6.3 预览问卷

1. 在问卷列表中找到需要预览的问卷
2. 点击"预览"按钮
3. 在预览页面查看问卷效果并可测试填写

### 6.4 发布/下线问卷

1. 在问卷列表中找到需要操作的问卷
2. 点击"发布"或"下线"按钮
3. 确认操作后完成状态更新

### 6.5 删除问卷

1. 在问卷列表中找到需要删除的问卷
2. 点击"删除"按钮
3. 确认删除操作

## 7. 常见问题

### 7.1 问卷内容格式

问卷内容采用JSON格式存储，前端需要进行序列化和反序列化处理。

### 7.2 问卷状态流转

```问卷状态流转图：

草稿(DRAFT) -> 发布(PUBLISHED) -> 下线(OFFLINE)
                     ^                |
                     |                v
                     +----------------+
```

### 7.3 问卷设计建议

1. 问卷标题简洁明了
2. 问题数量适中，避免过多导致填写疲劳
3. 问题描述清晰，避免歧义
4. 选项设计全面，覆盖可能的回答
5. 必填项设置合理，避免强制填写导致用户放弃

## 8. 开发备注

1. 问卷内容采用JSON字符串存储，前端需要进行序列化和反序列化处理
2. 问卷编辑页面使用左右分栏设计，左侧编辑，右侧实时预览
3. 问卷预览页面支持模拟填写体验
4. 问卷状态控制发布后可修改为下线，下线后可重新发布
5. 对于新增功能，推荐在content字段中扩展，保持接口兼容性
