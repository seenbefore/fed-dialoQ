<template>
    <el-dialog class="icinfo-ai OperationLogDetailDialog" :title="title" :visible="true" width="800px" @close="cancel">
        <sg-base-form ref="form" v-model="formModel" v-bind="getFormAttrs" v-loading="loading"></sg-base-form>
        <template v-slot:footer>
            <el-button @click="cancel">关闭</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FormRow } from '@/sharegood-ui'
import { detail } from '../../api'
import { OperationStatusEnumMap } from '../../enum'

@Component({
    name: 'OperationLogDetailDialog',
    components: {},
})
export default class OperationLogDetailDialog extends Vue {
    /** 日志ID */
    @Prop() id!: string

    loading = false
    formModel: Record<string, any> = {}

    get title() {
        return '操作日志详情'
    }

    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                columns: [
                    {
                        span: 24,
                        name: 'operator',
                        label: '操作人：',
                        tag: 'text',
                    },
                    {
                        span: 24,
                        name: 'operationTime',
                        label: '操作时间：',
                        tag: 'text',
                    },
                    {
                        span: 24,
                        name: 'ip',
                        label: '操作IP：',
                        tag: 'text',
                    },
                    {
                        span: 24,
                        name: 'status',
                        label: '操作状态：',
                        tag: 'text',
                        render: (h, { row }) => {
                            const { status } = row
                            const { label, color } = OperationStatusEnumMap[status] || {}
                            return <span style={{ color }}>{label}</span>
                        },
                    },
                    {
                        span: 24,
                        name: 'requestUrl',
                        label: '请求地址：',
                        tag: 'text',
                    },
                    {
                        span: 24,
                        name: 'requestMethod',
                        label: '请求方式：',
                        tag: 'text',
                    },
                    {
                        span: 24,
                        name: 'requestParams',
                        label: '请求参数：',
                        tag: 'text',
                    },
                    {
                        span: 24,
                        name: 'responseResult',
                        label: '响应结果：',
                        tag: 'text',
                    },
                    {
                        span: 24,
                        name: 'errorMessage',
                        label: '异常信息：',
                        tag: 'text',
                        ifRender: model => model.status === '0',
                    },
                ],
            },
        ]
        return {
            span: 24,
            fields,
        }
    }

    async mounted() {
        try {
            this.loading = true
            const { data } = await detail({ id: this.id })
            this.formModel = data
        } catch (error) {
            console.error(error)
        } finally {
            this.loading = false
        }
    }

    cancel() {
        this.$options.cancel?.()
    }
}
</script>

<style scoped lang="less">
.OperationLogDetailDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
