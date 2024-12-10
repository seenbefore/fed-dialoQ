<template>
    <el-dialog class="icinfo-ai PermissionDialog" title="权限设置" :visible="true" width="800px" @close="cancel" v-loading="loading">
        <div class="permission-content">
            <div class="role-info">
                <span class="label">角色名称：</span>
                <span class="value">{{ row.name }}</span>
            </div>
            <div class="permission-tree">
                <el-tree ref="tree" :data="treeData" show-checkbox node-key="id" :props="defaultProps" :default-checked-keys="checkedKeys" :default-expanded-keys="expandedKeys">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ data.name }}</span>
                    </span>
                </el-tree>
            </div>
        </div>
        <template v-slot:footer>
            <el-button type="primary" @click="submit" :disabled="loading">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { RoleVO } from '../../api'

interface TreeNode {
    id: string
    name: string
    children?: TreeNode[]
}

@Component({
    name: 'PermissionDialog',
    components: {},
})
export default class PermissionDialog extends Vue {
    @Prop({ default: () => ({}) }) row!: RoleVO

    @Ref('tree')
    treeRef!: any

    loading = false

    // 树形配置
    defaultProps = {
        children: 'children',
        label: 'name',
    }

    // 树形数据
    treeData: TreeNode[] = [
        {
            id: '1',
            name: '本系统',
            children: [
                {
                    id: '9',
                    name: '公用模块',
                    children: [
                        {
                            id: '10',
                            name: '系统登录',
                        },
                        {
                            id: '138',
                            name: '题库管理',
                        },
                    ],
                },
                {
                    id: '2',
                    name: '公用配置',
                    children: [
                        {
                            id: '8',
                            name: '数据字典',
                        },
                        {
                            id: '13',
                            name: '行政区划',
                        },
                    ],
                },
                {
                    id: '4',
                    name: '权限配置',
                    children: [
                        {
                            id: '5',
                            name: '菜单管理',
                        },
                        {
                            id: '6',
                            name: '角色管理',
                        },
                        {
                            id: '7',
                            name: '人员管理',
                        },
                    ],
                },
                {
                    id: '103',
                    name: '网站内容管理',
                },
            ],
        },
    ]

    // 默认选中的节点
    checkedKeys: string[] = ['10', '138']

    // 默认展开的节点
    expandedKeys: string[] = ['1', '9', '2', '4']

    async submit() {
        try {
            this.loading = true
            // 获取选中的节点
            const checkedNodes = this.treeRef.getCheckedNodes()
            const halfCheckedNodes = this.treeRef.getHalfCheckedNodes()
            const allNodes = [...checkedNodes, ...halfCheckedNodes]
            const ids = allNodes.map(node => node.id)
            console.log('选中的权限ID:', ids)
            this.$message.success('保存成功')
            this.confirm()
        } catch (error) {
            console.error(error)
        } finally {
            this.loading = false
        }
    }

    cancel() {
        this.$options.cancel?.()
    }

    confirm() {
        this.$options.confirm?.(true)
    }
}
</script>

<style lang="less" scoped>
.PermissionDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
    .permission-content {
        .role-info {
            margin-bottom: 15px;
            .label {
                color: #606266;
            }
            .value {
                margin-left: 8px;
                font-weight: bold;
            }
        }
        .permission-tree {
            height: 400px;
            overflow: auto;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            padding: 10px;
        }
    }
}
</style>
