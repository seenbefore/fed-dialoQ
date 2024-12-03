<template>
    <el-dialog class="icinfo-ai DirectoryDialog" :title="title" :visible="true" width="600px" @close="cancel">
        <div class="directory-content" id="DirectoryDialog">
            <!-- 搜索框 -->
            <div class="search-box">
                <el-input v-model="searchText" placeholder="输入关键字进行过滤" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>

            <!-- 目录树 -->
            <div class="directory-tree">
                <el-tree
                    ref="tree"
                    :data="treeData"
                    :default-checked-keys="value"
                    node-key="id"
                    show-checkbox
                    default-expand-all
                    :filter-node-method="filterNode"
                    @check="handleCheck"
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
            <el-button type="primary" @click="confirm">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'

import { list } from './api'

@Component({
    name: 'DirectoryDialog',
    components: {},
})
export default class DirectoryDialog extends Vue {
    /**
     * 匹配关键字
     */
    @Prop({ type: String, default: 'id' }) nodeKey!: string
    @Prop({ type: String }) type!: 'add' | 'edit'
    @Prop({ type: String }) volumeType!: string
    @Prop({ type: String, default: '' }) volumeRecordId!: string
    // default-checked-keys
    @Prop({ type: Array, default: () => [] }) value!: any[]

    @Ref('tree') tree!: any

    searchText = ''
    selectedNodes: any[] = []

    // 预设目录树数据
    treeData = [
        // {
        //     id: '1',
        //     label: '立案',
        //     children: [
        //         {
        //             id: '1-1',
        //             label: '立案审批表',
        //         },
        //     ],
        // },
        // {
        //     id: '2',
        //     label: '调查取证',
        //     children: [
        //         {
        //             id: '2-1',
        //             label: '案件调查报告书',
        //         },
        //         {
        //             id: '2-2',
        //             label: '案件调查终结报告',
        //         },
        //     ],
        // },
        // {
        //     id: '3',
        //     label: '处罚告知',
        //     children: [
        //         {
        //             id: '3-1',
        //             label: '处罚告知审批表',
        //         },
        //         {
        //             id: '3-2',
        //             label: '行政处罚事先告知书',
        //         },
        //         {
        //             id: '3-3',
        //             label: '放弃陈述、申辩声明',
        //         },
        //     ],
        // },
        // {
        //     id: '4',
        //     label: '处罚决定',
        //     children: [
        //         {
        //             id: '4-1',
        //             label: '行政处罚决定书',
        //         },
        //         {
        //             id: '4-2',
        //             label: '行政处罚决定审批表',
        //         },
        //     ],
        // },
        // {
        //     id: '5',
        //     label: '证据',
        //     children: [
        //         {
        //             id: '5-1',
        //             label: 'XXXXXXXXXXXX.XXX',
        //         },
        //     ],
        // },
    ]

    loading = false
    mounted() {
        this.loadData()
    }
    async loadData() {
        this.getCaseDocs()
    }
    async getCaseDocs() {
        this.loading = true
        try {
            /**树结构数据 */
            await this.$nextTick()
            const { data } = await list(
                {
                    volumeRecordId: this.volumeRecordId,
                    volumeType: this.volumeType,
                },
                {
                    exShowLoading: true,
                    exShowLoadingOption: {
                        target: document.getElementById('DirectoryDialog'),
                    },
                },
            )

            this.treeData = data.map((node, index) => {
                const { caseStageCode, caseStageName } = node
                if (node.documentList) {
                    const children = node.documentList.map((child, index) => {
                        return {
                            ...child,
                            id: child.documentId,
                            label: child.documentName,
                            value: child.documentId,
                        }
                    })
                    return {
                        ...node,
                        id: caseStageCode,
                        label: caseStageName,
                        value: caseStageCode,
                        children,
                    }
                } else {
                    return {
                        ...node,
                        id: caseStageCode,
                        label: caseStageName,
                        value: caseStageCode,
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
        this.loading = false
    }

    get title() {
        return `案卷文书及证据`
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
        const result: any = {
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
        position: relative;
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
