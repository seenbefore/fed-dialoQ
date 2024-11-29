<template>
    <div class="sg-page icinfo-ai CaseConfigAdd">
        <div class="content">
            <!-- {{ formModel.mainCatalogList }} -->
            <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel"></sg-base-form>
        </div>

        <div class="sg-form-actions">
            <el-button type="primary" @click="handleSubmit">确定</el-button>
            <el-button @click="handleCancel">取消</el-button>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Ref, Watch, Prop } from 'vue-property-decorator'
import { FormColumn, FormRef } from '@/sharegood-ui'
import DirectoryConfig from '../components/directory-config/index.vue'
import { getDetail, save, update, getDictList } from './api'
import { tagsViewStore } from '@/store/useStore'

@Component({
    name: 'CaseConfigAdd',
    components: {
        DirectoryConfig,
    },
})
export default class CaseConfigAdd extends Vue {
    /**
     * 类型
     * add: 新增
     * edit: 编辑
     */
    @Prop({ default: 'add' }) type!: string
    /**
     * 主键ID
     */
    @Prop({ default: '' }) id!: string

    @Ref('formRef')
    formRef!: FormRef

    formModel: Record<string, any> = {
        mainAndSubVolume: ['main'],
        hasMainVolume: '', // 正卷默认选中
        hasSubVolume: '', // 副卷默认不选中
        showQrcode: '0', // 二维码默认隐藏
        showBarcode: '0', // 条形码默认隐藏
        showPhotographer: '0', // 拍摄人姓名默认隐藏
        needApproval: '1', // 默认需要审批
        mainCatalogList: [
            // {
            //     // 模拟3条数据
            //     catalogName: '222', // 文书目录名称
            //     sortNo: 1, // 组卷序号
            //     volumeType: '', // 正/副卷(1:正卷,2:副卷)
            //     hasAttachment: '1', // 是否含附件(1:是,0:否)
            //     caseStageCode: '', // 案件阶段编码
            //     caseStageName: '', // 案件阶段名称
            //     catalogCode: '222', // 文书目录编码
            //     volumeConfigId: '', // 卷宗配置唯一标识
            //     remark: '', // 备注
            //     id: '',
            // },
            // {
            //     // 模拟3条数据
            //     catalogName: '333', // 文书目录名称
            //     sortNo: 1, // 组卷序号
            //     volumeType: '', // 正/副卷(1:正卷,2:副卷)
            //     hasAttachment: '1', // 是否含附件(1:是,0:否)
            //     caseStageCode: '', // 案件阶段编码
            //     caseStageName: '', // 案件阶段名称
            //     catalogCode: '333', // 文书目录编码
            //     volumeConfigId: '', // 卷宗配置唯一标识
            //     remark: '', // 备注
            //     id: '2',
            // },
            // {
            //     // 模拟3条数据
            //     catalogName: '444', // 文书目录名称
            //     sortNo: 1, // 组卷序号
            //     volumeType: '', // 正/副卷(1:正卷,2:副卷)
            //     hasAttachment: '1', // 是否含附件(1:是,0:否)
            //     caseStageCode: '', // 案件阶段编码
            //     caseStageName: '', // 案件阶段名称
            //     catalogCode: '444', // 文书目录编码
            //     volumeConfigId: '', // 卷宗配置唯一标识
            //     remark: '', // 备注
            //     id: '1',
            // },
        ],
        subCatalogList: [],
        mainCatalogList$: [],
        subCatalogList$: [],
    }

    isValid = false

