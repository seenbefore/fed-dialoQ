<template>
    <!--
    title: 基础用法
    description: 描述这个示例展示的功能点
  -->
    <div class="demo-button">
        <!-- 基础类型 -->
        <div class="demo-button__row">
            <base-button>默认按钮</base-button>
            <base-button type="primary">主要按钮</base-button>
            <base-button type="success">成功按钮</base-button>
            <base-button type="warning">警告按钮</base-button>
            <base-button type="danger">危险按钮</base-button>
            <base-button type="info">信息按钮</base-button>
        </div>

        <!-- 不同尺寸 -->
        <div class="demo-button__row">
            <base-button size="large" type="primary">大型按钮</base-button>
            <base-button type="primary">默认按钮</base-button>
            <base-button size="small" type="primary">小型按钮</base-button>
            <base-button size="mini" type="primary">迷你按钮</base-button>
        </div>

        <!-- 圆角按钮 -->
        <div class="demo-button__row">
            <base-button round>圆角按钮</base-button>
            <base-button type="primary" round>主要按钮</base-button>
            <base-button type="success" round>成功按钮</base-button>
        </div>

        <!-- 禁用状态 -->
        <div class="demo-button__row">
            <base-button disabled>禁用按钮</base-button>
            <base-button type="primary" disabled>禁用按钮</base-button>
        </div>

        <!-- 图标按钮 -->
        <div class="demo-button__row">
            <base-button icon="el-icon-edit">编辑</base-button>
            <base-button icon="el-icon-delete" type="danger">删除</base-button>
            <base-button icon="el-icon-search" type="primary">搜索</base-button>
        </div>

        <!-- 加载状态 -->
        <div class="demo-button__row">
            <base-button :loading="loading" type="primary" @click="toggleLoading">
                {{ loading ? '加载中' : '点击加载' }}
            </base-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseButton from '../index.vue'

@Component({
    name: 'DemoButton',
    components: {
        BaseButton,
    },
})
export default class DemoButton extends Vue {
    private loading = false

    private toggleLoading() {
        if (this.loading) return
        this.loading = true
        setTimeout(() => {
            this.loading = false
        }, 2000)
    }
}
</script>

<style lang="less" scoped>
.demo-button {
    float: none !important;
    &__row {
        margin-bottom: 20px;

        .base-button {
            margin-right: 10px;
            margin-bottom: 10px;
        }
    }
}
</style>
