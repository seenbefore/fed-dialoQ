<template>
    <div>
        <el-skeleton :animated="true" :rows="3" title avatar />
        <el-divider />
        <el-skeleton :animated="true" :rows="5" title :title-width="'200px'" :row-height="'20px'" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'SkeletonDemo1',
})
export default class SkeletonDemo1 extends Vue {}
</script>

<style scoped>
.el-divider {
    margin: 24px 0;
}
</style>
