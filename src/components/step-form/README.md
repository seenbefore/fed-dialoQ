# StepForm 步骤表单组件

基于 Element UI 的步骤表单组件,用于分步骤收集表单数据。

## Props

| 参数 | 说明 | 类型 | 必填 | 默认值 |
|-|-|-|-|-|
| steps | 步骤配置数组 | StepConfig[] | 是 | - |
| value/v-model | 当前步骤索引 | number | 否 | 0 |

### StepConfig 配置项

| 参数 | 说明 | 类型 | 必填 | 默认值 |
|-|-|-|-|-|
| title | 步骤标题 | string | 是 | - |
| component | 步骤对应的组件 | Component | 是 | - |
| props | 传递给组件的属性 | Record<string, any> | 否 | - |
| render | 自定义底部按钮渲染函数 | Function | 否 | - |

## Events

| 事件名 | 说明 | 回调参数 |
|-|-|-|
| input | 步骤改变时触发 | 当前步骤索引 |
| save | 点击保存按钮时触发 | 表单数据 |
| cancel | 点击取消按钮时触发 | - |

## 功能特性

- 支持多步骤表单
- 每个步骤可以是独立的组件
- 支持表单验证
- 支持自定义底部按钮
- 支持自定义渲染函数
- 保持步骤组件状态(keep-alive)

## 使用方法

### 基础用法

```vue
<template>
    <div class="sg-page icinfo-ai CaseSave">
        <StepForm v-model="currentStep" :steps="steps"></StepForm>
    </div>
</template>
<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import StepForm, { StepConfig } from '@/components/step-form/index.vue'
@Component({
    name: 'CaseSave',
    components: {
        StepForm,
    },
})
export default class CaseSave extends Vue {
    /** 当前步骤 */
    currentStep = 0
    get steps() {
        return [
            // 第一步
            {
                title: '卷宗封面',
                component: () => import('@/views/file-review/components/case-step-cover/index.vue'),
                props: {
                    // 传递给组件的属性
                },
                render: (h, { row, handlers }) => {
                    return (
                        <div>
                            <el-button
                                type="primary"
                                onClick={async () => {
                                    // 获取当前组件
                                    const currentComponent = handlers.getCurrentComponent()
                                    // 保存当前组件数据
                                    const result = await currentComponent.save()
                                    // 下一步
                                    handlers.next()
                                }}
                            >
                                下一步
                            </el-button>
                        </div>
                    )
                },
            },
        ]
    }
}
</script>
```