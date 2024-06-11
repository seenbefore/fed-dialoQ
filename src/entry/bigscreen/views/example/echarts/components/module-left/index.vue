<!--
    left模块
-->
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LayoutConfig, ModuleDataConfig, getSingleBarOptions, getTwoBarChartOptions, getHorizontalBarChartOptions } from './config'
import Service from './services'

@Component({
    name: 'ModuleLeft',
    components: {},
})
export default class ModuleLeft extends Vue {
    public moduleData = ModuleDataConfig
    created() {
        this.syncData1()
        this.syncData2()
        this.syncData3()
    }
    mounted() {}
    public singleBarChartRes: any = []
    get singleBarChartOptions() {
        return getSingleBarOptions(this.singleBarChartRes)
    }
    async syncData1() {
        const res: any = await Service.get('single_bar_chart')()
        this.singleBarChartRes =
            res.data?.map((v: any) => ({
                name: v.name,
                val1: v.val1,
            })) || []
        console.log('single-bar-res :>> ', this.singleBarChartRes)
    }

    public twoBarChartRes: any = []
    get twoBarChartOptions() {
        return getTwoBarChartOptions(this.twoBarChartRes)
    }
    async syncData2() {
        const res: any = await Service.get('two_bar_chart')()
        this.twoBarChartRes =
            res.data?.map((v: any) => ({
                name: v.name,
                val1: v.val1,
                val2: v.val2,
            })) || []
        console.log('single-bar-res :>> ', this.twoBarChartRes)
    }

    public threeBarChartRes: any[] = []
    get threeBarChartOptions() {
        const options = getHorizontalBarChartOptions(this.threeBarChartRes)
        return options
    }
    async syncData3() {
        const res: any = await Service.get('three_bar_chart')()
        this.threeBarChartRes =
            res.data?.map((v: any) => ({
                name: v.name,
                val1: v.val1,
                val2: v.val2,
            })) || []
        console.log('three-bar-res :>> ', this.threeBarChartRes)
    }

    render() {
        const { one, two, three, four, five, six } = LayoutConfig
        const { oneData, threeData, fiveData } = this.moduleData

        return (
            <div class="">
                <my-container props={one}>
                    <my-module-title class="big-title" props={oneData}></my-module-title>
                </my-container>

                <my-container props={two}>
                    <div class="chart-wrap">
                        <my-echarts class="bar-chart" width="100%" height="245px" option={this.singleBarChartOptions} />
                    </div>
                </my-container>

                <my-container props={three}>
                    <my-module-title class="big-title" props={threeData}></my-module-title>
                </my-container>

                <my-container props={four}>
                    <div class="chart-wrap">
                        <my-echarts class="bar-chart" width="100%" height="245px" option={this.twoBarChartOptions} />
                    </div>
                </my-container>

                <my-container props={five}>
                    <my-module-title class="big-title" props={fiveData}></my-module-title>
                </my-container>

                <my-container props={six}>
                    <div class="chart-wrap">
                        <my-echarts class="bar-chart" width="100%" height="185px" option={this.threeBarChartOptions} />
                    </div>
                </my-container>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.is-group {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;

    .item {
        width: calc(50%);
        margin-bottom: 26px;
    }

    ::v-deep {
        .field_1 {
            width: 100%;
        }
    }
}
</style>
