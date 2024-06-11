<template>
    <el-dialog
        ref="dialog"
        :title="`${name}-访问地址`"
        visible
        class="PipelineUatUrlsDialog"
        :fullscreen="false"
        :append-to-body="false"
        :close-on-click-modal="false"
        width="850px"
        v-bind="$attrs"
        @close="cancel"
    >
        <div class="pre-deploy-dialog__content">
            <sg-base-form label-width="80px" ref="formRef" :fields="formFields" v-model="formModel" :span="24">
                <div slot="urls">
                    <el-table :data="formModel.uat_urls" style="width: 100%" class="url-table">
                        <el-table-column label="环境标识" width="150">
                            <template slot-scope="{ row }">
                                <el-select v-model="row.target" placeholder="请选择" @change="handleSelect($event, row)">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="环境名称" width="150">
                            <template slot-scope="{ row }">
                                <el-input v-model="row.name" placeholder="请填写"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="链接" min-width="180">
                            <template slot-scope="{ row }">
                                <el-input v-model="row.url" placeholder="请填写"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" width="120">
                            <template slot-scope="{ row }">
                                <el-input v-model="row.note" placeholder="请填写"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="90">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="handleDelUrl(scope.$index)">删除</el-button>
                                <el-button size="mini" type="text" @click="handleLink(scope.row)">访问</el-button>
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
import { UatUrl } from '@/entry/devops/models'

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
        uat_urls: [] as UatUrl[],
    }
    options = [] as any[]
    list = [
        {
            name: '',
            url: '',
            note: '',
        },
    ] as UatUrl[]
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
        this.formModel.uat_urls.splice(index, 1)
    }
    handleLink(row: UatUrl) {
        if (row.url) {
            window.open(row.url)
        }
    }
    handleAddUrl() {
        this.formModel.uat_urls.push({
            name: '',
            url: '',
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
    async handleSubmit() {
        const { uat_urls } = this.formModel
        const urls = uat_urls.filter(item => {
            if (item.name && item.url) {
                return true
            }
        })
        // if (urls.length) {
        await API.PipelineService.update({
            id: this.id,
            uat_urls: urls,
        })
        this.$message.success('保存成功')
        this.confirm()
        // }
    }
    handleSelect(val: any, row: any) {
        const target = this.options.find(item => item.value === val)

        this.$set(row, 'name', target.label)
    }
    async created() {
        const { data } = await API.PipelineService.get({ id: this.id })
        const triggers = data.config.triggers || []
        const target_urls = data.target_urls || []
        const targetOptions = [
            {
                label: '测试环境(uat)',
                value: 'uat',
            },
            {
                label: '预发环境(pre)',
                value: 'pre',
            },
            {
                label: '线上环境(prd)',
                value: 'prd',
            },
            {
                label: '开发环境1(fat1)',
                value: 'fat1',
            },
            {
                label: '开发环境2(fat2)',
                value: 'fat2',
            },
            {
                label: '开发环境3(fat3)',
                value: 'fat3',
            },
            {
                label: '开发环境4(fat4)',
                value: 'fat4',
            },
            {
                label: '开发环境5(fat5)',
                value: 'fat5',
            },
            {
                label: '开发环境6(fat6)',
                value: 'fat6',
            },
        ]
        const triggerOptions = triggers.map(item => {
            const { title, target } = item
            let label = ''
            if (!title) {
                const option = targetOptions.find(item => item.value === target)
                if (option) {
                    label = `${option.label}`
                } else {
                    label = `${target}(${target})`
                }
            } else {
                label = `${title}(${target})`
            }
            return {
                label: label,
                value: item.target,
            }
        })
        const target_urlsOptions = target_urls.map(item => {
            return {
                label: `${item.label}(${item.value})`,
                value: item.value,
            }
        })
        const arrayObjects = [...targetOptions, ...triggerOptions, ...target_urlsOptions]
        // 创建一个空对象来存储唯一的value和对应的对象
        const uniqueObjects: any = {}
        // 遍历数组
        arrayObjects.forEach(obj => {
            // 使用value作为键来存储或更新对象
            uniqueObjects[obj.value] = obj
        })
        // 将uniqueObjects的值转换回数组
        const uniqueArrayObjects = Object.values(uniqueObjects)

        this.formModel.uat_urls = data.uat_urls ? data.uat_urls : this.list

        this.options = [...uniqueArrayObjects]
    }
}
</script>

<style lang="less" scoped>
.PipelineUatUrlsDialog ::v-deep {
    .el-dialog__body {
        padding: 10px 20px;
    }
}
</style>
