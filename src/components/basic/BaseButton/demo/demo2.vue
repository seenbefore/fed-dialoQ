<template>
    <!--
    title: 基础用法
    description: 描述这个示例展示的功能点
  -->
    <div class="demo-button">
        11111
        <!-- 基础类型 -->
        <div class="demo-button__row">
            <base-button>默认按钮</base-button>
            <base-button type="primary">主要按钮</base-button>
            <base-button type="success">成功按钮</base-button>
            <base-button type="warning">警告按钮</base-button>
            <base-button type="danger">危险按钮</base-button>
            <base-button type="info">信息按钮</base-button>
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
