<template>
    <el-dialog ref="dialog" :title="myTitle" visible class="EditDialog" :fullscreen="false" :append-to-body="false" :close-on-click-modal="false" width="600px" v-bind="$attrs" @close="cancel">
        <div class="pre-deploy-dialog__content">
            <sg-base-form label-width="120px" ref="formRef" :fields="formFields" v-model="formModel" @submit="handleSubmit" :span="24"></sg-base-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">保 存</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api'
import { FormColumn, FormRef } from '@/sharegood-ui'

@Component({
    name: 'ProductEditDialog',
    components: {},
})
export default class ProductEditDialog extends Vue {
    @Prop({ type: String }) title!: string
    @Prop({ type: String }) id!: string
    @Prop({ type: String }) parent_id!: any
    @Prop({ default: false }) private isEdit!: boolean
    public $refs!: {
        formRef: FormRef
    }
    private formModel: any = {
        parent_id: this.parent_id || '',
    }
    code_options: any[] = []
    get myTitle() {
        if (this.isEdit) {
            return '编辑'
        }
        return '新增'
    }
    private View = {
        loading: false,
    }
    formFields = [
        {
            tag: 'input',
            name: 'label',
            itemAttrs: {
                label: '字典中文',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            attrs: {
                isTriggerSubmit: true,
                onInput: (val: any) => {
                    this.$set(this.formModel, 'value', val)
                },
            },
        },
        // {
        //     tag: 'input',
        //     name: 'value',
        //     itemAttrs: {
        //         label: '字典英文',
        //         rules: [
        //             {
        //                 required: true,
        //                 message: '必填',
        //             },
        //         ],
        //     },
        //     attrs: {
        //         isTriggerSubmit: true,
        //         onInput: (val: any) => {

        //         },
        //     },
        // },
        {
            tag: 'autocomplete',
            name: 'parent_id',
            itemAttrs: {
                label: '父类',
                rules: [
                    {
                        required: true,
                        message: '必填',
                    },
                ],
            },
            attrs: {
                isTriggerSubmit: true,
                value: '',
                'value-key': 'label',
                debounce: 500,
                'highlight-first-item': true,
                'trigger-on-focus': true,
                placeholder: '可下拉选择，可直接新建',
                fetchSuggestions: (queryString: string, cb: any) => {
                    const options = this.code_options || []

                    if (!queryString) {
                        return cb(options)
                    }
                    const results = queryString ? options.filter(this.createStateFilter(queryString)) : options
                    cb(results)
                },
            },
        },
    ] as FormColumn[]
    createStateFilter(queryString: string) {
        return (state: any) => {
            return state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1 || state.label.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        }
    }
    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm(val?: any) {
        const $options: any = this.$options
        $options.confirm(val)
    }
    async handleSubmit() {
        try {
            if (this.isEdit) {
                await this.handleValidate()
                await this.handleUpdate()
                this.$message.success('修改成功')
            } else {
                await this.handleValidate()
                await this.handleAdd()
                this.$message.success('新增成功')
            }
            this.confirm(this.formModel)
        } catch (err) {}
    }
    async handleValidate() {
        return new Promise((resolve, reject) => {
            const ref = this.$refs.formRef
            ref.validate(async valid => {
                if (valid) {
                    resolve(1)
                } else {
                    reject()
                }
            })
        })
    }
    async handleUpdate() {
        const payload = {
            ...this.formModel,
        }
        await API.DictService.update(payload)
    }
    async handleAdd() {
        const payload = {
            ...this.formModel,
        }
        await API.DictService.create(payload)
    }
    async syncData() {
        const { data = [] } = await API.DictService.group()
        this.code_options.push(...data)
    }
    async created() {
        await this.syncData()
        if (this.isEdit) {
            const id = this.id
            const { data } = await API.DictService.get({ id })

            Object.assign(this.formModel, data)
        }
    }
}
</script>

<style lang="less" scoped>
.EditDialog ::v-deep {
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
        margin-bottom: 10px;
    }
}
</style>
