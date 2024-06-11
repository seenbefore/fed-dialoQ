<!--
   中间模块
-->
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LayoutConfig, getModuleDataConfig } from './config'
import Service from './service'

@Component({
    name: 'ModuleCenter',
    components: {},
})
export default class ModuleCenter extends Vue {
    public moduleData = getModuleDataConfig(this)
    public resData: any = {}
    created() {
        this.syncData()
        this.getTableList1()
        this.getTableList2()
    }
    mounted() {}
    async syncData() {
        const res = await Service.get('module接口数据1')()
        this.resData = res.data || {}
        console.log('module接口数据1-res :>> ', res.data)
    }

    jumpEvent() {
        this.$router.push('/example/template-one')
    }

    customEventFunc() {
        this.$router.go(-1)
    }

    public twoTableData: any = []
    async getTableList1() {
        const res = await Service.get('table接口数据1')()
        this.twoTableData = res.data || []
        console.log('table接口数据-res :>> ', res.data)
    }
    public fourTableData: any = []
    async getTableList2() {
        const res = await Service.get('table接口数据2')()
        this.fourTableData = res.data || []
        console.log('table接口数据-res :>> ', res.data)
    }

    handleClickGg(row?: any) {
        console.log('row :>> ', row)
    }

    render() {
        const { one, two, three, four } = LayoutConfig
        const { oneData, twoData, threeData, fourData } = this.moduleData

        const poolAttrs = {
            props: fourData,
            scopedSlots: {
                slotGgdt: ({ row }: any) => {
                    return (
                        <div class="item-ggdt" on-click={() => this.handleClickGg(row)}>
                            <div class="ggdt-title">{row.name1}</div>
                            <div class="lines-2 ggdt-desc">{row.name2}</div>
                        </div>
                    )
                },
            },
        }

        return (
            <div class="">
                <my-container props={one}>
                    <my-module-title class="big-title" props={oneData} jump-event={this.jumpEvent}></my-module-title>
                </my-container>

                <my-container props={two}>
                    111
                    <my-pool-list data={this.twoTableData} props={twoData}></my-pool-list>
                </my-container>

                <my-container props={three}>
                    <my-module-title class="big-title" props={threeData} jump-event={this.jumpEvent}></my-module-title>
                </my-container>

                <my-container props={four}>
                    <my-pool-list class="table-llcg" data={this.fourTableData} {...poolAttrs}></my-pool-list>
                </my-container>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.table-llcg {
    ::v-deep {
        .mplc-table {
            font-size: 18px;
            .table-cell-class {
                padding: 4px 0;
                color: #fff;
            }
        }
    }
}
.item-ggdt {
    cursor: pointer;
    padding: 8px;

    .ggdt-title {
        font-size: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .ggdt-desc {
        margin-top: 5px;
        font-size: 14px;
    }
}
</style>
