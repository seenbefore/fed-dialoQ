<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>案例</span>
            </div>
        </template>
        <div class="box">
            <div class="item">
                <h4>案例1</h4>
                <p></p>
                <router-link to="/demo/bigscreen1">/demo/bigscreen1</router-link>
            </div>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class Row extends Vue {}
</script>

<style lang="less" scoped>
.box-card {
    .card-header {
        text-align: left;
    }
    .box {
        .item {
            display: flex;
            align-items: center;
            * {
                margin-right: 20px;
            }
        }
    }
}
</style>
