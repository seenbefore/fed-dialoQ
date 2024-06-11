<template>
    <div class="region-tree">
        <div class="select-path">
            <template v-if="selectedOptions.length === 0">
                <div class="no-selected">请选择</div>
            </template>
            <el-tabs v-else>
                <el-tab-pane v-for="(option, index) in selectedOptions" :key="option.value">
                    <template #label>
                        <span @click="pathClick(option)" v-text="option.label"></span>
                        <i v-if="index + 1 !== selectedOptions.length" class="el-breadcrumb__separator el-icon-arrow-right"></i>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="tree-content">
            <div class="tree-children">
                <el-scrollbar wrap-class="region-tree__wrap">
                    <div
                        class="tree-node"
                        v-for="option in showOptions[showOptions.length - 1]"
                        :key="option.value"
                        :class="{ active: isChecked(option) }"
                        v-text="option.label"
                        @click="chooseOption(option)"
                    ></div>
                </el-scrollbar>
            </div>
            <div class="right-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { Option, LeftTreeConfig, OptionFieldNames } from './types'
import { dfsTreeMap, getOptionFields } from './utils'
@Component({
    name: 'RegionTree',
    components: {},
})
export default class RegionTree extends Vue {
    /**父组件宽度 */
    @Prop({ type: Number, default: 0 })
    inputWidth!: number
    /**获取选项值 */
    @Prop({ type: Function, default: () => [] })
    options!: LeftTreeConfig['options']
    /**是否在下一级选项中显示父级选中节点 */
    @Prop({ type: Boolean, default: true })
    isShowParentNode!: LeftTreeConfig['isShowParentNode']
    /**选项字段配置 */
    @Prop({ type: Object, default: () => ({}) })
    optionFieldName!: LeftTreeConfig['optionFieldName']
    /**
     * 抛出值变化事件
     * @param {Option[]} selectedOptions
     * @return {Option[]}
     */
    @Emit('change')
    emitChange(selectedOptions: Option[]) {
        return selectedOptions
    }

    created() {}
    mounted() {}

    selectedLastValue: Option['value'] = ''
    /**应显示的选项 */
    showOptions: Option[][] = []
    /**选中的选项 */
    selectedOptions: Option[] = []
    /**所有选项集合 */
    myOptions: Option[] = []

    @Watch('options', { immediate: true })
    async watchOptions() {
        let options = []
        if (Array.isArray(this.options)) {
            options = this.options
        } else {
            options = await this.options()
        }
        this.selectedOptions = []
        const myOptions = dfsTreeMap(options, node => {
            return {
                ...node,
                value: node[getOptionFields(this.optionFieldName).value],
                label: node[getOptionFields(this.optionFieldName).label],
            }
        }) as Option[]
        this.myOptions = myOptions
        this.showOptions.push(myOptions.map(item => ({ ...item, level: 0 })))
        const [first] = this.showOptions[0] ?? []
        if (first) {
            this.chooseOption(first)
        }
    }

    /**
     * 是否选中
     * @param {Option} option
     * @return {Boolean}
     */
    isChecked(option: Option) {
        return this.selectedLastValue === option.value
    }
    /**
     * 判断是否是全选操作(即，父级插入到子集做全选按钮使用)
     * @param {Option} option
     * @return {Boolean}
     */
    isAllOpera(option: Option) {
        // 判断选中集合中是否存在
        const has = this.selectedOptions.some(item => item.value === option.value)
        const lastSelectedOption = this.selectedOptions[this.selectedOptions.length - 1]
        // 判断选中集合中最后一项是否是当前项
        const notLast = !lastSelectedOption || lastSelectedOption.value !== option.value
        return has && notLast
    }
    /**
     * 判断是否是叶子节点
     * @param {Option} option
     * @return {Boolean}
     */
    isLeaf(option: Option) {
        return !Array.isArray(option.children) || option.children.length === 0
    }

    /**
     * 节点选择事件
     * @param {Option} option
     */
    chooseOption(option: Option) {
        if (this.selectedLastValue === option?.value) return
        this.selectedLastValue = option?.value ?? ''
        let selectedOptions = [...this.selectedOptions]
        if (option) {
            // 如果点击的是全选按钮，
            if (this.isAllOpera(option)) {
                this.selectedOptions.splice(this.selectedOptions.length - 1, 1)
                return
            }
            const has = selectedOptions.some(item => item.value === option.value)
            if (!has) {
                const level = option.level ?? 0
                selectedOptions[level] = option
            }
            selectedOptions = Array.from(new Set(selectedOptions))
            if (!this.isLeaf(option)) {
                // 补充项
                const additionalOptions = this.isShowParentNode ? [{ ...option }] : []
                this.showOptions.push(
                    [...additionalOptions, ...(option.children ?? [])].map(item => ({
                        ...item,
                        level: selectedOptions.length,
                    })),
                )
            }
        }
        this.selectedOptions = selectedOptions
        this.emitChange(this.selectedOptions)
    }

    /**
     * 选中路径点击事件
     * @param {Option} option
     */
    pathClick(option: Option) {
        const level = option.level ?? 0
        this.selectedOptions.splice(level, Infinity)
        this.showOptions.splice(level + 1, Infinity)
        const lastSelectedOption = this.selectedOptions[this.selectedOptions.length - 1]
        this.chooseOption(lastSelectedOption)
    }
}
</script>

<style lang="less" scoped>
.region-tree {
    .select-path {
        padding: 0 14px 5px 14px;
        border-bottom: 1px solid #ddd;
        .no-selected {
            color: #999;
        }
        ::v-deep {
            .el-tabs {
                margin: 0;
                .el-tabs__nav-next,
                .el-tabs__nav-prev {
                    line-height: 20px;
                    .el-icon-arrow-left::before {
                        content: '\e6ea';
                    }
                    .el-icon-arrow-right::before {
                        content: '\e6e9';
                    }
                }
                .el-breadcrumb__separator {
                    color: #666;
                }

                .el-tabs__header {
                    margin-bottom: 0;
                    .el-tabs__nav-wrap {
                        .el-tabs__active-bar,
                        &::after {
                            display: none;
                        }
                        .el-tabs__item {
                            padding: 0;
                            height: 20px;
                            line-height: 20px;
                            color: #333;
                        }
                    }
                }
            }
        }
    }
    .tree-content {
        display: flex;
        .tree-children {
            overflow: hidden;
            width: 132px;
            .tree-node {
                user-select: none;
                padding: 4px 14px;
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                color: #333333;
                cursor: pointer;
                &:hover {
                    background-color: #f5f7fa;
                }
                &.active {
                    color: #188dfb;
                    font-weight: bold;
                }
            }
            ::v-deep .region-tree__wrap {
                height: 310px;
            }
        }
    }
    .right-content {
        flex: 1;
        border-left: 1px solid #ddd;
    }
}
</style>
