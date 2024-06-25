<template>
    <el-dialog ref="dialog" :close-on-click-modal="false" :title="exTitle" width="800px" v-bind="$attrs" :visible="true" class="code-edit-dialog" @close="cancel">
        <sg-base-form label-width="140px" ref="formRef" :fields="fields" v-model="model" size="small" :span="24"></sg-base-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { FormRow } from '@/sharegood-ui'
import { getProjectList } from '@library/api/auto/component'
import { save as saveUrl } from '@library/api/auto/component/url'
import { save } from '@library/api/auto/component/use'
import { Component, Prop, Vue } from 'vue-property-decorator'
const API = {
    save,
    saveUrl,
    getProjectList,
}

@Component({
    components: {},
})
export default class Dialog extends Vue {
    page = {
        loading: false,
    }
    model = {
        componentId: '',
        componentName: '',
        projectId: '',
        projectName: '',
        techPerson: '',
        techMobile: '',
        techMail: '',
    }
    fields: FormRow[] = [
        {
            columns: [
                {
                    span: 24,
                    tag: 'select',
                    name: 'projectId',
                    itemAttrs: {
                        label: '项目名称',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        onChange: row => {
                            //console.log(111, row.option)
                            this.model.projectName = row.option.label
                        },
                        filterable: true,
                        options: async () => {
                            const { data } = await API.getProjectList({
                                projectName: '',
                            })

                            return data.map((option: any) => ({
                                value: option.id,
                                label: option.name,
                            }))
                        },
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 24,
                    tag: 'input',
                    name: 'techPerson',
                    itemAttrs: {
                        label: '技术负责人',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 24,
                    tag: 'input',
                    name: 'techMobile',
                    itemAttrs: {
                        label: '技术负责人电话',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 24,
                    tag: 'input',
                    name: 'techMail',
                    itemAttrs: {
                        label: '技术负责人邮箱',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                },
            ],
        },
    ]
    @Prop() id!: any
    @Prop() row!: any
    @Prop({ default: '' }) title!: string
    get isEdit() {
        return !!this.id
    }
    get exTitle() {
        const row = this.row
        if (this.isEdit) {
            return '修改'
        }
        return `申请使用-${row.componentName}`
    }

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm(val: any = '') {
        const $options: any = this.$options
        $options.confirm(val)
    }
    async save() {
        const { componentId, projectId, projectName, techPerson, techMobile, techMail } = this.model
        await API.save({
            componentId,
            projectId,
            projectName,
            techPerson,
            techMobile,
            techMail,
        })
    }

    submit() {
        const ref: any = this.$refs.formRef

        ref.validate(async (valid: boolean) => {
            if (valid) {
                await this.save()
                this.$message.success('操作成功')
                this.confirm()
            }
        })
    }
    async syncData() {
        this.model.componentId = this.row.componentId
    }
    created() {
        this.syncData()
    }
}
</script>

<style lang="less" scoped>
.code-edit-dialog {
    ::v-deep .el-dialog__body {
        padding: 6px 15px 12px 15px;
    }
}
.url-table ::v-deep {
    thead th {
        background-color: #e9ebef;
        padding: 0;
    }
    tbody td {
        padding-top: 7px;
        padding-bottom: 7px;
    }
}
</style>
