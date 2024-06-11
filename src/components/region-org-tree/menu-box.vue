<template>
    <div class="menu-box">
        <global-search
            v-model="selectedOrgs"
            v-bind="{
                suggestions: rightTreeConfig.options,
                optionFieldName: rightTreeConfig.optionFieldName,
                renderOptionContent: rightTreeConfig.renderOptionContent,
                ...(searchConfig || {}),
            }"
            @change="orgTreeChange"
        ></global-search>
        <region-tree v-bind="leftTreeConfig" @change="regionTreeChange">
            <org-tree v-model="selectedOrgs" v-bind="rightTreeConfig" :selected-region="selectedRegion" @change="orgTreeChange" />
        </region-tree>
    </div>
</template>
<script lang="ts">
import { Component, Emit, Model, Prop, Vue, Watch } from 'vue-property-decorator'
import { LeftTreeConfig, Option, RightTreeConfig, SeachConfig } from './types'
import GlobalSearch from './global-search/index.vue'
import RegionTree from './region-tree.vue'
import OrgTree from './org-tree.vue'
import { getOptionFields } from './utils'
@Component({
    name: 'MenuPopver',
    components: { GlobalSearch, RegionTree, OrgTree },
})
export default class MenuPopver extends Vue {
    @Model('change', { type: Array, default: () => [] })
    value!: Option[]
    /**左侧树配置 */
    @Prop({ type: Object, default: () => ({}) })
    leftTreeConfig!: LeftTreeConfig
    /**右侧树配置 */
    @Prop({ type: Object, default: () => ({}) })
    rightTreeConfig!: RightTreeConfig
    /**搜索框配置 */
    @Prop({ type: Object, default: () => ({}) })
    searchConfig!: SeachConfig
    /**
     * 抛出值变化事件
     * @param {Option[]} selectedOrgs
     * @return {Option[]}
     */
    @Emit('change')
    emitChange(selectedOrgs: Option[]) {
        return selectedOrgs
    }

    created() {}
    mounted() {}

    /**选中的区域 */
    selectedRegion: Option[] = []
    /**
     * 区域树切换事件
     * @param {Option[]} selectedOptions
     */
    regionTreeChange(selectedOptions: Option[]) {
        this.selectedRegion = selectedOptions
    }
    /**选中的机构 */
    selectedOrgs: Option[] = []
    @Watch('value', { immediate: true, deep: true })
    watchValue(newV: Option[]) {
        const { optionFieldName } = this.rightTreeConfig
        this.selectedOrgs = newV.map(option => ({
            ...option,
            value: option[getOptionFields(optionFieldName).value],
            label: option[getOptionFields(optionFieldName).label],
        })) as Option[]
    }
    /**
     * 组织树选中事件
     * @param {Option[]} selectedOrgs
     */
    orgTreeChange(selectedOrgs: Option[]) {
        this.emitChange(selectedOrgs)
    }
}
</script>
<style lang="less" scoped>
.menu-box {
    position: relative;
    width: 392px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
}
</style>
