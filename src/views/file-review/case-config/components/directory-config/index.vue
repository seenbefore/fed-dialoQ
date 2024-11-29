<template>
    <div class="DirectoryConfig">
        <div class="sg-flexbox align-center sg-mb-2">
            <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
        <!-- 目录配置表格 -->
        <!-- {{ value }} -->
        <DraggableDirectory v-model="value" :columns="getMainTableAttrs.columns" :actions="getMainTableAttrs.actions" :sort-key="'sortNo'" @change="handleChange"></DraggableDirectory>
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
    @Prop() onChange!: any
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
    @Prop({ type: [Array], default: () => [] }) value!: any
    // 正卷 main 副卷
    @Prop({ default: 'main' }) type!: string
    @Ref('tableRef') tableRef!: TableRef

    mainData: VO[] = []
    handleChange(val: any) {
        console.log('onChange', val)
        this.$emit('change', val)
        this.onChange?.(val)
    }
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
                    id: item.value,
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
            console.log('this.value', this.value)
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
        console.log('onValueChange111111', val)
        if (Array.isArray(val)) {
            this.mainData = [...val]
        }
    }
    @Watch('mainData', { immediate: true, deep: true })
    onMainDataChange(val: any) {
        console.log('onMainDataChange', val)
        //this.$emit('input', val)
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
