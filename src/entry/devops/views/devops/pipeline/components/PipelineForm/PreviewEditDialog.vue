<template>
    <el-dialog ref="dialog" title="编辑" visible class="pre-deploy-dialog" :fullscreen="false" :append-to-body="false" :close-on-click-modal="false" width="600px" v-bind="$attrs" @close="cancel">
        <div class="pre-deploy-dialog__content">
            <sg-base-form label-width="120px" ref="formRef" :fields="formFields" v-model="formModel" :span="24"></sg-base-form>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormColumn, FormRef } from '@/sharegood-ui'

interface FormModel {
    uat?: string
    [prop: string]: any
}
@Component({
    name: 'PreviewEditDialog',
    components: {},
})
export default class PreviewEditDialog extends Vue {
    @Prop({ type: Object }) row: any
    public $refs!: {
        formRef: FormRef
    }
    private formModel: FormModel = {}

    formFields: FormColumn[] = [
        {
            tag: 'input',
            name: 'fat1',
            itemAttrs: {
                label: '开发环境1(fat1)',
            },
        },
        {
            tag: 'input',
            name: 'fat2',
            itemAttrs: {
                label: '开发环境2(fat2)',
            },
        },
        {
            tag: 'input',
            name: 'fat3',
            itemAttrs: {
                label: '开发环境3(fat3)',
            },
        },
        {
            tag: 'input',
            name: 'fat4',
            itemAttrs: {
                label: '开发环境4(fat4)',
            },
        },
        {
            tag: 'input',
            name: 'fat5',
            itemAttrs: {
                label: '开发环境5(fat5)',
            },
        },
        {
            tag: 'input',
            name: 'fat6',
            itemAttrs: {
                label: '开发环境6(fat6)',
            },
        },
        {
            tag: 'input',
            name: 'uat',
            itemAttrs: {
                label: '测试环境(uat)',
            },
        },
        {
            tag: 'input',
            name: 'pre',
            itemAttrs: {
                label: '预发环境(pre)',
            },
        },
        {
            tag: 'input',
            name: 'prd',
            itemAttrs: {
                label: '线上环境(prd)',
            },
        },

        {
            tag: 'slot',
            itemAttrs: {
                label: ' ',
            },
            render: (h, { row }) => {
                return [
                    h(
                        'el-button',
                        {
                            props: {
                                type: 'primary',
                            },
                            on: {
                                click: () => {
                                    this.handleSubmit()
                                },
                            },
                        },
                        '保存',
                    ),
                ]
            },
        },
    ]

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm(row?: any) {
        const $options: any = this.$options
        $options.confirm(row)
    }
    handleSubmit() {
        const row = {
            ...this.formModel,
        }
        Object.keys(row).forEach(key => {
            if (!row[key]) {
                delete row[key]
            }
        })

        this.confirm(row)
    }
    created() {
        if (this.row) {
            this.formModel = {
                ...this.row,
            }
        }
    }
}
</script>

<style lang="less" scoped>
.pre-deploy-dialog ::v-deep {
    .el-dialog__body {
        padding: 10px 20px;
    }
    .branch {
        .el-select {
            width: 250px;
        }
    }
    .el-radio-group {
        padding-top: 12px;
    }
    .el-radio {
        display: block;
        margin-bottom: 10px;
    }
}
</style>