    mounted() {
        if (this.type === 'edit' || (this.type === 'add' && this.id)) {
            this.getDetail()
        }
    }
    async getDetail() {
        const { data } = await getDetail({ id: this.id })

        // 处理正副卷选择
        const mainAndSubVolume = []
        if (data.hasMainVolume === '1') mainAndSubVolume.push('main')
        if (data.hasSubVolume === '1') mainAndSubVolume.push('sub')

        this.formModel = {
            ...data,
            mainAndSubVolume,
            mainCatalogList: data.mainCatalogList || [],
            mainCatalogList$: data.mainCatalogList || [],
            subCatalogList: data.subCatalogList || [],
            subCatalogList$: data.subCatalogList || [],
        }
        if (this.type === 'add') {
            delete this.formModel.id
        }
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'select',
                name: 'lineCode',
                label: '条线',
                attrs: {
                    filterable: true,
                    'default-first-option': true,
                    placeholder: '请选择条线',
                    options: async () => {
                        const { data } = await getDictList({ dictType: 'territory_type' })
                        return data.map((item: any) => ({
                            label: item.dictChineseName,
                            value: item.dictCode,
                        }))
                    },
                    onChange: (val: any) => {
                        console.log(val)
                        const { option } = val
                        if (option) {
                            this.formModel.lineName = option.label
                        }
                    },
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择条线' }],
                },
            },
            {
                tag: 'radio',
                name: 'volumeTypeCode',
                label: '卷宗类型',
                attrs: {
                    filterable: true,
                    'default-first-option': true,
                    options: async () => {
                        const { data } = await getDictList({ dictType: 'archive_type' })
                        return data.map((item: any) => ({
                            label: item.dictChineseName,
                            value: item.dictCode,
                        }))
                    },
                    onChange: (val: any) => {
                        const { option } = val
                        console.log(111, option, val)
                        if (option) {
                            this.formModel.volumeTypeName = option.label
                        }
                    },
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择卷宗类型' }],
                },
                class: 'caseType',
            },
            {
                tag: 'input',
                name: 'volumeName',
                label: '卷宗名称',
                attrs: {
                    placeholder: '请输入',
                    maxlength: 20,
                    'show-word-limit': true,
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请输入卷宗名称' }],
                },
            },
            {
                tag: 'checkbox',
                name: 'mainAndSubVolume',
                label: '正/副卷配置',
                attrs: {
                    options: [
                        { label: '正卷', value: 'main', disabled: true },
                        { label: '副卷', value: 'sub' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择正/副卷配置' }],
                },
                class: 'volumeType',
            },
            {
                tag: 'custom',
                name: 'directory$',
                label: '目录',
                attrs: {
                    value: [1],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请配置目录' }],
                },
                appendRender: () => {
                    return (
                        <el-row gutter={20}>
                            <el-col class="" span={12}>
                                <DirectoryConfig
                                    props={{
                                        value: this.formModel.mainCatalogList$,
                                        type: 'main',
                                        formModel: this.formModel,
                                        onChange: (val: any) => {
                                            this.formModel.mainCatalogList = val
                                        },
                                    }}
                                />
                            </el-col>
                            <el-col class="" span={12}>
                                <DirectoryConfig
                                    props={{
                                        value: this.formModel.subCatalogList$,
                                        type: 'sub',
                                        formModel: this.formModel,
                                        onChange: (val: any) => {
                                            this.formModel.subCatalogList = val
                                        },
                                    }}
                                />
                            </el-col>
                        </el-row>
                    )
                },
            },
            {
                tag: 'radio',
                name: 'showQrcode',
                label: '封面二维码',
                attrs: {
                    options: [
                        { label: '隐藏', value: '0' },
                        { label: '显示', value: '1' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择是否显示二维码' }],
                    helpMessage: '显示二维码后，本部门人员可在卷宗封面扫码查看卷宗',
                },
            },
            {
                tag: 'radio',
                name: 'showBarcode',
                label: '封面条形码',
                attrs: {
                    options: [
                        { label: '隐藏', value: '0' },
                        { label: '显示', value: '1' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择是否显示条形码' }],
                    helpMessage: '显示条形码后，本部门人员可在卷宗封面扫码查看卷宗',
                },
            },
            {
                tag: 'radio',
                name: 'showPhotographer',
                label: '拍摄人姓名',
                attrs: {
                    options: [
                        { label: '隐藏', value: '0' },
                        { label: '显示', value: '1' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择是否显示拍摄人姓名' }],
                    helpMessage: '显示拍摄人姓名后，本部门人员可在卷宗封面扫码查看拍摄人',
                },
            },
            {
                tag: 'radio',
                name: 'needApproval',
                label: '申请查看卷宗',
                attrs: {
                    options: [
                        { label: '需档案管理员审批', value: '1' },
                        { label: '无需审批', value: '0' },
                    ],
                },
                itemAttrs: {
                    rules: [{ required: true, message: '请选择是否需要审批' }],
                },
            },
        ]

        return {
            labelWidth: '160px',
            span: 24,
            fields,
        }
    }

    async handleSubmit() {
        try {
            await this.formRef.validate(() => {}, true)
            const formModel = this.formModel

            const params: any = {
                lineCode: formModel.lineCode,
                lineName: formModel.lineName,
                volumeTypeCode: formModel.volumeTypeCode,
                volumeTypeName: formModel.volumeTypeName,
                volumeName: formModel.volumeName,

                // 处理正副卷选择
                hasMainVolume: formModel.mainAndSubVolume.includes('main') ? '1' : '0',
                hasSubVolume: formModel.mainAndSubVolume.includes('sub') ? '1' : '0',
                mainCatalogCount: formModel.mainCatalogList.length,
                subCatalogCount: formModel.subCatalogList.length,
                // 添加目录数据
                mainCatalogList: formModel.mainCatalogList.map((item: any, index: any) => {
                    return {
                        ...item,
                        sortNo: index + 1 + '',
                    }
                }),
                subCatalogList: formModel.subCatalogList.map((item: any, index: any) => {
                    return {
                        ...item,
                        sortNo: index + 1 + '',
                    }
                }),
                showQrcode: formModel.showQrcode,
                showBarcode: formModel.showBarcode,
                showPhotographer: formModel.showPhotographer,
                needApproval: formModel.needApproval,
            }

            if (this.type === 'edit') {
                await update({ ...params, id: this.id })
            } else {
                await save(params)
            }

            this.$message.success('保存成功')
            await tagsViewStore.delView(this.$route)
            this.$router.push('/file-review/case-config')
        } catch (error) {
            console.error(error)
        }
    }

    async handleCancel() {
        await tagsViewStore.delView(this.$route)
        this.$router.push('/file-review/case-config')
    }
}
</script>

<style lang="less" scoped>
.CaseConfigAdd ::v-deep {
    display: flex !important;
    flex-direction: column;
    padding: 0px !important;
    height: 100%;
    .content {
        padding: 20px;
        flex: 1;
        overflow-y: auto;
    }
    .sg-form-actions {
        height: 50px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-top: 1px solid #ddd;

        .el-button + .el-button {
            margin-left: 10px;
        }
    }
    .volumeType {
        .el-checkbox-group {
            display: flex;
        }
        .el-checkbox {
            flex: 1;
        }
    }
    .caseType {
        .el-radio {
            min-width: 160px;
            margin-bottom: 7px;
        }
    }
}
</style>
