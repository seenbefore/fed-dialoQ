<template>
    <div class="tree-input" ref="treeInput">
        <div class="tree-input-top" @click="showOptsClick" :class="{ selection: showContent, 'is-disabled': disabled }">
            <p v-if="Xtabs.length === 0">{{ placeholder }}</p>
            <div class="xtabs-cont">
                <input class="xtabs-title" v-model="xtabsLabels" readonly />
                <span v-if="multiple && Xtabs.length">
                    <span class="xtabs-count">{{ Xtabs.length }}</span>
                </span>
                <span class="x-textbox3-suffix x-treeSelect-clear" v-if="Xtabs.length && !disabled" @click="clear">
                    <span class="x-closebutton x-small x-textbox3-clear"></span>
                </span>
                <div class="more">
                    <i class="el-icon-arrow-down" :class="{ anticon: showContent }"></i>
                </div>
            </div>
        </div>
        <div class="tree-nodes-box" v-show="showContent">
            <div class="tree-nodes-content">
                <BaseTreeCheckbox
                    v-if="multiple"
                    :data="data"
                    :no-flat="noFlat"
                    :label-key="labelKey"
                    :children-key="childrenKey"
                    :value-key="valueKey"
                    :checkeds="Xtabs"
                    :is-show-select-all="isShowSelectAll"
                    @update:checkeds="XtabsChange"
                ></BaseTreeCheckbox>
                <BaseTreeRadio v-else :data="data" :label-key="labelKey" :children-key="childrenKey" :value-key="valueKey" :checkeds="Xtabs" @update:checkeds="XtabsChange"></BaseTreeRadio>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import BaseTreeCheckbox from './components/BaseTreeCheckbox.vue'
import BaseTreeRadio from './components/BaseTreeRadio.vue'
import { CheckedInfo } from './components/BaseTreeCheckbox.vue'

