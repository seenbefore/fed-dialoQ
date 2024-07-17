<!--
    center模块
-->
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LayoutConfig, ModuleDataConfig, getSingleLineOptions, getTwoLineChartOptions } from './config'
import Service from './services'

@Component({
    name: 'ModuleCenter',
    components: {},
})
export default class ModuleCenter extends Vue {
    public moduleData = ModuleDataConfig
    created() {
        this.syncData1()
        this.syncData2()
    }
    mounted() {}
    public singleChartRes: any = []
    get singleChartOptions() {
        return getSingleLineOptions(this.singleChartRes)
    }
    async syncData1() {
        const res: any = await Service.get('single_line_chart')()
        this.singleChartRes =
            res.data?.map((v: any) => ({
                name: v.name,
                val1: v.val1,
            })) || []
        console.log('single-line-res :>> ', this.singleChartRes)
    }

    public twoChartRes: any = []
    get twoChartOptions() {
        return getTwoLineChartOptions(this.twoChartRes)
    }
    async syncData2() {
        const res: any = await Service.get('two_line_chart')()
        this.twoChartRes =
            res.data?.map((v: any) => ({
                name: v.name,
                val1: v.val1,
                val2: v.val2,
            })) || []
        console.log('two-line-res :>> ', this.twoChartRes)
    }
    render() {
        const { one, two, three, four } = LayoutConfig
        const { oneData, threeData } = this.moduleData

        return (
            <div class="">
                <my-container props={one}>
                    <my-module-title class="big-title" props={oneData}></my-module-title>
                </my-container>

                <my-container props={two}>
                    <div class="chart-wrap">
                        <my-echarts class="bar-chart" width="100%" height="245px" option={this.singleChartOptions} />
                    </div>
                </my-container>

                <my-container props={three}>
                    <my-module-title class="big-title" props={threeData}></my-module-title>
                </my-container>

                <my-container props={four}>
                    <div class="chart-wrap">
                        <my-echarts class="bar-chart" width="100%" height="245px" option={this.twoChartOptions} />
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
