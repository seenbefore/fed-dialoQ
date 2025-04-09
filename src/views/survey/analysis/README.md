# 问卷数据分析模块

## 1. 模块功能概述

问卷数据分析模块是一个全面的问卷调查数据可视化和管理工具，用于分析和展示问卷调查的数据统计、趋势图表和答卷详情。该模块主要包含四个核心功能：参与概述、统计分析、答卷列表和答卷详情。

### 主要功能：

- **参与概述**：展示问卷回收总体情况统计和趋势图
- **统计分析**：展示各个问题的统计结果和图表
- **答卷列表**：查询、筛选和管理所有答卷记录
- **答卷详情**：查看单个答卷的详细内容和AI分析总结

## 2. 接口文档

### 2.1 获取问卷列表

```typescript
/**
 * 获取问卷列表
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
)
```

**返回数据类型：**

```typescript
Result<PageResponse<QuestionnaireVO[]>>

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

### 2.2 获取问卷详情

```typescript
/**
 * 获取问卷详情
 */
export function detail(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
)
```

**返回数据类型：**

```typescript
Result<QuestionnaireVO>
```

### 2.3 获取答卷列表

```typescript
/**
 * 获取答卷列表
 * @param data 参数
 */
export function responseList(
    data?: {
        /** 问卷ID */ questionnaireId?: string
        /** 提交人 */ submitter?: string
        /** 提交开始时间 */ submitTimeStart?: string
        /** 提交结束时间 */ submitTimeEnd?: string
        /** 页码 */ page?: number
        /** 每页数量 */ pageSize?: number
    },
    options?: any,
)
```

**返回数据类型：**

```typescript
Result<PageResponse<ResponseVO[]>>

export interface ResponseVO {
    /** 答卷ID */
    id: string
    /** 问卷ID */
    questionnaireId: string
    /** 问卷标题 */
    questionnaireTitle: string
    /** 答卷内容JSON字符串 */
    content: string
    /** 提交时间 */
    submitTime: string
    /** 提交人 */
    submitter: string
    /** 提交人ID */
    submitterId: string
    /** 答题时长(秒) */
    duration: number
    /** AI总结内容 */
    aiSummary: string
}
```

### 2.4 获取答卷详情

```typescript
/**
 * 获取答卷详情
 * @param id 答卷ID
 */
export function responseDetail(id: string, options?: any)
```

**返回数据类型：**

```typescript
Result<ResponseVO>
```

### 2.5 获取问卷统计数据

```typescript
/**
 * 获取问卷统计数据
 */
export function statistics(
    data?: {
        /** 问卷ID */ questionnaireId: string
    },
    options?: ExAxiosRequestConfig,
)
```

**返回数据类型：**

```typescript
Result<StatisticsVO>

export interface StatisticsVO {
    /** 问卷ID */
    questionnaireId: string
    /** 问卷标题 */
    questionnaireTitle: string
    /** 总答卷数 */
    totalResponses: number
    /** 问题统计 */
    questionStats: QuestionStatVO[]
    /** 答完率 */
    completionRate: number
    /** 平均花费时间(秒) */
    averageDuration: number
    /** 每日答卷数量统计 */
    dailyResponses: DailyResponseVO[]
}

export interface QuestionStatVO {
    /** 问题ID */
    questionId: string
    /** 问题标题 */
    questionTitle: string
    /** 问题类型 */
    questionType: string
    /** 选项统计 */
    optionStats?: OptionStatVO[]
    /** 文本回答 */
    textResponses?: string[]
}

export interface OptionStatVO {
    /** 选项ID */
    optionId: string
    /** 选项文本 */
    optionText: string
    /** 选择次数 */
    count: number
    /** 选择百分比 */
    percentage: number
}

export interface DailyResponseVO {
    /** 日期 */
    date: string
    /** 答卷数量 */
    count: number
}
```

### 2.6 导出答卷数据

```typescript
/**
 * 导出答卷数据
 */
export function exportResponses(
    data?: {
        /** 问卷ID */ questionnaireId: string
    },
    options?: ExAxiosRequestConfig,
)
```

**返回数据类型：**

```typescript
Blob // Excel文件二进制数据
```

## 3. 功能模块说明

### 3.1 参与概述

参与概述页面展示问卷的整体参与情况和趋势图，主要包含以下内容：

- **统计卡片**：
  - 答卷总数：问卷收到的总答卷份数
  - 答完率：完成问卷的比例，以百分比形式展示
  - 平均花费时间：答卷者平均用时，以分钟为单位

- **答卷趋势图**：
  - 显示近7天的答卷数量变化趋势
  - 使用柱状图展示每日提交的答卷数量

### 3.2 统计分析

统计分析页面展示每个问题的详细统计结果和可视化图表，支持以下问题类型的统计：

- **单选题**：
  - 饼图展示各选项的选择比例
  - 表格展示具体数据（人数、比例）

- **多选题**：
  - 柱状图展示各选项的选择次数
  - 表格展示具体数据（人数、比例）

- **文本题**：
  - 列表形式展示所有文本回答

### 3.3 答卷列表

答卷列表页面提供查询、导出和查看功能：

- **查询条件**：
  - 提交人：支持按提交人姓名筛选
  - 提交时间：支持日期范围筛选

- **数据表格**：
  - 显示序号、提交人、提交时间、答题耗时、AI总结等信息
  - 支持查看详情操作

- **导出功能**：
  - 支持将答卷数据导出为Excel文件

### 3.4 答卷详情

答卷详情页面采用二分栏布局，展示答卷具体内容和AI分析总结：

- **左侧内容**：
  - 答卷基本信息（提交人、提交时间、答题耗时）
  - 问题列表，按问卷结构显示所有问题及答案

- **右侧内容**：
  - AI分析总结，支持Markdown格式
  - 包含用户画像、反馈要点、情感分析和建议跟进等内容

## 4. 页面示例

### 4.1 参与概述页面

![参与概述](./assets/overview.png)

### 4.2 统计分析页面

![统计分析](./assets/statistics.png)

### 4.3 答卷列表页面

![答卷列表](./assets/responses.png)

### 4.4 答卷详情页面

![答卷详情](./assets/response-detail.png)

## 5. 后端开发指南

### 5.1 需重点关注的接口

针对后端开发，以下接口需要优先实现：

1. **统计接口**：`statistics` - 这是整个分析模块的核心，需要支持实时计算和聚合查询
2. **AI总结接口**：`responseDetail` 和 `responseList` 中的 `aiSummary` 字段需要接入AI分析能力

### 5.2 数据处理建议

1. **性能优化**：
   - 针对大量数据的统计查询，建议使用缓存机制
   - 对于趋势图数据，可预先计算并定时更新

2. **AI总结实现**：
   - 可集成第三方NLP服务或开源模型
   - 总结内容应包含：用户画像、关键反馈点、情感分析和后续行动建议
   - 返回格式支持Markdown，前端会解析并展示

3. **数据安全**：
   - 敏感信息脱敏处理
   - 根据用户权限控制数据访问范围

## 6. 更新日志

| 版本号 | 更新日期 | 更新内容 |
|--------|----------|----------|
| v1.0.0 | 2023-04-07 | 初始版本，包含参与概述、统计分析、答卷列表和答卷详情功能 |
| v1.1.0 | 2023-04-10 | 新增AI总结功能，优化二分栏布局 | 