<!--
   中间模块
-->
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LayoutConfig, ModuleDataConfig } from './config'
import Service from './service'

@Component({
    name: 'ModuleCenter',
    components: {},
})
export default class ModuleCenter extends Vue {
    public moduleData = ModuleDataConfig
    public resData: any = {}
    created() {
        this.syncData()
        // this.getTableList()
    }
    mounted() {}
    async syncData() {
        const res = await Service.get('module接口数据1')()
        this.resData = res.data || {}
        console.log('module接口数据1-res :>> ', res.data)
    }

    public tableData: any = []
    async getTableList() {
        const res = await Service.get('table接口数据')()
        this.tableData = res.data || []
        console.log('table接口数据-res :>> ', res.data)
    }

    public fourModuleData = ModuleDataConfig.fourData

    jumpEvent() {
        this.$router.push('/template-one')
    }

    async loadTable(query: any) {
        console.log('query :>> ', query)
        const res = await await Service.get('table接口数据')()
        console.log('table接口数据-res :>> ', res)
        const { data, total } = res
        return {
            result: data.slice(0, 15),
            total,
        }
    }

    render() {
        const { one, two, three, four, five, six, seven, eight } = LayoutConfig
        const { oneData, twoData, threeData, fourData, fiveData, sixData } = this.moduleData

        const { auto, pageVisible, tabRowSpan, tabList, tableColumns } = fourData
        console.log('fourData :>> ', fourData)

        return (
            <div class="">
                <my-container props={one}>
                    <my-module-title class="big-title" props={oneData} jump-event={this.jumpEvent}></my-module-title>
                </my-container>

                <my-container props={two}>
                    <div class="is-group sg-flexbox align-center">
                        <my-text-item class="item" font-size="28px" layout="column" color="#0AE0FF" res-data={this.resData} item={twoData} />

                        <my-text-item class="item" font-size="28px" layout="row" color="#0AE0FF" res-data={this.resData} item={twoData} />
                    </div>
                </my-container>

                <my-container props={three}>
                    <my-module-title class="big-title" props={threeData}></my-module-title>
                </my-container>

                <my-container props={four}>
                    <my-tab-table class="tab-wrap sg-m-b-4" value={this.fourModuleData.activeTab} props={fourData} load={this.loadTable}></my-tab-table>
                </my-container>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.is-group {
    .item {
        width: 50%;
    }
}
</style>
