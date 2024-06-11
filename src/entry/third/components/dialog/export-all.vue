<!-- 导出全部弹窗 -->
<template>
    <div class="export-all">
        <el-dialog class="sg-dialog" title="导出全部" visible :close-on-click-modal="false" width="500px" @close="cancel">
            <sg-data-view :columns="tableView.columns" :load="tableView.load" :page-visible="false" height="300" border />
            <!-- 操作区 -->
            <div class="sg-dialog-footer">
                <el-button type="primary" @click="cancel">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'ExportAll',
    components: {},
})
export default class ExportAll extends Vue {
    /**所有的个数 */
    @Prop({ type: Number, default: 0 })
    total!: number
    /**分隔的个数 */
    @Prop({ type: Number, default: 10000 })
    split!: number

    tableView = {
        load: () => {
            const list = []
            let total = this.total
            while (total > 0) {
                const start: number = list.length * this.split
                const length = total - this.split <= 0 ? total : this.split
                list.push({
                    dataNumber: `第${start}~${start + length}条数据`,
                    start,
                    length,
                })
                total -= this.split
            }
            return { result: list, total: list.length }
        },
        columns: [
            {
                label: '序号',
                type: 'index',
                width: 80,
            },
            {
                label: '下载数据',
                prop: 'dataNumber',
            },
            {
                label: '操作',
                prop: 'pageNum',
                width: 80,
                render: (h: any, e: any) => {
                    const actions = [
                        h(
                            'el-button',
                            {
                                props: {
                                    type: 'text',
                                },
                                on: {
                                    click: () => {
                                        this.handleDownload(e.row)
                                    },
                                },
                            },
                            '下载',
                        ),
                    ]
                    return actions
                },
            },
        ],
    }

    handleDownload(row: any) {
        this.$options.confirm?.(row)
    }

    cancel() {
        this.$options.cancel?.()
    }
}
</script>
