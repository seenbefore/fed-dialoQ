<template>
    <div>
        <div class="x-shuttlebox-header" v-if="isShowSelectAll">
            <el-checkbox v-model="isAllChecked" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        </div>
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
                    show-checkbox
                    :data="data"
                    :props="defaultProps"
                    :default-expanded-keys="defaultExpandedKeys"
                    :default-checked-keys="defaultCheckedKeys"
                    :filter-node-method="filterNode"
                    @check-change="checkChange"
                    :node-key="valueKey"
                    ref="tree"
                >
                    <!-- eslint-disable-next-line -->
                    <div class="custom-tree-node" slot-scope="{ node, data }">
                        <span v-if="searchVal" v-html="data.marker || node.label"></span>
                        <span v-else>{{ node.label }}</span>
                    </div>
                </el-tree>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { searchPinYin } from '@/scripts/utils/pinyin/search'
import { Tree } from 'element-ui'
import { TreeNode, TreeData } from 'element-ui/types/tree'
/** 选中的tab的数据详情 */
export interface CheckedInfo {
    [key: string]: any
}

@Component({
    name: 'BaseTreeCheckbox',
})
export default class BaseTreeCheckbox extends Vue {
    /** 可否全选 */
    @Prop({ type: Boolean, default: true })
    private isShowSelectAll!: boolean
    /** 全选按钮选中状态 */
    isAllChecked = false
    /** 树组件的ref指引 */
    @Ref('tree') tree!: Tree<string, any>
    /** 树的数据中用于值的key关键词 */
    @Prop({ type: String, default: 'value' })
    private valueKey!: string
    /** 树的数据中用于显示的key关键词 */
    @Prop({ type: String, default: 'label' })
    private labelKey!: string
    /** 树的数据中用于指定上下级的key关键词 */
    @Prop({ type: String, default: 'children' })
    private childrenKey!: string

    /** 是否显示加载中 */
    @Prop({ type: Boolean, default: false })
    private loading!: boolean
    /** 当前树数据集合 */
    @Prop({ type: Array, default: () => [] })
    private data!: any[]
    /** 输入框占位默认文字提示 */
    @Prop({ type: String, default: '搜索...' })
    private placeholder!: string
    /** 复选框indeterminate 状态 */
    isIndeterminate = false

    /** 不需要重复展开 */
    @Prop({ type: Boolean, default: false })
    private noFlat!: false

    /** 选中的选项 */
    @Prop({ type: Array, default: () => [] }) checkeds!: CheckedInfo[]
    /** 当checkeds改变时，改变选中项 */
    @Watch('checkeds') checkedsChange(val: CheckedInfo[], old: CheckedInfo[]) {
        /** 是否全部选中 */
        if (val.length === 0) {
            this.isAllChecked = false
            this.isIndeterminate = false
        } else if (val.length == this.keys.length) {
            this.isAllChecked = true
            this.isIndeterminate = false
        } else {
            this.isIndeterminate = true
            this.isAllChecked = false
        }
        this.tree.setCheckedKeys(val.map((v: any) => v[this.valueKey]))
    }

    /** 搜索值 */
    private searchVal = ''
    @Watch('searchVal') filterText(val: string) {
        this.tree.filter(val)
    }

    /** 数据指定 */
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
        return this.checkeds.map((v: any) => v[this.valueKey])
    }

    /** 树keys集合，用于判断全选 */
    private get keys() {
        return this.getTreeKeys(this.data)
    }
    private getTreeKeys(data: any) {
        return data.reduce((prev: any, cur: any) => {
            /* 修改原因：如果当前节点被禁选了则不会被放入选中列表 */
            return prev.concat(cur.disabled ? [] : cur[this.childrenKey]?.length > 0 ? this.getTreeKeys(cur[this.childrenKey]) : cur[this.valueKey])
        }, [])
    }
    /**
     * 全选按钮选中状态改变
     * @param value 选中状态
     */
    private handleCheckAllChange(val: boolean) {
        if (val) {
            this.tree.setCheckedKeys(this.keys)
            return
        }
        this.tree.setCheckedKeys([])
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
        const searched = searchPinYin([data[this.labelKey]], value)[0]?.result
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
    /** 树被点击时触发的事件 */
    private checkChange() {
        clearTimeout(this.t)
        this.t = setTimeout(() => {
            this.updateCheck()
        }, 50)
    }

    /** 更新checked的数据 */
    private updateCheck() {
        /** 选中的数据树 */
        let nodes = this.tree.getCheckedNodes()

        // 获取所有选中节点的子节点
        const getChilNodes = (node: any) => {
            if (this.noFlat) {
                return node.map((v: any) => [...(v?.children || []), ...getChilNodes(v?.children || [])])
            }
            return node.map((v: any) => [...(v?.children || []), ...getChilNodes(v?.children || [])]).flat()
        }

        const treeNodes = getChilNodes(nodes)

        // 如果选中父节点，子节点就不展示
        nodes = nodes.filter(v => treeNodes.findIndex((item: any) => v.key === item.key) < 0)
        /** 需要存储的数据 */
        const list: CheckedInfo[] = nodes.map(v => {
            const node = this.tree.getNode(v[this.valueKey])
            const parentKey = node?.parent?.key
            // 对外没有getNodePath此方法，此方法可以返回父节点node数据，第一层是根节点，最后一层是上一个父节点...
            const parentNodePath = (this.tree as any).getNodePath(parentKey) || []
            const parent = parentNodePath[parentNodePath.length - 1]
            v.parent = parent ? { ...parent, children: [] } : null
            return {
                ...v,
            }
        })
        /** 不在本树管辖范围内的 */
        const otherCheckeds = this.checkeds.filter((v: any) => !this.tree.getNode(v[this.valueKey]))
        this.$emit('update:checkeds', [...otherCheckeds, ...list])
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
}
</script>
<style lang="less" scoped>
@padding-y-large: 0.6rem;
@padding-x: 1rem;
@border-color: tint(#b2becd, 50%);
.x-admintreeview {
    padding: 0 1rem;
}
.x-admintreeview-search {
    margin: 0.5rem 0;
}
.x-treecontrol {
    overflow: auto;
    height: 17.25rem;
}
.x-shuttlebox-header {
    padding: @padding-y-large @padding-x;
    border-bottom: 1px solid @border-color;
}
</style>
