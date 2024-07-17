<template>
    <div>
        <barChart />
        <el-row :gutter="10">
            <el-col :lg="12" :md="24">
                <liquidFill></liquidFill>
            </el-col>
            <el-col :lg="12" :md="24"></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :lg="12" :md="24">
                <pieChart />
            </el-col>
            <el-col :lg="12" :md="24">
                <circleChart />
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import barChart from './barChart.vue'
import pieChart from './pieChart.vue'
import circleChart from './circleChart.vue'
import liquidFill from './liquidFill.vue'

@Component({
    components: {
        barChart,
        pieChart,
        circleChart,
        liquidFill,
    },
})
export default class Charts extends Vue {
    private digit = 9224
    created() {}
    mounted() {
        setInterval(() => {
            this.digit = this.digit + 493
            setTimeout(() => {
                let el: any = this.$refs.digit
                el && el.transition && el.transition()
            }, 200)
        }, 5000)
    }
}
</script>

<style lang="less" scoped></style>
