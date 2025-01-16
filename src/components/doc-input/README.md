# 文书组件(DocInput)

## 简介
DocInput是一个用于处理文书录入、编辑、预览的Vue组件。它能够根据后端返回的模板配置，动态生成文书表单，支持多种控件类型，并提供了丰富的数据处理和交互功能。

## 功能特性
- 支持文书模板动态解析和渲染
- 提供多种控件类型（日期、选择器、复选框、图片等）
- 支持文书数据的保存、暂存和预览
- 支持自定义数据源和默认值
- 支持文书附件管理
- 支持表单验证
- 支持自定义保存方法和获取数据方法

## 安装使用

### 1. 安装
直接将`doc-input`文件夹整体复制到你的项目中。

### 2. 基础用法

```vue
<template>
    <doc-input ref="docRef" :doc-params="docParams"></doc-input>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DocInput from '@/components/doc-input'

@Component({
    components: {
        DocInput
    }
})
export default class YourComponent extends Vue {
    docParams = {
        caseId: '', // 案件ID
        documentCatalogCode: '', // 文书种类编码
        operateType: '', // 操作类型
        documentId: '', // 被送达文书id
        partyId: '', // 当事人id
        // ... 其他参数
    }
}
</script>
```

### 3. 组件方法

#### 3.1 保存文书
```typescript
// 保存文书数据
this.$refs.docRef.saveData(fileList?: any[], tabIndex?: number): Promise<any>
```

#### 3.2 暂存文书
```typescript
// 暂存文书数据
this.$refs.docRef.temporaryData(fileList?: any[]): Promise<boolean>
```

#### 3.3 预览文书
```typescript
// 预览文书
this.$refs.docRef.docPreview(): Promise<any>
```

#### 3.4 获取表单数据
```typescript
// 获取表单数据
this.$refs.docRef.getSendData(fileList?: any[], tabIndex?: number): Promise<{
    tabIndex?: number;
    values: any;
    sendData: Record<string, any>;
}>
```

## Props说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| docParams | Object | 是 | - | 文书参数对象 |
| isCustomSaveHttp | Boolean | 否 | false | 是否使用自定义保存方法 |
| readonlyName | String | 否 | 'isEdit' | 控制只读的字段名称 |
| customGetDocBaseInfo | Function | 否 | null | 自定义获取文书配置信息的方法 |
| customGetDocForm | Function | 否 | null | 自定义获取表单数据的方法 |
| getParamsDocForm | Object | 否 | {} | 获取表单数据时的自定义参数 |
| cusTemporaryParams | Object | 否 | {} | 暂存或保存时的自定义参数 |
| cusDocFormData | Object | 否 | {} | 文书表单的默认值 |

### docParams参数说明

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| caseId | String | 是 | 案件ID |
| documentCatalogCode | String | 是 | 文书种类编码 |
| operateType | String | 否 | 操作类型 |
| documentId | String | 否 | 被送达文书id |
| partyId | String | 否 | 当事人id |
| sourcePage | String | 否 | 来源页面 |
| isNeedApproval | String | 否 | 是否需要审批 |
| documentTemplateCode | String | 否 | 文书模板代码 |
| surveyPeopleId | String | 否 | 调查人员ID |
| documentKindCode | String | 否 | 文书类型代码 |
| templateCode | String | 否 | 模板代码 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| emitLoading | 加载状态变化时触发 | (loading: boolean) |
| emitDataMap | 自定义保存时触发 | (tabIndex: number, values: any, sendData: any, resolve: Function) |

## 控件类型
组件支持多种控件类型，每种控件都以独立组件的形式开发：

- 复选框控件 (checkbox-control)
- 日期控件 (datetime-control)
- 图片控件 (image-control)
- 选择器控件 (select-control)
- 地图选址控件 (map-address)
- 其他自定义控件

## 如何扩展新控件

1. 在`components`目录下创建新的控件组件
2. 参考`select-control`的实现方式进行开发
3. 在`components/doc-parse/index.ts`的`parseTemplate`方法中添加新控件的配置：

```typescript
// 示例：添加新控件
case CONTROL_TYPE.YOUR_CONTROL:
    return {
        component: YourControl,
        props: {
            // 控件需要的属性
        }
    }
```

## 数据来源配置
组件支持多种数据来源配置：

- DATETIME_FILL_DAY: 填表日期
- SOURCE_API: API数据源
- DATETIME_CURRENT_LOCATIONFILL_DAY: 当前位置
- LOGIN_USER_INFO: 登录用户信息

## 注意事项
1. 在使用自定义保存方法时，需要通过`emitDataMap`事件获取表单数据
2. 文书模板的解析依赖于后端返回的配置信息
3. 控件的验证规则需要在模板配置中指定
4. 文件上传需要通过`fileList`参数传入

## 示例代码

### 使用自定义保存方法
```vue
<template>
    <doc-input
        ref="docRef"
        :doc-params="docParams"
        :is-custom-save-http="true"
        @emitDataMap="handleEmitDataMap"
    ></doc-input>
</template>

<script lang="ts">
export default class YourComponent extends Vue {
    handleEmitDataMap(tabIndex: number, values: any, sendData: any, resolve: Function) {
        // 自定义保存逻辑
        yourSaveMethod(sendData).then(() => {
            resolve(true)
        })
    }
}
</script>
```

### 使用自定义表单数据
```vue
<template>
    <doc-input
        ref="docRef"
        :doc-params="docParams"
        :cus-doc-form-data="cusDocFormData"
    ></doc-input>
</template>

<script lang="ts">
export default class YourComponent extends Vue {
    cusDocFormData = {
        field1: 'defaultValue1',
        field2: 'defaultValue2'
    }
}
</script>
```

#### 文书配置系统(基线)

http://gitlab.icinfo.co/fed/fed-base-template-doc

#### 如何使用 (以浙江省处罚系统为例)

http://gitlab.icinfo.co/fed/fed-template-zjcfba/-/blob/master/src/entry/supervisionlaw/components/global/doc-input/README.md

> 直接把doc-input文件夹整体copy到你的项目中