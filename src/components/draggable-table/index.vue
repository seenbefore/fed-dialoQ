<template>
    <div class="DraggableDirectory">
        <!-- {{ directoryList }} -->
        <!-- {{ value }} -->
        <!-- 固定表头 -->
        <div class="directory-header-wrapper">
            <div class="directory-header">
                <div class="header-left">
                    <span class="header-handle"></span>
                    <template v-for="column in columns">
                        <span :key="column.prop" :class="['header-' + column.prop]" :style="getColumnStyle(column)" v-if="!column.hide">
                            {{ column.label }}
                        </span>
                    </template>
                </div>
                <div class="header-right">
                    <span class="header-actions" :style="{ width: actionsWidth + 'px' }">操作</span>
                </div>
            </div>
        </div>

        <!-- 可滚动的内容区域 -->
        <div class="directory-content" :style="{ maxHeight: maxHeight + 'px' }">
            <draggable v-model="value" v-bind="dragOptions" class="directory-list" @start="onDragStart" @end="onDragEnd">
                <transition-group type="transition">
                    <div v-for="(item, index) in value" :key="item[idKey]" class="directory-item">
                        <div class="item-content">
                            <div class="item-left">
                                <span class="drag-handle">
                                    <i class="el-icon-rank"></i>
                                </span>
                                <template v-for="column in columns">
                                    <span :key="column.prop" :class="['item-' + column.prop]" :style="getColumnStyle(column)" v-if="!column.hide">
                                        <template v-if="column.render">
                                            <render-cell :render="column.render" :row="item" :index="index"></render-cell>
                                        </template>
                                        <template v-else>
                                            {{ item[column.prop] }}
                                        </template>
                                    </span>
                                </template>
                            </div>
                            <div class="item-right">
                                <div class="item-actions" :style="{ width: actionsWidth + 'px' }">
                                    <template v-for="action in actions">
                                        <el-tooltip :key="action.key" :content="action.tooltip" :disabled="!action.tooltip">
                                            <el-button :key="action.key" type="text" v-if="!action.hide || !action.hide(item)" @click="handleAction(action, item, index)">
                                                <i :class="action.icon"></i>
                                                <span v-if="action.label">{{ action.label }}</span>
                                            </el-button>
                                        </el-tooltip>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </draggable>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import draggable from 'vuedraggable'

interface ColumnItem {
    prop: string
    label: string
    width?: number | string
    hide?: boolean
    minWidth?: number | string
    align?: 'left' | 'center'
    flex?: number | string
    render?: (h: any, params: { row: any }) => any
}

interface ActionItem {
    key: string
    icon: string
    label?: string
    tooltip?: string
    handler?: (row: any, context: any, index: number) => Promise<any>
    hide?: (row: any) => boolean
}

@Component({
    name: 'DraggableDirectory',
    components: {
        draggable,
        RenderCell: {
            functional: true,
            props: {
                render: Function,
                row: Object,
                index: Number,
            },
            render: (h: any, ctx: any) => {
                return ctx.props.render(h, { row: ctx.props.row, index: ctx.props.index })
            },
        },
    },
})
export default class DraggableDirectory extends Vue {
    @Prop({ type: Number, default: 120 })
    actionsWidth!: number
    /**
     * 排序标识
     */
    @Prop({ type: String, default: 'sort' }) sortKey!: string
    /**
     * 拖拽Key
     */
    @Prop({ type: String, default: 'id' }) idKey!: string
    @Prop({ type: Array, default: () => [] })
    value!: any[]

    @Prop({
        type: Array,
        default: () => [
            { prop: 'sort', label: '序号', width: '50px' },
            { prop: 'name', label: '名称' },
        ],
    })
    columns!: ColumnItem[]

    @Prop({
        type: Array,
        default: () => [{ key: 'delete', icon: 'el-icon-delete' }],
    })
    actions!: ActionItem[]

    @Prop({ type: Number, default: 400 })
    maxHeight!: number

    @Prop({ type: String, default: '确定要删除吗？' })
    confirmMessage!: string

    @Watch('value', { immediate: true, deep: true })
    onValueChange(val: any) {
        if (Array.isArray(val)) {
            this.$emit('input', val)
            this.$emit('change', val)
        }
    }

    get dragOptions() {
        return {
            animation: 200,
            group: 'directory',
            disabled: false,
            ghostClass: 'ghost',
            handle: '.drag-handle',
        }
    }

    handleAction(action: ActionItem, item: any, index: number) {
        switch (action.key) {
            case 'delete':
                action.handler ? action.handler(item, this, index) : this.handleDelete(item)
                break
            default:
                action.handler
                    ? action.handler(item, this, index)
                    : this.$emit(action.key, {
                          row: item,
                          index,
                          context: this,
                      })
        }
    }

    onDragStart() {
        // 拖拽开始时的处理
    }

    onDragEnd() {
        this.updateIndexes()
        this.$emit('drag-end', this.value)
        this.$emit('change', this.value)
    }

    updateIndexes() {}

    handlePreview(item: any) {
        this.$emit('preview', item)
    }
    removeItem(item: any) {
        const uuid = item[this.idKey]
        console.log(`removeItem`, uuid)
        // 找到对应的索引号
        const index = this.value.findIndex(item => item[this.idKey] === uuid)
        console.log('removeItem index', index)
        this.value.splice(index, 1)
        this.updateIndexes()
        this.$emit('remove', this.value)
    }
    async handleDelete(item: any) {
        await this.$confirm(this.confirmMessage, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
        this.removeItem(item)
    }

    getColumnStyle(column: ColumnItem) {
        const style: any = {}

        if (column.width) {
            style.width = typeof column.width === 'number' ? `${column.width}px` : column.width
        }
        if (column.minWidth) {
            style.minWidth = typeof column.minWidth === 'number' ? `${column.minWidth}px` : column.minWidth
        }
        if (column.align) {
            style.textAlign = column.align
        }
        if (column.flex) {
            style.flex = column.flex + ''
        }

        return style
    }
}
</script>

<style lang="less" scoped>
.DraggableDirectory {
    position: relative;

    .directory-header-wrapper {
        // position: sticky;
        // top: 0;
        // z-index: 2;
        background: #fff;
    }

    .directory-content {
        overflow-y: auto;
        position: relative;
    }

    .directory-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 3px 10px;
        background: #f5f7fa;
        border: 1px solid #eee;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        font-weight: 500;
        color: #606266;
        margin-bottom: 0;

        .header-left {
            display: flex;
            align-items: center;
            flex: 1;

            .header-handle {
                width: 36px;
            }

            [class^='header-'] {
                padding: 0 8px;
                text-align: left;
            }

            .header-index {
                width: 50px;
            }

            .header-code {
                width: 200px;
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
                text-align: left;
            }

            .header-actions {
                width: 120px;
                text-align: left;
            }
        }
    }

    .directory-list {
        background: #fff;
        border: 1px solid #eee;
        border-radius: 0 0 4px 4px;
        border-top: none;
    }

    .directory-item {
        padding: 5px 10px;
        border-bottom: 1px solid #eee;
        background: #fff;

        &:last-child {
            border-bottom: none;
        }

        .item-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
                line-height: 1.4;
            }
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

            [class^='item-'] {
                padding: 0 8px;
                text-align: left;
            }

            .item-index {
                width: 50px;
                color: #666;
            }

            .item-code {
                width: 200px;
                color: #666;
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
                text-align: left;
                color: #666;
            }

            .item-actions {
                width: 120px;
                display: flex;
                text-align: left;

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