@Component({
    name: 'MyTreeSelect',
    components: {
        BaseTreeCheckbox,
        BaseTreeRadio,
    },
})
export default class BaseTreeSelect extends Vue {
    @Ref('treeInput') treeInput!: HTMLElement
    /** 组件的值 */
    @Prop({ type: Array, default: () => [] })
    public value!: CheckedInfo[]
    @Watch('value')
    private valueChange(val: CheckedInfo[], old: CheckedInfo[]) {
        if (val === this.Xtabs) {
            return
        }

        this.Xtabs = val
    }
    /** 可否全选 */
    @Prop({ type: Boolean, default: true })
    private isShowSelectAll!: boolean
    /** 是否禁用，默认：false */
    @Prop({ type: Boolean, default: false })
    private disabled!: boolean
    /** 模拟的输入框的提示 */
    @Prop({ type: String, default: '请选择' })
    private placeholder!: string
    /** 是否多选，默认：true */
    @Prop({ type: Boolean, default: true })
    private multiple!: boolean
    /** 树的数据中用于值的key关键词 */
    @Prop({ type: String, default: 'value' })
    private valueKey!: string
    /** 树的数据中用于显示的key关键词 */
    @Prop({ type: String, default: 'label' })
    private labelKey!: string
    /** 树的数据中用于指定上下级的key关键词 */
    @Prop({ type: String, default: 'children' })
    private childrenKey!: string
    /** 是否显示选择box */
    private showContent = false
    /** 选中的tab的数据详情集合 */
    private Xtabs: any = []
    /** 数据源 */
    @Prop({ type: Array, default: () => [] })
    private data!: []
    /** 不需要重复展开 */
    @Prop({ type: Boolean, default: false })
    private noFlat!: false
    /** 选中的标题集合 */
    private get xtabsLabels(): string {
        return this.Xtabs.map((v: any) => v[this.labelKey]).join(',')
    }
    mounted() {
        this.Xtabs = this.value
        document.addEventListener('click', this.closeTreeSelect, false)
    }
    beforeDestroy() {
        document.removeEventListener('click', this.closeTreeSelect, false)
    }
    /** 关闭下拉框 */
    private closeTreeSelect(e: any) {
        if (!this.treeInput?.contains(e.target)) {
            this.showContent = false
        }
    }
    showOptsClick() {
        // 禁用时，不触发任何操作
        if (this.disabled) {
            return
        }
        this.showContent = !this.showContent
    }
    /** 选项改变时 */
    private XtabsChange(list: CheckedInfo[]) {
        this.Xtabs = list
        this.$emit('input', list)
    }
    clear(e: Event) {
        e?.stopImmediatePropagation()
        this.Xtabs = []
        this.$emit('input', this.Xtabs)
    }
}
</script>
<style lang="less" scoped>
.tree-input {
    position: relative;
    min-width: 200px;
    width: 100%;
    cursor: pointer;
    .tree-input-top {
        position: relative;
        overflow: hidden;
        height: 34px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        background: #fff;
        display: flex;
        &.is-disabled {
            background-color: #f5f7fa;
            border-color: #e4e7ed;
            .more {
                background-color: #f5f7fa;
            }
            .xtabs-cont .xtabs-title {
                color: #c0c4cc;
                cursor: not-allowed;
            }
        }
        &:not(.app-disabled):hover {
            outline: 0;
            border-color: #40a9ff;
        }

        &.selection {
            outline: 0;
            border-color: #40a9ff;
            border-right-width: 1px !important;
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);

            .more {
                .anticon {
                    transform: rotateZ(180deg);
                }
            }
        }

        &.app-disabled {
            background: #f5f5f5;

            .more {
                background: #f5f5f5;
            }
        }

        > p {
            margin: 0;
            padding-left: 10px;
            height: 30px;
            color: #999;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            line-height: 30px;
            white-space: nowrap;
        }

        .xtabs-cont {
            display: inline-flex;
            height: 30px;
            cursor: pointer;
            width: 100%;
            align-items: center;
            .xtabs-title {
                box-sizing: border-box;
                width: 100%;
                padding: 0 0.75rem;
                color: #17233d;
                text-overflow: ellipsis;
                flex: 1;
                border: 0;
                background: transparent;
                outline: none;
                cursor: pointer;
            }
        }

        .more {
            width: 20px;
            height: 30px;
            background: #fff;
            line-height: 30px;

            .anticon {
                transition: 0.3s ease;
                transform-origin: 50% 50%;
            }
        }
    }
    .tree-nodes-box {
        position: absolute;
        top: 37px;
        z-index: 10;
        display: block;
        border-radius: 4px;
        width: 100%;
        .tree-nodes-content {
            outline: none;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
    }
    .xtabs-count {
        border: 1px solid #d9dfe6;
        text-align: center;
        min-width: 0.8rem;
        padding: 0 0.2rem;
        line-height: 1.25;
        font-size: 12px;
        border-radius: 0.15rem;
        background-color: #f6f8fa;
    }
    .x-textbox3-suffix {
        color: #a2a7b1;
        .x-closebutton {
            display: block;
            border-color: #fff;
            border-radius: 50%;
            box-sizing: content-box;
            width: 1.12em;
            height: 1.12em;
            background-color: #cbcfd6;
            background-clip: content-box;
            cursor: pointer;
            -webkit-transition: background-color 0.15s;
            transition: background-color 0.15s;
            font-size: 0.8rem;
            padding: 0.3775em;
            &:hover {
                background-color: #edf0f5;
            }
            &::before,
            &::after {
                content: '';
                display: block;
                margin-left: 0.156rem;
                margin-top: 0.37rem;
                border-top-width: 1.6px;
                border-top-style: solid;
                border-top-color: inherit;
                border-radius: 0.8px;
                height: 0;
                width: 0.8em;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
            }
            &::after {
                margin-top: -1.6px;
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
            }
        }
    }
}
</style>
