<template>
    <div class="DirectoryConfig">
        <div class="sg-flexbox align-center sg-mb-2">
            <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
        <!-- 目录配置表格 -->
        {{ value }}
        <DraggableDirectory v-model="value" :columns="getMainTableAttrs.columns" :actions="getMainTableAttrs.actions"></DraggableDirectory>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { TableColumn, TableRef } from '@/sharegood-ui'
import DraggableDirectory from '@/components/draggable-table/index.vue'
import DirectoryDialog, { DirectoryDialogResult } from './directory-dialog/index.vue'

@Component({
    name: 'DirectoryConfig',
    components: {
        DraggableDirectory,
    },
})
export default class DirectoryConfig extends Vue {
    @Prop({ type: [Array], default: () => [] }) value!: any
    // 正卷 main 副卷
    @Prop({ default: 'main' }) type!: string
    @Ref('tableRef') tableRef!: TableRef

    mainData: any[] = []

    async handleAdd() {
        const defaultCheckedKeys = this.value.map(item => item.id)
        console.log('defaultCheckedKeys', defaultCheckedKeys)

        const { addNodes }: DirectoryDialogResult = await this.$modalDialog(() => import('./directory-dialog/index.vue'), {
            type: 'add',
            title: `新增目录 - ${this.type === 'main' ? '正卷' : '副卷'}`,
            defaultCheckedKeys,
        } as DirectoryDialog)
        if (addNodes) {
            const _addNodes = addNodes.map(item => {
                return {
                    hasAttachment: 1,
                    name: item.label,
                    id: item.id,
                }
            })
            this.value.push(..._addNodes)
        }
    }

    get getMainTableAttrs() {
        return {
            columns: [
                { prop: 'sort', label: '序号', width: '50px' },
                { prop: 'name', label: '名称', minWidth: '200px' },
                {
                    prop: 'hasAttachment',
                    label: '含附件',
                    width: '100px',
                    render: (h, { row }) => {
                        return (
                            <span>
                                <el-checkbox
                                    checked={row.hasAttachment}
                                    true-label={1}
                                    false-label={0}
                                    onChange={(val: any) => {
                                        row.hasAttachment = val
                                    }}
                                ></el-checkbox>
                            </span>
                        )
                    },
                },
            ],
            actions: [{ key: 'delete', icon: 'el-icon-delete', handler: this.handleDelete }],
        }
    }

    @Watch('value', { immediate: true, deep: true })
    onValueChange(val: any) {
        if (Array.isArray(val)) {
            this.mainData = [...val]
        }
    }
    async handleDelete(data: any, context: any) {
        await this.$confirm('确定从卷宗目录中移除吗？')
        context.removeItem(data)
    }
}
</script>

<style lang="less" scoped>
.DirectoryConfig {
    .mt-10 {
        margin-top: 10px;
    }
}
</style>
