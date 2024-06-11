<!--
    左侧模块
-->
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LayoutConfig, getModuleDataConfig } from './config'
import Service from './service'

@Component({
    name: 'ModuleLeft',
    components: {},
})
export default class ModuleLeft extends Vue {
    public moduleData = getModuleDataConfig(this)
    public resData: any = {}
    created() {
        this.fiveModuleData = this.moduleData.fiveData
        this.syncData()
    }
    mounted() {}

    async syncData() {
        const res = await Service.get('module接口数据1')()
        this.resData = res.data || {}
        console.log('module接口数据1-res :>> ', res.data)
    }

    public fiveModuleData: any = {}
    changeTab(data: any) {
        console.log('change-data :>> ', data)
        const { label, value } = data.item
        this.$message.warning(`label:${label}，value:${value}`)
        this.fiveModuleData.activeTab = data.item.value
    }

    jumpEvent() {
        this.$message.warning('jump-page')
    }

    baseTabRender() {}

    render() {
        const { one, two, three, four, five, six, seven } = LayoutConfig
        const { oneData, twoData, threeData, fourData, fiveData, sixData, sevenData } = this.moduleData

        return (
            <div class="">
                <my-container props={one}>
                    <my-module-title class="big-title" props={oneData} jump-event={this.jumpEvent}></my-module-title>
                </my-container>

                <my-container props={two}>
                    <my-module-title class="big-title" props={twoData}>
                        <span class="check-btn" on-click={this.jumpEvent}>
                            详情
                        </span>
                    </my-module-title>
                </my-container>

                <my-container props={three}>
                    <my-module-title class="big-title" props={threeData}></my-module-title>
                </my-container>

                <my-container props={four}>
                    <my-module-title class="big-title" props={fourData}></my-module-title>
                </my-container>

                <my-container props={five}>
                    <my-base-tab class="tab-wrap sg-m-b-4" value={this.fiveModuleData.one.activeTab} row-span={2} list={this.fiveModuleData.one.tabList} onChangeTab={this.changeTab}></my-base-tab>

                    <my-base-tab class="tab-wrap sg-m-b-4" value={this.fiveModuleData.two.activeTab} row-span={2} list={this.fiveModuleData.two.tabList} onChangeTab={this.changeTab}>
                        <div class="" slot="after">
                            这是after-slot
                        </div>
                    </my-base-tab>

                    <my-base-tab class="tab-wrap sg-m-b-4" value={this.fiveModuleData.three.activeTab} row-span={2} list={this.fiveModuleData.three.tabList} onChangeTab={this.changeTab}></my-base-tab>
                </my-container>

                <my-container props={six}>
                    <my-module-title class="big-title" props={sixData}></my-module-title>
                </my-container>

                <my-container props={seven}>other</my-container>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.check-btn {
    cursor: pointer;
}
</style>
