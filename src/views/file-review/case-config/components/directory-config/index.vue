<template>
    <div class="DirectoryConfig">
        <div class="sg-flexbox align-center sg-mb-2">
            <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
        <!-- 目录配置表格 -->
        <DraggableDirectory v-model="value" v-bind="getMainTableAttrs" @change="handleChange"></DraggableDirectory>
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
        this.territoryCode = val
    }
    @Watch('formModel.volumeTypeCode', { immediate: true, deep: true })
    onFormModelVolumeTypeChange(val: string) {
        this.volumeType = val
    }
    private territoryCode = ''
    private volumeType = ''

    value2 = [
        {
            id: '9A1C9AC24B7F4C6990D1F8B380F5B550',
            volumeConfigId: '8670005398E141AB816829692154491B',
            volumeType: '2',
            catalogCode: 'XWTZS',
            catalogName: '询问通知书',
            caseStageCode: null,
            caseStageName: null,
            hasAttachment: '1',
            sortNo: 1,
            createTime: '2024-12-02T06:28:41.000+00:00',
            updateTime: '2024-12-02T06:28:41.000+00:00',
            creatorId: '87a6894eb2cd40908afb44e43ccf6b66',
            creatorName: '白芳芳',
            updaterId: '87a6894eb2cd40908afb44e43ccf6b66',
            updaterName: '白芳芳',
            remark: '',
        },
        {
            id: '04614C2BBB624EA38A2B913B64CC2540',
            volumeConfigId: '8670005398E141AB816829692154491B',
            volumeType: '2',
            catalogCode: 'SQWTS',
            catalogName: '授权委托书',
            caseStageCode: null,
            caseStageName: null,
            hasAttachment: '0',
            sortNo: 2,
            createTime: '2024-12-02T06:28:41.000+00:00',
            updateTime: '2024-12-02T06:28:41.000+00:00',
            creatorId: '87a6894eb2cd40908afb44e43ccf6b66',
            creatorName: '白芳芳',
            updaterId: '87a6894eb2cd40908afb44e43ccf6b66',
            updaterName: '白芳芳',
            remark: '',
        },
        {
            id: '0AA55342A642498189051ACB514AEE23',
            volumeConfigId: '8670005398E141AB816829692154491B',
            volumeType: '2',
            catalogCode: 'XWBL',
            catalogName: '询问笔录',
            caseStageCode: null,
            caseStageName: null,
            hasAttachment: '1',
            sortNo: 3,
            createTime: '2024-12-02T06:28:41.000+00:00',
            updateTime: '2024-12-02T06:28:41.000+00:00',
            creatorId: '87a6894eb2cd40908afb44e43ccf6b66',
            creatorName: '白芳芳',
            updaterId: '87a6894eb2cd40908afb44e43ccf6b66',
            updaterName: '白芳芳',
            remark: '',
        },
    ]
    /**
     * catalogCode 目录编码
     */
    @Prop({ type: String, default: '' }) catalogCode!: string
    @Prop({ type: [Array], default: () => [] }) value!: VO[]
    private currentValue: any[] = []

    @Watch('value', { immediate: true })
    onValueChange(val: any) {
        this.handleChange(val)
    }

    handleChange(val: any) {
        this.$emit('input', val)
        this.$emit('change', val)
        this.onChange?.(val)
    }

    // 正卷 main 副卷
    @Prop({ default: 'main' }) type!: string
    @Ref('tableRef') tableRef!: TableRef

    async handleAdd() {
        if (!this.territoryCode) {
            this.$message.warning('请先选择条线')
            return
        }
        const nodeKey = 'catalogCode'
        const defaultCheckedKeys = this.value.map(item => item[nodeKey])
        console.log('defaultCheckedKeys', defaultCheckedKeys, this.value)

        const { addNodes }: DirectoryDialogResult = await this.$modalDialog(() => import('./directory-dialog/index.vue'), {
            type: 'add',
            title: `新增目录 - ${this.type === 'main' ? '正卷' : '副卷'}`,
            defaultCheckedKeys,
            territoryCode: this.territoryCode,
            volumeType: this.volumeType,
            value: this.value,
            nodeKey,
        } as DirectoryDialog)
        if (addNodes) {
            const _addNodes = addNodes.map(item => {
                return {
                    id: '',
                    documentEvidenceName: item.documentEvidenceName,
                    documentEvidenceId: item.documentEvidenceId,
                    documentEvidenceCode: item.documentEvidenceCode,
                    catalogName: item.catalogName,
                    volumeType: this.type === 'main' ? '1' : '2',
                    hasAttachment: '1',
                    volumeConfigId: '',
                    catalogCode: item.catalogCode,
                    sortNo: 1,
                    caseStageCode: '',
                    caseStageName: '',
                    remark: '',
                }
            })
            console.log('_addNodes', _addNodes)
            this.value.push(..._addNodes)
        }
    }

    get getMainTableAttrs() {
        return {
            columns: [
                {
                    prop: 'sortNo',
                    label: '序号',
                    width: '50px',
                    render: (h, { index }) => {
                        return <span>{index + 1}</span>
                    },
                },
                { prop: 'catalogName', label: '名称', flex: '1' },
                {
                    prop: 'hasAttachment',
                    label: '含附件',
                    width: '80px',
                    align: 'center',
                    render: (h, { row }) => {
                        return (
                            <span>
                                <el-checkbox
                                    checked={row.hasAttachment === '1'}
                                    true-label={'1'}
                                    false-label={'0'}
                                    onChange={(val: string) => {
                                        const index = this.value.findIndex((item: any) => item.id === row.id)
                                        if (index > -1) {
                                            this.$set(this.value[index], 'hasAttachment', val)
                                            this.handleChange(this.value)
                                        }
                                    }}
                                ></el-checkbox>
                            </span>
                        )
                    },
                },
            ],
            actions: [{ key: 'delete', icon: 'el-icon-delete', handler: this.handleDelete }],
            actionsWidth: 60,
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
