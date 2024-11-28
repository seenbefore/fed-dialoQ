<template>
    <el-dialog class="icinfo-ai DirectoryDialog" :title="title" :visible="true" width="600px" @close="cancel">
        <div class="directory-content" v-loading="loading">
            <!-- 搜索框 -->
            <div class="search-box">
                <el-input v-model="searchText" placeholder="输入关键字进行过滤" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
            <div>defaultCheckedKeys:{{ defaultCheckedKeys }}</div>
            <div>selectedNodes:{{ selectedNodes }}</div>
            <!-- 目录树 -->
            <div class="directory-tree">
                <el-tree
                    ref="tree"
                    :data="treeData"
                    :default-checked-keys="defaultCheckedKeys"
                    node-key="id"
                    show-checkbox
                    default-expand-all
                    :filter-node-method="filterNode"
                    @check="handleCheck"
                    children="item"
                    v-if="treeData.length"
                >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <i :class="['node-icon', data.children ? 'el-icon-folder' : 'el-icon-document']"></i>
                        <span>{{ node.label }}</span>
                    </span>
                </el-tree>
            </div>
        </div>

        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm" :disabled="loading">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { list } from './api'

export interface DirectoryDialogResult {
    addNodes: Array<{ id: string; label: string; value: string; [key: string]: any }>
    deleteNodeKeys: Array<any>
    selectedNodes: Array<{ id: string; label: string; [key: string]: any }>
}

@Component({
    name: 'DirectoryDialog',
    components: {},
})
export default class DirectoryDialog extends Vue {
    /**
     * 标题
     */
    @Prop({ type: String }) title!: string
    /**
     * 匹配关键字
     */
    @Prop({ type: String, default: 'id' }) nodeKey!: string
    /**
     * 默认选中的节点
     *
     */
    @Prop({ type: Array, default: () => [] }) value!: any[]
    /**
     * 默认选中的节点标识
     * ['1-1','2-1']
     */
    @Prop({ type: Array, default: () => [] }) defaultCheckedKeys!: any[]
    /**
     * 类型
     */
    @Prop({ type: String }) type!: 'add' | 'edit'
    /**
     * 卷宗类型 1:正卷,2:副卷
     */
    @Prop({ type: String }) volumeType!: string
    /**
     * 条线编码
     */
    @Prop({ type: String }) territoryCode!: string
    @Ref('tree') tree!: any

    searchText = ''
    selectedNodes: any[] = []

    // 目录树数据
    treeData = []

    mounted() {
        this.getData()
    }
    /**
     * 获取数据
     */
    loading = false
    async getData() {
        try {
            this.loading = true
            const { data } = await list({
                volumeType: this.volumeType,
                territoryCode: this.territoryCode,
            })

            this.treeData = data.map((node, index) => {
                const { item, title } = node
                if (node.item) {
                    const children = item.map((child, index) => {
                        return {
                            ...child,
                            id: child.documentEvidenceCode,
                            label: child.documentEvidenceName,
                            value: child.documentEvidenceCode,
                        }
                    })
                    return {
                        id: title,
                        label: title,
                        children,
                        value: title + index,
                    }
                } else {
                    return {
                        ...node,
                        id: title + index,
                        label: title,
                        value: title + index,
                    }
                }
            })
            this.loading = false
        } catch (error) {
            this.loading = false
        }

        // this.treeData = [
        //     {
        //         id: '1',
        //         label: '立案',
        //         children: [
        //             {
        //                 id: '1-1',
        //                 label: '立案审批表',
        //             },
        //         ],
        //     },
        //     {
        //         id: '2',
        //         label: '调查取证',
        //         children: [
        //             {
        //                 id: '2-1',
        //                 label: '案件调查报告书',
        //             },
        //             {
        //                 id: '2-2',
        //                 label: '案件调查终结报告',
        //             },
        //         ],
        //     },
        //     {
        //         id: '3',
        //         label: '处罚告知',
        //         children: [
        //             {
        //                 id: '3-1',
        //                 label: '处罚告知审批表',
        //             },
        //             {
        //                 id: '3-2',
        //                 label: '行政处罚事先告知书',
        //             },
        //             {
        //                 id: '3-3',
        //                 label: '放弃陈述、申辩声明',
        //             },
        //         ],
        //     },
        //     {
        //         id: '4',
        //         label: '处罚决定',
        //         children: [
        //             {
        //                 id: '4-1',
        //                 label: '行政处罚决定书',
        //             },
        //             {
        //                 id: '4-2',
        //                 label: '行政处罚决定审批表',
        //             },
        //         ],
        //     },
        //     {
        //         id: '5',
        //         label: '证据',
        //         children: [
        //             {
        //                 id: '5-1',
        //                 label: 'XXXXXXXXXXXX.XXX',
        //             },
        //         ],
        //     },
        // ]
    }

    @Watch('searchText')
    onSearchTextChange(val: string) {
        this.tree?.filter(val)
    }

    filterNode(value: string, data: any) {
        if (!value) return true
        return data.label.toLowerCase().includes(value.toLowerCase())
    }

    handleCheck(data: any, checked: any) {
        this.selectedNodes = checked.checkedNodes.filter((node: any) => !node.children)
    }

    async confirm() {
        const selectedNodes = this.selectedNodes
        const originKeys = this.value.map(item => item[this.nodeKey])
        // 通过比对获取新增的节点和删除的节点
        const addNodes = selectedNodes.filter(node => !originKeys.includes(node[this.nodeKey]))
        const deleteNodeKeys = originKeys.filter(key => !selectedNodes.map(node => node[this.nodeKey]).includes(key))
        console.log('addNodes', addNodes, 'deleteNodeKeys', deleteNodeKeys)
        const result: DirectoryDialogResult = {
            addNodes,
            deleteNodeKeys,
            selectedNodes,
        }
        this.$options.confirm?.(result)
    }

    cancel() {
        this.$options.cancel?.()
    }
}
</script>

<style lang="less" scoped>
.DirectoryDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }

    .directory-content {
        height: 500px;
        display: flex;
        flex-direction: column;
    }

    .search-box {
        margin-bottom: 15px;
    }

    .directory-tree {
        flex: 1;
        overflow: auto;
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        padding: 10px;
    }

    .custom-tree-node {
        display: flex;
        align-items: center;
        .node-icon {
            margin-right: 5px;
            font-size: 14px;
            &.el-icon-folder {
                color: #fac858;
            }
            &.el-icon-document {
                color: #91cc75;
            }
        }
    }
}
</style>
