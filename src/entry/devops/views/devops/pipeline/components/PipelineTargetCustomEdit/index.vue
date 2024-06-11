<template>
    <el-dialog
        ref="dialog"
        :title="`${name}-自定义环境`"
        visible
        class="PipelineTargetCustomEdit"
        :fullscreen="false"
        :append-to-body="false"
        :close-on-click-modal="false"
        width="650px"
        v-bind="$attrs"
        @close="cancel"
    >
        <div class="pre-deploy-dialog__content">
            <sg-base-form label-width="80px" ref="formRef" :fields="formFields" v-model="formModel" :span="24">
                <div slot="urls">
                    <el-table :data="formModel.target_urls" style="width: 100%" class="url-table">
                        <!-- <el-table-column label="环境" width="150">
                            <template slot-scope="{ row }">
                                <el-select
                                    v-model="row.target"
                                    placeholder="选填"
                                    @input="onInput($event, row)"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="目标环境value" width="200">
                            <template slot-scope="{ row }">
                                <el-input v-model="row.value" placeholder="必填 如fat1、uat、pre、prd" class="input-with-select"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="目标环境label" min-width="150">
                            <template slot-scope="{ row }">
                                <el-input v-model="row.label" placeholder="必填 如开发环境、测试环境、预发环境、生产环境"></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" width="60">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="handleDelUrl(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="sg-mt-3">
                        <el-button type="" @click="handleAddUrl" icon="el-icon-plus">新增一行</el-button>
                    </div>
                </div>
            </sg-base-form>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormColumn, FormRef } from '@/sharegood-ui'
import { TargetUrl } from '@/entry/devops/models'

@Component({
    name: 'PipelineUatUrlsDialog',
    components: {},
})
export default class PipelineUatUrlsDialog extends Vue {
    @Prop({ type: Object }) row: any
    @Prop() id!: any
    @Prop() name!: any
    public $refs!: {
        formRef: FormRef
    }
    private formModel = {
        target_urls: [] as TargetUrl[],
    }
    options = [
        {
            label: '测试环境',
            value: 'uat',
        },
        {
            label: '预发环境',
            value: 'pre',
        },
        {
            label: '线上环境',
            value: 'prd',
        },
        {
            label: '开发环境',
            value: 'fat',
        },
    ]
    list = [
        {
            label: '',
            value: '',
        },
    ] as TargetUrl[]
    formFields: FormColumn[] = [
        {
            span: 24,
            tag: 'slot',
            slotName: 'urls',
            itemAttrs: {
                label: '',
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
    handleDelUrl(index: number) {
        this.formModel.target_urls.splice(index, 1)
    }

    handleAddUrl() {
        this.formModel.target_urls.push({
            label: '',
            value: '',
        })
    }
    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm(row?: any) {
        const $options: any = this.$options
        $options.confirm(row)
    }
    onInput($event: any, row: any) {
        console.log($event, row)
    }
    async handleSubmit() {
        const { target_urls } = this.formModel
        const urls = target_urls.filter(item => {
            if (item.label && item.value) {
                return true
            }
        })
        if (urls.length !== target_urls.length) {
            return this.$message.warning('环境、标题必填')
        }
        //if (urls.length) {
        await API.PipelineService.update({
            id: this.id,
            target_urls: urls,
        })
        this.$message.success('保存成功')
        this.confirm()
        //}
    }
    // API.PipelineService.update
    async created() {
        const { data } = await API.PipelineService.get({ id: this.id })
        this.formModel.target_urls = data.target_urls ? data.target_urls : this.list
    }
}
</script>

<style lang="less" scoped>
.PipelineTargetCustomEdit ::v-deep {
    .el-dialog__body {
        padding: 10px 20px;
    }
}
</style>
