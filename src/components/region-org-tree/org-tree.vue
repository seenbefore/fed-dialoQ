<template>
    <div class="org-tree" v-loading="loading">
        <div class="default" v-if="myOptions.length === 0">
            <img src="./images/default.svg" />
            <span>请先在左侧选择地区</span>
        </div>
        <div v-else class="tree-container">
            <div class="all-choose">
                <el-checkbox :value="allChecked === 'all'" :indeterminate="allChecked === 'half'" @change="chooseAll">
                    全选
                </el-checkbox>
            </div>
            <el-scrollbar wrap-class="region-tree__wrap">
                <el-tree
                    ref="tree"
                    check-on-click-node
                    default-expand-all
                    :expand-on-click-node="false"
                    :data="myOptions"
                    show-checkbox
                    node-key="value"
                    :props="{
                        children: 'children',
                        label: 'label',
                    }"
                    @check="treeCheck"
                    @check-change="treeCheckChange"
                >
                    <template v-slot="{ data }">
                        <org-option-item :option="data" :render-content="renderOptionContent"></org-option-item>
                    </template>
                </el-tree>
            </el-scrollbar>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Emit, Model, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import OrgOptionItem from './org-option-item'
import { Option, OptionFieldNames, RightTreeConfig } from './types'
import { ElTree } from 'element-ui/types/tree'
import { dedupNode, dfsTreeMap, getOptionFields } from './utils'
@Component({
    name: 'OrgTree',
    components: { OrgOptionItem },
})
export default class OrgTree extends Vue {
    @Model('change', { type: Array, default: () => [] })
    value!: Option[]
    /**选中的区域 */
    @Prop({ type: Array, default: () => [] })
    selectedRegion!: Option[]
    /**获取选项值 */
    @Prop({ type: Function, default: () => [] })
    options!: RightTreeConfig['options']
    /**选项字段配置 */
    @Prop({ type: Object, default: () => ({}) })
    optionFieldName!: RightTreeConfig['optionFieldName']
    /**选项内容渲染函数 */
    @Prop({ type: Function, default: null })
    renderOptionContent!: RightTreeConfig['renderOptionContent']
    /**
     * 抛出值变化事件
     * @return {Option[]}
     */
    @Emit('change')
    emitChange() {
        return [...this.selectedOptions]
    }

    created() {}
    mounted() {}

    @Ref('tree')
    treeRef!: ElTree<any, Option>
    /**空为为选中，half为半选中，all为全选中 */
    allChecked: '' | 'half' | 'all' = ''
    loading = false
    /**所有选项集合 */
    myOptions: Option[] = []
    /**选中的选项 */
    selectedOptions: Option[] = []
    @Watch('value', { immediate: true, deep: true })
    watchValue(newV: Option[]) {
        this.selectedOptions = newV
        this.$nextTick(() => {
            if (!this.treeRef) return
            this.treeRef.setCheckedNodes([...this.selectedOptions])
            this.setAllCheck()
        })
    }

    @Watch('selectedRegion')
    async watchSelectedRegion(newV: Option[]) {
        this.loading = true
        try {
            const lastSelectedRegion = newV[newV.length - 1]
            const options = await this.options({
                selectedRegion: lastSelectedRegion,
                selectedRegionPath: newV,
            })
            this.myOptions = dfsTreeMap(options, node => {
                return {
                    ...node,
                    value: node[getOptionFields(this.optionFieldName).value],
                    label: node[getOptionFields(this.optionFieldName).label],
                }
            }) as Option[]
            await this.$nextTick()
            this.treeRef.setCheckedNodes([...this.selectedOptions])
            this.setAllCheck()
        } catch (error) {
            console.log('获取部门失败>>>: ', error)
        } finally {
            this.loading = false
        }
    }

    /**
     * 选择全部
     * @param {Boolean} checked
     */
    chooseAll(checked: boolean) {
        if (checked) {
            const keys = this.myOptions.map(item => item.value)
            this.treeRef.setCheckedKeys(keys)
            this.allChecked = 'all'
        } else {
            this.treeRef.setCheckedKeys([])
            this.allChecked = ''
        }
        // 将change事件触发放到宏任务队列中，等待选中节点收集完成
        setTimeout(() => {
            this.emitChange()
        })
    }
    /**
     * 树的复选框选择事件
     */
    treeCheck() {
        this.setAllCheck()
        this.emitChange()
    }
    /**设置全选状态 */
    setAllCheck() {
        const checkedKeys = this.treeRef.getCheckedKeys()
        const hasCkecked = !!checkedKeys.length
        const parentAllChecked = this.myOptions.every(item => checkedKeys.includes(item.value))
        if (hasCkecked && parentAllChecked) {
            this.allChecked = 'all'
        } else if (hasCkecked && !parentAllChecked) {
            this.allChecked = 'half'
        } else {
            this.allChecked = ''
        }
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
     * 树的复选框改变事件
     * @param {Option} checkedNode
     * @param {Boolean} checked
     */
    treeCheckChange(checkedNode: Option, checked: boolean) {
        if (this.isLeaf(checkedNode)) {
            if (checked) {
                const selectedOptions = [...this.selectedOptions]
                selectedOptions.push(checkedNode)
                this.selectedOptions = dedupNode(selectedOptions)
            } else {
                const index = this.selectedOptions.findIndex(item => item.value === checkedNode.value)
                index > -1 && this.selectedOptions.splice(index, 1)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.org-tree {
    width: 100%;
    height: 100%;
    .default {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        & > img {
            width: 160px;
            height: 174px;
        }
    }
    .tree-container {
        overflow: hidden;
        .all-choose {
            line-height: 28px;
            padding-left: 24px;
            border-bottom: 1px dashed #dddddd;
        }
        ::v-deep {
            .el-tree {
                padding-right: 20px;
                color: #333;
                .el-tree-node {
                    white-space: pre-wrap;
                }
                .el-tree-node__content {
                    height: auto;
                    min-height: 28px;
                }
            }
            .region-tree__wrap {
                height: 280px;
            }
        }
    }
}
</style>
