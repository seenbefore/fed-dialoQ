<!--
   base - tab - 组件
-->
<template>
    <el-row class="my-base-tab" :gutter="rowSpan">
        <el-col v-for="(item, index) in list" :span="colSpan" :class="['tab-item', value === item.value && 'is-active']" :key="index">
            <div class="tab-item__content" :style="value === item.value ? activeStyle : defaultStyle" @click="changeTab(item, index)">
                <div class="item-label sg-m-r-4">
                    <span class="label-before" v-html="item.beforeLabel" v-if="item.beforeLabel"></span>
                    <span class="label-center" v-html="item.label" v-if="item.label"></span>
                    <span class="label-after" v-html="item.afterLabel" v-if="item.afterLabel"></span>
                </div>
                <slot name="after" :item="item" :index="index" />
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ITabOption, ITabConfig } from '../../../../types/index'

const DEFAULT_CONFIG = {
    defaultBgColor: 'rgba(0,84,255,0.3)',
    defaultColor: 'rgba(255,255,255,0.6)',
    defaultFontSize: '16px',
    activeBgColor: 'rgba(0,84,255,0.6)',
    activeColor: 'rgba(255,255,255)',
    activeFontSize: '16px',
}

@Component({
    name: 'MyBaseTab',
    components: {},
})
export default class MyBaseTab extends Vue {
    @Prop({ default: '' }) value!: string | number
    @Prop({ default: () => DEFAULT_CONFIG }) config!: ITabConfig
    @Prop({ default: 10 }) rowSpan!: number
    @Prop({ default: () => [] }) list!: ITabOption[]
    get colSpan() {
        return 24 / this.list.length
    }
    get bindStyle() {
        return { ...DEFAULT_CONFIG, ...this.config }
    }
    /** 默认样式 */
    get defaultStyle() {
        const { defaultBgColor, defaultColor, defaultFontSize } = this.bindStyle
        const style = {
            background: defaultBgColor,
            color: defaultColor,
            'font-size': defaultFontSize,
        }
        return style
    }
    /** 选中样式 */
    get activeStyle() {
        const { activeBgColor, activeColor, activeFontSize } = this.bindStyle
        return {
            background: activeBgColor,
            color: activeColor,
            'font-size': activeFontSize,
        }
    }
    created() {}
    mounted() {}
    changeTab(item: ITabOption, index: number) {
        this.$emit('input', item.value)
        this.$emit('changeTab', { item, index })
    }
}
</script>

<style lang="less" scoped>
.my-base-tab {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #1677ff;
    margin-right: 0 !important;
    margin-left: 0 !important;

    .tab-item {
        flex: 1;
        color: #333;
        line-height: 34px;

        &:first-child {
            padding-left: 0 !important;
        }

        &:last-child {
            padding-right: 0 !important;
        }

        .tab-item__content {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            border-radius: 4px 4px 0 0;
            background: #fff;
            white-space: nowrap;
            font-size: 14px;
            cursor: pointer;
        }
    }
}
</style>
