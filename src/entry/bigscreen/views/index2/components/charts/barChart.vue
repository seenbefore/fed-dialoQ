<template>
    <div class="box">
        <Chart :option="option" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import option from './modules/bar.js'
import Chart from '@/components/base/Chart/index.vue'
@Component({
    components: {
        Chart,
    },
})
export default class Charts extends Vue {
    private option: any = option
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped>
.box {
    overflow: hidden;
    box-sizing: border-box;
    margin: 10px auto 0;
    padding: 20px;
    width: 100%;
    height: 400px;
    background: var(--system-page-background);
}
</style>
