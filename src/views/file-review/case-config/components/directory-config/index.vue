<template>
    <div class="DirectoryConfig">
        <div class="sg-flexbox align-center sg-mb-2">
            <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
        <!-- 目录配置表格 -->
        <sg-data-view v-bind="getMainTableAttrs" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { TableColumn, TableRef } from '@/sharegood-ui'

@Component({
    name: 'DirectoryConfig',
    components: {},
})
export default class DirectoryConfig extends Vue {
    @Prop({ type: [Array, Object], default: () => ({}) }) value!: any
    // 正卷 main 副卷
    @Prop({ default: 'main' }) type!: string
    @Ref('tableRef') tableRef!: TableRef

    mainData: any[] = []

    handleSearch() {
        this.tableRef.onLoad()
    }

    async handleAdd() {
        const result = await this.$modalDialog(() => import('./directory-dialog/index.vue'), {
            type: 'add',
            volumeType: this.type,
        })
        if (result) {
            const data = this.mainData
            data.push(...result)
            this.updateValue()
        }
    }

    handleDelete(index: number) {
        const data = this.mainData
        console.log(index, data)
        data.splice(index, 1)

        this.updateValue()
    }

    handleMove(index: number, direction: 'up' | 'down') {
        const data = this.mainData
        if (direction === 'up' && index > 0) {
            const temp = data[index]
            data[index] = data[index - 1]
            data[index - 1] = temp
        } else if (direction === 'down' && index < data.length - 1) {
            const temp = data[index]
            data[index] = data[index + 1]
            data[index + 1] = temp
        }
        this.updateValue()
    }

    updateValue() {
        this.handleSearch()
        this.$emit('input', {
            main: this.mainData,
        })
    }

    get getMainTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '序号',
                type: 'index',
                width: '50px',
            },
            {
                label: '目录名称',
                prop: 'name',
                minWidth: '200px',
            },
            {
                label: '含附件',
                prop: 'hasAttachment',
                width: '80px',
                render: (h, { row }) => {
                    return <el-checkbox v-model={row.hasAttachment}></el-checkbox>
                },
            },
            {
                label: '操作',
                prop: 'action',
                width: '180px',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            <el-button type="text" danger onClick={() => this.handleDelete(index)}>
                                删除
                            </el-button>
                            <el-button type="text" disabled={index === 0} onClick={() => this.handleMove(index, 'up')}>
                                <i class="el-icon-arrow-up"></i>
                            </el-button>
                            <el-button type="text" disabled={index === this.mainData.length - 1} onClick={() => this.handleMove(index, 'down')}>
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                        </div>
                    )
                },
            },
        ]

        return {
            auto: false,
            columns,
            load: async (params: any = {}) => {
                return {
                    result: this.mainData,
                    total: this.mainData.length,
                }
            },
            pageVisible: false,
        }
    }

    @Watch('value', { immediate: true, deep: true })
    onValueChange(val: any) {
        if (Array.isArray(val)) {
            this.mainData = [...val]
            this.handleSearch()
        }
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
