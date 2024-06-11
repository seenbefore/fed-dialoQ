<template>
    <div class="sg-page DemoBb">
        <span>DemoBb ss</span>
        <el-button type="primary" @click="$router.push('/demo/aa')">返回</el-button>
        <!-- <el-button type="primary" @click="go">返回</el-button> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    name: 'DemoBb',
    components: {},
})
export default class DemoBb extends Vue {
    go() {
        //this.$router.go(-1)
        history.go(-1)
    }
    mounted() {}
}
</script>

<style lang="less" scoped></style>
