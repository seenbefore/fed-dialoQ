<template>
    <el-dialog class="icinfo-ai DirectoryDialog" :title="title" :visible="true" width="600px" @close="cancel">
        <div class="directory-content">
            <!-- 搜索框 -->
            <div class="search-box">
                <el-input v-model="searchText" placeholder="输入文献名进行过滤" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>

            <!-- 目录树 -->
            <div class="directory-tree">
                <el-tree
                    ref="tree"
                    :data="treeData"
                    :default-checked-keys="value"
                    node-key="value"
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

@Component({
    name: 'DirectoryDialog',
    components: {},
})
export default class DirectoryDialog extends Vue {
    @Prop({ type: Array }) value!: string[]
    @Prop({ type: String }) type!: 'add' | 'edit'
    @Prop({ type: String }) volumeType!: string

    @Ref('tree') tree!: any

    searchText = ''
    selectedNodes: any[] = []

    // 预设目录树数据
    treeData = [
        {
            id: '1',
            label: '立案',
            children: [
                {
                    id: '1-1',
                    label: '立案审批表',
                },
            ],
        },
        {
            id: '2',
            label: '调查取证',
            children: [
                {
                    id: '2-1',
                    label: '案件调查报告书',
                },
                {
                    id: '2-2',
                    label: '案件调查终结报告',
                },
            ],
        },
        {
            id: '3',
            label: '处罚告知',
            children: [
                {
                    id: '3-1',
                    label: '处罚告知审批表',
                },
                {
                    id: '3-2',
                    label: '行政处罚事先告知书',
                },
                {
                    id: '3-3',
                    label: '放弃陈述、申辩声明',
                },
            ],
        },
        {
            id: '4',
            label: '处罚决定',
            children: [
                {
                    id: '4-1',
                    label: '行政处罚决定书',
                },
                {
                    id: '4-2',
                    label: '行政处罚决定审批表',
                },
            ],
        },
        {
            id: '5',
            label: '证据',
            children: [
                {
                    id: '5-1',
                    label: 'XXXXXXXXXXXX.XXX',
                },
            ],
        },
    ]

    get title() {
        return `新增目录 - ${this.volumeType === 'main' ? '正卷' : '副卷'}`
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
        // 将选中的节点转换为目录项
        const directories = this.selectedNodes.map((node, index) => ({
            name: node.label,
            sort: index + 1,
            hasAttachment: false,
        }))
        this.$options.confirm?.(directories)
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
