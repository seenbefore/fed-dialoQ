<template>
    <div class="DirectoryConfig">
        <div class="sg-flexbox align-center sg-mb-2">
            <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
        <!-- 目录配置表格 -->

        <DraggableDirectory v-model="mainData" :columns="getMainTableAttrs.columns" :actions="getMainTableAttrs.actions"></DraggableDirectory>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { TableColumn, TableRef } from '@/sharegood-ui'
import DraggableDirectory from '@/views/file-review/components/draggable-directory/index.vue'

@Component({
    name: 'DirectoryConfig',
    components: {
        DraggableDirectory,
    },
})
export default class DirectoryConfig extends Vue {
    @Prop({ type: [Array, Object], default: () => ({}) }) value!: any
    // 正卷 main 副卷
    @Prop({ default: 'main' }) type!: string
    @Ref('tableRef') tableRef!: TableRef

    mainData: any[] = [
        {
            id: 1,
            name: '卷宗封面',
            code: '1',
            attachments: true,
        },
        {
            id: 2,
            name: '卷宗目录',
            code: '2',
            attachments: false,
        },
    ]

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
        return {
            columns: [
                { prop: 'sort', label: '序号', width: '50px' },
                { prop: 'name', label: '名称', minWidth: '200px' },
                {
                    prop: 'attachments',
                    label: '含附件',
                    width: '100px',
                    render: (h, { row }) => {
                        return <el-checkbox v-model={row.attachments}></el-checkbox>
                    },
                },
            ],
            actions: [
                {
                    key: 'delete',
                    icon: 'el-icon-delete',
                },
            ],
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
