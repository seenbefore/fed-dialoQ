<!--
    右侧模块
-->
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LayoutConfig, getModuleDataConfig } from './config'
import Service from './services'

@Component({
    name: 'ModuleRight',
    components: {},
})
export default class ModuleRight extends Vue {
    public moduleData = getModuleDataConfig()
    created() {
        this.syncData()
    }
    mounted() {}

    async syncData() {
        const res: any = await Service.get('echarts_single_bar')()
    }
    render() {
        const { one, two, three, four } = LayoutConfig
        const { oneData, twoData, threeData, fourData, fiveData } = this.moduleData

        return (
            <div class="">
                <my-container props={one}>
                    <my-module-title class="big-title" props={oneData}></my-module-title>
                </my-container>

                <my-container class="sg-flexbox align-center" props={two}>
                    <my-progress-bar class="is-progress" props={twoData}></my-progress-bar>
                    <my-progress-bar class="is-progress" props={threeData}></my-progress-bar>
                    <my-progress-bar class="is-progress is-line" props={fourData}></my-progress-bar>
                    <my-progress-bar class="is-progress is-line" props={fiveData}></my-progress-bar>
                </my-container>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.is-progress {
    flex: 1;
}
</style>
