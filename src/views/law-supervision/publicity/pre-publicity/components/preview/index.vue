<template>
    <div class="sg-page icinfo-ai PrePublicityPreview">
        <sg-base-form ref="form" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
        <div class="sg-button-group">
            <el-button @click="handleBack">返回</el-button>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, TableColumn } from '@/sharegood-ui'
import { PublicityStatusEnum, PublicityStatusEnumMap } from '../../enum'
import { detail } from '../../api'

@Component({
    name: 'PrePublicityPreview',
    components: {},
})
export default class PrePublicityPreview extends Vue {
    /** ID */
    @Prop() id!: string

    @Ref('form')
    formRef!: FormRef

    formModel: Record<string, any> = {}

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'custom',
                name: 'status',
                itemAttrs: {
                    label: '公示状态：',
                },
                appendRender: (h, { row }) => {
                    return PublicityStatusEnumMap[row.status as keyof typeof PublicityStatusEnum]?.label || '-'
                },
            },
            {
                tag: 'custom',
                name: 'publicityInfo',
                itemAttrs: {
                    label: '公示信息：',
                },
                appendRender: (h, { row }) => {
                    // 根据选中的公示信息动态生成列
                    const columns: TableColumn[] = []
                    const publicityInfo = row.publicityInfo || []

                    // 列配置映射
                    const columnMap: Record<string, TableColumn> = {
                        businessLine: {
                            label: '所属条线领域',
                            prop: 'businessLine',
                            minWidth: '150px',
                        },
                        area: {
                            label: '行政区划',
                            prop: 'area',
                            minWidth: '150px',
                        },
                        subjectName: {
                            label: '执法主体名称',
                            prop: 'subjectName',
                            minWidth: '200px',
                        },
                        subjectType: {
                            label: '执法主体类型',
                            prop: 'subjectType',
                            minWidth: '150px',
                        },
                        address: {
                            label: '地址',
                            prop: 'address',
                            minWidth: '200px',
                        },
                        contact: {
                            label: '联系方式',
                            prop: 'contact',
                            minWidth: '150px',
                        },
                        basis: {
                            label: '设定依据',
                            prop: 'basis',
                            minWidth: '200px',
                        },
                    }

                    // 根据选中的公示信息添加对应的列
                    publicityInfo.forEach((key: string) => {
                        if (columnMap[key]) {
                            columns.push(columnMap[key])
                        }
                    })
                    //console.log('this.formModel.publicityList', this.formModel.publicityList)
                    if (!row.publicityList) {
                        return <div>暂无数据</div>
                    }

                    return <sg-data-view columns={columns} data={row.publicityList} />
                },
            },
            {
                tag: 'custom',
                name: 'basis',
                itemAttrs: {
                    label: '设定依据：',
                },
                appendRender: (h, { row }) => {
                    //console.log('row', row)
                    return row.basis
                },
            },
        ]
        return {
            span: 24,
            fields,
        }
    }

    async handleLoad() {
        console.log('handleLoad', this.formModel.publicityList)
        return Promise.resolve({
            result: this.formModel.publicityList || [],
            total: this.formModel.publicityList?.length,
        })
    }

    async created() {
        const { data } = await detail({ id: this.id })
        this.formModel = data
    }

    handleBack() {
        this.$back()
    }
}
</script>

<style lang="less" scoped>
.PrePublicityPreview ::v-deep {
    padding: 0px;
    .sg-button-group {
        margin-top: 20px;
        text-align: center;
    }
}
</style>
