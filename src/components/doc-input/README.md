#### 文书配置系统(基线)

http://gitlab.icinfo.co/fed/fed-base-template-doc

#### 如何使用 (以浙江省处罚系统为例)

http://gitlab.icinfo.co/fed/fed-template-zjcfba/-/blob/master/src/entry/supervisionlaw/components/global/doc-input/README.md

> 直接把doc-input文件夹整体copy到你的项目中

```vue
<template>
    <doc-input ref="docRef" :doc-params="docParams"></doc-input>
</template>
<script>

</script>
```

保存

```vue
this.$refs.docRef.saveData()
```

暂存

```vue
this.$refs.docRef.temporaryData()
```

预览

```vue
this.$refs.docRef.docPreview()
```



> 一般文书的保存方法都是直接这样调用就可以了, 如果某个文书在暂存或保存时需要传一些额外的参数,参考下面props

#### Props

| 参数                 | 类型     | 备注                            |
| -------------------- | -------- | ------------------------------- |
| isCustomSaveHttp     | Boolean  | 是否采用自定义的保存方法        |
| customGetDocBaseInfo | Function | 替换组件中的getDocBaseInfo方法  |
| customGetDocForm     | Function | 替换组件中的getDocFormData方法  |
| getParamsDocForm     | Object   | 在获取表单中数据时,自定义的入参 |
| cusTemporaryParams   | Object   | 暂存或保存时需要的自定义参数    |
| cusDocFormData       | Object   | 文书上显示的默认值              |



### 文书模板解析组件
该组件用于将文书html字符串模板解析成vue组件
核心解析方法为`generateDocParseComp`，类型控件均以组件化形式独立开发

#### 目录结构
```
|-- index.vue ------------ 文书解析组件
|-- components ------ 不同类别的控件组件
    |-- checkbox-control ------------- 复选框组件
    |-- datetime-control ------------- 日期组件
    |-- doc-parse ------------- 文书解析组件
    |-- image-control ------------- 图片组件
    |-- select-control ------------- 选择器组件
|-- images ------------- 图片
|-- service --------------------- 公共方法服务
```

#### 如何拓展组件
关于组件的书写可以参考`select-control`组件
拓展好组件后如何使用：在`components/doc-parse/index.ts`里的`parseTemplate`方法中，将你的组件枚举出来，并处理好，你要传入的参数即可