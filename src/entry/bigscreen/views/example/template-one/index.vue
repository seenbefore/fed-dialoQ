<template>
    <my-sg-page :width="1920" :height="1080" :title-img="titleImg" is-scale>
        <my-container v-bind="layout.one">
            <my-module-title class="big-title" v-bind="moduleData.oneData" :jump-event="jumpEvent"></my-module-title>
        </my-container>

        <my-container v-bind="layout.four">
            <my-base-tab class="tab-wrap sg-m-b-4" v-model="fourModuleData.activeTab" :row-span="2" :list="fourModuleData.tabList" @changeTab="changeFourTab"></my-base-tab>
        </my-container>
    </my-sg-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LayoutConfig, ModuleDataConfig } from './config'

@Component({
    name: 'ExampleTemplateOne',
    components: {},
})
export default class ExampleTemplateOne extends Vue {
    layout = LayoutConfig
    moduleData = ModuleDataConfig
    titleImg = require('./assets/title-img.png')
    public fourModuleData = ModuleDataConfig.fourData
    changeFourTab(data: any) {
        console.log('change-data :>> ', data)
        // this.fourModuleData.activeTab = data.item.value
    }
    mounted() {}
    jumpEvent() {
        console.log('jump-page :>> ')
    }
}
</script>

<style lang="less" scoped></style>
