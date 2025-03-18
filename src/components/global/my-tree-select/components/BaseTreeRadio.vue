<template>
    <div class="x-admintreeview">
        <el-input clearable class="x-admintreeview-search" :placeholder="placeholder" v-model="searchVal" suffix-icon="el-icon-search"></el-input>
        <div class="x-treecontrol">
            <div class="x-deptpicker-loading" v-if="loading">
                <i class="el-icon-loading"></i>
                正在载入
            </div>
            <el-tree
                v-else
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                :default-expanded-keys="defaultExpandedKeys"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                :node-key="valueKey"
                ref="tree"
            >
                <!-- eslint-disable-next-line -->
                <div class="custom-tree-node" slot-scope="{ node, data }">
                    <span
                        v-if="node.isLeaf || data.hasSelf"
                        class="custom-tree-radio"
                        :class="{
                            active: defaultCheckedKeys === node[valueKey],
                        }"
                    ></span>
                    <span v-if="searchVal" v-html="data.marker || node.label"></span>
                    <span v-else>{{ node.label }}</span>
                </div>
            </el-tree>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { searchPinYin } from '@/scripts/utils/pinyin/search'
import { Tree } from 'element-ui'
import { TreeNode } from 'element-ui/types/tree'
import { CheckedInfo } from './BaseTreeCheckbox.vue'

@Component({
    name: 'BaseTreeRadio',
})
export default class BaseTreeRadio extends Vue {
    /** 选中的选项 */
    @Prop({ type: Array, default: () => [] }) checkeds!: CheckedInfo[]
    /** 树组件的ref指引 */
    @Ref('tree') tree!: Tree<string, any>
    /** 搜索值 */
    private searchVal = ''
    @Watch('searchVal') filterText(val: string) {
        this.tree.filter(val)
    }
    /** 右边树的数据中用于值的key关键词 */
    @Prop({ type: String, default: 'value' })
    private valueKey!: string
    /** 右边树的数据中用于显示的key关键词 */
    @Prop({ type: String, default: 'label' })
    private labelKey!: string
    /** 右边树的数据中用于指定上下级的key关键词 */
    @Prop({ type: String, default: 'children' })
    private childrenKey!: string
    /** 是否显示加载中 */
    @Prop({ type: Boolean, default: false })
    private loading!: boolean
    /** 当前树数据集合 */
    @Prop({ type: Array, default: () => [] })
    private data!: any[]
    /** 数据指定 */
    @Prop({ type: String, default: '搜索...' })
    private placeholder!: string
    /** 复选框indeterminate 状态 */
    private get defaultProps() {
        return {
            children: this.childrenKey,
            label: this.labelKey,
        }
    }
    /** 定时器句柄 */
    private t?: number
    /** 默认展开 */
    private get defaultExpandedKeys() {
        const key = this.data?.[0]?.[this.valueKey]
        return key ? [key] : []
    }
    /** 默认选中 */
    private get defaultCheckedKeys() {
        return this.checkeds[0]?.[this.valueKey]
    }

    /**
     * 搜索的时候，过滤显示的列表
     * @param value 搜索值
     * @param data 树的相应数据
     * @param node 树组件的相应节点
     */
    private filterNode(value: any, data: any, node: any) {
        delete data.marker
        /** 如果没有搜索，则全显示 */
        if (!value) {
            return true
        }
        // 检测parent中是否已经有被标记的
        let parent = node.parent
        while (parent) {
            if (parent.data.marker) {
                return true
            }
            parent = parent.parent
        }
        /** 搜索匹配到的结果 */
        const searched = searchPinYin([data?.[this.labelKey]], value)[0]?.result
        if (searched) {
            data.marker = searched
            // 为了收起子目录，不得不出此下策
            setTimeout(() => {
                node.expanded = false
            })

            return true
        }

        return false
    }

    /**
     * 树被点击时触发的事件
     * @param data 点击的节点的数据
     * @param node 点击的节点
     */
    private handleNodeClick(data: any, node: TreeNode<string, any>) {
        if (!node.isLeaf && !data.hasSelf) {
            return
        }
        const parent = this.getParentNode(node)
        data.parent = { ...parent }
        this.updateRadio(data)
    }

    /**
     * 获取选中节点的父节点
     * @param node 从当前节点一层层递归到父级的节点
     * @returns 父节点的数据
     */
    private getParentNode(node: TreeNode<string, any>): any {
        // 返回到根节点的上一层
        if (node?.parent?.level === 0) return node.data
        return this.getParentNode(node?.parent as TreeNode<string, any>)
    }
    /**
     * 更新Radio的数据
     * @param data 需要更新的数据
     */
    private updateRadio(data: any) {
        /** 需要存储的数据 */
        const list: CheckedInfo[] = [{ ...data }]

        this.$emit('update:checkeds', list)
    }
}
</script>

<style lang="less" scoped>
.x-admintreeview {
    padding: 0 1rem;
}
.x-admintreeview-search {
    margin: 0.5rem 0;
}
.x-treecontrol {
    overflow: auto;
    height: 23rem;
}
.custom-tree-radio {
    display: inline-block;
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    border: 2px solid #999;
    border-radius: 100%;
    transform: translate(-4px, 1px);
}
.custom-tree-radio.active {
    position: relative;
    border-color: #208fee;
}
.custom-tree-radio.active::before {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background: #208fee;
    content: '';
    transform: translate(-50%, -50%);
}
</style>
