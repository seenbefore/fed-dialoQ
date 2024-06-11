<template>
    <el-dialog ref="dialog" :close-on-click-modal="false" :title="exTitle" width="800px" v-bind="$attrs" :visible="true" class="code-edit-dialog" @close="cancel">
        <sg-base-form label-width="100px" ref="formRef" :fields="fields" v-model="model" size="small" :span="24">
            <div slot="urls">
                <el-table :data="list" style="width: 100%" class="url-table">
                    <el-table-column label="序号" type="index"></el-table-column>
                    <el-table-column label="名称" width="180">
                        <template slot-scope="{ row }">
                            <el-input v-model="row.urlName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="值" width="180">
                        <template slot-scope="{ row }">
                            <el-input v-model="row.url"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" width="180">
                        <template slot-scope="{ row }">
                            <el-input v-model="row.remark"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" @click="handleDelUrl(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="ic-mt-3">
                    <el-button type="" @click="handleAddUrl" icon="el-icon-plus">新增一行</el-button>
                </div>
            </div>
        </sg-base-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { FormRow } from '@/sharegood-ui'
import { save, detail } from '@/entry/library/api/auto/component'
import { appStore } from '@/entry/library/store/useStore'
import { save as saveUrl, ComponentInfoSave } from '@/entry/library/api/auto/component/url'
const API = {
    save,
    saveUrl,
    detail,
}

interface Model {
    id?: string
    name: string
    englishName: string
    lastVersion: string
    summary: string
    status: string
    typeOne: string
    technologyType: string
    businessLine: string
}
@Component({
    components: {},
})
export default class Dialog extends Vue {
    list = [] as ComponentInfoSave[]

    page = {
        loading: false,
    }
    model = {
        // name: '',
        // englishName: '',
        // lastVersion: '',
        // summary: '',
        // status: '',
        // typeOne: '',
        // technologyType: '',
        // businessLine: '',
    } as Model
    fields: FormRow[] = [
        {
            columns: [
                {
                    span: 8,
                    tag: 'input',
                    name: 'name',
                    itemAttrs: {
                        label: '组件名称',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                },
                {
                    span: 8,
                    tag: 'input',
                    name: 'englishName',
                    itemAttrs: {
                        label: '英文名称',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                },
                {
                    span: 8,
                    tag: 'input',
                    name: 'lastVersion',
                    itemAttrs: {
                        label: '最新版本',
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
                    span: 8,
                    tag: 'select',
                    name: 'typeOne',
                    itemAttrs: {
                        label: '组件分类',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        options: () => {
                            const dict = appStore.dict
                            return dict.find(item => item.dictCode === 'ci_type_one')?.dictValueList
                        },
                    },
                },
                {
                    span: 8,
                    tag: 'select',
                    name: 'businessLine',
                    itemAttrs: {
                        label: '业务条线',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        options: () => {
                            const dict = appStore.dict
                            return dict.find(item => item.dictCode === 'ci_business_line')?.dictValueList
                        },
                    },
                },
                {
                    span: 8,
                    tag: 'select',
                    name: 'technologyType',
                    itemAttrs: {
                        label: '技术领域',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        options: () => {
                            const dict = appStore.dict
                            return dict.find(item => item.dictCode === 'ci_technology_type')?.dictValueList
                        },
                    },
                },
            ],
        },

        {
            columns: [
                {
                    span: 24,
                    tag: 'select',
                    name: 'status',
                    itemAttrs: {
                        label: '组件状态',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        options: () => {
                            const dict = appStore.dict
                            return dict.find(item => item.dictCode === 'ci_status')?.dictValueList
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
                    name: 'summary',
                    itemAttrs: {
                        label: '组件简介',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        type: 'textarea',
                        rows: 3,
                    },
                },
            ],
        },
        {
            columns: [
                {
                    span: 24,
                    tag: 'slot',
                    slotName: 'urls',
                    itemAttrs: {
                        label: '组件地址',
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
        if (this.isEdit) {
            return '修改'
        }
        return '创建'
    }
    handleDelUrl(index: number) {
        this.list.splice(index, 1)
    }
    handleAddUrl() {
        this.list.push({
            id: '',
            urlName: '其他',
            url: '',
            remark: '',
        })
    }

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm(val: any = '') {
        const $options: any = this.$options
        $options.confirm(val)
    }
    async saveComponent() {
        const { id, name, englishName, lastVersion, summary, status, typeOne, technologyType, businessLine } = this.model
        const payload: any = {
            name,
            englishName,
            lastVersion,
            summary,
            status,
            typeOne,
            technologyType,
            businessLine,
        }
        if (id) {
            payload.id = id
        }
        const { data } = await API.save(payload)
        return data
    }
    async saveComponentUrl(componentId: string) {
        const list = this.list || []

        await API.saveUrl({
            componentId,
            urlList: list,
        })
    }
    submit() {
        const ref: any = this.$refs.formRef

        ref.validate(async (valid: boolean) => {
            if (valid) {
                const id = await this.saveComponent()
                await this.saveComponentUrl(id)
                this.$message.success('操作成功')
                this.confirm()
            }
        })
    }
    async syncData() {
        if (this.id) {
            const { data } = await detail({ componentId: this.id as string })
            const { name, englishName, lastVersion, summary, status, typeOne, technologyType, businessLine, componentInfoUrlList = [] } = data
            this.model = {
                id: this.id,
                name,
                englishName,
                lastVersion,
                summary,
                status,
                typeOne,
                technologyType,
                businessLine,
            }
            this.list = componentInfoUrlList.map(item => {
                return {
                    ...item,
                }
            })
        } else {
            this.list = [
                {
                    id: '',
                    urlName: '文档',
                    url: '',
                    remark: '',
                },
                {
                    id: '',

                    urlName: 'git',
                    url: '',
                    remark: '',
                },
                {
                    id: '',

                    urlName: '其他',
                    url: '',
                    remark: '',
                },
            ]
        }
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
