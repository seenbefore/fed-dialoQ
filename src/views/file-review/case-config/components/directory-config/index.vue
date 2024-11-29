<template>
    <div class="DirectoryConfig">
        <div class="sg-flexbox align-center sg-mb-2">
            <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
        <!-- 目录配置表格 -->

        <DraggableDirectory v-model="value" :columns="getMainTableAttrs.columns" :actions="getMainTableAttrs.actions" :sort-key="'sortNo'"></DraggableDirectory>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { TableColumn, TableRef } from '@/sharegood-ui'
import DraggableDirectory from '@/components/draggable-table/index.vue'
import DirectoryDialog, { DirectoryDialogResult } from './directory-dialog/index.vue'
import { VO } from './api'

@Component({
    name: 'DirectoryConfig',
    components: {
        DraggableDirectory,
    },
})
export default class DirectoryConfig extends Vue {
    /**
     * formModel 父级表单数据
     */
    @Prop({ type: Object, default: () => ({}) }) formModel!: any
    @Watch('formModel.lineCode', { immediate: true, deep: true })
    onFormModelChange(val: string) {
        console.log('val', val)
        this.territoryCode = val
    }
    @Watch('formModel.volumeTypeCode', { immediate: true, deep: true })
    onFormModelVolumeTypeChange(val: string) {
        console.log('val', val)
        this.volumeType = val
    }
    private territoryCode = ''
    private volumeType = ''
    /**
     * catalogCode 目录编码
     */
    @Prop({ type: String, default: '' }) catalogCode!: string
    @Prop({ type: [Array], default: () => [] }) value!: VO[]
    // 正卷 main 副卷
    @Prop({ default: 'main' }) type!: string
    @Ref('tableRef') tableRef!: TableRef

    mainData: VO[] = []

    async handleAdd() {
        if (!this.territoryCode) {
            this.$message.warning('请先选择条线')
            return
        }
        const defaultCheckedKeys = this.value.map(item => item.volumeConfigId)
        console.log('defaultCheckedKeys', defaultCheckedKeys)

        const { addNodes }: DirectoryDialogResult = await this.$modalDialog(() => import('./directory-dialog/index.vue'), {
            type: 'add',
            title: `新增目录 - ${this.type === 'main' ? '正卷' : '副卷'}`,
            defaultCheckedKeys,
            territoryCode: this.territoryCode,
            volumeType: this.volumeType,
        } as DirectoryDialog)
        if (addNodes) {
            const _addNodes = addNodes.map(item => {
                return {
                    catalogName: item.label,
                    sortNo: 0,
                    volumeType: this.type === 'main' ? '1' : '2',
                    hasAttachment: '1',
                    volumeConfigId: '',
                    catalogCode: item.value,
                    remark: '',
                }
            })
            this.value.push(..._addNodes)
        }
    }

    get getMainTableAttrs() {
        return {
            columns: [
                { prop: 'sortNo', label: '序号', width: '50px' },
                { prop: 'catalogName', label: '名称', minWidth: '200px' },
                {
                    prop: 'hasAttachment',
                    label: '含附件',
                    width: '100px',
                    render: (h, { row }: { row: VO }) => {
                        return (
                            <span>
                                <el-checkbox
                                    checked={row.hasAttachment === '1'}
                                    true-label={'1'}
                                    false-label={'0'}
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
