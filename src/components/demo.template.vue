<template>
    <!--
    title: 基础用法
    description: 描述这个示例展示的功能点
  -->
    <div class="demo-component">
        <!-- 在这里编写组件使用示例 -->
        <component-name v-model="value" :prop1="prop1Value" :prop2="prop2Value" @change="handleChange" @click="handleClick">
            <!-- 插槽内容示例 -->
            <template #default>
                默认插槽内容
            </template>
            <template #custom="{ value }">自定义插槽内容: {{ value }}</template>
        </component-name>

        <!-- 如果需要，可以添加其他展示内容 -->
        <div class="demo-component__extra">当前值: {{ value }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ComponentName from '../index.vue'

@Component({
    name: 'DemoComponent',
    components: {
        ComponentName,
    },
})
export default class DemoComponent extends Vue {
    // 组件所需的数据
    private value = ''
    private prop1Value = 'test'
    private prop2Value = 42

    // 事件处理方法
    private handleChange(value: any) {
        console.log('值变化:', value)
    }

    private handleClick(event: Event) {
        console.log('点击事件:', event)
    }
}
</script>

<style lang="less" scoped>
.demo-component {
    // 示例组件的样式
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 4px;

    &__extra {
        margin-top: 16px;
        color: #666;
    }
}
</style>
