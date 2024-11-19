<template>
    <div class="DraggableDirectory">
        <!-- Table Header -->
        <div class="directory-header">
            <div class="header-left">
                <span class="header-handle"></span>
                <span class="header-index">序号</span>
                <span class="header-code">文号</span>
                <span class="header-name">文书/证据名称</span>
            </div>
            <div class="header-right">
                <span class="header-page">页码</span>
                <span class="header-actions">操作</span>
            </div>
        </div>

        <!-- Table Content -->
        <draggable v-model="directoryList" v-bind="dragOptions" class="directory-list" @start="onDragStart" @end="onDragEnd">
            <transition-group type="transition">
                <div v-for="item in directoryList" :key="item.id" class="directory-item">
                    <div class="item-content">
                        <div class="item-left">
                            <span class="drag-handle">
                                <i class="el-icon-rank"></i>
                            </span>
                            <span class="item-index">{{ item.index }}</span>
                            <span class="item-code">{{ item.code }}</span>
                            <span class="item-name">{{ item.name }}</span>
                        </div>
                        <div class="item-right">
                            <span class="item-page">{{ item.page }}</span>
                            <div class="item-actions">
                                <el-button type="text" @click="handleDelete(item)">
                                    <i class="el-icon-delete"></i>
                                </el-button>
                                <el-button type="text" @click="handlePreview(item)">
                                    <i class="el-icon-view"></i>
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
        </draggable>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import draggable from 'vuedraggable'

interface DirectoryItem {
    id: string | number
    index: number
    code: string
    name: string
    page: number
}

@Component({
    name: 'DraggableDirectory',
    components: {
        draggable,
    },
})
export default class DraggableDirectory extends Vue {
    @Prop({ type: Array, default: () => [] })
    value!: DirectoryItem[]

    get dragOptions() {
        return {
            animation: 200,
            group: 'directory',
            disabled: false,
            ghostClass: 'ghost',
            handle: '.drag-handle',
        }
    }

    get directoryList(): DirectoryItem[] {
        return this.value
    }

    set directoryList(value: DirectoryItem[]) {
        this.$emit('input', value)
        this.$emit('change', value)
    }

    onDragStart() {
        // 拖拽开始时的处理
    }

    onDragEnd() {
        // 拖拽结束时的处理
        this.updateIndexes()
    }

    updateIndexes() {
        // 更新序号
        this.directoryList = this.directoryList.map((item, index) => ({
            ...item,
            index: index + 1,
        }))
    }

    handlePreview(item: DirectoryItem) {
        this.$emit('preview', item)
    }

    handleDelete(item: DirectoryItem) {
        this.$confirm('确定要删除该文件吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            const index = this.directoryList.findIndex(i => i.id === item.id)
            if (index > -1) {
                const newList = [...this.directoryList]
                newList.splice(index, 1)
                this.directoryList = newList
                this.$message.success('删除成功')
            }
        })
    }

    handleEdit(item: DirectoryItem) {
        this.$emit('edit', item)
    }
}
</script>

<style lang="less" scoped>
.DraggableDirectory {
    .directory-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 10px;
        background: #f5f7fa;
        border: 1px solid #eee;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        font-weight: 500;
        color: #606266;

        .header-left {
            display: flex;
            align-items: center;
            flex: 1;

            .header-handle {
                width: 36px; // 与拖拽图标宽度一致
            }

            .header-index {
                width: 50px;
            }

            .header-code {
                width: 200px;
                margin-right: 20px;
            }

            .header-name {
                flex: 1;
            }
        }

        .header-right {
            display: flex;
            align-items: center;

            .header-page {
                width: 60px;
                text-align: center;
            }

            .header-actions {
                width: 120px;
                text-align: center;
            }
        }
    }

    .directory-list {
        background: #fff;
        border: 1px solid #eee;
        border-radius: 0 0 4px 4px;
    }

    .directory-item {
        padding: 10px;
        border-bottom: 1px solid #eee;
        background: #fff;

        &:last-child {
            border-bottom: none;
        }

        .item-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .item-left {
            display: flex;
            align-items: center;
            flex: 1;

            .drag-handle {
                cursor: move;
                padding: 0 10px;
                color: #909399;
                width: 36px;
                display: flex;
                justify-content: center;
            }

            .item-index {
                width: 50px;
                color: #666;
            }

            .item-code {
                width: 200px;
                color: #666;
                margin-right: 20px;
            }

            .item-name {
                flex: 1;
                color: #333;
            }
        }

        .item-right {
            display: flex;
            align-items: center;

            .item-page {
                width: 60px;
                text-align: center;
                color: #666;
            }

            .item-actions {
                width: 120px;
                display: flex;
                justify-content: center;

                .el-button {
                    padding: 0 8px;
                }
            }
        }
    }
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.flip-list-move {
    transition: transform 0.3s;
}
</style>
